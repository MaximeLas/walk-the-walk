/**
 * POST /api/promises
 *
 * Add a new promise to a backlog
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import {
  createServerSupabaseClient,
  getCurrentUser,
  getSupabaseServiceClient,
} from '@/lib/supabaseClient';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { backlogId, text } = req.body;

    if (!backlogId || !text || typeof text !== 'string' || text.trim() === '') {
      return res.status(400).json({ error: 'backlogId and text are required' });
    }

    // In test mode, use service role to bypass RLS
    const isTestMode = process.env.NEXT_PUBLIC_TEST_MODE === 'true';
    const supabase = isTestMode
      ? getSupabaseServiceClient()
      : createServerSupabaseClient(req, res);

    const user = await getCurrentUser(supabase);

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Verify user owns this backlog
    const { data: backlog, error: backlogError } = await supabase
      .from('backlogs')
      .select('id')
      .eq('id', backlogId)
      .eq('owner_id', user.id)
      .single();

    if (backlogError || !backlog) {
      return res.status(404).json({ error: 'Backlog not found or access denied' });
    }

    // Create promise
    const { data: promise, error: promiseError } = await supabase
      .from('promises')
      .insert({
        backlog_id: backlogId,
        description: text.trim(),
        status: 'open',
      })
      .select()
      .single();

    if (promiseError || !promise) {
      console.error('Failed to create promise:', promiseError);
      return res.status(500).json({ error: 'Failed to create promise' });
    }

    return res.status(201).json({ promise });
  } catch (error) {
    console.error('Error in POST /api/promises:', error);
    return res.status(500).json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
