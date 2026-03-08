---
sidebar_position: 7
title: RAG Production Lab
---

# Lab -- Production RAG Architecture

## The challenge

You are the Semantic Systems Architect for a company that needs to build a production RAG system for a high-volume document base. The company has thousands of internal documents -- policies, manuals, technical specifications, FAQs, training materials, and regulatory filings -- and needs a system that lets employees ask questions in natural language and receive accurate, cited, up-to-date answers.

The system will serve 2,000+ users across multiple departments, handle 500+ queries per day, and operate in a domain where incorrect answers have real consequences (compliance, customer commitments, operational procedures).

Your job is not to build the system. Your job is to design the architecture -- the complete semantic specification that an engineering team can implement with confidence.

---

## Scenario details

**Company:** A mid-sized financial services firm with 3,000 employees across five offices.

**Document base:**
- 1,200 policy documents (HR, compliance, operations, IT security) -- updated quarterly
- 800 product manuals and specifications -- updated on product release cycles
- 3,000 FAQ entries across customer support, internal IT, and compliance -- updated weekly
- 200 regulatory filings and legal documents -- updated on regulatory change
- 500 training materials and onboarding guides -- updated semi-annually
- Total: approximately 5,700 documents, 15 million tokens of content

**Users:**
- Customer support agents (need quick, accurate answers about products and policies)
- Compliance officers (need precise regulatory information with citations)
- HR staff (need policy details for employee inquiries)
- IT support (need technical procedures and troubleshooting guides)
- New employees (need onboarding information)

**Constraints:**
- Some documents are confidential (accessible only to specific departments)
- Regulatory documents must never be paraphrased inaccurately -- citations are mandatory
- The system must indicate when information may be outdated
- Response latency must be under 5 seconds for 95% of queries
- The system must handle "I don't know" gracefully -- guessing is not acceptable

---

## Mandatory deliverables

Your architecture specification must include the following five deliverables. Each deliverable maps to a lesson in this trail.

### Deliverable 1: Source map and ingestion policy

Design the complete ingestion architecture.

**What to include:**

- A catalog of all source types with their characteristics (format, update frequency, sensitivity level, authority level)
- The collection strategy for each source type (how documents are gathered, how often, from where)
- The normalization pipeline (how each format is converted to clean, structured text)
- The chunking strategy for each document type (which chunking approach, target chunk size, overlap handling, structural preservation)
- The metadata schema (mandatory fields, conditional fields, controlled vocabularies, validation rules)
- The embedding model selection and rationale
- The index architecture (single vs. multi-index, vector vs. hybrid)
- Quality gates at each pipeline stage
- The update strategy (incremental vs. full rebuild, tombstoning, freshness policies)

**Evaluation criteria for this deliverable:**
- Does the source map cover all document types with appropriate detail?
- Is the chunking strategy appropriate for each document type (not one-size-fits-all)?
- Is the metadata schema rich enough to enable precise retrieval?
- Are quality gates defined at each stage?
- Is the update strategy realistic for the stated update frequencies?

### Deliverable 2: Retrieval and reranking configuration

Design the complete retrieval architecture.

**What to include:**

- The query understanding pipeline (intent classification taxonomy, query expansion strategy, decomposition rules)
- The search strategy (vector, keyword, or hybrid -- with rationale)
- The reranking approach (cross-encoder selection, diversity handling)
- The context window management plan (token budgets, packing strategy, citation format)
- The retrieval contract (input specification, output specification, quality guarantees)
- Guardrails (relevance thresholds, conflict handling, sensitivity enforcement, staleness warnings)

**Evaluation criteria for this deliverable:**
- Does the intent taxonomy cover the expected query types for this user base?
- Is hybrid search appropriately configured for a domain that includes both natural language questions and exact references (regulation numbers, policy codes)?
- Is the token budget realistic for the model's context window?
- Are guardrails specific and actionable (not vague aspirations)?

### Deliverable 3: Evaluation suite

Design the complete evaluation framework.

**What to include:**

