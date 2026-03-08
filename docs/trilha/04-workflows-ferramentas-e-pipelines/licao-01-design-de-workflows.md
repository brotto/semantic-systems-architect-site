---
sidebar_position: 2
sidebar_label: "Lesson 1 — Workflow design"
---

# Lesson 1 — Workflow design

## The pizza delivery workflow

When you order a pizza, you interact with a system that has a clear, end-to-end workflow — even if you've never thought about it.

**Trigger:** you open the app and tap "Order."

**Context build:** the system collects everything it needs — your address (stored from last time), your selected pizza (pepperoni, large), your payment method (saved card), and any special instructions ("no contact delivery").

**Deliberation:** the system makes decisions. Is the restaurant open? Is your address within delivery range? Is the payment valid? Does your order meet any minimum? Is there a promotional code to apply?

**Execution:** the order is sent to the restaurant. The kitchen prepares the pizza. A driver is assigned. The pizza is picked up and delivered.

**Verification:** did the customer receive the order? Was it correct? Was it delivered on time? Is the customer satisfied?

**Audit:** the entire transaction is logged — what was ordered, when, by whom, how much was paid, which driver delivered it, how long it took. If anything goes wrong, this trail allows investigation.

These six stages — **trigger, context build, deliberation, execution, verification, audit** — are the anatomy of every operational workflow. Whether you're processing a pizza order or reviewing a legal contract, the structure is the same.

---

## The six stages of a workflow

### Stage 1: Trigger

**What it is:** the event that starts the workflow. Something happens in the world that requires the system to act.

**Everyday analogy: the doorbell.** Someone rings your doorbell. That's the trigger. Before the doorbell rings, nothing happens. After it rings, you go through a series of steps (check who it is, decide whether to open, greet them, etc.).

**In AI systems, triggers include:**
- A customer sends a message (chat trigger)
- An email arrives in a monitored inbox (email trigger)
- A new record appears in a database (data trigger)
- A timer fires (scheduled trigger — "run this analysis every Monday at 9 AM")
- Another system calls an API (integration trigger)
- A threshold is crossed (event trigger — "alert when inventory drops below 50 units")

**Design questions for triggers:**
- What exactly starts this workflow?
- Can the same trigger start multiple workflows? (If yes, how do you prevent duplication?)
- Is the trigger synchronous (the caller waits for a result) or asynchronous (the caller moves on and gets notified later)?
- What happens if the same trigger fires twice in quick succession? (Idempotency)

### Stage 2: Context build

**What it is:** gathering all the information the system needs before making any decisions. This is the "preparation" phase — like a chef gathering ingredients before cooking.

**Everyday analogy: a doctor's appointment check-in.** Before the doctor sees you, the front desk collects your information: insurance card, reason for visit, medical history, current medications, allergies. By the time the doctor walks in, they have a complete picture. They don't stop mid-examination to ask "wait, do you have insurance?"

