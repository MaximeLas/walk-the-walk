# Rethinking the Backlog Model: From Person-Centric to Context-Centric

**Date:** October 8, 2025
**Author:** Max
**Context:** Strategic product discussion following Michelle's design review

---

## Executive Summary

This document outlines a fundamental reconceptualization of WalkTheWalk's backlog model, shifting from a **1-to-1 person-centric structure** to a **shared workspace context-centric structure**. This change better supports collaborative accountability across multiple contexts while maintaining the core value proposition of simplicity and zero-friction nudging.

---

## The Core Insight

### Current Model (Limiting)
- **Backlog = 1-to-1 relationship with a person**
- Each backlog tied to a single contact (optional email)
- Cannot support multi-person collaboration in a shared context
- User must mentally organize promises across multiple 1-to-1 relationships

### Proposed Model (Flexible)
- **Backlog = shared workspace around a specific context or project**
- Multiple people can participate in the same backlog
- Same person can be in multiple different backlogs
- Each backlog represents a distinct "sphere of accountability"

---

## Why This Matters: Real-World Use Cases

### Example 1: Startup Collaboration (Unicorn Backlog)
**Scenario:** Working with two co-founders (Kevin and Michelle) on Unicorn startup

**Current model limitation:**
- Must create separate backlogs for Kevin and Michelle
- When nudging Kevin about a promise, he only sees what he owes
- No shared visibility into collective progress
- Promises exist in isolation

**Context-centric model:**
- ONE "Unicorn" backlog containing all three people
- When Kevin receives a nudge, he sees:
  - His own promises (highlighted)
  - Michelle's promises
  - Max's promises
- Shared visibility creates collective accountability
- Everyone understands the full context

### Example 2: Family Property Search
**Scenario:** Coordinating property research with two sisters

**Tasks distribution:**
- Sister 1: Looking for actual flats
- Sister 2: Checking bank interest rates
- Max: Researching neighborhoods

**Current model limitation:**
- Would require two separate 1-to-1 backlogs (one per sister)
- Max mentally tracks "which promises relate to property search" across multiple places
- Sisters have no visibility into what the other sister is doing
- Increased cognitive load for everyone

**Context-centric model:**
- ONE "Property Search" backlog
- Structure in the tool reduces structure needed in everyone's head
- When either sister opens a magic link, they see:
  - Their own promises
  - What the other sister is working on
  - What Max is researching
