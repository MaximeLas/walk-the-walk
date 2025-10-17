# How to Parse Figma MCP `get_code` Responses

**Critical Guide:** This document explains how to correctly extract values from `get_code` tool responses.

---

## Understanding the Output Structure

When you call `get_code` on a Figma component, it returns React/TSX code that mirrors the Figma layer hierarchy:

```tsx
// OUTER WRAPPER = Component Variant Properties
<div className="bg-[#505bff] border rounded-[50px]" data-name="Button" data-node-id="...">

  // MIDDLE LAYER = Layout/State Layer Properties
  <div className="px-[12px] py-[16px] gap-[8px]" data-name="State-layer" data-node-id="...">

    // INNER CONTENT = Text and Icon Styling
    <div className="text-white text-[14px] font-bold">
      {children}
    </div>

  </div>
</div>
```

**Key Insight:** Different CSS properties live at different nesting levels!

---

## Step-by-Step Parsing Process

### Step 1: Identify the Structure

Look for `data-name` attributes to understand the hierarchy:

```tsx
data-name="State=Primary, Icon=Left"  // ← Component variant
data-name="State-layer"                // ← Layout layer
data-name="content-save-outline"       // ← Icon element
```

### Step 2: Extract Properties by Level

**Level 1: Outer Wrapper (Component Variant)**

Look for these on the OUTERMOST `<div>`:

| Property | Tailwind Pattern | Example | Meaning |
|----------|------------------|---------|---------|
| Background | `bg-[#...]` | `bg-[#505bff]` | Background color |
| Border | `border border-[color]` | `border border-black` | Border style |
| Border Radius | `rounded-[...]` | `rounded-[50px]` | Corner radius |
| Size | `w-[...]` `h-[...]` | `h-[48px]` | Dimensions |

**Level 2: Middle Layer (Layout/State)**

Look for these on the SECOND level `<div>` (often named "State-layer"):

| Property | Tailwind Pattern | Example | Meaning |
|----------|------------------|---------|---------|
| Padding | `px-[...]` `py-[...]` | `px-[12px] py-[16px]` | Internal spacing |
| Gap | `gap-[...]` | `gap-[8px]` | Space between children |
| Layout | `flex` `inline-flex` | `flex` | Display mode |
| Alignment | `items-center` | `justify-center` | Flexbox alignment |

**Level 3: Inner Content (Typography/Icons)**

Look for these on the TEXT and ICON elements:

| Property | Tailwind Pattern | Example | Meaning |
|----------|------------------|---------|---------|
| Text Color | `text-[#...]` or `text-white` | `text-white` | Font color |
| Font Size | `text-[...]` | `text-[14px]` | Text size |
| Font Weight | `font-[...]` | `font-bold` | Text weight |
| Icon Size | `size-[...]` | `size-[24px]` | Icon dimensions |

### Step 3: Use the Parsing Script

Run the utility script to automatically extract and categorize values:

```bash
# Save get_code output to file
cat > button-output.tsx
# Paste the output, then Ctrl+D

# Parse it
node .figma-exploration/parse-figma-code.js button-output.tsx
```

This will give you organized output:

```
=== COLOR VALUES ===
  #505bff
  #000000

=== CUSTOM VALUES ===
  50px (used 1x)  ← Border radius!
  12px (used 2x)  ← Padding horizontal
  16px (used 2x)  ← Padding vertical
  8px (used 1x)   ← Gap
  48px (used 1x)  ← Height
```

### Step 4: Create a Checklist

As you parse, fill out this checklist:

```markdown
## Component: Button (Primary Variant)

### Visual Properties (Outer Wrapper):
- [ ] Background color: _________
- [ ] Border: _________
- [ ] Border radius: _________
- [ ] Width: _________
- [ ] Height: _________

### Layout Properties (State Layer):
- [ ] Padding (horizontal): _________
- [ ] Padding (vertical): _________
- [ ] Gap: _________
- [ ] Display mode: _________
- [ ] Alignment: _________

### Content Properties (Inner Elements):
- [ ] Text color: _________
- [ ] Font size: _________
- [ ] Font weight: _________
- [ ] Icon size: _________

### Uncertainties to Flag:
- [ ] List anything unclear or contradictory
```

---

## Common Pitfalls & How to Avoid Them

### Pitfall 1: Looking Only at Inner Layers

❌ **Wrong:**
```tsx
// Only looking here ↓
<div className="px-[12px] py-[16px]" data-name="State-layer">
```

✅ **Right:**
```tsx
// Start here! ↓
<div className="bg-[#505bff] rounded-[50px]" data-name="Button">
  <div className="px-[12px] py-[16px]" data-name="State-layer">
```

**Fix:** Always parse from the OUTERMOST div inward.

### Pitfall 2: Seeing `inherit` and Stopping

❌ **Wrong:**
```tsx
<div className="rounded-[inherit]">  // "Value is missing!"
```

✅ **Right:**
```tsx
<div className="rounded-[50px]">  // Defined here
  <div className="rounded-[inherit]">  // Inherits 50px from parent
```

