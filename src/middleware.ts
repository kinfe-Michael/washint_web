import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as jose from 'jose';


const API_BASE_URL = 'http://localhost:8000';

export async function middleware(request: NextRequest) {
  const protectedRoutes = ['/profile', '/settings'];

  const isProtectedRoute = protectedRoutes.includes(request.nextUrl.pathname);

  const accessToken = request.cookies.get('access_token');
  const refreshToken = request.cookies.get('refresh_token');

  const response = NextResponse.next();
  
  response.headers.set('x-middleware-cache', 'no-cache');

  const redirectToLogin = (req: NextRequest) => {
    const loginUrl = new URL('/auth/login', req.url);
    loginUrl.searchParams.set('redirect', req.nextUrl.pathname);
    const redirectResponse = NextResponse.redirect(loginUrl);
    redirectResponse.cookies.delete('access_token');
    redirectResponse.cookies.delete('refresh_token');
    redirectResponse.headers.set('x-middleware-cache', 'no-cache');
    return redirectResponse;
  };

  if (isProtectedRoute && !accessToken) {
    if (refreshToken) {
      try {
        const refreshResponse = await fetch(`${API_BASE_URL}/api/token/refresh/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refresh: refreshToken.value }),
        });

        if (refreshResponse.ok) {
          const { access, refresh } = await refreshResponse.json();
          const newResponse = NextResponse.next();
          newResponse.cookies.set('access_token', access, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 15, 
          });
          newResponse.cookies.set('refresh_token', refresh, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60 * 24 * 7, 
          });
          console.log('Token refreshed successfully from /api/token/refresh/');
          return newResponse;
        } else {
          console.error('Refresh token failed:', refreshResponse.statusText);
          return redirectToLogin(request);
        }
      } catch (error) {
        console.error('Refresh token API call failed:', error);
        return redirectToLogin(request);
      }
    }
    return redirectToLogin(request);
  }

  if (isProtectedRoute && accessToken) {
    try {
     
      const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
      await jose.jwtVerify(accessToken.value, secret);
    } catch (error) {
      if (error instanceof jose.errors.JWTExpired) {
        console.log('Access token expired. Attempting to refresh...');
        
        if (refreshToken) {
          try {
            const refreshResponse = await fetch(`${API_BASE_URL}/api/token/refresh/`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ refresh: refreshToken.value }),
            });

            if (refreshResponse.ok) {
              const { access, refresh } = await refreshResponse.json();
              const newResponse = NextResponse.next();
              newResponse.cookies.set('access_token', access, {
                httpOnly: true,
                secure: false,
                sameSite: 'strict',
                path: '/',
                maxAge: 60 * 15, 
              });
              newResponse.cookies.set('refresh_token', refresh, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                path: '/',
                maxAge: 60 * 60 * 24 * 7, 
              });
              console.log('Token refreshed successfully!');
              return newResponse;
            } else {
              console.error('Refresh token failed:', refreshResponse.statusText);
              return redirectToLogin(request);
            }
          } catch (refreshError) {
            console.error('Refresh token API call failed:', refreshError);
            return redirectToLogin(request);
          }
        } else {
         
          console.error('Access token expired and no refresh token available.');
          return redirectToLogin(request);
        }
      } else {
       
        console.error('Invalid token:', error);
        return redirectToLogin(request);
      }
    }
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|auth).*)'],
};
