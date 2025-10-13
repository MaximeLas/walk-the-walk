# Second Brain Protocol: Creating Session Summaries

**Version:** 1.0 (refined 2025-10-11)
**Created:** 2025-10-08
**Updated:** 2025-10-11
**Purpose:** Instructions for creating session summaries that preserve thought processes, reasoning, and insights from productive AI conversations

**Note:** This document covers the **RECORD** operation (recording new sessions). For the **FETCH** operation (retrieving past context), see [RETRIEVAL_GUIDE.md](RETRIEVAL_GUIDE.md).

---

## Philosophy & Purpose

### The Problem This Solves

When working with AI assistants across multiple sessions, context is lost. Each new conversation starts from zero. You end up:
- Re-explaining the same reasoning
- Re-debating already-settled questions
- Losing valuable insights from past conversations
- Wasting time and cognitive energy on repetition

This isn't just about remembering **decisions** - it's about preserving **how you thought about things**:
- The arguments that resonated
- Why certain approaches didn't work
- Points of confusion that led to clarity
- Trade-offs considered and why you chose one path
- Mental models and frameworks that emerged

### The Analogy

Think of how you'd benefit from remembering insights from:
- A productive therapy session (why you felt grateful, what reframing helped)
- A deep conversation with a mentor (their reasoning, not just their advice)
- Your own journal entries (thought processes, not just events)

This system does the same for AI-assisted work. It creates **conversational memory** so future you (and future AI agents) can build on past thinking rather than repeat it.

### What This Is NOT

This is not:
- A formal decision log (though decisions may be captured)
- A project management system (though progress may be tracked)
- A comprehensive archive of every conversation (only productive ones worth remembering)
- Verbatim transcripts (compressed, structured summaries instead)

---

## Core Principles

### 1. Capture Reasoning, Not Just Conclusions

**Bad:** "We decided to use context-centric backlogs."

**Good:** "We explored whether tags could solve multi-person collaboration. Key insight: tags are metadata (organizational), backlogs are structural (define who sees what when nudged). Example: magic link question - when recipient opens link, what backlog do they see? Can't be 'just apply filters' - needs to be real entity. This reasoning led to context-centric model."

### 2. Sessions Are Immutable Snapshots

Once a session summary is created, it's frozen in time. It captures "what we thought on this date."

If thinking changes later, create a NEW session that references the old one. Don't edit history.

**Why:** Preserves evolution of thought. Future AI can see "we tried X, then pivoted to Y, here's why."

### 3. Comprehensive But Structured

Include everything potentially useful, but organize it so future readers can scan quickly:
- Frontmatter metadata (date, topics, keywords)
- Clear section headers
- "How Future AI Should Use This" guidance
- Freeform "Additional Notes" for anything that doesn't fit structure

### 4. AI-Parseable and Human-Readable

Use YAML frontmatter for metadata (easy for AI to parse).
Use clear prose for content (easy for humans to read).
Include explicit keywords and summaries (easy to search).

### 5. Quality Over Quantity

Not every conversation needs recording. Record when:
- Novel insights emerged
- Productive debate resolved something
- Key architectural thinking happened
- Valuable reasoning was developed
- Mental models crystallized

Don't record trivial sessions or repetitive explanations.

---

## The Session Summary Format

### File Naming Convention

**Format:** `YYYY-MM-DD-descriptive-title.md`

**Examples:**
- `2025-10-08-backlog-model-rethinking.md`
- `2025-10-15-magic-link-security-design.md`
- `2025-10-22-mvp-scope-prioritization.md`

**Multiple sessions same day:** Use Roman numerals between date and title:
- First session: `YYYY-MM-DD-descriptive-title.md` (no numeral)
- Second session: `YYYY-MM-DD-II-descriptive-title.md`
- Third session: `YYYY-MM-DD-III-descriptive-title.md`
- Fourth session: `YYYY-MM-DD-IV-descriptive-title.md`

**Rationale**: Roman numerals clearly indicate chronological order without cluttering filename. The first session has no numeral for brevity when it's the only session that day. This helps future agents understand which session was recorded first and prevents confusion when referencing multiple sessions from the same date.

### Frontmatter Schema

