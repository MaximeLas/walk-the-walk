# Visual Testing Agent - Specification & Implementation Plan

**Purpose:** A specialized agent that performs pixel-perfect visual verification of implemented components against Figma designs.

**Created:** 2025-10-14
**Status:** Design Phase

---

## Problem Statement

Human developers and general-purpose agents struggle with:
1. **Subjective assessment** - "looks good enough" isn't precise
2. **Missing discrepancies** - easy to overlook small differences
3. **Inconsistent methodology** - no standardized testing approach
4. **False confidence** - reporting completion without proof
5. **Time-consuming manual checks** - comparing every detail is tedious

**Result:** Components ship with visual bugs that only users catch.

---

## Solution: Visual Testing Agent

A **specialized agent** with a single, focused responsibility:
> **Compare implemented UI components against Figma designs and report all discrepancies with evidence.**

### Key Principles

1. **Single Responsibility** - Only does visual testing, nothing else
2. **Evidence-Based** - Every claim backed by screenshots/measurements
3. **Objective Metrics** - Uses color pickers, rulers, exact measurements
4. **Comprehensive** - Tests all states, viewports, and variants
5. **Clear Reports** - Structured output with pass/fail + actionable fixes

---

## Agent Design

### Agent Type: `visual-tester`

**Tools Access:**
- ✅ Figma MCP tools (get screenshots, specs)
- ✅ Chrome DevTools MCP (navigate, screenshot, measure, inspect)
- ✅ Read (to read component code)
- ❌ Edit/Write (not allowed - only reports, doesn't fix)
- ❌ Bash (not needed)
- ❌ Git (not needed)

**Key Constraint:** This agent **cannot modify code**. It only inspects and reports.

---

## Agent Workflow

### Input (from main agent):
```typescript
{
  component: string,           // e.g., "MiddleNav"
  figmaNodeId: string,         // e.g., "177:32453"
  implementationUrl: string,   // e.g., "http://localhost:3000/demo"
  componentPath: string,       // e.g., "src/components/ui/MiddleNav.tsx"
  variantsToTest?: string[],   // e.g., ["active=all", "active=contacts", "active=spaces"]
  viewports?: Viewport[]       // e.g., [{width: 1440, height: 900}, {width: 375, height: 667}]
}
```

### Process:
1. **Get Figma Reference**
   - Screenshot Figma design (all variants)
   - Extract Figma code/specs
   - Document expected values (colors, sizes, spacing)

2. **Capture Implementation**
   - Navigate to demo page
   - Screenshot component (all variants, all viewports)
   - Use DevTools to measure elements
   - Use DevTools to inspect computed styles

3. **Compare Systematically**
   - **Colors**: Use color picker on both, compare hex values
   - **Typography**: Compare font-family, size, weight, line-height
   - **Spacing**: Measure padding, margins, gaps
   - **Sizing**: Compare width, height, border-radius
   - **Layout**: Check alignment, positioning
   - **Interactive States**: Test clicks, hovers, focus (if applicable)

4. **Generate Report**
   - List every discrepancy found
   - Include screenshots showing the issue
   - Provide exact measurements (expected vs actual)
   - Suggest fixes for each issue
   - Overall pass/fail verdict

### Output (to main agent):
```typescript
{
  component: string,
  status: "PASS" | "FAIL",
  overallScore: number,        // 0-100 based on issues found
  summary: string,             // 1-2 sentence summary
  discrepancies: Array<{
    category: "color" | "typography" | "spacing" | "sizing" | "layout" | "interaction",
    severity: "critical" | "major" | "minor",
    element: string,           // which element has the issue
    expected: string,          // what Figma shows
    actual: string,            // what implementation shows
    evidence: string,          // path to screenshot or measurement
    suggestedFix: string       // how to fix it
  }>,
  screenshots: {
    figma: string[],           // paths to Figma screenshots
    implementation: string[],  // paths to implementation screenshots
    comparison: string[]       // side-by-side comparisons with annotations
  },
  metrics: {
    colorsMatched: number,
    colorsMismatched: number,
    sizesMatched: number,
    sizesMismatched: number,
    // ... etc
  }
}
```

---

## Agent Behavior

### What This Agent DOES:
- ✅ Takes screenshots of Figma and implementation
- ✅ Measures elements using DevTools inspector
- ✅ Uses color picker to verify exact hex codes
- ✅ Tests interactive states (clicks buttons, verifies state changes)
- ✅ Compares against multiple viewports (desktop, mobile)
- ✅ Creates detailed reports with evidence
- ✅ Provides objective pass/fail assessment

### What This Agent DOES NOT DO:
- ❌ Modify any code
- ❌ Create components
- ❌ Make subjective judgments ("looks good")
- ❌ Skip checks to save time
- ❌ Report success without evidence

---

## Checklist Template

The agent follows this structured checklist for every component:

### 1. Colors (All Elements)
- [ ] Background colors match (hex code comparison)
- [ ] Text colors match
- [ ] Border colors match
- [ ] Active state colors match
- [ ] Hover state colors match (if applicable)
- [ ] Disabled state colors match (if applicable)

### 2. Typography (All Text Elements)
- [ ] Font family matches
- [ ] Font size matches
- [ ] Font weight matches
- [ ] Line height matches
- [ ] Letter spacing matches (if specified)
- [ ] Text transform matches (uppercase, etc.)

### 3. Sizing (All Elements)
- [ ] Width matches
- [ ] Height matches
- [ ] Min/max width/height matches
- [ ] Border radius matches
- [ ] Border width matches

### 4. Spacing
- [ ] Padding matches (all sides)
- [ ] Margins match (all sides)
- [ ] Gap between children matches
- [ ] Internal spacing matches

### 5. Layout
- [ ] Flexbox/Grid direction correct
- [ ] Alignment correct (justify, align-items)
- [ ] Element positioning correct
- [ ] Z-index correct (if layered)
- [ ] Overflow behavior correct

### 6. Interactive States (if applicable)
- [ ] Click handlers work
- [ ] State changes correctly
- [ ] Visual feedback on interaction
- [ ] Active state styling correct
- [ ] Hover effects match
- [ ] Focus states accessible

### 7. Responsive Behavior
- [ ] Desktop viewport (1440×900) correct
- [ ] Mobile viewport (375×667) correct
- [ ] Tablet viewport (768×1024) if specified
- [ ] No horizontal scroll on mobile
- [ ] Text doesn't overflow

### 8. Visual Effects
- [ ] Shadows match
- [ ] Backdrop blur matches
- [ ] Transitions/animations match
- [ ] Opacity matches

---

## Implementation Plan

### Phase 1: Proof of Concept (Manual Execution)
1. Write the testing checklist as markdown
2. Manually execute it for MiddleNav component
3. Document findings in structured format
4. Validate the approach with user

### Phase 2: Task Tool Integration
1. Create task template for visual testing
2. Test invoking Task tool to run visual tests
3. Verify agent can complete full checklist
4. Iterate on prompt/instructions

### Phase 3: Automation & Integration
1. Add visual-tester agent type to project
2. Create wrapper functions in main workflow
3. Document usage in PHASE2_PLAN.md
4. Test with multiple components

### Phase 4: Enhancement
1. Add screenshot diffing capability
2. Add automated measurement extraction
3. Create visual regression test suite
4. Integrate with CI/CD

---

## Example Usage

### Main Agent Flow:
```typescript
// Main agent implementing a component
1. Implement MiddleNav component
2. Add to demo page
3. Invoke visual-tester agent:

   Task({
     subagent_type: "visual-tester",
     prompt: `Test the MiddleNav component:
       - Figma node: 177:32453, 177:32615, 177:32652
       - Implementation: http://localhost:3000/demo (MiddleNav section)
       - Component path: src/components/ui/MiddleNav.tsx
       - Test all 3 variants: active=all, active=contacts, active=spaces
       - Viewports: desktop 1440×900, mobile 375×667

       Return detailed report with all discrepancies found.`
   })

4. Receive report from visual-tester
5. If status === "FAIL":
     - Review discrepancies
     - Fix issues
     - Re-run visual-tester
   else:
     - Mark component as complete
     - Move to next component
```

---

## Benefits

### For Main Agents:
- ✅ Offloads tedious visual verification work
- ✅ Gets objective, evidence-based reports
- ✅ No more guessing if components match Figma
- ✅ Clear action items when issues found

### For Users:
- ✅ Higher confidence in implementation quality
- ✅ Catches visual bugs before manual review
- ✅ Consistent testing across all components
- ✅ Faster iteration (fewer back-and-forth corrections)

### For Process:
- ✅ Standardized testing methodology
- ✅ Reusable for future projects
- ✅ Documentation of testing approach
- ✅ Scalable (can test many components)

---

## Open Questions

1. **Agent Creation**:
   - Can we add custom agent types via Claude Code settings?
   - Or do we use Task tool with specific instructions?
   - How do we ensure consistency across invocations?

2. **Screenshot Storage**:
   - Where do we store comparison screenshots?
   - How do we reference them in reports?
   - Do we commit them to repo or keep ephemeral?

3. **Tool Restrictions**:
   - Can we actually restrict agent to read-only?
   - How do we prevent code modification?
   - What happens if agent tries to edit?

4. **Performance**:
   - How long does thorough testing take?
   - Is it practical for every component?
   - Can we parallelize tests?

5. **Integration**:
   - Should this be mandatory before marking step complete?
   - How do we document testing in PHASE2_STATUS_TRACKING.md?
   - What's the approval workflow?

---

## Next Steps

1. **Get user feedback** on this design
2. **Decide on implementation approach** (custom agent vs Task tool)
3. **Create proof of concept** - manually execute full checklist for MiddleNav
4. **Document findings** in structured report format
5. **Iterate on design** based on learnings
6. **Implement and test** the automated version

---

## Success Criteria

This agent is successful if:
- ✅ It catches visual discrepancies that humans miss
- ✅ Reports are clear and actionable
- ✅ Main agents can integrate it easily
- ✅ It reduces back-and-forth corrections
- ✅ Users trust its assessments
- ❌ It NEVER reports "PASS" when discrepancies exist (no false positives!)

---

**This is a draft specification. Needs user review and iteration before implementation.**
