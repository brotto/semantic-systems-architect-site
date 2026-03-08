---
sidebar_position: 1
sidebar_label: "Assessment Rubrics"
---

# Assessment Rubrics -- SSA Certification

## Why rubrics matter

A certification without clear assessment criteria is like a map without a legend: it may look authoritative, but nobody can actually use it to navigate.

The SSA assessment rubrics exist for a specific reason. They give you, the candidate, a transparent contract. You know exactly what "good" looks like. You know what "excellent" requires. You know where the bar is, and you can aim for it with precision rather than guesswork.

Think of rubrics like the specification for a bridge. An engineer does not build a bridge and then hope it holds. They design to a specification, test against it, and prove compliance. Your SSA capstone works the same way. These rubrics are the specification you are designing to.

---

## The six assessment dimensions

The SSA certification evaluates your work across six dimensions. Each dimension maps directly to the skills taught across the eight modules of the SSA track. No dimension is optional. A semantic architect must demonstrate competence in all six areas because real systems fail at the weakest link, not the strongest.

Think of these dimensions like the vital signs of a patient. A doctor does not declare someone healthy because their blood pressure is perfect while ignoring their blood sugar. Every vital sign must be within acceptable range. Your architecture is the same.

The six dimensions are:

1. **Semantic Modeling** -- Can you decompose a domain into precise, computable meaning?
2. **System Architecture** -- Can you design agents and orchestration that turn meaning into behavior?
3. **Context Engineering** -- Can you build the information packages that make agents reliable?
4. **Evaluation and Quality** -- Can you prove your system works and detect when it stops working?
5. **Security, Governance and Ethics** -- Can you protect, audit, and align your system?
6. **Product, Operations and Scale** -- Can you ship, run, and grow it in the real world?

Each dimension is scored on a 0-to-10 scale. Let us walk through every dimension in detail.

---

## Dimension 1: Semantic Modeling

**What it measures:** Your ability to take a real-world domain and express it as a formal ontology with precise concepts, well-defined relationships, enforceable constraints, and clear contracts.

This dimension corresponds primarily to Module 2 (Semantic Modeling and Ontologies), but it also draws on Module 1 (the foundational understanding of meaning structures) and Module 5 (how context engineering validates semantic models).

### Score ranges

**0-2 -- Insufficient.**
The ontology is absent or superficial. Concepts are vaguely named without clear definitions. There are no constraints, no invariants, and no distinction between entities and their relationships. The model reads more like a brainstorm than an architecture. A common symptom at this level is that two readers of the ontology would disagree about what a concept means, and neither could point to a definition that settles the dispute.

**3-4 -- Basic.**
Some concepts are identified and named, but the ontology lacks depth. Relationships exist but are not typed or constrained. The candidate demonstrates awareness that semantic modeling matters, but the output has significant gaps. For example, the ontology might list "Customer," "Order," and "Product" as concepts but fail to define what distinguishes a "pending" order from a "confirmed" order, or what constraints govern valid transitions between those states.

**5-6 -- Functional.**
The ontology covers the domain adequately. Concepts are named and defined. Relationships are documented. Some constraints exist, but they may be incomplete or inconsistently applied. The candidate can build a working system from this model, but an experienced reviewer would find ambiguities or edge cases that the model does not address. Think of this level as a house with solid walls but a few windows that do not quite seal: it works in fair weather but has vulnerabilities.

**7-8 -- Solid.**
The ontology is rigorous and well-structured. Concepts have precise definitions, clear boundaries, and explicit relationships. Constraints are documented as enforceable invariants, not just informal notes. Contracts between modules specify exactly what each component expects and guarantees. The model handles edge cases and demonstrates that the candidate has thought about ambiguity, not just the happy path. At this level, a second architect could pick up the ontology and build from it without needing to ask the original author clarifying questions.

**9-10 -- Excellence.**
The ontology is a reference-quality artifact. It is internally consistent, externally validated, and demonstrates sophisticated domain decomposition. The candidate has identified subtle semantic boundaries that less experienced architects would miss. Constraints are not only complete but elegantly expressed. The ontology includes versioning considerations, extension points for future evolution, and clear documentation of design decisions and tradeoffs. This level of work could be published as a teaching example.

