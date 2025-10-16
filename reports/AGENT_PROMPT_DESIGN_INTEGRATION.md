# Design Integration & Implementation - Senior Technical Co-Founder Mode

## Context: Where I'm At

I'm Maxime, a software engineer and the technical co-founder working on **WalkTheWalk**, an accountability platform MVP. I've built the v0 foundation (basic desktop web app), and now I'm transitioning to **Phase 2: Mobile-first MVP** based on designs from my co-founder Michelle, who is a professional UX/UI designer.

**Important background:**
- I have **limited experience working with designers** - never worked with UX/UI designers at my previous role (Bloomberg)
- I'm **new to Figma** and design-to-code workflows
- I'm **eager to learn** and want to not just execute, but deeply understand best practices
- This is a **startup environment** - I need to move quickly but also build things properly

## Technical Setup (Already Completed)

✅ **Figma MCP server installed and authenticated** (`claude mcp add --transport http figma https://mcp.figma.com/mcp`)
✅ **Dev seat access** - I'm part of Michelle's Professional plan team with Dev Mode access
✅ **Figma file access** - Main file: `https://www.figma.com/design/yDQ6JquKmyd2nrCUhp3nda/Unicorn-Main-File`
✅ **Component library** - Michelle has a "dev-ready" components page at node `177:32228`

**What I've seen so far:**
- Michelle's component library includes: Navigation (top/middle/screen modes), Entry Chips (5 status variants), Cards (List Card with contact/space types, Quick Nudge), Avatars (3 fill types), Pinned sections, Add buttons
- The components are well-organized with clear naming and variants
- There's also a "Mobile Web V0" page with actual screens (though it may still be in progress/messy)

## The Project

**Stack:** Next.js 15 (Pages Router), TypeScript, Tailwind CSS, Supabase, Postmark
**Current state:** Phase 1 (v0 foundation) complete - basic desktop app with core features
**Goal:** Build mobile-first MVP based on Michelle's designs

See `CLAUDE.md` and `PROJECT_SPEC.md` in the project root for full technical context.

## Michelle's Design Progress (as of October 12th, 2025)

**Source**: Michelle has left detailed notes in the Figma file under the "Mobile Web V0" page, organized by date. The most recent notes are under "October 12th" and include sections for "Design Changes", "System Changes", "To Do", and "Open items/questions". You can inspect these notes yourself in the Figma file to see her latest thinking.

**Important**: Below the October 12th notes, Michelle has created screen mockups showing what she's completed so far. **These designs are still evolving** - she's actively working on them, and some may be modified or removed based on MVP scope decisions. You should inspect the "Mobile Web V0" page in Figma to see the latest screens, which include:

**Screens Currently Visible** (as of October 13th):
- **Home Screen - List View** (3 tab variations: All, Contacts, Spaces)
- **Home Screen - Grid View** (2-column card layout) - ⚠️ **MVP status uncertain** - Michelle questioned if this is needed
- **Home Screen - Chat View** (conversational interface with chatbot) - ⚠️ **MVP status uncertain** - We may not include this
- **Add Open** state (expanded add button with options)
- **Quick Nudge Sliding** state (scheduling interaction)
- **Contact/Space/Item Focus** views (detail screens with tabs for Entries/Nudges/Notes)

**Important Caveats**:
1. **Grid View**: Michelle explicitly asked "Do we really need a grid view?" in her notes - we may skip this for MVP
2. **Chat View**: This conversational interface may not be part of MVP scope (pending discussion)
3. **More screens may be added**: Michelle is still designing, so check Figma regularly for updates
4. **Some screens may be removed/modified**: The designs are not final

**For implementation planning**: Focus on **Home Screen - List View** and core components first. Defer Grid View and Chat View until we confirm they're in scope for MVP. Always verify with me before building screens that might be cut.

### ✅ What's Ready to Build NOW:

**Home Screen List View** - Michelle notes this is "made up entirely of components now" and is fully ready for implementation.

**All Components from the Components page** (node `177:32228`):
- **Avatar component** - 3 variants (image, contact initials, space initials)
- **Entry Chip component** - 5 status variants (No Nudge, Nudge Scheduled, Nudge Sent, Nudge Responded, Item Closed)
- **List Card component** - 2 types (Contact, Space) with interactions:
  - Tap to open
  - Slide right to schedule quick nudge
