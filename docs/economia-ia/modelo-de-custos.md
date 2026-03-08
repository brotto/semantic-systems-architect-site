---
sidebar_position: 2
title: Cost Model
---

# AI Systems Cost Model

## The restaurant P&L analogy

When people think about the cost of running a restaurant, they often think about food. "A steak costs $12, we sell it for $35, we make $23." Simple, right?

Restaurant owners know better. Food cost is typically only 28-35 percent of revenue. The rest goes to rent, staff, utilities, insurance, marketing, equipment maintenance, licenses, waste disposal, and the occasional broken espresso machine. A restaurant that only budgets for food cost will be bankrupt before dessert.

AI systems work the same way. Most teams look at the token cost -- the "food cost" of AI -- and think they have a cost model. They do not. Token cost is typically 30-50 percent of the total cost of operating an AI system. The rest is infrastructure (rent), human review (staff), observability (marketing -- because you need to know what is happening), and safety controls (insurance -- because you need to handle what goes wrong).

This lesson teaches you to build a complete cost model. Not just the ingredients. The entire P&L.

---

## The five cost components

Every AI system has five fundamental cost categories. Missing any one of them will make your cost model unreliable.

### 1. Inference: the token bill

This is the most visible cost and the one most teams focus on. It includes:

- **Input tokens**: everything you send to the model -- system prompt, user message, retrieved context, conversation history, tool results.
- **Output tokens**: everything the model generates -- responses, structured outputs, chain-of-thought reasoning, tool call parameters.
- **Model tier**: a request to a frontier model (GPT-4 class) costs 10-30x more than the same request to a small model (GPT-4o-mini class). Same kitchen, very different steak.

**How to estimate**: count the average tokens per request (input + output), multiply by the price per token for your model tier, multiply by expected monthly volume. This gives you the baseline inference cost.

**Example calculation**:
- Average input: 2,000 tokens
- Average output: 500 tokens
- Model: GPT-4o ($2.50/M input, $10.00/M output)
- Monthly volume: 100,000 requests

```
Input cost:  2,000 * 100,000 * $2.50 / 1,000,000 = $500
Output cost: 500 * 100,000 * $10.00 / 1,000,000 = $500
Monthly inference cost: $1,000
```

This looks manageable. But we are just getting started.

### 2. Embeddings and indexing

If your system uses RAG (retrieval-augmented generation), you need to convert documents into vector embeddings and store them in a searchable index. This has two cost dimensions:

- **Initial indexing cost**: converting your document corpus into embeddings. This is a one-time cost (per corpus version), but it can be significant for large collections.
- **Ongoing indexing cost**: new documents, updated documents, and re-indexing when your embedding model changes.
- **Embedding API calls**: every user query must be embedded before retrieval. At scale, these calls add up.

**Example**: embedding 100,000 documents of 1,000 tokens each costs roughly $1.30 with OpenAI's embedding model. That seems trivial -- until you re-index weekly and your corpus grows to 10 million documents.

### 3. Retrieval and storage infrastructure

The embeddings need to live somewhere, and retrieval needs compute:

- **Vector database hosting**: services like Pinecone, Weaviate, or Qdrant charge based on storage volume, query volume, and index size. A managed vector database for a production system typically costs $100-$2,000/month depending on scale.
- **Traditional storage**: conversation logs, audit trails, cached responses, evaluation results. These accumulate over time. A system logging every interaction at scale can easily generate terabytes of data per year.
- **Compute for retrieval**: if you self-host your vector database, you need dedicated compute. If you use hybrid retrieval (sparse + dense), you need additional infrastructure.

Think of this as the rent for your restaurant. You can have zero customers and still pay it.

### 4. External tools and APIs

Most production AI systems call external services:

- **Search APIs**: web search, internal search, knowledge base queries.
- **Third-party APIs**: CRM lookups, payment processing, calendar integrations, code execution environments.
- **Specialized models**: translation, summarization, classification models that run separately from your main LLM.
- **SaaS tools**: email sending, SMS notifications, document generation.

