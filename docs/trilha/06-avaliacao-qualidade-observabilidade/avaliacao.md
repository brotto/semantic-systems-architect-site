---
sidebar_position: 7
sidebar_label: "Assessment"
---

# Module 6 — Assessment

## What you should have produced

By completing this module, you should have the following artifacts:

| # | Artifact | Source |
|---|---|---|
| 1 | Metric contract set with 5-8 metrics, metric chains, and quality scorecard | Lesson 1 practice activity |
| 2 | 20-case eval suite with four test case types, scoring rubrics, and release gate | Lesson 2 practice activity |
| 3 | Operational monitoring design with traces, decision events, alerts, runbook, and triage matrix | Lesson 3 practice activity |
| 4 | 50+ case quality suite with automated summary and quality scorecard | Application A |
| 5 | Regression drill report with baseline, controlled change, detection, mitigation, and post-incident review | Application B |

---

## Assessment rubric

Each dimension is scored **0, 1, or 2**. Total possible: **10 points**. Passing threshold: **8/10**.

### Dimension 1: Metric relevance (0-2)

| Score | Description |
|---|---|
| **0** | Metrics are arbitrary or disconnected from business value. No metric chains exist. The metrics tracked don't tell you whether the system is actually serving its purpose. |
| **1** | Some metrics are connected to business KPIs, but the chains are incomplete or some metrics lack clear thresholds. The metric set is either too small (fewer than 4) or too large (more than 12) to be practical. Both metric families (objective and semantic) are present but not balanced. |
| **2** | All metrics trace from business KPIs through quality indicators to technical signals via complete metric chains. The set is appropriately sized (5-8 metrics) with a balanced mix of objective and semantic families. Each metric has a contract with green/yellow/red thresholds, a measurement method, and an owner. The pain-of-failure test has been applied to prioritize metrics. Potential alignment traps are identified. |

### Dimension 2: Eval suite quality (0-2)

| Score | Description |
|---|---|
| **0** | Fewer than 20 test cases. Cases are mostly happy path with no adversarial or uncertainty testing. Expected outputs are vague ("a good response"). No scoring rubrics. No release gate. |
| **1** | 20-50 test cases with some variety, but distribution is unbalanced (e.g., 80% happy path). Scoring rubrics exist but lack calibration examples. Expected outputs are specific for some cases but vague for others. A release gate exists but has only 1-2 checks. |
| **2** | 50+ test cases with intentional distribution across all four types (happy path, edge, adversarial, uncertainty). Expected outputs are specific and unambiguous for every case. Scoring rubrics include calibration examples at multiple score levels. Automated and human/LLM-as-judge evaluation methods are both represented. Release gate has mandatory and warning checks covering the most critical quality dimensions. The suite is documented well enough for someone else to run it. |

### Dimension 3: Monitoring effectiveness (0-2)

| Score | Description |
|---|---|
| **0** | No trace architecture. No alerts defined. No incident runbook. The monitoring design would not detect a quality degradation until users complain. |
| **1** | Trace architecture exists but doesn't capture decision events or context snapshots. Some alerts are defined but lack sustained thresholds or have no owners. An incident runbook exists but is too generic (not specific to the system's failure modes). The triage process is mentioned but not formalized. |
| **2** | Complete trace architecture with stage-level detail, decision events, and context snapshots for at least one end-to-end request. Alerts are designed at multiple levels (critical, high, medium, low) with sustained thresholds, contextual messages, owners, and runbook references. At least one detailed incident runbook covers immediate actions, diagnosis steps, mitigation options, and post-incident review. A triage matrix with priority levels and response times is defined. |

### Dimension 4: Decision readiness (0-2)

| Score | Description |
|---|---|
| **0** | The quality infrastructure produces data but doesn't support decisions. There's no clear process for what happens when a metric goes red. No release gate. No mitigation playbook. |
| **1** | Release gates exist and would catch major regressions, but the mitigation process is unclear. The quality scorecard shows metrics but doesn't include trends or action items. Decision processes exist for some scenarios but not others. The regression drill was completed but the mitigation was superficial. |
| **2** | The quality infrastructure directly supports operational decisions. Release gates are well-designed with mandatory and warning checks. The quality scorecard includes trends, status indicators, and specific action items. The regression drill demonstrates a complete cycle: detect, diagnose, mitigate, verify. The mitigation resolves regressions without introducing new ones. A reader can look at the scorecard and know exactly what action to take next. |

### Dimension 5: Learning loop maturity (0-2)

