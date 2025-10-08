/**
 * GET /api/backlogs/[id]
 *
 * Fetch a single backlog with its contact and promises
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
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { id } = req.query;

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'Invalid backlog ID' });
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

    // Fetch backlog with contact
    const { data: backlog, error: backlogError } = await supabase
      .from('backlogs')
      .select('*, contact:contacts(*)')
      .eq('id', id)
      .eq('owner_id', user.id)
      .single();

    if (backlogError || !backlog) {
      console.error('Error fetching backlog:', backlogError);
      return res.status(404).json({ error: 'Backlog not found' });
    }

    // Fetch promises for this backlog
    const { data: promises, error: promisesError } = await supabase
      .from('promises')
      .select('*')
      .eq('backlog_id', id)
      .order('created_at', { ascending: true });

    if (promisesError) {
      console.error('Error fetching promises:', promisesError);
      // Continue without promises
    }

    return res.status(200).json({
      backlog,
      promises: promises || [],
    });
  } catch (error) {
    console.error('Error in GET /api/backlogs/[id]:', error);
    return res.status(500).json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
