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

**Note:** This document was generated by Claude during a session where these concepts were discovered in real-time. The user configuration served as a practical example of hook usage in production.
