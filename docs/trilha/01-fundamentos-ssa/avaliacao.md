---
sidebar_position: 7
sidebar_label: "Assessment"
---

# Module 1 — Assessment

## What you should have produced

By completing this module, you should have the following artifacts:

| # | Artifact | Source |
|---|---|---|
| 1 | One-page comparison table: classical vs. semantic system design | Lesson 1 practice activity |
| 2 | SSA architecture canvas mapping the six competencies and six artifacts | Lesson 2 practice activity |
| 3 | Three reframed problem specifications | Lesson 3 practice activity |
| 4 | Current-state diagnosis with 10 hidden decisions as semantic contracts | Application A |
| 5 | Complete SSA kickoff document (7 sections) | Application B |

---

## Assessment rubric

Each dimension is scored **0, 1, or 2**. Total possible: **10 points**. Passing threshold: **8/10**.

### Dimension 1: Conceptual clarity (0-2)

Does your work demonstrate a clear understanding of the shift from code-centered to meaning-centered system design?

| Score | Description |
|---|---|
| **0** | Confuses SSA with prompt engineering, coding, or general project management. Cannot explain the paradigm shift in their own words. |
| **1** | Understands the basic shift but explanations are vague or rely on memorized definitions rather than genuine understanding. Examples are generic. |
| **2** | Explains the paradigm shift clearly with original examples. Demonstrates understanding of why meaning-centered design matters and how it differs from classical development. Can teach it to someone else. |

### Dimension 2: Quality of reframing (0-2)

Can you take a vague request and transform it into a structured, actionable specification?

| Score | Description |
|---|---|
| **0** | Reframing is superficial — adds a few details but doesn't fundamentally restructure the problem. Entities are vague. Decisions are not identified. |
| **1** | Reframing follows the five-step process but results are generic. Entities and decisions are identified but lack specificity. Constraints exist but are not classified (hard/soft/exception). |
| **2** | Reframing is thorough and specific. The real problem is identified (not just the stated problem). Entities have meaningful attributes. Decisions have explicit rules. Constraints are classified with reasoning. Success criteria are measurable. |

### Dimension 3: Separation of intention, policy, and execution (0-2)

Do you distinguish between what the system should achieve (intention), what rules it must follow (policy), and how it implements them (execution)?

| Score | Description |
|---|---|
| **0** | Mixes all three layers. Talks about implementation details when specifying intentions. Policies are tangled with technical decisions. |
| **1** | Separates intention from execution but policies are implicit or incomplete. Can state what the system should do but not what rules govern it. |
| **2** | Clear separation across all artifacts. Intentions are stated without implementation assumptions. Policies are explicit, classified, and justified. Execution details are appropriately deferred. |

### Dimension 4: Traceability of decisions (0-2)

Can someone follow the reasoning behind your specifications? Is there a clear path from problem to solution?

| Score | Description |
|---|---|
| **0** | Decisions appear arbitrary. No explanation of why specific entities, constraints, or risks were chosen. |
| **1** | Some reasoning is provided but is inconsistent. Some decisions are justified, others are asserted without explanation. |
| **2** | Every significant decision has a traceable rationale. Constraints have reasons. Risk assessments have evidence. Architecture hypotheses have justification. Someone who disagrees with a decision can see exactly why you made it and propose a specific alternative. |

### Dimension 5: Practical applicability (0-2)

Would your work be useful in a real project? Could a team use your artifacts to start building?

| Score | Description |
|---|---|
| **0** | Work is too abstract or too generic to be useful. A team would need to start over. |
| **1** | Work has value but contains gaps. A team could use it as a starting point but would need significant clarification. |
| **2** | Work is specific, complete, and actionable. A team receiving your kickoff document and diagnosis could begin design work immediately with confidence in the specification. |

---

## Self-assessment checklist

Before submitting, verify:

### Lessons

- [ ] I can explain the shift from `human → code → machine` to `human → semantic architecture → AI → code → machine` in my own words, with an original analogy
- [ ] I can name the six SSA competencies and explain what each one does
- [ ] I can name the six SSA artifacts and explain how they connect
- [ ] I can take a vague request and produce a structured specification using the five-step reframing process
- [ ] I understand the difference between the SSA, an AI-assisted developer, and an infrastructure engineer

### Application A

- [ ] I chose a real system (not a hypothetical one)
- [ ] I identified 10 genuinely hidden decisions (not obvious features)
- [ ] Each decision has a complete semantic contract (input, decision rules, output, constraints)
- [ ] I analyzed patterns and risks across my 10 decisions
- [ ] My diagnosis summary includes a concrete recommendation

### Application B

- [ ] My system objective is clear enough for a stranger to understand
- [ ] My stakeholder map includes all relevant parties with their specific needs
- [ ] My domain entities have attributes, states, and relationships
- [ ] My constraints are classified as hard, soft, or exception — with reasons
- [ ] My architecture hypothesis is specific enough to evaluate (not hand-waving)
- [ ] My risks are semantic (not just technical) with concrete mitigations
- [ ] My open questions are genuine (things I actually don't know yet)

---

## What passing means

Scoring **8/10 or higher** means you have demonstrated the foundational SSA competencies:

- You understand the paradigm shift and can explain it to others
- You can decompose vague problems into structured specifications
- You separate meaning from implementation
- Your work is traceable and justified
- Your artifacts are practically useful

This does not mean you are a complete SSA. It means you have the foundation to build on. Modules 2-8 will develop each competency in depth.

---

## If you don't pass

Scoring **below 8/10** is not failure — it's feedback. It means specific competencies need more work before moving on.

- **Low on conceptual clarity:** re-read Lesson 1 and try explaining the shift to someone who knows nothing about it. If you can't explain it simply, you don't understand it deeply enough yet.
- **Low on reframing:** practice with more examples. The five-step process gets easier with repetition. Try reframing three more real-world problems.
- **Low on separation:** pay attention to when you're describing what (intention) vs. when you're describing how (implementation). These should be in different sections of your documents.
- **Low on traceability:** add "because..." to every decision. "The system should escalate safety complaints" → "The system should escalate safety complaints **because** a missed safety issue can result in physical harm, regulatory fines, and permanent reputation damage."
- **Low on applicability:** make it more specific. Replace "the system should be fast" with "the system should respond within 2 seconds." Replace "good quality" with "customer satisfaction above 4.2/5 as measured by post-interaction survey."

---

## Bridge to Module 2

You now have the foundational framing. You understand what SSA is, what it works with, and how to start a project.

**Module 2 — Semantic Modeling and Ontologies** takes you deeper into the first and most fundamental SSA artifact: the domain ontology. You'll learn to build complete, rigorous ontologies that become the semantic backbone of AI systems. Everything else — contracts, agents, workflows, evaluations — builds on the ontology.

If Module 1 taught you to see the building site, Module 2 teaches you to survey the land.
