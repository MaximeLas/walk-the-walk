/**
 * POST /api/sendNudge
 *
 * Send a recap/nudge email to a contact with magic link
 *
 * Request body: { backlogId: string }
 *
 * Process:
 * 1. Verify authenticated owner
 * 2. Query backlog, contact, and open promises
 * 3. Generate/reuse magic link
 * 4. Send email with link
 * 5. Log result
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import {
  createServerSupabaseClient,
  getSupabaseServiceClient,
  getCurrentUser,
} from '@/lib/supabaseClient';
import { generateTokenPair } from '@/lib/token';
import { sendNudgeEmail } from '@/lib/email';
import {
  Backlog,
  Contact,
  PromiseItem,
  SendNudgeRequest,
  User,
} from '@/types';

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

    // 2. Parse and validate request
    const { backlogId } = req.body as SendNudgeRequest;

    if (!backlogId) {
      return res.status(400).json({ error: 'backlogId is required' });
    }

    // 3. Fetch backlog (verify ownership via RLS)
    const { data: backlog, error: backlogError } = await supabase
      .from('backlogs')
      .select('*, contact:contacts(*)')
      .eq('id', backlogId)
      .eq('owner_id', user.id)
      .single();

    if (backlogError || !backlog) {
      return res
        .status(404)
        .json({ error: 'Backlog not found or access denied' });
    }

    // 4. Check contact has email
    const contact = (backlog as any).contact as Contact | null;

    if (!contact || !contact.email) {
      return res.status(400).json({
        error:
          'Contact does not have an email address. Please add one before sending.',
      });
    }

    // 5. Fetch open promises
    const { data: promises, error: promisesError } = await supabase
      .from('promises')
      .select('*')
      .eq('backlog_id', backlogId)
      .order('created_at', { ascending: false });

    if (promisesError) {
      return res.status(500).json({ error: 'Failed to fetch promises' });
    }

    // 6. Generate or reuse magic link
    // For MVP, we'll create a new link each time; could optimize to reuse non-revoked links
    const serviceSupabase = getSupabaseServiceClient();
    const { token, hash } = generateTokenPair();

    const { data: magicLink, error: magicLinkError } = await serviceSupabase
      .from('magic_links')
      .insert({
        backlog_id: backlogId,
        token_hash: hash,
        expires_at: null, // No expiration for MVP
        revoked: false,
      })
      .select()
      .single();

    if (magicLinkError || !magicLink) {
      console.error('Failed to create magic link:', magicLinkError);
      return res.status(500).json({ error: 'Failed to create magic link' });
    }

    // 7. Fetch owner user info for email
    const { data: ownerData } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    const ownerName = ownerData?.name || user.email?.split('@')[0] || 'Someone';

    // 8. Send email
    const emailResult = await sendNudgeEmail({
      recipientEmail: contact.email,
      recipientName: contact.name,
      ownerName,
      backlogTitle: (backlog as Backlog).title || undefined,
      promises: (promises as PromiseItem[]) || [],
      magicToken: token,
    });

    if (!emailResult.success) {
      console.error('Failed to send email:', emailResult.error);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    // 9. Return success
    return res.status(200).json({
      success: true,
      messageId: emailResult.messageId,
      magicLinkId: magicLink.id,
    });
  } catch (error) {
    console.error('Error in sendNudge:', error);
    return res.status(500).json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
