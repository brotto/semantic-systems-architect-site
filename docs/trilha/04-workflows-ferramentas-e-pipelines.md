# Module 4 - Workflows, Tools and Pipelines

## Aim

Structure end-to-end flows that integrate LLMs, external tools, data and actions with traceability.

## Skills

- Design deterministic workflows + adaptive steps.
- Defines tool use contracts and call validation.
- Separate reasoning pipeline, data pipeline and execution pipeline.

## Content

1. Anatomy of an SSA workflow
- Trigger
- Context build
- Deliberation
- execution
- Verification
- Audit

2. Integration with tools
- Tools catalog
- Argument scheme
- Retries and timeout policy

3. State management
- ephemeral state
- session state
- persistent state

4. Operational resilience
- Idempotence
- Compensation
- Semantic circuit breaker

## Exercises

1. Build an 8-step workflow with 3 external integrations.
2. Set error policy for each step.
3. Create flow observability diagram.

## Deliverable

"SSA Operational Pipeline" with execution map and SLAs.

## Completion checklist

- Reproducible flow with auditable logs.
- Predicted errors have explicit fallback.
- External dependencies are fault isolated.
