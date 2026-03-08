---
sidebar_position: 2
title: SSA for Health
---

# SSA for Health

## Objective

Design cognitive systems for healthcare operations with a focus on clinical safety, traceability and supervised decision support.

## Priority use cases

1. Symptom screening to direct care.
2. Structured summary of medical records and history.
3. Support for authorization and eligibility flows.

## Minimum recommended ontology

- Patient
- Episode
- Signal
- Symptom
- Presumptive diagnosis
- Suggested conduct
- Clinical alert
- Human escalation

## Critical risks

- Clinical recommendation without sufficient context.
- Hallucination in medical record data.
- Lack of escalation in high-risk cases.

## Reference architecture

- Agent `triage-intake`: structures initial data.
- Agent `clinical-reasoner`: applies approved clinical rules.
- Agent `safety-guard`: blocks exits outside of policy.
- Agent `human-escalation`: triggers professional review.

## Essential Evals

- Adherence to screening protocols.
- Correct escalation rate in critical cases.
- Completeness rate of the clinical summary.

## Next step

Run [Health Lab](./lab-saude)
