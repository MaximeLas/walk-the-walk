-- Migration: User Sync Trigger
-- Purpose: Automatically sync auth.users to public.users table
-- This ensures every authenticated user has a corresponding entry in public.users
-- which is used for ownership and relationships (contacts, backlogs, etc.)

-- Create function to handle new user creation/update
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  -- Insert or update user in public.users table
  INSERT INTO public.users (id, email, created_at)
  VALUES (NEW.id, NEW.email, NEW.created_at)
  ON CONFLICT (id)
  DO UPDATE SET
    email = EXCLUDED.email;

  RETURN NEW;
END;
$$;

-- Create trigger on auth.users table
-- Fires after INSERT or UPDATE on auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT OR UPDATE ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Backfill existing users (run once during migration)
-- This ensures any users created before the trigger was added are synced
INSERT INTO public.users (id, email, created_at)
SELECT id, email, created_at
FROM auth.users
ON CONFLICT (id) DO NOTHING;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON public.users TO postgres, service_role;
GRANT SELECT ON public.users TO anon, authenticated;
