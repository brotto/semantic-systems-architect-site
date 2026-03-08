---
sidebar_position: 4
sidebar_label: "Lesson 3 — Scale and evolution"
---

# Lesson 3 — Scale and system evolution

## The growth problem

Your AI system is working. Users are happy. Operations are stable. The business wants more.

More users. More domains. More languages. More complexity. More value.

This sounds like pure good news. But growth is where most systems break. Not because they fail — because they succeed too well for their own architecture to handle.

Think about a small bakery that makes excellent bread. Ten customers a day, every loaf baked with care, every customer known by name. The owner does everything: bakes, serves, cleans, orders supplies.

Now imagine that bakery gets a rave review in a major newspaper. Suddenly, 300 people want bread every day. The owner cannot bake 300 loaves alone. They cannot take 300 individual orders. They cannot remember 300 names. The tiny kitchen cannot hold 300 loaves of dough.

The bakery has two choices: turn people away, or change how it operates. Hiring more bakers, buying bigger ovens, standardizing recipes, training staff, managing a supply chain, opening a second location — all of these are scaling decisions. And each one introduces a risk: the bread might not taste the same.

This lesson teaches you to scale your AI system — to serve more users, expand to more domains, and evolve over time — without losing the quality, safety, and semantic integrity you built in the first seven modules.

---

## The franchise analogy

The best analogy for scaling AI systems is growing a restaurant franchise.

A successful restaurant decides to open more locations. This requires solving three fundamental problems:

**1. Replication — making the second location as good as the first.**

The original restaurant works because of a specific combination of recipes, kitchen workflows, service protocols, quality standards, and staff training. To open a second location, you must identify which elements are universal (the recipes, the standards) and which are local (the specific chef, the neighborhood regulars, the local suppliers).

In AI systems, replication means deploying the same semantic architecture to a new context. The ontology, contracts, and agents are your "recipes." But the data, user patterns, and domain-specific details are "local." You need to know what transfers and what must be adapted.

**2. Adaptation — adjusting to a new market without losing identity.**

The second restaurant is in a different neighborhood. Maybe it serves a different demographic. Maybe local tastes are different. Maybe regulations differ. The franchise must adapt its menu, pricing, and operations to the local context — without losing the core quality and identity that made the first location successful.

In AI systems, adaptation means tailoring the system to new domains, new user populations, or new regulatory environments. Your medical complaint classifier might need to handle dental complaints now. Your English-language system might need to work in Spanish. Your US-compliant system might need to meet EU regulations. Each adaptation changes some things while preserving others.

**3. Quality maintenance — ensuring consistency as you grow.**

With one restaurant, the owner can taste every dish. With ten restaurants, that is impossible. The franchise needs systems, standards, and audits that maintain quality without the owner being physically present at every location.

In AI systems, quality maintenance means your evaluation framework, monitoring, and governance controls must scale with the system. If you add a new domain, you need new evaluation data. If you add new users, you need updated SLOs. If you deploy in a new region, you need local compliance checks.

---

## Horizontal scaling

Horizontal scaling means serving more volume without changing the system's capabilities. More users doing the same things, more requests per second, more data flowing through the same pipelines.

### The traffic analogy

Think about a highway. When traffic increases, you have several options:

- **Add lanes** (more parallel capacity). This is the simplest form of horizontal scaling — more servers, more instances, more workers handling the same tasks.
- **Improve flow** (more efficiency per lane). Better traffic signals, smoother merge lanes, cleared accidents. In AI systems, this means optimizing response times, caching common results, batching similar requests.
- **Build alternative routes** (distribute load). Not everyone needs to take the highway. Some traffic can use surface streets. In AI systems, this means routing simple requests to lighter models and reserving expensive models for complex cases.

### Model-tier strategy

Not every request needs the most powerful (and expensive) AI model. A model-tier strategy routes requests to the appropriate model based on complexity, cost, and risk.

