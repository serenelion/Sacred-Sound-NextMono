
'use client'

import { useAuth } from '@/contexts/auth-context'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'

export function PrivateRoute({ 
  children,
  requireArtist = false 
}: { 
  children: React.ReactNode
  requireArtist?: boolean 
}) {
  const { userEmail, isArtist, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!loading && !userEmail) {
      router.push(`/login?redirect=${pathname}`)
    } else if (!loading && requireArtist && !isArtist) {
      router.push('/library')
    }
  }, [userEmail, isArtist, loading, router, pathname, requireArtist])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!userEmail || (requireArtist && !isArtist)) {
    return null
  }

  return <>{children}</>
}
