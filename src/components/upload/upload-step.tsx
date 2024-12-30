
'use client'

import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from "@/components/ui/button"
import { Upload } from 'lucide-react'
import { useUploadContext } from '@/contexts/upload-context'

interface UploadStepProps {
  onBack: () => void
  onComplete: () => void
}

export function UploadStep({ onBack, onComplete }: UploadStepProps) {
  const { addFiles, files, removeFile } = useUploadContext()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    addFiles(acceptedFiles)
  }, [addFiles])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div className="space-y-6">
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer
          ${isDragActive ? 'border-primary bg-primary/5' : 'border-border'}`}
      >
        <input {...getInputProps()} />
        <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
        <p className="text-muted-foreground">
          Drag and drop files here, or click to select files
        </p>
      </div>

      {files.length > 0 && (
        <div className="space-y-4">
          {files.map(file => (
            <div key={file.id} className="flex items-center justify-between p-4 border rounded-lg">
              <span>{file.name}</span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => removeFile(file.id)}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-between">
        <Button variant="ghost" onClick={onBack}>Back</Button>
        <Button 
          onClick={onComplete}
          disabled={files.length === 0}
        >
          Continue
        </Button>
      </div>
    </div>
  )
}
