# Playbook - Anti-patterns and Recovery

## Anti-pattern 1: Monolithic prompt without contract

Symptom:
- Inconsistent result between runs.

Correction:
- Separate identity, politics, objective and format.
- Introduce semantic contract and output validation.

## Anti-pattern 2: Agents with overlapping scope

Symptom:
- Conflict of decisions and redundant responses.

Correction:
- Respecify each agent's mission and boundary.
- Define handoff protocol.

## Anti-pattern 3: Quality without metrics

Symptom:
- Subjective discussion about "it looks better."

Correction:
- Create baseline + evals suite + release gate.

## Anti-pattern 4: Lack of risk governance

Symptom:
- Security incidents without a cause trail.

Correction:
- Implement risk matrix, access controls and auditing.

## Anti-pattern 5: Scale without operation

Symptom:
- System crashes in real volume.

Correction:
- Define SLOs, runbook, alerts and incident response process.
