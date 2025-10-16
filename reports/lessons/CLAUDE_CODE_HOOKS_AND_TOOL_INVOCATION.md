# Claude Code: Hooks, Tool Invocation, and CLI Display

**Date:** October 16, 2025
**Topic:** Understanding how Claude Code executes tools, hooks, and displays output to users

---

## The Mystery: Why Did My CLI Look Weird?

During a session working on the reports viewer, the user noticed strange output in their CLI:

```
PreToolUse:Bash [jq -r '"\(.tool_input.command) -
\(.tool_input.description // "No description")"' >>
~/.claude/bash-command-log.txt] completed successfully
```

This appeared before every Bash command execution, making the output cluttered and confusing.

## Root Cause: Hooks Configuration

**Discovery:** The user had configured a **PreToolUse hook** in `~/.claude/settings.json`:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "jq -r '\"\\(.tool_input.command) - \\(.tool_input.description // \"No description\")\"' >> ~/.claude/bash-command-log.txt"
          }
        ]
      }
    ]
  }
}
```

### What This Hook Does:
1. **Triggers:** Before every `Bash` tool use
2. **Action:** Logs the bash command and description to `~/.claude/bash-command-log.txt`
3. **Side Effect:** Shows in CLI as "PreToolUse:Bash [...]" before the actual command

---

## How Claude Code Tool Invocation Works

### 1. Tool Call Structure

Claude invokes tools using function calls with parameters. For example, a Bash command:

**Internal structure:**
- Tool name: `Bash`
- Parameters: `command`, `description`, `timeout`, etc.
- Result: Command output or error

**What Claude sees (internal):**
```
Bash tool invoked with:
- command: "npm run build"
- description: "Build the project"
```

**What user sees (normal):**
```
⏺ Build the project
  ⎿ [build output]
```

### 2. Execution Flow Without Hooks

```
User Message
    ↓
Claude Thinks
    ↓
Claude Invokes Tool (e.g., Bash)
    ↓
Tool Executes
    ↓
Result Returns to Claude
    ↓
Claude Responds to User
```

**CLI Display (clean):**
```
⏺ I'll build the project now

  ⎿ npm run build
    ✓ Compiled successfully
```

### 3. Execution Flow WITH Hooks

```
User Message
    ↓
Claude Thinks
    ↓
Claude Invokes Tool
    ↓
PreToolUse Hook Triggers   ← NEW STEP
    ↓
Hook Command Executes      ← SHOWS IN CLI
    ↓
Actual Tool Executes
    ↓
Result Returns to Claude
    ↓
Claude Responds to User
```

**CLI Display (with hooks - messy):**
```
⏺ I'll build the project now

PreToolUse:Bash [jq logging command] completed successfully
  ⎿ npm run build
    ✓ Compiled successfully
```

---

## Types of Hooks Available

Based on the discovered configuration, Claude Code supports multiple hook types:

### 1. PreToolUse Hooks
- **When:** Before a tool is invoked
- **Purpose:** Logging, validation, pre-processing
- **Example:** Log all bash commands to a file

### 2. Notification Hooks
- **When:** At specific events (user input needed, etc.)
- **Purpose:** Desktop notifications, alerts
- **Example:** `notify-send 'Claude Code' 'Awaiting your input'`

### 3. Other Potential Hooks (inferred)
- `PostToolUse` - After tool execution
- `user-prompt-submit-hook` - When user submits a message
- `tool-use-hook` - Generic tool usage hook

---

## Hook Configuration Structure

### Location
- **Global:** `~/.claude/settings.json`
- **Project:** `./.claude/settings.json` (project-specific, overrides global)

### Syntax

```json
{
  "hooks": {
    "HookType": [
      {
        "matcher": "ToolName",  // Empty string matches all
        "hooks": [
          {
            "type": "command",
            "command": "shell command to execute"
          }
        ]
      }
    ]
  }
}
```

### Matcher Examples

```json
// Match specific tool
"matcher": "Bash"

// Match all tools
"matcher": ""

