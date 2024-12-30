
'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface UploadChoiceProps {
  onSelect: (type: 'album' | 'individual') => void
}

export function UploadChoice({ onSelect }: UploadChoiceProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="cursor-pointer" onClick={() => onSelect('album')}>
        <CardContent className="p-6">
          <h3 className="font-medium mb-2">Upload Album</h3>
          <p className="text-sm text-muted-foreground">
            Upload multiple tracks as an album collection
          </p>
        </CardContent>
      </Card>

      <Card className="cursor-pointer" onClick={() => onSelect('individual')}>
        <CardContent className="p-6">
          <h3 className="font-medium mb-2">Upload Individual Tracks</h3>
          <p className="text-sm text-muted-foreground">
            Upload single or multiple tracks individually
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
