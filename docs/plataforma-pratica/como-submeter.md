---
sidebar_position: 6
title: How to Submit
---

# How to submit practical contributions

## The platform grows through you

The SSA Practice Platform is a community resource. Every case in the Case Bank, every eval suite, every Reference Capstone, and every Maturity Matrix update exists because a practitioner took the time to share their experience in a structured way. The platform is only as good as its contributions.

Think of it like a public library. The collection is valuable because many people contribute carefully curated material. One poorly written book does not ruin the library, but consistent quality standards keep the collection useful for everyone. This guide explains what those standards are, how the submission process works, and what to expect at each stage.

---

## Submission types

### 1. New case for the Case Bank

A case is a standardized scenario for training, validation, or benchmarking. You might submit a case because you encountered an interesting real-world challenge that would make good training material, because you identified a gap in the current case collection (a domain or skill focus that is underrepresented), or because you designed a scenario with particularly instructive trade-offs.

**Step-by-step process:**

1. **Check for gaps.** Browse the existing Case Bank to make sure your case does not duplicate an existing one. Similar domains are fine; identical scenarios are not.
2. **Use the template.** Start from `community-assets/case-bank/template-case.yaml`. Fill in every required field. Do not skip fields even if they seem obvious.
3. **Write the scenario.** Aim for 200 to 500 words. Make it realistic, specific, and grounded in plausible real-world conditions. Remove any personally identifiable information or proprietary details from your source material.
4. **Define evaluation criteria.** This is the hardest part. Your rubric must be specific enough that two independent evaluators would score the same solution similarly. Read the rubric guide at `community-assets/case-bank/rubric-guide.md` before writing yours.
5. **Test your case.** Work through the case yourself, or ask a colleague to do so. If the solver finds the scenario confusing, the constraints contradictory, or the rubric ambiguous, revise before submitting.
6. **Open an issue.** Create a GitHub issue titled `[Case] Brief description of case`. Include the domain, difficulty level, and a one-paragraph summary.
7. **Create a branch.** Name it `community/case-[domain]-[short-slug]`.
8. **Add your case file** to `community-assets/case-bank/submissions/`.
9. **Open a pull request.** Reference the issue. Complete the submission checklist (provided in the PR template).

### 2. New eval suite

An eval suite is a reusable evaluation protocol: a set of cases, a scoring rubric, and an execution methodology designed to assess a specific aspect of SSA work. You might submit an eval suite because existing suites do not cover a domain or skill dimension you care about, because you developed a novel evaluation approach worth sharing, or because you want to standardize how a specific type of system is assessed.

**Step-by-step process:**

1. **Identify the gap.** Explain what evaluation need is not currently met. Review existing suites at `community-assets/evals/`.
2. **Draft the protocol.** Use the template at `community-assets/evals/template-eval-suite.yaml`. Define the objective, case selection, rubric, execution procedure, and reporting format.
3. **Run a pilot.** Execute your eval on at least 10 cases with at least 2 evaluators. Document the results, including any calibration issues or rubric ambiguities discovered during the pilot.
4. **Revise based on pilot findings.** Adjust the rubric, clarify scoring criteria, and fix any methodological issues.
5. **Open an issue.** Title it `[Eval] Brief description of eval suite`. Include the evaluation objective and a summary of pilot results.
6. **Create a branch.** Name it `community/eval-[focus]-[short-slug]`.
7. **Add your eval suite files** to `community-assets/evals/submissions/`.
8. **Open a pull request.** Reference the issue. Include pilot results and evaluator calibration notes.

### 3. Reference Capstone

A Reference Capstone is an exemplary final project that demonstrates end-to-end SSA work at a high standard. This is the most substantial contribution type. You should only submit a capstone if you believe it genuinely meets the reference quality criteria described in the [Reference Capstones](./capstones-referencia) section.

**Step-by-step process:**

1. **Self-assess against entry criteria.** Before you invest time in formatting your capstone for submission, honestly evaluate it against the entry criteria: end-to-end clarity, reproducible evidence, architecture completeness, risk acknowledgment, and operational viability. If you have significant gaps, strengthen the work before submitting.
2. **Use the template.** Start from `community-assets/capstones/template-capstone-outline.md`. Ensure every section is substantive, not just present.
3. **Complete the pre-submission checklist.** Use `community-assets/capstones/reference-checklist.md` to verify completeness.
4. **Prepare supporting materials.** Gather all eval results, architecture diagrams, ontology files, and operational documentation that support your capstone narrative.
5. **Open an issue.** Title it `[Capstone] Brief description of project`. Include the domain, a one-paragraph summary, and your self-assessment against the entry criteria.
6. **Create a branch.** Name it `community/capstone-[domain]-[short-slug]`.
7. **Add your capstone files** to `community-assets/capstones/submissions/`.
8. **Open a pull request.** Reference the issue. Include a note addressing how you believe the capstone meets each entry criterion.

Be prepared for a thorough review process. Capstones undergo peer review, mentor review, and community vote. The process typically takes 4 to 8 weeks. Revisions are common and expected.

### 4. Maturity Matrix update

