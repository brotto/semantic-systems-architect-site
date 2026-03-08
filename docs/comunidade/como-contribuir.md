---
sidebar_position: 1
title: How to Contribute
---

# How to Contribute

The SSA Academy was designed from the ground up to evolve with its community. Every lesson, lab, template, and playbook benefits from the collective experience of practitioners who design AI systems grounded in meaning. Whether you are correcting a single sentence or proposing an entirely new specialization track, your contribution matters.

This guide explains where to contribute, what types of contributions the project welcomes, the process for submitting your work, and the quality standards that keep the curriculum coherent and reliable.

---

## Where to Contribute

The SSA Academy is organized into several content areas. Each one has its own conventions and expectations, but all follow the same contribution workflow.

### Manifesto and Foundations

The manifesto layer lives under `docs/manifesto` and the repository-level `/manifesto` and `/foundations` directories. This layer defines the philosophical and methodological bedrock of Semantic Systems Architecture. Contributions here typically involve clarifying language, strengthening arguments, or proposing new foundational theses. Because changes to the manifesto affect the meaning of everything else in the curriculum, they go through a more rigorous review process.

### Course Content

The main learning track lives under `docs/trilha`. Each module contains lessons and applied activities that build on one another. Contributions to course content include improving explanations, adding worked examples, updating diagrams, and ensuring that every lesson connects clearly to the modules before and after it.

### Labs

Labs live under `docs/labs` and provide hands-on exercises where learners apply SSA concepts to realistic scenarios. Contributing a lab means providing a clear problem statement, step-by-step guidance, expected deliverables, and evaluation criteria. Good labs connect theory to practice in a way that makes the learner feel the concepts working.

### Templates

Templates under `docs/templates` give practitioners reusable starting points for real projects. A template contribution should include a filled example, instructions for adaptation, and notes on which SSA concepts it operationalizes.

### Playbooks

Playbooks under `docs/playbooks` are procedural guides for specific professional situations. Contributing a playbook means writing a sequence of steps that a practitioner can follow, with decision points, common pitfalls, and references to the underlying SSA methodology.

### References and Glossary

The glossary and reference materials ensure consistent terminology across the entire curriculum. If you notice a term used inconsistently, or if a concept needs a clearer definition, this is the place to contribute.

---

## Types of Contribution

Contributions come in many forms. Here are the most common, organized from smallest to largest scope.

### Bug Fixes and Corrections

Typos, broken links, formatting errors, and factual inaccuracies. These are the fastest contributions to submit and review. If you see something wrong, fix it. No issue required for trivial corrections.

### Content Improvement

Rewriting a confusing paragraph, adding a missing example, improving the flow of a lesson, or strengthening a weak analogy. These contributions make existing content clearer and more effective without changing its scope or intent.

### New Examples and Case Studies

Real-world scenarios that illustrate SSA concepts in action. Case studies should include enough context for the reader to understand the domain, the problem, the semantic architecture decisions made, and the outcomes observed. Anonymize proprietary information.

### New Labs and Practice Activities

Hands-on exercises that let learners practice specific skills. A good lab has a clear learning objective, a realistic scenario, scaffolded steps, and criteria for self-evaluation. See the existing labs for the expected structure.

### Evaluation Suites

Collections of test cases, rubrics, or assessment criteria that help practitioners evaluate semantic systems. Eval suites should be reproducible, well-documented, and aligned with the SSA maturity model.

### Translation

The SSA Academy aims to be accessible in multiple languages. Translation contributions involve adapting existing content while preserving its technical precision and didactic clarity. Translators should be fluent in both the source and target languages and familiar with SSA terminology.

### Content Creation

Proposing and writing entirely new sections, modules, or specialization tracks. This is the largest type of contribution and requires an initial proposal issue before any writing begins, so the community can discuss scope, placement, and alignment with the curriculum.

---

## Contribution Process

Every contribution follows the same basic workflow, with additional steps for larger changes.

### Step 1: Open an Issue (for non-trivial changes)

Before investing significant time, open a GitHub issue to describe what you want to contribute and why. Use the appropriate issue template. This lets maintainers and other contributors provide early feedback on scope, approach, and placement within the curriculum. For trivial fixes like typos or broken links, you can skip directly to a pull request.

### Step 2: Fork and Branch

Fork the repository and create a feature branch with a descriptive name. Use the pattern `content/short-description` for content changes, `fix/short-description` for corrections, and `lab/short-description` for new labs.

### Step 3: Write Your Content

