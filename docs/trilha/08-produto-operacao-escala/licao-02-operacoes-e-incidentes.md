---
sidebar_position: 3
sidebar_label: "Lesson 2 — Operations and incidents"
---

# Lesson 2 — Operations and incident management

## The doors are open

Your AI system is in production. Users are relying on it. Decisions are being made based on its outputs. Value is being created — or destroyed — in real time.

This is day two. And day two is fundamentally different from day one.

Building a system is like constructing a bridge. Operating a system is like keeping the bridge open to traffic during a storm, while trucks are crossing, while the river level rises, and while a repair crew is fixing a crack that nobody noticed during construction.

The skills are different. The mindset is different. The stakes are different.

This lesson teaches you the operational disciplines that keep AI systems reliable, trustworthy, and improving over time. Not the glamorous work of designing architectures and launching products — the unglamorous, essential work of keeping things running.

---

## The fire department analogy

The best way to understand operations is to think about how a fire department works.

A fire department does four things, in order of importance:

**1. Prevention.** Most of the work happens before any fire starts. Building codes. Fire inspections. Smoke detector requirements. Public education about fire safety. The goal is to prevent fires from ever happening.

In AI operations, prevention means: monitoring dashboards, alert thresholds, data quality checks, model performance tracking, regular audits. The goal is to catch problems before users notice them.

**2. Response.** When a fire happens despite prevention, the department responds. Fast. With a trained team. Following established protocols. Using the right equipment for the type of fire (grease fire vs. electrical fire vs. forest fire).

In AI operations, response means: incident detection, on-call activation, incident classification, response protocol execution. When the system fails, you need a team that knows what to do, immediately.

**3. Investigation.** After the fire is out, investigators determine what caused it. Was it arson? A wiring fault? A kitchen accident? The cause determines what prevention measures need to change.

In AI operations, investigation means: post-mortem analysis. What went wrong? Why? What was the root cause? What did we miss? This is not blame — it is learning.

**4. Improvement.** Based on the investigation, the department updates its prevention strategy. New building codes. Better inspection procedures. Updated training. The system gets stronger after each incident.

In AI operations, improvement means: updating monitoring, refining alert thresholds, improving runbooks, fixing the root cause, sharing learnings with the team. Each incident makes the system more resilient.

These four activities form a cycle: prevent, respond, investigate, improve. Then prevent better. This cycle never stops. It is the heartbeat of operational excellence.

---

## SLAs and SLOs for AI systems

### What they are

An **SLA** (Service Level Agreement) is a promise to your users. It says: "We guarantee the system will perform at this level, and if it doesn't, here are the consequences."

An **SLO** (Service Level Objective) is an internal target. It says: "We aim to maintain this level of performance, and if we drop below it, we take action."

An **SLI** (Service Level Indicator) is the measurement. It says: "Here is how we measure the performance that the SLO targets."

Think of it like a delivery service. The SLA is the promise on the website: "Your package will arrive within 3 business days, or your shipping is free." The SLO is the internal target: "We aim to deliver 98% of packages within 2 business days." The SLI is the measurement: "Percentage of packages delivered within 2 business days, measured daily."

The SLO is tighter than the SLA on purpose. If the SLO starts slipping, you investigate and fix it before the SLA is violated. The SLO is your early warning system.

### Traditional SLOs vs. AI SLOs

Traditional systems need SLOs for availability, latency, and error rate. AI systems need those plus additional SLOs that capture semantic performance.

**Traditional SLOs (still needed):**

| SLO | Target | Measurement |
|---|---|---|
| Availability | 99.5% uptime | Minutes of downtime per month |
| Latency | p95 under 2 seconds | Response time percentile tracking |
| Error rate | Less than 0.1% 5xx errors | HTTP error responses / total requests |

**AI-specific SLOs (the new ones):**