| Tier | Model type | When to use | Cost |
|---|---|---|---|
| **Tier 1: Rules** | No AI at all — deterministic rules | When the answer is always the same (FAQ lookup, fixed policy) | Lowest |
| **Tier 2: Small model** | Fast, efficient, smaller AI model | When the task is routine and well-defined (standard classification, template responses) | Low |
| **Tier 3: Large model** | Full-capability AI model | When the task requires nuance, reasoning, or complex context | Medium |
| **Tier 4: Large model + human** | AI generates, human reviews | When the stakes are high, the domain is sensitive, or confidence is low | Highest |

Think of it like a hospital triage system. Not every patient needs a surgeon. A nurse can handle a routine check-up (Tier 1). A general practitioner can handle a common illness (Tier 2). A specialist handles complex conditions (Tier 3). A surgical team with multiple specialists handles critical cases (Tier 4). The triage nurse at the door routes each patient to the right level — ensuring that surgeons are not wasting time on headaches and headaches are not waiting behind heart attacks.

**The routing decision itself is critical.** If you route a complex request to a small model, you get a bad answer. If you route a simple request to a large model, you waste money. The routing logic must consider:

- Request complexity (can be estimated from input length, entity count, domain signals)
- Confidence threshold (if the small model is uncertain, escalate to the large model)
- Risk level (safety-critical requests always go to the highest appropriate tier)
- Cost budget (daily/monthly cost limits may force tier selection)

### Cost per completed outcome

The essential cost metric for AI systems is not "cost per API call" — it is "cost per completed outcome."

Think about it like this: if you spend $0.03 on an API call that gives a wrong answer, and the user has to ask again, and the second call also fails, and a human eventually handles it manually at $5 of labor cost — your "cost per completed outcome" was $5.06, not $0.03.

The formula is:

```
Cost per completed outcome = (AI processing cost + human review cost + retry cost + error correction cost) / number of successfully completed outcomes
```

This metric aligns cost with value. A cheaper model that produces more errors can be more expensive per outcome than a pricier model that gets it right the first time.

### Capacity planning with governance constraints

When you plan for growth, you cannot just think about servers and bandwidth. You must also plan for governance capacity.

Every AI request that triggers a guardrail needs human review. Every incident needs investigation. Every new domain needs evaluation data. Every compliance audit needs evidence.

Think of it like a school growing from 200 students to 2,000 students. You need more classrooms and teachers (infrastructure scaling), but you also need more counselors, more administrators, more compliance officers, more bus routes, and more cafeteria capacity (governance scaling). If you add classrooms but not counselors, you have a school that can seat 2,000 students but cannot support them.

**Governance capacity planning includes:**

- Human review capacity: how many flagged items can your team review per day?
- Incident response capacity: can your on-call team handle the incident volume at 10x scale?
- Evaluation capacity: can you produce evaluation data fast enough for new domains?
- Audit capacity: can you provide compliance evidence for the expanded system?

---

## Multi-domain deployment

Multi-domain deployment means using your AI system in different knowledge domains. Your customer support classifier, originally built for retail, now needs to handle healthcare, finance, and telecommunications.

### The challenge of domain transfer

Each domain has its own language, entities, rules, and failure modes. The word "charge" means one thing in retail (a payment), another in healthcare (a medical record entry), and another in telecommunications (a battery level).

Think about a translator who speaks English and French. If you ask them to translate a legal document, they need legal vocabulary. If you ask them to translate a medical report, they need medical vocabulary. Being fluent in the languages is necessary but not sufficient — they must also be fluent in the domain.

Your AI system faces the same challenge. The underlying architecture (the "language fluency") transfers across domains. But the domain-specific knowledge (the ontology, the contracts, the evaluation data) must be rebuilt or adapted for each new domain.

### The domain deployment checklist

When expanding to a new domain, work through this checklist:

**1. Ontology adaptation**

