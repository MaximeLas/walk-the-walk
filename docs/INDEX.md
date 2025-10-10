# Documentation Index

**Last Updated:** 2025-10-08

Welcome to the WalkTheWalk knowledge base. This is your entry point for understanding past conversations, decisions, and thinking processes.

---

## Quick Start

### For New AI Agents

**If you're CREATING a session summary:**
→ Read [PROTOCOL.md](PROTOCOL.md) for complete instructions

**If you're FETCHING past context (sub-agent):**
→ Read [RETRIEVAL_GUIDE.md](RETRIEVAL_GUIDE.md) for retrieval instructions

**If you're the main agent helping user:**
→ When user asks to check past sessions, use Task tool with `general-purpose` agent (see `.claude/HOW-TO-USE-SESSION-RETRIEVAL.md` for template)

### For Humans

- **[SESSION_LOG.md](SESSION_LOG.md)** - Quick summaries of all recorded sessions
- **[PROTOCOL.md](PROTOCOL.md)** - How this knowledge system works and why
- **[sessions/](sessions/)** - Full session summaries with detailed reasoning
- **[artifacts/](artifacts/)** - Things produced (reports, messages, transcripts)

---

## System Overview

This knowledge base preserves **thought processes and reasoning** from productive AI-assisted work sessions, not just outcomes.

**Purpose:** Enable future you (and future AI agents) to build on past thinking rather than repeat it.

**Core principle:** Capture reasoning, not just conclusions.

---

## Recent Sessions

### [2025-10-08: Backlog Model Rethinking & Team Alignment](sessions/2025-10-08-backlog-model-rethinking.md)

**Topics:** Product architecture, data modeling, team communication, terminology

**Key insights:** Context-centric "spaces" model, backlogs vs tags distinction, cognitive load argument, bilateral benefit for recipients, magic link litmus test

**Decisions:** Use context-centric spaces (multi-person), rename "backlog" to "space", person-centric view aggregates across spaces

**Status:** Active - awaiting Michelle's UI designs and MVP scope decision

---

## Key Artifacts

### Reports & Analysis

- **[backlog-model-rethinking.md](artifacts/backlog-model-rethinking.md)** - Comprehensive conceptual report on context-centric spaces model (shareable with team)

### Team Communication

- **[message-to-cofounders.txt](artifacts/message-to-cofounders.txt)** - WhatsApp message explaining backlog model proposal to Kevin and Michelle

### Meeting Records

- **[Discussing-Backlog.txt](artifacts/Discussing-Backlog.txt)** - Transcript of team alignment call on backlog model

---

## How to Use This System

This system has **two operations**: CREATE (record sessions) and FETCH (retrieve past context).

### Operation 1: CREATE - Recording a Session

**When:** After a productive conversation with Claude Code

**How:** Use the slash command:
```
/record-session
```

**What happens:**
1. Main Claude Code agent (that had the conversation) reads PROTOCOL.md
2. Analyzes the conversation to extract valuable reasoning
3. Creates session summary in `/docs/sessions/`
4. Updates SESSION_LOG.md with entry
5. Confirms with you that summary is accurate

**See:** [PROTOCOL.md](PROTOCOL.md) for complete instructions

### Operation 2: FETCH - Retrieving Past Context

**When:** Starting work on something that relates to past sessions

**How:** Tell Claude Code to check past sessions:
```
"I need help with X. Check past sessions for context."
```

**What happens:**
1. Main agent launches specialized retrieval sub-agent
2. Sub-agent reads RETRIEVAL_GUIDE.md for instructions
3. Scans SESSION_LOG.md for relevant sessions
4. Reads 1-3 most relevant session files
5. Compresses essential reasoning and returns to main agent
6. Main agent uses compressed context to help you

**See:** [RETRIEVAL_GUIDE.md](RETRIEVAL_GUIDE.md) for how retrieval works

### Why Two Operations?

**CREATE** must be done by the agent that had the conversation (needs full context to compress).

**FETCH** is delegated to a sub-agent (fresh context window, more reliable, keeps main conversation clean).

---

## Current State of Project

**Last major decision:** Shift to context-centric "spaces" model (2025-10-08)

**Active work:**
- Michelle designing UI for space-centric view
- Team deciding MVP scope (multi-person in v1 or Phase 2?)
- Finalizing "space" terminology with full team

**Next steps:**
- Review Michelle's designs
- Decide MVP scope based on design complexity
- Implement data model for spaces with multiple participants

---

## About This System

This knowledge base was designed on 2025-10-08 during the backlog model rethinking session. It's a "second brain" for AI-assisted work - preserving valuable reasoning so it doesn't get lost between sessions.

See [PROTOCOL.md](PROTOCOL.md) for complete documentation of how this system works, why it exists, and how to use it effectively.

**Version:** 1.0

---

**Navigation:**
- [← Back to project root](../)
- [Protocol Documentation](PROTOCOL.md)
- [Session Log](SESSION_LOG.md)
- [All Sessions](sessions/)
- [All Artifacts](artifacts/)