**Fix:** Trace `inherit` back to parent definition.

### Pitfall 3: Not Checking All Variants

❌ **Wrong:**
Only parse one variant, assume others are the same.

✅ **Right:**
Parse each variant separately - they may have different values.

**Fix:** Create checklist for EACH variant shown in output.

### Pitfall 4: Ignoring Design Token Comments

❌ **Wrong:**
Miss the comment at the end:
```
These variables are contained in the design: Neon Blue: #505bff, Off-White: #fcfafa
```

✅ **Right:**
Extract these tokens - they're the authoritative color names.

**Fix:** Always read the full output including comments.

---

## Real Example: Parsing Button Output

### Input (truncated):

```tsx
export default function StatePrimaryIconLeft() {
  return (
    <div className="bg-[#505bff] border border-black border-solid relative rounded-[50px] size-full">
      <div className="content-stretch flex flex-col gap-[2px] items-center justify-center">
        <div className="box-border flex gap-[8px] h-[48px] px-[12px] py-[16px]" data-name="State-layer">
          <div className="size-[24px]">
            {/* icon */}
          </div>
          <div className="text-[14px] text-white font-bold">
            <p>Save</p>
          </div>
        </div>
      </div>
    </div>
  );
}
// These variables are contained in the design: Off-White: #fcfafa.
```

### Parsing Process:

1. **Identify outer wrapper:**
   ```tsx
   <div className="bg-[#505bff] border border-black rounded-[50px]">
   ```

2. **Extract variant properties:**
   - Background: `#505bff` (Neon Blue)
   - Border: `1px solid black`
   - Border-radius: `50px`

3. **Find state-layer:**
   ```tsx
   <div className="... gap-[8px] h-[48px] px-[12px] py-[16px]" data-name="State-layer">
   ```

4. **Extract layout properties:**
   - Padding: `12px` horizontal, `16px` vertical
   - Gap: `8px`
   - Height: `48px`

5. **Find content elements:**
   ```tsx
   <div className="text-[14px] text-white font-bold">
   ```

6. **Extract typography:**
   - Font size: `14px`
   - Color: `white`
   - Weight: `bold`

7. **Extract icon size:**
   ```tsx
   <div className="size-[24px]">
   ```
   - Icon: `24px × 24px`

### Result Checklist:

```markdown
## Component: Button (Primary + Icon Left)

### Visual Properties:
- [x] Background color: #505bff
- [x] Border: 1px solid black
- [x] Border radius: 50px
- [x] Height: 48px

### Layout Properties:
- [x] Padding: 12px (horizontal), 16px (vertical)
- [x] Gap: 8px
- [x] Display: flex

### Content Properties:
- [x] Text color: white
- [x] Font size: 14px
- [x] Font weight: bold
- [x] Icon size: 24px

### Uncertainties:
- Black border appears in code but not prominent in screenshot - verify
```

---

## Verification Checklist

After parsing, always verify:

1. **Completeness**
   - [ ] Did I check the outermost wrapper?
   - [ ] Did I check all nesting levels?
   - [ ] Did I extract design tokens from comments?

2. **Accuracy**
   - [ ] Do extracted values match the screenshot?
   - [ ] Any contradictions between code and visual?
   - [ ] Traced all `inherit` values to their source?

3. **Documentation**
   - [ ] Filled out checklist for this variant?
   - [ ] Flagged any uncertainties?
   - [ ] Noted what still needs verification?

4. **Cross-Referencing**
   - [ ] Compared to Figma Inspect values (if available)?
   - [ ] Checked other variants for consistency?
   - [ ] Verified design tokens match naming?

---

## When to Use Parsing Script vs Manual

### Use Script When:
- Output is very long (>100 lines)
- Multiple variants in one response
- Want organized summary of all values
- Need to find specific patterns

### Parse Manually When:
- Short, simple output
- Single component variant
- You understand the structure well
- Quick spot-check needed

---

## Quick Reference: Common Tailwind Patterns

```
bg-[#xxxxxx]         → Background color
text-[#xxxxxx]       → Text color
border-[#xxxxxx]     → Border color

rounded-[XXpx]       → Border radius
w-[XXpx]             → Width
h-[XXpx]             → Height
size-[XXpx]          → Width & Height (square)

px-[XXpx]            → Padding left/right
py-[XXpx]            → Padding top/bottom
p-[XXpx]             → Padding all sides
gap-[XXpx]           → Gap between flex/grid children

text-[XXpx]          → Font size
font-['Name']        → Font family
font-bold            → Font weight

flex                 → Display flex
items-center         → Align items center
justify-center       → Justify content center
```

---

## Key Takeaways

1. **Structure matters:** Different properties live at different nesting levels
2. **Parse systematically:** Use checklists, don't just scan visually
3. **Trace inheritance:** `inherit` means look at parent
4. **Use tools:** The parsing script catches what eyes miss
5. **Verify everything:** Code is hints, not gospel

**The information is in the output - you just need to extract it correctly.**
