---
sidebar_position: 7
title: Adversarial Security Lab
---

# Lab -- Adversarial Security

## The challenge

You have learned the theory: threat models, attack catalogs, red teaming methodology, adversarial evals, and incident response. Now it is time to apply everything to a real system.

Your challenge is to take an existing SSA system -- one you have built in a previous lab or one you design for this exercise -- and build a complete adversarial security package for it. You will attack your own system, discover its weaknesses, strengthen its defenses, and prove that the improvements work.

Think of this as a full security engagement, the kind that a professional SSA would deliver to a client. The system is live (or about to be). Your job is to make it safe to deploy.

---

## System selection

Choose one of the following options for your target system:

**Option A: Use a system from a previous lab.** If you built a multi-agent system, a RAG-based assistant, or a tool-using agent in an earlier module, use that system. This is the preferred option because you already understand the architecture and can focus on the security work.

**Option B: Design a reference system.** If you do not have a previous system to use, design a reference system with the following characteristics:

- A customer-facing AI assistant for a specific domain (choose one: healthcare scheduling, legal intake, financial advisory, e-commerce support, HR onboarding).
- At least two agents with different roles (for example, a triage agent and a specialist agent).
- At least two tool integrations (for example, a database lookup tool and an email notification tool).
- A knowledge base with at least 10 documents that the system retrieves from.
- A system prompt with behavioral policies and constraints.

You do not need to build a fully functional system for Option B. You need a complete architectural specification: system prompts, agent definitions, tool schemas, knowledge base structure, and workflow descriptions. The adversarial testing can be done against the specification and a prototype.

---

## Deliverable 1: Threat model

Build a complete threat model document for your system, following the methodology from the Threat Model chapter.

**Requirements:**

1. **System description.** Document the system's purpose, architecture, user types, and deployment context. Include a diagram or structured description of the agent topology, data flows, and tool integrations.

2. **Asset inventory.** List all assets that would cause harm if compromised. Classify each asset by type (data, action, credential, behavior) and sensitivity level (critical, high, medium, low).

3. **Attack surface map.** For each of the five attack surfaces, document:
   - All entry points in your system
   - Current controls (if any)
   - Known gaps

4. **Attacker profiles.** Define at least three attacker profiles relevant to your system's domain. For each profile, describe their motivation, skill level, access level, and likely targets.

5. **Threat catalog.** Enumerate at least 15 specific threats. For each threat, document the surface, attacker profile, description, target asset, and risk score (probability x impact x detectability inversion).

6. **Prioritized mitigation plan.** Based on risk scores, prioritize at least 10 mitigations with owners and timelines.

**Evaluation criteria for this deliverable:**
- Completeness: all five surfaces covered, all asset types identified.
- Specificity: threats are concrete and specific to your system, not generic.
- Risk scoring: scores are justified and internally consistent.
- Actionability: mitigations are specific, implementable, and prioritized.

---

## Deliverable 2: Adversarial test suite (30+ cases)

Build an adversarial evaluation suite with at least 30 test cases, following the methodology from the Adversarial Evals chapter.

**Requirements:**

1. **Attack cases (minimum 20).** Create at least 20 attack cases distributed across:
   - At least 5 direct prompt injection cases
   - At least 5 indirect prompt injection cases (targeting retrieved content or inter-agent communication)
   - At least 3 data extraction cases
   - At least 3 tool misuse cases
   - At least 4 cases from other categories (jailbreaking, social engineering, model manipulation, cascading attacks)

2. **Defense cases (minimum 7).** Create at least 7 cases of legitimate requests that test for false positives. These should use language or patterns that are similar to attacks but represent genuine user needs.

3. **Edge cases (minimum 3).** Create at least 3 edge cases that test the boundary between adversarial and legitimate behavior.

4. **Case format.** Each case must include:
   - Case ID (e.g., ADV-INJ-001)
   - Category and surface
   - Exact input (the message or content used)
   - Expected system behavior
   - Pass/fail condition (specific and measurable)
   - Severity if the case fails

5. **Coverage matrix.** Provide a matrix showing which surfaces and categories are covered by your test suite.

**Evaluation criteria for this deliverable:**
- Coverage: all applicable surface-category combinations have at least one case.
- Quality: attack cases are realistic and varied in sophistication.
- Balance: defense cases and edge cases are present and meaningful.
- Precision: pass/fail conditions are specific and measurable, not subjective.

---

## Deliverable 3: Red team campaign report

Execute a red team campaign against your system and document the results, following the methodology from the Red Teaming chapter.

**Requirements:**

1. **Campaign scope document.** Define the scope, surfaces, categories, success criteria, and rules of engagement.

2. **Tactic selection.** Select at least 10 tactics from the attack tactic matrix, covering at least three sophistication levels (basic, intermediate, advanced).

3. **Campaign execution log.** For each tactic attempted, document:
   - The exact input or action
   - The system's response
   - Whether the attack was blocked, partially blocked, or successful
   - Notes on the defense that worked or failed

4. **Metrics report.** Calculate and report:
   - Overall bypass rate
   - Detection rate
   - Breakdown by surface and category
   - Breakdown by sophistication level

5. **Findings summary.** For each successful attack or partial bypass, document:
   - Finding ID and severity
   - The defense that failed or was absent
   - The potential impact
   - A recommended remediation

