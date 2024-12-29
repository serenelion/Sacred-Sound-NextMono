
'use client'

import { useState } from 'react'
import { Upload, AlertCircle, Menu, Trash2, ChevronUp, Play, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ReactSelect from 'react-select'
import { UploadStep, UploadedTrack, TrackDetails, AlbumDetails } from '@/app/types'
import { METADATA_OPTIONS, VOCAL_TYPES } from '@/lib/constants'

interface UploadContentProps {
  onClose: () => void
}

export function UploadContent({ onClose }: UploadContentProps) {
  const [currentStep, setCurrentStep] = useState<UploadStep>('upload')
  const [uploadedTracks, setUploadedTracks] = useState<UploadedTrack[]>([])
  const [albumDetails, setAlbumDetails] = useState<AlbumDetails>({
    title: '',
    description: '',
    visibility: 'public'
  })

  const handleFileUpload = (files: FileList) => {
    const newTracks = Array.from(files).map(file => ({
      id: crypto.randomUUID(),
      file,
      name: file.name
    }))
    setUploadedTracks([...uploadedTracks, ...newTracks])
  }

  return (
    <div className="h-screen w-full p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Upload Content</h1>
        <Button variant="ghost" onClick={onClose}>
          <X className="h-6 w-6" />
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div 
            className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-12 rounded-lg"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault()
              handleFileUpload(e.dataTransfer.files)
            }}
          >
            <Upload className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-lg mb-2">Drag and drop your files here</p>
            <p className="text-sm text-gray-500 mb-4">or</p>
            <Input
              type="file"
              multiple
              accept="audio/*,video/*"
              className="max-w-xs"
              onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
            />
          </div>

          {uploadedTracks.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Uploaded Files</h3>
              {uploadedTracks.map(track => (
                <div key={track.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-2">
                  <span>{track.name}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setUploadedTracks(uploadedTracks.filter(t => t.id !== track.id))}
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
