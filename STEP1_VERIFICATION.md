# Step 1 Verification Checklist

**Dev Server:** http://localhost:3000
**Demo Page:** http://localhost:3000/demo

---

## 1. Demo Page Testing (/demo)

### Visual Inspection

Navigate to http://localhost:3000/demo and verify:

**Header Section:**
- [ ] Dark header with white text (bg: #181818)
- [ ] Rounded bottom corners (36px radius)
- [ ] Card shadow visible
- [ ] "Component Demo" title is bold, 24px
- [ ] Subtitle is gray (rgba text)

**Design Tokens Test - Status Colors:**
- [ ] Success: Light green background (#eafff4) with green border (#00b017)
- [ ] Warning: Light yellow background (#fffcef) with yellow border (#fcd915)
- [ ] Info: Light blue background (#eaf6ff) with blue border (#004cce)
- [ ] Neutral: Light gray background (#f5f5f5) with gray border (#585858)
- [ ] Error: Light red background (#fee2e2) with red border (#ef4444)

**Text Hierarchy:**
- [ ] "Primary text" is pure black (#000000)
- [ ] "Secondary text" is gray (#585858)
- [ ] "Tertiary text" is lighter gray (#7a7a7a)
- [ ] Text colors have clear visual distinction

**Typography Scale:**
- [ ] text-2xl (24px) - Page Title - visibly largest
- [ ] text-xl (20px) - Section Header
- [ ] text-lg (18px) - Card Title
- [ ] text-base (16px) - Body text
- [ ] text-sm (14px) - Tab labels
- [ ] text-xs (12px) - Metadata - visibly smallest
- [ ] Font sizes have clear hierarchy

**Border Radius Examples:**
- [ ] rounded-sm (2px): Sharp corners, subtle rounding - "Chip"
- [ ] rounded (8px): Moderate rounding - "Card"
- [ ] rounded-lg (20px): Pronounced rounding - "Tab"
- [ ] rounded-2xl (40px): Very rounded - "Button"
- [ ] rounded-full: Perfect circle - "Avatar"
- [ ] shadow-card: Clear elevation/depth visible

**Glassmorphism Section:**
- [ ] Purple/indigo gradient background visible
- [ ] Inner card has frosted glass effect (blurred background visible through)
- [ ] Text is readable on blurred background
- [ ] Shadow creates depth

**Placeholder Sections:**
- [ ] "Atomic Components" section visible with placeholder text
- [ ] "Molecule Components" section visible
- [ ] "Navigation Components" section visible
- [ ] Footer with "Design tokens configured from Michelle's Figma designs"

---

## 2. Design Token Verification (Compare to Figma)

Open Michelle's Figma file side-by-side with the demo page.

### Color Matching

**Status Colors (Entry Chips in Figma):**

Compare these exact values:

| Token | Demo Page | Figma Value | Match? |
|-------|-----------|-------------|--------|
| Success green | #00b017 | Check Figma | [ ] |
| Success bg | #eafff4 | Check Figma | [ ] |
| Warning yellow | #fcd915 | Check Figma | [ ] |
| Warning bg | #fffcef | Check Figma | [ ] |
| Info blue | #004cce | Check Figma | [ ] |
| Info bg | #eaf6ff | Check Figma | [ ] |
| Neutral gray | #585858 | Check Figma | [ ] |
| Neutral bg | #f5f5f5 | Check Figma | [ ] |
| Error red | #ef4444 | Check Figma | [ ] |
| Error bg | #fee2e2 | Check Figma | [ ] |

**How to check:**
1. In demo page, inspect element (right-click → Inspect)
2. Check computed background-color and border-color values
3. Compare to Figma selection colors (select Entry Chip → Design panel)

### Spacing Verification

**Component Sizes from Figma:**

| Component | Expected | Test Method |
|-----------|----------|-------------|
| Entry chip height | 36px | Inspect chip element, check height |
| Avatar sm | 24px | Will test in Step 2 |
| Avatar md | 44px | Will test in Step 2 |
| Button height | 44px | Will test in Step 2 |
| Status dot | 8px | Will test in Step 2 |

**Spacing Patterns:**

Open browser DevTools (F12) and inspect any card on demo page:
- [ ] Card padding: Should be 24px (p-6) → Verify computed padding
- [ ] Gap between color boxes: Should be 12px (gap-3) → Verify computed gap
- [ ] Section margins: Should be 48px (mb-12) → Verify computed margin

### Typography Verification

**Font Family:**
1. Inspect any text element
2. Check computed font-family
3. Should show: `-apple-system, BlinkMacSystemFont, Hiragino Kaku Gothic Pro, Arial, sans-serif`
4. [ ] Font family matches

**Font Sizes:**

Use browser DevTools to measure actual text:

| Class | Expected | Actual (computed) | Match? |
|-------|----------|-------------------|--------|
| text-xs | 12px | ___ px | [ ] |
| text-sm | 14px | ___ px | [ ] |
| text-base | 16px | ___ px | [ ] |
| text-lg | 18px | ___ px | [ ] |
| text-xl | 20px | ___ px | [ ] |
| text-2xl | 24px | ___ px | [ ] |

### Shadow & Effects Verification

**Card Shadow:**
1. Inspect card with `shadow-card` class
2. Check computed box-shadow value
3. Expected: `0px 4px 16px 0px rgba(0, 0, 0, 0.15)`
4. [ ] Shadow matches

**Backdrop Blur:**
1. Inspect glassmorphism card in purple section
2. Check computed backdrop-filter value
3. Expected: `blur(6px)`
4. [ ] Blur matches

---

## 3. Mock Data Structure Review

Open the mock data file and verify structure:

```bash
# View mock data structure
cat src/lib/mockData.ts | head -100
```

**Verify:**
- [ ] 7 contacts defined (mixture of 'contact' and 'space' types)
- [ ] Contact 1 (Maxime L.) has initials "ML"
- [ ] Contact 2 (Unicorn) is type 'space'
- [ ] 7 spaces defined (2 pinned, 5 unpinned)
- [ ] Space 1 (Q4 Goals) is pinned and has 4 entries
- [ ] Space 7 (Future Planning) has 0 entries (edge case)
- [ ] Entries have all 5 status variants:
  - [ ] 'no-nudge' exists
  - [ ] 'nudge-scheduled' exists
  - [ ] 'nudge-sent' exists
  - [ ] 'nudge-responded' exists
  - [ ] 'entry-closed' exists

**Test Utility Functions:**

Open Node.js REPL and test:

```bash
node
```

```javascript
// In Node REPL:
const { mockSpaces, getAllSpaces, getPinnedSpaces, getSpaceStats } = require('./src/lib/mockData.ts')

// Test 1: Get all spaces (should be 7)
console.log('Total spaces:', mockSpaces.length) // Expected: 7

// Test 2: Get pinned spaces (should be 2)
console.log('Pinned spaces:', getPinnedSpaces().length) // Expected: 2

// Test 3: Get stats for first space
const space1 = mockSpaces[0]
console.log('Space 1 stats:', getSpaceStats(space1)) // Should show: { total: 4, open: X, responded: Y, closed: Z }

// Test 4: Verify space 1 is pinned
console.log('Space 1 pinned?', space1.isPinned) // Expected: true
```

**Expected Results:**
- [ ] Total spaces: 7
- [ ] Pinned spaces: 2
- [ ] Space 1 has 4 entries
- [ ] getAllSpaces() sorts pinned first
- [ ] getSpaceStats() returns correct counts

---

## 4. Tailwind Classes Verification

Test that Tailwind utility classes work correctly:

### Test 1: Spacing Classes

Open http://localhost:3000/demo and inspect any element with DevTools.

**Find element with `p-6` class:**
- [ ] Computed padding: 24px (6 * 4px = 24px) ✓

**Find element with `gap-3` class:**
- [ ] Computed gap: 12px (3 * 4px = 12px) ✓

**Find element with `mb-12` class:**
- [ ] Computed margin-bottom: 48px (12 * 4px = 48px) ✓

### Test 2: Custom Color Classes

**Find element with `bg-status-success-bg` class:**
- [ ] Computed background-color: rgb(234, 255, 244) = #eafff4 ✓

**Find element with `text-text-secondary` class:**
- [ ] Computed color: rgb(88, 88, 88) = #585858 ✓

**Find element with `border-status-warning` class:**
- [ ] Computed border-color: rgb(252, 217, 21) = #fcd915 ✓

### Test 3: Custom Border Radius

**Find element with `rounded-sm` class:**
- [ ] Computed border-radius: 2px ✓

**Find element with `rounded-lg` class:**
- [ ] Computed border-radius: 20px ✓

**Find element with `rounded-2xl` class:**
- [ ] Computed border-radius: 40px ✓

### Test 4: Custom Shadow

**Find element with `shadow-card` class:**
- [ ] Computed box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.15) ✓

### Test 5: Backdrop Blur

**Find element with `backdrop-blur` class in glassmorphism section:**
- [ ] Computed backdrop-filter: blur(6px) ✓
- [ ] Visual frosted glass effect visible ✓

---

## 5. Page Navigation & Routes

Test that all routes work:

**Working Routes:**
- [ ] http://localhost:3000 - Landing page with Tailwind test message
- [ ] http://localhost:3000/demo - Component demo page (full design tokens showcase)
- [ ] http://localhost:3000/dashboard - Placeholder page (coming in Step 5)

**API Routes (should still work from Phase 1):**
- [ ] http://localhost:3000/api/backlogs - API endpoint exists (no auth, will return 401/403)

**Archived Routes (should 404):**
- [ ] http://localhost:3000/backlog/abc - Should show 404 (archived)
- [ ] http://localhost:3000/magic/abc - Should show 404 (archived)

---

## 6. Console Errors Check

Open browser DevTools → Console tab:

**Expected:**
- [ ] No Tailwind-related errors
- [ ] No CSS compilation errors
- [ ] No import/module errors
- [ ] Warning about lockfiles is OK (Next.js workspace detection)

**Look for:**
- ❌ "Cannot find module 'tailwindcss'"
- ❌ "Unknown property: @tailwind"
- ❌ "Invalid Tailwind configuration"
- ❌ "Failed to compile"

All should be absent (no errors).

---

## 7. Mobile Responsiveness Check

Test mobile view (our 90% priority):

**In DevTools:**
1. Open DevTools (F12)
2. Click device toolbar icon (toggle responsive mode)
3. Select "iPhone SE" (375px width)
4. Navigate to /demo

**Verify:**
- [ ] Page doesn't have horizontal scroll
- [ ] Content fits within viewport width
- [ ] Cards don't overflow
- [ ] Text is readable (not too small)
- [ ] Padding/margins look appropriate for mobile
- [ ] Header section looks good on mobile
- [ ] Color boxes stack nicely

**Test other mobile sizes:**
- [ ] iPhone 14 Pro (393px) - everything fits
- [ ] Pixel 5 (393px) - everything fits

**Desktop (quick smoke test):**
- [ ] Desktop view (1280px+) - content centered, doesn't break
- [ ] No weird layout issues

---

## 8. Git Branch Status

Verify branch and commits:

```bash
# Check current branch
git branch

# Should show: * feature/phase2-foundation

# Check commits
git log --oneline -8

# Should show 8 commits:
# 1. Install and configure Tailwind CSS
# 2. Add design system color tokens
# 3. Document spacing scale
# 4. Configure typography tokens
# 5. Add border radius, shadows, effects
# 6. Create mock data structure
# 7. Create component demo page
# 8. Archive v0 demo pages
```

**Verify:**
- [ ] On `feature/phase2-foundation` branch
- [ ] 8 commits visible
- [ ] Commit messages are clear and descriptive
- [ ] No uncommitted changes (unless expected)

---

## 9. File Structure Verification

Check that files are in correct locations:

```bash
# Design tokens and config
ls -la tailwind.config.ts     # ✓ Exists
ls -la postcss.config.mjs     # ✓ Exists
ls -la src/styles/design-tokens.md  # ✓ Exists

# Mock data
ls -la src/lib/mockData.ts    # ✓ Exists

# Pages
ls -la src/pages/demo.tsx     # ✓ Exists
ls -la src/pages/dashboard/index.tsx  # ✓ Exists (new placeholder)

# Archive
ls -la archive/v0-demo/       # ✓ Directory exists
ls -la archive/v0-demo/README.md  # ✓ Exists
ls archive/v0-demo/           # Should show: dashboard.tsx, backlog-detail.tsx, magic-view.tsx
```

**Verify:**
- [ ] All files exist in correct locations
- [ ] Archive directory contains 3 .tsx files + README
- [ ] Old pages are NOT in src/pages/ anymore

---

## 10. Final Checklist

Before proceeding to Step 2:

**Design System:**
- [ ] All colors match Figma (tested side-by-side)
- [ ] Spacing values are correct (4px-based)
- [ ] Typography sizes and weights match specs
- [ ] Border radius values match Figma
- [ ] Shadows and effects look correct
- [ ] Tailwind classes compile and work

**Mock Data:**
- [ ] 7 spaces with realistic data
- [ ] All 5 entry status variants present
- [ ] Utility functions work correctly
- [ ] Edge cases covered (empty space, no email, etc.)

**Infrastructure:**
- [ ] Dev server runs without errors
- [ ] Demo page renders correctly
- [ ] No console errors
- [ ] Mobile view works well (375px+)
- [ ] All routes work as expected

**Git:**
- [ ] On feature/phase2-foundation branch
- [ ] 8 commits completed
- [ ] Archive contains old pages
- [ ] Clean working directory

---

## Issues Found?

If you find any issues during verification, document them here:

### Color Mismatches
- Issue: _____
- Expected: _____
- Actual: _____
- Fix needed: _____

### Layout Issues
- Issue: _____
- Device: _____
- Fix needed: _____

### Other Issues
- Issue: _____
- Impact: _____
- Fix needed: _____

---

## Sign-Off

Once all checks pass:

- [ ] **All design tokens verified** - Colors, spacing, typography, effects match Figma
- [ ] **Mock data structure validated** - All types and utilities work correctly
- [ ] **Demo page tested** - All sections render correctly, no errors
- [ ] **Tailwind working perfectly** - All custom classes compile and apply
- [ ] **Mobile-first verified** - Looks good on 375px+ screens
- [ ] **Ready for Step 2** - Foundation is solid, can build components on top

**Signed off by:** _______________ **Date:** _______________

---

**Next Step:** Step 2 - Atomic Components (Avatar, EntryChip, Button, StatusIndicator)
