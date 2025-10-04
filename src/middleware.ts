/**
 * Next.js Middleware for Supabase Session Management
 *
 * CRITICAL: This middleware is mandatory for @supabase/ssr to work correctly.
 * It handles automatic session refresh when access tokens expire.
 *
 * Without this middleware:
 * - Session tokens won't refresh automatically
 * - Users may be logged out unexpectedly
 * - Cookie updates during TOKEN_REFRESHED events won't work
 *
 * Reference: https://github.com/supabase/ssr
 */

import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function middleware(req: NextRequest) {
  // Create a response object that we can modify
  let res = NextResponse.next({
    request: {
      headers: req.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            req.cookies.set(name, value)
          );
          res = NextResponse.next({
            request: req,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            res.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // IMPORTANT: Trigger session refresh by calling getUser()
  // This will automatically refresh expired tokens and update cookies
  // The cookie changes will be propagated via the setAll callback above
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Optionally log session refresh (helpful for debugging)
  if (user) {
    console.log(`[Middleware] Session active for user: ${user.email}`);
  }

  return res;
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
