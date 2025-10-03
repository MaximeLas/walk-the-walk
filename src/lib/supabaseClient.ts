/**
 * Supabase client factory using @supabase/ssr
 *
 * Two-tier access model:
 * 1. Browser client: Uses NEXT_PUBLIC_SUPABASE_ANON_KEY with RLS enforcement
 * 2. Server client (API routes): Properly handles cookies for session persistence
 * 3. Service role client: Bypasses RLS for magic link operations
 *
 * CRITICAL: Never expose service role key to the browser
 */

import { createBrowserClient, createServerClient, serialize, type CookieOptions } from '@supabase/ssr';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { NextApiRequest, NextApiResponse } from 'next';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable');
}

if (!supabaseAnonKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable');
}

/**
 * Client-side Supabase client (for browser)
 * Uses anonymous key with RLS policies enforced
 * Safe to use in browser components
 */
export function getSupabaseClient(): SupabaseClient {
  return createBrowserClient(supabaseUrl!, supabaseAnonKey!);
}

/**
 * Server-side Supabase client for API routes (Pages Router)
 * Properly handles cookies to maintain session across requests
 *
 * Usage in API routes:
 * ```
 * const supabase = createServerSupabaseClient(req, res);
 * const { data: { session } } = await supabase.auth.getSession();
 * ```
 */
export function createServerSupabaseClient(
  req: NextApiRequest,
  res: NextApiResponse
): SupabaseClient {
  return createServerClient(
    supabaseUrl!,
    supabaseAnonKey!,
    {
      cookies: {
        get(name: string) {
          return req.cookies[name];
        },
        set(name: string, value: string, options: CookieOptions) {
          res.appendHeader('Set-Cookie', serialize(name, value, options));
        },
        remove(name: string, options: CookieOptions) {
          res.appendHeader('Set-Cookie', serialize(name, '', options));
        },
      },
    }
  );
}

/**
 * Server-side Supabase client with service role
 * Bypasses RLS policies - use with caution
 * ONLY use in API routes, never expose to client
 *
 * Use cases:
 * - Token verification for magic links
 * - Creating magic links
 * - Recipient actions via token authentication
 */
export function getSupabaseServiceClient(): SupabaseClient {
  if (!supabaseServiceRoleKey) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable');
  }

  return createClient(supabaseUrl!, supabaseServiceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

/**
 * Utility to get current authenticated user from session
 * Returns null if not authenticated
 */
export async function getCurrentUser(supabase: SupabaseClient) {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error || !session) {
    return null;
  }

  return session.user;
}