- A golden dataset of at least 60 test cases distributed across categories:
  - 30 routine queries (common questions from each user group)
  - 10 edge cases (ambiguous queries, cross-domain questions, queries requiring multiple sources)
  - 10 adversarial queries (attempts to extract confidential information, prompt injection, requests for out-of-scope advice)
  - 10 no-evidence queries (questions the knowledge base cannot answer)
- For each test case: the query, expected relevant passages, expected answer key points, forbidden content, and applicable policies
- Metrics with target thresholds for each evaluation layer (retrieval, generation, end-to-end, safety)
- The evaluation procedure (automated metrics, LLM-as-judge configuration, human review schedule)
- Regression detection thresholds for knowledge base updates

**Evaluation criteria for this deliverable:**
- Do the test cases represent realistic queries for this user base and domain?
- Is the distribution across categories reasonable?
- Are the metrics and thresholds appropriate for a compliance-sensitive domain?
- Is the evaluation procedure practical (can it actually be run regularly)?

### Deliverable 4: Failure mode catalog

Design explicit responses for every anticipated failure.

**What to include:**

For each failure mode, document:
- The failure description
- How it is detected (symptoms, metrics)
- The system's designed response (what the user sees)
- The operational response (what the team does)
- Prevention measures

**Minimum failure modes to address:**

| Failure | Category |
|---|---|
| Retrieval returns no relevant results | Retrieval |
| Retrieval returns results from the wrong domain | Retrieval |
| Model hallucinates a policy that does not exist | Generation |
| Model provides an answer based on outdated content | Freshness |
| User requests confidential information they should not access | Security |
| User asks a question outside the system's scope | Boundary |
| Multiple sources provide contradictory information | Conflict |
| The ingestion pipeline fails silently for 48 hours | Operations |
| A new document is added that degrades retrieval for existing queries | Regression |
| Cost per query spikes unexpectedly | Operations |

**Evaluation criteria for this deliverable:**
- Is every common failure mode addressed?
- Are the detection mechanisms realistic (not just "monitor for issues")?
- Are the designed responses appropriate (not just "show an error")?
- Are the prevention measures actionable?

### Deliverable 5: Operation runbook with SLOs and alerts

Design the operational framework.

**What to include:**

- SLO table with targets and rationale for each metric
- Monitoring dashboards (what metrics, what visualizations, what time windows)
- Alert definitions (trigger conditions, severity levels, notification channels)
- Incident response procedures for each incident type (retrieval failure, generation failure, stale content, security breach)
- Scaling strategy (how the system handles growth in queries, documents, and users)
- Cost optimization plan (caching, routing, token budgets)
- Operational cadence (daily, weekly, monthly tasks with responsibilities)

**Evaluation criteria for this deliverable:**
- Are the SLOs appropriate for a compliance-sensitive financial services domain?
- Are the alerts specific enough to be actionable (not "something is wrong")?
- Does the incident response procedure provide clear steps (not just "investigate")?
- Is the cost optimization plan realistic?

---

## Working phases

This lab is designed to be completed over four phases. Each phase builds on the previous one.

### Phase 1: Discovery and source mapping (estimated time: 2-3 hours)

- Analyze the document base and user groups
- Create the source map with all document types and their characteristics
- Design the metadata schema
- Define the chunking strategy for each document type
- Produce Deliverable 1

### Phase 2: Retrieval architecture (estimated time: 2-3 hours)

- Design the query understanding pipeline
- Configure the search and reranking strategy
- Define the retrieval contract and guardrails
- Design the context window management plan
- Produce Deliverable 2

### Phase 3: Evaluation and failure handling (estimated time: 3-4 hours)

- Build the golden dataset (60 test cases)
- Define metrics and thresholds
- Design the evaluation procedure
- Catalog all failure modes with designed responses
- Produce Deliverables 3 and 4

### Phase 4: Operations design (estimated time: 2-3 hours)

- Define SLOs and monitoring dashboards
- Write the incident response runbook
- Design the scaling and cost optimization strategy
- Define the operational cadence
- Produce Deliverable 5

**Total estimated time: 9-13 hours.** This is not a weekend exercise. It is a thorough architecture design that mirrors what an SSA would produce for a real project.

