
'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { useEffect } from 'react'

export default function LoginPage() {
  const { userEmail } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/library'

  useEffect(() => {
    if (userEmail) {
      router.push(redirect)
    }
  }, [userEmail, router, redirect])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-8">Login to Sacred Sound</h1>
      {/* Login form components will go here */}
    </div>
  )
}
