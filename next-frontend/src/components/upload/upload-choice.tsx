'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Album, FileAudio2 } from 'lucide-react'

interface UploadChoiceProps {
  onSelect: (type: 'album' | 'individual') => void
}

export function UploadChoice({ onSelect }: UploadChoiceProps) {
  return (
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
            Upload multiple pieces of content as a cohesive collection. Perfect for concert recordings,
            workshop series, or themed content collections.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="secondary" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            Start Album Creation
          </Button>
        </CardContent>
      </Card>

      <Card className="cursor-pointer hover:border-primary transition-colors" onClick={() => onSelect('individual')}>
        <CardHeader>
          <FileAudio2 className="w-8 h-8 mb-2 text-primary" />
          <CardTitle>Share Individual Content</CardTitle>
          <CardDescription>
            Upload single tracks like mantras, bhajans, or meditation guides. Each piece will be 
            carefully reviewed to ensure the highest quality.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="secondary" className="w-full">Upload Track</Button>
        </CardContent>
      </Card>
    </div>
  )
}