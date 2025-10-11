The user wants to retrieve context from past session summaries.

**User's request:** {{TOPIC}}

## Your Task

**Important:** The user's request ({{TOPIC}}) may be brief. Use your conversation context to **expand and clarify** what they're looking for. Think about:
- What specifically are they working on right now?
- What additional context would help the sub-agent search effectively?
- What related topics, keywords, or concepts should the sub-agent look for?

Then use the Task tool to launch a retrieval sub-agent:

```
Task({
  subagent_type: "general-purpose",
  description: "Retrieve session context",
  prompt: `You are retrieving past session context.

## What User Needs
[EXPAND on {{TOPIC}} using your conversation context - be specific and detailed]

## Your Instructions

Read /second-brain/RETRIEVAL_GUIDE.md and follow it exactly.

That file contains complete step-by-step instructions for:
- How to search SESSION_LOG.md
- Which sessions to read
- How to compress context
- What to return

Execute the retrieval now.`
})
```

After the sub-agent returns, use that compressed context to help the user.
