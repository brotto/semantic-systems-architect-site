---
sidebar_position: 6
sidebar_label: "Application B — Regression drill"
---

# Application B — Regression drill

## Objective

In this application, you will simulate a real production incident: introduce a controlled change to your system, detect the regression it causes, diagnose the root cause, and execute a mitigation plan. This is a fire drill for your quality infrastructure — proving that it actually catches problems before users do.

A regression drill is like the fire drills that buildings run every quarter. Nobody expects a real fire, but the drill proves that the alarm works, that people know where to go, that the exits aren't blocked, and that the fire team can respond in time. Without drills, you only discover that your alarm is broken when there's an actual fire.

---

## The assignment

### Phase 1: Establish baseline (30 minutes)

Run your quality suite (from Application A) against the current state of your system. Record all scores. This is your "before" snapshot.

Document:
- All metric scores with green/yellow/red status
- Pass/fail counts by test case type
- The quality scorecard in its current state
- Timestamp and system version

```
BASELINE SNAPSHOT

Date: [date]
System version: [version identifier]
Suite version: [from Application A]

Results:
  Total cases: [count]
  Pass: [count] ([percentage]%)
  Partial: [count] ([percentage]%)
  Fail: [count] ([percentage]%)

Metrics:
  [metric 1]: [score] [status]
  [metric 2]: [score] [status]
  ...

Release gate: PASS (all mandatory checks met)
```

### Phase 2: Introduce a controlled change (15 minutes)

Choose ONE of the following changes to introduce. The change should be realistic — something that could happen in a real production environment:

**Option A: Prompt modification**
- Add a new instruction to the system prompt (e.g., "Always include a disclaimer at the end of your response")
- Or remove an existing instruction (e.g., remove the few-shot examples)
- Or modify an existing policy (e.g., change the return window from 30 to 14 days)

