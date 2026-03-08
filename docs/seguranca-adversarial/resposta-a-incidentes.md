---
sidebar_position: 6
title: Incident Response
---

# Response to adversarial incidents

## Severity classification

- S1: exposure of data or undue critical action.
- S2: guardrail bypass without irreversible impact.
- S3: Attempt blocked with degraded behavior.

## Quick runbook

1. Contain attack vector.
2. Disable vulnerable flow if necessary.
3. Run regression suite.
4. Apply guardrail/policy patch.
5. Validate with confirmation red team.
6. Publish technical post-mortem.

## Low post-mortem

- timeline
- root cause
- impact
- corrective action
- preventive action
