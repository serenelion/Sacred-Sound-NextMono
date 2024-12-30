
'use client'

import { createContext, useContext, ReactNode, useState } from 'react'

export type UploadType = 'album' | 'individual' | null

interface UploadFile {
  id: string
  file: File
  name: string
  progress: number
  status: 'pending' | 'uploading' | 'complete' | 'error'
}

interface AlbumDetails {
  title: string
  description: string
  artwork: File | null
  tracks: string[]
}

interface UploadContextType {
  uploadType: UploadType
  setUploadType: (type: UploadType) => void
  files: UploadFile[]
  addFiles: (newFiles: File[]) => void
  removeFile: (index: number) => void
  albumDetails: AlbumDetails
  setAlbumDetails: (details: AlbumDetails) => void
}

const UploadContext = createContext<UploadContextType | undefined>(undefined)

export function UploadProvider({ children }: { children: ReactNode }) {
  const [uploadType, setUploadType] = useState<UploadType>(null)
  const [files, setFiles] = useState<UploadFile[]>([])
  const [albumDetails, setAlbumDetails] = useState<AlbumDetails>({
    title: '',
    description: '',
    artwork: null,
    tracks: []
  })

  const addFiles = (newFiles: File[]) => {
    const uploadedFiles = newFiles.map(file => ({
      file,
      id: crypto.randomUUID(),
      name: file.name,
      progress: 0,
      status: 'pending' as const
    }))
    setFiles(prev => [...prev, ...uploadedFiles])
  }

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <UploadContext.Provider value={{
      uploadType,
      setUploadType,
      albumDetails,
      setAlbumDetails,
      files,
      addFiles,
      removeFile
    }}>
      {children}
    </UploadContext.Provider>
  )
}

export function useUploadContext() {
  const context = useContext(UploadContext)
  if (!context) {
    throw new Error('useUploadContext must be used within an UploadProvider')
  }
  return context
}
