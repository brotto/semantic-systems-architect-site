---
sidebar_position: 3
title: Unit Economics
---

# Unit Economics for AI

## The lemonade stand

Before we talk about AI economics, let's talk about lemonade.

A child sets up a lemonade stand. The lemons cost $2, the sugar costs $1, the cups cost $1. Total supplies: $4. They make 20 glasses and sell each one for $1. Revenue: $20. Profit: $16. The lemonade stand is a success.

But wait. The child's parent drove to the store to buy the supplies. That drive cost $3 in gas. The table and chair came from the garage -- free, but they are blocking the car. The parent spent an hour supervising. If the parent's time is worth $30/hour, the true cost is $4 (supplies) + $3 (gas) + $30 (labor) = $37. Revenue is still $20. The lemonade stand is actually losing $17.

This is exactly what happens with AI systems. Teams calculate the token cost, see a profit, and declare success. But they forgot the gas (infrastructure), the parent's time (human review), and the blocked car (opportunity cost). Unit economics is the discipline of counting everything -- and then asking: is this worth it?

---

## Defining the "unit of value"

The first and most important step in unit economics is defining what you are counting. What constitutes one completed, valuable outcome of your AI system?

This is not as obvious as it sounds. Consider a customer support AI:

- Is the unit "one message sent"? No -- the system might send five messages to resolve one issue. Counting messages inflates your apparent productivity.
- Is the unit "one conversation"? Better, but not all conversations end in resolution. A conversation that ends with the customer hanging up in frustration is not a unit of value.
- Is the unit "one ticket resolved"? Getting closer. But resolved by whom? If the AI escalated to a human, the AI did not resolve it.
- Is the unit "one ticket resolved autonomously with positive customer satisfaction"? Now we are talking.

The unit of value must reflect **completed, quality-verified outcomes**. Here are examples across different domains:

| Domain | Bad unit definition | Good unit definition |
|--------|-------------------|---------------------|
| Customer support | Messages sent | Tickets resolved autonomously with CSAT above 4/5 |
| Legal review | Documents processed | Contracts analyzed with all risk clauses identified and verified |
| Medical triage | Patients assessed | Triage decisions made with physician-concordant accuracy |
| Content moderation | Items reviewed | Items correctly classified (true positives + true negatives) |
| Sales assistance | Recommendations made | Qualified leads generated that convert within 30 days |

### Why the unit definition matters

If you define your unit too loosely (messages sent, documents processed), you will have excellent unit economics on paper and a terrible system in practice. You will be counting activity, not value.

If you define your unit too strictly (tickets resolved in under 2 minutes with 100% accuracy and 5-star satisfaction), you will have very few units and your economics will look terrible even when the system is working well.

The right unit definition is one that your business stakeholders recognize as valuable. Ask them: "What outcome, when completed once, would you willingly pay for?" That is your unit.

---

## Cost per completed outcome

Once you have defined your unit, calculate what it truly costs to produce one.

This is harder than it seems because you must account for the costs of failure. Not every attempt at producing a unit succeeds. Some fail and must be retried. Some fail and are escalated to a human. Some fail silently and create downstream problems.

### The complete cost formula

```
Cost per completed outcome = Total system cost / Number of successfully completed outcomes
```

But "total system cost" includes everything from the cost model lesson -- inference, infrastructure, tools, human review, error correction, operations. And "successfully completed outcomes" is a subset of total attempts.

### Worked example: support ticket resolution

Imagine your AI support system handles 10,000 tickets per month:

- 7,000 are resolved autonomously with acceptable quality (70% success rate).
- 1,500 require one retry before successful resolution (15% retry rate, 80% of retries succeed = 1,200 additional successes).
- 1,500 are escalated to human agents (15% escalation rate).
- Of the 300 retried tickets that failed again, 200 are also escalated, 100 are abandoned.

Total successful AI outcomes: 7,000 + 1,200 = 8,200.

Now calculate total cost:

