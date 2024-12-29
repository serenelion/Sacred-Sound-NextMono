import { Metadata } from 'next'
import Link from 'next/link'
import { ArtistSignupForm } from '@/components/artist-signup-form'


export const metadata: Metadata = {
  title: 'Artist Signup | Sacred Sound',
  description: 'Join Sacred Sound as an artist and share your music with our global community.',
}

export default function ArtistSignupPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-green-100 to-white px-4 dark:from-green-900/20 dark:to-background">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">Join Sacred Sound</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Create your artist account and start sharing your sacred music
          </p>
        </div>

        <ArtistSignupForm />

        <div className="text-center text-sm">
          <p className="text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="font-medium underline underline-offset-4 hover:text-primary">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

