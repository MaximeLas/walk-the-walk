# Phase 2: Mobile-First Design Integration - Implementation Plan

**Purpose:** Methodology and implementation guidance for Phase 2 development.

**For Progress Tracking:** See [PHASE2_STATUS_TRACKING.md](PHASE2_STATUS_TRACKING.md)
**For Design Specs:** See [COMPLETE_FIGMA_EXTRACTION.md](COMPLETE_FIGMA_EXTRACTION.md)

**Started:** 2025-10-13
**Estimated Duration:** 40-50 work hours (~2 weeks)

---

## Quick Start for Incoming Agents

**First time working on Phase 2? Read these in order:**

1. **[PHASE2_STATUS_TRACKING.md](PHASE2_STATUS_TRACKING.md)** - What's complete, what's in progress, what's next
2. **This file** - Methodology, workflow, quality standards
3. **[COMPLETE_FIGMA_EXTRACTION.md](COMPLETE_FIGMA_EXTRACTION.md)** - Design specs for components

**Quick orientation:**
```bash
# See recent Phase 2 commits
git log --oneline --grep="Phase 2" -20

# Start dev server
npm run dev

# View demo page
open http://localhost:3000/demo
```

---

## Table of Contents

1. [🚨 CRITICAL: Agent Execution Protocol](#-critical-agent-execution-protocol)
2. [Core Workflow](#core-workflow)
3. [Strategic Approach](#strategic-approach)
4. [Component Implementation Process](#component-implementation-process)
5. [Tool Usage Guidelines](#tool-usage-guidelines)
6. [Quality Standards](#quality-standards)
7. [Commit Standards](#commit-standards)
8. [Change Management Protocol](#change-management-protocol)
9. [Step Implementation Details](#step-implementation-details)
10. [Testing Strategy](#testing-strategy)

---

## 🚨 CRITICAL: Agent Execution Protocol

**READ THIS FIRST - Required workflow for all Phase 2 work**

### Per-Step Execution Rules

**MANDATORY: Each step must be done in its own feature branch and MUST stop after completion for testing.**

#### Step Workflow (REQUIRED)

```bash
# 1. CREATE FEATURE BRANCH for the step
git checkout -b feature/phase2-step-X-description

# 2. IMPLEMENT the step (all commits for that step)
# ... make your commits ...

# 3. STOP HERE - DO NOT CONTINUE TO NEXT STEP
# Agent must stop and report completion
```

#### After Step Completion, Agent MUST:

1. **Report completion** with:
   - Summary of what was implemented
   - List of files created/modified
   - Link to demo page to test (`http://localhost:3000/demo`)
   - Any issues or notes encountered

2. **Wait for user testing** - User will:
   - Test implementation manually
   - Run automated tests (if applicable)
   - Review code
   - Provide feedback or approval

3. **Only after approval**, user will:
   - Merge feature branch to main
   - Tell agent to continue with next step

### Why This Matters

- **Testing is mandatory** between steps - components must work before building on them
- **Feature branches isolate work** - easier to test, review, and rollback if needed
- **Prevents cascading errors** - don't build Step 3 on broken Step 2
- **Allows design iteration** - Michelle might want changes after seeing implementation

### Automated Testing (Chrome DevTools MCP)

**Agent should use Chrome DevTools MCP to verify implementation before reporting completion:**

```bash
# Start dev server if not running
npm run dev

# Agent uses Chrome DevTools MCP:
# 1. Navigate to demo page
# 2. Take screenshots of components
# 3. Test interactions (clicks, hovers)
# 4. Check console for errors
# 5. Verify responsive behavior
```

**Available Chrome DevTools MCP tools:**
- `mcp__chrome-devtools__navigate_page` - Load demo page
- `mcp__chrome-devtools__take_screenshot` - Capture visual proof
- `mcp__chrome-devtools__take_snapshot` - Get page state
- `mcp__chrome-devtools__list_console_messages` - Check for errors
- `mcp__chrome-devtools__click` / `hover` - Test interactions
- `mcp__chrome-devtools__resize_page` - Test mobile viewport

### Example Step Completion Report

```markdown
## Step 2 (Atomic Components) - COMPLETE ✅

**Branch:** feature/phase2-step-2-atomic-components
**Commits:** 2/2
- e5bd7a1 - Avatar component
- 800152b - EntryChip component

**Files Created:**
- src/components/ui/Avatar.tsx (9 variants)
- src/components/ui/EntryChip.tsx (5 variants)

**Demo Page:** http://localhost:3000/demo
- Avatar: All 3 types × 3 sizes rendering correctly
- EntryChip: All 5 status variants rendering correctly

**Automated Tests:**
✅ Demo page loads without console errors
✅ All Avatar variants render correctly
✅ All EntryChip variants render with correct colors
✅ Mobile viewport (375px) tested

**Screenshots attached:** [links to screenshots]

**Ready for:** Manual testing and approval before Step 3
```

---

## Core Workflow

**Every step follows this four-stage workflow:**

1. **Extract** - Get exact design values from Figma into COMPLETE_FIGMA_EXTRACTION.md
2. **Reference** - Read extraction document to understand component specs
3. **Build** - Implement components using values from extraction document
4. **Verify** - Compare implementation to Figma visually and functionally

**Key Resources:**
- **Design Source:** `COMPLETE_FIGMA_EXTRACTION.md` - Systematic extraction of all Figma component specs
- **Figma Components:** Node ID 177:32228 (if you need to extract new components)
- **Tools:** Figma MCP (extraction), Context7 MCP (library docs)

---

## Strategic Approach

### Mobile-First Priority (90/10 Rule)

**Mobile Web (320-767px): 90% of effort**
- Pixel-perfect implementation matching Michelle's Figma designs
- Thorough testing on real devices (iPhone SE, iPhone 14 Pro, Android)
- All interactions optimized for touch (targets ≥ 44px)
- This is our MVP target and primary user experience

**Desktop/Tablet (768px+): 10% of effort**
- Simple max-width container (480px) centered on screen
- Basic smoke testing only (does it render? can I navigate?)
- No custom layouts or desktop-specific features
- Will redesign when Michelle creates desktop designs

**Container pattern:**
```tsx
<div className="w-full max-w-md mx-auto min-h-screen bg-bg-app">
  {/* Mobile-optimized content */}
</div>
```

### Core Principles

1. **Start Fresh** - Archive v0 pages to `/archive/v0-demo/`, build new mobile-first pages from scratch
2. **Tailwind CSS** - Michelle's Figma outputs Tailwind classes; design tokens configured in `src/styles/globals.css`
3. **Mock Data First** - Use `src/lib/mockData.ts` for fast iteration; swap to Supabase in dedicated commit
4. **Demo Page** - `/demo` page showcases all components for isolated testing and easy preview sharing
5. **"Space" Terminology** - New code uses "space" (not "backlog") to match product evolution
6. **Simplified Interactions** - Modals instead of sliding drawers, basic CSS transitions for MVP

---

## Component Implementation Process

### Before Coding

1. Open `COMPLETE_FIGMA_EXTRACTION.md` and locate the component section
2. Read the full specification (colors, sizing, typography, effects)
3. **If component is missing:** Extract from Figma first, add to document, get user approval
4. Note the section name for traceability

### While Coding

1. Use values directly from extraction document (not Figma directly)
2. Reference section names in code comments for traceability
3. Implement all documented variants (don't skip edge cases)
4. Create TypeScript interfaces for all component props
5. Use accessible HTML semantics

### After Coding

1. Add component to `/demo` page with all variants
2. Visual comparison: Screenshot your implementation vs Figma
3. Functional testing: Test all props, edge cases, mobile viewport (375px)
4. Report completion with screenshot before moving to next component
5. Update PHASE2_STATUS_TRACKING.md to mark commit as complete

---

## Tool Usage Guidelines

### Figma MCP Tools

**When to use:**
- Extraction document is missing a component you need to build
- You need visual reference for comparison
- You want to verify a specific value against Figma

**Key tools:**
- `mcp__figma-desktop__get_code` - Extract component specs
- `mcp__figma-desktop__get_screenshot` - Visual reference
- `mcp__figma-desktop__get_metadata` - Component structure overview

### Context7 MCP Tools

**When to use:**
- Setting up a new library for the first time
- Working with a new major version of a library
- Unsure about API syntax or configuration

**Key tools:**
- `mcp__context7__resolve-library-id` - Find correct library ID
- `mcp__context7__get-library-docs` - Get up-to-date documentation

### Handling New Components

If a component isn't in `COMPLETE_FIGMA_EXTRACTION.md`:

1. Check Figma Components page (use `get_metadata` on node 177:32228)
2. Extract using `get_code` with the node ID
3. Add new section to COMPLETE_FIGMA_EXTRACTION.md following existing format
4. **Get user approval** on the extraction before implementing
5. Build component referencing your new extraction section

---

## Quality Standards

### Pixel-Perfect Implementation

- Colors match extraction document exactly (no "close enough")
- Spacing, typography, border radius match exactly
- All variants implemented, not just the happy path

### Code Quality

- TypeScript interfaces for all component props
- Proper prop types matching documented variants
- Accessible HTML semantics
- Mobile-optimized (touch targets ≥ 44px)

### Testing Requirements

- All prop combinations render correctly
- Edge cases handled (missing images, long text, empty states)
- Mobile viewport (375px) tested
- Demo page includes all variants

---

## Commit Standards

### Commit Message Template

```
[Brief imperative description of what was added/changed]

Implements [Component Name] design from COMPLETE_FIGMA_EXTRACTION.md "[Section Name]" section.
All specs (colors, sizing, typography) taken directly from extraction document.

[Brief description of features/variants implemented]
Added to /demo page with [description of what's showcased].

Part of Phase 2: [Step Name]
```

### Commit Guidelines

- Reference COMPLETE_FIGMA_EXTRACTION.md section names for traceability
- Focus on one component or one logical unit of work
- Follow existing commit message style in the repo
- Update PHASE2_STATUS_TRACKING.md after each commit

---

## Change Management Protocol

**CHANGE = Consistent Handling of Adaptive Next-Generation Execution**

### Communication Format

When Michelle provides design updates, use this format:

```markdown
## Design Update from Michelle

**What changed:** [New screen / Modified screen / Updated component]
**Context:** [Why this change?]
**Figma link:** [URL]
**Priority:** [Critical / High / Medium / Low]
**Dependencies:** [Affects existing work?]
```

### Impact Analysis

**Change Categories:**
- ✅ **Additive** - New feature, doesn't affect existing code (easy to slot in)
- ⚠️ **Modificative** - Changes existing component (assess if in-progress or done)
- 🚨 **Breaking** - Requires rework of completed work (discuss trade-offs)

**Change Types:**
- **Foundation** - Affects design tokens, core components (high impact)
- **Component** - New/updated component (medium impact)
- **Page** - New/updated page (low impact if components exist)
- **Polish** - Styling tweaks, refinements (very low impact)

### Decision Framework

| Change Type | Current Work Status | Action |
|-------------|---------------------|--------|
| Critical + Affects completed work | Any | Pause, discuss trade-offs, decide together |
| Critical + New feature | Any | Insert immediately after current commit |
| High + Affects in-progress | In progress | Finish current commit, then integrate |
| High + New feature | Not started | Add to plan, prioritize after current step |
| Medium/Low | Any | Add to plan, tackle after current sprint |

### Documentation

After agreed changes:
- Update relevant step in this plan
- Update `PROJECT_SPEC.md` if it's a new feature
- Update `CLAUDE.md` if it's a new pattern/convention
- Commit messages reference the design change

---

## Step Implementation Details

**Note:** See [PHASE2_STATUS_TRACKING.md](PHASE2_STATUS_TRACKING.md) for completion status. This section provides implementation guidance.

### Step 1: Foundation Setup ✅ COMPLETE

See PHASE2_STATUS_TRACKING.md for details.

---

### Step 2: Atomic Components

**Goal:** Build smallest reusable UI components used across multiple screens
**Estimated Time:** 4-5 hours
**Commits:** 2 total

**Source:** COMPLETE_FIGMA_EXTRACTION.md sections "Avatars" and "Entry Chips"

#### Commit 1: Avatar Component (~2-2.5 hours)

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
1. Read "Avatars" section in COMPLETE_FIGMA_EXTRACTION.md
2. Find three fill types: Image, Contact Initials, Space Initials
3. Implement 3 types × 3 sizes = 9 combinations
4. Handle edge cases (missing image, long initials)
5. Add all variants to `/demo` page

**Testing checklist:**
- All 9 combinations render correctly
- Colors match extraction document exactly
- Image variant handles missing/broken images gracefully
- Initials centered and readable
- Perfect circles at all sizes
- Visual comparison confirms pixel-perfect match

#### Commit 2: EntryChip Component (~2-2.5 hours)

**Component API:**
```tsx
// src/components/ui/EntryChip.tsx
interface EntryChipProps {
  status: 'no-nudge' | 'nudge-scheduled' | 'nudge-sent' | 'nudge-responded' | 'entry-closed'
  label?: string  // Optional custom label, defaults to status label
}
```

**Implementation approach:**
1. Read "Entry Chips" section in COMPLETE_FIGMA_EXTRACTION.md
2. Find all five status variants
3. Implement all 5 status variants
4. Add all status variants to `/demo` page

**Testing checklist:**
- All 5 status variants render correctly
- Colors match extraction document exactly
- Border colors distinct and visible
- Text centered and readable
- Chips expand to fit custom labels while maintaining height
- Visual comparison confirms pixel-perfect match

---

### Step 3: Molecule Components (~6-8 hours)

**Source:** COMPLETE_FIGMA_EXTRACTION.md section "List Cards"

- **ListCard (Contact type):** Combines Avatar + StatusDot + Text + EntryChips
- **ListCard (Space type):** Combines Avatar + Text + EntryChips + Connection count
- Glassmorphism effects as documented in extraction

---

### Step 4: Navigation & Action Components (~12-15 hours)

**Source:** COMPLETE_FIGMA_EXTRACTION.md sections "Navigation Components", "Screen Mode Components", "Add Button"

- **TopNav:** Search bar + profile avatar (2 states: Active=No, Active=Yes)
- **MiddleNav:** Filter/sort controls + view tabs (3 variants: All, Contacts, Spaces)
- **ScreenModeSwitcher:** List/Grid/Chat tabs (3 states)
- **AddButton:** Floating action button (2 states: Add, Close with menu)

---

### Step 5: Home Screen (~8-10 hours)

**Source:** COMPLETE_FIGMA_EXTRACTION.md section "Pinned" (if needed, extract first)

- Build layout combining navigation and molecule components
- PinnedSection component (extract if not in document)
- Use mock data for initial development
- Swap to real Supabase data in dedicated commit

---

### Step 6: Space Detail Page (~6-8 hours)

- Entry list view (mobile-optimized)
- QuickNudgeModal (extract if not in document)
- Owner actions (add entry, edit, mark done)
- Reuses ListCard and EntryChip components

---

### Step 7: Magic Link Recipient View (~4-6 hours)

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

**Test devices:**
- iPhone SE (small screen, 375px)
- iPhone 14 Pro (standard, 393px)
- Android device (Chrome, varies)

**Test criteria:**
- Renders correctly (matches Figma)
- Touch targets ≥ 44x44px
- Text readable
- Interactions work (tap, scroll)
- No horizontal scroll
- Performance acceptable

**Tools:**
- Browser DevTools mobile emulation
- Real device testing via Vercel preview URLs
- Lighthouse mobile audits

### Desktop Smoke Testing (10%)

**Test criteria:**
- Page loads without errors
- Layout doesn't break (max-width container works)
- Can navigate between pages
- Basic interactions work

**NOT tested:**
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
- Semantic HTML throughout

**Cross-browser:**
- Safari iOS (primary)
- Chrome Android (primary)
- Desktop Chrome (basic smoke test)

---

**For current progress and completion tracking, see [PHASE2_STATUS_TRACKING.md](PHASE2_STATUS_TRACKING.md).**
