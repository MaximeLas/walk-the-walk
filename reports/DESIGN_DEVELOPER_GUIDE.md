# Developer's Guide to Working with UX/UI Designers

> A comprehensive guide for software engineers transitioning to design-driven development

---

## Table of Contents

1. [Introduction: The Developer-Designer Partnership](#introduction)
2. [Design Fundamentals Every Developer Should Know](#design-fundamentals)
3. [Understanding Figma as a Developer](#understanding-figma)
4. [The Design-to-Code Translation Process](#design-to-code-translation)
5. [Design Systems & Component Architecture](#design-systems)
6. [Communication & Collaboration Best Practices](#communication)
7. [Your First Week: Practical Action Plan](#action-plan)
8. [Common Pitfalls & How to Avoid Them](#common-pitfalls)
9. [Resources & Further Learning](#resources)

---

## Introduction: The Developer-Designer Partnership {#introduction}

### What You're Building Together

As a developer working with a UX/UI designer, you're not just implementing screens - you're **translating design intent into functional, accessible, and maintainable code**. This partnership is about:

- **Understanding the "why"** behind design decisions
- **Communicating constraints** (technical, performance, accessibility)
- **Iterating together** to find the best solution
- **Building systems** that scale beyond individual features

### Your Role vs. Michelle's Role

| Michelle (Designer) | You (Developer) |
|-------------------|----------------|
| Defines visual language (colors, typography, spacing) | Implements design tokens as code |
| Creates user flows and interactions | Builds functional, navigable experiences |
| Designs components and their variants | Codes reusable React components with props |
| Prototypes interactions | Implements animations and state management |
| Thinks in frames and layers | Thinks in HTML/CSS/JavaScript |
| Optimizes for user experience | Optimizes for performance and accessibility |

**The overlap**: You both care about consistency, reusability, and creating delightful user experiences.

---

## Design Fundamentals Every Developer Should Know {#design-fundamentals}

### 1. Design Tokens: The Shared Language

Design tokens are the fundamental building blocks that bridge design and code. Think of them as **variables that both you and Michelle agree on**.

#### Color Tokens
Instead of using `#3B82F6` directly in your code, you define:

```css
:root {
  --color-primary: #3B82F6;
  --color-secondary: #64748B;
  --color-error: #EF4444;
  --color-success: #10B981;

  /* Semantic colors */
  --color-text-primary: #1F2937;
  --color-text-secondary: #6B7280;
  --color-background: #FFFFFF;
  --color-border: #E5E7EB;
}
```

**Why this matters**: When Michelle says "change the primary color," you update ONE variable, not 50+ hardcoded values.

#### Spacing Tokens
Most design systems use a consistent spacing scale (often based on 4px or 8px increments):

```css
:root {
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-2xl: 48px;
}
```

**In Tailwind**: `p-4` = 16px, `p-6` = 24px, `p-8` = 32px

#### Typography Tokens

```css
:root {
  --font-family-primary: 'Inter', -apple-system, sans-serif;
  --font-size-xs: 12px;
  --font-size-sm: 14px;
  --font-size-base: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 20px;
  --font-size-2xl: 24px;
  --font-size-3xl: 30px;

  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  --line-height-tight: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;
}
```

#### Other Common Tokens
- **Border radius**: `--radius-sm: 4px`, `--radius-md: 8px`, `--radius-full: 9999px`
- **Shadows**: `--shadow-sm`, `--shadow-md`, `--shadow-lg`
- **Transitions**: `--transition-fast: 150ms`, `--transition-base: 300ms`
- **Z-index**: `--z-dropdown: 1000`, `--z-modal: 2000`, `--z-tooltip: 3000`

### 2. Component Thinking

Both Figma and React use **components** - reusable building blocks that can be composed together.

#### Atomic Design Hierarchy

Think of components in layers:

```
Atoms (smallest)
└─ Button, Input, Avatar, Icon, Label
   └─ Molecules (simple combinations)
      └─ Search Bar (Input + Button + Icon)
      └─ Card Header (Avatar + Text + Icon)
         └─ Organisms (complex compositions)
            └─ Navigation Bar (Logo + Search + Menu + Avatar)
            └─ Contact Card (Avatar + Name + Status Chip + Actions)
               └─ Templates (page layouts)
                  └─ Dashboard (Nav + Sidebar + Card Grid)
                     └─ Pages (full screens)
```

**Example from Michelle's designs**:
- **Atom**: Avatar (with 3 variants: Image, Contact Initials, Space Initials)
- **Molecule**: List Card (combines Avatar + Text + Entry Chip)
- **Organism**: Pinned Section (multiple Pinned Entries + Section Header)

#### Component Variants = React Props

When Michelle creates variants in Figma (e.g., "Status=Nudge Sent"), this maps directly to React props:

```tsx
// Michelle's Figma: Entry Chip with 5 variants
// Your React code:

type EntryChipProps = {
  status: 'no-nudge' | 'nudge-scheduled' | 'nudge-sent' | 'nudge-responded' | 'entry-closed'
}

function EntryChip({ status }: EntryChipProps) {
  const styles = {
    'no-nudge': 'bg-gray-100 text-gray-600',
    'nudge-scheduled': 'bg-yellow-100 text-yellow-700',
    'nudge-sent': 'bg-blue-100 text-blue-700',
    'nudge-responded': 'bg-purple-100 text-purple-700',
    'entry-closed': 'bg-red-100 text-red-700',
  }

  return (
    <span className={`px-3 py-1 rounded-full text-sm ${styles[status]}`}>
      {status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
    </span>
  )
}
```

### 3. Responsive Design Principles

Michelle designs for **mobile-first** (your current focus), but the code needs to work across all screen sizes.

#### Breakpoints
```css
/* Mobile-first approach */
.container {
  padding: 16px; /* Mobile default */
}

@media (min-width: 768px) { /* Tablet */
  .container {
    padding: 24px;
  }
}

@media (min-width: 1024px) { /* Desktop */
  .container {
    padding: 32px;
  }
}
```

**In Tailwind**: `p-4 md:p-6 lg:p-8`

#### Flexible Layouts
Use flexbox and grid for layouts that adapt:

```css
/* Stacks on mobile, side-by-side on desktop */
.card-grid {
  display: grid;
  grid-template-columns: 1fr; /* Mobile: 1 column */
  gap: 16px;
}

@media (min-width: 768px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr); /* Tablet: 2 columns */
  }
}

@media (min-width: 1024px) {
  .card-grid {
    grid-template-columns: repeat(3, 1fr); /* Desktop: 3 columns */
  }
}
```

**In Tailwind**: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`

### 4. Visual Hierarchy & Spacing

Good design guides the user's eye through visual hierarchy:

1. **Size**: Larger elements draw attention first
2. **Weight**: Bold text is more prominent than regular
3. **Color**: High contrast stands out
4. **Spacing**: Whitespace groups related items and separates distinct sections

**Example**:
```tsx
<div className="space-y-4"> {/* Consistent vertical spacing */}
  <h1 className="text-2xl font-bold text-gray-900"> {/* Primary */}
    Your Contacts
  </h1>
  <p className="text-base text-gray-600"> {/* Secondary */}
    Manage your accountability partners
  </p>
  <div className="space-y-2"> {/* Tighter spacing for related items */}
    <ContactCard />
    <ContactCard />
  </div>
</div>
```

---

## Understanding Figma as a Developer {#understanding-figma}

### Figma Structure

```
File (Unicorn Main File)
└─ Pages
   ├─ Playground (experiments)
   ├─ Components (reusable design pieces) ← YOU START HERE
   ├─ Mobile Web V0 (actual screens) ← THEN HERE
   ├─ User Flows (navigation diagrams)
   └─ Resources (assets, documentation)
```

### Key Figma Concepts

#### 1. Frames vs. Groups
- **Frames**: Container with specific dimensions (like a `<div>` with width/height)
- **Groups**: Simple wrapper (like a `<div>` without explicit sizing)

#### 2. Auto Layout (Figma) = Flexbox (CSS)
When Michelle uses Auto Layout, it's telling you to use Flexbox:

| Figma Auto Layout | CSS Equivalent |
|------------------|----------------|
| Direction: Horizontal | `flex-direction: row` |
| Direction: Vertical | `flex-direction: column` |
| Spacing: 16 | `gap: 16px` |
| Padding: 20 | `padding: 20px` |
| Align: Top Left | `justify-content: flex-start; align-items: flex-start` |
| Align: Center Center | `justify-content: center; align-items: center` |
| Fill container | `flex: 1` or `width: 100%` |

#### 3. Components & Instances
- **Component**: The master/template (like a React component definition)
- **Instance**: A usage of that component (like `<Button />` in your JSX)
- **Variant**: Different states of the same component (like props)

#### 4. Dev Mode
When you open a Figma file in **Dev Mode**, you'll see:
- **Inspect panel**: Shows CSS values (padding, colors, fonts)
- **Code snippets**: CSS or Tailwind suggestions
- **Assets**: Exportable images/icons
- **Measurements**: Spacing between elements

### What to Look For in Figma

When inspecting a design:

1. **Component name**: Maps to React component name
2. **Dimensions**: Width/height (use `max-width` for flexibility)
3. **Spacing**: Padding (inside element) vs. Margin (outside element)
4. **Colors**: Background, text, borders
5. **Typography**: Font family, size, weight, line-height
6. **Border radius**: Rounded corners
7. **Shadows**: Box shadow for depth
8. **States**: Hover, active, disabled, loading

---

## The Design-to-Code Translation Process {#design-to-code-translation}

### Step-by-Step Workflow

#### 1. Understand the Design Intent (Before Coding)

**Ask Michelle**:
- "What problem does this solve for users?"
- "Why did you choose this layout?"
- "How should this behave on different screen sizes?"
- "Are there any animations or transitions?"

**Example**:
> Michelle shows you a "Quick Nudge" component that slides in from the right.
>
> **Bad response**: "Okay, I'll make it appear."
> **Good response**: "Should it slide in when the user takes an action, or automatically after X seconds? Should there be a backdrop/overlay? Can the user dismiss it by tapping outside?"

#### 2. Extract Design Tokens First

Before building components, extract the design system:

```bash
# Create a tokens file
touch src/styles/tokens.css
```

```css
/* src/styles/tokens.css */
:root {
  /* Colors - Extract from Michelle's Figma variables */
  --color-primary: #your-primary-color;
  --color-background: #your-bg-color;
  /* ... etc */

  /* Spacing */
  --spacing-sm: 8px;
  --spacing-md: 16px;
  /* ... etc */

  /* Typography */
  --font-family: 'Your Font', sans-serif;
  /* ... etc */
}
```

#### 3. Build Atomic Components First

Start with the smallest pieces:

```tsx
// src/components/ui/Avatar.tsx
type AvatarProps = {
  variant: 'image' | 'contact-initials' | 'space-initials'
  src?: string
  initials?: string
  size?: 'sm' | 'md' | 'lg'
}

export function Avatar({ variant, src, initials, size = 'md' }: AvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-base',
  }

  if (variant === 'image' && src) {
    return (
      <img
        src={src}
        alt=""
        className={`rounded-full object-cover ${sizeClasses[size]}`}
      />
    )
  }

  return (
    <div className={`
      rounded-full flex items-center justify-center font-medium
      ${sizeClasses[size]}
      ${variant === 'contact-initials' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}
    `}>
      {initials}
    </div>
  )
}
```

#### 4. Compose Molecules from Atoms

```tsx
// src/components/ListCard.tsx
import { Avatar } from './ui/Avatar'
import { EntryChip } from './ui/EntryChip'

type ListCardProps = {
  type: 'contact' | 'space'
  name: string
  avatar?: string
  initials: string
  status: ChipStatus
  onReach: () => void
}

export function ListCard({ type, name, avatar, initials, status, onReach }: ListCardProps) {
  return (
    <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200">
      <Avatar
        variant={avatar ? 'image' : type === 'contact' ? 'contact-initials' : 'space-initials'}
        src={avatar}
        initials={initials}
      />
      <div className="flex-1">
        <h3 className="font-medium text-gray-900">{name}</h3>
        <EntryChip status={status} />
      </div>
      <button
        onClick={onReach}
        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
      >
        Reach Out
      </button>
    </div>
  )
}
```

#### 5. Test Responsiveness

```tsx
// Test on different screen sizes
<div className="max-w-md mx-auto p-4"> {/* Mobile container */}
  <ListCard {...props} />
</div>

<div className="max-w-7xl mx-auto p-4"> {/* Desktop container */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <ListCard {...props} />
    <ListCard {...props} />
    <ListCard {...props} />
  </div>
</div>
```

#### 6. Iterate with Michelle

Deploy a preview and share with her:

```bash
git add .
git commit -m "Add ListCard component with Avatar and EntryChip"
git push
# Vercel automatically deploys preview
```

Send her the preview link: "Hey Michelle, I've implemented the List Card component. Can you review it on your phone and let me know if the spacing/colors match your design?"

### Common Translation Patterns

#### Pattern 1: Figma Padding → CSS Padding

```
Figma shows: 20px padding on all sides
Your CSS: padding: 20px
Your Tailwind: p-5 (20px = 5 * 4px)
```

#### Pattern 2: Figma Auto Layout Gap → CSS Gap

```
Figma shows: Vertical auto layout with 12px spacing
Your CSS: display: flex; flex-direction: column; gap: 12px;
Your Tailwind: flex flex-col gap-3
```

#### Pattern 3: Figma Component Variant → React Props

```
Figma: Button component with variants "Primary", "Secondary", "Danger"
Your React:
  <Button variant="primary">Save</Button>
  <Button variant="secondary">Cancel</Button>
  <Button variant="danger">Delete</Button>
```

---

## Design Systems & Component Architecture {#design-systems}

### What is a Design System?

A design system is **the single source of truth** for how your product looks and behaves. It includes:

1. **Design tokens** (colors, spacing, typography)
2. **Component library** (reusable UI pieces)
3. **Patterns** (common layouts and interactions)
4. **Guidelines** (accessibility, usage rules)

### Building Your Component Library

#### Directory Structure

```
src/
├── components/
│   ├── ui/              # Atomic components
│   │   ├── Avatar.tsx
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── EntryChip.tsx
│   │   └── Icon.tsx
│   ├── cards/           # Molecule components
│   │   ├── ListCard.tsx
│   │   └── QuickNudge.tsx
│   ├── navigation/      # Navigation components
│   │   ├── TopNav.tsx
│   │   ├── MiddleNav.tsx
│   │   └── ScreenMode.tsx
│   └── sections/        # Organism components
│       └── PinnedSection.tsx
├── styles/
│   ├── tokens.css       # Design tokens
│   └── globals.css      # Global styles
└── pages/               # Next.js pages
    └── ...
```

#### Component Documentation

For each component, consider:

```tsx
/**
 * Avatar Component
 *
 * Displays user/space avatar with three variants:
 * - image: Shows profile picture
 * - contact-initials: Shows initials with blue background
 * - space-initials: Shows initials with purple background
 *
 * @example
 * <Avatar variant="image" src="/avatar.jpg" />
 * <Avatar variant="contact-initials" initials="ML" />
 */
```

### Code Connect (Advanced)

Once you've built components, you can link them to Figma using **Code Connect**:

```tsx
// Button.figma.tsx
import { figma } from '@figma/code-connect'
import { Button } from './Button'

figma.connect(Button, 'figma-node-id-here', {
  props: {
    variant: figma.enum('Variant', {
      Primary: 'primary',
      Secondary: 'secondary',
    })
  },
  example: props => <Button variant={props.variant}>Click me</Button>
})
```

This tells the Figma MCP server: "When you see this Figma component, use my actual React component."

---

## Communication & Collaboration Best Practices {#communication}

### Setting Expectations Early

#### First Meeting Agenda

1. **Roles & Workflow** (10 min)
   - How you'll communicate (Slack? In-person?)
   - How often you'll sync (daily? weekly?)
   - How you'll share work (Vercel previews? Staging environment?)

2. **Design System Walkthrough** (20 min)
   - Michelle shows you the component library
   - You ask about colors, spacing, fonts
   - Agree on what "dev-ready" means

3. **Technical Constraints** (10 min)
   - "Animations are complex - let's keep them simple for MVP"
   - "Can we use existing libraries for X?"
   - "What's our browser/device support?"

4. **Priority & Timeline** (10 min)
   - Which screens/components are most important?
   - What's the deadline?
   - What's the MVP scope?

### Communication Tips

#### 1. Speak the Same Language

**Instead of**: "The flex-direction should be column with justify-content: space-between"
**Say**: "Should the items stack vertically with space between them?"

**Instead of**: "The z-index is too low"
**Say**: "The dropdown menu appears behind the modal - should it be on top?"

#### 2. Explain Technical Constraints

**Good example**:
> "Michelle, I love the parallax scrolling effect you designed, but it could hurt performance on older mobile devices. Can we use a simpler fade-in animation instead? Here's an example..." [shows demo]

**Bad example**:
> "That won't work, too complicated."

#### 3. Ask "Why" Before "How"

When something seems unclear:

**Good**: "Why did you choose to put the action button at the top instead of the bottom?"
**Bad**: "This layout doesn't make sense to me."

Often, there's a UX reason you're not aware of.

#### 4. Show, Don't Just Tell

Always share visual examples:
- Deploy previews on Vercel
- Record screen videos (Loom, Screen Studio)
- Take screenshots with annotations

**Example message**:
> "Hey Michelle! I've implemented the List Card component. Here's the preview link: [URL]. I noticed the spacing felt a bit tight on mobile, so I increased the padding from 12px to 16px - let me know if that works or if you want me to match the exact spec."

#### 5. Regular Check-ins

**Daily standup** (5 min):
- What you built yesterday
- What you're building today
- Any blockers

**Weekly review** (30 min):
- Demo completed features
- Get feedback
- Plan next week's work

### Giving and Receiving Feedback

#### When Michelle Gives Feedback

**Good response**:
> "Thanks! I see the colors are off - looks like I used the wrong token. I'll update to use `--color-primary` instead. Should be fixed in 10 minutes."

**Bad response**:
> "But it looks the same to me?" [defensive]

#### When You Give Feedback

**Good approach**:
> "This design looks great! One thing I want to flag: having the CTA button at the top means users might not see the important disclaimer at the bottom. Could we explore moving it below the disclaimer, or making the disclaimer more prominent?"

**Bad approach**:
> "Users won't see the disclaimer, this won't work."

---

## Your First Week: Practical Action Plan {#action-plan}

### Day 1: Foundation & Alignment

**Morning**:
- [ ] Meet with Michelle (use First Meeting Agenda above)
- [ ] Get access to Figma file and walk through it together
- [ ] Identify the design system (colors, spacing, fonts)
- [ ] Agree on which 3-5 components to build first

**Afternoon**:
- [ ] Set up design tokens file (`src/styles/tokens.css`)
- [ ] Extract colors, spacing, typography from Figma
- [ ] Set up Tailwind config to use tokens
- [ ] Create basic component structure (folders)

**End of Day**:
- [ ] Share your plan with Michelle: "Here's what I'm building this week"
- [ ] Set up daily check-in time

### Day 2-3: Build Atomic Components

**Focus**: Smallest building blocks

- [ ] Build Avatar component (3 variants)
- [ ] Build EntryChip component (5 status variants)
- [ ] Build Button component (primary, secondary variants)
- [ ] Test each component in isolation
- [ ] Deploy preview and share with Michelle

### Day 4-5: Build Molecule Components

**Focus**: Combinations of atoms

- [ ] Build ListCard component (uses Avatar + EntryChip)
- [ ] Build QuickNudge component (sliding states)
- [ ] Test on mobile, tablet, desktop
- [ ] Deploy preview and get Michelle's feedback

### Day 6-7: Refine & Document

**Focus**: Polish and prepare for next sprint

- [ ] Address Michelle's feedback
- [ ] Write component documentation
- [ ] Create a simple component showcase page
- [ ] Plan next week's components

---

## Common Pitfalls & How to Avoid Them {#common-pitfalls}

### 1. Pixel-Perfect Obsession

**Pitfall**: Spending hours trying to match every single pixel.

**Reality**: Close is often good enough. Ask Michelle her tolerance.

**Solution**: "Michelle, for spacing, should I aim for exact match or is ±2px okay?"

### 2. Ignoring Responsive Behavior

**Pitfall**: Building only for the mobile size Michelle designed.

**Reality**: Users have different screen sizes. Your code must adapt.

**Solution**: Always test on:
- Small mobile (320px)
- Standard mobile (375px)
- Large mobile (414px)
- Tablet (768px)
- Desktop (1280px+)

### 3. Hardcoding Everything

**Pitfall**: Using `#3B82F6` directly in 50 components.

**Reality**: Design changes. Colors will update.

**Solution**: Always use design tokens. Extract variables early.

### 4. Building Before Understanding

**Pitfall**: Jumping straight into coding without asking questions.

**Reality**: You might build the wrong thing.

**Solution**: Always understand the "why" before the "how". Ask Michelle about intent.

### 5. Not Communicating Constraints

**Pitfall**: Silently struggling with impossible requirements.

**Reality**: Designers appreciate honesty about what's feasible.

**Solution**: "This animation would take 2 weeks to build perfectly. Could we simplify to hit our deadline?"

### 6. Ignoring Accessibility

**Pitfall**: Matching the design but ignoring color contrast, keyboard navigation, screen readers.

**Reality**: Your app needs to work for everyone.

**Solution**:
- Check color contrast (use WebAIM contrast checker)
- Test with keyboard only (no mouse)
- Use semantic HTML (`<button>` not `<div onClick>`)
- Add ARIA labels where needed

### 7. Skipping the Design System

**Pitfall**: Building components one-off without thinking about reusability.

**Reality**: You'll duplicate code and create inconsistencies.

**Solution**: Always think: "Will I need this elsewhere? Should this be a prop or a separate component?"

### 8. Not Deploying Frequently

**Pitfall**: Working in isolation for weeks before sharing.

**Reality**: Feedback comes too late, requiring major rewrites.

**Solution**: Deploy preview builds daily. Share early and often.

---

## Resources & Further Learning {#resources}

### Essential Reading

#### Design Fundamentals
- [Refactoring UI](https://www.refactoringui.com/) - Best practices for developers doing design
- [Design Systems Handbook](https://www.designbetter.co/design-systems-handbook) - Comprehensive guide
- [Laws of UX](https://lawsofux.com/) - Key principles explained simply

#### Figma for Developers
- [Figma Dev Mode Docs](https://help.figma.com/hc/en-us/articles/15023124644247-Guide-to-Dev-Mode)
- [Figma for Developers YouTube Playlist](https://www.youtube.com/playlist?list=PLXDU_eVOJTx6zk5MDarIs0asNoZqlRG23)

#### Component Architecture
- [Atomic Design by Brad Frost](https://atomicdesign.bradfrost.com/)
- [Component-Driven Development](https://www.componentdriven.org/)

### Tools & Plugins

#### Design Token Management
- **Figma Tokens Plugin**: Sync design tokens between Figma and code
- **Style Dictionary**: Transform design tokens to multiple formats (CSS, JS, iOS, Android)

#### Accessibility
- **WebAIM Contrast Checker**: https://webaim.org/resources/contrastchecker/
- **axe DevTools**: Browser extension for accessibility testing
- **WAVE**: Web accessibility evaluation tool

#### Component Development
- **Storybook**: Build and document components in isolation
- **Chromatic**: Visual regression testing for components

### Figma MCP Resources

- [Figma MCP Server Documentation](https://developers.figma.com/docs/figma-mcp-server/)
- [Model Context Protocol Specification](https://modelcontextprotocol.io/)

### Communities

- **r/webdev** (Reddit) - General web development
- **Designer-Developer Handoff** (Discord) - Specific to design-dev collaboration
- **Figma Community** - Templates, plugins, resources

---

## Appendix: Quick Reference

### Design-to-Code Cheat Sheet

| Design Term | Code Equivalent |
|------------|-----------------|
| Frame | `<div>` with width/height |
| Auto Layout (Vertical) | `display: flex; flex-direction: column; gap: Xpx` |
| Auto Layout (Horizontal) | `display: flex; flex-direction: row; gap: Xpx` |
| Component Instance | Component usage (e.g., `<Button />`) |
| Component Variant | Props (e.g., `variant="primary"`) |
| Fill | `background-color` |
| Stroke | `border` |
| Corner Radius | `border-radius` |
| Drop Shadow | `box-shadow` |
| Opacity | `opacity` |
| Blend Mode | `mix-blend-mode` |

### Tailwind CSS Quick Reference

```
Spacing:
  p-4 = padding: 16px (all sides)
  px-4 = padding: 16px (left/right)
  py-4 = padding: 16px (top/bottom)
  m-4 = margin: 16px
  gap-4 = gap: 16px

Colors:
  bg-blue-500 = background-color: #3B82F6
  text-gray-900 = color: #111827
  border-gray-200 = border-color: #E5E7EB

Typography:
  text-sm = font-size: 14px
  text-base = font-size: 16px
  text-lg = font-size: 18px
  font-medium = font-weight: 500
  font-bold = font-weight: 700

Layout:
  flex = display: flex
  flex-col = flex-direction: column
  items-center = align-items: center
  justify-between = justify-content: space-between
  grid = display: grid
  grid-cols-3 = grid-template-columns: repeat(3, 1fr)

Responsive:
  sm: = @media (min-width: 640px)
  md: = @media (min-width: 768px)
  lg: = @media (min-width: 1024px)
  Example: text-sm md:text-base lg:text-lg
```

### Questions to Ask Michelle Checklist

**About the Design System**:
- [ ] What colors should I use for primary/secondary/error states?
- [ ] What spacing system are you using? (4px? 8px increments?)
- [ ] What fonts and font sizes?
- [ ] What's the border radius standard?
- [ ] Do you have shadow/elevation guidelines?

**About Components**:
- [ ] Which components are highest priority?
- [ ] What are all the states? (default, hover, active, disabled, loading)
- [ ] How should this behave on mobile vs. desktop?
- [ ] Are there any animations or transitions?

**About Workflow**:
- [ ] How pixel-perfect does it need to be?
- [ ] How should we handle feedback/iterations?
- [ ] What's our deployment/review process?
- [ ] How often should we sync?

**About Edge Cases**:
- [ ] What happens with very long text?
- [ ] What happens with missing data (no avatar, no name)?
- [ ] What are the loading states?
- [ ] What are the error states?

---

## Conclusion

Working with a UX/UI designer is a **partnership**. Michelle brings expertise in user experience, visual design, and user research. You bring expertise in technical implementation, performance, and accessibility.

**The key to success**:
1. **Understand the "why"** behind design decisions
2. **Communicate constraints** early and honestly
3. **Iterate together** - design and code inform each other
4. **Build systems** that scale beyond individual features
5. **Show progress often** - deploy early, deploy frequently

You're not expected to be a designer, and Michelle isn't expected to be a developer. But by learning each other's language and respecting each other's expertise, you'll build better products together.

**Remember**: Good design without good code is just pixels. Good code without good design is just functions. Together, you create experiences that users love.

---

*This guide was created for Maxime's work on WalkTheWalk with designer Michelle. Last updated: October 2025.*
