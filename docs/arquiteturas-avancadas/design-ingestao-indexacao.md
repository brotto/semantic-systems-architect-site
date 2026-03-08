---
sidebar_position: 3
title: Ingestion and Indexation
---

# Ingestion and Indexing Design

## Why ingestion is the foundation

Here is a truth that most RAG tutorials bury under retrieval tricks and prompt engineering techniques: **the quality ceiling of your entire RAG system is set at ingestion time.**

Think about it like a restaurant kitchen. The best chef in the world cannot make a good dish from rotten ingredients. If your vegetables arrive wilted, your fish arrives unfrozen and re-frozen, and your spices are unlabeled, no amount of cooking skill will produce a great meal. The quality of the output is bounded by the quality of the input.

In a RAG system, ingestion is the supply chain. It is where raw documents become structured, searchable, semantically enriched knowledge. Every decision you make here -- how you split documents, what metadata you attach, which embedding model you choose, how you handle updates -- determines what retrieval can find, what the model can reason over, and ultimately what the user receives.

Get ingestion right, and the rest of the pipeline has a fighting chance. Get it wrong, and you will spend months chasing downstream symptoms whose root cause is bad data.

---

## The ingestion pipeline

A production ingestion pipeline has six stages. Each stage has a clear purpose, a clear input, and a clear output. The SSA designs the semantic contracts for each stage; the engineering team implements the plumbing.

### Stage 1: Collection

**Purpose:** Gather raw documents from all knowledge sources.

**What this involves:**
- Identifying all source systems (document repositories, wikis, databases, APIs, file shares).
- Establishing access credentials and permissions.
- Defining collection schedules (real-time, hourly, daily, on-demand).
- Handling format diversity (PDF, HTML, Markdown, Word, plain text, spreadsheets).

**The SSA's role:** Create a source map that catalogs every knowledge source, its authority level, update frequency, sensitivity classification, and the contract for how it will be collected.

**Everyday analogy:** This is like a grocery buyer for a restaurant chain. They don't just show up at the market and grab whatever looks fresh. They have a list of approved suppliers, quality standards for each ingredient category, delivery schedules, and contingency plans for when a supplier can't deliver.

### Stage 2: Normalization

**Purpose:** Convert all collected documents into a consistent, clean format.

**What this involves:**
- Stripping formatting artifacts (headers, footers, page numbers, watermarks).
- Standardizing character encoding (UTF-8 everywhere).
- Extracting text from non-text formats (OCR for scanned PDFs, table extraction from spreadsheets).
- Preserving structural elements that carry meaning (headings, lists, tables, code blocks).
- Removing boilerplate (navigation menus, disclaimers, repeated footers).

**Why it matters:** If you skip normalization, your chunks will contain garbage -- page numbers mid-sentence, headers from unrelated sections, table formatting artifacts that confuse both embeddings and generation. The model doesn't know that "Page 47 of 231" is not part of the policy text. It just sees characters.

### Stage 3: Chunking

**Purpose:** Split normalized documents into semantic units that are appropriate for retrieval.

This is arguably the most consequential decision in the entire ingestion pipeline, and it is where the SSA's semantic judgment matters most. Chunking determines the granularity of retrieval. Chunk too small, and the model gets fragments without enough context. Chunk too large, and retrieval precision drops because the relevant sentence is buried in irrelevant paragraphs.

We will cover chunking strategies in detail in the next section.

### Stage 4: Metadata enrichment

**Purpose:** Attach structured metadata to each chunk that enables precise filtering and relevance assessment.

Metadata transforms retrieval from "find something vaguely similar" to "find the specific type of information I need, from the right source, for the right context." This is another area where the SSA's domain knowledge is essential.

We will cover metadata strategies in detail below.

### Stage 5: Embedding

**Purpose:** Convert each chunk of text into a dense vector representation that captures its semantic meaning.

**What this involves:**
- Selecting an appropriate embedding model.
- Running each chunk (and optionally its metadata) through the model.
- Handling edge cases: chunks that are too short for meaningful embeddings, chunks in multiple languages, chunks with heavy jargon.

### Stage 6: Indexing

