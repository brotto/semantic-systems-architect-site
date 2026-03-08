---
sidebar_position: 5
title: FinOps Governance
---

# FinOps Governance for AI

## The household budget analogy

Every well-run household has a budget. Not because the family is poor, but because money is finite and choices matter. The mortgage is a fixed expense -- it does not change month to month. Groceries are variable -- they fluctuate with the season and the number of dinner guests. There is a savings account for the future and an emergency fund for the unexpected. And there are rules: "We do not spend more than $200 on dining out" and "Any purchase over $500 needs both of us to agree."

AI FinOps governance works exactly the same way. You have fixed costs (infrastructure, tooling subscriptions), variable costs (inference tokens, API calls), a savings target (optimization goals), and an emergency fund (budget headroom for traffic spikes). You have rules about who can spend what. And you review the budget regularly to make sure reality matches the plan.

Without governance, AI costs behave like a household with no budget. Everyone swipes the credit card for whatever they want, nobody tracks the spending, and at the end of the month, everyone is surprised by the bill. This lesson teaches you to run your AI economics like a disciplined household -- not cheap, not reckless, just organized.

---

## Budget policies

### Monthly limits per product

Every AI-powered product gets a monthly cost budget. This budget is based on the unit economics analysis from the previous lesson: how many outcomes the product is expected to produce, times the target cost per outcome, plus infrastructure and operational overhead.

**Example**: your customer support AI resolves 8,000 tickets per month at a target cost of $2.50 each. Monthly budget: $20,000 plus a 15% buffer for variability = $23,000.

The buffer is important. Real-world traffic is not perfectly smooth. Some weeks are busier than others. Some requests are more complex than average. The buffer absorbs normal variation without triggering alarms.

### Limits per workflow

Within each product, individual workflows get their own sub-budgets. This prevents an expensive workflow from consuming the entire product budget.

**Example**: within the support AI, the "simple FAQ" workflow gets $3,000/month (high volume, low cost per unit), the "account inquiry" workflow gets $8,000/month (medium volume, medium cost), and the "complex complaint" workflow gets $9,000/month (lower volume, high cost per unit). The remaining $3,000 is unallocated buffer.

### Limits per team

In organizations where multiple teams use shared AI infrastructure, each team gets a cost allocation. This creates accountability -- teams that consume more resources must justify the consumption.

**Example**: the marketing team gets $5,000/month for AI-powered content generation. The sales team gets $8,000/month for lead qualification. The support team gets $23,000/month for ticket resolution. Each team is responsible for staying within their allocation and reporting on the value generated.

---

## Alert thresholds

Budgets without alerts are like smoke detectors without batteries. You need early warning systems that trigger before problems become crises.

### The three-tier alert model

**Warning at 70% (yellow).** When a product or workflow has consumed 70% of its monthly budget with significant time remaining in the month, a warning is sent to the product owner and the SSA. This is informational -- no action is required yet, but someone should investigate whether consumption is on track or trending high.

**Critical at 90% (red).** When consumption reaches 90%, an alert is sent to the product owner, SSA, engineering lead, and FinOps team. This requires investigation within 24 hours. Is this expected growth? A traffic spike? A bug causing excessive retries? A change that increased token consumption?

**Automatic throttling at 100% (hard stop).** When the budget is exhausted, the system automatically reduces capacity. This does not mean shutting down -- it means degrading gracefully. Options include:

- Routing all requests to smaller models regardless of complexity.
- Disabling non-essential features (verbose explanations, optional enrichments).
- Queuing non-urgent requests for batch processing.
- Returning cached responses more aggressively.
- Showing a "high demand" message and increasing wait times.

The automatic throttling policy must be designed in advance. You do not want to make throttling decisions during a crisis. You want the system to follow a predefined playbook.

### Anomaly detection

Beyond simple threshold alerts, implement anomaly detection for cost patterns:

