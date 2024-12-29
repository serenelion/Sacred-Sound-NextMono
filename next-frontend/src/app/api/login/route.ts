
import { NextResponse } from 'next/server'
import axios from 'axios'

import { rateLimiter } from '../middleware/rateLimit'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const rateLimitResponse = rateLimiter(req)
  if (rateLimitResponse.status === 429) {
    return rateLimitResponse
  } {
  try {
    const body = await req.json()
    const { email, password } = body

    // Call your backend authentication service
    const response = await axios.post(`${process.env.API_BASE_URL}/api/login`, {
      email,
      password
    })

    return NextResponse.json({
      token: response.data.token,
      isArtist: response.data.isArtist
    })
  } catch (error: any) {
    return NextResponse.json(
      { message: error.response?.data?.message || 'Login failed' },
      { status: 401 }
    )
  }
}
