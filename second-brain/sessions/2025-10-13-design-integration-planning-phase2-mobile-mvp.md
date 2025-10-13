# Session: Design Integration Planning - Phase 2 Mobile MVP

---
type: session
date: 2025-10-13
participants: [Max, Claude]
topics: [design integration, Figma workflow, mobile-first development, git workflow, change management, developer-designer collaboration]
context: "Max preparing to start Phase 2 implementation - integrating Michelle's mobile-first designs. First time working with UX/UI designer, unfamiliar with Figma, needs guidance on design-to-code workflow and collaboration."
decisions_made:
  - Use Tailwind CSS (not CSS modules) for styling
  - Start frontend from scratch (archive v0)
  - Branch-per-step git workflow for incremental feedback
  - 90/10 mobile-first priority (90% mobile perfection, 10% desktop basic)
  - Mock data first, integrate Supabase later
  - CHANGE Protocol for handling evolving requirements
  - "Space" terminology (not "backlog") in all new code
  - Simplified interactions for MVP (modals not sliding drawers)
unresolved_questions:
  - Exact timing of when Michelle will complete remaining designs
  - Whether Grid View and Chat View will make it into MVP
  - Desktop UX approach (TBD after mobile is solid)
key_artifacts:
  - DESIGN_DEVELOPER_GUIDE.md (370+ line comprehensive guide)
  - AGENT_PROMPT_DESIGN_INTEGRATION.md (detailed prompt for new agent)
  - PLAN_FEEDBACK.md and PLAN_FEEDBACK_2.md (iterative planning feedback)
  - PHASE2_PLAN.md (final approved implementation plan)
related_sessions: []
duration: ~6 hours (across multiple conversations)
session_quality: high
---

## Opening Context

Max is transitioning from Phase 1 (v0 desktop demo) to Phase 2 (mobile-first MVP) based on designs from co-founder Michelle, a professional UX/UI designer. This is Max's first experience:
- Working with a UX/UI designer
- Using Figma
- Design-to-code workflow
- Designer-developer collaboration

Michelle has created:
- Component library in Figma (node 177:32228) - marked as "dev-ready"
- Initial mobile screens under "Mobile Web V0" page
- Design notes dated October 12th with status updates and open questions

