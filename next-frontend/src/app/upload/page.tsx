
'use client'

import { UploadContent } from '@/components/upload-content'
import { useRouter } from 'next/navigation'

export default function UploadPage() {
  const router = useRouter()
  
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <UploadContent onClose={() => router.push('/')} />
    </div>
  )
}
