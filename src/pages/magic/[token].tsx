/**
 * /magic/[token] - Recipient view page
 *
 * Server-side rendered page that verifies magic token and displays backlog
 * Allows recipient to mark promises as done without authentication
 */

import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { getSupabaseServiceClient } from '@/lib/supabaseClient';
import { verifyToken } from '@/lib/token';
import {
  Backlog,
  Contact,
  PromiseItem,
  MagicLink,
} from '@/types';

interface MagicPageProps {
  token: string;
  backlog: Backlog;
  contact: Contact | null;
  promises: PromiseItem[];
  error?: string;
}

export default function MagicPage({
  token,
  backlog,
  contact,
  promises: initialPromises,
  error,
}: MagicPageProps) {
  const [promises, setPromises] = useState(initialPromises);
  const [updating, setUpdating] = useState<string | null>(null);

  if (error) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h1>Invalid or Expired Link</h1>
        <p>{error}</p>
      </div>
    );
  }

  const handleMarkDone = async (promiseId: string) => {
    setUpdating(promiseId);

    try {
      const response = await fetch('/api/magic/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          action: 'mark_done',
          promiseId,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        alert('Error: ' + (data.error || 'Failed to update promise'));
        return;
      }

      // Update local state
      setPromises((prev) =>
        prev.map((p) =>
          p.id === promiseId
            ? { ...p, status: 'done' as const, completed_at: new Date().toISOString() }
            : p
        )
      );
    } catch (error) {
      console.error('Failed to mark done:', error);
      alert('Failed to update promise. Please try again.');
    } finally {
      setUpdating(null);
    }
  };

  const openPromises = promises.filter((p) => p.status === 'open');
  const donePromises = promises.filter((p) => p.status === 'done');

  return (
    <div
      style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '40px 20px',
      }}
    >
      <header style={{ marginBottom: '32px' }}>
        <h1 style={{ marginBottom: '8px' }}>
          {backlog.title || 'Your Promises'}
        </h1>
        {contact && (
          <p style={{ color: '#666', fontSize: '18px' }}>
            Hi {contact.name}, here's your accountability backlog.
          </p>
        )}
      </header>

      {/* Open Promises */}
      <section style={{ marginBottom: '40px' }}>
        <h2
          style={{
            fontSize: '20px',
            marginBottom: '16px',
            color: '#2c3e50',
          }}
        >
          Open Promises ({openPromises.length})
        </h2>

        {openPromises.length === 0 ? (
          <p style={{ color: '#666', fontStyle: 'italic' }}>
            All promises completed! 🎉
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {openPromises.map((promise) => (
              <div
                key={promise.id}
                style={{
                  padding: '16px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  backgroundColor: '#fff',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 500, marginBottom: '4px' }}>
                    {promise.description}
                  </p>
                  {promise.due_date && (
                    <p style={{ fontSize: '14px', color: '#666' }}>
                      Due: {new Date(promise.due_date).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => handleMarkDone(promise.id)}
                  disabled={updating === promise.id}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#10B981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: updating === promise.id ? 'not-allowed' : 'pointer',
                    opacity: updating === promise.id ? 0.6 : 1,
                    fontWeight: 500,
                  }}
                >
                  {updating === promise.id ? 'Updating...' : 'Mark Done'}
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Completed Promises */}
      {donePromises.length > 0 && (
        <section>
          <h2
            style={{
              fontSize: '20px',
              marginBottom: '16px',
              color: '#2c3e50',
            }}
          >
            Completed ({donePromises.length})
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {donePromises.map((promise) => (
              <div
                key={promise.id}
                style={{
                  padding: '16px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  backgroundColor: '#f9f9f9',
                  opacity: 0.7,
                }}
              >
                <p style={{ textDecoration: 'line-through', color: '#666' }}>
                  {promise.description}
                </p>
                {promise.completed_at && (
                  <p style={{ fontSize: '14px', color: '#999', marginTop: '4px' }}>
                    Completed: {new Date(promise.completed_at).toLocaleDateString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      <footer
        style={{
          marginTop: '64px',
          paddingTop: '24px',
          borderTop: '1px solid #e0e0e0',
          textAlign: 'center',
          color: '#999',
          fontSize: '14px',
        }}
      >
        <p>Powered by Nudge</p>
      </footer>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { token } = context.params as { token: string };

  if (!token) {
    return {
      props: {
        token: '',
        backlog: null,
        contact: null,
        promises: [],
        error: 'No token provided',
      },
    };
  }

  try {
    const serviceSupabase = getSupabaseServiceClient();

    // Fetch all non-revoked magic links and verify token
    const { data: magicLinks, error: magicLinksError } = await serviceSupabase
      .from('magic_links')
      .select('*')
      .eq('revoked', false);

    if (magicLinksError) {
      console.error('Failed to fetch magic links:', magicLinksError);
      return {
        props: {
          token,
          backlog: null,
          contact: null,
          promises: [],
          error: 'Failed to verify token',
        },
      };
    }

    // Find matching magic link
    let validMagicLink: MagicLink | null = null;

    for (const link of magicLinks as MagicLink[]) {
      if (verifyToken(token, link.token_hash)) {
        // Check if expired
        if (link.expires_at && new Date(link.expires_at) < new Date()) {
          return {
            props: {
              token,
              backlog: null,
              contact: null,
              promises: [],
              error: 'This link has expired',
            },
          };
        }
        validMagicLink = link;
        break;
      }
    }

    if (!validMagicLink) {
      return {
        props: {
          token,
          backlog: null,
          contact: null,
          promises: [],
          error: 'Invalid or revoked link',
        },
      };
    }

    // Fetch backlog
    const { data: backlog, error: backlogError } = await serviceSupabase
      .from('backlogs')
      .select('*')
      .eq('id', validMagicLink.backlog_id)
      .single();

    if (backlogError || !backlog) {
      return {
        props: {
          token,
          backlog: null,
          contact: null,
          promises: [],
          error: 'Backlog not found',
        },
      };
    }

    // Fetch contact
    let contact = null;
    if ((backlog as Backlog).contact_id) {
      const { data: contactData } = await serviceSupabase
        .from('contacts')
        .select('*')
        .eq('id', (backlog as Backlog).contact_id!)
        .single();

      contact = contactData;
    }

    // Fetch promises
    const { data: promises } = await serviceSupabase
      .from('promises')
      .select('*')
      .eq('backlog_id', validMagicLink.backlog_id)
      .order('created_at', { ascending: false });

    return {
      props: {
        token,
        backlog: backlog as Backlog,
        contact: contact as Contact | null,
        promises: (promises as PromiseItem[]) || [],
      },
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return {
      props: {
        token,
        backlog: null,
        contact: null,
        promises: [],
        error: 'An error occurred while loading the page',
      },
    };
  }
};
