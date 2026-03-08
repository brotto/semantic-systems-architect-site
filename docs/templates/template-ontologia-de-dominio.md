---
sidebar_position: 2
sidebar_label: "Domain Ontology"
---

# Template -- Domain Ontology

A domain ontology is the dictionary, grammar book, and rule book of your AI system, all rolled into one document. Without it, agents are tourists in a foreign country -- they can gesture and guess, but they cannot truly understand the world they operate in.

This template guides you through building a complete ontology for any domain. Each section builds on the previous one: you start by defining the boundaries of your domain, then catalog what exists within those boundaries, map how those things relate, constrain what is and isn't allowed, trace how things change over time, and resolve the ambiguities that would otherwise cause silent failures.

**How to use this template:** Work through the sections in order. The Entity Catalog informs the Relationship Map, which informs the Constraint Matrix, which informs the State Lifecycles. Skipping ahead creates gaps. If you are uncertain about something, write your best understanding and flag it in the Ambiguity Resolution Log -- that is exactly what that section is for.

**Who should contribute:** The SSA leads this document, but domain experts are essential collaborators. An ontology built without domain experts is a work of fiction.

---

## 1. Domain Definition

**Purpose:** Draw the boundaries of the world your AI system operates in. Everything inside these boundaries is your domain. Everything outside is someone else's problem.

Think of this like defining the edges of a game board. Chess has 64 squares, specific pieces, and specific rules. You don't need to define what happens if someone places a Monopoly hotel on the board -- that's outside the domain.

### 1.1 System boundary

Describe what this domain includes and excludes. Be concrete.

```
Domain name: [e.g., Auto Insurance Claims Processing]

This domain includes:
- [e.g., The lifecycle of an auto insurance claim from submission to resolution]
- [e.g., The policies, vehicles, and parties involved in auto claims]
- [e.g., The rules governing claim eligibility, coverage limits, and approval]

This domain excludes:
- [e.g., Health insurance, life insurance, or property insurance claims]
- [e.g., Policy sales, underwriting, or renewal processes]
- [e.g., Payment processing and disbursement mechanics]

Adjacent domains (systems that interact with this one):
- [e.g., Policy Management -- provides policy data, no write access]
- [e.g., Payment Processing -- receives approved claim amounts, separate system]
- [e.g., Fraud Detection -- receives flagged claims, returns risk scores]
```

### 1.2 Domain language

Every domain has its own vocabulary. Terms that seem obvious often have precise meanings that differ from everyday usage. This subsection prevents dangerous assumptions.

Think of how "patient" means something very specific in medicine, "class" means something different in programming than in education, and "strike" means different things in baseball, bowling, and labor relations.

```
Authoritative vocabulary sources:
- [e.g., National Association of Insurance Commissioners (NAIC) glossary]
- [e.g., Internal company claims handling manual, version 3.2]
- [e.g., State insurance code for CA, TX, NY]

Key term definitions:
- [Term]: [Precise definition as used in THIS system]
- [Term]: [Precise definition as used in THIS system]
```

**Guidance:** If a term has multiple possible meanings, record all of them here and resolve the ambiguity in Section 6 (Ambiguity Resolution Log).

---

## 2. Entity Catalog

**Purpose:** List every "thing" that exists in your domain. Entities are the nouns of your system. Each one must have a clear operational definition -- not a dictionary definition, but a definition specific enough that two people reading it would agree on whether a specific real-world object is or is not an instance of that entity.

Think of entities like the pieces in a board game. Before you can explain the rules, you need to lay out all the pieces and say what each one is and what properties it has.

### 2.1 Entity table

| Entity | Operational definition | Key attributes | Valid states | Owner / Source of truth |
|---|---|---|---|---|
| Claim | A formal request by a policyholder for coverage payment following a covered loss event | claim_id, policy_id, date_of_loss, loss_type, claimed_amount, submitted_at | submitted, under_review, approved, denied, withdrawn, appealed | Claims database |
| Policy | An active contract between the insurer and a policyholder defining coverage terms | policy_id, holder_id, coverage_type, effective_date, expiry_date, coverage_limit, deductible | active, lapsed, cancelled, suspended | Policy management system |
| Vehicle | A motor vehicle covered under an auto insurance policy | vin, make, model, year, license_plate, policy_id | covered, removed, total_loss | Policy management system |
| Document | A file submitted as evidence or documentation for a claim | doc_id, claim_id, doc_type, file_format, uploaded_at, extracted_data | uploaded, processing, extracted, failed_extraction, verified | Document storage |
| Adjuster | A qualified professional who evaluates and decides on claims | adjuster_id, name, license_number, specialization, region, max_caseload | active, on_leave, suspended, terminated | HR system |
| _[Add your entities here]_ | | | | |

