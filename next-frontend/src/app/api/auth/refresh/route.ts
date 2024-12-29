
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function POST() {
  try {
    const newToken = jwt.sign({}, JWT_SECRET, { expiresIn: '6h' })
    return NextResponse.json({ token: newToken })
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to refresh token' },
      { status: 401 }
    )
  }
}
