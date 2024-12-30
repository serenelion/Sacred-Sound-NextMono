
import { useState } from 'react'
import { UploadedFile, AlbumDetails, TrackDetails } from '@/types/upload'

export const useUpload = () => {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const addFiles = (newFiles: File[]) => {
    const uploadFiles = newFiles.map(file => ({
      id: crypto.randomUUID(),
      file,
      progress: 0,
      status: 'pending' as const
    }))
    setFiles(prev => [...prev, ...uploadFiles])
  }

  const uploadAlbum = async (albumDetails: AlbumDetails) => {
    setIsUploading(true)
    setError(null)
    
    try {
      // Create album
      const albumResponse = await fetch('/api/upload/createAlbum', {
        method: 'POST',
        body: JSON.stringify(albumDetails)
      })
      const album = await albumResponse.json()
      
      // Upload tracks
      for (const file of files) {
        const formData = new FormData()
        formData.append('file', file.file)
        
        const trackResponse = await fetch('/api/upload/uploadTrack', {
          method: 'POST',
          body: formData
        })
        
        if (!trackResponse.ok) throw new Error('Failed to upload track')
        
        setFiles(prev => prev.map(f => 
          f.id === file.id ? { ...f, status: 'completed', progress: 100 } : f
        ))
      }
      
      return album
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
      throw err
    } finally {
      setIsUploading(false)
    }
  }

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id))
  }

  return {
    files,
    isUploading,
    error,
    addFiles,
    uploadAlbum,
    removeFile
  }
}