**Purpose:** Store the embeddings and their associated metadata in a searchable index.

**What this involves:**
- Choosing an index architecture (vector store, hybrid index, multi-index).
- Configuring search parameters (distance metric, index type, query settings).
- Setting up access controls so that retrieval respects sensitivity classifications.
- Establishing backup and recovery procedures.

---

## Chunking strategies

Chunking is the art of splitting a document into pieces that are just the right size to be useful. There is no single correct approach -- the right strategy depends on your documents, your domain, and your queries.

### The book chapter analogy

Imagine you are preparing a reference library for a team of researchers. You have a 500-page textbook on clinical pharmacology. How should you organize it for quick reference?

- **Option A: Cut every 500 words.** You take the book and cut it into pieces exactly every 500 words, regardless of where sentences or sections begin and end. Page 47 might end mid-paragraph, and the next chunk starts with the second half of that paragraph. This is fast and mechanical, but a researcher who retrieves one of these chunks might get half of an idea with no context.

- **Option B: Cut by sections.** You follow the book's own structure: one chunk per section or subsection. Each chunk is a self-contained unit of meaning. The "Drug Interactions" section stays together. The "Dosing for Renal Impairment" subsection is its own chunk. A researcher who retrieves this gets a complete, coherent idea.

- **Option C: Create a hierarchy.** You organize at multiple levels: the chapter title and summary form one chunk, each section forms a chunk, and the chapter-level chunk references its children. A researcher can retrieve at the right level of detail -- a high-level overview or a specific detail -- depending on their query.

Each option corresponds to a chunking strategy used in practice.

### Strategy 1: Fixed-size chunking

Split text into chunks of a fixed number of tokens (e.g., 256, 512, 1024), usually with some overlap between consecutive chunks (e.g., 50 tokens of overlap).

**When to use:** When documents have no clear structure, when you need a quick baseline, or when processing speed matters more than retrieval precision.

**When to avoid:** When documents have clear sections, headings, or logical structure that would be destroyed by arbitrary cuts.

**Overlap:** Always use some overlap (10-20% of chunk size). Without overlap, important information at chunk boundaries is lost. A sentence that starts in chunk N and ends in chunk N+1 is invisible to retrieval on either chunk alone.

### Strategy 2: Semantic chunking

Split text at natural semantic boundaries: paragraph breaks, section headings, topic shifts. The chunk size is variable -- each chunk is as long as it needs to be to contain one coherent idea.

**When to use:** When documents have clear structure (policies, manuals, articles with headings), when retrieval precision matters, when the domain requires coherent reasoning over complete ideas.

**When to avoid:** When documents are extremely unstructured (chat logs, raw transcriptions without paragraphs).

**How to detect boundaries:** Use heading structure in the document, paragraph breaks, or algorithmic approaches that detect topic shifts by measuring embedding similarity between consecutive sentences.

### Strategy 3: Hierarchical chunking

Create chunks at multiple levels of granularity: document summaries, section chunks, and paragraph chunks. Parent chunks reference their children, and child chunks reference their parents.

**When to use:** When users might ask questions at different levels of specificity. "What does this regulation cover?" (needs the summary) vs. "What is the penalty for non-compliance in Section 4.2?" (needs the specific paragraph).

**When to avoid:** When all queries target roughly the same level of detail, or when the added complexity is not justified by the use case.

### Strategy 4: Document-aware chunking

Chunk according to the document type's inherent structure. For a legal contract, chunk by clause. For an FAQ, each question-answer pair is a chunk. For a table, each row or logical group of rows is a chunk. For code documentation, each function or class is a chunk.

**When to use:** When you have well-understood document types with consistent structure. This is the highest-quality chunking strategy for structured documents.

**When to avoid:** When document types are diverse and unpredictable, or when the effort of building type-specific parsers is not justified.

### Practical guidance for the SSA

The SSA should specify a chunking strategy document that answers these questions:

1. What are the document types in the knowledge base? (policies, manuals, research papers, FAQs, etc.)
2. For each document type, what is the natural unit of meaning? (section, paragraph, clause, Q&A pair)
3. What is the target chunk size range? (e.g., 200-800 tokens, with exceptions for naturally longer units)
4. How should overlap be handled?
5. What structural elements must be preserved in each chunk? (the section heading, the document title, the chapter reference)

