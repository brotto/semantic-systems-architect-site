---
sidebar_position: 2
title: Threat Model
---

# Threat model for SSA systems

## Attack surfaces

1. User input (prompt injection).
2. Content retrieved in RAG (document injection).
3. Integrations with tools (tool abuse).
4. Memory and session state.
5. Output layer and automated action.

## Critical assets

- Internal policies.
- Sensitive data.
- Flows with legal/financial impact.
- Credentials and tool access.

## Risk matrix

Sort each scenario by:
- probability
- impact
- detectability

Prioritize mitigations for high-impact, low-detectability scenarios.
