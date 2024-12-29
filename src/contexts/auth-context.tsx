'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { getUserEmailFromToken, refreshAccessToken } from '@/lib/auth'

interface AuthContextType {
  userEmail: string | null
  isArtist: boolean
  loading: boolean
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [isArtist, setIsArtist] = useState(false)
  const [loading, setLoading] = useState(true)

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
          // Token is invalid or expired, try to refresh
          try {
            const newToken = await refreshAccessToken()
            localStorage.setItem('token', newToken)
            email = getUserEmailFromToken(newToken)
          } catch {
            localStorage.removeItem('token')
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
  }, [])

  const login = (token: string) => {
    localStorage.setItem('token', token)
    const email = getUserEmailFromToken(token)
    setUserEmail(email)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUserEmail(null)
  }

  return (
    <AuthContext.Provider value={{ userEmail, loading, login, logout }}>
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

