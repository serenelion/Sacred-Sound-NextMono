
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { UploadLayout } from '@/components/upload/upload-layout'
import { UploadChoice } from '@/components/upload/upload-choice'
import { AlbumDetailsStep } from '@/components/upload/album-details-step'
import { Button } from '@/components/ui/button'

type UploadType = 'album' | 'individual' | null
type Step = 'choice' | 'details' | 'review'

export default function UploadPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<Step>('choice')
  const [uploadType, setUploadType] = useState<UploadType>(null)
  const [albumDetails, setAlbumDetails] = useState({
    title: '',
    description: '',
    artwork: null as File | null,
    tracks: [] as File[]
  })

  const stepNumber = {
    choice: 1,
    details: 2,
    review: 3
  }[currentStep]

  const handleUploadComplete = async () => {
    try {
      // Here we would integrate with the backend
      // For now just simulate success
      setCurrentStep('review')
    } catch (error) {
      console.error('Upload failed:', error)
    }
  }

  return (
    <UploadLayout step={stepNumber} onClose={() => router.push('/')}>
      {currentStep === 'choice' && (
        <UploadChoice 
          onSelect={(type) => {
            setUploadType(type)
            setCurrentStep('details')
          }}
        />
      )}

      {currentStep === 'details' && uploadType === 'album' && (
        <AlbumDetailsStep
          details={albumDetails}
          onChange={setAlbumDetails}
          onBack={() => setCurrentStep('choice')}
          onNext={handleUploadComplete}
        />
      )}

      {currentStep === 'review' && (
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Upload Complete</h2>
          <p className="text-muted-foreground">
            Your content has been uploaded successfully.
          </p>
          <Button onClick={() => router.push('/library')}>
            Go to Library
          </Button>
        </div>
      )}
    </UploadLayout>
  )
}
