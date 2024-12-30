
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.email || !body.password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    const response = await fetch(`${process.env.API_BASE_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: body.email,
        password: body.password,
      }),
      credentials: 'include'
    });

    const data = await response.json();
    
    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: data.message || 'Login failed' },
        { status: response.status }
      );
    }

    // Get the refresh token cookie from the backend response
    const cookies = response.headers.get('set-cookie');
    
    // Create our response with the access token
    const clientResponse = NextResponse.json({ 
      success: true,
      token: data.accessToken 
    });

    // Forward the refresh token cookie if it exists
    if (cookies) {
      clientResponse.headers.set('set-cookie', cookies);
    }

    return clientResponse;

  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
