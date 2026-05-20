import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true, message: 'Logged out successfully' });
  
  response.cookies.set('admin_session', '', {
    httpOnly: true,
    expires: new Date(0),
    path: '/',
  });

  return response;
}

export async function GET() {
  const response = NextResponse.redirect(new URL('/admin', process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'));
  
  response.cookies.set('admin_session', '', {
    httpOnly: true,
    expires: new Date(0),
    path: '/',
  });

  return response;
}
