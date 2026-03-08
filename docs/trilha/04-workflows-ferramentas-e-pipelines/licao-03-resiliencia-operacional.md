---
sidebar_position: 4
sidebar_label: "Lesson 3 — Operational resilience"
---

# Lesson 3 — Operational resilience

## When the power goes out

Every homeowner eventually experiences a power outage. The well-prepared homeowner has flashlights, candles, a battery backup for the internet, and a gas stove that works without electricity. The unprepared homeowner sits in the dark, unable to cook, unable to work, wondering what happened.

The difference isn't luck — it's **resilience design.** The prepared homeowner asked "what if the power goes out?" and designed solutions before the failure occurred.

AI systems face the same reality. Tools will fail. APIs will timeout. Databases will slow down. External services will return errors. The question isn't IF these failures will happen — it's whether you designed the system to handle them gracefully.

---

## The four pillars of operational resilience

### Pillar 1: Retry — try again intelligently

Sometimes failures are temporary. The API was briefly overloaded. The database connection timed out because of a momentary spike. The network had a hiccup. In these cases, trying again after a brief wait often works.

But retrying isn't as simple as "just try again." Naive retries can make problems worse.

**The thundering herd problem:** imagine 100 customers are using your system when the API goes down. All 100 requests fail simultaneously. If all 100 immediately retry at the same time, the API — which was already struggling — gets hit with 200 requests (100 new + 100 retries). It fails again. Now you have 300 requests. Then 400. The retries are making the outage worse.

**The solution: backoff and jitter.**

```
Retry Policy: Exponential Backoff with Jitter

Attempt 1: wait 1 second + random(0-500ms)
Attempt 2: wait 2 seconds + random(0-500ms)
Attempt 3: wait 4 seconds + random(0-500ms)
Attempt 4: give up, activate fallback

Why jitter? Without the random component, all 100 failed requests
would retry at exactly 1 second, then exactly 2 seconds — still
creating a thundering herd. The random delay spreads retries out
so they don't all hit the API at once.
```

**Everyday analogy: calling a busy phone line.** If the line is busy, you wait a minute and try again. If it's still busy, you wait five minutes. Then ten. You don't immediately redial 50 times — that guarantees the line stays busy.

