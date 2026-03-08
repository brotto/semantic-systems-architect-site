---
sidebar_position: 7
sidebar_label: "Assessment"
---

# Module 2 — Assessment

## What you should have produced

By completing this module, you should have the following artifacts:

| # | Artifact | Source |
|---|---|---|
| 1 | Domain decomposition with 8+ entities, relationships, and state diagrams | Lesson 1 practice activity |
| 2 | Constraint matrix with 15+ rules classified as hard, soft, or exception | Lesson 2 practice activity |
| 3 | Two semantic contracts (input/decision/output) with traceability | Lesson 3 practice activity |
| 4 | Complete Ontology v1 with 12+ entities, relationships, lifecycles, examples | Application A |
| 5 | Ambiguity stress test with 20 expressions, operational definitions, and measurement | Application B |

---

## Assessment rubric

Each dimension is scored **0, 1, or 2**. Total possible: **10 points**. Passing threshold: **8/10**.

### Dimension 1: Completeness of ontology (0-2)

| Score | Description |
|---|---|
| **0** | Fewer than 12 entities, or major domain concepts are missing. Entities have few attributes and no examples. |
| **1** | 12+ entities with attributes and examples, but some relationships or lifecycle states are missing. Coverage is adequate but has gaps. |
| **2** | Comprehensive ontology covering the full domain. Every entity has typed attributes, realistic examples, and documented relationships. No major concepts are missing. An AI developer could use this ontology as-is. |

### Dimension 2: Quality of constraints and exception policy (0-2)

| Score | Description |
|---|---|
| **0** | Rules are listed but not classified. No distinction between hard, soft, and exception. No handling specified for violations. |
| **1** | Rules are classified but the classification is inconsistent or not well-justified. Some hard constraints feel soft, or exception policies lack authority/documentation requirements. |
| **2** | Every constraint is correctly classified with clear reasoning. Hard constraints specify what happens on violation. Soft constraints have acceptable ranges. Exception policies specify who can override, when, and how it's documented. Constraint conflicts are identified and resolved. |

### Dimension 3: Reusability of semantic contracts (0-2)

| Score | Description |
|---|---|
| **0** | Contracts are vague or incomplete. Missing input validation, decision rules, or output structure. Not specific enough to implement. |
| **1** | Contracts have all three parts (input/decision/output) but some sections lack detail. Uncertainty handling is weak or missing. |
| **2** | Contracts are precise and complete. Each part (input, decision, output) is fully specified with types, validation rules, decision logic, confidence handling, and guarantees. Contracts reference the ontology and constraint matrix. A developer could implement from these contracts. |

### Dimension 4: Ambiguity reduction evidence (0-2)

| Score | Description |
|---|---|
| **0** | No measurement of ambiguity reduction. Definitions are provided but no evidence they actually reduce disagreement. |
| **1** | Baseline and post-resolution measurements are present but methodology is weak (e.g., only self-assessed, or too few expressions tested). Improvement is claimed but not convincingly demonstrated. |
| **2** | Rigorous measurement with multiple respondents. Baseline and post-resolution scores are clearly documented. Improvement is demonstrated with specific numbers. Remaining ambiguity is honestly assessed with recommendations. |

### Dimension 5: Consistency across artifacts (0-2)

| Score | Description |
|---|---|
| **0** | Artifacts are disconnected. Contracts use terms not defined in the ontology. Constraints reference entities that don't exist. No traceability. |
| **1** | Artifacts are generally consistent but some connections are missing. A few contract rules can't be traced to specific constraints or ontology elements. |
| **2** | Full consistency. Every term in the contracts is defined in the ontology. Every decision rule traces to a constraint. Operational definitions in the ambiguity test reference ontology elements. The artifacts form a coherent, interconnected system. |

---

## Self-assessment checklist

### Lessons

- [ ] I can decompose any domain into entities, attributes, relationships, and states
- [ ] I can distinguish between hard, soft, and exception constraints — and justify the classification
- [ ] I can build a semantic contract (input/decision/output) that's precise enough for an AI developer to implement
- [ ] I understand how the ontology, constraint matrix, and contracts connect to each other
- [ ] I can identify and resolve constraint conflicts using priority rules

### Application A — Ontology v1

- [ ] My ontology has 12+ entities with typed attributes
- [ ] Every entity has at least 2 realistic examples (positive and negative where applicable)
- [ ] All relationships are documented with cardinality and dependency
- [ ] At least 3 entities have complete lifecycle diagrams with invalid transitions
- [ ] I documented at least 5 design decisions with alternatives and reasoning

### Application B — Ambiguity stress test

- [ ] I collected 20 genuinely ambiguous expressions from the domain
- [ ] I measured baseline disagreement with real respondents
- [ ] All 20 expressions have operational definitions grounded in the ontology
- [ ] I measured post-resolution disagreement with the same respondents
- [ ] My analysis includes improvement metrics and honest assessment of remaining ambiguity

---

## What passing means

Scoring **8/10 or higher** means you can:

- Build domain ontologies that serve as reliable knowledge foundations for AI systems
- Classify constraints with precision and design appropriate violation handling
- Create semantic contracts that bridge design and implementation
- Demonstrate measurable ambiguity reduction through systematic modeling

---

## If you don't pass

- **Low on completeness:** your ontology likely has gaps. Walk through the "day in the life" of someone in your domain and check if every entity they interact with is in your ontology.
- **Low on constraints:** review each constraint and ask three questions: "Can this EVER be broken? Would reasonable deviation sometimes be okay? Can someone with authority override it?" The answers determine the classification.
- **Low on contracts:** make sure every contract has all three parts (input, decision, output) with types, validation, uncertainty handling, and traceability. If you removed any section, the contract is incomplete.
- **Low on ambiguity reduction:** you need actual measurement with other people. Self-assessment doesn't count. Find 2-3 people, show them the expressions, record their interpretations, then show them your definitions and measure again.
- **Low on consistency:** do a cross-reference check. For every term in your contracts, verify it exists in the ontology. For every decision rule, find the constraint it comes from. Missing links mean missing consistency.

---

## Bridge to Module 3

You now have the semantic foundation: a domain ontology, a constraint matrix, and semantic contracts. These define WHAT the system knows and WHAT rules govern it.

**Module 3 — Agent Architecture** uses these artifacts to design WHO does WHAT. You'll define the AI agents that carry out the contracts, choose how they coordinate (supervisor, pipeline, or swarm), and design the handoff protocols for when one agent needs to pass work to another.

If Module 2 gave you the map and the rules, Module 3 gives you the team.
