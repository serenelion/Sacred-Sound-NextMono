import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const accountName = searchParams.get('accountName')
    const email = searchParams.get('email')

    if (!accountName) {
      return NextResponse.json({ error: 'Account name is required' }, { status: 400 })
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getCheckAccountName?accountName=${accountName}&email=${email}`,
      {
        headers: {
          'Accept': 'application/json'
        }
      }
    )

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Account name validation error:', error)
    return NextResponse.json(
      { error: 'Failed to validate account name' },
      { status: 500 }
    )
  }
}