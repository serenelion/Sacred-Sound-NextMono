
'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { ImageUpload } from "@/components/ui/image-upload"

interface AlbumDetailsStepProps {
  details: {
    title: string
    description: string
    artwork: File | null
  }
  onChange: (details: any) => void
  onBack: () => void
  onNext: () => void
}

export function AlbumDetailsStep({ details, onChange, onBack, onNext }: AlbumDetailsStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!details.title) newErrors.title = 'Title is required'
    if (!details.artwork) newErrors.artwork = 'Album artwork is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validate()) {
      onNext()
    }
  }

  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Album Details</h2>
        <p className="text-muted-foreground">
          Create your album by adding a title, description, and artwork.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Album Title</Label>
          <Input
            value={details.title}
            onChange={(e) => onChange({ ...details, title: e.target.value })}
            error={errors.title}
          />
        </div>

        <div>
          <Label>Description</Label>
          <Input
            value={details.description}
            onChange={(e) => onChange({ ...details, description: e.target.value })}
          />
        </div>

        <div>
          <Label>Album Artwork</Label>
          <ImageUpload
            value={details.artwork}
            onChange={(file) => onChange({ ...details, artwork: file })}
            error={errors.artwork}
          />
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleNext}>
          Continue to Upload
        </Button>
      </div>
    </Card>
  )
}
