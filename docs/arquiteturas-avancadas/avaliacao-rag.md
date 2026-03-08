---
sidebar_position: 5
title: RAG assessment
---

# RAG Systems Evaluation

## Why RAG evaluation is different

You have already learned how to evaluate AI systems in the main trail. RAG systems add a layer of complexity that makes evaluation fundamentally harder -- and fundamentally more important.

Consider this analogy. Evaluating a standalone language model is like grading a student on an open-book exam where the student brings their own notes. You check whether their answers are correct and well-reasoned. Straightforward.

Evaluating a RAG system is like grading a student who uses a library during the exam. Now you need to check not only whether the answer is correct, but also whether the student found the right books, read the right pages, interpreted them correctly, cited them properly, and did not make up anything that was not in the source material. And you need to check whether the library itself had the right books in the first place.

RAG evaluation must examine the entire chain: Did the system find the right evidence? Did it use the evidence correctly? Did the final answer actually help the user? And did the whole process remain safe and compliant?

---

## The four evaluation layers

A complete RAG evaluation framework operates at four distinct layers. Each layer answers a different question and uses different metrics.

### Layer 1: Retrieval quality

**Question:** Did the system find the right information?

This layer evaluates the retrieval component in isolation, before the model generates any response. It answers whether the search pipeline is surfacing the relevant content from the knowledge base.

Think of it like evaluating a research assistant. Before you read their summary, you check their bibliography. Did they find the right papers? Did they miss any key references? Are the top sources actually relevant, or did they grab tangentially related material?

#### Key metrics

**Precision at k (P@k):** Of the top-k retrieved passages, what fraction is actually relevant?

If you retrieve 5 passages and 3 are relevant, P@5 = 0.6. This tells you how much noise is in your retrieval results. High noise means the model will be distracted by irrelevant content.

**Recall at k (R@k):** Of all the relevant passages that exist in the knowledge base, what fraction appears in the top-k results?

If the knowledge base has 4 relevant passages for a query and your top-5 retrieval finds 3 of them, R@5 = 0.75. This tells you how much relevant information you are missing. Low recall means the model might produce incomplete answers because it never saw key evidence.

**Mean Reciprocal Rank (MRR):** At what position does the first relevant result appear?

If the first relevant result is at position 1, the reciprocal rank is 1.0. If it is at position 3, the reciprocal rank is 0.33. MRR averages this across all queries. This tells you whether your best result is near the top -- important because models pay more attention to early passages.

**Normalized Discounted Cumulative Gain (nDCG):** How good is the overall ranking, considering that higher-ranked results matter more?

This metric accounts for the fact that a relevant result at position 1 is more valuable than a relevant result at position 10. It gives you a single score (0 to 1) that captures the quality of the full ranking.

#### How to measure

To compute these metrics, you need a **relevance judgment set**: for each test query, a list of which passages in the knowledge base are relevant. This requires human annotation. There is no shortcut. Someone who understands the domain must look at a sample of queries, review the candidate passages, and judge which ones are relevant.

Typical process:

1. Select 50-100 representative queries from real user traffic (or synthesize them if the system is not yet live).
2. For each query, retrieve the top-20 passages.
3. Have a domain expert label each passage as "relevant," "partially relevant," or "not relevant."
4. Compute metrics over the labeled set.

---

### Layer 2: Generation quality

**Question:** Given the retrieved evidence, did the model produce a good answer?

This layer evaluates the generation component with the assumption that retrieval was correct. It measures whether the model used the evidence well.

Think of it like evaluating a journalist. You gave them the facts, the sources, the quotes. Now you check whether their article is accurate, complete, well-structured, and properly sourced -- or whether they invented details, omitted key information, or misrepresented their sources.

#### Key metrics

**Faithfulness (grounding):** Does every factual claim in the generated answer trace back to a specific retrieved passage?

This is the most critical generation metric. An unfaithful answer is one that contains claims not supported by the evidence -- either hallucinated outright or subtly extrapolated beyond what the sources say.

How to measure: For each factual claim in the generated answer, check whether a corresponding statement exists in the retrieved passages. This can be done by human reviewers or by an LLM-as-judge approach where a separate model evaluates whether each claim is supported.

**Relevance:** Does the generated answer actually address the user's question?

A faithful answer can still be irrelevant if the model focuses on the retrieved content rather than the question. For example, the user asks about the return policy for electronics, and the model faithfully describes the return policy for clothing because that is what was retrieved.

**Completeness:** Does the answer cover all the important aspects of the question that the evidence supports?

If the evidence contains three relevant points and the model mentions only one, the answer is incomplete. This metric catches cases where the model is accurate but shallow.

**Citation accuracy:** Do the cited sources actually support the claims they are attached to?

