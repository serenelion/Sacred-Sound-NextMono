import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ArtistSignupForm from "@/components/artist-signup-form"
import { ArrowLeft } from 'lucide-react'
import Link from "next/link"

export default function ArtistSignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 p-4">
      <div className="container max-w-lg py-8 md:py-12">
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/" className="group">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to home
          </Link>
        </Button>
        <Card>
          <CardHeader>
            <CardTitle>Artist Sign Up</CardTitle>
            <CardDescription>
              Create your artist account to start sharing your sacred music
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ArtistSignupForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

