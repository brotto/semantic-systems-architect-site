---
sidebar_position: 6
title: Dashboard and Metrics
---

# AI Economic Dashboard

## Why you need a dashboard

Imagine driving a car with no speedometer, no fuel gauge, and no temperature warning light. You could still drive -- you would look out the window, listen to the engine, and smell for burning. But you would catch problems late, react slowly, and occasionally run out of gas in the middle of nowhere.

An AI system without an economic dashboard is that car. You know costs exist. You get a bill at the end of the month. But between the beginning and the end of the month, you are driving blind.

A well-designed dashboard gives you three things:

1. **Visibility**: what is happening right now? How much are we spending? Where is the money going?
2. **Trends**: are things getting better or worse? Are costs climbing, stable, or declining?
3. **Alerts**: is something abnormal happening? Do I need to act?

This lesson teaches you how to design a dashboard that provides all three, tailored to the needs of different stakeholders.

---

## Dashboard design: four metric categories

An effective AI economic dashboard organizes metrics into four categories. Each category answers a different question.

### Category 1: Consumption metrics

**Question**: how much are we using?

These are the raw consumption numbers -- the utility meter of your AI system.

| Metric | What it measures | Update frequency |
|--------|-----------------|-----------------|
| Total tokens processed (input + output) | Raw model consumption | Real-time |
| Tokens per workflow | Consumption breakdown by workflow | Hourly |
| Daily cost | Total spend today across all components | Daily |
| Monthly cost (running total) | Accumulated spend this month | Daily |
| Monthly cost (projected) | Where the month will end based on current trajectory | Daily |
| API calls to external tools | Third-party service consumption | Hourly |
| Storage utilization | Vector DB size, log storage, cache size | Daily |

**Why these matter**: consumption metrics are your fuel gauge. They tell you how fast you are burning resources. A sudden spike in tokens per workflow might indicate a prompt change that expanded context. A steady climb in storage utilization tells you that log retention policies need revisiting.

### Category 2: Efficiency metrics

**Question**: how efficiently are we converting resources into outcomes?

Consumption tells you what you spend. Efficiency tells you what you get for it.

| Metric | What it measures | Update frequency |
|--------|-----------------|-----------------|
| Cost per completed task | Total cost divided by successful outcomes | Daily |
| Cost per workflow step | How much each step in the pipeline costs | Daily |
| Tokens per completed task | Token efficiency per outcome | Daily |
| Cache hit rate | Percentage of requests served from cache | Hourly |
| Routing distribution | Percentage of requests per model tier | Hourly |
| First-attempt success rate | Percentage of tasks completed without retry | Daily |

**Why these matter**: efficiency metrics are your miles-per-gallon gauge. Two systems might spend the same amount on tokens, but one resolves twice as many tickets. The more efficient system has lower cost per outcome. Efficiency metrics help you identify which workflows are lean and which are wasteful.

### Category 3: Quality-cost trade-off metrics

**Question**: are we spending the right amount for the quality we need?

This is the most nuanced category. It connects cost to quality, revealing whether you are overspending for quality you do not need or underspending and accepting errors that cost more downstream.

| Metric | What it measures | Update frequency |
|--------|-----------------|-----------------|
| Cost per quality point | Total cost divided by quality score (e.g., cost per CSAT point) | Weekly |
| Error rate relative to cost | Are errors increasing without cost increasing? | Daily |
| Escalation rate | Percentage of tasks requiring human intervention | Daily |
| Escalation cost | Total cost of human review and correction | Weekly |
| Cost of rework | Cost incurred from retries and error correction | Weekly |
| Quality-adjusted cost per task | Cost per task weighted by quality score | Weekly |

**Why these matter**: a system that costs $2 per task with 95% quality might be better than one that costs $1.50 per task with 80% quality -- because the errors from the cheaper system cost $5 each to fix. Quality-cost trade-off metrics reveal these dynamics.

