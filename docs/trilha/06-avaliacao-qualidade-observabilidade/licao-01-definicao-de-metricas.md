---
sidebar_position: 2
sidebar_label: "Lesson 1 — Metric definition"
---

# Lesson 1 — Metric definition

## The restaurant that measured everything (except what mattered)

Imagine a restaurant that tracks every operational metric imaginable. They know the average cooking time for every dish. They know the exact temperature of every refrigerator, checked every hour. They know how many plates were washed per shift, how many napkins were folded, how many times the bathroom was cleaned.

But they don't track customer satisfaction. They don't measure how many customers come back. They don't know whether the food actually tastes good.

One day, they notice revenue is dropping. They look at their dashboards — everything is green. Cooking times are fast. Fridges are cold. Plates are clean. Yet customers are leaving. It turns out the chef changed the seasoning on their most popular dish three weeks ago, and nobody measured the impact because "taste" wasn't in the metrics dashboard.

**This is what happens when you measure the wrong things.** You get a dashboard full of green lights while your system quietly fails at the thing that actually matters.

In AI systems, the same trap is everywhere. You can measure response latency down to the millisecond, track token costs to the penny, and log every API call — while your agent gradually starts giving worse answers, drifting from policy, or confusing customers. All without triggering a single alert.

This lesson teaches you how to define the RIGHT metrics — the ones that actually tell you whether your system is doing its job.

---

## The metric chain: from business to signal

The most important concept in metric design is the **metric chain** — a traceable link from what the business cares about, to what you can measure technically.

Think of it like a chain with three links:

```
BUSINESS KPI
  "What does the business care about?"
      |
      v
QUALITY INDICATOR
  "What system behavior drives that KPI?"
      |
      v
TECHNICAL SIGNAL
  "What can I actually measure in the system?"
```

**Everyday analogy: a hospital.** The hospital's business KPI is "patient outcomes" — did the patient get better? But you can't measure that in real time while treating a patient. So you use quality indicators: "Is the treatment following the established protocol?" And to measure that, you track technical signals: vital signs, medication dosage logs, treatment timestamps.

The chain is: Patient recovers (KPI) --> Treatment follows protocol (quality indicator) --> Vitals are in range, meds given on time (technical signal).

Without this chain, you end up measuring things that don't connect to what matters. With it, every metric you track has a clear reason for existing.

---

## Building your first metric chain

Let's walk through a concrete example for an AI customer support system.

### Step 1: Start with the business KPI

Ask: "What does the business ultimately care about?"

For a customer support system, the business cares about:
- Customer satisfaction (measured by CSAT surveys)
- Issue resolution rate (did the problem get solved?)
- Support cost per ticket (how much does each interaction cost?)
- Customer retention (did the customer stay with us?)

Pick one. Let's take **customer satisfaction (CSAT)**.

### Step 2: Identify quality indicators

Ask: "What system behaviors drive customer satisfaction?"

Research and common sense tell us customers are satisfied when:
- Their question is answered correctly (accuracy)
- The answer comes quickly (responsiveness)
- The tone is appropriate (professionalism)
- They don't have to repeat themselves (context retention)
- The agent stays within its expertise and admits when it doesn't know (honesty)

These are your quality indicators. Each one is a behavior you can observe and evaluate.

### Step 3: Define technical signals

Ask: "For each quality indicator, what can I actually measure in the system?"

| Quality indicator | Technical signal | How to measure |
|---|---|---|
| Accuracy | Answer correctness score | Compare agent answer to verified ground truth on test cases |
| Responsiveness | Time to first response | Timestamp difference from request to first agent output |
| Professionalism | Tone compliance score | LLM-as-judge evaluation against tone rubric |
| Context retention | Repeat-question rate | Count instances where customer restates their question |
| Honesty | Uncertainty acknowledgment rate | Count instances where agent says "I don't know" appropriately vs. fabricates |

### The complete chain

```
METRIC CHAIN — Customer satisfaction

BUSINESS KPI: Customer satisfaction (CSAT >= 4.2/5)
  |
  +--> QUALITY: Accuracy
  |      SIGNAL: correctness score (target >= 90%)
  |      SOURCE: eval suite comparison against ground truth
  |
  +--> QUALITY: Responsiveness
  |      SIGNAL: time to first response (target < 3 seconds)
  |      SOURCE: system timestamps
  |
  +--> QUALITY: Professionalism
  |      SIGNAL: tone compliance (target >= 95%)
  |      SOURCE: LLM-as-judge on sample of conversations
  |
  +--> QUALITY: Context retention
  |      SIGNAL: repeat-question rate (target < 5%)
  |      SOURCE: conversation analysis
  |
  +--> QUALITY: Honesty
         SIGNAL: appropriate uncertainty rate (target >= 85%)
         SOURCE: eval suite with unknown-answer test cases
```

