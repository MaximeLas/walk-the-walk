/**
 * Backlog Detail Page
 * Shows all promises for a backlog with add/edit/delete functionality
 */

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSupabaseClient } from '@/lib/supabaseClient';
import { User } from '@supabase/supabase-js';
import { Backlog, Contact, PromiseItem } from '@/types';

export default function BacklogDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [backlog, setBacklog] = useState<Backlog | null>(null);
  const [contact, setContact] = useState<Contact | null>(null);
  const [promises, setPromises] = useState<PromiseItem[]>([]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newPromiseText, setNewPromiseText] = useState('');
  const [adding, setAdding] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    const supabase = getSupabaseClient();

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push('/');
        return;
      }
      setUser(session.user);
      if (id) {
        loadBacklog(id as string);
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
  }, [id, router]);

  async function loadBacklog(backlogId: string) {
    try {
      const supabase = getSupabaseClient();

      const { data: backlogData, error: backlogError } = await supabase
        .from('backlogs')
        .select('*, contact:contacts(*)')
        .eq('id', backlogId)
        .single();

      if (backlogError) throw backlogError;

      setBacklog(backlogData);
      setContact((backlogData as any).contact);

      const { data: promisesData, error: promisesError } = await supabase
        .from('promises')
        .select('*')
        .eq('backlog_id', backlogId)
        .order('created_at', { ascending: false });

      if (promisesError) throw promisesError;

      setPromises(promisesData || []);
    } catch (error) {
      console.error('Failed to load backlog:', error);
      alert('Failed to load backlog');
    } finally {
      setLoading(false);
    }
  }

  async function handleAddPromise(e: React.FormEvent) {
    e.preventDefault();
    if (!newPromiseText.trim()) return;

    setAdding(true);
    try {
      const response = await fetch(`/api/backlogs/${id}/promises`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newPromiseText }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to add promise');
      }

      const { promise } = await response.json();
      setPromises([promise, ...promises]);
      setNewPromiseText('');
      setShowAddForm(false);
    } catch (error) {
      console.error('Failed to add promise:', error);
      alert(error instanceof Error ? error.message : 'Failed to add promise');
    } finally {
      setAdding(false);
    }
  }

  async function handleUpdatePromise(promiseId: string, updates: Partial<PromiseItem>) {
    try {
      const response = await fetch(`/api/promises/${promiseId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update promise');
      }

      const { promise: updatedPromise } = await response.json();
      setPromises(
        promises.map((p) => (p.id === promiseId ? updatedPromise : p))
      );
      setEditingId(null);
      setEditText('');
    } catch (error) {
      console.error('Failed to update promise:', error);
      alert(error instanceof Error ? error.message : 'Failed to update promise');
    }
  }

  async function handleSendNudge() {
    if (!contact?.email) {
      alert('Contact has no email address. Add an email to send nudges.');
      return;
    }

    const confirmed = confirm(
      `Send a nudge email to ${contact.name} (${contact.email})?`
    );
    if (!confirmed) return;

    try {
      const response = await fetch('/api/sendNudge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ backlogId: id }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to send nudge');
      }

      alert('Nudge sent successfully!');
    } catch (error) {
      console.error('Failed to send nudge:', error);
      alert(error instanceof Error ? error.message : 'Failed to send nudge');
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
        <button onClick={() => router.push('/dashboard')}>Back to Dashboard</button>
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
      <header style={{ marginBottom: '32px' }}>
        <button
          onClick={() => router.push('/dashboard')}
          style={{
            marginBottom: '16px',
            padding: '8px 16px',
            backgroundColor: '#f3f4f6',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          ← Back to Dashboard
        </button>
        <h1 style={{ marginBottom: '8px' }}>
          {backlog.title || 'Untitled Backlog'}
        </h1>
        <p style={{ color: '#666' }}>
          Contact: {contact?.name || 'Unknown'}
          {contact?.email && ` (${contact.email})`}
        </p>
      </header>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
        <button
          onClick={() => setShowAddForm(true)}
          style={{
            padding: '12px 24px',
            backgroundColor: '#4F46E5',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 500,
          }}
        >
          + Add Promise
        </button>
        <button
          onClick={handleSendNudge}
          disabled={!contact?.email}
          style={{
            padding: '12px 24px',
            backgroundColor: contact?.email ? '#10B981' : '#d1d5db',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: contact?.email ? 'pointer' : 'not-allowed',
            fontSize: '16px',
            fontWeight: 500,
          }}
        >
          Send Nudge
        </button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <form
          onSubmit={handleAddPromise}
          style={{
            padding: '24px',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            marginBottom: '32px',
          }}
        >
          <h2 style={{ marginBottom: '16px', fontSize: '20px' }}>Add New Promise</h2>
          <div style={{ marginBottom: '16px' }}>
            <textarea
              value={newPromiseText}
              onChange={(e) => setNewPromiseText(e.target.value)}
              placeholder="Enter promise text..."
              required
              rows={3}
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '16px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontFamily: 'inherit',
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
                setNewPromiseText('');
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

      {/* Promises List */}
      {promises.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
          <p>No promises yet. Add one to get started!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {promises.map((promise) => (
            <div
              key={promise.id}
              style={{
                padding: '16px',
                backgroundColor: 'white',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
              }}
            >
              {editingId === promise.id ? (
                <div>
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '8px',
                      marginBottom: '8px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontFamily: 'inherit',
                    }}
                  />
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => handleUpdatePromise(promise.id, { description: editText })}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#4F46E5',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '14px',
                      }}
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditingId(null);
                        setEditText('');
                      }}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#f3f4f6',
                        border: '1px solid #d1d5db',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '14px',
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <p style={{ marginBottom: '12px', fontSize: '16px' }}>{promise.description}</p>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div style={{ display: 'flex', gap: '8px', fontSize: '14px' }}>
                      <span
                        style={{
                          padding: '4px 8px',
                          backgroundColor:
                            promise.status === 'done'
                              ? '#D1FAE5'
                              : promise.status === 'cancelled'
                              ? '#FEE2E2'
                              : '#FEF3C7',
                          color:
                            promise.status === 'done'
                              ? '#065F46'
                              : promise.status === 'cancelled'
                              ? '#991B1B'
                              : '#92400E',
                          borderRadius: '4px',
                          fontWeight: 500,
                        }}
                      >
                        {promise.status}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {promise.status === 'open' && (
                        <button
                          onClick={() =>
                            handleUpdatePromise(promise.id, { status: 'done' })
                          }
                          style={{
                            padding: '6px 12px',
                            backgroundColor: '#10B981',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '14px',
                          }}
                        >
                          Mark Done
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setEditingId(promise.id);
                          setEditText(promise.description);
                        }}
                        style={{
                          padding: '6px 12px',
                          backgroundColor: '#f3f4f6',
                          border: '1px solid #d1d5db',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '14px',
                        }}
                      >
                        Edit
                      </button>
                      {promise.status !== 'cancelled' && (
                        <button
                          onClick={() =>
                            handleUpdatePromise(promise.id, { status: 'cancelled' })
                          }
                          style={{
                            padding: '6px 12px',
                            backgroundColor: '#FEE2E2',
                            color: '#991B1B',
                            border: '1px solid #FCA5A5',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '14px',
                          }}
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
