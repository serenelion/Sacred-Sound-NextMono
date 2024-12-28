
import { NextResponse } from 'next/server'
import axios from 'axios'

export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Credentials': 'true',
    },
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    if (!process.env.REACT_APP_API_BASE_URL) {
      throw new Error('API Base URL not configured')
    }

    const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/signup`, body, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 15000,
    })

    return NextResponse.json(response.data, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
      }
    })

  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to process signup'
      },
      { 
        status: error.response?.status || 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true',
        }
      }
    )
  }
}