- What new entities does this domain introduce?
- What existing entities have different attributes or states in this domain?
- What new relationships exist?
- What terminology differs? (Same word, different meaning — or different word, same meaning?)

**2. Contract revision**

- Which semantic contracts transfer directly?
- Which need modification for the new domain?
- Which are entirely new?
- What new constraints apply? (Regulatory, ethical, practical)

**3. Evaluation data**

- Do you have representative examples from the new domain?
- Have domain experts reviewed the evaluation criteria?
- Are failure modes in the new domain represented in your test suite?

**4. Governance review**

- Does the new domain introduce new risk categories?
- Are there regulatory requirements specific to this domain?
- Do you need new guardrails or modified existing ones?

**5. Operational readiness**

- Does your on-call team understand the new domain?
- Are your runbooks updated for domain-specific scenarios?
- Are SLOs appropriate for the new domain's risk profile?

---

## Ontology evolution

Your ontology is not a static artifact. It is a living document that must evolve as the system grows, the domain changes, and you learn from production experience.

### Why ontologies change

**New knowledge.** You discover entities, relationships, or rules that were not in the original design. A customer support system might discover that "returns" and "exchanges" need to be separate entities because they have different policies and different user expectations.

**Domain shift.** The world changes. New products appear. New regulations take effect. Customer behavior evolves. The ontology must reflect the current reality, not the reality that existed when you designed it.

**Error patterns.** Production incidents reveal gaps in your ontology. If the system consistently misclassifies a certain type of request, the ontology might be missing a category, or an existing category might be too broad.

**Scale requirements.** As the system handles more volume and more domains, the ontology might need restructuring for efficiency. Categories that made sense at small scale might need subdivision at large scale.

### Managing ontology changes safely

Changing a live ontology is like renovating a house while people are living in it. You cannot just tear down walls and rebuild — you need to plan carefully, work in stages, and maintain habitability throughout.

**Rule 1: Backward compatibility.**

When you change the ontology, existing data and decisions must still make sense. If you rename an entity, all historical references must be updated or mapped. If you split a category, existing items in that category must be reassigned.

Think of it like a post office updating zip codes. You cannot just change the codes overnight — mail would be lost. You need a transition period where both old and new codes are accepted, with a clear mapping between them.

**Rule 2: Version management.**

Every ontology change gets a version number. Every system component records which ontology version it was built against. This lets you trace decisions back to the ontology that was in effect when they were made.

Think of it like a legal system. Laws change over time, but you cannot apply a new law retroactively to judge past actions. You need to know which version of the law was in effect when an action was taken. Your ontology versioning serves the same purpose.

**Rule 3: Migration plan.**

Every ontology change includes a migration plan: how to move from the old version to the new version without breaking the system. This plan should include:

- What changes are being made and why
- Impact assessment: what components are affected?
- Migration steps: what needs to be updated, in what order?
- Rollback plan: how to revert if the migration causes problems
- Validation: how to verify the migration succeeded

**Rule 4: Stakeholder communication.**

Ontology changes affect everyone who uses the system. If you change how complaints are categorized, the manager who reads the daily summary will see different categories tomorrow. They need to know why and what it means.

---

## Version management

As your system evolves, you will have multiple versions of multiple components: the ontology, the semantic contracts, the agent configurations, the evaluation suites, the governance controls.

### The cookbook analogy

Think of a restaurant chain that maintains a cookbook. The cookbook has recipes (your contracts), ingredient specifications (your ontology), quality standards (your evaluation criteria), and safety procedures (your governance controls).

When the head chef updates a recipe, you need to know:
- **What changed?** (The recipe for the house sauce now uses less salt.)
- **Why?** (Customer feedback indicated it was too salty.)
- **When does it take effect?** (Starting next Monday.)
- **Which locations?** (All locations, or only the ones that received complaints?)
- **What happens to the old version?** (Archived but available if we need to revert.)
- **How do we verify the change worked?** (Taste tests at three locations, customer feedback monitoring for two weeks.)

