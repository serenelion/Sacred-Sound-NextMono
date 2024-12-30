
export type UploadType = 'album' | 'individual' | null

export interface AlbumDetails {
  title: string
  description: string
  artwork: File | null
  tracks: string[]
}

export interface UploadedFile {
  id: string
  file: File
  progress: number
  status: 'pending' | 'uploading' | 'complete' | 'error'
}