Now every metric on your dashboard has a direct line to "why do I care about this number?" If accuracy drops from 92% to 85%, you know that customer satisfaction is at risk — and you know exactly where to investigate.

---

## Two families of metrics

AI system metrics fall into two distinct families, and you need both.

### Family 1: Objective metrics

**What they are:** metrics that can be measured mechanically, without human judgment. A script, a formula, or a log query can compute them automatically.

**Everyday analogy: the speedometer and fuel gauge in your car.** You don't need an expert to tell you how fast you're going or how much fuel you have. The instruments measure it directly, precisely, and continuously.

**The core objective metrics:**

**Accuracy / Correctness**
- What it measures: does the system produce the right answer?
- How to measure: compare outputs against a known-correct reference (the "golden" answer)
- Example: for a classification agent, accuracy = correct classifications / total classifications
- Nuance: in AI systems, "correct" is often not binary. A partially correct answer needs partial credit scoring.

**Latency**
- What it measures: how long does the system take to respond?
- How to measure: timestamps at each stage of the pipeline
- Layers to track:
  - End-to-end latency (request in to response out)
  - Model inference time (how long the LLM took)
  - Tool execution time (how long external calls took)
  - Queue wait time (how long the request waited before processing)
- Why it matters: a perfect answer that takes 30 seconds may be worse than a good answer that takes 2 seconds.

**Cost**
- What it measures: how much does each interaction cost?
- How to measure: token usage (input + output) multiplied by model pricing, plus tool call costs
- Components:
  - Model tokens (the dominant cost for most systems)
  - API calls to external tools
  - Retrieval costs (embedding generation, vector search)
  - Infrastructure (compute, storage, network)
- Why it matters: a system that works perfectly but costs ten dollars per interaction won't survive in production.

