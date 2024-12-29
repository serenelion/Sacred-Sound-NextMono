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

interface SignupRequest {
  accountName: string;
  email: string;
  password: string;
  isArtist?: boolean;
}

interface ErrorResponse {
  success: boolean;
  error: string;
  details?: string[];
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as SignupRequest;
    
    const { accountName, email, password } = body;

    // Validate required fields
    const errors = [];
    if (!email) errors.push('Email is required');
    if (!password) errors.push('Password is required');
    if (!accountName) errors.push('Account name is required');
    
    if (errors.length > 0) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Validation failed',
          details: errors
        }),
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      )
    }
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
    const status = (error as any)?.response?.status || 500
    const message = (error as any)?.response?.data?.message || 'Internal server error'
    const errorResponse = { 
      success: false, 
      error: message,
      details: error?.response?.data?.details || []
    }
    
    // Special handling for existing account
    if (error?.response?.status === 409) {
      errorResponse.error = "An account already exists with this email or artist name"
      return NextResponse.json(errorResponse, { status: 409 })
    }

    return NextResponse.json(errorResponse, { status })
  }
}