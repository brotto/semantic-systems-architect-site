---
sidebar_position: 6
title: Operation and Runbook
---

# RAG Operations in Production

## The shift from building to running

Building a RAG system is a project. Operating a RAG system is a discipline.

Think about the difference between building a house and living in one. Building requires architects, engineers, and construction crews working intensely for months. Living in the house requires something entirely different: regular maintenance, plumbing repairs, heating inspections, a functioning smoke detector, and a plan for what to do when the power goes out. The skills are different. The timeline is different. The mindset is different.

Most RAG tutorials focus exclusively on building. This lesson focuses on living -- on the daily, weekly, and monthly practices that keep a production RAG system healthy, reliable, and cost-effective.

---

## RAG-specific SLOs

Service Level Objectives (SLOs) define what "healthy" means in measurable terms. A RAG system needs SLOs that go beyond standard API health metrics because RAG has failure modes that are invisible to generic monitoring.

Your web server can return 200 OK while your RAG system returns a perfectly formatted, confidently worded, completely wrong answer. Standard health checks will not catch this. RAG-specific SLOs will.

### Recommended SLOs

| SLO | Target | Why it matters |
|---|---|---|
| **Retrieval latency (P95)** | < 500ms | Users will not wait. High retrieval latency usually indicates index issues or inefficient search |
| **End-to-end latency (P95)** | < 3s | Total time from query to response. Includes retrieval, reranking, generation, and validation |
| **Retrieval hit rate** | > 95% for in-domain queries | Percentage of queries where at least one relevant passage is retrieved. A drop signals ingestion or index problems |
| **Citation accuracy** | > 90% | Percentage of generated citations that point to real, relevant sources. Low citation accuracy means the model is hallucinating its references |
| **Faithfulness score** | > 0.90 | Percentage of factual claims in generated answers that are supported by retrieved evidence. The most critical quality SLO |
| **Abstention rate** | Within expected range | Rate at which the system says "I don't know." Too low suggests the system is guessing. Too high suggests retrieval is broken |
| **Freshness compliance** | 100% | No response based on content older than the domain's freshness policy. A stale answer to a policy question can be worse than no answer |
| **Sensitivity violation rate** | 0% | Number of times the system surfaces content that the user should not have access to. This is a hard zero -- any violation is an incident |

### Setting SLO targets

SLO targets should be based on:

1. **Business requirements.** If the RAG system supports customer-facing interactions, latency and accuracy requirements are stricter than for an internal research tool.
2. **Baseline measurement.** Before setting targets, measure the current system's performance. Set targets that are achievable improvements over the baseline, not aspirational numbers pulled from the air.
3. **Domain-specific risk.** In healthcare or legal domains, faithfulness and citation accuracy targets should be higher because the cost of error is higher.

---

## Knowledge base operations

The knowledge base is a living system. Documents are added, updated, retired, and occasionally discovered to be wrong. Managing this lifecycle is a core operational responsibility.

### Update cadence

How often should the knowledge base be refreshed? The answer depends on how fast the underlying information changes.

| Source type | Typical update cadence | Example |
|---|---|---|
| Regulatory/legal | On change (with human review) | Tax codes, compliance regulations |
| Company policies | Weekly or on change | HR handbook, refund policies |
| Product information | Daily or on change | Pricing, feature specifications |
| Knowledge articles | Daily | Support documentation, FAQs |
| Research/reports | On publication | Industry reports, internal analyses |

**The SSA specifies the update cadence for each source type as part of the ingestion contract.** The operations team automates the collection and processing; the SSA defines when and how frequently it should happen.

### Stale content detection

Stale content is one of the most insidious RAG failure modes. The system continues to serve answers with high confidence, but the underlying information is outdated. The user has no way to know unless the system explicitly warns them.

**Detection strategies:**

- **Expiration dates.** Every chunk has a `valid_until` or `next_review` date in its metadata. A background job flags content that has passed its expiration without being refreshed.
- **Source monitoring.** Track the last modification time of source documents. If a source document changes but the index has not been updated, flag the discrepancy.
- **User feedback signals.** Track cases where users report that an answer is outdated or incorrect. Correlate with the source documents to identify stale content.

**Response to stale content:**

1. Immediately exclude confirmed stale content from retrieval (tombstone it).
2. Trigger a re-ingestion of the updated source document.
3. If the updated document is not yet available, adjust the system to include a freshness warning in responses that rely on content near its expiration date.

### Source reliability monitoring

Not all sources are equally reliable, and reliability can change over time. A wiki page that was accurate when it was written may have been edited by someone who introduced errors. An API that provided clean data may start returning malformed responses.

**What to monitor:**

- **Source availability.** Can the collection pipeline access the source? Track uptime and collection success rate per source.
- **Content consistency.** Do the documents from this source follow the expected structure? A sudden change in format may indicate a problem.
- **Contradiction signals.** Are passages from this source frequently in conflict with passages from other, more authoritative sources? This may indicate quality degradation.
- **User correction rate.** How often do users dispute answers that came from this source?

---

