---
sidebar_position: 1
sidebar_label: "Lab 1 — Domain modeling"
---

# Lab 1 — Domain Modeling and Semantic Contract

## Overview: why this lab matters

Everything an AI system does — every response, every decision, every action — rests on how well the system understands the domain it operates in. A chatbot that helps patients schedule appointments at a hospital needs to know what a patient is, what an appointment is, what a doctor's specialty means, what "urgent" means versus "routine," and dozens of other concepts that a human receptionist understands intuitively.

An AI system does not have intuition. It has whatever structure you give it.

This lab is where you build that structure from scratch. You will pick a real domain, decompose it into its fundamental parts, formalize the rules that govern it, and produce a semantic contract that an AI system can use to behave correctly.

Think of it this way: if building an AI system is like constructing a building, this lab is where you do the architectural drawings. Nobody pours concrete without blueprints. Nobody should build an AI system without a semantic model.

This lab integrates everything from Modules 1 through 3 of the Core Track — fundamentals, semantic modeling, and constraint engineering. It is the foundation that Labs 2 and 3 will build upon. If the domain model you produce here is weak, everything downstream will be fragile.

---

## The challenge

Choose a real domain and produce a complete, AI-ready semantic specification for it. Your deliverable is not code — it is a structured document that defines everything an AI system needs to "understand" to operate correctly in that domain.

### Scenario options

Pick one of the following domains, or propose your own (subject to approval). Each domain is listed with a brief note on what makes it interesting as a modeling challenge.

**Option A: Veterinary clinic**
Interesting because it involves living patients who cannot describe their own symptoms, multiple species with different medical protocols, and emotional owners who may resist treatment decisions.

**Option B: Restaurant chain with delivery**
Interesting because it combines physical operations (kitchen, stock, staff) with digital operations (ordering app, delivery tracking, payments), and the states of an order are complex and time-sensitive.

**Option C: Property rental management**
Interesting because it involves legal contracts, financial obligations, maintenance workflows, and multiple stakeholders (owners, tenants, managers, contractors) with competing interests.

**Option D: University course registration**
Interesting because it involves prerequisite chains, capacity constraints, schedule conflicts, student eligibility rules, and waitlist management — all of which must be modeled as formal constraints.

**Option E: Insurance claims processing**
Interesting because it involves document classification, policy interpretation, fraud detection rules, multi-step approval workflows, and regulatory compliance requirements.

**Option F: Your own domain**
If you work in a specific industry and want to model a domain you know well, you may propose it. The domain must have at least the complexity of the options above — meaning it must involve multiple entity types, non-trivial state transitions, and genuine constraint conflicts.

---

## Step-by-step methodology

This lab is organized into six phases. Each phase builds on the previous one, and each phase has a specific output that feeds into the next.

### Phase 1: Domain selection and scoping (estimated time: 30 minutes)

Before you model anything, you need to define what you are modeling and — just as importantly — what you are NOT modeling.

**What to do:**

1. Choose your domain from the options above.
2. Write a one-paragraph description of the domain, as if explaining it to someone who has never encountered it. This paragraph should use the key nouns that will become your entities.
3. Define the system boundary: what is inside the scope of your model, and what is outside? For example, if you choose "veterinary clinic," you might include appointments, diagnoses, treatments, and billing — but exclude laboratory equipment maintenance, staff recruitment, and building facilities management.
4. Identify the primary user of the AI system. Who will interact with it? A receptionist? A doctor? A customer? An administrator? This affects which parts of the domain need the most detail.

**Output of Phase 1:** a scoping document (half a page) that states the domain, the boundary, and the primary user.

**Common mistake in this phase:** choosing a scope that is too broad. "The entire healthcare system" is not a domain you can model in this lab. "A dermatology clinic's appointment and treatment workflow" is. Be specific.

### Phase 2: Entity extraction (estimated time: 60 minutes)

Now you identify the "things" that exist in your domain and describe them.

**What to do:**

