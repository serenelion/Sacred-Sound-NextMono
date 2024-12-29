import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/storeEmailOnWaitlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ email })
    })

    if (!response.ok) {
      throw new Error('Failed to submit to waitlist')
    }

    let data
    const contentType = response.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) {
      data = await response.json()
    } else {
      // Handle non-JSON response
      const text = await response.text()
      console.error('Unexpected response format:', text)
      throw new Error('Invalid response format from server')
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Waitlist API error:', error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error occurred' },
      { status: 500 }
    )
  }
}

