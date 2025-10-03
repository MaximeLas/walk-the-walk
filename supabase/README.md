# Supabase Migrations

This directory contains SQL migrations for the WalkTheWalk MVP database.

## Running Migrations

### Option 1: Supabase Dashboard (Recommended for MVP)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Execute migrations in order:
   - `001_user_sync_trigger.sql` - Sets up automatic user sync from auth.users to public.users
   - `002_rls_policies.sql` - Enables Row Level Security and creates policies for owner access

### Option 2: Supabase CLI

If you have the Supabase CLI installed:

```bash
# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push
```

## Migration Details

### 001_user_sync_trigger.sql

Creates a database trigger that automatically syncs authenticated users from Supabase Auth (`auth.users`) to the application's `public.users` table. This ensures every authenticated owner has a corresponding user record for ownership relationships.

**What it does:**
- Creates `handle_new_user()` function
- Creates trigger on `auth.users` table
- Backfills existing users

**After running:** Every time a user signs up or updates their email, the `public.users` table is automatically updated.

### 002_rls_policies.sql

Enables Row Level Security (RLS) on all tables and creates policies to ensure owners can only access their own data.

**What it does:**
- Enables RLS on `users`, `contacts`, `backlogs`, `promises`, `magic_links`
- Creates policies for SELECT, INSERT, UPDATE, DELETE operations
- Ensures owners can only see/modify their own backlogs and promises

**Important:** Magic link operations use the service role key and bypass RLS (as intended per spec).

## Verification

After running migrations, verify they worked:

```sql
-- Check user sync trigger exists
SELECT * FROM pg_trigger WHERE tgname = 'on_auth_user_created';

-- Check RLS is enabled
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
AND tablename IN ('users', 'contacts', 'backlogs', 'promises', 'magic_links');

-- Should show rowsecurity = true for all tables

-- Check policies exist
SELECT tablename, policyname
FROM pg_policies
WHERE schemaname = 'public';
```

## Rollback

If you need to rollback migrations:

```sql
-- Rollback 002_rls_policies.sql
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
-- ... (drop all policies)
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts DISABLE ROW LEVEL SECURITY;
-- ... (disable RLS on all tables)

-- Rollback 001_user_sync_trigger.sql
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();
```