## Monitoring

A production RAG system needs three categories of monitoring: retrieval quality, generation quality, and operational health.

### Retrieval quality dashboard

This dashboard answers: "Is the system finding the right information?"

**Metrics to display:**

- Retrieval hit rate (rolling 24-hour and 7-day trends)
- Average relevance score of top-1 result
- Distribution of retrieved passages by source and domain
- Retrieval latency histogram (P50, P90, P95, P99)
- Rate of queries with zero results above the relevance threshold

**Alert triggers:**

- Retrieval hit rate drops more than 5% from the 7-day average
- Average relevance score drops more than 10% from baseline
- A previously active source stops appearing in retrieval results (may indicate ingestion failure)
- Retrieval latency P95 exceeds the SLO threshold

### Generation quality dashboard

This dashboard answers: "Is the system producing good answers?"

**Metrics to display:**

- Faithfulness score (sampled, rolling weekly average)
- Citation rate (percentage of responses that include at least one citation)
- Abstention rate (percentage of responses that include "I don't know" or equivalent)
- Average response length
- User feedback scores (if collected)

**Alert triggers:**

- Faithfulness score drops below the SLO threshold
- Citation rate drops more than 10% from baseline
- Abstention rate moves outside the expected range (either direction)
- Spike in negative user feedback

### Operational health dashboard

This dashboard answers: "Is the infrastructure healthy?"

**Metrics to display:**

- End-to-end latency by stage (retrieval, reranking, generation, total)
- Cost per query (embedding cost, retrieval cost, generation cost, total)
- Index size and growth rate
- Ingestion pipeline health (success rate, processing time, queue depth)
- Error rate by component

**Alert triggers:**

- End-to-end latency P95 exceeds the SLO threshold
- Cost per query increases more than 20% from baseline
- Ingestion pipeline failure rate exceeds 1%
- Index size grows unexpectedly (may indicate deduplication failure)

### Drift detection

Over time, the distribution of user queries can shift. Users may start asking about topics that were not covered when the system was designed, or the mix of query types may change. This is called query drift, and it can silently degrade system performance.

**How to detect:** Track the distribution of query intents, domains, and the fraction of queries that produce low-confidence retrieval results. Compare weekly distributions to the baseline. A significant shift signals that the evaluation suite and potentially the knowledge base need updating.

---

## Incident runbook for RAG

When something goes wrong -- and it will -- the operations team needs a clear, step-by-step runbook for diagnosis and resolution. RAG incidents fall into a few distinct categories, each with its own diagnostic path.

### Incident type 1: Retrieval returns irrelevant results

**Symptoms:** Users report that answers are off-topic. Relevance scores drop. Faithfulness may actually remain high (the model faithfully summarizes the wrong content).

**Diagnostic steps:**

1. Check recent knowledge base changes. Was new content added that is confusing the retriever?
2. Check the query. Is the query outside the supported domain? Has the query distribution shifted?
3. Check the index. Is the index healthy? Are embeddings consistent? Was there a recent re-indexing that may have introduced errors?
4. Check metadata filters. Are filters correctly excluding irrelevant domains or expired content?

**Resolution options:**

- Roll back the recent knowledge base change if one was made.
- Adjust metadata filters to exclude the problematic content.
- Add the failing query to the evaluation suite to prevent regression.
- If the query represents a new topic, expand the knowledge base to cover it.

### Incident type 2: Model hallucinates despite grounding

**Symptoms:** The model produces factual claims that are not in the retrieved passages, even though relevant passages were retrieved. Faithfulness score drops while retrieval quality remains stable.

**Diagnostic steps:**

1. Check the generation prompt. Has it been modified recently? Are the grounding instructions still clear and prominent?
2. Check the context assembly. Are the relevant passages actually reaching the model's context window? Is the token budget too tight, causing relevant passages to be truncated?
3. Check the model. Has the model been updated? Some model updates change the degree to which the model adheres to context vs. its own training data.
4. Check for context overflow. Is the conversation history consuming too many tokens, pushing retrieved passages out of the effective attention window?

**Resolution options:**

- Reinforce grounding instructions in the system prompt.
- Adjust token budget to allocate more space for retrieved passages.
- Add explicit "only use the provided sources" instructions.
- Roll back the model version if a recent update is the cause.
- Adjust reranking to place more relevant passages at the beginning of the context.

### Incident type 3: Knowledge base has stale information

**Symptoms:** Users report that answers cite outdated information. Correct answers exist in updated source documents but have not been indexed.

**Diagnostic steps:**

1. Check the ingestion pipeline. Is it running on schedule? Are there errors in the collection or processing stages?
2. Check the source document. Has it been updated? When?
3. Check the index. Does the index contain the old version, the new version, or both?
4. Check tombstoning. Was the old version properly tombstoned, or is it still active alongside the new version?

**Resolution options:**

- Trigger an immediate re-ingestion of the affected source.
- Tombstone the stale content immediately.
- If the ingestion pipeline has been failing silently, fix the pipeline and re-process the backlog.
- Add freshness monitoring for this source to prevent recurrence.