// Could potentially support regex (unconfirmed)
"matcher": "Bash|Edit|Write"
```

---

## What I (Claude) Knew vs. Learned

### What I Already Knew

1. **Tool invocation basics**
   - I know I can invoke tools like Bash, Read, Edit, Write, etc.
   - Each tool has specific parameters
   - Results come back and I can use them

2. **Settings files exist**
   - `~/.claude/settings.json` for global config
   - `./.claude/settings.json` for project-specific
   - Contains preferences, configurations

3. **Hook concept**
   - Hooks are commands that run at specific lifecycle points
   - Common in development tools (git hooks, npm hooks, etc.)
   - The instructions mentioned "hooks" and user feedback from them

### What I Learned Today

1. **Specific hook syntax**
   - Exact JSON structure for PreToolUse hooks
   - How `matcher` field works
   - The `type: "command"` structure

2. **Why CLI looked weird**
   - PreToolUse hooks show their execution in the CLI
   - This is BY DESIGN for transparency
   - Users can see what hooks are running

3. **Hook execution visibility**
   - When I invoke a tool, hooks run FIRST
   - Hook output appears in CLI before tool output
   - Format: `PreToolUse:ToolName [command] completed successfully`

4. **The jq logging pattern**
   - User had set up sophisticated bash command logging
   - Using `jq` to parse tool parameters
   - Appending to a log file for audit trail

5. **Multiple hook types exist**
   - PreToolUse, Notification, potentially others
   - Each can have multiple matchers
   - Each matcher can have multiple hooks

---

## Practical Implications

### For Users

**Understanding the CLI:**
- If you see `PreToolUse:...` messages, you have hooks configured
- These are YOUR hooks, not Claude's behavior
- Hooks provide transparency but can clutter output

**Managing Hooks:**
```bash
# View current hooks
cat ~/.claude/settings.json | jq '.hooks'

# Disable temporarily
mv ~/.claude/settings.json ~/.claude/settings.json.backup

# Re-enable
mv ~/.claude/settings.json.backup ~/.claude/settings.json

# Edit hooks
nano ~/.claude/settings.json
```

**Useful Hook Ideas:**
1. **Audit trail:** Log all bash commands (like current setup)
2. **Safety checks:** Prevent dangerous commands
3. **Notifications:** Alert when long tasks complete
4. **Validation:** Check parameters before execution

### For Claude (Me)

**What I Should Know:**
1. Hooks run automatically - I don't control them
2. Hook failures might block tool execution
3. Users might see more output than I expect
4. Hook timing affects tool execution duration

**Best Practices:**
1. Use clear, descriptive `description` parameters (users log these!)
2. Expect potential delays from hook execution
3. Be aware hook failures may appear in conversation
4. Don't assume CLI output matches my expectations

---

## Advanced: How Hooks Access Tool Parameters

The logging hook uses `jq` to parse JSON:

```bash
jq -r '"\(.tool_input.command) - \(.tool_input.description // "No description")"'
```

### What This Means:

1. **Tool parameters are available as JSON**
   - Claude passes tool call as JSON to hook
   - Structure: `{ "tool_input": { "command": "...", "description": "..." } }`

2. **Hooks can access ANY parameter**
   - `tool_input.command` - the bash command
   - `tool_input.description` - the description
   - `tool_input.timeout` - timeout value
   - Any other parameter Claude provides

3. **Hooks can modify behavior**
   - Could potentially intercept and change parameters
   - Could block execution based on content
   - Could trigger external systems

### Example Hook Use Cases

**1. Safety Hook (prevent dangerous commands):**
```json
{
  "matcher": "Bash",
  "hooks": [{
    "type": "command",
    "command": "echo '$TOOL_INPUT' | jq -e '.tool_input.command | test(\"rm -rf /\")' && exit 1 || exit 0"
  }]
}
```

**2. Time Tracking Hook:**
```json
{
  "matcher": "",
  "hooks": [{
    "type": "command",
    "command": "echo \"$(date): $TOOL_NAME\" >> ~/claude-tool-usage.log"
  }]
}
```

**3. Slack Notification Hook:**
```json
{
  "matcher": "Bash",
  "hooks": [{
    "type": "command",
    "command": "curl -X POST -H 'Content-type: application/json' --data '{\"text\":\"Claude running: $TOOL_COMMAND\"}' $SLACK_WEBHOOK"
  }]
}
```

---

## The Bigger Picture: Why This Matters

### Transparency & Control
Hooks give users **complete visibility and control** over what Claude does:
- See every command before it executes
- Log everything for audit
- Block dangerous operations
- Integrate with existing workflows

### Extension Points
Hooks are **extension points** in Claude Code:
- Connect to external systems
- Implement custom policies
- Add organizational compliance
- Create automated workflows

### Trust & Safety
Hooks enable **trust through verification**:
- Users can audit all Claude actions
- Organizations can enforce policies
- No "black box" - everything is visible
- User maintains ultimate control

---

## Lessons Learned

### 1. The "Weird Display" Was Intentional
What seemed like a bug was actually **a feature working correctly**. The hooks were executing as designed, and their output was intentionally shown for transparency.

### 2. Settings Are Powerful
A few lines in `settings.json` can completely change how Claude Code behaves and appears. Understanding this file is crucial for power users.

### 3. Tool Invocation Is Layered
The simple act of "running a bash command" actually involves:
- Claude's decision to use the tool
- Hook pre-processing
- Actual tool execution
- Hook post-processing (if configured)
- Result handling

### 4. JSON Is The Common Language
Everything flows through JSON:
- Tool parameters
- Hook inputs
- Configuration files
- This enables powerful scripting and integration

### 5. Users Have Ultimate Control
Claude Code is designed with user agency in mind:
- Hooks can inspect everything
- Hooks can block anything
- Users approve tool uses
- Full transparency by default

---

## Conclusion

The "weird CLI output" mystery revealed a sophisticated hook system that gives users unprecedented control over AI tool usage. What initially seemed like cluttered output was actually a carefully designed transparency mechanism.

**Key Takeaway:** In Claude Code, users aren't just observers - they're in control. Hooks are the mechanism that makes this control possible.

**For Future Reference:**
- Always check `~/.claude/settings.json` when CLI looks unexpected
- Hooks are a feature, not a bug
- Understanding hooks unlocks advanced Claude Code usage
- The more you know about hooks, the more powerful Claude Code becomes

---

## Further Reading

- Claude Code documentation on hooks (if available)
- Understanding `jq` for JSON parsing
- Bash scripting for hook commands
- Security implications of hook commands

---

## UPDATE: The REAL Mystery Deepens

### The Missing Tool Descriptions

After writing this document, the user pointed out something crucial that I had missed:

**What Should Appear:**
```
⏺ I'll commit and push this

  ⎿ Commit and push hooks documentation    ← THIS LINE IS MISSING!
    [git output]
