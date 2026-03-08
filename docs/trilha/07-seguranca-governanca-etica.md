# Module 7 - Security, Governance and Ethics

## Learning outcomes

At the end of this module, you should be able to:

- Identify and prioritize LLM-specific threat vectors.
- Design governance controls for sensitive data and decisions.
- Apply ethical and regulatory constraints in architecture decisions.

## Core concepts

### 1. Threat landscape

- Prompt injection.
- Data exfiltration.
- Tool abuse and privilege escalation.
- Decision manipulation and spoofing.

### 2. Control architecture

- Input and output filtering.
- Tool sandboxing and scoped credentials.
- Human-in-the-loop for high-risk decisions.

### 3. Governance and ethics

- Data classification, retention, and audit.
- Justifiability and explainability requirements.
- Fairness, proportionality, and intervention rights.

## Lesson sequence

### Lesson 1 - Threat modeling

- Goal: produce a realistic risk map.
- Activity: run structured threat workshop.
- Output: threat model v1.

### Lesson 2 - Guardrail implementation

- Goal: convert risks into enforceable controls.
- Activity: define blocking and escalation criteria.
- Output: policy pack.

### Lesson 3 - Incident response

- Goal: prepare response and learning loops.
- Activity: simulate a security incident end-to-end.
- Output: incident runbook + postmortem template.

## Applications

1. **Application A - Security & governance plan**
- Risk matrix (`probability x impact x detectability`).
- Control mapping by risk.
- Compliance traceability map.

2. **Application B - Adversarial validation sprint**
- Execute targeted adversarial tests.
- Record failures and mitigations.
- Re-run tests to validate control efficacy.

## Assessment rubric (0-2 each)

- Threat model completeness.
- Control practicality.
- Incident preparedness.
- Compliance readiness.
- Ethical clarity.

Passing threshold: **8/10**.

## Deliverables checklist

- [ ] Threat model approved.
- [ ] Policy pack versioned.
- [ ] Incident runbook validated.
- [ ] Adversarial re-test evidence attached.

## Bridge to next module

Module 8 connects architecture quality and risk controls to product value, operations, and scale.
