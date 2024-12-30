
'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Album, FileMusic } from "lucide-react"

interface UploadChoiceProps {
  onSelect: (type: 'album' | 'individual') => void
}

export function UploadChoice({ onSelect }: UploadChoiceProps) {
  return (
    <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto p-6">
      <Card 
        className="p-6 cursor-pointer hover:border-primary transition-colors"
        onClick={() => onSelect('album')}
      >
        <div className="flex flex-col items-center gap-4 text-center">
          <Album className="w-12 h-12" />
          <h3 className="text-xl font-semibold">Create Album</h3>
          <p className="text-muted-foreground">Upload multiple tracks as an album collection</p>
        </div>
      </Card>

      <Card 
        className="p-6 cursor-pointer hover:border-primary transition-colors"
        onClick={() => onSelect('individual')}
      >
        <div className="flex flex-col items-center gap-4 text-center">
          <FileMusic className="w-12 h-12" />
          <h3 className="text-xl font-semibold">Upload Track</h3>
          <p className="text-muted-foreground">Upload a single audio or video track</p>
        </div>
      </Card>
    </div>
  )
}
