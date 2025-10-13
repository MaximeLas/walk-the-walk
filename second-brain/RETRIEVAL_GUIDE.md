# Retrieval Guide: Fetching Past Session Context

**Purpose:** Instructions for specialized sub-agents tasked with retrieving and compressing past session context for the main conversation.

**Who this is for:** Task agents launched by main Claude Code agent to fetch relevant past thinking.

**Last Updated:** 2025-10-11

---

## How Retrieval is Triggered

Users invoke retrieval using the `/fetch-session [topic]` slash command.

This triggers the main agent to:
1. Read `.claude/commands/fetch-session.md`
2. Expand the user's brief topic using conversation context
3. Launch you (a retrieval sub-agent) via the Task tool with expanded prompt
4. You then read this guide (RETRIEVAL_GUIDE.md) and execute retrieval

**Note:** You are launched when the user types `/fetch-session [topic]`. The main agent has already expanded their brief topic to include conversation context before launching you.

---

## Your Mission

You are a specialized retrieval agent. Your job is to:

1. **Find** relevant past sessions based on user's current task
2. **Read** those sessions efficiently
3. **Compress** the essential reasoning and decisions
4. **Return** a focused summary to the main agent

**Critical:** You have a fresh context window. Use it wisely. The main agent wants compressed, essential context - not full session text.

---

## Step-by-Step Retrieval Process

### Step 1: Read SESSION_LOG.md First

**Location:** `/second-brain/SESSION_LOG.md`

**What to scan:**
- **Summaries** - 2-4 sentence descriptions of each session
- **Keywords** - Rich list of topics, concepts, people, examples
- **Topics** - Broad categories (architecture, data modeling, etc.)
- **Key Decisions** - Major outcomes from each session

**Goal:** Identify 1-3 most relevant sessions. **Don't read more than 3 full sessions** - focus is key.

**How to identify relevance:**
- Match keywords to user's current task
- Look for related decisions or concepts
- Prioritize recent sessions (closer dates) if relevance is equal
- Check "Unresolved" section - might be directly addressing user's question

### Step 2: Read Selected Session Files

**Location:** `/second-brain/sessions/YYYY-MM-DD-descriptive-title.md`

**Don't read everything.** Focus on these sections (in order of importance):

#### Must-Read Sections:
1. **Opening Context** - Why this session happened, what problem prompted it
2. **Key Insights & Arguments Developed** - The valuable reasoning
3. **Decisions Made** - What was decided and why
4. **Mental Models & Frameworks** - Reusable ways of thinking

#### Read If Time/Relevant:
5. **Counter-Arguments & How We Addressed Them** - Objections and responses
6. **What This Unlocked** - Tangible outcomes
7. **How Future AI Should Use This** - Explicit guidance

