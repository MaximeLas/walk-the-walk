# How to Use Session Retrieval (For Main Claude Code Agents)

**Purpose:** This guide explains how to retrieve past session context when the user asks for it.

---

## When User Asks to Check Past Sessions

**Example requests:**
- "Check past sessions for context on magic links"
- "What did we discuss about the backlog model?"
- "Look at how we decided on the data model"
- "I need context from previous conversations about X"

---

## How to Retrieve Context

**Use the Task tool** to launch a `general-purpose` agent with specialized retrieval instructions.

**Why use Task tool:**
- Gives the retrieval agent a **fresh context window**
- Keeps your (main agent) context clean
- Allows deep reading of multiple sessions without blowing up main context
- More reliable - focused sub-agent vs. multitasking main agent

---

## Complete Example

**User says:** "Help me implement magic links. Check past sessions for context."

**You invoke Task tool:**

```javascript
Task({
  subagent_type: "general-purpose",
  description: "Retrieve session context on magic links",
  prompt: `You are retrieving past session context to help with the current task.

## Current Task
User needs to implement the magic link flow - how tokens are generated, stored, and verified to grant recipients access to spaces/backlogs.

## Topics to Search For
- Magic links
- Token generation and hashing
- Recipient access
- Space/backlog access control
- What recipients see when clicking links
- Security model

## Your Instructions

1. **Read /docs/RETRIEVAL_GUIDE.md first** - This contains complete step-by-step instructions for how to retrieve and compress session context.

2. **Follow RETRIEVAL_GUIDE.md exactly:**
   - Scan /docs/SESSION_LOG.md for relevant sessions
   - Identify 1-3 most relevant sessions
   - Read those sessions (focus on Key Insights, Decisions, Mental Models sections)
   - Compress essential reasoning into summary

3. **Return a compressed summary (300-800 words) with:**
   - Source sessions (which ones you read)
   - Key decisions (what was decided and WHY)
   - Important reasoning (arguments that matter for current task)
   - Mental models to apply (frameworks to use)
   - Unresolved questions (anything TBD)
   - Working examples (concrete illustrations)

## Critical
- Include the WHY behind decisions, not just WHAT was decided
- Everything you include should be relevant to implementing magic links
- Compress - don't copy verbatim from sessions
- Your summary will be used by me (main agent) to help the user

Now read /docs/RETRIEVAL_GUIDE.md and execute the retrieval.`
})
```

---

## Prompt Template

Copy and customize this template:

```
You are retrieving past session context to help with the current task.

## Current Task
[DESCRIBE what user is working on - be specific]

## Topics to Search For
[LIST key topics, concepts, or keywords to look for]

## Your Instructions

1. **Read /docs/RETRIEVAL_GUIDE.md first** - This contains complete step-by-step instructions for how to retrieve and compress session context.

2. **Follow RETRIEVAL_GUIDE.md exactly:**
   - Scan /docs/SESSION_LOG.md for relevant sessions
   - Identify 1-3 most relevant sessions (don't read more)
   - Read those sessions, focusing on:
     * Key Insights & Arguments Developed
     * Decisions Made
     * Mental Models & Frameworks
   - Compress essential reasoning into summary

3. **Return a compressed summary (300-800 words) with:**
   - **Source sessions:** Which ones you read
   - **Key decisions:** What was decided and WHY
   - **Important reasoning:** Arguments that matter for current task
   - **Mental models to apply:** Frameworks to use
   - **Unresolved questions:** Anything TBD
   - **Working examples:** Concrete illustrations

## Critical
- Include the WHY behind decisions, not just WHAT was decided
- Everything you include should be relevant to [CURRENT TASK]
- Compress - don't copy verbatim from sessions
- Your summary will be used by me (main agent) to help the user

Now read /docs/RETRIEVAL_GUIDE.md and execute the retrieval.
```

**Customize:**
- [DESCRIBE what user is working on]
- [LIST key topics...]
- [CURRENT TASK]

---

## After Sub-Agent Returns

The general-purpose agent will return a compressed summary.

**You then:**
1. Read the summary to understand past context
2. Use it to help user with their current task
3. Reference specific points when relevant
4. Build on the reasoning rather than repeat debates

---

## Quick Reference

**User asks for past context**
→ Use Task tool
→ `subagent_type: "general-purpose"`
→ Point to `/docs/RETRIEVAL_GUIDE.md` in prompt
→ Specify topics to search
→ Request 300-800 word compressed summary
→ Use to help user

---

**That's it!** Use the built-in general-purpose agent with the right prompt.
