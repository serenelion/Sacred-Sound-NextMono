'use client'

import { useState } from "react"
import { UploadStep } from "./upload-step"
import { TrackDetailsStep } from "./track-details-step"
import { Progress } from "@/components/ui/progress"

type UploadStep = 1 | 2
type UploadedFile = File & { id: string; progress: number }

export function UploadContent() {
  const [currentStep, setCurrentStep] = useState<UploadStep>(1)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [albumId, setAlbumId] = useState<string | null>(null)

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Progress value={currentStep === 1 ? 50 : 100} className="h-2" />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span className={currentStep === 1 ? "text-primary" : ""}>
            1. Upload Content
          </span>
          <span className={currentStep === 2 ? "text-primary" : ""}>
            2. Add Track Details
          </span>
        </div>
      </div>

      {currentStep === 1 ? (
        <UploadStep
          onComplete={(files) => {
            setUploadedFiles(files)
            setCurrentStep(2)
          }}
          onAlbumCreate={(id) => setAlbumId(id)}
        />
      ) : (
        <TrackDetailsStep
          files={uploadedFiles}
          albumId={albumId}
          onBack={() => setCurrentStep(1)}
        />
      )}
    </div>
  )
}

