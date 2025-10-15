/**
 * Home page / Landing
 * For MVP, redirect to dashboard if authenticated, otherwise show simple landing
 */

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSupabaseClient } from '@/lib/supabaseClient';
import { User } from '@supabase/supabase-js';

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = getSupabaseClient();

    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="p-10 text-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (user) {
    // Redirect to dashboard if authenticated
    router.push('/dashboard');
    return (
      <div className="p-10 text-center">
        <p className="text-lg">Redirecting to dashboard...</p>
      </div>
    );
  }

  // Not authenticated, redirect to login
  router.push('/login');
  return (
    <div className="p-10 text-center">
      <p className="text-lg">Redirecting to login...</p>
    </div>
  );
}
