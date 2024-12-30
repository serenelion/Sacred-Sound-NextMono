'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Music2, Plus, Upload, X, AlertCircle, Check, Loader2 } from 'lucide-react'
import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { nanoid } from 'nanoid'
import { cn } from "@/lib/utils"

interface UploadStepProps {
  onComplete: (files: any[]) => void
  onAlbumCreate: (albumId: string) => void
}

export function UploadStep({ onComplete, onAlbumCreate }: UploadStepProps) {
  const [isCreatingAlbum, setIsCreatingAlbum] = useState(false)
  const [albumDetails, setAlbumDetails] = useState({
    title: "",
    description: "",
    releaseDate: "",
  })
  const [files, setFiles] = useState<any[]>([])
  const [uploadError, setUploadError] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      id: nanoid(),
      file,
      progress: 0,
      status: 'pending' as const
    }))
    setFiles(prev => [...prev, ...newFiles])
    setUploadError(null)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/wav': ['.wav'],
      'audio/flac': ['.flac'],
      'audio/aiff': ['.aiff'],
      'video/mp4': ['.mp4'],
    },
    multiple: true,
  })

  const removeFile = (id: string) => {
    setFiles(files => files.filter(f => f.id !== id))
  }

  const handleCreateAlbum = () => {
    const albumId = nanoid()
    onAlbumCreate(albumId)
    setIsCreatingAlbum(false)
  }

  const handleUpload = async () => {
    if (files.length === 0) {
      setUploadError("Please select files to upload")
      return
    }

    // Simulate upload progress
    const updatedFiles = [...files]
    for (let i = 0; i < updatedFiles.length; i++) {
      for (let progress = 0; progress <= 100; progress += 10) {
        updatedFiles[i] = { ...updatedFiles[i], progress }
        setFiles([...updatedFiles])
        await new Promise(resolve => setTimeout(resolve, 100))
      }
      updatedFiles[i].status = 'completed'
      setFiles([...updatedFiles])
    }

    onComplete(updatedFiles)
  }

  return (
    <div className="space-y-6">
      <div className="bg-secondary/20 rounded-lg p-6 space-y-4">
        <h2 className="text-lg font-semibold">Technical Requirements</h2>
        <div className="prose prose-sm dark:prose-invert">
          <p>
            Upload your audio/video files. To ensure the highest audio quality for
            your project, all uploaded files must meet the following technical
            standards:
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mt-4">
            <div className="space-y-2">
              <h3 className="text-base font-medium">For audio</h3>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>File type: WAV, FLAC, AIFF</li>
                <li>Bit depth: 16-bit min</li>
                <li>Sample rate: 44.1 kHz min</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-medium">For video</h3>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>File type: MP4</li>
                <li>Highest resolution :)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {!isCreatingAlbum && (
        <Button
          variant="outline"
          onClick={() => setIsCreatingAlbum(true)}
          className="w-full"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Album Before Upload
        </Button>
      )}

      {isCreatingAlbum && (
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Create Album</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCreatingAlbum(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="album-title">Album Title</Label>
                <Input
                  id="album-title"
                  value={albumDetails.title}
                  onChange={e =>
                    setAlbumDetails(prev => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="album-description">Description</Label>
                <Textarea
                  id="album-description"
                  value={albumDetails.description}
                  onChange={e =>
                    setAlbumDetails(prev => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="release-date">Release Date</Label>
                <Input
                  id="release-date"
                  type="date"
                  value={albumDetails.releaseDate}
                  onChange={e =>
                    setAlbumDetails(prev => ({
                      ...prev,
                      releaseDate: e.target.value,
                    }))
                  }
                />
              </div>
              <Button onClick={handleCreateAlbum} className="w-full">
                Create Album
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
          isDragActive
            ? "border-primary bg-primary/10"
            : "border-muted-foreground/25 hover:border-primary"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-2">
          <Upload className="h-8 w-8 text-muted-foreground" />
          <p className="text-sm font-medium">
            Drag & drop files to get started
          </p>
          <p className="text-xs text-muted-foreground">
            Or click to browse files
          </p>
        </div>
      </div>

      {uploadError && (
        <div className="flex items-center gap-2 text-destructive text-sm">
          <AlertCircle className="h-4 w-4" />
          {uploadError}
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
                    <Check className="h-4 w-4 text-green-500" />
                  ) : file.progress > 0 ? (
                    <div className="text-xs text-muted-foreground">
                      {file.progress}%
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

      <div className="flex justify-end gap-4">
        <Button
          onClick={handleUpload}
          disabled={files.length === 0}
          className="min-w-[120px]"
        >
          {files.some(f => f.progress > 0 && f.progress < 100) ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Upload
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