- **Sudden spike**: cost increases by more than 50% compared to the same day last week. Possible causes: traffic spike, prompt change that increased token count, retrieval bug returning too many documents.
- **Gradual drift**: cost increases by 5-10% every week for four weeks. Possible causes: growing conversation lengths, increasing context size, corpus growth expanding retrieval results.
- **Pattern break**: cost spikes during hours that are normally quiet. Possible causes: bot traffic, automated testing hitting production, scheduled jobs running at the wrong time.

---

## Approval workflows

Some changes to AI systems have significant cost implications. These changes should require approval before deployment.

### What requires approval

**Prompt changes that increase token count by more than 20%.** Adding instructions, context, or examples to a system prompt can dramatically increase cost. If the prompt grows from 500 tokens to 700 tokens and you process 100,000 requests per month, that is 20 million additional tokens per month.

**Model tier upgrades.** Switching a workflow from a small model to a large model can increase inference cost by 10-30x. This must be justified by a quality requirement that the smaller model cannot meet.

**New workflow deployment.** Every new workflow adds to the cost base. Before launching, the workflow must have a cost estimate, a budget allocation, and a unit economics projection.

**Retrieval corpus expansion.** Adding large volumes of new documents increases embedding costs, storage costs, and potentially retrieval latency. The business value of the new documents must justify these costs.

### Approval process

1. **The proposer** (usually the SSA or engineering lead) fills out a cost impact assessment: what changes, estimated monthly cost impact, justification, and mitigation plan if costs exceed projections.
2. **The reviewer** (product owner or FinOps lead) evaluates the cost impact against the product budget and unit economics targets.
3. **If approved**, the change is deployed with enhanced monitoring for the first two weeks (daily cost checks instead of weekly).
4. **If rejected**, the proposer is asked to find a lower-cost alternative or provide stronger justification.

This is not bureaucracy. This is the same process that any well-run business uses for purchasing decisions. You would not let an employee buy a $10,000 piece of equipment without approval. You should not let a prompt change add $10,000/month to your AI bill without approval either.

---

## Operating rhythm

Governance is not a one-time setup. It is a rhythm -- a regular cadence of reviews, analyses, and adjustments that keeps costs aligned with value.

### Daily: anomaly monitoring

- Automated checks run every morning. Any alerts from the previous 24 hours are reviewed by the on-call engineer or SSA.
- If an anomaly is detected, it is triaged: is it expected (traffic spike from a marketing campaign), benign (a one-time batch job), or concerning (a bug, a drift)?
- Action items are logged. Concerning anomalies get a root cause analysis within 48 hours.

### Weekly: cost per flow review

- Every Monday (or your preferred start of week), the SSA and product owner review the cost dashboard.
- Key questions: is each workflow within its weekly budget fraction? Are there any workflows trending above projection? Has the cost per completed outcome changed?
- This is a 15-minute check, not a deep analysis. The goal is to catch trends early.

### Monthly: budget planning and ROI review

- At the end of each month, a formal review compares actual costs to budgeted costs for each product and workflow.
- The unit economics are recalculated with actual data: real cost per outcome, real revenue per outcome, real margin.
- Budget adjustments are made for the following month based on trends, new workflows, and optimization results.
- This review includes the product owner, SSA, engineering lead, and FinOps representative.

### Quarterly: strategic alignment

- Every quarter, the AI economics are reviewed at the leadership level.
- Key questions: are AI investments delivering the expected ROI? Should budgets be increased for high-performing systems or decreased for underperforming ones? Are there new opportunities or risks on the horizon?
- This review often includes decisions about new AI products, major architecture changes, or vendor renegotiations.

---

## Cost attribution

You cannot govern what you cannot attribute. Cost attribution assigns every dollar of AI spending to a specific team, product, and workflow.

### Tagging strategy

Every AI request should carry tags that identify:

- **Product**: which product or service is this request part of?
- **Workflow**: which specific workflow within the product?
- **Team**: which team owns the product?
- **Environment**: production, staging, development, testing?
- **Request type**: real user request, automated evaluation, internal testing?

