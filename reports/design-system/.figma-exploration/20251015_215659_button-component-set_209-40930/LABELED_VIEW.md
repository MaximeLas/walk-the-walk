# Button Component Set - Labeled View

**Figma Node ID:** 209-41266 (documentation frame containing the component set)
**Screenshot taken:** 2025-10-15 21:56:59

## What This View Shows

This is the **documentation/specification frame** that Michelle created. It shows:
- Row labels on the left (Primary, Secondary, Disabled, Tapped)
- Column labels on top (No Icon, Icon Left, Icon Top)
- The purple dashed border indicating the dev-ready Component Set

## Visual Structure Analysis

### Layout Matrix:

```
                No Icon                 Icon Left               Icon Top
Primary:        [Save]                  [🔲 Save]              [🔲 Save]
                (blue pill)             (blue pill + icon)     (blue pill, stacked)

Secondary:      Import from Contacts    [✱ Promise]            [📋 Import from Contacts]
                (text only)             (text + icon)          (icon over text)

Disabled:       [Save]                  [🔲 Save]              [🔲 Save]
                (gray pill)             (gray pill + icon)     (gray pill, stacked)

Tapped:         (empty)                 [👤 Contact]           (empty)
                                        (teal/light blue)
```

### Observations:

1. **Primary Buttons:**
   - Vibrant blue color (approximately `#505bff` per extracted tokens)
   - White text
   - Rounded pill shape
   - Examples show "Save" text with save icon

2. **Secondary Buttons:**
   - No background fill
   - Black text
   - Icons appear as black outlines
   - More varied examples (longer text, different icons)

3. **Disabled Buttons:**
   - Gray/muted color scheme
   - Light gray background with darker gray text
   - Same structure as other states

4. **Tapped State:**
   - Only one example shown (Icon Left variant)
   - Light blue/teal color (different from primary)
   - "Contact" text with person icon
   - Appears to be active/pressed state

### Design Decisions Evident:

1. **Not all combinations exist** - Tapped state only shows one example
2. **Consistent sizing** - All buttons appear to have same height (48px)
3. **Icon consistency** - Icons are 24×24px across all variants
4. **Spacing appears uniform** - Same padding throughout variants

## Questions This Raises:

1. **Tapped State Coverage:** Why only one Tapped example? Is this state only for specific use cases?
2. **Missing States:** Are there hover/focus states not shown here?
3. **Border on Disabled:** The disabled buttons appear to have a subtle border - need to verify
4. **Icon Color Inheritance:** Do icons change color with button state?

## Component Scope

Based on this view, the Button component should support:

**Props:**
- `variant`: 'primary' | 'secondary' | 'disabled' | 'tapped'
- `iconPosition`: 'none' | 'left' | 'top'
- `icon`: ReactNode (optional)
- `children`: string (button text)
- `disabled`: boolean (maps to 'disabled' variant)
- `onClick`: function

**Additional considerations:**
- How to handle the "Tapped" state in React? Is it `:active` CSS or prop-driven?
- Should we prevent certain combinations (e.g., no "Tapped + No Icon")?

---

This labeled view is extremely helpful for understanding Michelle's intended component structure!
