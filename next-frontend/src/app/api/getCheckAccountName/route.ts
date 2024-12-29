
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const accountName = searchParams.get('accountName')

    if (!accountName) {
      return NextResponse.json({ error: 'Account name is required' }, { status: 400 })
    }

    // Here we can add actual account name validation logic
    // For now, let's simulate a check with a mock response
    const isTaken = false // This should be replaced with actual database check
    
    return NextResponse.json({
      taken: isTaken,
      message: isTaken ? 'Account name is already taken' : 'Account name is available'
    })
  } catch (error) {
    console.error('Account name validation error:', error)
    return NextResponse.json(
      { error: 'Failed to validate account name' },
      { status: 500 }
    )
  }
}
