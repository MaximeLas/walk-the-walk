# v0 to Phase 2 Transition & Cleanup Strategy

**Purpose:** Guide for managing the transition from v0 (working MVP) to Phase 2 (mobile-first Figma implementation)

**Last Updated:** 2025-10-16
**Status:** Both systems running in parallel

---

## Current State (Dual System)

### v0 System (Working MVP - Will be Deprecated)
**Purpose:** Functional app with auth, backlogs, promises, magic links

**Files:**
```
src/pages/
  ├── dashboard/index.tsx          ← v0 dashboard (inline styles, basic UI)
  ├── backlog/[id].tsx             ← v0 backlog detail
  ├── magic/[token].tsx            ← v0 magic link view
  └── index.tsx                    ← Landing/redirect page

archive/v0-demo/
  ├── dashboard.tsx                ← Backup copy (identical to src version)
  ├── backlog-detail.tsx           ← Backup copy
  └── magic-view.tsx               ← Backup copy
```

**Characteristics:**
- Inline styles (`style={{...}}`)
- Basic HTML layout
- No design system
- Fully functional backend integration
- **Used for:** Testing backend features, demo to co-founders

---

### Phase 2 System (New Mobile-First UI - In Progress)
**Purpose:** Beautiful mobile-first UI from Michelle's Figma designs

**Files:**
```
src/pages/
  └── demo.tsx                     ← Component showcase (for Michelle)

src/components/ui/                 ← New design system components
  ├── Avatar.tsx
  ├── EntryChip.tsx
  ├── ListCard.tsx
  ├── TopNav.tsx
  ├── MiddleNav.tsx
  ├── ScreenModeSwitcher.tsx
  ├── AddButton.tsx
  ├── AddOptions.tsx
  └── ModalCallToAction.tsx

tailwind.config.ts                 ← Design tokens from Figma
```

**Characteristics:**
- Tailwind CSS with custom design tokens
- Mobile-first responsive design
- Pixel-perfect match to Figma
- Components isolated and tested on `/demo`
- **Used for:** Design review, building new UI

---

## Authentication (Shared)

Both systems share authentication:

```
src/pages/
  ├── login.tsx                    ← Google OAuth login (NEW)
  └── auth/callback.tsx            ← OAuth callback handler (NEW)

src/lib/
  ├── supabaseClient.ts            ← Shared auth client
  ├── email.ts                     ← Shared email service
  └── token.ts                     ← Shared magic link tokens

src/pages/api/                     ← All backend APIs (shared by both)
```

**Why shared?** Backend functionality works - no need to rebuild it.

---

## Cleanup Strategy (Future)

### Phase 1: Build Phase 2 Screens (Current - In Progress)

**Status:** 80% complete (Steps 1-4 of 5)

**What to do:**
- Continue building Phase 2 components in `src/components/ui/`
- Test components on `/demo` page
- Get Michelle's approval
- **DO NOT touch v0 files yet**

**Parallel operation:**
- `/dashboard` → v0 dashboard (working app)
- `/demo` → Phase 2 components (design review)

---

### Phase 2: Wire Up Phase 2 Screens (After Step 5 Complete)

**Goal:** Create new pages that use Phase 2 components with v0 backend logic

**Approach: Create NEW pages alongside v0**

```
src/pages/
  ├── dashboard/index.tsx          ← v0 (keep for now)
  ├── dashboard-v2.tsx             ← NEW Phase 2 version
  ├── backlog/[id].tsx             ← v0 (keep for now)
  ├── backlog-v2/[id].tsx          ← NEW Phase 2 version
```

**Process:**
1. Create `dashboard-v2.tsx` using Phase 2 components (TopNav, MiddleNav, etc.)
2. Copy backend logic from v0 `dashboard/index.tsx`
3. Replace inline styles with Phase 2 components
4. Test at `/dashboard-v2`
5. Once working, ask user: "Ready to swap?"

**Benefits:**
- Non-destructive (v0 still works)
- Easy comparison side-by-side
- Can roll back if issues
- Clear what's old vs new

---

### Phase 3: The Great Swap (User Decision Point)

**Trigger:** User confirms Phase 2 pages look good and work correctly

**Process:**

1. **Backup v0 to archive:**
   ```bash
   # Already exists in archive/v0-demo/ but update with latest
   cp src/pages/dashboard/index.tsx archive/v0-demo/dashboard.tsx
   cp src/pages/backlog/[id].tsx archive/v0-demo/backlog-detail.tsx
   cp src/pages/magic/[token].tsx archive/v0-demo/magic-view.tsx
   ```

