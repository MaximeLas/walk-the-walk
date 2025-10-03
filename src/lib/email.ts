/**
 * Email service wrapper with nodemailer + Mailtrap SMTP
 * Handles transactional emails (recap/nudge emails with magic links)
 *
 * Uses Mailtrap Sandbox for development/testing - emails are captured
 * in Mailtrap inbox instead of being sent to real recipients
 */

import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';
import { PromiseItem } from '@/types';

const SMTP_HOST = process.env.POSTMARK_SMTP_HOST;
const SMTP_PORT = process.env.POSTMARK_SMTP_PORT;
const SMTP_USER = process.env.POSTMARK_SMTP_USER;
const SMTP_PASS = process.env.POSTMARK_SMTP_PASS;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

let transporter: Transporter | null = null;

/**
 * Get or create nodemailer transporter
 * Uses Mailtrap SMTP for development
 */
function getTransporter(): Transporter | null {
  if (transporter) {
    return transporter;
  }

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    console.warn(
      'Warning: SMTP credentials not set. Email sending will fail. ' +
        'Set POSTMARK_SMTP_HOST, POSTMARK_SMTP_PORT, POSTMARK_SMTP_USER, POSTMARK_SMTP_PASS'
    );
    return null;
  }

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: parseInt(SMTP_PORT, 10),
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  return transporter;
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
  const transport = getTransporter();

  if (!transport) {
    return {
      success: false,
      error: 'Email service not configured (missing SMTP credentials)',
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
    const result = await transport.sendMail({
      from: '"WalkTheWalk" <noreply@walkthewalk.app>',
      to: recipientEmail,
      subject: `Quick recap — promises from ${ownerName}`,
      text: textBody,
      html: htmlBody,
    });

    console.log('Email sent successfully:', result.messageId);

    return {
      success: true,
      messageId: result.messageId,
    };
  } catch (error) {
    console.error('Failed to send email:', error);
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
