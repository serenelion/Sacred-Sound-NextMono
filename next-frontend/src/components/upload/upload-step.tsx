'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Music2, Upload, X, Check, AlertCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface UploadStepProps {
  uploadType: 'album' | 'individual'
  onBack: () => void
  onComplete: (files: File[]) => void
  onAlbumCreate?: (id: string) => void
}

export function UploadStep({ uploadType, onBack, onComplete }: UploadStepProps) {
  const [files, setFiles] = useState<Array<{id: string, file: File, progress: number, status: string}>>([])
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      id: Math.random().toString(36).slice(2),
      file,
      progress: 0,
      status: 'pending'
    }))
    setFiles(prev => [...prev, ...newFiles])
    onComplete(acceptedFiles)
  }, [onComplete])

  const removeFile = (id: string) => {
    setFiles(files => files.filter(f => f.id !== id))
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'audio/*': ['.mp3', '.wav', '.aiff', '.flac'],
      'video/*': ['.mp4', '.mov']
    },
    maxSize: uploadType === 'album' ? 500 * 1024 * 1024 : 2 * 1024 * 1024 * 1024
  })

  return (
    <div className="space-y-6">
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
          isDragActive ? "border-primary bg-primary/10" : "border-muted-foreground/25 hover:border-primary"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-2">
          <Upload className="h-8 w-8 text-muted-foreground" />
          <p className="text-lg font-medium">Share Your Sacred Sound</p>
          <p className="text-sm text-muted-foreground max-w-md">
            {uploadType === 'album' 
              ? "Create your album by uploading tracks (WAV, FLAC, MP3). Maximum 500MB per file."
              : "Share your spiritual content (audio or video). Maximum 2GB per file."}
          </p>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-destructive text-sm">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}

      {files.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Selected Files</h3>
          <div className="space-y-2">
            {files.map(file => (
              <div
                key={file.id}
                className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Music2 className="h-4 w-4" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{file.file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(file.file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {file.status === 'completed' ? (
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-xs text-green-500">Complete</span>
                    </div>
                  ) : file.progress > 0 ? (
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary transition-all duration-300" 
                          style={{ width: `${file.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {file.progress}%
                      </span>
                    </div>
                  ) : (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFile(file.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button 
          onClick={() => onComplete(files.map(f => f.file))}
          disabled={files.length === 0}
        >
          Continue
        </Button>
      </div>
    </div>
  )
}