---

## Metadata as semantic enrichment

Raw text chunks are like unlabeled boxes in a warehouse. You can search through them by opening each one and looking inside, but you cannot efficiently find what you need without labels on the outside.

Metadata is the label on the box. It tells the retrieval system what is inside each chunk without having to "open" it (compute semantic similarity). Good metadata enables precise filtering that dramatically improves retrieval quality.

### Essential metadata fields

| Field | Purpose | Example |
|---|---|---|
| `source_id` | Trace the chunk back to its origin document | `policy-handbook-v3.2` |
| `source_type` | Enable filtering by document category | `policy`, `faq`, `research`, `manual` |
| `section_path` | Preserve the document's hierarchical context | `Chapter 4 > Section 4.2 > Subsection 4.2.1` |
| `domain` | Enable domain-scoped retrieval | `human-resources`, `engineering`, `legal` |
| `sensitivity` | Enforce access control during retrieval | `public`, `internal`, `confidential`, `restricted` |
| `source_authority` | Weight retrieval by source reliability | `official-policy`, `team-wiki`, `individual-note` |
| `temporal_validity` | Flag stale content | `valid-from: 2025-01-01`, `valid-until: 2025-12-31` |
| `version` | Track document versions for rollback | `3.2` |
| `last_verified` | Support freshness monitoring | `2025-11-15` |
| `language` | Enable language-appropriate retrieval | `en`, `pt-br`, `es` |
| `entities` | Enable entity-based filtering | `["Product X", "Region: EMEA"]` |

### The supermarket analogy

Imagine two supermarkets. In the first, all products are thrown into bins by rough category: "food," "drinks," "cleaning." In the second, every product has a label with its name, brand, ingredients, nutritional information, allergen warnings, origin country, and expiration date.

Which supermarket can help you find "a gluten-free Italian pasta sauce with low sodium, expiring no sooner than next month"?

That is the difference between chunks with no metadata and chunks with rich metadata. The richer the metadata, the more precisely retrieval can target exactly what the user needs.

### Metadata as SSA design artifact

The SSA defines the metadata schema for the knowledge base. This is a first-class design artifact -- not an afterthought. The schema should specify:

- What fields are mandatory for every chunk
- What fields are conditional (depend on source type)
- What controlled vocabularies apply (e.g., a fixed list of domains, sensitivity levels, authority levels)
- Who is responsible for populating each field (automated extraction vs. human annotation)
- How fields are validated (e.g., `temporal_validity` must be a valid date range)

---

## Embedding model selection

The embedding model is the translator that converts human-readable text into mathematical vectors. The quality of this translation directly determines the quality of vector search.

### General-purpose vs. domain-specific models

**General-purpose models** (e.g., OpenAI `text-embedding-3-large`, Cohere `embed-v3`, open-source models like `BGE` or `E5`) work well across a wide range of topics. They are a good default choice.

**Domain-specific models** are fine-tuned on specialized corpora (medical, legal, financial). They produce better embeddings for domain-specific terminology and concepts. If your knowledge base is heavily specialized, they may significantly improve retrieval quality.

**When to invest in domain-specific embeddings:** When evaluation shows that general-purpose models consistently fail to retrieve relevant results for domain-specific queries, especially those involving specialized terminology that has different meanings in general vs. domain context.

### Multilingual considerations

If your knowledge base contains documents in multiple languages, or if users query in one language and the relevant documents are in another, you need a multilingual embedding model. These models map semantically equivalent texts in different languages to nearby vectors.

### Embedding dimensions and cost

Higher-dimensional embeddings capture more nuance but cost more to store and search. Lower-dimensional embeddings are cheaper but may lose fine-grained distinctions. Most production systems use 768 to 3072 dimensions. The SSA should work with engineering to test different dimensionalities against retrieval quality benchmarks to find the right tradeoff.

---

## Index architecture

The index is the data structure that makes retrieval fast. There are several architecture options, and the choice depends on your scale, query patterns, and quality requirements.

### Vector stores