| SLO | Target | Measurement |
|---|---|---|
| Classification accuracy | Above 90% for top categories | Weekly human-reviewed sample |
| Hallucination rate | Below 2% of responses | Automated fact-checking + human audit |
| Confidence calibration | Within 5% of actual accuracy | Comparing confidence scores to actual outcomes |
| Safety violation rate | Zero critical violations per month | Automated guardrail monitoring + incident reports |
| Drift detection | Model drift flagged within 24 hours | Statistical distribution monitoring of inputs/outputs |
| Fallback rate | Below 15% of requests | Counting requests that fall to human review or default responses |

### The error budget concept

An error budget is the amount of unreliability you can tolerate. If your SLO is 99.5% availability, your error budget is 0.5% — approximately 3.6 hours of downtime per month.

Think of it like a household budget. You earn a certain amount each month and decide how to spend it. If you overspend on dining out, you have less for groceries. Similarly, if your system uses its error budget on planned maintenance, you have less tolerance for unexpected outages.

The error budget concept is powerful because it turns reliability into a resource to manage, not a binary pass/fail. It lets you make informed decisions: "We could ship this risky feature now, but we've already used 60% of our error budget this month. Let's wait until next month when we have a full budget."

For AI systems, the error budget concept extends to semantic performance. If your accuracy SLO is 90%, your "accuracy error budget" is 10% — the acceptable rate of incorrect outputs. If you notice the error rate climbing from 8% to 9.5%, you are running low on budget and should investigate before you breach.

---

## On-call practices for AI systems

### Why AI on-call is different

Traditional on-call responds to infrastructure failures: servers down, databases full, networks broken. These are visible, measurable, and have established response procedures.

AI on-call also responds to semantic failures: the system is up and returning responses, but the responses are wrong. This is harder to detect, harder to diagnose, and harder to fix.

Think about the difference between a hospital's emergency room and its infection control team. The ER handles acute, visible crises — broken bones, heart attacks, car accident injuries. The infection control team handles invisible crises — a subtle increase in post-surgical infections, a new antibiotic-resistant bacteria spreading through a ward. Both are critical. But the infection control problem is harder to detect because the patients look normal until they don't.

AI on-call needs to handle both types: the visible crash (system is down) and the invisible drift (system is up but wrong).

### On-call structure

**Tier 1: Automated monitoring**

Your first line of defense is automated. Dashboards, alerts, and automated checks that run continuously. These catch the obvious problems.

| What to monitor | How | Alert threshold |
|---|---|---|
| System availability | Health check endpoint | Any downtime over 30 seconds |
| Response latency | p50, p95, p99 tracking | p95 exceeds 3x baseline |
| Error rate | HTTP error count | Above 1% for 10 minutes |
| Output quality | Automated quality checks | Below accuracy SLO for 1 hour |
| Input distribution | Statistical drift detection | Distribution shift above threshold |
| Safety guardrail triggers | Guardrail hit counter | Any safety-critical trigger |

**Tier 2: On-call human**

When automated monitoring flags an issue, a human on-call engineer investigates. This person needs both infrastructure skills and semantic understanding.

Think of this like a building superintendent. They need to understand both the plumbing (infrastructure) and the complaints from tenants (user experience). When a tenant reports "the water tastes funny," the superintendent must investigate whether it is a pipe problem (infrastructure) or a water quality problem (the upstream source changed).

The on-call rotation should include people who understand:
- The system architecture (how components connect)
- The semantic design (what the system is supposed to do)
- The domain (what correct behavior looks like)
- The governance controls (what the system must never do)

**Tier 3: Domain expert escalation**

Some problems require domain expertise to diagnose. If the AI system is misclassifying medical complaints, you might need a medical professional to help understand what changed. If it is mishandling financial regulations, you might need a compliance expert.

Think of this like a school's escalation path. The teacher handles most classroom issues (Tier 1). The principal handles escalated issues (Tier 2). The school board handles issues that require policy expertise (Tier 3). Each tier adds specialized knowledge.