**When NOT to retry:**
- The error is permanent (resource doesn't exist, permission denied, invalid input)
- The operation is not idempotent and you're not sure if it succeeded (did the payment go through or not?)
- The retry deadline has passed (the customer is no longer waiting)
- The same error occurred on the previous retry (the problem isn't transient)

### Pillar 2: Fallback — have a Plan B

When retrying doesn't work, you need a fallback — an alternative way to achieve the same goal, even if the result is less optimal.

**Everyday analogy: getting to work.** Your usual route is via highway. One morning, there's a major accident and the highway is closed. Your fallback is surface streets — slower, but you still get to work. If surface streets are also blocked (rare but possible), your second fallback is working from home. Each fallback is less optimal but still functional.

**Types of fallbacks:**

**Degraded data fallback:** use older or less precise data.
```
Primary: fetch real-time inventory from warehouse API
Fallback 1: use cached inventory (updated hourly)
Fallback 2: use general availability estimates ("usually in stock")
Fallback 3: tell customer "inventory status temporarily unavailable,
            we'll confirm availability after you place the order"
```

**Simpler model fallback:** use a less sophisticated but more reliable agent.
```
Primary: use GPT-4-level agent for nuanced response generation
Fallback 1: use GPT-3.5-level agent for basic response
Fallback 2: use template-based response with merge fields
Fallback 3: send to human agent with context package
```

**Channel fallback:** use a different communication method.
```
Primary: send notification via push notification
Fallback 1: send via email
Fallback 2: send via SMS
Fallback 3: add to customer's in-app notification center
```

**Manual fallback:** route to a human.
```
If all automated paths fail:
  → Create incident ticket with full context
  → Route to human operator with priority flag
  → Set SLA timer for human response
  → Acknowledge to customer: "We're looking into this personally"
```

### Pillar 3: Compensation — undo what went wrong

Sometimes a failure occurs AFTER some actions have already been taken. The system charged the customer's credit card but then failed to create the order. Now you have a payment without an order — a partial failure that needs to be undone.

**Compensation** is the process of reversing or neutralizing the effects of a partial failure.

**Everyday analogy: a cooking mishap.** You're making a layered cake. You've baked the layers, made the frosting, assembled the first two layers, and then drop the third layer on the floor. You can't "un-bake" the layers or "un-make" the frosting. But you can: throw away the dropped layer, bake a new one (compensation), and continue assembly. The result isn't as fast as if nothing went wrong, but you still end up with a cake.

**Compensation strategies:**

**Reversal (undo the action):**
```
Action: charge credit card $50.00
Failure: order creation failed after payment
Compensation: issue refund of $50.00
Time limit: must refund within 24 hours
```

**Correction (fix the side effect):**
```
Action: sent email with wrong attachment
Failure: detected wrong file after sending
Compensation: send corrective email with right attachment
              + apology note
```

**Notification (inform affected parties):**
```
Action: confirmed appointment at 2:00 PM
Failure: doctor's schedule changed, 2:00 PM now unavailable
Compensation: notify patient of change, offer 3 alternatives,
              provide apology + priority rebooking
```

**The compensation log:**
```
Every compensation should be logged:
  - Original action: what was done
  - Failure detected: what went wrong
  - Compensation action: what was done to fix it
  - Compensation status: succeeded / failed / partial
  - Time elapsed: how long between failure and compensation
  - Customer impact: was the customer affected? How?
```

### Pillar 4: Graceful degradation — work with what you have

When a component fails, the entire system doesn't have to stop. Graceful degradation means the system continues to function at a reduced capacity rather than failing completely.

**Everyday analogy: a restaurant kitchen with a broken oven.** The oven breaks during dinner service. The restaurant doesn't close. Instead, they adapt: remove oven-baked dishes from the menu, offer extra stovetop options, and tell customers about the limited menu. The experience is degraded but still functional. Customers still eat. The restaurant still operates.

**Degradation levels:**

```
Level 0: Full functionality
  All systems operational. Full feature set available.

Level 1: Reduced capability
  Some features unavailable. Core functionality intact.
  Example: knowledge base search is down, but agents can
  still respond using their training data + template responses.

Level 2: Basic service
  Only essential functionality available.
  Example: automated responses unavailable, but system
  still classifies and routes tickets to human agents.

Level 3: Emergency mode
  Minimal service. All requests go to human handling.
  System provides only basic acknowledgment and queuing.
  "We received your request and a team member will
  respond within [SLA time]."

Level 4: Complete outage
  System is unavailable. Static maintenance page is shown.
  Emergency contact information is provided.
```

**The degradation decision matrix:**

| Component failed | Impact | Degradation level | Action |
|---|---|---|---|
| Knowledge base API | Can't search articles | Level 1 | Use cached articles + model knowledge |
| Customer database | Can't look up accounts | Level 2 | Route to human with available context |
| Language model API | Can't generate responses | Level 3 | Route all to human agents |
| Core routing system | Can't classify or route | Level 3 | Queue everything for manual processing |
| All external APIs | No tool access | Level 4 | Maintenance page + emergency contacts |

---

## Building a failure policy matrix

A failure policy matrix combines all four pillars into a single, actionable document. For each critical component in your system, it specifies what happens when things go wrong.

### Format

```
FAILURE POLICY MATRIX

Component: [name]
  Criticality: [critical / high / medium / low]

  Retry policy:
    Max attempts: [number]
    Backoff: [strategy]
    Retry conditions: [what errors are retryable]

  Fallback:
    Level 1: [first alternative]
    Level 2: [second alternative]
    Level 3: [human fallback]

  Compensation:
    If partial failure: [what to undo]
    Time limit: [how quickly compensation must happen]

  Degradation:
    System continues at: [which degradation level]
    Features lost: [what becomes unavailable]
    Customer communication: [what to tell users]

  Monitoring:
    Alert threshold: [when to notify operations]
    Escalation: [who gets notified at what severity]
```

### Example: failure policy for email sending

```
Component: Email Service (SendGrid API)
  Criticality: High (customer communication depends on it)

  Retry policy:
    Max attempts: 3
    Backoff: exponential (2s, 4s, 8s) with jitter
    Retry conditions: 429 (rate limit), 500 (server error), timeout
    Do NOT retry: 400 (bad request), 401 (auth failure)

  Fallback:
    Level 1: secondary email provider (Mailgun)
    Level 2: queue emails for batch sending when service recovers
    Level 3: send via SMS if customer phone is available + urgent

  Compensation:
    If email sent with wrong content: send correction email within 15 min
    If email sent to wrong recipient: trigger PII incident protocol

  Degradation:
    System continues at: Level 1 (email delayed but system operational)
    Features lost: real-time email confirmation to customer
    Customer communication: "Your confirmation will arrive shortly"

  Monitoring:
    Alert threshold: 3 failures in 5 minutes → warning
    Alert threshold: 10 failures in 5 minutes → critical
    Escalation: warning → ops team Slack channel
                critical → on-call engineer pager
```

---

## Practice activity

Build a failure policy matrix for your system:

1. **List all critical components** in your workflow (tools, APIs, databases, agents). Rank each by criticality (critical, high, medium, low).

2. **For each critical or high-criticality component**, write a complete failure policy covering retry, fallback, compensation, and degradation.

3. **Design the degradation levels** for your overall system. What does Level 1, 2, 3, and 4 look like? What functionality is lost at each level?

4. **Test with a scenario:** pick your most critical component and walk through a complete failure scenario. The component goes down during peak usage. What happens minute by minute? Does the policy hold?

5. **Identify the weakest link:** which component failure would cause the most damage? Is this component's failure policy robust enough? What would you improve?

---

## Key takeaways

1. **Resilience is designed, not hoped for.** Systems that handle failures gracefully do so because someone designed the recovery before the failure occurred. Hope is not a strategy.

2. **Retry smartly, not blindly.** Exponential backoff with jitter prevents thundering herds. Never retry non-idempotent operations without confirming the original didn't succeed. Never retry permanent errors.

3. **Every primary path needs a fallback.** If the primary tool fails, what's Plan B? If Plan B fails, what's Plan C? The chain should end with a human — the ultimate fallback. A system with no fallback is a system that will eventually fail completely.

4. **Compensation handles partial failures.** When some actions succeed and others fail, compensation undoes the damage. Always log compensations — they're important evidence that something went wrong and was corrected.

5. **Graceful degradation keeps the system running.** A system that operates at reduced capacity is infinitely better than a system that stops completely. Design clear degradation levels so everyone (agents, operators, customers) knows what to expect when things aren't perfect.

---

## What comes next

In **Application A**, you'll build a complete operational pipeline — an 8-step workflow with at least 3 external tools, fallback logic for every critical step, and full failure policies. In **Application B**, you'll create a traceability package — execution logs, decision-level event tracking, and an incident replay guide that allows any team member to understand exactly what happened in any given workflow execution.
