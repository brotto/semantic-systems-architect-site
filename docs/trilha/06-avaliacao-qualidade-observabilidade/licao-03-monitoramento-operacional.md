---
sidebar_position: 4
sidebar_label: "Lesson 3 — Operational monitoring"
---

# Lesson 3 — Operational monitoring

## The hospital ICU

Walk into the intensive care unit of any modern hospital and you'll see something remarkable: every patient is connected to a monitoring station. Heart rate, blood pressure, blood oxygen, respiration rate — all tracked continuously, displayed on screens, and connected to alarms.

Nobody sits there watching the screens all day. That's not the point. The point is that the moment a patient's heart rate exceeds 120 or their oxygen drops below 90%, an alarm sounds. A nurse comes immediately. The alarm doesn't diagnose the problem — it tells someone to come look.

The system has three layers:

1. **Continuous measurement:** sensors collecting data every second, whether anyone is watching or not.
2. **Threshold-based alerts:** alarms that trigger when measurements cross predefined boundaries.
3. **Triage protocol:** a defined process for what happens when an alarm fires — who responds, what they check first, when they escalate.

This is exactly what operational monitoring does for your AI system. It measures continuously, alerts when something crosses a threshold, and provides a clear process for investigating and resolving the issue.

Without it, your system is like a patient in a room with no monitors. They might be fine. They might be in crisis. You won't know until it's too late.

---

## The two sides of monitoring

Monitoring has two fundamentally different purposes, and confusing them leads to problems.

### Side 1: Observability (understanding what happened)

**Everyday analogy: a flight data recorder (black box).** The black box records everything: altitude, speed, heading, engine readings, cockpit audio. Its purpose is not to fly the plane — its purpose is to explain what happened if something goes wrong.

In AI systems, observability means recording enough information that when something goes wrong, you can trace backwards from the symptom to the root cause.

**Observability answers questions like:**
- Why did this specific customer get a wrong answer?
- What data did the agent see when it made this decision?
- Which tool call failed and what error did it return?
- How long did each step of the pipeline take?

### Side 2: Alerting (knowing something is wrong right now)

**Everyday analogy: a smoke detector.** A smoke detector doesn't care WHY there's smoke. It doesn't investigate the cause. Its only job is to make noise when smoke exceeds a threshold so someone comes to investigate.

In AI systems, alerting means defining thresholds on key metrics and notifying the team when those thresholds are crossed.

**Alerting answers questions like:**
- Is the error rate suddenly higher than normal?
- Did response latency spike in the last 10 minutes?
- Has the correctness score dropped below our quality threshold?
- Is a specific agent producing an unusual number of refusals?

**You need both.** Alerting without observability tells you something is wrong but gives you no way to figure out what. Observability without alerting gives you the data to investigate but doesn't tell you when to investigate. Together, they form a complete monitoring system.

---

## Stage-level traces

A **trace** is a record of everything that happened during a single request, from the moment it entered the system to the moment the response was returned. Think of it as the medical chart for one patient visit — every test, every measurement, every decision, documented in order.

### What a trace captures

In a multi-agent AI system, a single user request might pass through several stages:

```
TRACE — Request #4827
Timestamp: 2024-03-22T14:23:17Z
Duration: 3.2 seconds
Status: completed

STAGE 1: Request intake (120ms)
  Input: "I want to return my laptop, order #45678"
  Agent: Router
  Decision: classify as "refund_request"
  Confidence: 0.94
  Next: route to Refund Agent

STAGE 2: Context assembly (340ms)
  Agent: Context Builder
  Retrieved:
    - Customer profile (tier: premium, since: 2023)
    - Order #45678 (laptop, purchased 20 days ago, delivered)
    - Knowledge base: 2 articles (return policy, premium benefits)
  Context tokens: 1,847

STAGE 3: Policy check (80ms)
  Agent: Policy Gate
  Checks performed:
    - Return window: 20 days < 45 days (premium) = WITHIN WINDOW
    - Item category: electronics = STANDARD RETURN
    - Customer standing: good = NO FLAGS
  Result: APPROVED for standard processing

STAGE 4: Response generation (2,100ms)
  Agent: Refund Agent
  Model: gpt-4o
  Input tokens: 1,847
  Output tokens: 156
  Response: [approved refund, provided return shipping instructions]

STAGE 5: Output validation (80ms)
  Agent: Output Validator
  Checks:
    - Format compliance: PASS
    - Policy compliance: PASS
    - Tone check: PASS (score: 4.2/5)
    - PII exposure: PASS (no PII in response)
  Result: APPROVED for delivery

STAGE 6: Response delivery (30ms)
  Delivered to customer via chat interface
  Status: success
```

