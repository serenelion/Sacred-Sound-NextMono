
'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { TrackDetails } from '@/app/types'

interface TrackDetailsStepProps {
  files: File[]
  albumId: string | null
  onBack: () => void
}

export function TrackDetailsStep({ files, albumId, onBack }: TrackDetailsStepProps) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [trackDetails, setTrackDetails] = useState<TrackDetails[]>(
    files.map(() => ({
      title: '',
      description: '',
      visibility: 'public',
      category: '',
      genre: [],
      featuredInstruments: [],
      primaryInstrument: '',
      language: [],
      mood: '',
      deity: [],
      vibe: [],
      tradition: [],
      vocals: 'no',
      vocalTypes: {
        male: false,
        female: false,
        choir: false,
        circle: false
      }
    }))
  )

  const currentTrack = files[currentTrackIndex]
  const currentDetails = trackDetails[currentTrackIndex]

  const updateCurrentTrack = (updates: Partial<TrackDetails>) => {
    setTrackDetails(prev => prev.map((track, i) => 
      i === currentTrackIndex ? { ...track, ...updates } : track
    ))
  }

  return (
    <div className="space-y-6">
      <Button variant="outline" onClick={onBack}>Back</Button>
      
      <div className="text-lg font-medium">
        Track {currentTrackIndex + 1} of {files.length}
      </div>

      <Card className="p-6">
        <form className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input 
              value={currentDetails.title}
              onChange={(e) => updateCurrentTrack({ title: e.target.value })}
              placeholder="Track title"
            />
          </div>

          <div>
            <Label>Description</Label>
            <Input 
              value={currentDetails.description}
              onChange={(e) => updateCurrentTrack({ description: e.target.value })}
              placeholder="Track description"
            />
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              disabled={currentTrackIndex === 0}
              onClick={() => setCurrentTrackIndex(prev => prev - 1)}
            >
              Previous Track
            </Button>
            <Button
              onClick={() => {
                if (currentTrackIndex < files.length - 1) {
                  setCurrentTrackIndex(prev => prev + 1)
                }
              }}
            >
              {currentTrackIndex === files.length - 1 ? 'Finish' : 'Next Track'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
