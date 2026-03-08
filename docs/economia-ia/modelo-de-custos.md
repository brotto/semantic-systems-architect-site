---
sidebar_position: 2
title: Cost Model
---

# AI Systems Cost Model

## Cost Components

1. Inference (input and output tokens).
2. Embeddings and indexing.
3. Retrieval and storage infrastructure.
4. External tools and third-party APIs.
5. Observability, evals and operation.

## Base formula

Total monthly cost = inference cost + data cost + operation cost + failure cost.

## Hidden costs

- Reprocessing for inappropriate responses.
- Human escalation due to low confidence.
- Cost of incidents and rollback.
- Rework in support and engineering.

## Model per journey

Map each flow with:
- monthly volume
- cost per execution
- error rate
- escalation rate

Use the template: `community-assets/economia/template-cost-model.csv`.