```

**What Actually Appears:**
```
⏺ I'll commit and push this

PreToolUse:Bash [hook output]
  ⎿ [git output only - no description line!]
```

### The Discovery

The **tool description line is completely absent** from the CLI output. Only the hook execution and the raw command output appear.

### Potential Causes

1. **Cursor-specific behavior**
   - User is running Claude Code through Cursor IDE
   - Cursor may handle tool output display differently
   - The description might be suppressed in Cursor's implementation

2. **Output style configuration**
   - There may be an output style setting we haven't found
   - Could be in Cursor settings, not Claude settings
   - Might be controlled by a different config file

3. **Hook interference**
   - The PreToolUse hook might be interfering with normal output
   - Hook execution could be suppressing the description line
   - Timing issue where hook output overwrites tool description

4. **Claude Code version difference**
   - Different versions might display differently
   - Cursor's integration might use a modified version
   - CLI vs IDE integration differences

### What We Know For Sure

1. **Hooks ARE working correctly** - bash-command-log.txt proves this
2. **Tool execution IS happening** - we see the output
3. **Description IS being provided** - it's in the log file
4. **Something is suppressing the display** - but what?

### Questions This Raises

- Is this Cursor-specific behavior?
- Is there a "compact mode" or "minimal output" setting?
- Are hooks designed to REPLACE the normal description line?
- Is this a bug or intended behavior?

### Implications

This is actually MORE important than the original discovery because:
- **Transparency is reduced** - users don't see what tool is being called with what description
- **Debugging is harder** - without description lines, following Claude's actions is confusing
- **Hooks become essential** - they're now the ONLY way to see what's happening

### Action Items

For users experiencing this:
1. Check Cursor settings for output/display options
2. Try running from pure CLI (not through Cursor) to compare
3. Look for "compact mode" or "minimal display" settings
4. Consider keeping the hook for visibility since normal descriptions are missing

### The Plot Twist

What we initially thought was "messy hook output cluttering clean tool descriptions" is actually **"hooks providing the ONLY visibility into tool calls because descriptions are missing."**

The hook isn't the problem - it's revealing a DIFFERENT problem!

---

## FINAL UPDATE: The Actual Root Cause Discovered

After extensive debugging and testing (including disabling hooks and restarting Claude Code), we discovered the **real issue**:

### What We Found

**Claude Code IS displaying tool calls, but in `Bash(command)` format instead of showing the description parameter.**

Instead of showing:
```
⏺ Bash: List Claude config directory after restart
  ⎿ [output]
```

It shows:
```
⏺ Bash(ls -la ~/.claude/ | head -10)
  ⎿ [output]
