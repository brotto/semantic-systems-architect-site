---
sidebar_position: 6
sidebar_label: "Application B — Operations plan"
---

# Application B — Operations plan

## Objective

In this application, you will produce a complete **operations plan** for your AI system — the document that ensures the system stays reliable, trustworthy, and improving after launch day.

If Application A was the launch plan (getting the system into production), this application is the sustainability plan (keeping the system healthy and growing). Together, they form the complete product lifecycle strategy.

---

## Why this matters

Launch day is not the finish line. It is the starting line.

The vast majority of an AI system's life is spent in production — being used, being monitored, encountering problems, being updated, and growing. A system that launches brilliantly but degrades over time is worse than a system that launches modestly but improves continuously, because the first one destroys trust while the second one builds it.

**Everyday analogy:** think about buying a car. The showroom experience matters — the test drive, the features, the price. But what truly determines your satisfaction is what happens after you drive off the lot. Does the car start reliably every morning? Is the maintenance affordable? Does the dealer respond when something breaks? Can the car handle a road trip, not just a commute? Are there mechanics who know how to fix it?

Your operations plan is the "ownership manual" for your AI system. It tells the team how to keep the system running, how to handle problems, how to grow capacity, and how to evolve the system as the world changes around it.

---

## The assignment

Produce a complete operations plan for the same AI system you used in Application A. This plan covers four areas: monitoring and health, incident response, scaling strategy, and evolution roadmap.

---

## Document structure

Your operations plan should contain the following six sections.

### Section 1: System health dashboard (one page)

Define the complete monitoring framework for your system. This is the control panel that operators use to understand system health at a glance.

**1a. SLO definitions**

Define at least 10 SLOs across these categories:

**Infrastructure SLOs:**

| SLO | Target | SLI (how measured) | Alert threshold | Error budget |
|---|---|---|---|---|
| Availability | [X]% uptime | Health check endpoint, 30-second intervals | Below target for 5 minutes | [X] minutes/month |
| Latency | p95 under [X]s | Response time percentile tracking | p95 exceeds [X]s for 10 minutes | [X] violations/month |
| Error rate | Below [X]% | HTTP 5xx responses / total | Above [X]% for 5 minutes | [X]% budget |

**Semantic SLOs:**

| SLO | Target | SLI (how measured) | Alert threshold | Error budget |
|---|---|---|---|---|
| Classification accuracy | Above [X]% | Weekly human-reviewed sample of [X] items | Below target in weekly review | [X]% budget |
| Hallucination rate | Below [X]% | Automated fact-check + random audit | Above threshold in any audit window | [X]% budget |
| Confidence calibration | Within [X]% | Comparing confidence to actuals weekly | Calibration gap exceeds [X]% | [X] points |
| Safety violation rate | Zero critical | Guardrail monitoring + incident reports | Any critical violation | Zero tolerance |
| Fallback rate | Below [X]% | Requests requiring human intervention / total | Above threshold for 24 hours | [X]% budget |

**Business SLOs:**

| SLO | Target | SLI (how measured) | Alert threshold | Error budget |
|---|---|---|---|---|
| Cost per outcome | Below $[X] | Total cost / completed outcomes, daily | Exceeds target by 20% | [X] budget |
| User satisfaction | Above [X]/5 | Post-interaction survey | Below target in weekly average | [X] points |
| Task completion rate | Above [X]% | Outcomes completed without escalation | Below target for 1 week | [X]% budget |

**1b. Dashboard layout**

Describe how the information is organized for operators. Think of it like the instrument panel in an airplane cockpit — the most critical information in the center, secondary information on the sides, historical trends below.

Specify:
- What is visible at a glance (top-level health indicators: green/yellow/red)
- What requires one click to access (detailed metrics per SLO)
- What requires deeper investigation (historical trends, drill-down to individual requests)

**1c. Alert routing**

Define where alerts go based on severity and type:

| Alert type | Severity | First responder | Escalation path | Channel |
|---|---|---|---|---|
| System down | S1 | On-call engineer | Engineering manager, then VP | Page + phone |
| Accuracy below SLO | S2 | On-call engineer | Domain expert, then product lead | Page + chat |
| Cost spike | S3 | On-call engineer | Engineering manager | Chat notification |
| Drift detected | S4 | On-call engineer | Logged for weekly review | Email |

### Section 2: Ownership model and on-call (one page)

Define who is responsible for what, and how the team is organized for operational support.

**2a. Ownership matrix**

| Component | Primary owner | Backup | Responsibilities |
|---|---|---|---|
| Infrastructure | [Role/Name] | [Role/Name] | Uptime, deployment, capacity |
| AI model performance | [Role/Name] | [Role/Name] | Accuracy, drift, retraining |
| Domain/ontology | [Role/Name] | [Role/Name] | Ontology updates, contract revisions |
| Evaluation suite | [Role/Name] | [Role/Name] | Test maintenance, evaluation runs |
| Governance/compliance | [Role/Name] | [Role/Name] | Guardrails, audits, regulatory |
| User experience | [Role/Name] | [Role/Name] | Feedback, satisfaction, training |

