---
sidebar_position: 4
title: Technical Optimization
---

# Technical Optimization with Financial Impact

## The factory energy analogy

A factory owner receives an electricity bill that is too high. They have two options: make the factory smaller (produce less), or make each machine use less power (produce the same output more efficiently).

Nobody chooses option one. You do not shrink your business to save on electricity. You upgrade to efficient motors, install LED lighting, fix the compressed air leaks, and schedule heavy machinery to run during off-peak hours. The factory produces the same output -- or more -- while consuming less energy.

AI cost optimization works the same way. You do not reduce the number of tasks your system handles. You make each task consume fewer resources while maintaining the same quality. This lesson teaches you six specific levers for doing that, along with the typical savings, quality trade-offs, and implementation complexity of each.

### The golden rule

Before we begin: **never optimize cost in isolation.** Every optimization lever has a quality trade-off. Some trade-offs are negligible. Some are severe. The SSA's job is to find the optimizations that deliver meaningful cost savings with acceptable quality impact -- and to measure both, always.

Think of it like turning down the heat in a restaurant kitchen to save on gas. A little cooler? Fine. Too cold? The food comes out undercooked and customers leave. The goal is efficiency, not austerity.

---

## Lever 1: Model-tier routing

### What it is

Not every task needs your most powerful (and most expensive) model. Model-tier routing sends each request to the smallest model capable of handling it correctly.

Think of a hospital. Not every patient needs a brain surgeon. Some need a general practitioner, some need a nurse, and some just need directions to the pharmacy. Sending everyone to the brain surgeon is expensive and wasteful. Sending the brain surgery patient to the pharmacist is dangerous. Routing is the art of matching the right resource to the right task.

### How it works

1. **Classify incoming requests** by complexity. This can be done with a lightweight classifier (a small model, a rule-based system, or even keyword matching).
2. **Route simple requests** to a small, cheap model (GPT-4o-mini class, Haiku class). Examples: FAQ responses, simple lookups, formatting tasks, classification.
3. **Route complex requests** to a large, capable model (GPT-4o class, Sonnet class). Examples: multi-step reasoning, nuanced policy application, creative generation.
4. **Route critical requests** to the most capable model (GPT-4 class, Opus class). Examples: safety-sensitive decisions, complex legal analysis, medical reasoning.

### Typical savings

**30-60% reduction in inference cost.** In most production systems, 50-70% of requests are simple enough for a small model. Small models cost 10-30x less per token than large models. The math is compelling.

### Quality trade-offs

- **Risk**: a request misrouted to a too-small model produces a lower-quality response. The customer notices.
- **Mitigation**: build a confidence check on the small model's output. If confidence is low, re-route to a larger model. You pay twice for that request, but it happens rarely (typically 5-10% of routed requests).
- **Measurement**: compare quality metrics (accuracy, CSAT, eval scores) before and after routing. If quality drops more than 2-3%, tighten your routing thresholds.

### Implementation complexity

**Medium.** You need a classification mechanism, routing logic, and quality monitoring for each tier. The initial implementation takes 1-2 weeks for a senior engineer. Ongoing tuning is continuous but lightweight.

---

## Lever 2: Semantic caching

### What it is

Many requests to an AI system are similar or identical. Semantic caching identifies when a new request is similar enough to a previously answered one and returns the cached response instead of calling the model again.

Think of a librarian. The first time someone asks "Where are the cookbooks?", the librarian walks them to the shelf. The tenth time someone asks the same question that week, the librarian just points -- they already know the answer. The librarian does not re-derive the answer from scratch every time. They recognize the question and recall the response.

### How it works

1. **Embed each incoming request** into a vector representation.
2. **Compare the embedding** against a cache of recent request-response pairs.
3. **If similarity exceeds a threshold** (typically 0.95+ cosine similarity), return the cached response.
4. **If not**, call the model, get the response, and add the pair to the cache.
5. **Invalidate cached responses** when the underlying data changes (product catalog updated, policy changed, knowledge base refreshed).

### Typical savings

