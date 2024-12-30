
'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface UploadStepProps {
  onBack: () => void
  onComplete: () => void
}

export function UploadStep({ onBack, onComplete }: UploadStepProps) {
  const [files, setFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleUpload = async () => {
    setUploading(true)
    
    for (const file of files) {
      const formData = new FormData()
      formData.append('file', file)
      
      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        })
        
        if (!res.ok) throw new Error('Upload failed')
        
        setProgress((prev) => prev + (100 / files.length))
      } catch (error) {
        console.error('Upload error:', error)
      }
    }
    
    setUploading(false)
    onComplete()
  }

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const droppedFiles = Array.from(e.dataTransfer.files)
    setFiles(droppedFiles)
  }

  return (
    <div className="space-y-4">
      <Card
        className="border-2 border-dashed p-6 text-center cursor-pointer"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleFileDrop}
      >
        <div className="space-y-2">
          <p>Drag and drop files or click to browse</p>
          <input 
            type="file"
            multiple
            onChange={(e) => setFiles(Array.from(e.target.files || []))}
            className="hidden"
          />
        </div>
      </Card>

      {files.length > 0 && (
        <div className="space-y-4">
          <ul className="space-y-2">
            {files.map((file) => (
              <li key={file.name}>{file.name}</li>
            ))}
          </ul>

          {uploading && <Progress value={progress} className="h-2" />}

          <div className="flex justify-between">
            <Button variant="outline" onClick={onBack}>Back</Button>
            <Button onClick={handleUpload} disabled={uploading}>
              {uploading ? 'Uploading...' : 'Continue'}  
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
