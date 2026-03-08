---
sidebar_position: 4
sidebar_label: "Lesson 3 — Handoff protocols and safety"
---

# Lesson 3 — Handoff protocols and safety

## The relay race problem

In a 4x100 meter relay race, four runners each sprint 100 meters. But the race isn't won on the straightaways — it's won or lost in the **exchange zones**. The moment one runner passes the baton to the next is the most dangerous moment in the race. Drop the baton and you lose. Pass it too late and you're disqualified. Pass it poorly and the next runner stumbles.

The fastest team doesn't always win. The team with the best handoffs wins.

**AI agent systems have the same problem.** Individual agents can be excellent at their jobs. But if the handoff between agents is sloppy — if important context is lost, if confidence information isn't passed along, if there's no protocol for what happens when an agent can't complete its task — the system fails. And it fails in the worst possible way: silently, with no one noticing until a customer gets a wrong answer.

This lesson is about designing the exchange zones: the protocols that govern how agents pass work to each other, how they signal problems, and how the system recovers when something goes wrong.

---

## What travels between agents

When Agent A passes work to Agent B, what exactly should Agent B receive? Not just "the answer" — that's like handing off a relay baton without telling the next runner which lane they're in or how far ahead the competition is.

### The five components of a handoff message

Every handoff between agents should include these five components:

**1. The payload (the work product)**

This is the actual output of the sending agent — the classification result, the retrieved documents, the generated text, the validated data.

**Everyday analogy:** when a doctor refers you to a specialist, the referral letter includes the test results. Not "the patient seems sick" — the actual lab numbers, imaging results, and observations.

**2. The context (what the receiving agent needs to know)**

Beyond the direct output, what background information does the receiving agent need to do its job? This might include the original request, previous agent outputs, or relevant constraints.

**Everyday analogy:** when you transfer a phone call, you don't just say "I'm transferring you." You tell the next person: "I have Mrs. Chen on the line, she's calling about order #4521, she's already spoken with shipping and they confirmed the package is delayed by two days. She's asking for a partial refund." The receiving agent has context.

**3. The confidence signal (how sure the sending agent is)**

Not all outputs are equally reliable. An agent that classified a ticket with 95% confidence is very different from one that classified with 55% confidence. The receiving agent needs to know this — because it might handle high-confidence and low-confidence inputs differently.

**Everyday analogy:** when a weather forecaster says "90% chance of rain," you bring an umbrella. When they say "30% chance of rain," you might risk it. The percentage IS the confidence signal — and it changes how you act on the information.

