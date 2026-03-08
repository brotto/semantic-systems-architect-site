---
sidebar_position: 2
title: Governance
---

# Content Governance

An open curriculum needs clear rules. Without governance, contributions drift in different directions, quality becomes inconsistent, and the methodology loses coherence. The SSA Academy governance model balances openness with rigor: anyone can propose changes, but every change must pass through a structured review process that protects the curriculum's integrity.

This document defines the roles, decision processes, quality gates, versioning practices, conflict resolution mechanisms, and code of conduct that govern the SSA Academy.

---

## Roles

The SSA Academy recognizes three roles. Each has distinct responsibilities and authority.

### Maintainers

Maintainers are responsible for the overall direction, quality, and coherence of the SSA Academy. They have the final word on what gets merged into the curriculum.

**Responsibilities:**

- Define the curriculum roadmap and prioritize development areas.
- Review and approve structural changes such as new modules, reorganized sections, or modified navigation.
- Ensure that all merged content meets the quality standards described below.
- Resolve disputes when reviewers and contributors cannot reach agreement.
- Manage releases, versioning, and changelog entries.
- Protect the integrity of the SSA methodology across all content.

Maintainers are appointed based on sustained, high-quality contributions and deep familiarity with the SSA methodology. The initial maintainer team is the founding group that built the first version of the curriculum.

### Contributors

Contributors are the engine of the SSA Academy. Anyone who submits a pull request, opens a meaningful issue, or proposes an improvement is a contributor.

**Responsibilities:**

- Propose improvements through GitHub issues before starting large changes.
- Implement changes following the contribution process described in the How to Contribute guide.
- Respond to review feedback constructively and promptly.
- Ensure submitted work meets the self-review checklist before requesting review.
- Respect the governance process and the decisions of maintainers.

Contributors do not need permission to start working on an improvement, but they should open an issue for non-trivial changes to avoid duplicated effort and misaligned scope.

### Reviewers

Reviewers validate that proposed changes meet the quality gates defined below. A reviewer may be a maintainer or an experienced contributor who has been granted review privileges.

**Responsibilities:**

- Evaluate contributions for technical accuracy, ensuring that SSA concepts are applied correctly.
- Assess didactic quality, checking whether the content teaches effectively.
- Verify navigational coherence, confirming that new content fits logically within the curriculum structure.
- Provide specific, actionable feedback that helps contributors improve their work.
- Approve or request changes within a reasonable timeframe.

Reviewers should approach every pull request with the assumption that the contributor acted in good faith. The goal of review is to make the contribution better, not to demonstrate expertise.

---

## Decision Process

Different types of changes require different levels of consensus. The guiding principle is proportionality: small changes need minimal overhead, while structural changes need careful deliberation.

### Trivial Changes

Typos, broken links, formatting fixes, and other corrections that do not alter meaning.

- **Approval required:** One maintainer or reviewer.
- **Discussion required:** None. Submit a pull request directly.
- **Turnaround expectation:** Within 48 hours.

### Content Improvements

Rewrites, new examples, improved explanations, and other changes that enhance existing content without altering its scope or structure.

- **Approval required:** One maintainer or reviewer.
- **Discussion required:** Brief description in the pull request. An issue is helpful but not mandatory.
- **Turnaround expectation:** Within one week.

### New Content

New labs, templates, playbooks, case studies, or sections within existing modules.

- **Approval required:** One maintainer.
- **Discussion required:** An issue must be opened and discussed before implementation begins.
- **Turnaround expectation:** Within two weeks.

### Structural Changes

New modules, reorganized navigation, changes to the learning track sequence, or modifications to the certification structure.

- **Approval required:** Two maintainers.
- **Discussion required:** A detailed proposal issue with rationale, scope, and impact analysis. A discussion period of at least one week before implementation begins.
- **Turnaround expectation:** Within three weeks.

### SSA Methodology Changes

Changes to core SSA terminology, taxonomies, or foundational principles as defined in the manifesto and foundational theses.

- **Approval required:** All active maintainers.
- **Discussion required:** A mandatory discussion issue open for at least two weeks. Community feedback must be solicited and addressed.
- **Turnaround expectation:** No fixed deadline. These changes proceed only when consensus is reached.

---

## Quality Gates

Every contribution must pass through four quality gates before it can be merged. Reviewers evaluate each gate explicitly.

### Technical Accuracy