### Category 4: Trend and predictability indicators

**Question**: where are we headed?

Point-in-time numbers are useful. Trends are essential.

| Metric | What it measures | Update frequency |
|--------|-----------------|-----------------|
| Weekly cost trend | Is cost climbing, stable, or declining? | Weekly |
| Cost per task trend | Is efficiency improving or degrading? | Weekly |
| Budget consumption rate | At current pace, will we exceed the monthly budget? | Daily |
| Projected monthly spend | Extrapolation from current trajectory | Daily |
| Deviation from budget | Actual vs. planned, as a percentage | Weekly |
| Cost variance by workflow | Which workflows are deviating most from plan? | Weekly |

**Why these matter**: a system that costs $20,000 this month might be fine or alarming depending on whether last month was $19,500 (normal growth) or $12,000 (concerning acceleration). Trends give you the trajectory. Predictability indicators tell you whether you will land within budget or overshoot.

---

## Key dashboard tiles

Here is a practical layout for the primary dashboard view. This is what the SSA and product owner see first thing on Monday morning.

### Top row: the headlines

1. **Monthly cost (actual vs. budget)**: a single number showing this month's accumulated cost against the budget, with a color indicator (green = under 70%, yellow = 70-90%, red = above 90%).

2. **Cost per completed task (current vs. last month)**: a single number with a directional arrow showing whether efficiency is improving or degrading.

3. **First-attempt success rate**: a percentage showing how often the system gets it right on the first try. This directly correlates with cost efficiency -- retries are expensive.

4. **Projected month-end spend**: where you will land if current trends continue. Color-coded against the budget.

### Second row: the breakdown

5. **Cost by component (pie chart)**: inference, infrastructure, tools, human review, operations. At a glance, you can see which cost component dominates.

6. **Cost by workflow (bar chart)**: ranked by total cost. Immediately shows which workflows are the most expensive.

7. **Efficiency trend (line chart)**: cost per completed task over the past 8 weeks. The line should be flat or declining.

### Third row: the alerts

8. **Active alerts**: any budget warnings, anomalies, or threshold breaches currently in effect. Each alert shows severity, affected workflow, and time since trigger.

9. **Recent changes**: any prompt changes, model switches, or configuration updates deployed in the last 7 days. These are the usual suspects when costs change unexpectedly.

---

## Alerting: catching problems early

A dashboard that you check once a week is useful. A dashboard that tells you when something is wrong is essential.

### Cost anomaly detection

Configure alerts for unusual cost patterns:

**Spike alert**: daily cost exceeds 150% of the same day last week. This catches sudden increases from bugs, traffic spikes, or configuration errors.

**Drift alert**: the 7-day moving average of cost per task increases by more than 10% compared to the previous 7-day period. This catches gradual degradation -- prompt bloat, corpus growth, increasing conversation lengths.

**Weekend alert**: weekend cost exceeds 120% of average weekend cost. Production systems usually have lower weekend traffic. Higher-than-normal weekend costs often indicate automated processes running amok, testing hitting production, or batch jobs misconfigured.

### Budget consumption rate

Track the pace at which the monthly budget is being consumed:

- **On track**: if we are 50% through the month and have consumed 50% of the budget, we are on track.
- **Ahead of budget**: if we are 50% through the month but have consumed 65% of the budget, project the overrun and alert.
- **Formula**: projected month-end spend = (current spend / days elapsed) x days in month.

Alert when projected month-end spend exceeds the budget by more than 10%.

### Projected overrun

When a budget overrun is projected, the alert should include:

- The projected overage amount.
- The workflow(s) contributing most to the overage.
- Recent changes that might explain the increase.
- Suggested actions (throttle non-essential workflows, activate caching more aggressively, defer batch processing).

---

## Reporting: the right information for the right audience

Different stakeholders need different views of the same data. Sending the executive the same 40-metric dashboard that the SSA uses is like sending the CEO a spreadsheet of every transaction instead of a P&L statement.