### Evidence requirements

- A complete domain ontology document with concept definitions, relationship maps, and constraint specifications.
- At least one ambiguity test demonstrating how the ontology resolves a real-world ambiguous scenario.
- A contract specification showing inputs, outputs, preconditions, and postconditions for at least two key system boundaries.

---

## Dimension 2: System Architecture

**What it measures:** Your ability to design multi-agent systems with clear role separation, appropriate orchestration topologies, well-defined handoff protocols, and robust fallback strategies.

This dimension corresponds primarily to Module 3 (Agent Architecture) and Module 4 (Workflows, Tools, and Pipelines).

### Score ranges

**0-2 -- Insufficient.**
There is no clear agent design. The system is described as a monolith or the agent roles are undefined. There is no discussion of orchestration, handoff, or failure modes. The architecture section reads like a wish list rather than a blueprint.

**3-4 -- Basic.**
Agents are identified but their roles overlap or are poorly bounded. The orchestration topology is implicit rather than explicitly chosen and justified. Handoff protocols are mentioned but not specified. Failure modes are acknowledged in passing but have no concrete mitigation. This is the level of someone who knows that multi-agent systems exist but has not yet internalized the discipline of designing them.

**5-6 -- Functional.**
The architecture identifies distinct agents with documented roles. An orchestration topology is chosen (sequential, parallel, hierarchical, or hybrid) and there is some justification for the choice. Handoff protocols exist but may be incomplete. The system would work under normal conditions but has blind spots for edge cases and failure scenarios. Think of it as a well-organized team where everyone knows their job title but the procedures for what happens when someone is absent have not been written down.

**7-8 -- Solid.**
The architecture demonstrates thoughtful agent design with clear boundaries, well-justified topology selection, and complete handoff protocols. Fallback strategies are documented for critical failure modes. The candidate has considered what happens when an agent produces unexpected output, when latency exceeds thresholds, or when external dependencies become unavailable. State management is explicit. The architecture could be handed to an implementation team with confidence.

**9-10 -- Excellence.**
The architecture is elegant in its simplicity and thorough in its coverage. Every design decision is justified with tradeoff analysis. The topology selection considers not just the current requirements but future scaling and evolution. Handoff protocols include validation steps, timeout handling, and graceful degradation. The system demonstrates defense in depth: no single failure can bring down the entire workflow. The candidate shows awareness of the tension between agent autonomy and system predictability, and resolves it with clear governance mechanisms.

### Evidence requirements

- An architecture diagram showing agents, their roles, and their communication patterns.
- A topology justification explaining why the chosen orchestration pattern fits the problem.
- Handoff protocol specifications for at least two critical agent boundaries.
- A failure mode analysis covering at least three realistic failure scenarios with documented mitigation strategies.

---

## Dimension 3: Context Engineering

**What it measures:** Your ability to design structured context packages that give agents the right information, in the right format, at the right time, with appropriate constraints and validation.

This dimension corresponds primarily to Module 5 (Context Engineering and Structural Prompting) but also draws on every other module, because context is the delivery mechanism for all semantic work.

### Score ranges

**0-2 -- Insufficient.**
Prompts are ad-hoc, unstructured, and untested. There is no separation between system instructions, user context, and task-specific guidance. The candidate treats prompting as an art rather than an engineering discipline. Context packages do not exist as a concept.

**3-4 -- Basic.**
Some structure exists in the prompts, but it is inconsistent. The candidate may use system prompts effectively for one agent but neglect context design for others. There is no layering strategy and no validation process. Prompts are written once and never tested for robustness. This level demonstrates awareness of context engineering as a practice but no systematic approach.

**5-6 -- Functional.**
Context packages are structured with clear sections for identity, constraints, domain knowledge, and task instructions. The candidate demonstrates some layering strategy (base context, domain context, task context). Some validation exists, but consistency across agents has not been rigorously tested. The context packages work for the demonstrated scenarios but might break under adversarial inputs or unexpected edge cases.