**10-40% reduction in inference cost**, depending on how repetitive your traffic is. Customer support systems (where many users ask similar questions) see the highest cache hit rates (30-50%). Creative or highly personalized systems see lower rates (5-15%).

### Quality trade-offs

- **Risk**: a cached response might be stale (the policy changed but the cache was not invalidated) or might not account for user-specific context (two similar questions with different users might need different answers).
- **Mitigation**: set aggressive cache expiration (hours, not days). Include user-specific context in the cache key. Monitor the percentage of cached responses that receive negative feedback.
- **Measurement**: track cache hit rate, staleness rate (cached responses that were wrong because of data changes), and user satisfaction for cached vs. fresh responses.

### Implementation complexity

**Medium-high.** The caching mechanism itself is straightforward. The hard parts are defining similarity thresholds (too low = wrong answers, too high = no cache hits) and building reliable invalidation. Expect 2-4 weeks for initial implementation, plus ongoing threshold tuning.

---

## Lever 3: Context compression

### What it is

Every token you send to the model costs money. Context compression reduces the number of tokens in each request without losing the information the model needs.

Think of packing a suitcase. An amateur throws everything in loose -- shirts unfolded, shoes scattered, books on top of sweaters. The suitcase is full after 20 items. A skilled packer rolls shirts, puts socks inside shoes, and uses every corner. The same 20 items fit in half the space. Nothing is missing. The packing is just more efficient.

### Techniques

**Prompt compression.** Review your system prompt. Is every word necessary? System prompts grow over time as teams add instructions, caveats, and edge cases. A prompt that started at 500 tokens can grow to 3,000 tokens without anyone noticing. Regularly audit and compress your system prompt.

**History summarization.** In multi-turn conversations, do not send the entire conversation history. Summarize earlier turns into a compact context block. A 20-turn conversation might have 10,000 tokens of history. A summary might capture the essential context in 500 tokens.

**Retrieval pruning.** When RAG retrieves 10 document chunks, not all are equally relevant. Score retrieved chunks and only include the top 3-5 in the context. Fewer chunks means fewer tokens means lower cost.

**Output format control.** If the model generates verbose chain-of-thought reasoning but you only need the final answer, configure the output to suppress intermediate reasoning (or capture it separately at a lower cost).

### Typical savings

**15-35% reduction in token cost.** System prompt compression typically saves 20-40% of prompt tokens. History summarization saves 50-80% of history tokens. Retrieval pruning saves 30-60% of context tokens.

### Quality trade-offs

- **Risk**: compress too aggressively and the model loses critical context. The response quality degrades.
- **Mitigation**: compress in stages. Measure quality after each stage. Stop when quality begins to decline. The 80/20 rule applies -- the first 20% of compression effort captures 80% of the savings.
- **Measurement**: compare response quality (eval scores, accuracy) at different compression levels. Find the "knee" of the curve where quality starts dropping significantly.

### Implementation complexity

**Low-medium.** Prompt compression is a manual exercise (review, edit, test). History summarization requires a summarization step (can use a small model). Retrieval pruning requires scoring logic. Most teams can implement all three within 1-2 weeks.

---

## Lever 4: RAG optimization

### What it is

Poor retrieval is one of the most expensive problems in AI systems -- not because retrieval itself is costly, but because bad retrieval leads to bad answers, which lead to retries, escalations, and error corrections. Optimizing RAG reduces downstream costs.

Think of a restaurant with a disorganized pantry. The chef needs basil. They search through every shelf, find something that looks like basil, use it -- and it turns out to be cilantro. Now the dish is wrong, the customer sends it back, the chef must start over. The cost was not the search. The cost was the wrong ingredient leading to rework.

### Techniques

**Chunking strategy.** How you split documents into chunks matters enormously. Chunks that are too small lose context. Chunks that are too large dilute relevance. Experiment with chunk sizes (256, 512, 1024 tokens) and overlap (10-20%). Measure retrieval precision and recall at each setting.

**Hybrid retrieval.** Combine dense (embedding-based) retrieval with sparse (keyword-based) retrieval. Dense retrieval captures semantic similarity. Sparse retrieval captures exact matches. Together, they outperform either alone, especially for domain-specific terminology.

