# Chrome DevTools MCP: Agent Experience Log

**Purpose:** Document tool failures and discoveries to improve the guide over time.

**Why we collect these logs:** Periodically, we review logged entries to identify patterns and update the AGENT_GUIDE.md with better instructions, new troubleshooting sections, or corrections. Your entries directly improve the guide for future agents. You don't need to worry about this process - just log issues when they occur per the rules below.

---

## When to Log

**✅ DO log when:**
- Tool failed despite following the guide correctly
- Guide information was incorrect or incomplete
- Encountered scenario not covered by guide
- Novel issue or behavior not documented

**❌ DON'T log when:**
- You didn't follow guide instructions (your mistake)
- Issue was caused by user's environment/auth/setup
- Error is already documented in guide as expected behavior

**Simple rule:** If you followed the guide and something went wrong, log it. If you made a mistake or it's user-related, don't.

---

## Instructions

1. **Log immediately** when a tool fails despite following the guide
   - Don't try to debug first - capture the raw failure while fresh
   - Fill in: Task Context, What I Tried, Expected vs Actual
   - Use placeholder text for Resolution/Lesson (see template)

2. **Attempt resolution** (max 2-3 tries)
   - Try reasonable fixes based on error message
   - If solved quickly, great. If not, move on.

3. **Update your entry** with findings (only if you have something to add)
   - If you found a resolution → Update the Resolution section
   - If you learned a clear lesson → Update the Lesson section
   - If neither → Leave placeholders as-is, no need to come back

4. **Don't read existing entries** during your session (prevents confusion)

5. **Add newest entries first** (right below the Log Entries section)

---

## Entry Template

```markdown
---
**Date:** YYYY-MM-DD HH:MM
**Task Context:** [What you were trying to accomplish]

### What I Tried
[Specific tool calls and actions]

### Expected vs Actual
- **Expected:** [What should have happened per guide]
- **Actual:** [What actually happened]

### Resolution
[Attempting to resolve... will update if solution found]

### Lesson
[Will add if key insight emerges]
---
```

**Note:** Fill in Resolution/Lesson with placeholders initially. Come back and update if you find a solution or insight.

---

## Example Entries

**Note:** These examples are based on issues encountered when the guide was incomplete. They show the format and level of detail expected. The current guide already addresses these scenarios, so you wouldn't log them again - but they demonstrate what loggable issues look like.

---
**Date:** 2025-10-16 14:30
**Task Context:** Checking network requests after login action

### What I Tried
```javascript
list_pages()
navigate_page({ url: "http://localhost:3000" })
click({ uid: "1_8" })  // Google login button
wait_for({ text: "Dashboard", timeout: 5000 })
list_network_requests({ resourceTypes: ["fetch"] })  // ❌ Failed
```

### Expected vs Actual
- **Expected:** Should list API fetch requests made during login (per guide's network debugging workflow)
- **Actual:** Error: "No network requests found matching resourceTypes: ['fetch']"

### Resolution
Guide says to filter by resource type, but OAuth redirect cleared network log. Used `list_network_requests()` without filter instead, which showed all requests including the authentication flow.

### Lesson
OAuth redirects or page navigations clear the network request log. Capture requests before redirect, or don't filter if you need to see the full flow including redirects.

---

---
**Date:** 2025-10-16 16:45
**Task Context:** Testing hover state on navigation menu

### What I Tried
```javascript
list_pages()
navigate_page({ url: "http://localhost:3000/dashboard" })
take_snapshot()
hover({ uid: "3_12" })  // Menu item
take_screenshot()  // ❌ Dropdown not visible in screenshot
```

### Expected vs Actual
- **Expected:** Hover should show dropdown menu, screenshot should capture it (per guide section on hover tool)
- **Actual:** Screenshot shows page without dropdown. Hover might not have triggered or timing issue.

### Resolution
Attempting to resolve... will update if solution found

### Lesson
Will add if key insight emerges

---

---

## Log Entries

<!-- Add new entries below this line, newest first -->

---
**Date:** 2025-10-17 14:53
**Task Context:** Testing reports page rendering - initial browser initialization

### What I Tried
```javascript
list_pages()  // First call to initialize browser per guide
// Error: "No page selected"

// Verified Chrome process is running:
// PID 78711: Chrome with --user-data-dir=/Users/maximelas/.cache/chrome-devtools-mcp/chrome-profile --remote-debugging-pipe

// Tried alternative approaches:
navigate_page({ url: "http://localhost:3000/reports" })  // Error: "No page selected"
new_page({ url: "http://localhost:3000/reports" })  // Error: "No page selected"
```

### Expected vs Actual
- **Expected:** Guide says "list_pages()" initializes browser and returns "about:blank [selected]" (AGENT_GUIDE.md line 67-68)
- **Actual:** Error: "No page selected" - browser process is running but MCP can't connect/communicate with it

### Resolution
Cannot resolve - appears to be MCP connection state issue. Chrome process exists but MCP client can't interact with it. May require MCP server restart or reconnection.

### Lesson
"No page selected" can occur even when Chrome process is running. This is different from the guide's description which implies list_pages() always initializes successfully. May be a stale connection or MCP state corruption issue.

---

