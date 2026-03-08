---
sidebar_position: 2
title: RAG in Production
---

# RAG in Production for SSA

## The library analogy

Imagine you walk into a small bookshop and ask the owner: "Do you have anything about growing tomatoes?" The owner knows every shelf by heart. She walks to the gardening section, pulls out two books, and says: "This one covers container tomatoes, and this one has a chapter on soil pH for nightshades." Perfect retrieval. Zero effort.

Now imagine you are running the public library for a city of 500,000 people. Thousands of patrons per day, millions of books, journals, and digital records across hundreds of subjects. A patron asks: "I need the latest research on tomato blight resistance in Mediterranean climates." The librarian can no longer rely on personal memory. They need a catalog system, a classification schema, inter-library loan protocols, a way to assess whether a source is current, and a method to present the most relevant materials first -- all within minutes.

This is exactly the difference between a RAG prototype and a RAG system in production.

The prototype is the bookshop. You can get away with a simple vector search over a handful of documents, top-5 retrieval, and a prompt that says "answer based on the following context." It works in demos. It impresses stakeholders.

Production is the city library. The stakes are higher, the volume is relentless, the questions are harder, the sources are messier, and the cost of a wrong answer is real. A customer gets incorrect policy information. A clinician receives an outdated dosing guideline. A legal team misses a relevant precedent.

This lesson teaches you to think about RAG systems the way a head librarian thinks about running a world-class library: with systems, standards, contracts, and continuous quality assurance.

---

## Why RAG matters for the SSA

Before we dive into architecture, let's be clear about why RAG is an SSA concern -- not just an engineering concern.

A RAG system is a meaning pipeline. At every stage, semantic decisions determine the quality of the output:

- **What gets indexed** determines what the system can possibly know.
- **How content is chunked** determines whether the system retrieves coherent ideas or fractured sentences.
- **What metadata is attached** determines whether the system can distinguish current policy from archived policy, authoritative source from blog post, public content from confidential content.
- **How retrieval is ranked** determines whether the model sees the most relevant evidence or the most superficially similar text.
- **How the model uses the context** determines whether the answer is grounded, accurate, and properly cited -- or hallucinated, misleading, and unverifiable.

Every single one of these is a design decision. The SSA makes these decisions. The engineering team implements them.

---

## Three architectural layers

A production RAG system has three distinct layers. The SSA's job is to define the semantic contract for each layer -- what it receives, what it promises to deliver, and what quality guarantees it makes.

### Layer 1: Retrieval

**Purpose:** Given a user query, find the most relevant pieces of knowledge from the knowledge base.

**Input contract:** A user query (possibly transformed or expanded), plus any applicable filters (domain, recency, sensitivity level).

**Output contract:** A ranked list of content chunks, each with a relevance score, source metadata, and freshness indicator.

**Quality guarantee:** The top-k results contain at least one passage that directly addresses the user's question in at least 90% of queries within the supported domain.

Think of this layer as the library's catalog and retrieval system. Its job is not to answer the question -- only to find the right books and open them to the right pages.

### Layer 2: Reasoning

**Purpose:** Given the retrieved context and the user query, reason about the information to construct an accurate, grounded answer.

**Input contract:** The user query plus a set of ranked, relevant passages with their metadata and citation identifiers.

**Output contract:** A draft answer that is faithful to the retrieved evidence, with explicit citation links to source passages.

**Quality guarantee:** Every factual claim in the answer traces back to a specific retrieved passage. If the evidence is insufficient, the system says so explicitly rather than guessing.

Think of this layer as the librarian who reads the relevant pages and composes a summary for the patron. The librarian does not make things up. If the books do not address the question, the librarian says: "I could not find a definitive answer to that specific question, but here is what we do have."

### Layer 3: Response

**Purpose:** Format, filter, and deliver the answer according to the system's policies, tone, and safety requirements.

**Input contract:** A grounded draft answer with citations and confidence metadata.

**Output contract:** A final response that meets formatting standards, includes proper citations, respects sensitivity rules, and is appropriate for the user's context.

**Quality guarantee:** The response never leaks sensitive information, always includes at least one source citation, and follows the system's tone guidelines.

