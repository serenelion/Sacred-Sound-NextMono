
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function corsMiddleware(request: NextRequest) {
  const headers = new Headers(request.headers)
  
  const response = NextResponse.next({
    request: {
      headers,
    },
  })

  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  return response
}
