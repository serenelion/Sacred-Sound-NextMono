
'use client'

import { PrivateRoute } from '@/components/private-route'

export default function UploadPage() {
  return (
    <PrivateRoute requireArtist={true}>
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4">Upload Content</h1>
        {/* Upload form components will go here */}
      </div>
    </PrivateRoute>
  )
}
