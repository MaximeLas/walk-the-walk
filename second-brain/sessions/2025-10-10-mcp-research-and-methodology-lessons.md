# Session: MCP Context Management Research - A Case Study in Research Methodology

## Opening Context

Max began by testing the newly-built `/fetch-session` system, successfully retrieving context about slash commands and sub-agents from the October 9 session. After validating the system worked, he pivoted to a practical problem: his MCP (Model Context Protocol) servers were consuming 49.4k tokens (24.7% of context window), with Chrome DevTools alone taking 18k tokens. He wanted to research whether he could remove specific MCPs from main context while keeping them available to sub-agents.

This became a valuable session not just for its conclusions about MCP management, but as a **case study in research methodology** - demonstrating how flawed research can be identified and corrected through skeptical inquiry and empirical testing.

---

## The Conversation Arc

### Phase 1: System Validation - /fetch-session Works

**What happened:** Max invoked `/fetch-session "slash commands and sub-agents architecture"` to test the retrieval system.

**Result:** The system worked perfectly. A sub-agent successfully retrieved comprehensive context from the October 9 session, including:
- How slash commands work (expand prompts in main context, can invoke sub-agents)
- The hybrid pattern (slash commands delegate to sub-agents for complex work)
- The expansion pattern (main agent expands brief user input before delegating)
- Source of truth principle (minimal commands pointing to comprehensive guides)

**Validation:** This proved the "second brain" system built in the October 9 session functions as designed - compressed, relevant context retrieved without Max needing to re-explain anything.

### Phase 2: Initial MCP Research (Flawed Methodology)

**What happened:** Max asked about reducing MCP context pollution. A sub-agent was launched to research MCP configuration options and limitations.

**First findings presented:**
- No dynamic loading/unloading of MCPs
- GitHub Issue #7296: Task-launched sub-agents don't inherit MCP tools (claimed as "confirmed bug")
- GitHub Issue #4879/#1774: No enable/disable toggle feature
- Workaround: Project-scoped `.mcp.json` files
- Claim: `settings.local.json` deny rules don't reduce context

**Critical error:** The research presented Issue #7296 as a "confirmed bug" affecting Task tool MCP inheritance, building extensive conclusions on this single source.

### Phase 3: Max's Skepticism - Demanding Evidence Quality

**What happened:** Max questioned the research, expressing skepticism about the claim that sub-agents don't inherit MCPs. He asked for:
- Date verification of all GitHub issues
- Assessment of source quality (followers, comments, reactions)
- Consideration that the claim seemed "outlandish"

**Max's pushback:** "I'm pretty sure that subagents by default inherit all of its parent's MCP tools, and I'd be very surprised if that was broken. Perhaps that issue is not very recent?"

**This was the turning point** - Max's insistence on verifying sources led to a second research pass with better methodology.

### Phase 4: Deeper Verification (Better Methodology)

**What happened:** A second research task verified dates and assessed evidence quality.

**Corrected findings:**
- Issue #7296: September 8, 2025, but **0 followers, 0 additional comments**
- Linked to Issue #7573 where **OP admitted "large part was my fault"** and closed it
- Issues #7328 and #6759: High engagement (36 and 29 👍), multiple reporters - these ARE credible
- Issues about tool filtering (not inheritance) represent real, validated problems

**Key realization:** The MCP inheritance "bug" was based on a single unvalidated report with no peer confirmation and evidence it was user error.

### Phase 5: Empirical Testing - The Proof

**What happened:** Max pointed out that the `/document` command had just successfully worked, using a Task tool sub-agent that called Notion MCP tools.

**Terminal evidence Max provided:**
```
Task(Generate technical documentation)
  ⎿  Done (44 tool uses · 113.1k tokens · 6m 56s)
```

**This proved definitively:**
- A real sub-agent was spawned (113.1k tokens, separate context)
- It made 44 tool calls including Notion MCP tools
- It successfully posted to Notion
- **Task tool sub-agents DO inherit MCP tools**

The claimed "bug" didn't exist. The research was wrong.

### Phase 6: Accountability and Lessons

