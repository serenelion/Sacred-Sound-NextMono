
import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';

interface LoginRequest {
  email: string;
  password: string;
}

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key'
);

export async function POST(req: Request) {
  try {
    const body = await req.json() as LoginRequest;

    if (!body.email || !body.password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // TODO: Add your actual user validation here
    // For now, we'll accept any credentials for testing
    const token = await new SignJWT({ 
      email: body.email,
      isArtist: false // Set this based on user data
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('6h')
      .sign(JWT_SECRET);

    return NextResponse.json({ 
      success: true,
      message: 'Login successful',
      token
    });

  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: error?.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
