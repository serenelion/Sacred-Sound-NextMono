
export interface UploadedFile {
  id: string
  file: File
  progress: number
  status: 'pending' | 'uploading' | 'complete' | 'error'
  metadata?: TrackDetails
}

export interface AlbumDetails {
  title: string
  description: string
  releaseDate: string
  visibility?: 'public' | 'private'
}

export interface TrackDetails {
  title: string
  description?: string
  category?: string
  genre?: string[]
  featuredInstruments?: string[]
  primaryInstrument?: string
  language?: string[]
  deity?: string[]
  tradition?: string[]
  vocals?: 'instrumental' | 'male' | 'female' | 'choir' | 'circle'
  albumId?: string
}