**7-8 -- Solid.**
Context packages are well-engineered with explicit layering, version control, and cross-agent consistency. The candidate has tested context packages against ambiguous and adversarial inputs. There is a clear strategy for what information each agent sees and why. Prompt structures follow a repeatable pattern that could be maintained by a team. The candidate demonstrates understanding of context window management and information prioritization.

**9-10 -- Excellence.**
Context engineering is treated as a first-class architectural discipline. Packages are modular, composable, and version-controlled. The candidate demonstrates sophisticated techniques such as context compression, dynamic context assembly based on task state, and automated consistency validation. There is evidence that the context strategy has been hardened through systematic testing. The documentation explains not just what each context package contains but why each element is included and what would break if it were removed.

### Evidence requirements

- At least two complete context packages showing the full structure delivered to agents.
- Evidence of context layering strategy (how base, domain, and task layers compose).
- Results from at least one consistency or adversarial test of the context packages.
- Documentation of context window budget and prioritization decisions.

---

## Dimension 4: Evaluation and Quality

**What it measures:** Your ability to define meaningful metrics, construct evaluation suites, establish quality baselines, detect regressions, and provide evidence that your system does what it claims.

This dimension corresponds primarily to Module 6 (Evaluation, Quality, and Observability).

### Score ranges

**0-2 -- Insufficient.**
There are no metrics, no evaluations, and no quality evidence. The system is presented as working based on the candidate's assertion alone. There is no way for a reviewer to independently verify any claim about system quality. This is the equivalent of a pharmaceutical company saying "the drug works, trust us" without clinical trials.

**3-4 -- Basic.**
Some metrics are defined but they are shallow (for example, "accuracy" without specifying what accuracy means in this domain). A few test cases exist but they do not cover the important scenarios. There is no baseline, no regression strategy, and no systematic evaluation framework. The candidate has tested the system but in an ad-hoc way that does not inspire confidence.

**5-6 -- Functional.**
Metrics are defined and relevant to the domain. An evaluation suite exists with a reasonable number of test cases covering major scenarios. There is a baseline, but it may not be comprehensive. The candidate can show that the system passes its tests, but the tests themselves may not be rigorous enough to catch subtle failures. Regression detection is manual or absent. This level demonstrates competent testing but not evaluation engineering.

**7-8 -- Solid.**
The evaluation suite is well-designed with clear metric definitions, comprehensive test coverage, established baselines, and a regression detection strategy. The candidate demonstrates understanding of the difference between unit-level evals (does this agent produce correct output?) and system-level evals (does the whole pipeline achieve the desired outcome?). Quality evidence is presented with appropriate statistical context, not just cherry-picked examples. The evaluation framework could be run repeatedly by someone other than the candidate.

**9-10 -- Excellence.**
The evaluation suite is a production-grade quality assurance system. Metrics are multi-dimensional, covering correctness, consistency, latency, cost, and user-relevant quality dimensions. The suite includes adversarial test cases, boundary conditions, and regression benchmarks. The candidate demonstrates automated evaluation pipelines, clear alerting thresholds, and a methodology for adding new evals as the system evolves. The quality evidence section is compelling enough to satisfy a skeptical stakeholder. This level of work would serve as the quality backbone of a production system.

### Evidence requirements

- A metric definition document specifying each metric, its calculation method, its target range, and why it matters.
- A complete evaluation suite with at least 15 test cases covering happy paths, edge cases, and failure modes.
- Baseline results with statistical context (not just single-run outputs).
- A regression detection strategy explaining how quality degradation would be caught.

---

## Dimension 5: Security, Governance and Ethics

**What it measures:** Your ability to identify threats, design access controls, establish governance processes, implement audit trails, and reason about the ethical implications of your system.

This dimension corresponds primarily to Module 7 (Security, Governance, and Ethics).

### Score ranges

**0-2 -- Insufficient.**
Security is not addressed, or addressed only with a generic statement like "we will follow best practices." There is no threat model, no access control design, no governance framework, and no ethical analysis. The system is architecturally naive about adversarial use, data privacy, and accountability.