**Re-ranking.** After initial retrieval returns 20 candidates, use a re-ranking model to score them by relevance and select the top 3-5. Re-ranking models are much cheaper than LLMs and dramatically improve retrieval precision.

**Index maintenance.** Stale indexes produce stale results. Establish a refresh cadence based on how quickly your source data changes. A product catalog might need daily refreshes. Company policies might need weekly refreshes. Historical archives rarely change.

### Typical savings

**20-40% reduction in total system cost** (not just retrieval cost, but downstream costs from reduced errors, retries, and escalations). Improved retrieval precision directly reduces the error rate, which reduces human review costs -- often the largest cost component.

### Quality trade-offs

- **Risk**: RAG optimization can actually improve quality, making this lever unusual. The main risk is over-optimizing retrieval speed at the expense of comprehensiveness (returning results too quickly without searching thoroughly enough).
- **Mitigation**: measure recall (are you finding all relevant documents?) alongside precision (are you avoiding irrelevant documents?). Do not sacrifice recall for speed.
- **Measurement**: track retrieval precision, recall, answer accuracy, and downstream error rate. RAG optimization should improve all four.

### Implementation complexity

**Medium-high.** Chunking experiments require re-indexing, which takes time. Hybrid retrieval requires two retrieval systems. Re-ranking requires an additional model. Budget 3-6 weeks for thorough RAG optimization, including experimentation and measurement.

---

## Lever 5: Batch processing

### What it is

Some AI tasks do not need real-time responses. Email classification, document summarization, report generation, and content moderation can often be batched and processed during off-peak hours or using batch APIs that offer significant discounts.

Think of laundry. You do not wash each shirt the moment you take it off. You collect shirts throughout the week and wash them all at once. The washing machine uses the same amount of water and electricity whether it holds one shirt or twenty. Batching is more efficient.

### How it works

1. **Identify batch-eligible tasks**: tasks that do not require immediate responses, tasks with predictable volume, tasks that can tolerate latency of minutes to hours.
2. **Queue incoming tasks** instead of processing immediately.
3. **Process batches** during scheduled windows, using batch APIs (OpenAI, Anthropic, and others offer batch pricing at 50% discount or more).
4. **Deliver results** asynchronously to the requesting system or user.

### Typical savings

**40-50% reduction in inference cost for batch-eligible tasks.** Most providers offer batch API pricing at 50% of real-time pricing. Additional savings come from infrastructure efficiency (fewer concurrent connections, lower peak compute).

### Quality trade-offs

- **Risk**: latency. Batch processing means the response is not immediate. For time-sensitive tasks, this is unacceptable.
- **Mitigation**: only batch tasks that genuinely tolerate latency. Set clear SLAs for batch processing (e.g., results within 4 hours). Monitor queue depth to prevent backlogs.
- **Measurement**: track task completion time, queue depth, and whether batch latency causes business impact (missed deadlines, stale results).

### Implementation complexity

**Low-medium.** The main work is building the queue, scheduler, and result delivery mechanism. Most teams can implement basic batching in 1-2 weeks. The harder part is identifying which tasks are batch-eligible without breaking user expectations.

---

## Lever 6: Flow budget control

### What it is

Flow budget control sets a maximum cost per request or per workflow. If a request exceeds its budget (too many retries, too many tool calls, too much context), the system stops processing and either escalates to a human or returns a graceful fallback.

Think of a taxi meter. You get in the taxi with a budget of $30. If the meter hits $30 and you are not at your destination, you stop the ride, get out, and find another way. You do not let the meter run to $200 because "the trip was almost done."

### How it works

1. **Assign a cost budget to each workflow** based on the expected value of its outcome. A workflow that resolves a $5 support ticket should not spend $20 on inference.
2. **Track cost in real time** as the request moves through the system (model calls, tool calls, retries).
3. **When the budget is exhausted**, stop processing and execute a fallback strategy: escalate to human, return a partial answer, queue for batch processing, or notify the user.
4. **Log budget exhaustion events** for analysis. If a workflow frequently hits its budget, the workflow design may need revision.

