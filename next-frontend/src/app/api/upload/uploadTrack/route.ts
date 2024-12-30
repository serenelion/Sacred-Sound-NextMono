
import { NextResponse } from 'next/server'
import { uploadTrack } from '@/lib/api'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const track = await uploadTrack(file)
    return NextResponse.json(track)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to upload track' }, { status: 500 })
  }
}