### On-call handoff protocol

When shifts change, the outgoing on-call must hand off to the incoming on-call with a clear status report:

- Current system health (green/yellow/red for each SLO)
- Open incidents (what happened, what was done, what remains)
- Known risks (anything brewing that has not yet triggered an alert)
- Recent changes (deployments, config changes, data updates in the last 24 hours)

This handoff is like a nurse shift change in a hospital. The outgoing nurse does not just say "everything's fine." They walk through each patient: "Room 203 is recovering well, Room 205 needs vitals checked at 6pm, Room 208 is new and waiting for test results." Context is everything.

---

## Incident response for AI failures

### The incident lifecycle

When something goes wrong, you follow a structured process. Panic is not a process. "Let me look at it" is not a process. A process looks like this:

**Step 1: Detect.**
How was the incident discovered? Automated alert? User complaint? Internal spot-check? The detection method matters because it tells you about the health of your monitoring.

**Step 2: Classify.**
Not all incidents are equal. You need a classification system:

| Severity | Definition | Response time | Who is notified |
|---|---|---|---|
| **Critical (S1)** | System is down, or producing dangerous outputs. Users are impacted now. Safety risk. | Immediate (within 15 minutes) | On-call + manager + domain expert |
| **Major (S2)** | Significant quality degradation. Many users affected. No immediate safety risk. | Within 1 hour | On-call + manager |
| **Minor (S3)** | Localized quality issue. Few users affected. Workaround available. | Within 4 hours | On-call |
| **Informational (S4)** | Anomaly detected but no user impact yet. Needs investigation. | Within 24 hours | On-call (logged for review) |

**For AI systems, add semantic severity criteria:**

A system that returns HTTP 200 (looks healthy) but provides wrong answers is an S1 or S2, not an S4. The traditional "is the server up?" classification does not capture semantic failures. Your classification system must include criteria like:

- Accuracy dropped below SLO threshold
- Guardrail triggered on production traffic
- Hallucination detected in customer-facing output
- Model drift exceeded acceptable bounds
- Bias detected in decision patterns

**Step 3: Communicate.**
Inform affected parties. This includes:
- Internal team: what happened, what is being done, who is leading the response
- Stakeholders: impact assessment, estimated time to resolution
- Users (if visible to them): acknowledgment of the issue, workaround if available, expected resolution

Communication must be honest and timely. "We are aware of the issue and investigating" is better than silence. "We identified the cause and expect resolution within 2 hours" is better than "we're working on it."

Think of it like a flight delay announcement. Passengers hate delays, but they hate silence even more. "We have a mechanical issue. We expect a 90-minute delay. We will update you in 30 minutes" is far better than the departure board just going blank.

**Step 4: Mitigate.**
Reduce the impact while you fix the root cause. Mitigation options for AI systems include:

- **Fallback to rules:** disable the AI and use deterministic rules for critical decisions
- **Increase human review:** route all AI decisions through human approval temporarily
- **Reduce scope:** disable the affected capability while keeping the rest running
- **Freeze inputs:** stop accepting new inputs to prevent damage while you investigate
- **Roll back:** revert to a previous known-good version of the model or configuration

Think of it like a restaurant that discovers a contaminated ingredient. You do not close the entire restaurant. You pull that ingredient from the kitchen, remove affected dishes from the menu, and continue serving everything else. You deal with the contamination while minimizing impact on customers.

**Step 5: Resolve.**
Fix the root cause. This might mean:
- Retraining or fine-tuning the model
- Updating the ontology or semantic contracts
- Fixing a data pipeline issue
- Updating guardrails
- Changing configuration

**Step 6: Verify.**
Confirm the fix works. Run your evaluation suite. Check that the SLOs are back within target. Monitor for recurrence. Do not close the incident until you have evidence that the fix is working in production.

---

## Post-mortem methodology

### The blameless post-mortem