The content must be factually correct. SSA concepts must be applied precisely as defined in the manifesto and foundational theses. Technical claims must be supported by evidence or clearly marked as practitioner experience. Code examples must be syntactically correct and tested.

### Didactic Quality

The content must teach effectively. It should have a clear learning objective, build on prior knowledge, use concrete examples to illustrate abstract ideas, and give the learner something to do with what they have learned. Content that is technically correct but incomprehensible fails this gate.

### SSA Methodology Compliance

The content must align with the SSA methodology as a whole. It must use established terminology consistently, reinforce rather than contradict principles taught elsewhere in the curriculum, and avoid introducing concepts that conflict with the foundational theses.

### Navigation Coherence

The content must fit logically within the curriculum structure. Internal links must resolve correctly. The sidebar position must make sense relative to surrounding content. Prerequisites must be clearly stated if the content depends on earlier lessons.

---

## Version Management

The SSA Academy uses a structured approach to versioning that helps the community track the evolution of the curriculum.

### Semantic Versioning for Curriculum

Curriculum versions follow a three-part numbering scheme:

- **Major version** (e.g., 2.0.0): Fundamental restructuring of the curriculum, changes to core SSA principles, or redesigned learning tracks.
- **Minor version** (e.g., 1.3.0): New modules, specialization tracks, or significant content additions that expand the curriculum's scope.
- **Patch version** (e.g., 1.3.2): Corrections, improvements, new examples, and other changes that enhance existing content without altering scope.

### Changelog Maintenance

Every merged pull request that affects curriculum content must include a brief changelog entry. The changelog records what changed, why it changed, and who contributed the change. This creates a transparent history that helps the community understand how the curriculum evolves over time.

### Navigation Migrations

Changes that alter the URL structure of existing content require a migration plan. Old URLs must redirect to new locations. Internal links throughout the curriculum must be updated. The pull request must document all affected paths and confirm that no broken links remain.

---

## Conflict Resolution

Disagreements are natural in a community-driven project. The SSA Academy handles conflicts through a structured escalation process.

### Step 1: Discussion in Context

Most disagreements can be resolved through direct discussion in the pull request or issue where they arise. Contributors and reviewers should assume good faith, present evidence for their positions, and remain open to alternative perspectives.

### Step 2: Mediation by a Third Reviewer

If the original parties cannot reach agreement, either party may request that a different reviewer or maintainer examine the disagreement and offer a perspective. The mediator's role is to help the parties find common ground, not to impose a decision.

### Step 3: Maintainer Decision

If mediation does not resolve the disagreement, a maintainer makes the final call. The maintainer must explain the reasoning behind the decision in writing, so the community can understand and learn from the outcome.

### Step 4: Community Appeal

In rare cases where a contributor believes a maintainer's decision contradicts the SSA methodology or governance principles, they may open a governance issue to appeal the decision. All active maintainers review the appeal and reach a collective decision. This is the final level of escalation.

---

## Code of Conduct

The SSA Academy is a professional learning community. Every interaction, whether in issues, pull requests, discussions, or any other channel, must meet the following standards.

### Respectful Communication

Treat every community member with respect, regardless of their experience level, background, or the nature of their contribution. Critique ideas, not people. Avoid sarcasm, condescension, and dismissive language.

### Constructive Feedback

Review comments should be specific, actionable, and kind. Instead of saying "this is wrong," explain what is incorrect and suggest how to fix it. Instead of saying "this is unclear," identify what is confusing and offer a clearer alternative. The goal is always to help the contributor produce their best work.

### Inclusive Environment

The SSA Academy welcomes contributors from all backgrounds, disciplines, and experience levels. Do not gatekeep. Do not assume that someone's background disqualifies their perspective. The diversity of the community is a strength, not a problem to manage.

### Intellectual Honesty

Attribute ideas to their sources. Acknowledge when you are uncertain. Distinguish between established SSA principles and personal opinions. Do not present speculation as fact.

### Accountability

If you commit to reviewing a pull request or working on an issue, follow through. If circumstances change and you can no longer fulfill a commitment, communicate that promptly so others can step in.

---

## Governance Evolution

This governance model is itself subject to the governance process. Proposals to modify roles, decision processes, quality gates, or any other aspect of governance follow the same structured workflow as SSA methodology changes: mandatory discussion issue, community feedback period, and consensus among all active maintainers.

The governance model should evolve as the community grows, but it should always prioritize clarity, fairness, and the integrity of the SSA methodology.