Your version management system needs to answer the same questions for every change to every component.

### Version management principles

**1. Everything is versioned.** Not just the model — the ontology, the contracts, the evaluation data, the guardrails, the runbooks. Every artifact has a version number and a changelog.

**2. Changes are atomic and documented.** Each version change is a single, coherent update with a clear description of what changed and why. Not "various fixes" but "added 'product safety' as a distinct category separate from 'product quality' because incident #47 revealed that safety complaints require different routing."

**3. Versions are immutable.** Once a version is released, it is never modified. If there is a problem, you create a new version. This ensures that historical decisions can always be traced to the exact version of the system that produced them.

**4. Rollback is always possible.** Every deployment can be reverted to the previous version. This is your safety net. If a new ontology version causes unexpected behavior, you roll back to the previous version while you investigate.

---

## Technical debt in AI systems

### What is semantic technical debt?

Technical debt is a metaphor from software engineering: taking shortcuts now that create costs later. In AI systems, technical debt takes unique forms that go beyond traditional code debt.

Think of a house built with quick fixes over many years. A pipe rerouted around an obstacle instead of through the wall. An extension built without matching the foundation depth. A window sealed shut because fixing the latch was too expensive. Each shortcut was reasonable at the time. Together, they create a house that is increasingly difficult and expensive to maintain or improve.

AI systems accumulate similar debt:

**Ontology debt.** Categories that were "good enough" at launch but have become overlapping, ambiguous, or incomplete. The system still works, but accuracy is slowly degrading because the ontology no longer matches the real world.

**Evaluation debt.** Test suites that were comprehensive at launch but have not been updated for new scenarios, new domains, or new failure modes. The tests still pass, but they no longer tell you whether the system actually works well.

**Contract debt.** Semantic contracts that were written for the initial domain but have been stretched to cover new use cases without formal revision. The contracts technically cover the new cases but not precisely enough.

**Governance debt.** Controls that were designed for the original scope but have not been updated for expanded capabilities. The guardrails still fire, but they might miss new categories of risk.

**Data debt.** Training and evaluation data that reflects the past, not the present. The model was trained on data from two years ago, but customer language, products, and expectations have changed.

### Managing technical debt

Technical debt is not inherently bad. Sometimes taking a shortcut to meet a deadline is the right decision. The problem is not having debt — it is not tracking it and not paying it down.

**Step 1: Track it.** Maintain a technical debt register that lists each item of debt, when it was incurred, why, and what the cost of maintaining it is.

**Step 2: Classify it.** Not all debt is equally dangerous. Some debt causes minor inconvenience (slightly messy ontology categories). Other debt creates real risk (outdated evaluation suites that miss critical failure modes).

Think of it like financial debt. A low-interest mortgage is manageable debt. A high-interest credit card balance is dangerous debt. You pay down the dangerous debt first.

**Step 3: Budget for paydown.** Every sprint, every quarter, allocate a percentage of capacity to paying down technical debt. This is not optional — it is an investment in the long-term health of the system. A good rule of thumb: 20% of engineering capacity, every quarter, dedicated to debt paydown.

**Step 4: Prevent new debt.** Establish quality gates that prevent the most dangerous types of debt. For example: "No new domain deployment without a complete evaluation suite" or "No ontology change without a migration plan."

---

## The scale playbook

All of this comes together in a scale playbook — a document that anticipates growth scenarios and prepares the team to handle them.

### Scale playbook structure

**Section 1: Growth scenarios**

Define 3-5 realistic growth scenarios with specific numbers:

| Scenario | Current | 6 months | 12 months | 18 months |
|---|---|---|---|---|
| Daily requests | 5,000 | 15,000 | 50,000 | 100,000 |
| Active domains | 1 | 2 | 4 | 6 |
| User segments | 3 | 5 | 8 | 12 |
| Languages | 1 | 2 | 3 | 5 |

