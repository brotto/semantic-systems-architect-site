---
sidebar_position: 6
title: SSA for B2B Support
---

# SSA for B2B Support

## Objective

Design B2B technical support systems with a focus on context-driven resolution, SLA and intelligent scaling.

## Priority use cases

1. Classification of tickets by impact and urgency.
2. Diagnosis assisted by logs and knowledge base.
3. Handoff orchestration between support, engineering and customer success.

## Minimum recommended ontology

- Account
- Ticket
- Incident
- Severity
- Technical dependence
- Proposed solution
- Escalation
- SLA

## Critical risks

- Incorrect severity prioritization.
- Non-reproducible solution.
- Late escalation in high-impact incidents.

## Reference architecture

- `ticket-intake` Agent: normalizes context and priority.
- Agent `diagnostic-reasoner`: formulates technical hypotheses.
- Agent `kb-retriever`: searches for evidence in runbooks.
- Agent `ops-escalation`: defines handoff and next action.

## Essential Evals

- Accuracy of severity classification.
- Average time for useful recommendation.
- Resolution rate without reopening.

## Next step

Run [B2B Support Lab](./lab-suporte-b2b)