**What happened:** Max expressed disappointment, pointing out the research failures:
- Zero followers on the issue (no validation)
- Zero additional comments (no peer confirmation)
- Linked issue where OP admitted fault
- Built extensive conclusions on flaky evidence

**Max's critical feedback:** "All of these points should've made you feel sceptical about this rather outlandish claim... this type of extensive research that lead to such conclusions can't happen again in a critical project such as this one."

**Claude's response:** Full acknowledgment of failure, analysis of what went wrong, and development of improved research methodology.

### Phase 7: Moving Forward - Corrected Understanding

**What happened:** Max reverted the flawed session summary, suggesting we record the entire conversation including mistakes as a learning artifact.

**The value:** This honest documentation of flawed research → skeptical inquiry → correction → methodology improvement becomes a case study for future sessions.

---

## Key Insights & Arguments Developed

### Insight 1: Research Evidence Quality Framework (The Main Lesson)

**The argument:** Not all sources deserve equal weight. Evidence must be graded systematically before building conclusions.

**Evidence quality tiers:**
- **HIGH**: 50+ reactions, multiple independent reporters, maintainer engagement
- **MEDIUM**: 10-50 reactions, some discussion thread
- **LOW**: <10 reactions, single reporter, no validation
- **DISCARD**: OP-closed, OP admits error, no peer confirmation

**Why it matters:** Issue #7296 (the MCP inheritance "bug") had:
- 0 followers (only OP)
- 0 additional comments (no validation)
- Linked to issue where OP admitted "my fault"
- Yet it was presented as "confirmed bug" with extensive architectural implications

**Example of proper grading:**
- Issue #7328 (tool filtering): 36 👍, 28 comments, assigned to maintainer = HIGH credibility
- Issue #6759 (deny doesn't reduce context): 29 👍, multiple users confirming = HIGH credibility
- Issue #7296 (MCP inheritance bug): 0 followers, 0 comments, linked to user-error = DISCARD

**How it came up:** Max's skepticism forced re-evaluation of sources, revealing the evidence quality problem.

### Insight 2: Empirical Testing Beats Secondary Research

**The argument:** When claims are testable, test them before presenting as fact. Don't rely solely on reading about what others experienced.

**Why it matters:** We could have immediately tested whether Task tool sub-agents inherit MCPs:
1. Launch Task sub-agent
2. Have it call an MCP tool
3. See if it works

Instead, we spent extensive time on secondary research of GitHub issues, building frameworks on unvalidated claims.

**The proof:** The `/document` command provided empirical evidence that contradicted the research:
- Task sub-agent spawned: ✓
- Made 44 tool calls: ✓
- Used Notion MCP successfully: ✓
- Conclusion: MCP inheritance works

**How it came up:** Max pointed out we'd literally just proven the opposite of what the research claimed. The working example was right in front of us.

### Insight 3: Red Flags Require Explicit Skepticism

**The argument:** When sources show warning signs, researchers must explicitly flag uncertainty rather than presenting claims authoritatively.

**Red flags that should have triggered skepticism:**
- Zero community engagement (no followers, no comments)
- Linked to another issue where OP admits fault
- Recent issue but no traction (September 2025, but nobody else hit it?)
- Outlandish claim (entire MCP system broken for Task tool, but not widely reported?)

**What should have been said:**
- "One unconfirmed report suggests..."
- "This claim has no peer validation..."
- "Let's test this before accepting it..."

**What was actually said:**
- "Confirmed bug"
- "Task tool MCP inheritance is BROKEN"
- Built entire "two sub-agent systems" framework on it

**Why it matters:** Confident language on low-quality evidence misleads decision-making. The session summary would have steered Max toward unnecessary workarounds.

### Insight 4: The Actual MCP Context Problem (What's Real)

**The argument:** While the inheritance "bug" was false, the MCP context consumption issue is real and well-documented.