A citation is only useful if it points to real, relevant evidence. If the model cites "Source A" but Source A does not contain the claimed information, the citation is a lie -- worse than no citation at all, because it gives the user false confidence.

#### How to measure

Generation quality evaluation typically uses a combination of:

- **Human evaluation:** Domain experts rate answers on faithfulness, relevance, completeness, and citation accuracy using a rubric.
- **LLM-as-judge:** A powerful language model evaluates the generated answer against the retrieved passages, scoring each quality dimension. This scales better than human evaluation but requires careful calibration against human judgments.
- **Automated heuristics:** Simple checks like "does the answer contain at least one citation?", "is the answer length within expected bounds?", "does the answer include an uncertainty statement when the evidence is thin?"

---

### Layer 3: End-to-end task quality

**Question:** Did the user's actual task get accomplished?

This layer steps back from the individual components and asks: did the whole system -- from query to final response -- actually help the user do what they needed to do?

Think of it like evaluating a travel agent. You don't just check whether they found flights (retrieval) or wrote a nice itinerary (generation). You check whether you actually got to your destination on time, within budget, and without unpleasant surprises. The ultimate measure is task completion.

#### Key metrics

**Task completion rate:** For queries where there is a clear correct outcome (e.g., the user needed a specific piece of information to make a decision), how often does the system produce a response that enables that outcome?

**User satisfaction:** For real users interacting with the system, how do they rate the experience? This can be measured through explicit feedback (thumbs up/down, star ratings) or implicit signals (did the user ask a follow-up question suggesting the answer was insufficient? Did they escalate to a human?).

**Time-to-answer:** How long does the user spend getting the information they need? A correct answer that arrives 30 seconds after the question is better than a correct answer that requires three follow-up clarifications over five minutes.

**Deflection rate (for support use cases):** What percentage of user queries are fully resolved by the RAG system without human intervention? This is both a quality metric and a business metric.

#### How to measure

End-to-end evaluation requires either:

- **User studies:** Real users interact with the system and provide feedback. Gold standard but expensive and slow.
- **Task-based test suites:** Predefined scenarios with expected outcomes. "Given this query, the user should be able to determine X from the system's response." A domain expert verifies whether the response enables the task.
- **A/B testing:** Compare the RAG system against a baseline (human agents, previous system version, simpler approach) on real traffic.

---

### Layer 4: Safety and compliance

**Question:** Is the system operating within its safety and policy boundaries?

This layer checks that the system is not producing harmful, misleading, or policy-violating outputs -- even when the retrieval and generation layers are working correctly from a technical standpoint.

#### Key checks

**Sensitive data exposure:** Does the system ever surface confidential information to unauthorized users? Test with queries designed to probe for sensitive content.

**Policy compliance:** Does the system follow its operational policies? For example, if the policy says "always recommend consulting a professional for medical questions," does the system actually do this?

**Harmful content:** Does the system ever produce outputs that could cause harm? This includes medical misinformation, dangerous instructions, discriminatory statements, or legally problematic claims.

**Boundary respect:** Does the system stay within its defined scope? If the system is designed for HR policy questions, does it refuse to answer medical or legal questions rather than attempting them poorly?

**Adversarial robustness:** Can users manipulate the system into violating its policies through prompt injection, jailbreaking, or other adversarial techniques?

---

## Building RAG evaluation suites

Knowing what to measure is only half the challenge. The other half is building practical evaluation suites that you can run repeatedly, affordably, and reliably.

### Test case structure

Each test case in a RAG evaluation suite should contain:

```
Test case:
  id: unique identifier
  category: routine | edge_case | adversarial | no_evidence
  query: the user's question
  expected_retrieval:
    relevant_passages: list of passage IDs that should be retrieved
    irrelevant_passages: list of passage IDs that should NOT be retrieved (if any)
  expected_generation:
    key_points: list of facts that the answer must include
    forbidden_content: list of things the answer must NOT include
    required_citations: minimum number of citations expected
    expected_abstention: boolean (should the system say "I don't know"?)
  evaluation_criteria:
    faithfulness: required (0-1 score threshold)
    completeness: required (0-1 score threshold)
    policy_compliance: list of policies that apply to this query
```

### Golden datasets

A golden dataset is a curated set of test cases with human-verified expected results. Building one is the most time-consuming part of RAG evaluation -- and the most valuable.

**Minimum golden dataset composition:**

| Category | Count | Purpose |
|---|---|---|
| Routine queries | 30+ | Common questions that the system should handle well |
| Edge cases | 10+ | Unusual but valid questions that test boundary handling |
| Adversarial queries | 10+ | Attempts to manipulate, confuse, or exploit the system |
| No-evidence queries | 10+ | Questions where the knowledge base has no answer |
| Multi-hop queries | 5+ | Questions that require combining information from multiple passages |
| Conflicting evidence | 5+ | Questions where sources disagree |

