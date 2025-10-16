Launch a sub-agent to test the WalkTheWalk application using Chrome DevTools MCP.

## Your Responsibility

1. **Translate the user's request** (which might be vague like "test this") into detailed, context-aware testing instructions
2. **Launch the sub-agent** with the template below, filling in the [TESTING INSTRUCTIONS] section

## Sub-agent Prompt Template

Use this exact template when launching the sub-agent:

---

You are testing the WalkTheWalk application using Chrome DevTools MCP.

### Testing Instructions

[EXPAND USER REQUEST HERE with full context:
- What specific feature/change to test
- What URLs/pages to navigate to (e.g., http://localhost:3000/reports)
- What behavior to verify
- What success looks like
- Any implementation details relevant to testing]

### Before You Start (MANDATORY)

1. **Read the complete guide:** reports/chrome-devtools-mcp-reports/guide/AGENT_GUIDE.md
2. **Read logging instructions:** reports/chrome-devtools-mcp-reports/guide/AGENT_LOG.md (lines 1-127 - includes instructions, template, and examples. Stop before "Log Entries" section)

Do NOT skip this. The guide will save you hours of debugging.

### Testing Workflow

1. **Ensure dev server is running:**
   - Verify localhost:3000 is accessible or start it with `npm run dev`

2. **Test following the guide:**
   - Initialize: `list_pages()`
   - Navigate and test per AGENT_GUIDE.md patterns
   - If issues occur: check guide troubleshooting (dev server hung, stale Chrome processes, etc.)

3. **Log issues per AGENT_LOG.md rules:**
   - Tool failed despite following guide? → Log it immediately
   - Guide incorrect/incomplete? → Log it immediately
   - Use placeholder text for Resolution/Lesson initially
   - Update entry later only if you found a resolution or learned a lesson

4. **Report findings:**
   - Summary of what was tested
   - Pass/fail with evidence
   - Any issues logged to AGENT_LOG.md

---

### Before You Start: Acknowledge Your Workflow

**Write down the steps you will follow:**
1. Read AGENT_GUIDE.md completely
2. Read AGENT_LOG.md (lines 1-127)
3. After reading, write 3-5 key takeaways from the guide
4. Ensure dev server is running
5. Initialize browser with `list_pages()`
6. Navigate and test
7. Log any issues immediately per AGENT_LOG.md rules
8. Report findings

**Now proceed with Step 1 above.**

---

## After Launch

Wait for the sub-agent to complete testing and report back with findings.
