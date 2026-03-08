---
sidebar_position: 4
title: SSA for Legal
---

# SSA for Legal

## Objective

Design systems for assisted legal analysis with a focus on regulatory coherence, explainability and regulatory risk control.

## Priority use cases

1. Classification of documents and clauses.
2. Preliminary contractual risk analysis.
3. Generation of minutes with institutional policies.

## Minimum recommended ontology

- Document
- Clause
- Obligation
- Risk
- Jurisdiction
- Precedent
- internal policy
- Preliminary opinion

## Critical risks

- Normative interpretation without documentary basis.
- Use of incorrect jurisdiction.
- Assertive output without a level of trust.

## Reference architecture

- Agent `doc-parser`: extracts legal structure.
- Agent `legal-reasoner`: compares with standards and policies.
- Agent `risk-critic`: scores risks and gaps.
- Agent `compliance-guard`: validates output adherence.

## Essential Evals

- Precision in the classification of clauses.
- Coverage of critical contractual risks.
- Quality of the legal rationale.

## Next step

Run [Legal Lab](./lab-juridico)