**Total minimum: 70+ test cases** for a meaningful evaluation suite.

### Automated vs. human evaluation

**Use automated evaluation for:**
- Retrieval metrics (P@k, R@k, MRR) -- these are deterministic given relevance labels.
- Simple generation checks (citation count, answer length, presence of uncertainty statements).
- Regression detection (compare current scores against a baseline).
- High-frequency monitoring (run on every deployment).

**Use human evaluation for:**
- Initial golden dataset creation (labeling relevance, defining expected answers).
- Faithfulness assessment (subtle hallucinations are hard for automated methods to catch).
- Periodic deep reviews (monthly or quarterly, sample of real queries).
- Calibrating LLM-as-judge (verify that the automated judge agrees with human judgment on a held-out set).

**Use LLM-as-judge for:**
- Scaling human-like evaluation across large test sets.
- Evaluating dimensions like faithfulness, relevance, and completeness.
- Continuous monitoring between human review cycles.
- Caveat: always calibrate against human judgments and track the judge's accuracy over time.

---

## Regression detection for RAG

One of the most dangerous moments in a RAG system's lifecycle is when the knowledge base changes. Adding new documents, updating existing ones, or changing the chunking strategy can silently degrade retrieval quality.

### What can cause regression

- **New documents:** Adding content that is similar to existing content may confuse the retriever, causing it to return the new (potentially less relevant) content instead of the established correct passages.
- **Updated documents:** If a document is updated and re-indexed, the new chunks may have different embeddings, causing them to match different queries than before.
- **Deleted documents:** Removing content creates gaps. Queries that previously had good answers now return no evidence or worse evidence.
- **Embedding model changes:** Updating the embedding model changes the vector space. All existing embeddings must be regenerated, and the mapping between queries and passages may shift.
- **Chunking strategy changes:** Different chunk boundaries change which content appears in each chunk, which changes what gets retrieved.

### How to detect regression

**Before every knowledge base update:**
1. Run the full evaluation suite against the current knowledge base. Record the baseline scores.
2. Apply the update to a staging index (not the production index).
3. Run the full evaluation suite against the staging index.
4. Compare scores. Flag any metric that has degraded beyond the regression threshold.

**Recommended regression thresholds:**

| Metric | Maximum acceptable degradation |
|---|---|
| Retrieval recall@5 | -2% |
| Retrieval precision@5 | -3% |
| Faithfulness score | -1% |
| Citation accuracy | -2% |
| Task completion rate | -2% |

If any metric degrades beyond its threshold, the update should be reviewed before deployment. Small degradations in one metric may be acceptable if other metrics improve, but the decision should be explicit and documented.

---

## Evaluation as an SSA artifact

The SSA does not just design the RAG system -- the SSA designs the evaluation framework that proves the RAG system works. The evaluation suite is a first-class deliverable, alongside the architecture specification and the operational runbook.

The evaluation framework document should include:

1. **Metric definitions:** What each metric measures and why it matters for this domain.
2. **Golden dataset:** The full set of test cases with expected results.
3. **Evaluation procedures:** How to run automated evaluations and when to conduct human reviews.
4. **Scoring rubrics:** Detailed criteria for human evaluators to ensure consistency.
5. **Regression thresholds:** What level of degradation triggers a review.
6. **Evaluation cadence:** How often each type of evaluation runs (per-deployment, daily, weekly, monthly).
7. **Responsibility assignments:** Who runs evaluations, who reviews results, and who has the authority to block a deployment based on evaluation results.

---

## Key takeaways

1. **Evaluate all four layers independently.** Retrieval, generation, end-to-end, and safety each answer a different question. A failure in one layer may be invisible when you only look at another.

2. **Faithfulness is the king metric.** A RAG system that sounds good but makes up facts is worse than useless -- it is dangerous. Measure faithfulness rigorously and treat it as a non-negotiable quality bar.

3. **Build golden datasets early.** They are expensive to create and invaluable to have. Start with 70+ test cases across all categories and expand over time.

4. **Detect regressions before users do.** Run the evaluation suite before every knowledge base update and every model change. Set clear thresholds and enforce them.

5. **Combine automated and human evaluation.** Automated evaluation scales. Human evaluation catches subtlety. LLM-as-judge bridges the gap. Use all three, and calibrate them against each other.

---

## What comes next

You now know how to evaluate whether a RAG system is working. The next lesson addresses the ongoing challenge: **how to keep it working.** We will cover RAG-specific SLOs, knowledge base operations, monitoring dashboards, incident runbooks, and cost optimization -- everything you need to operate a RAG system reliably in production.
