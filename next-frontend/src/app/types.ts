
export type UploadStep = 'upload' | 'album-details' | 'track-details'

export interface UploadedTrack {
  id: string
  file: File
  name: string
  error?: string | null
}

export interface AlbumDetails {
  title: string
  description: string
  visibility: 'public' | 'private'
}

export interface TrackDetails {
  title: string
  description: string
  visibility: 'public' | 'private'
  category: string
  genre: string[]
  featuredInstruments: string[]
  primaryInstrument: string
  language: string[]
  mood: string
  deity: string[]
  vibe: string[]
  tradition: string[]
  vocals: 'yes' | 'no'
  vocalTypes: {
    male: boolean
    female: boolean
    choir: boolean
    circle: boolean
  }
}