| Component | Monthly cost |
|-----------|-------------|
| Inference (10,000 initial + 1,500 retries = 11,500 calls) | $2,300 |
| Embedding and retrieval | $400 |
| Infrastructure | $800 |
| External API calls | $600 |
| Observability and logging | $300 |
| Human review of escalated tickets (1,700 x $8 each) | $13,600 |
| Error correction (100 abandoned x $25 each) | $2,500 |
| Operations labor (0.25 FTE x $6,000) | $1,500 |
| **Total** | **$22,000** |

Cost per completed AI outcome: $22,000 / 8,200 = **$2.68 per resolved ticket**.

Notice something important: inference cost ($2,300) is only 10.5% of total cost. Human review ($13,600) is 62%. If you only looked at token costs, you would think each ticket costs $0.28. The real cost is nearly 10x that.

### The iceberg principle

Cost per completed outcome is like an iceberg. The visible part above the water -- token costs, API calls -- is the smallest portion. Below the surface: human escalation, error correction, retries, infrastructure, and operations. Every SSA must learn to see the full iceberg.

---

## Revenue per outcome

Cost tells you what you spend. Revenue tells you what you earn. The difference is your margin.

For AI systems, "revenue" can mean different things:

### Direct revenue

The AI system directly generates money:
- A customer service chatbot that resolves tickets that would otherwise require a $15/hour agent for 20 minutes. Revenue per outcome: $5 (labor saved per ticket).
- A sales assistant that generates qualified leads. Revenue per outcome: lead value times conversion rate.

### Cost avoidance

The AI system prevents costs that would otherwise occur:
- An insurance claims triage system that catches fraudulent claims. Revenue per outcome: average fraud value times detection rate.
- A compliance monitoring system that catches violations before they become fines. Revenue per outcome: average fine value times prevention rate.

### Productivity multiplication

The AI system makes humans more productive:
- A legal review system that reduces contract review time from 4 hours to 30 minutes. Revenue per outcome: 3.5 hours of attorney time saved, times the attorney's billing rate.
- A medical triage system that allows nurses to handle 3x their normal patient volume. Revenue per outcome: additional patients seen times revenue per patient.

### How to calculate

The key principle: **connect the AI system's output to a business outcome with a dollar value.** This requires working with business stakeholders to establish the connection.

Ask these questions:
1. What happens if this task is not done by AI? Who does it, and what does that cost?
2. What is the business impact of doing this task faster? More accurately? At higher volume?
3. What is the cost of not doing this task at all?

The answers give you the revenue per outcome.

---

## Margin analysis

Margin is the difference between revenue per outcome and cost per outcome. It tells you whether your system is creating or destroying value.

```
Margin per outcome = Revenue per outcome - Cost per outcome
Margin percentage = Margin per outcome / Revenue per outcome x 100
```

### Using our support ticket example

- Cost per resolved ticket: $2.68 (from our calculation above).
- Revenue per resolved ticket: $5.00 (labor cost avoided -- a human agent would spend 20 minutes at $15/hour).
- Margin per ticket: $5.00 - $2.68 = $2.32.
- Margin percentage: $2.32 / $5.00 = 46.4%.

This is a healthy margin. The system creates $2.32 of net value per ticket it resolves.

### When margins go negative

Margins go negative when the AI system costs more to operate than the alternative it replaces. This happens more often than you think:

**Scenario: Legal contract review**
- Cost per contract reviewed by AI (including human verification): $45.
- Cost per contract reviewed by a junior paralegal: $35.
- Margin: -$10 per contract.

The AI system is more expensive than the human it was supposed to replace. This is not necessarily a failure -- the AI might be faster, more consistent, or capable of handling surge volume. But the SSA must acknowledge the negative margin and justify it with non-financial benefits, or redesign the system to bring costs down.

### Margin sensitivity

Small changes in key variables can flip margins from positive to negative:

- If your escalation rate increases from 15% to 25%, human review costs spike and your margin shrinks.
- If your model provider raises prices by 50%, your inference cost rises and your margin shrinks.
- If your error rate doubles, correction costs rise and your margin shrinks.

Build a sensitivity table: vary each key input by plus or minus 20 percent and see how margins respond. The inputs that have the biggest impact on margin are the ones you must monitor most closely.

---

## Break-even analysis

Break-even answers the question: how many successful outcomes do we need to justify the investment?

### Fixed costs vs. variable costs

