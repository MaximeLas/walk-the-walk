/**
 * POST /api/magic/action
 *
 * Handle recipient actions via magic token
 * Actions: mark_done, comment
 *
 * Request body: {
 *   token: string,
 *   action: 'mark_done' | 'comment',
 *   promiseId: string,
 *   comment?: string
 * }
 *
 * Process:
 * 1. Verify token and get backlog_id
 * 2. Verify promise belongs to backlog
 * 3. Apply action
 * 4. Update last_used_at on magic link
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { getSupabaseServiceClient } from '@/lib/supabaseClient';
import { verifyToken } from '@/lib/token';
import { MagicActionRequest, MagicLink, PromiseItem } from '@/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { token, action, promiseId, comment } = req.body as MagicActionRequest;

    // 1. Validate input
    if (!token || !action || !promiseId) {
      return res.status(400).json({
        error: 'Missing required fields: token, action, promiseId',
      });
    }

    if (!['mark_done', 'comment'].includes(action)) {
      return res.status(400).json({
        error: 'Invalid action. Must be mark_done or comment',
      });
    }

    // 2. Verify token and get magic link
    const serviceSupabase = getSupabaseServiceClient();

    // We need to fetch all non-revoked magic links and verify against each
    // (since we can't query by hash directly without exposing it)
    const { data: magicLinks, error: magicLinksError } = await serviceSupabase
      .from('magic_links')
      .select('*')
      .eq('revoked', false);

    if (magicLinksError) {
      console.error('Failed to fetch magic links:', magicLinksError);
      return res.status(500).json({ error: 'Failed to verify token' });
    }

    // Find matching magic link by verifying token hash
    let validMagicLink: MagicLink | null = null;

    for (const link of magicLinks as MagicLink[]) {
      if (verifyToken(token, link.token_hash)) {
        // Check if expired
        if (link.expires_at && new Date(link.expires_at) < new Date()) {
          return res.status(401).json({ error: 'Token has expired' });
        }
        validMagicLink = link;
        break;
      }
    }

    if (!validMagicLink) {
      return res.status(401).json({ error: 'Invalid or revoked token' });
    }

    // 3. Fetch promise and verify it belongs to the backlog
    const { data: promise, error: promiseError } = await serviceSupabase
      .from('promises')
      .select('*')
      .eq('id', promiseId)
      .single();

    if (promiseError || !promise) {
      return res.status(404).json({ error: 'Promise not found' });
    }

    const promiseData = promise as PromiseItem;

    if (promiseData.backlog_id !== validMagicLink.backlog_id) {
      return res.status(403).json({
        error: 'Promise does not belong to this backlog',
      });
    }

    // 4. Apply action
    if (action === 'mark_done') {
      const { error: updateError } = await serviceSupabase
        .from('promises')
        .update({
          status: 'done',
          completed_at: new Date().toISOString(),
        })
        .eq('id', promiseId);

      if (updateError) {
        console.error('Failed to update promise:', updateError);
        return res.status(500).json({ error: 'Failed to mark promise as done' });
      }
    } else if (action === 'comment') {
      // For MVP, comments are not implemented in the schema
      // We'll return success but note it's not yet supported
      return res.status(501).json({
        error: 'Comments are not yet implemented in MVP',
      });
    }

    // 5. Update last_used_at on magic link
    await serviceSupabase
      .from('magic_links')
      .update({ last_used_at: new Date().toISOString() })
      .eq('id', validMagicLink.id);

    // 6. Return success
    return res.status(200).json({
      success: true,
      action,
      promiseId,
    });
  } catch (error) {
    console.error('Error in magic/action:', error);
    return res.status(500).json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