### Incident type 4: Sensitive data exposure

**Symptoms:** The system surfaces confidential information to an unauthorized user.

**This is a critical incident. Follow the escalation path immediately.**

**Immediate actions:**

1. Isolate the affected queries (block similar queries if possible).
2. Notify the security team.
3. Determine the scope: what data was exposed, to whom, and for how long.
4. Document the incident for compliance reporting.

**Root cause investigation:**

- Check sensitivity classifications. Was the content correctly classified?
- Check access controls. Were retrieval filters correctly applying the user's permission level?
- Check for metadata errors. Did a re-indexing lose the sensitivity tags?

---

## Scaling RAG

As query volume grows, the RAG system must scale without proportional cost increases. The SSA should understand the scaling levers available to the engineering team.

### Index sharding

Instead of one massive index, split the knowledge base into shards by domain, language, or document type. Route queries to the appropriate shard based on query classification. This reduces the search space per query and enables independent scaling of high-traffic domains.

### Caching strategies

Many RAG systems see a power-law distribution of queries: a small number of questions are asked repeatedly. Caching the results for frequent queries can dramatically reduce cost and latency.

**What to cache:**

- **Embedding cache.** Store the vector representation of common queries to avoid re-embedding.
- **Retrieval cache.** Store the retrieval results for frequent queries. Invalidate when the knowledge base is updated.
- **Response cache.** Store the full generated response for exact or near-exact query matches. This is the most aggressive caching and requires careful invalidation.

**Cache invalidation:** Every cache entry must be tied to a knowledge base version. When the knowledge base is updated, affected cache entries must be invalidated. Stale cache entries are worse than no cache -- they serve outdated answers faster.

### Query routing for cost optimization

Not every query needs the full RAG pipeline. A query classifier can route queries to the appropriate path:

| Query type | Path | Cost |
|---|---|---|
| Simple factual | Cached response or lightweight retrieval + small model | Low |
| Standard | Full retrieval + reranking + standard model | Medium |
| Complex/multi-hop | Iterative retrieval + reranking + large model | High |
| Out of domain | Direct decline (no retrieval, no generation) | Minimal |

**The SSA designs the routing taxonomy.** What constitutes "simple" vs. "complex"? What signals indicate an out-of-domain query? These are semantic judgments that the SSA makes and the engineering team implements.

### Token budget optimization

Token costs are often the largest operational expense in a RAG system. The SSA can reduce costs by:

- **Right-sizing the context.** Not every query needs 6,000 tokens of context. Simple queries may need only 1-2 passages.
- **Summarizing long passages.** Instead of sending full passages to the model, pre-summarize them to reduce token count while preserving key information.
- **Tiered model selection.** Use a smaller, cheaper model for simple queries and a larger, more capable model for complex queries.

---

## Operational checklist

Here is a practical checklist for RAG operations. The SSA should verify that each item is addressed before the system is declared production-ready.

### Daily operations
- [ ] Ingestion pipeline runs successfully and on schedule
- [ ] No critical alerts are firing
- [ ] Latency is within SLO bounds
- [ ] No new sources of stale content detected

### Weekly operations
- [ ] Review retrieval quality trends (hit rate, relevance scores)
- [ ] Review generation quality samples (faithfulness spot-check)
- [ ] Review user feedback and escalation patterns
- [ ] Review cost trends and identify optimization opportunities

### Monthly operations
- [ ] Run the full evaluation suite against the production knowledge base
- [ ] Compare results to the previous month's baseline
- [ ] Review and update the golden dataset with new query patterns
- [ ] Review source reliability metrics
- [ ] Update the freshness policies if domain requirements have changed

### Per knowledge base update
- [ ] Run the evaluation suite against a staging index before deployment
- [ ] Compare results to pre-update baseline
- [ ] Verify no metric has degraded beyond the regression threshold
- [ ] Invalidate affected cache entries
- [ ] Document the change and its impact

---

## Key takeaways

1. **Operations is where quality lives or dies.** Building a great RAG system means nothing if operations cannot keep it great. Design for operability from the start.

2. **RAG needs RAG-specific SLOs.** Standard API health metrics will not catch a system that returns wrong answers with 200 OK. Monitor retrieval quality, faithfulness, and freshness explicitly.

3. **Stale content is the silent killer.** Users trust the system. If the system serves outdated information without warning, trust erodes invisibly until a high-profile failure makes it visible.

4. **Have a runbook before you need it.** When an incident happens at 2 AM, the on-call engineer should not need to figure out the diagnostic path from scratch. Write the runbook, test it with tabletop exercises, and keep it updated.

5. **Scale with intelligence, not just resources.** Caching, query routing, and token budget optimization can reduce costs dramatically. The SSA designs the routing logic; the engineering team implements the infrastructure.

---

## What comes next

You have now covered the complete RAG lifecycle: design, ingestion, retrieval, evaluation, and operations. The final lesson in this trail is a hands-on lab where you will **design a complete production RAG architecture** from scratch, applying everything you have learned.
