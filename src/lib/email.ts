/**
 * Email service wrapper with Postmark API
 * Handles transactional emails (recap/nudge emails with magic links)
 */

import * as postmark from 'postmark';
import { PromiseItem } from '@/types';

const POSTMARK_API_TOKEN = process.env.POSTMARK_API_TOKEN;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

// Postmark requires a verified sender signature
// This should be a verified email address in your Postmark account
const FROM_EMAIL = process.env.POSTMARK_FROM_EMAIL || 'noreply@walkthewalk.app';

let client: postmark.ServerClient | null = null;

/**
 * Get or create Postmark client
 */
function getPostmarkClient(): postmark.ServerClient | null {
  if (client) {
    return client;
  }

  if (!POSTMARK_API_TOKEN) {
    console.warn(
      'Warning: POSTMARK_API_TOKEN not set. Email sending will fail. ' +
        'Set POSTMARK_API_TOKEN in your environment variables.'
    );
    return null;
  }

  client = new postmark.ServerClient(POSTMARK_API_TOKEN);
  return client;
}

export interface SendNudgeEmailParams {
  recipientEmail: string;
  recipientName: string;
  ownerName: string;
  backlogTitle?: string;
  promises: PromiseItem[];
  magicToken: string;
}

/**
 * Send a recap/nudge email to a contact with magic link
 *
 * @param params - Email parameters
 * @returns Promise with send result
 */
export async function sendNudgeEmail(
  params: SendNudgeEmailParams
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const postmarkClient = getPostmarkClient();

  if (!postmarkClient) {
    return {
      success: false,
      error: 'Email service not configured (missing POSTMARK_API_TOKEN)',
    };
  }

  const {
    recipientEmail,
    recipientName,
    ownerName,
    backlogTitle,
    promises,
    magicToken,
  } = params;

  const magicLink = `${BASE_URL}/magic/${magicToken}`;

  // Filter open promises for the email
  const openPromises = promises.filter((p) => p.status === 'open');

  // Build HTML email
  const htmlBody = buildNudgeEmailHtml({
    recipientName,
    ownerName,
    backlogTitle,
    openPromises,
    magicLink,
  });

  const textBody = buildNudgeEmailText({
    recipientName,
    ownerName,
    backlogTitle,
    openPromises,
    magicLink,
  });

  try {
    const result = await postmarkClient.sendEmail({
      From: FROM_EMAIL,
      To: recipientEmail,
      Subject: `Quick recap — promises from ${ownerName}`,
      TextBody: textBody,
      HtmlBody: htmlBody,
      MessageStream: 'outbound',
    });

    console.log('Email sent successfully via Postmark:', result.MessageID);

    return {
      success: true,
      messageId: result.MessageID,
    };
  } catch (error) {
    console.error('Failed to send email via Postmark:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Build HTML email body
 */
function buildNudgeEmailHtml(params: {
  recipientName: string;
  ownerName: string;
  backlogTitle?: string;
  openPromises: PromiseItem[];
  magicLink: string;
}): string {
  const { recipientName, ownerName, backlogTitle, openPromises, magicLink } =
    params;

  const title = backlogTitle || 'Your promises';
  const promiseList = openPromises
    .map(
      (p) => `
      <li style="margin-bottom: 8px;">
        <strong>${escapeHtml(p.description)}</strong>
        ${p.due_date ? `<br><em>Due: ${formatDate(p.due_date)}</em>` : ''}
      </li>
    `
    )
    .join('');

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Promises Recap from ${escapeHtml(ownerName)}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background-color: #f9f9f9; border-radius: 8px; padding: 24px; margin-bottom: 20px;">
    <h2 style="margin-top: 0; color: #2c3e50;">Hi ${escapeHtml(recipientName)},</h2>
    <p>This is a friendly recap from <strong>${escapeHtml(ownerName)}</strong> about ${title.toLowerCase()}.</p>
  </div>

  <div style="background-color: #fff; border: 1px solid #e0e0e0; border-radius: 8px; padding: 24px; margin-bottom: 20px;">
    <h3 style="margin-top: 0; color: #2c3e50;">Open Promises (${openPromises.length})</h3>
    ${
      openPromises.length > 0
        ? `<ul style="padding-left: 20px;">${promiseList}</ul>`
        : '<p style="color: #666;">No open promises at the moment.</p>'
    }
  </div>

  <div style="text-align: center; margin: 32px 0;">
    <a href="${magicLink}"
       style="display: inline-block; background-color: #4F46E5; color: white; padding: 12px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
      View & Update Promises
    </a>
  </div>

  <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 14px; color: #666;">
    <p>This link is secure and personalized for you. You can mark promises as done or add comments.</p>
    <p style="font-size: 12px; color: #999;">Powered by WalkTheWalk</p>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Build plain text email body
 */
function buildNudgeEmailText(params: {
  recipientName: string;
  ownerName: string;
  backlogTitle?: string;
  openPromises: PromiseItem[];
  magicLink: string;
}): string {
  const { recipientName, ownerName, backlogTitle, openPromises, magicLink } =
    params;

  const title = backlogTitle || 'Your promises';
  const promiseList = openPromises
    .map((p, i) => {
      let line = `${i + 1}. ${p.description}`;
      if (p.due_date) {
        line += `\n   Due: ${formatDate(p.due_date)}`;
      }
      return line;
    })
    .join('\n');

  return `
Hi ${recipientName},

This is a friendly recap from ${ownerName} about ${title.toLowerCase()}.

OPEN PROMISES (${openPromises.length}):
${promiseList || 'No open promises at the moment.'}

View and update your promises here:
${magicLink}

This link is secure and personalized for you. You can mark promises as done or add comments.

---
Powered by WalkTheWalk
  `.trim();
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

/**
 * Format ISO date string to readable format
 */
function formatDate(isoDate: string): string {
  try {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return isoDate;
  }
}
