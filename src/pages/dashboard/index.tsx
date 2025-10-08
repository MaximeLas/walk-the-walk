/**
 * Owner Dashboard
 * Lists all backlogs with stats and provides create new backlog functionality
 */

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSupabaseClient } from '@/lib/supabaseClient';
import { User } from '@supabase/supabase-js';
import { Backlog, Contact, PromiseItem } from '@/types';

interface BacklogWithStats extends Backlog {
  contact?: Contact | null;
  stats: {
    total: number;
    open: number;
    done: number;
  };
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [backlogs, setBacklogs] = useState<BacklogWithStats[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [creating, setCreating] = useState(false);

  // Form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [backlogTitle, setBacklogTitle] = useState('');

  useEffect(() => {
    const supabase = getSupabaseClient();

    // Check auth
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push('/');
        return;
      }
      setUser(session.user);
      loadBacklogs();
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.push('/');
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  async function loadBacklogs() {
    try {
      const supabase = getSupabaseClient();

      // Fetch backlogs with contacts
      const { data: backlogsData, error: backlogsError } = await supabase
        .from('backlogs')
        .select('*, contact:contacts(*)')
        .order('created_at', { ascending: false });

      if (backlogsError) throw backlogsError;

      // Fetch promises for all backlogs
      const backlogIds = (backlogsData || []).map((b) => b.id);
      const { data: promisesData } = await supabase
        .from('promises')
        .select('*')
        .in('backlog_id', backlogIds);

      // Calculate stats for each backlog
      const backlogsWithStats: BacklogWithStats[] = (backlogsData || []).map(
        (backlog) => {
          const backlogPromises = (promisesData || []).filter(
            (p) => p.backlog_id === backlog.id
          );
          const openCount = backlogPromises.filter((p) => p.status === 'open').length;
          const doneCount = backlogPromises.filter((p) => p.status === 'done').length;

          return {
            ...backlog,
            contact: (backlog as any).contact,
            stats: {
              total: backlogPromises.length,
              open: openCount,
              done: doneCount,
            },
          };
        }
      );

      setBacklogs(backlogsWithStats);
    } catch (error) {
      console.error('Failed to load backlogs:', error);
      alert('Failed to load backlogs');
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateBacklog(e: React.FormEvent) {
    e.preventDefault();
    setCreating(true);

    try {
      const response = await fetch('/api/backlogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contactName,
          contactEmail: contactEmail || undefined,
          title: backlogTitle || undefined,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create backlog');
      }

      const { backlog } = await response.json();

      // Reset form
      setContactName('');
      setContactEmail('');
      setBacklogTitle('');
      setShowCreateForm(false);

      // Navigate to new backlog
      router.push(`/backlog/${backlog.id}`);
    } catch (error) {
      console.error('Failed to create backlog:', error);
      alert(error instanceof Error ? error.message : 'Failed to create backlog');
    } finally {
      setCreating(false);
    }
  }

  async function handleSignOut() {
    const supabase = getSupabaseClient();
    await supabase.auth.signOut();
    router.push('/');
  }

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '40px 20px',
      }}
    >
      {/* Header */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px',
        }}
      >
        <div>
          <h1 style={{ marginBottom: '8px' }}>Dashboard</h1>
          <p style={{ color: '#666' }}>{user?.email}</p>
        </div>
        <button
          data-testid="sign-out-button"
          onClick={handleSignOut}
          style={{
            padding: '8px 16px',
            backgroundColor: '#f3f4f6',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Sign Out
        </button>
      </header>

      {/* Create Backlog Button */}
      {!showCreateForm && (
        <button
          data-testid="create-backlog-button"
          onClick={() => setShowCreateForm(true)}
          style={{
            padding: '12px 24px',
            backgroundColor: '#4F46E5',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 500,
            marginBottom: '32px',
          }}
        >
          + Create New Backlog
        </button>
      )}

      {/* Create Form */}
      {showCreateForm && (
        <form
          onSubmit={handleCreateBacklog}
          style={{
            padding: '24px',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            marginBottom: '32px',
          }}
        >
          <h2 style={{ marginBottom: '16px', fontSize: '20px' }}>Create New Backlog</h2>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: 500 }}>
              Contact Name *
            </label>
            <input
              data-testid="contact-name-input"
              type="text"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '8px 12px',
                fontSize: '16px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
              }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: 500 }}>
              Contact Email (optional)
            </label>
            <input
              data-testid="contact-email-input"
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                fontSize: '16px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
              }}
            />
            <p style={{ fontSize: '14px', color: '#666', marginTop: '4px' }}>
              Required to send nudge emails
            </p>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: 500 }}>
              Backlog Title (optional)
            </label>
            <input
              data-testid="backlog-title-input"
              type="text"
              value={backlogTitle}
              onChange={(e) => setBacklogTitle(e.target.value)}
              placeholder="e.g., Q1 Goals, Project Milestones"
              style={{
                width: '100%',
                padding: '8px 12px',
                fontSize: '16px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              data-testid="submit-create-backlog-button"
              type="submit"
              disabled={creating}
              style={{
                padding: '10px 20px',
                backgroundColor: '#4F46E5',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: creating ? 'not-allowed' : 'pointer',
                opacity: creating ? 0.6 : 1,
                fontWeight: 500,
              }}
            >
              {creating ? 'Creating...' : 'Create Backlog'}
            </button>
            <button
              data-testid="cancel-create-backlog-button"
              type="button"
              onClick={() => setShowCreateForm(false)}
              disabled={creating}
              style={{
                padding: '10px 20px',
                backgroundColor: '#f3f4f6',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Backlogs List */}
      {backlogs.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
          <p>No backlogs yet. Create one to get started!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {backlogs.map((backlog) => (
            <div
              key={backlog.id}
              data-testid="backlog-card"
              onClick={() => router.push(`/backlog/${backlog.id}`)}
              style={{
                padding: '20px',
                backgroundColor: 'white',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'box-shadow 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <h3 style={{ marginBottom: '8px', fontSize: '18px' }}>
                {backlog.title || 'Untitled Backlog'}
              </h3>
              <p style={{ color: '#666', marginBottom: '12px' }}>
                Contact: {backlog.contact?.name || 'Unknown'}
                {backlog.contact?.email && ` (${backlog.contact.email})`}
              </p>
              <div style={{ display: 'flex', gap: '16px', fontSize: '14px' }}>
                <span>
                  <strong>{backlog.stats.total}</strong> total promises
                </span>
                <span style={{ color: '#EF4444' }}>
                  <strong>{backlog.stats.open}</strong> open
                </span>
                <span style={{ color: '#10B981' }}>
                  <strong>{backlog.stats.done}</strong> done
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
