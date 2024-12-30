
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Toaster } from 'sonner'
import { UploadChoice } from '@/components/upload/upload-choice'
import { UploadStep } from '@/components/upload/upload-step'
import { TrackDetailsStep } from '@/components/upload/track-details-step'
import { AlbumDetailsStep } from '@/components/upload/album-details-step'

type UploadType = 'album' | 'individual' | null
type Step = 'choice' | 'upload' | 'album-details' | 'track-details' | 'complete'

export default function UploadPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<Step>('choice')
  const [uploadType, setUploadType] = useState<UploadType>(null)
  const [files, setFiles] = useState<File[]>([])
  const [albumId, setAlbumId] = useState<string | null>(null)

  const handleComplete = () => {
    router.push('/library')
  }

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      
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
          onBack={() => {
            setUploadType(null)
            setCurrentStep('choice')
          }}
          onComplete={(uploadedFiles) => {
            setFiles(uploadedFiles)
            setCurrentStep(uploadType === 'album' ? 'album-details' : 'track-details')
          }}
        />
      )}

      {currentStep === 'album-details' && (
        <AlbumDetailsStep
          onBack={() => setCurrentStep('upload')}
          onComplete={(id) => {
            setAlbumId(id)
            setCurrentStep('track-details')
          }}
        />
      )}

      {currentStep === 'track-details' && (
        <TrackDetailsStep
          files={files}
          albumId={albumId}
          onBack={() => setCurrentStep(uploadType === 'album' ? 'album-details' : 'upload')}
          onComplete={handleComplete}
        />
      )}
    </div>
  )
}