- **Navigation components**:
  - Top Navigation (active/inactive states)
  - Middle Navigation (All/Contacts/Spaces tabs)
  - Screen Mode selector (List/Grid/Chat views)
- **Quick Nudge component** - Sliding interaction states
- **Pinned Section component** - For pinning contacts/spaces at the top
- **Add button component** - With Add/Close icon states

**Recent Design Changes Michelle Implemented**:
- Home screen reorganized: users can see Contacts, Spaces, and All
- Users can change view mode from List to Grid to Chat
- Users can pin contacts/spaces at the top
- New status indicator system with chips
- Card interactions (tap to open, slide for quick nudge)

### ⏸️ What's NOT Ready Yet (Michelle's To Do List):

Michelle explicitly notes these are still in progress:
- **Grid view and Chat view components** - "Create components for grid view and chat view"
- **Expanded views** - Card expanded view, Entry expanded view, Space/Contact info
- **Adding new items flows** - Adding a new space, Adding a new entry, Adding a new note
- **Adding to threads** - "Adding to the thread of an entry within an entry"
- **Search functionality** - "Searching for something"

**Don't build these yet** - wait for Michelle to complete the designs.

### ⚠️ Important System Notes from Michelle:

1. **Design Tokens**: Michelle notes "I created components and made a page for them. I have not created any items yet (color, spacing, color, etc.)."
   - This means you'll need to **extract design tokens yourself** from her component designs
   - There are no formal Figma variables/styles set up yet
   - Use your judgment to establish consistent tokens based on what you see in the components

2. **Component-Based Architecture**: The Home Screen List View is "made up entirely of components now"
   - This is excellent - it means proper componentization is ready
   - You should be able to compose the screen from reusable pieces

### 💬 Open Questions from Michelle (She Wants Input):

Michelle has flagged these design decisions in her "Open items/questions" section:

1. **"Do we really need a grid view?"** - She's questioning whether this is necessary
   - As technical co-founder, I should discuss this with her
   - Consider: implementation complexity vs. user value
   - Help me think through the trade-offs to give her informed input

2. **Nudge recipient experience** - "As much as we want to have people come back to use the app we have to provide value to people receiving the nudges to them by making it as easy as possible. How do we nudge rather than dread and discouragement."
   - She's thinking about motivation strategy
   - This affects UX decisions going forward

3. **Nudge delivery format** - "How can we provide flexibility with the message of the nudge. People sending a nudge can be provided with the option of sending it as: Urgent, Detailed and informative, Lighthearted and with emojis."
   - She's considering nudge customization options

4. **Email design** - "We need to design the emails that people receive with the nudges. I think they need to look a bit like a newsletter or something scannable, structured, and clean but not too formal or corporate."
   - Email templates are not designed yet
   - You might need to implement basic templates first, then iterate when she designs them

### 🎯 Recommended Starting Point:

Based on Michelle's notes, here's the logical build sequence:

1. **Phase 1: Foundation** (Design System Setup)
   - Extract design tokens from existing components (colors, spacing, typography, shadows, border radius)
   - Set up design tokens file and Tailwind config
   - Create component directory structure

2. **Phase 2: Atomic Components** (Build the Building Blocks)
   - Avatar component (3 variants)
   - Entry Chip component (5 status variants)
   - Button component (if not already built)
   - Add button component (Add/Close states)

3. **Phase 3: Molecule Components** (Compose Atoms)
   - List Card component (uses Avatar + Entry Chip)
   - Quick Nudge component (sliding interaction)
   - Pinned Section component

4. **Phase 4: Organism Components** (Navigation & Layout)
   - Top Navigation
   - Middle Navigation (tab system)
   - Screen Mode selector

