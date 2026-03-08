---
sidebar_position: 4
title: Retrieval and Reranking
---

# Retrieval and reranking

## Recommended flow

1. Query understanding with intent classification.
2. Filter by metadata (domain, date, sensitivity).
3. Hybrid search (vector + lexical).
4. Reranking by semantic relevance.
5. Final context selection with token budget.

## Good practices

- Set dynamic `k` by question complexity.
- Apply penalty for outdated fonts.
- Block high sensitivity sections without permission.
- Force source citation in final output.

## Guardrails

- If evidence score < threshold, respond with explicit uncertainty.
- If sources conflict, flag conflict and ask for human review.
- Never fill in gaps with silent guesswork.
