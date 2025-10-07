# PROJECT SPEC — Walk The Walk / Nudge MVP

## Overview
An accountability product that supports single one-to-one relationship "backlogs" of promises. The system allows an owner (authenticated user) to create a backlog for a contact (contact email optional), add promises (tasks) to the backlog, and send a polite recap / nudge email to the contact. The contact may not be a registered user; a secure magic link grants limited access to view and update the backlog (mark promises as done, add comments). The MVP must be small, robust, and implementable quickly using Next.js (TypeScript) and Supabase (Postgres + Auth). Email delivery is handled through a transactional provider (Postmark, SendGrid, etc.). The solution stores high-entropy magic tokens hashed in the database and enforces access control through RLS policies for authenticated owner actions and server-side token verification for recipient actions.

---

## Goals for MVP
- Minimal viable product enabling validated owner flows and recipient interactions:
  1. Authenticated owner account creation / login (via Supabase Auth).
  2. Create a contact and a 1:1 backlog record.
  3. Add promises (description + optional due date) to a backlog.
  4. Send a recap/nudge email that includes a magic link to a public recipient view of the backlog.
  5. Recipient views backlog without registering and can mark promises as done and (optionally) add comments.
  6. Owner dashboard with backlog list and simple analytics (# open, # done).
  7. Basic security, logging, and tests.

---

## Tech stack
- Frontend / server: **Next.js** (TypeScript) — pages and API routes (server-side logic).
- Database & auth: **Supabase** (Postgres + Auth).
- Email: **Postmark** (or SendGrid) for transactional email.
- Deployment: **Vercel** (recommended) or Render.
- Testing (MVP scope): Minimal unit tests for critical logic (e.g., token generation & hashing). Broader integration/E2E tests deferred until post-MVP.

---

## Database schema (Postgres)
Tables and types used in the MVP. The SQL below was used to create the tables in the Supabase project.

```sql
-- users metadata
create table users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  name text,
  created_at timestamptz default now()
);

-- contacts
create table contacts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  name text not null,
  email text, -- nullable
  created_at timestamptz default now()
);

-- backlogs
create table backlogs (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references users(id) on delete cascade,
  contact_id uuid references contacts(id) on delete set null,
  title text,
  created_at timestamptz default now()
);

-- promise status enum
create type promise_status as enum ('open','done','cancelled','snoozed');

-- promises
create table promises (
  id uuid primary key default gen_random_uuid(),
  backlog_id uuid not null references backlogs(id) on delete cascade,
  description text not null,
  status promise_status default 'open' not null,
  due_date timestamptz,
  created_at timestamptz default now(),
  completed_at timestamptz
);

-- magic links (store hashed token)
create table magic_links (
  id uuid primary key default gen_random_uuid(),
  backlog_id uuid not null references backlogs(id) on delete cascade,
  token_hash text not null,
  created_at timestamptz default now(),
  expires_at timestamptz,
  revoked boolean default false,
  last_used_at timestamptz
);
```

Indexes
	•	Indexes exist on FK fields (contacts.user_id, backlogs.owner_id, promises.backlog_id) and on magic_links.token_hash to support token verification.

Note on tokens
	•	Tokens sent in email are random, high-entropy strings (e.g., 32 bytes URL-safe). The database stores only the SHA-256 hash of the token (or equivalent KDF). When a request arrives with a token, the server computes the hash and compares. Plaintext tokens are never stored.

⸻

Type definitions (TypeScript interfaces)
```sql
type UUID = string;

interface User {
  id: UUID;
  email: string;
  name?: string | null;
  created_at: string;
}

interface Contact {
  id: UUID;
  user_id: UUID;
  name: string;
  email?: string | null;
  created_at: string;
}

interface Backlog {
  id: UUID;
  owner_id: UUID;
  contact_id?: UUID | null;
  title?: string | null;
  created_at: string;
}

type PromiseStatus = 'open' | 'done' | 'cancelled' | 'snoozed';

interface PromiseItem {
  id: UUID;
  backlog_id: UUID;
  description: string;
  status: PromiseStatus;
  due_date?: string | null;
  created_at: string;
  completed_at?: string | null;
}

interface MagicLink {
  id: UUID;
  backlog_id: UUID;
  created_at: string;
  expires_at?: string | null;
  revoked: boolean;
  last_used_at?: string | null;
}
```

⸻

System architecture & folder layout

```
/src
  /pages
    /api
      sendNudge.ts          -- server endpoint to send recap email and create/reuse magic link
      magicAction.ts        -- server endpoint to accept tokened actions (mark done)
    /dashboard
      index.tsx             -- owner dashboard
    /backlog
      [id].tsx              -- owner backlog page (auth required)
    /magic
      [token].tsx           -- recipient view page (server-side verify of token)
  /components
    BacklogForm.tsx
    PromiseEditor.tsx
    PromiseList.tsx
    MagicBacklogView.tsx
    SendRecapButton.tsx
  /lib
    supabaseClient.ts      -- supabase client factory for client and server
    email.ts               -- email provider wrapper (Postmark)
    token.ts               -- generate + hash token helpers
    apiService.ts          -- high-level service functions
  /types.ts
  /styles
  /utils
  /tests
```

Key implementation choices
	•	Next.js API routes host server-only logic (token hashing, send email using service key).
	•	Supabase client on the client-side uses NEXT_PUBLIC_SUPABASE_ANON_KEY; server uses SUPABASE_SERVICE_ROLE_KEY.
	•	RLS policies protect DB; server endpoints use service role key for token verification and magic link operations.
	•	Magic token is used for recipient identity. To allow multi-step interactions in the recipient session, either:
	•	attach the token to each API call, or
	•	set a short-lived session cookie after server verification.

⸻

API contract / endpoints

Client-facing (owner, authenticated via Supabase)
	•	GET /api/backlogs — list backlogs for the owner (or use Supabase client directly).
	•	POST /api/backlogs — create backlog (body: { contactName, contactEmail?, title? }).
	•	GET /api/backlogs/:id — fetch backlog + promises (owner-only).
	•	POST /api/backlogs/:id/promises — create promise (body: { description, dueDate? }).
	•	PATCH /api/promises/:id — update promise (status, description, dueDate) — allowed for owner or via tokened recipient action.

Server-only routes (service keys used server-side; never expose service role key to client)
	•	POST /api/sendNudge
request body: { backlogId: string }
behavior: verify owner, query open promises, generate / reuse magic link, send email with link, log result.
	•	POST /api/verifyMagic (internal helper)
request body: { token: string } → returns { backlogId, magicLinkId } if valid.
	•	POST /api/magic/action
request body: { token: string, action: 'mark_done' | 'comment', promiseId: string, comment?: string }
behavior: verify token, verify promise belongs to backlog, apply action, optionally notify owner.

⸻

User flows (detailed)

Flow: Owner sign-up & login
	•	Auth: Supabase Auth (email magic link). After authentication, an entry in users table should be created/updated with id = auth.uid() or through a post-signup process.

Flow: Create contact & backlog
	•	UI: owner fills a form (name + email optional).
	•	Backend:
	1.	Insert contacts row with user_id = auth.uid().
	2.	Insert backlogs row referencing user and contact.

Flow: Add promise
	•	UI: add form with description and optional due date.
	•	Backend: Insert row into promises.

Flow: Send recap/nudge
	•	Preconditions: contact has a valid email.
	•	Backend:
	1.	Query open promises for backlog.
	2.	Generate token = secureRandom(); compute token_hash = sha256(token).
	3.	Insert magic_links row (or reuse an active non-revoked link according to policy).
	4.	Email HTML + CTA: link https://<app>/magic/<token>.
	5.	Log send event and return success.

Flow: Recipient view via magic link /magic/<token>
	•	Server-side page rendering:
	1.	Receive plaintext token in path.
	2.	Compute sha256(token) and query magic_links for non-revoked and non-expired link.
	3.	Fetch backlog and promises.
	4.	Render page with UI for marking promises done and adding comments.
	•	Actions:
	•	For each action, either:
	•	attach token to API call; or
	•	server sets a short-lived HTTP-only cookie (session), and subsequent calls read it server-side.

Flow: Recipient marks promise done
	•	Server checks token validity and that promiseId belongs to backlog.
	•	Server updates promises.status = 'done' and sets completed_at = now().
	•	Optionally enqueue owner notification.

⸻

Business logic & edge cases
	•	If contact.email is null: sendNudge must return an error indicating no email; UI should prompt owner to add email.
	•	Owner should be able to revoke (revoked = true) any magic link.
	•	Magic link expires_at is optional; default policy: no expiration until revoked (but expires_at support must be implemented).
	•	Prevent token brute-force via rate limiting.
	•	If email bounces: mark contact.email as invalid and surface to owner.

⸻

Security requirements & RLS policies
	•	Use HTTPS everywhere.
	•	Hash tokens before storing (SHA-256 or better KDF).
	•	Enable RLS on backlogs, promises, contacts:
	•	Policy example: owner can access backlogs only if owner_id = auth.uid().
	•	For promises: allow access if the backlog belongs to auth.uid().
	•	Service role key usage: server APIs that need to create/revoke magic links or read-by-token must use SUPABASE_SERVICE_ROLE_KEY. This key must not be used in browser clients.
	•	Sanitize all user inputs.

⸻

Email templates & deliverability
	•	Email subject: Quick recap — promises from [owner_name].
	•	Email body: neutral tone, short list of open promises with a clear CTA linking to the magic link.
	•	Configure Postmark or chosen provider with verified sender domain.

⸻

Tests & QA
	•	Minimal unit tests for security-critical logic (token generation, hashing).
	•	Manual smoke testing for DB operations, email sending, and magic link flows.
	•	Automated integration/E2E tests deferred until post-MVP.

⸻

Deployment
	•	Vercel recommended. Use environment variables set in Vercel settings.
	•	CI: GitHub Actions or Vercel builds.
	•	For scheduled nudges (future): use a background job system (Inngest, Temporal, or Supabase cron/Edge Functions).

⸻

Implementation checklist (developer tasks)
	1.	Initialize Next.js (TypeScript) project.
	2.	Add basic auth flow using Supabase client and ensure users table sync.
	3.	Implement DB access layer using @supabase/supabase-js.
	4.	Implement owner-facing UI: dashboard, backlog create, promise add.
	5.	Implement server-side API: /api/sendNudge and /api/magic/action.
	6.	Implement /magic/[token] page.
	7.	Implement token utilities (generate + hash).
	8.	Implement email provider wrapper.
	9.	Deploy to Vercel, set env variables, test send & click flow.

⸻

Operational notes
	•	Keep `SUPABASE_SERVICE_ROLE_KEY` out of the repo (use environment variables).
	•	Add bounce handling for email after first user tests (spam handling can come later).
	•	Implement basic privacy/data deletion endpoint once first users are onboarded.

⸻

Acceptance criteria
	•	Authenticated owner can create a backlog and add promises.
	•	Owner can send a recap email to a contact with a magic link.
	•	Recipient clicks link and can mark promises as done.
	•	Changes made by recipient are reflected in owner dashboard.
	•	RLS policies prevent unauthorized access via the frontend.

⸻

**Implementation Guidance:** Always verify the latest official documentation for all APIs, libraries, and services used. Ensure that import paths, methods, and recommended practices reflect the current versions and best practices. Avoid relying on outdated examples or patterns; use what is officially supported and up-to-date.

⸻

Already done (initial state)
	•	Supabase org: WalkTheWalk.
	•	Supabase project: Nudge MVP.
	•	SQL schema executed and tables created: users, contacts, backlogs, promises, magic_links.

Milestone 1: Core Infrastructure (Completed)
	•	Next.js 15.5.4 project initialized with TypeScript
	•	TypeScript configuration and project structure (src/ directory)
	•	Type definitions for all database entities (src/types.ts)
	•	Supabase client factory with two-tier access (client/service role) (src/lib/supabaseClient.ts)
	•	Token utilities with secure generation, SHA-256 hashing, and verification (src/lib/token.ts)
	•	Comprehensive unit tests for token utilities (18 tests, all passing)
	•	Email service wrapper for Postmark with HTML/text templates (src/lib/email.ts)
	•	Jest testing framework configured

Milestone 2: API Endpoints (Completed)
	•	POST /api/sendNudge - Send recap email with magic link
		- Verifies owner authentication
		- Validates contact has email
		- Generates magic token and stores hash
		- Sends formatted email with magic link
		- Returns success with message ID
	•	POST /api/magic/action - Token-authenticated recipient actions
		- Verifies magic token via constant-time comparison
		- Supports mark_done action (comments deferred)
		- Updates promise status and tracks last_used_at
		- Prevents unauthorized access to other backlogs

Milestone 3: Frontend Pages (Completed)
	•	Landing page with Supabase Auth magic link sign-in (src/pages/index.tsx)
	•	Magic link recipient view (/magic/[token]) with server-side token verification
		- Displays backlog title and promises
		- Lists open and completed promises separately
		- Allows marking promises as done
		- Updates UI optimistically
	•	Global styles and _app.tsx configuration

Milestone 4: Owner Features & Database Security (Completed)
	•	Email service implemented with Postmark API
		- Supports HTML and plain text email templates
		- Direct integration with Postmark for reliable email delivery
		- Production-ready transactional email system
	•	SQL migrations for database security and user management
		- 001_user_sync_trigger.sql: Auto-sync auth.users → public.users
		- 002_rls_policies.sql: Row Level Security policies for all tables
		- supabase/README.md with detailed migration instructions
	•	Complete owner dashboard (src/pages/dashboard/index.tsx)
		- Lists all backlogs with statistics (total/open/done promises)
		- Create new backlog with inline form
		- Navigate to individual backlog pages
		- Sign out functionality
	•	Backlog management page (src/pages/backlog/[id].tsx)
		- View all promises (open and completed)
		- Add new promises with description and optional due date
		- Toggle promise status (mark done/reopen)
		- Send nudge email button
		- Navigate back to dashboard
	•	Full CRUD API endpoints for owner operations
		- POST /api/backlogs: Create backlog with contact
		- POST /api/backlogs/:id/promises: Add promise to backlog
		- PATCH /api/promises/:id: Update promise (status, description, due date)
		- All endpoints enforce owner authentication via Supabase session
		- RLS policies protect data access automatically

## Implementation Status

### Phase 1: v0 Foundation (✅ COMPLETE - October 2025)

**Core Infrastructure:**
- Next.js 15.5.4 project with TypeScript and Pages Router
- Supabase integration (Postgres + Auth)
- Token utilities with SHA-256 hashing (18 unit tests passing)
- Email system with Postmark API
- Middleware for Supabase SSR session management

**Owner Features:**
- Authentication with Supabase Auth (magic link email)
- Dashboard: View all backlogs with statistics
- Create backlog with contact (email optional)
- Add/update promises to backlogs
- Send nudge email with magic link
- Mark promises as done/open

**Recipient Features:**
- Access backlog via magic link (no authentication required)
- View all promises in backlog
- Mark promises as done
- Server-side token verification with constant-time comparison

**Database Security:**
- User sync trigger: auto-sync auth.users → public.users
- Row Level Security (RLS) enabled on all tables
- RLS policies for owner data access
- Service role operations for magic link verification

**Production Readiness:**
- All core user stories from spec implemented and tested
- Email system configured with Postmark API
- Database secured with RLS policies
- 18 unit tests passing for critical security logic
- v0 demo completed successfully with co-founders

### Phase 2: Mobile-First MVP (🚧 NEXT - Starting October 2025)

**Objective:** Transform v0 foundation into production-ready mobile-first web application based on UX/UI designs from Michelle (UX/UI co-founder).

**Key Requirements:**
- Mobile-first responsive design (iOS/Android browsers)
- Implement full user flows from UX designs
- Enhanced UI/UX for mobile interactions
- Production-ready polish and error handling

**Implementation Progress:**

⚠️ **IMPORTANT FOR CLAUDE CODE AGENTS:** ⚠️

**BEFORE COMMITTING changes that implement new features or meaningfully advance the project, update this section with:**
- Feature name and brief description
- Key files added/modified (with paths)
- Architecture decisions or patterns used
- Completion status

**Do NOT update for:** refactoring, bug fixes, documentation changes, or minor tweaks that don't advance implementation progress.

**Purpose:** Keep this as the single source of truth for where the project stands, so future agents (and team members) can quickly understand what's been built.

---

*Awaiting Michelle's UX/UI designs to begin implementation*