**Guidance on completeness:**
- If an agent reads, writes, or reasons about something, it is an entity -- add it.
- If two entities seem similar, ask: "Can I have one without the other?" If yes, they are separate entities.
- Include at least every entity that appears in your system's inputs, outputs, and decision logic.
- Minimum recommended: 5-15 entities for a focused system, 15-40 for a complex system.

### 2.2 Attribute detail (for complex entities)

For entities with many attributes or attributes that require clarification, expand them here:

```
ENTITY: Claim
  claim_id:       String, system-generated UUID, immutable after creation
  policy_id:      String, must reference an existing active policy
  date_of_loss:   Date, must be on or before submission date, cannot be in the future
  loss_type:      Enum: collision, comprehensive, liability, uninsured_motorist
  claimed_amount: Decimal, must be > 0, must not exceed policy coverage limit
  submitted_at:   Timestamp, system-generated at submission
  assigned_to:    String (adjuster_id), nullable until assignment
  priority:       Enum: standard, expedited, urgent
  fraud_score:    Float 0.0-1.0, nullable until scoring completes
```

---

## 3. Relationship Map

**Purpose:** Define how entities connect to each other. Relationships are the verbs between your nouns. Without them, you have a pile of isolated definitions. With them, you have a connected model of reality.

Think of relationships like the roads between cities on a map. The cities (entities) matter, but the roads (relationships) determine how you can travel between them.

### 3.1 Relationship table

| Origin entity | Relationship | Destination entity | Cardinality | Business rule | Required? |
|---|---|---|---|---|---|
| Claim | belongs_to | Policy | many-to-one | Every claim must reference exactly one active policy | Yes |
| Claim | assigned_to | Adjuster | many-to-one | A claim may be unassigned; an adjuster may have multiple claims | No |
| Claim | contains | Document | one-to-many | A claim must have at least one document to enter review | Yes (min 1) |
| Policy | covers | Vehicle | one-to-many | A policy may cover multiple vehicles | Yes (min 1) |
| Adjuster | reviews | Claim | one-to-many | Only adjusters with matching specialization can be assigned | Conditional |
| _[Add your relationships here]_ | | | | | |

### 3.2 Relationship constraints

Some relationships have additional rules beyond cardinality. Document them here:

```
RELATIONSHIP: Claim --[assigned_to]--> Adjuster
  Constraint: Adjuster's specialization must match claim's loss_type
  Constraint: Adjuster's current caseload must be below max_caseload
  Constraint: Adjuster must be in "active" state (not on_leave, suspended, or terminated)
  Violation behavior: Assignment rejected, claim returned to unassigned queue

RELATIONSHIP: Claim --[belongs_to]--> Policy
  Constraint: Policy must be in "active" state at the time of loss (date_of_loss)
  Constraint: Loss_type must be covered by the policy's coverage_type
  Violation behavior: Claim automatically denied with reason "policy not active" or
    "loss type not covered"
```

### 3.3 Relationship diagram (optional)

If you prefer a visual representation, include a simple text diagram:

```
Customer --[holds]--> Policy --[covers]--> Vehicle
                        |
                    [has_claim]
                        |
                      Claim --[contains]--> Document
                        |
                  [assigned_to]
                        |
                     Adjuster
```

---

## 4. Constraint Matrix

**Purpose:** Catalog every rule that governs your domain, classified by type. Constraints are the physics of your domain -- they define what is possible, what is preferred, and what is forbidden.

Think of constraints like the rules of a game. Hard constraints are like the rule that you can't move a rook diagonally in chess -- violating them means the game is invalid. Soft constraints are like the strategic advice that you should control the center -- following them leads to better outcomes, but breaking them isn't illegal. Exception constraints define the rare situations where a normal rule doesn't apply.

### 4.1 Hard constraints

