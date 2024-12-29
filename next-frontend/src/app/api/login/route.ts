import { NextResponse } from 'next/server'
import axios from 'axios'

import { rateLimiter } from '../middleware/rateLimit'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const rateLimitResponse = rateLimiter(req as any)
  if (rateLimitResponse) return rateLimitResponse
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
    const status = error.response?.status || 500
    const message = error.response?.data?.message || 'Login failed'
    
    let errorMessage = message
    if (status === 401) {
      errorMessage = 'Invalid email or password'
    } else if (status === 404) {
      errorMessage = 'Account not found. Please sign up first.'
    }
    
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status }
    )
  }
}