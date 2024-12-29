
import { NextResponse } from 'next/server'
import { jwtVerify, SignJWT } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key'
)

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: 'No token provided' },
        { status: 401 }
      )
    }

    const token = authHeader.split(' ')[1]
    const { payload } = await jwtVerify(token, JWT_SECRET)

    const newToken = await new SignJWT({ 
      email: payload.email,
      isArtist: payload.isArtist
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('6h')
      .sign(JWT_SECRET)

    return NextResponse.json({ 
      success: true, 
      token: newToken 
    })

  } catch (error) {
    console.error('Token refresh error:', error)
    return NextResponse.json(
      { success: false, message: 'Invalid token' },
      { status: 401 }
    )
  }
}
