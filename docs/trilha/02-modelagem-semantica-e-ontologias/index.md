---
sidebar_position: 1
sidebar_label: Overview
---

# Module 2 — Semantic Modeling and Ontologies

## What this module is about

In Module 1, you learned what an SSA does and how to reframe vague problems into structured specifications. Now it's time to build the most fundamental artifact in the SSA's toolkit: the **domain ontology**.

An ontology is a map of meaning. It defines everything that exists in your system's world — the entities, their properties, their relationships, their valid states, and the rules that govern them. Without it, an AI system is navigating without a map: it might get somewhere, but it will take wrong turns, invent roads that don't exist, and miss critical landmarks.

This module teaches you to build ontologies that are precise enough for machines to follow and clear enough for humans to verify.

## Learning outcomes

By the end of this module, you will be able to:

1. **Build an operational domain ontology** — map entities, relationships, states, transitions, and invariants for any domain.
2. **Engineer constraints** — classify rules as hard, soft, or exception, and specify what happens when they're tested.
3. **Create semantic contracts** — produce input/decision/output specifications usable by prompts, agents, tools, and evaluation suites.

## Module map

| # | Type | Title | What you will do |
|---|------|-------|-----------------|
| 1 | Lesson | Domain decomposition | Learn to break any domain into entities, relationships, and states |
| 2 | Lesson | Constraint engineering | Classify and formalize the rules that govern your domain |
| 3 | Lesson | Contract packaging | Convert ontology + constraints into executable semantic contracts |
| A | Application | Ontology v1 | Build a complete ontology for a real domain (12+ entities) |
| B | Application | Ambiguity stress test | Collect 20 ambiguous expressions and resolve them with operational definitions |
| — | Assessment | Module evaluation | Rubric, checklist, and passing criteria |

## What you will build

By the end of this module, you will have produced:

- A **versioned domain ontology** with at least 12 entities, their relationships, lifecycle states, and examples
- A **constraint matrix** classifying every important rule as hard, soft, or exception
- A **semantic contract package** with input/decision/output specifications for key system components
- An **ambiguity stress test** demonstrating measurable reduction in interpretation disagreement

## Prerequisites

Module 1 — SSA Fundamentals (completed).

## Estimated time

10–12 hours (lessons + applications + assessment).

## Bridge forward

Module 3 — Agent Architecture will use the ontology and contracts you build here to design multi-agent systems. The ontology becomes the shared knowledge backbone that all agents reference. The contracts become the behavioral specifications that each agent follows.