**Section 2: Bottleneck analysis**

For each growth scenario, identify where the system will break first. Infrastructure? Model capacity? Human review bandwidth? Evaluation coverage? Governance capacity?

Think of it like a traffic engineer studying an intersection. As traffic volume increases, which approach road gets congested first? Which signal timing fails? Where do accidents become more likely? You fix the bottleneck before the traffic arrives, not after the gridlock forms.

**Section 3: Cost projections**

Model the cost per completed outcome at each growth stage. Include AI processing costs, infrastructure costs, human review costs, and operational overhead.

**Section 4: Ontology evolution plan**

Anticipate how the ontology needs to change at each growth stage. New domains mean new entities and new contracts. Growth in volume might require category refinement. New user segments might need new output formats.

**Section 5: Governance scaling plan**

How does your governance capacity scale with growth? How many additional reviewers do you need? What new compliance requirements apply in new markets? How does your incident response team need to grow?

**Section 6: Risk register**

What new risks emerge at each growth stage? Scaling introduces risks that do not exist at small scale: data consistency across regions, latency for remote users, cultural sensitivity in new markets, regulatory differences across jurisdictions.

---

## Practice activity

For the AI system you have been building throughout this course, complete the following:

### Part 1: Model-tier strategy

Design a model-tier strategy for your system. Define at least 3 tiers, specifying what type of requests go to each tier, the routing criteria, the expected cost per request, and the accuracy expectation at each tier.

### Part 2: Domain expansion plan

Choose one new domain to expand your system into (a domain it does not currently serve). Work through the domain deployment checklist: ontology adaptation, contract revision, evaluation data needs, governance review, and operational readiness.

### Part 3: Ontology evolution scenario

Describe one realistic scenario where your ontology would need to change (new entity, split category, renamed concept, new relationship). Then write the migration plan: what changes, why, impact assessment, migration steps, rollback plan, and validation criteria.

### Part 4: Technical debt audit

List 5 items of semantic technical debt that your system has accumulated (or would realistically accumulate in its first year of operation). Classify each as low, medium, or high risk. For the top 2 items, write a specific paydown plan with steps, timeline, and success criteria.

### Part 5: Scale playbook summary

Fill in one growth scenario (from current state to 12 months out) with numbers for: daily requests, active domains, user segments, and languages. Identify the top 3 bottlenecks that would appear at the 12-month scale, and propose specific solutions for each.

---

## Key takeaways

1. **Scaling is a design problem, not just an infrastructure problem.** Adding more servers is easy. Maintaining semantic quality, governance compliance, and user trust as you grow is hard. Scale planning must address all three.

2. **Model-tier routing is your cost control lever.** Not every request needs the most expensive model. A smart routing strategy can reduce costs by 60-80% while maintaining quality where it matters most.

3. **Ontologies are living documents.** They must evolve as the domain, the market, and your understanding evolve. But changes must be managed carefully — versioned, migrated, validated, and communicated.

4. **Technical debt is the silent killer.** It does not cause dramatic failures — it causes slow degradation. The accuracy that was 92% at launch quietly drops to 86% because the evaluation data is stale, the ontology is outdated, and the contracts are stretched. Track it, classify it, and pay it down systematically.

5. **The scale playbook prevents surprises.** Growth scenarios, bottleneck analysis, cost projections, and risk registers let you prepare for growth instead of reacting to it. The time to plan for 10x traffic is when you are at 1x, not when you are at 9x and the system is buckling.

---

## What comes next

You have now completed all three lessons of Module 8. You understand product thinking, operational discipline, and scale strategy. In **Application A**, you will synthesize Lesson 1 into a complete launch plan for your AI system. In **Application B**, you will combine Lessons 2 and 3 into a comprehensive operations plan. These two applications are your final deliverables for the SSA core track.