Each of these has its own pricing model. Some charge per call, some per volume, some per seat. The SSA must account for all of them.

**The restaurant analogy**: this is like the cost of delivery services, payment processing fees, and third-party cleaning crews. They are not your core operation, but you cannot operate without them.

### 5. Observability, evaluations, and operations

Running an AI system in production requires constant monitoring:

- **Logging and tracing**: capturing every request, response, retrieval result, and tool call for debugging and auditing. Tools like LangSmith, Langfuse, or custom solutions have their own costs.
- **Evaluation runs**: automated quality checks, regression suites, safety evaluations. These consume tokens (because you often use LLMs to evaluate LLM output) and compute.
- **Alerting infrastructure**: monitoring services, dashboard hosting, notification systems.
- **Operational labor**: someone must watch the dashboards, respond to alerts, investigate anomalies, and update the system. This is a salary cost.

**The restaurant analogy**: this is like the cost of the manager who walks the floor, the health inspector compliance, the inventory system, and the security cameras. You could theoretically skip all of this. You will regret it.

---

## Hidden costs: the ones that sneak up on you

Beyond the five structural components, there are costs that only appear in production. They are invisible on the whiteboard and very visible on the invoice.

### Human review and escalation

When the AI system is not confident enough, or when the task is too sensitive for full automation, a human must review the output. This creates a parallel cost:

- The AI processed the request (you paid for inference).
- The human then reviewed it (you paid for their time).
- In some cases, the human overrides the AI and does the work manually (you paid for both and got value from neither).

**How to model it**: estimate the percentage of tasks requiring human review (typical range: 5-30 percent depending on domain complexity). Multiply by average human review time. Multiply by hourly labor cost. This is your escalation cost.

### Error correction and rework

When the AI produces incorrect output that reaches the end user, the cost includes:

- Identifying the error (monitoring cost).
- Correcting the error (labor cost).
- Communicating the correction (customer service cost).
- Potential business impact (refunds, SLA penalties, reputation damage).

A single incorrect AI response in a legal or financial context can cost more than a month of inference fees. Model this by estimating error rate, average cost per error, and monthly volume.

### Retraining, prompt updates, and maintenance

AI systems require continuous maintenance:

- Business rules change, prompts need updating.
- New edge cases appear, evaluations need expanding.
- Model providers release new versions, behavior shifts need testing.
- Retrieval corpora grow, indexing needs re-running.

Budget for ongoing SSA and engineering time: typically 10-20 percent of a full-time equivalent per active system, continuously.

### Compliance and audit costs

In regulated industries (healthcare, finance, legal), AI systems face additional requirements:

- Audit trail storage and retrieval systems.
- Explainability features for AI decisions.
- Periodic compliance reviews.
- Documentation for regulators.

These are not optional. They are the "insurance" in our restaurant analogy. You cannot operate without them, and they cost money even when nothing goes wrong.

---

## Cost modeling methodology

Now that you know what to count, here is how to organize the counting.

### Per-request breakdown

Start with a single request. Trace every cost it incurs:

| Component | Cost per request |
|-----------|-----------------|
| Input tokens (system prompt + context + user message) | $X |
| Output tokens (response + reasoning) | $Y |
| Embedding the query | $Z |
| Vector search query | $A |
| External API calls (average per request) | $B |
| Logging and tracing | $C |
| Pro-rated human review (review rate x review cost) | $D |
| Pro-rated error correction (error rate x error cost) | $E |
| **Total cost per request** | **Sum** |

This gives you the atomic unit of cost. Everything else is multiplication.

### Per-workflow breakdown

Most AI systems have multiple workflows -- different paths through the system with different cost profiles. A customer support system might have:

- **Simple FAQ**: retrieval + small model response. Low cost.
- **Account inquiry**: retrieval + CRM lookup + medium model response. Medium cost.
- **Complex complaint**: retrieval + CRM lookup + policy check + large model reasoning + human review. High cost.