```yaml
---
type: session
date: YYYY-MM-DD
participants: [Max, Claude] # or [Max, Claude, Kevin, Michelle] for meetings
topics: [topic1, topic2, topic3] # broad categories
context: "Brief description of what prompted this conversation"
decisions_made:
  - Decision 1
  - Decision 2
unresolved_questions:
  - Question 1
  - Question 2
key_artifacts:
  - artifacts/filename1.md
  - artifacts/filename2.txt
related_sessions: [] # paths to related session files
duration: ~X hours # approximate
session_quality: high | medium | low # how valuable was this?
---
```

### Full Template

```markdown
# Session: [Descriptive Title]

## Opening Context
[What prompted this conversation? What was the initial thought/problem/question?]

## The Conversation Arc

### Phase 1: [Descriptive Name]
[What happened in this phase of the conversation]

**Key exchanges:**
- [Important back-and-forth or question that emerged]
- [Insight that developed]

**Arguments developed:**
- [Specific reasoning or framework that emerged]

### Phase 2: [Descriptive Name]
[Continue for each major phase of conversation]

## Key Insights & Arguments Developed

### [Insight Name 1]
**The argument:** [Full explanation of the reasoning]

**Why it matters:** [Implications and importance]

**How it came up:** [Context - what question or problem led to this insight]

**Example:** [Concrete example that illustrates this]

### [Insight Name 2]
...

## Decisions Made

### [Decision 1]
**What:** [Clear statement of the decision]

**Why:** [Reasoning behind it]

**Alternatives considered:** [What we ruled out and why]

**Confidence level:** High | Medium | Low

**Next steps:** [If any]

## Unresolved Questions

- **[Question 1]** - Why it's unresolved, what's needed to resolve it, what we know so far
- **[Question 2]**

## Mental Models & Frameworks Developed

[Any new ways of thinking, analogies, or conceptual frameworks that emerged]

**Example:** "Backlogs vs Tags = Structure vs Metadata. Backlogs define containment and visibility (who sees what together). Tags enable filtering and organization (how do I find related things)."

## Counter-Arguments & How We Addressed Them

[Important objections or concerns raised, and how they were resolved or addressed]

**Example:**
- **Objection:** "Isn't this just Jira/Asana?"
- **Response:** "No, because: (1) zero-friction for recipients (no account needed), (2) promise-centric not task-centric, (3) works for casual contexts (family, friends) not just formal work, (4) nudge-based workflow (push) not dashboard-checking (pull)."

## Points of Confusion & How They Resolved

[Confusion that led to valuable clarity - not trivial misunderstandings, but conceptual confusion that yielded insights]

**Example:**
- **Confusion:** "Aren't backlogs and contacts the same thing in current model?"
- **Resolution:** "Yes, effectively - there's a 1-to-1 relationship. The insight is that this is limiting. We need backlogs to be independent entities that can have multiple participants."

## Artifacts Created

- **[artifacts/filename.md](../artifacts/filename.md)** - [Brief description of what this artifact is]
- **[artifacts/filename.txt](../artifacts/filename.txt)** - [Description]

## How Future AI Should Use This

**DO:**
- [Specific guidance on what to build on - "Use the cognitive load argument when explaining to users"]
- [What this unlocks - "Reference the bilateral benefit framing for recipient value prop"]

**DON'T:**
- [What not to repeat or re-debate - "Don't re-debate whether backlogs should be contexts - already explored thoroughly"]
- [What's settled - "Person-centric vs context-centric is decided - context-centric won"]

**REFERENCE:**
- [Which sections are most valuable for specific use cases - "See 'Key Insight 2' for magic link reasoning"]

## What This Unlocked

[Tangible progress made - clarity gained, decision made, problem solved, path forward identified]

## Additional Notes (Freeform)

[Anything else useful that doesn't fit above structure]
- Random observations or hunches
- Connections to other topics or past discussions
- Follow-up questions for later
- Gut feelings about direction
- Things to watch out for
```

---

## What to Include vs. Exclude Within a Session

### INCLUDE (Worth Remembering)

✅ **Thought processes and reasoning chains**
- "We considered A, but realized B because of C"
- Step-by-step logic that led to conclusions

✅ **Arguments developed and why they resonated**
- "The cognitive load framing worked because it shows value to both user AND recipient"

✅ **Points of confusion that led to clarity**
- "Initially thought backlogs and contacts were separate, but realized they're currently 1-to-1, which IS the problem"

✅ **Debates and how they resolved**
- "Kevin worried this was rebuilding Jira. We addressed it by focusing on informal contexts and zero-friction recipients."