**3-4 -- Basic.**
Some security considerations are documented but they are surface-level. The candidate may list common threats (prompt injection, data leakage) without analyzing how they specifically apply to their system. Access controls are mentioned but not designed. Governance exists as an aspiration rather than a mechanism. Ethical considerations may be acknowledged but not integrated into the architecture.

**5-6 -- Functional.**
A threat model exists and covers the major attack surfaces of the specific system. Access controls are designed at a reasonable level of detail. There is a governance framework with defined roles and processes. Ethical considerations are analyzed with some depth. However, the security design may have gaps, the governance processes may not be practical to implement, and the ethical analysis may not fully address the most challenging scenarios the system could face.

**7-8 -- Solid.**
The threat model is comprehensive and specific to the system, not generic. Access controls are designed with the principle of least privilege and defense in depth. The governance framework includes clear accountability chains, audit trail requirements, and escalation procedures. The ethical analysis addresses bias, fairness, transparency, and accountability with concrete mitigation strategies. The candidate demonstrates understanding that security and ethics are not afterthoughts but architectural constraints that shape the entire system.

**9-10 -- Excellence.**
The security, governance, and ethics design is integrated into the architecture at every level. The threat model considers sophisticated attack vectors including multi-step exploits and social engineering through AI agents. Access controls are granular, dynamic, and auditable. The governance framework is practical, enforceable, and includes mechanisms for continuous improvement. The ethical analysis demonstrates genuine intellectual engagement with hard problems -- not just checklist compliance -- and proposes concrete architectural mechanisms for maintaining alignment as the system evolves.

### Evidence requirements

- A threat model specific to the system with at least five identified threats and their mitigations.
- An access control design showing who and what can access each component and data store.
- A governance framework with defined roles, processes, and accountability chains.
- An ethical analysis addressing at least three ethical dimensions (such as bias, transparency, consent, or impact on affected populations).
- An audit trail design showing what gets logged, where, and how it can be reviewed.

---

## Dimension 6: Product, Operations and Scale

**What it measures:** Your ability to align the architecture with business value, design for operational reliability, plan incident response, manage costs, and create a realistic scaling strategy.

This dimension corresponds primarily to Module 8 (Product, Operations, and Scale) but also requires integration of every preceding module, because operational viability depends on the quality of every architectural layer.

### Score ranges

**0-2 -- Insufficient.**
There is no product strategy, no operational plan, and no scaling consideration. The architecture exists in a vacuum, disconnected from business reality. There are no SLOs, no runbooks, no cost analysis, and no evolution roadmap. The candidate has designed a system but not a product.

**3-4 -- Basic.**
Some product and operational considerations exist but they are vague. The candidate may state that "the system should have 99.9 percent uptime" without explaining how that will be achieved or what happens when it is not achieved. Cost analysis is absent or hand-wavy. The scaling strategy is "we will scale when we need to" rather than a concrete plan with identified bottlenecks and mitigation strategies.

**5-6 -- Functional.**
The product strategy connects the architecture to business outcomes with measurable KPIs. SLOs are defined and reasonable. There is an operational plan with basic runbooks for common scenarios. Cost analysis exists but may not account for scaling dynamics. The scaling strategy identifies the main bottlenecks but may not fully address how to resolve them. This level would support a pilot deployment but would need significant work before production.

**7-8 -- Solid.**
The product strategy is clear, actionable, and grounded in realistic market or organizational analysis. SLOs are well-defined with appropriate error budgets. The operational plan includes comprehensive runbooks, incident response procedures, and on-call rotation guidelines. Cost analysis covers current and projected scenarios with identified levers for optimization. The scaling strategy is specific, phased, and addresses architectural changes needed at each scale threshold. The candidate demonstrates understanding that operations is not a separate concern but an integral part of architecture.

**9-10 -- Excellence.**
The product, operations, and scaling plan is a complete go-to-market and operational blueprint. Product strategy includes user segmentation, adoption metrics, and feedback loops for continuous improvement. SLOs are tiered by user segment or use case severity. The operational plan is detailed enough that a team could start operating the system tomorrow. Incident response procedures include severity classification, communication templates, and post-mortem processes. Cost modeling is sophisticated, with unit economics, marginal cost analysis, and identification of cost-scaling discontinuities. The evolution roadmap shows a credible path from initial deployment through multiple scaling phases, with architectural decision points clearly marked.

