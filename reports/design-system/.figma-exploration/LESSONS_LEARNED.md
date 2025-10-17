# Lessons Learned: Figma MCP Tools & Workflow

This document captures key lessons, confusions, and resolutions discovered during Figma-to-code translation.

## Lesson 0: CRITICAL - Don't Scan Code Output, Parse Systematically

**Date:** 2025-10-15
**Severity:** HIGH - Nearly derailed entire workflow
**Component:** Button
**Discovered by:** Max pushing back on weak hypothesis

### The Confusion:

I concluded that `get_code` output didn't contain exact styling values:
- ❌ "Border radius is missing (only shows `rounded-[inherit]`)"
- ❌ "Background color isn't in the code"
- ❌ "MCP tools can't provide exact values"

### The Reality:

**All values were in the output the entire time!**

```tsx
<div className="bg-[#505bff] border border-black rounded-[50px]">
```

✅ Background: `bg-[#505bff]`
✅ Border: `border border-black`
✅ Border-radius: `rounded-[50px]`

### What Went Wrong:

1. **Scanned visually** instead of parsing systematically
2. **Focused on inner divs** (state-layer), missed outer wrapper
3. **Saw `rounded-[inherit]`** and assumed value was missing
4. **Confirmation bias** - looked only for supporting evidence
5. **No methodology** - no checklist, no structure

### The Resolution:

1. ✅ Created systematic parsing guide (HOW_TO_PARSE_GET_CODE.md)
2. ✅ Built automated parsing script (parse-figma-code.js)
3. ✅ Documented failure analysis (CRITICAL_FAILURE_ANALYSIS.md)
4. ✅ Established checklist-based approach

### The Lesson:

**The tools work fine. The failure was in how I used them.**

**Always:**
- Parse from outer wrapper inward
- Use checklists for systematic extraction
- Verify before concluding something is "missing"
- Use automated tools to catch what eyes miss

**Never:**
- Blame tools without thorough verification
- Scan visually through 200+ lines of code
- Form conclusions based on first thing you see
- Accept assumptions without evidence

**See:** `.figma-exploration/CRITICAL_FAILURE_ANALYSIS.md` for complete post-mortem

---

## Lesson 1: MCP Tools Show Internal Structure, Not Component Properties

**Date:** 2025-10-15
**Status:** CORRECTED - This was initially a misunderstanding (see Lesson 0)
**Component:** Button

### Original Confusion:

When querying node `209:44243`:
- Expected: Button variant properties
- Thought I got: Only state-layer properties

### What Actually Happened:

The `get_code` output contained BOTH:
- Outer wrapper with variant properties (`bg-[#505bff]`, `rounded-[50px]`)
- Inner state-layer with layout properties (`px-[12px]`, `py-[16px]`)

I just wasn't parsing it correctly!

### The Lesson (Corrected):

**MCP `get_code` DOES provide all styling properties** - they're just at different nesting levels matching the Figma structure.

| When to Use | Tool | What It Gives You |
|-------------|------|-------------------|
| Visual reference | `get_screenshot` | Image of the design |
| Structure understanding | `get_metadata` | Node hierarchy, IDs, positions |
| Code hints | `get_code` | Generated React/Tailwind (verify!) |
| Design tokens | `get_variable_defs` | Variables used (if defined) |
| **Exact values** | **Figma Inspect Panel** | **Border-radius, colors, fonts, spacing** |

### Action:
- Always verify styling properties with Figma Inspect panel
- Use MCP tools for structure/layout understanding
- Don't trust MCP code exports for exact values

---

## Lesson 2: Border-Radius Can Be Hidden in Component Structure

**Date:** 2025-10-15
**Component:** Button

### The Confusion:

`get_code` returned `rounded-[inherit]` but didn't show where the value came from.

### The Resolution:

- Border-radius is defined at the **component variant level** (50px)
- The **state-layer child** inherits this value
- MCP code export generated code for the child, not the parent

### The Lesson:

When MCP code shows `inherit`, `var()`, or references:
- These point to values defined elsewhere (parent or variables)
- MCP tools won't always trace these back
- Check Figma Inspect on the actual component variant

### Action:
- When seeing inherited or variable references, ask human to check Inspect
- Don't spend time trying to trace through MCP tool outputs
- Flag as "needs verification" immediately

---

## Lesson 3: "State-Layer" Is a Design Pattern, Not Just a Layer Name

**Date:** 2025-10-15
**Component:** Button

### The Confusion:

Saw "State-layer" in Figma but didn't know what it meant or why it existed.

### The Resolution:

**State-layer** is a Figma design pattern (especially in Material Design):
- **Purpose:** Handles interactive state overlays (hover, press, focus)
- **Location:** Nested inside interactive components
- **Benefit:** Separates static appearance from interactive feedback

### The Lesson:

Common Figma patterns to recognize:
- **State-layer:** Interactive overlays
- **Auto-layout:** Flexbox-like positioning
- **Component Set:** Multiple variants of same component
- **Variants:** Different states/styles of a component (Primary, Secondary, etc.)

### Action:
- Learn common Figma terminology and patterns
- When seeing unfamiliar structure, ask what it represents
- Document these patterns for future reference

---

## Lesson 4: Node IDs From Metadata May Not Point Where You Think

**Date:** 2025-10-15
**Component:** Button

### The Confusion:

`get_metadata` showed:
```xml
<symbol id="209:44243" name="State=Primary, Icon=Left" />
```

Assumed this was the Button variant itself.

### The Resolution:

- The node ID represents a **component instance**
- Component instances contain nested layers (like state-layer)
- Querying this ID returns internal structure, not component definition

### The Lesson:

**Node IDs from `get_metadata` point to instances/placements, not definitions.**

To get component definition properties:
- Select the component in Figma
- Use Inspect panel
- Check the "Component" tab (not child layers)

### Action:
- Don't assume node IDs from metadata represent what you think
- Verify by getting screenshot of that specific node
- Ask human to select and inspect the right level

---

## Lesson 5: Documentation and Structured Logging Is Essential

**Date:** 2025-10-15
**Process:** Figma exploration

### The Realization:

Without structured documentation:
- Hard to remember why decisions were made
- Can't trace back through reasoning
- Difficult to learn from mistakes
- No reference for future similar situations

### The Resolution:

Created `.figma-exploration/` folder with:
- Timestamped exploration folders
- Markdown docs explaining findings
- Screenshots saved with context
- Questions and uncertainties documented

### The Lesson:

**Document everything in real-time:**
- What tools were used and why
- What was expected vs what was received
- Points of confusion and how they were resolved
- Questions still outstanding
- Lessons learned

### Action:
- Maintain `.figma-exploration/` for all component explorations
- Update `LESSONS_LEARNED.md` when new insights emerge
- Create structured templates for documentation
- Reference past explorations when working on similar components

---

## Template for Future Lessons

When documenting new lessons, use this structure:

### The Confusion:
[What was unclear or unexpected]

### The Resolution:
[What we discovered/how it works]

### The Lesson:
[Key takeaway for future work]

### Action:
[What to do differently next time]

---

## Quick Reference: MCP Tool Decision Tree

**Need to see what something looks like?**
→ `get_screenshot`

**Need to understand component structure?**
→ `get_metadata` (gives hierarchy)

**Need exact styling values (colors, spacing, fonts)?**
→ Ask human to use Figma Inspect Panel

**Need code hints for structure?**
→ `get_code` (but verify values!)

**Need design tokens?**
→ `get_variable_defs` (only if defined as variables)

**Not sure what node ID to use?**
→ Ask human to select the element and share the node ID

---

This document will grow as we discover more about the Figma-to-code workflow!
