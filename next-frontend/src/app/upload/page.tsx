
'use client'

import { UploadChoice } from "@/components/upload/upload-choice"
import { ContentUpload } from "@/components/upload/content-upload"
import { UploadProvider } from "@/contexts/upload-context"
import { useState } from "react"

export default function UploadPage() {
  const [uploadType, setUploadType] = useState<'album' | 'individual' | null>(null)

  return (
    <UploadProvider>
      <main className="container mx-auto p-6 max-w-5xl">
        {!uploadType ? (
          <UploadChoice onSelect={setUploadType} />
        ) : (
          <ContentUpload 
            uploadType={uploadType} 
            onBack={() => setUploadType(null)} 
          />
        )}
      </main>
    </UploadProvider>
  )
}