Hard constraints must never be violated. A violation is a system defect that requires immediate attention.

| ID | Constraint | Applies to | Enforcement mechanism | Violation response |
|---|---|---|---|---|
| HC-01 | A claim cannot be approved if the policy was not active on the date of loss | Claim approval | Pre-decision validation query to policy database | Block approval, flag for review |
| HC-02 | A claim amount cannot exceed the policy coverage limit minus the deductible | Claim amount | Calculation check before output generation | Cap amount, notify adjuster |
| HC-03 | Every state transition must be logged with timestamp, actor, and reason | All entities | Middleware logging layer | If log fails, block the transition |
| HC-04 | PII must never appear in agent reasoning traces or logs | All agents | Output sanitization filter | Mask PII, alert security team |
| _[Add hard constraints]_ | | | | |

### 4.2 Soft constraints

Soft constraints represent best practices or preferred behaviors. Violations are tolerated but tracked.

| ID | Constraint | Default behavior | Tracking metric |
|---|---|---|---|
| SC-01 | Claims should be assigned to an adjuster within 4 hours of submission | Auto-assign based on specialization and caseload | % of claims assigned within SLA |
| SC-02 | The agent should provide confidence scores above 0.85 for extracted fields | Flag fields below threshold for human review | % of fields above confidence threshold |
| SC-03 | Claim summaries should be under 300 words | Truncate with "see full details" link | Average summary length |
| _[Add soft constraints]_ | | | |

### 4.3 Exception constraints

Exception constraints define the conditions under which a normally applicable rule does not apply.

| ID | Normal rule | Exception condition | Behavior under exception | Authorization required |
|---|---|---|---|---|
| EC-01 | Claims above $10K require human review (HC) | Natural disaster declared in region | Threshold raised to $25K for 30 days | VP Claims written approval |
| EC-02 | Adjuster caseload must be below max (SC) | Fewer than 3 adjusters available in region | Temporary caseload increase of 50% | Manager approval |
| _[Add exception constraints]_ | | | | |

**Guidance on completeness:**
- Every hard constraint should be testable. If you can't write a test for it, it's too vague.
- Aim for at least 5-10 hard constraints, 3-5 soft constraints, and document every known exception.
- Soft constraints should have metrics. If you can't measure it, you can't improve it.

---

## 5. State Lifecycles

**Purpose:** For each entity that changes state over time, document the complete lifecycle: what states it can be in, what transitions are allowed, what triggers each transition, and what happens at each transition.

Think of a state lifecycle like the life stages of a butterfly: egg, larva, pupa, adult. Each stage has specific characteristics, and transitions between stages happen under specific conditions. A butterfly cannot go from egg directly to adult -- it must pass through larva and pupa. Your entities have similar rules.

### 5.1 Lifecycle diagrams

For each entity with state changes, create a lifecycle:

```
ENTITY: Claim

  [submitted]
      |
      v (auto: assignment algorithm)
  [under_review]
      |
      +--> (adjuster: approve) --> [approved] --> (system: archive after 90d) --> [archived]
      |
      +--> (adjuster: deny) --> [denied] --> (claimant: appeal) --> [appealed] --> [under_review]
      |                                                                |
      |                                                                +--> (timeout: 60d) --> [closed]
      |
      +--> (claimant: withdraw) --> [withdrawn] --> [closed]
      |
      +--> (system: fraud flag) --> [escalated] --> (fraud team: resolve) --> [under_review]
                                                                         |
                                                                         +--> (fraud team: confirm fraud) --> [denied]

TERMINAL STATES: archived, closed
FORBIDDEN TRANSITIONS:
  - denied --> approved (must go through appeal first)
  - archived --> any state (archived is permanent)
  - withdrawn --> under_review (must resubmit as new claim)
```

### 5.2 Transition detail table

| Entity | From state | To state | Trigger | Actor | Side effects | Reversible? |
|---|---|---|---|---|---|---|
| Claim | submitted | under_review | Auto-assignment completes | System | Adjuster notified, SLA timer starts | No |
| Claim | under_review | approved | Adjuster clicks approve | Adjuster (human) | Payment request created, claimant notified | Only via reversal process |
| Claim | under_review | denied | Adjuster clicks deny with reason | Adjuster (human) | Denial letter generated, appeal window opens | Via appeal |
| Claim | denied | appealed | Claimant submits appeal within 60 days | Claimant | New review assigned to different adjuster | No (appeal is one-time) |
| _[Add transition rows]_ | | | | | | |

