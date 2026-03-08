# Module 2 - Semantic Modeling and Ontologies

## Learning outcomes

At the end of this module, you should be able to:

- Build an operational domain ontology for AI systems.
- Define entities, relationships, states, invariants, and policy constraints.
- Create semantic contracts usable by prompts, tools, agents, and evals.

## Core concepts

### 1. Domain ontology as architecture

- Ontology is the shared semantic backbone of the system.
- It reduces ambiguity, controls drift, and improves consistency.

### 2. Invariants and constraints

- Hard constraints: cannot be violated.
- Soft constraints: can be violated with explicit justification.
- Exception policies must be explicit and auditable.

### 3. Semantic contracts

- Input contract: what can enter and in which format/meaning.
- Decision contract: rules, priorities, and allowed trade-offs.
- Output contract: structure, claims, and confidence expectations.

## Lesson sequence

### Lesson 1 - Domain decomposition

- Goal: map entities and relationships.
- Class activity: build an entity dictionary from real cases.
- Output: v1 domain map.

### Lesson 2 - Constraint engineering

- Goal: distinguish policy from operational heuristics.
- Class activity: write hard/soft constraints for critical decisions.
- Output: constraint matrix.

### Lesson 3 - Contract packaging

- Goal: convert ontology + constraints into executable artifacts.
- Class activity: draft input/decision/output contracts.
- Output: semantic contract package v1.

## Applications

1. **Application A - Ontology v1**
- Build at least 12 entities.
- Define cardinalities and lifecycle states.
- Include positive/negative examples.

2. **Application B - Ambiguity stress test**
- Collect 20 ambiguous expressions from users/stakeholders.
- Resolve each with operational definitions.
- Measure before/after disagreement rate across reviewers.

## Assessment rubric (0-2 each)

- Completeness of ontology.
- Quality of invariants and exception policy.
- Reusability of semantic contracts.
- Ambiguity reduction evidence.
- Consistency across examples.

Passing threshold: **8/10**.

## Deliverables checklist

- [ ] Ontology document versioned.
- [ ] Constraint matrix approved.
- [ ] Contract package created.
- [ ] Ambiguity test evidence attached.

## Bridge to next module

Module 3 uses these contracts to design multi-agent topologies and cooperation protocols.
