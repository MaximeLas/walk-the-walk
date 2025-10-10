# WalkTheWalk Knowledge Base

This is your "second brain" for AI-assisted development work.

## What This Is

A system for preserving **thought processes, reasoning, and insights** from productive AI conversations, so future you (and future AI agents) can build on past thinking rather than repeat it.

## Start Here

👉 **[INDEX.md](INDEX.md)** - Main entry point with navigation

📚 **[PROTOCOL.md](PROTOCOL.md)** - How this system works and why (read this if you're new)

📋 **[SESSION_LOG.md](SESSION_LOG.md)** - Quick-reference index of all sessions

## Folder Structure

```
/docs
  /sessions          # Detailed conversation summaries
  /artifacts         # Things produced (reports, messages, transcripts)
  INDEX.md           # Navigation and current state
  SESSION_LOG.md     # Quick-reference index
  PROTOCOL.md        # System documentation
  README.md          # This file
```

## Two Operations

This system has two distinct operations with different workflows:

### Operation 1: CREATE (Record Session)

**Trigger:** User uses `/record-session` slash command

**Who executes:** Main Claude Code agent (needs full conversation context)

**Instructions:** Read [PROTOCOL.md](PROTOCOL.md)

**What happens:**
1. Analyze conversation for valuable reasoning
2. Create session summary following template
3. Update SESSION_LOG.md with entry
4. Confirm with user

### Operation 2: FETCH (Retrieve Context)

**Trigger:** User says "Check past sessions for X"

**Who executes:** Specialized sub-agent via Task tool

**Instructions:** Read [RETRIEVAL_GUIDE.md](RETRIEVAL_GUIDE.md)

**What happens:**
1. Scan SESSION_LOG.md for relevant sessions
2. Read 1-3 most relevant session files (focused sections)
3. Compress essential reasoning
4. Return summary to main agent

**Why separate?** FETCH uses a sub-agent to keep main conversation context clean and enable more reliable retrieval with a fresh context window.

## Core Principle

**Capture reasoning, not just conclusions.**

The value isn't in knowing "we decided X" - it's in understanding the thought process, trade-offs considered, arguments developed, and why X won over Y and Z.

---

**Created:** 2025-10-08
**Version:** 1.0
