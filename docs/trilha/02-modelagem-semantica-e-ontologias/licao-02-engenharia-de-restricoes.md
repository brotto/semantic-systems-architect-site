---
sidebar_position: 3
sidebar_label: "Lesson 2 — Constraint engineering"
---

# Lesson 2 — Constraint engineering

## Not all rules are equal

In Lesson 1, you built a domain ontology: entities, attributes, relationships, states, and transitions. But an ontology alone doesn't tell the system **how to behave**. For that, you need constraints — the rules that govern what the system can and cannot do.

Here's the key insight: **not all rules are equally important.**

Some rules must never be broken, under any circumstance. Some rules should usually be followed but can be bent. And some rules can be overridden entirely if the right person gives the right justification.

Getting this classification right is the difference between a system that is safe, trustworthy, and practical versus one that is either dangerously permissive or frustratingly rigid.

---

## The traffic analogy

Traffic rules are the perfect example of constraint classification.

**Hard constraints (never break):**
- Drive on the right side of the road (in right-hand-traffic countries)
- Stop for a school bus with flashing lights
- Don't drive the wrong way on a one-way street

These rules are absolute. Breaking them puts lives at risk. There is no acceptable justification for violating them. A well-designed AI system treats hard constraints the same way — they are non-negotiable.

**Soft constraints (usually follow, but exceptions exist):**
- Observe the speed limit
- Come to a complete stop at a stop sign
- Park only in designated spaces

In practice, most people occasionally go 5 km/h over the speed limit. If you're rushing someone to the hospital, you might run a stop sign. If a parking lot is full and you're dropping off something heavy, you might briefly double-park. These rules are important, but real life sometimes requires flexibility.

**Exception constraints (can override with proper authority):**
- Emergency vehicles can run red lights (with sirens on)
- Police can park in no-parking zones (while on duty)
- Construction crews can close lanes (with proper permits)

These overrides are not random — they require specific authority, specific conditions, and often specific procedures. An ambulance doesn't just run a red light randomly. It activates its sirens (announcing the override), the driver checks the intersection (verifying safety), and the reason is documented (accountability).

**The SSA's job is to classify every rule in the system this way — and to specify what happens at each level.**

---

## The three types of constraints

### Type 1: Hard constraints (invariants)

**Definition:** rules that must never be violated, regardless of context, authority, or circumstance.

**How to identify them:** ask — "Is there ANY scenario where breaking this rule would be acceptable?" If the answer is "no, never," it's a hard constraint.

**Examples across domains:**

- **Medical:** never administer a medication the patient is allergic to
- **Financial:** never process a transaction that would make an account balance negative (without overdraft authorization)
- **Legal:** never provide legal advice without disclaimers
- **Data privacy:** never expose one customer's personal data to another customer
- **Safety:** never skip escalation for a detected emergency

**What happens when a hard constraint is tested:** the system must refuse to proceed. It doesn't try to work around it. It doesn't ask for permission. It stops, explains why, and either blocks the action or escalates to a human.

**Everyday analogy:** think about the safety locks on dangerous equipment. A circular saw won't start unless the safety guard is in place. It doesn't matter how experienced the operator is, how urgent the job is, or who's asking. The constraint is physical and absolute.

### Type 2: Soft constraints (preferences)

**Definition:** rules that should normally be followed but can be bent when circumstances justify it.

**How to identify them:** ask — "Would I sometimes accept a reasonable deviation from this rule?" If yes, it's a soft constraint.

**Examples:**

- **Response time:** aim to respond within 30 seconds (but 45 seconds is acceptable during peak hours)
- **Content style:** keep responses under 200 words (but longer is fine for complex explanations)
- **Routing preference:** route returning customers to agents they've worked with before (but any qualified agent is acceptable)
- **Language tone:** maintain formal tone (but match the customer's tone if they're casual)
- **Data freshness:** use data updated within the last 24 hours (but 48-hour-old data is acceptable if the API is down)

**What happens when a soft constraint is bent:** the system logs the deviation. It continues operating but notes that a preference was not met. This log becomes useful for monitoring — if a soft constraint is consistently unmet, it might indicate a systemic problem.

**Everyday analogy:** think about household guidelines for children. "Eat your vegetables at dinner" is a soft constraint. If the child eats three bites of broccoli instead of a full serving, you note it but don't treat it as a crisis. But if they skip vegetables for two weeks straight, it's time to address the pattern.