✅ **Key insights and "aha moments"**
- "Magic links prove backlogs must be real entities - can't be just filtered views"

✅ **Mental models or frameworks that emerged**
- "Structure vs Metadata distinction for Backlogs vs Tags"

✅ **Trade-offs considered**
- "Multi-person backlogs add complexity to data model, but enable collaborative use cases that are core to value prop"

✅ **Why certain approaches were rejected**
- "Tags alone don't work because they don't define recipient visibility when magic link is opened"

✅ **Examples that resonated**
- "Property search with two sisters - wouldn't use Jira, but current 1-to-1 backlogs create mental overhead"

✅ **Team dynamics insights**
- "Michelle understood concept but confused by terminology. Kevin initially skeptical about Jira comparison but aligned after informal contexts explanation."

### EXCLUDE (Not Worth Remembering)

❌ **Typos and corrections**
- "You wrote 'teh' instead of 'the'" - irrelevant

❌ **Repetitive explanations of the same thing**
- If same concept explained 3 times with no new insight, capture it once

❌ **Technical issues**
- "My internet dropped", "file wouldn't save" - unless it led to a process insight

❌ **Purely procedural exchanges**
- "Let me create that file now", "I'm running the command" - unless the procedure itself was insightful

❌ **Trivial confusion that went nowhere**
- "I thought you meant X but you meant Y" (immediate correction with no insight gained)
- Exception: If the confusion revealed a conceptual gap that led to clarity

❌ **Small talk or off-topic tangents**
- Unless they led to relevant insights

❌ **Redundant summaries**
- If you've already captured an insight in one section, don't repeat it verbatim elsewhere

---

## Workflow: Creating Session Summaries

### When to Create One

Create a session summary after a conversation that:
- Produced novel insights or clarity
- Involved productive debate that resolved something
- Developed valuable arguments or reasoning
- Made key architectural or strategic decisions
- Created useful mental models or frameworks
- Would be valuable for future you or future AI to reference

**You decide** when a session is worth recording. The AI doesn't auto-create summaries - you trigger it when you feel something valuable happened.

### How to Trigger Creation

At the end of a productive conversation, use the slash command:

**`/record-session`**

### What the AI Should Do

1. **Read the entire conversation** to understand the arc
2. **Identify phases** - how did the conversation evolve?
3. **Extract key insights** - what novel understanding emerged?
4. **Capture reasoning** - not just conclusions, but HOW you got there
5. **Note decisions** - what was decided and why?
6. **Preserve valuable confusion** - points that led to clarity
7. **Include examples** - concrete illustrations that resonated
8. **Identify mental models** - frameworks or analogies developed
9. **Write "How Future AI Should Use This"** - explicit guidance
10. **Generate keywords** - terms and concepts for discoverability
11. **Create frontmatter** - structured metadata
12. **Write summary** for SESSION_LOG.md
13. **Save to** `/second-brain/sessions/YYYY-MM-DD-descriptive-title.md`
14. **Update** `SESSION_LOG.md` with entry
15. **Update** `INDEX.md` if needed

### Length Guidelines

**Be comprehensive, not exhaustive.**

- A 2-hour productive conversation might yield a 1500-2500 word session summary
- Capture all valuable insights, but compress repetition
- Use clear structure so readers can scan sections
- Include enough detail that future AI can understand reasoning without reading full transcript

**Quality over brevity.** If something is worth remembering, include it. Future you will thank you.

---

## Workflow: Using Past Sessions

### Starting a New Session with Context

When starting a new AI conversation, if it relates to past work:

**You say:**
```
"I need help with X. For context, read:
/second-brain/sessions/2025-10-08-backlog-model-rethinking.md"
```

**Or more broadly:**
```
"I need help with the magic link flow.
Check SESSION_LOG.md for relevant sessions first."
```

### What the AI Should Do

1. **Read SESSION_LOG.md** to scan summaries and keywords
2. **Identify relevant sessions** (1-3 max, not everything)
3. **Read those session files** fully
4. **Understand the reasoning** developed in those sessions
5. **Build on it**, don't repeat it
6. **Reference specific insights** when relevant
   - "As you developed in the Oct 8 session, the cognitive load argument is..."
7. **Ask clarifying questions** if context isn't enough

### Referencing Specific Insights

If you remember a specific argument but not which session:

