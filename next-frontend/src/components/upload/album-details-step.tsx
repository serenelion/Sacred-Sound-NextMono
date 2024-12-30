
'use client'

import { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { ImageUpload } from "@/components/ui/image-upload"
import { Music2, Upload, GripVertical } from 'lucide-react'

interface AlbumDetailsStepProps {
  details: {
    title: string
    description: string
    artwork: File | null
    tracks: File[]
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
    if (details.tracks.length === 0) newErrors.tracks = 'At least one track is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('audio/') || file.name.endsWith('.wav') || file.name.endsWith('.flac')
    )
    onChange({ ...details, tracks: [...details.tracks, ...files] })
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      onChange({ ...details, tracks: [...details.tracks, ...files] })
    }
  }

  const handleTrackReorder = (result: any) => {
    if (!result.destination) return
    
    const tracks = Array.from(details.tracks)
    const [reorderedTrack] = tracks.splice(result.source.index, 1)
    tracks.splice(result.destination.index, 0, reorderedTrack)
    
    onChange({ ...details, tracks })
  }

  const removeTrack = (index: number) => {
    const tracks = details.tracks.filter((_, i) => i !== index)
    onChange({ ...details, tracks })
  }

  return (
    <Card className="p-6 space-y-6">
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

        <div>
          <Label>Tracks</Label>
          <div 
            className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors"
            onDrop={handleFileDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => document.getElementById('track-upload')?.click()}
          >
            <Upload className="w-8 h-8 mx-auto text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">Drag and drop tracks or click to browse</p>
            <input
              id="track-upload"
              type="file"
              className="hidden"
              multiple
              accept="audio/*,.wav,.flac"
              onChange={handleFileSelect}
            />
          </div>
          {errors.tracks && <p className="text-sm text-red-500 mt-1">{errors.tracks}</p>}
        </div>

        <DragDropContext onDragEnd={handleTrackReorder}>
          <Droppable droppableId="tracks">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                {details.tracks.map((file, index) => (
                  <Draggable key={file.name} draggableId={file.name} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div {...provided.dragHandleProps}>
                            <GripVertical className="h-4 w-4 text-gray-400" />
                          </div>
                          <Music2 className="h-4 w-4" />
                          <span className="text-sm font-medium">{file.name}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeTrack(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={() => {
          if (validate()) onNext()
        }}>
          Continue to Review
        </Button>
      </div>
    </Card>
  )
}
