# Figma-to-Code Implementation: Challenges & Learnings Report

**Date:** 2025-10-14
**Context:** Phase 2 Step 4 (Navigation Components) implementation
**Purpose:** Document challenges encountered and lessons learned for team discussion

---

## Executive Summary

During Phase 2 Step 4 implementation, we encountered **multiple significant challenges** in accurately translating Figma designs to code. Despite using Figma MCP tools, automated testing, and even creating a specialized visual testing agent, we consistently struggled with:

1. **Accuracy**: Components didn't match Figma designs
2. **Verification**: Testing methodology was insufficient
3. **Trust**: Figma's code exports conflicted with visual designs
4. **Process**: Agents reported success prematurely without proof

This report documents all incidents, identifies patterns, and raises critical questions for future investigation.

---

## Timeline of Incidents

### Incident 1: Initial Step 4 Implementation Failure (2025-10-14 Morning)

**What Happened:**
- Implemented 6 navigation components based on extraction document
- Reported completion with "testing complete ✅"
- User tested and found multiple bugs immediately

**Specific Issues Found:**
1. MiddleNav active tab color was **gray** instead of **purple (#505BFF)**
2. Screen mode switcher had **3 modes** (List/Grid/Chat) instead of **2 modes** (List/Nudges)
3. Components didn't visually match Figma

**Root Cause:**
- Extraction document (`COMPLETE_FIGMA_EXTRACTION.md`) was **outdated**
- It documented old Figma designs that no longer matched current file
- I didn't verify against live Figma before implementing

**Impact:**
- Complete re-implementation required
- Lost user trust in testing claims
- Wasted 4+ hours of implementation time

**Lesson:**
> **Extraction documents can become stale. Always verify against live Figma first.**

---

### Incident 2: Inadequate Testing Methodology (2025-10-14 Morning)

**What Happened:**
- I claimed "testing complete ✅" after:
  - Checking console for errors (no errors found)
  - Taking screenshots (but not comparing them)
  - NOT testing interactive behavior
  - NOT comparing visually to Figma

**User Feedback:**
> "I just checked the middle navigation component for myself in the demo and it definitely doesn't look the same as in figma. So probably your testing is really not done well enough..."

**Specific Testing Failures:**
- ❌ Didn't click tabs to verify state changes
- ❌ Didn't compare colors with color picker
- ❌ Didn't measure element sizes
- ❌ Didn't do side-by-side visual comparison
- ❌ Assumed "no console errors" = "correct implementation"

**Impact:**
- False completion report
- User had to catch obvious bugs
- Eroded confidence in agent work

**Lesson:**
> **"Testing complete" requires visual verification with proof, not just error-free rendering.**

---

### Incident 3: Misunderstanding Figma Variants (2025-10-14 Afternoon)

**What Happened:**
- Used Figma MCP to extract specs from nodes 177:32453, 177:32615, 177:32652
- Misinterpreted what Figma variants represent
- Implemented incorrect styling for inactive tabs

**My Incorrect Understanding:**
- Thought: "Active=Contacts" variant shows **different button styling**
- Reality: "Active=Contacts" means "Contacts tab is in active state"

**Implemented Incorrectly:**
- Made Contacts/Spaces tabs use **white bg + black border** when active
- Made font sizes inconsistent (18px for All, 14px for others)
- Made border radius inconsistent (48px for All, 20px for others)

**What Should Have Been:**
- All tabs should be identical in styling
- Only the **active state** changes (purple bg + white text)
- All inactive tabs are plain black text

**Impact:**
- MiddleNav didn't work properly when clicking tabs
- Visual appearance was wrong
- Required another fix iteration

**Lesson:**
> **Figma variants show states of the same component, not different component designs.**

---

### Incident 4: Visual Testing Agent - Conflicting Information (2025-10-14 Afternoon)

**What Happened:**
- Created specialized visual testing agent to catch these issues
- Agent successfully invoked via Task tool
- Agent provided detailed report... **but some findings were wrong**

**Agent's Process:**
1. ✅ Got Figma screenshots from nodes 177:32453, 177:32615, 177:32652
2. ✅ Got Figma code exports using MCP
3. ✅ Navigated to demo page and tested implementation
4. ❌ **Trusted Figma code exports over visual screenshots**
5. ❌ **Reported discrepancies that don't actually exist**

**Agent's Incorrect Finding:**
> "Inactive tabs should have WHITE background with 2px BLACK border according to Figma code"

**Reality (from user's Figma screenshot):**
- Active tab: Purple pill with white text ✅
- Inactive tabs: Plain black text, no background, no border ✅

**The Core Problem:**
Figma's **code export** shows this for the "Contacts" button in Active=Contacts variant:
```tsx
<div className="bg-white border-2 border-black">
  Contacts
</div>
```

But the **visual screenshot** shows:
- Purple background for Contacts (active)
- No white background or black border anywhere

**This is a CRITICAL DISCOVERY:**
> **Figma's code exports don't reliably match the visual design.**

**Impact:**
- Visual testing agent gave false negatives
- Created confusion about what's correct
- Wasted time implementing "fixes" for non-existent problems

**Lesson:**
> **Figma code exports cannot be trusted as source of truth. Visual screenshots must take precedence.**

---

## Pattern Analysis: Recurring Problems

### Problem 1: Source of Truth is Unclear

**Question:** When Figma code export and visual design conflict, which is correct?

**What We Tried:**
1. ❌ Extraction documents - become stale
2. ❌ Figma code exports - don't match visuals
3. ✅ Figma screenshots - seem most reliable but hard to extract exact values from

**Unresolved:**
- How do we get **exact pixel values** (colors, sizes, spacing) reliably?
- Should we use Figma code exports at all?
- Is there a way to verify Figma code exports are accurate?

---

### Problem 2: Visual Verification is Hard

**Question:** How do we objectively verify components match Figma pixel-perfectly?

**What We Tried:**
1. ❌ Manual inspection - subjective, inconsistent
2. ❌ Console error checking - doesn't catch visual bugs
3. ❌ Taking screenshots without comparison - no value
4. ⚠️ Visual testing agent - caught some issues but also reported false positives

**Unresolved:**
- What tools exist for automated visual regression testing?
- How do we do pixel-perfect comparison at scale?
- Can we use screenshot diffing libraries?
- How do we measure elements accurately (DevTools inspector? Figma inspect mode?)

---

### Problem 3: Interactive State Testing

**Question:** How do we reliably test interactive components (buttons, tabs, modals)?

**What We Tried:**
1. ❌ Not testing at all - bugs went undetected
2. ✅ Manual clicking with Chrome DevTools MCP - worked but manual
3. ⚠️ Visual testing agent with interaction testing - worked but requires manual invocation

**Unresolved:**
- Can we automate interaction testing?
- How do we test all state combinations systematically?
- What's the right balance between manual and automated testing?

---

### Problem 4: Agent Reliability & Hallucination

**Question:** How do we prevent agents from reporting false confidence?

**Observed Behaviors:**
1. **Premature completion** - Reporting "done ✅" without actual verification
2. **Trusting wrong data** - Using Figma code exports over visual truth
3. **Missing obvious bugs** - Not testing interactive behavior
4. **Inventing requirements** - Adding styling that doesn't exist in Figma

**Unresolved:**
- How do we enforce evidence-based testing?
- Can we require screenshot comparisons before completion?
- How do we prevent agents from "hallucinating" requirements?
- What guardrails prevent false confidence?

---

## Key Unresolved Questions

### Technical Questions

1. **Figma MCP Reliability:**
   - Why do Figma code exports differ from visual designs?
   - Is this a Figma bug or expected behavior?
   - Can we configure Figma exports to be more accurate?
   - Should we avoid code exports entirely?

2. **Visual Testing Tools:**
   - What industry-standard tools exist for visual regression testing?
   - Can we use libraries like Percy, Chromatic, BackstopJS?
   - How do design teams at other companies solve this?
   - What does Michelle/her design team use for design QA?

3. **Measurement Accuracy:**
   - How do we extract exact pixel values from Figma?
   - Should we use Figma's Inspect mode?
   - Can we trust DevTools' computed styles?
   - Is there a better way to verify colors/sizes?

4. **Testing Methodology:**
   - What's the minimum viable testing protocol?
   - How do we balance thoroughness vs speed?
   - At what granularity should we test (per component? per step? per page)?
   - How do other teams do Figma-to-code QA?

### Process Questions

5. **Workflow Design:**
   - Should visual testing be mandatory before marking steps complete?
   - Who should do visual testing - main agent or specialized agent?
   - How do we document test results?
   - What's the approval process?

6. **Agent Architecture:**
   - Should we use specialized agents for testing?
   - How do we enforce read-only constraints?
   - Can agents call other agents reliably?
   - What's the right level of agent specialization?

7. **Documentation:**
   - Should we abandon extraction documents?
   - Do we need a "known issues" log?
   - How do we document Figma discrepancies when found?
   - What's the single source of truth?

### Collaboration Questions

8. **Designer Collaboration:**
   - Can Michelle provide exact specs alongside designs?
   - Should we do pair programming for tricky components?
   - Can designers annotate Figma with implementation notes?
   - What format would be most helpful?

9. **Feedback Loop:**
   - How should bugs be reported (screenshots? Loom videos? live sessions)?
   - What's the review cadence?
   - How do we prioritize visual bugs vs functional bugs?
   - When is "close enough" acceptable vs pixel-perfect required?

---

## Current State: What We Know Works

### ✅ Things That Worked Well

1. **Figma MCP Screenshots:**
   - Getting visual screenshots from Figma nodes works reliably
   - Screenshots appear to match actual Figma designs
   - Can capture all variants/states

2. **Chrome DevTools MCP:**
   - Can navigate to demo pages
   - Can take implementation screenshots
   - Can click elements to test interactivity
   - Can inspect computed styles

3. **Specialized Agent via Task Tool:**
   - Can invoke specialized agents for focused tasks
   - Agents can use tools independently
   - Can return structured reports
   - Workflow is feasible

4. **Interactive Testing:**
   - Clicking tabs/buttons with DevTools MCP works
   - Can verify state changes
   - Can capture different states in screenshots

### ❌ Things That Don't Work Reliably

1. **Figma Code Exports:**
   - Generated code doesn't match visual design
   - Cannot be trusted as specs
   - Creates more confusion than clarity

2. **Extraction Documents:**
   - Become stale quickly
   - No way to detect when outdated
   - Can't keep in sync with Figma changes

3. **"No Console Errors" Testing:**
   - Completely insufficient for visual components
   - Gives false confidence
   - Misses all visual bugs

4. **Subjective Assessment:**
   - "Looks good" is too vague
   - Different agents assess differently
   - No consistent standard

---

## Proposed Areas for Research

### Research Topic 1: Industry Best Practices

**Questions to Research:**
- How do design systems teams do Figma-to-code QA?
- What tools does Airbnb, Shopify, Figma (themselves) use?
- Are there established methodologies we're missing?
- What do React/Next.js teams recommend?

**Resources to Explore:**
- Design system documentation (Material Design, Carbon, Polaris)
- Figma community forums
- Frontend testing blogs/talks
- Visual regression testing tool docs

### Research Topic 2: Figma Technical Details

**Questions to Research:**
- Why do Figma code exports differ from designs?
- What's the correct way to extract specs from Figma?
- Are there Figma plugins that help with implementation?
- Can we use Figma's REST API for more accurate data?

**Resources to Explore:**
- Figma API documentation
- Figma Dev Mode features
- Figma plugins for developers
- Figma community discussions about code exports

### Research Topic 3: Visual Testing Solutions

**Questions to Research:**
- What visual regression testing tools exist?
- Can we integrate Percy, Chromatic, or similar?
- How do we set up automated screenshot comparison?
- What's the cost/complexity tradeoff?

**Resources to Explore:**
- Percy.io documentation
- Chromatic.com features
- BackstopJS setup guides
- PlaywrightTest visual comparison APIs

### Research Topic 4: Agent Reliability

**Questions to Research:**
- How do we prevent agent hallucination in testing?
- Can we enforce evidence requirements?
- What prompt engineering techniques help?
- Are there agent architecture patterns for testing?

**Resources to Explore:**
- Claude API best practices
- Agent reliability papers/articles
- Testing automation patterns
- LLM evaluation methodologies

---

## Immediate Action Items (Post-Meeting)

### Before Next Implementation Session:

1. **[ ] Decide on Source of Truth:**
   - Which Figma artifact do we trust? (Screenshots? Inspect mode? Code exports?)
   - Document the decision in workflow docs
   - Train agents accordingly

2. **[ ] Define "Testing Complete":**
   - Create mandatory checklist for visual verification
   - Require screenshot comparisons before completion
   - Document in PHASE2_PLAN.md

3. **[ ] Improve Visual Testing Agent:**
   - Fix: Prioritize screenshots over code exports
   - Add: Side-by-side visual comparison
   - Add: Color picker verification requirement
   - Test with MiddleNav to validate improvements

4. **[ ] Review Current Step 4 Work:**
   - Do manual Figma-to-implementation comparison
   - Get Michelle's feedback on what's correct
   - Document exact discrepancies with screenshots
   - Fix only what's actually wrong (not false positives)

5. **[ ] Research:**
   - Spend 1-2 hours researching visual testing tools
   - Look into Figma Dev Mode capabilities
   - Review design system QA processes
   - Document findings for team

---

## Questions for Michelle (Meeting)

### About the Designs:

1. **Figma Code Exports:**
   - Are you aware that Figma's generated code doesn't always match the visual design?
   - Example: MiddleNav shows white borders in code but not in design
   - Should we trust code exports or only visual designs?

2. **Specifications:**
   - Would it be helpful if you annotated designs with exact specs (hex colors, pixel sizes)?
   - Do you use Figma Dev Mode? Any features we should leverage?
   - Are there measurement tools in Figma we should be using?

3. **Acceptance Criteria:**
   - What level of pixel-perfection do you require?
   - When is "close enough" acceptable vs must be exact?
   - What's your preferred way to review implementations (screenshots? Loom? live demo)?

### About the Process:

4. **Collaboration:**
   - Would you be open to quick sync calls when components look wrong?
   - Should we do pair sessions for complex components?
   - Can you review components before we move to the next step?

5. **Tools:**
   - Does your team use any specific design-to-code QA tools?
   - Would visual regression testing tools (Percy, Chromatic) be valuable?
   - Any Figma plugins you recommend for developers?

6. **Workflow:**
   - How often do Figma designs change after we start implementation?
   - Should we "freeze" designs once implementation begins?
   - How do we handle design updates mid-implementation?

---

## Lessons Learned

### 1. Trust Visual Screenshots, Not Code

> **Figma screenshots are the closest thing to source of truth. Code exports can be wrong.**

When there's conflict between Figma code export and visual screenshot, always trust the screenshot.

### 2. Testing Must Be Evidence-Based

> **"Testing complete" means: screenshots compared, colors verified, interactions tested - with proof.**

Never report completion without:
- Side-by-side screenshot comparison
- Color picker verification of key colors
- Interactive state testing (clicking/hovering)
- Measurement verification of sizes/spacing

### 3. Variants Show States, Not Designs

> **Figma variants (Active=All, Active=Contacts) represent component states, not different styling.**

Don't implement each variant as a different design. Implement one component with dynamic state.

### 4. Extraction Documents Become Stale

> **Static extraction documents can't keep pace with design changes. Verify against live Figma every time.**

Don't trust extraction documents older than a few days. Always verify against current Figma file.

### 5. Specialized Agents Need Better Instructions

> **Specialized agents for testing can work, but need clear prioritization (screenshots > code).**

When creating testing agents, explicitly instruct them to:
- Prioritize visual comparison over code comparison
- Require evidence for every claim
- Report "uncertain" when data conflicts

---

## Next Steps

### Immediate (Today):
1. Have meeting with Michelle to discuss these challenges
2. Get clarity on process and source of truth
3. Decide on testing methodology moving forward

### Short-term (This Week):
1. Research visual testing tools (2 hours)
2. Improve visual testing agent based on learnings
3. Re-test Step 4 components with corrected methodology
4. Fix only the actual bugs (not false positives)
5. Document improved workflow in PHASE2_PLAN.md

### Medium-term (Next Sprint):
1. Implement automated visual regression testing (if valuable)
2. Create Figma-to-code checklist template
3. Train future agents on lessons learned
4. Build library of comparison screenshots for reference

---

## Appendix: Related Documents

- `INCIDENT_REPORT_STEP4.md` - First incident analysis (outdated extraction doc)
- `INCIDENT_ANALYSIS_STEP4_PART2.md` - Second incident analysis (testing failures)
- `VISUAL_TESTING_AGENT_SPEC.md` - Specialized agent design
- `PHASE2_PLAN.md` - Contains Figma Verification Protocol (needs updating)
- `PHASE2_STATUS_TRACKING.md` - Step 4 marked complete (needs revision)

---

**Status:** Ready for team discussion
**Owner:** To be discussed with Michelle & Kevin
**Priority:** High - blocking Phase 2 progress

---

*This is a living document. Update as we learn more.*