**Completion rate**
- What it measures: does the system finish the task, or does it fail/hang/timeout?
- How to measure: percentage of requests that produce a valid response within the expected timeframe
- Failure modes to track:
  - Timeout (the system took too long and was killed)
  - Error (an exception or error code was returned)
  - Empty response (the model returned nothing)
  - Malformed output (response doesn't match expected schema)
- Why it matters: a system that produces great answers 90% of the time but crashes 10% of the time has a serious problem.

### Family 2: Semantic metrics

**What they are:** metrics that measure the MEANING and QUALITY of the system's output. These require judgment — either human judgment, LLM-as-judge evaluation, or carefully designed heuristics.

**Everyday analogy: a food critic's review.** You can measure a restaurant's cooking time with a stopwatch (objective). But measuring whether the food is "delicious," "well-balanced," or "creative" requires a trained palate and informed judgment. Both types of measurement are essential — fast food that tastes terrible isn't worth much, and delicious food that takes three hours isn't either.

**The core semantic metrics:**

**Coherence**
- What it measures: does the response make logical sense? Are the parts consistent with each other? Does the reasoning flow?
- Why it's hard to measure: coherence requires understanding the content, not just counting tokens.
- How to measure: LLM-as-judge with a rubric ("On a scale of 1-5, how logically coherent is this response? 1 = contradicts itself, 5 = perfectly logical flow") or human evaluation on a sample.
- Example failure: an agent that recommends both "upgrade your plan for more features" and "your current plan already includes all features" in the same response.

**Policy adherence**
- What it measures: does the response follow all the rules and policies defined in the system's constraints?
- Why it matters: an agent that gives accurate, helpful answers but occasionally violates company policy is a liability.
- How to measure: test with scenarios specifically designed to tempt policy violation. Score as pass/fail.
- Example: a financial agent that provides accurate stock information but occasionally says "you should buy this stock" (violating the "no investment advice" policy).

**Usefulness**
- What it measures: did the response actually help the user accomplish their goal?
- Why it's different from accuracy: an answer can be technically accurate but useless. "What time does the store close?" --> "The store's operating hours can be found on our website." Technically accurate. Completely unhelpful.
- How to measure: rubric-based evaluation ("Did the response address the user's actual question? Did it provide actionable information? Could the user proceed with their task after reading this response?")
- The usefulness hierarchy: actionable answer > informative answer > directional answer > deflection > wrong answer.

**Trust**
- What it measures: does the system appropriately handle uncertainty, cite sources, and avoid fabricating information?
- Components:
  - Hallucination rate: how often does the system state false information as fact?
  - Source attribution: when the system uses retrieved information, does it cite where it came from?
  - Uncertainty expression: when the system isn't sure, does it say so?
  - Overconfidence detection: does the system express high confidence on topics where it should be uncertain?
- How to measure: test with questions that have no answer in the knowledge base (the system should say "I don't know"), questions with ambiguous answers (the system should express uncertainty), and questions with known answers (the system should be confident and correct).

---

## Why you need both families

Consider a customer support agent:

- **High objective, low semantic:** responds in 0.5 seconds, costs 0.002 per request, never crashes... but gives incoherent answers that don't help the customer. Fast garbage is still garbage.

- **High semantic, low objective:** gives beautifully coherent, policy-compliant, deeply helpful answers... but takes 45 seconds and costs 2 dollars per request. The business can't afford it.

- **Both high:** responds in 2 seconds, costs 0.01 per request, gives accurate and helpful answers that follow all policies. This is the target.

The two families create a two-dimensional quality space. Your system needs to score well on BOTH axes to be production-ready.

---

## The metric contract

Just like agents have contracts (from Module 2) and context packages (from Module 5), metrics need contracts. A **metric contract** formalizes everything about a metric: what it measures, how it's computed, what the targets are, and who is responsible.

```
METRIC CONTRACT

Name: Answer correctness
Family: Semantic
Metric chain:
  KPI: Customer satisfaction (CSAT >= 4.2)
  Quality indicator: Accuracy of agent responses
  Technical signal: Correctness score from eval suite

Definition:
  Percentage of test cases where the agent's answer matches
  the expected answer according to the scoring rubric.
  Partial credit: 0.5 for partially correct answers.

Measurement method:
  - Automated: run eval suite of 50+ golden test cases weekly
  - Human: review sample of 20 production conversations monthly
  - LLM-as-judge: evaluate 100 random production responses daily

Targets:
  - Green: >= 92%
  - Yellow: 85-91% (investigate within 48 hours)
  - Red: < 85% (investigate immediately, consider rollback)

Baseline: 89% (measured on 2024-03-15 with eval suite v1)

Owner: SSA team lead
Review frequency: weekly
Alert channel: #quality-alerts
Dashboard: Quality metrics page, row 3

Known limitations:
  - Eval suite doesn't cover multi-turn conversations yet
  - Partial credit scoring is subjective (rubric v1 needs refinement)
  - Baseline was measured on a 50-case suite; expanding to 100 cases
    in next iteration
```

### Why metric contracts matter

Without a metric contract, metrics become ambiguous:
- "Accuracy dropped!" — Accuracy of what? Measured how? Compared to what baseline?
- "The system is slow!" — How slow? Which part? Compared to what target?
- "Quality is fine." — Fine by whose definition? Measured when? Using which test suite?

The metric contract eliminates this ambiguity. When someone says "accuracy dropped to 84%," everyone knows that means it's in the red zone, that the SSA team lead needs to investigate immediately, and that a rollback might be necessary.

---

## Designing your metric set

A common mistake is to track too many metrics. Like a car dashboard with 200 gauges — you can't watch them all, so you end up watching none.

**The ideal metric set has 5-8 metrics** across both families:

### The starter set

```
OBJECTIVE METRICS (4)
  1. Completion rate (does the system finish the task?)
  2. End-to-end latency (how fast?)
  3. Cost per interaction (how expensive?)
  4. Error rate (how often does it crash?)

SEMANTIC METRICS (4)
  5. Correctness (is the answer right?)
  6. Policy adherence (does it follow the rules?)
  7. Usefulness (does it help the user?)
  8. Trust (does it handle uncertainty honestly?)
```

### Prioritizing metrics

Not all metrics are equally important. Use the **pain-of-failure test:** imagine this metric drops to zero. How much damage is done?

- Policy adherence drops to 0%: the agent starts violating rules, giving medical advice, sharing private data. **Catastrophic.** This is a top-priority metric.
- Latency drops to 0% (infinitely slow): the system is unusable but not dangerous. **Severe but not catastrophic.**
- Cost efficiency drops to 0% (infinitely expensive): the system works but costs a fortune. **Painful but manageable short-term.**

This prioritization helps you decide where to invest in measurement infrastructure first.

---

## The alignment trap

The most dangerous situation in metric design is **metric misalignment** — when your metrics say "everything is fine" but the actual user experience is degrading.

**Everyday analogy: a school that optimizes for test scores.** The school measures student performance by standardized test scores. Teachers start "teaching to the test" — drilling students on exactly the types of questions that appear on the exam. Test scores go up. The school celebrates. But the students can't think critically, can't apply knowledge to new situations, and can't collaborate. The metric improved while the actual quality of education declined.

In AI systems, metric misalignment looks like:

- **Optimizing latency by giving shorter answers.** Latency drops from 3 seconds to 1 second. But the answers are now too brief to be useful. Latency metric: green. Usefulness metric: red. If you only track latency, you miss the problem.

- **Optimizing accuracy by narrowing the test suite.** You remove the hardest test cases because they're "unrealistic." Accuracy jumps from 85% to 95%. But the system is just as bad at hard cases — you just stopped measuring them.

- **Optimizing cost by using a cheaper model.** Cost per interaction drops by 60%. But the cheaper model hallucinates more, follows policy less consistently, and produces less helpful answers. If you only track cost, the switch looks like a success.

**The defense against misalignment:** always track metrics from BOTH families, and always investigate when one metric improves dramatically — check whether other metrics degraded as a trade-off.

---

## From individual metrics to a quality scorecard

Individual metrics are useful, but the real power comes from combining them into a **quality scorecard** — a single view that shows the overall health of your system.

```
QUALITY SCORECARD — Customer Support Agent
Date: 2024-03-22
Eval suite version: v1.3

OBJECTIVE METRICS
  Completion rate:      97.2%   [GREEN]  target: >= 95%
  Avg latency:           2.1s   [GREEN]  target: < 3s
  Cost per interaction: $0.012  [GREEN]  target: < $0.02
  Error rate:            0.8%   [GREEN]  target: < 2%

SEMANTIC METRICS
  Correctness:          88.5%   [YELLOW] target: >= 92%
  Policy adherence:     96.0%   [GREEN]  target: >= 95%
  Usefulness:           82.3%   [YELLOW] target: >= 85%
  Trust:                91.0%   [GREEN]  target: >= 90%

OVERALL STATUS: YELLOW (2 metrics below target)

ACTION ITEMS:
  1. Investigate correctness drop (was 92.1% last week)
     - Likely cause: new product catalog not in knowledge base
  2. Improve usefulness score
     - Root cause analysis needed (review failed cases)

TREND: correctness declining for 3 consecutive weeks (92.8 -> 92.1 -> 88.5)
       This suggests a systemic issue, not random variation.
```

The scorecard tells you in 30 seconds whether the system is healthy, what needs attention, and what the trends look like. It's the equivalent of a doctor reading a patient's chart — a quick overview that highlights what needs deeper investigation.

---

## Practice activity

Build a metric contract set for your system:

1. **Identify 2-3 business KPIs** that your system should ultimately improve. These should come from your original problem statement (Module 1) or your stakeholder analysis.

2. **Build metric chains** for each KPI. For each one, identify 2-3 quality indicators and map each to a measurable technical signal.

3. **Select your metric set.** Choose 5-8 metrics (balanced across objective and semantic families). Apply the pain-of-failure test to prioritize them.

4. **Write metric contracts** for your top 3 metrics. Include: name, family, metric chain, definition, measurement method, targets (green/yellow/red), baseline, owner, and known limitations.

5. **Design your quality scorecard.** Create the template showing all metrics, their current values, their status, and action items for any metrics outside the green zone.

6. **Check for alignment traps.** For each metric, ask: "If this metric improved by 20%, could another metric get WORSE as a side effect?" Document the potential trade-offs.

---

## Key takeaways

1. **Metrics must connect to business value through a traceable chain.** KPI to quality indicator to technical signal. If you can't trace a metric back to something the business cares about, question whether you should be tracking it.

2. **You need both objective and semantic metrics.** Objective metrics (latency, cost, completion rate) tell you whether the system RUNS well. Semantic metrics (correctness, policy adherence, usefulness, trust) tell you whether it WORKS well. A system that runs well but doesn't work well is useless. A system that works well but doesn't run well is unaffordable.

3. **Metric contracts eliminate ambiguity.** When everyone agrees on what a metric means, how it's measured, and what the targets are, conversations about quality become productive instead of argumentative.

4. **Watch for the alignment trap.** When one metric improves dramatically, check the others. Optimization on one dimension often comes at the cost of another. The quality scorecard — showing all metrics together — is your best defense.

5. **Start with 5-8 metrics, not 50.** A dashboard you actually look at with 6 metrics beats a dashboard you ignore with 60. You can always add more later, but you can't take back the months you spent not watching the metrics that mattered.

---

## What comes next

You now know WHAT to measure. In **Lesson 2 — Eval suite construction**, you'll learn HOW to measure it — by building the test infrastructure that evaluates your system rigorously, repeatedly, and automatically.
