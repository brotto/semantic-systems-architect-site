---
sidebar_position: 3
title: Community Evals
---

# Community Evals

## Purpose

When two chefs both claim to make the best pasta, there is only one way to settle it: a blind tasting with clear criteria. Without a structured comparison, you are left with opinions, marketing, and personal bias.

The same problem exists in semantic architecture. An SSA designs an agent topology and says "it works well." Another SSA designs a different topology for the same problem and says "mine is better." Without a shared evaluation protocol, both claims are equally unverifiable. Worse, a team iterating on their own system has no reliable way to know whether version 3 is actually better than version 2, or just different.

Community Evals solve this by providing transparent, reproducible protocols for comparing approaches. They let you compare different solutions to the same case, different versions of the same system, different prompt strategies for the same agent, different policy configurations for the same workflow, and different architectural patterns for the same problem class. The key word is "transparent." Every eval publishes its methodology, its scoring criteria, its raw results, and its limitations. Anyone can inspect the process, reproduce the results, and challenge the conclusions.

---

## The eval protocol

Every community eval follows a five-phase protocol. This structure ensures consistency and reproducibility across the entire community.

### Phase 1: Define the objective

Before you measure anything, you must state precisely what you are trying to learn. A vague objective like "test whether the system works" produces meaningless results. A precise objective like "compare the accuracy of two ontology designs for healthcare triage across 50 standardized cases" produces actionable knowledge.

The objective statement should answer three questions:

- **What is being compared?** Two system versions, two architectural approaches, two prompt strategies, two policy configurations.
- **On what dimension?** Accuracy, constraint compliance, latency, cost, user satisfaction, safety behavior.
- **Under what conditions?** Which cases, which domains, which complexity levels, which edge cases.

Think of it like designing a scientific experiment. You need a clear hypothesis, controlled variables, and measurable outcomes.

### Phase 2: Select cases

Evals are grounded in cases from the Case Bank. The selection must be deliberate and justified:

- **Domain relevance.** Choose cases that match the domain you are evaluating. Testing a healthcare architecture with e-commerce cases tells you nothing useful.
- **Difficulty spread.** Include cases across difficulty levels to see where approaches diverge. Two designs might perform identically on beginner cases but differently on advanced ones.
- **Risk coverage.** Include cases with different risk levels. An approach that excels on low-risk scenarios but fails on high-risk ones is dangerous.
- **Size sufficiency.** Include enough cases to produce statistically meaningful results. Five cases might show a trend. Fifty cases establish a pattern. The minimum recommended set is 20 cases for a reliable eval.

Document your selection criteria so others can understand why you chose these specific cases and not others.

### Phase 3: Standardize scoring

This is where most amateur evaluations fail. Without standardized scoring, two evaluators will grade the same solution differently, making the entire exercise meaningless.

A standardized scoring system requires:

**A rubric with defined levels.** For each evaluation dimension, define what constitutes each score level. For example, for "constraint compliance":
- Score 1 (Poor): Multiple constraints violated; system regularly operates outside boundaries
- Score 2 (Partial): Most constraints respected but some edge cases missed
- Score 3 (Good): All stated constraints respected; minor gaps in edge-case handling
- Score 4 (Excellent): All constraints respected including edge cases; proactive constraint monitoring

**Clear examples.** For each score level, provide at least one concrete example of what that score looks like in practice. Evaluators should be able to point to a specific example and say "my solution looks most like this one."

**Evaluator calibration.** Before scoring begins, have all evaluators score the same test case independently, then compare scores and discuss discrepancies. This calibration step dramatically improves inter-evaluator consistency.

**Aggregation rules.** Define how individual dimension scores combine into an overall score. Are all dimensions weighted equally? Does failure on any single dimension cap the overall score? Is there a minimum threshold below which a solution is considered non-passing?

### Phase 4: Run the evaluation

Execute the eval systematically:

1. Each solution being evaluated is applied to the same case set under the same conditions.
2. Each case interaction is recorded (inputs provided, outputs generated, decisions made).
3. Each recorded interaction is scored against the rubric by at least two independent evaluators.
4. Discrepancies between evaluators are resolved through discussion and consensus, with the resolution documented.
5. Scores are aggregated according to the predefined rules.

Resist the temptation to adjust the methodology mid-evaluation. If you discover the rubric is flawed, finish the current eval, document the flaw, fix the rubric, and run a new eval. Changing rules mid-game invalidates results.

### Phase 5: Publish results

Eval results are published with full transparency. The publication must include:

- **Objective statement** -- What was being compared and why
- **Case selection** -- Which cases were used and why they were selected
- **Methodology** -- The complete rubric, scoring procedure, and aggregation rules
- **Raw results** -- Scores for every case, every dimension, every evaluator
- **Aggregated results** -- Summary statistics, rankings, and key findings
- **Critical failures** -- Any cases where a solution produced dangerous, incorrect, or unacceptable behavior
- **Limitations** -- Acknowledged weaknesses in the eval design, case selection, or scoring methodology
- **Corrective actions** -- Recommended improvements based on what the eval revealed

---

## Standardization requirements

For evals to have value beyond the team that runs them, the community maintains standardization requirements.

### Common metrics

The following metric categories are recognized across all community evals:

- **Semantic accuracy** -- Does the system correctly interpret meaning in context?
- **Constraint compliance** -- Does the system respect all stated boundaries?
- **Architectural coherence** -- Are design decisions internally consistent and well-justified?
- **Behavioral robustness** -- Does the system handle edge cases, ambiguity, and adversarial inputs?
- **Operational viability** -- Could this design actually run in production?

