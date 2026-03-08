---
sidebar_position: 7
sidebar_label: "Assessment"
---

# Module 4 — Assessment

## What you should have produced

By completing this module, you should have the following artifacts:

| # | Artifact | Source |
|---|---|---|
| 1 | Workflow blueprint with 6 stages (trigger through audit), deterministic and adaptive steps identified | Lesson 1 practice activity |
| 2 | Tool registry with complete contracts, agent-tool access matrix, and state management classification | Lesson 2 practice activity |
| 3 | Failure policy matrix with retry, fallback, compensation, and degradation for all critical components | Lesson 3 practice activity |
| 4 | Complete 8-step operational pipeline with 3+ tools, fallback logic, and end-to-end walkthroughs | Application A |
| 5 | Traceability package with execution logs, decision event tracking, and incident replay guide | Application B |

---

## Assessment rubric

Each dimension is scored **0, 1, or 2**. Total possible: **10 points**. Passing threshold: **8/10**.

### Dimension 1: Workflow coherence (0-2)

| Score | Description |
|---|---|
| **0** | Workflow is missing stages or stages are in wrong order. No distinction between deterministic and adaptive steps. Steps don't flow logically from one to the next. |
| **1** | All six stages are present and the flow is logical, but some steps are vaguely specified or the distinction between deterministic and adaptive is inconsistent. Some steps do more than one thing. |
| **2** | Clean, logical workflow with all six stages. Each step has one clear purpose. Deterministic and adaptive steps are correctly identified with justification. Decision points and branching paths are explicit. An engineer could implement from this blueprint. |

### Dimension 2: Tool contract quality (0-2)

| Score | Description |
|---|---|
| **0** | Tools are mentioned but not specified. No schemas, no permissions, no operational specs. Tool usage is hand-waved. |
| **1** | Tool contracts exist but are incomplete. Some schemas lack types or validation. Permissions are generic. Idempotency is not addressed. |
| **2** | Every tool has a complete 5-part contract. Schemas are precise with types, validation, and error responses. Permissions follow least privilege. Idempotency is specified. The agent-tool access matrix is justified. |

### Dimension 3: State design adequacy (0-2)

| Score | Description |
|---|---|
| **0** | No state management strategy. Data lifecycle is not considered. Unclear what persists and what doesn't. |
| **1** | State is classified but some classifications feel arbitrary. Session vs. persistent boundary is unclear for some data. No conflict resolution for shared state. |
| **2** | Every piece of data has a clear lifecycle classification (ephemeral, session, persistent) with justification. Persistent state has owners and access rules. State transitions are deliberate. Privacy considerations are addressed. |

### Dimension 4: Resilience under failure (0-2)

| Score | Description |
|---|---|
| **0** | No failure handling. Pipeline assumes everything works. No retries, no fallbacks, no compensation. |
| **1** | Some failure handling exists but is incomplete. Retries without backoff, fallbacks without full chains, or compensation without logging. Degradation levels are not defined. |
| **2** | Every critical step has a complete failure policy (retry with backoff, fallback chain, compensation where needed). Degradation levels are defined for the overall system. The failure walkthrough demonstrates realistic recovery. Circuit breaker patterns are included where appropriate. |

### Dimension 5: Auditability (0-2)

| Score | Description |
|---|---|
| **0** | No logging strategy. Decisions are not tracked. No way to replay or investigate a past execution. |
| **1** | Logging exists but captures events without decisions. "Step 3 completed" but not "Step 3 decided X because Y." Replay guide is missing or too vague to follow. |
| **2** | Comprehensive logging at workflow and step level. Every significant decision is captured as a structured event with evidence, reasoning, and confidence. The replay guide enables any team member to reconstruct and understand any execution. Privacy and retention are explicitly addressed. |

---

## Self-assessment checklist

### Lessons

- [ ] I can design a 6-stage workflow (trigger, context build, deliberation, execution, verification, audit)
- [ ] I can distinguish deterministic from adaptive steps and justify when each is appropriate
- [ ] I can write a complete tool contract with all five parts
- [ ] I can apply the principle of least privilege to tool access
- [ ] I can design retry policies with exponential backoff and jitter
- [ ] I can design fallback chains, compensation strategies, and degradation levels

### Application A — Operational pipeline v1

- [ ] My pipeline has 8+ steps with clear inputs, processing, and outputs
- [ ] I use at least 3 external tools with complete contracts
- [ ] Every critical step has retry, fallback, and compensation policies
- [ ] The happy path walkthrough flows end-to-end without gaps
- [ ] The failure path walkthrough shows realistic detection and recovery
- [ ] State management classifies every piece of data

### Application B — Traceability package

- [ ] Execution logs capture both workflow-level and step-level detail
- [ ] Decision events include evidence, reasoning, alternatives, and confidence
- [ ] The incident replay guide has clear, followable steps
- [ ] Privacy considerations are documented (what is NOT logged)
- [ ] Retention policy specifies duration and access rules
- [ ] At least one example replay demonstrates the format in action

---

## What passing means

Scoring **8/10 or higher** means you can:

- Design production-grade workflows that separate deterministic and adaptive processing
- Specify tool integrations with contracts that make external interactions reliable and safe
- Build resilience into every critical step so the system handles failures gracefully
- Create traceability systems that enable debugging, investigation, and continuous improvement

---

## If you don't pass

- **Low on workflow coherence:** review the six stages and check that each is present and distinct. A common mistake is merging context build into deliberation, or skipping verification entirely. Each stage exists for a reason.
- **Low on tool contracts:** pick your most important tool and write the full 5-part contract from scratch. Start with the output schema (what does the tool return?), then the input schema (what does it need?), then work outward to permissions and operational specs.
- **Low on state design:** for every variable in your pipeline, ask: "when is this created, who uses it, and when can it be deleted?" The answers determine whether it's ephemeral, session, or persistent.
- **Low on resilience:** for every step, ask "what happens if this step fails?" If the answer is "the pipeline fails," you need a fallback. Work backward from the worst case.
- **Low on auditability:** transform every "Step X completed" log into "Step X decided Y because Z with confidence W." Decisions are what matter — events without decisions are noise.

---

## Bridge to Module 5

You now have a complete operational pipeline: a workflow that processes requests through clear stages, tools with precise contracts, failure policies that keep the system running, and traceability that makes everything observable.

**Module 5 — Context Engineering and Structural Prompting** goes inside the agents themselves. You'll learn how to design the prompts and context packages that make agents behave correctly, consistently, and reliably. If Module 4 built the highway, Module 5 teaches the drivers how to navigate it.
