# Critical Discovery: State-Layer vs Variant Structure

**Date:** 2025-10-15
**Discovered by:** Max's investigation with Figma Inspect panel

## The Problem

When checking node `209:44243` (labeled "State=Primary, Icon=Left"), the MCP tools were returning properties for a **state-layer** child element, NOT the button variant itself.

## Figma Component Structure

Buttons in this design use a nested structure:

```
Button Component Variant (209:44243)
├─ border-radius: 50px          ← VARIANT LEVEL (what we need!)
├─ background: #505BFF
├─ border: 1px solid #000
│
└─ State-layer (child frame)    ← INTERNAL LAYER
    ├─ padding: 16px 12px
    ├─ gap: 8px
    └─ Content (icon + text)
```

## What "State-Layer" Means

**State-layer** is a Figma design pattern for interactive components:

- **Purpose:** Handles hover/press/focus overlays
- **Location:** Nested inside the main component
- **Function:** Separates static appearance from interactive feedback
- **Common in:** Material Design and modern component systems

### Why It Exists:

Instead of:
```
Button (has everything mixed together)
```

You have:
```
Button (base appearance: blue, rounded)
  └─ State-layer (interactive overlays: hover darkening, press effect)
      └─ Content (what the user sees)
```

This separation allows:
- Consistent interactive feedback across variants
- Easier to maintain (change hover effect once)
- Cleaner component structure

## What MCP Tools Return

When calling `get_code` or `get_variable_defs` on node `209:44243`:

**Expected:** Properties of the Button variant
**Actually got:** Properties of the state-layer child

**This is why:**
- MCP tools drill into the component internals
- They generate code for the **rendered structure**, not the component definition
- The state-layer is what contains the layout logic, so that's what gets exported

## The Correct Values (From Figma Inspect)

Max used Figma's Inspect panel on the **Button variant** (not state-layer) and found:

### Button Variant Properties:
```css
border-radius: 50px;        /* Pill shape - fully rounded */
background: #505BFF;        /* Primary blue color */
border: 1px solid #000;     /* Black border (may be overridden?) */
width: 100px;              /* Varies by content */
height: 48px;              /* Consistent across all variants */
```

### State-Layer Properties:
```css
padding: 16px 12px;        /* Vertical 16px, Horizontal 12px */
gap: 8px;                  /* Space between icon and text */
display: inline-flex;
justify-content: center;
align-items: center;
```

## Lesson Learned

### ❌ What Didn't Work:
- Assuming MCP `get_metadata` node IDs point to component definitions
- Trying to extract styling properties from MCP tools alone
- Not immediately asking for Figma Inspect verification

### ✅ What Works:
1. Use MCP tools for **structure and layout** understanding
2. Use Figma Inspect panel for **exact styling values**
3. Verify node IDs point to what you think they do
4. Ask the human to check Inspect panel early in the process

## Key Insight for Future Work

**MCP tools and Figma Inspect serve different purposes:**

| Tool | Best For | Not Good For |
|------|----------|--------------|
| MCP `get_screenshot` | Visual reference, ground truth | Exact measurements |
| MCP `get_metadata` | Structure, hierarchy, node relationships | Styling properties |
| MCP `get_code` | Layout hints, structure ideas | Exact values, final code |
| MCP `get_variable_defs` | Design tokens (if defined as variables) | All properties |
| **Figma Inspect Panel** | **Exact styling values** | (Requires human) |

## Action Items

1. ✅ Document this discovery for future reference
2. ⏳ Update CLAUDE.md with MCP tool limitations and when to use Inspect
3. ⏳ Use the correct values (50px border-radius, #505BFF background) in implementation
4. ⏳ Investigate the "1px solid #000" border - does it actually appear on primary buttons?
5. ⏳ Check if other variants (Secondary, Disabled) have different border-radius values

## Questions Still to Resolve

1. **Black Border:** The Inspect panel shows `border: 1px solid #000` but the primary buttons don't visually show black borders. Is this:
   - Overridden somewhere?
   - Only on certain variants?
   - A Figma default that doesn't render?

2. **State-Layer Usage:** How do we translate "state-layer" to React/CSS?
   - Do we need a separate div for hover effects?
   - Or just use CSS `:hover` pseudo-classes?
   - Does the state-layer have opacity/overlay effects we need to implement?

3. **Variant Differences:** Do Secondary and Disabled buttons have the same 50px border-radius?
   - Need to check Inspect panel for those variants too

---

**This discovery fundamentally changes how we should query Figma components via MCP.**
