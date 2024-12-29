
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'

export default function UploadPage() {
  const router = useRouter()
  const [step, setStep] = useState<'album'|'tracks'>('album')
  const [albumData, setAlbumData] = useState({
    title: '',
    description: '',
    coverImage: null as File | null,
    isPublic: true
  })
  const [tracks, setTracks] = useState<File[]>([])
  
  const handleAlbumSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement album creation API call
    setStep('tracks')
  }

  const handleTrackUpload = async (files: FileList) => {
    // TODO: Implement track upload logic
    setTracks(Array.from(files))
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Upload Content</h1>
      
      {step === 'album' ? (
        <Card className="p-6">
          <form onSubmit={handleAlbumSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Album Title</Label>
              <Input
                id="title"
                value={albumData.title}
                onChange={(e) => setAlbumData({...albumData, title: e.target.value})}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={albumData.description}
                onChange={(e) => setAlbumData({...albumData, description: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="cover">Cover Image</Label>
              <Input
                id="cover"
                type="file"
                accept="image/*"
                onChange={(e) => setAlbumData({...albumData, coverImage: e.target.files?.[0] || null})}
                required
              />
            </div>

            <Button type="submit">Create Album</Button>
          </form>
        </Card>
      ) : (
        <Card className="p-6">
          <Label htmlFor="tracks">Upload Tracks</Label>
          <Input
            id="tracks"
            type="file"
            accept="audio/*"
            multiple
            onChange={(e) => handleTrackUpload(e.target.files as FileList)}
          />
          
          <div className="mt-4">
            {tracks.map((track, i) => (
              <div key={i} className="py-2">
                {track.name}
              </div>
            ))}
          </div>
          
          <Button onClick={() => setStep('album')} variant="ghost" className="mt-4">
            Back to Album Details
          </Button>
        </Card>
      )}
    </div>
  )
}
