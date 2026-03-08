---
sidebar_position: 7
title: Cost Optimization Lab
---

# Lab -- AI Cost Optimization

## The challenge

You are the SSA for a production AI system. The system works. Quality is acceptable. Stakeholders are satisfied with the outputs. But the finance team has flagged the operating cost as too high relative to the value generated. Your mission: **reduce the cost per completed task by 25% while maintaining quality and safety standards.**

This is not a hypothetical exercise. This is the most common request an SSA receives after an AI system has been in production for three months. The honeymoon is over. The invoices are real. And someone is asking: can we do the same work for less money?

The answer is almost always yes -- if you approach it methodically.

---

## How this lab works

You will work through five phases, each building on the previous:

1. **Baseline measurement** -- understand exactly where you are today.
2. **Lever identification** -- find the specific opportunities for cost reduction.
3. **Implementation** -- execute the optimizations.
4. **Measurement** -- quantify the results.
5. **Analysis and governance** -- interpret the results and lock in the gains.

You may use a real system you are working on or a hypothetical system based on the examples in this module. If using a hypothetical system, choose a domain you understand well (customer support, legal review, content moderation, etc.) and create realistic numbers based on the cost model and unit economics lessons.

---

## Phase 1: Baseline measurement

Before you optimize anything, you must know exactly where you stand. You cannot improve what you have not measured.

### Step 1.1: Build the cost model

Using the methodology from the Cost Model lesson, document every cost component of your system:

- Inference cost: tokens in, tokens out, model tier, price per token, monthly volume.
- Embedding and indexing cost: corpus size, refresh frequency, embedding price.
- Infrastructure cost: vector database, storage, compute, networking.
- External tool cost: API calls per request, price per call, monthly volume.
- Observability cost: logging, tracing, evaluation pipeline.
- Human review cost: escalation rate, review time, labor cost.
- Error correction cost: error rate, cost per error.
- Operations cost: FTE fraction dedicated to system maintenance.

**Deliverable**: a complete cost model spreadsheet showing total monthly cost and cost breakdown by component.

### Step 1.2: Calculate unit economics

Using the methodology from the Unit Economics lesson:

- Define your unit of value (one sentence).
- Calculate total successful outcomes per month.
- Calculate cost per completed outcome.
- Estimate revenue or value per outcome.
- Calculate margin.

**Deliverable**: a unit economics summary showing cost per outcome, value per outcome, margin, and break-even volume.

### Step 1.3: Identify the cost distribution

Where is the money going? Create a breakdown:

- What percentage of total cost is inference? Infrastructure? Human review? Tools? Operations?
- Which workflows consume the most cost? Is it proportional to their volume, or are some workflows disproportionately expensive?
- What is the cost distribution across requests? Do 5% of requests consume 40% of the budget?

**Deliverable**: a cost distribution analysis with pie charts (by component, by workflow) and a histogram of cost per request.

---

## Phase 2: Lever identification

Now that you know where the money goes, identify where it can be saved.

### Step 2.1: Map each lever to your system

For each of the six optimization levers from the Technical Optimization lesson, assess applicability to your system:

| Lever | Applicable? | Estimated savings | Quality risk | Effort |
|-------|------------|-------------------|-------------|--------|
| Model-tier routing | Yes/No | X% | Low/Med/High | X weeks |
| Semantic caching | Yes/No | X% | Low/Med/High | X weeks |
| Context compression | Yes/No | X% | Low/Med/High | X weeks |
| RAG optimization | Yes/No | X% | Low/Med/High | X weeks |
| Batch processing | Yes/No | X% | Low/Med/High | X weeks |
| Flow budget control | Yes/No | X% | Low/Med/High | X weeks |

Not every lever applies to every system. A system without RAG cannot optimize retrieval. A system that requires real-time responses cannot use batch processing. Be honest about applicability.

### Step 2.2: Prioritize

Rank the applicable levers by the ratio of estimated savings to implementation effort. Start with the highest-impact, lowest-effort levers.

A practical prioritization matrix:

- **Do first**: high savings, low effort, low quality risk. These are your quick wins.
- **Do second**: high savings, medium effort, low-medium quality risk. These require more work but are worth it.
- **Do carefully**: high savings, any effort, high quality risk. These need controlled experiments before deployment.
- **Skip for now**: low savings, high effort. Not worth the investment at this stage.

### Step 2.3: Select at least three levers

Choose a minimum of three levers to implement. This is important because:

- A single lever rarely achieves a 25% reduction alone.
- Multiple small optimizations compound. Three levers saving 10% each produce a cumulative reduction of approximately 27% (1 - 0.9 x 0.9 x 0.9 = 0.271).
- Diversifying your optimization strategy reduces the risk that any single change causes quality problems.

**Deliverable**: a prioritized lever map with estimated savings, quality risks, and implementation plan for each selected lever.

---

## Phase 3: Implementation

Execute your selected optimizations. For each lever, run a controlled experiment before full deployment:

**Experiment design**: split traffic 50/50 between the current system (control) and the optimized system (treatment). Run for at least one week -- two weeks preferred for statistical significance. Track cost per request, cost per completed outcome, quality score, error rate, and escalation rate for both groups.

