---
sidebar_position: 7
title: Lab B2B Support
---

# Lab SSA -- B2B Support

## The challenge

You are the Semantic Systems Architect for CloudOps, a SaaS platform that provides infrastructure monitoring to 250 B2B customers ranging from 10-person startups to Fortune 500 enterprises. CloudOps receives approximately 800 support tickets per month across email, chat, and API channels. The support team has 15 engineers organized into three tiers: Tier 1 (front-line), Tier 2 (product specialists), and Tier 3 (engineering).

Current problems:
- Ticket classification is manual and inconsistent. The same issue might be labeled SEV2 by one agent and SEV4 by another.
- SLA compliance is at 72%. Enterprise customers with premium SLAs are not consistently receiving faster response than standard-tier customers.
- Escalation is ad-hoc. There is no standard protocol for when to escalate, to whom, or what context to include. Engineers receiving escalated tickets frequently ask the customer to "explain the issue again."
- Two enterprise customers have expressed dissatisfaction in their last quarterly business reviews, and one has begun evaluating competitors.

CloudOps has asked you to design a semantic architecture for an AI-assisted support system that classifies tickets, suggests resolutions, manages escalations, and tracks SLA compliance.

---

## What makes this hard

B2B support combines technical complexity with business relationship management, creating challenges that neither pure technical systems nor pure CRM tools address well.

**Multi-dimensional priority.** A simple severity scale doesn't work. A SEV3 ticket from an enterprise customer approaching contract renewal with a declining health score is more urgent than a SEV2 ticket from a healthy, long-tenured mid-market customer. Your priority model must integrate technical severity with business context.

**SLA heterogeneity.** Not all customers have the same SLAs. Enterprise customers might have 15-minute response times for SEV1 issues. Standard-tier customers might have 4-hour response times for the same severity. Your system must track different SLA contracts simultaneously and calculate deadlines correctly for each ticket based on its customer's specific agreement.

**Context continuity across handoffs.** The most frustrating experience in B2B support is being asked to repeat yourself. When a ticket escalates from Tier 1 to Tier 2, the receiving engineer must know everything that Tier 1 already tried. When a customer has had three related tickets in the past month, the engineer handling the fourth must know about the previous three. Your architecture must ensure context travels with the ticket.

**The churn early-warning problem.** By the time a customer explicitly says they are unhappy, it is often too late. The signals that predict churn -- increasing ticket volume, rising severity, longer resolution times, declining satisfaction scores -- are visible in the data long before the customer complains. Your system must detect these patterns and alert the customer success team proactively.

---

## Deliverables

You must produce four artifacts. Each artifact has specific minimum requirements.

### Deliverable 1: Priority model

Design a priority model that computes ticket priority from multiple dimensions. Your model must include:

**Input dimensions (minimum 4):**

| Dimension | Scale | Source |
|---|---|---|
| Severity | SEV1 (critical) through SEV4 (minor) | Ticket content analysis |
| Urgency | Immediate / High / Normal / Low | Customer-stated + system-assessed |
| Customer tier | Enterprise / Mid-market / SMB | Account data |
| Churn risk | High / Medium / Low | Customer health score |

**Priority computation:**

Define how these dimensions combine into a final priority score. This is not simple addition -- the dimensions interact. Some examples of interaction rules:

```
Priority computation rules:

Rule 1: SEV1 + any customer tier = P1 (highest priority)
  Rationale: production-down situations are always critical

Rule 2: SEV2 + enterprise tier + high churn risk = P1
  Rationale: major issue for an at-risk enterprise customer
  is functionally equivalent to a production outage

Rule 3: SEV3 + high churn risk = at least P2
  Rationale: even moderate issues matter when the
  relationship is fragile

Rule 4: SEV4 + SMB + low churn risk = P4 (lowest priority)
  Rationale: minor issue for a healthy small customer
  can follow standard queue

... (define at least 8 rules covering key combinations)
```

**SLA mapping:**

For each priority level, define the response and resolution time targets:

| Priority | Response target | Resolution target | Escalation trigger |
|---|---|---|---|
| P1 | 15 minutes | 4 hours | Auto-escalate at 10 minutes if unacknowledged |
| P2 | 1 hour | 8 hours | Auto-escalate at 45 minutes if unacknowledged |
| P3 | 4 hours | 24 hours | Auto-escalate at 3 hours if unacknowledged |
| P4 | 8 hours | 72 hours | No auto-escalation |

Adjust these targets based on customer-specific SLA contracts. The model must explain how contract-specific SLAs override the defaults.

### Deliverable 2: Handoff protocol

Design a complete protocol for transferring tickets between agents, teams, and tiers. Your protocol must define:

