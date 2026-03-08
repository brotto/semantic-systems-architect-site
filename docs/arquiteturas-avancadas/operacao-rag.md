---
sidebar_position: 6
title: Operation and Runbook
---

# RAG operation in production

## Recommended SLOs

- P95 latency of the final response.
- Retrieval success rate.
- Response rate with valid citation.
- Human scaling rate.

## Critical alerts

1. Abrupt drop in recall.
2. Increase in responses without citations.
3. Abnormal growth in cost per consultation.
4. Recurrent indexing failures.

## Incident Runbook

1. Classify incident (data, retrieval, generation, security).
2. Freeze release in progress.
3. Run RAG regression suite.
4. Apply index/config rollback if necessary.
5. Record root cause and preventive action.

## Economical operation

- Cache of frequent queries.
- Routing by complexity (light vs heavy model).
- Token budget by question type.