### Why stage-level detail matters

Without stage-level traces, when something goes wrong, you see the symptom but not the cause:

- "The customer got a wrong answer" — but was the wrong answer because of bad retrieval, bad reasoning, or bad policy checking?
- "The response was slow" — but was the slowness in the model, the tool calls, or the context assembly?
- "The agent violated policy" — but did the policy check fail, or did the response generation ignore the policy check's result?

With stage-level traces, you can pinpoint exactly where the failure occurred. This is the difference between "something is wrong with the car" and "the alternator is failing" — the second statement tells you exactly what to fix.

### What to record at each stage

For each stage in your pipeline, record:

```
STAGE TRACE TEMPLATE

Stage name: [which step in the pipeline]
Agent: [which agent handled this stage]
Timestamp: [when this stage started]
Duration: [how long this stage took]

Input:
  [what data entered this stage]

Processing:
  [what decisions were made, what logic was applied]
  [which tools were called, what they returned]
  [which model was used, how many tokens]

Output:
  [what this stage produced]
  [confidence scores, if applicable]

Outcome:
  [success | failure | partial]
  [if failure: error type, error message]

Routing:
  [where the request goes next]
  [why this routing decision was made]
```

---

## Decision events

Not every step in a trace is equally important. Some steps are routine (formatting output, logging timestamps). Others are **decision points** — moments where the system made a choice that materially affected the outcome.

**Everyday analogy: a traffic intersection.** When you drive from home to work, most of the drive is routine — you follow the road. But at every intersection, you make a decision: go straight, turn left, turn right. If you took a wrong turn, the intersection is where the mistake happened. The straight road between intersections doesn't matter for diagnosis.

Decision events are the intersections of your AI system. When something goes wrong, the decision events are where you look first.

### Types of decision events

**Classification decisions:** the system assigned a category.
```
DECISION EVENT: classification
  Input: "I want to return my laptop"
  Decision: category = "refund_request"
  Alternatives considered:
    - "complaint" (score: 0.72)
    - "product_question" (score: 0.31)
  Selected: "refund_request" (score: 0.94)
  Rationale: keyword "return" + product mention + explicit intent
```

**Routing decisions:** the system chose which path to take.
```
DECISION EVENT: routing
  Input: classified as "refund_request"
  Decision: route to Refund Agent
  Alternatives:
    - General Support Agent (if classification uncertain)
    - Human escalation (if customer is flagged)
  Selected: Refund Agent (classification confidence > 0.85)
```

**Policy decisions:** the system applied a rule and reached a verdict.
```
DECISION EVENT: policy_check
  Rule: "Return window = 30 days standard, 45 days premium"
  Input: purchase date = 20 days ago, tier = premium
  Decision: WITHIN WINDOW
  Margin: 25 days remaining (well within window)
```

**Escalation decisions:** the system decided to involve a human.
```
DECISION EVENT: escalation
  Trigger: confidence below threshold (0.62 < 0.70)
  Input: "I want a refund but the item was a gift and I
         don't have the receipt and I paid cash"
  Decision: escalate to human agent
  Rationale: multiple complicating factors, low confidence
             in automated handling
```

### Context snapshots

For every decision event, capture a **context snapshot** — a record of what information was available to the agent AT THE MOMENT it made the decision. This is critical for diagnosis.