**In AI workflows, context build includes:**
- Retrieving data from databases (customer record, order history)
- Fetching external information (current inventory, market prices)
- Loading configuration (which rules apply, which model version to use)
- Parsing the trigger input (extracting key information from the customer's message)
- Checking permissions (does this user have access to this operation?)

**Design questions:**
- What information does the deliberation stage need?
- Where does each piece of information come from?
- What happens if some information is unavailable? (Is it required or optional?)
- Is there a time limit for context build? (Customers waiting for a chat response won't wait 30 seconds for context assembly)

### Stage 3: Deliberation

**What it is:** the decision-making phase. Given the context, the system determines what to do. This is where the agent's semantic contract governs behavior — the decision contract specifies the rules.

**Everyday analogy: a judge hearing a case.** The judge has received all the evidence (context build). Now they deliberate: weigh the evidence, apply the law, consider precedents, and reach a verdict. The judge doesn't gather evidence during deliberation — that was done before. And the judge doesn't carry out the sentence — that comes after.

**In AI workflows, deliberation includes:**
- Classification (what type of request is this?)
- Assessment (how urgent/important is this?)
- Strategy selection (what's the best approach?)
- Rule application (which constraints govern this decision?)
- Confidence evaluation (how sure are we about this decision?)

**Design questions:**
- What decisions must be made?
- In what order? (Some decisions depend on earlier decisions)
- What rules govern each decision? (Map to your constraint matrix)
- What happens when confidence is low?
- Are there decisions that require human approval before proceeding?

### Stage 4: Execution

**What it is:** carrying out the decisions made in deliberation. This is where things happen in the real world — emails are sent, records are updated, orders are placed, reports are generated.

**Everyday analogy: a construction crew following a blueprint.** The architect designed the house (deliberation). The crew builds it (execution). The crew follows the blueprint precisely — they don't redesign the kitchen during construction. If they find a problem with the blueprint, they stop and check with the architect before proceeding.

**In AI workflows, execution includes:**
- Writing and sending messages (email, chat, notification)
- Updating records (database writes, status changes)
- Invoking external services (payment processing, shipping API)
- Generating documents (reports, contracts, summaries)
- Triggering downstream workflows (escalation, follow-up)

**Design questions:**
- What actions need to be performed?
- What's the order? (Are some actions dependent on others?)
- Which actions are reversible? Which are permanent?
- What happens if an action fails partway through? (Half the email sent, payment charged but record not updated)
- How long can execution take before it's considered stuck?

### Stage 5: Verification

**What it is:** checking that the execution was successful and the output meets quality standards. This is the quality control phase.

**Everyday analogy: a restaurant's food quality check.** Before the plate leaves the kitchen, the head chef inspects it. Is the dish complete? Is it presented properly? Is it the right order for the right table? Does it look appetizing? Only after inspection does the plate go to the customer.

**In AI workflows, verification includes:**
- Output validation (does the response match the expected format?)
- Constraint checking (does the output violate any rules?)
- Quality assessment (is the confidence high enough? Is the tone appropriate?)
- Completeness check (were all required actions performed?)
- Side-effect verification (did the database update actually happen? Did the email actually send?)

**Design questions:**
- What does "success" look like for this workflow?
- What does the guardrail agent check?
- What happens if verification fails? (Retry? Rollback? Escalate?)
- Is verification synchronous (blocks until done) or asynchronous (checked later)?

### Stage 6: Audit

**What it is:** recording everything that happened for future reference. This is the system's memory — the trail that allows investigation, learning, and improvement.

**Everyday analogy: a flight's black box recorder.** Every flight records everything — altitude, speed, control inputs, radio communications. When everything goes well, nobody looks at the recordings. But when something goes wrong, the black box is the single most valuable artifact for understanding what happened and preventing it from happening again.

**In AI workflows, audit includes:**
- Recording the trigger (what started this workflow?)
- Recording each stage's input and output (what was gathered, decided, and done?)
- Recording timing (how long did each stage take?)
- Recording decisions (what rules were applied, what alternatives were considered?)
- Recording failures (what went wrong, how was it recovered?)

**Design questions:**
- What must be recorded? (At minimum: trigger, decisions, actions, outcomes)
- What must NOT be recorded? (Personal data that shouldn't be stored long-term)
- How long are records kept? (Compliance requirements)
- Who can access the audit trail? (Privacy and access control)

---

## Deterministic vs. adaptive steps

Not every step in a workflow needs AI judgment. Some steps should be deterministic — they follow a fixed, predictable path. Others are adaptive — they use AI reasoning to determine the best course of action.

**Deterministic steps** are like traffic lights. Red means stop. Green means go. There's no judgment involved. The system follows a fixed rule every time.

**Adaptive steps** are like a human driver navigating a detour. The usual route is blocked, so they assess the situation, consider alternatives, and choose the best path based on current conditions.

### When to use deterministic steps

- Input validation ("is the email address format valid?")
- Data transformation ("convert price from USD to EUR using today's rate")
- Routing based on fixed rules ("enterprise customers always go to queue A")
- Permission checking ("does this user have write access?")
- Threshold evaluation ("is the order total above $100?")

### When to use adaptive steps

- Intent classification ("what is this customer actually asking?")
- Strategy selection ("given this customer's history and current mood, what approach should we take?")
- Content generation ("write a personalized response addressing these specific concerns")
- Anomaly detection ("does this transaction pattern look unusual?")
- Priority assessment ("how urgent is this request compared to everything else in the queue?")

### The golden rule

**Use deterministic steps for everything that CAN be deterministic.** Save AI reasoning for the steps that genuinely require judgment. This reduces cost, increases speed, improves reliability, and makes debugging easier.

An AI model classifying whether an email address is valid format is wasteful — a regex check is faster, cheaper, and 100% accurate. Reserve the AI for tasks where its judgment actually adds value.

---

## Workflow design patterns

### Pattern 1: Linear workflow

The simplest pattern. Steps follow a fixed sequence. Each step completes before the next begins.

```
[Trigger] → [Context] → [Deliberation] → [Execution] → [Verification] → [Audit]
```

**When to use:** simple, predictable processes where the path is always the same.

**Example:** password reset — user requests reset, system verifies identity, generates token, sends email, verifies delivery, logs the event.

### Pattern 2: Branching workflow

After deliberation, the workflow takes different paths depending on the decision.

```
[Trigger] → [Context] → [Deliberation]
                              |
                   ┌──────────┼──────────┐
                   v          v          v
              [Path A]   [Path B]   [Path C]
                   |          |          |
                   v          v          v
             [Verify A] [Verify B] [Verify C]
                   └──────────┼──────────┘
                              v
                           [Audit]
```

**When to use:** when the same trigger can lead to different outcomes depending on the input or context.

**Example:** insurance claim processing — after assessment, the claim is either approved (path A), denied with explanation (path B), or flagged for manual review (path C).

### Pattern 3: Loop workflow

Part of the workflow repeats until a condition is met. Common for iterative refinement.

```
[Trigger] → [Context] → [Generate Draft]
                              |
                              v
                     [Quality Check] ──(pass)──→ [Execute] → [Audit]
                              |
                          (fail)
                              |
                              v
                      [Refine Draft] ──→ [Quality Check]
                              (max 3 attempts)
```

**When to use:** when the system generates output that might not meet quality standards on the first try, and iterative improvement is possible.

**Example:** report generation — the system writes a draft, checks it against quality criteria, revises if needed, and repeats until the report passes or a maximum number of attempts is reached.

### Pattern 4: Parallel workflow

Multiple independent tasks execute simultaneously, and results are merged before continuing.

```
[Trigger] → [Context]
                |
     ┌──────────┼──────────┐
     v          v          v
[Task A]   [Task B]   [Task C]
     |          |          |
     v          v          v
     └──────────┼──────────┘
                v
           [Merge Results]
                |
                v
          [Deliberation] → [Execute] → [Verify] → [Audit]
```

**When to use:** when multiple independent pieces of information need to be gathered or processed, and they don't depend on each other.

**Example:** competitive analysis — simultaneously research pricing, features, and customer reviews for three competitors, then merge all findings into a single analysis.

---

## A complete worked example: order dispute workflow

Let's design a complete workflow for handling a customer order dispute ("I was charged but never received my order").

```
WORKFLOW: Order Dispute Resolution

TRIGGER:
  Event: customer submits dispute via support channel
  Input: customer_id, order_id, dispute_description
  Idempotency: if same customer + order_id dispute exists within
    24 hours, attach to existing dispute (don't create duplicate)

CONTEXT BUILD:
  Deterministic:
    - Fetch order details (order_id → database)
    - Fetch customer profile (customer_id → database)
    - Fetch delivery tracking (order_id → shipping API)
    - Fetch payment record (order_id → billing system)
  Adaptive:
    - Parse dispute description to identify specific complaint
      type (never received, wrong item, damaged, overcharged)
  Timeout: 10 seconds total. If any fetch exceeds 5 seconds,
    proceed with available data and flag missing sources.

DELIBERATION:
  Step 1 (deterministic): Check dispute eligibility
    - Is the order within the dispute window (30 days)? If no → deny
    - Has this order already been disputed? If yes → route to review
    - Is the customer verified? If no → request verification first

  Step 2 (adaptive): Assess dispute validity
    - Cross-reference tracking status with customer claim
    - If tracking shows "delivered" but customer claims "not received":
      flag as investigation needed
    - If tracking shows "in transit": flag as premature dispute
    - Confidence threshold: 75% to auto-resolve, below → human review

  Step 3 (deterministic): Determine resolution path
    - Auto-approve: tracking confirms non-delivery + order < $50
    - Manager review: order $50-$200 or conflicting evidence
    - Escalation: order > $200 or suspected fraud indicators

EXECUTION:
  Path A (auto-approve):
    1. Issue refund via billing API (reversible within 24 hours)
    2. Send confirmation email to customer
    3. Update order status to "disputed-refunded"
    4. Notify merchant of dispute outcome

  Path B (manager review):
    1. Create review ticket with full context package
    2. Assign to next available manager
    3. Send customer acknowledgment ("your dispute is being reviewed,
       expected resolution within 48 hours")
    4. Set 48-hour escalation timer

  Path C (escalation):
    1. Create high-priority investigation case
    2. Route to fraud detection team
    3. Freeze further transactions on this order
    4. Send customer notice ("we're investigating, we'll update
       you within 24 hours")

VERIFICATION:
  For all paths:
    - Confirm all notifications were sent (email delivery confirmed)
    - Verify database updates are consistent
    - Check that financial transactions match expected amounts
    - Guardrail check: response doesn't promise more than policy allows

AUDIT:
  Record: trigger timestamp, customer_id, order_id, dispute type,
    evidence gathered, decision made (with reasoning), actions taken,
    resolution time, customer satisfaction (if collected)
  Retention: 7 years (financial compliance)
  Access: support team (read), managers (read), legal (full access)
```

---

## Practice activity

Design a complete workflow for a process in your domain:

1. **Define the trigger:** what event starts the workflow? What data accompanies the trigger? How do you handle duplicate triggers?

2. **Map the context build:** list every piece of information your workflow needs. For each, specify the source and what happens if it's unavailable.

3. **Design the deliberation:** identify the decisions, mark each as deterministic or adaptive, and specify the rules or criteria.

4. **Specify the execution paths:** document at least 2 different paths (the main flow and at least one alternative). For each action, note if it's reversible.

5. **Add verification and audit:** what does success look like? What gets recorded? Who can access the records?

---

## Key takeaways

1. **Every workflow has six stages: trigger, context build, deliberation, execution, verification, audit.** Skipping any stage creates problems — no context build means decisions based on incomplete data, no verification means errors pass through, no audit means no way to investigate problems.

2. **Separate deterministic from adaptive steps.** Use fixed logic for everything that can be fixed. Reserve AI judgment for tasks that genuinely require it. This makes the system cheaper, faster, and more reliable.

3. **Context build is the foundation.** The quality of everything downstream depends on having the right information. A brilliant AI making decisions based on incomplete data will produce bad results.

4. **Audit is not optional.** Even if nobody looks at the logs today, they become critical when something goes wrong. Design your audit trail as a first-class component, not an afterthought.

5. **Workflows are design artifacts, not code.** The SSA designs the workflow — its stages, decision points, and paths. A developer implements it. The workflow blueprint should be clear enough that different developers could implement it and produce equivalent systems.

---

## What comes next

In **Lesson 2 — Tool integration**, you'll learn how agents connect to the outside world. Databases, APIs, email services, payment processors — all the tools that turn decisions into real-world actions. You'll design tool contracts that make these connections reliable, safe, and auditable.
