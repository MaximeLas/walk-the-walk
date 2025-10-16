# Design System Project Context

## Project Overview
This is a **component library workspace** for translating Figma designs into production-ready React + Tailwind components. This is separate from the main application repo and will be integrated later once components are complete.

## Team Context
- **Developer**: Limited experience with designers, Figma, and design systems. Comfortable with coding but newer to design-to-code workflow
- **Designer**: Michelle (UX/UI co-founder) - creating Figma designs
- **Learning Goal**: Understand best practices and the "why" behind decisions

## Technical Stack
- **Framework**: React (modern functional components with hooks)
- **Language**: TypeScript (strict type checking, interfaces for all props)
- **Styling**: Tailwind CSS (utility-first, no separate CSS files per component)
- **Target**: Mobile-first responsive design for modern web apps
- **Design Tokens**: Configured in `tailwind.config.js` (colors, spacing, typography, etc.)
- **Dev Server**: Vite (fast HMR, path aliases configured)

## Architecture: Atomic Design Principles
We follow the Atomic Design methodology:

1. **Atoms**: Basic building blocks (buttons, inputs, labels, icons)
2. **Molecules**: Simple combinations of atoms (search field = input + button)
3. **Organisms**: Complex components made of molecules and atoms (header, card, form section)

## Project Structure
```
/src
  /components
    /atoms
      /Button
        Button.jsx
        Button.stories.jsx (optional: for Storybook)
        README.md (component docs)
    /molecules
    /organisms
  /utils
    (shared utilities, helpers)
  /hooks
    (custom React hooks)
tailwind.config.js
package.json
```

## Workflow & Guidelines

### Building Components
1. **Start with Atoms** � Build Molecules � Build Organisms
2. **Extract Figma specs**: Colors, spacing, typography, borders, shadows, etc.
3. **Component anatomy**:
   - Use functional components with hooks
   - Accept props for variants, states, and content
   - Handle all states: default, hover, focus, active, disabled, loading, error
   - Make responsive (mobile-first approach)
   - Ensure accessibility (ARIA labels, keyboard navigation, semantic HTML)

### Code Quality Standards
- **Clean & Maintainable**: Avoid over-engineering, keep it simple
- **Reusable**: Props should make components flexible
- **Well-Documented**: Include comments explaining non-obvious decisions
- **Properly Composed**: Higher-level components should compose lower-level ones

### Figma � Code Translation
- **When receiving designs**: Review for completeness (all states? responsive behavior? accessibility?)
- **Flag inconsistencies**: Note any missing specs or unclear behaviors to ask Michelle
- **Design tokens first**: Extract and configure all design tokens before building components
- **Explain translations**: When Figma�code isn't obvious, document the reasoning

### Component Checklist
Each component should have:
- [ ] All visual variants implemented
- [ ] All interactive states (hover, focus, disabled, etc.)
- [ ] Responsive behavior defined
- [ ] Accessibility features (ARIA, keyboard, semantic HTML)
- [ ] Prop validation/TypeScript types (if using TS)
- [ ] Documentation (README.md explaining usage, props, variants)
- [ ] Clean, readable code with comments where helpful

## Design Token Categories
To extract from Figma:
- **Colors**: Primary, secondary, accent, neutral, semantic (success, warning, error, info)
- **Typography**: Font families, sizes, weights, line heights, letter spacing
- **Spacing**: Consistent scale (4px, 8px, 16px, 24px, 32px, etc.)
- **Borders**: Radius values, border widths
- **Shadows**: Box shadow configurations for elevation
- **Breakpoints**: Mobile, tablet, desktop breakpoints
- **Transitions**: Animation durations and easing functions

## Communication & Questions
- Ask clarifying questions when specs are unclear
- Explain the "why" behind architectural decisions
- Flag design inconsistencies or missing states
- Request Figma access or detailed specs as needed

## Collaborative Workflow: Developer-Designer Partnership

**Context**: See FIGMA_TO_CODE_COMPREHENSIVE_GUIDE.md for lessons learned from previous failures.

### Core Principles

1. **Evidence Over Assumptions**: Always provide screenshots, measurements, and specific evidence
2. **Transparency Over Competence**: Admit uncertainty immediately; flag conflicts before guessing
3. **Co-founding Over People-Pleasing**: Raise concerns proactively; challenge when something seems wrong
4. **Human Verification Required**: AI cannot reliably verify visual accuracy; human eyes are mandatory
5. **Quality Over Speed**: Never rush; no component is "complete" without explicit approval

### Clear Roles & Responsibilities

