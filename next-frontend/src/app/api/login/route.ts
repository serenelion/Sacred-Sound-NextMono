
import { NextResponse } from 'next/server';
import { SignupRequest } from '../signup/route';

export async function POST(req: Request) {
  try {
    const body = await req.json() as SignupRequest;
    
    if (!body.email || !body.password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Add rate limiting
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const rateLimitKey = `login:${ip}`;
    
    return NextResponse.json({ 
      success: true,
      message: 'Login successful',
      token: 'jwt-token-here'
    });
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: error?.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