**2b. On-call rotation**

Specify:
- Rotation schedule (weekly? bi-weekly?)
- Number of people in the rotation
- Skills required for on-call duty
- Handoff protocol (what the outgoing on-call communicates to the incoming)
- Compensation and sustainability (how you prevent burnout)

**2c. Escalation matrix**

| Scenario | Tier 1 (first 15 min) | Tier 2 (within 1 hour) | Tier 3 (within 4 hours) |
|---|---|---|---|
| System outage | On-call engineer | Engineering manager | VP Engineering + business stakeholders |
| Accuracy degradation | On-call engineer | Domain expert + ML engineer | Product lead + business stakeholders |
| Safety violation | On-call engineer + domain expert | Governance lead + legal | Executive team |
| Cost overrun | On-call engineer | Engineering manager | Finance + business stakeholders |
| Data breach | On-call engineer + security | CISO + legal | Executive team + regulators |

### Section 3: Incident response and learning (one and a half pages)

Define the complete incident lifecycle: detection, response, resolution, and learning.

**3a. Incident classification**

Provide your complete severity taxonomy with specific criteria for both traditional and semantic failures. Include examples for each severity level to help the on-call engineer classify quickly.

**3b. Response procedures**

For each severity level, specify:
- Response time commitment
- Communication requirements (who is notified, how, how often)
- Mitigation options available at each level
- Documentation requirements during the incident

**3c. Post-mortem process**

Specify:
- Which incidents require a post-mortem (recommendation: all S1 and S2, selected S3)
- Timeline for completing the post-mortem (recommendation: within 5 business days of resolution)
- Post-mortem template (use the template from Lesson 2 or create your own)
- Review process (who reads and approves the post-mortem)
- Action item tracking (how you ensure follow-up actions are completed)
- Learning sharing (how lessons are communicated to the broader team)

**3d. Runbook library**

List the runbooks your team needs and write at least 2 in detail. Recommended runbooks:

| Runbook | Scenario | Priority |
|---|---|---|
| RB-01 | Complete AI service failure and fallback activation | Critical |
| RB-02 | Accuracy drop below SLO threshold | Critical |
| RB-03 | Safety guardrail triggered at elevated rate | Critical |
| RB-04 | Model drift detected | High |
| RB-05 | Hallucination reported by user | High |
| RB-06 | Cost per outcome exceeding budget | Medium |
| RB-07 | User satisfaction drop | Medium |
| RB-08 | Ontology update deployment | Medium |

Write at least 2 complete runbooks with: scenario description, symptoms, pre-checks, step-by-step response, escalation criteria, rollback procedure, and communication template.

### Section 4: Scaling strategy (one page)

Define how the system will grow in the next 12-18 months.

**4a. Growth projections**

| Dimension | Current | +6 months | +12 months | +18 months |
|---|---|---|---|---|
| Daily requests | | | | |
| Active users | | | | |
| Domains served | | | | |
| Languages supported | | | | |
| Data volume (monthly) | | | | |

**4b. Model-tier strategy**

Define your routing tiers:

| Tier | Model type | Request criteria | Expected volume | Cost/request | Accuracy target |
|---|---|---|---|---|---|
| Tier 1 | [Type] | [Criteria] | [X]% of traffic | $[X] | [X]% |
| Tier 2 | [Type] | [Criteria] | [X]% of traffic | $[X] | [X]% |
| Tier 3 | [Type] | [Criteria] | [X]% of traffic | $[X] | [X]% |

**4c. Bottleneck analysis**

For your 12-month growth target, identify the top 5 bottlenecks and your solution for each:

| Bottleneck | When it hits | Impact | Solution | Investment needed |
|---|---|---|---|---|
| [Bottleneck] | At [X] requests/day | [Impact] | [Solution] | [Cost/effort] |

**4d. Cost projection**

Model your cost per completed outcome at each growth stage:

| Stage | AI processing | Human review | Infrastructure | Operations overhead | Total cost/outcome |
|---|---|---|---|---|---|
| Current | $[X] | $[X] | $[X] | $[X] | $[X] |
| +6 months | $[X] | $[X] | $[X] | $[X] | $[X] |
| +12 months | $[X] | $[X] | $[X] | $[X] | $[X] |

### Section 5: Evolution roadmap (one page)

Define how the system will evolve beyond just handling more volume.

**5a. Ontology evolution plan**

Describe anticipated ontology changes over the next 12 months:

| Change | Trigger | Timeline | Impact | Migration approach |
|---|---|---|---|---|
| [New entity or category] | [Why needed] | [When] | [What is affected] | [How to migrate] |
| [Category refinement] | [Why needed] | [When] | [What is affected] | [How to migrate] |

