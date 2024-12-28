import { Metadata } from 'next'
import { ArtistLandingPage } from '@/components/artist-landing-page'

export const metadata: Metadata = {
  title: 'Create on Sacred Sound | Join the Artist Collective',
  description: 'Join the Sacred Sound artist collective. Share your sacred music with a global audience, build intimate listener connections, and receive professional studio support.',
}

export default function CreatePage() {
  return <ArtistLandingPage />
}