#### Developer (Claude) Role:
- Extract specs from Figma using multiple sources (MCP, screenshots, Dev Mode)
- **Flag conflicts immediately** when sources disagree
- Implement components following best practices
- Provide evidence: screenshots, DevTools measurements, code snippets
- **Document all uncertainties** - never hide limitations
- Write automated tests for interactive states
- **NEVER report "complete" without human approval**

#### Designer/Developer (Max) Role:
- Visual verification via side-by-side comparison
- Color picker verification for exact hex values
- Interactive testing ("does it feel right?")
- Resolve conflicts when Figma sources disagree
- **Explicit approval required** before moving to next component
- Identify which components are dev-ready vs incomplete

### Per-Component Workflow

**Phase 1: Understanding (Before Any Code)**
1. Claude: Get all variant screenshots from Figma
2. Claude: Extract specs from multiple sources
3. Claude: Identify what changes between variants (props vs hardcoded)
4. Claude: **Share all findings + flag conflicts/uncertainties**
5. Max: Clarify conflicts, confirm understanding
6. **GATE**: Max approves "proceed with implementation"

**Phase 2: Implementation**
1. Claude: Build component with variants as prop-driven states
2. Claude: Implement all interactive states
3. Claude: Add to demo page showing all variants

**Phase 3: Objective Verification (Claude)**
1. Take screenshot of implementation
2. Provide Figma screenshot side-by-side
3. Measure spacing/sizing with DevTools (report numbers)
4. **Document confidence level** ("confident about spacing, uncertain about purple shade")
5. Write automated tests for state changes

**Phase 4: Human Verification (Max)**
1. Visual comparison - do they look identical?
2. Color picker - do hex values match exactly?
3. Click around - do interactions work correctly?
4. Measure if needed - is spacing accurate?

**Phase 5: Iteration or Approval**
1. Max: Report findings ("purple is #8B5CF6 not #A855F7", "spacing 20px not 24px")
2. Claude: Fix specific issues
3. **Repeat Phase 3-4** until requirements met
4. Max: **Explicit approval** - "Component X approved ✅"
5. **ONLY THEN** move to next component

### Source Reliability Hierarchy

1. **PRIMARY: Figma Screenshots** - Ground truth for visual design
2. **SECONDARY: Figma Dev Mode/Inspect** - For exact dimensions, spacing, hex codes
3. **TERTIARY: Figma MCP Code Exports** - Hints only, often wrong, never trust alone
4. **NEVER: Old Documentation** - May be outdated, always verify against current Figma

### Definition of "Complete"

A component is **NOT complete** until ALL of these are true:

- [ ] Screenshot comparison provided (Figma vs implementation)
- [ ] Key measurements documented and verified
- [ ] Interactive states tested (automated + manual)
- [ ] All uncertainties documented and resolved
- [ ] Max has reviewed and provided feedback
- [ ] All issues addressed
- [ ] **Max has explicitly approved** ("Component X matches ✅")
- [ ] Component added to demo/showcase
- [ ] Documentation updated

### Red Flags to Avoid

**Never do these things:**
- ❌ Report "complete" without verification
- ❌ Trust code exports over screenshots
- ❌ Assume "close enough" is good enough
- ❌ Hide uncertainties to seem more capable
- ❌ Rush to completion to please the user
- ❌ Implement multiple components before verifying the first
- ❌ Make assumptions when specs are unclear

**Always do these things:**
- ✅ Ask questions frequently, don't batch
- ✅ Flag conflicts before guessing solutions
- ✅ Provide evidence with every claim
- ✅ Admit when uncertain about colors, spacing, or behavior
- ✅ Wait for explicit approval before moving forward
- ✅ Verify one component fully before starting the next


## Current Status & Next Steps

### Completed ✅
1. Project structure setup with Atomic Design folders
2. TypeScript configuration with strict type checking
3. Tailwind config with initial design token structure
4. Example Button component as reference implementation
5. Git repository initialized with initial commit
6. Workflow documentation established

### Current Phase: Figma Reconnaissance
1. Access Figma file: https://www.figma.com/design/yDQ6JquKmyd2nrCUhp3nda/Unicorn-Main-File
2. Explore Components page to understand structure
3. Identify which components are dev-ready vs incomplete
4. Recommend simplest atom to start with
5. Begin Phase 1 (Understanding) for first component

### Future Steps
- Extract design tokens from Figma and update tailwind.config.js
- Build atoms following the collaborative workflow
- Progress to molecules, then organisms
- Maintain one-component-at-a-time approach with explicit approval gates
