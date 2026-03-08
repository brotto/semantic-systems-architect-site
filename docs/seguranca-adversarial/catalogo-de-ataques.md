---
sidebar_position: 3
title: Attack Catalog
---

# Catalog of adversarial attacks

## Category 1: Direct prompt injection

Example:
- user tries to overwrite mandatory system instructions.

Defense:
- Strict separation of system instructions and user input.
- malicious intent classifier.

## Category 2: Injection via recovered context

Example:
- indexed document contains hidden malicious instructions.

Defense:
- fountain sanitization.
- trust policy by source.
- isolation between content and system policies.

## Category 3: Data exfiltration

Example:
- attempt to extract sensitive data through indirect questions.

Defense:
- masking and access control by scope.
- output filters by sensitivity classification.

## Category 4: Tool abuse

Example:
- attack to perform unauthorized external action.

Defense:
- allowlist of tools.
- rigorous validation of arguments.
- human approval for high-impact actions.

## Category 5: Decision manipulation

Example:
- user induces system to undue prioritization.

Defense:
- explicit decision rules.
- cross validation with critical agent.
