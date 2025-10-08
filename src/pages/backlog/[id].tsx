/**
 * Backlog Management Page
 * View/manage promises, add new promises, send nudge emails
 */

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSupabaseClient } from '@/lib/supabaseClient';
import { User } from '@supabase/supabase-js';
import { Backlog, Contact, PromiseItem } from '@/types';
import { isTestMode, TEST_USER } from '@/lib/testAuth';

export default function BacklogPage() {
  const router = useRouter();
  const { id: backlogId } = router.query;

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [backlog, setBacklog] = useState<Backlog | null>(null);
  const [contact, setContact] = useState<Contact | null>(null);
  const [promises, setPromises] = useState<PromiseItem[]>([]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [adding, setAdding] = useState(false);
  const [sending, setSending] = useState(false);

  // Form state
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    // Bypass auth in test mode
    if (isTestMode()) {
      setUser(TEST_USER as User);
      if (backlogId) {
        loadBacklog();
      }
      return;
    }

    const supabase = getSupabaseClient();

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push('/');
        return;
      }
      setUser(session.user);
      if (backlogId) {
        loadBacklog();
      }
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
  }, [router, backlogId]);

  async function loadBacklog() {
    try {
      // Fetch backlog via API route (works in both test and production modes)
      const response = await fetch(`/api/backlogs/${backlogId}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch backlog: ${response.statusText}`);
      }

      const { backlog: backlogData, promises: promisesData } = await response.json();

      setBacklog(backlogData);
      setContact((backlogData as any).contact);
      setPromises(promisesData || []);
    } catch (error) {
      console.error('Failed to load backlog:', error);
      alert('Failed to load backlog');
      router.push('/dashboard');
    } finally {
      setLoading(false);
    }
  }

  async function handleAddPromise(e: React.FormEvent) {
    e.preventDefault();
    setAdding(true);

    try {
      const response = await fetch(`/api/promises`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          backlogId,
          text: description,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to add promise');
      }

      const { promise } = await response.json();

      // Add to local state
      setPromises([promise, ...promises]);

      // Reset form
      setDescription('');
      setDueDate('');
      setShowAddForm(false);
    } catch (error) {
      console.error('Failed to add promise:', error);
      alert(error instanceof Error ? error.message : 'Failed to add promise');
    } finally {
      setAdding(false);
    }
  }

  async function handleSendNudge() {
    if (!contact?.email) {
      alert('Contact does not have an email address. Please add one first.');
      return;
    }

    if (!confirm('Send nudge email to ' + contact.email + '?')) {
      return;
    }

    setSending(true);

    try {
      const response = await fetch('/api/sendNudge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ backlogId }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to send nudge');
      }

      alert(`Nudge email sent successfully to ${contact.email}!`);
    } catch (error) {
      console.error('Failed to send nudge:', error);
      alert(error instanceof Error ? error.message : 'Failed to send nudge');
    } finally {
      setSending(false);
    }
  }

  async function handleToggleStatus(promise: PromiseItem) {
    const newStatus = promise.status === 'done' ? 'open' : 'done';

    try {
      const response = await fetch(`/api/promises/${promise.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update promise');
      }

      const { promise: updatedPromise } = await response.json();

      // Update local state
      setPromises(promises.map((p) => (p.id === promise.id ? updatedPromise : p)));
    } catch (error) {
      console.error('Failed to update promise:', error);
      alert('Failed to update promise');
    }
  }

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (!backlog) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <p>Backlog not found</p>
      </div>
    );
  }

  const openPromises = promises.filter((p) => p.status === 'open');
  const donePromises = promises.filter((p) => p.status === 'done');

  return (
    <div
      style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '40px 20px',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <button
          onClick={() => router.push('/dashboard')}
          style={{
            padding: '8px 16px',
            backgroundColor: '#f3f4f6',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            cursor: 'pointer',
            marginBottom: '16px',
          }}
        >
          ← Back to Dashboard
        </button>

        <h1 style={{ marginBottom: '8px' }}>{backlog.title || 'Untitled Backlog'}</h1>
        <p style={{ color: '#666', marginBottom: '16px' }}>
          Contact: {contact?.name || 'Unknown'}
          {contact?.email && ` (${contact.email})`}
        </p>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => setShowAddForm(true)}
            disabled={showAddForm}
            style={{
              padding: '10px 20px',
              backgroundColor: '#4F46E5',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: showAddForm ? 'not-allowed' : 'pointer',
              opacity: showAddForm ? 0.6 : 1,
              fontWeight: 500,
            }}
          >
            + Add Promise
          </button>

          <button
            onClick={handleSendNudge}
            disabled={sending || !contact?.email}
            style={{
              padding: '10px 20px',
              backgroundColor: '#10B981',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: sending || !contact?.email ? 'not-allowed' : 'pointer',
              opacity: sending || !contact?.email ? 0.6 : 1,
              fontWeight: 500,
            }}
          >
            {sending ? 'Sending...' : 'Send Nudge Email'}
          </button>
        </div>
      </div>

      {/* Add Promise Form */}
      {showAddForm && (
        <form
          onSubmit={handleAddPromise}
          style={{
            padding: '20px',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            marginBottom: '32px',
          }}
        >
          <h3 style={{ marginBottom: '16px' }}>Add New Promise</h3>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: 500 }}>
              Description *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={3}
              style={{
                width: '100%',
                padding: '8px 12px',
                fontSize: '16px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontFamily: 'inherit',
              }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: 500 }}>
              Due Date (optional)
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              style={{
                padding: '8px 12px',
                fontSize: '16px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              type="submit"
              disabled={adding}
              style={{
                padding: '10px 20px',
                backgroundColor: '#4F46E5',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: adding ? 'not-allowed' : 'pointer',
                opacity: adding ? 0.6 : 1,
                fontWeight: 500,
              }}
            >
              {adding ? 'Adding...' : 'Add Promise'}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowAddForm(false);
                setDescription('');
                setDueDate('');
              }}
              disabled={adding}
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

      {/* Open Promises */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '16px', color: '#2c3e50' }}>
          Open Promises ({openPromises.length})
        </h2>

        {openPromises.length === 0 ? (
          <p style={{ color: '#666', fontStyle: 'italic' }}>No open promises</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {openPromises.map((promise) => (
              <div
                key={promise.id}
                style={{
                  padding: '16px',
                  backgroundColor: 'white',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
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
                  onClick={() => handleToggleStatus(promise)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#10B981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: 500,
                    whiteSpace: 'nowrap',
                  }}
                >
                  Mark Done
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Completed Promises */}
      {donePromises.length > 0 && (
        <section>
          <h2 style={{ fontSize: '20px', marginBottom: '16px', color: '#2c3e50' }}>
            Completed ({donePromises.length})
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {donePromises.map((promise) => (
              <div
                key={promise.id}
                style={{
                  padding: '16px',
                  backgroundColor: '#f9f9f9',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  opacity: 0.7,
                }}
              >
                <div style={{ flex: 1 }}>
                  <p style={{ textDecoration: 'line-through', color: '#666' }}>
                    {promise.description}
                  </p>
                  {promise.completed_at && (
                    <p style={{ fontSize: '14px', color: '#999', marginTop: '4px' }}>
                      Completed: {new Date(promise.completed_at).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => handleToggleStatus(promise)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#f3f4f6',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Reopen
                </button>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
