---
sidebar_position: 5
sidebar_label: "Application A — Ontology v1"
---

# Application A — Building your Ontology v1

## Objective

In this application, you will build a complete, operational domain ontology for a real or realistic domain. This is the SSA's most fundamental artifact — the map of meaning that everything else builds on.

Your ontology will have at least 12 entities with attributes, relationships, lifecycle states, and concrete examples. By the end, you'll have a versioned document that could serve as the knowledge foundation for an AI system.

---

## The assignment

Choose one of the following domains, or propose your own:

**Domain A: A property rental platform** (think Airbnb)
Hosts list properties. Guests search and book. Reviews are exchanged. Payments are processed. Calendar availability is managed.

**Domain B: A veterinary clinic chain**
Multiple locations. Pet patients with medical histories. Appointments, treatments, vaccinations, prescriptions. Owners with multiple pets. Inventory of medications.

**Domain C: A restaurant reservation and management system**
Restaurants with tables, menus, and staff. Customers make reservations. Orders are placed and tracked. Reviews are collected. Waitlists are managed.

**Domain D: Your own workplace or project**
If you have a real system or business process, use it. Real domains produce the best learning.

---

## Deliverable structure

Your Ontology v1 document should contain the following sections:

### Section 1: Domain overview (half page)

Describe the domain in 3-5 sentences. What is it about? Who participates? What's the core activity?

### Section 2: Entity catalog (2-3 pages)

For each entity (minimum 12), provide:

```
Entity: [Name]
  Description: [What this entity represents, in one sentence]

  Attributes:
    - [attribute_name]: [type] — [what it means]
    - [attribute_name]: [type] — [what it means]
    ...

  States (if applicable):
    [state_1] → [state_2] → [state_3] ...
    Invalid transitions: [list what CANNOT happen]

  Examples:
    - Example 1: [concrete instance with real-looking data]
    - Example 2: [a different instance showing variety]
```

**Quality checklist for entities:**
- [ ] Does every entity have at least 4 meaningful attributes?
- [ ] Are attribute types specified (string, number, enum, date, reference)?
- [ ] Do entities that change over time have explicit states?
- [ ] Are invalid transitions specified (not just valid ones)?
- [ ] Do examples use realistic, specific data (not "example1," "test")?

### Section 3: Relationship map (1 page)

Document every relationship between entities:

```
[Entity A] --[relationship]--> [Entity B]
  Cardinality: [one-to-one | one-to-many | many-to-many]
  Dependency: [can A exist without B?]
  Notes: [any special rules about this relationship]
```

**Quality checklist:**
- [ ] Every entity is connected to at least one other entity (no orphans)
- [ ] Cardinality is specified for every relationship
- [ ] Dependencies are documented (which entities can exist independently?)

### Section 4: Lifecycle diagrams (1 page)

For at least 3 entities with meaningful state changes, draw the full lifecycle:

```
Entity: [Name]
  Initial state: [starting state]
  Terminal states: [final states where no further transitions are possible]

  [state_1] → [state_2]: triggered by [event/condition]
  [state_2] → [state_3]: triggered by [event/condition]
  [state_2] → [state_X]: triggered by [alternative event]

  Invalid:
  - [state_3] cannot return to [state_1] because [reason]
  - [state_X] cannot transition to [state_2] because [reason]
```

### Section 5: Positive and negative examples (half page)

For at least 5 entities, provide both:

- **Positive example:** a valid instance that the system should handle correctly
- **Negative example:** an invalid instance that the system should reject or flag

```
Entity: Reservation
  Positive: Guest "Ana Costa" books Property "Beach House" for Dec 20-27, 2 guests, confirmed payment
  Negative: Guest books a property for check-in date in the past — should be rejected
  Negative: Guest books 2 overlapping reservations at the same property — should be detected and blocked
```

### Section 6: Design decisions log (half page)

List at least 5 design decisions you made while building the ontology, with your reasoning:

```
Decision: [What you decided]
Alternatives considered: [What else you could have done]
Reasoning: [Why you chose this option]
```

Example:
```
Decision: A Pet can have only one primary Owner
Alternatives: Allow multiple co-owners
Reasoning: Simplifies billing and communication. Co-ownership can be added later with a "secondary contact" attribute. For v1, single owner is sufficient.
```

---

## Evaluation criteria

| Criterion | What "good" looks like |
|---|---|
| **Completeness** | 12+ entities covering the full domain. No major concepts are missing. |
| **Precision** | Attributes are typed and meaningful. No vague "misc" or "other" attributes. |
| **Lifecycle rigor** | States and transitions are explicit, including invalid transitions with reasons. |
| **Relationship clarity** | All relationships documented with cardinality. No orphaned entities. |
| **Example quality** | Examples use realistic data and include both positive and negative cases. |
| **Design awareness** | Decisions are documented with reasoning, showing you considered alternatives. |

---

## Tips for success

- **Start with the core flow.** What's the main thing that happens in this domain? For a rental platform, it's: guest searches → finds property → books → stays → reviews. The entities that participate in this flow are your core entities. Everything else is supporting.

- **Name entities with domain language.** Use the words that people in this domain actually use. In a restaurant, it's "Reservation," not "BookingInstance." In a clinic, it's "Appointment," not "ScheduledEvent." Domain-appropriate naming reduces misunderstanding.

- **Test with the "day in the life" method.** Walk through a typical day in your domain. "A guest wakes up, opens the app, searches for a beach house, filters by date and price, reads reviews, books a property, receives confirmation, arrives, checks in, uses the property for a week, checks out, leaves a review." Every noun in that narrative is an entity candidate. Every verb is a relationship or transition candidate.

- **Don't model what you don't need.** If the AI system will never make decisions about "Parking Availability," don't include it in the ontology. Keep the ontology focused on what the system actually uses.

- **Version your ontology.** Call it "v1" for a reason. Ontologies evolve. You'll add, remove, and refine entities as you learn more. The first version doesn't need to be perfect — it needs to be complete enough to build on.