| Score | Description |
|---|---|
| **0** | No evidence that monitoring findings feed back into system improvement. The eval suite is static. Incidents are resolved but not analyzed for prevention. No post-incident review process. |
| **1** | Some feedback exists — the regression drill identifies new test cases to add, or the monitoring design mentions updating alerts. But the loop is incomplete: findings are identified but not acted on, or actions are taken but not verified. Post-incident review exists but lacks concrete prevention measures. |
| **2** | The learning loop is fully demonstrated. The regression drill produces specific improvements: new test cases added to the eval suite, alert thresholds refined, runbooks updated, and prevention measures identified. The post-incident review connects the incident to broader system improvements. It's clear that every incident makes the system stronger, not just fixed. The eval suite, alerts, and runbooks are treated as living documents that evolve with each finding. |

---

## Self-assessment checklist

### Lessons

- [ ] I can build a metric chain from business KPI to quality indicator to technical signal
- [ ] I understand the difference between objective metrics (accuracy, latency, cost) and semantic metrics (coherence, policy adherence, usefulness, trust)
- [ ] I can write a metric contract with thresholds, measurement methods, and ownership
- [ ] I can identify alignment traps where improving one metric degrades another
- [ ] I can design test cases across four types: happy path, edge, adversarial, and uncertainty
- [ ] I can write scoring rubrics with calibration examples for subjective quality dimensions
- [ ] I understand how LLM-as-judge evaluation works and when to use it vs. human review
- [ ] I can design release gates with mandatory and warning checks
- [ ] I can design stage-level traces with decision events and context snapshots
- [ ] I can design alerts with sustained thresholds, contextual messages, and clear ownership
- [ ] I can write an incident runbook with diagnosis steps and mitigation options
- [ ] I understand the triage process for prioritizing multiple simultaneous issues

### Application A — SSA quality suite

- [ ] My suite has 50+ test cases with proper distribution across all four types
- [ ] Expected outputs are specific and unambiguous for every test case
- [ ] Scoring rubrics have calibration examples at multiple levels
- [ ] Metric contracts trace from business KPIs to technical signals
- [ ] The release gate has at least 3 mandatory checks and 2 warning checks
- [ ] The automated summary template shows all key information at a glance
- [ ] The quality scorecard shows metric status, trends, and action items

### Application B — Regression drill

- [ ] Baseline is established with all metrics documented
- [ ] The controlled change is realistic and clearly described
- [ ] I predicted the impact before measuring it
- [ ] Regressions are detected with case-by-case root cause analysis
- [ ] The mitigation strategy is appropriate and verified with a re-run
- [ ] Post-incident review identifies concrete improvements to the eval suite, alerts, and runbooks
- [ ] The learning loop is closed — the system is demonstrably stronger after the drill

---

## What passing means

Scoring **8/10 or higher** means you can:

- Design quality metrics that connect directly to business outcomes, with clear thresholds and ownership
- Build comprehensive evaluation suites that catch regressions before they reach users
- Implement operational monitoring that makes system behavior visible and problems detectable
- Execute a complete incident response cycle: detect, diagnose, mitigate, verify, and learn
- Close the learning loop so that every incident makes the system stronger

---

## If you don't pass

- **Low on metric relevance:** trace each of your metrics back to a business KPI. If you can't explain why the business cares about a metric, remove it. If a stakeholder would ask about something your metrics don't cover, add it. The metric chain exercise in Lesson 1 is the key tool.

- **Low on eval suite quality:** check your test case distribution. If more than 50% of your cases are happy path, add more edge and adversarial cases. If your expected outputs say "a good response," rewrite them with specific criteria. Add calibration examples to your rubrics — they're what make scoring consistent.

- **Low on monitoring effectiveness:** go through the trace template from Lesson 3 and fill it in for one real request path. Identify 3-5 decision events where the system makes choices that could go wrong. For each one, define what a "wrong" decision would look like and what alert would detect it. Then write the runbook for that alert.

- **Low on decision readiness:** ask yourself: "If the quality scorecard showed a red metric right now, what would I DO?" If the answer isn't clear and specific, your infrastructure is measuring but not supporting decisions. Add action items to the scorecard, define the mitigation options in your runbook, and make the release gate specific enough to be automated.

- **Low on learning loop maturity:** review your regression drill report. For each finding, write: (1) what specific test case you would add to prevent this regression from recurring, (2) what alert threshold change would detect it faster, and (3) what runbook update would help resolve it more efficiently. These three actions close the loop.

---

## Bridge to Module 7

You now have a system that is designed (Modules 1-4), instrumented with context (Module 5), and measured with quality infrastructure (Module 6). But one critical dimension remains: **what happens when someone deliberately tries to break it? What happens when the stakes involve not just quality but safety, privacy, and ethics?**

**Module 7 — Security, Governance and Ethics** addresses the adversarial reality of production AI systems. You'll learn to defend against attacks, implement governance frameworks that ensure accountability, and design ethical guardrails that prevent your system from causing harm — even when it's technically working as designed. If Module 6 proves the system works correctly, Module 7 proves it works responsibly.
