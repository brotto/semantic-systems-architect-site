---
sidebar_position: 7
sidebar_label: "Assessment"
---

# Module 3 — Assessment

## What you should have produced

By completing this module, you should have the following artifacts:

| # | Artifact | Source |
|---|---|---|
| 1 | Agent role matrix with 8+ tasks grouped into roles, with scope, exclusions, and forbidden actions | Lesson 1 practice activity |
| 2 | Orchestration topology diagram with justification addressing the five decision factors | Lesson 2 practice activity |
| 3 | Handoff protocol specification with happy and unhappy paths, retry policies | Lesson 3 practice activity |
| 4 | Complete multi-agent design package with 6+ agents, topology, protocols, shared memory, and escalation map | Application A |
| 5 | Failure simulation report with 5+ drills across all five failure categories, with recovery assessment | Application B |

---

## Assessment rubric

Each dimension is scored **0, 1, or 2**. Total possible: **10 points**. Passing threshold: **8/10**.

### Dimension 1: Role clarity and separation (0-2)

| Score | Description |
|---|---|
| **0** | Agents have overlapping responsibilities or no clear boundaries. "Must never" lists are missing or generic. Some agents try to do multiple cognitive roles. |
| **1** | Roles are mostly clear with defined scopes, but some boundaries are fuzzy. A few agents have implicit overlap that would cause confusion in implementation. "Must never" lists exist but miss important prohibitions. |
| **2** | Every agent has exactly one cognitive role with a precise scope, clear exclusions, and specific "must never" constraints. The confusion test passes for all agent pairs. No overlap exists. An implementer could build any agent from its specification alone. |

### Dimension 2: Topology justification (0-2)

| Score | Description |
|---|---|
| **0** | Topology is chosen without justification, or the justification doesn't address the system's specific requirements. Trade-offs are not discussed. |
| **1** | Topology is justified, but the analysis is incomplete. Some decision factors are addressed, but others are ignored. Trade-offs are mentioned but not analyzed. |
| **2** | Topology choice is thoroughly justified against all five decision factors (workflow variability, explainability, latency, failure criticality, scale). Trade-offs are honestly assessed. The justification explains why alternative topologies were rejected. Monitoring criteria are defined for detecting when the topology needs to change. |

### Dimension 3: Protocol robustness (0-2)

| Score | Description |
|---|---|
| **0** | Handoff messages are incomplete (missing confidence, context, or constraints). No unhappy paths are specified. Retry policies are absent. |
| **1** | Handoff messages include most components but some are vague. One or two unhappy paths exist but are incomplete (detection exists but recovery is missing, or vice versa). Retry policies exist but lack clear limits. |
| **2** | Handoff messages include all five components with domain-specific detail. The happy path is fully documented with actual message contents. At least three unhappy paths are specified with detection, recovery, and assessment. Retry policies have clear limits and fallbacks. Circuit breakers are designed for cascading failure prevention. |

### Dimension 4: Failure handling quality (0-2)

| Score | Description |
|---|---|
| **0** | Failure drills are superficial or missing. Scenarios are unrealistic. Recovery steps end with "the system fails" or "escalate" without specifying how. |
| **1** | Failure drills cover most categories but some are thin. Detection mechanisms exist but are vague. Recovery steps are present but incomplete or miss edge cases. Assessment is shallow. |
| **2** | All five failure categories are covered with realistic, domain-specific scenarios. Detection mechanisms are concrete (specific agent, specific signal). Recovery steps lead to resolution. Assessment is honest about remaining gaps. Design recommendations emerge from the drills and are actionable. |

### Dimension 5: Safety and escalation design (0-2)

| Score | Description |
|---|---|
| **0** | No systematic escalation design. Some agents can get stuck with no path forward. Unsafe requests are not addressed. |
| **1** | Escalation paths exist but are incomplete. Most agents have an escalation target, but the information that accompanies escalation is not specified. Unsafe request handling exists but is generic. |
| **2** | Complete escalation hierarchy with clear triggers, required information, and response time expectations at each level. Every agent has a failure path that eventually reaches a human. Unsafe and policy-violating requests are specifically addressed with detection, blocking, logging, and customer communication. No agent can get permanently stuck. |

---

## Self-assessment checklist

### Lessons

- [ ] I can identify the six cognitive roles and explain when each is appropriate
- [ ] I can explain why single-agent systems fail for complex tasks
- [ ] I can compare supervisor, pipeline, and swarm topologies with trade-offs
- [ ] I can apply the five decision factors to choose a topology
- [ ] I can design a handoff message with all five components
- [ ] I can design escalation triggers and recovery procedures

### Application A — Multi-agent design package

- [ ] My system has 6+ agents, each with a single cognitive role
- [ ] Every agent has scope, exclusions, and "must never" constraints
- [ ] My topology choice is justified against the five decision factors
- [ ] The happy path handoff sequence is fully documented
- [ ] At least three unhappy paths are specified with recovery
- [ ] Shared memory rules are defined (what's shared, who writes, conflict resolution)
- [ ] The escalation map covers all agents and reaches a human fallback

### Application B — Failure simulation drills

- [ ] I have 5+ drills covering all five failure categories
- [ ] Each drill has a specific trigger, detection mechanism, and recovery steps
- [ ] Each drill references specific agents and constraints from my design
- [ ] Each drill honestly assesses whether recovery is sufficient
- [ ] At least 3 actionable design recommendations emerged from the drills

---

## What passing means

Scoring **8/10 or higher** means you can:

- Design multi-agent systems with clear role separation that prevents overlap and confusion
- Choose and justify orchestration topologies based on system requirements, not defaults
- Specify handoff protocols that preserve context, signal confidence, and enforce constraints
- Anticipate failures and design recovery mechanisms that prevent silent system degradation
- Build safety layers that protect against cascading failures, policy violations, and edge cases

---

## If you don't pass

- **Low on role clarity:** review each agent and apply the "confusion test" — for every pair of agents, verify there's no overlapping responsibility. If you find overlap, either move the task to one agent exclusively or create explicit rules for who handles it when.
- **Low on topology justification:** go through each of the five decision factors and write one sentence about your system for each. The topology should follow naturally from these answers. If it doesn't, you may have the wrong topology.
- **Low on protocol robustness:** check every handoff message for the five required components (payload, context, confidence, routing, active constraints). If any are missing, add them with domain-specific detail. Then walk through the happy path step by step — if any step feels vague, make it specific.
- **Low on failure handling:** your drills may be too clean. Real failures are messy and specific. Instead of "what if the API fails," try "what if the API returns a 200 OK but the data is empty" or "what if the API takes 45 seconds instead of the expected 2 seconds." More specific scenarios lead to more useful recovery designs.
- **Low on safety:** check that every agent has an escalation target. Follow each escalation chain to its end — does it reach a human? If any chain dead-ends, add a path. Check that hard constraint violations are handled with blocking (not just logging).

---

## Bridge to Module 4

You now have a complete agent architecture: WHO does WHAT (role matrix), HOW they coordinate (topology), and WHAT HAPPENS when things go wrong (protocols and safety).

**Module 4 — Workflows, Tools and Pipelines** takes this architecture and makes it operational. You'll design the end-to-end workflows that orchestrate your agents across complete business processes, connect agents to real tools (databases, APIs, external services), and build the pipelines that transform raw inputs into final outputs.

If Module 3 gave you the team and its playbook, Module 4 gives them the equipment and the game plan.
