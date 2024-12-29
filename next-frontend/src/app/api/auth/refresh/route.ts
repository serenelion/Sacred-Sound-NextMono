
import { NextResponse } from 'next/server'
import { jwtVerify, SignJWT } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key'
)

export async function POST() {
  try {
    const newToken = await new SignJWT({})
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('6h')
      .sign(JWT_SECRET)
      
    return NextResponse.json({ token: newToken })
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to refresh token' },
      { status: 401 }
    )
  }
}
