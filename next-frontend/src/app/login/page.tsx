
'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import axios from 'axios'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/library'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://0.0.0.0:3000'
      
      const response = await axios.post(`${apiUrl}/api/login`, {
        email,
        password
      }, {
        withCredentials: true // Important for receiving cookies
      })
      
      if (response.data.accessToken) {
        // Handle successful login
        await login(response.data.accessToken, response.data.isArtist)
        router.push(redirect)
        router.refresh()
      } else {
        setError('Invalid response from server')
      }
    } catch (err: any) {
      // Handle different error scenarios
      if (err.response) {
        switch (err.response.status) {
          case 400:
            setError('Invalid email or password')
            break
          case 429:
            setError('Too many attempts. Please try again later')
            break
          case 500:
            setError('Server error. Please try again later')
            break
          default:
            setError(err.response.data?.message || 'Login failed')
        }
      } else if (err.request) {
        setError('Unable to reach server. Please check your connection')
      } else {
        setError('An unexpected error occurred')
      }
      console.error('Login error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <h1 className="text-2xl font-bold text-center">Login to Sacred Sound</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              required
              className="mt-1"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </div>
    </div>
  )
}