### Typical savings

**5-15% reduction in total cost** by eliminating runaway requests. In most systems, a small percentage of requests (1-5%) consume a disproportionate share of resources (20-40% of total cost). Flow budgets cap these outliers.

### Quality trade-offs

- **Risk**: legitimate complex requests are cut off before completion. The system fails to help the user when they need it most.
- **Mitigation**: set budgets generously (3-5x the average cost per request) so they only trigger on genuine outliers. Track the outcomes of budget-capped requests to ensure they are handled gracefully.
- **Measurement**: monitor budget exhaustion rate, customer satisfaction for capped requests, and whether capped requests are successfully resolved through the fallback path.

### Implementation complexity

**Low.** Cost tracking per request requires instrumentation but is straightforward. Budget enforcement is a simple conditional check. The hard part is setting the right budget thresholds -- too low and you cap legitimate requests; too high and the budget is meaningless.

---

## Layered implementation strategy

You do not implement all six levers at once. Use a phased approach:

### Phase 1: Quick wins (Week 1-2)

- **Context compression**: audit and compress system prompts. Remove redundant instructions. Tighten retrieval context.
- **Flow budget control**: add cost tracking and budget caps to catch runaway requests.
- **Expected savings**: 15-25% cost reduction.

### Phase 2: Structural gains (Week 3-6)

- **Model-tier routing**: classify requests by complexity, route to appropriate model tiers.
- **Batch processing**: identify and move batch-eligible tasks to batch APIs.
- **Expected savings**: additional 20-35% cost reduction.

### Phase 3: Systemic gains (Week 6-12)

- **Semantic caching**: build and tune the caching layer.
- **RAG optimization**: experiment with chunking, hybrid retrieval, and re-ranking.
- **Expected savings**: additional 15-30% cost reduction.

### Cumulative impact

If implemented thoughtfully, the six levers together can reduce total system cost by 40-65% while maintaining or even improving quality. The exact savings depend on your starting point, traffic patterns, and domain complexity.

---

## Recommended experiments

For each lever, run a controlled experiment before full deployment:

1. **A/B test model routing**: split traffic 50/50 between routed and non-routed paths. Compare quality metrics and cost metrics. Run for at least one week.

2. **Cache hit rate trial**: enable caching for one workflow. Measure hit rate, staleness, and quality impact over two weeks. Adjust thresholds based on results.

3. **Context compression audit**: take 20 representative requests. Manually compress context by 30%. Run both versions through evals. Quantify quality impact.

4. **RAG chunking experiment**: re-index a subset of your corpus at three different chunk sizes. Run the same 100 test queries against each index. Measure precision, recall, and answer quality.

5. **Batch eligibility analysis**: review all workflows. For each, answer: can this tolerate 1-hour latency? 4-hour latency? 24-hour latency? Categorize accordingly.

6. **Budget threshold calibration**: analyze the cost distribution of your last 10,000 requests. Set the budget at the 95th percentile. Monitor how many requests are capped and whether outcomes are acceptable.

---

## Key takeaways

1. **Six levers, not one.** Cost optimization is not about finding a single silver bullet. It is about applying multiple levers, each contributing 10-40%, to achieve a cumulative reduction of 40-65%.

2. **Never optimize cost alone.** Every lever has a quality trade-off. Measure both. An optimization that saves 20% on cost but increases errors by 15% is not an optimization -- it is a downgrade.

3. **Phase your implementation.** Start with quick wins (compression, budgets), move to structural gains (routing, batching), and finish with systemic improvements (caching, RAG). Each phase funds the next.

4. **Experiment before deploying.** Run controlled experiments for each lever. Measure quality and cost impact. Only deploy optimizations that pass your quality bar.

5. **The factory stays the same size.** You are not reducing capability. You are reducing waste. Each machine uses less power. The factory produces the same output -- or more.

---

## What comes next

In **FinOps Governance**, you will learn how to wrap these optimizations in a governance framework that keeps costs predictable, accountable, and aligned with business strategy.
