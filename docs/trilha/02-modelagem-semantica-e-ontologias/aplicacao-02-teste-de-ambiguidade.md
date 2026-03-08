---
sidebar_position: 6
sidebar_label: "Application B — Ambiguity stress test"
---

# Application B — Ambiguity stress test

## Objective

In this application, you will discover how much ambiguity exists in your domain and demonstrate that your ontology resolves it. You'll collect 20 ambiguous expressions that real users or stakeholders might use, resolve each one with an operational definition grounded in your ontology, and measure the reduction in disagreement.

This is the SSA's quality proof: **does the ontology actually reduce misunderstanding?**

---

## Why ambiguity is the SSA's enemy

Ambiguity is the number one cause of AI system failures that aren't technical bugs.

When someone says "handle this ticket urgently," what does "urgently" mean? Within 5 minutes? Within an hour? Before end of day? Before anything else?

If five people on your team would answer that question differently, you have an ambiguity problem. And if the AI system picks one interpretation that doesn't match what the stakeholder meant, you have a system failure that looks like AI error but is actually a specification error.

**The SSA's ontology should eliminate this kind of ambiguity.** If the ontology defines urgency levels (critical: 15 min, high: 1 hour, medium: 4 hours, low: 24 hours), then "urgently" maps to a specific, measurable commitment.

This application tests whether your ontology actually achieves this.

---

## The assignment

### Phase 1: Collect ambiguous expressions (45 minutes)

Gather 20 expressions from your domain that could be interpreted in multiple ways. These can come from:

- **Real conversations** with stakeholders, users, or team members
- **Existing documentation** that uses vague or undefined terms
- **Common requests** that different people interpret differently
- **Edge cases** where the rules aren't clear

**What makes an expression ambiguous:**
- Different people would act differently if given this instruction
- The expression uses relative terms without a reference point ("fast," "many," "soon," "important")
- The expression assumes context that isn't always available
- The expression could refer to multiple entities or actions

**Examples of ambiguous expressions across domains:**

| Domain | Ambiguous expression | Why it's ambiguous |
|---|---|---|
| Customer support | "Escalate important tickets" | What makes a ticket "important"? |
| Restaurant | "The dish should be served hot" | What temperature is "hot"? 50°C? 70°C? |
| Hospital | "Monitor the patient regularly" | How often is "regularly"? Every 15 min? Every hour? |
| Rental platform | "Clean the property before check-in" | What standard of "clean"? Swept? Deep cleaned? Sanitized? |
| School | "Grade fairly" | What does "fairly" mean? Same rubric for everyone? Adjusted for circumstances? |

### Phase 2: Measure baseline disagreement (30 minutes)

Before resolving the ambiguities, measure how much disagreement exists.

**Method:** take 10 of your 20 ambiguous expressions and present them to 2-3 people (colleagues, friends, family — anyone who can give an honest answer). Ask each person: "What would you do if given this instruction?"

Record the responses. Note where people agree and where they disagree.

**Scoring:**
- **Full agreement:** all respondents would take the same action → Score: 0 (no ambiguity problem)
- **Partial agreement:** respondents agree on the general direction but differ on specifics → Score: 1
- **Disagreement:** respondents would take meaningfully different actions → Score: 2

Calculate the **baseline ambiguity score:** sum of all scores divided by (number of expressions x 2). This gives a percentage: 0% = no ambiguity, 100% = complete disagreement.

### Phase 3: Resolve with operational definitions (45 minutes)

For each of the 20 ambiguous expressions, write an **operational definition** — a precise, measurable specification that eliminates the ambiguity by grounding it in your ontology.

**Format:**

```
Ambiguous expression: "[original expression]"

Operational definition:
  [Precise specification using ontology vocabulary]

Ontology reference:
  [Which entities, attributes, states, or constraints this definition draws from]

Example of correct interpretation:
  [A concrete scenario showing the definition in action]

Example of incorrect interpretation:
  [A concrete scenario showing what the original ambiguous expression might
   have been wrongly interpreted as]
```

