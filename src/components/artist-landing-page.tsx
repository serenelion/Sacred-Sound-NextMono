'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { BadgeCheck, Flame, Globe, Heart, Music2, Users } from 'lucide-react'

const faqs = [
  {
    question: 'What kind of artists can join Sacred Sound?',
    answer: 'Sacred Sound welcomes artists creating transformative, conscious, and spiritual music across all traditions and genres. Whether you create mantras, medicine music, sound healing, or any form of sacred music, you\'re welcome here.'
  },
  {
    question: 'How do I get started?',
    answer: 'Simply click the "Join the Collective" button to create your artist account. Once approved, you can start uploading your music, customizing your profile, and connecting with listeners.'
  },
  {
    question: 'What support do you provide to artists?',
    answer: 'We provide technical support, promotional tools, analytics, and community features to help you succeed. Our team is also here to help you optimize your presence and grow your audience.'
  },
  {
    question: 'How does revenue sharing work?',
    answer: 'Sacred Sound offers transparent and fair revenue sharing. Artists receive a majority share of streaming revenue and can also earn through direct support features, live events, and exclusive content.'
  },
  {
    question: 'Can I maintain my music on other platforms?',
    answer: 'Yes! Sacred Sound is a non-exclusive platform. You\'re free to share your music on other platforms while building your presence in our conscious community.'
  }
]

const advantages = [
  {
    icon: <Globe className="h-6 w-6" />,
    title: 'Global Reach',
    description:
      'Share your sacred music with conscious listeners around the world. Our platform connects you with an audience seeking transformative sound experiences.',
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: 'Intimate Connections',
    description:
      'Build meaningful relationships with your listeners through our community features. Foster a dedicated following that resonates with your unique sound.',
  },
  {
    icon: <Music2 className="h-6 w-6" />,
    title: 'Studio Support',
    description:
      'Access professional tools and support to enhance your creative process. Our platform provides everything you need to produce and share high-quality content.',
  },
]

const features = [
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Artist Collective',
    description:
      'Join a supportive community of sacred music artists. Collaborate, share insights, and grow together.',
  },
  {
    icon: <BadgeCheck className="h-6 w-6" />,
    title: 'Simple Publishing',
    description:
      'Upload and share your music effortlessly. Our platform handles the technical details so you can focus on creating.',
  },
  {
    icon: <Flame className="h-6 w-6" />,
    title: 'Growth Tools',
    description:
      'Access analytics, promotion tools, and insights to help you expand your reach and deepen listener engagement.',
  },
]

export function ArtistLandingPage() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-green-100 to-white px-4 text-center dark:from-green-900/20 dark:to-background md:px-8 lg:px-16">
        <div className="mx-auto max-w-4xl space-y-8">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Join the Sacred Sound Collective
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground md:text-2xl">
            Share your sacred music with a global audience of conscious listeners.
            Transform lives through sound.
          </p>
          <Button
            size="lg"
            className="text-lg"
            onClick={() => router.push('/artistSignup')}
          >
            Start Creating Today
          </Button>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="container mx-auto px-4 py-24 md:px-8 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col justify-center space-y-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              A Platform Built for Sacred Artists
            </h2>
            <p className="text-xl text-muted-foreground">
              Sacred Sound is more than just a streaming platform. We're building a
              conscious community where artists like you can share your gifts,
              connect deeply with listeners, and grow your impact.
            </p>
          </div>
          <div className="aspect-video overflow-hidden rounded-xl bg-muted">
            <video
              className="h-full w-full object-cover"
              poster="/placeholder.svg?height=400&width=600"
              controls
            >
              <source src="/Sacred-Sound-Explainer-Video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* Cloud Studio Section */}
      <section className="bg-green-50 px-4 py-24 dark:bg-green-900/10 md:px-8 lg:px-16">
        <div className="container mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              The Sacred Sound Advantage
            </h2>
            <p className="mt-4 text-xl text-muted-foreground">
              Everything you need to share your sacred music with the world
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {advantages.map((advantage, index) => (
              <Card key={index} className="border-2">
                <CardContent className="pt-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    {advantage.icon}
                  </div>
                  <h3 className="mb-2 text-xl font-bold">{advantage.title}</h3>
                  <p className="text-muted-foreground">{advantage.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-24 md:px-8 lg:px-16">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Let's Create Magic Together
          </h2>
          <p className="mt-4 text-xl text-muted-foreground">
            Join a platform that supports your creative journey
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center space-y-4 text-center"
            >
              <div className="inline-block rounded-full bg-primary/10 p-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <Button
            size="lg"
            className="text-lg"
            onClick={() => router.push('/artistSignup')}
          >
            Join the Collective
          </Button>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-muted/50 px-4 py-24 md:px-8 lg:px-16">
        <div className="container mx-auto max-w-3xl">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-xl text-muted-foreground">
              Everything you need to know about joining Sacred Sound
            </p>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-24 text-center md:px-8 lg:px-16">
        <div className="mx-auto max-w-3xl space-y-8">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Ready to Share Your Sacred Music?
          </h2>
          <p className="text-xl text-muted-foreground">
            Join the Sacred Sound collective today and start sharing your gifts with
            our global community of conscious listeners.
          </p>
          <Button
            size="lg"
            className="text-lg"
            onClick={() => router.push('/artistSignup')}
          >
            Begin Your Journey
          </Button>
        </div>
      </section>
    </div>
  )
}

