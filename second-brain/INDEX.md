# Second Brain Index

**Last Updated:** 2025-10-11

Welcome to the WalkTheWalk second brain. This is your entry point for understanding past conversations, decisions, and thinking processes.

---

## Quick Start

### For New AI Agents

**If you're RECORDING a session summary:**
→ Read [PROTOCOL.md](PROTOCOL.md) for complete instructions

**If you're FETCHING past context (sub-agent):**
→ Read [RETRIEVAL_GUIDE.md](RETRIEVAL_GUIDE.md) for retrieval instructions

**If you're the main agent helping user:**
→ When user types `/fetch-session [topic]`, expand their input using conversation context, then launch Task sub-agent pointing to RETRIEVAL_GUIDE.md

### For Humans

- **[SESSION_LOG.md](SESSION_LOG.md)** - Quick summaries of all recorded sessions (start here!)
- **[PROTOCOL.md](PROTOCOL.md)** - How this system works and why
- **[RETRIEVAL_GUIDE.md](RETRIEVAL_GUIDE.md)** - How retrieval works
- **[sessions/](sessions/)** - Full session summaries with detailed reasoning
- **[artifacts/](artifacts/)** - Things produced (reports, messages, transcripts)
- **[SYSTEM-COMPLETE.md](SYSTEM-COMPLETE.md)** - Complete system overview

---

## System Overview

This second brain preserves **thought processes and reasoning** from productive AI-assisted work sessions, not just outcomes.

**Purpose:** Enable future you (and future AI agents) to build on past thinking rather than repeat it.

**Core principle:** Capture reasoning, not just conclusions.

**Key insight:** Recording and retrieving are fundamentally different operations requiring different architectures.

---

## Recent Sessions

### [2025-10-11: Claude Code Context Management Deep Dive](sessions/2025-10-11-claude-code-context-management-deep-dive.md)

**Topics:** Claude Code internals, context windows, token economics, optimization

**Key insights:** Three-Layer Context Architecture, prompt caching mechanics, output tokens are 80%+ of cost, Cost Optimization Priority Stack, lazy toggle approach for MCP management

**Frameworks:** Cost Optimization Priority Stack, Context Budget Mental Model, On/Off-Budget Computation, Three-Layer Context Architecture

### [2025-10-10: MCP Research Methodology](sessions/2025-10-10-mcp-research-and-methodology-lessons.md)

**Topics:** Research methodology, evidence assessment, empirical validation

**Key insights:** Evidence Quality Pyramid, Research Validation Hierarchy, Confidence Labeling System, test claims when possible, grade evidence before building conclusions

**Note:** Case study in research failure → correction → methodology improvement

### [2025-10-09: Second Brain System Design](sessions/2025-10-09-second-brain-system-design.md)

**Topics:** Knowledge management, system architecture, documentation design

**Key insights:** Two operations architecture (RECORD vs FETCH), SESSION_LOG as discovery layer, source of truth pattern, slash command delegation, expansion pattern for sub-agents

**Note:** Meta session - designed the system, then used it to record the design

### [2025-10-08: Backlog Model Rethinking & Team Alignment](sessions/2025-10-08-backlog-model-rethinking.md)

**Topics:** Product architecture, data modeling, team communication

**Key insights:** Context-centric "spaces" model, backlogs vs tags distinction, cognitive load argument, bilateral benefit for recipients, magic link litmus test

**Decisions:** Use context-centric spaces (multi-person), rename "backlog" to "space", person-centric view aggregates across spaces

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

This system has **two operations**: RECORD (record sessions) and FETCH (retrieve past context).

### Operation 1: RECORD - Recording a Session

**When:** After a productive conversation with Claude Code

**How:** Use the slash command:
```
/record-session
```

**What happens:**
1. Main Claude Code agent (that had the conversation) reads PROTOCOL.md
2. Analyzes the conversation to extract valuable reasoning
3. Creates session summary in `/second-brain/sessions/`
4. Updates SESSION_LOG.md with entry (including 30-50 carefully selected keywords)
5. Confirms with you that summary is accurate

**See:** [PROTOCOL.md](PROTOCOL.md) for complete instructions

### Operation 2: FETCH - Retrieving Past Context

**When:** Starting work on something that relates to past sessions

**How:** Use the slash command:
```
/fetch-session [topic]
```

**Example:**
```
/fetch-session "magic links and security"
```

**What happens:**
1. Main agent expands your brief input using conversation context
2. Launches Task sub-agent with enriched retrieval instructions
3. Sub-agent reads RETRIEVAL_GUIDE.md for instructions
4. Scans SESSION_LOG.md for relevant sessions (keywords make this efficient)
5. Reads 1-3 most relevant session files (focused sections only)
6. Compresses essential reasoning to 300-800 words
7. Returns compressed summary to main agent
8. Main agent uses context to help you

**Key feature:** Main agent expands your brief topic into detailed search criteria before passing to sub-agent, since sub-agent has zero conversation context.

**See:** [RETRIEVAL_GUIDE.md](RETRIEVAL_GUIDE.md) for how retrieval works

### Why Two Operations?

**RECORD** must be done by the agent that had the conversation (needs full context to compress).

**FETCH** is delegated to a sub-agent (fresh context window, more reliable, keeps main conversation clean).

They have opposite context requirements, so they're architected separately.

---

## Current State of Project

**Last major decisions:**
- Context-centric "spaces" model (2025-10-08)
- Evidence Quality Pyramid for research (2025-10-10)
- Lazy toggle approach for MCP management (2025-10-11)

**Active work:**
- Michelle designing UI for space-centric view
- Team deciding MVP scope (multi-person in v1 or Phase 2?)
- Finalizing "space" terminology with full team

**Frameworks developed:**
- Cost Optimization Priority Stack (context management)
- Evidence Quality Pyramid (research methodology)
- Three-Layer Context Architecture (understanding Claude Code internals)
- Context Budget Mental Model (token optimization)

---

## About This System

This second brain was designed on 2025-10-08 during the backlog model rethinking session. It preserves valuable reasoning so it doesn't get lost between sessions.

**Version:** 1.0 (refined 2025-10-11)

**Recent improvements:**
- Added keyword guidelines (30-50 terms, quality over quantity)
- Clarified `/fetch-session` expansion pattern
- Removed obsolete files
- Renamed from `/docs` to `/second-brain`

See [PROTOCOL.md](PROTOCOL.md) for complete documentation of how this system works, why it exists, and how to use it effectively.

---

**Navigation:**
- [← Back to project root](../)
- [Protocol Documentation](PROTOCOL.md)
- [Retrieval Guide](RETRIEVAL_GUIDE.md)
- [Session Log](SESSION_LOG.md)
- [All Sessions](sessions/)
- [All Artifacts](artifacts/)
- [System Overview](SYSTEM-COMPLETE.md)
