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

**Status Colors (from Michelle's Figma Components page):**
```tsx
// Status=No Nudge (transparent bg, black border)
<div className="bg-status-neutral-bg border border-status-neutral">
  No Nudge
</div>

// Status=Nudge Scheduled (light yellow bg, yellow border)
<div className="bg-status-warning-bg border border-status-warning">
  Nudge Scheduled
</div>

// Status=Nudge Sent (light blue bg, blue border)
<div className="bg-status-info-bg border border-status-info">
  Nudge Sent
</div>

// Status=Nudge Responded (light green bg, green border)
<div className="bg-status-success-bg border border-status-success">
  Nudge Responded
</div>

// Status=Entry Closed (light purple bg, purple border)
<div className="bg-status-error-bg border border-status-error">
  Entry Closed
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

### Font Families

**Sans Serif Stack:**
```
-apple-system, BlinkMacSystemFont, Hiragino Kaku Gothic Pro, Arial, sans-serif
```

This font stack provides:
- Native system fonts on Apple devices (-apple-system, BlinkMacSystemFont)
- Hiragino Kaku Gothic Pro (used in Figma designs)
- Arial as universal fallback
- Generic sans-serif as final fallback

**Usage:**
```tsx
// Applied by default to all text
<p className="font-sans">This uses the system font stack</p>
```

### Font Sizes

| Class | Size | Figma Usage |
|-------|------|-------------|
| `text-xs` | 12px | Entry chips, metadata, timestamps, small labels |
| `text-sm` | 14px | Tab labels, secondary buttons, captions |
| `text-base` | 16px | Body text, search placeholder, form inputs |
| `text-lg` | 18px | Card titles, list item names, prominent text |
| `text-xl` | 20px | Section headers, modal titles |
| `text-2xl` | 24px | Page titles, main headings |

**Examples:**
```tsx
// Page title
<h1 className="text-2xl font-bold">Home</h1>

// Card title
<h2 className="text-lg font-semibold">Maxime L.</h2>

// Metadata
<span className="text-xs text-text-secondary">1 min. ago</span>

// Entry chip
<div className="text-xs">App Review</div>
```

### Font Weights

| Class | Weight | Figma Font | Usage |
|-------|--------|------------|-------|
| `font-normal` | 400 | Arial Regular | Body text, paragraphs, descriptions |
| `font-medium` | 500 | Hiragino W3 | Slightly emphasized text |
| `font-semibold` | 600 | Hiragino W6 | Section headers, card titles |
| `font-bold` | 700 | Arial Bold | Main headings, primary emphasis |

**Examples:**
```tsx
// Main heading
<h1 className="font-bold">WalkTheWalk</h1>

// Section header
<h2 className="font-semibold">Pinned</h2>

// Card title
<h3 className="font-semibold">Contact Name</h3>

// Body text
<p className="font-normal">Your accountability companion</p>
```

### Common Typography Patterns

**List Card Name:**
```tsx
<h3 className="text-lg font-semibold text-text-primary">Maxime L.</h3>
```

**Metadata/Timestamp:**
```tsx
<span className="text-xs font-normal text-text-secondary">1 min. ago</span>
```

**Entry Chip Label:**
```tsx
<span className="text-xs font-normal text-text-primary">App Review</span>
```

**Tab Label (Active):**
```tsx
<span className="text-sm font-bold text-text-primary">All</span>
```

**Tab Label (Inactive):**
```tsx
<span className="text-sm font-bold text-text-secondary">Contacts</span>
```

---

## Border Radius

Michelle's designs use consistent border radius values for different component types:

| Class | Value | Figma Usage |
|-------|-------|-------------|
| `rounded-sm` | 2px | Entry chips (sharp, subtle rounding) |
| `rounded` | 8px | Cards, general components |
| `rounded-lg` | 20px | Tab pills, larger rounded elements |
| `rounded-xl` | 36px | Top nav bottom corners |
| `rounded-2xl` | 40px | Circular buttons, search bar |
| `rounded-full` | 9999px | Avatars, status dots (perfect circles) |

**Examples:**
```tsx
// Entry chip
<div className="rounded-sm">No Nudge</div>

// Card
<div className="rounded shadow-card">...</div>

// Tab button
<button className="rounded-lg">All</button>

// Avatar
<img className="rounded-full" src="..." />

// Top navigation (rounded bottom corners)
<nav className="rounded-b-xl">...</nav>
```

---

## Shadows & Effects

### Box Shadows

Used to create visual hierarchy and depth:

| Class | Value | Usage |
|-------|-------|-------|
| `shadow-card` | 0px 4px 16px rgba(0,0,0,0.15) | Cards, elevated elements |
| `shadow-sm` | 0px 2px 8px rgba(0,0,0,0.1) | Subtle elevation, dropdowns |

**Examples:**
```tsx
// List card with elevation
<div className="bg-bg-card rounded shadow-card">
  <h3>Maxime L.</h3>
</div>

// Add button with shadow
<button className="shadow-card rounded-full">+</button>
```

### Backdrop Blur (Glassmorphism)

Creates frosted glass effect seen in Michelle's designs:

| Class | Value | Usage |
|-------|-------|-------|
| `backdrop-blur` | 6px | Cards, navigation, overlays |

**Examples:**
```tsx
// Glassmorphism card (from Figma)
<div className="backdrop-blur bg-bg-overlay rounded shadow-card">
  {/* Content */}
</div>

// Top navigation with blur
<nav className="backdrop-blur bg-primary-dark/90">
  {/* Nav content */}
</nav>
```

### Transitions

Smooth animations for interactive elements:

| Class | Duration | Usage |
|-------|----------|-------|
| `duration-150` (default) | 150ms | Hover states, focus rings, color changes |
| `duration-300` | 300ms | Modal open/close, drawer animations |

**Examples:**
```tsx
// Button with hover transition
<button className="transition-colors duration-150 hover:bg-indigo-700">
  Sign In
</button>

// Modal with slide animation
<div className="transition-transform duration-300 ease-out">
  {/* Modal content */}
</div>
```

### Common Effect Patterns

**Elevated Card (List Card):**
```tsx
<div className="bg-bg-card backdrop-blur rounded shadow-card">
  {/* Card content */}
</div>
```

**Glassmorphism Add Button:**
```tsx
<button className="
  bg-bg-overlay backdrop-blur
  rounded-full shadow-card
  transition-transform duration-150
  hover:scale-105
">
  +
</button>
```

**Interactive Tab:**
```tsx
<button className="
  rounded-lg
  transition-colors duration-150
  hover:bg-gray-100
  active:bg-gray-200
">
  All
</button>
```

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
- All design tokens from Michelle's Figma designs are now configured
- Mock data and component demo page coming in next commits

**Last Updated:** 2025-10-13 (Step 1.5 - Design tokens complete)
