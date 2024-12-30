
'use client'

import { useState } from 'react'
import { Upload, AlertCircle, Menu, Trash2, ChevronUp, Play, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { UploadStep } from './upload/upload-step'
import { UploadChoice } from './upload/upload-choice'
import { TrackDetailsStep } from './upload/track-details-step'

interface UploadContentProps {
  onClose: () => void
}

type Step = 'choice' | 'upload' | 'details'

export function UploadContent({ onClose }: UploadContentProps) {
  const [currentStep, setCurrentStep] = useState<Step>('choice')
  const [uploadType, setUploadType] = useState<'album' | 'individual' | null>(null)
  const [files, setFiles] = useState<any[]>([])
  const [albumId, setAlbumId] = useState<string | null>(null)

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <Progress 
            value={
              currentStep === 'choice' ? 33 :
              currentStep === 'upload' ? 66 : 100
            } 
            className="h-2 w-[200px]" 
          />
          <div className="text-sm text-muted-foreground">
            Step {currentStep === 'choice' ? 1 : currentStep === 'upload' ? 2 : 3} of 3
          </div>
        </div>
        <Button variant="ghost" onClick={onClose}>
          <X className="h-6 w-6" />
        </Button>
      </div>

      {currentStep === 'choice' && (
        <UploadChoice 
          onSelect={(type) => {
            setUploadType(type)
            setCurrentStep('upload')
          }}
        />
      )}

      {currentStep === 'upload' && uploadType && (
        <UploadStep
          uploadType={uploadType}
          onBack={() => setCurrentStep('choice')}
          onComplete={(uploadedFiles) => {
            setFiles(uploadedFiles)
            setCurrentStep('details')
          }}
          onAlbumCreate={setAlbumId}
        />
      )}

      {currentStep === 'details' && (
        <TrackDetailsStep
          files={files}
          albumId={albumId}
          onBack={() => setCurrentStep('upload')}
        />
      )}
    </div>
  )
}
