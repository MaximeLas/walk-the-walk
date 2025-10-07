# Documentation Agent System

## Overview

This system enables automatic generation of comprehensive, beautifully formatted technical documentation that gets posted to Notion.

## How to Use

### Quick Start

The `/document` command works in two modes:

**Mode 1: Full Codebase Overview (no arguments)**
```
/document
```
Creates a comprehensive snapshot of the entire system at the current commit. Perfect for:
- Creating milestone documentation as your project evolves
- Onboarding new team members
- Giving non-technical stakeholders a complete picture
- Creating versioned snapshots tied to specific commits

**Mode 2: Focused Deep-Dive (with topic argument)**
```
/document authentication-system
/document magic-links
/document database-schema
/document api-endpoints
```
Creates in-depth documentation for a specific feature/topic.

The agent will:
1. Detect which mode to use based on whether you provided a topic
2. Research your codebase (comprehensive or topic-focused)
3. Analyze architecture and patterns
4. Generate beginner-friendly documentation with appropriate structure
5. Format beautifully with proper Notion blocks
6. Post to Notion under "Technical Documentation (Dev Reference)"
7. Return the URL to you

### What Gets Created

**For Full Codebase Overview:**
- 📸 Snapshot reference (clickable commit hash + date, NO separate repo line)
- 🎯 Project purpose and goals
- 🏗️ Complete architecture overview (all layers) WITH code examples
- 💻 Full tech stack explained for non-technical readers (What/Why/How pattern with code)
- 📁 Directory structure with sample file contents
- 🔑 All major features WITH code examples demonstrating concepts
- 🔐 Security model WITH actual code from codebase
- 🔄 Key user flows WITH code snippets at critical steps
- 📦 Critical dependencies WITH usage examples from codebase
- ✅ System-wide key takeaways
- ❓ Test questions for validation

**Philosophy:** Code examples throughout make the documentation engaging and educational, not just informative.

**For Focused Deep-Dive:**
- 📸 Snapshot reference (clickable commit hash + date, NO separate repo line)
- 🎯 Topic introduction WITH analogy for non-technical readers
- 💻 Relevant tech stack explained beginner-friendly WITH code examples
- 🔑 Core concepts WITH actual code from codebase
- 📁 Every file involved WITH code snippets from each
- 🎨 Code patterns & examples (all from actual codebase)
- 🔄 Complete end-to-end flow WITH code at each critical step
- ⚠️ Edge cases & security WITH code showing how they're handled
- ✅ Topic-specific key takeaways
- ❓ Test questions for validation

**Philosophy:** Same as Full Overview - code examples throughout for engagement and learning.

### Formatting Features

The agent uses proper Notion formatting:
- ✅ Headings (H1, H2, H3) not plain text
- ✅ Code blocks with syntax highlighting
- ✅ Callout boxes with emoji icons (💡, ⚠️, 🔴)
- ✅ Bold text for emphasis
- ✅ Dividers between sections
- ✅ Bulleted and numbered lists

## System Architecture

### Files

1. **`.claude/documentation-agent-prompt.md`**
   - Complete instructions for the documentation agent
   - Workflow steps (Research → Analysis → Generation → Formatting → Publishing)
   - Notion API formatting examples
   - Success criteria

2. **`.claude/commands/document.md`**
   - The `/document` slash command definition
   - Invokes the agent with the prompt file

3. **This README**
   - Usage documentation
   - System overview

### Notion Workspace Structure

```
MVP Definition (root)
└── Technical Documentation (Dev Reference)
    ├── Codebase Overview & Architecture
    ├── [Your generated docs appear here]
    └── ...
```

Parent Page ID: `2835a657-5299-8148-a1f4-f7a14e9207b4`

## How It Works (Behind the Scenes)

1. User runs `/document [topic]`
2. Slash command reads `documentation-agent-prompt.md`
3. Agent launches in fresh context window (no token pollution)
4. Agent follows the comprehensive prompt:
   - Researches codebase (Glob, Grep, Read tools)
   - Analyzes architecture and patterns
   - Generates structured content
   - Formats with proper Notion block types
   - Posts to Notion API
5. Agent returns: "Documentation created at: [URL]"
6. Parent session stays clean ✨

## Customization

### Update the Prompt

Edit `.claude/documentation-agent-prompt.md` to:
- Change documentation structure
- Add new formatting rules
- Update Notion workspace IDs
- Modify tone and style

### Update the Command

Edit `.claude/commands/document.md` to:
- Change command behavior
- Add pre-processing steps
- Modify how topic is passed

## Example Usage

```bash
# Create a full codebase overview snapshot at current commit
/document

# Document specific topics/features
/document authentication-system
/document magic-links
/document email-notifications
/document database-schema
```

**Recommended workflow:**
1. Run `/document` after major milestones to create versioned snapshots
2. Run `/document [topic]` when you need detailed documentation for specific features
3. The snapshot reference at the top of each doc ties it to a specific git commit

## Benefits

✅ **Consistent formatting** - Same beautiful structure every time
✅ **Fresh context** - No token pollution in main session
✅ **Beginner-friendly** - Non-technical co-founders can understand
✅ **Comprehensive** - Includes why, not just what
✅ **Real examples** - Uses actual code from codebase
✅ **Version tracking** - Snapshot reference with commit hash
✅ **Professional** - Beautiful Notion formatting

## Troubleshooting

### Agent doesn't format correctly?
The agent will use Context7 to look up Notion API docs if unsure. Check `.claude/documentation-agent-prompt.md` for formatting examples.

### Wrong Notion location?
Update parent page ID in `.claude/documentation-agent-prompt.md` under "Publishing Phase".

### Want different structure?
Update the "Generation Phase" section in `.claude/documentation-agent-prompt.md` with your desired structure.

## Future Enhancements

Ideas for v2:
- Auto-trigger on major commits
- Support for diagrams (Mermaid)
- Multi-language support
- Custom templates per documentation type
- Integration with PR descriptions
