import { NextResponse } from 'next/server'
import axios from 'axios'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    console.log('Starting signup process:', {
      url: `${process.env.REACT_APP_API_BASE_URL}/api/signup`,
      accountName: body.accountName,
      email: body.email,
      isArtist: true
    })

    if (!process.env.REACT_APP_API_BASE_URL) {
      console.error('API Base URL is not defined')
      throw new Error('API configuration error')
    }
    
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/signup`, {
        accountName: body.accountName,
        email: body.email,
        password: body.password,
        isArtist: true
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })

      console.log('Backend response:', {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        data: {
          ...response.data,
          token: response.data.token ? '[PRESENT]' : '[MISSING]'
        }
      })

      if (!response.data.token) {
        console.error('No token in response:', response.data)
        throw new Error('Authentication token missing from response')
      }

      // Set the token in an HTTP-only cookie
      const cookieHeader = new Headers()
      cookieHeader.append('Set-Cookie', `token=${response.data.token}; Path=/; HttpOnly; SameSite=Strict`)

      return NextResponse.json(
        { 
          success: true, 
          token: response.data.token,
          user: {
            email: body.email,
            accountName: body.accountName,
            isArtist: true
          }
        },
        { 
          status: 200,
          headers: cookieHeader
        }
      )

    } catch (axiosError) {
      if (axios.isAxiosError(axiosError)) {
        console.error('Backend API error:', {
          status: axiosError.response?.status,
          statusText: axiosError.response?.statusText,
          data: axiosError.response?.data,
          headers: axiosError.response?.headers
        })

        // Handle specific error cases from the backend
        if (axiosError.response?.status === 409) {
          return NextResponse.json(
            { success: false, error: 'Account already exists' },
            { status: 409 }
          )
        }

        if (axiosError.response?.status === 400) {
          return NextResponse.json(
            { success: false, error: axiosError.response.data.message || 'Invalid signup data' },
            { status: 400 }
          )
        }

        if (axiosError.response?.data?.message) {
          return NextResponse.json(
            { success: false, error: axiosError.response.data.message },
            { status: axiosError.response.status || 500 }
          )
        }

        throw new Error(axiosError.message || 'Backend API error')
      }
      throw axiosError
    }

  } catch (error) {
    console.error('Signup error:', error instanceof Error ? {
      name: error.name,
      message: error.message,
      stack: error.stack
    } : error)

    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to create account',
        details: process.env.NODE_ENV === 'development' ? `${error}` : undefined
      },
      { status: 500 }
    )
  }
}

