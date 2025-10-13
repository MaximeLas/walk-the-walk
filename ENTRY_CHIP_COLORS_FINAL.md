# Entry Chip Colors - EXACT Values from Michelle's Figma

**Source:** Unicorn Main File (yDQ6JquKmyd2nrCUhp3nda)
**Page:** Components (node ID 177:32228)
**Section:** Entry Chips (node ID 177:33175)
**Extracted:** 2025-10-13

---

## Status=No Nudge (177:32808)
- **Label:** No Nudge
- **Fill:** `transparent` (no background)
- **Stroke:** `#000000` (black, 1px solid)

## Status=Nudge Scheduled (177:32812)
- **Label:** Nudge Scheduled
- **Fill:** `#FFFCEF` (light yellow)
- **Stroke:** `#FCD915` (yellow, 1px solid)

## Status=Nudge Sent (177:32813)
- **Label:** Nudge Sent
- **Fill:** `#EAF6FF` (light blue)
- **Stroke:** `#004CCE` (blue, 1px solid)

## Status=Nudge Responded (177:32814)
- **Label:** Nudge Responded
- **Fill:** `#EAFFF4` (light green)
- **Stroke:** `#00B017` (green, 1px solid)

## Status=Entry Closed (177:32815)
- **Label:** Entry Closed
- **Fill:** `#E8DAFF` (light purple)
- **Stroke:** `#843DFF` (purple, 1px solid)

---

## Implementation in Code

### tailwind.config.js
```javascript
// Status=No Nudge (177:32808) - Black border only, no background
'status-neutral': '#000000',
'status-neutral-bg': 'transparent',

// Status=Nudge Scheduled (177:32812) - Yellow
'status-warning': '#fcd915',
'status-warning-bg': '#fffcef',

// Status=Nudge Sent (177:32813) - Blue
'status-info': '#004cce',
'status-info-bg': '#eaf6ff',

// Status=Nudge Responded (177:32814) - Green
'status-success': '#00b017',
'status-success-bg': '#eafff4',

// Status=Entry Closed (177:32815) - Purple (THIS WAS MISSING!)
'status-error': '#843dff',
'status-error-bg': '#e8daff',
```

### Usage in React/TSX
```tsx
// No Nudge
<div className="bg-status-neutral-bg border border-status-neutral rounded-sm px-3 py-1.5">
  No Nudge
</div>

// Nudge Scheduled
<div className="bg-status-warning-bg border border-status-warning rounded-sm px-3 py-1.5">
  Nudge Scheduled
</div>

// Nudge Sent
<div className="bg-status-info-bg border border-status-info rounded-sm px-3 py-1.5">
  Nudge Sent
</div>

// Nudge Responded
<div className="bg-status-success-bg border border-status-success rounded-sm px-3 py-1.5">
  Nudge Responded
</div>

// Entry Closed
<div className="bg-status-error-bg border border-status-error rounded-sm px-3 py-1.5">
  Entry Closed
</div>
```

---

## What Was Wrong Before

### Incorrect Values:
- **No Nudge:** Was using white background + black border instead of transparent + black
- **Entry Closed:** Was using generic red (#ef4444 + #fee2e2) instead of purple (#843dff + #e8daff)

### Impact:
- "Entry Closed" status showed as red when it should be purple
- "No Nudge" had unnecessary white background
- Implementation didn't match Michelle's design

### Now Fixed:
All colors now match Michelle's Figma Components page exactly, with full traceability to source node IDs.

---

## Verification

You can verify these values by:
1. Opening the Figma file: `yDQ6JquKmyd2nrCUhp3nda`
2. Navigating to the Components page (node 177:32228)
3. Finding the "Entry Chips" section (node 177:33175)
4. Inspecting each of the 5 Entry Chip variants (nodes 177:32808 through 177:32815)
5. Comparing the Fill and Stroke values in Figma's inspector

The hex values extracted here come directly from the Figma-generated code via the MCP Figma tools.
