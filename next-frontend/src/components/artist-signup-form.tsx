'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import axios from 'axios'
import debounce from 'lodash/debounce'

interface FormData {
  accountName: string
  email: string
  password: string
  confirmPassword: string
}

interface ValidationErrors {
  accountName?: string
  email?: string
  password?: string
  confirmPassword?: string
}

interface SignupFormData {
  accountName: string;
  email: string;
  password: string;
  isArtist: boolean;
}

export function ArtistSignupForm() {
  const router = useRouter()
  const { login } = useAuth()
  const [formData, setFormData] = useState<FormData>({
    accountName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  const debouncedCheckAccountName = useCallback(
    debounce(async (accountName: string, email: string) => {
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL
      if (!apiUrl) {
        console.error('API Base URL is not defined')
        return
      }

      try {
        const response = await axios.get('/api/getCheckAccountName', {
          params: { accountName, email }
        })
        
        // Handle the response based on the taken status
        if (response.data.taken) {
          setErrors(prev => ({ ...prev, accountName: response.data.message }))
        } else {
          // Clear the error if the name is available
          setErrors(prev => ({ ...prev, accountName: undefined }))
        }
      } catch (error) {
        console.error('Account validation error:', error)
        setErrors(prev => ({ 
          ...prev, 
          accountName: 'Failed to validate account name'
        }))
      }
    }, 500),
    []
  )

  const validateForm = async (): Promise<boolean> => {
    const newErrors: ValidationErrors = {}
    setApiError(null)

    // Account name validation (length only)
    if (formData.accountName.length < 3) {
      newErrors.accountName = 'Account name must be at least 3 characters'
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Password validation
    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setApiError(null)

    try {
      const isValid = await validateForm()
      if (!isValid) {
        setIsSubmitting(false)
        return
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL
      if (!apiUrl) {
        throw new Error('API Base URL is not defined')
      }

      // Use the controlled form state instead of FormData
      const data: SignupFormData = {
        accountName: formData.accountName,
        email: formData.email,
        password: formData.password,
        isArtist: true
      }

      console.log('Submitting signup form with data:', {
        ...data,
        password: '[REDACTED]',
        targetUrl: `${apiUrl}/api/signup`
      })

      const response = await axios.post('/api/signup', data, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        timeout: 15000
      })

      console.log('Signup response:', {
        status: response.status,
        statusText: response.statusText,
        hasToken: !!response.data.accessToken,
        data: response.data
      })

      if (!response.data.accessToken) {
        throw new Error('Authentication token missing from response')
      }

      // Store token and update auth context
      login(response.data.accessToken)
      
      toast.success('Welcome to Sacred Sound! Redirecting to your dashboard...')
      
      // Clear form
      setFormData({
        accountName: '',
        email: '',
        password: '',
        confirmPassword: ''
      })
      
      // Redirect after a short delay to show the success message
      setTimeout(() => {
        router.push('/library')
      }, 1500)
    } catch (error) {
      console.error('Signup error:', error)
      
      let errorMessage: string
      
      if (axios.isAxiosError(error)) {
        const responseData = error.response?.data
          
        console.error('Detailed signup error:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: responseData,
          message: error.message
        })

        switch (error.response?.status) {
          case 400:
            if (responseData?.details && Array.isArray(responseData.details)) {
              errorMessage = responseData.details.join(', ')
            } else {
              errorMessage = responseData?.error || 'Invalid signup information'
            }
            // Update form-specific errors
            if (responseData?.details) {
              const newErrors: ValidationErrors = {}
              responseData.details.forEach((detail: string) => {
                if (detail.toLowerCase().includes('email')) newErrors.email = detail
                if (detail.toLowerCase().includes('password')) newErrors.password = detail
                if (detail.toLowerCase().includes('account')) newErrors.accountName = detail
              })
              setErrors(newErrors)
            }
            break
          case 409:
            errorMessage = 'Account already exists with this email or artist name'
            break
          case 500:
            errorMessage = 'Server error. Please try again later'
            break
          default:
            errorMessage = responseData?.message || 'Failed to create account'
        }
      } else {
        errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred'
      }
      
      setApiError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Create Your Artist Account</CardTitle>
        <CardDescription>
          Join our community of sacred music artists and share your gifts with the world
        </CardDescription>
      </CardHeader>
      <CardContent>
        {apiError && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{apiError}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6" suppressHydrationWarning>
          <div className="space-y-2">
            <Label htmlFor="accountName">Artist Name</Label>
            <Input
              id="accountName"
              type="text"
              placeholder="Your artist name"
              value={formData.accountName}
              onChange={(e) => {
                const newValue = e.target.value
                setFormData({ ...formData, accountName: newValue })
                // Always run the check, the server will handle length validation
                debouncedCheckAccountName(newValue, formData.email)
              }}
              required
              className={errors.accountName ? 'border-red-500' : ''}
            />
            {errors.accountName && (
              <p className="text-sm text-red-500">{errors.accountName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value })
                if (errors.email) {
                  setErrors({ ...errors, email: undefined })
                }
              }}
              required
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a secure password"
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value })
                if (errors.password) {
                  setErrors({ ...errors, password: undefined })
                }
              }}
              required
              className={errors.password ? 'border-red-500' : ''}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) => {
                setFormData({ ...formData, confirmPassword: e.target.value })
                if (errors.confirmPassword) {
                  setErrors({ ...errors, confirmPassword: undefined })
                }
              }}
              required
              className={errors.confirmPassword ? 'border-red-500' : ''}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">{errors.confirmPassword}</p>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
            size="lg"
          >
            {isSubmitting ? 'Creating Your Account...' : 'Create Account'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}