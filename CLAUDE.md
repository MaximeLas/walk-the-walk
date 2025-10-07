# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

WalkTheWalk is an accountability platform MVP for sending nudges. The system enables authenticated owners to create one-to-one backlogs of promises with contacts, and send recap emails with magic links that allow recipients to view and update promises without authentication.

## Tech Stack

- **Framework**: Next.js 15.5.4 with TypeScript (Pages Router)
- **Database & Auth**: Supabase (Postgres + Auth)
- **Email**: Postmark (transactional email provider)
- **Deployment**: Vercel

## Development Commands

```bash
# Install dependencies
npm install

# Run development server (default: http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Environment Setup

Copy `.env.example` to `.env.local` and populate:
- `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` (public client)
- `SUPABASE_SERVICE_ROLE_KEY` (server-side only, never exposed to client)
- `POSTMARK_API_TOKEN` (email sending)
- `NEXTAUTH_SECRET` (session management)

**Critical**: Never commit actual credentials or expose `SUPABASE_SERVICE_ROLE_KEY` to the browser.

## Architecture

### Folder Structure

```
/src
  /pages
    /api                    # Server-side API routes
      sendNudge.ts          # Send recap email with magic link
      magicAction.ts        # Token-authenticated actions
    /dashboard              # Owner dashboard
    /backlog/[id].tsx       # Owner backlog view (auth required)
    /magic/[token].tsx      # Recipient view (token-verified)
  /lib
    supabaseClient.ts       # Supabase client factory
    email.ts                # Email provider wrapper
    token.ts                # Token generation & hashing
  /types.ts
  middleware.ts             # CRITICAL: Session refresh middleware (mandatory for @supabase/ssr)
```

### Database Schema

Tables: `users`, `contacts`, `backlogs`, `promises`, `magic_links`

Key relationships:
- Owner (`users.id`) → multiple `contacts` and `backlogs`
- `backlog` → multiple `promises`
- `magic_links` stores **hashed** tokens (SHA-256) for recipient access

Promise status enum: `'open' | 'done' | 'cancelled' | 'snoozed'`

### Security Model

1. **Row Level Security (RLS)**: Enabled on all tables
   - Owner can only access their own backlogs/contacts/promises
   - Recipient access requires server-side token verification

2. **Magic Links**:
   - Generate high-entropy random token (32+ bytes)
   - Store SHA-256 hash in `magic_links.token_hash`
   - Server verifies by hashing incoming token and comparing
   - Never store plaintext tokens

3. **Two-tier Access**:
   - Client-side: Uses `NEXT_PUBLIC_SUPABASE_ANON_KEY` with RLS enforcement
   - Server-side API routes: Use `SUPABASE_SERVICE_ROLE_KEY` for privileged operations (token verification, magic link creation)

## Key Implementation Patterns

### Supabase Client Usage

- **Client-side**: Create Supabase client with anon key; RLS policies enforce access
- **Server-side (API routes)**: Use `createServerSupabaseClient(req, res)` with proper cookie handling (getAll/setAll pattern)
- **Service role**: Use `getSupabaseServiceClient()` for privileged operations that bypass RLS (e.g., token verification, magic link creation)
- **Middleware (CRITICAL)**: `src/middleware.ts` is mandatory for session refresh. Without it, expired tokens won't refresh automatically and users may experience unexpected logouts.

### API Endpoints (to be implemented)

Owner-facing (authenticated):
- `POST /api/backlogs` - Create backlog
- `POST /api/backlogs/:id/promises` - Add promise
- `PATCH /api/promises/:id` - Update promise

Server routes:
- `POST /api/sendNudge` - Generate magic link, send email
- `POST /api/magic/action` - Recipient actions (mark done, add comment)

### Magic Link Flow

1. Owner clicks "Send Nudge"
2. Server generates random token, computes hash
3. Insert/reuse `magic_links` record with `token_hash`
4. Email sent with URL: `https://app/magic/{plaintext-token}`
5. Recipient clicks link
6. Server-side page handler verifies token by hashing and DB lookup
7. Render backlog view with update capabilities
8. Updates sent to `/api/magic/action` with token

## Type Definitions

See `PROJECT_SPEC.md` lines 92-140 for TypeScript interfaces:
- `User`, `Contact`, `Backlog`, `PromiseItem`, `MagicLink`
- Use `UUID = string` for ID types

## Testing

MVP scope: Minimal unit tests for critical logic (token generation, hashing). Integration/E2E tests deferred post-MVP.

## Important Notes

- **Always use Context7 MCP for documentation**: Automatically use Context7 MCP tools (`resolve-library-id` and `get-library-docs`) when code generation, setup/configuration steps, or library/API documentation is needed. This provides up-to-date, version-specific documentation and code examples directly from the source.
- **Always use latest API documentation** for Next.js, Supabase, and Postmark
- Contact email is optional; sendNudge must check for valid email before sending
- Magic links can be revoked by owner (set `revoked = true`)
- Implement rate limiting to prevent token brute-force
- All user input must be sanitized

## Current State

- Project initialized with Next.js 15.5.4, React 19.1.1
- Supabase project created with schema deployed
- Core MVP implemented: authentication, backlog management, magic links
- Middleware configured for Supabase SSR session management
- Email system configured with Postmark API for transactional emails
