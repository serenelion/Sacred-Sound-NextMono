
import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface PrivateRouteProps {
  children: React.ReactNode
  requireArtist?: boolean
}

export function PrivateRoute({ children, requireArtist = false }: PrivateRouteProps) {
  const { userEmail, isArtist, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !userEmail) {
      router.push('/login')
    } else if (!loading && requireArtist && !isArtist) {
      router.push('/library')
    }
  }, [userEmail, isArtist, loading, requireArtist, router])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!userEmail || (requireArtist && !isArtist)) {
    return null
  }

  return <>{children}</>
}