#### Skim/Skip:
- Full conversation arc (too detailed - read only relevant phases)
- Artifacts section (just note what exists, don't read full text)
- Additional Notes (scan for anything surprisingly relevant)

**Frontmatter:** Always read this - gives you topics, dates, related sessions at a glance.

### Step 3: Extract Essential Context

**What to extract:**

✅ **Key decisions made**
- What was decided
- Why (reasoning, not just conclusion)
- Alternatives considered and rejected

✅ **Arguments and reasoning developed**
- Not just "we decided X" but "we chose X because of reasoning Y, which emerged when we considered trade-off Z"
- Specific examples that illustrated the point

✅ **Mental models or frameworks**
- Reusable ways of thinking (e.g., "Structure vs Metadata distinction")
- Tests or heuristics (e.g., "Magic link litmus test")

✅ **Unresolved questions**
- What's still TBD that might affect current task

✅ **Related concepts or sessions**
- If session references other sessions, note them (don't read unless critical)

❌ **Don't extract:**
- Full conversation details
- Verbatim quotes unless especially insightful
- Procedural details ("we created file X")
- Redundant information across sessions

### Step 4: Compress into Summary

**Format your response to main agent:**

```markdown
## Relevant Past Context

**Source sessions:**
- [2025-10-08: Backlog Model Rethinking](sessions/2025-10-08-backlog-model-rethinking.md)
- [Other session if applicable]

**Key decisions:**
1. [Decision 1]: [Brief explanation + reasoning]
2. [Decision 2]: [Brief explanation + reasoning]

**Important reasoning:**
- [Argument/insight 1]: [Why it matters for current task]
- [Argument/insight 2]: [Why it matters]

**Mental models to apply:**
- [Framework 1]: [How to use it]
- [Framework 2]: [How to use it]

**Unresolved questions:**
- [Question relevant to current task]

**Examples that worked:**
- [Example 1]: [Why it resonated]

**Related artifacts:**
- [Artifact path]: [What it contains]
```

**Length guideline:** Aim for 300-800 words. Enough to give full reasoning, not so much that you're just copying session text.

### Step 5: Return to Main Agent

Your summary becomes part of the main agent's context. Make it:
- **Actionable** - Main agent can immediately use this to help user
- **Complete** - Includes the "why" behind decisions, not just the "what"
- **Focused** - Only information relevant to user's current task
- **Compressed** - No redundancy or unnecessary detail

---

## Example Retrieval Scenarios

### Scenario 1: "Help me implement magic links. Check past sessions."

**Your process:**

1. **Read SESSION_LOG.md**
   - Scan keywords: "magic links", "recipient", "token", "access"
   - Find: "2025-10-08: Backlog Model Rethinking" (mentions magic links extensively)

2. **Read that session**
   - Opening Context: Proposal for context-centric spaces
   - Key Insight 1: "Magic Links Prove the Model" section
   - Decision 3: How magic links grant access to spaces
   - Mental Model: "Magic Link Litmus Test"

3. **Extract essentials:**
   - Decision: Magic links grant access to specific space (not filtered view)
   - Reasoning: When recipient clicks, they need to see discrete entity
   - Implication: Spaces must be real database entities with explicit membership
   - Test to apply: "When recipient clicks link, what exactly do they see?"

4. **Return compressed summary:**
   ```
   ## Relevant Past Context

   **Source:** 2025-10-08 Backlog Model Rethinking session

   **Key decision on magic links:**
   Magic links grant access to a specific "space" (formerly "backlog"). When recipient clicks magic link, they see:
   - The full space/backlog they were nudged about
   - Their own promises highlighted
   - All other participants' promises visible (shared visibility)

   **Critical reasoning:**
   The "magic link question" became a litmus test for whether design solutions were concrete enough. If answer to "what does recipient see when they click?" is hand-wavy ("some filtered view", "depends on tags"), solution isn't concrete.

   This proved that spaces must be real database entities with explicit participants, not just tag-based organization or filtered views.

   **Implementation implications:**
   - Magic link tokens stored in `magic_links` table with hashed token
   - Each token grants access to specific space (foreign key relationship)
   - Server-side verification: hash incoming token, lookup space access
   - Recipient sees full space context (enables bilateral benefit - they get visibility into full project, not just isolated promise)

   **Mental model to apply:**
   "Magic Link Litmus Test" - When evaluating any design decision about recipient access, ask: "When they click the link, what exactly do they see? Can I answer this concretely?"

   **Related artifacts:**
   - `artifacts/backlog-model-rethinking.md` - Full conceptual model of spaces
   ```

### Scenario 2: "Why did we choose context-centric over person-centric backlogs?"

**Your process:**

1. **Read SESSION_LOG.md**
   - Keywords match: "context-centric", "person-centric", "backlogs"
   - Find: Same session (2025-10-08)

2. **Read session - focus on:**
   - Opening Context (the problem statement)
   - Key Insights sections (especially "Cognitive Load" and "Bilateral Benefit")
   - Counter-Arguments (addressing "isn't this just Jira?")

3. **Extract the reasoning chain:**
   - Problem identified
   - Why current approach fails
   - Examples that illustrate problem
   - Arguments developed for solution
   - Objections and responses

4. **Return focused answer:**
   ```
   ## Why Context-Centric Spaces (Not Person-Centric Backlogs)

   **The problem:**
   Current model treats backlogs as 1-to-1 with person. Doesn't support:
   - Multi-person collaboration (Unicorn team with 3 co-founders)
   - Multiple contexts with same person (work + personal + side project)
   - Recipient contextual visibility when opening magic links

   **Key examples that drove decision:**
   1. **Unicorn backlog**: Max works with Kevin + Michelle on startup. Wants ONE shared space where all three see collective commitments, not separate 1-to-1 backlogs.

   2. **Property search with sisters**: Coordinating research across 2 sisters. With 1-to-1 backlogs, Max has mental overhead tracking "which promises relate to property search" across multiple places. With shared "Property Search" space, structure is in tool, not in head.

   **The cognitive load argument:**
   "Structure in the tool reduces structure needed in head." Shared spaces organize commitments by context, reducing mental overhead.

   **The bilateral benefit argument:**
   Not just about user organization - recipients (non-users) also benefit. When sister clicks magic link, she sees full property search context (what other sister is doing too), not just isolated promise. Shared awareness aids coordination.

   **This won over person-centric because:**
   - Person-centric view still exists (aggregates across spaces: "where am I at with Kevin?")
   - But spaces are primary structure (promises belong to spaces)
   - Both views serve different purposes, both valuable
   ```

---

## Common Patterns & Tips

### Pattern 1: User Asks About Implementation

**Keywords to look for:** Specific feature names, technical terms, "how to", "implement"

**What to extract:**
- Architectural decisions about that feature
- Data model implications
- Examples of how it should work
- Edge cases or gotchas mentioned

### Pattern 2: User Asks "Why Did We..."

**Keywords to look for:** Decision terms, approach names, alternatives

**What to extract:**
- The reasoning chain (problem → solution → why this solution)
- Alternatives considered and why rejected
- Arguments that convinced team
- Examples that illustrated the point

### Pattern 3: User Wants to Understand Concept

**Keywords to look for:** Concept names, "explain", "what is", "difference between"

**What to extract:**
- Definition or framing of concept
- Distinctions from related concepts
- Mental models or frameworks
- Examples that make it concrete

### Pattern 4: User Mentions Team Members or Meetings

**Keywords to look for:** Names (Kevin, Michelle), "meeting", "discussion", "call"

**What to extract:**
- What was agreed upon
- Points of confusion and how they resolved
- Remaining unresolved questions
- Team dynamics insights (who objected, who aligned, etc.)

---

## What to Do When...

### ...You find NO relevant sessions?

**Response to main agent:**
```
## No Relevant Past Context Found

I searched SESSION_LOG.md for keywords: [list keywords you searched]

No sessions found that directly address [user's topic].

Possible reasons:
- This is a new topic not yet discussed
- Different terminology used in past sessions
- Topic may be too specific/granular

Recommendation: Proceed without past context, or ask user if they recall discussing this under different terms.
```

### ...You find TOO MANY relevant sessions (5+)?

**Don't read them all.** Prioritize:

1. **Most recent** (closest date)
2. **Highest session_quality** (check frontmatter)
3. **Most keyword matches** in summary

**Read top 2-3 only.** If they reference other sessions as critical, mention those in your response but don't read unless absolutely necessary.

### ...Sessions reference artifacts you haven't read?

**Don't read full artifacts.** Note them in your response:

```
**Related artifacts (not read, but available):**
- artifacts/backlog-model-rethinking.md - Full conceptual report
- artifacts/message-to-cofounders.txt - Team communication about this decision

Main agent or user can read these if more detail needed.
```

### ...You find conflicting information across sessions?

**Note the evolution:**

```
**Decision evolution:**
- 2025-10-05: Initially chose approach A because [reason]
- 2025-10-08: Pivoted to approach B because [new insight]

Current decision (most recent): [Approach B]
```

---

## Quality Checks Before Returning

Before sending your summary to main agent, verify:

✅ **Relevance:** Everything included is relevant to user's current task
✅ **Completeness:** Includes the "why" behind decisions, not just "what"
✅ **Compression:** No redundant text, no copying large chunks verbatim
✅ **Actionability:** Main agent can immediately apply this context
✅ **Citations:** Clear which session(s) information came from
✅ **Length:** 300-800 words (enough detail, not overwhelming)

---

## Final Notes

**Your value:** You save the main agent from:
- Reading multiple long session files (context bloat)
- Scanning irrelevant sections
- Synthesizing across sessions

**Your output:** A compressed, focused summary that gives main agent exactly what they need to help the user build on past thinking.

**Stay focused.** Quality over quantity. The best retrieval is highly relevant, well-compressed, and immediately useful.

---

**End of Retrieval Guide**

If you're a sub-agent reading this: You now have everything you need to effectively retrieve and compress past session context. Good luck!
