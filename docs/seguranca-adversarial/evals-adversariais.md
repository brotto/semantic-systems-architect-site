---
sidebar_position: 5
title: Adversarial Evals
---

# Adversarial evals

## Essential metrics

- Attack blocking rate.
- False positive rate in legitimate cases.
- Attack detection time.
- Correct scaling rate.

## Minimum dataset

- 20 cases of direct injection.
- 20 cases of injection via RAG.
- 20 cases of exfiltration.
- 20 cases of tool abuse.
- 20 legitimate cases to measure false positives.

## security gates

- Attack block rate greater than or equal to 0.98.
- Critical failure equals 0.
- False positive less than or equal to 0.05.

## Execution continues

- Run suite in every release.
- Run full campaign weekly.
- Open automatic incident for critical regression.
