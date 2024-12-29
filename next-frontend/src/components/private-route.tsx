
'use client'

import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface PrivateRouteProps {
  children: React.ReactNode
  requireArtist?: boolean
}

export function PrivateRoute({ children, requireArtist = false }: PrivateRouteProps) {
  const { userEmail, loading, isArtist } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !userEmail) {
      router.push(`/login?redirect=${window.location.pathname}`)
    } else if (!loading && requireArtist && !isArtist) {
      router.push('/library')
    }
  }, [userEmail, loading, requireArtist, isArtist, router])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!userEmail || (requireArtist && !isArtist)) {
    return null
  }

  return <>{children}</>
}
