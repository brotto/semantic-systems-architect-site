# Module 3 - Agent Architecture

## Learning outcomes

At the end of this module, you should be able to:

- Design multi-agent systems with explicit role boundaries.
- Choose orchestration topologies based on risk, cost, and latency.
- Define handoff protocols and failure recovery patterns.

## Core concepts

### 1. Cognitive role specialization

Common roles:

- Planner
- Retriever
- Reasoner
- Critic
- Executor
- Guardrail

Each role must have scope, authority, and forbidden actions.

### 2. Orchestration topology

- Supervisor + specialists.
- Stage pipeline.
- Federated/swarm with arbitration.

Topology selection depends on criticality, explainability, and throughput.

### 3. Handoff contract

- Required context fields.
- Confidence signal.
- Escalation criteria.
- Retry/abort policy.

## Lesson sequence

### Lesson 1 - Role design

- Goal: avoid role overlap and decision confusion.
- Activity: define responsibilities for a support automation scenario.
- Output: role matrix with boundaries.

### Lesson 2 - Topology selection

- Goal: evaluate architecture trade-offs.
- Activity: compare 3 topologies against one use case.
- Output: topology decision memo.

### Lesson 3 - Protocol and safety

- Goal: formalize message schemas and escalation.
- Activity: simulate handoff failures and repair flows.
- Output: protocol specification v1.

## Applications

1. **Application A - Multi-agent design package**
- Architecture diagram.
- Agent contracts.
- Shared memory strategy.
- Escalation map.

2. **Application B - Failure drills**
- Simulate at least 5 failures (missing context, conflicting goals, low confidence, tool timeout, unsafe request).
- Document detection and recovery.

## Assessment rubric (0-2 each)

- Role clarity.
- Topology justification.
- Protocol robustness.
- Failure handling quality.
- Safety alignment.

Passing threshold: **8/10**.

## Deliverables checklist

- [ ] Agent matrix completed.
- [ ] Topology memo approved.
- [ ] Handoff protocol versioned.
- [ ] Failure drill report attached.

## Bridge to next module

Module 4 expands agent architecture into end-to-end workflows, tools, and pipelines.
