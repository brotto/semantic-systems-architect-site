---
sidebar_position: 2
title: RAG in Production
---

# RAG in production for SSA

## Objective

Build Retrieval-Augmented Generation systems with reliable behavior in a real environment.

## Principles

1. Clearly separate recovery, reasoning and response.
2. Treat context as a contract, not as free text.
3. Measure recall, response accuracy and safety continuously.
4. Design fallback for absence of evidence.

## Reference architecture

1. Knowledge ingestion and curation layer.
2. Vector indexing layer + structured metadata.
3. Retrieval layer with filters and reranking.
4. Generation layer with quotes and policies.
5. Assessment, observability and governance layer.

## Most common failure modes

- Recover irrelevant context (low recall).
- Retrieve correct context but generate wrong answer.
- Leak sensitive data by uncontrolled retrieval.
- Saturate cost/latency for queries without routing.

## Minimum metrics

- Recall@k per domain.
- Retriever Precision@k.
- Faithfulness of the response with evidence.
- Rate of "I don't know" when there is a lack of evidence.
- Latency P50/P95 per stage.

## Expected deliverable

A versioned RAG architecture with:
- data contracts
- retrieval policies
- evals suite
- operation runbook
