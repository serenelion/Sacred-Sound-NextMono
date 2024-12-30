
'use client'

import { useState } from 'react'
import { useUpload } from '@/hooks/useUpload'
import { UploadStep } from './upload-step'
import { TrackDetailsStep } from './track-details-step'
import { AlbumDetailsStep } from './album-details-step'

export function ContentUpload({ 
  uploadType, 
  onBack 
}: { 
  uploadType: 'album' | 'individual'
  onBack: () => void 
}) {
  const [step, setStep] = useState<'upload' | 'details'>('upload')
  const { files, isUploading, error, addFiles, uploadAlbum, removeFile } = useUpload()

  const handleUploadComplete = async (albumDetails?: any) => {
    if (uploadType === 'album' && albumDetails) {
      try {
        await uploadAlbum(albumDetails)
        // Handle success (e.g., redirect or show success message)
      } catch (error) {
        // Handle error
      }
    }
  }

  return (
    <div className="space-y-8">
      {step === 'upload' && (
        <UploadStep
          files={files}
          onAddFiles={addFiles}
          onRemoveFile={removeFile}
          onContinue={() => setStep('details')}
        />
      )}

      {step === 'details' && uploadType === 'album' && (
        <AlbumDetailsStep
          files={files}
          onBack={() => setStep('upload')}
          onComplete={handleUploadComplete}
          isUploading={isUploading}
          error={error}
        />
      )}

      {step === 'details' && uploadType === 'individual' && (
        <TrackDetailsStep
          files={files}
          onBack={() => setStep('upload')}
          onComplete={handleUploadComplete}
          isUploading={isUploading}
          error={error}
        />
      )}
    </div>
  )
}