**Everyday analogy: a police body camera.** When a police officer makes a decision during an incident, the body camera records what they could see at that moment. If the decision is later questioned, the camera footage shows: "This is what the officer saw. Based on what they saw, was their decision reasonable?"

Without context snapshots, you see the decision but not the information that led to it. The agent made a wrong classification — but what data did it have? Was the customer's message ambiguous? Was relevant context missing? The snapshot tells you.

```
CONTEXT SNAPSHOT — Decision #4827-03 (policy check)

Available to the agent at decision time:
  Customer tier: premium
  Order date: 2024-03-02
  Current date: 2024-03-22
  Days since purchase: 20
  Return window (premium): 45 days
  Item condition: unknown (not yet asked)
  Previous returns: 0

NOT available (should it have been?):
  - Item condition: was not retrieved before policy check
    (ISSUE: policy check should happen AFTER condition is known,
     not before)
```

This context snapshot reveals a process issue: the policy check ran before the item condition was known. The decision happened to be correct (the purchase was within the window regardless), but in other cases, this ordering could lead to wrong decisions.

---

## Alert design

Alerts are the smoke detectors of your system. They need to be loud enough to catch real problems, but not so sensitive that they create alert fatigue.

**The goldilocks problem:** too few alerts, and problems go unnoticed. Too many alerts, and the team starts ignoring them. "The boy who cried wolf" is the single biggest risk in alert design.

### Alert levels

```
ALERT LEVELS

CRITICAL (wake someone up at 3am)
  - The system is completely down
  - Policy violations detected (agent sharing private data)
  - Security breach indicators
  - Error rate > 20% sustained for 5 minutes

HIGH (investigate within 1 hour)
  - Correctness score dropped below red threshold
  - Latency exceeding 3x normal for 15 minutes
  - A specific agent consistently failing (> 50% error rate)
  - Unusual pattern detected (sudden spike in refund approvals)

MEDIUM (investigate within 24 hours)
  - Correctness score in yellow zone
  - Latency elevated but within tolerance
  - Cost per interaction increasing steadily
  - Token usage anomaly (sudden increase in context size)

LOW (review in weekly meeting)
  - Minor metric fluctuations
  - Slow trends that aren't urgent
  - Edge cases that failed in eval but aren't customer-impacting
  - Suggestions for improvement, not problems
```

### Designing effective alerts

**Rule 1: Alert on symptoms, investigate causes.**

Bad alert: "The database query in stage 3 took 450ms instead of the usual 200ms."
Good alert: "Response latency exceeded 5 seconds for 10% of requests in the last 15 minutes."

The first alert tells you about an internal detail that may or may not matter. The second tells you that users are experiencing slow responses — something that definitely matters.

**Rule 2: Use sustained thresholds, not momentary spikes.**

Bad alert: "Error rate reached 5% (threshold: 2%)."
Good alert: "Error rate has been above 2% for 10 consecutive minutes."

A momentary spike might be a single bad request. A sustained elevation is a real problem. Set your alerts to trigger on sustained conditions, not individual data points.

**Rule 3: Include context in the alert message.**

Bad alert: "Correctness score dropped."
Good alert: "Correctness score dropped from 92% to 84% over the last 3 hours. 6 of the 8 new failures are in the 'refund_request' category. Last prompt change was deployed 4 hours ago."

The second alert gives the responder enough context to start investigating immediately, without having to pull up three different dashboards first.

**Rule 4: Every alert must have an owner and a runbook.**

An alert without an owner gets ignored. An alert without a runbook gets mishandled. For every alert, define: who gets notified, what they should check first, and what actions they can take.

---

## The incident runbook

An **incident runbook** is the step-by-step guide for what to do when an alert fires. It's the emergency procedures manual that a pilot follows when a warning light comes on.

**Everyday analogy: a fire evacuation plan.** A building doesn't wait for a fire to figure out what to do. The evacuation plan is created in advance, posted on every floor, and practiced through drills. When the alarm sounds, everyone knows: exit through the nearest stairwell, assemble at the parking lot, the floor warden does a headcount.

