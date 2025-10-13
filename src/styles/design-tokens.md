# Design Tokens Reference

This document provides a reference for all design tokens extracted from Michelle's Figma designs. These tokens are configured in `tailwind.config.ts` and used throughout the mobile-first UI implementation.

---

## Spacing Scale

**Base Unit:** 4px

Michelle's Figma designs use a **4px-based spacing system**, which aligns perfectly with Tailwind's default spacing scale. This means we can use Tailwind's built-in spacing utilities without any custom configuration.

### Tailwind Spacing Classes

| Class | Value | Figma Usage |
|-------|-------|-------------|
| `gap-1`, `p-1`, `m-1` | 4px | Minimal gaps (icon spacing) |
| `gap-2`, `p-2`, `m-2` | 8px | Tight spacing (status dot to label) |
| `gap-2.5`, `p-2.5`, `m-2.5` | 10px | Component internal spacing |
| `gap-3`, `p-3`, `m-3` | 12px | Default gaps, chip padding |
| `gap-4`, `p-4`, `m-4` | 16px | Card padding, section spacing |
| `gap-5`, `p-5`, `m-5` | 20px | Larger gaps (nav items) |
| `gap-6`, `p-6`, `m-6` | 24px | Section padding, page margins |
| `gap-8`, `p-8`, `m-8` | 32px | Large section spacing |

### Common Spacing Patterns from Figma

**Entry Chip:**
- Padding: `px-3 py-1.5` (12px horizontal, 6px vertical)
- Height: 36px
- Min-width: 80px

**List Card:**
- Padding: `p-3` (12px all sides)
- Gap between avatar and content: `gap-3` (12px)
- Gap between entry chips: `gap-2` (8px)

**Top Nav:**
- Padding: `px-6 py-6` (24px all sides)
- Gap between search and avatar: `gap-2.5` (10px)

**Middle Nav:**
- Padding: `px-6 py-3` (24px horizontal, 12px vertical)
- Gap between tab buttons: `gap-2` (8px)

**Status Indicator:**
- Dot size: 8px (w-2 h-2)
- Gap to label: `gap-1` (4px)

### Component Sizes

Fixed sizes used in components:

| Component | Size | Tailwind Class |
|-----------|------|----------------|
| Avatar (sm) | 24px | `w-6 h-6` |
| Avatar (md) | 44px | `w-11 h-11` |
| Avatar (lg) | 64px | `w-16 h-16` |
| Button height | 44px | `h-11` |
| Entry chip height | 36px | `h-9` |
| Status dot | 8px | `w-2 h-2` |
| Add button (outer) | 68px | `w-17 h-17` |
| Add button (inner) | 42px | `w-[42px] h-[42px]` |

---

## Colors

All color tokens are defined in `tailwind.config.ts` under `theme.extend.colors`.

### Usage Examples

**Status Colors:**
```tsx
// Entry chip with "nudge scheduled" status
<div className="bg-status-warning-bg border border-status-warning">
  Nudge Scheduled
</div>

// Entry chip with "responded" status
<div className="bg-status-success-bg border border-status-success">
  Responded
</div>
```

**Text Hierarchy:**
```tsx
// Primary text (headings, labels)
<h1 className="text-text-primary">Welcome</h1>

// Secondary text (metadata)
<p className="text-text-secondary">Last updated 5 min ago</p>

// Tertiary text (placeholders)
<span className="text-text-tertiary">Enter your name...</span>
```

**Backgrounds:**
```tsx
// App background
<div className="bg-bg-app">...</div>

// Card background
<div className="bg-bg-card">...</div>

// Overlay/backdrop
<div className="bg-bg-overlay backdrop-blur">...</div>
```

---

## Typography

Typography tokens will be added in Step 1.4 (next commit).

**Preview of what's coming:**
- Font families: System fonts with Hiragino Kaku Gothic Pro and Arial fallbacks
- Font sizes: 12px (xs) to 24px (2xl)
- Font weights: 400 (normal) to 700 (bold)

---

## Border Radius

Border radius tokens will be added in Step 1.5.

**Preview of what's coming:**
- `rounded-sm`: 2px (entry chips)
- `rounded`: 8px (cards)
- `rounded-lg`: 20px (tab pills)
- `rounded-full`: Perfect circles (avatars, buttons)

---

## Shadows & Effects

Shadow and effect tokens will be added in Step 1.5.

**Preview of what's coming:**
- Card shadows for elevation
- Backdrop blur for glassmorphism effects
- Transition durations for smooth interactions

---

## Mobile-First Approach

**Our priority (90/10 rule):**
- **90% effort:** Perfect mobile web (320-767px)
- **10% effort:** Basic desktop functionality

**Responsive container pattern:**
```tsx
<div className="w-full max-w-md mx-auto min-h-screen bg-bg-app">
  {/* Mobile-optimized content */}
</div>
```

This centers a mobile-sized container (max-width: 28rem / 448px) on larger screens without custom responsive layouts.

---

## Notes

- All spacing values from Figma are multiples of 4px
- Tailwind's default spacing scale requires no customization
- Use semantic color names (e.g., `text-primary`) over arbitrary values
- The design system is additive - tokens will be added in subsequent commits

**Last Updated:** 2025-10-13 (Step 1.3)
