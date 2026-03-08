---
sidebar_position: 6
sidebar_label: "Application B — SSA kickoff document"
---

# Application B — SSA kickoff document

## Objective

In this application, you will produce a complete **SSA Kickoff Document** — the first artifact an SSA creates when starting a new project. This document transforms a vague project idea into a structured specification that a team can actually work with.

Think of it as the "project blueprint" that every SSA engagement starts with.

---

## Why this matters

Most AI projects fail not because of bad technology, but because nobody clearly specified what the system should do, for whom, under what constraints, and how to know if it's working.

The SSA Kickoff Document prevents this by forcing clarity upfront. It answers every essential question before any design or implementation begins.

**Everyday analogy:** think about planning a wedding. If you start booking vendors without deciding the guest count, budget, style, venue, and dietary requirements, you'll waste money, change plans repeatedly, and stress everyone out. A wedding planner's first deliverable is a planning document that answers all these questions. The SSA Kickoff Document is the equivalent for AI projects.

---

## The assignment

Choose a project scenario and produce a complete SSA Kickoff Document for it.

**Option 1: Use a real project.** If you have an actual AI project at work or in your life, use it. Real projects produce the best learning.

**Option 2: Use one of these scenarios:**

**Scenario A — Restaurant chain customer feedback system**
A restaurant chain with 50 locations receives thousands of customer reviews across Google, Yelp, social media, and internal comment cards. They want AI to help them understand what customers are saying, identify problems quickly, and prioritize what to fix.

**Scenario B — University course advisor**
A university wants an AI system that helps students choose courses based on their interests, graduation requirements, schedule preferences, and career goals. Currently, students wait weeks for a 15-minute advising appointment.

**Scenario C — Small business invoice processor**
A small business receives 200+ invoices monthly from various suppliers in different formats (PDF, email, paper). They want AI to read invoices, extract key information, match them to purchase orders, and flag discrepancies.

---

## Document structure

Your SSA Kickoff Document should contain the following seven sections.

### Section 1: System objective (half page)

State the purpose of the system in clear, concrete terms.

**Template:**

> **System name:** [Name]
>
> **One-sentence purpose:** This system [does what] for [whom] by [how], so that [outcome].
>
> **The problem it solves:** [2-3 sentences describing the current pain point]
>
> **What success looks like:** [2-3 sentences describing the desired end state]

**Example (Restaurant feedback):**

> **System name:** FeedbackLens
>
> **One-sentence purpose:** This system analyzes customer feedback across all channels for restaurant managers, by classifying sentiment, identifying themes, and flagging urgent issues, so that managers can address problems before they escalate.
>
> **The problem it solves:** Restaurant managers currently read reviews manually, which is slow and inconsistent. Some locations check reviews daily; others check monthly. Critical complaints about food safety sometimes go unnoticed for weeks.
>
> **What success looks like:** Every review is analyzed within 1 hour. Managers receive a daily summary with clear action items. Critical issues (food safety, health hazards) trigger immediate alerts. Trends across locations are visible at the regional level.

### Section 2: Stakeholders and users (half page)

Who cares about this system? Who uses it? Who is affected by it?

**Template:**

| Stakeholder | Role | What they need | How they interact |
|---|---|---|---|
| [Name/role] | [Primary user / Decision maker / Affected party] | [What they need from the system] | [How they use or are affected by it] |

**Example:**

| Stakeholder | Role | Need | Interaction |
|---|---|---|---|
| Restaurant manager | Primary user | Know what customers are saying, what's urgent | Reads daily summary, acts on alerts |
| Regional director | Decision maker | See trends across locations, compare performance | Weekly dashboard review |
| Kitchen staff | Affected party | Know about food quality complaints | Receives filtered feedback via manager |
| Marketing team | Secondary user | Understand brand perception, identify promotable themes | Monthly trend reports |
| Customers | Indirect | Their feedback is actually heard and acted on | None (they submit reviews on external platforms) |

### Section 3: Domain entities (one page)

List the key entities in the system's domain with their attributes and relationships.

**Template:**

```
Entity: [Name]
  Attributes: [list key attributes]
  States: [list valid states if applicable]
  Relationships: [how it connects to other entities]
```

**Example:**

```
Entity: Review
  Attributes: source, text, rating, date, location, customer_id (if available)
  States: unprocessed → analyzed → actioned → archived
  Relationships: belongs to Location, references Menu Items, may reference Staff

Entity: Location
  Attributes: name, address, region, manager, operating_hours
  States: active, temporarily_closed, permanently_closed
  Relationships: has many Reviews, belongs to Region, has Menu

Entity: Theme
  Attributes: name, category (food, service, ambiance, value, cleanliness), sentiment
  States: emerging, established, declining
  Relationships: extracted from Reviews, tracked per Location

Entity: Alert
  Attributes: type, severity, source_review, location, created_at, status
  States: triggered → acknowledged → resolved
  Relationships: generated from Review analysis, assigned to Manager
```

### Section 4: Key constraints (half page)

Classify the rules the system must follow.

**Template:**

**Hard constraints (never violate):**
- [Constraint + reason]

**Soft constraints (prefer but flexible):**
- [Constraint + when it can bend]

