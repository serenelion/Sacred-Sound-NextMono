
import { createContext, useContext, ReactNode, useState } from 'react'
import { UploadType, AlbumDetails } from '@/types/upload'

interface UploadContextType {
  uploadType: UploadType
  setUploadType: (type: UploadType) => void
  albumDetails: AlbumDetails
  setAlbumDetails: (details: AlbumDetails) => void
  files: {
    files: File[]
    addFiles: (files: File[]) => void
    removeFile: (index: number) => void
  }
}

const UploadContext = createContext<UploadContextType | null>(null)

export function UploadProvider({ children }: { children: ReactNode }) {
  const [uploadType, setUploadType] = useState<UploadType>(null)
  const [files, setFiles] = useState<File[]>([])
  const [albumDetails, setAlbumDetails] = useState<AlbumDetails>({
    title: '',
    description: '',
    artwork: null,
    tracks: []
  })

  const addFiles = (newFiles: File[]) => {
    setFiles(prev => [...prev, ...newFiles])
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
      files: {
        files,
        addFiles,
        removeFile
      }
    }}>
      {children}
    </UploadContext.Provider>
  )
}

export function useUploadContext() {
  const context = useContext(UploadContext)
  if (!context) throw new Error('useUploadContext must be used within UploadProvider')
  return context
}