**4. The routing metadata (where this came from and where it's going)**

Which agent sent this? What was the original request? Is this a first attempt or a retry? Is there a deadline? This metadata helps the receiving agent prioritize and helps the system trace the processing path.

**Everyday analogy:** when a package arrives at your door, the label tells you: who sent it, where it came from, what shipping method was used, whether it's fragile, and when it was dispatched. You don't have to open the package to know how to handle it.

**5. The constraint snapshot (which rules are active)**

Which constraints from the constraint matrix are relevant for this handoff? If a hard constraint was triggered earlier (e.g., "customer has a privacy flag"), subsequent agents need to know this — because it affects how they process the work.

**Everyday analogy:** when a nurse hands off a patient to the next shift, the handoff includes critical alerts: "Patient is allergic to penicillin. Patient has a fall risk. Patient is NPO (nothing by mouth) before tomorrow's surgery." These are the active constraints that the next nurse must respect.

### A handoff message format

```
HANDOFF MESSAGE

From: [sending agent name]
To: [receiving agent name]
Timestamp: [when the handoff occurred]
Request ID: [original request identifier]
Attempt: [1st, 2nd, or retry number]

Payload:
  [the actual work product — structured data, text, decisions]

Context:
  original_request: [what the user/system originally asked for]
  previous_agents: [list of agents that already processed this request]
  accumulated_decisions: [key decisions made so far]

Confidence:
  overall: [0.0 - 1.0]
  per_field: [confidence for each important field if applicable]
  uncertainty_notes: [what the sending agent is NOT sure about]

Active Constraints:
  [list of constraints from the matrix that are relevant]
  triggered_flags: [any flags raised during processing]

Routing:
  priority: [normal, high, urgent]
  deadline: [if applicable]
  fallback: [what to do if receiving agent can't process this]
```

---

## Escalation: when agents can't handle it

Not every task can be completed by the assigned agent. Sometimes the agent encounters something outside its scope, or its confidence is too low, or it detects a constraint violation that requires human judgment.

**The worst thing an agent can do is guess when it should escalate.** A medical AI that's unsure about a diagnosis and guesses instead of escalating could harm a patient. A financial AI that's uncertain about a transaction and approves it instead of flagging it could cause a loss. A customer service AI that doesn't understand a question and fabricates an answer instead of transferring to a human could destroy trust.

### The escalation pyramid

Think about escalation as a pyramid with four levels:

```
Level 4: Human specialist
  (complex cases, edge cases, ethical dilemmas)

Level 3: Senior agent or agent committee
  (cases requiring broader context or cross-domain reasoning)

Level 2: Supervisor agent
  (routing problems, confidence issues, constraint conflicts)

Level 1: Peer agent
  (requests for additional information, simple clarifications)
```

### Designing escalation triggers

For each agent, define exactly when it should escalate, to whom, and with what information.

**Confidence-based triggers:**
```
If confidence < 70%: escalate to supervisor with full context
If confidence < 40%: escalate to human with explanation of uncertainty
```

**Constraint-based triggers:**
```
If hard constraint triggered: stop immediately, escalate to guardrail
If two soft constraints conflict: escalate to supervisor for priority resolution
If exception constraint triggered: escalate to authorized override person
```

**Content-based triggers:**
```
If request involves: medical advice → escalate to human (never handle autonomously)
If request involves: legal threat → escalate to legal team immediately
If request involves: safety concern → escalate to safety agent with URGENT flag
```

**Timeout-based triggers:**
```
If processing exceeds 30 seconds: send partial result, escalate remainder
If external API doesn't respond within 10 seconds: use cached data with flag
If agent doesn't respond within 5 seconds: supervisor reassigns to backup agent
```

### The escalation message

When an agent escalates, it should send a specific message format:

```
ESCALATION

From: [agent name]
To: [escalation target]
Reason: [why this is being escalated]
Category: [confidence | constraint | content | timeout]

What I was trying to do:
  [description of the task]

What I accomplished:
  [any partial results]

Why I can't continue:
  [specific reason — not just "I don't know"]

What the next handler needs to know:
  [critical context for whoever picks this up]

Recommended action:
  [if the agent has a suggestion, include it — but make clear it's uncertain]
```

**Everyday analogy: the night shift ER nurse.** When a case exceeds the nurse's scope, they don't just say "someone help." They page the on-call doctor and say: "Room 3, 67-year-old male, presenting with chest pain radiating to left arm, onset 20 minutes ago, BP 150/95, already administered aspirin, EKG attached, suspected MI. I need you here now." That's an escalation — specific, informative, and actionable.

---

## Failure modes and recovery

In any multi-agent system, things will go wrong. The question isn't whether failures will occur — it's whether you've designed for them.

### Failure type 1: Agent timeout

**What happens:** an agent takes too long to respond. Maybe it's processing a complex query, maybe the underlying model is slow, maybe an external API it depends on is down.

**Recovery pattern — timeout with fallback:**
```
1. Wait for configured timeout (e.g., 10 seconds)
2. If no response: check if partial results are available
3. If partial results exist: use them with a "partial" flag
4. If no partial results: invoke fallback agent (simpler, faster model)
5. If fallback also fails: escalate to human with context
6. Log the timeout for monitoring (track if it becomes a pattern)
```

**Everyday analogy:** you order food delivery. The estimated time is 30 minutes. After 45 minutes, no food. You check the app (partial status check). The app says "driver is stuck in traffic" (partial information). You wait 10 more minutes (adjusted timeout). Still nothing. You call the restaurant (fallback). They send a different driver (recovery). If THAT fails, you cancel and cook at home (human fallback).

### Failure type 2: Low confidence output

**What happens:** an agent produces an output, but its confidence is low. The answer might be right, but the agent isn't sure.

**Recovery pattern — confidence-tiered handling:**
```
Confidence >= 90%: proceed normally
Confidence 70-89%: proceed but flag for post-hoc review
Confidence 50-69%: route to critic agent for evaluation before proceeding
Confidence < 50%: do not use output, escalate to supervisor or human
```

**Everyday analogy:** you're assembling IKEA furniture. Most steps are clear (high confidence). One step has a confusing diagram. If you're 80% sure you understand it, you try it but prepare to undo it. If you're only 50% sure, you check the online assembly video (critic). If you truly have no idea, you call the IKEA help line (escalate to human).

### Failure type 3: Constraint violation

**What happens:** an agent's output violates a constraint from the constraint matrix.

**Recovery pattern — violation response by constraint type:**
```
Hard constraint violation:
  1. Block the output immediately
  2. Log the violation with full context
  3. Notify the guardrail agent
  4. Return to the previous stable state
  5. Retry with explicit constraint reminder — OR escalate to human

Soft constraint deviation:
  1. Log the deviation
  2. Check if deviation is within acceptable range
  3. If within range: proceed with warning flag
  4. If outside range: route to supervisor for decision

Exception constraint trigger:
  1. Pause processing
  2. Route to authorized override person
  3. If override granted: proceed with override logged
  4. If override denied: apply the standard constraint
```

### Failure type 4: Conflicting agent outputs

**What happens:** two agents produce contradictory results. The retriever says the customer has a premium account, but the billing agent says they're on the free tier.

**Recovery pattern — conflict resolution:**
```
1. Detect the conflict (either through the supervisor or the critic)
2. Identify the source of truth for this data type
   (database > cache > inference > assumption)
3. If source of truth is clear: use it, discard the other
4. If both sources are equally authoritative: escalate to human
5. Log the conflict for root cause analysis
```

**Everyday analogy:** two GPS apps give you different routes. One says turn left, the other says go straight. You check which one has the most recent map data (source of truth). If both are current, you look at the actual road conditions and decide yourself (human judgment).

### Failure type 5: Cascading failure

**What happens:** one agent's failure causes downstream agents to fail. If the retriever can't find the customer's account, the reasoner can't analyze their history, the writer can't personalize the response, and the executor can't update the ticket.

**Recovery pattern — circuit breaker:**
```
1. Detect that failures are cascading (multiple agents failing in sequence)
2. Activate circuit breaker: stop sending work through the failing path
3. Switch to degraded mode:
   - Use cached/default data where possible
   - Simplify the processing pipeline
   - Provide a generic response with an honest disclaimer
4. Notify operations team of the cascade
5. Attempt recovery after a cool-down period
6. If recovery fails: route all requests to human handling
```

**Everyday analogy:** the circuit breaker in your house. If too much current flows (cascading failure), the breaker trips (stops the cascade). The power goes off in that section (degraded mode). You don't just flip it back on — you figure out what caused the overload (root cause), fix it, and then restore power.

---

## Designing a handoff protocol: complete example

Let's design the full handoff protocol for a customer support system with four agents: Classifier, Retriever, Strategist, and Writer.

### The happy path (everything works)

```
Step 1: Classifier → Retriever
  Payload: urgency=HIGH, category=BILLING, intent="refund_request"
  Confidence: 0.92
  Context: customer message, customer tier (premium)
  Active constraints: none triggered

Step 2: Retriever → Strategist
  Payload: customer account details, recent transactions,
           relevant policies, similar resolved tickets
  Confidence: 1.0 (data retrieval is deterministic)
  Context: classification result, original message
  Active constraints: C05 (premium customer SLA applies)

Step 3: Strategist → Writer
  Payload: strategy="approve_partial_refund", amount=$45,
           tone="empathetic", include="apology + resolution steps"
  Confidence: 0.85
  Context: full chain of previous results
  Active constraints: C05 (SLA), C12 (refund approval limit)

Step 4: Writer → Guardrail → Customer
  Payload: formatted response text
  Confidence: 0.90
  Context: strategy, constraints, customer profile
  Active constraints: C01 (no PII in response), C08 (professional tone)
```

### The unhappy path (things go wrong)

```
Scenario: Retriever can't find customer account

Step 1: Classifier → Retriever (normal)
Step 2: Retriever fails — account not found

  Escalation:
    From: Retriever
    To: Supervisor
    Reason: customer_id not found in database
    What I accomplished: searched primary and secondary databases
    What I need: manual account lookup or customer verification

  Supervisor decision:
    → Ask customer to verify identity (send verification request)
    → Retry retrieval with corrected information
    → If still fails: transfer to human agent

---

Scenario: Strategist has low confidence

Step 3: Strategist produces strategy with confidence 0.55

  Because confidence < 70%:
    → Route to Critic agent for review

  Critic evaluation:
    "Strategy recommends partial refund of $45, but customer's
     complaint mentions a charge of $120. The partial refund
     might not resolve the complaint. Recommend reviewing the
     full charge details."

  → Strategist retries with additional context from Critic
  → New confidence: 0.82 → proceed

---

Scenario: Writer produces response that violates constraint

Step 4: Writer produces response containing customer's email address

  Guardrail catches: C01 violation (PII in response)
    → Block response
    → Return to Writer with instruction: "Remove email address
       from paragraph 2. Reference account number instead."
    → Writer revises
    → Guardrail re-checks → approved
    → Response sent to customer
```

---

## Retry policies

When an agent fails, should you try again? How many times? With what changes?

### Retry decision framework

```
Question 1: Is the failure likely transient or permanent?
  Transient (API timeout, rate limit): retry makes sense
  Permanent (data doesn't exist, logic error): retry is pointless

Question 2: Will retrying produce a different result?
  Yes (different data, updated state): retry
  No (same input will produce same output): don't retry, escalate

Question 3: Is there time to retry?
  Within deadline: retry with backoff
  Deadline approaching: use fallback or partial result
  Past deadline: escalate immediately
```

### Retry configuration template

```
Agent: [name]
  Max retries: [number, typically 1-3]
  Backoff strategy: [immediate | linear | exponential]
  Retry conditions:
    - Timeout → retry with extended timeout
    - Low confidence → retry with additional context
    - API error → retry after 2 seconds
  Do NOT retry if:
    - Hard constraint violation (retry won't change the constraint)
    - Data not found (retry won't create the data)
    - Same error on second attempt (avoid infinite loops)
  After max retries:
    - Escalate to [supervisor / human / fallback agent]
    - Include all retry attempts in escalation message
```

---

## The safety layer

Beyond individual handoffs, the overall system needs safety mechanisms that protect against systemic failures.

### Safety mechanism 1: Dead letter queue

When a message can't be delivered to any agent (all agents busy, all retries exhausted, no fallback available), it goes to a "dead letter queue" — a holding area where unprocessed requests wait for human attention.

**Everyday analogy:** undeliverable mail at the post office. The letter can't be delivered (address doesn't exist, recipient moved), so it goes to the dead letter office where someone eventually examines it and decides what to do.

