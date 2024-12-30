import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import WaitlistForm from "@/components/waitlist-form"
import { ArrowRight, Music2 } from 'lucide-react'
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container px-4 py-12 md:py-24">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="rounded-full bg-primary/10 p-4 text-primary">
            <Music2 className="h-8 w-8" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
            Sacred Sound Studio
          </h1>
          <p className="text-xl text-muted-foreground max-w-[600px]">
            A platform for artists to share their sacred music with the world. Join our waitlist to get early access.
          </p>
          <div className="w-full max-w-[500px] space-y-4">
            <WaitlistForm />
            <div className="flex justify-center">
              <Button variant="link" asChild>
                <Link href="/artist-signup" className="group">
                  Artist? Sign up here
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