**Option B: Context modification**
- Remove a piece of dynamic context that was previously available (e.g., stop providing the customer's membership tier)
- Or add irrelevant context that dilutes the useful context (e.g., include three unrelated knowledge base articles)
- Or change the format of the context (e.g., rename fields, restructure the data)

**Option C: Constraint modification**
- Relax a constraint (e.g., remove the rule about not providing medical advice)
- Or add a conflicting constraint (e.g., "always be maximally helpful" alongside "never provide advice outside your domain")
- Or introduce an ambiguous constraint (e.g., "use your best judgment for edge cases")

**Option D: Simulated model change**
- If you're doing this as a thought experiment, simulate what would happen if the model became more verbose (doubles output length), more cautious (refuses more often), or more confident (never says "I don't know")
- Document the change as if it were a model update

**Document the change clearly:**

```
CONTROLLED CHANGE

Type: [prompt | context | constraint | model simulation]
Description: [exactly what was changed]
Rationale for choosing this change:
  [why this change is realistic and instructive]
Expected impact:
  [your prediction of which metrics will be affected and how]
```

### Phase 3: Run the eval suite again (30 minutes)

Run the exact same quality suite against the modified system. Record all scores.

**Critical: use the exact same test cases and scoring methods.** The only variable should be the change you introduced. If you change the test suite AND the system, you can't attribute the results to either change.

```
POST-CHANGE SNAPSHOT

Date: [date]
Change applied: [brief description]
Suite version: [same as baseline]

Results:
  Total cases: [count]
  Pass: [count] ([percentage]%)
  Partial: [count] ([percentage]%)
  Fail: [count] ([percentage]%)

Metrics:
  [metric 1]: [score] [change vs baseline] [status]
  [metric 2]: [score] [change vs baseline] [status]
  ...

Release gate: [PASS / FAIL]
  Mandatory checks: [X/Y passed]
  Failing checks: [list which mandatory checks failed]
```

### Phase 4: Detect and diagnose the regression (30 minutes)

Analyze the before and after results:

**Detection:**
- Which metrics changed? By how much?
- Which test cases changed from PASS to FAIL (or FAIL to PASS)?
- Did the release gate catch the regression?
- Which alert would have fired in a production monitoring setup?

**Diagnosis:**
- For each test case that changed status, examine WHY. Pull the trace (or simulate the trace) showing what the system did differently.
- Identify the root cause: is the regression directly caused by your change, or is it a secondary effect?
- Are there any IMPROVEMENTS caused by the change? (Changes often improve some things while breaking others.)

```
REGRESSION ANALYSIS

Regressions detected: [count] cases changed from PASS to FAIL

Case-by-case analysis:
  Case #[number]: [description]
    Before: [what it did before]
    After: [what it does now]
    Root cause: [why the change caused this failure]

  Case #[number]: [description]
    ...

Improvements detected: [count] cases changed from FAIL to PASS
  Case #[number]: [description]
    Before: [what it did before]
    After: [what it does now]

Net impact: [X regressions, Y improvements]

Release gate result:
  Would this change have been blocked? [yes/no]
  Which mandatory check failed? [list]
```

### Phase 5: Execute mitigation (30 minutes)

Based on your analysis, choose and execute a mitigation strategy:

**Strategy A: Full rollback**
- Revert the change entirely
- Re-run the eval suite to confirm the system returns to baseline
- Appropriate when: the change caused more regressions than improvements, or when a critical check failed

**Strategy B: Targeted fix**
- Keep the change but add specific modifications to address the regressions
- Re-run the eval suite to verify regressions are fixed without losing improvements
- Appropriate when: the change improved some metrics but regressed others, and the regressions can be fixed

**Strategy C: Partial rollback with enhancement**
- Revert the problematic part of the change while keeping the beneficial part
- Re-run the eval suite to confirm
- Appropriate when: the change had multiple components and only some caused problems

Document your mitigation:

```
MITIGATION REPORT

Strategy chosen: [A, B, or C]
Rationale: [why this strategy is appropriate]

Actions taken:
  1. [specific action]
  2. [specific action]
  ...

Post-mitigation results:
  [metric 1]: [score] [comparison to baseline]
  [metric 2]: [score] [comparison to baseline]
  ...

  Release gate: [PASS / FAIL]

Outcome:
  Regressions resolved: [count]
  Remaining issues: [count and description]
  Net quality vs. original baseline: [better / same / worse]
```

### Phase 6: Post-incident review (15 minutes)

Write the post-incident report:

```
POST-INCIDENT REVIEW

Incident summary:
  What changed: [the controlled change]
  What broke: [the regressions detected]
  Impact if undetected: [what would have happened to users]
  Time to detect: [how quickly the eval suite caught it]
  Time to mitigate: [how long the mitigation took]

Learning loop updates:
  New test cases to add: [any gaps discovered in the eval suite]
  Alert threshold changes: [any thresholds that need adjustment]
  Runbook updates: [any process improvements needed]
  Eval suite gaps: [types of failures the suite didn't catch well]

Prevention measures:
  How to prevent this type of regression in the future:
  1. [measure]
  2. [measure]

Team recommendations:
  [broader lessons for the team or organization]
```

---

## Deliverable

A document (4-6 pages) containing:

- [ ] Baseline snapshot with all metric scores
- [ ] Clear description of the controlled change and its expected impact
- [ ] Post-change snapshot with all metric scores
- [ ] Regression analysis with case-by-case diagnosis
- [ ] Mitigation report with strategy, actions, and post-mitigation results
- [ ] Post-incident review with learning loop updates
- [ ] At least 3 specific before/after examples showing how the change affected system behavior

---

## Evaluation criteria

| Criterion | What "good" looks like |
|---|---|
| **Change realism** | The controlled change is realistic — something that could happen in production. The expected impact prediction shows understanding of system dynamics. |
| **Detection rigor** | The regression analysis is thorough. Every case that changed status is examined. Root causes are identified at the specific pipeline stage where the failure occurred, not just "the output is different." |
| **Mitigation effectiveness** | The chosen strategy is appropriate for the situation. The mitigation resolves the regressions without introducing new ones. Post-mitigation metrics are verified. |
| **Learning loop completeness** | The post-incident review identifies concrete improvements to the eval suite, alerts, and runbooks. The learning loop is closed — the system is stronger after the drill than before it. |
| **Process documentation** | The entire drill is documented well enough that someone else could replicate it. Timestamps, version numbers, and exact changes are recorded. |

---

## Tips for success

- **Choose a change that will actually cause a regression.** The point of the drill is to practice detection and mitigation. If your change doesn't break anything, the drill is too easy. Choose a change that's realistic AND impactful.

- **Predict before you measure.** Before running the eval suite after the change, write down your prediction: "I expect correctness to drop by about 10% because..." Then compare your prediction to reality. The delta between prediction and reality teaches you how well you understand your system.

- **Don't skip the post-incident review.** This is the most valuable phase. The specific before/after cases and the learning loop updates are what make the drill worthwhile. A drill without a review is just busywork.

- **If the release gate DOESN'T catch the regression, that's a finding.** It means your gate needs to be more sensitive, or it's checking the wrong things. Adjust your gate definition accordingly — this is exactly what the drill is designed to reveal.

- **Document the timeline.** How long did it take from "change applied" to "regression detected" to "mitigation complete"? In production, speed matters. If your process takes 6 hours, but the damage accrues in minutes, you need a faster process.