---

## Evaluation rubric

Your architecture will be evaluated across five dimensions. Each dimension is scored on a 4-point scale.

### Dimension 1: Retrieval relevance (25%)

| Score | Description |
|---|---|
| 4 - Excellent | Chunking, metadata, and retrieval strategies are tailored to each document type and user group. Hybrid search is well-configured. Reranking addresses both relevance and diversity. |
| 3 - Good | Strategies are appropriate and well-reasoned. Minor gaps in handling specific document types or query patterns. |
| 2 - Adequate | Strategies work for the common case but do not handle edge cases or diversity across document types. |
| 1 - Insufficient | One-size-fits-all approach. No differentiation by document type or query intent. |

### Dimension 2: Faithfulness and citation (25%)

| Score | Description |
|---|---|
| 4 - Excellent | Grounding is enforced through system design, not just prompt instructions. Citation format is precise. Abstention policies are well-defined. Faithfulness is measured rigorously. |
| 3 - Good | Grounding is addressed through clear instructions and evaluation. Citations are required. Minor gaps in abstention design. |
| 2 - Adequate | Citations are mentioned but not systematically enforced. Faithfulness measurement is vague. |
| 1 - Insufficient | No systematic approach to grounding or citation. |

### Dimension 3: Risk control (20%)

| Score | Description |
|---|---|
| 4 - Excellent | Sensitivity classification is thorough. Access controls are enforced at the retrieval layer. Failure modes are cataloged with specific responses. Adversarial scenarios are addressed. |
| 3 - Good | Sensitivity is addressed. Most failure modes are covered. Minor gaps in adversarial handling. |
| 2 - Adequate | Basic sensitivity controls exist. Failure handling is generic. |
| 1 - Insufficient | Security and failure handling are afterthoughts. |

### Dimension 4: Operational viability (20%)

| Score | Description |
|---|---|
| 4 - Excellent | SLOs are specific and measurable. Monitoring covers all three dashboards. Incident runbook provides clear diagnostic paths. Cost optimization is practical. |
| 3 - Good | SLOs and monitoring are well-defined. Runbook is useful but could be more specific. |
| 2 - Adequate | Basic SLOs exist. Monitoring is generic. Runbook is high-level. |
| 1 - Insufficient | No operational plan. |

### Dimension 5: Evaluation rigor (10%)

| Score | Description |
|---|---|
| 4 - Excellent | Golden dataset is diverse and realistic. All four evaluation layers are covered. Regression thresholds are defined. The evaluation procedure is practical and repeatable. |
| 3 - Good | Good test coverage with minor gaps. Evaluation procedure is defined. |
| 2 - Adequate | Test cases exist but are limited in diversity. Not all layers are covered. |
| 1 - Insufficient | No evaluation framework. |

### Passing score

To pass this lab, you need an overall weighted score of 3.0 or higher, with no individual dimension below 2.0.

---

## Submission format

Your submission should be a single document (or a structured set of documents) containing all five deliverables, clearly labeled and cross-referenced. Use tables, diagrams, and structured formats wherever possible -- this is an architecture specification, not a narrative essay.

Include a one-page executive summary at the top that explains:
- The overall architecture pattern you chose (naive, advanced, or modular RAG) and why
- The three most important design decisions you made and their rationale
- The single biggest risk in this system and how your architecture mitigates it

---

## Key takeaways

1. **This lab integrates everything.** Every lesson in this trail -- ingestion, retrieval, evaluation, operations -- comes together in a single, coherent architecture. If you find gaps in your knowledge, revisit the relevant lesson before completing the deliverable.

2. **Design decisions require rationale.** Do not just state what you would do. Explain why. The best architectures are the ones where every decision can be traced back to a requirement, a constraint, or a risk.

3. **Think about the users.** Five different user groups with different needs, different permissions, and different expectations. Your architecture must serve all of them without compromising any of them.

4. **Production means failure planning.** A design that only describes the happy path is incomplete. The failure mode catalog and the incident runbook are not optional -- they are what separate a production architecture from a prototype sketch.

Good luck. Design well.
