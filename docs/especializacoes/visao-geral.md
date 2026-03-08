---
sidebar_position: 1
title: Overview
---

# SSA specializations by domain

## Why specializations exist

The main SSA track teaches you universal principles: domain decomposition, constraint engineering, agent architecture, context design, evaluation frameworks. These principles work everywhere. But when you apply them to a specific industry, new challenges appear that the general track does not cover.

Think of it like learning to cook. A culinary school teaches you knife skills, heat control, flavor balance, and plating. These fundamentals apply whether you're making pasta or sushi. But if you want to run a Japanese restaurant, you need to learn about fish grading, rice preparation, fermentation timing, and the cultural expectations of omakase service. The fundamentals don't change. The application does.

SSA specializations work the same way. Healthcare has patient safety rules that don't exist in logistics. Legal has jurisdictional constraints that don't apply to e-commerce. B2B support has SLA dynamics that are irrelevant in consumer apps. Each domain brings its own entities, constraints, risks, and evaluation criteria. A specialization teaches you how to apply SSA methodology within those specific conditions.

---

## Prerequisites

Before starting any specialization, you should have completed the main SSA track. Specifically, you need working fluency with:

- **Domain decomposition** -- the ability to identify entities, attributes, relationships, and state transitions for a given domain
- **Constraint engineering** -- the ability to classify constraints as hard (non-negotiable) or soft (adjustable), and to encode them into semantic contracts
- **Agent architecture** -- the ability to design agent roles, define handoff protocols, and structure multi-agent topologies
- **Evaluation design** -- the ability to create eval suites that test semantic fidelity, constraint adherence, and edge case handling

If you have not completed the main track, go back and finish it first. Specialization content assumes you already think in ontologies, constraints, and evaluation loops.

---

## How to use specializations

Each specialization follows a two-part structure:

### Part 1: Domain theory

The theory module covers what makes this domain different from others. It includes:

1. **Why this domain needs SSA** -- the specific pain points and risks that make semantic architecture essential
2. **Priority use cases** -- the 4-6 scenarios where SSA delivers the most value
3. **Domain-specific ontology** -- the entities, relationships, and states unique to this industry
4. **Domain-specific constraints** -- the hard and soft rules that govern behavior in this context
5. **Reference agent architecture** -- how to structure agents for this domain's workflows
6. **Ethical considerations** -- the domain-specific ethical challenges you must address
7. **Case study walkthrough** -- a complete example showing SSA applied to a realistic scenario

### Part 2: Applied lab

The lab gives you a practical challenge modeled on a real-world scenario. You will build a working SSA artifact package that includes an ontology, constraint definitions, agent design, and an evaluation suite. Each lab has a clear rubric with four evaluation dimensions scored from 0 to 10.

### Recommended workflow

1. **Read the domain theory** carefully. Pay special attention to how familiar SSA concepts (entities, constraints, agents) take on new meaning in this domain.
2. **Complete the lab.** Treat it as a realistic project -- not an academic exercise. The deliverables should be production-quality artifacts.
3. **Use the lab as a foundation for your capstone.** If your organization operates in one of these domains, adapt your lab deliverables into a real system proposal.

---

## Available domains

| Specialization | Focus | Key challenge |
|---|---|---|
| [SSA for Healthcare](./ssa-para-saude) | Clinical safety and decision support | Patient safety as a non-negotiable constraint |
| [SSA for Legal](./ssa-para-juridico) | Regulatory coherence and risk analysis | Explainability and jurisdictional precision |
| [SSA for B2B Support](./ssa-para-suporte-b2b) | SLA-driven resolution and escalation | Context-rich triage under time pressure |

Each domain was selected because it represents a class of problems where semantic architecture is not optional -- it is critical. In healthcare, a poorly designed system can harm patients. In legal, it can expose firms to liability. In B2B support, it can destroy customer relationships and violate contractual obligations.

---

## Common structure across specializations

Despite their differences, all specializations share the same architectural skeleton:

- **Ontology first.** Every specialization starts by defining the domain's entities, relationships, and states. You cannot design agents or constraints without knowing what exists in the domain.
- **Constraints as law.** Every specialization distinguishes between hard constraints (rules that must never be broken) and soft constraints (preferences that can be adjusted). Getting this classification wrong is the most common source of serious failures.
- **Agents with roles.** Every specialization designs agents with clear, narrow responsibilities. No single agent tries to do everything. Separation of concerns is as important in semantic architecture as it is in software engineering.
- **Evaluation as proof.** Every specialization includes an evaluation suite. Without evals, you have opinions. With evals, you have evidence.

---

## Connection to the capstone

Your capstone project is the culmination of the SSA Academy. It requires you to design a complete semantic architecture for a real organization.

Specializations feed directly into capstones. If you work in healthcare, your healthcare specialization lab becomes the draft of your capstone's clinical module. If you work in legal, your legal lab becomes the foundation for your capstone's contract analysis system.

Even if your organization doesn't fit neatly into one of these three domains, completing a specialization gives you a worked example of how to adapt SSA methodology to a specific industry. The patterns you learn -- domain-specific ontology, industry constraints, specialized agent roles -- transfer to any domain.

---

## Choosing your specialization

If you're unsure which specialization to pursue, ask yourself:

- **Where does my organization operate?** Start with the domain closest to your daily work.
- **Where is the highest risk?** Prioritize domains where getting it wrong has serious consequences -- clinical harm, legal liability, or customer churn.
- **Where do I have domain expertise?** Specializations are most valuable when you already understand the domain. SSA gives you the architectural toolkit to systematize what you already know.

You can complete multiple specializations. They are independent -- there is no required order after the first.

---

## What comes next

Choose a specialization and begin with its theory module. If you're not sure where to start, [SSA for Healthcare](./ssa-para-saude) is the most detailed example of how domain-specific considerations reshape every SSA decision.
