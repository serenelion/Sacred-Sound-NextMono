
import { NextResponse } from 'next/server'
import { createAlbum } from '@/lib/api'

export async function POST(request: Request) {
  try {
    const albumDetails = await request.json()
    const album = await createAlbum(albumDetails)
    return NextResponse.json(album)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create album' }, { status: 500 })
  }
}
