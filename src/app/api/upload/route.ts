
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const formData = await req.formData()
  const file = formData.get('file') as File
  const type = formData.get('type') as 'album' | 'individual'
  
  // Call backend API
  const response = await fetch(`${process.env.API_URL}/api/upload/video`, {
    method: 'POST',
    body: formData
  })

  const data = await response.json()
  return NextResponse.json(data)
}
