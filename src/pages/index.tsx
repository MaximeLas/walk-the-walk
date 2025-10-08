/**
 * Home page / Landing
 * For MVP, redirect to dashboard if authenticated, otherwise show simple landing
 */

import { useEffect, useState } from 'react';
import { getSupabaseClient } from '@/lib/supabaseClient';
import { User } from '@supabase/supabase-js';
import { withTimeout, TEST_TIMEOUTS, testLog } from '@/lib/testMode';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Modal state for sign-in
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [email, setEmail] = useState('');
  const [signingIn, setSigningIn] = useState(false);

  // Message modal state
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');

  useEffect(() => {
    const supabase = getSupabaseClient();

    // Check current session with timeout in test mode
    testLog('Checking session...');
    withTimeout(
      supabase.auth.getSession(),
      TEST_TIMEOUTS.auth,
      'Session check timed out'
    )
      .then(({ data: { session } }) => {
        testLog('Session loaded', session ? 'authenticated' : 'not authenticated');
        setUser(session?.user ?? null);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Auth error:', error);
        testLog('Auth error', error.message);
        setLoading(false);
      });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      testLog('Auth state changed', session ? 'authenticated' : 'not authenticated');
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setSigningIn(true);
    testLog('Signing in with email', email);

    try {
      const supabase = getSupabaseClient();
      const { error } = await withTimeout(
        supabase.auth.signInWithOtp({ email: email.trim() }),
        TEST_TIMEOUTS.auth,
        'Sign in timed out'
      );

      if (error) {
        testLog('Sign in error', error.message);
        setMessage('Error: ' + error.message);
        setMessageType('error');
        setShowMessageModal(true);
      } else {
        testLog('Sign in successful');
        setMessage('Check your email for a magic link!');
        setMessageType('success');
        setShowMessageModal(true);
        setShowEmailModal(false);
        setEmail('');
      }
    } catch (error) {
      console.error('Sign in failed:', error);
      setMessage(error instanceof Error ? error.message : 'Sign in failed');
      setMessageType('error');
      setShowMessageModal(true);
    } finally {
      setSigningIn(false);
    }
  }

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
        <a href="/dashboard" data-testid="go-to-dashboard-link">
          Go to Dashboard
        </a>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>WalkTheWalk - Nudge MVP</h1>
      <p>An accountability platform for tracking promises and sending nudges.</p>
      <div style={{ marginTop: '32px' }}>
        <button
          data-testid="sign-in-button"
          onClick={() => setShowEmailModal(true)}
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

      {/* Email Sign-In Modal */}
      {showEmailModal && (
        <div
          data-testid="email-modal"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
          onClick={() => !signingIn && setShowEmailModal(false)}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '32px',
              borderRadius: '12px',
              maxWidth: '400px',
              width: '90%',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ marginBottom: '16px', fontSize: '24px' }}>Sign In</h2>
            <form onSubmit={handleSignIn}>
              <div style={{ marginBottom: '20px' }}>
                <label
                  htmlFor="email-input"
                  style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}
                >
                  Email Address
                </label>
                <input
                  id="email-input"
                  data-testid="email-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  autoFocus
                  disabled={signingIn}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    fontSize: '16px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                  }}
                />
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  type="submit"
                  data-testid="submit-email-button"
                  disabled={signingIn}
                  style={{
                    flex: 1,
                    padding: '10px 20px',
                    backgroundColor: '#4F46E5',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: signingIn ? 'not-allowed' : 'pointer',
                    opacity: signingIn ? 0.6 : 1,
                    fontWeight: 500,
                  }}
                >
                  {signingIn ? 'Sending...' : 'Send Magic Link'}
                </button>
                <button
                  type="button"
                  data-testid="cancel-email-button"
                  onClick={() => setShowEmailModal(false)}
                  disabled={signingIn}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#f3f4f6',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    cursor: signingIn ? 'not-allowed' : 'pointer',
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Message Modal */}
      {showMessageModal && (
        <div
          data-testid="message-modal"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
          onClick={() => setShowMessageModal(false)}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '32px',
              borderRadius: '12px',
              maxWidth: '400px',
              width: '90%',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '24px',
                color: messageType === 'error' ? '#EF4444' : '#10B981',
              }}
            >
              {messageType === 'error' ? 'Error' : 'Success'}
            </h2>
            <p style={{ marginBottom: '20px', fontSize: '16px' }}>{message}</p>
            <button
              data-testid="close-message-button"
              onClick={() => setShowMessageModal(false)}
              style={{
                width: '100%',
                padding: '10px 20px',
                backgroundColor: '#4F46E5',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 500,
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
