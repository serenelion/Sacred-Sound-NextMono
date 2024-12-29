
'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { getUserEmailFromToken, refreshAccessToken } from '@/lib/auth'
import { useRouter } from 'next/navigation'

interface AuthContextType {
  userEmail: string | null
  isArtist: boolean
  loading: boolean
  login: (token: string, isArtist?: boolean) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [isArtist, setIsArtist] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          setLoading(false)
          return
        }

        let email = getUserEmailFromToken(token)
        
        if (!email) {
          try {
            const newToken = await refreshAccessToken()
            if (newToken) {
              localStorage.setItem('token', newToken)
              email = getUserEmailFromToken(newToken)
              const artistFlag = localStorage.getItem('isArtist')
              setIsArtist(artistFlag === 'true')
            } else {
              throw new Error('Token refresh failed')
            }
          } catch (error) {
            console.error('Token refresh failed:', error)
            localStorage.removeItem('token')
            localStorage.removeItem('isArtist')
            router.push('/login')
          }
        }

        setUserEmail(email)
      } catch (error) {
        console.error('Auth initialization error:', error)
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()

    const tokenCheckInterval = setInterval(() => {
      const token = localStorage.getItem('token')
      if (token && !getUserEmailFromToken(token)) {
        initializeAuth()
      }
    }, 5 * 60 * 1000) // Check every 5 minutes

    return () => clearInterval(tokenCheckInterval)
  }, [router])

  const login = (token: string, artistFlag?: boolean) => {
    localStorage.setItem('token', token)
    if (artistFlag !== undefined) {
      localStorage.setItem('isArtist', String(artistFlag))
      setIsArtist(artistFlag)
    }
    const email = getUserEmailFromToken(token)
    setUserEmail(email)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('isArtist')
    setUserEmail(null)
    setIsArtist(false)
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ userEmail, isArtist, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
