
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
      <Card className="cursor-pointer hover:border-primary transition-colors" onClick={() => onSelect('album')}>
        <CardHeader>
          <Album className="w-8 h-8 mb-2 text-primary" />
          <CardTitle>Create an Album</CardTitle>
          <CardDescription>
            Bundle related tracks together into a cohesive collection. Perfect for live recordings, 
            concert series, or themed spiritual content.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="secondary" className="w-full">Create Album</Button>
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