### Evidence requirements

- A product strategy document linking system capabilities to business outcomes with measurable KPIs.
- SLO definitions with targets, error budgets, and measurement methodology.
- An operational runbook covering at least three common scenarios and one incident response procedure.
- A cost analysis covering current deployment and at least one scaling scenario.
- An evolution roadmap covering at least two quarters with identified milestones and architectural decision points.

---

## Cross-cutting criteria

Beyond the six dimensions, the assessment board evaluates three cross-cutting qualities that span the entire capstone.

### 1. Consistency across artifacts

Every artifact in your capstone should tell the same story. If your ontology defines a concept called "verified_customer," your agent architecture should use that exact term, your context packages should reference it, your evals should test it, and your security model should define who can create and modify it.

Inconsistency is one of the most common failures in capstone projects. A candidate might build an excellent ontology and then write agent prompts that use completely different terminology. This is not a minor cosmetic issue. It reveals that the semantic model is not actually driving the system. It is decoration rather than architecture.

The assessment board will trace key concepts from the ontology through every deliverable. If a concept appears in the ontology but nowhere else, or if different deliverables use different names for the same thing, this will significantly impact your score.

### 2. Traceability

A reviewer should be able to pick any system behavior and trace it back through the architecture to the semantic model. Why does this agent make this decision? Because the context package gives it this constraint. Why this constraint? Because the ontology defines this invariant. Why this invariant? Because the domain analysis identified this business rule.

Traceability is the signature of a true semantic architecture. It means every behavior is intentional, justified, and auditable. Without traceability, the system is a collection of independently designed parts rather than an integrated architecture.

### 3. Practical applicability

The capstone must solve a real problem. "Real" does not mean it must be deployed in production. It means the problem must be genuine, the constraints must be realistic, and the solution must be implementable. An elegant architecture that cannot actually be built or operated is an academic exercise, not a professional qualification.

The assessment board will consider whether the architecture could survive contact with reality: real users, real data, real failure modes, real budget constraints.

---

## Scoring methodology

### Individual dimension scoring

Each dimension is scored independently by at least two assessors. If scores differ by more than two points, a third assessor is consulted. The final score for each dimension is the average of all assessor scores, rounded to one decimal place.

### Composite score calculation

The composite score is the arithmetic mean of all six dimension scores. There is no weighting: all dimensions are equally important because a semantic architect must be competent across the full stack.

### Passing thresholds

| Result | Criteria |
|---|---|
| **Approved with distinction** | Composite score at or above 8.5, with no individual dimension below 7.0 |
| **Approved** | Composite score at or above 7.0, with no individual dimension below 5.5 |
| **Revision required** | Composite score below 7.0, or any individual dimension below 5.5 |

The "no dimension below" rule is critical. It exists because real systems fail at their weakest point. An architect who scores 10 in semantic modeling but 4 in security has not demonstrated the comprehensive competence that the SSA certification represents.

### Revision process

If revision is required, the candidate receives detailed feedback identifying the specific deficiencies in each dimension that scored below threshold. The candidate has one opportunity to revise and resubmit the affected deliverables within four weeks. Only the deficient areas need to be resubmitted, but the assessment board will re-evaluate consistency across the revised and existing artifacts.

---

## How to use these rubrics

These rubrics are not just an assessment tool. They are a design tool. Use them from the very beginning of your capstone work.

Before you start building, read the 7-8 range description for each dimension. That is your target specification. Design your deliverables to meet those criteria from the start, rather than building something and hoping it measures up afterward.

As you work, periodically self-assess against these rubrics. Ask yourself: "If I were reviewing this as an assessor, what score would I give and why?" Be honest. The gaps you identify during self-assessment are the gaps you can fix before submission.

The candidates who score highest are not necessarily the ones with the most complex systems. They are the ones whose systems are internally consistent, well-justified, thoroughly tested, and clearly documented. Simplicity with rigor will always score higher than complexity with gaps.
