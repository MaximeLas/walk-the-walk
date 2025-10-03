/**
 * Home page / Landing
 * For MVP, redirect to dashboard if authenticated, otherwise show simple landing
 */

import { useEffect, useState } from 'react';
import { getSupabaseClient } from '@/lib/supabaseClient';
import { User } from '@supabase/supabase-js';

export default function Home() {
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
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (user) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h1>WalkTheWalk</h1>
        <p>Welcome back, {user.email}!</p>
        <a href="/dashboard">Go to Dashboard</a>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>WalkTheWalk - Nudge MVP</h1>
      <p>An accountability platform for tracking promises and sending nudges.</p>
      <div style={{ marginTop: '32px' }}>
        <button
          onClick={async () => {
            const supabase = getSupabaseClient();
            const email = prompt('Enter your email to sign in:');
            if (email) {
              const { error } = await supabase.auth.signInWithOtp({ email });
              if (error) {
                alert('Error: ' + error.message);
              } else {
                alert('Check your email for a magic link!');
              }
            }
          }}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            backgroundColor: '#4F46E5',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Sign In with Email
        </button>
      </div>
    </div>
  );
}