### Safety mechanism 2: Heartbeat monitoring

Every agent periodically sends a "heartbeat" signal: "I'm alive and processing." If an agent's heartbeat stops, the system knows something is wrong — even if the agent didn't explicitly report a failure.

**Everyday analogy:** the "dead man's switch" on a train. The driver must periodically press a pedal to confirm they're alert. If the pedal isn't pressed within the interval, the train assumes the driver is incapacitated and applies the brakes automatically.

### Safety mechanism 3: Poison pill detection

Some inputs cause agents to fail consistently — malformed data, adversarial prompts, edge cases that trigger bugs. A "poison pill" detector identifies these inputs before they cause repeated failures.

```
If the same input causes 3 agent failures in a row:
  → Mark input as "poison pill"
  → Route directly to human review
  → Do NOT retry automatically
  → Log for engineering investigation
```

---

## Practice activity

Take the agent topology you designed in Lesson 2 and specify the handoff protocols:

1. **Design the handoff message format** for your system. What five components does each message include? Be specific to your domain.

2. **Map the happy path:** write out the complete handoff sequence for a typical request, including what each agent sends to the next.

3. **Design three failure scenarios:**
   - One timeout scenario with recovery
   - One low-confidence scenario with escalation
   - One constraint violation scenario with correction

4. **Define the retry policy** for each agent in your system.

