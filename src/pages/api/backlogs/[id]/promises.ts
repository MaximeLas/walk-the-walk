/**
 * POST /api/backlogs/:id/promises
 *
 * Add a new promise to a backlog
 *
 * Request body: {
 *   description: string,
 *   dueDate?: string (ISO date)
 * }
 *
 * Process:
 * 1. Verify authenticated owner
 * 2. Verify backlog belongs to owner
 * 3. Create promise
 * 4. Return promise data
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import {
  createServerSupabaseClient,
  getCurrentUser,
} from '@/lib/supabaseClient';
import { CreatePromiseRequest, PromiseItem } from '@/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // 1. Verify authenticated owner
    const supabase = createServerSupabaseClient(req, res);
    const user = await getCurrentUser(supabase);

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // 2. Get backlog ID from URL
    const { id: backlogId } = req.query;

    if (!backlogId || typeof backlogId !== 'string') {
      return res.status(400).json({ error: 'Invalid backlog ID' });
    }

    // 3. Verify backlog exists and belongs to owner (RLS will enforce this)
    const { data: backlog, error: backlogError } = await supabase
      .from('backlogs')
      .select('id, owner_id')
      .eq('id', backlogId)
      .single();

    if (backlogError || !backlog) {
      return res.status(404).json({ error: 'Backlog not found or access denied' });
    }

    // 4. Parse and validate request
    const { description, dueDate } = req.body as CreatePromiseRequest;

    if (!description || description.trim() === '') {
      return res.status(400).json({ error: 'description is required' });
    }

    // 5. Create promise
    const { data: promise, error: promiseError } = await supabase
      .from('promises')
      .insert({
        backlog_id: backlogId,
        description: description.trim(),
        status: 'open',
        due_date: dueDate || null,
      })
      .select()
      .single();

    if (promiseError || !promise) {
      console.error('Failed to create promise:', promiseError);
      return res.status(500).json({ error: 'Failed to create promise' });
    }

    // 6. Return success
    return res.status(201).json({
      promise: promise as PromiseItem,
    });
  } catch (error) {
    console.error('Error in POST /api/backlogs/:id/promises:', error);
    return res.status(500).json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
