/**
 * POST /api/backlogs
 *
 * Create a new backlog with an associated contact
 *
 * Request body: {
 *   contactName: string,
 *   contactEmail?: string,
 *   title?: string
 * }
 *
 * Process:
 * 1. Verify authenticated owner
 * 2. Create contact record
 * 3. Create backlog record linked to contact
 * 4. Return backlog with contact data
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import {
  createServerSupabaseClient,
  getCurrentUser,
  getSupabaseServiceClient,
} from '@/lib/supabaseClient';
import { CreateBacklogRequest, Backlog, Contact } from '@/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // 1. Verify authenticated owner
    // In test mode, use service role to bypass RLS (no auth session exists)
    const isTestMode = process.env.NEXT_PUBLIC_TEST_MODE === 'true';
    const supabase = isTestMode
      ? getSupabaseServiceClient()
      : createServerSupabaseClient(req, res);
    const user = await getCurrentUser(supabase);

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // 2. Parse and validate request
    const { contactName, contactEmail, title } = req.body as CreateBacklogRequest;

    if (!contactName || contactName.trim() === '') {
      return res.status(400).json({ error: 'contactName is required' });
    }

    // 3. Create contact
    const { data: contact, error: contactError } = await supabase
      .from('contacts')
      .insert({
        user_id: user.id,
        name: contactName.trim(),
        email: contactEmail?.trim() || null,
      })
      .select()
      .single();

    if (contactError || !contact) {
      console.error('Failed to create contact:', contactError);
      return res.status(500).json({ error: 'Failed to create contact' });
    }

    // 4. Create backlog
    const { data: backlog, error: backlogError } = await supabase
      .from('backlogs')
      .insert({
        owner_id: user.id,
        contact_id: (contact as Contact).id,
        title: title?.trim() || null,
      })
      .select()
      .single();

    if (backlogError || !backlog) {
      console.error('Failed to create backlog:', backlogError);
      // Clean up orphaned contact
      await supabase.from('contacts').delete().eq('id', (contact as Contact).id);
      return res.status(500).json({ error: 'Failed to create backlog' });
    }

    // 5. Return success with full backlog data
    return res.status(201).json({
      backlog: backlog as Backlog,
      contact: contact as Contact,
    });
  } catch (error) {
    console.error('Error in POST /api/backlogs:', error);
    return res.status(500).json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
