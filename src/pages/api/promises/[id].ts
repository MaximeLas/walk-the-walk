/**
 * PATCH /api/promises/:id
 *
 * Update a promise (owner only)
 *
 * Request body: {
 *   description?: string,
 *   status?: 'open' | 'done' | 'cancelled' | 'snoozed',
 *   dueDate?: string (ISO date)
 * }
 *
 * Process:
 * 1. Verify authenticated owner
 * 2. Verify promise belongs to owner's backlog
 * 3. Update promise
 * 4. Return updated promise
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import {
  createServerSupabaseClient,
  getCurrentUser,
} from '@/lib/supabaseClient';
import { PromiseItem, PromiseStatus } from '@/types';

interface UpdatePromiseRequest {
  description?: string;
  status?: PromiseStatus;
  dueDate?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // 1. Verify authenticated owner
    const supabase = createServerSupabaseClient(req, res);
    const user = await getCurrentUser(supabase);

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // 2. Get promise ID from URL
    const { id: promiseId } = req.query;

    if (!promiseId || typeof promiseId !== 'string') {
      return res.status(400).json({ error: 'Invalid promise ID' });
    }

    // 3. Verify promise exists and belongs to owner's backlog (via RLS)
    const { data: existingPromise, error: fetchError } = await supabase
      .from('promises')
      .select('*, backlog:backlogs(owner_id)')
      .eq('id', promiseId)
      .single();

    if (fetchError || !existingPromise) {
      return res.status(404).json({ error: 'Promise not found or access denied' });
    }

    // 4. Parse and validate request
    const { description, status, dueDate } = req.body as UpdatePromiseRequest;

    // Build update object with only provided fields
    const updates: Partial<PromiseItem> = {};

    if (description !== undefined) {
      if (description.trim() === '') {
        return res.status(400).json({ error: 'description cannot be empty' });
      }
      updates.description = description.trim();
    }

    if (status !== undefined) {
      const validStatuses: PromiseStatus[] = ['open', 'done', 'cancelled', 'snoozed'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
      }
      updates.status = status;

      // Set completed_at when marking as done
      if (status === 'done') {
        updates.completed_at = new Date().toISOString();
      } else if (status === 'open' && existingPromise.completed_at) {
        // Clear completed_at when reopening
        updates.completed_at = null;
      }
    }

    if (dueDate !== undefined) {
      updates.due_date = dueDate || null;
    }

    // 5. Update promise
    const { data: promise, error: updateError } = await supabase
      .from('promises')
      .update(updates)
      .eq('id', promiseId)
      .select()
      .single();

    if (updateError || !promise) {
      console.error('Failed to update promise:', updateError);
      return res.status(500).json({ error: 'Failed to update promise' });
    }

    // 6. Return success
    return res.status(200).json({
      promise: promise as PromiseItem,
    });
  } catch (error) {
    console.error('Error in PATCH /api/promises/:id:', error);
    return res.status(500).json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
