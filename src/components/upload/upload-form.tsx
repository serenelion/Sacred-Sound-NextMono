
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface UploadFormProps {
  onSubmit: (data: any) => void
}

export function UploadForm({ onSubmit }: UploadFormProps) {
  const [isAlbum, setIsAlbum] = useState(false)
  const [files, setFiles] = useState<File[]>([])

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <Button 
          variant={isAlbum ? 'default' : 'outline'}
          onClick={() => setIsAlbum(true)}
        >
          Create Album
        </Button>
        <Button 
          variant={!isAlbum ? 'default' : 'outline'}
          onClick={() => setIsAlbum(false)}
        >
          Upload Track
        </Button>
      </div>

      <div className="border-2 border-dashed rounded-lg p-8 text-center">
        <input 
          type="file" 
          multiple={isAlbum}
          accept="audio/*"
          onChange={(e) => setFiles(Array.from(e.target.files || []))}
        />
      </div>
    </div>
  )
}
