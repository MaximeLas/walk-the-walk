# Chrome DevTools MCP: Practical Guide for Agents

**Purpose:** This guide helps you use Chrome DevTools MCP effectively to test the WalkTheWalk application.

**Read this BEFORE using the MCP tools** - it will save you hours of debugging and false assumptions.

---

## Quick Start (TL;DR)

```javascript
// 1. ALWAYS initialize browser first
list_pages()

// 2. Navigate to localhost (yes, it works!)
navigate_page({ url: "http://localhost:3000" })

// 3. Test your feature
take_screenshot()
list_console_messages()

// That's it. Simple as that.
```

**Time to read this guide:** 10 minutes
**Time saved by reading it:** 4-6 hours of debugging

---

## Table of Contents

1. [Essential Concepts](#essential-concepts)
2. [Common Mistakes & How to Avoid Them](#common-mistakes--how-to-avoid-them)
3. [Correct Workflows](#correct-workflows)
4. [Troubleshooting](#troubleshooting)
5. [Tool Reference Quick Guide](#tool-reference-quick-guide)
6. [Configuration Notes](#configuration-notes)

---

## Essential Concepts

### 1. Browser Initialization

**CRITICAL:** The browser doesn't start automatically when you connect to the MCP server.

From the [official README](./README.md):
> The MCP server will start the browser automatically once the MCP client uses a tool that requires a running browser instance.

**What this means:**
- First tool call → Browser starts
- Subsequent calls → Use existing browser
- Best practice: Call `list_pages()` first to initialize

**Example:**

❌ **WRONG** (will fail):
```javascript
// First action is navigation - browser not initialized yet
navigate_page({ url: "http://localhost:3000" })
// Error: "No page selected"
```

✅ **CORRECT**:
```javascript
// Initialize browser
list_pages()
// Result: Browser starts, shows "about:blank [selected]"

// Now navigation works
navigate_page({ url: "http://localhost:3000" })
// Result: Success!
```

### 2. Localhost Navigation WORKS

**Critical misconception to avoid:** Localhost navigation is NOT blocked.

The MCP server uses [Puppeteer](https://github.com/puppeteer/puppeteer) (see [README line 19-21](./README.md#L19-L21)), which handles localhost perfectly.

**Verified working:**
```javascript
navigate_page({ url: "http://localhost:3000" })
// ✅ Works fine
// Server logs confirm: GET / 200 in 460ms
```

**Why you might think it doesn't work:**
- Browser wasn't initialized (see point #1 above)
- Connection state was corrupted
- You gave up before trying proper initialization

**Trust the proof:** This has been tested and verified to work. If you hit issues, they're connection/state problems, not localhost restrictions.

### 3. Architecture: Puppeteer, Not Raw CDP

**How it actually works:**
```
Your agent
  → Chrome DevTools MCP (Node.js)
    → Puppeteer
      → Chrome Browser (--remote-debugging-pipe)
```

**Why this matters:**
- Puppeteer handles page load waiting automatically
- No manual Chrome security policy management needed
- Localhost works out of the box
- More reliable than raw Chrome DevTools Protocol

**Don't assume:** The MCP doesn't use raw CDP with `--enable-automation` restrictions that block localhost. It uses Puppeteer which is designed for automation.

### 4. Browser Persistence

**The browser stays running** between tool calls:

| Scenario | Browser State | What to Do |
|----------|---------------|------------|
| First tool call in session | Not running | Gets auto-started |
| Subsequent calls | Still running | Just use tools |
| Different agent, same session | Still running | Can reuse browser |
| Browser crashes | Stopped | Call `list_pages()` to restart |
| Claude Code restarts | Disconnected | Call `list_pages()` to reconnect |

**Advantage:** Once initialized, very efficient. No startup overhead per tool call.

**Profile location:** `~/.cache/chrome-devtools-mcp/chrome-profile` (persists across sessions unless using `--isolated`)

---

## Common Mistakes & How to Avoid Them

### Mistake #1: Not Reading the Official README

**Symptom:** Making assumptions about how things work

**Impact:** Hours wasted on false theories and incorrect conclusions

**Example of what NOT to do:**
- Jump directly into testing
- Assume architecture based on behavior
- Create elaborate theories about why things don't work
- Write reports about fundamental limitations that don't exist

**What TO do:**
1. Read [the README in this folder](./README.md) FIRST
2. Understand it uses Puppeteer
3. Know the initialization requirement
4. Be aware of configuration options

**Time saved:** 4-6 hours of investigation

---

### Mistake #2: "No Page Selected" → Assuming Everything is Broken

**Symptom:** Getting "No page selected" error repeatedly

**Incorrect conclusion:** "The MCP is broken" or "Localhost is blocked"

**Actual cause:** Browser not initialized yet

**How it happens:**
```javascript
// Scenario: Fresh session, no previous tool calls
navigate_page({ url: "http://localhost:3000" })
// Error: "No page selected"

// Agent thinks: "Navigation is broken!"
// Reality: Browser isn't running yet
```

**Correct approach:**
```javascript
// Always initialize first
list_pages()
// Now browser is running

navigate_page({ url: "http://localhost:3000" })
// Works perfectly
```

**Warning signs you're making this mistake:**
- Every tool returns "No page selected"
- You're trying complex workarounds
- You're considering the MCP "fundamentally broken"

**Solution:** Call `list_pages()` and try again.

---

### Mistake #3: Confusing Connection Issues with Navigation Issues

**Two separate problems:**

| Problem Type | Error | Cause | Fix |
|--------------|-------|-------|-----|
| **Connection State** | "No page selected" | Browser not initialized | `list_pages()` |
| **Navigation Timing** | Timeout during Fast Refresh | Next.js reloading mid-navigation | Retry or wait |

**Bad pattern:**
```
1. Get "No page selected" → try different navigation approach
2. Try 10 different ways → all fail
3. Conclude: "Localhost is fundamentally blocked"
4. Write report about Chrome security policies
5. Waste 6 hours
```

**Good pattern:**
```
1. Get "No page selected" → check browser status
2. Call list_pages() → browser initializes
3. Retry navigation → works
4. Continue testing
5. Save 6 hours
```

---

### Mistake #4: Creating Theories Without Verification

**Anti-pattern:**
1. Observe behavior (e.g., navigation fails)
2. Create theory (e.g., "Chrome blocks localhost in automation mode")
3. Find supporting evidence (e.g., Chrome has `--enable-automation` flag)
4. Write comprehensive analysis of why it doesn't work
5. **Never actually verify the theory**

**Correct pattern:**
1. Observe behavior
2. Check actual state (`ps aux`, `list_pages()`, logs)
3. Read documentation
4. Test with proper setup
5. **Verify before concluding**

**Example:**
- Theory: "Localhost blocked by security policy"
- Verification: Actually test localhost with initialized browser
- Result: Theory was wrong, localhost works fine

**Lesson:** Verify assumptions with actual tests, not just logic.

---

### Mistake #5: Over-Engineering Solutions

**Symptom:** Trying complex workarounds for simple problems

**Example:**
```javascript
// Problem: "No page selected"
// Bad solution: Write script to manually launch Chrome with special flags
// Good solution: Call list_pages()

// Problem: Navigation timeout
// Bad solution: Use evaluate_script to manually change window.location
// Good solution: Just retry navigate_page after Fast Refresh completes
```

**Rule of thumb:** If your solution is more complex than the problem, you're probably solving the wrong problem.

---

## Correct Workflows

### Workflow 1: Testing a Page

**Goal:** Navigate to a page and verify it works

```javascript
// Step 1: Initialize (if first call in session)
list_pages()

// Step 2: Navigate
navigate_page({ url: "http://localhost:3000" })

// Step 3: Verify visually
take_screenshot()

// Step 4: Check for errors
list_console_messages()

// Step 5: Check network requests (optional)
list_network_requests({ resourceTypes: ["xhr", "fetch"] })
```

**Expected results:**
- Navigation succeeds immediately
- Screenshot shows your app
- Console might show some auth errors (normal for Supabase)
- Network requests show API calls

---

### Workflow 2: Testing a User Flow

**Goal:** Click through a multi-step process

```javascript
// Step 1: Initialize and navigate
list_pages()
navigate_page({ url: "http://localhost:3000" })

// Step 2: Get page structure to find elements
const snapshot = take_snapshot()
// Analyze snapshot to find UIDs

// Step 3: Interact with elements
click({ uid: "1_5" })  // Login button

// Step 4: Fill form
fill_form({
  elements: [
    { uid: "2_10", value: "test@example.com" },
    { uid: "2_11", value: "password" }
  ]
})

// Step 5: Submit
click({ uid: "2_15" })  // Submit button

// Step 6: Verify result
wait_for({ text: "Welcome", timeout: 5000 })
take_screenshot()
```

**Note:** UIDs come from `take_snapshot()` output. Always get fresh snapshot before interaction.

---

### Workflow 3: Debugging CSS/Layout Issues

**Goal:** Verify visual changes

```javascript
// Step 1: Navigate to page with changes
list_pages()
navigate_page({ url: "http://localhost:3000/reports" })

// Step 2: Capture before state (if making changes)
take_screenshot({ filePath: "/tmp/before.png" })

// Step 3: Make changes to code (you'll do this separately)

// Step 4: Refresh to see changes
navigate_page({ url: "http://localhost:3000/reports" })

// Step 5: Capture after state
take_screenshot({ filePath: "/tmp/after.png" })

// Step 6: Verify
// Compare screenshots or just check visually
```

**Alternative approach:** Have the user refresh their browser and share screenshot. Often faster than using MCP.

---

### Workflow 4: Performance Testing

**Goal:** Get Core Web Vitals and performance insights

```javascript
// Step 1: Initialize
list_pages()

// Step 2: Start trace with page reload
performance_start_trace({ reload: true, autoStop: false })

// Step 3: Wait for page to fully load
wait_for({ text: "Footer", timeout: 10000 })  // Wait for some indicator

// Step 4: Stop trace and get results
const results = performance_stop_trace()
// Results include LCP, FID, CLS metrics

// Step 5: Get detailed insight on specific metric
const lcpDetails = performance_analyze_insight({
  insightName: "LCPBreakdown"
})
```

**What you get:**
- Core Web Vitals (LCP, FID, CLS)
- Performance insights
- Recommendations for optimization

---

### Workflow 5: Network Request Debugging

**Goal:** See what API calls are made

```javascript
// Step 1: Navigate to page
list_pages()
navigate_page({ url: "http://localhost:3000/dashboard" })

// Step 2: Perform action that triggers API calls
click({ uid: "1_20" })  // Some button

// Step 3: Check all network requests
const requests = list_network_requests({
  resourceTypes: ["xhr", "fetch"]
})

// Step 4: Inspect specific failed request
const details = get_network_request({
  url: "http://localhost:3000/api/backlogs"
})

// Details include:
// - Request headers
// - Response headers
// - Response body
// - Status code
// - Timing
```

**Use case:** Debugging API integration issues, checking auth headers, verifying request payloads.

---

## Troubleshooting

### Issue: "No page selected"

**Symptoms:**
- Any tool returns this error
- Just started session
- Browser was closed previously

**Diagnosis:**
```javascript
// Check if browser is running
list_pages()
// If error persists, browser failed to start
```

**Solutions:**

1. **Most common:** Browser not initialized yet
   ```javascript
   list_pages()  // Initialize browser
   // Try your operation again
   ```

2. **MCP Chrome process hung/stale** (if list_pages() also fails)
   - Symptom: `list_pages()` returns "No page selected", Chrome process exists but won't connect
   - Diagnosis: Check for MCP Chrome processes
     ```bash
     ps aux | grep "chrome-devtools-mcp/chrome-profile" | grep -v grep
     ```
   - Solution: Kill stale Chrome processes
     ```bash
     # Find PIDs of MCP Chrome processes
     ps aux | grep "chrome-devtools-mcp/chrome-profile" | grep -v grep | awk '{print $2}' | xargs kill -9
     # Then retry
     list_pages()  // Should work now
     ```

3. **Browser crashed:** Restart it
   ```javascript
   list_pages()  // Will restart browser
   ```

4. **Claude Code restarted:** Reconnect
   ```javascript
   list_pages()  // Reconnects to browser
   ```

**Prevention:** Always call `list_pages()` at start of testing session.

---

### Issue: Navigation Timeout

**Symptoms:**
- `navigate_page()` times out
- Message: "Navigation timeout of 10000 ms exceeded"

**Common causes:**

1. **Dev server is hung/crashed** (MOST COMMON)
   - Symptom: curl to localhost also times out, browser shows infinite loading
   - Diagnosis: `curl -I http://localhost:3000 --max-time 3` times out
   - Solution: Restart dev server yourself
     ```bash
     lsof -ti :3000 | xargs kill -9  # Kill hung process
     npm run dev  # Restart (use run_in_background: true)
     ```

2. **Fast Refresh mid-navigation** (Next.js)
   - Symptom: Happens during active development, intermittent
   - Solution: Wait a moment and retry
   - Or: Check dev server logs for "Fast Refresh" warnings

3. **Page actually slow**
   - Symptom: Consistently slow even after retries, but eventually loads
   - Solution: Increase timeout or investigate performance
   - Example: `navigate_page({ url: "...", timeout: 10000 })`

**What it's NOT:**
- ❌ "Localhost is blocked"
- ❌ "MCP is fundamentally broken"
- ❌ "Chrome security policy prevents localhost"

**Correct action:**
```javascript
// Retry once
navigate_page({ url: "http://localhost:3000" })
// If fails again, check dev server logs
```

---

### Issue: Blank Screenshot

**Symptoms:**
- Screenshot is completely white/blank
- Page navigated successfully

**Common causes:**

1. **Page hasn't rendered yet**
   - Solution: Wait for content
   ```javascript
   wait_for({ text: "Some page content", timeout: 5000 })
   take_screenshot()
   ```

2. **React hydration in progress**
   - Solution: Wait a moment
   ```javascript
   // Add small delay if needed
   navigate_page({ url: "http://localhost:3000" })
   wait_for({ text: "Welcome", timeout: 3000 })
   take_screenshot()
   ```

3. **CSS issue causing white page**
   - Solution: Check console for errors
   ```javascript
   list_console_messages()
   ```

---

### Issue: Snapshot Token Limit

**Symptoms:**
- Error: "MCP tool 'take_snapshot' response exceeds maximum allowed tokens (25000)"
- Happens on content-heavy pages

**Cause:** Page accessibility tree is too large

**Solution:**
```javascript
// Instead of snapshot:
take_snapshot()  // ❌ Fails with token limit

// Use screenshot:
take_screenshot({ fullPage: true })  // ✅ Works
```

**When to use which:**
- `take_snapshot()`: Forms, interactive UIs, need element UIDs
- `take_screenshot()`: Documentation, content pages, visual verification

---

### Issue: Browser State Confusion

**Symptoms:**
- Unexpected cookies/localStorage from previous sessions
- Different behavior than expected
- Already logged in when shouldn't be
- Test results inconsistent between runs
- Previous agent's test data still present

**Cause:** Browser profile persists across sessions at `~/.cache/chrome-devtools-mcp/chrome-profile`

**Specific examples of when this happens:**

1. **Auth State Pollution:**
   - Agent A logs into WalkTheWalk
   - Agent B starts fresh task → Already "logged in" unexpectedly
   - Tests fail because auth state wasn't expected

2. **LocalStorage Conflicts:**
   - Agent A stores feature flags in localStorage
   - Agent B tests default behavior → Gets Agent A's flags instead
   - Behavior differs from fresh user

3. **Cookie Accumulation:**
   - Multiple test sessions create various cookies
   - Analytics cookies, session cookies, tracking cookies pile up
   - Hard to know what state you're actually testing

4. **Cache Issues:**
   - Agent A loads page → Resources cached
   - Agent B tests "first load performance" → Uses cached resources
   - Performance metrics inaccurate

**Quick Solutions:**

1. **Clear state manually (temporary fix):**
   ```javascript
   evaluate_script({
     function: "() => { localStorage.clear(); sessionStorage.clear(); document.cookie.split(';').forEach(c => document.cookie = c.trim().split('=')[0] + '=;expires=Thu, 01 Jan 1970 00:00:00 UTC'); }"
   })
   ```

2. **Restart browser (clears runtime state, not profile):**
   - Close browser manually
   - Call `list_pages()` to restart
   - Note: Cookies/localStorage still persist

3. **Ask user to configure `--isolated=true` (permanent fix):**

   **When to request this:**
   - You encounter state issues multiple times
   - Tests need guaranteed clean slate
   - Testing auth flows across multiple agents
   - User confirms state accumulation is a problem

   **How to ask:**
   ```
   "I'm encountering persistent browser state from previous sessions that's
   affecting test results. To ensure a clean environment, could you add
   --isolated=true to the chrome-devtools MCP configuration in ~/.claude.json?

   This will create a temporary profile that's automatically cleaned after
   each browser session, preventing state accumulation.

   Note: This means we won't be able to test persistent login across different
   agent sessions, but it will make testing more reliable."
   ```

   **What user needs to do:**
   Edit `~/.claude.json` to add the flag:
   ```json
   "chrome-devtools": {
     "type": "stdio",
     "command": "npx",
     "args": [
       "-y",
       "chrome-devtools-mcp@latest",
       "--isolated=true"  // ← Add this line
     ],
     "env": {}
   }
   ```

**Trade-offs to explain to user:**

| Configuration | Pros | Cons |
|---------------|------|------|
| **Default (persistent profile)** | ✅ Can test login persistence<br>✅ Faster (uses cache)<br>✅ Simpler setup | ❌ State accumulates<br>❌ Tests may be inconsistent<br>❌ Hard to debug state issues |
| **`--isolated=true`** | ✅ Guaranteed clean slate<br>✅ Reproducible tests<br>✅ No state pollution | ❌ Can't test cross-session persistence<br>❌ Slightly slower (no cache)<br>❌ Need to re-login each session |

**Recommendation:**
- Start with default (no `--isolated`)
- If you hit state issues repeatedly → Ask user to enable `--isolated=true`
- For WalkTheWalk auth testing, persistent might be useful, but `--isolated` is safer

---

## Tool Reference Quick Guide

### Navigation Tools

| Tool | Use When | Example |
|------|----------|---------|
| `list_pages` | Initialize browser, see open tabs | `list_pages()` |
| `navigate_page` | Go to URL in current tab | `navigate_page({ url: "http://localhost:3000" })` |
| `new_page` | Open new tab with URL | `new_page({ url: "http://localhost:3000/reports" })` |
| `select_page` | Switch to different tab | `select_page({ pageIdx: 1 })` |
| `close_page` | Close a tab | `close_page({ pageIdx: 2 })` |
| `navigate_page_history` | Go back/forward | `navigate_page_history({ navigate: "back" })` |

**Default viewport:** 1440x900 (good for most testing)

---

### Inspection Tools

| Tool | Use When | Returns |
|------|----------|---------|
| `take_snapshot` | Need element UIDs for interaction | Accessibility tree with UIDs |
| `take_screenshot` | Visual verification | Image |
| `list_console_messages` | Check for JS errors | Console logs/errors |
| `list_network_requests` | See API calls | Network requests list |
| `get_network_request` | Inspect specific request | Full request/response details |

**Snapshot vs Screenshot:**
- Snapshot: Text-based, has element UIDs, token limit issues on large pages
- Screenshot: Image-based, no token limits, visual only

---

### Interaction Tools

**Workflow:** Always `take_snapshot()` first to get element UIDs

| Tool | Use When | Example |
|------|----------|---------|
| `click` | Click button/link | `click({ uid: "1_25" })` |
| `fill` | Fill single input | `fill({ uid: "1_10", value: "test@example.com" })` |
| `fill_form` | Fill multiple inputs | `fill_form({ elements: [{uid: "1_10", value: "..."}, ...] })` |
| `hover` | Trigger hover states | `hover({ uid: "1_15" })` |
| `drag` | Drag and drop | `drag({ from_uid: "1_5", to_uid: "1_8" })` |
| `upload_file` | Upload file | `upload_file({ uid: "1_20", filePath: "/path/to/file" })` |
| `wait_for` | Wait for text to appear | `wait_for({ text: "Success", timeout: 5000 })` |

**Note:** UIDs come from `take_snapshot()` and look like "1_25", "2_10", etc.

---

### Performance Tools

| Tool | Use When | Notes |
|------|----------|-------|
| `performance_start_trace` | Begin recording | Use `reload: true` for full page load |
| `performance_stop_trace` | End recording | Returns Core Web Vitals |
| `performance_analyze_insight` | Get detailed breakdown | Use after stop_trace |

**Example:**
```javascript
performance_start_trace({ reload: true, autoStop: false })
// Wait for page load
performance_stop_trace()  // Returns LCP, FID, CLS
performance_analyze_insight({ insightName: "LCPBreakdown" })
```

---

### Emulation Tools

| Tool | Use When | Example |
|------|----------|---------|
| `resize_page` | Test responsive design | `resize_page({ width: 375, height: 667 })` |
| `emulate_network` | Test slow connections | `emulate_network({ throttlingOption: "Slow 3G" })` |
| `emulate_cpu` | Test low-end devices | `emulate_cpu({ throttlingRate: 4 })` |

**Common viewport sizes:**
- Desktop: 1920x1080, 1440x900
- Tablet: 768x1024 (iPad)
- Mobile: 375x667 (iPhone SE), 414x896 (iPhone 11)

---

## Configuration Notes

### Current WalkTheWalk Configuration

Located in: `~/.claude.json`

```json
"chrome-devtools": {
  "type": "stdio",
  "command": "npx",
  "args": [
    "-y",
    "chrome-devtools-mcp@latest"
  ],
  "env": {}
}
```

**What this means for you:**
- Using latest stable Chrome
- Default viewport: 1440x900
- Persistent profile: `~/.cache/chrome-devtools-mcp/chrome-profile`
- Browser visible (not headless)

**You CANNOT change this configuration.** Only the user can modify it. If you need different settings, ask the user to update the config.

---

### Available Options (User-Configurable)

From the [README Configuration section](./README.md#configuration):

**Useful options:**

| Option | Purpose | When User Might Want It |
|--------|---------|-------------------------|
| `--isolated=true` | Temp profile, auto-cleaned | Prevent state accumulation |
| `--headless=true` | No browser window | Server environments |
| `--viewport=WxH` | Custom viewport size | Test specific screen sizes |
| `--logFile=/path` | Debug logs | Troubleshooting MCP issues |
| `--channel=canary` | Use Chrome Canary | Test new Chrome features |

**Current recommendation:** Keep defaults. Only add `--isolated=true` if state issues occur.

---

### What You Can Control vs. What You Can't

**You CAN:**
- ✅ Use any MCP tool
- ✅ Navigate to any URL (including localhost)
- ✅ Take screenshots, snapshots
- ✅ Interact with page elements
- ✅ Change viewport with `resize_page()`
- ✅ Emulate network/CPU conditions

**You CANNOT:**
- ❌ Change MCP server configuration
- ❌ Restart the MCP server with different flags
- ❌ Clear the persistent profile directory
- ❌ Launch a different Chrome instance

**If you need configuration changes:** Ask the user to update `~/.claude.json`.

---

## Testing WalkTheWalk Specifically

### Common Scenarios

**1. Testing Login Flow:**
```javascript
list_pages()
navigate_page({ url: "http://localhost:3000" })
take_snapshot()  // Find Google login button UID
click({ uid: "google_login_uid" })
// Note: Will redirect to Google OAuth (might need user to actually log in)
```

**2. Testing Reports Viewer:**
```javascript
list_pages()
navigate_page({ url: "http://localhost:3000/reports" })
take_screenshot()  // Verify reports list
click({ uid: "report_folder_uid" })  // Expand folder
take_screenshot()  // Verify expansion
```

**3. Testing API Calls:**
```javascript
list_pages()
navigate_page({ url: "http://localhost:3000/dashboard" })
// Perform action
list_network_requests({ resourceTypes: ["fetch"] })
// Check for Supabase API calls
```

**4. Checking Console Errors:**
```javascript
list_pages()
navigate_page({ url: "http://localhost:3000" })
list_console_messages()
// Note: Supabase auth errors are normal (refresh token)
```

---

### Known Expected Behaviors

**1. Auth Errors in Console:**
```
AuthApiError: Invalid Refresh Token: Refresh Token Not Found
```
**This is normal** - Supabase trying to refresh with no session. Not a problem unless user should be logged in.

**2. Fast Refresh Warnings:**
```
⚠ Fast Refresh had to perform a full reload
```
**This is normal** - Next.js hot module replacement. Might cause brief navigation delays.

**3. Dev Server Response Times:**
- First load: 1-2 seconds (compilation)
- Subsequent loads: 200-500ms
- Anything > 2s might indicate issue

---

## Key Takeaways

### The 5 Most Important Points

1. **Initialize first:** Always call `list_pages()` before other operations
2. **Localhost works:** Don't assume it's blocked. It's not.
3. **Read the README:** Located in this same folder, read it before testing
4. **Verify assumptions:** Test before concluding
5. **Connection ≠ Navigation:** "No page selected" is not a navigation problem

### Common False Assumptions to Avoid

❌ "Localhost is blocked by Chrome security"
❌ "MCP uses raw CDP with restrictions"
❌ "Navigation timeouts mean it's fundamentally broken"
❌ "I need complex workarounds"
❌ "The MCP doesn't work"

✅ Actually:
- Localhost works fine with proper initialization
- Uses Puppeteer, not raw CDP
- Timeouts are usually timing/state issues
- Simple initialization solves most problems
- The MCP works well when used correctly

---

## Additional Resources

- **Official README:** [README.md](./README.md) in this folder
- **Tool Reference:** See README lines 212-246 for full tool list
- **Configuration Options:** See README lines 253-294
- **Troubleshooting:** See README line 210 for official guide link

---

## Final Checklist Before Starting

Before you start testing with Chrome DevTools MCP:

- [ ] Read this guide (you're doing this now!)
- [ ] Read the [official README](./README.md) in this folder
- [ ] Understand browser initialization requirement
- [ ] Know that localhost works (don't waste time on workarounds)
- [ ] Know the difference between connection and navigation issues
- [ ] Have the dev server running (`npm run dev`)
- [ ] Ready to call `list_pages()` first

**Time spent reading:** ~10 minutes
**Time saved debugging:** 4-6 hours
**Worth it?** Absolutely.

---

**Good luck testing! The tools work well when used correctly.**

---

## Contributing to Agent Knowledge

**Important:** When you encounter meaningful issues or make discoveries while using Chrome DevTools MCP, **document them in [AGENT_LOG.md](./AGENT_LOG.md)**.

**When to add an entry:**
- You hit a problem that wasted significant time
- You discovered a workaround for an issue
- You found behavior not documented here
- You learned something that would help future agents

**When NOT to add an entry:**
- Simple user errors already covered in this guide
- Expected behaviors (auth errors, Fast Refresh, etc.)
- Issues you caused yourself

**Rules:**
1. ✅ **DO** add entries when you encounter real issues
2. ❌ **DON'T** read existing entries during your session (prevents confusion)
3. ✅ **DO** be specific about what happened
4. ❌ **DON'T** write general theories without verification

The log helps improve this guide over time. Your entries might save future agents hours of debugging.
