
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { UploadLayout } from '@/components/upload/upload-layout'
import { UploadChoice } from '@/components/upload/upload-choice'
import { AlbumDetailsStep } from '@/components/upload/album-details-step'
import { TrackDetailsStep } from '@/components/upload/track-details-step'

type UploadType = 'album' | 'individual' | null
type Step = 'choice' | 'details' | 'review'

export default function UploadPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<Step>('choice')
  const [uploadType, setUploadType] = useState<UploadType>(null)
  const [files, setFiles] = useState<File[]>([])
  const [albumId, setAlbumId] = useState<string | null>(null)
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

  const handleNext = async (step: Step) => {
    if (step === 'review' && uploadType === 'album') {
      // Upload album data and tracks
      const albumRes = await createAlbum(albumDetails)
      setAlbumId(albumRes.result.albumId)
      
      if (albumDetails.artwork) {
        await uploadAlbumArtwork(albumRes.result.albumId, albumDetails.artwork)
      }

      // Upload tracks in order
      const uploads = await Promise.all(
        albumDetails.tracks.map(file => uploadTrack(file))
      )
    }
    
    setCurrentStep(step)
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
          onNext={() => setCurrentStep('review')}
        />
      )}

      {currentStep === 'review' && (
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Ready for Review</h2>
          <p className="text-muted-foreground">
            Your sacred content has been uploaded and will be reviewed by our team.
          </p>
          <Button onClick={() => router.push('/library')}>
            Go to Library
          </Button>
        </div>
      )}
    </UploadLayout>
  )
}