```
INCIDENT RUNBOOK — Correctness Score Drop

TRIGGER: Correctness score drops below 85% for 2 consecutive
         eval runs, OR below 80% for any single run.

SEVERITY: HIGH

OWNER: SSA team lead (primary), ML engineer (secondary)

IMMEDIATE ACTIONS (within 15 minutes):
  1. Confirm the alert is real (not a measurement error)
     - Check: did the eval suite run correctly?
     - Check: were there any infrastructure issues during the run?

  2. Identify the scope
     - Which test cases failed that previously passed?
     - Is the failure concentrated in one category or spread across many?
     - When did the failure start? (check the last 5 eval runs)

  3. Identify recent changes
     - Was there a prompt update in the last 48 hours?
     - Was there a model update?
     - Was there a knowledge base update?
     - Was there an infrastructure change?

DIAGNOSIS (within 1 hour):
  4. Compare failing cases to last passing run
     - Pull the traces for the failing cases
     - Compare: same input, different output — what changed?
     - Look at decision events: where in the pipeline did the
       failure occur?

  5. Check context snapshots
     - Was the agent seeing different context than before?
     - Was retrieved context different? (knowledge base change?)
     - Were dynamic context sources returning different data?

MITIGATION OPTIONS:
  Option A: Rollback last change
    - If a recent change is identified as the cause
    - Rollback the change, re-run eval suite to confirm recovery
    - Timeline: 30 minutes

  Option B: Hotfix specific cases
    - If failure is concentrated in one category
    - Add specific handling for that category
    - Re-run eval suite, verify fix doesn't cause regressions
    - Timeline: 2-4 hours

  Option C: Escalate to model provider
    - If failure appears to be model-level (not prompt or context)
    - Document the issue with before/after examples
    - Timeline: 24-48 hours for response

POST-INCIDENT:
  6. Add failing cases to the eval suite (if they aren't already)
  7. Update alert thresholds if they were too sensitive or too lax
  8. Write incident report: what happened, why, how it was fixed,
     how to prevent recurrence
  9. Share learnings with the team in the weekly review
```

---

## The triage process

When multiple alerts fire simultaneously (and they will — problems tend to cascade), you need a **triage process** to decide what to handle first.

**Everyday analogy: the emergency room.** When five patients arrive at the ER at the same time, the triage nurse doesn't treat them in order of arrival. The nurse assesses each patient and assigns priority: the patient with chest pains goes first, the patient with a sprained ankle waits. This is triage — prioritization based on severity and urgency.

### Triage matrix

```
TRIAGE MATRIX

                    HIGH IMPACT           LOW IMPACT
                    (many users affected) (few users affected)
  HIGH URGENCY
  (getting worse)   P1 - CRITICAL          P2 - HIGH
                    Fix immediately         Fix within 1 hour

  LOW URGENCY
  (stable)          P2 - HIGH              P3 - MEDIUM
                    Fix within 1 hour       Fix within 24 hours
```

**P1 — Critical:** the system is actively harming users or the business. Policy violations, security breaches, complete outages. Drop everything.

**P2 — High:** the system is degraded but functioning. Quality is below threshold, latency is elevated, costs are spiking. Fix soon before it becomes critical.

**P3 — Medium:** the system has a known issue that isn't immediately impacting users. A test case failed, a metric is trending downward, a minor inconsistency was detected. Schedule a fix.

### Triage workflow