Follow the content style guide below. Write in Markdown or MDX, and test your changes locally by running the Docusaurus development server. Make sure all internal links resolve and the sidebar navigation remains coherent.

### Step 4: Self-Review Checklist

Before opening a pull request, review your own work against this checklist:

- The content has a clear learning objective or purpose.
- The language is consistent with SSA terminology.
- All internal links are valid and point to the correct targets.
- Code blocks, if any, are syntactically correct and tested.
- The content builds on prior knowledge and avoids unexplained jargon.
- The local build passes without errors.
- The sidebar position and navigation flow make sense.

### Step 5: Open a Pull Request

Open a pull request against the `main` branch. In the PR description, explain the context for the change, summarize what you modified, and link to the related issue if one exists. Include screenshots of rendered pages if the change affects layout or visual presentation.

### Step 6: Review Process

A maintainer or reviewer will examine your contribution for technical accuracy, didactic quality, SSA methodology alignment, and navigation coherence. Expect constructive feedback. Reviewers may request changes before approval. Address feedback promptly, and ask questions if anything is unclear.

### Step 7: Merge

Once your pull request is approved, a maintainer will merge it. Your contribution becomes part of the SSA Academy.

---

## Quality Standards

Every piece of content in the SSA Academy must meet four quality standards.

### Didactic Clarity

Can a motivated learner understand this content without external help? Does it build on prior lessons? Are abstract concepts illustrated with concrete examples? Does the reader know what to do with the knowledge they just gained?

### SSA Methodology Alignment

Does the content use SSA terminology correctly? Does it reinforce the principles laid out in the manifesto and foundational theses? Does it avoid contradicting or undermining concepts taught elsewhere in the curriculum?

### Practical Applicability

Can a practitioner apply this content to a real project? Does it connect theory to action? Does it acknowledge the messiness of real-world implementation without losing rigor?

### MDX Compatibility

Does the content render correctly in Docusaurus? Are MDX components used properly? Does the build pass without warnings or errors?

---

## Content Style Guide

### Tone

Write in a professional but accessible voice. Imagine you are explaining a concept to a capable colleague who is new to semantic systems architecture. Avoid unnecessary formality, but maintain precision. Never sacrifice accuracy for simplicity.

### Structure

Every lesson or guide should follow a consistent structure:

1. **Context**: Why does this matter? What problem does it solve?
2. **Core concept**: What is the idea, and how does it work?
3. **Analogy or example**: A concrete illustration that makes the concept tangible.
4. **Practical application**: How does a practitioner use this in a real project?
5. **Practice activity or reflection**: Something the learner can do to internalize the concept.

### Analogies and Examples

Good analogies are the backbone of effective teaching. When introducing an abstract concept, connect it to something the reader already understands. Test your analogy: does it illuminate the concept without introducing misleading associations?

### Formatting Conventions

- Use ATX-style headings (`#`, `##`, `###`). Do not skip heading levels.
- Use bold for terms being defined for the first time.
- Use code formatting for file paths, command-line instructions, and configuration values.
- Use numbered lists for sequential processes and bullet lists for unordered sets.
- Keep paragraphs focused. One idea per paragraph.
- Do not use curly braces outside of code blocks (MDX parsing constraint).

---

## Sign the Declaration

If you support the principles of Semantic Systems Architecture and want to add your name as a signatory of the SSA Declaration, use the dedicated issue template:

- [Manifesto signature issue](https://github.com/brotto/semantic-systems-architect-site/issues/new?template=manifesto_signature.yml)

Signing is a form of public endorsement. It does not require code contributions.

---

## Recognition

Every contributor is valued. The SSA Academy recognizes contributions in the following ways:

- **Git history**: Your commits and pull requests form a permanent record of your contributions.
- **Contributor credits**: Significant contributions are acknowledged in the relevant section's metadata.
- **Community highlights**: Outstanding contributions may be featured in community updates and announcements.
- **Co-authorship**: For substantial new content such as entire modules or specialization tracks, contributors are credited as co-authors.

The best recognition, however, is the knowledge that your work helps practitioners around the world build AI systems that are grounded in meaning rather than guesswork.

---

## Getting Started

If this is your first contribution, here is a practical starting point:

1. Read through the SSA Declaration and the Foundational Theses to internalize the methodology.
2. Browse existing content in the learning track to understand the tone and structure.
3. Look for open issues labeled `good first issue` in the GitHub repository.
4. Pick one, comment that you intend to work on it, and follow the process described above.

Welcome to the SSA community. Your perspective makes the curriculum stronger.
