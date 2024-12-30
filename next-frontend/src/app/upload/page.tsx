
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { UploadLayout } from '@/components/upload/upload-layout'
import { UploadChoice } from '@/components/upload/upload-choice'
import { UploadStep } from '@/components/upload/upload-step'
import { TrackDetailsStep } from '@/components/upload/track-details-step'

type UploadType = 'album' | 'individual' | null
type Step = 'choice' | 'upload' | 'details' | 'review'

export default function UploadPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<Step>('choice')
  const [uploadType, setUploadType] = useState<UploadType>(null)
  const [files, setFiles] = useState<File[]>([])
  const [albumId, setAlbumId] = useState<string | null>(null)

  const stepNumber = {
    choice: 1,
    upload: 2,
    details: 3,
    review: 4
  }[currentStep]

  return (
    <UploadLayout step={stepNumber} onClose={() => router.push('/')}>
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
          onComplete={() => setCurrentStep('review')}
        />
      )}

      {currentStep === 'review' && (
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Ready for Review</h2>
          <p className="text-muted-foreground">
            Your sacred content has been uploaded and will be reviewed by our team.
            We'll notify you once it's approved and available in the library.
          </p>
          <Button onClick={() => router.push('/library')}>
            Go to Library
          </Button>
        </div>
      )}
    </UploadLayout>
  )
}
