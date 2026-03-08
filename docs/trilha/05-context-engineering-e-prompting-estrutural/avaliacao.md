---
sidebar_position: 7
sidebar_label: "Assessment"
---

# Module 5 — Assessment

## What you should have produced

By completing this module, you should have the following artifacts:

| # | Artifact | Source |
|---|---|---|
| 1 | Context map with three layers (static, dynamic, retrieved) for one agent | Lesson 1 practice activity |
| 2 | Complete structural prompt with all 9 sections (identity through self-review) | Lesson 2 practice activity |
| 3 | Consistency report with 20-case test suite, baseline and post-fix metrics | Lesson 3 practice activity |
| 4 | Versioned context package with mission, policies, ontology refs, output schema, examples, and change log | Application A |
| 5 | Prompt hardening case study with before/after metrics across 6 dimensions | Application B |

---

## Assessment rubric

Each dimension is scored **0, 1, or 2**. Total possible: **10 points**. Passing threshold: **8/10**.

### Dimension 1: Context layering quality (0-2)

| Score | Description |
|---|---|
| **0** | No clear separation between static, dynamic, and retrieved context. Everything is mixed into a single block. |
| **1** | Layers are identified but separation is incomplete. Some dynamic data appears in the static section, or retrieved context isn't distinguished from the agent's own knowledge. |
| **2** | Clean, principled separation of all three layers. Each element is in the correct layer with justification. Sources and freshness requirements are specified for dynamic context. Relevance thresholds are set for retrieved context. An implementer could build the context assembly pipeline from this specification. |

### Dimension 2: Contract completeness (0-2)

| Score | Description |
|---|---|
| **0** | Prompt is unstructured or missing critical sections (no refusals, no output schema, no examples). |
| **1** | Most sections are present but some lack depth. Refusals exist but don't cover all dangerous scenarios. Examples exist but don't cover edge cases. Output schema exists but lacks validation rules. |
| **2** | All 9 sections of the structural prompt template are complete. Identity is clear. Policies reference the constraint matrix. Authority boundaries are explicit. Refusals cover at least 3 scenarios with response templates. Examples cover happy, edge, refusal, and uncertainty cases. Self-review checklist has at least 3 concrete checks. |

### Dimension 3: Measured consistency gain (0-2)

| Score | Description |
|---|---|
| **0** | No measurement. Improvements are claimed without evidence. No test suite exists. |
| **1** | Test suite exists and baseline is measured, but post-fix measurements are incomplete or the test suite is too small (fewer than 15 cases). Improvement is shown but for only one or two metrics. |
| **2** | Comprehensive test suite (20+ cases covering all scenario types). Baseline and post-fix measurements across multiple metrics with repeated runs. Improvement is demonstrated with specific numbers. Remaining issues are honestly documented. |

### Dimension 4: Risk reduction (0-2)

| Score | Description |
|---|---|
| **0** | No attention to safety. No refusals. No adversarial test cases. Prompt injection vulnerability not addressed. |
| **1** | Some refusals exist but adversarial scenarios are limited. Prompt injection is mentioned but not systematically tested. Authority boundaries exist but are vague. |
| **2** | Refusals cover all critical scenarios. Adversarial inputs are included in the test suite and properly handled. Prompt injection defense is explicit. Authority boundaries are precise. Hard constraints from the constraint matrix are directly reflected in the prompt policies. |

### Dimension 5: Maintainability (0-2)

| Score | Description |
|---|---|
| **0** | No versioning. No change log. Prompt is a monolithic block with no section boundaries. Changing one rule requires understanding the entire prompt. |
| **1** | Versioning exists but the change log is minimal. Sections are present but boundaries could be clearer. Some sections could be updated independently, but others are entangled. |
| **2** | Full versioning with meaningful change log entries (what changed, why, what was tested). Each section can be updated independently. Known limitations are documented. Planned improvements are listed. The package could be maintained by someone who didn't write it. |

---

## Self-assessment checklist

### Lessons

- [ ] I can decompose a monolithic prompt into three context layers (static, dynamic, retrieved)
- [ ] I can build a structural prompt following the 9-section template
- [ ] I understand the instruction hierarchy (identity > policies > task > output)
- [ ] I can write effective refusal instructions with response templates
- [ ] I can design a test suite with easy, hard, ambiguous, and adversarial cases
- [ ] I can measure consistency, detect failures, and systematically improve prompts
- [ ] I understand prompt drift and know how to detect it

### Application A — Context package v1

- [ ] My context package has all 9 sections with substantive content
- [ ] Static context references specific ontology entities and constraint matrix rules
- [ ] Dynamic context specifies sources, freshness requirements, and fallbacks
- [ ] Output schema matches the semantic contract from Module 2
- [ ] Few-shot examples cover happy, edge, refusal, and uncertainty cases
- [ ] The package is versioned with a change log and rationale

### Application B — Prompt hardening sprint

- [ ] I have before and after metrics for at least 5 of the 6 dimensions
- [ ] My test suite has 20+ cases covering all scenario types
- [ ] I applied at least 3 structural techniques with documented rationale
- [ ] At least 3 metrics show measurable improvement
- [ ] Cost/latency trade-offs are analyzed
- [ ] Remaining issues are honestly documented with recommendations

---

## What passing means

Scoring **8/10 or higher** means you can:

- Design context packages that make agent behavior predictable, consistent, and controllable
- Build structural prompts that enforce output schemas, handle uncertainty, and refuse dangerous requests
- Measure and improve prompt quality through systematic testing and iteration
- Maintain production context packages with versioning, change tracking, and drift detection

---

## If you don't pass

- **Low on context layering:** review each element in your prompt and ask: "Does this change per request, or is it always the same?" Same = static. Different = dynamic or retrieved. This simple question usually resolves mixing issues.
- **Low on contract completeness:** check the 9-section template and verify each section exists. The most commonly missing sections are refusals, uncertainty handling, and self-review. These are precisely the sections that prevent the worst failures.
- **Low on measurement:** your test suite may be too small or too easy. Add more cases, especially adversarial ones. Run each case at least 2 times to measure consistency. Use quantitative scores, not qualitative assessments.
- **Low on risk reduction:** check your refusal list. Can you think of a scenario where the agent should refuse but doesn't have an instruction to? Add it. Then add adversarial inputs to your test suite that test these refusals.
- **Low on maintainability:** add clear section headers to your prompt. Write a one-line summary of what each section does. Add a change log entry explaining your design decisions. Future maintainers will thank you.

---

## Bridge to Module 6

You now have context packages that make agents behave correctly. But how do you KNOW they're behaving correctly in production? How do you measure quality at scale? How do you detect degradation before customers notice?

**Module 6 — Evaluation, Quality and Observability** builds the measurement infrastructure: evaluation suites that test agent behavior systematically, quality metrics that quantify performance, and observability tools that make the system's internal state visible. If Module 5 taught the agents how to behave, Module 6 proves they're actually doing it.