**You say:**
```
"Reference the bilateral benefit argument we developed
for recipients getting contextual visibility."
```

**AI should:**
- Search SESSION_LOG.md for keywords "bilateral benefit" or "recipient visibility"
- Find relevant session
- Read that specific section
- Apply the reasoning

---

## The SESSION_LOG.md File

This is a **critical component** - it's the index that makes everything discoverable.

### Purpose

- Quick-reference index of all sessions
- Summaries (2-4 sentences) of each session
- Keywords for searchability
- Prevents AI from having to read every session file to find relevant context

### Format

```markdown
# Session Log

Quick-reference index of all recorded sessions with summaries and keywords.

---

## 2025-10-08: Backlog Model Rethinking & Team Alignment

**File:** [sessions/2025-10-08-backlog-model-rethinking.md](sessions/2025-10-08-backlog-model-rethinking.md)

**Summary:** [2-4 sentence description naturally incorporating keywords. Describe what was explored, what insights emerged, what was decided, what examples resonated.]

**Keywords:** [30-50 carefully selected terms for discovery - see Keyword Guidelines below]

**Topics:** [Broad categories]

**Key Decisions:** [If any]

**Unresolved:** [If any]

---

## [Next Session]

...
```

### Keyword Guidelines

**Purpose:** Keywords enable quick discovery - "Did we discuss X?" should be answerable by scanning SESSION_LOG.md keywords.

**Target:** 30-50 terms per session. More is noise, fewer misses important topics.

**Include:**
- ✅ Major concepts and frameworks discussed (e.g., "prompt caching", "evidence quality pyramid")
- ✅ Key technologies and tools (e.g., "MCP", "Task tool", "Claude Code")
- ✅ Important decisions and their subjects (e.g., "lazy toggle approach", "cost optimization")
- ✅ People and team members mentioned (e.g., "Kevin", "Michelle")
- ✅ Memorable examples or analogies (e.g., "property search sisters")
- ✅ Core problems addressed (e.g., "context consumption", "token bloat")
- ✅ Frameworks and models created (e.g., "three-layer architecture", "on-budget vs off-budget")
- ✅ External references with high relevance (e.g., "GitHub Issue #7328")

**Exclude:**
- ❌ Specific numbers unless critical to identity (not "32.4k tokens", "15k savings" - those are summary details)
- ❌ Version numbers unless specifically discussed (not "v2.0.14, v2.0.10" unless version itself was topic)
- ❌ Pricing details (not "$3/1M", "$15/1M" - use "cost analysis", "token pricing")
- ❌ Phase descriptions (not "Phase 1-8 conversation arc")
- ❌ Every tool name (select the 3-5 most relevant, not all 20 mentioned)
- ❌ Implementation details (not "cache read", "cache write", "cache invalidation" - use "prompt caching")
- ❌ Sub-topics already covered by main topic (not "optimization priority", "ROI analysis", "leverage ratios" - use "cost optimization")
- ❌ Redundant variations (not "context windows", "context management", "context consumption", "context budget" - pick 1-2)

**Principle:** Keywords should be **discoverable signposts**, not exhaustive table of contents. The summary already provides comprehensive coverage.

**Test:** Could someone scanning 10 session entries spot this one quickly based on keywords? If keywords take 30+ seconds to read, they've failed their purpose.

### Maintenance

- **Add entry** whenever a new session is recorded
- Entries are in **reverse chronological order** (newest first)
- **Never delete** entries (immutable history)
- **Apply keyword guidelines** consistently - quality over quantity

---

## Example Session Summary

See `/second-brain/sessions/2025-10-08-backlog-model-rethinking.md` for a complete example of a well-formed session summary.

Key characteristics of that example:
- Comprehensive coverage of conversation arc
- Clear phase structure
- Detailed capture of key arguments
- Concrete examples preserved
- Counter-arguments and responses documented
- Explicit guidance for future AI
- Rich keywords in SESSION_LOG entry

---

## For Future AI Agents: Which Document Should You Read?

### If You're Creating a Session Summary

**Trigger:** User uses `/record-session` slash command

**You are:** The main Claude Code agent that just had the conversation

