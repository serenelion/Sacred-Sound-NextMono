
export type Step = 'choice' | 'album-details' | 'review'

export interface AlbumDetails {
  title: string
  description: string
  artwork: File | null
  tracks: File[]
  visibility: 'public' | 'private'
}

export interface TrackDetails {
  title: string
  description: string
  visibility: 'public' | 'private'
  genre: string[]
  primaryInstrument: string
  language: string[]
}
