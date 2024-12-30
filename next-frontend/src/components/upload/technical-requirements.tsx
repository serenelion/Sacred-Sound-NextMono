
'use client'

import { Card } from '@/components/ui/card'
import { FileAudio, FileVideo, Info } from 'lucide-react'

export function TechnicalRequirements() {
  return (
    <Card className="p-6 bg-muted/50">
      <div className="flex items-start gap-4">
        <Info className="w-5 h-5 mt-1 text-muted-foreground" />
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Supported Formats</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center gap-2">
                <FileAudio className="w-4 h-4" />
                <span className="text-sm">Audio: WAV, FLAC, MP3, AIFF</span>
              </div>
              <div className="flex items-center gap-2">
                <FileVideo className="w-4 h-4" />
                <span className="text-sm">Video: MP4, MOV</span>
              </div>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            <p>Maximum file sizes:</p>
            <ul className="list-disc list-inside ml-2">
              <li>Albums: 500MB per track</li>
              <li>Individual tracks: 2GB</li>
            </ul>
          </div>
        </div>
      </div>
    </Card>
  )
}