Some AI system costs are fixed -- they do not change with volume:
- Infrastructure hosting.
- Operations labor.
- Tool subscriptions.
- Base observability platform.

Other costs are variable -- they scale with volume:
- Inference tokens.
- Embedding queries.
- External API calls per request.
- Human review (proportional to volume).

### The break-even formula

```
Break-even volume = Fixed monthly costs / (Revenue per outcome - Variable cost per outcome)
```

### Worked example

Using our support system:

- Fixed monthly costs: $800 (infra) + $1,500 (ops) + $300 (observability) = $2,600.
- Variable cost per outcome: $2.68 - ($2,600 / 8,200) = $2.68 - $0.32 = $2.36.
- Revenue per outcome: $5.00.
- Contribution margin per outcome: $5.00 - $2.36 = $2.64.
- Break-even volume: $2,600 / $2.64 = 985 tickets per month.

If the system resolves fewer than 985 tickets per month, it costs more than it saves. Above 985 tickets, it generates net value.

### Payback period

Beyond monthly break-even, calculate the payback period for your initial investment:

```
Payback period = Initial investment / Monthly net value
```

If you spent $50,000 building the system and it generates $2.32 x 8,200 = $19,024 of net value per month, your payback period is $50,000 / $19,024 = 2.6 months.

This is a powerful number for stakeholder conversations. "The system pays for itself in under three months" is a sentence that opens budgets.

---

## Scenario analysis: three lenses

Never present a single scenario. Always present three:

### Conservative scenario

- Volume: current, no growth.
- Error rate: current or slightly worse.
- No optimizations applied.
- Purpose: what is the floor? What happens if nothing improves?

### Base scenario

- Volume: modest growth (10-20% over 6 months).
- Error rate: current, with gradual improvement.
- Basic optimizations applied.
- Purpose: what is the realistic expectation?

### Scale scenario

- Volume: significant growth (50-100% over 12 months).
- Error rate: improved through learning and optimization.
- All planned optimizations applied.
- Purpose: what is the upside? When does the system become highly profitable?

### Why three scenarios matter

The lemonade stand analogy continues. Imagine presenting your lemonade business plan:

- **Conservative**: 20 glasses per day, $1 each, on weekends only. You make $38/month after costs. It barely covers your supplies.
- **Base**: 40 glasses per day, weekdays and weekends, some repeat customers. You make $180/month. Respectable pocket money.
- **Scale**: you expand to three stands, hire friends, sell at school events. You make $600/month. You are running a real business.

Each scenario tells a different story. Together, they tell the complete story.

---

## Practical exercise

Choose an AI system you are designing or have access to. Build its unit economics:

1. **Define the unit of value.** What is one completed, quality-verified outcome? Write it in one sentence.
2. **Calculate cost per completed outcome.** Include retries, escalations, errors, and all overhead.
3. **Estimate revenue per outcome.** What is the dollar value of one completed unit? Use labor savings, cost avoidance, or productivity multiplication.
4. **Calculate margin.** Is the system creating or destroying value per unit?
5. **Find the break-even point.** How many successful outcomes per month to justify the system?
6. **Build three scenarios.** Conservative, base, and scale. Present the range to a hypothetical stakeholder.

---

## Key takeaways

1. **Define the unit carefully.** A poorly defined unit of value leads to misleading economics. Count completed, quality-verified outcomes -- not attempts, not messages, not API calls.

2. **True cost includes failure.** Retries, escalations, error corrections, and human review are part of the cost per outcome. Ignoring them makes your economics look 5-10x better than reality.

3. **Revenue is not always revenue.** For AI systems, value often comes from cost avoidance or productivity multiplication, not direct revenue. Learn to quantify these.

4. **Margins can flip.** Small changes in error rates, escalation rates, or model pricing can turn a profitable system into a money-losing one. Know your sensitivity points.

5. **Break-even is your minimum.** Below break-even volume, the system destroys value. Above it, the system creates value. Know this number and track it.

6. **Three scenarios, always.** Conservative, base, and scale. Never present a single number. Present a range.

---

## What comes next

In **Technical Optimization**, you will learn six specific engineering levers that reduce cost per outcome without sacrificing quality. Each lever directly improves the unit economics you just learned to calculate.