**Guidance:** Every entity that has a "states" column in the Entity Catalog (Section 2) should have a lifecycle documented here. If an entity doesn't change state, note that explicitly: "Document: static entity, no state transitions."

---

## 6. Ambiguity Resolution Log

**Purpose:** Document every term, rule, or concept where reasonable people could disagree on the meaning, and record the decision you made. Ambiguity is the number one source of AI system failures that look correct on the surface but are wrong underneath.

Think of this log like a court's record of precedent decisions. When a judge decides what "reasonable" means in a specific case, that decision is recorded so future cases are decided consistently. Your ambiguity log serves the same purpose.

### 6.1 Resolved ambiguities

| ID | Ambiguous term or concept | Possible interpretations | Risk if unresolved | Adopted definition | Decided by | Date |
|---|---|---|---|---|---|---|
| AMB-01 | "Total loss" | (a) Vehicle repair cost exceeds market value; (b) Vehicle is undriveable; (c) State-specific threshold (varies by state) | Agent might classify a repairable vehicle as total loss, or vice versa | Interpretation (c): total loss is declared when repair cost exceeds the state-specific threshold percentage of the vehicle's actual cash value | Domain expert + Legal | 2025-01-20 |
| AMB-02 | "Date of loss" vs. "date of discovery" | (a) The day the accident occurred; (b) The day the policyholder discovered the damage | Agent might reject valid claims where discovery was delayed (e.g., hit-and-run in parking lot) | date_of_loss = the date the damage-causing event occurred, even if discovered later. date_of_discovery is a separate attribute for tracking purposes | Claims VP | 2025-01-22 |
| AMB-03 | "Urgent" priority | (a) Life-threatening situation; (b) High dollar amount; (c) VIP customer | Agent might assign wrong priority, delaying genuine emergencies | "Urgent" = bodily injury involved OR emergency temporary housing needed. High dollar amount alone = "expedited", not "urgent" | Claims VP + Medical liaison | 2025-01-25 |
| _[Add resolved ambiguities]_ | | | | | | |

### 6.2 Open ambiguities

These are ambiguities that have been identified but not yet resolved. They represent active risks.

| ID | Ambiguous term or concept | Possible interpretations | Risk level | Assigned to | Target resolution date |
|---|---|---|---|---|---|
| AMB-OPEN-01 | _[term]_ | _[interpretations]_ | _[High/Medium/Low]_ | _[person]_ | _[date]_ |

**Guidance:**
- You will never finish resolving ambiguities. New ones emerge as the system encounters real data. This log is a living document.
- Every time an agent produces an unexpected output, check if the root cause is an unresolved ambiguity. If so, add it here and resolve it.
- Aim for at least 5 resolved ambiguities before launching. If you have fewer than 5, you haven't looked hard enough.

---

## 7. Canonical Examples