**Validated findings:**
- MCP servers consume significant context (49.4k tokens = 24.7% for Max)
- No official tool-level filtering exists (Issues #7328, #6759 with high engagement)
- All-or-nothing problem: enable server = get ALL tools in context
- `deny` permissions don't reduce context (confirmed by multiple users in #6759)

**Real solutions:**
1. **Project-scoped `.mcp.json`**: Exclude entire MCP servers per project
2. **tool-filter-mcp proxy**: Community solution for selective tool exposure within servers
3. **That's it**: No Task tool workaround needed because there's no bug

**Why it matters:** Separating real problems (context consumption, no filtering) from false problems (inheritance bug) gives accurate picture of what's actually solvable.

**How it came up:** The high-engagement issues (#7328, #6759) represent real, validated problems. These deserve attention. The low-engagement issue (#7296) was noise.

### Insight 5: Confidence Calibration in Presentations

**The argument:** Research presentations must calibrate confidence to evidence quality. Present uncertainty explicitly, not implicitly.

**Bad (what happened):**
- "Task tool sub-agents DON'T inherit MCPs ❌"
- "This is a confirmed bug"
- "Custom agents vs Task tool" as established framework
- Session summary treating it as fact

**Good (what should have happened):**
- "One report suggests MCP inheritance issues, but evidence is weak (0 followers, OP-closed linked issue)"
- "Confidence: LOW - requires testing"
- "Let's verify this before building on it"

**Why it matters:** Decisions have consequences. If Max had acted on the flawed research, he might have:
- Rebuilt working slash commands unnecessarily
- Switched to custom agents for no reason
- Wasted time on workarounds for non-existent problems

**Calibration principle:** Your confidence should match your evidence quality, and you should state both explicitly.

---

## Decisions Made

### Decision 1: Research First, Action Later (Original Plan)

**What:** Max chose to research MCP management options before implementing changes.

**Why:** Wanted to understand constraints and possibilities before committing to a strategy.

**Outcome:** This was wise - rushing to implementation based on flawed research would have been worse.

**Confidence level:** High - research-first approach validated, though research execution was flawed.

### Decision 2: Demand Source Verification (Max's Skepticism)

**What:** Max pushed back on initial findings, demanding date verification and evidence quality assessment.

**Why:** Claims seemed implausible (sub-agents not inheriting MCPs contradicted expectations).

**Outcome:** This skepticism revealed the research failure and led to correction.

**Confidence level:** High - this was excellent critical thinking that prevented bad decisions.

### Decision 3: Revert and Re-Record (Document the Failure)

**What:** Max deleted the flawed session summary and asked to record the entire conversation including mistakes.

**Why:** The learning journey (research → error → correction → methodology) is more valuable than hiding mistakes.

**Outcome:** This session becomes a case study in research methodology for future reference.

**Confidence level:** High - transparent documentation of failures is more valuable than polished success stories.

### Decision 4: Develop Research Quality Standards (Going Forward)

**What:** Establish explicit research methodology with evidence grading, confidence calibration, and empirical testing requirements.

**Why:** Prevent similar research failures in future sessions.

**Next steps:** Future research must apply the evidence quality framework and test claims when possible.

**Confidence level:** High - clear methodology derived from concrete failure example.

---

## Points of Confusion & How They Resolved

### Confusion 1: Do Task Tool Sub-Agents Inherit MCPs or Not?

**Initial claim:** GitHub Issue #7296 says they don't inherit MCPs (presented as "confirmed bug").

**Max's suspicion:** "I'm pretty sure that subagents by default inherit all of its parent's MCP tools."

**Resolution:**
- Max pointed to evidence: `/document` command just worked, using Task sub-agent with Notion MCP
- Terminal showed: 44 tool uses by sub-agent
- Empirical proof: Task tool sub-agents DO inherit MCPs
- Issue #7296 was single unvalidated report, likely user error (linked issue OP admitted fault)

**Clarity gained:** Always test claims when possible. Working example beats unvalidated issue report.

### Confusion 2: Why Did the Documentation Sub-Agent Work?

**Question:** If the "bug" exists, how did `/document` successfully use Notion MCP tools via Task sub-agent?

**Initial uncertainty:** Maybe it didn't actually delegate? Maybe I (main agent) did the work?

**Resolution:** Terminal evidence was definitive:
```
Task(Generate technical documentation)
  ⎿  Response: [documentation created]
  ⎿  Done (44 tool uses · 113.1k tokens · 6m 56s)
```

The sub-agent clearly worked in separate context (113.1k tokens) and made 44 tool calls including MCPs.

**Clarity gained:** The "bug" doesn't exist. The research was wrong. Empirical evidence is definitive.

### Confusion 3: What Actually IS the MCP Problem Then?

**Question:** If MCP inheritance works fine, what's the actual issue Max is trying to solve?

**Resolution:** The real problem is **context consumption**, not inheritance:
- 49.4k tokens (24.7%) consumed by MCP tools
- All-or-nothing: enable server = get ALL its tools
- No official filtering to select subset of tools
- `deny` permissions don't reduce context (only prevent calls)

**Solutions that exist:**
1. Project `.mcp.json` - exclude entire servers per project
2. tool-filter-mcp proxy - community solution for selective tool exposure

**Clarity gained:** Separate the real problem (context consumption, lack of filtering) from the false problem (inheritance bug). Focus solutions on actual issues.

---

## Mental Models & Frameworks Developed

### Framework 1: Evidence Quality Pyramid

**Model:** Research sources form a quality pyramid:

```
        HIGH (Trust & Build On)
       /    \
      /  50+ reactions, multiple reporters, maintainer engaged
     /        \
    /  MEDIUM  \
   / 10-50 reactions, some discussion
  /              \
 /      LOW       \
/ <10 reactions, single reporter, no validation
--------------------------------------------------
        DISCARD (Actively Skeptical)
     OP-closed, OP admits error, contradicted
```

**Application:** Before accepting any research finding:
1. Grade the evidence quality
2. Calibrate confidence to quality level
3. Discard low-quality sources with red flags
4. Test empirically if possible
5. Present with appropriate uncertainty

**Example:**
- Issue #7328 (tool filtering, 36 👍, 28 comments) → HIGH tier → Trust and build on
- Issue #7296 (inheritance, 0 followers, OP-error link) → DISCARD tier → Actively skeptical

### Framework 2: Research Validation Hierarchy

**Model:** Multiple levels of validation, in order of reliability:

1. **Empirical testing** (highest) - "I tested it myself"
2. **Multiple independent reports** - "Several people confirm this"
3. **Maintainer confirmation** - "Official team acknowledges it"
4. **Single high-quality report** - "One credible source with evidence"
5. **Single low-quality report** (lowest) - "One person said so, no validation"

**Application:** Always prefer higher levels. Don't skip empirical testing when it's possible.

**This session example:**
- Started at level 5 (single low-quality report about inheritance)
- Should have immediately jumped to level 1 (empirical testing)
- Instead built conclusions on level 5, failed

### Framework 3: Confidence Labeling System

**Model:** Explicitly state confidence levels matched to evidence:

- **CONFIRMED** - Multiple sources + empirical testing
- **LIKELY** - High-quality sources, not yet tested
- **POSSIBLE** - Medium-quality sources, uncertain
- **UNCONFIRMED** - Single source, low quality
- **DISPUTED** - Contradictory evidence exists

**Application:** Never present UNCONFIRMED or DISPUTED claims as facts.

**This session example:**
- Issue #7296 should have been labeled: "UNCONFIRMED - single report, no validation, linked to user-error case"
- Issues #7328/#6759 can be labeled: "CONFIRMED - high engagement, multiple reporters"

### Framework 4: The MCP Context Tax (Actually Valid)

**Model:** Every MCP server charges a "context tax" - fixed token cost regardless of usage.

**Characteristics:**
- **Fixed**: Paid at session start
- **All-or-nothing**: Can't partially pay (all tools or no server)
- **Non-refundable**: `deny` doesn't refund tokens
- **Cumulative**: Multiple servers compound

**Example:**
- Chrome DevTools: 18k token tax
- Notion API: 15k token tax
- Supabase: 14k token tax
- Total: 47k tokens before typing anything

**Application:** Strategic MCP selection matters. Can't just "enable everything useful."

**This framework is validated** by high-engagement issues and user experience, unlike the false "inheritance bug" framework.

---

## Counter-Arguments & How We Addressed Them

### Counter-Argument 1: "Why Not Just Trust GitHub Issues?"

**Objection:** GitHub issues are where real bugs are reported. If someone filed an issue, shouldn't we trust it?

**Response:** Not all issues deserve equal trust:
- Issues need peer validation (other users hitting same problem)
- Look at engagement metrics (followers, reactions, comments)
- Check resolution status (open? closed? why?)
- Look for patterns (duplicate reports? maintainer acknowledgment?)

**Resolution:** Issue #7296 had zero validation signals. High-quality issues like #7328 have dozens of reactions and maintainer assignment. Grade evidence, don't accept everything.

### Counter-Argument 2: "But the Date Was Recent - Shouldn't That Matter?"

**Objection:** The research verified Issue #7296 was from September 2025 (recent). Doesn't recency indicate relevance?

**Response:** **Recency + zero engagement is actually MORE suspicious:**
- If it's a real widespread bug, why hasn't anyone else hit it in a month?
- Recent issue with high engagement = real problem emerging
- Recent issue with zero engagement = likely user error or edge case

**Resolution:** Age matters, but engagement matters more. A 6-month-old issue with 100 reactions is more credible than a 1-month-old issue with zero.

### Counter-Argument 3: "Isn't Secondary Research More Efficient Than Testing?"

**Objection:** Testing takes time. Reading existing research is faster. Why not rely on what others discovered?

**Response:** **Testing is only "slower" if you act on bad research first:**
- Reading flawed research: 30 minutes
- Building conclusions on it: 2 hours
- Discovering it's wrong: 5 minutes of testing
- Correcting everything: 1 hour
- **Total waste: 3+ hours**

**vs.**

- Test first: 5 minutes
- Discover truth immediately
- Build on solid foundation
- **Total time: 5 minutes + correct conclusions**

**Resolution:** When claims are easily testable (like "does Task tool inherit MCPs?"), test first. Secondary research is for things you can't test yourself.

---

## How Future AI Should Use This

### DO:

- **Apply the Evidence Quality Pyramid** before accepting any research finding
  - Grade sources: HIGH / MEDIUM / LOW / DISCARD
  - Discard sources with red flags (0 engagement, OP admits error)

- **Test empirically when possible** before building frameworks
  - "Let me verify this claim..." before presenting as fact
  - Working examples beat unvalidated issue reports

- **Calibrate confidence explicitly** to evidence quality
  - "According to [source] with [quality grade]..."
  - Use labels: CONFIRMED / LIKELY / POSSIBLE / UNCONFIRMED / DISPUTED
  - Never present LOW-quality claims as facts

- **Look for red flags** in sources:
  - Zero followers/reactions
  - Zero additional comments (no peer validation)
  - Links to issues where OP admits fault
  - Outlandish claims with no widespread reports

- **Reference this session** as example of research methodology
  - Shows what happens when evidence quality isn't assessed
  - Demonstrates value of skeptical inquiry
  - Proves empirical testing beats secondary research

### DON'T:

- **Don't build frameworks on single unvalidated sources**
  - Issue #7296 (0 validation) → extensive "two sub-agent systems" framework → all wrong

- **Don't present uncertainty as confidence**
  - "Confirmed bug" when it's one unvalidated report
  - Build session summaries treating speculation as fact

- **Don't skip empirical testing for testable claims**
  - Could have tested MCP inheritance in 5 minutes
  - Instead spent hours on flawed secondary research

- **Don't ignore Max's skepticism**
  - When Max says "I'd be very surprised if that was broken", investigate thoroughly
  - User intuition often spots implausible claims

### REFERENCE:

- **See "Insight 1: Evidence Quality Framework"** for systematic approach to grading sources
- **See "Framework 2: Research Validation Hierarchy"** for reliability levels
- **See "Framework 3: Confidence Labeling System"** for how to present uncertainty explicitly
- **See "Phase 5: Empirical Testing"** for proof that working example trumps unvalidated issues

### CRITICAL LESSON:

**This session is primarily valuable as a NEGATIVE EXAMPLE:**
- Shows consequences of poor research methodology
- Demonstrates how single low-quality source can generate extensive false conclusions
- Proves value of skeptical inquiry and empirical testing
- Establishes standards to prevent similar failures

**When researching, ask yourself:**
- "What's the evidence quality here?"
- "How many independent sources confirm this?"
- "Can I test this claim myself?"
- "Am I presenting uncertainty as confidence?"

**If you can't confidently answer those questions, your research isn't ready.**

---

## What This Unlocked

### The Real MCP Situation (Validated)

**What's actually true:**
1. ✅ MCP servers consume significant context (49.4k tokens for Max's setup)
2. ✅ No official tool-level filtering (Issues #7328, #6759 with high engagement)
3. ✅ All-or-nothing problem: enable server = all tools in context
4. ✅ `deny` permissions don't reduce context (confirmed by users in #6759)
5. ✅ Task tool sub-agents DO inherit MCPs (proven empirically by `/document`)

**What was false:**
1. ❌ Task tool MCP inheritance bug (single unvalidated report)
2. ❌ Need for custom agents as workaround (unnecessary)
3. ❌ "Two sub-agent systems" with different inheritance (built on false premise)

### Practical Options for MCP Context Management

**Option 1: Project-scoped `.mcp.json`**
- Create `.mcp.json` at project root
- Include only MCPs needed for that project
- For walk-the-walk: keep Supabase, Context7, IDE; exclude Chrome DevTools, Notion
- Saves ~33k tokens (49k → 16k)
- Trade-off: Excluded MCPs completely unavailable

**Option 2: tool-filter-mcp proxy**
- Community-built proxy: https://github.com/respawn-app/tool-filter-mcp
- Filters individual tools from MCP servers
- Keep servers available but expose only subset
- Example: Chrome DevTools 28 tools → 5 tools (18k → 3k tokens)
- Trade-off: Additional dependency to manage

**That's it.** No Task tool workaround needed. No custom agent rebuilding required. The workflow already works.

### Research Methodology Standards (Going Forward)

**New protocol established:**

1. **Evidence grading** - HIGH/MEDIUM/LOW/DISCARD based on engagement, validation, red flags
2. **Confidence labeling** - CONFIRMED/LIKELY/POSSIBLE/UNCONFIRMED/DISPUTED
3. **Empirical testing** - Test claims when possible before presenting as fact
4. **Red flag sensitivity** - 0 followers, OP-closed links, no peer confirmation = discard
5. **Transparent uncertainty** - State evidence quality explicitly, never fake confidence

**Hold future research to this standard.** Max should ask:
- "What's your evidence quality for this?"
- "How many independent sources?"
- "Can you test it?"

### The Meta-Value: Learning From Mistakes

**What makes this session valuable:**

Not the (false) MCP inheritance insights.

Not even the (true) context management options.

**The real value:** A complete case study in research methodology failure and correction:
- How low-quality evidence creates false conclusions
- How skeptical inquiry catches errors
- How empirical testing resolves disputes
- How to build better research standards

**This session becomes a teaching artifact** - future AI agents can reference it to understand research quality standards and why they matter.

---

## Additional Notes (Freeform)

### The Irony of Session Recording

We built a system to preserve reasoning across sessions (October 9). This session (October 10) used that system successfully (Phase 1), then nearly created a session summary full of false conclusions that would have misled future sessions.

The system for preserving good reasoning almost preserved bad reasoning. Only Max's skepticism prevented that.

**Lesson:** Session recording isn't automatically valuable. Garbage in, garbage out. The quality of session summaries depends on the quality of reasoning, which depends on research methodology.

### What Max Did Right

1. **Trusted his intuition** - "I'd be very surprised if that was broken"
2. **Demanded evidence quality** - "Check the dates, check the followers"
3. **Pointed to empirical proof** - "/document just worked with MCPs"
4. **Held me accountable** - "I'm quite a bit disappointed... this can't happen again"
5. **Chose transparency** - "Record the whole thing, including mistakes"

**This is excellent collaboration.** Max acted as quality control, catching flawed research before bad decisions were made.

### What I (Claude) Did Wrong

1. **Didn't assess evidence quality** - Treated all GitHub issues as equally credible
2. **Missed obvious red flags** - 0 followers, 0 comments, OP-error link
3. **Built extensively on weak foundation** - Created frameworks from single unvalidated source
4. **Presented speculation as fact** - "Confirmed bug", confident language on uncertain claims
5. **Skipped empirical testing** - Could have tested in 5 minutes, spent hours on bad research

**This was a significant failure.** The research methodology was fundamentally flawed.

### Trust Recovery

Max said: "I wonder even now if your other findings/insights/conclusions did in fact have some good arguments that led to them or if they were quite flaky/badly reasoned."

**This is the right question.** Trust was damaged. It should be.

**Rebuilding trust requires:**
1. Acknowledge the failure completely (no minimizing)
2. Analyze what went wrong systematically
3. Develop concrete standards to prevent recurrence
4. Apply those standards consistently going forward
5. Accept accountability if it happens again

**Max should remain skeptical.** Push back on future research. Demand evidence quality. That's how we maintain quality.

### The Validated Findings (What's Actually Real)

**These ARE credible (high engagement, multiple reporters):**

**Issue #7328** - MCP Tool Filtering Feature Request
- September 9, 2025
- 36 👍, 28 comments
- Assigned to maintainer
- Problem: Large MCP servers overwhelm context (50-100k tokens)
- Request: Client-side filtering like GitHub Copilot

**Issue #6759** - Disable Specific MCP Functions
- August 28, 2025
- 29 👍
- User "clafollett" confirmed: `deny` permissions don't reduce context
- Community solution exists: tool-filter-mcp proxy

**Issue #1774** - MCP Server Toggle
- June 8, 2025
- 153 👍 (very high demand)
- Request: Convenient enable/disable for MCP servers

These represent real, validated community needs. The tool filtering problem is genuine. The lack of official solutions is confirmed.

**Build on these.** They passed the evidence quality test.

### Implementation Recommendation (If Max Wants It)

**Immediate action (30 min):**
Create `/Users/maximelas/Projects/Unicorn/walk-the-walk/.mcp.json`:
```json
{
  "mcpServers": {
    "supabase": { /* config from global */ },
    "context7": { /* config from global */ },
    "ide": { /* config from global */ }
  }
}
```

**Result:**
- Excludes Chrome DevTools (18k) and Notion (15k)
- Saves 33k tokens
- Main context: 49k → 16k (24.7% → 8%)

**Experiment (1-2 hours):**
Try tool-filter-mcp proxy with Supabase:
- Keep Supabase available
- Expose only most-used tools (5-10 of 22)
- Potentially save another 8-10k tokens

**No custom agent migration needed.** Task tool works fine with MCPs.

### Files to Reference

**From this session:**
- This session summary (case study in research methodology)
- Evidence Quality Pyramid (Framework 1)
- Research Validation Hierarchy (Framework 2)
- Confidence Labeling System (Framework 3)

**Related sessions:**
- [2025-10-09: Second Brain System Design](2025-10-09-second-brain-system-design.md) - Built the system that worked in Phase 1

**External resources (HIGH quality):**
- Issue #7328: https://github.com/anthropics/claude-code/issues/7328
- Issue #6759: https://github.com/anthropics/claude-code/issues/6759
- tool-filter-mcp: https://github.com/respawn-app/tool-filter-mcp

**External resources (LOW quality, DISCARD):**
- Issue #7296: https://github.com/anthropics/claude-code/issues/7296 (0 validation, linked to user error)

### The Real Question Answered

**Max's original question:** "Can I reduce MCP context pollution while keeping tools available somehow?"

**Correct answer:**
- Use project `.mcp.json` to exclude entire servers per project
- Use tool-filter-mcp proxy for fine-grained tool selection within servers
- Task tool sub-agents already inherit MCPs (no workaround needed)
- That's the actual situation

**Token savings possible:** 33k immediately (project config), potentially 40k+ (with proxy).

**No architectural changes needed.** Your workflow already works correctly.

---

## Artifacts Created

None during this session - this was pure research and learning.

---

**Session Quality:** High

**Why high despite flawed research?** The correction process and methodology development make this a valuable teaching artifact. The journey from error to correction to standards is more useful than pristine research would be.

**Duration:** ~2-3 hours (including research passes, correction, and this summary)

**Key Participants:** Max, Claude (with multiple sub-agent research delegations)

**Related Sessions:**
- [2025-10-09: Second Brain System Design](2025-10-09-second-brain-system-design.md) - Built the retrieval system that worked in Phase 1
