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
   - Client-side: Uses `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` with RLS enforcement
   - Server-side API routes: Use `SUPABASE_SERVICE_ROLE_KEY` for privileged operations (token verification, magic link creation)

## Key Implementation Patterns

### Supabase Client Usage

- **Client-side**: Create Supabase client with publishable key; RLS policies enforce access
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

**Phase 1 (v0 Foundation): ✅ COMPLETE**
- Core MVP features implemented and tested
- Demo completed successfully with co-founders Kevin & Michelle
- Ready for Phase 2: Mobile-first MVP implementation

**See PROJECT_SPEC.md for detailed implementation status and feature list.**

## Development Workflow & Git Protocol

### Making Commits

When creating commits, follow these steps:

1. **Assess whether PROJECT_SPEC.md needs updating:**
   - ✅ **UPDATE if:** You implemented a new feature, added meaningful functionality, or made architecture decisions that advance the project
   - ❌ **SKIP if:** You made refactoring changes, bug fixes, documentation updates, or minor tweaks that don't change what's been built

2. **If update needed:** Add entry to PROJECT_SPEC.md "Phase 2: Implementation Progress" section with:
   - Feature name and description
   - Key files modified (with paths)
   - Architecture decisions made
   - Completion status

3. **Stage all changes** (including PROJECT_SPEC.md if updated)

4. **Create commit** with clear, descriptive message following the existing commit style

5. **Push when appropriate** (user will specify when to push)

### Document Maintenance

**PROJECT_SPEC.md** = Single source of truth for:
- Technical specification
- Database schema
- Implementation status and progress
- Architecture decisions

**CLAUDE.md** (this file) = Instructions for how Claude Code should work:
- Tech stack and patterns
- Development commands
- Code conventions
- Workflow guidelines

Keep both files updated as the project evolves, but remember: PROJECT_SPEC.md tracks *what* was built, CLAUDE.md guides *how* to build.
