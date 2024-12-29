
import { NextResponse } from 'next/server'
import axios from 'axios'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { currentPassword, newPassword, email } = body

    if (!currentPassword || !newPassword || !email) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400 }
      )
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://0.0.0.0:3000'
    const response = await axios.post(`${apiUrl}/api/changePassword`, body)
    
    return NextResponse.json(response.data)
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.response?.data?.message || 'Failed to change password' }),
      { status: error.response?.status || 500 }
    )
  }
}
