---
sidebar_position: 6
sidebar_label: "Application B — Prompt hardening sprint"
---

# Application B — Prompt hardening sprint

## Objective

In this application, you will take a single unstable prompt — one that produces inconsistent results — and systematically harden it. You'll measure the before and after, document every change, and demonstrate measurable improvement in consistency, cost, and quality.

This is the practical, hands-on complement to Lesson 3. Instead of learning about testing methodology in the abstract, you'll apply it to a real prompt and produce evidence of improvement.

---

## The assignment

### Phase 1: Choose an unstable use case (15 minutes)

Select a prompt from your system that you suspect is unstable. Signs of instability:
- Different outputs for similar inputs
- Inconsistent formatting
- Occasional inappropriate responses
- Unreliable confidence scores
- Drift from intended behavior

If you don't have an unstable prompt, create one intentionally: write a monolithic, unstructured prompt for one of your agents and use that as your starting point.

### Phase 2: Measure the baseline (45 minutes)

Create a test suite of 20 cases. Run them through the current prompt (at least 2 runs each). Measure:

- **Format compliance:** % of responses matching the expected output format
- **Decision accuracy:** % of correct decisions (where "correct" is defined by your semantic contracts)
- **Consistency:** % of cases where the same input produces the same output across runs
- **Refusal rate:** % of adversarial inputs properly refused
- **Token usage:** average tokens consumed per request (cost proxy)
- **Latency:** average response time

### Phase 3: Apply structural hardening (60 minutes)

Apply the techniques from Lessons 1-3:

1. **Decompose context** into static, dynamic, and retrieved layers
2. **Apply the instruction hierarchy** (identity > policies > task > output)
3. **Add explicit refusals** for dangerous scenarios
4. **Add uncertainty handling** instructions
5. **Add few-shot examples** (2-3)
6. **Add self-review checklist**
7. **Remove redundancy** (instructions repeated in multiple places)
8. **Tighten output format** specification

### Phase 4: Measure improvements (45 minutes)

Run the same 20-case test suite through the hardened prompt. Compare all metrics.

### Phase 5: Write the analysis (30 minutes)

Document:
- What was changed and why
- Before and after metrics
- Which changes had the most impact
- What remains unstable and recommended next steps
- Cost/latency trade-off analysis

---

## Deliverable

A document (3-5 pages) containing:

- [ ] The original (unhardened) prompt
- [ ] The hardened prompt
- [ ] Before and after metrics for all 6 dimensions
- [ ] Analysis of which changes had the most impact
- [ ] At least 3 specific examples showing improvement (same input, different output quality)
- [ ] Cost and latency comparison
- [ ] Remaining issues and recommendations

---

## Evaluation criteria

| Criterion | What "good" looks like |
|---|---|
| **Measurement rigor** | Baseline and post-fix measurements use the same test suite. Results are quantified, not asserted. Runs are repeated for statistical validity. |
| **Technique application** | Multiple structural techniques are applied (not just one). Each change is justified with a specific problem it solves. |
| **Measurable improvement** | At least 3 of the 6 metrics show clear improvement. Any regressions are acknowledged and explained. |
| **Cost awareness** | Token usage is tracked. If the hardened prompt uses more tokens, the cost increase is justified by the quality improvement. |
| **Honest assessment** | Remaining issues are documented. The hardened prompt is not claimed to be perfect. Next steps are concrete. |

---

## Tips for success

- **Change one thing at a time (if possible).** If you change everything at once, you won't know which change helped. If time permits, iterate: add the output format instruction, re-test. Add the examples, re-test. This builds understanding of which techniques have the most impact for your specific use case.

- **Track token costs.** Structured prompts are often longer than unstructured ones. That's fine — but you should know the trade-off. "The hardened prompt uses 200 more tokens but reduces classification errors by 15%" is a strong justification.

- **Don't over-engineer.** If the original prompt scores 90% on accuracy and your target is 95%, you might only need one or two changes. Don't apply every technique from the lesson if the prompt doesn't need it. The goal is improvement, not complexity.

- **The before/after comparison is the most valuable part.** Show concrete examples: "With the original prompt, this input produced X. With the hardened prompt, the same input produces Y." These examples make the improvement tangible.
