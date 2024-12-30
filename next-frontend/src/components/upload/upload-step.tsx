
'use client'

import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface UploadStepProps {
  uploadType: 'album' | 'individual'
  onBack: () => void
  onComplete: (files: File[]) => void
  onAlbumCreate?: (id: string) => void
}

export function UploadStep({ uploadType, onBack, onComplete }: UploadStepProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onComplete(acceptedFiles)
  }, [onComplete])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'audio/*': ['.mp3', '.wav', '.aac']
    }
  })

  return (
    <div className="space-y-4">
      <div {...getRootProps()} className="border-2 border-dashed rounded-lg p-12 text-center hover:bg-secondary/50 cursor-pointer">
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 mb-4" />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag & drop audio files here, or click to select files</p>
        )}
      </div>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>Back</Button>
      </div>
    </div>
  )
}