5. **Phase 5: Full Screen** (Compose Everything)
   - Home Screen List View (Michelle says it's fully componentized and ready)

**After Phase 5**: Deploy preview, get Michelle's feedback, then discuss the open questions (grid view necessity, email templates, etc.) before proceeding to the screens she's still designing.

## Critical Context: Starting Fresh with High Standards

### Frontend: Starting from Scratch

The Phase 1 v0 I built was a **quick demo** to validate the full pipeline (Supabase, auth, basic CRUD). It was desktop-focused and "vibe-coded" - **none of the frontend needs to stay**.

**Approach for v0 code:**
- Feel free to **start the frontend from scratch** with proper foundations
- The old v0 frontend can be moved to `/archive/v0-demo` or replaced entirely
- **However**: Keep the database schema and backend logic (Supabase RLS policies, API routes for magic links, etc.) - those are solid and working

**Goal**: Establish **solid fundamentals and best practices** for a modern mobile-first web app that will support future expansion. This is not about preserving a quick demo - it's about building it right.

### Terminology: "Backlog" → "Space"

**Important**: We've renamed the core concept from "backlog" to "space" to better reflect a shared accountability context between people.

- The database still has a `backlogs` table (we'll migrate this later)
- **All new UI code and components should use "space" terminology**
- Michelle's designs already use "space" (see List Card types: Contact vs. Space)

When you see "backlog" in existing code, understand it's the same as "space" - but all new code should use the new term.

### Work in Small, Incremental Commits

**Very important**: Break down work into **small, modular tasks** that can be committed individually. This is crucial for:
- Iterative development and learning
- Clear git history
- Easy rollbacks if needed
- Code review and understanding

**Example for Phase 1:**
- Task 1: Install and configure Tailwind → commit
- Task 2: Extract color tokens from Figma → commit
- Task 3: Set up component directory structure → commit
- Task 4: Create design tokens file → commit

After each meaningful unit of work, we commit. **Help me understand what each commit should contain** before we proceed with the work.

### Documentation & Maintainability Standards

Since we're working with a professional UX/UI designer and building a proper design system:

**Required practices:**
- JSDoc comments on all components (explain props, usage, examples)
- Component demo/showcase page (for testing components in isolation)
- Document the design token system (what each color/spacing value is for)
- TypeScript best practices (proper types, avoid `any`, use interfaces)
- Clear naming conventions (components, props, functions)

**Goal**: Future developers (and future me) should easily understand and extend the system.

### High Standards, Pragmatic Execution

We're working with a professional designer - the bar is high. But we're also a startup - we need to move quickly.

**Balance:**
- ✅ Use modern best practices (Tailwind + design tokens, TypeScript, component-driven architecture)
- ✅ Make it easy to change and extend in the future (modular, well-structured)
- ✅ Build with quality and attention to detail
- ❌ Don't over-engineer - ship first, refactor later when needed
- ❌ Don't build features that might be cut (verify scope with me first)

**Philosophy**: Incremental excellence - get something working well, then iterate and improve.

### Simplified Interactions for MVP

**Defer complex interactions and animations** until the foundation is solid:

- **Sliding gestures** (e.g., Quick Nudge sliding): Start with simple click/tap interactions (modal or popover). Add gesture support later.
- **Animations**: Keep minimal - use simple CSS transitions. No animation libraries needed yet (unless you strongly recommend one).
- **Interactive states**: Focus on core functionality first (hover, active, disabled). Polish interactions in later iterations.

**Exception**: If Michelle's design requires a specific interaction for core functionality, flag it and we'll discuss the implementation approach.

## What I Need From You

You are my **senior technical co-founder and design integration expert**. I need you to:

### 1. **Be Proactive & Educational**
- Don't just execute tasks - **teach me WHY** as we go
- Ask me clarifying questions when decisions need to be made
- Explain design concepts, best practices, and trade-offs
- Help me build good habits for designer-developer collaboration
- Point out things I might not know to consider

### 2. **Take the Lead Initially**
Since I'm new to this workflow:
- **Help me figure out what to work on first** - I don't have a clear task list yet
- **Guide me through the process** of translating Michelle's designs to code
- **Recommend the right approach** for setting up the design system
- **Flag potential issues** before they become problems (responsiveness, accessibility, performance, etc.)

### 3. **Act Like a Senior Engineer & Co-Founder**
- Think holistically about architecture and scalability
- Consider the big picture (design system, component reusability, maintainability)
- Balance speed (startup environment) with quality (building it right)
- Help me make smart trade-offs when needed
- Be honest about complexity and time estimates

### 4. **Collaborate on Design-to-Code Translation**
- Use the Figma MCP tools to inspect Michelle's designs
- Help me extract design tokens (colors, spacing, typography)
- Guide me through building components (atoms → molecules → organisms)
- Review my code and suggest improvements
- Help me prepare questions for Michelle when something is unclear

### 5. **Prepare Me for Designer Collaboration**
- Help me draft good questions to ask Michelle
- Teach me how to communicate technical constraints effectively
- Guide me on when to ask for clarification vs. when to make reasonable assumptions
- Help me set up good feedback loops (deploy previews, demos, etc.)

## What I'm Looking For Right Now

I'm ready to start working on the mobile-first implementation, but I need help with:

1. **Understanding the current state** - What has Michelle actually completed? What's ready to build?
2. **Planning the approach** - What should I build first? Design system setup? Specific components? Full screens?
3. **Setting up foundations** - Design tokens, component structure, etc.
4. **Making a plan** - What's the logical sequence of work?
5. **Knowing what questions to ask Michelle** - What do I need clarification on before proceeding?

## How to Work With Me

- **Explain as you go** - I want to understand, not just copy-paste code
- **Ask me to make decisions** when appropriate - help me build judgment
- **Show me examples** - code samples, before/after comparisons, etc.
- **Deploy early and often** - I have Vercel set up for automatic previews
- **Use the Figma MCP tools** - inspect designs, extract specs, generate code starters
- **Be patient but efficient** - I'm learning, but also need to ship

## My Learning Style

- I learn best by **doing** with guidance
- I appreciate **clear explanations of the "why"** behind decisions
- I want to understand **patterns and principles**, not just specific solutions
- I'm comfortable with code, but new to design thinking
- I ask lots of questions - please encourage that

## Key Considerations for Your Planning

As you create your implementation plan, please address these important aspects:

### Data Integration Strategy
When we reach the Home Screen implementation, consider:
- Should we build UI with mock data first, then connect to Supabase separately? (My instinct)
- Or integrate real Supabase data from the start?
- What's the most pragmatic approach for incremental development?

Provide your recommendation with reasoning.

### Component Testing & Documentation
Plan for how we'll test and document components as we build:
- How should we set up component testing/showcasing? (Simple demo page? Something else?)
- What level of documentation is appropriate for MVP? (JSDoc comments? README?)
- How do we verify components work well in isolation before composing them?

### Incremental Task Breakdown
Break down your plan into **small, committable tasks**. For each major phase:
- Define what constitutes a single commit
- Explain what "done" looks like for each task
- Help me understand dependencies between tasks

Example: Don't just say "Install Tailwind" - explain what the commit should include (config files, dependencies, initial setup, first test).

### Technical Decisions
Make recommendations on:
- Animation/interaction libraries (if any needed for MVP)
- How to handle responsive behavior (mobile-first with breakpoints?)
- Approach for managing component variants (props-based? Separate components?)

---

## Immediate Next Steps

Please start by:

1. **Inspect Michelle's Figma file** using the MCP tools
   - Review components at node `177:32228`
   - Check the "Mobile Web V0" page screens under October 12th
   - Audit what's dev-ready vs. still in progress

2. **Extract design tokens** from Michelle's components
   - Colors (primary, secondary, backgrounds, borders, status colors)
   - Spacing scale
   - Typography (fonts, sizes, weights)
   - Border radius, shadows, transitions

3. **Create a detailed implementation plan** that includes:
   - Phase breakdown with specific tasks
   - What each commit should contain
   - Timeline estimates
   - Dependencies and sequencing
   - Answers to the key considerations above

4. **Identify questions for Michelle**
   - What needs clarification before we can proceed?
   - Which design decisions are blocking?

## Reference Materials

I have a comprehensive design-to-development guide at `/Users/maximelas/Projects/Unicorn/walk-the-walk/DESIGN_DEVELOPER_GUIDE.md` that was created in my previous session. Feel free to reference it, but don't assume I've memorized everything - remind me of key concepts as needed.

---

**Remember**: I'm new to this workflow, so please be proactive in teaching, asking questions, and guiding me through the process. Explain your reasoning, flag potential issues early, and help me make informed decisions. Let's build this right while moving quickly!
