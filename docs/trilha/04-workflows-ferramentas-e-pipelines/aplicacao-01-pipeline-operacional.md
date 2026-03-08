---
sidebar_position: 5
sidebar_label: "Application A — Operational pipeline v1"
---

# Application A — Operational pipeline v1

## Objective

In this application, you will build a complete operational pipeline — a real, end-to-end workflow that takes a trigger, processes it through multiple stages using external tools, handles failures gracefully, and produces auditable results.

This is where everything from the three lessons converges: workflow design (Lesson 1), tool integration (Lesson 2), and operational resilience (Lesson 3) — combined into a single, production-ready specification.

---

## The assignment

Design an operational pipeline with at least **8 steps**, using at least **3 external tools**, with **fallback logic for every critical step.**

Choose the same domain you've been working with throughout the course, or select one of these:

**Domain A: Customer invoice dispute pipeline**
A customer disputes a charge. The system must verify the charge, analyze the dispute, determine resolution, execute the resolution (refund, adjustment, or denial), communicate the outcome, and log everything.

**Domain B: Job application screening pipeline**
An applicant submits a resume. The system must parse the document, extract qualifications, match against job requirements, score the candidate, route to the appropriate recruiter, send an acknowledgment, and log the decision.

**Domain C: Incident response pipeline**
A monitoring system detects an anomaly. The system must classify severity, gather diagnostic data, determine the response action, execute remediation, verify the fix, notify stakeholders, and create a post-incident report.

**Domain D: Your own project**

---

## Deliverable structure

### Section 1: Pipeline overview (half page)

- What business process does this pipeline automate?
- What triggers it?
- What is the expected output?
- What are the critical requirements (speed, accuracy, safety)?

### Section 2: Pipeline blueprint (2-3 pages)

For each of the 8+ steps, document:

```
Step [number]: [Name]
  Type: [deterministic / adaptive]
  Agent: [which agent handles this step]

  Input:
    [what this step receives]
    Source: [from previous step / from tool / from trigger]

  Processing:
    [what this step does — be specific]

  Tools used:
    [which tools from the registry — or "none"]

  Output:
    [what this step produces]
    Destination: [next step / storage / external system]

  Failure handling:
    Retry: [policy]
    Fallback: [what happens if this step fails]
    Compensation: [what to undo if failure occurs after partial success]

  Verification:
    [how do we know this step succeeded?]
```

### Section 3: Tool registry (1 page)

For each external tool (at least 3), provide the complete tool contract:
- Identity and purpose
- Input/output schemas
- Permissions and safety rules
- Operational specifications (retry, timeout, idempotency)

### Section 4: Failure policy matrix (1 page)

For every critical step, document the complete failure policy:
- Retry policy (attempts, backoff, conditions)
- Fallback chain (Level 1, 2, 3)
- Compensation requirements
- Degradation impact

### Section 5: State management (half page)

Classify every piece of data in the pipeline:
- What is ephemeral (scratch data)?
- What is session-scoped (lives for this pipeline execution)?
- What is persistent (stored permanently)?

### Section 6: End-to-end walkthrough (1 page)

Walk through two complete executions:
1. **Happy path:** everything works. Show the data flowing through all 8+ steps.
2. **Failure path:** one critical tool fails at step 4. Show how the system detects, recovers, and continues (or gracefully degrades).

---

## Evaluation criteria

| Criterion | What "good" looks like |
|---|---|
| **Workflow coherence** | Steps flow logically. Each step has a clear reason to exist. Deterministic and adaptive steps are correctly identified. No unnecessary steps. |
| **Tool contract quality** | Contracts are complete (all 5 parts). Schemas are precise with types and validation. Permissions follow least privilege. Idempotency is specified. |
| **State design adequacy** | Every piece of data has a clear lifecycle classification. Session state is properly scoped. Persistent state has owners and access rules. |
| **Resilience under failure** | Every critical step has retry, fallback, and compensation. Degradation levels are defined. The failure path walkthrough shows realistic recovery. |
| **Auditability** | The pipeline produces enough logging to reconstruct any execution after the fact. Decisions, tool invocations, and outcomes are all recorded. |

---

## Tips for success

- **Start with the happy path.** Design the pipeline for when everything works, then add failure handling to each step. It's much easier to add resilience to a working design than to design resilience and workflow simultaneously.

- **Be specific about tools.** Don't write "search the database." Write: "invoke `search_customer_records` with `customer_id` and `order_id`, expecting a response with `order_status`, `order_items`, `payment_status`, and `delivery_tracking_id`." Specificity is the difference between a design and a wish.

- **Every write tool needs compensation.** If a step modifies the world (sends an email, charges a card, updates a record) and a later step fails, can you undo it? If not, design around it — for example, by doing all write operations at the end, after all decisions are finalized.

- **The failure path is more important than the happy path.** Anyone can design a system that works when everything works. The SSA's value is in designing systems that work even when things break.
