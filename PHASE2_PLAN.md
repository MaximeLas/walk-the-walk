# Phase 2: Mobile-First Design Integration - Complete Implementation Plan

**Status:** In Progress
**Started:** 2025-10-13
**Estimated Duration:** 40-50 work hours (~2 weeks)

---

## Table of Contents

1. [Agent Execution Protocol](#agent-execution-protocol)
2. [Strategic Approach](#strategic-approach)
3. [Change Management Methodology](#change-management-methodology)
4. [Step 1: Foundation Setup](#step-1-foundation-setup)
5. [Step 2: Atomic Components](#step-2-atomic-components)
6. [Steps 3-7: Overview](#steps-3-7-overview)
7. [Testing Strategy](#testing-strategy)
8. [Timeline & Estimates](#timeline--estimates)

---

## Agent Execution Protocol

**Purpose:** Define the methodology and workflow for implementing Phase 2 effectively and accurately.

### Workflow: Extract → Reference → Build → Verify

Every step follows this four-stage workflow:

1. **Extract** - Get exact design values from Figma into COMPLETE_FIGMA_EXTRACTION.md
2. **Reference** - Read extraction document to understand component specs
3. **Build** - Implement components using values from extraction document
4. **Verify** - Compare implementation to Figma visually and functionally

### Key Resources

**Design Source of Truth:**
- `COMPLETE_FIGMA_EXTRACTION.md` - Systematic extraction of all Figma component specs
- Figma Components page - Node ID 177:32228

**Tools Available:**
- **Figma MCP** - Extract components, get exact CSS values, screenshots
- **Context7 MCP** - Up-to-date library documentation (Tailwind, Next.js, etc.)

### Component Implementation Process

For each component you build:

1. **Before coding:**
   - Open `COMPLETE_FIGMA_EXTRACTION.md` and locate the component section
   - Read the full specification (colors, sizing, typography, effects)
   - If component is missing from extraction doc: Extract it from Figma first, add to document
   - Note the line numbers for commit message reference

2. **While coding:**
   - Use values directly from extraction document
   - Reference line numbers in code comments for traceability
   - Implement all documented variants (don't skip edge cases)

3. **After coding:**
   - Add component to `/demo` page with all variants
   - Visual comparison: Screenshot your implementation vs Figma
   - Functional testing: Test all props, edge cases, mobile viewport (375px)
   - Report completion with screenshot before moving to next component

### Tool Usage Guidelines

**Use Figma MCP tools when:**
- Extraction document is missing a component you need to build
- You need visual reference for comparison
- You want to verify a specific value against Figma

**Use Context7 MCP tools when:**
- Setting up a new library for the first time
- Working with a new major version of a library
- Unsure about API syntax or configuration

**Example commands:**
```typescript
// Extract component specs
mcp__figma-desktop__get_code(nodeId: "177:32815")

// Get library documentation
mcp__context7__resolve-library-id(libraryName: "tailwindcss")
mcp__context7__get-library-docs(
  context7CompatibleLibraryID: "/tailwindlabs/tailwindcss",
  topic: "configuration"
)
```

### Handling New Components

If you need to build a component that isn't in `COMPLETE_FIGMA_EXTRACTION.md`:

1. Check Figma Components page to confirm it exists (use get_metadata on node 177:32228)
2. Extract the component using Figma MCP get_code with the node ID
3. Add a new section to COMPLETE_FIGMA_EXTRACTION.md with:
   - Component name and node ID
   - All variants documented
   - Complete specs: colors, sizing, typography, effects
   - Follow the same format as existing sections
4. Get user approval on the extraction before implementing
5. Then build the component referencing your new extraction section

### Quality Standards

**Pixel-perfect implementation:**
- Colors must match extraction document exactly (no "close enough")
- Spacing, typography, border radius must match exactly
- All variants must be implemented, not just the happy path

**Code quality:**
- TypeScript interfaces for all component props
- Proper prop types matching documented variants
- Accessible HTML semantics
- Mobile-optimized (touch targets ≥ 44px)

**Testing requirements:**
- All prop combinations render correctly
- Edge cases handled (missing images, long text, empty states)
- Mobile viewport (375px) tested
- Demo page includes all variants

### Commit Standards

Each commit should:
- Reference COMPLETE_FIGMA_EXTRACTION.md line numbers for specs used
- Include "Part of Phase 2: [Step Name]" in commit message
- Focus on one component or one logical unit of work
- Follow existing commit message style in the repo

---

## Strategic Approach

### Mobile-First Priority (90/10 Rule)

**Mobile Web (320-767px): 90% of effort**
- Pixel-perfect implementation matching Michelle's Figma designs
- Thorough testing on real devices (iPhone SE, iPhone 14 Pro, Android)
- All interactions optimized for touch
- Performance budgets focused on mobile networks
- This is our MVP target and primary user experience

**Desktop/Tablet (768px+): 10% of effort**
- Simple max-width container (e.g., 480px) centered on screen
- Components render without breaking, but not optimized
- Basic smoke testing only (does it display? can I navigate?)
- No custom layouts, no desktop-specific features
- Will redesign when Michelle creates desktop designs

**Implementation Strategy:**
```tsx
// Mobile-first container pattern
<div className="w-full max-w-md mx-auto min-h-screen bg-bg-app">
  {/* Mobile-optimized content */}
</div>
```

### Core Principles

1. **Start Fresh, Not Retrofit**
   - Archive v0 demo pages to `/archive/v0-demo/`
   - Build new mobile-first pages from scratch
   - Keep all backend code (API routes, Supabase schema, RLS policies)

2. **Use Tailwind CSS**
   - Michelle's Figma outputs Tailwind classes
   - Design tokens configured in `tailwind.config.js`
   - Perfect timing to set up properly from the start

3. **Mock Data First, Real Data Later**
   - Build UI with `mockData.ts` for fast iteration
   - Michelle can review components without backend complexity
   - Swap to real Supabase data in dedicated commit

4. **Component Isolation with Demo Page**
   - `/demo` page showcases all components
   - Test variants in isolation
   - Easy to share preview URLs with Michelle
   - Serves as living documentation

5. **"Space" Terminology (Not "Backlog")**
   - All new code uses "space" to match product evolution
   - SpaceCard, SpaceCardGrid, createSpace, etc.
   - Old API routes keep "backlog" for now (avoid breaking changes)

6. **Simplified Interactions for MVP**
   - Modals instead of sliding drawers
   - Basic CSS transitions (not complex animations)
   - Gestures and advanced animations deferred post-MVP

---

## Change Management Methodology

### The CHANGE Protocol
**C**onsistent **H**andling of **A**daptive **N**ext-**G**eneration **E**xecution

As Michelle continues designing and requirements evolve, we need a robust process to handle changes without derailing progress.

### Step 1: Communication Channel

**Use direct conversation with this structured format:**

```markdown
## Design Update from Michelle

**What changed:** [New screen added / Existing screen modified / Component updated]

**Context:** [Why this change? User feedback? New feature? Iteration?]

**Figma link:** [URL to new/updated design]

**Priority:** [Critical / High / Medium / Low]

**Dependencies:** [Does this affect work already done? In progress? Planned?]
```

### Step 2: Change Evaluation

When a change is communicated, I will:

1. **Analyze impact** on existing work:
   - ✅ **Additive** (new feature, doesn't affect existing code) → Easy to slot in
   - ⚠️ **Modificative** (changes existing component) → Assess if in-progress or done
   - 🚨 **Breaking** (requires rework of completed work) → Discuss trade-offs

2. **Categorize the change**:
   - **Foundation** (affects design tokens, core components) → High impact
   - **Component** (new/updated component) → Medium impact
   - **Page** (new/updated page) → Low impact if components exist
   - **Polish** (styling tweaks, refinements) → Very low impact

3. **Propose integration approach**:
   - Where it fits in current plan
   - Estimated time impact
   - Any prerequisites needed
   - Suggested priority vs. current work

### Step 3: Decision Framework

**Prioritization Matrix:**

| Change Type | Current Work Status | Action |
|-------------|---------------------|--------|
| Critical + Affects completed work | Any | Pause, discuss trade-offs, decide together |
| Critical + New feature | Any | Insert immediately after current commit |
| High + Affects in-progress | In progress | Finish current commit, then integrate |
| High + New feature | Not started | Add to backlog, prioritize after current step |
| Medium/Low | Any | Add to backlog, tackle after current sprint |

### Step 4: Plan Update

When we agree on a change:
- Update the relevant step in this plan
- Summarize what changed if significant
- Continue with clear understanding of adjusted timeline

### Step 5: Documentation

After each change:
- Update `PROJECT_SPEC.md` if it's a new feature
- Update `CLAUDE.md` if it's a new pattern/convention
- Commit messages reference the design change

### Example Workflow

**Scenario:** Michelle designs a new "Quick Filter Bar" component for Home Screen

**You communicate:**
```markdown
## Design Update from Michelle

**What changed:** New Quick Filter Bar component added to Home Screen

**Context:** User testing showed people want to filter by status quickly

**Figma link:** [URL]

**Priority:** High (improves core UX)

**Dependencies:** Goes on Home Screen (Step 5 - not started yet)
```

**I respond:**
```markdown
**Impact Analysis:**
- ✅ Additive change (doesn't affect existing components)
- Affects: Step 5 (Home Screen) - not started yet
- Needs: New atomic component (FilterButton)

**Proposed Integration:**
- Add to Step 2 (Atomic Components): FilterButton component (1 hour)
- Step 5 will use this component when we build Home Screen
- No impact on current Step 1 work

**Estimated time:** +1 hour to timeline

**Proceed?** Yes - I'll add FilterButton to Step 2 component list.
```

---

## Step 1: Foundation Setup

**Goal:** Install Tailwind and establish design system tokens
**Estimated Time:** 6-8 hours
**Total Commits:** 8

---

### Commit 1: Install and configure Tailwind CSS

**Time estimate:** ~45 minutes

**What you'll do:**
1. Install dependencies: `tailwindcss`, `postcss`, `autoprefixer`
2. Run `npx tailwindcss init -p` to generate config files
3. Create `tailwind.config.js` with basic Next.js paths
4. Update `src/styles/globals.css` to include Tailwind directives
5. Test that Tailwind classes work (add a test div to a page)

**Files created/modified:**
- `package.json` (new deps)
- `tailwind.config.js` (created)
- `postcss.config.js` (created)
- `src/styles/globals.css` (add `@tailwind` directives)

**Commit message:**
```
Install and configure Tailwind CSS for Phase 2 mobile-first UI

- Add tailwindcss, postcss, autoprefixer dependencies
- Generate tailwind.config.js and postcss.config.js
- Update globals.css with Tailwind directives
- Configure content paths for Next.js pages and components

Part of Phase 2: Mobile-first design system implementation
```

**Acceptance criteria:**
- ✅ `npm run dev` starts without errors
- ✅ Test page renders with Tailwind utility classes
- ✅ No console errors or warnings

---

### Commit 2: Extract and configure color tokens from Figma

**Time estimate:** ~1 hour

**What you'll do:**
1. Analyze all Figma components to extract exact color values
2. Create comprehensive color palette in `tailwind.config.js`
3. Organize colors by usage: backgrounds, text, status, borders
4. Document color usage in comments

**Figma colors extracted:**

```javascript
colors: {
  // Primary colors
  'primary-dark': '#181818',      // Top nav background
  'primary-white': '#ffffff',     // Cards, buttons

  // Status colors (from Entry Chips)
  'status-success': '#00b017',    // Green - Responded/Done
  'status-success-bg': '#eafff4', // Light green background
  'status-warning': '#fcd915',    // Yellow - Scheduled
  'status-warning-bg': '#fffcef', // Light yellow background
  'status-info': '#004cce',       // Blue - In Progress
  'status-info-bg': '#eaf6ff',    // Light blue background
  'status-neutral': '#585858',    // Gray - No Nudge
  'status-neutral-bg': '#f5f5f5', // Light gray background

  // Text colors
  'text-primary': '#000000',
  'text-secondary': '#585858',
  'text-tertiary': '#7a7a7a',

  // Border colors
  'border-light': '#e9e9e9',
  'border-dark': '#7a7a7a',

  // Background colors
  'bg-card': '#ffffff',
  'bg-app': '#f8f8f8',
  'bg-overlay': 'rgba(94, 94, 94, 0.2)',
}
```

**Files modified:**
- `tailwind.config.js` (extend theme.colors)

**Commit message:**
```
Add design system color tokens from Michelle's Figma designs

Colors extracted from Components page and organized by usage:
- Primary colors (dark nav, white cards)
- Status colors (5 states: success, warning, info, neutral, error)
- Text hierarchy colors (primary, secondary, tertiary)
- Border and background colors
- Support for light/dark backgrounds per chip style

All colors match Figma specs exactly for pixel-perfect implementation.
```

**Acceptance criteria:**
- ✅ All colors from Figma components documented
- ✅ Color naming is semantic (status-success, not green-500)
- ✅ Comments explain usage context

---

### Commit 3: Configure spacing scale and layout tokens

**Time estimate:** ~45 minutes

**What you'll do:**
1. Extract spacing values from Figma (gaps, padding, margins)
2. Verify Figma uses 4px base unit (common in design systems)
3. Keep Tailwind's default spacing scale (it matches 4px increments)
4. Document spacing conventions

**Figma spacing found:**
- Gaps: 4px, 8px, 10px, 12px, 16px, 20px, 24px
- Padding: 6px, 8px, 12px, 20px, 24px, 28px
- Component sizes: 24px (sm avatar), 44px (md avatar/button), 68px (add button)

**Tailwind mapping:**
```
gap-1   = 4px   ✅
gap-2   = 8px   ✅
gap-2.5 = 10px  ✅
gap-3   = 12px  ✅
gap-4   = 16px  ✅
gap-5   = 20px  ✅
gap-6   = 24px  ✅
```

**Files modified:**
- `tailwind.config.js` (add custom spacing if needed)
- Create `src/styles/design-tokens.md` (documentation)

**Commit message:**
```
Document spacing scale and verify Tailwind defaults match Figma

Figma uses 4px-based spacing system which aligns perfectly with
Tailwind's default scale. Documented all spacing values used in
Michelle's component designs for reference during implementation.

Created design-tokens.md as developer reference for spacing,
sizing, and layout conventions.
```

**Acceptance criteria:**
- ✅ All Figma spacing values map to Tailwind classes
- ✅ Documentation file created with examples
- ✅ No custom spacing values needed (use Tailwind defaults)

---

### Commit 4: Configure typography tokens

**Time estimate:** ~1 hour

**What you'll do:**
1. Extract font families from Figma components
2. Set up font-size scale and line-heights
3. Configure font-weight values
4. Add fallback system fonts

**Figma typography:**

**Fonts used:**
- Hiragino Kaku Gothic Pro (W3=light, W6=semibold) - Japanese system font
- Arial (Regular, Bold) - Universal fallback

**Font sizes:** 12px, 14px, 16px, 18px, 20px, 24px
**Line heights:** Mostly tight or normal

**Tailwind config:**
```javascript
fontFamily: {
  sans: [
    '-apple-system',
    'BlinkMacSystemFont',
    'Hiragino Kaku Gothic Pro',
    'Arial',
    'sans-serif',
  ],
},
fontSize: {
  xs: '12px',    // Chips, metadata
  sm: '14px',    // Tab labels
  base: '16px',  // Body text, search placeholder
  lg: '18px',    // Card titles
  xl: '20px',    // Section headers
  '2xl': '24px', // Page titles
},
fontWeight: {
  normal: '400',   // Arial Regular
  medium: '500',   // Hiragino W3
  semibold: '600', // Hiragino W6
  bold: '700',     // Arial Bold
},
```

**Files modified:**
- `tailwind.config.js` (extend theme.fontFamily, fontSize, fontWeight)
- `src/styles/design-tokens.md` (update with typography section)

**Commit message:**
```
Configure typography tokens matching Michelle's Figma designs

Font families:
- System fonts (Apple/BlinkMacSystemFont) with Hiragino and Arial
- Configured fallback chain for cross-platform support

Font scale: 12px-24px covering all UI text sizes
Font weights: normal (400) through bold (700)

All values extracted from Figma Component specs.
```

**Acceptance criteria:**
- ✅ Font families load correctly across platforms
- ✅ Font sizes match Figma exactly
- ✅ Test page shows all font variations

---

### Commit 5: Configure border radius, shadows, and effects

**Time estimate:** ~45 minutes

**What you'll do:**
1. Extract border-radius values from Figma (chips, cards, circles)
2. Configure box-shadow tokens for card elevation
3. Set up backdrop-blur for glassmorphism effects
4. Configure transition durations

**Figma values extracted:**

```javascript
borderRadius: {
  sm: '2px',      // Entry chips
  DEFAULT: '8px', // Cards
  lg: '20px',     // Tab pills
  xl: '36px',     // Top nav bottom corners
  '2xl': '40px',  // Circular buttons, search bar
  full: '9999px', // Avatars, perfect circles
},

boxShadow: {
  card: '0px 4px 16px 0px rgba(0, 0, 0, 0.15)',
  sm: '0px 2px 8px 0px rgba(0, 0, 0, 0.1)',
},

backdropBlur: {
  DEFAULT: '6px', // Used in cards and nav
},

transitionDuration: {
  DEFAULT: '150ms', // Standard transitions
  slow: '300ms',    // Modal/drawer animations
},
```

**Files modified:**
- `tailwind.config.js` (extend theme with above values)
- `src/styles/design-tokens.md` (update with effects section)

**Commit message:**
```
Add border radius, shadows, and visual effects tokens

Border radius: 2px (chips) to full circles (avatars)
Box shadows: Card elevation matching Figma specs
Backdrop blur: 6px for glassmorphism effects on cards/nav
Transitions: 150ms default for smooth interactions

All values extracted from Michelle's component designs.
```

**Acceptance criteria:**
- ✅ Border radius values cover all component needs
- ✅ Shadow values match Figma appearance
- ✅ Backdrop blur works in test

---

### Commit 6: Create mock data structure and utilities

**Time estimate:** ~1.5 hours

**What you'll do:**
1. Create `src/lib/mockData.ts` with realistic sample data
2. Create types that match both Figma designs and DB schema
3. Include variety: pinned/unpinned, different statuses, with/without avatars
4. Add utility functions for filtering/sorting

**Mock data structure:**

```typescript
// src/lib/mockData.ts
export interface Space {
  id: string
  title: string
  contactId: string
  isPinned: boolean
  entries: Entry[]
  createdAt: string
  updatedAt: string
}

export interface Contact {
  id: string
  name: string
  email?: string
  avatar?: string
  initials: string
  lastActive?: string // "1 min. ago", "Yesterday", etc.
  type: 'contact' | 'space'
}

export interface Entry {
  id: string
  description: string
  status: 'no-nudge' | 'nudge-scheduled' | 'nudge-sent' | 'nudge-responded' | 'entry-closed'
  dueDate?: string
  createdAt: string
  completedAt?: string
}

// Sample data: 2 pinned spaces, 5 regular spaces
export const mockSpaces: Space[] = [...]
export const mockContacts: Contact[] = [...]
```

**Files created:**
- `src/lib/mockData.ts`
- `src/types/index.ts` (if not exists, consolidate types here)

**Commit message:**
```
Create mock data structure for UI development

Added realistic sample data matching Figma designs:
- 7 spaces (2 pinned, 5 regular) with varying entry counts
- Mix of contacts and spaces (per Michelle's design)
- All 5 entry status states represented
- Realistic timestamps and metadata

Mock data allows UI development independent of backend
integration. Will be replaced with real Supabase data later.
```

**Acceptance criteria:**
- ✅ Types match Figma component variants
- ✅ Sample data covers all edge cases (empty, full, mixed statuses)
- ✅ Data is realistic and useful for demo

---

### Commit 7: Create component demo page

**Time estimate:** ~45 minutes

**What you'll do:**
1. Create `/pages/demo.tsx` for component testing
2. Set up basic layout with sections for each component type
3. Add simple navigation/tabs for organization
4. Style with Tailwind to test design tokens

**Demo page structure:**

```tsx
// /pages/demo.tsx
export default function ComponentDemo() {
  return (
    <div className="min-h-screen bg-bg-app p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <header className="border-b border-border-light pb-4">
          <h1 className="text-2xl font-bold">Component Demo</h1>
          <p className="text-text-secondary">
            Mobile-first design system components
          </p>
        </header>

        {/* Will add component sections as we build them */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Coming soon...</h2>
        </section>
      </div>
    </div>
  )
}
```

**Files created:**
- `src/pages/demo.tsx`

**Commit message:**
```
Create component demo page for isolated development and testing

Added /demo route for building and testing components in isolation.
This page will showcase all design system components with their
variants, making it easy to:
- Test components without authentication
- Share previews with Michelle for design review
- Document component usage for team

Will populate with components as we build them in Step 2.
```

**Acceptance criteria:**
- ✅ Demo page loads at `/demo`
- ✅ Design tokens (colors, spacing, fonts) work correctly
- ✅ Page is styled with Tailwind classes
- ✅ Ready to add component sections

---

### Commit 8: Archive v0 demo pages

**Time estimate:** ~30 minutes

**What you'll do:**
1. Create `/archive/v0-demo/` directory
2. Move existing pages to archive (keep API routes)
3. Create new placeholder pages for fresh implementation
4. Update any import paths if needed

**Files moved:**
```
src/pages/dashboard/index.tsx → archive/v0-demo/dashboard.tsx
src/pages/backlog/[id].tsx → archive/v0-demo/backlog-detail.tsx
src/pages/magic/[token].tsx → archive/v0-demo/magic-view.tsx
src/pages/index.tsx → archive/v0-demo/landing.tsx
```

**Files kept (don't move):**
```
src/pages/api/** (all API routes stay)
src/pages/_app.tsx (stays)
src/lib/** (all utilities stay)
```

**New placeholder pages created:**
```typescript
// src/pages/index.tsx
export default function Home() {
  return <div>New Home - Coming soon</div>
}

// src/pages/dashboard/index.tsx
export default function Dashboard() {
  return <div>New Dashboard - Coming soon</div>
}

// Keep magic/[token].tsx for now since it's recipient-facing
```

**Commit message:**
```
Archive v0 demo frontend and prepare for fresh mobile-first implementation

Moved Phase 1 demo pages to /archive/v0-demo/:
- Landing page
- Dashboard
- Space detail view

Kept all backend code (API routes, lib, types) unchanged.
Created placeholder pages for new implementation.

The v0 pages successfully demonstrated backend functionality
(auth, CRUD, magic links). Phase 2 rebuilds the frontend with
Michelle's mobile-first design system.
```

**Acceptance criteria:**
- ✅ Old pages moved to archive/
- ✅ API routes still work
- ✅ `npm run dev` starts without errors
- ✅ New placeholder pages render

---

## Step 2: Atomic Components

**Goal:** Build smallest reusable UI components that are used across multiple screens
**Estimated Time:** 4-5 hours
**Total Commits:** 2

**Source:** COMPLETE_FIGMA_EXTRACTION.md sections "Avatars" and "Entry Chips"

---

### Commit 1: Avatar Component

**Time estimate:** 2-2.5 hours

**Figma reference:** COMPLETE_FIGMA_EXTRACTION.md section "Avatars"

**Component API:**
```tsx
// src/components/ui/Avatar.tsx
interface AvatarProps {
  type: 'image' | 'contact-initials' | 'space-initials'
  size: 'sm' | 'md' | 'lg'
  src?: string       // Required if type='image'
  initials?: string  // Required if type includes 'initials'
  alt?: string       // For accessibility
}
```

**Implementation approach:**
1. Read the "Avatars" section in COMPLETE_FIGMA_EXTRACTION.md
2. Find the three fill types: Fill=Image, Fill=Contact Initials, Fill=Space Initials
3. Extract all values (colors, sizing, typography, effects) from those subsections
4. Implement 3 types × 3 sizes = 9 total combinations
5. Handle edge cases (missing image, long initials)
6. Add all variants to `/demo` page

**Testing checklist:**
- ✅ All 9 combinations render correctly
- ✅ All colors match extraction document exactly
- ✅ Image variant handles missing/broken images gracefully
- ✅ Initials are centered and readable
- ✅ Perfect circles at all sizes
- ✅ Visual comparison to Figma confirms pixel-perfect match

**Commit message:**
```
Add Avatar component with 3 types and 3 sizes

Implements Avatar design from COMPLETE_FIGMA_EXTRACTION.md "Avatars" section.
All specs (colors, sizing, typography) taken directly from extraction document.

Supports: image, contact-initials, space-initials × sm/md/lg sizes
Added to /demo page with all type and size combinations.

Part of Phase 2: Step 2 - Atomic Components
```

---

### Commit 2: EntryChip Component

**Time estimate:** 2-2.5 hours

**Figma reference:** COMPLETE_FIGMA_EXTRACTION.md section "Entry Chips"

**Component API:**
```tsx
// src/components/ui/EntryChip.tsx
interface EntryChipProps {
  status: 'no-nudge' | 'nudge-scheduled' | 'nudge-sent' | 'nudge-responded' | 'entry-closed'
  label?: string  // Optional custom label, defaults to status label
}
```

**Implementation approach:**
1. Read the "Entry Chips" section in COMPLETE_FIGMA_EXTRACTION.md
2. Find all five status variants: No Nudge, Nudge Scheduled, Nudge Sent, Nudge Responded, Entry Closed
3. Extract all values (colors, sizing, typography, effects) from those subsections
4. Implement all 5 status variants
5. Add all status variants to `/demo` page

**Testing checklist:**
- ✅ All 5 status variants render correctly
- ✅ All colors match extraction document exactly (purple for entry-closed, green for nudge-responded, blue for nudge-sent)
- ✅ Border colors are distinct and visible against backgrounds
- ✅ Text is centered and readable
- ✅ Chips expand to fit custom labels while maintaining consistent height
- ✅ Visual comparison to Figma confirms pixel-perfect match

**Commit message:**
```
Add EntryChip component with 5 status variants

Implements Entry Chip design from COMPLETE_FIGMA_EXTRACTION.md "Entry Chips" section.
All specs (colors, sizing, typography) taken directly from extraction document.

Supports all 5 status states with proper color coding.
Added to /demo page with all status variants.

Part of Phase 2: Step 2 - Atomic Components
```

---

## Steps 3-7: Overview

These steps will be detailed as we complete prior steps. Each step will follow the same Extract → Reference → Build → Verify workflow.

### Step 3: Molecule Components (6-8 hours)
**Source:** COMPLETE_FIGMA_EXTRACTION.md section "List Cards"

- **ListCard (Contact type):** Combines Avatar + StatusDot + Text + EntryChips
- **ListCard (Space type):** Combines Avatar + Text + EntryChips + Connection count
- Glassmorphism effects as documented in extraction

### Step 4: Navigation & Action Components (12-15 hours)
**Source:** COMPLETE_FIGMA_EXTRACTION.md sections "Navigation Components", "Screen Mode Components", "Add Button"

- **TopNav:** Search bar + profile avatar (2 states: Active=No, Active=Yes)
- **MiddleNav:** Filter/sort controls + view tabs (3 variants: All, Contacts, Spaces)
- **ScreenModeSwitcher:** List/Grid/Chat tabs (3 states)
- **AddButton:** Floating action button (2 states: Add, Close with menu)

### Step 5: Home Screen (8-10 hours)
**Source:** COMPLETE_FIGMA_EXTRACTION.md section "Pinned" (if needed, extract using Figma MCP)

- Build layout combining navigation and molecule components
- PinnedSection component (if not yet extracted, add to COMPLETE_FIGMA_EXTRACTION.md first)
- Use mock data for initial development
- Swap to real Supabase data in dedicated commit

### Step 6: Space Detail Page (6-8 hours)
- Entry list view (mobile-optimized)
- QuickNudgeModal (if not yet extracted, add to COMPLETE_FIGMA_EXTRACTION.md first)
- Owner actions (add entry, edit, mark done)
- Reuses ListCard and EntryChip components

### Step 7: Magic Link Recipient View (4-6 hours)
- Recipient view without authentication
- Token verification flow (backend logic)
- Simplified UI reusing existing components
- Limited actions appropriate for recipients

---

## Testing Strategy

### During Development (Integrated)
- **Component-level:** Test in `/demo` page as we build
- **Quick checks:** After each commit, test in mobile browser
- **Acceptance criteria:** Each commit has specific checklist

### Mobile-Focused Testing (90%)

**Devices to test:**
- iPhone SE (small screen, 375px)
- iPhone 14 Pro (standard, 393px)
- Android device (Chrome, varies)

**What to test:**
- ✅ Renders correctly (matches Figma)
- ✅ Touch targets are ≥ 44x44px
- ✅ Text is readable
- ✅ Interactions work (tap, scroll)
- ✅ No horizontal scroll
- ✅ Performance is acceptable

**Tools:**
- Browser DevTools mobile emulation
- Real device testing via Vercel preview URLs
- Lighthouse mobile audits

### Desktop Smoke Testing (10%)

**What to test:**
- ✅ Page loads without errors
- ✅ Layout doesn't break (max-width container works)
- ✅ Can navigate between pages
- ✅ Basic interactions work

**What NOT to test:**
- Pixel-perfect desktop layouts
- Desktop-specific features
- Complex responsive behavior

### Final Validation (After Step 7)

**Performance:**
- Lighthouse mobile score > 90
- First Contentful Paint < 1.5s
- No layout shift issues

**Accessibility:**
- axe DevTools scan (zero violations)
- Keyboard navigation works
- Color contrast meets WCAG AA
- Semantic HTML used throughout

**Cross-browser:**
- Safari iOS (primary)
- Chrome Android (primary)
- Desktop Chrome (basic smoke test)

---

## Timeline & Estimates

### Detailed Breakdown

| Step | Description | Commits | Hours | Status |
|------|-------------|---------|-------|--------|
| 1 | Foundation Setup | 8 | 6-8 | Pending |
| 2 | Atomic Components | 4 | 8-10 | Pending |
| 3 | Molecule Components | 2 | 6-8 | Pending |
| 4 | Navigation | 3 | 6-8 | Pending |
| 5 | Home Screen | 3 | 8-10 | Pending |
| 6 | Space Detail | 2 | 6-8 | Pending |
| 7 | Magic Link View | 2 | 4-6 | Pending |
| Final | Testing & Polish | - | 4-6 | Pending |
| **Total** | | **24** | **48-64** | **0% Complete** |

### Adjusted Realistic Timeline

**Total: 40-50 work hours**
- At 4-5 hours/day = 10-12 days
- At 8 hours/day = 5-6 days
- **Recommended:** ~2 weeks at sustainable pace

### Progress Tracking

**Completed:**
- None yet

**In Progress:**
- Step 1, Commit 1 (Install Tailwind)

**Next Up:**
- Step 1 foundation setup

---

## Success Metrics

### Must Have (MVP)
- ✅ Mobile web (320-767px) matches Figma pixel-perfect
- ✅ All Phase 1 backend features work (auth, CRUD, magic links, email)
- ✅ Component library is reusable and documented
- ✅ Lighthouse mobile score > 90
- ✅ Zero accessibility violations

### Nice to Have (Post-MVP)
- Desktop-optimized layouts
- Grid/Chat view modes
- Advanced search/filtering
- Swipe gestures
- Complex animations

### Design Approval
- Michelle approves visual implementation
- Co-founders approve UX flows
- Ready for user testing

---

## Notes & Learnings

*(This section will be updated as we progress)*

**Key Decisions:**
- Using Tailwind CSS for styling (design token approach)
- Mock data first, Supabase integration later
- Component demo page for isolated development
- Mobile-first with 90/10 priority split

**Challenges Encountered:**
- TBD

**Adjustments Made:**
- TBD

---

**Last Updated:** 2025-10-13
**Current Step:** 1 (Foundation Setup)
**Current Commit:** 1/8 (Install Tailwind CSS)