Map each workflow separately. A blended average hides the fact that 10 percent of your workflows might consume 60 percent of your budget -- just like how desserts might have a 20 percent food cost while the steak has a 40 percent food cost.

### Monthly projections

Once you have per-request and per-workflow costs, project monthly:

```
Monthly cost = SUM over all workflows of:
  (workflow volume x cost per request)
  + fixed infrastructure costs
  + fixed labor costs (operations, maintenance)
```

Build three scenarios:

**Conservative**: current volume, current error rates, no optimization. This is your baseline -- what you will spend if nothing changes.

**Growth**: projected volume increase (20-50 percent), proportional cost increase. Some costs scale linearly (inference), some scale sub-linearly (infrastructure), and some are fixed (operations labor -- up to a point).

**Optimized**: current volume with planned optimizations applied (model routing, caching, context compression). This shows the potential savings from technical work.

---

## Building your cost model spreadsheet

A practical cost model is a spreadsheet, not a document. Here is how to structure it.

### Input sheet

Capture all the variables that drive cost:

- Token prices by model tier (input and output, per million tokens).
- Average tokens per request by workflow (input and output).
- Monthly volume by workflow.
- External API prices per call.
- Infrastructure costs (fixed monthly).
- Human review rate per workflow (percentage).
- Average human review time (minutes).
- Human labor cost per hour.
- Error rate per workflow (percentage).
- Average cost per error correction.

### Calculation sheet

Wire the formulas:

```
Inference cost = tokens x price per token x volume
Embedding cost = queries x embedding price + re-indexing frequency x corpus size x embedding price
Infrastructure cost = sum of fixed monthly services
Tool cost = sum of (tool call frequency per request x price per call x volume)
Human review cost = volume x review rate x review time x hourly cost / 60
Error cost = volume x error rate x cost per error
Operations cost = FTE fraction x monthly salary
Total monthly cost = sum of all components
Cost per request = total monthly cost / total monthly volume
```

### Scenario sheet

Create columns for Conservative, Growth, and Optimized. Vary the inputs (volume, error rates, optimization impact) and let the formulas update automatically.

### Dashboard sheet

Summarize the key numbers:

- Total monthly cost.
- Cost per request (blended average).
- Cost per request by workflow.
- Cost breakdown by component (pie chart).
- Growth scenario versus optimized scenario (comparison).

---

## Practical exercise

Choose an AI system you are designing or have access to. Build a cost model using the structure above:

1. Identify all five cost components and estimate their values.
2. List at least three hidden costs and estimate their impact.
3. Calculate cost per request for at least two different workflows.
4. Project monthly cost under conservative and growth scenarios.
5. Identify the single largest cost component. Is it the one you expected?

Most teams are surprised to discover that inference tokens are not their largest cost. Often, human review or infrastructure costs dominate. That discovery alone changes how you design the system.

---

## Key takeaways

1. **Token cost is not total cost.** Inference is typically 30-50 percent of the true operating cost. The rest is infrastructure, human review, tools, observability, and maintenance.

2. **Five components, no shortcuts.** Every AI system incurs costs in inference, embeddings, infrastructure, external tools, and operations. Missing any one of them makes your model unreliable.

3. **Hidden costs are the largest risk.** Human review, error correction, retraining, and compliance costs are invisible on the whiteboard and enormous in production.

4. **Model per workflow, not per system.** Different workflows have dramatically different cost profiles. A blended average hides the expensive ones.

5. **Three scenarios, always.** Conservative, growth, and optimized projections give you the range of possibilities and help you plan for reality.

6. **A cost model is a living document.** Update it monthly with actual data. The gap between your model and reality is where you learn.

---

## What comes next

In **Unit Economics**, you will learn to connect these costs to business value. A cost model tells you what you spend. Unit economics tells you whether what you spend is worth it.
