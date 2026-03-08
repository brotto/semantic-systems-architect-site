---
sidebar_position: 4
title: Retrieval and Reranking
---

# Retrieval and Reranking

## The moment of truth

If ingestion is the supply chain, retrieval is the moment of truth: the instant when a user's question meets your knowledge base and the system must decide what information is relevant.

Think about a courtroom. The prosecutor asks a witness a question. The witness has years of memories, thousands of experiences, and stacks of documents. But only a few specific pieces of evidence are relevant to this particular question, at this particular moment, in this particular context. The quality of the testimony depends entirely on the witness's ability to recall the right information and present it clearly.

A RAG retrieval system is that witness. It has a vast knowledge base, but for each query, it must select the handful of passages that actually help answer the question -- and rank them so the most important evidence appears first.

This lesson covers how to make that process reliable.

---

## Query understanding

Before you can retrieve the right information, you need to understand what the user is actually asking. This sounds obvious, but it is where many RAG systems fail silently.

### Why raw queries are not enough

Users do not write queries the way documents are written. A user might type:

- "refund policy for damaged items" (keyword-style, terse)
- "Can I get my money back if the product arrived broken?" (conversational, implicit)
- "What's the difference between the standard and premium warranty?" (comparative, multi-faceted)
- "REG-2024-0147 section 3.2" (exact reference, no semantic content)

Each of these queries has a different structure, different intent, and different retrieval needs. Sending them all through the same embedding-and-search pipeline will produce mediocre results for most of them.

### Intent classification

The first step in query understanding is classifying the intent. What kind of answer does the user expect?

| Intent | Example | Retrieval strategy |
|---|---|---|
| Factual lookup | "What is the return window for electronics?" | Single-hop: find the specific passage that states the policy |
| Comparison | "How does Plan A differ from Plan B?" | Multi-hop: retrieve information about both plans, then present side-by-side |
| Procedural | "How do I file a warranty claim?" | Sequential: find the step-by-step process |
| Analytical | "Why have support tickets increased this quarter?" | Broad recall: retrieve multiple data sources and synthesize |
| Exact reference | "Show me Section 4.2 of the compliance manual" | Metadata-based: filter by document and section, no semantic search needed |

The SSA designs the intent taxonomy for the domain. The engineering team implements the classifier (which can be as simple as a few-shot prompted language model or as sophisticated as a fine-tuned classifier).

### Query expansion

Once you understand the intent, you can improve the query before sending it to search. Query expansion means generating additional search terms or reformulations that increase recall.

**Synonym expansion:** "refund" might not appear in the policy document that uses the word "reimbursement." Expanding the query to include synonyms helps.

**Abbreviation resolution:** "REG" might mean "regulation" in this domain. "SLA" might mean "service level agreement." Resolving these before search prevents misses.

**Contextual enrichment:** If the user's previous messages indicate they are asking about the European market, the query can be enriched with that context even if the current message does not mention it.

### Query decomposition

Some queries are actually multiple questions wrapped in one. "What is the refund policy for electronics and how does it differ for items purchased on sale?" contains two sub-questions:

1. What is the refund policy for electronics?
2. How does the policy differ for sale items?

Decomposing the query and running separate retrievals for each sub-question often produces better results than trying to retrieve for the compound query as a whole.

---

## Hybrid search: the net and the hook

Here is one of the most important architectural decisions in any RAG system: how to combine different search strategies.

### The fishing analogy

Imagine you are fishing in a lake. You have two tools:

**A wide net** (vector search). You cast it broadly across the lake and pull in everything within a certain area. You catch many fish, including the ones you want, but also some you don't. The net is great for catching fish you didn't even know were there -- it discovers based on proximity.

**A precise hook** (keyword search). You bait it with exactly the right lure for the specific fish you want. You catch fewer fish, but almost every catch is exactly what you were looking for. The hook is great for targets you can name precisely.

