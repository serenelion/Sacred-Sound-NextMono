'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft, Upload, Music2, AlertCircle } from 'lucide-react'
import { useState } from "react"
import { useDropzone } from "react-dropzone"
import { ContentList } from "./content-list"
import { TechnicalRequirements } from "./technical-requirements"
import { QAProcess } from "./qa-process"
import { TrackDetailsStep } from "./track-details-step";

interface ContentUploadProps {
  uploadType: 'album' | 'individual'
  onBack: () => void
}

export function ContentUpload({ uploadType, onBack }: ContentUploadProps) {
  const [albumDetails, setAlbumDetails] = useState({
    title: '',
    description: '',
    releaseDate: '',
    coverImage: null as File | null
  })
  const [files, setFiles] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)
  const [step, setStep] = useState<'albumDetails' | 'upload' | 'details'>(uploadType === 'album' ? 'albumDetails' : 'upload')

  const handleContinue = () => {
    if (step === 'albumDetails') {
      if (!albumDetails.title || !albumDetails.description) {
        setError('Please fill in all required album details')
        return
      }
      setStep('upload')
    } else if (step === 'upload') {
      if (files.length === 0) {
        setError('Please upload at least one file')
        return
      }
      setStep('details')
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'audio/*': ['.wav', '.flac', '.aiff'],
      'video/*': ['.mp4']
    },
    onDrop: (acceptedFiles) => {
      setFiles(prev => [...prev, ...acceptedFiles.map(file => ({
        id: Math.random().toString(),
        file,
        progress: 0
      }))])
      setError(null)
    },
    onDropRejected: () => {
      setError('Please upload only supported file types')
    }
  })

  return (
    <div className="space-y-8">
      {step === 'albumDetails' ? (
        <>
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Choose Different Upload Type
          </Button>

          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-semibold">Album Details</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="album-title">Album Title *</Label>
                  <Input
                    id="album-title"
                    placeholder="Give your album a meaningful title"
                    value={albumDetails.title}
                    onChange={e => setAlbumDetails(prev => ({
                      ...prev,
                      title: e.target.value
                    }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="album-description">Description *</Label>
                  <Textarea
                    id="album-description"
                    placeholder="Describe the spiritual journey or story behind this collection"
                    value={albumDetails.description}
                    onChange={e => setAlbumDetails(prev => ({
                      ...prev,
                      description: e.target.value
                    }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="release-date">Release Date</Label>
                  <Input
                    id="release-date"
                    type="date"
                    value={albumDetails.releaseDate}
                    onChange={e => setAlbumDetails(prev => ({
                      ...prev,
                      releaseDate: e.target.value
                    }))}
                  />
                </div>
              </div>
              <div className="pt-4">
                <Button onClick={handleContinue} size="lg" className="min-w-[200px]">
                  Continue to Upload
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      ) : step === 'upload' ? (
        <>
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Choose Different Upload Type
          </Button>

          {uploadType === 'album' && (
            <Card>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-semibold">Album Details</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="album-title">Album Title</Label>
                    <Input
                      id="album-title"
                      placeholder="Give your album a meaningful title"
                      value={albumDetails.title}
                      onChange={e => setAlbumDetails(prev => ({
                        ...prev,
                        title: e.target.value
                      }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="album-description">Description</Label>
                    <Textarea
                      id="album-description"
                      placeholder="Describe the spiritual journey or story behind this collection"
                      value={albumDetails.description}
                      onChange={e => setAlbumDetails(prev => ({
                        ...prev,
                        description: e.target.value
                      }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="release-date">Release Date</Label>
                    <Input
                      id="release-date"
                      type="date"
                      value={albumDetails.releaseDate}
                      onChange={e => setAlbumDetails(prev => ({
                        ...prev,
                        releaseDate: e.target.value
                      }))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <TechnicalRequirements />

          <div
            {...getRootProps()}
            className={`
              border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
              ${isDragActive ? 'border-primary bg-primary/10' : 'border-muted-foreground/25 hover:border-primary'}
            `}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center gap-2">
              <Upload className="h-8 w-8 text-muted-foreground" />
              <p className="text-lg font-medium">Share Your Sacred Content</p>
              <p className="text-sm text-muted-foreground max-w-md">
                Drag and drop your files here, or click to browse. We welcome your highest quality
                recordings, videos, and spiritual content.
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
            <ContentList
              files={files}
              isAlbum={uploadType === 'album'}
              onRemove={(id) => setFiles(files => files.filter(f => f.id !== id))}
              onReorder={(newFiles) => setFiles(newFiles)}
            />
          )}

          <QAProcess />

          {files.length > 0 && (
            <div className="flex justify-end">
              <Button size="lg" className="min-w-[200px]" onClick={() => setStep('details')}>
                Continue to Details
              </Button>
            </div>
          )}
        </>
      ) : (
        <TrackDetailsStep 
          files={files}
          isAlbum={uploadType === 'album'}
          albumDetails={uploadType === 'album' ? albumDetails : null}
          onBack={() => setStep('upload')}
        />
      )}
    </div>
  )
}

