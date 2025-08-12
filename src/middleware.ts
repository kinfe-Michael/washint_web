import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as jose from 'jose';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // Define your protected routes here
  const protectedRoutes = ['/profile', '/settings'];

  // Check if the current path is in the list of protected routes
  const isProtectedRoute = protectedRoutes.includes(request.nextUrl.pathname);

  // Get the JWT from the cookie
  const accessToken = request.cookies.get('access_token');

  const response = isProtectedRoute ? NextResponse.next() : NextResponse.next();
  
  // Crucial: Set the 'x-middleware-cache' header to 'no-cache'
  // This prevents Next.js from caching the middleware response,
  // ensuring cookies are read correctly on every request.
  response.headers.set('x-middleware-cache', 'no-cache');

  // If the route is protected and there's no access token, redirect to the login page
  if (isProtectedRoute && !accessToken) {
    const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('redirect', request.nextUrl.pathname);

    return NextResponse.redirect(loginUrl);
  }

  // Optional: Verify the token to ensure it's valid
  if (isProtectedRoute && accessToken) {
    try {
      // You need to replace 'your_secret_key' with the actual secret key
      // used to sign your JWTs on the Django backend.
      // Make sure this is a secure, environment variable.
      const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
      await jose.jwtVerify(accessToken.value, secret);
    } catch (error) {
      // If the token is invalid (e.g., expired), redirect to login.
      console.error('Invalid or expired token:', error);
      const loginUrl = new URL('/auth/login', request.url);

      const redirectResponse = NextResponse.redirect(loginUrl);
      // Clear the invalid cookie
      redirectResponse.cookies.delete('access_token');
      redirectResponse.cookies.delete('refresh_token');
      // Also apply the no-cache header to the redirect response
      redirectResponse.headers.set('x-middleware-cache', 'no-cache');
      return redirectResponse;
    }
  }

  // If everything is fine, continue to the requested page
  return response;
}

export const config = {
  // Matcher to specify which paths the middleware should run on.
  // The following pattern excludes API routes, static files, and authentication pages.
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|login|register).*)'],
};