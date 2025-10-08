/**
 * Backlog Management Page
 * View/manage promises, add new promises, send nudge emails
 */

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSupabaseClient } from '@/lib/supabaseClient';
import { User } from '@supabase/supabase-js';
import { Backlog, Contact, PromiseItem } from '@/types';
import { withTimeout, TEST_TIMEOUTS, testLog } from '@/lib/testMode';

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

  // Modal state for confirmations and messages
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState('');
  const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);

  const [showMessageModal, setShowMessageModal] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');

  useEffect(() => {
    const supabase = getSupabaseClient();

    testLog('Checking session on backlog page...');
    withTimeout(
      supabase.auth.getSession(),
      TEST_TIMEOUTS.auth,
      'Session check timed out'
    )
      .then(({ data: { session } }) => {
        if (!session) {
          testLog('No session, redirecting to home');
          router.push('/');
          return;
        }
        testLog('Session found, loading backlog');
        setUser(session.user);
        if (backlogId) {
          loadBacklog();
        }
      })
      .catch((error) => {
        console.error('Auth error:', error);
        testLog('Auth error', error.message);
        router.push('/');
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
      const supabase = getSupabaseClient();

      // Fetch backlog with contact
      const { data: backlogData, error: backlogError } = await supabase
        .from('backlogs')
        .select('*, contact:contacts(*)')
        .eq('id', backlogId)
        .single();

      if (backlogError) throw backlogError;

      setBacklog(backlogData as Backlog);
      setContact((backlogData as any).contact);

      // Fetch promises
      const { data: promisesData, error: promisesError } = await supabase
        .from('promises')
        .select('*')
        .eq('backlog_id', backlogId)
        .order('created_at', { ascending: false });

      if (promisesError) throw promisesError;

      setPromises((promisesData as PromiseItem[]) || []);
    } catch (error) {
      console.error('Failed to load backlog:', error);
      testLog('Failed to load backlog', error);
      setMessage('Failed to load backlog');
      setMessageType('error');
      setShowMessageModal(true);
      setTimeout(() => router.push('/dashboard'), 2000);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddPromise(e: React.FormEvent) {
    e.preventDefault();
    setAdding(true);

    try {
      const response = await fetch(`/api/backlogs/${backlogId}/promises`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description,
          dueDate: dueDate || undefined,
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
      testLog('Failed to add promise', error);
      setMessage(error instanceof Error ? error.message : 'Failed to add promise');
      setMessageType('error');
      setShowMessageModal(true);
    } finally {
      setAdding(false);
    }
  }

  function handleSendNudgeClick() {
    if (!contact?.email) {
      setMessage('Contact does not have an email address. Please add one first.');
      setMessageType('error');
      setShowMessageModal(true);
      return;
    }

    setConfirmMessage(`Send nudge email to ${contact.email}?`);
    setConfirmAction(() => async () => {
      setShowConfirmModal(false);
      setSending(true);
      testLog('Sending nudge email', contact.email);

      try {
        const response = await withTimeout(
          fetch('/api/sendNudge', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ backlogId }),
          }),
          TEST_TIMEOUTS.api,
          'Send nudge timed out'
        );

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Failed to send nudge');
        }

        testLog('Nudge sent successfully');
        setMessage(`Nudge email sent successfully to ${contact.email}!`);
        setMessageType('success');
        setShowMessageModal(true);
      } catch (error) {
        console.error('Failed to send nudge:', error);
        testLog('Send nudge error', error);
        setMessage(error instanceof Error ? error.message : 'Failed to send nudge');
        setMessageType('error');
        setShowMessageModal(true);
      } finally {
        setSending(false);
      }
    });
    setShowConfirmModal(true);
  }

  async function handleToggleStatus(promise: PromiseItem) {
    const newStatus = promise.status === 'done' ? 'open' : 'done';
    testLog('Toggling promise status', `${promise.id} to ${newStatus}`);

    try {
      const response = await withTimeout(
        fetch(`/api/promises/${promise.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus }),
        }),
        TEST_TIMEOUTS.api,
        'Update promise timed out'
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update promise');
      }

      const { promise: updatedPromise } = await response.json();

      // Update local state
      setPromises(promises.map((p) => (p.id === promise.id ? updatedPromise : p)));
      testLog('Promise updated successfully');
    } catch (error) {
      console.error('Failed to update promise:', error);
      testLog('Failed to update promise', error);
      setMessage('Failed to update promise');
      setMessageType('error');
      setShowMessageModal(true);
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
          data-testid="back-to-dashboard-button"
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
            data-testid="add-promise-button"
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
            data-testid="send-nudge-button"
            onClick={handleSendNudgeClick}
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
              data-testid="promise-description-input"
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
              data-testid="promise-due-date-input"
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
              data-testid="submit-add-promise-button"
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
              data-testid="cancel-add-promise-button"
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
                  data-testid="mark-done-button"
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
                  data-testid="reopen-button"
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

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div
          data-testid="confirm-modal"
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
          onClick={() => setShowConfirmModal(false)}
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
            <h2 style={{ marginBottom: '16px', fontSize: '24px' }}>Confirm Action</h2>
            <p style={{ marginBottom: '20px', fontSize: '16px' }}>{confirmMessage}</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                data-testid="confirm-yes-button"
                onClick={() => confirmAction && confirmAction()}
                style={{
                  flex: 1,
                  padding: '10px 20px',
                  backgroundColor: '#10B981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 500,
                }}
              >
                Yes
              </button>
              <button
                data-testid="confirm-no-button"
                onClick={() => setShowConfirmModal(false)}
                style={{
                  flex: 1,
                  padding: '10px 20px',
                  backgroundColor: '#f3f4f6',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}
              >
                No
              </button>
            </div>
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
