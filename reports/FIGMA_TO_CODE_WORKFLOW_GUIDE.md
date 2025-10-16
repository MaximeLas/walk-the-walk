# Figma to Code Workflow Guide
## A Comprehensive Framework for Design-to-Code Translation Using Figma MCP Server

**Last Updated:** January 2025
**Target Audience:** Developers, AI-assisted development teams, Design-to-code practitioners

---

## Table of Contents

1. [Introduction](#introduction)
2. [Understanding the Figma MCP Server](#understanding-the-figma-mcp-server)
3. [Atomic Design Methodology](#atomic-design-methodology)
4. [Pre-Implementation: Preparing Figma Files](#pre-implementation-preparing-figma-files)
5. [The Workflow: Bottom-Up Implementation](#the-workflow-bottom-up-implementation)
6. [Figma MCP Tools Deep Dive](#figma-mcp-tools-deep-dive)
7. [Best Practices and Prompting Strategies](#best-practices-and-prompting-strategies)
8. [Common Pitfalls and Solutions](#common-pitfalls-and-solutions)
9. [Quality Assurance Checklist](#quality-assurance-checklist)
10. [Advanced Tips](#advanced-tips)

---

## Introduction

### The Challenge

Automated Figma-to-code translation often produces underwhelming results that differ significantly from original designs. This happens because:

- **Lack of systematic approach**: Attempting to convert entire screens at once overwhelms AI agents
- **Missing context**: AI doesn't understand design system relationships and token usage
- **Poor file organization**: Unstructured Figma files lead to misinterpretation
- **Insufficient guidance**: Generic prompts produce generic, inaccurate code

### The Solution

This guide provides a **systematic, bottom-up workflow** that:

1. Structures your Figma files using atomic design principles
2. Leverages Figma MCP server tools effectively
3. Builds components incrementally from foundational elements
4. Maintains design fidelity through verified iteration
5. Creates reusable, maintainable code that matches designs pixel-perfectly

---

## Understanding the Figma MCP Server

### What is Figma MCP?

The **Model Context Protocol (MCP) server** for Figma is a bridge that enables AI coding assistants (like Claude Code) to understand Figma designs semantically by providing rich, structured context about your designs.

### Requirements

- **Figma Plan**: Dev or Full seat on Professional, Organization, or Enterprise plan
- **Figma Desktop App**: Required for local MCP server
- **Compatible IDE**: Claude Code, VS Code, Cursor, or other MCP-compatible clients

### Setup Options

**Option 1: Local MCP Server (Recommended)**
```bash
# Enable in Figma Desktop: Preferences → Enable local MCP server
# Add to Claude Code:
claude mcp add --transport sse figma-dev-mode-mcp-server http://127.0.0.1:3845/sse

# Verify connection:
claude mcp list
```

**Option 2: Remote MCP Server**
```bash
claude mcp add --transport http figma https://mcp.figma.com/mcp
```

### Core Capabilities

The Figma MCP server provides:

1. **Structured design context**: Component hierarchy, variables, styles, layout data
2. **Visual screenshots**: Layout reference for pixel-perfect implementation
3. **Design tokens**: Direct access to variables and systematic values
4. **Code Connect mapping**: Links between Figma nodes and existing code components

---

## Atomic Design Methodology

### Overview

**Atomic Design** is a methodology created by Brad Frost for creating design systems. It structures interfaces as hierarchical building blocks, from smallest to largest.

### The Five Levels

```
Atoms → Molecules → Organisms → Templates → Pages
```

#### 1. Atoms

**Definition**: The smallest, indivisible UI elements
**Examples**: Buttons, inputs, labels, icons, typography, colors
**Characteristics**:
- Cannot be broken down further without losing functionality
- Highly reusable
- Map directly to design tokens/variables
- Foundation of your design system

**Figma Organization**:
```
📁 Design System
  📁 Atoms
    📁 Buttons
      • Primary Button
      • Secondary Button
      • Text Button
    📁 Inputs
      • Text Input
      • Number Input
      • Date Input
    📁 Typography
      • Heading 1
      • Heading 2
      • Body Text
      • Caption
    📁 Colors (Variables)
    📁 Spacing (Variables)
    📁 Icons
```

#### 2. Molecules

**Definition**: Simple groups of atoms functioning together as a unit
**Examples**: Search form (label + input + button), card header (avatar + name + timestamp)
**Characteristics**:
- Adhere to "single responsibility principle"
- Combine 2-4 atoms typically
- First level of meaningful composition
- Still highly reusable

**Figma Organization**:
```
📁 Design System
  📁 Molecules
    📁 Forms
      • Search Box (Label + Input + Button)
      • Login Form Field (Label + Input + Error Text)
    📁 Cards
      • Card Header (Avatar + Title + Subtitle)
      • Stat Display (Icon + Label + Value)
    📁 Navigation
      • Nav Item (Icon + Label + Badge)
      • Breadcrumb Item (Icon + Text + Divider)
```

#### 3. Organisms

**Definition**: Complex components combining molecules and/or atoms into distinct interface sections
**Examples**: Header with logo + navigation + search + user menu, product card, data table
**Characteristics**:
- Form complete, standalone interface sections
- Can contain similar or different molecule types
- Context-specific (less reusable than molecules)
- Represent major UI patterns

**Figma Organization**:
```
📁 Design System
  📁 Organisms
    📁 Headers
      • Site Header (Logo + Nav + Search + User Menu)
      • Dashboard Header (Title + Actions + Breadcrumbs)
    📁 Cards
      • Product Card (Image + Title + Price + CTA)
      • User Profile Card (Avatar + Bio + Stats + Actions)
    📁 Tables
      • Data Table (Header + Rows + Pagination)
```

#### 4. Templates

**Definition**: Page-level layouts demonstrating content structure
**Examples**: Dashboard template, article template, settings page template
**Characteristics**:
- Show how organisms work together
- Focus on layout and content structure
- Use placeholder/lorem ipsum content
- Define responsive behavior

**Figma Organization**:
```
📁 Templates
  • Dashboard Template
  • Article Template
  • Settings Page Template
  • Checkout Flow Template
```

#### 5. Pages

**Definition**: Specific instances of templates with real, representative content
**Examples**: Dashboard with actual user data, article with real text and images
**Characteristics**:
- Test the effectiveness of the design system
- Demonstrate edge cases and variations
- Show content adaptability (long names, missing images, etc.)
- Final, production-ready designs

**Figma Organization**:
```
📁 Pages
  📁 Dashboard
    • Dashboard - Empty State
    • Dashboard - With Data
    • Dashboard - Error State
  📁 Articles
    • Article - Long Title
    • Article - No Image
    • Article - Standard
```

### Why This Matters for Code Translation

1. **Incremental Complexity**: Build simple things first, compose them into complex things
2. **Reusability**: Code atoms once, use everywhere
3. **Consistency**: Design system ensures visual and functional consistency
4. **Maintainability**: Changes to atoms cascade through the system
5. **AI Comprehension**: Smaller, focused components are easier for AI to translate accurately

---

## Pre-Implementation: Preparing Figma Files

### Critical Setup Steps

Before translating any design to code, your Figma files MUST be properly prepared. This is the #1 reason for poor automated translation results.

#### 1. File Organization

**Create a Clear Hierarchy**:
```
📄 [Project Name] Design System
  📑 Cover (Overview + Status)
  📑 Variables & Tokens
  📑 Atoms
  📑 Molecules
  📑 Organisms
  📑 Templates
  📑 Pages - Ready for Dev
  📑 Pages - Work in Progress
  📑 Archive
```

**Best Practices**:
- Use consistent naming conventions (e.g., `Component/Variant/State`)
- Separate "ready for dev" from "work in progress"
- Archive old iterations instead of deleting
- Add cover page with documentation

#### 2. Component Setup

**Create Proper Components**:
- Convert all reusable elements to Figma components
- Use component variants for different states (hover, active, disabled, error)
- Set up component properties for dynamic content
- Establish clear naming: `Button/Primary/Default`, `Button/Primary/Hover`

**Component Checklist**:
- [ ] All reusable elements are components
- [ ] Variants are used for states and variations
- [ ] Component names follow naming convention
- [ ] Component descriptions are added
- [ ] Components are published to library (if applicable)

#### 3. Variables and Styles

**Set Up Design Tokens**:
```
Variables:
├── Colors
│   ├── Primitives (brand/red/500)
│   └── Semantic (primary/button, error/text)
├── Spacing
│   ├── xs (4px)
│   ├── sm (8px)
│   ├── md (16px)
│   └── ...
├── Typography
│   ├── Font Families
│   ├── Font Sizes
│   └── Line Heights
└── Effects
    ├── Shadows
    └── Border Radius
```

**Critical Rules**:
- Use variables instead of hard-coded values
- Establish semantic naming (what it is, not what it looks like)
- Create primitive + semantic token layers
- Document token usage in descriptions

#### 4. Auto Layout

**Enable Auto Layout Everywhere**:
- All containers should use Auto Layout
- Set proper spacing between elements
- Configure responsive behavior (hug, fill, fixed)
- Test responsiveness by resizing frames

**Auto Layout Benefits**:
- AI understands spacing relationships
- Generates flexbox/grid code automatically
- Responsive behavior is preserved
- Less manual CSS tweaking required

#### 5. Constraints and Responsiveness

**Define Responsive Behavior**:
- Set constraints for elements (left/right/center, top/bottom/scale)
- Create responsive variants (mobile, tablet, desktop)
- Test all breakpoints
- Document responsive rules

#### 6. Annotations and Documentation

**Add Context for Developers**:
- Use Figma's annotation tools to explain interactions
- Add comments for complex behaviors
- Document edge cases (empty states, errors, loading)
- Specify any animations or transitions
- Note accessibility requirements

**Annotation Examples**:
- "This button should be disabled until form is valid"
- "Show loading spinner while data fetches"
- "Truncate title after 2 lines with ellipsis"
- "Focus state should have 2px outline for accessibility"

---

## The Workflow: Bottom-Up Implementation

### Overview

The key to successful Figma-to-code translation is **building from the bottom up**, following the atomic design hierarchy.

### Phase 1: Foundation (Atoms)

**Goal**: Establish design tokens and atomic components

#### Step 1.1: Extract Design Tokens

**Workflow**:
```
1. Open Figma file
2. Navigate to Variables & Tokens page
3. Select the entire variables section
4. Prompt Claude Code:
   "Extract all design tokens (colors, spacing, typography) from this Figma selection
    and create TypeScript/CSS variable definitions that match our design system"
```

**Expected Output**:
- `tokens.ts` or `variables.css` with all design tokens
- Properly structured with primitive and semantic layers
- Type-safe (if using TypeScript)

**Verification**:
```typescript
// ✅ Good Output
export const colors = {
  primitives: {
    brand: {
      500: '#3B82F6',
      600: '#2563EB',
    },
  },
  semantic: {
    primary: {
      button: 'var(--color-brand-500)',
      buttonHover: 'var(--color-brand-600)',
    },
  },
};

// ❌ Bad Output
const blue = '#3B82F6';
const darkBlue = '#2563EB';
```

#### Step 1.2: Implement Atomic Components

**Workflow** (Repeat for each atom type):

```
1. Select a single atomic component in Figma (e.g., Primary Button)
2. Use Figma MCP to get code:

   Prompt:
   "Generate a React component for this button using our design tokens.
    Include all variants (default, hover, disabled, loading).
    Use TypeScript and Tailwind CSS.
    Ensure it's accessible (ARIA labels, keyboard navigation)."

3. Review generated code
4. Test component in isolation
5. Verify against Figma design visually
6. Iterate if needed
```

**Best Practices**:
- Implement ONE atom at a time
- Test each atom before moving to next
- Create Storybook stories for each variant
- Run visual regression tests

**Atom Implementation Order**:
```
1. Typography components (Heading, Body, Caption, etc.)
2. Color/theme system
3. Spacing utilities
4. Icons
5. Basic inputs (Button, Input, Checkbox, Radio, etc.)
6. Feedback elements (Badge, Tag, Tooltip, etc.)
```

#### Step 1.3: Create Design System Documentation

**After atoms are complete**:
- Document each component with usage examples
- Create component preview page (Storybook/component library)
- Set up visual regression testing
- Get design team approval

### Phase 2: Composition (Molecules)

**Goal**: Combine atoms into functional units

#### Step 2.1: Identify Molecules

**In Figma**:
- Navigate to Molecules section
- Review which molecules are most commonly used
- Prioritize based on frequency and dependencies

#### Step 2.2: Implement Molecules

**Workflow**:
```
1. Select molecule component in Figma (e.g., Search Box)
2. Identify constituent atoms (Label + Input + Button)
3. Prompt Claude Code:

   "Generate a SearchBox molecule component using our existing atomic components:
    - Label from '@/components/atoms/Typography'
    - Input from '@/components/atoms/Input'
    - Button from '@/components/atoms/Button'

    Match the Figma design exactly, including spacing and layout.
    Use our design tokens for all styling."

4. Review that molecule REUSES atoms (not reimplementing them)
5. Test molecule with different content
6. Verify responsive behavior
```

**Critical Rule**: **Molecules MUST use your implemented atoms, not recreate them**

**Verification Checklist**:
- [ ] Imports existing atom components
- [ ] Uses design tokens consistently
- [ ] Matches Figma spacing/layout exactly
- [ ] Responsive behavior works
- [ ] All variants implemented
- [ ] Accessible

### Phase 3: Sections (Organisms)

**Goal**: Build complete interface sections

#### Step 3.1: Organism Implementation Strategy

**Workflow**:
```
1. Select organism in Figma (e.g., Site Header)
2. Identify all constituent molecules and atoms
3. Check if all dependencies are already implemented
4. Prompt Claude Code:

   "Generate a SiteHeader organism using our existing components:
    - Logo (atom)
    - NavigationMenu (molecule)
    - SearchBox (molecule)
    - UserMenu (molecule)

    Match the Figma design's layout, spacing, and responsive behavior.
    Implement mobile menu collapse at breakpoint 768px.
    Use our design tokens throughout."

5. Review component reuse
6. Test on different screen sizes
7. Verify interactions (dropdowns, mobile menu, etc.)
8. Check accessibility (keyboard nav, screen reader)
```

**Common Organism Patterns**:
- Headers/Navigation
- Footers
- Cards (Product, User, Article, etc.)
- Forms (Multi-field with validation)
- Data Tables
- Sidebars

### Phase 4: Layouts (Templates)

**Goal**: Create page-level layout structures

#### Step 4.1: Template Implementation

**Workflow**:
```
1. Select template in Figma (e.g., Dashboard Template)
2. Identify layout structure (sidebar + header + main + footer)
3. Identify which organisms fit where
4. Prompt Claude Code:

   "Create a DashboardLayout template component that:
    - Uses our SiteHeader organism
    - Uses our Sidebar organism
    - Provides a main content area
    - Implements responsive behavior (collapsible sidebar on mobile)
    - Uses our spacing tokens
    - Matches the Figma template layout exactly"

5. Implement layout logic (flex/grid)
6. Test with placeholder content
7. Verify responsive breakpoints
```

**Template Best Practices**:
- Templates should be flexible containers
- Accept children components
- Handle routing/navigation if needed
- Implement responsive layout shifts

### Phase 5: Complete Pages

**Goal**: Build production-ready pages with real content

#### Step 5.1: Page Implementation

**Workflow**:
```
1. Select complete page in Figma (e.g., Dashboard - With Data)
2. Identify template being used
3. Identify content-specific organisms
4. Prompt Claude Code:

   "Create a Dashboard page component that:
    - Uses the DashboardLayout template
    - Populates it with:
      • StatisticsGrid organism (top)
      • RecentActivityTable organism (middle)
      • QuickActions organism (right sidebar)
    - Integrates with our data fetching (React Query)
    - Handles loading, error, and empty states
    - Matches the Figma design exactly"

5. Implement data integration
6. Add state management
7. Implement error handling
8. Test with various data scenarios
```

**Page-Level Concerns**:
- Data fetching/API integration
- Loading states
- Error handling
- Empty states
- Authentication/authorization
- SEO (meta tags, titles)
- Analytics tracking

---

## Figma MCP Tools Deep Dive

### Tool 1: `get_code`

**Purpose**: Generate code for selected Figma node(s)

**Default Behavior**:
- Returns React + Tailwind CSS code
- Includes inline styles matching Figma design
- Attempts to structure component hierarchy

**How to Use**:
```
# In Figma: Select a frame, component, or element

# In Claude Code:
"Generate React + TypeScript code for the selected Figma element.
 Use our design tokens from '@/styles/tokens'.
 Export as a reusable component."
```

**Customization Options**:
```
# Different framework:
"Generate Vue 3 component for this Figma selection using our design system"

# Different styling approach:
"Generate React component using CSS Modules instead of Tailwind"

# Specific component library:
"Generate code using Material-UI components where applicable"

# iOS/Mobile:
"Generate SwiftUI code for this design"
```

**When to Use**:
- Initial component generation
- Getting structure for complex layouts
- Understanding Figma's interpretation of design

**When NOT to Use**:
- Very large/complex multi-frame designs (use get_metadata first)
- When output is truncated (use get_metadata + selective get_code)

### Tool 2: `get_metadata`

**Purpose**: Get high-level structure without full styling

**Returns**: XML representation with:
- Layer IDs
- Layer names
- Layer types (Frame, Text, Rectangle, etc.)
- Positions (x, y)
- Sizes (width, height)

**How to Use**:
```
# For large/complex designs:

1. First, get the structure:
   "Use get_metadata to show me the structure of this entire page"

2. Identify specific nodes:
   "From the metadata, I can see the main content area is node ID 123:456"

3. Get code for specific nodes:
   "Now use get_code on node 123:456 to generate just the main content area"
```

**Strategic Use**:
```
Problem: Running get_code on entire dashboard page returns truncated output

Solution:
1. get_metadata on entire page → See structure
2. Identify sections: Header (1:2), Sidebar (1:3), Main (1:4)
3. get_code on 1:2 → Generate header
4. get_code on 1:3 → Generate sidebar
5. get_code on 1:4 → Generate main content
6. Compose them manually
```

**When to Use**:
- Designs larger than ~50 elements
- When get_code returns truncated output
- To understand component hierarchy before generation
- For planning implementation strategy

### Tool 3: `get_screenshot`

**Purpose**: Capture visual screenshot for layout reference

**How to Use**:
```
"Take a screenshot of this Figma selection to use as visual reference
 while implementing the component"
```

**Use Cases**:
- Visual comparison during development
- Catching layout subtleties (spacing, alignment)
- Reference for CSS pixel-pushing
- Visual regression testing baseline

**Best Practice**:
- Keep enabled by default (helps with layout fidelity)
- Use for before/after comparisons
- Save screenshots for documentation

**When to Disable**:
- Concerned about token limits
- Working with very large designs
- Metadata/code is sufficient

### Tool 4: `get_variable_defs`

**Purpose**: Extract design tokens and variables

**Returns**:
- Variable names
- Variable values
- Variable types (color, spacing, number, string, etc.)

**How to Use**:
```
"Use get_variable_defs to extract all color tokens from this design"

"Get all spacing variables defined in this Figma file"

"Extract typography variables (font families, sizes, line heights)"
```

**Strategic Use**:
```
1. At project start: Extract ALL variables
2. Generate token files (tokens.ts, variables.css)
3. Set up token infrastructure
4. Reference in all component prompts: "Use our design tokens from @/styles/tokens"
```

### Tool 5: `get_code_connect_map`

**Purpose**: Map Figma nodes to existing code components

**Returns**: `{ [nodeId]: { codeConnectSrc, codeConnectName } }`

**How to Use**:
```
"Show me the code_connect_map for this design to see which components
 already exist in our codebase"
```

**Use Cases**:
- Identifying reusable components before coding
- Avoiding duplicate implementations
- Understanding component library coverage
- Planning implementation strategy

**Example Output**:
```json
{
  "1:234": {
    "codeConnectSrc": "src/components/Button.tsx",
    "codeConnectName": "Button"
  },
  "1:235": {
    "codeConnectSrc": "src/components/Input.tsx",
    "codeConnectName": "Input"
  }
}
```

### Tool 6: `create_design_system_rules`

**Purpose**: Generate design system guidelines for AI agents

**How to Use**:
```
"Use create_design_system_rules to generate a rules file that helps
 AI agents understand our design system and coding conventions"
```

**What It Does**:
- Analyzes your Figma design system
- Generates documentation/rules file
- Helps AI agents make design-aware code decisions

**When to Use**:
- At project start (one-time setup)
- After major design system updates
- When onboarding new AI agents/developers

---

## Best Practices and Prompting Strategies

### Effective Prompting Principles

#### 1. Be Specific and Contextual

**❌ Bad Prompt**:
```
"Generate code for this"
```

**✅ Good Prompt**:
```
"Generate a React TypeScript component for this Primary Button.

 Requirements:
 - Use our design tokens from '@/styles/tokens'
 - Include variants: default, hover, disabled, loading
 - Implement with Tailwind CSS
 - Ensure WCAG 2.1 AA accessibility
 - Add TypeScript prop types
 - Export as named export

 Match the Figma design exactly, including:
 - Border radius (8px)
 - Padding (12px horizontal, 8px vertical)
 - Typography (font-medium, text-sm)
 - Hover state (darker background, no underline)"
```

#### 2. Reference Existing Code

**❌ Bad Prompt**:
```
"Create a search form"
```

**✅ Good Prompt**:
```
"Create a SearchForm molecule component using our existing atoms:

 Import and use:
 - Label from '@/components/atoms/Typography/Label'
 - Input from '@/components/atoms/Input'
 - Button from '@/components/atoms/Button'

 Compose them according to the Figma design with proper spacing.
 Do NOT recreate these components - import and use them."
```

#### 3. Specify Technical Stack

**❌ Bad Prompt**:
```
"Turn this into code"
```

**✅ Good Prompt**:
```
"Generate code for this component using our tech stack:

 - Framework: Next.js 14 (App Router)
 - Language: TypeScript
 - Styling: Tailwind CSS v3
 - State: React hooks (useState, useEffect)
 - Forms: React Hook Form
 - Validation: Zod

 Follow our project conventions in CLAUDE.md"
```

#### 4. Request Verification Steps

**✅ Great Prompt**:
```
"Generate a ProductCard component from this Figma selection.

 After generation:
 1. Compare spacing against Figma (use get_screenshot)
 2. Verify all design tokens are used (no hard-coded values)
 3. Test responsive behavior at 320px, 768px, 1024px
 4. Confirm accessibility (keyboard nav, screen reader)
 5. List any differences from Figma design"
```

### Iterative Refinement Strategy

**Workflow**:
```
1. Generate initial code
2. Review and identify issues
3. Refine with specific feedback
4. Repeat until pixel-perfect
```

**Example Iteration**:

**First Generation**:
```
"Generate a UserCard component from this Figma selection"
```

**Review**: Spacing is off, colors don't match, missing hover state

**Refinement**:
```
"The UserCard is close but needs adjustments:

1. Avatar spacing: Should be 16px (spacing.md) not 12px
2. Background color: Should use tokens.colors.surface.card not hard-coded white
3. Missing hover state: Add subtle shadow and background change on hover
4. Typography: Name should be text-lg font-semibold, not text-base

Please update the component addressing these issues."
```

**Key Principle**: Be specific about what's wrong and what the correct value should be (reference Figma)

### Verification Prompts

After component generation, always verify:

**Visual Verification**:
```
"Compare the generated component against the Figma screenshot.
 List any visual differences in spacing, colors, typography, or layout."
```

**Token Verification**:
```
"Review the generated code and list any hard-coded values
 that should use design tokens instead."
```

**Accessibility Verification**:
```
"Audit this component for accessibility:
 - Keyboard navigation
 - Screen reader support
 - Color contrast (WCAG 2.1 AA)
 - Focus indicators
 - ARIA attributes"
```

**Responsive Verification**:
```
"Test this component at breakpoints 320px, 768px, 1024px.
 Verify it matches Figma's responsive behavior."
```

---

## Common Pitfalls and Solutions

### Pitfall 1: Attempting to Convert Entire Screens at Once

**Problem**:
- Overwhelming context for AI
- Generates monolithic, non-reusable code
- Poor component structure
- Doesn't match design accurately

**Solution**:
- Follow atomic design bottom-up approach
- Break screen into organisms → molecules → atoms
- Generate smallest units first
- Compose into larger structures

**Example**:
```
❌ Bad: "Generate code for this entire dashboard page"

✅ Good:
1. "Generate code for StatCard atom"
2. "Generate code for StatsGrid molecule using StatCard"
3. "Generate code for DashboardHeader organism"
4. "Generate code for Dashboard page using all components"
```

### Pitfall 2: Poor Figma File Organization

**Problem**:
- AI can't distinguish ready vs. in-progress designs
- Unclear component hierarchy
- Inconsistent naming
- Missing variants/states

**Solution**:
- Organize files clearly (see [Pre-Implementation](#pre-implementation-preparing-figma-files))
- Use consistent naming conventions
- Separate ready-for-dev from WIP
- Add annotations and documentation

### Pitfall 3: Not Using Design Tokens

**Problem**:
- Hard-coded colors, spacing, fonts
- Inconsistent styling
- Difficult to maintain
- Design system violations

**Solution**:
- Extract all tokens FIRST (Step 1.1)
- Always reference tokens in prompts
- Verify no hard-coded values in generated code
- Set up linting rules to catch violations

**Verification**:
```typescript
// ❌ Bad - Hard-coded values
<button className="bg-[#3B82F6] px-[16px] py-[8px]">

// ✅ Good - Design tokens
<button className="bg-primary-500 px-spacing-md py-spacing-sm">
```

### Pitfall 4: Ignoring Component Variants and States

**Problem**:
- Only default state implemented
- Missing hover, active, disabled, error, loading states
- Leads to inconsistent UX

**Solution**:
- Always request ALL variants in prompts
- Check Figma for all defined states
- Test each state during verification
- Create Storybook stories for all variants

**Prompt Template**:
```
"Generate [Component] including ALL variants and states defined in Figma:
 - Default
 - Hover
 - Active/Pressed
 - Focused (keyboard)
 - Disabled
 - Loading (if applicable)
 - Error (if applicable)
 - Success (if applicable)"
```

### Pitfall 5: Skipping Responsive Behavior

**Problem**:
- Components look perfect on desktop, broken on mobile
- Missing breakpoint definitions
- Hard-coded widths

**Solution**:
- Review Figma's responsive variants
- Specify breakpoints in prompts
- Test at multiple screen sizes
- Use responsive utilities (Tailwind's `sm:`, `md:`, `lg:`)

**Prompt Template**:
```
"Generate responsive [Component] matching Figma's behavior:
 - Mobile (< 768px): Stack vertically, full-width
 - Tablet (768px - 1024px): 2-column grid
 - Desktop (> 1024px): 3-column grid

 Use Tailwind responsive classes."
```

### Pitfall 6: Not Verifying Against Figma

**Problem**:
- Generated code looks "close enough"
- Subtle spacing/sizing differences compound
- Drift from design over time

**Solution**:
- Always use `get_screenshot` for visual reference
- Pixel-peep spacing, sizing, colors
- Compare side-by-side
- Iterate until exact match

**Verification Workflow**:
```
1. Generate component
2. Render in browser
3. Take screenshot of rendered component
4. Open Figma design
5. Overlay screenshots (or side-by-side compare)
6. Note differences
7. Refine and iterate
```

### Pitfall 7: Recreating Components Instead of Reusing

**Problem**:
- Molecules/organisms reimplement atoms instead of importing
- Duplicated code
- Inconsistencies across components
- Maintenance nightmare

**Solution**:
- Explicitly state "use existing components" in prompts
- Verify imports in generated code
- Reject code that reimplements existing components
- Build dependency awareness

**Example**:
```typescript
// ❌ Bad - Reimplemented button
const SearchForm = () => (
  <form>
    <input type="text" />
    <button className="bg-primary text-white px-4 py-2">Search</button>
  </form>
);

// ✅ Good - Reused Button component
import { Button } from '@/components/atoms/Button';

const SearchForm = () => (
  <form>
    <input type="text" />
    <Button variant="primary">Search</Button>
  </form>
);
```

### Pitfall 8: Missing Edge Cases and Accessibility

**Problem**:
- Only happy path implemented
- No loading, error, empty states
- Inaccessible to keyboard/screen reader users

**Solution**:
- Always request accessibility in prompts
- Specify all states (loading, error, empty)
- Test with keyboard only
- Test with screen reader
- Run automated accessibility audits

**Comprehensive Prompt**:
```
"Generate [Component] with:

Functionality:
- All interactive states
- Loading state (skeleton or spinner)
- Error state (error message display)
- Empty state (if applicable)

Accessibility:
- Semantic HTML
- ARIA labels where needed
- Keyboard navigation (Tab, Enter, Escape)
- Focus indicators (visible outline)
- Screen reader announcements
- Color contrast WCAG 2.1 AA minimum

Edge cases:
- Very long content (text truncation)
- Missing data (fallbacks)
- Slow network (loading indicators)"
```

---

## Quality Assurance Checklist

### Pre-Implementation Checklist

Before starting ANY code generation:

- [ ] Figma file is organized with clear hierarchy
- [ ] All components are properly created (not just frames)
- [ ] Component variants cover all states
- [ ] Design tokens/variables are defined
- [ ] Auto Layout is used throughout
- [ ] Responsive behavior is defined
- [ ] Annotations for interactions are added
- [ ] "Ready for dev" section is clearly marked
- [ ] Designer sign-off obtained

### Per-Component Checklist

For EACH component generated:

**Visual Fidelity**:
- [ ] Matches Figma design pixel-perfectly
- [ ] Colors match design tokens exactly
- [ ] Spacing matches (margin, padding)
- [ ] Typography matches (size, weight, line-height)
- [ ] Border radius, shadows match
- [ ] Icons match (size, color, style)

**Code Quality**:
- [ ] Uses design tokens (no hard-coded values)
- [ ] Reuses existing components (atoms in molecules, etc.)
- [ ] TypeScript types are defined
- [ ] Props are documented
- [ ] Follows project conventions
- [ ] No console errors or warnings

**Functionality**:
- [ ] All variants implemented (default, hover, active, disabled, etc.)
- [ ] Interactive states work correctly
- [ ] Loading state implemented (if applicable)
- [ ] Error handling implemented (if applicable)
- [ ] Empty state implemented (if applicable)

**Responsiveness**:
- [ ] Tested at 320px (mobile)
- [ ] Tested at 768px (tablet)
- [ ] Tested at 1024px+ (desktop)
- [ ] Breakpoint behavior matches Figma
- [ ] Text wraps appropriately
- [ ] Images scale correctly

**Accessibility**:
- [ ] Keyboard navigable (Tab, Enter, Escape)
- [ ] Focus indicators visible
- [ ] Screen reader compatible
- [ ] ARIA labels added where needed
- [ ] Color contrast meets WCAG 2.1 AA
- [ ] Semantic HTML used

**Testing**:
- [ ] Unit tests written (if applicable)
- [ ] Visual regression test added
- [ ] Tested in target browsers
- [ ] Storybook story created
- [ ] Component documented

### Phase Completion Checklist

**After Atoms**:
- [ ] All atomic components implemented
- [ ] Design token system complete
- [ ] Storybook published with all atoms
- [ ] Visual regression tests set up
- [ ] Design team approval

**After Molecules**:
- [ ] All molecule components reuse atoms
- [ ] No duplicated code
- [ ] Storybook updated with molecules
- [ ] Molecules tested in isolation
- [ ] Design team approval

**After Organisms**:
- [ ] All organisms compose molecules/atoms
- [ ] Complex interactions work
- [ ] Responsive behavior correct
- [ ] Storybook updated with organisms
- [ ] Design team approval

**After Templates**:
- [ ] Layout templates work with placeholder content
- [ ] Responsive layout shifts work
- [ ] Templates are flexible (accept children)
- [ ] Navigation/routing works

**After Pages**:
- [ ] All pages use templates
- [ ] Real data integration works
- [ ] Loading states display
- [ ] Error handling works
- [ ] Empty states display
- [ ] SEO metadata added
- [ ] Analytics tracking added
- [ ] Final design QA passed

---

## Advanced Tips

### Tip 1: Create Design System Rules File

Use `create_design_system_rules` to generate a rules file that helps AI agents understand your design system:

```
"Use create_design_system_rules to analyze our Figma design system
 and generate a comprehensive rules file for AI agents."
```

Save this output to `.claude/design-system-rules.md` so all future prompts benefit from design system awareness.

### Tip 2: Establish Naming Conventions Early

Create a naming convention document:

```markdown
## Component Naming Convention

- **Files**: PascalCase (Button.tsx, UserCard.tsx)
- **Components**: PascalCase (Button, UserCard)
- **Props interfaces**: ComponentNameProps (ButtonProps, UserCardProps)
- **Variants**: lowercase (primary, secondary, large, small)
- **CSS classes**: kebab-case (user-card, button-primary)
```

Reference this in every prompt: "Follow our naming conventions in NAMING.md"

### Tip 3: Build a Component Index

Maintain a component index showing what's implemented:

```markdown
## Component Index

### Atoms
- [x] Button (src/components/atoms/Button.tsx)
- [x] Input (src/components/atoms/Input.tsx)
- [x] Label (src/components/atoms/Label.tsx)
- [ ] Checkbox (not implemented)

### Molecules
- [x] SearchBox (src/components/molecules/SearchBox.tsx)
- [ ] FormField (not implemented)
```

Reference in prompts: "Check COMPONENT_INDEX.md - only reuse components marked [x]"

### Tip 4: Use Figma-to-Code Session Logs

Create a log of each Figma-to-code session:

```markdown
## Implementation Log

### 2025-01-15: Button Atom
- Figma: [link to Figma node]
- Generated: src/components/atoms/Button.tsx
- Iterations: 2
- Issues: Initial spacing was 12px instead of 16px
- Resolution: Updated to use spacing.md token
- Status: ✅ Approved
```

This helps track decisions and prevents repeating mistakes.

### Tip 5: Set Up Visual Regression Testing

After implementing each component:

```bash
# Take baseline screenshot from Figma
# Take screenshot of implemented component
# Set up automated visual comparison (e.g., Percy, Chromatic)
```

Catches visual drift automatically.

### Tip 6: Create Figma Plugins for Code Export

For frequently-used patterns, create Figma plugins that export code directly with your conventions:

- Custom code export format
- Automatic token replacement
- Project-specific boilerplate

### Tip 7: Implement Progressive Enhancement

When Figma designs include complex interactions:

```
Phase 1: Static layout (pixel-perfect)
Phase 2: Basic interactivity (click handlers)
Phase 3: Advanced interactions (animations, gestures)
Phase 4: Micro-interactions (delightful details)
```

Build in phases rather than all at once.

### Tip 8: Use Figma's Dev Mode Effectively

- Turn on Dev Mode in Figma before exporting
- Review CSS/React code hints Figma provides
- Compare Figma's code suggestions with MCP output
- Use both as references for verification

### Tip 9: Create Component Templates

Build template files for common patterns:

```typescript
// ComponentTemplate.tsx
import React from 'react';
import { tokens } from '@/styles/tokens';

interface ComponentNameProps {
  // Props here
}

export const ComponentName: React.FC<ComponentNameProps> = ({
  // Props destructuring
}) => {
  return (
    <div>
      {/* Component JSX */}
    </div>
  );
};
```

Reference in prompts: "Use the template in ComponentTemplate.tsx as starting point"

### Tip 10: Batch Similar Components

When implementing multiple similar components (e.g., all buttons):

```
"Generate code for all button variants in a single component file:
 - Primary Button
 - Secondary Button
 - Text Button
 - Icon Button

 Use a variant prop to switch between them.
 Share common styles via a base class."
```

This ensures consistency across variants.

---

## Conclusion

### Key Takeaways

1. **Bottom-up is essential**: Always build atoms → molecules → organisms → templates → pages
2. **Preparation is critical**: 80% of success comes from proper Figma file organization
3. **Iteration is expected**: First generation is rarely perfect; refine systematically
4. **Verification is non-negotiable**: Always compare against Figma design
5. **Reuse over recreate**: Compose existing components; never duplicate code
6. **Accessibility is mandatory**: Build it in from the start, not as an afterthought
7. **Design tokens are foundational**: Extract and use them consistently

### Success Metrics

You're successful when:

- Generated components are pixel-perfect matches to Figma
- No hard-coded values exist (all design tokens)
- Components are highly reusable across the application
- Accessibility is built-in by default
- Responsive behavior matches design specifications
- Code is maintainable and follows conventions
- Design team approves without requesting changes

### Next Steps

1. **Set up your environment**:
   - Install Figma MCP server
   - Configure Claude Code
   - Prepare Figma files

2. **Start small**:
   - Begin with simple atoms (Button, Input)
   - Perfect the workflow
   - Build confidence

3. **Scale up**:
   - Move to molecules
   - Then organisms
   - Finally pages

4. **Continuously improve**:
   - Document learnings
   - Refine prompts
   - Update this guide

### Resources

- **Atomic Design**: https://atomicdesign.bradfrost.com/
- **Figma MCP Docs**: https://developers.figma.com/docs/figma-mcp-server/
- **Figma Best Practices**: https://www.figma.com/best-practices/
- **Claude Code Docs**: https://docs.claude.com/en/docs/claude-code/

---

**Document Version**: 1.0
**Last Updated**: January 2025
**Maintained by**: WalkTheWalk Development Team

---

## Appendix: Quick Reference

### Figma MCP Tools Summary

| Tool | Purpose | When to Use |
|------|---------|-------------|
| `get_code` | Generate code from design | Initial component generation |
| `get_metadata` | Get structure without styling | Large designs, planning |
| `get_screenshot` | Visual reference image | Verification, comparison |
| `get_variable_defs` | Extract design tokens | Project setup, token sync |
| `get_code_connect_map` | Map Figma to code | Identify existing components |
| `create_design_system_rules` | Generate design system docs | Project setup |

### Atomic Design Hierarchy

```
Atoms
  └─> Molecules
       └─> Organisms
            └─> Templates
                 └─> Pages
```

### Component Implementation Order

1. **Foundation** (Day 1-3):
   - Design tokens
   - Typography
   - Colors
   - Spacing
   - Icons

2. **Atoms** (Day 4-7):
   - Buttons
   - Inputs
   - Labels
   - Badges
   - Tags

3. **Molecules** (Week 2):
   - Form fields
   - Search boxes
   - Card headers
   - Nav items

4. **Organisms** (Week 3):
   - Headers
   - Footers
   - Cards
   - Forms
   - Tables

5. **Templates** (Week 4):
   - Page layouts
   - Responsive grids

6. **Pages** (Week 5+):
   - Complete screens
   - Data integration
   - State management

### Prompt Template Library

**Basic Component**:
```
Generate a [ComponentType] [ComponentName] from this Figma selection.

Tech Stack:
- Framework: [React/Vue/etc.]
- Language: TypeScript
- Styling: [Tailwind/CSS Modules/etc.]

Requirements:
- Use design tokens from [path]
- Include all variants: [list]
- Ensure accessibility
- Match Figma exactly
```

**Molecule/Organism**:
```
Generate a [ComponentName] using existing components:
- [Component1] from [path]
- [Component2] from [path]

Do NOT recreate these components.
Match Figma spacing and layout exactly.
Use design tokens from [path].
```

**Page**:
```
Create a [PageName] page using:
- Template: [TemplateName]
- Organisms: [list]

Include:
- Data fetching (React Query)
- Loading state
- Error handling
- Empty state

Match Figma design exactly.
```
