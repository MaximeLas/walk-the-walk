-- Migration: Row Level Security (RLS) Policies
-- Purpose: Secure data access for authenticated owners
-- Magic link recipient access handled via service role (bypasses RLS)

-- Enable RLS on all user-facing tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.backlogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.magic_links ENABLE ROW LEVEL SECURITY;

-- =============================================================================
-- USERS TABLE POLICIES
-- =============================================================================

-- Users can read their own user record
CREATE POLICY "Users can view own profile"
  ON public.users
  FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own user record
CREATE POLICY "Users can update own profile"
  ON public.users
  FOR UPDATE
  USING (auth.uid() = id);

-- =============================================================================
-- CONTACTS TABLE POLICIES
-- =============================================================================

-- Owners can view their own contacts
CREATE POLICY "Owners can view their contacts"
  ON public.contacts
  FOR SELECT
  USING (auth.uid() = user_id);

-- Owners can insert their own contacts
CREATE POLICY "Owners can create contacts"
  ON public.contacts
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Owners can update their own contacts
CREATE POLICY "Owners can update their contacts"
  ON public.contacts
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Owners can delete their own contacts
CREATE POLICY "Owners can delete their contacts"
  ON public.contacts
  FOR DELETE
  USING (auth.uid() = user_id);

-- =============================================================================
-- BACKLOGS TABLE POLICIES
-- =============================================================================

-- Owners can view their own backlogs
CREATE POLICY "Owners can view their backlogs"
  ON public.backlogs
  FOR SELECT
  USING (auth.uid() = owner_id);

-- Owners can create backlogs
CREATE POLICY "Owners can create backlogs"
  ON public.backlogs
  FOR INSERT
  WITH CHECK (auth.uid() = owner_id);

-- Owners can update their own backlogs
CREATE POLICY "Owners can update their backlogs"
  ON public.backlogs
  FOR UPDATE
  USING (auth.uid() = owner_id);

-- Owners can delete their own backlogs
CREATE POLICY "Owners can delete their backlogs"
  ON public.backlogs
  FOR DELETE
  USING (auth.uid() = owner_id);

-- =============================================================================
-- PROMISES TABLE POLICIES
-- =============================================================================

-- Owners can view promises in their backlogs
CREATE POLICY "Owners can view promises in their backlogs"
  ON public.promises
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.backlogs
      WHERE backlogs.id = promises.backlog_id
      AND backlogs.owner_id = auth.uid()
    )
  );

-- Owners can create promises in their backlogs
CREATE POLICY "Owners can create promises in their backlogs"
  ON public.promises
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.backlogs
      WHERE backlogs.id = promises.backlog_id
      AND backlogs.owner_id = auth.uid()
    )
  );

-- Owners can update promises in their backlogs
CREATE POLICY "Owners can update promises in their backlogs"
  ON public.promises
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.backlogs
      WHERE backlogs.id = promises.backlog_id
      AND backlogs.owner_id = auth.uid()
    )
  );

-- Owners can delete promises in their backlogs
CREATE POLICY "Owners can delete promises in their backlogs"
  ON public.promises
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.backlogs
      WHERE backlogs.id = promises.backlog_id
      AND backlogs.owner_id = auth.uid()
    )
  );

-- =============================================================================
-- MAGIC_LINKS TABLE POLICIES
-- =============================================================================

-- Owners can view magic links for their backlogs
CREATE POLICY "Owners can view magic links for their backlogs"
  ON public.magic_links
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.backlogs
      WHERE backlogs.id = magic_links.backlog_id
      AND backlogs.owner_id = auth.uid()
    )
  );

-- Owners can revoke (update) magic links for their backlogs
CREATE POLICY "Owners can update magic links for their backlogs"
  ON public.magic_links
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.backlogs
      WHERE backlogs.id = magic_links.backlog_id
      AND backlogs.owner_id = auth.uid()
    )
  );

-- Note: Magic link creation and recipient access is handled via service role
-- Service role operations bypass RLS, which is appropriate for:
-- 1. Creating magic links (POST /api/sendNudge)
-- 2. Verifying tokens and updating promises (POST /api/magic/action)

-- =============================================================================
-- GRANT PERMISSIONS
-- =============================================================================

-- Ensure authenticated users can access their own data
GRANT SELECT, INSERT, UPDATE, DELETE ON public.contacts TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.backlogs TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.promises TO authenticated;
GRANT SELECT, UPDATE ON public.magic_links TO authenticated;
GRANT SELECT, UPDATE ON public.users TO authenticated;