### Type 3: Exception constraints (overridable policies)

**Definition:** rules that normally apply but can be explicitly overridden by an authorized person or condition, with documented justification.

**How to identify them:** ask — "Is there a scenario where someone with authority should be able to override this rule, and we'd want a record of why?"

**Examples:**

- **SLA override:** "Response time SLA is 2 hours. Regional manager can override during declared service incidents, with reason documented."
- **Approval threshold:** "Refunds over $100 require manager approval. VP can waive this for enterprise accounts, with justification recorded."
- **Access control:** "Customer data is limited to assigned agents. Team lead can grant temporary access during escalation, with scope and duration specified."
- **Dosage limit:** "Maximum prescribable dose is 40mg. Specialist can override up to 60mg for documented clinical reasons, countersigned by attending physician."

**The key elements of every exception:**
1. **Who** can override (authority)
2. **When** they can override (conditions)
3. **How** the override is documented (audit trail)
4. **What limits** the override still has (the override is not unlimited)

**Everyday analogy:** think about the rules at a library. Books must be returned in 14 days. But the librarian can extend the loan for another 14 days (authority: librarian; condition: book not reserved by someone else; documentation: extension logged in the system; limit: maximum 2 extensions). The rule exists, but it has a structured override path.

---

## Building a constraint matrix

A **constraint matrix** is the artifact that captures all constraints for a system, classified by type.

### The format

| ID | Constraint | Type | Reason | Override authority | Audit |
|---|---|---|---|---|---|
| C01 | Never expose customer PII to unauthorized users | Hard | Privacy law and trust | None (no override) | N/A |
| C02 | Respond within 30 seconds | Soft | User experience | N/A (preference) | Log deviations |
| C03 | Refunds > $100 need approval | Exception | Financial control | Manager (justification required) | Log who approved, when, why |

### Step-by-step: building a constraint matrix

**Step 1: Collect all known rules (30 minutes)**

Go through your domain ontology and for every entity, ask:
- What rules govern this entity's creation?
- What rules govern state transitions?
- What rules govern how this entity interacts with others?
- What must never happen to this entity?
- What should usually happen but can flex?

Also review:
- Business policies (terms of service, internal policies, SLAs)
- Legal requirements (privacy laws, regulatory compliance)
- Safety requirements (what could harm people if violated)
- Quality standards (what the stakeholders expect)

**Step 2: Classify each rule (20 minutes)**

For each rule, apply the three questions:
1. "Can this EVER be broken?" → If no: **hard constraint**
2. "Would a reasonable deviation sometimes be acceptable?" → If yes: **soft constraint**
3. "Can an authorized person override this with justification?" → If yes: **exception constraint**

**Step 3: Specify the details (20 minutes)**

For hard constraints: what happens when the constraint is triggered? (Refuse? Block? Alert? Escalate?)

For soft constraints: what is the acceptable range of deviation? (30 seconds preferred, 60 seconds maximum)

For exceptions: who can override, under what conditions, with what documentation?

**Step 4: Test with scenarios (15 minutes)**

For each constraint, create a scenario that tests it:
- Hard: "What if a VIP customer demands access to another customer's data?" → Answer: refuse. No exceptions.
- Soft: "What if response times hit 45 seconds during Black Friday?" → Answer: acceptable. Log and monitor.
- Exception: "What if a customer needs a $200 refund and no manager is available?" → Answer: define fallback (e.g., auto-approve with post-audit, or make the customer wait).

---

## A worked example: online tutoring platform

Let's build a constraint matrix for an online tutoring platform where students book sessions with tutors.

### Hard constraints

| ID | Constraint | Reason | If triggered |
|---|---|---|---|
| H01 | Never book a student with a tutor who has an active safeguarding flag | Child safety | Block booking, alert admin |
| H02 | Never share a student's learning disabilities with other students | Privacy, dignity | Refuse to include in any student-visible content |
| H03 | Never allow a session to start without both parties confirming identity | Safety protocol | Hold session in "pending" until confirmed |
| H04 | Never provide assessment scores to anyone other than the student and their registered guardian | Data protection | Restrict access, log attempts |

### Soft constraints

