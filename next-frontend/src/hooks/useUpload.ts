
import { useState, useCallback } from 'react'
import { UploadedFile, TrackMetadata } from '@/types/upload'
import { v4 as uuidv4 } from 'uuid'

export const useUpload = () => {
  const [files, setFiles] = useState<UploadedFile[]>([])

  const addFiles = useCallback((newFiles: File[]) => {
    const uploadFiles = newFiles.map(file => ({
      id: uuidv4(),
      file,
      progress: 0,
      status: 'pending' as const,
    }))
    setFiles(prev => [...prev, ...uploadFiles])
  }, [])

  const updateFileProgress = useCallback((id: string, progress: number) => {
    setFiles(prev => prev.map(file => 
      file.id === id ? { ...file, progress, status: 'uploading' } : file
    ))
  }, [])

  const updateFileMetadata = useCallback((id: string, metadata: TrackMetadata) => {
    setFiles(prev => prev.map(file =>
      file.id === id ? { ...file, metadata } : file
    ))
  }, [])

  const removeFile = useCallback((id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id))
  }, [])

  return {
    files,
    addFiles,
    updateFileProgress,
    updateFileMetadata,
    removeFile
  }
}
