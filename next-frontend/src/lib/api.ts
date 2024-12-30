
import { AlbumDetails, TrackDetails } from "@/app/types"

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

export async function createAlbum(details: AlbumDetails) {
  const res = await fetch(`${API_URL}/postNewAlbum`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      albumName: details.title,
      description: details.description,
      visibility: details.visibility,
      owner: details.owner
    })
  })
  return res.json()
}

export async function uploadAlbumArtwork(albumId: string, file: File) {
  const formData = new FormData()
  formData.append('image', file)
  formData.append('albumId', albumId)
  
  const res = await fetch(`${API_URL}/postAlbumImage`, {
    method: 'POST',
    body: formData
  })
  return res.json()
}

export async function uploadTrack(file: File) {
  const formData = new FormData()
  formData.append('video', file)
  
  const res = await fetch(`${API_URL}/upload/video`, {
    method: 'POST',
    body: formData
  })
  return res.json()
}

export async function updateTrackDetails(videoId: string, details: TrackDetails) {
  const res = await fetch(`${API_URL}/updatePartialContentMetaData`, {
    method: 'POST', 
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      videoId,
      ...details
    })
  })
  return res.json()
}
