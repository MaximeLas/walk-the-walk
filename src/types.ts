/**
 * Type definitions for Walk The Walk / Nudge MVP
 * Based on PROJECT_SPEC.md database schema
 */

export type UUID = string;

export interface User {
  id: UUID;
  email: string;
  name?: string | null;
  created_at: string;
}

export interface Contact {
  id: UUID;
  user_id: UUID;
  name: string;
  email?: string | null;
  created_at: string;
}

export interface Backlog {
  id: UUID;
  owner_id: UUID;
  contact_id?: UUID | null;
  title?: string | null;
  created_at: string;
}

export type PromiseStatus = 'open' | 'done' | 'cancelled' | 'snoozed';

export interface PromiseItem {
  id: UUID;
  backlog_id: UUID;
  description: string;
  status: PromiseStatus;
  due_date?: string | null;
  created_at: string;
  completed_at?: string | null;
}

export interface MagicLink {
  id: UUID;
  backlog_id: UUID;
  token_hash: string;
  created_at: string;
  expires_at?: string | null;
  revoked: boolean;
  last_used_at?: string | null;
}

// API request/response types

export interface CreateBacklogRequest {
  contactName: string;
  contactEmail?: string;
  title?: string;
}

export interface CreatePromiseRequest {
  description: string;
  dueDate?: string;
}

export interface SendNudgeRequest {
  backlogId: string;
}

export interface MagicActionRequest {
  token: string;
  action: 'mark_done' | 'comment';
  promiseId: string;
  comment?: string;
}

export interface VerifyMagicResponse {
  backlogId: string;
  magicLinkId: string;
}

// Extended types for UI with joined data

export interface BacklogWithPromises extends Backlog {
  promises: PromiseItem[];
  contact?: Contact;
}

export interface BacklogStats {
  total: number;
  open: number;
  done: number;
}
