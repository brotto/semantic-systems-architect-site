---
sidebar_position: 1
title: Overview
---

# Advanced Architectures

## Why this section exists

Throughout the SSA learning path, you have been building a set of foundational skills: decomposing domains, designing semantic contracts, structuring agent topologies, engineering context, and evaluating system behavior. Those skills work wonderfully for systems where the model's own training data is sufficient to reason and respond.

But most real-world systems need something else: **external knowledge**.

A customer support agent needs access to your company's current policies. A clinical decision-support tool needs the latest treatment guidelines. A legal research assistant needs the actual text of contracts and regulations. In all these cases, the AI must reach outside its own memory and pull in relevant information at query time.

This is the domain of **Retrieval-Augmented Generation (RAG)** -- and it is where many teams discover that their first working prototype bears little resemblance to a system that performs reliably at scale.

Think of it this way. If basic prompt engineering is like learning to cook a meal for your family, building a production RAG system is like running a restaurant. The core skill (cooking) is the same, but everything around it changes: supply chain, consistency, speed, hygiene standards, customer expectations, and the ability to handle a hundred orders simultaneously without any single plate going out wrong.

This section teaches you how to run the restaurant.

---

## What you will learn

This trail focuses on one architecture family -- RAG -- examined through every phase of its lifecycle:

| Lesson | Focus |
|---|---|
| [RAG in Production](./rag-em-producao) | Why RAG behaves differently in production and how the SSA designs it as a semantic system |
| [Ingestion and Indexing Design](./design-ingestao-indexacao) | How to collect, chunk, enrich, and index knowledge so retrieval succeeds |
| [Retrieval and Reranking](./retrieval-e-reranking) | How to find the right information and rank it for the model's context window |
| [RAG Evaluation](./avaliacao-rag) | How to measure whether your RAG system actually works, across four distinct layers |
| [RAG Operations](./operacao-rag) | How to keep a RAG system healthy in production: SLOs, monitoring, incident response, and cost |
| [Production RAG Lab](./lab-rag-producao) | A hands-on challenge: design a complete production RAG architecture |

---

## Prerequisites

Before starting this trail, you should be comfortable with:

- **Semantic contracts** -- you know how to define what a system component promises to deliver and what it expects to receive (Module 2 of the main trail).
- **Context engineering** -- you understand how to assemble and validate the information a model needs to reason correctly (Module 5 of the main trail).
- **Evaluation design** -- you have experience building eval suites that measure semantic fidelity, not just surface accuracy (Module 6 of the main trail).

If any of these feel unfamiliar, revisit the corresponding module before diving in. RAG is an integration problem, and it integrates nearly everything you have learned so far.

---

## The SSA perspective on RAG

Many RAG tutorials treat the problem as purely technical: pick a vector database, chunk your documents, embed them, retrieve the top-k results, and feed them to a model. That works for demos. It breaks in production.

The SSA treats RAG as a **semantic architecture problem**. Every stage of the pipeline -- from how documents are chunked to how retrieved passages are ranked to how the model cites its sources -- involves a semantic design decision. Get those decisions wrong, and no amount of infrastructure optimization will save the system.

Throughout this trail, you will learn to ask the questions that matter:

- What does "relevant" mean for this domain and this user?
- What metadata makes retrieval semantically precise rather than merely statistically similar?
- How do we know the model's answer is actually grounded in the retrieved evidence?
- What happens when the knowledge base has no answer to the user's question?
- How do we detect when the knowledge base has drifted and the system is serving stale information?

These are design questions, not engineering questions. They are the SSA's responsibility.

---

## How to work through this trail

Read the lessons in order. Each one builds on the previous:

1. Start with the conceptual foundation (RAG in Production).
2. Walk through the pipeline from left to right (Ingestion, then Retrieval).
3. Learn how to measure what you have built (Evaluation).
4. Learn how to keep it running (Operations).
5. Prove your understanding in the lab exercise.

Take notes on how each lesson connects back to concepts from the main trail. RAG is not a separate discipline -- it is SSA applied to the specific problem of knowledge-grounded generation.

---

## What this trail does NOT cover

This trail focuses on RAG architecture from the SSA perspective. It does not teach you how to write code for a RAG system, how to configure a specific vector database, or how to fine-tune embedding models. Those are engineering tasks that the implementation team handles.

What it does teach you is how to make the design decisions that determine whether the engineering effort succeeds or fails. The SSA who designs a good RAG architecture makes the engineering team's job dramatically easier. The SSA who skips this design work forces the engineering team to make semantic decisions they are not equipped to make -- and the system suffers.

Think of it like the relationship between an urban planner and a road construction crew. The construction crew knows how to lay asphalt, install drainage, and paint lane markings. But if the urban planner designed a road system with no consideration for traffic flow, emergency vehicle access, or pedestrian safety, no amount of excellent asphalt will make the roads work well. The design decisions come first. The construction follows.

---

## Key takeaways

1. **RAG is where SSA skills face their hardest integration test.** Every concept you have learned -- contracts, context, evaluation, safety -- comes together in a RAG system.

2. **Production RAG is fundamentally different from prototype RAG.** The gap is not about scale. It is about semantic rigor: clear contracts, measurable quality, and graceful failure.

3. **The SSA's job in RAG is design, not plumbing.** You are not choosing vector databases. You are deciding what "relevant" means, what the system should do when evidence is absent, and how to prove the system is trustworthy.

Let's begin.
