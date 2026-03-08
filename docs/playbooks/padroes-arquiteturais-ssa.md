# Playbook - SSA Architectural Standards

## Pattern 1: Supervisor + Experts

When to use:
- Problems with multiple skills.
- Need for explicit coordination.

Advantages:
- Central control.
- Good auditability.

Risks:
- Bottleneck at the supervisor.

## Pattern 2: Pipeline by stage

When to use:
- Predictable sequential processes.
- Stage traceability requirements.

Advantages:
- Operational simplicity.
- Easy performance measurement per phase.

Risks:
- Less adaptable to unexpected cases.

## Pattern 3: Critical Loop

When to use:
- High-impact departures require internal review.

Advantages:
- Reduces error without requiring human intervention in all cases.

Risks:
- May increase latency and cost.

## Pattern 4: Selective Human-in-the-loop

When to use:
- Sensitive, regulated or irreversible decisions.

Advantages:
- Risk control.

Risks:
- May reduce scale if poorly calibrated.

## Pattern 5: Complexity Routing

When to use:
- Heterogeneous task load with different optimal costs.

Advantages:
- Optimizes cost/quality.

Risks:
- Bad classification degrades results.
