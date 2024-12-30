
export type UploadType = 'album' | 'individual' | null

export interface VocalTypes {
  male: boolean
  female: boolean
  choir: boolean
  circle: boolean
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

export interface UploadedFile {
  id: string
  file: File
  progress: number
  status: 'pending' | 'uploading' | 'completed' | 'error'
  metadata?: TrackMetadata
}

export interface AlbumDetails {
  title: string
  description: string
  artwork: File | null
  tracks: UploadedFile[]
}
