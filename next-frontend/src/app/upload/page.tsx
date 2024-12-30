
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { UploadLayout } from '@/components/upload/upload-layout'
import { UploadChoice } from '@/components/upload/upload-choice'
import { UploadStep } from '@/components/upload/upload-step'
import { AlbumDetailsStep } from '@/components/upload/album-details-step'
import { TrackDetailsStep } from '@/components/upload/track-details-step'

type UploadType = 'album' | 'individual' | null
type Step = 'choice' | 'album-details' | 'upload' | 'track-details' | 'review'

export default function UploadPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<Step>('choice')
  const [uploadType, setUploadType] = useState<UploadType>(null)
  const [files, setFiles] = useState<File[]>([])
  const [albumId, setAlbumId] = useState<string | null>(null)
  const [albumDetails, setAlbumDetails] = useState({
    title: '',
    description: '',
    artwork: null as File | null
  })

  const stepNumber = {
    choice: 1,
    'album-details': 2,
    upload: uploadType === 'album' ? 3 : 2,
    'track-details': uploadType === 'album' ? 4 : 3,
    review: uploadType === 'album' ? 5 : 4
  }[currentStep]

  const handleNext = async (step: Step) => {
    if (step === 'upload' && uploadType === 'album' && !albumDetails.title) {
      setCurrentStep('album-details')
      return
    }
    
    if (step === 'upload' && uploadType === 'album') {
      // Create album first
      const albumRes = await createAlbum(albumDetails)
      setAlbumId(albumRes.result.albumId)
      
      // Upload artwork if exists
      if (albumDetails.artwork) {
        await uploadAlbumArtwork(albumRes.result.albumId, albumDetails.artwork)
      }
    }

    if (step === 'track-details') {
      // Upload all files first
      const uploads = await Promise.all(
        files.map(file => uploadTrack(file))
      )
      // Store video IDs
      setFiles(files.map((file, i) => ({
        ...file,
        videoId: uploads[i].videoId
      })))
    }
    
    setCurrentStep(step)
  }

  return (
    <UploadLayout step={stepNumber} onClose={() => router.push('/')}>
      {currentStep === 'choice' && (
        <UploadChoice 
          onSelect={(type) => {
            setUploadType(type)
            handleNext(type === 'album' ? 'album-details' : 'upload')
          }}
        />
      )}

      {currentStep === 'album-details' && (
        <AlbumDetailsStep
          details={albumDetails}
          onChange={setAlbumDetails}
          onBack={() => setCurrentStep('choice')}
          onNext={() => setCurrentStep('upload')}
        />
      )}

      {currentStep === 'upload' && uploadType && (
        <UploadStep
          uploadType={uploadType}
          albumDetails={uploadType === 'album' ? albumDetails : undefined}
          onBack={() => setCurrentStep(uploadType === 'album' ? 'album-details' : 'choice')}
          onComplete={(uploadedFiles) => {
            setFiles(uploadedFiles)
            setCurrentStep('track-details')
          }}
          onAlbumCreate={setAlbumId}
        />
      )}

      {currentStep === 'track-details' && (
        <TrackDetailsStep
          files={files}
          albumId={albumId}
          albumDetails={uploadType === 'album' ? albumDetails : undefined}
          onBack={() => setCurrentStep('upload')}
          onComplete={() => setCurrentStep('review')}
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
