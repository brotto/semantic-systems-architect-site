---
sidebar_position: 4
sidebar_label: "Lesson 3 — Contract packaging"
---

# Lesson 3 — Contract packaging

## From knowledge to action

You now have two powerful artifacts: a domain ontology (what exists and how it relates) and a constraint matrix (what rules govern the system). But these are still knowledge — they describe the world. To make them operational, you need to convert them into **semantic contracts**.

A semantic contract is the bridge between knowing and doing. It specifies, for each component of the system, exactly what it receives, what it decides, and what it produces — governed by the constraints from your matrix.

---

## The restaurant order analogy

Think about what happens when a waiter takes your order at a restaurant.

The waiter is operating with a contract — even if nobody wrote it down:

**Input contract (what the waiter receives):**
- Customer's spoken order (menu items, modifications, quantities)
- Any special requests ("no onions," "dressing on the side," "birthday candle on dessert")
- Dietary information if relevant ("I'm allergic to nuts")

**Decision contract (what the waiter decides):**
- Is the order valid? (item exists on menu, kitchen is still open for that item)
- Does the modification make sense? ("no cheese on the cheeseburger" is valid but unusual — confirm with customer)
- Is there a safety issue? (customer ordered a nut-containing dish but mentioned a nut allergy — flag immediately)

**Output contract (what the waiter produces):**
- A structured order ticket: table number, items with modifications, priority flags, sent to kitchen
- Verbal confirmation to the customer: "So that's one margherita, no olives, and a Caesar salad with dressing on the side?"
- If something is unavailable: immediate notification with alternatives

**Constraints applied:**
- Hard: never serve an item containing a declared allergen
- Soft: suggest drinks if the customer hasn't ordered any (but don't push)
- Exception: if a dish is 86'd (sold out) mid-service, manager can offer a comparable substitute at a discount

This complete specification — input, decision, output, constraints — IS a semantic contract. The waiter follows it every time they take an order. And if you replaced the waiter with an AI system, this contract would be exactly what the AI needs to do the job correctly.

---

## The three parts of a semantic contract

Every semantic contract has three parts. No exceptions.

### Part 1: Input contract

**What it answers:** "What does this component receive, and in what form?"

An input contract specifies:
- **What data enters** (fields, types, formats)
- **What's required vs. optional** (which fields must be present)
- **What's valid** (acceptable ranges, formats, values)
- **What happens with invalid input** (reject? transform? flag?)

**Example — a Ticket Classifier agent:**

```
INPUT CONTRACT

Required fields:
  - ticket_text: string, 1-5000 characters, the customer's message
  - customer_tier: enum (free, premium, enterprise)
  - ticket_source: enum (email, chat, phone, web_form)

Optional fields:
  - customer_history: list of previous ticket summaries (last 5)
  - product_id: string, the product referenced (if identifiable)

Validation rules:
  - ticket_text must not be empty
  - ticket_text longer than 5000 characters is truncated with "[truncated]" appended
  - if customer_tier is missing, default to "free"
  - if ticket_source is unknown, classify as "web_form"

Invalid input handling:
  - if ticket_text is empty: reject with error "Cannot classify empty ticket"
  - if ticket_text is in an unsupported language: route to human with note "Unsupported language detected"
```

**Why this matters:** without an input contract, the component receives whatever arrives — including garbage. The contract acts as a quality gate. Just like a recipe specifies "250g of flour, sifted" — not just "some flour" — the input contract specifies exactly what's needed.

### Part 2: Decision contract

**What it answers:** "What does this component decide, and by what rules?"

