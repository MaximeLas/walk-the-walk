Generate technical documentation and post to Notion.

**Topic:** {{TOPIC}}

## Your Task

Use the Task tool to launch a documentation sub-agent with `subagent_type: "general-purpose"`:

```
Task({
  subagent_type: "general-purpose",
  description: "Generate technical documentation",
  prompt: `You are creating technical documentation for Notion.

## Topic
{{TOPIC}}

## Your Instructions

Read /Users/maximelas/Projects/Unicorn/walk-the-walk/.claude/documentation-agent-prompt.md and follow it exactly.

That file contains complete instructions for:
- Mode detection (full overview vs deep-dive)
- Research workflow
- Content generation
- Notion formatting
- Publishing steps

Execute the documentation generation now.`
})
```

Launch the sub-agent now.