A post-mortem is a structured analysis of an incident after it has been resolved. Its purpose is learning, not blame.

Think of it like an aviation safety investigation. When a plane has an incident, investigators do not look for someone to punish. They look for systemic factors that allowed the incident to happen: design flaws, procedural gaps, training deficiencies, communication failures. They produce recommendations that make the entire industry safer.

Your post-mortems should follow the same philosophy. The question is never "who messed up?" The question is always "what allowed this to happen, and how do we prevent it?"

### Post-mortem template

**Incident title:** [Clear description]

**Date and duration:** [When it started, when it was detected, when it was resolved]

**Severity:** [S1/S2/S3/S4]

**Impact:** [What was affected, how many users, what was the business impact]

**Timeline:**
| Time | Event |
|---|---|
| [timestamp] | [what happened] |
| [timestamp] | [what happened] |

**Detection:** How was the incident discovered? Why was it not discovered sooner?

**Root cause:** What was the underlying cause? (Not the trigger, but the root cause.)

Think about the difference between trigger and root cause. If a bridge collapses when a truck crosses it, the trigger is the truck. The root cause is the corroded support beam that nobody inspected. Post-mortems must find the corroded beam, not blame the truck.

**Contributing factors:** What other factors made this worse? (Gaps in monitoring? Unclear documentation? Understaffed on-call?)

**What went well:** What worked during the response? (Fast detection? Good communication? Effective mitigation?)

**What could improve:** What should change? (Better monitoring? Updated runbook? Additional training?)

**Action items:** Specific, assigned, and deadlined.

| Action | Owner | Deadline |
|---|---|---|
| [Specific improvement] | [Name] | [Date] |
| [Specific improvement] | [Name] | [Date] |

### The five whys (adapted for AI)

The "five whys" technique helps find root causes. You ask "why?" repeatedly until you reach a systemic cause.

**Example:**

- **The system misclassified a safety complaint as a billing issue.** Why?
- Because the customer used financial language to describe a safety concern ("they charged me for a defective product that burned my hand"). Why did this confuse the classifier?
- Because the classifier weights financial keywords heavily when the word "charged" appears. Why?
- Because our training data has many more billing complaints than safety complaints, so the model is biased toward financial interpretations. Why?
- Because we never balanced the training data for safety-critical categories. Why?
- Because our data preparation process does not include category balance as a quality check.

**Root cause:** The data preparation process lacks a quality check for category balance, especially for safety-critical categories.

**Action item:** Add a mandatory category balance review to the data preparation checklist, with specific thresholds for safety-critical categories.

Notice how each "why" moves from the symptom (misclassification) to the system (data preparation process). This is what good post-mortems do.

---

## Runbooks

### What a runbook is

A runbook is a step-by-step guide for handling specific operational scenarios. Think of it like the emergency procedures card on an airplane — a clear, concise set of instructions that anyone in the crew can follow, even under stress.

Runbooks exist because incidents happen at 3 AM when the person who designed the system is asleep. The on-call engineer needs a document that tells them exactly what to check, what to do, and when to escalate — without requiring deep system knowledge.

### Anatomy of a good runbook

**Scenario:** [What this runbook covers — one specific situation]

**Symptoms:** [How you know this scenario is happening]

**Pre-checks:** [Quick verification steps before taking action]

**Response steps:**
1. [First action — specific, concrete, unambiguous]
2. [Second action]
3. [Third action]

**Escalation criteria:** [When to call for help and who to call]

**Rollback procedure:** [How to undo what you did if it made things worse]

**Communication template:** [Pre-written message to send to stakeholders]

### AI-specific runbooks you need

**Runbook 1: Accuracy drop below SLO**
When the system's accuracy falls below the target, the on-call needs to determine: is it a data issue, a model issue, or a domain shift? Each has a different response.

**Runbook 2: Guardrail triggered at elevated rate**
When safety guardrails fire more than usual, it could mean: new attack patterns, a change in user behavior, a model update that shifted behavior, or a guardrail misconfiguration.

