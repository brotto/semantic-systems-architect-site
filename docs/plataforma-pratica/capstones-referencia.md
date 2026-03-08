---
sidebar_position: 4
title: Reference Capstones
---

# Reference Capstones

## Purpose

When you learn to play chess, studying grandmaster games is one of the most powerful training methods available. You do not just see the final position; you follow the game move by move, understanding why each decision was made, what alternatives existed, and how the position evolved. A grandmaster game is a complete narrative of strategic thinking under real constraints.

Reference Capstones serve the same purpose for SSA practitioners. They are complete, high-quality final projects that show end-to-end semantic architecture work at an exemplary standard. Each capstone tells the full story: the problem that needed solving, the domain analysis, the ontology design, the agent architecture, the context packages, the evaluation results, the governance controls, and the operational plan.

A capstone is not a tutorial. Tutorials show you the simplest version of an idea. A capstone shows you the real version, with all the complexity, trade-offs, and judgment calls that real work demands. By studying capstones, new SSAs learn not just what to build but how to think about what they are building.

The reference collection spans multiple domains and complexity levels, giving practitioners access to a growing library of architectural decisions made by experienced practitioners in realistic conditions.

---

## What makes a capstone "reference" quality

Not every completed project qualifies as a Reference Capstone. The reference collection is deliberately curated to a high standard. Including mediocre work would dilute the collection's value as a learning resource. The entry criteria are rigorous because that rigor is what makes capstones worth studying.

### Entry criteria

**End-to-end clarity.** The capstone must tell a complete story from problem identification through operational readiness. Every major decision should be documented, including what was considered and why the chosen path was selected. A capstone that shows only the final design without explaining the journey is a snapshot, not a learning resource.

**Reproducible evidence.** Claims about system behavior must be backed by evaluation data that others can verify. "The system works well" is not evidence. "The system scored 3.7 out of 4 on semantic accuracy across 40 cases using the standard support domain rubric, with detailed scores available in Appendix B" is evidence.

**Architecture completeness.** All layers of the semantic architecture must be present: domain ontology, semantic contracts, agent topology, context packages, workflow definitions, evaluation framework, governance controls, and operational procedures. A project that has an excellent ontology but no evaluation framework is incomplete, no matter how good the ontology is.

**Risk acknowledgment.** The capstone must honestly discuss what could go wrong, what limitations exist, and what risks remain unmitigated. Capstones that present everything as perfect are either dishonest or naive. Real systems have trade-offs, and a reference capstone must show how those trade-offs were navigated.

**Demonstrated operational viability.** The architecture must be plausibly deployable. An elegant theoretical design that cannot actually run in production is an interesting thought experiment, not a reference capstone. The operational plan should address deployment strategy, monitoring approach, incident response procedures, and maintenance workflows.

---

## Capstone structure

Every Reference Capstone follows a standardized structure. This consistency makes it possible to compare capstones across domains and learn specific aspects of SSA work by reading the same section across multiple capstones.

### 1. Problem and context

This section describes the problem that motivated the project and the context in which it exists. It includes:

- **Problem statement.** What specific challenge does this system address? Who faces this challenge? What happens if it is not solved?
- **Stakeholder map.** Who are the people affected by this system? What are their needs, concerns, and constraints?
- **Current state.** How is the problem handled today? What works and what does not?
- **Success criteria.** How will we know if the system is working? What measurable outcomes define success?
- **Scope boundaries.** What is explicitly included and excluded from this project?

Think of this section as the foundation of a building. If the problem is poorly defined, everything built on top of it will be misaligned.

### 2. Ontology and semantic contracts

This section presents the domain model and the semantic contracts that govern system behavior. It includes:

- **Domain decomposition.** The entities, relationships, and categories that structure the domain. How was the domain analyzed? What distinctions matter and why?
- **Terminology definitions.** Precise definitions for every domain term the system uses. Ambiguous terms are explicitly defined in context.
- **Semantic contracts.** The agreements between system components about what terms mean, what data formats are used, what invariants hold, and what guarantees are provided.
- **Design rationale.** Why was the ontology structured this way? What alternatives were considered? What trade-offs were made?

### 3. Architecture

This section describes the technical architecture of the system. It includes:

- **Agent topology.** What agents exist? What role does each play? How do they coordinate? What delegation patterns are used?
- **Workflow design.** What are the main process flows? Where are the decision points? What happens when things go wrong?
- **Tool integration.** What external tools, APIs, and data sources does the system connect to? How are these integrations managed?
- **Context engineering.** How is information packaged and delivered to each agent? What goes into each context window? How is relevance determined?

### 4. Evaluation framework

This section describes how the system is tested and validated. It includes:

- **Eval suite design.** What cases were used? What dimensions were scored? What rubrics were applied?
- **Results and analysis.** What did the evaluations reveal? Where did the system perform well? Where did it struggle?
- **Critical failures.** Any cases where the system produced unacceptable behavior. What caused the failure? How was it addressed?
- **Benchmark comparisons.** How does this system compare to baseline approaches or community benchmarks?

### 5. Governance and security

This section addresses how the system is controlled and protected. It includes:

- **Threat model.** What are the main risks? What attack vectors exist? What failure modes are most concerning?
- **Access controls.** Who can do what within the system? How are permissions managed?
- **Audit trail.** How are system decisions logged and reviewed? What traceability exists?
- **Ethical considerations.** What biases might exist? What fairness concerns were addressed? What stakeholder interests were balanced?
- **Compliance.** What regulatory requirements apply? How are they satisfied?

### 6. Operations and evolution

This section covers how the system runs and improves over time. It includes:

- **Deployment strategy.** How is the system deployed? What environments exist? How are updates rolled out?
- **Monitoring and observability.** What is being measured? What dashboards exist? What alerts are configured?
- **Incident response.** What happens when something goes wrong? Who is notified? What are the escalation procedures?
- **Maintenance workflows.** How is the system kept current? How are ontology updates propagated? How are context packages refreshed?
- **Evolution roadmap.** What improvements are planned? What capabilities are deferred to future versions?

---

## The review process

Reference Capstones undergo a three-stage review before being accepted into the collection.

### Stage 1: Peer review

Two experienced SSA practitioners review the capstone independently. They evaluate each section against the entry criteria and provide detailed written feedback. Peer reviewers look for:

- Completeness: are all sections present and substantive?
- Consistency: do the different sections tell a coherent story?
- Evidence quality: are claims backed by reproducible data?
- Honesty: are limitations and risks acknowledged?

Peer review typically takes 2 to 3 weeks. The author receives the combined feedback and has the opportunity to revise.

### Stage 2: Mentor review

A senior SSA practitioner (designated as a mentor for capstone review) evaluates the capstone with a focus on:

- Architectural judgment: do the design decisions demonstrate mature SSA thinking?
- Pedagogical value: will other practitioners learn something valuable from studying this capstone?
- Production readiness: could this architecture actually work in the real world?
- Writing quality: is the documentation clear, well-structured, and accessible?

The mentor may request revisions or may suggest that the capstone be strengthened in specific areas before acceptance.

### Stage 3: Community vote

Once peer review and mentor review are complete, the capstone is presented to the community for a vote. Community members can review the capstone, ask questions, and vote on whether it should be accepted into the reference collection. Acceptance requires a supermajority (at least 75% approval) from participating voters.

The community vote serves two purposes: it validates the capstone's quality through collective judgment, and it gives community members an opportunity to engage with high-quality work, which itself is a learning experience.

---

## What capstones are not

Understanding what Reference Capstones are not helps set appropriate expectations.

**Capstones are not tutorials.** A tutorial walks you through a simplified example step by step, showing you how to do something. A capstone shows you the result of someone having already done it, with full complexity. You learn from a tutorial by following along. You learn from a capstone by analyzing and questioning.

**Capstones are not templates.** You should not copy a capstone's structure and fill in your own details. Each project has unique requirements, and blindly following another project's architecture will produce a design that fits someone else's problem. Study capstones for patterns and judgment, not for copy-paste solutions.

**Capstones are not perfection.** Every capstone has trade-offs, limitations, and decisions that could have been made differently. The fact that a capstone is in the reference collection means it meets a high quality bar, not that it is beyond criticism. Questioning a capstone's decisions is not disrespectful; it is exactly the kind of critical thinking the collection is designed to encourage.

**Capstones are not frozen.** The reference collection evolves. Capstones that were excellent when published may become outdated as the field advances. The community periodically reviews the collection and may retire capstones that no longer represent current best practices, replacing them with newer work that reflects the state of the art.

---

## How to learn from Reference Capstones

Capstones are most valuable when studied systematically. Here are four approaches for getting the most out of the reference collection.

### The deep dive

Pick one capstone and study it thoroughly from start to finish. Read every section. Understand every decision. For each design choice, ask yourself: "Would I have made the same choice? If not, why not? What does the author see that I might be missing?"

This approach works best when you are early in your SSA journey and want to understand what complete, professional-quality work looks like.

### The section comparison

Pick one section (for example, "Ontology and semantic contracts") and read it across five or six different capstones in different domains. Notice the patterns: what do all good ontologies have in common? What varies by domain? How do experienced SSAs handle the transition from domain analysis to formal ontology design?

This approach works best when you want to deepen a specific skill.

### The decision analysis

Focus specifically on the design rationale sections across multiple capstones. Study how experienced SSAs make trade-off decisions. What factors do they consider? How do they handle competing constraints? When do they choose simplicity over completeness, and when do they choose the reverse?

This approach works best for intermediate practitioners who have the basics but want to develop architectural judgment.

### The reconstruction challenge

Read only the "Problem and context" section of a capstone. Then, without looking at the rest, design your own solution. When you are finished, compare your design with the reference capstone section by section. Where did you make similar choices? Where did you diverge? Can you understand why the reference author made different decisions?

This approach is the most demanding and the most educational. It forces you to generate your own thinking before comparing it with expert work.

### Building a study group

Capstones become even more powerful when studied in groups. A study group of three to five practitioners can pick one capstone per month, study it independently, and then meet to discuss. Each member brings their own perspective: one might focus on the ontology choices, another on the governance controls, another on the operational plan. The resulting discussion surfaces insights that no individual would reach alone.

A productive study group discussion follows a simple structure:

1. Each member shares their strongest takeaway: the one thing they learned or were challenged by.
2. Each member shares their strongest critique: the one decision they would have made differently, and why.
3. The group discusses the trade-offs that generated the most disagreement.
4. The group identifies one pattern or principle they want to apply in their own work.

This structure keeps discussions focused, ensures every voice is heard, and produces actionable takeaways.

---

## Assets and resources

- `community-assets/capstones/template-capstone-outline.md` -- Structured template with all required sections and guidance notes
- `community-assets/capstones/reference-checklist.md` -- Pre-submission checklist for ensuring completeness
- `community-assets/capstones/review-rubric.md` -- The rubric used by peer reviewers and mentors
- `community-assets/capstones/study-guide.md` -- Suggested approaches for learning from reference capstones
- `community-assets/capstones/examples/` -- Directory of accepted Reference Capstones
