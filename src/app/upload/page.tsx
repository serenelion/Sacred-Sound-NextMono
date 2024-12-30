
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { UploadProvider } from '@/contexts/upload-context'
import { UploadLayout } from '@/components/upload/upload-layout'
import { UploadChoice } from '@/components/upload/upload-choice'
import { UploadStep } from '@/components/upload/upload-step'
import { AlbumDetailsStep } from '@/components/upload/album-details-step'
import { TrackDetailsStep } from '@/components/upload/track-details-step'

type Step = 'choice' | 'upload' | 'details' | 'review'

export default function UploadPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<Step>('choice')

  const stepNumber = {
    choice: 1,
    upload: 2,
    details: 3,
    review: 4
  }[currentStep]

  return (
    <UploadProvider>
      <UploadLayout step={stepNumber} onClose={() => router.push('/')}>
        {currentStep === 'choice' && (
          <UploadChoice onSelect={() => setCurrentStep('upload')} />
        )}

        {currentStep === 'upload' && (
          <UploadStep 
            onBack={() => setCurrentStep('choice')}
            onComplete={() => setCurrentStep('details')}
          />
        )}

        {currentStep === 'details' && (
          <TrackDetailsStep
            onBack={() => setCurrentStep('upload')}
            onComplete={() => setCurrentStep('review')}
          />
        )}

        {currentStep === 'review' && (
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">Upload Complete!</h2>
            <p className="text-muted-foreground">Your content will be reviewed shortly.</p>
          </div>
        )}
      </UploadLayout>
    </UploadProvider>
  )
}