The Maturity Matrix evolves as the community's understanding of SSA maturity deepens. You might propose an update because you identified a gap in the current level descriptions, because a new dimension of practice has emerged, because the transition criteria between levels need refinement, or because you have evidence that certain descriptions do not match real-world practice.

**Step-by-step process:**

1. **Document the issue.** Describe what is wrong or missing in the current matrix. Provide specific examples from your experience that illustrate the gap.
2. **Propose the change.** Write the specific text changes you recommend. For level descriptions, provide both the current text and your proposed replacement.
3. **Provide evidence.** Include examples, assessment results, or case studies that support your proposal.
4. **Open an issue.** Title it `[Matrix] Brief description of proposed change`. Include the dimension and level(s) affected.
5. **Create a branch.** Name it `community/matrix-[dimension]-[short-slug]`.
6. **Open a pull request** with your proposed changes and supporting evidence.

---

## Quality requirements

All submissions must meet these baseline quality requirements:

**No sensitive data.** Remove all personally identifiable information, proprietary business data, trade secrets, and confidential material. If your case is based on a real situation, anonymize it thoroughly. Change company names, industry specifics, and any details that could identify the source.

**Clear writing.** Write in clear, accessible English. Avoid jargon that is not defined in the scenario. Use short sentences and concrete examples. A submission that cannot be understood by a practitioner outside your specific context is not useful to the community.

**Honest limitations.** State what your contribution does well and where it falls short. A case that acknowledges its limitations is more trustworthy than one that claims perfection.

**Appropriate scope.** Each contribution should do one thing well rather than trying to cover everything. A focused, well-crafted case is more valuable than a sprawling, unfocused one.

**Reproducibility.** Others must be able to use your contribution independently. If your eval requires specific tools, state which ones. If your case depends on specific data, include it. If your capstone references external resources, make sure they are accessible.

---

## The review process

All submissions go through a structured review. The process varies by type, but the principles are the same.

1. **Format check.** A maintainer verifies that the submission follows the correct template and includes all required fields. Submissions with missing fields are returned for completion.
2. **Content review.** Two community reviewers evaluate the submission for quality, accuracy, and value. Reviewers provide written feedback with specific suggestions for improvement.
3. **Security and privacy review.** A reviewer checks for any inadvertently included sensitive data, privacy risks, or potentially harmful content.
4. **Author revision.** The author addresses reviewer feedback and updates the submission.
5. **Final approval.** Once reviewers are satisfied, the submission is approved and merged.

For Reference Capstones, the process includes the additional mentor review and community vote stages described in the [Reference Capstones](./capstones-referencia) section.

---

## Community guidelines

### Constructive feedback

When reviewing others' submissions, be specific, constructive, and respectful. Point out issues by explaining what could be improved and why, not by criticizing the author. Remember that every submission represents someone's effort to contribute to the community.

Good feedback: "The evaluation criteria for 'semantic accuracy' are vague. Consider adding specific examples of what constitutes each score level, similar to how CASE-HEALTH-012 defines its rubric."

Poor feedback: "The rubric is bad and needs to be rewritten."

### Attribution

Give credit where it is due. If your case is inspired by someone else's work, say so. If your eval suite builds on an existing methodology, reference it. If your capstone uses patterns from a community resource, cite it. Attribution strengthens the community by making intellectual lineage visible.

### Licensing

All contributions to the Practice Platform are shared under the project's open license. By submitting, you confirm that you have the right to share the material and that it does not violate any intellectual property rights. If your contribution is derived from work done for an employer, ensure you have permission to share it.

---

## Technical instructions

### File formats

- Cases: YAML format (`.yaml`)
- Eval suites: YAML format (`.yaml`)
- Capstones: Markdown format (`.md`) with supporting files in a subdirectory
- Matrix updates: Markdown format (`.md`)

### Naming conventions

- Cases: `case-[domain]-[three-digit-number].yaml` (e.g., `case-health-042.yaml`)
- Eval suites: `eval-[focus]-[short-slug].yaml` (e.g., `eval-ontology-coverage.yaml`)
- Capstones: `capstone-[domain]-[short-slug]/` directory (e.g., `capstone-support-saas-billing/`)
- Matrix updates: described in the pull request; changes are applied to the main matrix file

### Repository structure

```
community-assets/
  case-bank/
    template-case.yaml
    rubric-guide.md
    samples/
    submissions/
  evals/
    template-eval-suite.yaml
    template-results.yaml
    rubric-templates/
    submissions/
  capstones/
    template-capstone-outline.md
    reference-checklist.md
    review-rubric.md
    examples/
    submissions/
```

### Branch naming

All community contribution branches follow the pattern:

```
community/[type]-[domain-or-focus]-[short-slug]
```

Examples:
- `community/case-legal-contract-review`
- `community/eval-agent-coordination`
- `community/capstone-health-triage`
- `community/matrix-security-level3`

---

## Getting help

If you are unsure whether your contribution fits the platform, if you need feedback before starting, or if you have questions about the process, open a discussion thread in the community forum. Experienced contributors are happy to provide guidance, review drafts, and help you shape your contribution into something the community can use.

The best time to ask for feedback is before you invest significant effort. A five-minute conversation about scope and format can save hours of rework.