**Runbook 3: Model drift detected**
When the statistical distribution of inputs or outputs changes significantly, the on-call needs to determine: is this a real-world change (seasonal, market shift) or a data pipeline problem?

**Runbook 4: Hallucination reported by user**
When a user reports that the AI stated something factually incorrect, the on-call needs to verify, assess scope (one-off or systematic), and determine the response.

**Runbook 5: Complete AI service failure**
When the AI component is entirely unavailable, the system needs to fall back gracefully. The runbook should cover: enabling fallback mode, communicating to users, monitoring the fallback, and restoring AI service.

---

## The operational scorecard

All of this comes together in an operational scorecard — a single-page dashboard that shows the health of your AI system at a glance.

| Category | Metric | Target | Current | Status |
|---|---|---|---|---|
| **Availability** | Uptime | 99.5% | 99.7% | Green |
| **Latency** | p95 response time | Under 2s | 1.4s | Green |
| **Accuracy** | Classification accuracy | Above 90% | 88.3% | Yellow |
| **Safety** | Critical violations | 0 per month | 0 | Green |
| **Drift** | Input distribution shift | Below threshold | Within bounds | Green |
| **Fallback** | Requests requiring human review | Below 15% | 12% | Green |
| **Cost** | Cost per completed outcome | Under $0.15 | $0.12 | Green |
| **Incidents** | Open incidents | 0 S1/S2 | 0 | Green |

The scorecard is reviewed daily by the on-call and weekly by the team. It is the vital signs of your system — like the monitors in an ICU that show heart rate, blood pressure, oxygen levels, and temperature at a glance. When something turns yellow or red, you investigate immediately.

---

## Practice activity

For the AI system you have been building throughout this course, complete the following:

### Part 1: Define your SLOs

Create a table of at least 8 SLOs for your system — including both traditional (availability, latency) and AI-specific (accuracy, hallucination rate, drift detection). For each SLO, specify the target, the measurement method, and the alert threshold.

### Part 2: Write one runbook

Choose one of the AI-specific scenarios (accuracy drop, guardrail spike, drift detected, hallucination reported, or complete failure) and write a complete runbook following the anatomy described in this lesson. Include symptoms, pre-checks, response steps, escalation criteria, rollback procedure, and communication template.

### Part 3: Design an incident classification

Create your system's incident severity classification. Define S1 through S4, including specific criteria for both traditional failures (system down, errors) and semantic failures (accuracy drop, hallucination, bias). For each severity level, specify the response time, who is notified, and the expected resolution process.

### Part 4: Operational scorecard

Fill in an operational scorecard for your system. Even if the system is not yet in production, define the metrics, targets, and how you would measure each one. This becomes your monitoring blueprint.

---

## Key takeaways

1. **Operations is a cycle, not a state.** Prevention, response, investigation, and improvement form a continuous loop. Each incident makes the system more resilient — if you learn from it.

2. **AI systems need semantic SLOs.** Traditional availability and latency metrics are necessary but not sufficient. You must also measure and target accuracy, hallucination rate, drift, and safety violations.

3. **The error budget is your friend.** It turns reliability from a binary judgment into a resource you manage. It enables informed risk-taking and prioritized investment.

4. **Blameless post-mortems find root causes.** The question is never "who?" but always "what systemic factor allowed this?" Aviation safety improved not by punishing pilots but by fixing systems. Your AI operations should do the same.

5. **Runbooks save you at 3 AM.** Clear, specific, step-by-step guides for common scenarios let anyone on the team respond effectively under pressure. Write them before you need them.

---

## What comes next

In **Lesson 3**, we tackle the final challenge: scale. Your system is running, your operations are solid, and demand is growing. How do you serve more users, expand to more domains, and evolve the system — without breaking what already works? We'll build the scale playbook that lets you grow with confidence.