**5b. Capability expansion**

List new capabilities planned for the next 12 months, with dependencies and readiness criteria:

| Capability | Target quarter | Dependencies | Readiness criteria |
|---|---|---|---|
| [Capability] | [Quarter] | [What must be true first] | [How you know it is ready] |

**5c. Technical debt management**

List your top 5 items of semantic technical debt, classified by risk:

| Debt item | Risk level | Current impact | Paydown plan | Timeline |
|---|---|---|---|---|
| [Item] | High/Med/Low | [Current cost] | [Specific plan] | [When] |

Include a debt budget: what percentage of team capacity is allocated to debt paydown each quarter?

**5d. Version management policy**

Define your versioning approach:
- What is versioned (ontology, contracts, evaluation data, guardrails, models)
- Version numbering scheme
- Changelog requirements
- Rollback policy (how long are old versions retained?)
- Compatibility rules (how many versions back must the system support?)

### Section 6: Governance and compliance operations (half page)

Define the ongoing governance practices that keep the system safe and compliant.

**6a. Regular audits**

| Audit type | Frequency | Scope | Responsible | Output |
|---|---|---|---|---|
| Accuracy audit | Weekly | Random sample of [X] outputs | [Role] | Accuracy report |
| Safety audit | Monthly | All guardrail triggers + flagged outputs | [Role] | Safety report |
| Bias audit | Quarterly | Demographic analysis of outcomes | [Role] | Fairness report |
| Compliance audit | Quarterly | Full regulatory checklist | [Role] | Compliance attestation |
| Cost audit | Monthly | Per-outcome cost analysis | [Role] | Cost report |

**6b. Governance review cadence**

| Review | Frequency | Participants | Agenda |
|---|---|---|---|
| Operational review | Weekly | On-call team + engineering lead | SLO status, open incidents, upcoming changes |
| Product review | Bi-weekly | Product + engineering + domain | Feature performance, user feedback, roadmap progress |
| Governance review | Monthly | Compliance + legal + product + engineering | Audit results, policy updates, risk posture |
| Executive review | Quarterly | Executive sponsor + product lead + engineering lead | Value evidence, risk summary, investment decisions |

---

## Deliverable

A document (6-10 pages) containing all six sections:

- [ ] System health dashboard with 10+ SLOs, alert routing, and dashboard layout
- [ ] Ownership model with responsibility matrix, on-call rotation, and escalation paths
- [ ] Incident response with classification, procedures, post-mortem process, and 2+ complete runbooks
- [ ] Scaling strategy with growth projections, model-tier strategy, bottleneck analysis, and cost projection
- [ ] Evolution roadmap with ontology plan, capability expansion, technical debt register, and version management
- [ ] Governance and compliance operations with audit schedule and review cadence

---

## Evaluation criteria

| Criterion | What "good" looks like |
|---|---|
| **Operational completeness** | The plan covers prevention, detection, response, and improvement. No major operational scenario is unaddressed. A team receiving this plan could begin production operations immediately. |
| **SLO rigor** | SLOs are specific, measurable, and include both traditional and semantic metrics. Error budgets are defined. Alert thresholds are calibrated. Targets are realistic, not aspirational. |
| **Incident preparedness** | The incident classification captures both infrastructure and semantic failures. Runbooks are detailed enough for someone unfamiliar with the system to follow at 3 AM. Post-mortem process is blameless and focused on systemic improvement. |
| **Scale realism** | Growth projections are grounded in evidence or reasonable assumptions. Bottleneck analysis identifies real constraints, not hypothetical ones. Cost projections include all cost categories, not just API fees. |
| **Evolution planning** | Ontology changes are anticipated with migration plans. Technical debt is acknowledged and budgeted for. Version management is systematic. The system is designed to get better over time, not just bigger. |

---

## Tips for success

- **Make it actionable on day one.** This is not a strategic document — it is an operations manual. Every section should be immediately usable by the team responsible for running the system.
- **Be specific about numbers.** "Good availability" is meaningless. "99.5% uptime with a 3.6-hour error budget per month" is specific. "Fast response" is meaningless. "p95 latency under 2 seconds" is specific. Operations lives and dies by precision.
- **Design for the worst day, not the average day.** Your operations plan should handle the day when three things go wrong simultaneously, the lead engineer is on vacation, and a stakeholder is asking for an urgent status update. If the plan only works on a calm Tuesday, it is not a plan.
- **Connect to your earlier work.** Your SLOs should reflect the quality metrics from Module 6. Your governance operations should implement the controls from Module 7. Your scaling strategy should honor the architectural decisions from Modules 2-5. This plan is the operational expression of everything you have designed.
- **Include the human side.** On-call burnout is real. Runbook fatigue is real. Alert fatigue is real. Your plan should acknowledge these human factors and include sustainability measures: rotation limits, alert tuning to reduce noise, clear escalation paths so no one person carries too much weight.
