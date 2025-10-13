/**
 * Mock Data for UI Development
 *
 * This file provides realistic sample data for building UI components
 * without backend integration. Data matches Michelle's Figma designs
 * and will be replaced with real Supabase data later.
 */

// ============================================================================
// Types
// ============================================================================

export type EntryStatus =
  | 'no-nudge'
  | 'nudge-scheduled'
  | 'nudge-sent'
  | 'nudge-responded'
  | 'entry-closed'

export type ContactType = 'contact' | 'space'

export interface Contact {
  id: string
  name: string
  email?: string
  avatar?: string
  initials: string
  lastActive?: string  // e.g., "1 min. ago", "Yesterday"
  type: ContactType
}

export interface Entry {
  id: string
  description: string
  status: EntryStatus
  dueDate?: string
  createdAt: string
  completedAt?: string
}

export interface Space {
  id: string
  title: string
  contactId: string
  isPinned: boolean
  entries: Entry[]
  createdAt: string
  updatedAt: string
}

// ============================================================================
// Mock Contacts
// ============================================================================

export const mockContacts: Contact[] = [
  {
    id: 'c1',
    name: 'Maxime L.',
    email: 'maxime@example.com',
    avatar: undefined, // Will use initials
    initials: 'ML',
    lastActive: '1 min. ago',
    type: 'contact',
  },
  {
    id: 'c2',
    name: 'Unicorn',
    email: 'team@unicorn.com',
    initials: 'U',
    lastActive: 'Yesterday',
    type: 'space',
  },
  {
    id: 'c3',
    name: 'Michelle D.',
    email: 'michelle@example.com',
    initials: 'MD',
    lastActive: '5 min. ago',
    type: 'contact',
  },
  {
    id: 'c4',
    name: 'Kevin R.',
    email: 'kevin@example.com',
    initials: 'KR',
    lastActive: '2 hours ago',
    type: 'contact',
  },
  {
    id: 'c5',
    name: 'Project Atlas',
    initials: 'PA',
    lastActive: 'Last week',
    type: 'space',
  },
  {
    id: 'c6',
    name: 'Sarah M.',
    email: 'sarah@example.com',
    initials: 'SM',
    lastActive: '30 min. ago',
    type: 'contact',
  },
  {
    id: 'c7',
    name: 'Design Team',
    initials: 'DT',
    lastActive: '3 days ago',
    type: 'space',
  },
]

// ============================================================================
// Mock Entries
// ============================================================================

const createEntry = (
  id: string,
  description: string,
  status: EntryStatus,
  dueDate?: string,
  completedAt?: string
): Entry => ({
  id,
  description,
  status,
  dueDate,
  createdAt: '2025-10-10T10:00:00Z',
  completedAt,
})

// ============================================================================
// Mock Spaces
// ============================================================================

export const mockSpaces: Space[] = [
  // Pinned space 1
  {
    id: 's1',
    title: 'Q4 Goals',
    contactId: 'c1', // Maxime L.
    isPinned: true,
    entries: [
      createEntry('e1', 'App Review', 'nudge-responded'),
      createEntry('e2', 'VQA', 'no-nudge'),
      createEntry('e3', 'Research Doc', 'nudge-scheduled', '2025-10-15'),
      createEntry('e4', 'App Rewrite', 'nudge-sent'),
    ],
    createdAt: '2025-10-01T10:00:00Z',
    updatedAt: '2025-10-13T09:30:00Z',
  },

  // Pinned space 2
  {
    id: 's2',
    title: 'Product Launch',
    contactId: 'c2', // Unicorn
    isPinned: true,
    entries: [
      createEntry('e5', 'Marketing materials', 'nudge-responded'),
      createEntry('e6', 'Press release', 'nudge-scheduled', '2025-10-20'),
      createEntry('e7', 'Beta testing feedback', 'no-nudge'),
    ],
    createdAt: '2025-09-15T10:00:00Z',
    updatedAt: '2025-10-12T14:00:00Z',
  },

  // Regular space 1
  {
    id: 's3',
    title: 'Design System',
    contactId: 'c3', // Michelle D.
    isPinned: false,
    entries: [
      createEntry('e8', 'Mobile components', 'nudge-sent'),
      createEntry('e9', 'Desktop layouts', 'no-nudge'),
      createEntry('e10', 'Design tokens doc', 'entry-closed', undefined, '2025-10-11T10:00:00Z'),
    ],
    createdAt: '2025-10-05T10:00:00Z',
    updatedAt: '2025-10-13T08:00:00Z',
  },

  // Regular space 2
  {
    id: 's4',
    title: 'Engineering Tasks',
    contactId: 'c4', // Kevin R.
    isPinned: false,
    entries: [
      createEntry('e11', 'API integration', 'nudge-responded'),
      createEntry('e12', 'Database schema', 'entry-closed', undefined, '2025-10-09T10:00:00Z'),
      createEntry('e13', 'Performance testing', 'nudge-scheduled', '2025-10-18'),
      createEntry('e14', 'Security audit', 'no-nudge'),
      createEntry('e15', 'Documentation', 'nudge-sent'),
    ],
    createdAt: '2025-09-20T10:00:00Z',
    updatedAt: '2025-10-13T11:00:00Z',
  },

  // Regular space 3 (minimal entries)
  {
    id: 's5',
    title: 'Quick Check-in',
    contactId: 'c5', // Project Atlas
    isPinned: false,
    entries: [
      createEntry('e16', 'Weekly sync', 'no-nudge'),
    ],
    createdAt: '2025-10-12T10:00:00Z',
    updatedAt: '2025-10-12T10:00:00Z',
  },

  // Regular space 4
  {
    id: 's6',
    title: 'Content Strategy',
    contactId: 'c6', // Sarah M.
    isPinned: false,
    entries: [
      createEntry('e17', 'Blog post drafts', 'nudge-scheduled', '2025-10-16'),
      createEntry('e18', 'Social media calendar', 'nudge-responded'),
      createEntry('e19', 'Email campaign', 'no-nudge'),
    ],
    createdAt: '2025-10-08T10:00:00Z',
    updatedAt: '2025-10-13T07:00:00Z',
  },

  // Regular space 5 (empty - edge case)
  {
    id: 's7',
    title: 'Future Planning',
    contactId: 'c7', // Design Team
    isPinned: false,
    entries: [],
    createdAt: '2025-10-13T12:00:00Z',
    updatedAt: '2025-10-13T12:00:00Z',
  },
]

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Get all spaces (pinned first, then sorted by most recently updated)
 */