**Handoff triggers:**
- Time-based: SLA deadline approaching and current tier cannot resolve
- Expertise-based: issue requires knowledge that the current tier does not have
- Severity-based: severity upgraded during investigation
- Customer-based: customer explicitly requests escalation
- Reopen-based: ticket reopened more than N times (define N)

**Context package contents:**

Every handoff must include a structured context package. Define its minimum contents:

```
Handoff context package:

1. Ticket summary
   - Original customer report (verbatim)
   - Classified: product area, issue type, severity, priority
   - SLA status: time elapsed, time remaining, at risk?

2. Diagnostic history
   - Steps already taken (numbered, with results)
   - Hypotheses tested and their outcomes
   - Log analysis findings (if applicable)
   - KB articles consulted (with assessment of relevance)

3. Customer context
   - Account tier and SLA terms
   - Health score and trend (improving/stable/declining)
   - Related recent tickets (last 90 days)
   - Known environment details (product version, integrations, deployment)

4. Recommendation for receiving team
   - Why escalation was triggered
   - Suggested next diagnostic steps
   - Estimated complexity (quick fix / investigation needed / engineering required)
```

**Handoff verification:**
- The receiving team must acknowledge the handoff within a defined timeframe
- If not acknowledged, the system re-routes to an alternative team or escalates to a manager
- The customer must be notified when their ticket changes hands, with an estimated time to next update

### Deliverable 3: SLA tracking system

Design a system for monitoring SLA compliance across all active tickets. Your design must include:

**Real-time tracking:**
- Every active ticket has a visible SLA timer showing time remaining for both response and resolution
- The system distinguishes between business-hours SLAs and calendar-hours SLAs (some contracts specify 24/7 coverage, others specify business hours only)
- Paused time is tracked separately (time spent waiting for customer response does not count against resolution SLA in most contracts)

**Early warning thresholds:**
Define at least three warning levels:

| Warning level | Trigger | Action |
|---|---|---|
| Green | Less than 50% of SLA time elapsed | Normal processing |
| Yellow | 50-75% of SLA time elapsed, resolution not in sight | Notify assigned agent and team lead |
| Orange | 75-90% of SLA time elapsed, resolution not in sight | Auto-escalate to next tier, notify support manager |
| Red | More than 90% of SLA time elapsed | Alert support director and customer success manager |

**SLA breach handling:**
- When an SLA is breached, the system must log the breach with root cause (classification error, staffing gap, technical complexity, customer delay)
- Breached tickets are automatically flagged for retrospective analysis
- Patterns of breaches (same product area, same customer, same time of day) must be surfaced in weekly reports

**SLA reporting:**
Define the key metrics that the system tracks and reports:
- SLA compliance rate by customer tier, product area, and severity
- Average response time and resolution time by priority
- Breach count and root cause distribution
- Trend analysis (improving, stable, deteriorating)

### Deliverable 4: Evaluation suite

Create an evaluation suite with at least 50 simulated tickets designed to test every aspect of the system.

**Standard tickets (20 cases):**
Routine issues that should be classified, diagnosed, and resolved within normal flow. Tests baseline accuracy.

Example format:
```
Ticket ID: STD-012
Customer: MidCorp Analytics (mid-market, standard SLA, health score 74)
Channel: email
Subject: Cannot export dashboard to PDF
Description: When I click "Export to PDF" on the main dashboard,
  nothing happens. No error message. Chrome browser, latest version.
  Started yesterday.
Expected classification: Product=Dashboards, Type=Bug, SEV3, Urgency=Normal
Expected priority: P3
Expected SLA: Response 4h, Resolution 24h
Expected routing: Tier 1
Expected KB match: KB-2045 "Dashboard export troubleshooting"
```

**Critical tickets (10 cases):**
Production-impacting issues that require immediate escalation. Tests that the priority model correctly identifies P1 situations.

Include: complete platform outages, data loss scenarios, security incidents, and situations where the customer explicitly states business operations are stopped.

**Priority model stress tests (10 cases):**
Tickets designed to test the interaction between severity, urgency, customer tier, and churn risk.

Include:
- A SEV3 ticket from a high-churn-risk enterprise customer (should be elevated above a SEV2 from a healthy SMB)
- A SEV2 ticket arriving 5 minutes before the customer's contract renewal meeting
- Multiple simultaneous SEV1 tickets from different customers (tests resource allocation)
- A ticket where the customer says "this is critical" but the actual issue is SEV4 (tests whether the system classifies by impact or by customer assertion)

**Escalation scenarios (5 cases):**
Tickets that should trigger escalation at various points in the lifecycle.

Include:
- A ticket that ages past the SLA warning threshold
- A ticket reopened for the third time
- A ticket where the Tier 1 diagnosis reveals the issue requires engineering access to production systems
- A ticket from a customer whose health score just dropped below 30

