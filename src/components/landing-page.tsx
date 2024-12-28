'use client'

import { useRef, useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { ChevronDown, Music2, Users, Zap } from 'lucide-react'

export function LandingPage() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const registerFormRef = useRef<HTMLFormElement>(null)

  const scrollToRegisterForm = () => {
    registerFormRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || 'Failed to join waitlist')
      }

      toast.success('Successfully joined the waitlist!')
      setEmail('')
    } catch (error) {
      console.error('Waitlist submission error:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to join waitlist. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // useEffect(() => {
  //   console.log('API Base URL:', process.env.REACT_APP_API_BASE_URL)
  // }, [])

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-primary/10 px-4 py-32 text-center md:px-8 lg:px-16">
        <div className="mx-auto max-w-4xl space-y-8">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Sacred Sound Platform
          </h1>
          <p className="mx-auto max-w-2xl text-muted-foreground md:text-xl">
            Connect with sacred music artists and experience transformative sound journeys.
            Join our community of conscious listeners and creators.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" onClick={scrollToRegisterForm}>
              Join Waitlist
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>
        <ChevronDown className="absolute bottom-8 h-8 w-8 animate-bounce text-muted-foreground" />
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-24 md:px-8 lg:px-16">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Experience Sacred Sound
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Discover the features that make our platform unique
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="space-y-4 rounded-lg border p-6">
              <div className="inline-block rounded-lg bg-primary/10 p-3">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Community Section */}
      <section className="bg-muted/50 px-4 py-24 md:px-8 lg:px-16">
        <div className="container mx-auto">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-center space-y-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Join Our Growing Community
              </h2>
              <p className="text-muted-foreground md:text-lg">
                Connect with like-minded individuals and experience the power of sacred sound together.
                Our community is growing every day with artists and listeners from around the world.
              </p>
              <Button size="lg" className="w-fit" onClick={scrollToRegisterForm}>
                Join the Community
              </Button>
            </div>
            <div className="aspect-video overflow-hidden rounded-xl bg-muted">
              <video
                className="h-full w-full object-cover"
                poster="/placeholder.svg?height=400&width=600"
                controls
              >
                <source src="/community-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* User Personas Section */}
      <section className="container mx-auto px-4 py-24 md:px-8 lg:px-16">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Who Is Sacred Sound For?
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Whether you're a listener or creator, Sacred Sound is designed for you
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {personas.map((persona, index) => (
            <div
              key={index}
              className="flex flex-col items-center space-y-4 rounded-lg border p-8 text-center"
            >
              <div className="inline-block rounded-full bg-primary/10 p-4">
                {persona.icon}
              </div>
              <h3 className="text-2xl font-bold">{persona.title}</h3>
              <p className="text-muted-foreground">{persona.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Registration Form */}
      <section
        ref={registerFormRef}
        className="bg-gradient-to-b from-muted/50 px-4 py-24 md:px-8 lg:px-16"
      >
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Join the Waitlist
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Be the first to experience Sacred Sound when we launch
          </p>
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12 text-lg"
            />
            <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Joining...' : 'Join Waitlist'}
            </Button>
          </form>
        </div>
      </section>
    </div>
  )
}

const features = [
  {
    icon: <Music2 className="h-6 w-6" />,
    title: 'Sacred Music Library',
    description: 'Access a curated collection of sacred music from diverse traditions and cultures.',
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Community Connection',
    description: 'Connect with other spiritual seekers and share your musical journey.',
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: 'Live Experiences',
    description: 'Participate in live sacred music sessions and virtual ceremonies.',
  },
]

const personas = [
  {
    icon: <Users className="h-6 w-6" />,
    title: 'For Listeners',
    description:
      'Discover and experience sacred music from around the world. Create playlists, join live sessions, and connect with a community of conscious listeners.',
  },
  {
    icon: <Music2 className="h-6 w-6" />,
    title: 'For Artists',
    description:
      'Share your sacred music with a global audience. Connect with listeners, host live sessions, and grow your community on a platform designed for sacred artists.',
  },
]