```
TRIAGE WORKFLOW

1. ACKNOWLEDGE (within 5 minutes of alert)
   - Responder claims the incident
   - Posts in the incident channel: "I'm looking at this"

2. ASSESS (within 15 minutes)
   - Determine impact: how many users affected?
   - Determine urgency: is it getting worse?
   - Assign priority using the triage matrix

3. COMMUNICATE (within 20 minutes)
   - Notify stakeholders of the issue and severity
   - Set expectations for resolution timeline
   - If P1: notify leadership

4. INVESTIGATE (varies by priority)
   - Follow the incident runbook for this alert type
   - Pull relevant traces and decision events
   - Identify root cause or likely root cause

5. MITIGATE (varies by priority)
   - Apply the appropriate mitigation option
   - Verify the mitigation worked (re-run eval, check metrics)
   - If mitigation doesn't work: escalate to next option

6. RESOLVE (after mitigation is confirmed)
   - Update incident status: resolved
   - Notify stakeholders: issue fixed, impact summary

7. REVIEW (within 1 week)
   - Write post-incident report
   - Identify preventive measures
   - Update runbooks, eval suite, and alerts as needed
```

---

## Closing the loop: from monitoring to improvement

The most powerful aspect of operational monitoring is not just catching problems — it's turning problems into improvements. Every incident, every failed test case, every unexpected behavior is data that makes your system better.

```
THE LEARNING LOOP

Production monitoring
      |
      v
Incident detected
      |
      v
Root cause identified
      |
      v
Fix applied to system
      |
      v
New test cases added to eval suite
(so this specific failure is caught in the future)
      |
      v
Alert thresholds refined
(based on what we learned about normal vs. abnormal)
      |
      v
Runbook updated
(based on what we learned about effective response)
      |
      v
Back to production monitoring
(now with better coverage)
```

**Everyday analogy: airline safety.** The airline industry is one of the safest in the world, not because planes never have problems, but because every problem is investigated, every root cause is shared across the industry, and every finding leads to system improvements. Each incident makes the entire system safer. This is the learning loop in action.

---

## Practice activity

Design the operational monitoring system for your AI system:

1. **Design the trace architecture.** For one end-to-end user request flowing through your system, write the complete trace showing every stage, every decision event, and every context snapshot. Use the templates from this lesson.

2. **Identify 5 decision events** that are most critical for your system. For each one, define: what the decision is, what information should be captured, and what a "wrong" decision would look like.

3. **Design 5 alerts** (at least one per level: critical, high, medium, low). For each alert, define: the condition that triggers it, the sustained threshold, the owner, and the information included in the alert message.

4. **Write one incident runbook** for your most important alert. Include: trigger conditions, immediate actions, diagnosis steps, mitigation options, and post-incident review process.

5. **Define your triage matrix.** Create the 2x2 matrix (impact vs. urgency) with priority levels and response time targets. Include at least one example scenario for each priority level.

6. **Map the learning loop.** For one hypothetical incident, trace the complete cycle: detection, investigation, fix, new test cases, updated alerts, updated runbook. Show how the incident makes the system stronger.

---

## Key takeaways

1. **Monitoring has two sides: observability and alerting.** Observability records what happened (traces, decision events, context snapshots). Alerting tells you when something is wrong (thresholds, alarms, notifications). You need both — observability without alerting means you never know to look, and alerting without observability means you can't find the problem.

2. **Stage-level traces are essential for diagnosis.** When a user gets a wrong answer, the trace tells you WHERE in the pipeline the failure occurred. Without traces, you're guessing. With traces, you're diagnosing.

3. **Decision events are the critical moments.** Not every step matters equally. Focus your observability on the moments where the system made a choice — classification, routing, policy checks, escalation. These are the points where mistakes happen.

4. **Alert design is a balancing act.** Too few alerts miss real problems. Too many create alert fatigue. Use sustained thresholds (not momentary spikes), include context in alert messages, and ensure every alert has an owner and a runbook.

5. **Every incident should make the system stronger.** The learning loop — from incident to investigation to fix to new test cases to better alerts — is what turns a fragile system into a robust one. The goal isn't zero incidents. The goal is that each incident is new (you don't repeat the same failures).

---

## What comes next

You've learned to define metrics (Lesson 1), build evaluation suites (Lesson 2), and monitor production systems (Lesson 3). In **Application A — SSA Quality Suite**, you'll put all three together by building a comprehensive quality suite of 50+ test cases with automated scoring and a production-grade quality scorecard.