Max installed Figma MCP server (has Dev seat on Michelle's Professional plan) and needs guidance on:
1. How to work with designers in general
2. Figma basics and design-to-code translation
3. Best practices for design integration
4. How to handle evolving designs in startup environment

## The Conversation Arc

### Phase 1: Educational Foundation (Design-Developer Collaboration)

**Max's request**: "I need help with educating me on how to work as a software developer with a UX/UI designer."

**Key topics covered**:
- Design tokens (colors, spacing, typography, shadows, border radius)
- Component thinking (atoms → molecules → organisms)
- Responsive design (mobile-first with breakpoints)
- Visual hierarchy and spacing
- Figma structure and concepts (frames, components, variants, Auto Layout = Flexbox)

**The Big Picture insight**: Design-to-code isn't about pixel-perfect copying - it's about **translating design intent** into functional, responsive code.

> "The right code is aligned to design intent, not just pixels." (from Figma MCP article)

**Figma MCP Server capabilities discovered**:
- `get_code`: Generate React + Tailwind code from designs
- `get_screenshot`: Visual preview of designs
- `get_variable_defs`: Extract design tokens
- `get_metadata`: Layer structure and properties

**Key exchange**:
- Max: "I never worked with Figma. I'm unfamiliar with just building blocks or how it works."
- Claude: Provided comprehensive education on Figma concepts, design tokens, component architecture, and created 50+ page `DESIGN_DEVELOPER_GUIDE.md`

**Artifact created**: `DESIGN_DEVELOPER_GUIDE.md` - comprehensive guide covering:
- Design fundamentals (tokens, components, responsive design)
- Understanding Figma (structure, Dev Mode, extraction)
- Design-to-code translation (step-by-step workflow)
- Design systems and component architecture
- Communication best practices
- First week action plan
- Common pitfalls
- Resources and cheat sheets

### Phase 2: Discovering Michelle's Current Progress

**Inspected Figma file** using MCP tools to assess what's ready:
- Component library at node 177:32228 with 6 component families
- Michelle's notes under "Mobile Web V0" page (October 12th)

**Michelle's notes revealed**:
- **Design Changes**: New home screen organization, pinning, status chips, card interactions
- **System Changes**: "I created components and made a page for them. I have not created any items yet (color, spacing, typography, etc.)" → **Design tokens must be extracted manually**
- **To Do**: Grid/Chat views, expanded views, adding flows, search (not ready yet)
- **Open Questions**: "Do we really need a grid view?", nudge recipient experience, email design

**Critical insight**: Michelle has completed:
- ✅ Home Screen List View (3 tab variations)
- ✅ Component library (ready to implement)
- ⏸️ Grid View and Chat View (uncertain for MVP)
- ⏸️ Detail views and adding flows (still designing)

**Additional screens discovered**: After Max shared more screenshots:
- Contact/Space/Item Focus views (detail screens)
- Grid View (2-column layout)
- Chat View (conversational interface with calendar picker)

**Strategic caveat identified**: Designs are still evolving, some screens may be modified or removed based on MVP decisions.

### Phase 3: Creating Agent Prompt for New Session

**Context**: Max wanted to start a fresh Claude Code session with all necessary context.

**Created**: `AGENT_PROMPT_DESIGN_INTEGRATION.md` with sections:
- Context (Max's background, experience level, startup environment)
- Technical setup (Figma MCP, Dev seat, file access)
- Michelle's design progress (what's ready, what's not)
- Critical context (starting fresh, terminology change, high standards)
- What Max needs (educational approach, leadership, collaboration)
- Key considerations (data integration, testing approach, incremental commits)
- Immediate next steps

**Iterative refinement**:
1. Initial draft referenced prior conversation ("you mentioned") - **Fixed**: Made self-contained
2. Questions formatted as pre-requirements - **Fixed**: Integrated as "considerations for planning"
3. Added Michelle's notes context with caveats about evolving designs
4. Added screens list with MVP status flags (Grid/Chat uncertain)

**Terminology decision captured**: "Backlog" → "Space" for all new code (database migration later).

### Phase 4: Agent Planning and Feedback Loop

**First plan received** from new agent:
- 5-phase approach (Foundation → Atoms → Molecules → Organisms → Full Screen)
- 30-44 hour estimate
- Tailwind + design tokens approach

**Critical issues identified**:
1. ❌ **CSS Modules instead of Tailwind** - Agent said "NO Tailwind installation"
2. ❌ **Retrofitting old pages** - Plan said "update existing pages" not "start fresh"
3. ❌ **Missing commit breakdown** - Only phase-level, not commit-level detail
4. ❌ **Didn't answer key questions** - Data integration, component demo approach
5. ❌ **Used "backlog" terminology** - Should be "space"
6. ❌ **Unrealistic timeline** - 10-13 days for 9 steps seemed optimistic

**Feedback provided** via `PLAN_FEEDBACK.md`:
- Must use Tailwind (Michelle's Figma outputs Tailwind)
- Must start fresh (archive v0, build new)
- Need commit-by-commit breakdown
- Answer data integration and testing questions
- Use "space" terminology throughout
- Clarify timeline expectations
- Simplify interactions (modals not sliding drawers)

**Revised plan received** addressed all issues:
- ✅ Tailwind CSS as styling system
- ✅ Starting fresh, archiving v0
- ✅ "Space" terminology throughout
- ✅ Simplified interactions
- ✅ Mock data first, Supabase later
- ✅ Component demo page `/demo`
- ✅ 40-50 work hours realistic timeline
- ✅ Step 1 broken into 8 detailed commits

### Phase 5: Strategic Clarifications (Mobile-First Priority)

**Max's strategic input**:
> "The priority is really mobile web at first... Michelle basically saying that we should start with mobile web because it will be where most users would likely use the app but also because it will be much easier to scale up from mobile web to desktop then scaling down from desktop to mobile web."

**The 90/10 Rule established**:
- **90% mobile web perfection** (320-767px) - pixel-perfect, thorough testing
- **10% desktop "good enough"** (simple centered layout, basic functionality)
- Testing mirrors this (90% mobile, 10% desktop smoke tests)

**Rationale**:
- Michelle designed exclusively for mobile
- Desktop UX will be redesigned later when she creates those designs
- Time spent perfecting desktop now is wasted (will redo anyway)
- Simple max-width container for desktop is sufficient for MVP

**Implementation approach**:
```jsx
// Simple mobile-first with basic desktop support
<div className="w-full max-w-md mx-auto min-h-screen bg-bg-app">
  {/* Mobile-optimized content */}
</div>
```

### Phase 6: Change Management Methodology

**The reality**: Michelle is still designing, requirements will change.

**The need**: A robust, consistent process for handling evolving requirements.

**The CHANGE Protocol developed**:

**C**onsistent **H**andling of **A**daptive **N**ext-**G**eneration **E**xecution

**5-step process**:
1. **Communication** - Structured format for reporting design updates
2. **Evaluation** - Analyze impact (additive, modificative, breaking)
3. **Decision** - Use prioritization matrix
4. **Update** - Modify plan accordingly
5. **Documentation** - Update PROJECT_SPEC.md and CLAUDE.md

**Communication format**:
```markdown
## Design Update from Michelle

**What changed:** [New screen added / Existing screen modified]
**Context:** [Why? User feedback? New feature?]
**Figma link:** [URL]
**Priority:** [Critical / High / Medium / Low]
**Dependencies:** [Affects existing work?]
```

**Prioritization matrix**:
- **Critical + Affects completed work** → Pause, discuss trade-offs
- **Critical + New feature** → Insert immediately after current commit
- **High + Affects in-progress** → Finish current commit, then integrate
- **High + New feature** → Add to backlog, prioritize after current step
- **Medium/Low** → Add to backlog, tackle after current sprint

**Example workflow provided**: Michelle adds "Quick Filter Bar" component → Agent analyzes impact → Proposes integration → Max approves → Added to Step 2.

### Phase 7: Git Workflow Decision

**Critical question** from Max: "Should we commit straight to main?"

**Answer**: No! Use feature branches.

**Branch-per-step approach decided**:
```
main
├── feature/phase2-foundation (Step 1)
├── feature/phase2-atomic-components (Step 2)
├── feature/phase2-molecules (Step 3)
├── feature/phase2-navigation (Step 4)
├── feature/phase2-home-screen (Step 5)
├── feature/phase2-space-detail (Step 6)
├── feature/phase2-magic-link (Step 7)
```

**Workflow**:
1. Complete Step 1 → merge to main → Vercel deploys
2. Michelle reviews demo page
3. Complete Step 2 → merge to main → Vercel deploys
4. Michelle reviews components
5. Repeat for each step

**Why this works best**:
- Incremental feedback from Michelle
- Stable checkpoints in main (always deployable)
- Small, reviewable PRs
- Handles design changes well (new branches for new features)
- Easy to rollback
- Clear milestones

**Branch naming convention**:
- `feature/phase2-[step-name]` - For planned steps
- `feature/[description]` - For Michelle's new features
- `fix/[bug-description]` - For bugs

### Phase 8: Final Plan Approval and Execution Start

**Final plan included**:
- 40-50 work hours (~2 weeks at 4-5 hrs/day)
- Step 1: Foundation (8 commits with detailed breakdown)
- Step 2: Atomic Components (4 commits with detailed breakdown)
- Steps 3-7: High-level overview (detailed after prior steps)
- CHANGE Protocol for requirement changes
- 90/10 mobile-first priority
- Testing approach (integrated + final validation)

**Step 1 detailed breakdown example** (Commit 2: Color tokens):
- Time estimate: ~1 hour
- Extract all colors from Figma
- Configure in tailwind.config.js
- Status colors, backgrounds, text, borders

**Agent completed Step 1** with 8 commits:
1. Tailwind CSS setup
2. Color tokens
3. Spacing scale
4. Typography
5. Visual effects
6. Mock data structure
7. Component demo page
8. Archive v0 pages

**Testing discussion triggered**: Max noticed agent didn't prompt for testing before marking Step 1 complete.

**Max's insight**: "I'm a bit surprised it didn't ask me to test it... Especially this demo that it created seems already testable, isn't it?"

**Analysis**: Agent completed mostly configuration work (tokens, config files), but **should have included testing/verification step** before marking complete.

**Testing protocol established** for future:
- After each commit: Quick mobile browser test
- After each step: Thorough mobile device testing
- Before marking complete: Test in /demo page, verify Figma match
- Don't mark step complete until tested together

**Max's feedback to agent**:
> "Before moving to Step 2, I'd like to test what we've built:
> 1. Run dev server and verify demo page works
> 2. Show me design tokens in demo page
> 3. Verify Tailwind is working
> 4. Review mock data structure
>
> For future steps, please include a testing/verification step before marking a step as complete."

## Key Insights & Arguments Developed

### Insight 1: Design Intent > Pixel Perfection

**The argument**: The goal of design-to-code is not pixel-perfect replication, but **translating design intent into functional, maintainable code**.

**Why it matters**:
- Prevents over-engineering responsive behavior
- Focuses effort on what matters (mobile UX)
- Allows for pragmatic trade-offs (desktop "good enough" for MVP)
- Aligns with startup reality (iterate based on real usage)

**How it came up**: When establishing 90/10 mobile-first priority and discussing desktop layouts.

**Example**: For desktop view, simple `max-width: 480px` centered container is sufficient - no need for complex responsive layouts that will be redesigned anyway.

### Insight 2: Change Management as First-Class Concern

**The argument**: In startup environments with evolving designs, you need a **structured change management process** from day one, not as an afterthought.

**Why it matters**:
- Prevents scope creep
- Maintains consistency in how changes are evaluated
- Reduces cognitive overhead ("how do we handle this?")
- Creates clear decision framework
- Documents reasoning for future reference

**How it came up**: Max explaining that Michelle is still designing and requirements will change in coming days.

**The CHANGE Protocol developed**: 5-step process with prioritization matrix and communication format.

**Example**: If Michelle adds new screen mid-development, protocol defines exactly how to communicate it, evaluate impact, decide priority, and integrate it.

### Insight 3: Branch-Per-Step for Incremental Feedback

**The argument**: In design-driven development, **branch-per-step workflow** enables incremental feedback loops with designer while maintaining stable main branch.

**Why it matters**:
- Designer can review and approve each step independently
- Each merge to main is working state you can demo
- Easy to handle mid-development design changes (new branches)
- Small PRs easier to review
- Clear milestones for psychological momentum

**How it came up**: Max asking whether to commit to main or use branches.

**Alternative considered**: Single long-lived feature branch for all Phase 2 work.

**Why rejected**:
- Too large (40+ commits over 2 weeks)
- Can't deploy parts independently
- Hard to review as single PR
- If one thing breaks, blocks everything

**Example workflow**:
1. Complete Step 1 (foundation) → merge to main → Vercel deploys
2. Michelle reviews `/demo` page with design tokens
3. Complete Step 2 (atomic components) → merge to main → Vercel deploys
4. Michelle reviews components in isolation
5. Changes mid-way? Branch off main for new feature

### Insight 4: 90/10 Mobile-First Philosophy

**The argument**: For mobile-first MVP, allocate effort proportionally: **90% perfecting mobile web, 10% ensuring desktop doesn't break**.

**Why it matters**:
- Prevents wasted work (desktop will be redesigned)
- Focuses limited resources where users actually are
- Aligns with "scale up easier than scale down" principle
- Reduces testing burden
- Faster iteration cycles

**How it came up**: Max explaining Michelle's reasoning for mobile-first approach.

**Counter-argument addressed**: "But shouldn't we make it responsive from the start?"

**Response**: Yes, but responsive ≠ equal effort across all breakpoints. Simple centered mobile layout for desktop is sufficient when desktop UX will be intentionally designed later.

**Implementation**:
- Mobile: Pixel-perfect Figma match, thorough testing on real devices
- Desktop: `max-w-md mx-auto` container, basic smoke test

### Insight 5: Mock Data First, Real Data Later

**The argument**: **Decouple UI development from data integration** by building with mock data first, then connecting to Supabase in separate phase.

**Why it matters**:
- Faster iteration on UI (no waiting for API calls)
- Easier to test all states (loading, error, edge cases)
- Components can be built and reviewed independently
- Michelle can see progress without backend dependencies
- Separates concerns (UI correctness vs. data correctness)

**How it came up**: Agent needed to know data integration strategy.

**Example**: Step 5 (Home Screen) has two commits:
1. Build UI with mock data (7 spaces, 19 entries, all statuses)
2. Integrate real Supabase data

**Benefit**: If Supabase integration has issues, UI is already proven working with mock data.

### Insight 6: Testing as Integral, Not Afterthought

**The argument**: Testing should be **built into each step**, not deferred to "Step 9: Testing".

**Why it matters**:
- Catches issues early (fix in Step 1 vs. fix after Step 7)
- Builds confidence incrementally
- Verifies assumptions before building on them
- Prevents rework
- Creates natural checkpoints

**How it came up**: Agent marked Step 1 complete without prompting Max to test.

**Max's realization**: "I'm a bit surprised it didn't ask me to test it... Especially this demo that it created seems already testable."

**Testing approach established**:
- **During development**: Test in `/demo` as components are built
- **After each commit**: Quick mobile browser test
- **After each step**: Thorough mobile device testing
- **Final validation**: Lighthouse + accessibility scan

**For Step 1 specifically**:
1. Run dev server
2. Verify `/demo` page loads
3. Check design tokens displayed
4. Test Tailwind classes work
5. Review mock data structure

### Insight 7: Design Tokens Must Be Extracted When Designer Hasn't Created Them

**The argument**: Michelle noting she "created components but not items yet (color, spacing, etc.)" means **developer must extract design tokens manually** from component designs.

**Why it matters**:
- Can't wait for designer to create formal Figma variables
- Blocking work to ask designer for tokens creates dependency
- Developer can extract from visual inspection + Dev Mode
- Establishes single source of truth for implementation

**How it came up**: Reading Michelle's system notes in Figma.

**What to extract**:
- Colors: backgrounds, text, borders, status colors
- Spacing: padding, margins, gaps (verify 4px base)
- Typography: font families, sizes, weights
- Visual effects: border radius, shadows, backdrop blur

**Where to put it**:
- `tailwind.config.ts` (Tailwind tokens)
- `design-tokens.md` (documentation reference)

### Insight 8: Terminology Change Requires Discipline

**The argument**: When renaming core concepts ("backlog" → "space"), **all new code must use new terminology** even if database hasn't migrated yet.

**Why it matters**:
- Prevents confusion in codebase (mixing terms)
- Aligns code with designer's mental model (Michelle uses "space")
- Easier to search and refactor
- Better for onboarding (one term to learn)

**How it came up**: Max explaining terminology decision made with co-founders.

**The rule**:
- ✅ New UI code: Use "space" (`SpaceCard`, `createSpace`, `pinnedSpaces`)
- ⏸️ Database: Still `backlogs` table (migrate later)
- 📝 Code comments: Note "space (database: backlog)" where relevant

**Example corrections made**:
- ❌ `BacklogCardGrid` → ✅ `SpaceCardGrid`
- ❌ "create backlog" → ✅ "create space"
- ❌ "pinned backlogs" → ✅ "pinned spaces"

## Decisions Made

### Decision 1: Use Tailwind CSS (Not CSS Modules)

**What**: Install and use Tailwind CSS for all styling.

**Why**:
- Michelle's Figma outputs Tailwind classes (design-code alignment)
- Starting fresh (perfect time to set up properly)
- Modern best practice for design systems
- Faster iteration than custom CSS

**Alternatives considered**: CSS Modules + CSS custom properties

**Why rejected**:
- Harder to maintain
- Slower to iterate
- Not aligned with Figma output
- Less modern

**Confidence level**: High

**Next steps**: Completed in Step 1, Commit 1

### Decision 2: Start Frontend from Scratch

**What**: Archive v0 frontend pages to `/archive/v0-demo/`, build new mobile-first pages from scratch.

**Why**:
- v0 was desktop-focused "vibe code" demo
- Inline styles don't match design system approach
- Easier to build right than retrofit wrong
- Backend (Supabase schema, API routes) stays intact

**Alternatives considered**: Update existing pages incrementally

**Why rejected**:
- Would perpetuate inline-style pattern
- Hard to establish clean component architecture
- Risk of mixing old and new approaches

**Confidence level**: High

**Next steps**: Completed in Step 1, Commit 8

### Decision 3: Branch-Per-Step Git Workflow

**What**: Create new feature branch for each step, merge to main when complete.

**Why**:
- Enables incremental feedback from Michelle
- Maintains stable main branch (always deployable)
- Small, reviewable PRs
- Easy to handle mid-development design changes
- Clear milestones

**Alternatives considered**:
- Single long-lived feature branch for all Phase 2
- Commit directly to main

**Why rejected**:
- Single branch: Too large, hard to review, all-or-nothing deploy
- Direct to main: No safety net, breaks standard workflow

**Confidence level**: High

**Next steps**: Created `feature/phase2-foundation` for Step 1

### Decision 4: 90/10 Mobile-First Priority

**What**: 90% effort on mobile web perfection (320-767px), 10% on desktop basic functionality.

**Why**:
- Michelle designed exclusively for mobile
- Most users will use mobile app
- Desktop UX will be redesigned later
- Time spent on desktop now is wasted

**Alternatives considered**: Equal effort across all breakpoints

**Why rejected**:
- Desktop designs don't exist yet
- Will need to redo desktop UX anyway
- Limited resources in startup
- Violates "scale up easier than scale down" principle

**Confidence level**: High

**Implementation**: Simple `max-w-md mx-auto` for desktop

### Decision 5: Mock Data First, Real Data Later

**What**: Build UI with mock data (Step 1-4), integrate Supabase in Step 5.

**Why**:
- Decouples UI development from data layer
- Faster iteration (no API delays)
- Easier to test all states
- Michelle can review UI independently
- Separates concerns

**Alternatives considered**: Integrate real data from start

**Why rejected**:
- Slower development
- Harder to test edge cases
- Creates dependency between UI and backend work

**Confidence level**: High

**Next steps**: Mock data created in Step 1, Commit 6

### Decision 6: CHANGE Protocol for Evolving Requirements

**What**: Structured 5-step process for handling design changes with prioritization matrix.

**Why**:
- Michelle still designing (changes inevitable)
- Prevents ad-hoc decision making
- Creates consistency in evaluation
- Documents reasoning
- Reduces cognitive overhead

**Alternatives considered**: Handle changes ad-hoc as they come

**Why rejected**:
- Inconsistent
- Risk of scope creep
- No clear decision framework
- Hard to track reasoning

**Confidence level**: High

**Next steps**: Use format when Michelle sends first update

### Decision 7: "Space" Terminology in All New Code

**What**: All new UI code uses "space" (not "backlog"), even though database still has `backlogs` table.

**Why**:
- Aligns with designer's mental model
- Matches Michelle's Figma designs
- Easier to search codebase
- Better for onboarding

**Alternatives considered**: Wait for database migration, then change code

**Why rejected**:
- Would mix terminology during migration
- Creates confusion in codebase
- Database migration can happen later

**Confidence level**: High

**Next steps**: Applied consistently in Step 1 mock data and future components

### Decision 8: Simplified Interactions for MVP

**What**: Use modals instead of sliding drawers, basic CSS transitions (no animation libraries).

**Why**:
- Faster to implement
- Good enough for MVP
- Can add polished interactions post-launch
- Reduces scope

**Alternatives considered**: Implement full sliding gestures and animations as designed

**Why rejected**:
- Time-consuming
- Nice-to-have, not core functionality
- Can iterate post-MVP based on real usage

**Confidence level**: Medium (may enhance if time permits)

**Examples**:
- Quick Nudge: Modal with date picker (not sliding drawer)
- Card interactions: Click to open (defer swipe gestures)
- Transitions: Simple CSS (no Framer Motion)

## Mental Models & Frameworks Developed

### Framework 1: The 90/10 Mobile-First Rule

**Concept**: In mobile-first development with uncertain desktop UX, allocate **90% effort to mobile perfection, 10% to desktop "good enough"**.

**Why it works**:
- Focuses resources where users actually are
- Acknowledges desktop will be intentionally designed later
- Prevents premature optimization
- Pragmatic for startup constraints

**When to apply**: Mobile-first MVPs where desktop experience hasn't been designed yet.

**When NOT to apply**: Products with equal mobile/desktop usage, or when desktop UX is already designed.

### Framework 2: CHANGE Protocol (Change Management)

**Concept**: Structured 5-step process for handling evolving requirements in startup environment.

**Steps**:
1. **Communication** - Use standardized format
2. **Evaluation** - Categorize impact (additive, modificative, breaking)
3. **Decision** - Apply prioritization matrix
4. **Update** - Modify plan
5. **Documentation** - Update specs

**Prioritization Matrix**:
- Critical + Affects completed → Pause and discuss
- Critical + New feature → Insert immediately
- High + In-progress → Finish current, then integrate
- High + Not started → Add to backlog
- Medium/Low → Backlog for later

**When to apply**: Projects with evolving requirements, especially designer-developer collaboration.

### Framework 3: Branch-Per-Step for Design Feedback

**Concept**: Create feature branch for each implementation step, merge to main when complete and reviewed.

**Benefits**:
- Incremental feedback loops
- Stable main branch
- Clear milestones
- Easy to adapt to changes

**Pattern**:
```
Complete Step N → Merge to main → Deploy → Designer reviews → Complete Step N+1
```

**When to apply**: Design-driven development where designer feedback is critical.

**When NOT to apply**: Solo development, or when designer only reviews at end.

### Framework 4: Design Intent Translation (Not Pixel Perfection)

**Concept**: The goal of design-to-code is **translating intent**, not pixel-perfect replication.

**Key questions to ask**:
- What problem does this solve for users?
- Why did designer choose this layout?
- What's the core interaction?
- What must be exact vs. what's flexible?

**Trade-offs to consider**:
- Implementation complexity vs. user value
- Desktop perfection vs. mobile focus
- Animation polish vs. core functionality

**When to apply**: All design-to-code work, especially when resources are constrained.

### Framework 5: Mock-Then-Real Data Decoupling

**Concept**: Build UI with realistic mock data first, integrate real data layer separately.

**Benefits**:
- Faster UI iteration
- Easier state testing
- Independent UI/backend work
- Clear separation of concerns

**Pattern**:
1. Create mock data structure (realistic samples)
2. Build UI consuming mock data
3. Test all states (loading, error, empty)
4. Replace mock data service with real API

**When to apply**: Component-driven development, especially when UI and backend can progress in parallel.

## Counter-Arguments & How We Addressed Them

### Objection 1: "Shouldn't we make it properly responsive from the start?"

**Response**: Yes, but responsive ≠ equal effort across all breakpoints. Key insights:
- Michelle designed only mobile (desktop UX not designed yet)
- Desktop will be intentionally redesigned later
- 90/10 rule: Mobile perfection, desktop basic functionality
- Simple centered mobile layout for desktop is sufficient
- "Scale up easier than scale down" principle

**Resolution**: 90/10 mobile-first priority with basic desktop support.

### Objection 2: "Why not just update existing pages instead of starting fresh?"

**Response**: Retrofitting has hidden costs:
- v0 uses inline styles (hard to establish design system)
- Desktop-focused layout (wrong starting point)
- Risk of mixing old and new patterns
- Harder to achieve clean component architecture
- "Vibe code" quality not suitable for building on

**Resolution**: Archive v0, build new mobile-first pages from scratch.

### Objection 3: "Won't branch-per-step create merge conflicts?"

**Response**: Actually reduces conflict risk:
- Each branch only touches specific components/pages
- Merging to main regularly keeps branches fresh
- Small PRs easier to merge
- If conflict occurs, limited scope to resolve
- Alternative (single long-lived branch) has worse conflict risk

**Resolution**: Branch-per-step with frequent merges to main.

### Objection 4: "Isn't mock data extra work that we'll just throw away?"

**Response**: Mock data pays for itself:
- Faster UI development (no API delays)
- Easier to test all states (loading, error, edge cases)
- Designer can review UI independently
- Components proven working before adding data complexity
- Minimal throwaway (just the data service, not components)
- Realistic mock data helps identify data structure issues early

**Resolution**: Mock data first (Step 1), integrate Supabase later (Step 5).

### Objection 5: "Why create formal change management process before we even need it?"

**Response**: Because changes are inevitable and imminent:
- Michelle explicitly said she's still designing
- Requirements will change "in coming days"
- Better to establish process early than scramble later
- Low overhead: Just a format and decision matrix
- Prevents ad-hoc decisions and scope creep
- Documents reasoning for future reference

**Resolution**: CHANGE Protocol established from day one.

### Objection 6: "Why not test everything at the end in one big QA phase?"

**Response**: Testing at end has high risk:
- Issues discovered late are expensive to fix
- Root cause harder to identify (changed too much since last working state)
- Psychological impact (thought we were done, now massive bug list)
- Risk of cascading issues (bad foundation affects everything built on it)

**Better approach**: Test after each step
- Catch issues early when context is fresh
- Verify assumptions before building on them
- Build confidence incrementally
- Natural checkpoints for progress

**Resolution**: Testing integrated into each step, not deferred to end.

## Points of Confusion & How They Resolved

### Confusion 1: "Should the agent test Step 1 before continuing?"

**Initial state**: Agent completed Step 1 (foundation setup) and offered to continue to Step 2 without testing.

**Max's reaction**: "I'm a bit surprised it didn't ask me to test it... Especially this demo that it created seems already testable, isn't it?"

**Resolution**:
- Step 1 is mostly configuration (Tailwind, tokens, mock data)
- But `/demo` page and design tokens ARE testable
- Testing should be integral to each step, not optional
- Even configuration work needs verification (does Tailwind work? Are colors correct?)

**Clarity gained**: Established protocol that agent should **always** include testing/verification step before marking any step complete, even for "just configuration" work.

**Why it matters**: Foundation issues (wrong colors, incorrect spacing scale) affect everything built on top. Better to catch now than after building 20 components.

### Confusion 2: "How detailed should commit breakdown be?"

**Initial state**: First plan had phase-level breakdown (Step 1: Foundation) but no commit-level detail.

**Max's feedback**: "I need this level of detail for each step so I understand what 'done' looks like for each commit."

**Resolution**:
- Step 1 and Step 2 should have detailed commit-by-commit breakdown upfront
- Each commit should specify:
  - Time estimate
  - What's being built (component API, Figma specs)
  - Implementation steps
  - Testing checklist
  - Commit message example
- Later steps (3-7) can be detailed after completing prior steps (iterative approach)

**Clarity gained**: Right level of planning detail = next 1-2 steps very detailed, later steps high-level (adjust as we learn).

**Why it matters**: Max is learning this workflow - needs clear, actionable tasks to build confidence and understand patterns.

### Confusion 3: "Should we commit to main or use branches?"

**Initial state**: Agent was about to commit directly to main branch.

**Max's question**: "Should I just tell it to do this in a separate branch though? I mean, right now we're in main, it shouldn't commit straight to there, or should it?"

**Resolution**:
- Never commit directly to main
- Use feature branches (one per step)
- Merge to main only after step is complete and tested
- This is standard git workflow

**Clarity gained**: Even in solo development, feature branches provide:
- Safety net for experimentation
- Clear PR review points
- Ability to share specific changes
- Standard professional practice

**Why it matters**: Establishes good habits, enables Michelle to review incrementally, maintains stable main branch.

### Confusion 4: "Everything in one branch or multiple branches?"

**Initial state**: Unclear whether all Phase 2 work should go in one branch or separate branches.

**Max's thinking out loud**: "I guess everything that would already be worthwhile to share with the others and previewed/deployed would be great to merge with main on its own."

**Resolution**:
- Branch-per-step approach (not single long-lived branch)
- Each step is independently valuable and reviewable
- Merge to main after each step completion
- Enables incremental deployment and feedback

**Clarity gained**:
- **Option 1 (single branch)**: Simple but all-or-nothing, hard to review
- **Option 2 (many tiny branches)**: Too much overhead
- **Option 3 (branch-per-step)**: Sweet spot - stable checkpoints, incremental feedback, manageable scope

**Why it matters**: Matches startup need for frequent deployments and designer feedback loops.

## Artifacts Created

### 1. DESIGN_DEVELOPER_GUIDE.md

**Purpose**: Comprehensive 370+ line educational guide for developer-designer collaboration.

**Contents**:
- Design fundamentals (tokens, components, responsive design, visual hierarchy)
- Understanding Figma (structure, concepts, Dev Mode, what to extract)
- Design-to-code translation (step-by-step workflow with examples)
- Design systems and component architecture
- Communication best practices (speaking designer language, giving/receiving feedback)
- First week action plan (day-by-day tasks)
- Common pitfalls and how to avoid them
- Resources (essential reading, tools, communities)
- Quick reference cheat sheets (design-to-code translation, Tailwind)

**Key sections**:
- "Design Tokens: The Shared Language" - Colors, spacing, typography, shadows
- "Component Thinking" - Atomic design hierarchy (atoms → molecules → organisms)
- "The Design-to-Code Translation Process" - 6-step workflow
- "Communication Tips" - How to collaborate effectively with designers
- "Common Pitfalls" - Pixel-perfect obsession, ignoring responsive behavior, hardcoding values

**How to use**: Reference when translating designs, preparing for designer meetings, or learning design concepts.

### 2. AGENT_PROMPT_DESIGN_INTEGRATION.md

**Purpose**: Comprehensive prompt for starting fresh Claude Code session with full context.

**Contents**:
- Max's background and experience level
- Technical setup (Figma MCP, Dev seat, file access)
- Michelle's design progress (what's ready, what's not, open questions)
- Critical context (starting fresh, terminology, standards, commits)
- Role definition (senior co-founder, educational, proactive)
- Key considerations (data integration, testing, task breakdown)
- Immediate next steps

**Evolution**: Went through 3 iterations:
1. Initial draft with "you mentioned" references → Fixed to be self-contained
2. Questions framed as pre-requirements → Integrated as planning considerations
3. Added Michelle's notes, screen list, caveats about evolving designs

**How to use**: Copy into new Claude Code session when starting Phase 2 work or after context limit is reached.

### 3. PLAN_FEEDBACK.md and PLAN_FEEDBACK_2.md

**Purpose**: Structured feedback on agent's implementation plans.

**PLAN_FEEDBACK.md contents**:
- Critical issues (CSS Modules vs Tailwind, retrofitting vs fresh start)
- Missing commit detail
- Unanswered key considerations
- Terminology corrections
- Timeline reality check

**PLAN_FEEDBACK_2.md contents**:
- Strategic priorities (90/10 mobile-first rule)
- Testing focus (90% mobile, 10% desktop smoke tests)
- Change management methodology needed
- Clarifications on magic link view, commit breakdown, testing approach

**How to use**: Examples of how to provide structured, actionable feedback to agents when plans need refinement.

### 4. PHASE2_PLAN.md

**Purpose**: Final approved implementation plan with full detail.

**Contents**:
- Strategic priorities (90/10 rule, mock data first, space terminology)
- Timeline (40-50 hours)
- Step 1: Foundation (8 commits with time estimates)
- Step 2: Atomic Components (4 commits with detailed breakdowns)
  - Avatar: Component API, Figma specs, implementation steps, testing checklist, commit message
  - EntryChip: All status variants with exact colors and dimensions
  - Button: 4 variants with states and accessibility
  - StatusIndicator: Status dots with labels
- Steps 3-7: High-level overview (detailed later)
- CHANGE Protocol documentation
- Branch-per-step workflow
- Testing approach

**How to use**: Living document that tracks progress and serves as reference for what's planned.

### 5. Design Tokens (Step 1 Output)

**Files created**:
- `tailwind.config.ts` - Tailwind configuration with design tokens
- `design-tokens.md` - 370+ line comprehensive reference
- Mock data structure (358 lines) with 7 spaces, 7 contacts, 19 entries

**Tokens extracted**:
- Colors: 5 status variants, text hierarchy, borders, backgrounds
- Spacing: 4px-based system (4, 8, 12, 16, 20, 24, 32, 40, 44)
- Typography: Font families (system + Hiragino + Arial), sizes (12-24px), weights (400-700)
- Visual effects: Border radius (2px-full), shadows (card, subtle), backdrop blur

**How to use**: Reference when building components to ensure consistency with design system.

## How Future AI Should Use This

### DO:

**Reference this session when**:
- Starting Phase 2 implementation or continuing after context limit
- Planning design integration work for other projects
- Establishing designer-developer collaboration workflow
- Setting up change management for evolving requirements
- Deciding on git workflow for design-driven development

**Apply these frameworks**:
- 90/10 Mobile-First Rule when doing mobile-first MVP with uncertain desktop UX
- CHANGE Protocol when requirements are actively evolving
- Branch-Per-Step when designer feedback loops are critical
- Mock-Then-Real when UI and data layers can be decoupled

**Use these artifacts**:
- DESIGN_DEVELOPER_GUIDE.md for education on design-to-code
- AGENT_PROMPT_DESIGN_INTEGRATION.md as template for comprehensive agent prompts
- PHASE2_PLAN.md as example of detailed, commit-level planning
- CHANGE Protocol format when communicating design updates

### DON'T:

**Don't re-debate**:
- Whether to use Tailwind (decided: yes, for Figma alignment)
- Whether to start fresh or retrofit (decided: fresh start)
- Whether to use branches (decided: branch-per-step)
- Mobile-first priority (decided: 90/10 rule)
- Mock data approach (decided: mock first, real later)

**Don't skip**:
- Testing/verification after each step (even "just configuration")
- Commit-level breakdown for next 1-2 steps
- Design intent questions ("why did designer choose this?")
- Branch creation (never commit directly to main)

**Don't assume**:
- Desktop needs equal effort (it doesn't - 10% is enough)
- Designer has created formal tokens (they might not have - extract them)
- Grid/Chat views are in MVP scope (they're uncertain - verify first)
- Requirements are fixed (they're evolving - use CHANGE Protocol)

### REFERENCE:

**For planning Phase 2 continuation**:
- See "Step 2 detailed breakdown" for example of commit-level detail
- See "CHANGE Protocol" for handling Michelle's design updates
- See "Testing approach" for verification process

**For other design integration projects**:
- See "The 90/10 Mobile-First Rule" for effort allocation
- See "Design Intent Translation" framework for avoiding pixel-perfection trap
- See "Branch-Per-Step" for incremental feedback workflow

**For agent prompting**:
- See AGENT_PROMPT_DESIGN_INTEGRATION.md for structure and level of detail
- See how prompt evolved through 3 iterations to be self-contained

**For change management**:
- See CHANGE Protocol 5-step process and prioritization matrix
- See communication format template

## What This Unlocked

### Immediate unlocks:
- ✅ Comprehensive education on design-to-code workflow (DESIGN_DEVELOPER_GUIDE.md)
- ✅ Clear implementation plan with commit-level detail (PHASE2_PLAN.md)
- ✅ Foundation setup complete (Step 1: 8 commits)
- ✅ Design tokens extracted and configured
- ✅ Mock data structure created
- ✅ Component demo page scaffolded

### Process unlocks:
- ✅ Branch-per-step workflow for incremental feedback
- ✅ CHANGE Protocol for handling evolving requirements
- ✅ Testing protocol (verify after each step)
- ✅ 90/10 mobile-first priority clarity

### Knowledge unlocks:
- ✅ Understanding of Figma concepts and navigation
- ✅ Design token extraction process
- ✅ Component architecture (atoms → molecules → organisms)
- ✅ Designer-developer communication patterns

### Next steps enabled:
- Ready to build atomic components (Avatar, EntryChip, Button, StatusIndicator)
- Can handle design updates from Michelle using CHANGE Protocol
- Can deploy each step for Michelle's review
- Can iterate on mobile experience with confidence

## Additional Notes (Freeform)

### Max's Learning Journey

This session represents Max's **first deep dive into professional design-to-code workflow**. Key progressions:

1. **From unclear to educated**: Started knowing nothing about Figma or designer collaboration, ended with 370+ line comprehensive guide
2. **From trusting to verifying**: Caught that agent didn't prompt for testing, insisted on verification protocol
3. **From reactive to strategic**: Proactively established change management before it was needed
4. **From main branch to branches**: Self-caught the git workflow issue ("we're on main, shouldn't we use a branch?")

**Max's questioning style**:
- "I'm a bit surprised it didn't ask me to test it... or am I overthinking?"
- "Should everything go in one branch or multiple?"
- "Should we commit straight to main?"

This skeptical inquiry and desire for explanation mirrors Max's approach from previous sessions (e.g., demanding empirical evidence for MCP token savings).

### Michelle's Design Process

**What we learned about Michelle**:
- Professional UX/UI designer with past developer collaboration experience
- Created comprehensive component library marked "dev-ready"
- Still actively designing (Grid/Chat views uncertain)
- Thoughtful about open questions (explicitly documented "Do we really need grid view?")
- Focused on mobile-first for MVP

**Michelle's notes reveal her thinking**:
- Aware of technical constraints ("I have not created any items yet [color, spacing]")
- Considers recipient experience ("How do we nudge rather than dread?")
- Questions her own designs ("Do we really need a grid view?")
- Thinks about email design ("newsletter or something scannable")

### Startup Context

**Key constraints**:
- Limited resources (can't perfect everything)
- Evolving requirements (designs still in progress)
- Need for speed (MVP timeline)
- Multiple stakeholders (Max, Michelle, Kevin)

**How decisions reflect this**:
- 90/10 mobile-first (focus limited resources)
- Simplified interactions (good enough for MVP)
- Mock data first (faster iteration)
- Branch-per-step (frequent deployment)
- CHANGE Protocol (handle inevitable changes)

### Figma MCP Integration

**Initially unknown**: Whether Figma MCP would work (required Dev seat, authentication).

**Discovery process**:
1. Installed MCP server
2. First access attempt failed (authentication needed)
3. Max joined Michelle's Professional plan team (got Dev seat)
4. Successfully accessed component library and screens
5. Used `get_screenshot` and `get_metadata` to inspect designs

**Value realized**:
- Can extract design specs programmatically
- Can generate code from designs (though not used yet - preferred manual extraction for learning)
- Can inspect Michelle's notes in Figma
- Visual screenshots help verify understanding

### Phase 1 Context

**What was built before this session**:
- v0 desktop demo with inline styles
- Supabase setup (database schema, RLS policies, API routes)
- Auth flow
- Basic CRUD for backlogs and promises
- Magic link system
- Email integration (Postmark)

**What's being replaced**: Frontend UI (starting fresh with mobile-first design system)

**What's staying**: All backend code (Supabase, API routes, auth, magic links)

### Tools and Technologies

**Stack**:
- Next.js 15 (Pages Router)
- TypeScript
- Tailwind CSS (newly added)
- Supabase (existing)
- Postmark (existing)
- Vercel (deployment)

**New tooling added**:
- Figma MCP server (design inspection)
- Tailwind CSS (styling system)
- Design tokens system (custom properties + Tailwind config)

### Patterns Worth Noting

**Iterative refinement**:
- Agent prompt went through 3 versions
- Implementation plan went through 2 major revisions
- Each iteration addressed specific feedback

**Comprehensive before execution**:
- Spent significant time on planning and education before writing code
- Created extensive documentation before building
- Established processes before needing them

**Testing as discipline**:
- Max caught that testing wasn't included
- Insisted on verification protocol
- Recognized foundation issues have cascading impact

### Future Considerations

**Still unknown**:
- Exact timeline for Michelle's remaining designs
- Whether Grid/Chat views will make MVP
- Desktop UX approach (intentionally deferred)
- How many design changes will come
- Whether 40-50 hour estimate is accurate

**To watch for**:
- Michelle's feedback on `/demo` page (Step 1 output)
- Michelle's feedback on atomic components (Step 2 output)
- First design change (will test CHANGE Protocol)
- Any issues with design token extraction (colors off, spacing wrong)
- Whether mock data structure has all needed fields

**Potential risks**:
- Michelle might request major changes mid-implementation
- Grid/Chat view uncertainty might cause scope issues
- Desktop might need more attention than 10%
- 40-50 hours might be optimistic if many iterations needed

### Connection to Second Brain System

This session itself demonstrates the value of the Second Brain system:
- Max initiated `/record-session` to preserve this extensive planning work
- Comprehensive capture of reasoning, not just decisions
- Will enable future AI to understand context when continuing Phase 2
- Documents process patterns that can be applied to other projects

**If Max needs to continue Phase 2 in new session**:
- Can reference this session for full context
- Can use AGENT_PROMPT_DESIGN_INTEGRATION.md for quick start
- Can refer to PHASE2_PLAN.md for current progress
- Won't need to re-explain 90/10 rule, CHANGE Protocol, branch-per-step workflow

### Meta-Observation

The conversation itself models good collaborative planning:
- Max asks questions
- Claude provides comprehensive answers
- Max spots issues or asks for clarification
- Iterative refinement until both are confident
- Document decisions and reasoning

This pattern should apply to Max-Michelle collaboration as well.
