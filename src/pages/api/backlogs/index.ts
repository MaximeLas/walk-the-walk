/**
 * GET /api/backlogs
 *
 * Fetch all backlogs for the authenticated user with stats
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
    // In test mode, use service role to bypass RLS
    const isTestMode = process.env.NEXT_PUBLIC_TEST_MODE === 'true';
    const supabase = isTestMode
      ? getSupabaseServiceClient()
      : createServerSupabaseClient(req, res);

    const user = await getCurrentUser(supabase);

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Fetch backlogs with contacts
    const { data: backlogsData, error: backlogsError } = await supabase
      .from('backlogs')
      .select('*, contact:contacts(*)')
      .eq('owner_id', user.id)
      .order('created_at', { ascending: false });

    if (backlogsError) {
      console.error('Error fetching backlogs:', backlogsError);
      return res.status(500).json({ error: 'Failed to load backlogs' });
    }

    // Fetch promises for all backlogs
    const backlogIds = (backlogsData || []).map((b) => b.id);

    let promisesData = [];
    if (backlogIds.length > 0) {
      const { data, error: promisesError } = await supabase
        .from('promises')
        .select('*')
        .in('backlog_id', backlogIds);

      if (promisesError) {
        console.error('Error fetching promises:', promisesError);
        // Continue without promises data
      } else {
        promisesData = data || [];
      }
    }

    // Calculate stats for each backlog
    const backlogsWithStats = (backlogsData || []).map((backlog) => {
      const backlogPromises = promisesData.filter(
        (p: any) => p.backlog_id === backlog.id
      );
      const openCount = backlogPromises.filter((p: any) => p.status === 'open').length;
      const doneCount = backlogPromises.filter((p: any) => p.status === 'done').length;

      return {
        ...backlog,
        stats: {
          total: backlogPromises.length,
          open: openCount,
          done: doneCount,
        },
      };
    });

    return res.status(200).json({ backlogs: backlogsWithStats });
  } catch (error) {
    console.error('Error in GET /api/backlogs:', error);
    return res.status(500).json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
