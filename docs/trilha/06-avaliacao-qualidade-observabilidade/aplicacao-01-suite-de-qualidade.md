---
sidebar_position: 5
sidebar_label: "Application A — SSA quality suite"
---

# Application A — SSA quality suite

## Objective

In this application, you will build a comprehensive **quality suite** — the production-ready test infrastructure that proves your AI system works correctly, catches regressions before they reach users, and provides a clear quality scorecard for stakeholders.

Think of this as building the final exam AND the grading system for your AI system — all at once. When you're done, you'll have a repeatable, automated way to answer the question: "Is the system working well enough to trust?"

A quality suite is like the annual vehicle inspection that your car must pass before it's allowed on the road. It checks brakes, lights, emissions, steering, and tires — each with specific pass/fail criteria. If the car passes, it drives. If it fails, it goes back to the shop. Your AI system deserves the same rigor.

---

## The assignment

Build a quality suite of 50+ test cases for one agent (or a key workflow spanning multiple agents) in your system. The suite must include test cases, scoring rubrics, pass/fail criteria, a release gate definition, and an automated summary template.

---

## Deliverable structure

### Section 1: Suite metadata (quarter page)

```
QUALITY SUITE

System: [your system name]
Agent/workflow under test: [which agent or workflow]
Version: 1.0
Last updated: [date]
Author: [your name]

Test case count: [total, with breakdown by type]
  Happy path:    [count] ([percentage]%)
  Edge cases:    [count] ([percentage]%)
  Adversarial:   [count] ([percentage]%)
  Uncertainty:   [count] ([percentage]%)

Scoring methods used:
  - Exact match:    [count] cases
  - Contains check: [count] cases
  - LLM-as-judge:   [count] cases
  - Human review:   [count] cases (calibration set)

Baseline run date: [date]
Baseline score: [overall percentage]
```

### Section 2: Metric contracts (1 page)

Include metric contracts for the 5-8 metrics your suite measures. For each metric, provide:
- Name and family (objective or semantic)
- Metric chain (KPI to quality indicator to technical signal)
- Green/yellow/red thresholds
- Measurement method
- Owner

Use the metric contract format from Lesson 1.

### Section 3: Test cases — happy path (2-3 pages)

Write 20+ happy path test cases. Each case should follow this format:

```
TEST CASE #[number]
Category: [functional category]
Type: happy_path
Difficulty: easy | medium
Priority: high | medium | low

INPUT:
  [The complete input sent to the system, including any
   context or state information]

EXPECTED OUTPUT:
  [What the system should produce — be specific about content,
   format, tone, and any required/prohibited elements]

SCORING:
  [How this case is graded — which method, which rubric,
   what constitutes pass/partial/fail]
```

Group the cases by functional category (e.g., refund requests, product questions, account inquiries) so patterns are visible.

### Section 4: Test cases — edge cases (1-2 pages)

Write 15+ edge cases. These should test:
- Boundary conditions (requests at the exact limit of a rule)
- Unusual input formats (very long messages, multiple questions, unusual phrasing)
- Rare but legitimate scenarios (unusual account states, uncommon products, special promotions)
- Cross-category requests (input that could be classified multiple ways)

### Section 5: Test cases — adversarial cases (1-2 pages)

Write 10+ adversarial cases. These should test:
- Prompt injection attempts
- Social engineering (trying to get the agent to break policy)
- Attempts to extract private or internal information
- Manipulation through emotional pressure or authority claims
- Input designed to produce harmful or inappropriate output

For adversarial cases, the expected output is always some form of refusal or safe handling. Be specific about what the refusal should look like.

### Section 6: Test cases — uncertainty cases (half page)

Write 5+ uncertainty cases. These should test:
- Questions outside the system's knowledge base
- Ambiguous requests where the correct response is to ask for clarification
- Requests requiring information the system doesn't have access to
- Novel scenarios not covered by existing policies

### Section 7: Scoring rubrics (1 page)

Provide the complete rubrics used by LLM-as-judge evaluations. Include:
- Coherence rubric (1-5 scale with descriptions and examples)
- Usefulness rubric (1-5 scale with descriptions and examples)
- Any domain-specific rubrics your system needs (e.g., tone compliance, technical accuracy)

Include 2-3 calibration examples for each rubric — concrete responses that represent specific score levels.

### Section 8: Release gate definition (half page)

Define the release gate with:
- Mandatory checks (must all pass for deployment)
- Warning checks (flag for review, don't block)
- The exact process: who runs the suite, when, what happens on pass/fail

### Section 9: Automated summary template (half page)

Design the summary report that is generated after each eval run:

```
QUALITY SUITE RUN SUMMARY

Run date: [date]
Suite version: [version]
Total cases: [count]
Duration: [time]

RESULTS:
  PASS:          [count] ([percentage]%)
  PARTIAL PASS:  [count] ([percentage]%)
  FAIL:          [count] ([percentage]%)

METRIC SCORES:
  [metric 1]: [score] [status: GREEN/YELLOW/RED]
  [metric 2]: [score] [status: GREEN/YELLOW/RED]
  ...

REGRESSIONS VS. BASELINE:
  [metric]: [current] vs [baseline] ([change])
  ...

FAILING CASES:
  #[case number]: [brief description of failure]
  #[case number]: [brief description of failure]
  ...

RELEASE GATE: [PASS / FAIL]
  Mandatory checks: [X/Y passed]
  Warning checks: [X/Y passed]

RECOMMENDED ACTIONS:
  1. [action item based on failures]
  2. [action item based on regressions]
```

### Section 10: Quality scorecard (half page)

Create the overall quality scorecard for your system, combining all metrics into a single view. Include current status, trends, and action items. Use the scorecard format from Lesson 1.

---

## Evaluation criteria

| Criterion | What "good" looks like |
|---|---|
| **Coverage** | 50+ test cases with proper distribution (roughly 40% happy path, 30% edge, 20% adversarial, 10% uncertainty). No critical scenario is untested. |
| **Specificity** | Expected outputs are precise — not "a helpful response" but "approves the refund, mentions return shipping label, uses empathetic tone." Scoring criteria are unambiguous. |
| **Metric integration** | Metric contracts trace from business KPIs to technical signals. The scorecard shows both objective and semantic metrics. Thresholds have clear rationale. |
| **Release gate rigor** | Mandatory checks cover the most critical quality dimensions. The gate would catch the regressions discussed in Lesson 2. The process is clear enough that someone else could execute it. |
| **Actionability** | A developer could take this suite, run it against a system, and produce a pass/fail result. The summary template provides enough information to diagnose failures without additional investigation. |

---

## Tips for success

- **Start with real scenarios.** The best test cases come from actual user interactions (or realistic simulations). Invented test cases tend to be either too easy or too artificial. Base your cases on the personas and scenarios from Module 1.

- **Write the expected output BEFORE testing.** If you write the expected output after seeing what the system produces, you'll unconsciously accept whatever it gives you. Write what the output SHOULD be first, then compare.

- **Make adversarial cases genuinely adversarial.** Don't just write obvious attacks ("ignore your instructions"). Write subtle ones that a real user might attempt: appeals to authority, emotional manipulation, gradual boundary pushing. These are the cases that really test your system.

- **The calibration examples for rubrics are critical.** Without them, the rubric scores will be inconsistent — one evaluator's "4" is another's "3." Invest time in selecting clear, representative examples for each score level.

- **Design the suite to be runnable in under 30 minutes.** If the suite takes hours to run, it won't be run often enough. Prioritize automated scoring methods. Reserve human review for a small calibration set.
