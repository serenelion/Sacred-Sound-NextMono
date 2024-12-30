
'use client'

import { UploadContent } from '@/components/upload-content'
import { useRouter } from 'next/navigation'

export default function UploadPage() {
  const router = useRouter()
  
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="container max-w-7xl px-4 py-8">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Share Your Sacred Content</h1>
          <UploadContent onClose={() => router.push('/')} />
        </div>
      </div>
    </div>
  )
}
