
export type UploadType = 'album' | 'individual' | null
export type UploadStatus = 'pending' | 'uploading' | 'complete' | 'error'

export interface VocalTypes {
  male: boolean
  female: boolean
  choir: boolean
  circle: boolean
}

export interface UploadedFile {
  id: string
  file: File
  progress: number
  status: UploadStatus
  metadata?: TrackMetadata
}

export interface TrackMetadata {
  title: string
  description: string
  category: string
  genre: string[]
  featuredInstruments: string[]
  primaryInstrument: string
  language: string[]
  deity: string[]
  tradition: string[]
  vocals: 'yes' | 'no'
  vocalTypes: VocalTypes
}

export interface AlbumDetails {
  title: string
  description: string
  artwork: File | null
  tracks: File[]
}
