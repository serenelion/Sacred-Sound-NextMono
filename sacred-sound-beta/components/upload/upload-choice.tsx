'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Album, FileAudio2 } from 'lucide-react'
import { useState } from "react"
import { ContentUpload } from "./content-upload"

export function UploadChoice() {
  const [uploadType, setUploadType] = useState<'album' | 'individual' | null>(null)

  if (uploadType) {
    return <ContentUpload uploadType={uploadType} onBack={() => setUploadType(null)} />
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="cursor-pointer hover:border-primary transition-colors" onClick={() => setUploadType('album')}>
        <CardHeader>
          <Album className="w-8 h-8 mb-2 text-primary" />
          <CardTitle>Create an Album</CardTitle>
          <CardDescription>
            Upload multiple pieces of content as a cohesive collection. Perfect for concert recordings,
            workshop series, or themed content collections.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="secondary" className="w-full">Start Album Creation</Button>
        </CardContent>
      </Card>

      <Card className="cursor-pointer hover:border-primary transition-colors" onClick={() => setUploadType('individual')}>
        <CardHeader>
          <FileAudio2 className="w-8 h-8 mb-2 text-primary" />
          <CardTitle>Upload Individual Content</CardTitle>
          <CardDescription>
            Share individual pieces like mantras, meditation guides, or behind-the-scenes content.
            Each piece will be reviewed and published separately.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="secondary" className="w-full">Upload Content</Button>
        </CardContent>
      </Card>
    </div>
  )
}