| ID | Constraint | Preferred | Acceptable range |
|---|---|---|---|
| S01 | Match students with tutors they've worked with before | Same tutor | Any qualified tutor in the subject |
| S02 | Start sessions within 2 minutes of scheduled time | On time | Up to 5 minutes late (auto-warning at 3 min) |
| S03 | Keep session notes under 500 words | Concise summary | Up to 1000 words for complex topics |
| S04 | Schedule follow-up within 48 hours of session | Timely reinforcement | Within 1 week is acceptable |

### Exception constraints

| ID | Constraint | Who can override | Conditions | Documentation |
|---|---|---|---|---|
| E01 | Maximum 3 sessions per day per tutor | Academic director | During exam season or tutor request | Log override with reason |
| E02 | Students must complete prerequisite modules before advancing | Tutor (with justification) | Demonstrated competency through alternative evidence | Record evidence + tutor reasoning |
| E03 | Session cancellations require 24-hour notice for refund | Customer service manager | Documented emergency (medical, family) | Record emergency type, approval |

### How this helps the AI

When an AI system has this constraint matrix, it knows:
- **What to never do** (hard constraints become non-negotiable rules in the system prompt)
- **What to prefer** (soft constraints become default behavior with flexibility)
- **When to ask for help** (exception constraints become escalation triggers)

Without this matrix, the AI guesses. It might let an unsafe booking happen because nobody told it about safeguarding. It might rigidly refuse a legitimate exception because it treats every rule as absolute. The constraint matrix eliminates both dangers.

---

## The cascading constraint problem

One subtlety that catches beginners: constraints interact with each other.

**Example:** your system has these constraints:
- H01: Always respond to a customer within 30 minutes (hard)
- H02: Never provide medical information without a disclaimer (hard)
- S01: Keep responses under 200 words (soft)

Now imagine a customer asks a medical question. Constraint H02 requires adding a disclaimer (which adds ~50 words). Constraint S01 says keep it under 200 words. But now the useful content must fit in 150 words. And constraint H01 says do it fast.

What happens when the medical topic requires 300 words to explain properly?

**Resolution approach:**
1. H01 (respond quickly) is hard — you must respond on time
2. H02 (add disclaimer) is hard — you must include it
3. S01 (keep it short) is soft — this can bend
4. **Decision:** respond on time with the disclaimer, allow longer response for medical topics, log the deviation from S01

This is **constraint priority resolution** — and it must be designed, not left to chance. When constraints conflict, the SSA must specify which one wins.

**Everyday analogy:** think about a household with multiple rules during a dinner party. "No phones at the table" (soft). "Always be polite to guests" (hard). What if a guest's phone rings during dinner? The politeness rule (hard) overrides the no-phones rule (soft) — you allow the guest to answer. But if YOUR phone rings, the no-phones rule still applies because the politeness rule doesn't protect you.

---

## Practice activity

Go back to the domain you decomposed in Lesson 1 and build a constraint matrix:

1. **List 15+ rules** that govern your domain (review each entity and its transitions)
2. **Classify each rule** as hard, soft, or exception
3. **For hard constraints:** specify what happens when triggered (block? alert? refuse?)
4. **For soft constraints:** specify the preferred behavior AND the acceptable range
5. **For exceptions:** specify who can override, when, and what documentation is required
6. **Identify 2 constraint conflicts** — scenarios where constraints might contradict each other. Specify the priority resolution.

---

## Key takeaways

1. **Not all rules are equal.** Some must never be broken (hard), some are flexible (soft), and some can be overridden with authority (exception). Getting this classification wrong is one of the most common sources of AI system failure.

2. **Hard constraints are the safety net.** They protect against the worst outcomes. Design them first, make them absolute, and never compromise them for convenience.

3. **Soft constraints make systems practical.** A system that treats every rule as absolute is unusable. Real-world systems need flexibility — but that flexibility must be designed, not accidental.

4. **Exception constraints need structure.** An override without authority, conditions, limits, and documentation is not a managed exception — it's a loophole. Design the override path as carefully as the rule itself.

5. **Constraints interact.** When two constraints conflict, one must take priority. This priority must be specified in advance, not decided ad hoc when the conflict occurs.

---

## What comes next

In **Lesson 3 — Contract packaging**, you'll combine your ontology and constraint matrix into **semantic contracts** — the executable specifications that tell each part of the system exactly what it receives, what it decides, and what it produces. This is where the ontology becomes operational.
