'use client'

import React, { createContext, useContext, useState } from 'react'
import type { UploadType, AlbumDetails, UploadedFile } from '@/types/upload'

interface UploadContextType {
  uploadType: UploadType
  setUploadType: (type: UploadType) => void
  albumDetails: AlbumDetails
  setAlbumDetails: (details: AlbumDetails) => void
  files: UploadedFile[]
  addFiles: (newFiles: File[]) => void
  removeFile: (index: number) => void
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
      file,
      id: crypto.randomUUID(),
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