**Exception policies (override with justification):**
- [Constraint + who can override + when]

**Example:**

**Hard constraints:**
- Never identify individual customers by name in reports (privacy)
- Always escalate food safety mentions (health hazard risk)
- Never edit or modify the original review text (data integrity)

**Soft constraints:**
- Categorize reviews within 1 hour of receipt (but acceptable up to 4 hours during system maintenance)
- Group themes by week (but monthly grouping is acceptable for low-volume locations)

**Exception policies:**
- Automated alerts can be temporarily disabled by a regional director during known events (e.g., grand opening with expected high volume of mixed reviews)

### Section 5: Architecture hypotheses (one page)

Propose an initial architecture for the system. This is a hypothesis — it will be refined in later modules. But it shows you've thought about how the system could work.

**Template:**

> **Proposed approach:** [2-3 sentences describing the overall approach]
>
> **Key agents/components:**
> - [Agent 1]: [what it does]
> - [Agent 2]: [what it does]
> - [Agent 3]: [what it does]
>
> **Data flow:** [Describe how information moves through the system]
>
> **Human touchpoints:** [Where humans are involved]

**Example:**

> **Proposed approach:** An ingestion pipeline collects reviews from all sources. A classification agent analyzes each review for sentiment, themes, and urgency. A summarization agent produces daily digests per location. An alert agent monitors for critical issues in real-time.
>
> **Key agents:**
> - Review Ingestion: collects reviews from Google, Yelp, social media, internal cards
> - Review Analyzer: classifies sentiment (positive/neutral/negative), extracts themes, assigns urgency
> - Alert Monitor: flags critical issues (food safety, health, legal) for immediate human attention
> - Summary Generator: produces daily location summaries and weekly regional reports
>
> **Data flow:** External sources → Ingestion → Analysis → (Alert path: real-time alerts) + (Summary path: daily/weekly aggregation) → Manager dashboard
>
> **Human touchpoints:** managers review daily summaries; regional directors review weekly trends; critical alerts go directly to manager's phone

### Section 6: Top 5 semantic risks (half page)

What could go wrong from a **meaning** perspective? Not technical failures (servers crash) but semantic failures (the system misunderstands or misbehaves).

**Template:**

| # | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| 1 | [Risk description] | High/Med/Low | High/Med/Low | [How to reduce it] |

**Example:**

| # | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| 1 | System misclassifies a food safety complaint as general feedback | Medium | Critical | Keyword-based hard filter for safety terms; human review of all flagged items |
| 2 | Sentiment analysis fails on sarcasm ("Great, another cold pizza") | High | Medium | Include sarcasm examples in evaluation suite; flag ambiguous sentiment for human review |
| 3 | System generates actionable summaries from insufficient data (3 reviews in a week) | Medium | Medium | Minimum threshold: require 10+ reviews before generating trend analysis |
| 4 | Staff feels surveilled by AI analysis of customer feedback | Medium | High | Communicate purpose clearly; never use feedback for individual staff evaluation without manager judgment |
| 5 | Reviews from competitors or fake accounts distort analysis | Low | High | Source verification; anomaly detection for review patterns |

### Section 7: Open questions and next steps (half page)

What do you still not know? What needs to be decided before proceeding?

**Example:**
- How do we access Google and Yelp reviews programmatically? API availability needs investigation.
- Should the system track individual reviewer patterns (returning complainers)? Privacy implications.
- What's the budget for AI API costs? Need to estimate per-review processing cost.
- Who owns the system after deployment? IT, operations, or marketing?
- How will managers be trained to use the daily summary effectively?

---

## Deliverable

A document (3-5 pages) containing all seven sections:

- [ ] System objective with clear purpose and success criteria
- [ ] Stakeholder map with roles, needs, and interaction types
- [ ] Domain entities with attributes, states, and relationships
- [ ] Constraint classification (hard, soft, exception)
- [ ] Architecture hypothesis with agents and data flow
- [ ] Top 5 semantic risks with likelihood, impact, and mitigation
- [ ] Open questions and next steps

---

## Evaluation criteria

| Criterion | What "good" looks like |
|---|---|
| **Clarity of objective** | Someone who knows nothing about the project can read section 1 and understand what it's for |
| **Completeness of entities** | All major domain concepts are captured with meaningful attributes |
| **Constraint rigor** | Hard/soft/exception classification is defensible, not arbitrary |
| **Architecture plausibility** | The proposed approach could actually work; it's not hand-waving |
| **Risk awareness** | Risks are semantic (not just technical) and mitigations are concrete |

---

## Tips for success

- **Write for a stranger.** Your document should be understandable by someone who wasn't in the room when you discussed the project. If they can't understand it, it's not clear enough.
- **Be specific.** "The system should be accurate" is meaningless. "The system should correctly classify sentiment in 90% of reviews, as measured by human agreement" is specific.
- **Name your unknowns.** The best SSAs are not the ones who have all the answers — they're the ones who know exactly what they don't know yet. Section 7 (open questions) is where honesty lives.
- **Think about the people, not just the technology.** Stakeholder analysis (section 2) is often the most important section. A perfect system that nobody uses is a failed system.
