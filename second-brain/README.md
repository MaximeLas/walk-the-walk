# Second Brain - Conversational Memory System

This is your "second brain" for AI-assisted development work.

## What This Is

A system for preserving **thought processes, reasoning, and insights** from productive AI conversations, so future you (and future AI agents) can build on past thinking rather than repeat it.

**Core principle:** Capture reasoning, not just conclusions.

## Start Here

👉 **[INDEX.md](INDEX.md)** - Main entry point with navigation

📚 **[PROTOCOL.md](PROTOCOL.md)** - How this system works and why (read this if you're new)

📋 **[SESSION_LOG.md](SESSION_LOG.md)** - Quick-reference index of all sessions

🔍 **[RETRIEVAL_GUIDE.md](RETRIEVAL_GUIDE.md)** - How retrieval works

✅ **[SYSTEM-COMPLETE.md](SYSTEM-COMPLETE.md)** - Complete system overview

## Folder Structure

```
/second-brain
  /sessions          # Detailed conversation summaries
  /artifacts         # Things produced (reports, messages, transcripts)
  INDEX.md           # Navigation and current state
  SESSION_LOG.md     # Quick-reference index
  PROTOCOL.md        # RECORD instructions
  RETRIEVAL_GUIDE.md # FETCH instructions
  SYSTEM-COMPLETE.md # Complete overview
  README.md          # This file
```

## Two Operations

This system has two distinct operations with different workflows:

### Operation 1: RECORD (Record Session)

**Trigger:** User uses `/record-session` slash command

**Who executes:** Main Claude Code agent (needs full conversation context)

**Instructions:** Read [PROTOCOL.md](PROTOCOL.md)

**What happens:**
1. Analyze conversation for valuable reasoning
2. Create session summary following template
3. Update SESSION_LOG.md with entry (including 30-50 keywords)
4. Confirm with user

### Operation 2: FETCH (Retrieve Context)

**Trigger:** User uses `/fetch-session [topic]` slash command

**Who executes:** Specialized sub-agent via Task tool

**Instructions:** Read [RETRIEVAL_GUIDE.md](RETRIEVAL_GUIDE.md)

**What happens:**
1. Main agent expands user's brief topic using conversation context
2. Sub-agent scans SESSION_LOG.md for relevant sessions
3. Reads 1-3 most relevant session files (focused sections)
4. Compresses essential reasoning to 300-800 words
5. Returns summary to main agent

**Why separate?** FETCH uses a sub-agent to keep main conversation context clean and enable more reliable retrieval with a fresh context window. RECORD must use main agent since it needs full conversation context to extract reasoning.

**Key feature:** Main agent expands your brief input before delegating to sub-agent, since sub-agent has zero conversation context.

## Core Principles

1. **Capture reasoning, not just conclusions** - The value isn't in knowing "we decided X" but understanding the thought process, trade-offs, and why X won
2. **Sessions are immutable** - Snapshots in time, evolution tracked through new sessions
3. **Quality over quantity** - 30-50 carefully selected keywords, productive sessions only
4. **Two operations** - RECORD and FETCH have opposite context needs, architected separately
5. **Source of truth** - Minimal pointers, comprehensive instructions in protocol files

## Current Sessions

- **2025-10-08:** Backlog Model Rethinking (context-centric spaces)
- **2025-10-09:** Second Brain System Design (meta - designed this system)
- **2025-10-10:** MCP Research Methodology (Evidence Quality Pyramid)
- **2025-10-11:** Context Management Deep Dive (token economics, optimization)

See [SESSION_LOG.md](SESSION_LOG.md) for full details.

---

**Created:** 2025-10-08
**Updated:** 2025-10-11
**Version:** 1.0