These tags flow through every system component -- the LLM call, the retrieval query, the tool invocation, the logging pipeline. At the end of the month, you can aggregate costs by any combination of tags.

### Common attribution mistakes

**Ignoring shared infrastructure.** If three products share a vector database, the hosting cost must be allocated proportionally. Ignoring it makes each product look cheaper than it really is.

**Ignoring development and testing costs.** Engineers running experiments, QA teams testing new prompts, and evaluation suites running nightly -- all consume tokens. These costs should be attributed to a "development" category, not hidden.

**Attributing by request count instead of cost.** Two workflows might each handle 1,000 requests per month, but one uses a large model with extensive context and the other uses a small model with minimal context. Attributing by request count gives each 50% of the cost. In reality, the first workflow might consume 90% of the cost. Attribute by actual resource consumption, not by request count.

### The household analogy continued

This is like tracking expenses by category. You do not just know that you spent $3,000 last month. You know that $1,200 went to mortgage, $600 to groceries, $300 to utilities, $200 to transportation, $150 to dining out, and $550 to other categories. Each family member knows what they spent and where. When the total is too high, you can see exactly where to cut.

---

## Recommended controls

Beyond budget and alerts, implement these operational controls:

### Release checklist with financial impact

Before deploying any change to an AI system, the release checklist should include:

- Estimated cost impact per month (increase or decrease).
- Comparison of token counts before and after the change.
- Confirmation that the change fits within the current budget.
- If cost impact exceeds a threshold (e.g., more than 10% increase), approval documentation.

### Economic regression testing in CI

Just as you run functional tests in your continuous integration pipeline, run economic tests:

- Measure the token count of a standard set of test requests before and after the change.
- If the average token count increases by more than a threshold (e.g., 15%), flag the build for review.
- This catches prompt bloat, context expansion, and retrieval changes before they reach production.

### Cost-quality risk matrix

Maintain a matrix that maps each workflow to its cost risk and quality risk:

| Workflow | Cost risk | Quality risk | Action |
|----------|-----------|-------------|--------|
| Simple FAQ | Low | Low | Monitor monthly |
| Account inquiry | Medium | Medium | Monitor weekly |
| Complex complaint | High | High | Monitor daily, budget cap |
| Legal escalation | Very high | Critical | Human review required, strict budget |

This matrix helps you allocate governance effort where it matters most. Do not spend the same amount of time governing a $500/month workflow as a $15,000/month workflow.

---

## Roles and responsibilities

Effective FinOps governance requires clear ownership:

**Product owner**: defines the minimum value per outcome. Owns the business case for the AI system. Approves budget allocations.

**SSA**: designs the economically efficient architecture. Selects optimization levers. Monitors cost-quality trade-offs. Proposes budget adjustments based on technical analysis.

**Engineering lead**: implements technical optimizations. Maintains cost tracking instrumentation. Runs economic regression tests.

**FinOps team**: controls budget predictability. Maintains the cost dashboard. Runs monthly and quarterly reviews. Negotiates vendor contracts.

No single role owns everything. FinOps governance is a team sport.

---

## Key takeaways

1. **Budget like a household.** Fixed costs, variable costs, savings targets, emergency fund. Every AI product gets a budget with a buffer for variability.

2. **Three alert tiers.** Warning at 70%, critical at 90%, automatic throttling at 100%. Design the throttling playbook before you need it.

3. **Approve expensive changes.** Prompt expansions, model upgrades, new workflows, and corpus expansions all need cost impact assessment and approval.

4. **Maintain a rhythm.** Daily anomaly checks, weekly cost reviews, monthly budget planning, quarterly strategic alignment. Governance is not a one-time event.

5. **Attribute every dollar.** Tag every request by product, workflow, and team. You cannot govern what you cannot see.

6. **Governance is not bureaucracy.** It is the difference between a household that ends the month wondering where the money went and one that knows exactly where it went and why.

---

## What comes next

In **Dashboard and Metrics**, you will learn how to design the dashboards and reports that make this governance visible -- giving every stakeholder the right information at the right time.
