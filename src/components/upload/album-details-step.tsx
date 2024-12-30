
'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { ChevronLeft, Upload } from 'lucide-react'

interface AlbumDetailsStepProps {
  onBack: () => void
  onComplete: (id: string) => void
}

export function AlbumDetailsStep({ onBack, onComplete }: AlbumDetailsStepProps) {
  const [details, setDetails] = useState({
    title: '',
    description: ''
  })

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex items-center justify-between py-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <h1 className="text-2xl font-semibold">Album Details</h1>
          </div>
          <Button 
            onClick={() => onComplete('album-1')}
            disabled={!details.title}
          >
            Continue
          </Button>
        </div>
      </header>

      <main className="container py-8">
        <div className="grid gap-8 md:grid-cols-2 max-w-4xl">
          <div className="space-y-8">
            <div className="aspect-square bg-muted rounded-lg flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-muted/80 transition-colors">
              <Upload className="w-8 h-8 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Upload album cover</span>
            </div>
          </div>

          <Card className="p-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Album Title</Label>
              <Input
                id="title"
                value={details.title}
                onChange={(e) => setDetails(d => ({ ...d, title: e.target.value }))}
                placeholder="Enter album title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={details.description}
                onChange={(e) => setDetails(d => ({ ...d, description: e.target.value }))}
                placeholder="Describe your album"
                className="min-h-[120px]"
              />
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