1. List every noun from your scoping paragraph. These are candidate entities.
2. Filter the list: remove nouns that are actually attributes of other entities (a patient's name is not an entity — it is an attribute of the Patient entity). Remove nouns that are outside your defined scope.
3. For each remaining entity, list 4 to 8 attributes. Focus on attributes that the AI system will use for decisions. If the system never needs to know a patient's eye color, don't include it.
4. For each entity, provide 2 to 3 concrete examples with realistic data. If you cannot create a realistic example, your entity definition might be wrong.

**Output of Phase 2:** an entity catalog with at least 12 entities, each having attributes and examples.

**The restaurant test:** imagine explaining your entities to a waiter at a restaurant. If the waiter says "I don't understand what that means" or "that sounds like the same thing as the other one," your entity definitions need work. Entities should be distinct, clear, and recognizable to someone familiar with the domain.

### Phase 3: Relationship mapping (estimated time: 45 minutes)

Entities in isolation are useless. A "Patient" without any connection to "Appointment" or "Doctor" is just a name floating in space. Relationships give the model its structure.

**What to do:**

1. For each pair of entities that have a connection, define the relationship: its direction, its cardinality (one-to-one, one-to-many, many-to-many), and whether it is mandatory or optional.
2. Identify dependency relationships: which entities cannot exist without another? A prescription cannot exist without a patient. An invoice line item cannot exist without an invoice. These dependencies are critical because they tell the system what must be created before what.
3. Draw a visual diagram of your entities and relationships. This can be as simple as boxes and arrows on paper, or a proper diagram in any tool you prefer. The visual representation often reveals gaps that the text alone hides.
4. For each relationship, write one sentence explaining what it means in plain language. "A Patient has many Appointments" is good. "Patient-Appointment: 1-to-N" alone is not enough — add the human-readable sentence.

**Output of Phase 3:** a relationship map with at least 15 named relationships, a visual diagram, and plain-language descriptions.

**The phone book analogy:** a phone book has names and numbers, but no relationships. You cannot answer the question "who is Maria's doctor?" from a phone book. A domain model with entities but no relationships is a phone book — technically complete but practically useless.

### Phase 4: Constraint classification (estimated time: 60 minutes)

This is where your model goes from descriptive to prescriptive. Constraints are the rules that define what is valid, what is allowed, and what is forbidden.

**What to do:**

1. For each entity, identify at least 2 constraints. These can be about valid attribute values, valid states, valid transitions, or valid relationships.
2. Classify each constraint into one of three categories:
   - **Hard constraint (invariant):** must NEVER be violated under any circumstances. Example: "A patient must not be prescribed a medication they are allergic to." Breaking this is a safety failure.
   - **Soft constraint (policy):** should be followed in normal circumstances but can be overridden by authorized personnel with justification. Example: "Appointments should be at least 30 minutes apart." A doctor might override this for urgent cases.
   - **Preference (default):** the system's default behavior when no stronger rule applies. Example: "New patients are assigned to the doctor with the lightest schedule." This is a preference, not a rule.
3. For each hard constraint, specify what happens if it is violated. What is the system's response? Does it block the action? Alert a human? Log the violation?
4. For each soft constraint, specify who can override it and what justification is required.

**Output of Phase 4:** a constraint matrix with at least 20 classified constraints, their categories, and their violation responses.

**The traffic light analogy:** a red light is a hard constraint — you must stop, no exceptions (well, ambulances, but that's a documented override with authorization). A speed limit is a soft constraint — you should follow it, but an emergency might justify exceeding it. Driving on the right side of the road is an invariant so fundamental that most people don't even think of it as a rule. Your domain has all three types. Finding and classifying them is the work of this phase.

### Phase 5: Contract writing (estimated time: 90 minutes)

Now you assemble everything into a semantic contract — the formal specification that an AI system would use as its operational guide.

**What to do:**

1. For each major workflow in your domain (e.g., "schedule an appointment," "process a claim," "register for a course"), write a semantic contract that includes:
   - **Input specification:** what information the system receives, in what format, and what validation it must pass.
   - **Decision logic:** what rules the system applies, in what order, and how it handles conflicts between rules.
   - **Output specification:** what the system produces, in what format, and what guarantees it makes about the output.
   - **Error handling:** what happens when the input is invalid, when the rules conflict, or when the system cannot reach a decision.
2. Write at least 3 semantic contracts for 3 different workflows.
3. For each contract, provide at least 2 "happy path" examples (everything goes right) and at least 2 "edge case" examples (something unusual or conflicting happens).

**Output of Phase 5:** at least 3 semantic contracts with input/decision/output specifications and annotated examples.

**The recipe analogy:** a recipe is a kind of contract. It specifies inputs (ingredients), process (steps), output (the dish), and even error handling ("if the dough is too sticky, add more flour"). A semantic contract does the same thing for an AI system's behavior. The difference is that a recipe assumes a human cook who can improvise; a semantic contract assumes a machine that will follow instructions literally.

### Phase 6: Ambiguity testing (estimated time: 45 minutes)

The final phase is adversarial. You try to break your own model by finding ambiguities, contradictions, and gaps.

**What to do:**

1. Apply the "stupid question" test: ask at least 10 deliberately naive questions about your model and document how the model answers each one. Examples:
   - "Can a patient have zero doctors assigned?"
   - "What happens if two appointments are scheduled at the same time for the same doctor?"
   - "Can a medication be prescribed to a patient who has already been discharged?"
2. For each question, document one of three outcomes:
   - **The model answers it clearly.** Good. Move on.
   - **The model is ambiguous.** Bad. Document the ambiguity and how you resolved it (or chose not to resolve it, with justification).
   - **The model cannot answer it.** Worse. Document the gap and how you would extend the model to address it.
3. Have someone else (a colleague, a friend, even a language model) review your model and ask their own questions. Outside perspectives catch blind spots you cannot see.

**Output of Phase 6:** an ambiguity report with at least 10 questions, their answers, and any model revisions triggered by the testing.

**The map analogy:** every map is wrong — it's a simplification of reality. But a good map is useful because it tells you where it is wrong. A map that says "here be dragons" is more honest than a map that shows a road where there is actually a cliff. Your ambiguity report is where you mark the "here be dragons" areas of your model.

---

## Deliverable specifications

You must submit the following artifacts. Each one has a specific format.

### Artifact 1: Entity catalog

Format: structured text or table. For each entity, include:

```
Entity: [name]
Description: [one sentence explaining what it is]
Attributes:
  - [name]: [type] — [purpose]
  - [name]: [type] — [purpose]
  ...
States (if applicable): [list of valid states]
Transitions (if applicable): [list of valid state changes]
Invalid transitions: [list of forbidden state changes]
Examples:
  - [example 1 with realistic data]
  - [example 2 with realistic data]
```

Minimum: 12 entities.

### Artifact 2: Relationship map

Format: visual diagram (any format) plus a structured list.

```
Relationship: [Entity A] --[relationship name]--> [Entity B]
Cardinality: [1:1, 1:N, N:M]
Mandatory: [yes/no for each side]
Description: [one sentence in plain language]
```

Minimum: 15 relationships.

### Artifact 3: Constraint matrix

Format: table with columns for constraint text, category, violation response, and override policy.

```
| Constraint | Category | On violation | Override |
|---|---|---|---|
| Patient must not receive contraindicated medication | Hard | Block action, alert physician | None — no override |
| Appointments should be 30min apart | Soft | Warn, allow with justification | Physician can override |
| Default appointment duration is 30 minutes | Preference | Use default | Any staff can change |
```

Minimum: 20 constraints (at least 5 hard, 10 soft, 5 preferences).

### Artifact 4: Semantic contracts

Format: structured document for each workflow.

Minimum: 3 contracts, each with input/decision/output specifications and at least 4 annotated examples (2 happy path, 2 edge case).

### Artifact 5: Ambiguity report

Format: numbered list of questions with outcomes and resolutions.

Minimum: 10 questions tested, with documented outcomes.

---

## Evaluation rubric

Your lab will be evaluated across four dimensions, each scored from 0 to 10.

### Dimension 1: Semantic clarity (0-10)

Does your model use precise, unambiguous language? Can someone unfamiliar with the domain read your entity definitions and understand what each entity represents? Are your constraint statements specific enough to be implementable, or are they vague ("the system should be fair")?

- **8-10:** Every term is defined. Every constraint is specific and testable. No room for misinterpretation.
- **5-7:** Most terms are clear, but some constraints are vague or some entities overlap in meaning.
- **0-4:** Significant ambiguity. Terms used inconsistently. Constraints that sound good but cannot be tested.

### Dimension 2: Coverage of critical cases (0-10)

Does your model handle the important scenarios? Not just the happy path, but the edge cases, the error conditions, and the conflicts?

- **8-10:** Happy paths, edge cases, error conditions, and constraint conflicts are all addressed with specific examples.
- **5-7:** Happy paths are well covered, but edge cases are sparse or errors are handled generically.
- **0-4:** Only the obvious scenarios are modeled. No edge cases. No error handling.

### Dimension 3: Consistency of invariants (0-10)

Are your constraints internally consistent? Do any hard constraints contradict each other? Do your soft constraints have clear override policies? Can the system actually follow all your rules simultaneously?

- **8-10:** No contradictions found. Hard constraints are truly hard. Soft constraints have clear override mechanisms. The constraint matrix is complete and coherent.
- **5-7:** Minor inconsistencies or constraints that could conflict in rare scenarios. Override policies are incomplete.
- **0-4:** Contradictory constraints. Hard constraints that are actually soft. Missing override policies.

### Dimension 4: Model testability (0-10)

Can your model be verified? For each constraint, can you write a test case? For each entity, can you create a valid and an invalid example? For each state transition, can you demonstrate a valid and an invalid sequence?

- **8-10:** Every constraint has at least one test case. Examples include both valid and invalid instances. State transitions are fully specified with explicit invalid transitions.
- **5-7:** Most constraints are testable, but some are too vague. Examples exist but are incomplete.
- **0-4:** Constraints that cannot be tested. No invalid examples. State transitions missing.

**Minimum passing score: 30 out of 40.**

---

## Tips and common mistakes

**Tip 1: Start with what you know.** If you work in healthcare, model a healthcare domain. If you know restaurants, model a restaurant. Domain modeling is hard enough without also learning a new domain simultaneously.

**Tip 2: The first draft is always wrong.** Plan to revise your entity catalog at least twice. Phase 6 (ambiguity testing) will almost certainly reveal entities you missed or constraints you got wrong. This is normal and expected.

**Tip 3: Constraints are where the real work is.** It is relatively easy to list entities and relationships. It is hard to classify constraints correctly. A constraint that you call "hard" but that actually gets overridden in practice is worse than no constraint at all — it creates false confidence.

**Tip 4: Invalid transitions are more important than valid ones.** Defining what CAN happen is easier than defining what CANNOT happen. But the "cannot" list is where the safety lives. An order that goes from "delivered" back to "draft" is a semantic impossibility that must be explicitly forbidden.

**Tip 5: Show your model to someone who knows the domain.** A nurse, a teacher, a restaurant manager — anyone who works in the domain you modeled can spot errors in seconds that you might not find in hours. Domain experts are your best testers.

**Common mistake 1: Modeling the software, not the domain.** Your entities should be "Patient," "Appointment," "Medication" — not "DatabaseTable," "APIEndpoint," "UserInterface." You are modeling the domain, not the system architecture.

**Common mistake 2: Confusing entities with roles.** "Administrator" is a role, not an entity. A Person entity might have a role attribute that can be "administrator," "staff," or "user." Don't create separate entities for each role unless they have fundamentally different attributes.

**Common mistake 3: Skipping the examples.** Every entity, every constraint, and every contract needs concrete examples. Abstract definitions without examples are untestable theories. If you can't write an example, you don't understand the concept well enough.

**Common mistake 4: Making everything a hard constraint.** If every rule is a hard constraint, none of them are. Real domains have a mix of absolute rules, flexible policies, and sensible defaults. Over-constraining the system makes it rigid and unusable.

---

## Connection to Lab 2

The domain model and semantic contracts you produce in this lab become the foundation for Lab 2. In that lab, you will design a multi-agent system that operates within this domain. Your agents will use your entity catalog to know what they are working with. Your constraint matrix will define their boundaries. Your semantic contracts will define their behavior.

A weak domain model in Lab 1 means fragile agents in Lab 2. A strong domain model means agents that know their job, know their limits, and can handle the unexpected.

Think of it this way: Lab 1 is writing the rulebook. Lab 2 is assembling the team that plays by those rules. Lab 3 is stress-testing the team under game conditions.

Keep your Lab 1 artifacts accessible and well-organized. You will reference them constantly in Labs 2 and 3.