### Executive report

**Audience**: VP, C-suite, business leadership.
**Frequency**: monthly, or on request.
**Format**: one page, 5-7 key numbers, narrative summary.

Content:
- Total AI spend this month vs. budget.
- Cost per completed outcome (blended across all products).
- ROI: value generated vs. cost incurred.
- Month-over-month trend (improving, stable, declining).
- One paragraph narrative: what happened, what we did about it, what we plan next.

The executive does not care about cache hit rates or token counts. They care about three things: how much did we spend, what did we get for it, and are we getting better?

### Technical report

**Audience**: SSA, engineering leads, platform team.
**Frequency**: weekly.
**Format**: dashboard with drill-down capability, 2-3 page summary of changes and experiments.

Content:
- All four metric categories in full detail.
- Per-workflow breakdown of cost and efficiency.
- Results of any optimization experiments run that week.
- Anomalies detected and root causes identified.
- Planned changes for the coming week and their expected cost impact.

The technical team needs granularity. They need to see which specific workflow is driving costs, which optimization lever is working, and which experiment should be rolled out.

### Financial report

**Audience**: FinOps team, finance department, procurement.
**Frequency**: monthly, aligned with financial close.
**Format**: structured report with actual vs. budget comparison, variance analysis, forecast.

Content:
- Actual spend by product, workflow, and team.
- Variance analysis: where did we over-spend or under-spend, and why?
- Forecast for next month and next quarter.
- Vendor cost breakdown (which providers, how much each).
- Contract utilization (committed spend vs. actual spend for volume-discounted contracts).

The financial team needs numbers that reconcile with invoices, fit into cost centers, and support budget planning.

---

## Building your dashboard: practical guidance

### Tool selection

You do not need a custom dashboard platform. Most teams can build an effective AI economic dashboard using:

- **Existing BI tools**: Grafana, Looker, Metabase, or even Google Sheets for early-stage systems.
- **Observability platforms**: Datadog, New Relic, or similar platforms that already collect infrastructure metrics can be extended with custom AI cost metrics.
- **Specialized AI observability tools**: LangSmith, Langfuse, Helicone, or similar platforms that are designed for LLM observability and often include cost tracking.

The best dashboard is the one people actually look at. If your team already uses Grafana, put the AI cost dashboard in Grafana. Do not build a separate system that nobody visits.

### Data pipeline

Your dashboard is only as good as the data feeding it. Ensure:

- Every LLM call logs token counts (input and output), model used, latency, and the cost at current pricing.
- Every request is tagged with product, workflow, and team identifiers.
- Human review events are logged with duration and outcome.
- Error and retry events are logged with the original request identifier.
- All logs flow to a central data store where they can be aggregated and queried.

### Iteration

Start simple. A dashboard with five metrics that people check daily is better than a dashboard with fifty metrics that nobody opens. Launch with the top-row headlines (monthly cost, cost per task, success rate, projection) and add detail as the team's needs evolve.

---

## Key takeaways

1. **Four categories, four questions.** Consumption (how much?), efficiency (how well?), quality-cost trade-offs (are we balanced?), and trends (where are we headed?).

2. **The Monday morning test.** If you open the dashboard on Monday morning, you should know within 30 seconds whether things are fine or whether you need to investigate.

3. **Alerts before dashboards.** A dashboard you check weekly misses problems that happen on Tuesday. Alerts catch them in real time.

4. **Three audiences, three reports.** Executives want the summary. Technical teams want the detail. Finance wants the numbers that reconcile with invoices.

5. **Start simple, iterate.** Five metrics that people use beat fifty metrics that people ignore.

---

## What comes next

In the **Cost Optimization Lab**, you will put everything together: cost model, unit economics, optimization levers, governance, and dashboard -- all applied to a practical challenge of reducing cost per task by 25% while maintaining quality.
