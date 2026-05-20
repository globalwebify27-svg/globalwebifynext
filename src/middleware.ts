import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyJWT } from './lib/jwt';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Set header to pass the current pathname and full URL to Server Components (like layouts)
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', pathname);
  requestHeaders.set('x-url', request.url);

  // Protect /admin routes
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('admin_session')?.value;
    const payload = token ? await verifyJWT(token) : null;

    const isLoginPage = pathname === '/admin/login';

    if (!payload && !isLoginPage) {
      // Not logged in and trying to access dashboard -> Redirect to login page
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    if (payload && isLoginPage) {
      // Already logged in and trying to access login page -> Redirect to main dashboard overview
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    // Match all routes except files, static assets, and api
    '/((?!api|_next/static|_next/image|favicon.ico|uploads).*)',
  ],
};