2. **Swap Phase 2 to primary:**
   ```bash
   # Replace v0 with v2
   mv src/pages/dashboard-v2.tsx src/pages/dashboard/index.tsx
   mv src/pages/backlog-v2/[id].tsx src/pages/backlog/[id].tsx
   # etc.
   ```

3. **Update route references:**
   - Search codebase for any hardcoded `/dashboard-v2` links
   - Replace with `/dashboard`

4. **Test everything:**
   - Auth flow
   - Create backlog
   - Add promise
   - Send nudge
   - Magic link view

5. **Commit:**
   ```
   git commit -m "Phase 2: Replace v0 UI with mobile-first Figma designs"
   ```

---

### Phase 4: Final Cleanup (After Swap)

**Only after Phase 2 is confirmed stable in production**

**Safe to delete:**
```
archive/v0-demo/                   ← Can delete (code now in git history)
src/pages/demo.tsx                 ← Component showcase (no longer needed)
```

**Keep:**
```
src/components/ui/                 ← Your design system
tailwind.config.ts                 ← Design tokens
src/lib/                           ← Backend utilities (unchanged)
src/pages/api/                     ← API routes (unchanged)
```

---

## File Naming Conventions

To avoid confusion during parallel development:

### Old (v0):
- **Pattern:** Default names, inline styles
- **Example:** `dashboard/index.tsx`, `backlog/[id].tsx`
- **Style:** `style={{...}}`

### New (Phase 2):
- **Pattern (temporary):** `-v2` suffix during development
- **Example:** `dashboard-v2.tsx`, `backlog-v2/[id].tsx`
- **Style:** Tailwind classes, design system components

### Components:
- **Pattern:** PascalCase in `src/components/ui/`
- **Example:** `TopNav.tsx`, `ListCard.tsx`
- **Style:** Tailwind with design tokens

---

## Decision Points for Future Agents

### "Should I modify v0 files?"

**NO** - Unless:
- Fixing a critical bug in production
- User explicitly requests it
- Adding shared functionality (auth, API)

**Instead:**
- Create Phase 2 version
- Keep v0 working

### "Should I delete v0 files?"

**NO** - Unless:
- Phase 2 equivalent exists AND works
- User has tested and approved
- User explicitly says "replace v0 with v2"

**Why?** Safety. Always have a working version.

### "User wants new feature - add to v0 or Phase 2?"

**Ask the user:**
- "Should I add this to the current dashboard (quick but old UI) or build it with the new Figma components (takes longer but consistent with new design)?"

**Default if urgent:** Add to v0 (it works)
**Default if can wait:** Build with Phase 2 components

---

## Testing Strategy

### v0 Testing:
```bash
npm run dev
# Navigate to /dashboard
# Test: Create backlog, add promise, send nudge
```

### Phase 2 Testing:
```bash
npm run dev
# Navigate to /demo
# Visual review: Components match Figma
# Navigate to /dashboard-v2 (when built)
# Test: Same as v0 but with new UI
```

### Both Work:
```bash
npm run dev
# Navigate to /dashboard (v0)
# Navigate to /dashboard-v2 (Phase 2)
# Compare side-by-side
# User decides which to keep
```

---

## Communication with User

### Bad:
❌ "I've replaced your dashboard with the new version"
❌ "I deleted the old files - they're in git history"
❌ "The new version is live"

### Good:
✅ "I've built a Phase 2 version at `/dashboard-v2`. Want to test it before we swap?"
✅ "Both versions work. v0 is at `/dashboard`, v2 at `/dashboard-v2`. Which should be primary?"
✅ "Ready to replace v0 with v2? I'll archive v0 first for safety."

**Key:** User decides when to swap, agent executes safely.

---

## Current Next Steps (As of 2025-10-16)

1. **Complete Phase 2 Step 5** - Build final dashboard screens with components
2. **Create dashboard-v2.tsx** - Wire up Phase 2 components with backend logic
3. **User review** - Test both v0 and v2 side-by-side
4. **User decision** - "Replace v0 with v2" or "Keep both for now"
5. **Swap (if approved)** - Follow Phase 3 above

**Current blockers:** None - both systems operational
**Can user test v0?** Yes - at `/dashboard`
**Can user test Phase 2?** Yes - components at `/demo`, full pages coming in Step 5

---

## Summary

**Philosophy:** "Gradual, non-destructive transition"

- v0 works → Keep it working
- Phase 2 builds alongside → No conflicts
- User decides when to swap → Safe transition
- Archive v0 before deleting → Always recoverable

**Never surprise the user with a replaced/deleted working feature.**