Think of this layer as the front desk of the library, where the research summary is handed to the patron in a clean, professional format, with proper references and any necessary caveats.

### Why separate these layers?

Because each layer can fail independently, and each failure requires a different fix.

- If the answer is wrong because **retrieval** missed the right document, you fix the index or the search strategy -- not the prompt.
- If the answer is wrong because **reasoning** ignored relevant context, you fix the context assembly or the model's instructions -- not the index.
- If the answer is inappropriate because **response** filtering failed, you fix the output policies -- not the reasoning.

Conflating these layers is one of the most common mistakes in RAG development. When teams have a single, monolithic "RAG pipeline," every problem looks the same and every fix is a guess. Separating the layers turns debugging from guesswork into diagnosis.

---

## Core principles

### 1. Context as contract

In a production RAG system, the context window is not just "some relevant text." It is a contract between the retrieval layer and the reasoning layer.

The retrieval layer promises: "These are the N most relevant passages for this query, ranked by relevance, with source metadata attached." The reasoning layer promises: "I will base my answer only on these passages and clearly cite which passage supports each claim."

When you treat context as a contract, you can:

- **Measure compliance.** Is the reasoning layer actually using the provided context? Or is it ignoring low-ranked passages? Or hallucinating beyond the context?
- **Debug failures.** Was the context correct but the reasoning wrong? Or was the context irrelevant and the reasoning did its best with bad inputs?
- **Set budgets.** How many tokens of context does each query type need? What is the marginal value of adding a sixth passage versus stopping at five?

### 2. Retrieval quality as a first-class metric

Many teams obsess over generation quality -- the fluency and helpfulness of the final answer -- while ignoring retrieval quality. This is like judging a restaurant by the presentation of the plates while ignoring whether the ingredients are fresh.

If retrieval is bad, generation cannot save it. The model will either hallucinate (because it has no relevant evidence) or produce a mediocre answer (because the evidence is mediocre). Either way, no amount of prompt tuning fixes the problem.

Production RAG systems measure retrieval quality independently:

- **Precision at k:** Of the top-k retrieved passages, how many are actually relevant?
- **Recall at k:** Of all the relevant passages in the knowledge base, how many appear in the top-k?
- **Mean Reciprocal Rank (MRR):** How high in the ranking does the first relevant passage appear?

These metrics tell you whether your retrieval system is doing its job before the model ever sees the results.

### 3. Grounding over hallucination

A grounded answer is one that can be traced back to specific evidence in the retrieved context. An ungrounded answer is one where the model has drawn on its own training data, invented plausible-sounding facts, or extrapolated beyond what the evidence supports.

Production RAG systems enforce grounding through:

- **Citation requirements.** Every factual claim must reference a specific retrieved passage.
- **Abstention policies.** When the evidence is insufficient, the system must explicitly say so. "I don't know" is a correct answer.
- **Faithfulness evaluation.** Automated checks that compare the generated answer against the retrieved passages to flag unsupported claims.

### 4. Design for absence of evidence

What should your system do when it simply does not have the information to answer a question? This is not an edge case. In most domains, users routinely ask questions that the knowledge base does not cover.

A well-designed RAG system has explicit policies for:

- **No relevant results:** Retrieval returns nothing above the relevance threshold. The system acknowledges the gap.
- **Partial evidence:** Retrieval returns passages that partially address the question. The system answers what it can and flags what it cannot.
- **Conflicting evidence:** Retrieval returns passages that contradict each other. The system surfaces the conflict rather than arbitrarily choosing one side.
- **Outdated evidence:** The most relevant passage has a freshness flag indicating it may be stale. The system warns the user.

---

## RAG architecture patterns

Not all RAG systems are built the same way. Over the past few years, several patterns have emerged, each with different complexity and capability tradeoffs.

### Pattern 1: Naive RAG

This is the "bookshop" approach. It is the simplest possible RAG pipeline.

```
User query --> Embed query --> Vector search (top-k) --> Stuff into prompt --> Generate answer
```

**How it works:** The user's query is embedded into a vector, the k nearest neighbors are retrieved from the vector store, those passages are concatenated into the model's prompt, and the model generates an answer.

**When it works:** Small knowledge bases, homogeneous document types, simple factual questions, low stakes.

