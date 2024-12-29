
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const rateLimit = new Map()

export function rateLimiter(req: NextRequest) {
  const ip = req.ip ?? '127.0.0.1'
  const now = Date.now()
  const timeFrame = 60 * 1000 // 1 minute
  const maxAttempts = 10

  const userRate = rateLimit.get(ip) ?? {
    timestamp: now,
    attempts: 0
  }

  if (now - userRate.timestamp > timeFrame) {
    userRate.timestamp = now
    userRate.attempts = 0
  }

  if (userRate.attempts >= maxAttempts) {
    return new NextResponse(
      JSON.stringify({ error: 'Too many requests' }),
      { status: 429 }
    )
  }

  userRate.attempts++
  rateLimit.set(ip, userRate)
  
  return null
}
