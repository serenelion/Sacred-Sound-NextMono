
import { NextResponse } from 'next/server'
import { SignJWT } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key'
)

export async function POST(req: Request) {
  try {
    const newToken = await new SignJWT({})
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('6h')
      .sign(JWT_SECRET)
      
    return NextResponse.json({ token: newToken })
  } catch (error) {
    console.error('Token refresh failed:', error)
    return NextResponse.json(
      { error: 'Invalid refresh token' },
      { status: 401 }
    )
  }
}
