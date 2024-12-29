import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
      throw new Error('API Base URL is not defined')
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/postNewUserWithAccountName`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(body)
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to create user')
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('User creation error:', error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to create user' },
      { status: 500 }
    )
  }
} 