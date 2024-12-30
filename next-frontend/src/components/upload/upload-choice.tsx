
'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Album, FileAudio2, Info } from 'lucide-react'
import { TechnicalRequirements } from './technical-requirements'

interface UploadChoiceProps {
  onSelect: (type: 'album' | 'individual') => void
}

export function UploadChoice({ onSelect }: UploadChoiceProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Share Your Sacred Sound</h1>
        <p className="text-muted-foreground">Choose how you'd like to share your spiritual content with the community.</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card 
          className="cursor-pointer hover:border-primary transition-colors group relative" 
          onClick={() => onSelect('album')}
        >
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
          <CardHeader>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
              <Album className="w-6 h-6 text-primary" />
            </div>
            <CardTitle>Create an Album</CardTitle>
            <CardDescription>
              Perfect for concert recordings, workshop series, or themed collections. Upload multiple tracks as a cohesive journey.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="secondary" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              Start Album Creation
            </Button>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:border-primary transition-colors group relative" 
          onClick={() => onSelect('individual')}
        >
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
          <CardHeader>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
              <FileAudio2 className="w-6 h-6 text-primary" />
            </div>
            <CardTitle>Share Individual Track</CardTitle>
            <CardDescription>
              Share a single mantra, bhajan, or meditation guide. Each piece will be carefully curated to ensure the highest quality.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="secondary" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              Upload Track
            </Button>
          </CardContent>
        </Card>
      </div>

      <TechnicalRequirements />
    </div>
  )
}
