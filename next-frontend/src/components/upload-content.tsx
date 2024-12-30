
'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { UploadStep } from './upload/upload-step'
import { UploadChoice } from './upload/upload-choice'
import { TrackDetailsStep } from './upload/track-details-step'

interface UploadContentProps {
  onClose?: () => void
}

type Step = 'choice' | 'upload' | 'details' | 'review'

export function UploadContent({ onClose }: UploadContentProps) {
  const [currentStep, setCurrentStep] = useState<Step>('choice')
  const [uploadType, setUploadType] = useState<'album' | 'individual' | null>(null)
  const [files, setFiles] = useState<File[]>([])
  const [albumId, setAlbumId] = useState<string | null>(null)

  const progressValue = {
    choice: 25,
    upload: 50,
    details: 75,
    review: 100
  }[currentStep]

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <Progress 
            value={progressValue}
            className="h-2 w-[200px]" 
          />
          <div className="text-sm text-muted-foreground">
            Step {
              currentStep === 'choice' ? '1' :
              currentStep === 'upload' ? '2' :
              currentStep === 'details' ? '3' : '4'
            } of 4
          </div>
        </div>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        )}
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
          uploadType={uploadType!}
          onBack={() => setCurrentStep('upload')}
          onComplete={() => setCurrentStep('review')}
        />
      )}

      {currentStep === 'review' && (
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Ready for Review</h2>
          <p className="text-muted-foreground">
            Your content has been uploaded and will be reviewed by our team.
            We'll notify you once it's approved.
          </p>
          <Button onClick={() => window.location.href = '/library'}>
            Go to Library
          </Button>
        </div>
      )}
    </div>
  )
}