**Purpose:** Provide concrete, realistic examples that illustrate how the ontology works in practice. These examples serve three purposes: they validate that the ontology is complete (if you can't model the example, something is missing), they serve as test cases for the system, and they serve as training material for new team members.

Think of canonical examples like the sample problems in a math textbook. The formulas and rules only make sense when you see them applied to actual numbers.

### 7.1 Valid cases (the system should handle these correctly)

```
VALID CASE 1: Standard auto collision claim
  Scenario: Policyholder rear-ended at intersection, files claim next day
  Entities involved: Claim (C-1001), Policy (P-5522, active), Vehicle (VIN-ABC123)
  Key attributes:
    - date_of_loss: 2025-02-10
    - loss_type: collision
    - claimed_amount: $4,200
    - policy coverage_limit: $50,000
    - deductible: $500
  Expected flow:
    - Claim submitted --> auto-assigned to adjuster with collision specialization
    - Documents extracted: police report, repair estimate, photos
    - Classification: standard (amount well under threshold)
    - Summary generated for adjuster
    - Adjuster reviews and approves
    - Net payment: $4,200 - $500 deductible = $3,700
  Constraints satisfied: HC-01 (policy active), HC-02 (amount under limit)

VALID CASE 2: [Describe another valid scenario]
  ...

VALID CASE 3: [Describe a valid but edge-case scenario]
  ...
```

### 7.2 Invalid cases (the system should reject or flag these)

```
INVALID CASE 1: Claim on lapsed policy
  Scenario: Policyholder files claim, but policy lapsed 2 months before the loss date
  Entities involved: Claim (C-1002), Policy (P-5523, lapsed)
  Key attributes:
    - date_of_loss: 2025-03-01
    - policy expiry_date: 2025-01-01
    - policy status: lapsed
  Expected behavior:
    - HC-01 triggers: policy not active on date of loss
    - Claim automatically denied with reason "policy not active on date of loss"
    - Claimant notified of denial and appeal rights
  Why this matters: Tests hard constraint enforcement

INVALID CASE 2: [Describe another invalid scenario]
  ...
```

### 7.3 Ambiguous cases (the system should handle these according to resolved ambiguities)

```
AMBIGUOUS CASE 1: Delayed discovery of damage
  Scenario: Policyholder discovers dent and scrapes on car in parking garage,
    unsure when it happened, files claim 5 days after noticing
  Ambiguity triggered: AMB-02 (date of loss vs. date of discovery)
  Expected behavior per resolution:
    - date_of_loss = estimated date of event (policyholder's best estimate)
    - date_of_discovery = date policyholder noticed damage
    - Claim is valid as long as policy was active during the estimated date range
  Why this matters: Tests ambiguity resolution AMB-02 in practice
```

**Guidance:**
- Include at least 3 valid cases, 2 invalid cases, and 2 ambiguous cases.
- Each case should reference specific entities, constraints, and ambiguity resolutions from earlier sections.
- Update these examples whenever the ontology changes -- stale examples are misleading.

---

## 8. Version History

**Purpose:** Track how the ontology evolves over time. Ontologies are living documents. They change as the domain evolves, as ambiguities are resolved, and as the system encounters new edge cases.

Think of version history like the amendment record of a constitution. The original document stands, but amendments add clarity, fix oversights, and adapt to new realities.

### 8.1 Change log

| Version | Date | Author | Changes | Reason |
|---|---|---|---|---|
| 0.1 | _[date]_ | _[SSA name]_ | Initial draft: entities, relationships, basic constraints | Project kickoff |
| 0.2 | _[date]_ | _[SSA name]_ | Added state lifecycles for Claim and Policy; resolved AMB-01 through AMB-03 | Domain expert review session |
| 0.3 | _[date]_ | _[SSA name]_ | Added exception constraints EC-01 and EC-02; updated canonical examples | Post-prototype testing |
| 1.0 | _[date]_ | _[SSA name]_ | Release candidate: all sections complete, reviewed by legal and compliance | Production readiness |
| _[next]_ | | | | |

### 8.2 Review schedule

```
Review cadence: [e.g., Monthly for first 3 months, then quarterly]
Next scheduled review: [date]
Review participants: [SSA, domain expert, engineering lead, compliance]

Triggers for unscheduled review:
- New ambiguity discovered in production
- Hard constraint violation detected
- Domain rule changes (e.g., new regulation)
- System expansion to new sub-domain
```

---

## Appendix: Document metadata

```
Ontology title: [Domain name] -- Domain Ontology
Version: [e.g., 1.0]
Author: [SSA name]
Domain experts consulted: [Names and roles]
Created: [Date]
Last updated: [Date]
Status: [Draft / In Review / Approved / Superseded]
Related documents:
  - Semantic Architecture Spec: [link]
  - System Prompt: [link]
  - Evaluation Suite: [link]
```

---

**Completion checklist:**

Before marking this ontology as complete, verify that:

- [ ] Every entity has an operational definition, not just a name
- [ ] Every relationship has a cardinality and at least one business rule
- [ ] At least 5 hard constraints are defined and testable
- [ ] At least 5 ambiguities are resolved with documented decisions
- [ ] Every entity with state changes has a lifecycle diagram
- [ ] Forbidden state transitions are explicitly listed
- [ ] At least 3 valid, 2 invalid, and 2 ambiguous canonical examples exist
- [ ] All examples reference specific constraints and ambiguity resolutions
- [ ] A domain expert has reviewed and signed off on this document