- Shared awareness enables better coordination
- **Critical insight:** Recipients (who aren't even app users) get contextual visibility

### Example 3: Multiple Contexts with Same Person
**Scenario:** Kevin is involved in multiple projects with Max

Possible backlogs:
1. "Unicorn" (startup work)
2. "Side Project" (separate venture)
3. "Personal" (friendship commitments)

**Benefit:** Clean separation of contexts, each with its own shared visibility and relevant participants.

---

## Key Distinction: Backlogs vs. Tags

During design review, Michelle's Figma frames showed tags (e.g., "Unicorn" tag). This raised an important question: **Why can't tags solve this problem?**

### Backlogs (Structural/Relational)
- **Define WHO is involved** in a shared accountability space
- Provide **mutual visibility** - everyone in the backlog sees the same view
- Are **explicit and shared** - when you nudge someone, they access that specific backlog
- Foundation for collaboration and shared context
- **Semantic role:** Promises *belong to* a backlog (strong containment relationship)

### Tags (Organizational/Filtering)
- **Personal or backlog-scoped categorization/metadata**
- Help organize across backlogs ("show me all 'Health' promises")
- Can be private to owner OR shared within a backlog
- Good for cross-cutting concerns (e.g., "Finance" across multiple contexts)
- **Semantic role:** Promises are *labeled with* tags (weak annotation relationship)

### Why Tags Don't Replace Backlogs

**The Problem with Using Tags Instead:**
1. **No inherent shared visibility** - Tags don't automatically grant access to recipients
2. **Wrong abstraction layer** - Using metadata (tags) to do the job of structure (backlogs)
3. **Fragile** - Forgetting to tag something breaks the mental model
4. **Doesn't solve recipient context** - When a recipient opens a magic link, what do they see? Tags don't define this.

**The Right Relationship:**
- Tags can complement backlogs (e.g., personal tags like "Health" or shared backlog tags like "YC application")
- But backlogs define where promises live and who's involved
- Tags just help organize and filter within that structure

**Bottom line:**
- Backlogs answer: "Who sees what together?"
- Tags answer: "How do I organize and filter promises across backlogs?"

---

## Implications for Product Design

### 1. Nudge Behavior Changes
**Current assumption:** Nudge → magic link → view of specific promise (or minimal view)

**New behavior:** Nudge → magic link → full backlog view with:
- **Focused section:** Recipient's own promises (highlighted/prioritized)
- **Context section:** Full backlog visibility (what everyone else is working on)

**Why this matters:**
- Accountability is contextual - understanding what others are doing helps with prioritization
- Transparency builds trust and reinforces shared workspace mental model
- Reduces information asymmetry - recipients are participants, not just task receivers

### 2. Two Distinct Views Needed

**Person-Centric View** (Michelle's contact screen design):
- Shows all promises involving a specific person **across all backlogs**
- Example: "Where am I at with Kevin?" aggregates:
  - Promises from Unicorn backlog
  - Promises from Side Project backlog
  - Promises from Personal backlog
- **Purpose:** Relationship-level overview
- **Audience:** The authenticated app user

**Backlog-Centric View** (new requirement):
- Shows all promises within a specific context/backlog
- Example: "What's happening in the Unicorn project?"
- Shows promises across all participants
- **Purpose:** Context-level collaboration view
- **Audience:** Both authenticated users AND recipients via magic links

**Critical insight:** These views are no longer synonymous. Both are valuable for different purposes.

### 3. Database Schema Implications

Current schema assumes:
```
backlogs → contact (1-to-1 or 1-to-optional)
```

New schema needs:
```
backlogs → participants (many-to-many)
```

This requires:
- Junction table for backlog_participants
- Each participant may or may not have an email
- Each participant may or may not be an authenticated user
- Promises still belong to a backlog, but can be assigned to specific participants

---

## Addressing Potential Concerns

### Concern 1: "Isn't this just rebuilding Jira/Asana/Trello?"

**Response:** No, because we're solving a fundamentally different problem.

**Jira/Asana/Trello:**
- Built for structured project management
- Everyone must be a user
- Heavy cognitive overhead (workflows, boards, sprints, permissions, etc.)
- Work-centric
- Requires adoption and training

**WalkTheWalk:**
- Built for informal interpersonal accountability
- Recipients don't need accounts (magic links)
- Minimal structure - just promises between people
- Life-centric (works for family, friends, casual collaborations)
- Zero learning curve for recipients

**The Distinction:**
1. **Zero friction for recipients** - No "joining a platform," just click a link
2. **Promise-centric, not task-centric** - About interpersonal commitments, not deliverables in a pipeline
3. **Casual contexts** - Property search with sisters, trip planning with friends, family commitments
4. **Simplicity for users** - Easy way to see "where am I at" without project management complexity
5. **Nudge-based workflow** - Push accountability (email nudges) vs. pull (checking dashboards)

**Key insight:** Multi-person backlogs exist in other tools, but the combination of:
- No-account magic links
- Nudge-based workflow
- Cross-context simplicity (work + personal + family)
- Recipient-first design

...creates a fundamentally different product category.

### Concern 2: "Are we over-engineering for edge cases?"

**Response:** No, because the model supports both simple and complex use cases.

**Simple use case (MVP):**
- User creates 1-to-1 backlogs
- Basic nudging
- Still works perfectly with context-centric model

**Advanced use cases (natural evolution):**
- Multi-person backlogs (property search, startup team)
- Multiple contexts with same person
- Shared visibility for coordination

**Strategic insight:** Building the right structural foundation now means we can support both cases without rebuilding the core model later. The simple case doesn't become harder - it's just a backlog with one participant.

---

## What Makes This Different from "Project Management Tools"

### The Cognitive Load Argument

**Problem with existing tools:** They add structure but require everyone to adopt the system.

**Problem with no tool:** User must maintain structure in their head across multiple 1-to-1 relationships.

**WalkTheWalk's sweet spot:**
- Structure in the tool reduces structure needed in everyone's head
- BUT it's not just about the user's organization (which could theoretically be handled with smart tagging)
- **Critical insight:** It also handles that structure in a useful manner for recipients who aren't even app users

**Example:** When Max's sister opens a magic link about property research:
- She's not just getting a nudge about an isolated promise "to Max"
- She sees what the other sister is working on too
- This shared awareness is genuinely useful for visibility and coordination
- **She gets this without creating an account or learning a tool**

This bilateral benefit (user + recipient) is what makes the context-centric backlog model fundamentally different from both:
1. Heavyweight project management tools (too much overhead)
2. Smart personal organization with tags (doesn't solve recipient visibility)

---

## The Core Value Proposition Remains

Despite this structural shift, the fundamental value proposition stays intact:

**Core value:**
- Simplicity and clarity of seeing "where am I at" with anyone or anything that matters
- Zero-friction accountability through nudges and magic links
- Works across all life contexts (work, family, friends, personal projects)

**What changes:**
- The underlying structure becomes more flexible
- Supports both simple 1-to-1 AND collaborative multi-person contexts
- Recipients get contextual visibility, not just isolated task views

**What stays the same:**
- No account required for recipients
- Simple, lightweight interface
- Nudge-based workflow
- Focus on interpersonal accountability over project management

---

## Implementation Considerations

### Phase 1: MVP Foundation
Even if initial MVP focuses on simple 1-to-1 backlogs and basic nudging, building the context-centric data model from the start means:
- No migration pain later
- Simple case is just a backlog with one participant
- Can introduce multi-person backlogs as a natural feature evolution

### Phase 2: Multi-Person Backlogs
When users are ready for more sophisticated use cases:
- UI for adding multiple participants to a backlog
- Magic link view shows full backlog context (with recipient's promises highlighted)
- Person-centric view aggregates across backlogs

### Phase 3: Tags & Advanced Filtering
Once core backlog model is solid:
- Personal tags for cross-backlog organization
- Backlog-scoped shared tags
- Filtering and search capabilities

---

## Key Architectural Decisions

### 1. Promises Belong to Backlogs
- A promise cannot exist without a backlog (strong containment)
- Promises can be assigned to specific participants within that backlog
- When deleted, cascading behavior follows backlog ownership

### 2. Backlogs Have Participants
- Many-to-many relationship via junction table
- Participants may or may not have email addresses
- Participants may or may not be authenticated users
- Owner (creator) is a special participant with edit/delete permissions

### 3. Magic Links Grant Backlog Access
- Token grants access to entire backlog, not individual promises
- Recipient sees full context with their promises highlighted
- Token can be associated with specific participant (for personalization)

### 4. Person-Centric View is a Filter
- Aggregates promises across all backlogs involving that person
- Complementary to backlog-centric view
- Helps user answer "where am I at with Kevin?"

---

## Success Metrics for This Model

### Early validation (MVP):
- Do users naturally create multiple backlogs for different contexts?
- Do they intuitively understand the context-centric model?
- Does the person-centric view provide sufficient relationship-level overview?

### Advanced validation (post-MVP):
- Do users request multi-person backlog functionality?
- When introduced, do they adopt it for family/friend coordination use cases?
- Do recipients find the full-context magic link view useful vs overwhelming?

### North star:
- Does the model support the full spectrum from simple 1-to-1 nudging to complex multi-person collaborative accountability without feeling bloated?

---

## Conclusion

The shift from person-centric to context-centric backlogs is not just a structural change - it's a fundamental reconceptualization of how WalkTheWalk creates value.

**What we learned:**
1. **Backlogs should represent contexts, not people** - This enables both simple and collaborative use cases
2. **Tags and backlogs serve different purposes** - Backlogs are structural, tags are organizational
3. **Recipients benefit from context too** - Shared visibility without account creation is a unique value prop
4. **We're not building project management software** - We're building interpersonal accountability across life contexts
5. **The right foundation enables evolution** - Building context-centric from the start supports both MVP simplicity and future sophistication

**The opportunity:**
There's a genuine gap between:
- Heavyweight project management tools (Jira, Asana, Trello) - too much overhead for casual contexts
- Unstructured communication (WhatsApp, email) - no visibility or accountability

WalkTheWalk fills this gap with:
- Structure light enough for family and friends
- Visibility useful enough for coordination
- Friction low enough that recipients don't need to be users
- Simplicity clear enough to answer "where am I at with X?"

The context-centric backlog model is the foundation that makes this possible.

---

## Appendix: Discussion History

This document synthesizes key insights from an exploratory conversation on October 8, 2025, which covered:

1. Initial conceptual shift from person-centric to context-centric backlogs
2. Distinction between backlogs and tags (prompted by Michelle's designs)
3. Implications for nudge behavior and magic link views
4. Clarification of person-centric vs backlog-centric views
5. Response to "isn't this just existing tools?" concern
6. Real-world use case validation (property search with sisters)
7. Cognitive load and bilateral benefit arguments
8. Strategic positioning and core value proposition alignment

The conversation helped clarify that this isn't about adding features - it's about getting the foundational mental model right so the product can naturally evolve to support the use cases that matter most to users.