Neither tool alone is optimal. The net has great recall (catches many relevant fish) but poor precision (also catches irrelevant ones). The hook has great precision (catches exactly the right fish) but poor recall (misses relevant fish that weren't attracted to that exact bait).

**Hybrid search combines both.** Cast the net and drop the hook simultaneously. Merge the catches. Remove duplicates. Rank by how relevant each catch is.

### Vector similarity search

Vector search embeds the query into the same vector space as the document chunks and finds the nearest neighbors. It excels at:

- **Semantic matching:** Finding passages that mean the same thing even when they use completely different words. "How do I get my money back?" matches a passage about "refund procedures."
- **Fuzzy matching:** Tolerating spelling variations, paraphrases, and different levels of specificity.
- **Discovery:** Surfacing relevant passages that the user might not have known to ask about.

Vector search struggles with:

- **Exact terms:** Product codes, regulation numbers, proper nouns, and technical abbreviations have no semantic meaning in vector space. "REG-2024-0147" is just a string.
- **Negation and subtle logic:** "Which policies do NOT apply to part-time employees?" is hard to match semantically, because the relevant passage might discuss the policy without using negation.

### Lexical keyword search

Keyword search (BM25, TF-IDF, or similar) matches exact terms and calculates relevance based on term frequency and document statistics. It excels at:

- **Exact term matching:** Product codes, names, identifiers, and technical terms.
- **High precision for specific queries:** When the user knows exactly what they are looking for and uses the right vocabulary.
- **Transparency:** It is easy to explain why a result was returned -- the query terms appear in the passage.

Keyword search struggles with:

- **Semantic gaps:** If the query says "car" and the document says "automobile," keyword search misses it.
- **Context sensitivity:** The same keyword can have different meanings in different contexts. "Java" means one thing to a programmer and another to a geographer.

### Combining the results

Hybrid search runs both strategies and merges the results. The key design decision is **how to merge and re-score.**

**Simple approach: Reciprocal Rank Fusion (RRF).** Each result gets a score based on its rank in each result list. Results that appear in both lists get boosted. This is parameter-light and works surprisingly well.

**Weighted approach:** Assign different weights to vector and keyword results based on the query type. For a semantic question, weight vector results higher. For an exact reference query, weight keyword results higher.

**Learned approach:** Train a model to combine the scores based on relevance judgments. This is the most accurate but requires training data.

The SSA specifies the merging strategy as part of the retrieval contract. The choice should be informed by evaluation data: which approach produces the best precision and recall for your domain's typical queries.

---

## Reranking: the second opinion

Initial retrieval -- whether vector, keyword, or hybrid -- is fast but rough. It uses lightweight methods that can scan millions of documents in milliseconds. The tradeoff is accuracy. The initial top-20 results are a good starting pool, but their ranking is approximate.

Reranking is the process of taking those initial results and re-scoring them with a more powerful (and slower) model to produce a more accurate ranking.

### Why initial retrieval is not enough

Think of it like the admissions process at a selective university. The first round is a quick screen: GPA, test scores, basic qualifications. This filters 10,000 applications down to 500. But the first round cannot tell you who the truly best candidates are -- it can only eliminate the clearly unqualified ones.

The second round is a deep review: essays, recommendations, interviews, portfolio. This is slower and more expensive, but it produces a much more accurate ranking of the 500 finalists.

In RAG:
- **Initial retrieval** is the first round. Fast, approximate, broad.
- **Reranking** is the second round. Slow, precise, discriminating.

### Cross-encoder reranking

The most common reranking approach uses a cross-encoder model. Unlike the embedding model (which encodes the query and each document independently), the cross-encoder takes the query and a candidate passage as a pair and produces a single relevance score.

This pair-wise comparison is far more accurate because the model can directly assess how the query and passage relate to each other, including subtleties like negation, partial relevance, and conditional applicability.

**The tradeoff:** Cross-encoder reranking is computationally expensive. You cannot run it over millions of documents. That is why it is used only on the shortlist from initial retrieval (typically 20-100 candidates).

### Diversity-aware reranking

Sometimes the top results are all semantically similar -- they come from the same document, cover the same aspect of the topic, or repeat the same information in slightly different words. This is redundant. The model does not need five passages saying the same thing.

Diversity-aware reranking balances relevance with coverage. It ensures that the final selection represents different aspects, different sources, and different perspectives on the topic.

**Practical approach:** After scoring by relevance, use a Maximal Marginal Relevance (MMR) algorithm to iteratively select results that are both relevant and dissimilar to already-selected results.

---

## Context window management

Once you have your ranked, reranked, diversity-balanced results, you need to fit them into the model's context window. This is not just a mechanical task. It is a design decision with significant impact on answer quality.

### Token budgets

Every model has a finite context window. Every token spent on retrieved passages is a token not available for the system prompt, the conversation history, or the model's own reasoning.

The SSA should define a token budget that allocates the context window across these needs:

| Component | Typical allocation | Purpose |
|---|---|---|
| System prompt | 500-2,000 tokens | Instructions, persona, constraints |
| Conversation history | 500-2,000 tokens | Recent user messages for context |
| Retrieved passages | 2,000-6,000 tokens | Evidence for answering the query |
| Generation headroom | 1,000-2,000 tokens | Space for the model's response |

These numbers vary by model and use case. The principle is: **allocate the budget deliberately, not by accident.**

### Relevance-ordered packing

The order in which passages appear in the context matters. Research consistently shows that models pay more attention to content at the beginning and end of the context window, and less attention to content in the middle (the "lost in the middle" effect).

**Best practice:** Place the most relevant passages first. If you have space for five passages, passage 1 should be the most relevant, passage 2 the second most relevant, and so on.

**Alternative: sandwich approach.** Place the most relevant passages at the beginning and end, with less relevant ones in the middle. Some teams report this reduces the "lost in the middle" effect.

The SSA should specify the packing strategy and test it as part of the evaluation suite.

### Citation preservation

Each passage in the context window must carry a citation identifier that the model can reference in its answer. Without citations, the answer is unverifiable -- the user cannot check whether the model's claims are actually supported by the evidence.

**Practical format:** Prefix each passage with a clear identifier:

```
[Source: Policy Handbook v3.2, Section 4.1, Last updated: 2025-03-01]
Passage text here...

[Source: FAQ - Returns and Refunds, Updated: 2025-01-15]
Passage text here...
```

The model's generation instructions should require citing these identifiers when making factual claims.

---

## Retrieval contracts

The SSA defines the retrieval contract: a formal specification of what the retrieval system receives, what it returns, and what guarantees it makes.

### Input contract

```
Query:
  - text: string (the user's question, possibly transformed)
  - intent: enum (factual, comparison, procedural, analytical, exact_reference)
  - filters:
    - domain: string[] (optional - restrict to specific domains)
    - recency: date_range (optional - restrict to recent content)
    - sensitivity: enum (optional - maximum sensitivity level the user may access)
    - source_type: string[] (optional - restrict to specific document types)
  - parameters:
    - top_k_initial: integer (how many candidates for reranking)
    - top_k_final: integer (how many passages to return after reranking)
    - token_budget: integer (maximum total tokens across all returned passages)
```

### Output contract

```
Results:
  - passages: list of:
    - text: string (the passage content)
    - relevance_score: float (0-1, after reranking)
    - source_metadata:
      - source_id: string
      - source_type: string
      - section_path: string
      - version: string
      - last_verified: date
      - sensitivity: enum
      - authority: enum
    - citation_id: string (unique identifier for citation in generation)
  - retrieval_metadata:
    - search_strategy: enum (vector, keyword, hybrid)
    - reranking_applied: boolean
    - total_candidates_considered: integer
    - retrieval_latency_ms: integer
```

### Quality guarantees

The SSA specifies the quality guarantees as measurable SLOs:

- **Relevance:** At least one of the top-3 results is relevant to the query in 90% or more of in-domain queries.
- **Latency:** Retrieval completes within 500ms at P95.
- **Coverage:** The system returns results for 95% or more of in-domain queries (the remaining 5% return an explicit "no relevant results found" response).
- **Freshness:** No result returned has a `last_verified` date older than the domain's freshness policy (e.g., 90 days for policies, 30 days for product information).

---

## Guardrails for retrieval

Not every retrieval result should reach the model. The SSA designs guardrails that filter or flag problematic results before they enter the context window.

### Relevance threshold

If no result scores above a minimum relevance threshold, the system should not force-feed low-quality passages to the model. Instead, it should trigger the "no relevant evidence" pathway, which produces a response like: "I could not find specific information about that in our knowledge base."

Forcing irrelevant passages into the context is worse than providing none, because the model may try to answer using tangentially related information and produce a confidently wrong response.

### Conflict detection

When multiple retrieved passages contradict each other -- one policy document says "30-day return window" and another says "14-day return window" -- the system should flag the conflict rather than letting the model arbitrarily choose one.

The SSA designs the conflict response: surface both sources to the user with a note that the information appears inconsistent, and recommend verifying with the authoritative source.

### Sensitivity enforcement

Retrieval must respect access controls. If a user does not have clearance for confidential documents, those documents must be excluded from retrieval results -- not just hidden from the final response but excluded from the search entirely. The model should never see content the user is not authorized to access.

### Staleness warning

If the most relevant passage has a freshness flag indicating it may be outdated, the system should include a warning in the response: "This information was last verified on [date]. Please confirm it is still current."

---

## Key takeaways

1. **Understand the query before you search.** Intent classification, query expansion, and decomposition transform mediocre retrieval into precise retrieval. The few milliseconds spent understanding the question save seconds of bad results.

2. **Use hybrid search.** Vector search and keyword search are complementary. Use both, and design a merging strategy appropriate for your domain.

3. **Reranking is not optional in production.** Initial retrieval is fast and approximate. Reranking with a cross-encoder or similar model is slower but dramatically more accurate. Budget the latency.

4. **Manage the context window deliberately.** Token budgets, relevance ordering, and citation preservation are design decisions, not implementation details. The SSA specifies them.

5. **Define the retrieval contract.** Inputs, outputs, quality guarantees, and guardrails should be explicit and measurable. When retrieval fails, the contract tells you what went wrong and where to fix it.

---

## What comes next

You now understand how knowledge is ingested, indexed, and retrieved. The next lesson addresses the question that follows naturally: **how do you know it's working?** We will cover the four layers of RAG evaluation -- retrieval quality, generation quality, end-to-end task quality, and safety compliance -- with practical guidance on building evaluation suites that catch problems before your users do.