A pure vector store indexes embeddings and supports similarity search (nearest-neighbor lookup). This is the core of any RAG system.

**When sufficient:** When your queries are primarily semantic ("find passages that mean something similar to this query") and metadata filtering needs are simple.

### Hybrid indexes (vector + keyword)

A hybrid index combines vector similarity search with traditional keyword search. The results from both are merged and re-scored.

**When to use:** When your domain includes exact terms that must match precisely -- product codes, regulation numbers, proper nouns, technical abbreviations. Vector search alone may miss these because "REG-2024-0147" is semantically meaningless -- it is a string that must be matched literally.

### Multi-index strategies

Instead of one large index, maintain separate indexes for different document types, domains, or sensitivity levels. Route queries to the appropriate index based on classification.

**When to use:** When your knowledge base spans multiple domains with very different vocabularies, when access control requires strict separation, or when different document types benefit from different chunking and embedding strategies.

---

## Quality gates for ingestion

A production ingestion pipeline does not just process documents. It validates them. Quality gates are checkpoints that prevent bad data from entering the index.

### Gate 1: Input validation

Before processing, verify that the document is:
- In a supported format
- Not corrupted (readable, complete)
- Not a duplicate of an existing document (or is a legitimate new version)
- Within expected size bounds

### Gate 2: Normalization quality

After normalization, verify that:
- Text has been extracted cleanly (no garbled characters, no missing sections)
- Structural elements have been preserved (headings are still headings, tables are still tables)
- Boilerplate has been removed without removing substantive content

### Gate 3: Chunk quality

After chunking, verify that:
- No chunk is below a minimum length threshold (a 10-word chunk is rarely useful)
- No chunk exceeds a maximum length threshold (a 5,000-token chunk defeats the purpose of chunking)
- Each chunk has all mandatory metadata fields populated
- The chunk makes sense as a standalone unit (spot-check a random sample)

### Gate 4: Deduplication

Before indexing, check for:
- Exact duplicates (same text from different sources or collection runs)
- Near-duplicates (slightly different versions of the same content)
- Superseded content (an older version that should be replaced by a newer one, not added alongside it)

### Gate 5: Freshness policy

For each indexed chunk, enforce:
- A maximum age based on the source's update frequency
- A review date by which the content must be re-verified or removed
- A tombstone process for content that has been officially retired

---

## Update strategies

A knowledge base is not static. Documents are added, updated, and retired. The SSA must design an update strategy that keeps the index current without destabilizing it.

### Incremental updates

Process only new or changed documents. Re-embed and re-index only the affected chunks. Leave unchanged content untouched.

**When to use:** For knowledge bases that change frequently (daily or weekly) with relatively small changes.

### Full rebuild

Drop the entire index and rebuild it from scratch with the latest collection.

**When to use:** When the metadata schema changes, when the embedding model is updated, when the chunking strategy is revised, or as a periodic "clean slate" operation (e.g., monthly) to eliminate accumulated drift.

### Tombstoning

When a document is retired, do not simply delete its chunks from the index. Mark them as tombstoned (inactive) so they are excluded from retrieval but remain available for audit, debugging, and historical analysis.

**When to use:** In regulated domains where you need to prove what the system knew (or did not know) at a specific point in time.

---

## Key takeaways

1. **Ingestion sets the quality ceiling.** No downstream optimization can overcome bad chunking, missing metadata, or poor embeddings. Invest your design effort here first.

2. **Chunk by meaning, not by character count.** Respect the document's own structure. A section is a better chunk boundary than an arbitrary 512-token window.

3. **Metadata is not optional.** Rich metadata transforms retrieval from "vaguely similar" to "precisely relevant." Design your metadata schema as a first-class SSA artifact.

4. **Validate at every stage.** Quality gates prevent garbage from entering the index. It is far cheaper to reject bad input than to debug bad output.

5. **Plan for change.** Knowledge bases are living systems. Design your update strategy before you index a single document.

---

## What comes next

Now that you understand how knowledge enters the system, the next lesson covers how it comes back out: **retrieval and reranking**. You will learn how queries are understood, how multiple search strategies are combined, and how retrieved results are ranked and assembled into the model's context window.