```

### The Discovery Process

1. **Disabled hooks** by moving `settings.json`
2. **Restarted Claude Code** completely
3. **Tested multiple Bash calls** with clear descriptions
4. **User confirmed** they see `Bash(command)` format, NOT description text
5. **User also noted** that descriptions appeared AFTER restart when they hadn't before

### What This Means

The `description` parameter that Claude provides to the Bash tool is being **completely ignored** by Claude Code's display system. Only the raw command shows in the `Bash(...)` format.

### Additional Discovery: Display Timing Issue

The user noticed something crucial: **After restarting Claude Code, the `Bash(command)` display started showing up, but it WASN'T showing before the restart!**

This suggests:
- Display rendering may be caching or delayed
- Claude Code might need restart to properly display tool calls
- There may be a synchronization issue between Claude's output and the CLI display

### Impact on User Experience

- **Harder to follow what's happening** - raw commands in `Bash(...)` format less readable than descriptions
- **PreToolUse hook becomes valuable** - it logs the descriptions that aren't displayed properly
- **Not actually a hook problem** - hooks work fine, this is a CLI display rendering issue

### The Hook Timing Mystery SOLVED

The PreToolUse hook output sometimes appears **AFTER** the tool execution in the transcript, not before. Combined with the display delay issue, this explains why the output looked so confusing.

**The Real Sequence:**
1. Claude invokes tool with description
2. PreToolUse hook runs (may not display immediately)
3. Tool executes
4. Display renders (possibly delayed or after restart)
5. User sees: `Bash(command)` + PreToolUse message + output (all potentially out of order)

### Resolution

The user's hook configuration is **working perfectly** - it's logging commands with descriptions to a file, which proves Claude IS providing descriptions.

The issues are:
1. **CLI display shows `Bash(command)` instead of description** - likely a Claude Code UI choice
2. **Display rendering can be delayed** - may require restart to show properly
3. **Hook output timing appears inconsistent** - cosmetic issue with display ordering

**Bottom line:** This is NOT a hook problem. It's a Claude Code CLI display limitation where the `description` parameter is ignored in favor of showing raw commands.

---

**Note:** This document was generated by Claude during a session where these concepts were discovered in real-time through extensive testing and debugging. The user configuration served as a practical example of hook usage in production. Multiple updates were made as we uncovered the layers of this display mystery.

---

## THE ACTUAL BUG: PreToolUse Hook Hides Tool Display

After methodical testing and research, here's the **confirmed bug**:

### The Bug Explained Simply

**The PreToolUse hook EXECUTES correctly, but it HIDES the actual tool use display from the user.**

Instead of seeing:
1. PreToolUse hook output
2. Tool display (`Bash(command)`)  
3. Tool output

Users only see:
1. PreToolUse message (appears twice!)
2. Tool output

**The tool display is completely suppressed.**

### Visual Evidence

**WITHOUT Hook (Expected behavior):**
```
⏺ Bash(echo "Test with hook enabled")    ← Tool display shows
  ⎿ Test with hook enabled
```

**WITH Hook (Bug):**
```
PreToolUse:Bash [jq...] completed successfully    ← Hook shows
  ⎿ Testing with hook active after restart

PreToolUse:Bash [jq...] completed successfully    ← Appears AGAIN (why?!)
```

**No `Bash(...)` line at all!**

### Why This Is Confusing

The user sees the PreToolUse message appearing **where the tool display should be**, making it look like there are two hooks executing instead of one hook + one tool use.

The user's words: "it hides the actual tool use to the user and instead makes it seem like we have another pretooluse going on even though it's the actual tool use that should be there"

### Research: This Bug Is Unreported

We searched GitHub issues for anthropics/claude-code and found:

- **Issue #4084** (Closed, July 2025): Hook output not visible - DIFFERENT problem
- **Issue #6305** (Open, August 2025, 2👍): PreToolUse hooks not executing - OPPOSITE problem

**Our bug is unique:** Hooks execute fine, but they suppress the normal tool display entirely.

### Technical Details

- **Version Affected:** Claude Code 2.0.15
- **Platform:** macOS Darwin 24.6.0  
- **Date Discovered:** October 16, 2025
- **Hook Type:** PreToolUse with Bash matcher
- **Symptom:** Tool display line completely missing when hook is configured

### Impact

This makes CLI extremely confusing:
1. Users can't easily see what tool is being invoked
2. Hook message appears in place of tool display
3. Hook message duplicates (appears twice)
4. No visual distinction between hook execution and tool execution

### What Should Be Reported

**GitHub Issue Title:** "PreToolUse hook suppresses Bash() tool display in CLI"

**Description:**
- When PreToolUse hook is configured for Bash tool, the normal `Bash(command)` display line is completely hidden
- Hook execution message appears where tool display should be
- Hook message appears twice for unknown reason
- Makes CLI confusing as users can't distinguish between hook execution and tool execution

**Expected:** Both hook output AND tool display should show
**Actual:** Only hook output shows, tool display is suppressed

### Recommended Fix

Claude Code should display:
1. PreToolUse hook output (once, not twice)
2. Normal tool display (`Bash(command)`)
3. Tool execution output

All three should be visible to provide full transparency of what's happening.

