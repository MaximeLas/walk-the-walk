# v0 Demo Pages (Archived)

These pages were part of the Phase 1 MVP demonstration, which successfully validated the backend functionality (Supabase auth, CRUD operations, RLS policies, magic links, and email sending).

## Archived Files

- `dashboard.tsx` - Owner dashboard with backlog list and create form
- `backlog-detail.tsx` - Backlog detail view with promise management
- `magic-view.tsx` - Magic link recipient view (token-verified access)

## Why Archived?

Phase 1 completed successfully with a demo to co-founders Kevin & Michelle. The backend (API routes, Supabase schema, RLS policies, authentication) remains unchanged and fully functional.

Phase 2 rebuilds the frontend from scratch with:
- Mobile-first design (Michelle's Figma specs)
- Tailwind CSS design system
- Reusable component library
- Improved UX and visual polish

## Backend Code (Still Active)

The following remain in the codebase and continue to work:
- `/src/pages/api/**` - All API routes
- `/src/lib/supabaseClient.ts` - Database client
- `/src/lib/email.ts` - Email provider
- `/src/lib/token.ts` - Token generation/hashing
- Supabase database schema and RLS policies

## Reference

These pages can be referenced for:
- Business logic patterns
- API integration examples
- Data fetching patterns
- Supabase client usage

**Archived:** 2025-10-13 (Phase 2 foundation setup)
