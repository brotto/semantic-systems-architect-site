# Module 5 - Context Engineering and Structural Prompting

## Learning outcomes

At the end of this module, you should be able to:

- Design context packages as architecture artifacts.
- Build layered instruction systems with policy consistency.
- Reduce hallucination and ambiguity through structural prompting.

## Core concepts

### 1. Context as system

- Static context: foundational rules and definitions.
- Dynamic context: runtime signals and case specifics.
- Retrieved context: external memory and knowledge sources.

### 2. Instruction hierarchy

- Identity and mission.
- Non-negotiable policy.
- Task objective.
- Output schema and verification criteria.

### 3. Structural prompting

- Prompt decomposition.
- Semantic few-shot.
- Self-critique patterns.
- Delimitation of authority and uncertainty.

## Lesson sequence

### Lesson 1 - Context architecture

- Goal: separate layers to improve control.
- Activity: decompose a monolithic prompt into modules.
- Output: context map v1.

### Lesson 2 - Prompt contract design

- Goal: enforce predictable outputs.
- Activity: define schema + refusal + confidence sections.
- Output: structural prompt template.

### Lesson 3 - Validation loop

- Goal: verify stability and drift.
- Activity: run 20-case batch before/after refactor.
- Output: consistency report.

## Applications

1. **Application A - Context package**
- Versioned package with mission, policies, ontology references, and output schema.
- Include change log and rationale.

2. **Application B - Prompt hardening sprint**
- Choose one unstable use case.
- Apply decomposition + self-critique + guardrails.
- Compare cost, latency, and quality.

## Assessment rubric (0-2 each)

- Context layering quality.
- Contract completeness.
- Measured consistency gain.
- Risk reduction.
- Maintainability.

Passing threshold: **8/10**.

## Deliverables checklist

- [ ] Context package published.
- [ ] Structural templates reusable.
- [ ] Before/after metrics attached.
- [ ] Risk notes documented.

## Bridge to next module

Module 6 turns quality into a measurable discipline with eval suites and observability.