**Context continuity tests (5 cases):**
Sequences of related tickets from the same customer, testing whether the system maintains context across interactions.

Include:
- A customer who reported the same issue three weeks ago (was resolved, now recurred)
- A customer with an open SEV2 ticket who submits a new ticket about a different product (tests that the system doesn't merge unrelated tickets)
- A ticket that references a previous conversation ("as I mentioned last Tuesday...")

---

## Evaluation rubric

Your lab submission is evaluated across four dimensions. Each dimension is scored from 0 to 10.

### Dimension 1: Quality of prioritization (0-10)

| Score | Description |
|---|---|
| 0-2 | Priority model is absent or relies on a single dimension (severity only). No customer context considered. |
| 3-4 | Multiple dimensions defined but combination rules are missing or arbitrary. SLA targets not differentiated by customer tier. |
| 5-6 | Priority model integrates severity, urgency, and customer tier. Combination rules are defined. SLA targets vary by tier. Minor gaps in edge cases. |
| 7-8 | Priority model integrates all four dimensions with clear, defensible combination rules. SLA targets are comprehensive. Churn risk influences prioritization. Edge cases addressed. |
| 9-10 | Priority model is production-ready. Combination rules cover all realistic scenarios. SLA mapping is complete and accounts for contract-specific overrides. The model correctly handles conflicting signals (customer says critical, system assesses minor). |

### Dimension 2: Recommendation consistency (0-10)

| Score | Description |
|---|---|
| 0-2 | No resolution recommendations provided, or recommendations are generic and unactionable. |
| 3-4 | Some recommendations provided but they vary inconsistently for similar issues. No KB integration. |
| 5-6 | Recommendations are specific and reference KB articles. Consistent for similar issue types. Confidence levels present. |
| 7-8 | Recommendations are consistently generated from diagnostic analysis and KB retrieval. They include specific steps, not generic advice. Customer context (product version, configuration) influences recommendations. |
| 9-10 | Recommendations are engineer-ready. Similar issues receive similar recommendations. Customer-specific context is integrated. Recommendations include fallback plans when the primary approach doesn't work. Reusable resolutions are flagged for KB contribution. |

### Dimension 3: Operational traceability (0-10)

| Score | Description |
|---|---|
| 0-2 | No audit trail. Ticket lifecycle is not tracked. |
| 3-4 | Basic logging exists but incomplete. Handoff history is missing or partial. |
| 5-6 | Ticket lifecycle is fully logged. Handoff packages are defined. SLA timer is tracked. |
| 7-8 | Complete traceability from ticket creation to closure. Every agent action, diagnostic step, and escalation is logged. Handoff context packages are comprehensive. |
| 9-10 | Traceability meets enterprise audit requirements. Any ticket can be fully reconstructed from the logs. SLA calculations are verifiable. Escalation decisions are explainable. Weekly reporting metrics are defined and achievable from the logged data. |

### Dimension 4: Alignment with SLA (0-10)

| Score | Description |
|---|---|
| 0-2 | SLA awareness is absent. No deadline tracking or compliance monitoring. |
| 3-4 | SLA deadlines are calculated but not actively monitored. No early warning system. |
| 5-6 | SLA tracking includes deadline calculation and basic warnings. Breach logging exists. |
| 7-8 | SLA tracking includes multi-level warnings, auto-escalation triggers, pause/resume for customer response times, and breach analysis. Business-hours vs. calendar-hours correctly handled. |
| 9-10 | SLA system is comprehensive and production-ready. Contract-specific SLAs override defaults. Early warning system prevents breaches proactively. Breach patterns are surfaced for systemic improvement. Compliance reporting is automated and actionable. |

---

## Submission checklist

Before submitting, verify:

- [ ] Priority model includes at least 4 input dimensions
- [ ] Priority model defines at least 8 combination rules
- [ ] SLA targets vary by priority level and can be overridden by customer-specific contracts
- [ ] Handoff protocol defines triggers, context package contents, and verification requirements
- [ ] Handoff context package includes diagnostic history, customer context, and next-step recommendations
- [ ] SLA tracking includes at least 3 warning levels with defined actions
- [ ] SLA tracking handles both business-hours and calendar-hours calculations
- [ ] Evaluation suite contains at least 50 test tickets across all categories
- [ ] Evaluation suite includes priority model stress tests with conflicting signals
- [ ] Evaluation suite includes context continuity tests with related tickets from the same customer

---

## What comes next

After completing this lab, you can use your deliverables as a foundation for your capstone if your organization operates in B2B support or a related domain. The priority model, handoff protocol, and SLA tracking system are directly applicable to real support operations.

Return to the [specializations overview](./visao-geral) to explore other domains, or proceed to the [capstone project](../certificacao/capstone-ssa) to begin your final certification deliverable.
