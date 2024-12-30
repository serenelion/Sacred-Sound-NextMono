
'use client'

import { createContext, useContext, useState } from 'react'
import { UploadType, UploadStatus, AlbumDetails, UploadedFile } from '@/types/upload'

interface UploadContextType {
  uploadType: UploadType
  setUploadType: (type: UploadType) => void
  files: UploadedFile[]
  addFiles: (newFiles: File[]) => void
  removeFile: (id: string) => void
  albumDetails: AlbumDetails
  setAlbumDetails: (details: AlbumDetails) => void
}

const UploadContext = createContext<UploadContextType | undefined>(undefined)

export function UploadProvider({ children }: { children: React.ReactNode }) {
  const [uploadType, setUploadType] = useState<UploadType>(null)
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [albumDetails, setAlbumDetails] = useState<AlbumDetails>({
    title: '',
    description: '',
    artwork: null,
    tracks: []
  })

  const addFiles = (newFiles: File[]) => {
    const uploadedFiles = newFiles.map(file => ({
      id: crypto.randomUUID(),
      file,
      progress: 0,
      status: 'pending' as UploadStatus
    }))
    setFiles(prev => [...prev, ...uploadedFiles])
  }

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id))
  }

  return (
    <UploadContext.Provider value={{
      uploadType,
      setUploadType,
      files,
      addFiles,
      removeFile,
      albumDetails,
      setAlbumDetails
    }}>
      {children}
    </UploadContext.Provider>
  )
}

export function useUpload() {
  const context = useContext(UploadContext)
  if (!context) throw new Error('useUpload must be used within UploadProvider')
  return context
}