export const getAllSpaces = (): Space[] => {
  return [...mockSpaces].sort((a, b) => {
    // Pinned spaces first
    if (a.isPinned && !b.isPinned) return -1
    if (!a.isPinned && b.isPinned) return 1

    // Then by most recent update
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  })
}

/**
 * Get only pinned spaces
 */
export const getPinnedSpaces = (): Space[] => {
  return mockSpaces.filter(space => space.isPinned)
}

/**
 * Get only unpinned spaces
 */
export const getUnpinnedSpaces = (): Space[] => {
  return mockSpaces.filter(space => !space.isPinned)
}

/**
 * Get space by ID
 */
export const getSpaceById = (id: string): Space | undefined => {
  return mockSpaces.find(space => space.id === id)
}

/**
 * Get contact by ID
 */
export const getContactById = (id: string): Contact | undefined => {
  return mockContacts.find(contact => contact.id === id)
}

/**
 * Get contact for a space
 */
export const getContactForSpace = (space: Space): Contact | undefined => {
  return getContactById(space.contactId)
}

/**
 * Get spaces filtered by contact type
 */
export const getSpacesByContactType = (type: ContactType): Space[] => {
  return mockSpaces.filter(space => {
    const contact = getContactById(space.contactId)
    return contact?.type === type
  })
}

/**
 * Get entry status counts for a space
 */
export const getSpaceStats = (space: Space) => {
  const total = space.entries.length
  const open = space.entries.filter(e => e.status === 'no-nudge' || e.status === 'nudge-scheduled' || e.status === 'nudge-sent').length
  const responded = space.entries.filter(e => e.status === 'nudge-responded').length
  const closed = space.entries.filter(e => e.status === 'entry-closed').length

  return { total, open, responded, closed }
}

/**
 * Format relative time (mock implementation)
 */
export const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins} min. ago`
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
  return 'Last week'
}

// ============================================================================
// Status Label Helpers
// ============================================================================

export const getStatusLabel = (status: EntryStatus): string => {
  const labels: Record<EntryStatus, string> = {
    'no-nudge': 'No Nudge',
    'nudge-scheduled': 'Nudge Scheduled',
    'nudge-sent': 'Nudge Sent',
    'nudge-responded': 'Nudge Responded',
    'entry-closed': 'Entry Closed',
  }
  return labels[status]
}

export const getStatusColor = (status: EntryStatus): string => {
  // Returns Tailwind color classes for backgrounds and borders
  // EXACT mappings from Michelle's Figma Components page (node 177:32228)
  const colors: Record<EntryStatus, { bg: string; border: string }> = {
    'no-nudge': { bg: 'bg-status-neutral-bg', border: 'border-status-neutral' }, // transparent bg, #000000 border
    'nudge-scheduled': { bg: 'bg-status-warning-bg', border: 'border-status-warning' }, // #fffcef bg, #fcd915 border
    'nudge-sent': { bg: 'bg-status-info-bg', border: 'border-status-info' }, // #eaf6ff bg, #004cce border
    'nudge-responded': { bg: 'bg-status-success-bg', border: 'border-status-success' }, // #eafff4 bg, #00b017 border
    'entry-closed': { bg: 'bg-status-error-bg', border: 'border-status-error' }, // #e8daff bg, #843dff border (PURPLE!)
  }
  return `${colors[status].bg} ${colors[status].border}`
}
