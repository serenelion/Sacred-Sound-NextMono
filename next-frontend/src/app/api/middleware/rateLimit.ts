
import { NextRequest, NextResponse } from 'next/server'
import Redis from 'ioredis'

const WINDOW_SIZE = 60 // 1 minute
const MAX_REQUESTS = 20

const redis = new Redis(process.env.REDIS_URL || 'redis://127.0.0.1:6379')

export async function rateLimiter(req: NextRequest) {
  const ip = req.ip ?? '127.0.0.1'
  const key = `rate_limit:${ip}`
  
  const requests = await redis.incr(key)
  
  if (requests === 1) {
    await redis.expire(key, WINDOW_SIZE)
  }
  
  if (requests > MAX_REQUESTS) {
    return new NextResponse(
      JSON.stringify({ error: 'Too many requests' }),
      { status: 429 }
    )
  }
  
  return null
}
