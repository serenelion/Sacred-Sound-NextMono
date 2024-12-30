
'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useUpload } from '@/contexts/upload-context'

export function TrackDetailsStep({ onBack }: { onBack: () => void }) {
  const { albumDetails, setAlbumDetails } = useUpload()
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [trackDetails, setTrackDetails] = useState<Record<string, any>[]>(
    albumDetails.tracks.map(() => ({
      title: '',
      description: '',
      category: '',
      genre: [],
      primaryInstrument: '',
      language: [],
      vocals: 'no',
      vocalTypes: {
        male: false,
        female: false,
        choir: false,
        circle: false
      }
    }))
  )

  const currentTrack = albumDetails.tracks[currentTrackIndex]
  const currentDetails = trackDetails[currentTrackIndex]

  const updateCurrentTrack = (updates: Partial<Record<string, any>>) => {
    const updatedDetails = [...trackDetails]
    updatedDetails[currentTrackIndex] = { ...currentDetails, ...updates }
    setTrackDetails(updatedDetails)
  }

  return (
    <Card className="p-6 space-y-6">
      <div className="text-lg font-medium">
        Track {currentTrackIndex + 1} of {albumDetails.tracks.length}
      </div>

      <div className="space-y-4">
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

        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={onBack}
            disabled={currentTrackIndex === 0}
          >
            Back
          </Button>
          <Button
            onClick={() => {
              if (currentTrackIndex < albumDetails.tracks.length - 1) {
                setCurrentTrackIndex(prev => prev + 1)
              }
            }}
          >
            {currentTrackIndex === albumDetails.tracks.length - 1 ? 'Finish' : 'Next Track'}
          </Button>
        </div>
      </div>
    </Card>
  )
}