**When it breaks:**
- Queries with complex intent that need decomposition.
- Knowledge bases with diverse document types where lexical matching would help.
- High-stakes domains where citation accuracy and source reliability matter.
- Large-scale systems where the top-k is not good enough without reranking.

Naive RAG is a fine starting point for prototypes. It is almost never sufficient for production.

### Pattern 2: Advanced RAG

Advanced RAG adds intelligence to the pipeline before and after the basic retrieval step.

```
User query --> Query understanding --> Query transformation
  --> Hybrid search (vector + lexical) --> Reranking --> Context assembly
  --> Generation with citation instructions --> Output validation
```

**Key additions:**

- **Query transformation:** The system analyzes the user's query, classifies intent, expands abbreviations, decomposes multi-part questions, and generates multiple search queries to improve recall.
- **Hybrid search:** Combines vector similarity search (good for semantic meaning) with lexical keyword search (good for exact terms, product codes, proper nouns).
- **Reranking:** A cross-encoder or similar model re-scores the initial retrieval results for fine-grained relevance.
- **Context assembly:** Instead of blindly stuffing all results into the prompt, the system selects and orders passages to maximize relevance within the token budget.
- **Output validation:** The generated answer is checked for citation accuracy, grounding, and policy compliance.

Advanced RAG is appropriate for most production systems. It adds complexity but delivers substantially better quality.

### Pattern 3: Modular RAG

Modular RAG decomposes the pipeline into independently configurable and replaceable modules.

```
Query router --> [Simple path | Complex path | Multi-hop path]
  Each path: custom retrieval strategy --> custom context assembly --> custom generation instructions
  All paths: shared evaluation and monitoring layer
```

**Key additions:**

- **Query routing:** A classifier determines which retrieval strategy to use based on query complexity, domain, and type.
- **Multiple retrieval strategies:** Different query types use different approaches. A simple factual question gets a single-hop retrieval. A comparative question gets parallel retrievals and merging. A multi-step reasoning question gets iterative retrieval.
- **Pluggable modules:** Each component (embedder, retriever, reranker, generator) can be independently updated, tested, and replaced without touching the rest of the pipeline.

Modular RAG is appropriate for large-scale systems that serve diverse query types and need the flexibility to evolve each component independently.

---

## When to use RAG vs. alternatives

RAG is not always the right answer. The SSA should be able to recommend the appropriate approach based on the situation.

### Use RAG when:

- The system needs access to **specific, frequently updated knowledge** that is not in the model's training data.
- **Accuracy and citation** matter -- users need to know where the answer came from.
- The knowledge base is large enough that **fine-tuning is impractical** or the content changes too often for retraining.
- **Multiple sources** with different authority levels, sensitivity, and recency need to be navigated.

### Use fine-tuning when:

- The system needs to learn a **specific style, tone, or reasoning pattern** rather than access specific facts.
- The knowledge is **relatively stable** and does not change frequently.
- The domain has **specialized vocabulary or reasoning** that the base model handles poorly.
- You need the system to **internalize** knowledge rather than retrieve it at query time.

### Use prompt-only approaches when:

- The relevant knowledge **fits within a single context window** and does not change.
- The task is about **reasoning or formatting**, not about accessing a knowledge base.
- Latency is critical and the retrieval step would add **unacceptable delay**.
- The domain is simple enough that the model's **training data is sufficient**.

### Combine approaches when:

- Fine-tune for style and domain reasoning, then use RAG for specific factual knowledge.
- Use prompt-based context for stable, universal rules, and RAG for variable, domain-specific content.
- Route queries: some go through RAG, others go through a prompt-only path, based on query classification.

---

## The SSA's role in RAG

Let's be specific about what the SSA delivers when designing a production RAG system.

### 1. Domain knowledge map

The SSA maps the knowledge domain: what types of documents exist, how they relate to each other, what their authority levels are, how they change over time, and what sensitivity classifications apply.

This is not a technical specification. It is a semantic model of the knowledge landscape. Without it, the engineering team has no basis for making chunking, metadata, or retrieval decisions.

### 2. Semantic contracts for each pipeline stage

For each layer (retrieval, reasoning, response), the SSA defines:

- What goes in (input contract)
- What comes out (output contract)
- What quality guarantees apply (SLO)
- What happens when the contract is violated (fallback behavior)

### 3. Evaluation framework

The SSA designs the eval suite: what questions to test, what answers are acceptable, how to measure faithfulness, and what regression thresholds trigger alerts.

### 4. Failure mode catalog

The SSA catalogs what can go wrong and what the system should do in each case:

- Retrieval misses relevant content
- Retrieval returns irrelevant content
- Model hallucinates despite having good context
- Model ignores relevant context
- Source material is stale, conflicting, or sensitive
- User query is outside the supported domain

### 5. Operation runbook

The SSA contributes to the operational runbook: what to monitor, what alerts to set, how to triage incidents, and when to roll back.

---

## Most common failure modes

Understanding what goes wrong in RAG systems is as important as knowing how they work. Here are the failures the SSA should design against:

| Failure | Symptom | Root cause | Fix layer |
|---|---|---|---|
| Low recall | System says "I don't know" when the answer exists in the knowledge base | Bad chunking, poor embedding, missing metadata | Ingestion / Indexing |
| Low precision | System retrieves many passages but few are relevant | Overly broad search, no reranking, no metadata filtering | Retrieval / Reranking |
| Hallucination despite context | System invents facts even though relevant passages were retrieved | Weak grounding instructions, insufficient citation enforcement | Reasoning / Generation |
| Stale answers | System provides outdated information | No freshness tracking, no update cadence | Operations |
| Sensitive data leakage | System retrieves and surfaces confidential content | Missing sensitivity classification, no access control in retrieval | Ingestion / Retrieval |
| Cost/latency blow-up | System takes too long or costs too much per query | No query routing, no caching, no token budgets | Operations |

---

## Minimum metrics for a production RAG system

Before any RAG system can be considered production-ready, the SSA should verify that the following metrics are being tracked:

**Retrieval quality:**
- Recall at k per domain (are we finding the relevant passages?)
- Precision at k (are we avoiding irrelevant noise?)
- Mean Reciprocal Rank (is the best result near the top?)

**Generation quality:**
- Faithfulness score (is the answer grounded in the evidence?)
- Citation accuracy (do the citations point to real, relevant passages?)
- Abstention rate (when there is no evidence, does the system say so?)

**Operational health:**
- Latency P50 and P95 per stage (retrieval, reasoning, total)
- Cost per query (embedding, retrieval, generation)
- Knowledge base freshness (when was the most recent ingestion?)

**Safety and compliance:**
- Sensitive data exposure rate
- Policy violation rate
- Human escalation rate and reasons

---

## Expected deliverable

A versioned RAG architecture specification that includes:

- A knowledge domain map with source types, authority levels, and sensitivity classifications
- Semantic contracts for retrieval, reasoning, and response layers
- An evaluation suite with routine, edge-case, adversarial, and no-evidence test cases
- A failure mode catalog with designed responses for each failure
- An operational runbook with SLOs, alerts, and incident response procedures

This deliverable is the SSA's primary artifact for any RAG project. It governs the engineering implementation the way an architectural blueprint governs a construction project.

---

## Key takeaways

1. **Production RAG is a semantic design problem.** The SSA designs the meaning contracts that make the pipeline reliable. Engineering implements the plumbing.

2. **Separate the three layers.** Retrieval, reasoning, and response each have their own contract, their own failure modes, and their own metrics. Conflating them makes everything harder to debug.

3. **Measure retrieval independently.** If retrieval quality is bad, nothing downstream can compensate. Treat retrieval as a first-class subsystem with its own evaluation.

4. **Design for absence.** A production system must handle "I don't know" gracefully. The absence of evidence is not the evidence of absence, and the system must never fill gaps with silent guesswork.

5. **Choose the right pattern.** Naive RAG works for demos. Advanced RAG works for most production needs. Modular RAG works for complex, multi-domain, high-scale systems. The SSA selects the pattern based on requirements, not fashion.

---

## What comes next

In the next lesson, we go inside the first stage of the pipeline: **ingestion and indexing**. You will learn how the choices you make about chunking, metadata, and embedding models determine the ceiling of everything that follows.