**Read:** This PROTOCOL.md document (you're already here!)

**Your task:**
1. Read this PROTOCOL.md file fully to understand the system
2. Review the template in "The Session Summary Format" section
3. Analyze the conversation to identify:
   - Opening context and what prompted it
   - Phases of conversation and how thinking evolved
   - Key insights and arguments developed
   - Decisions made and reasoning behind them
   - Examples that resonated
   - Confusion points that led to clarity
   - Mental models or frameworks that emerged
4. Use the inclusion/exclusion guidelines - compress the valuable parts, omit the noise
5. Write comprehensive summary following template
6. Generate rich keywords for SESSION_LOG
7. Create files:
   - `/second-brain/sessions/YYYY-MM-DD-descriptive-title.md` (main summary)
   - Update `/second-brain/SESSION_LOG.md` (add entry at top)
   - Update `/second-brain/INDEX.md` if needed
8. Confirm with user that summary captures the session well

### If You're Fetching Past Context

**Trigger:** User uses `/fetch-session [topic]` slash command

**You are:** A specialized sub-agent launched by main agent (via Task tool)

**Read:** [RETRIEVAL_GUIDE.md](RETRIEVAL_GUIDE.md) - Complete instructions for retrieval operation

**Your task:**
1. Read RETRIEVAL_GUIDE.md for detailed instructions
2. Scan SESSION_LOG.md to find relevant sessions
3. Read 1-3 most relevant session files (focused sections only)
4. Compress essential reasoning and decisions
5. Return focused summary to main agent

**Note:** The FETCH operation should be delegated to a sub-agent (not done by main conversation agent) to keep main context clean and enable fresh, focused retrieval.

---

## Maintenance & Evolution

### Periodic Review

Every 1-2 months, consider:
- Are there patterns across sessions that suggest need for extracted concept docs?
- Are there recurring decisions that should become formal ADRs?
- Is the folder structure still working, or do new categories make sense?

### Extracting Formal Documents

If a concept or decision is referenced across 5+ sessions:
- Consider extracting it to `/second-brain/concepts/` or `/second-brain/decisions/`
- Create a living document that synthesizes the thinking
- Reference it from session summaries

**Don't do this prematurely.** Let patterns emerge organically.

### Adding New Folders

As the system grows, you might add:
- `/second-brain/concepts/` - Living documents for key concepts referenced across sessions
- `/second-brain/decisions/` - Formal Architecture Decision Records for major choices
- `/second-brain/customer-research/` - User interviews, feedback analysis
- `/second-brain/technical-spikes/` - Deep dives on technical problems

Add folders when you feel the pain of not having them. Start simple, evolve as needed.

---

## Why This System Works

### For You (Future Max)

- Quickly refresh your memory on past thinking
- Avoid repeating reasoning you've already done
- Build on insights rather than rediscover them
- See evolution of thought over time
- Reference specific arguments when explaining to others

### For Future AI Agents

- Rapid context loading (SESSION_LOG → relevant sessions only)
- Understand not just decisions but reasoning behind them
- Build on past work rather than start from zero
- Apply developed arguments appropriately
- Avoid re-debating settled questions

### For Team Members

- Understand your thinking process
- See how decisions evolved
- Get context on "why did we choose this?"
- Onboard faster by reading session history

---

## Principles in Practice

### Immutability Preserves Evolution

**Bad:** Edit old session to "fix" a decision that changed.

**Good:** Create new session that says "We revisited X from Oct 8 session. New insight Y emerged, so we're pivoting to Z."

### Comprehensive Beats Concise

**Bad:** "We decided context-centric backlogs. Done."

**Good:** "We explored 5 different models. Person-centric seemed natural but failed magic link test. Tags-as-backlogs too hand-wavy. Context-centric won because: (1) supports multi-person collaboration, (2) recipients get full context, (3) cognitive load reduced. Example: property search with sisters - need one shared space, not separate 1-to-1."

### Structure Enables Scanning

**Bad:** Wall of text capturing everything in one paragraph.

**Good:** Clear sections with headers - future readers scan to find relevant parts without reading everything.

---

## Final Note

This system is a **living tool**. It will evolve as you use it. The protocol itself may be updated as you discover what works and what doesn't.

The goal isn't perfection - it's **preservation of valuable thinking** so you and future AI collaborators can build on it rather than repeat it.

Start using it. Adjust as needed. The value compounds over time.

---

**Version History:**
- v1.0 (2025-10-08): Initial protocol created
- v1.0 refined (2025-10-11): Added keyword guidelines (30-50 terms target), clarified quality standards, improved consistency
