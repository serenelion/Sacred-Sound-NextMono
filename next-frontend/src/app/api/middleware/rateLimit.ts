
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const rateLimit = new Map()

export function rateLimiter(request: NextRequest) {
  const ip = request.ip || '127.0.0.1'
  const now = Date.now()
  const windowStart = now - 60000 // 1 minute window
  
  const requestCount = rateLimit.get(ip) || []
  const requestsInWindow = requestCount.filter(time => time > windowStart)
  
  if (requestsInWindow.length >= 10) { // Max 10 requests per minute
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }
  
  requestsInWindow.push(now)
  rateLimit.set(ip, requestsInWindow)
  
  return NextResponse.next()
}