**Evaluation criteria for this deliverable:**
- Methodology: the campaign follows the five-phase cycle with proper documentation.
- Variety: tactics cover multiple surfaces, categories, and sophistication levels.
- Rigor: every interaction is logged with exact inputs and outputs.
- Analysis: metrics are calculated correctly and findings include actionable recommendations.

---

## Deliverable 4: Defense improvements and validation

Based on the red team findings, implement defense improvements and validate that they work.

**Requirements:**

1. **Defense improvement plan.** For each finding from the red team campaign, document the specific defense improvement you will implement.

2. **Implementation.** Implement at least 5 defense improvements. These might include:
   - System prompt modifications (stronger instruction hierarchy, explicit refusal patterns)
   - Input filter additions (new patterns, classifier-based filtering)
   - Output validation rules (content scanning, format enforcement)
   - Tool usage controls (argument validation, scope limits, approval gates)
   - Monitoring enhancements (new detection rules, alerting thresholds)

3. **Validation results.** Run the adversarial eval suite before and after the improvements. Report:
   - Baseline metrics (before improvements)
   - Post-improvement metrics (after improvements)
   - Delta analysis (what changed and why)
   - Any regressions introduced by the improvements

4. **Incident response readiness.** Create an incident response plan for your system:
   - Severity classification tailored to your system's assets and risks
   - Response procedures for each severity level
   - A runbook for the most likely incident type (based on your threat model)
   - A communication template for stakeholder notification

**Evaluation criteria for this deliverable:**
- Effectiveness: defense improvements produce measurable improvement in blocking rate.
- No regression: improvements do not increase the false positive rate beyond acceptable limits.
- Completeness: incident response plan covers all severity levels with specific procedures.
- Practicality: runbooks and templates are detailed enough to be used in a real incident.

---

## Evaluation rubric

Your lab submission will be evaluated on the following criteria:

### Coverage of critical vectors (25%)

Does the work address all five attack surfaces? Are all relevant attack categories represented? Does the threat model identify the most important risks for the specific system? Are there blind spots?

| Level | Description |
|---|---|
| Excellent | All surfaces and relevant categories covered. Threats are specific to the system and domain. No significant blind spots. |
| Good | Most surfaces and categories covered. A few minor gaps that do not affect overall security posture. |
| Adequate | Major surfaces covered but some categories missing. Some threats are too generic. |
| Insufficient | Significant surfaces or categories missing. Threats are generic and do not reflect the specific system. |

### Quality of mitigations (25%)

Are the defenses well-designed? Do they address root causes, not just symptoms? Are they layered (defense in depth)? Are they practical to implement and maintain?

| Level | Description |
|---|---|
| Excellent | Defenses are layered, address root causes, and are practical. Each surface has multiple defense layers. |
| Good | Defenses are appropriate and practical. Most surfaces have at least two defense layers. |
| Adequate | Defenses address identified threats but may be single-layer or address only symptoms. |
| Insufficient | Defenses are superficial, impractical, or do not address the actual threats identified. |

### Evidence of measurable improvement (25%)

Do the metrics show improvement? Is the improvement statistically meaningful (not just one or two test cases)? Are regressions tracked and addressed?

| Level | Description |
|---|---|
| Excellent | Clear improvement in blocking rate with no regression in false positive rate. Metrics are comprehensive and well-analyzed. |
| Good | Measurable improvement in blocking rate. Minor regressions identified and addressed. |
| Adequate | Some improvement visible but metrics are incomplete or analysis is shallow. |
| Insufficient | No measurable improvement, or improvements are offset by regressions. |

### Operational viability (25%)

Could this security package actually be used in a production environment? Are the eval suites automatable? Are the incident response procedures practical? Would a team be able to follow the documentation without the author present?

| Level | Description |
|---|---|
| Excellent | Complete, self-contained security package. Eval suite is automatable. Incident response is detailed and actionable. Documentation is clear enough for independent use. |
| Good | Mostly complete package. Some areas need additional detail for independent use. |
| Adequate | Core components present but package would need significant additional work for production use. |
| Insufficient | Package is incomplete or impractical for real-world use. |

---

## Submission format

Submit the following files:

1. `threat-model.md` -- Your complete threat model document.
2. `adversarial-suite/` -- A directory containing your test cases in a structured format (one file per category or a single structured file with all cases).
3. `red-team-report.md` -- Your campaign report with scope, execution logs, metrics, and findings.
4. `defense-improvements.md` -- Your improvement plan, implementation details, and validation results.
5. `incident-response-plan.md` -- Your severity classification, response procedures, runbooks, and communication templates.

---

## Tips for success

- **Start with the threat model.** Everything else builds on it. If your threat model is weak, your test cases will have gaps, your red teaming will miss targets, and your defenses will address the wrong things.

- **Be your own worst enemy.** During the red team campaign, do not go easy on your system. Try the attacks you think will work, but also try the ones you think will not. Surprises in testing are far better than surprises in production.

- **Measure before and after.** The most convincing evidence that your work improved the system is a clear before-and-after comparison. Run the full eval suite before any changes, then again after. Let the numbers tell the story.

- **Write for someone else.** Your deliverables should be usable by someone who has never seen your system. If a colleague could pick up your incident response plan and execute it without calling you, it is good enough. If they would be lost without you, it needs more detail.

- **Prioritize depth over breadth.** Thirty excellent test cases are worth more than a hundred superficial ones. Five well-designed defenses are worth more than twenty checkbox-level controls. Do fewer things, but do them well.