**Monitoring**: check cost and quality metrics daily for both groups. Have an immediate rollback plan if quality drops below acceptable thresholds. Log all edge cases and failures in the treatment group.

**Decision**: after the experiment period, compare treatment to control. Did cost decrease? Did quality change? Were there unexpected side effects (latency increase, new error patterns)? If the optimization passes your quality bar and delivers meaningful savings, proceed to full deployment. If not, investigate, adjust, and re-run.

**Deliverable**: experiment results for each lever, including cost and quality metrics for control and treatment groups.

---

## Phase 4: Measurement

After deploying all selected optimizations, measure the cumulative impact.

### Step 4.1: Recalculate the cost model

Rebuild the cost model with post-optimization data:

- New inference costs (reflecting model routing, caching, compression).
- New infrastructure costs (reflecting any changes).
- New human review costs (reflecting reduced error and escalation rates, if applicable).
- New total monthly cost.

### Step 4.2: Recalculate unit economics

- New cost per completed outcome.
- New margin.
- New break-even volume.

### Step 4.3: Compare before and after

Create a comparison table:

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Total monthly cost | $X | $Y | -Z% |
| Cost per completed task | $A | $B | -C% |
| Quality score | D | E | +/-F% |
| Error rate | G% | H% | +/-I% |
| Escalation rate | J% | K% | +/-L% |
| Margin per task | $M | $N | +O% |

The target is a 25% reduction in cost per completed task with no more than a 2-3% degradation in quality metrics.

**Deliverable**: a before-and-after comparison showing all key metrics.

---

## Phase 5: Analysis and governance

Savings that are not protected will erode. This final phase ensures your gains persist.

### Step 5.1: Root cause analysis

For each optimization that worked, document:

- What was the root cause of the excess cost? (Example: all requests were routed to the large model regardless of complexity.)
- What lever addressed it? (Example: model-tier routing sent 60% of requests to the small model.)
- What was the measured impact? (Example: 35% reduction in inference cost, 0.5% reduction in quality score.)
- What are the ongoing maintenance requirements? (Example: routing classifier needs retraining quarterly.)

For each optimization that did not work or had unexpected side effects, document:

- What happened?
- Why did the expected savings not materialize?
- What would you do differently next time?

### Step 5.2: Governance plan

Create a governance plan to maintain the gains:

- **Monitoring**: which metrics will you track to ensure optimizations remain effective?
- **Alerts**: what thresholds will trigger investigation if costs start climbing back?
- **Review cadence**: how often will you review the optimization effectiveness? (Monthly recommended.)
- **Ownership**: who is responsible for maintaining each optimization?
- **Documentation**: where is the optimization documented so that future team members understand why the system is configured this way?

### Step 5.3: Roadmap for further optimization

Based on your experience, identify:

- Levers you did not implement in this round that could deliver additional savings.
- New optimizations enabled by the changes you made (e.g., now that you have model routing, you can implement per-tier caching).
- Estimated savings from the next round of optimization.

**Deliverable**: a governance plan and a roadmap for future optimization.

---

## Mandatory deliverables

To complete this lab, submit the following:

1. **Current economic baseline**: complete cost model and unit economics for the system before optimization.
2. **Lever map with estimated impact**: prioritized list of at least three optimization levers with estimated savings and quality risks.
3. **Experiment results**: documented experiments for each implemented lever, showing control vs. treatment metrics.
4. **Before-and-after comparison**: comprehensive metric comparison showing cost reduction achieved and quality impact.
5. **Governance plan**: monitoring, alerts, review cadence, and ownership for maintaining the gains.

---

## Evaluation rubric

Your lab submission will be evaluated on five criteria:

| Criterion | Weight | What evaluators look for |
|-----------|--------|--------------------------|
| Relevance of chosen levers | 25% | Levers address the largest cost drivers. Prioritization is well-reasoned. Inapplicable levers are excluded. |
| Quality of economic measurement | 25% | Cost model is complete (all five components plus hidden costs). Unit economics are correctly calculated. Before-and-after comparisons are rigorous. |
| Preservation of quality indicators | 20% | Quality metrics remain within acceptable bounds. Quality is measured alongside cost in every experiment. Any degradation is documented and addressed. |
| Experimental rigor | 15% | Controlled experiments (control vs. treatment) are used. Experiments run for sufficient duration. Unexpected findings are documented. |
| Feasibility at scale | 15% | Optimizations can be maintained without constant manual effort. Governance plan is realistic. A new team member could maintain the system from the documentation. |

**Scoring**: Exceptional (90-100%) means all criteria are met with rigorous measurement and comprehensive governance. Proficient (75-89%) means most criteria are met with minor gaps. Developing (60-74%) means cost reduction is achieved but with significant gaps in measurement or governance. Below expectations (below 60%) means the cost target is missed or quality is degraded without acknowledgment.

---

## Final note

The ability to reduce cost while preserving quality is one of the most valuable skills an SSA can develop. It is the skill that keeps AI systems alive past the prototype stage. It is the skill that earns trust from finance teams. And it is the skill that makes the difference between an AI system that runs for three months and one that runs for three years.

Every optimization you implement is a vote for the sustainability of the system you designed. Make each one count.