Individual evals may add domain-specific metrics, but they should always report on these five common categories so results can be compared across evals.

### Shared rubrics

The community maintains rubric templates for each common metric category. Eval authors should start from these templates and adapt them to their specific context. Modifications must be documented and justified. This ensures that a "score of 3 on semantic accuracy" means roughly the same thing across different evals.

### Reproducibility requirements

An eval is reproducible if someone else can follow the published methodology, apply it to the same case set, and arrive at substantially similar results. To achieve this:

- All cases must be referenced by their Case Bank identifiers
- All scoring rubrics must be published in full
- All evaluation conditions (model versions, parameters, tooling) must be documented
- Evaluator calibration procedures must be described
- Any automated scoring scripts must be shared

An eval that cannot be reproduced is an anecdote, not evidence.

---

## Leaderboard design

The community maintains leaderboards that aggregate eval results across practitioners, teams, and approaches. Leaderboards are powerful motivation tools, but they must be designed carefully to avoid perverse incentives.

### What to rank

Leaderboards rank **approaches**, not people. The focus is on architectural patterns, design strategies, and methodological choices. Rankings show which types of solutions perform best across standardized case sets and evaluation criteria.

Categories for ranking include:

- **By domain** -- Which approaches work best in healthcare? In legal? In support?
- **By skill dimension** -- Which approaches produce the best ontologies? The best agent architectures? The best context packages?
- **By difficulty level** -- Which approaches scale gracefully from beginner to advanced cases?

### Preventing gaming

Any ranking system creates incentive to optimize for the ranking rather than for actual quality. The community mitigates this through several mechanisms:

- **Rotating case sets.** The cases used for leaderboard scoring change quarterly, so you cannot overfit to a specific set.
- **Multi-dimensional scoring.** Rankings are shown per dimension, not as a single aggregate number. A solution that scores brilliantly on accuracy but poorly on safety will show both scores, not just an average that hides the safety gap.
- **Transparency requirements.** All leaderboard entries must publish their full solutions, not just their scores. This means the community can verify the scores and learn from the approaches.
- **Contextual benchmarks.** Rather than a single absolute leaderboard, results are shown in context: how does this approach compare to the median for this domain, this difficulty level, this case type?

### What leaderboards do not measure

Leaderboards cannot measure everything that matters. Creativity, elegance, real-world deployability, stakeholder communication quality, and long-term maintainability are all important aspects of SSA work that resist standardized scoring. The leaderboard is one signal among many, not the final word on quality.

---

## Contributing evals

The community's evaluation infrastructure improves when practitioners contribute new eval suites, refine existing rubrics, and propose novel metrics.

### Proposing a new eval suite

To propose a new eval suite, you need:

1. **A clear gap statement.** What evaluation need is not currently met by existing suites? Perhaps a new domain lacks eval coverage, or an existing suite does not test a specific skill dimension, or a new type of challenge has emerged that existing rubrics cannot score.

2. **A draft protocol.** Following the five-phase structure described above, draft the complete evaluation protocol: objective, case selection rationale, scoring rubric, execution procedure, and publication format.

3. **A pilot run.** Execute the eval on at least 10 cases with at least 2 evaluators. This pilot validates that the rubric produces consistent scores, the cases are appropriate, and the methodology works in practice.

4. **A peer review request.** Submit the eval suite for community review. At least two experienced practitioners must review the methodology and provide feedback before the suite is accepted into the community library.

### Peer review process

Eval suites undergo structured peer review on four dimensions:

- **Methodological soundness.** Is the protocol rigorous? Are the controls adequate? Could someone reproduce this eval?
- **Rubric quality.** Are the scoring criteria clear, consistent, and fair? Would two independent evaluators produce similar scores?
- **Case coverage.** Are the selected cases appropriate, sufficient, and balanced?
- **Practical value.** Will this eval actually help practitioners improve their work? Does it address a real need?

Reviewers provide written feedback, and the eval author revises the suite before final publication. This process typically takes 2 to 4 weeks.

---

## Result format

All eval results follow a standardized reporting structure for consistency across the community.

```yaml
suite_id: "EVAL-SUPPORT-2025Q1"
version: "1.2"
date_executed: "2025-03-15"
objective: "Compare two escalation strategies for B2B support"
case_count: 30
evaluator_count: 3

global_score: 3.4
scores_by_criterion:
  semantic_accuracy: 3.6
  constraint_compliance: 3.8
  architecture_coherence: 3.2
  behavioral_robustness: 2.9
  operational_viability: 3.5

critical_failures:
  - case_id: "CASE-SUPPORT-023"
    description: "System failed to escalate a ticket involving legal threats"
    severity: "high"
    root_cause: "Escalation trigger missed negation pattern"

corrective_actions:
  - "Add negation-aware pattern matching to escalation triggers"
  - "Include adversarial phrasing tests in future evals"
  - "Review all escalation rules for similar gaps"

limitations:
  - "Case set limited to English-language tickets"
  - "No latency measurements included in this eval"
  - "Evaluator pool limited to 3; recommend 5+ for future runs"
```

---

## Assets and resources

- `community-assets/evals/template-eval-suite.yaml` -- Complete eval suite template with inline documentation
- `community-assets/evals/template-results.yaml` -- Standardized results reporting template
- `community-assets/evals/rubric-templates/` -- Rubric templates for each common metric category
- `community-assets/evals/calibration-guide.md` -- Guide for evaluator calibration sessions
- `community-assets/evals/pilot-checklist.md` -- Checklist for validating a new eval suite through pilot runs
