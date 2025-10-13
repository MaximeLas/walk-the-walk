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
      <div className="p-10 text-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (user) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-3xl font-bold mb-4">WalkTheWalk</h1>
        <p className="mb-4">Welcome back, {user.email}!</p>
        <a href="/dashboard" className="text-indigo-600 hover:underline">Go to Dashboard</a>
      </div>
    );
  }

  return (
    <div className="p-10 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">WalkTheWalk - Nudge MVP</h1>
      <p className="text-lg text-gray-700 mb-8">An accountability platform for tracking promises and sending nudges.</p>
      <div className="mt-8">
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
          className="px-6 py-3 text-base font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 cursor-pointer"
        >
          Sign In with Email
        </button>
      </div>

      {/* Tailwind test - visible confirmation */}
      <div className="mt-8 p-4 bg-green-100 border-2 border-green-500 rounded-lg">
        <p className="text-green-800 font-semibold">✅ Tailwind CSS is working!</p>
      </div>
    </div>
  );
}