5. **Identify one cascading failure risk** in your system. Where could a single failure propagate? Design a circuit breaker to prevent it.

---

## Key takeaways

1. **Handoffs are where multi-agent systems succeed or fail.** Individual agents can be excellent, but if the handoff between them loses context, drops confidence signals, or ignores constraints, the system produces wrong results. Design handoffs as carefully as you design agents.

2. **Every handoff message needs five things: payload, context, confidence, routing, and active constraints.** Missing any of these is like a relay runner handing off the baton without telling the next runner what lap it is. The receiving agent can't do its job without full information.

3. **Escalation is not failure — it's a safety feature.** An agent that escalates when it's unsure is doing exactly the right thing. An agent that guesses when it should escalate is dangerous. Design clear escalation triggers and make escalation easy.

4. **Design for failure before failure happens.** Every agent will eventually timeout, produce low-confidence output, or encounter something unexpected. The time to design recovery is now — not when the system is in production and customers are affected.

5. **Circuit breakers prevent cascading failures.** When one failure causes another, which causes another, the system can collapse entirely. Circuit breakers detect cascading patterns and stop them before they propagate, switching to degraded mode rather than total failure.

---

## What comes next

In **Application A**, you'll build a complete multi-agent design package — agent matrix, topology diagram, handoff protocols, and shared memory strategy for a real system. In **Application B**, you'll stress-test your design by simulating five failure scenarios and documenting the detection and recovery for each one.