**Example:**

```
Ambiguous expression: "Escalate important tickets"

Operational definition:
  A ticket is escalated when any of these conditions are met:
  - Urgency is CRITICAL (as defined in constraint matrix, section C01)
  - Customer tier is ENTERPRISE and ticket age exceeds 30 minutes
  - Ticket contains keywords from the safety keyword list (ontology appendix B)
  - Customer satisfaction score for this customer is below 3.0 in the last 90 days

  Escalation means: reassign ticket to the Senior Agent queue with
  "ESCALATED" flag and a summary of the escalation reason.

Ontology reference:
  - Entity: Ticket (attributes: urgency, age, keywords)
  - Entity: Customer (attributes: tier, satisfaction_score)
  - Constraint: H05 (safety keywords trigger mandatory escalation)

Correct interpretation:
  Ticket from enterprise customer, open for 45 minutes, about a billing error.
  → Escalated because enterprise + age > 30 minutes.

Incorrect interpretation:
  Agent feels the customer sounds frustrated, so they escalate.
  → "Sounds frustrated" is not an escalation criterion. Frustration is addressed
     through empathy in the response, not through escalation.
```

### Phase 4: Measure post-resolution agreement (30 minutes)

Take the same 10 expressions you tested in Phase 2 and present the operational definitions to the same 2-3 people. Ask: "Given this definition, what would you do?"

Record responses and score using the same system (0, 1, or 2).

Calculate the **post-resolution ambiguity score.** Compare with baseline.

### Phase 5: Write the analysis (30 minutes)

Produce a summary that includes:

1. **Baseline score** and what it reveals about existing ambiguity
2. **Post-resolution score** and the improvement achieved
3. **Most impactful resolutions** — which definitions reduced the most disagreement?
4. **Remaining ambiguity** — which expressions are still partially ambiguous, and why?
5. **Recommendations** — what should be added to the ontology or constraint matrix to address remaining ambiguity?

---

## Deliverable

A document (3-5 pages) containing:

- [ ] 20 ambiguous expressions collected from the domain
- [ ] Baseline disagreement measurement (10 expressions tested, scored)
- [ ] 20 operational definitions with ontology references
- [ ] Post-resolution disagreement measurement (same 10 expressions, re-scored)
- [ ] Analysis summary with improvement metrics and recommendations

---

## Evaluation criteria

| Criterion | What "good" looks like |
|---|---|
| **Ambiguity quality** | Expressions are genuinely ambiguous (not artificially vague). They represent real confusion that exists in the domain. |
| **Definition precision** | Operational definitions are specific, measurable, and grounded in the ontology. They eliminate ambiguity rather than just adding words. |
| **Measurement rigor** | Baseline and post-resolution scores are calculated consistently. Improvement is demonstrated with evidence, not asserted. |
| **Ontology connection** | Each definition references specific ontology entities, attributes, or constraints. The definitions strengthen the ontology. |
| **Practical value** | The resolved definitions could be directly used in system prompts, agent contracts, or team training materials. |

---

## Tips for success

- **Collect from real sources.** The best ambiguous expressions come from actual conversations, emails, or documents in the domain. Invented ambiguity is less convincing and less useful than discovered ambiguity.

- **Don't "fix" the expressions before testing.** Present them to your test group exactly as they were originally stated. The point is to measure how the raw expression is interpreted.

- **Operational definitions must be testable.** If someone reads your definition and still asks "but what exactly does that mean?" — it's not operational enough. Keep refining until a new person could follow the definition without asking questions.

- **Some ambiguity is irreducible.** Not every expression can be fully resolved. That's fine — the point is to reduce ambiguity to a manageable level and document what remains. An honest assessment of remaining ambiguity is more valuable than a false claim of total clarity.

- **Feed discoveries back into the ontology.** If this exercise reveals entities, attributes, or constraints that your ontology is missing, add them. The ontology should grow from this exercise — that's the whole point.
