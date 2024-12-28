
import { NextResponse } from 'next/server'
import axios from 'axios'

export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://0.0.0.0:3000'
    
    const response = await axios.post(`${apiUrl}/api/signup`, body, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 15000,
    })

    return NextResponse.json(response.data, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    })

  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to process signup'
      },
      { status: 500 }
    )
  }
}
