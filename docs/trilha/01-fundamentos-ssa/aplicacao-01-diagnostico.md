---
sidebar_position: 5
sidebar_label: "Application A — Current-state diagnosis"
---

# Application A — Current-state diagnosis

## Objective

In this application, you will analyze a real system and discover its **hidden semantic decisions** — the rules, policies, and logic that exist inside the system but were never stated explicitly.

This is the SSA's diagnostic skill: seeing the meaning that's buried in code, processes, or tribal knowledge, and bringing it to the surface.

---

## Why this matters

Every existing system is full of decisions that nobody documented.

- Why does the system show these items first and not others? (a ranking decision)
- Why does it send an alert at this threshold and not another? (a policy decision)
- Why does it route this type of request to this team? (a classification decision)
- Why does it reject this input but accept that one? (a validation decision)

These decisions were made by someone, at some point, for some reason. But over time, the reason was forgotten. The decision lives on in the code, invisible and unquestioned.

The SSA's diagnostic work surfaces these decisions, makes them explicit, and transforms them into semantic contracts that can be reviewed, debated, and improved.

**Everyday analogy:** think about the "rules" in your household that nobody ever wrote down. Why does everyone sit in the same seat at the dinner table? Why does the dog get fed before breakfast? Why does someone always check the front door is locked at night? These are implicit protocols — decisions that govern behavior but were never formally decided. They just happened. An SSA surfaces these kinds of implicit decisions in systems.

---

## The assignment

Choose one of the following:

**Option 1: A system at your workplace.** Pick a system you use or work with — a CRM, a ticketing system, an internal tool, an e-commerce platform, a content management system. Anything with enough complexity to have hidden decisions.

**Option 2: A system you use daily.** Pick a consumer product you know well — a food delivery app, an email client, a ride-sharing app, a streaming service, an online marketplace.

**Option 3: A process you participate in.** Pick a business process (not necessarily software) — hiring, customer onboarding, order fulfillment, event planning, budget approval. Processes are systems too.

---

## Step-by-step guide

### Step 1: Observe the system (30 minutes)

Use the system (or walk through the process) with fresh eyes. Pretend you're seeing it for the first time. Notice everything.

Ask yourself:
- What happens when I do X? What about Y?
- What options are available? What's missing?
- What happens when something goes wrong?
- What seems automatic? What requires a decision?
- What feels like a "rule" but isn't written anywhere?

**Take notes.** Write down every behavior you observe, even if it seems trivial.

**Analogy:** think of yourself as an anthropologist studying a culture. You don't judge — you observe and document. "They always greet customers by name" is an observation. "Their greeting policy is inadequate" is a judgment. At this stage, just observe.

### Step 2: Identify 10 hidden decisions (45 minutes)

From your observations, identify at least 10 decisions that the system makes (or that people make within the system) that are not explicitly documented.

For each decision, answer:

| Question | Your answer |
|---|---|
| **What is the decision?** | Describe it in one sentence |
| **Who or what makes it?** | A person, an algorithm, a rule, a default setting? |
| **What information is used?** | What inputs drive this decision? |
| **What are the possible outcomes?** | What can the decision produce? |
| **Where is the rule stored?** | In code? In someone's head? In a document nobody reads? In "that's how we've always done it"? |
| **What happens if this decision is wrong?** | What's the impact of a mistake? |

**Example decision from a food delivery app:**

| Question | Answer |
|---|---|
| **Decision** | How to rank restaurants in the user's feed |
| **Who makes it** | An algorithm |
| **Information used** | User location, past orders, restaurant ratings, delivery time, promotions |
| **Possible outcomes** | Ordered list of restaurants (some appear at top, some are buried) |
| **Where stored** | In code — the ranking algorithm is not visible to anyone except engineers |
| **Impact of error** | Users don't find what they want, order less, eventually switch apps |

### Step 3: Rewrite as semantic contracts (45 minutes)

Take your 10 decisions and transform each one into a semantic contract. A semantic contract has three parts:

**Input contract:** what information enters the decision
**Decision contract:** what rules, priorities, and trade-offs govern the decision
**Output contract:** what the decision produces and what guarantees it offers

**Example:**

**Decision: Restaurant ranking**

> **Input:** user GPS location, order history (last 30 days), restaurant ratings (last 90 days), current delivery estimates, active promotions
>
> **Decision rules:**
> - Primary sort: estimated delivery time (fastest first)
> - Secondary sort: user preference match (based on order history)
> - Boost: active promotions get +20% visibility
> - Filter: exclude restaurants with rating below 3.5
> - Filter: exclude restaurants with estimated delivery over 60 minutes
>
> **Output:** ordered list of up to 30 restaurants, each with: name, cuisine type, rating, estimated delivery time, promotion badge (if applicable)
>
> **Constraints:** never show closed restaurants; never rank a restaurant higher solely because it paid for promotion (unless clearly labeled as "sponsored")

Notice how much richer this is than "the app shows me restaurants." The semantic contract makes every decision explicit, reviewable, and debatable.

### Step 4: Identify patterns and risks (30 minutes)

Review your 10 semantic contracts and look for:

**Patterns:**
- Are there decisions that affect each other? (e.g., the ranking decision affects which restaurants get orders, which affects their ratings, which affects their ranking — a feedback loop)
- Are there decisions that use the same information? (opportunity to share a common data source)
- Are there decisions that follow the same structure? (opportunity to standardize the contract format)

**Risks:**
- Which decisions have the highest impact if they go wrong?
- Which decisions are the least transparent (hardest to explain or audit)?
- Which decisions have no clear owner (nobody knows why it works this way)?

### Step 5: Write the diagnosis summary (30 minutes)

Produce a one-page summary with:

1. **System overview:** what the system does, who uses it, what it's for (3-4 sentences)
2. **Key findings:** the 3 most important hidden decisions you surfaced (one paragraph each)
3. **Semantic debt:** what implicit decisions are most likely to cause problems if left undocumented
4. **Recommendation:** if you were hired as an SSA for this system, what would you do first?

---

## Deliverable

A document (1-3 pages) containing:

- [ ] System description
- [ ] 10 hidden decisions identified
- [ ] 10 semantic contracts (input / decision / output for each)
- [ ] Pattern and risk analysis
- [ ] Diagnosis summary with recommendation

---

## Evaluation criteria

Your work will be evaluated on:

| Criterion | What "good" looks like |
|---|---|
| **Depth of observation** | Decisions are genuinely hidden, not obvious. You found things that most people overlook. |
| **Contract precision** | Each contract has clear inputs, explicit rules, and specific outputs. Not vague or generic. |
| **Risk awareness** | You identified which decisions are most dangerous if wrong, and why. |
| **Practical value** | Your diagnosis would be genuinely useful to someone working on this system. |

---

## Tips for success

- **Choose something you know well.** Familiarity makes it easier to spot hidden decisions because you have intuition about how the system works.
- **Talk to other people who use the system.** They'll often say things like "I always wondered why it does that" — these are gold mines of hidden decisions.
- **Don't judge — diagnose.** The goal is not to say the system is bad. It's to surface what's hidden. Some hidden decisions are perfectly fine. Others are ticking time bombs. Your job is to find them all and let the analysis reveal which is which.
- **Think about edge cases.** What happens when unusual inputs arrive? What does the system do with data it doesn't expect? Edge cases often reveal the most interesting hidden decisions.
