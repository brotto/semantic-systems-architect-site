---
sidebar_position: 1
sidebar_label: "Overview"
---

# Module 3 — Agent Architecture

## What this module is about

In Module 2, you built the semantic foundation: an ontology (what exists), a constraint matrix (what rules apply), and semantic contracts (what each component receives, decides, and produces). These artifacts define the WHAT — what the system knows and how it should behave.

This module answers the next question: **WHO does the work?**

In a traditional software system, you write functions and assign them to services. In an AI system, you design **agents** — intelligent components that receive context, make decisions, and produce outputs according to their contracts.

But a single agent rarely does everything. Just as a hospital doesn't have one doctor who handles everything from pediatrics to surgery, an AI system has multiple agents, each specialized in a role. The SSA's job is to design this team: who does what, how they coordinate, and what happens when things go wrong.

---

## Learning outcomes

By the end of this module, you will be able to:

1. **Design agent roles** with clear boundaries — each agent knows what it's responsible for and what it must never do
2. **Choose orchestration topologies** — decide whether agents work under a supervisor, in a pipeline, or as a coordinated swarm, based on the requirements of each system
3. **Define handoff protocols** — specify exactly what information passes between agents, what triggers an escalation, and how failures are detected and recovered
4. **Anticipate failure modes** — identify what can go wrong in multi-agent systems and design recovery mechanisms before problems occur

---

## Module map

| # | Content | Type | Estimated time |
|---|---|---|---|
| 1 | Role design — cognitive specialization | Lesson | 90 min |
| 2 | Orchestration topologies | Lesson | 90 min |
| 3 | Handoff protocols and safety | Lesson | 90 min |
| A | Multi-agent design package | Application | 3 hours |
| B | Failure simulation drills | Application | 2 hours |
| — | Assessment | Evaluation | 30 min |

---

## What you will build

- An **agent matrix** defining 6+ agents with roles, scopes, and boundaries
- A **topology decision memo** comparing three orchestration approaches and justifying your choice
- A **handoff protocol specification** with message schemas, confidence signals, and escalation criteria
- A **failure drill report** documenting 5+ failure scenarios with detection and recovery strategies

---

## Prerequisites

- Module 2 completed (you need an ontology, constraint matrix, and semantic contracts to design agents that use them)
- Understanding of what semantic contracts specify (input, decision, output)

---

## Estimated time

10-12 hours total (lessons + applications + assessment)
