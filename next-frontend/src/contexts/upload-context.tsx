
'use client'

import { createContext, useContext, useState } from 'react'
import { AlbumDetails, TrackDetails, UploadedFile } from '@/types/upload'
import { createAlbum, uploadTrack, updateTrackDetails } from '@/lib/api'

interface UploadContextType {
  files: UploadedFile[]
  albumDetails: AlbumDetails | null
  currentTrackIndex: number
  addFiles: (newFiles: File[]) => void
  removeFile: (id: string) => void
  setAlbumDetails: (details: AlbumDetails) => void
  setCurrentTrackIndex: (index: number) => void
  uploadAlbum: () => Promise<void>
}

const UploadContext = createContext<UploadContextType | undefined>(undefined)

export function UploadProvider({ children }: { children: React.ReactNode }) {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [albumDetails, setAlbumDetails] = useState<AlbumDetails | null>(null)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)

  const addFiles = (newFiles: File[]) => {
    const uploadFiles = newFiles.map(file => ({
      id: crypto.randomUUID(),
      file,
      progress: 0,
      status: 'pending' as const
    }))
    setFiles(prev => [...prev, ...uploadFiles])
  }

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id))
  }

  const uploadAlbum = async () => {
    if (!albumDetails) return

    // Create album first
    const album = await createAlbum(albumDetails)
    
    // Upload each track
    for (const file of files) {
      const uploadedTrack = await uploadTrack(file.file)
      await updateTrackDetails(uploadedTrack.id, {
        albumId: album.id,
        title: file.file.name,
      })
    }
  }

  return (
    <UploadContext.Provider value={{
      files,
      albumDetails,
      currentTrackIndex,
      addFiles,
      removeFile,
      setAlbumDetails,
      setCurrentTrackIndex,
      uploadAlbum
    }}>
      {children}
    </UploadContext.Provider>
  )
}

export const useUpload = () => {
  const context = useContext(UploadContext)
  if (!context) throw new Error('useUpload must be used within UploadProvider')
  return context
}