A decision contract specifies:
- **What decisions are made** (classification, ranking, routing, generation)
- **What rules govern each decision** (priorities, thresholds, criteria)
- **What trade-offs are allowed** (when two goals conflict, which wins)
- **What happens under uncertainty** (when the component isn't confident)

**Example — continuing the Ticket Classifier:**

```
DECISION CONTRACT

Primary decision: classify ticket urgency and category

Urgency classification:
  - CRITICAL: system outage, data breach, safety concern, legal threat
  - HIGH: service degradation, billing error over $500, enterprise customer blocker
  - MEDIUM: feature not working, account issue, general complaint
  - LOW: feature request, question answered in FAQ, general inquiry

Category classification:
  - TECHNICAL: product bugs, integration issues, performance problems
  - BILLING: charges, refunds, invoices, subscription changes
  - ACCOUNT: login issues, permissions, settings, profile
  - GENERAL: questions, feedback, feature requests, compliments

Decision rules:
  - Urgency takes priority over category (classify urgency first)
  - Enterprise customers get automatic +1 urgency level (MEDIUM becomes HIGH)
  - Any mention of "data breach," "security," or "unauthorized access" is auto-CRITICAL
  - Any mention of "cancel" with negative sentiment gets flagged for retention team

Uncertainty handling:
  - If urgency confidence < 70%: classify as one level higher (err on the side of caution)
  - If category confidence < 60%: output "NEEDS_HUMAN_REVIEW" instead of guessing
  - If both urgency and category are uncertain: route to senior agent
```

**Why this matters:** without decision rules, the AI uses its own judgment — which might be wrong, inconsistent, or unsafe. The decision contract is like a judge's sentencing guidelines: it doesn't remove judgment, but it structures it and ensures consistency.

### Part 3: Output contract

**What it answers:** "What does this component produce, and what guarantees does it offer?"

An output contract specifies:
- **What fields are produced** (structure, types, formats)
- **What guarantees the output offers** (always present, always valid, always within range)
- **What the output explicitly does NOT guarantee** (uncertainty disclaimers)
- **How confidence is communicated** (scores, flags, explanations)

**Example — Ticket Classifier output:**

```
OUTPUT CONTRACT

Produced fields:
  - urgency: enum (CRITICAL, HIGH, MEDIUM, LOW)
  - category: enum (TECHNICAL, BILLING, ACCOUNT, GENERAL, NEEDS_HUMAN_REVIEW)
  - confidence_urgency: float 0.0-1.0
  - confidence_category: float 0.0-1.0
  - reasoning: string, 1-3 sentences explaining the classification
  - flags: list of special flags (retention_risk, security_concern, vip_escalation)
  - recommended_routing: string, suggested team or agent type

Guarantees:
  - urgency is ALWAYS present (never null)
  - category is ALWAYS present (may be NEEDS_HUMAN_REVIEW)
  - reasoning is ALWAYS present (even for high-confidence classifications)
  - if urgency is CRITICAL, recommended_routing is always "senior_agent_immediate"

Does NOT guarantee:
  - Category accuracy for tickets in mixed languages
  - Correct urgency for highly sarcastic or ironic messages
  - Detection of urgency expressed only through attached images
```

**Why this matters:** the output contract is a promise. Whatever receives this component's output knows exactly what to expect — and what NOT to expect. Like a weather forecast that says "80% chance of rain" — it tells you both the prediction and the uncertainty, so you can decide whether to carry an umbrella.

---

## Connecting contracts to the ontology and constraint matrix

Semantic contracts don't exist in isolation. They draw from the ontology and constraint matrix you built in Lessons 1 and 2.

**From the ontology, contracts get:**
- Entity definitions (what's a "ticket"? what's a "customer"? the ontology defines these)
- Valid states (a ticket can be "open" or "resolved" — the contract references these states)
- Relationships (a ticket "belongs to" a customer — the contract uses this relationship)

**From the constraint matrix, contracts get:**
- Hard constraints become non-negotiable rules in the decision contract
- Soft constraints become default preferences with acceptable ranges
- Exception constraints become escalation triggers

**Example mapping:**

| Source | Constraint/Definition | Where it appears in the contract |
|---|---|---|
| Ontology: Customer entity | customer_tier: free, premium, enterprise | Input contract: required field with enum values |
| Ontology: Ticket states | open → assigned → in_progress → resolved | Not in classifier contract (this contract only classifies, doesn't change state) |
| Constraint H01 | Never share customer PII | Output contract: reasoning field must not include customer personal data |
| Constraint S03 | Respond within 30 seconds | Implicit: contract should be designed for fast classification |
| Constraint E02 | Manager can override urgency | Not in classifier contract (override happens downstream) |

This traceability is crucial. If someone asks "why does the classifier treat enterprise customers differently?" you can trace it back: classifier decision rule → constraint S05 (enterprise SLA priority) → business policy (enterprise contracts guarantee faster response).

---

## A complete worked example: appointment booking agent

Let's build a complete semantic contract package for a doctor's office appointment booking system.

### Context from ontology

```
Entities used: Patient, Doctor, Appointment, TimeSlot, Insurance
Key relationships: Patient books Appointment, Doctor has TimeSlots, Appointment requires Insurance verification
```

### The contract

```
BOOKING AGENT — SEMANTIC CONTRACT

--- INPUT CONTRACT ---

Required:
  - patient_id: string (existing patient in system)
  - requested_doctor: string (doctor name or "any available")
  - reason_for_visit: string, 10-500 characters
  - preferred_dates: list of dates (1-5 options)
  - preferred_time: enum (morning, afternoon, any)

Optional:
  - urgency_note: string (if patient indicates urgency)
  - insurance_id: string (pre-verified insurance number)

Validation:
  - patient_id must exist in patient database (reject with "Patient not found" if missing)
  - preferred_dates must be future dates (reject past dates)
  - at least 1 preferred date required

--- DECISION CONTRACT ---

Step 1: Check availability
  - Query doctor's calendar for requested dates/times
  - Filter: only show slots that match doctor's specialization to visit reason
  - If no match: suggest nearest available alternatives (within 7 days of requested dates)

Step 2: Assess urgency
  - If urgency_note contains keywords (pain, bleeding, fever, emergency): flag as URGENT
  - URGENT bookings: offer next available slot regardless of date preference
  - Non-urgent bookings: respect date/time preferences

Step 3: Verify insurance (if provided)
  - Check insurance covers the requested doctor
  - Check insurance covers the type of visit
  - If not covered: inform patient BEFORE confirming, offer alternatives

Step 4: Confirm or escalate
  - If slot available + insurance verified: confirm booking
  - If slot available but insurance issue: present options (pay out-of-pocket, choose covered doctor)
  - If no slots available within 14 days: escalate to front desk staff

Decision rules:
  - NEVER double-book a doctor (hard constraint from matrix H03)
  - Prefer patient's regular doctor over any available (soft constraint S01)
  - If two patients request the same slot, first-come-first-served
  - New patients get 30-minute slots; returning patients get 15-minute slots (unless reason suggests longer)

Uncertainty handling:
  - If visit reason is ambiguous: ask patient to clarify before booking
  - If insurance verification times out: book provisionally, mark "insurance pending"
  - If doctor's schedule changes after booking: notify patient within 1 hour

--- OUTPUT CONTRACT ---

Produced:
  - booking_status: enum (confirmed, provisional, needs_clarification, escalated_to_staff)
  - appointment_details: (date, time, doctor, location, duration)
  - preparation_instructions: string (fasting requirements, documents to bring, etc.)
  - confirmation_message: patient-friendly summary of the booking
  - internal_flags: list (urgent, insurance_pending, new_patient, schedule_conflict)

Guarantees:
  - No double-bookings will occur
  - Patient will always receive a clear next step (confirmed, or what they need to do)
  - If urgent, patient will be offered the earliest possible appointment

Does NOT guarantee:
  - That the preferred date/time will be available
  - That insurance will be verified in real-time (may be provisional)
  - Diagnosis or medical advice of any kind
```

Notice how this contract is **complete, precise, and actionable.** An AI developer reading this contract knows exactly what to build. A product manager reading it knows exactly what the system will do. A patient reading the output knows exactly what to expect.

---

## How contracts become executable

The contracts you build are not just documents — they translate directly into AI system configuration.

**Input contract → Input validation layer**
The validation rules become code or prompt instructions that filter and transform incoming data before the AI processes it.

**Decision contract → System prompt + agent logic**
The decision rules become instructions in the AI's system prompt. "If urgency_note contains keywords (pain, bleeding, fever, emergency): flag as URGENT" becomes a literal instruction to the language model.

**Output contract → Output schema + validation**
The output structure becomes a schema that the AI must follow. If the contract says "booking_status is always present," the system enforces this — if the AI produces output without booking_status, it's caught and corrected.

**Constraints → Guardrails**
Hard constraints become rules the system cannot bypass. "Never double-book" becomes a database check that runs before any booking is confirmed — regardless of what the AI decides.

This is the power of semantic contracts: **they bridge the gap between human design and machine implementation.**

---

## Practice activity

Take the domain ontology you built in Lesson 1 and the constraint matrix you built in Lesson 2, and create semantic contracts for two components of your system:

**For each contract, specify:**

1. **Input contract:**
   - Required and optional fields with types
   - Validation rules
   - Invalid input handling

2. **Decision contract:**
   - What decisions are made
   - What rules govern each decision
   - What happens under uncertainty

3. **Output contract:**
   - Produced fields with types
   - Guarantees (what's always true about the output)
   - Non-guarantees (what the output does NOT promise)

4. **Traceability:**
   - For each decision rule, note which constraint or ontology element it comes from

**Bonus:** identify one scenario where two contracts interact — where the output of one contract becomes the input of another. How do the contracts ensure compatibility?

---

## Key takeaways

1. **A semantic contract has three parts: input, decision, output.** No exceptions. Every component that processes information needs all three specified.

2. **Contracts draw from the ontology and constraint matrix.** They don't exist in isolation — they reference the shared vocabulary (ontology) and the rules (constraints) you've already defined.

3. **Contracts are promises.** The output contract is a commitment about what the component will always produce and what it won't. Downstream components rely on these promises.

4. **Contracts bridge design and implementation.** Input contracts become validation logic. Decision contracts become prompt instructions. Output contracts become schemas. Constraints become guardrails. The SSA designs them; the developer implements them.

5. **Contracts must handle uncertainty.** Real-world inputs are messy. Decisions aren't always clear-cut. A good contract specifies what happens when the component isn't sure — because "I don't know" is a valid output that needs to be designed.

---

## What comes next

In **Application A**, you'll build a complete domain ontology (12+ entities). In **Application B**, you'll test your ontology against real-world ambiguity by collecting 20 ambiguous expressions and resolving them with operational definitions. These applications bring together everything from all three lessons.
