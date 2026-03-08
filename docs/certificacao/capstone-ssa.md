---
sidebar_position: 2
sidebar_label: "SSA Capstone"
---

# SSA Capstone -- Final Project

## What is the capstone and why it matters

The capstone is the bridge between learning and professional practice. Throughout the eight modules of the SSA track, you have studied each discipline of semantic systems architecture in isolation: modeling, agents, context, evaluation, security, operations. The capstone is where you prove you can integrate all of them into a coherent, functioning whole.

Think of it like medical training. A medical student studies anatomy, pharmacology, pathology, and surgery as separate subjects. But nobody hands them a scalpel until they demonstrate, in a supervised clinical setting, that they can integrate all those disciplines to treat a real patient. The capstone is your clinical rotation. It is where all the theory becomes practice.

The capstone is not an exam. It is a professional deliverable. You are producing a complete semantic architecture for a real problem -- the kind of artifact you would present to a CTO, a product team, or a client. The assessment board evaluates it not as a school assignment but as a professional work product. Could this architecture actually be built? Would it actually solve the stated problem? Would it survive contact with real users, real data, and real failure modes?

This is why the capstone matters for your career. Passing the SSA certification means you have produced, under rigorous evaluation, a professional-grade semantic architecture. Your capstone becomes a portfolio piece that demonstrates not just knowledge but applied competence.

---

## Scope: what you are building

Your capstone must deliver a **complete semantic architecture for a real problem**. Let us break down what each of those words means.

**Complete** means the architecture covers every layer: from domain modeling through agent design, context engineering, evaluation, security, and operations. Leaving out a layer is not an option. In the real world, an architecture with a missing layer is an architecture with a hidden failure mode.

**Semantic** means the architecture is driven by meaning structures. Your ontology is not decoration. It is the foundation that every other artifact builds on. The assessment board will trace concepts from your ontology through your entire architecture, and they expect to find consistency.

**Architecture** means you are designing a system, not just describing an idea. There must be enough specificity that a competent engineering team could build what you have designed. This does not mean you need to write production code. It means your design decisions must be concrete, your interfaces must be specified, and your constraints must be enforceable.

**Real problem** means the problem must be genuine. You can choose a problem from your own work, from a domain you know well, or from a publicly available case study. The problem must have enough complexity to require multi-agent coordination, domain-specific semantics, and operational considerations. A problem that can be solved with a single prompt is not sufficient.

### Choosing your problem

The best capstone problems share three characteristics:

1. **Domain richness.** The problem involves concepts that require careful definition. There are ambiguities that must be resolved. There are constraints that must be enforced. If the domain is trivially simple, you will not have enough material to demonstrate semantic modeling competence.

2. **Operational complexity.** The problem requires multiple agents, tools, or workflow stages. There are failure modes that must be handled. There are performance requirements that create architectural constraints. If the problem can be solved with a single agent and a single prompt, it is too simple.

3. **Practical relevance.** The problem matters to someone. It has users who would benefit from a solution. It has stakeholders who care about outcomes. If you cannot explain why anyone would want this system built, reconsider your choice.

Examples of good capstone problems: an intelligent document processing pipeline for a regulated industry, a customer service system with complex routing and escalation logic, a content moderation system that must balance accuracy with fairness, a clinical decision support system that must integrate multiple data sources under strict governance constraints.

---

## The seven required deliverables

Your capstone consists of seven deliverables. Each one maps to specific modules in the SSA track and is evaluated against the corresponding dimension in the assessment rubrics. Together, they form a complete architecture.

Think of the seven deliverables as the chapters of a technical story. Each chapter can stand alone as a rigorous artifact, but together they tell the story of a system designed with intention, built with discipline, and prepared for the real world.

### Deliverable 1: Problem Definition and KPIs

**Maps to:** Module 1 (SSA Fundamentals), Module 8 (Product, Operations and Scale)

This is where you define what problem you are solving, for whom, and how you will know if you have succeeded.

**Required contents:**

- **Problem statement.** A clear, specific description of the problem your system addresses. Avoid vague statements like "improve customer experience." Instead, specify what aspect of what experience for what customers under what conditions. The more precise your problem statement, the more focused your entire architecture will be.

- **Stakeholder analysis.** Who are the users of this system? Who are the affected parties? Who has decision authority? Understanding your stakeholders is not a formality. It shapes your ontology (what concepts matter to whom), your agent design (what workflows serve which users), and your ethical analysis (whose interests must be protected).

- **Key Performance Indicators.** Define three to five measurable KPIs that would tell you whether the system is succeeding. Each KPI must have a target value, a measurement method, and a justification for why that metric matters. KPIs should span multiple dimensions: not just technical performance (latency, accuracy) but also business outcomes (time saved, error reduction, user satisfaction).

- **Success criteria.** What does "done" look like? What would a successful deployment of this architecture achieve within six months? Within a year? These criteria should be specific enough that a neutral observer could evaluate whether they have been met.

### Deliverable 2: Domain Ontology

**Maps to:** Module 2 (Semantic Modeling and Ontologies)

This is the semantic foundation of your entire architecture. Every other deliverable builds on it.

**Required contents:**

- **Concept inventory.** A complete list of the core concepts in your domain, each with a precise definition, clear boundaries, and documented relationships to other concepts. For each concept, specify what it is, what it is not, and what distinguishes it from similar concepts.

- **Relationship map.** A visual or structured representation of how concepts relate to each other. Relationships should be typed (is-a, has-a, depends-on, triggers, constrains) and directional where appropriate.

- **Constraint specifications.** The invariants that must hold true in your domain. These are the rules that cannot be violated, the boundaries that cannot be crossed, the conditions that must always be satisfied. Express constraints precisely enough that they could be implemented as validation logic.

- **Contract definitions.** For each major boundary in your system (between agents, between modules, between your system and the outside world), define the contract: what inputs are expected, what outputs are guaranteed, what preconditions must be met, and what postconditions are ensured.

- **Ambiguity analysis.** Identify at least three cases where domain terminology is ambiguous, and document how your ontology resolves each ambiguity. This is one of the most important parts of the ontology because it demonstrates that you have thought about the hard cases, not just the obvious ones.

### Deliverable 3: Multi-Agent Architecture and Workflows

**Maps to:** Module 3 (Agent Architecture), Module 4 (Workflows, Tools, and Pipelines)

This is where your semantic model comes to life as a system of collaborating agents.

**Required contents:**

- **Agent inventory.** Each agent must have a name, a clearly defined role, a bounded responsibility, and explicit interfaces (what it receives, what it produces, what it can access). Agents should follow the single-responsibility principle: each agent does one thing well rather than many things adequately.

- **Orchestration topology.** Document the chosen topology (sequential pipeline, parallel fan-out, hierarchical delegation, event-driven, or hybrid) and justify why it fits your problem. The justification should address specific characteristics of your domain, not just recite textbook advantages.

- **Workflow specifications.** For each major use case, provide a step-by-step workflow showing how agents collaborate to produce the desired outcome. Include the happy path, at least one alternative path (when something unexpected happens), and at least one error path (when something fails).

- **Handoff protocols.** For each agent-to-agent boundary, specify the handoff protocol: what data is passed, what validation occurs at the boundary, what happens if validation fails, and how state is managed across the handoff.

- **Failure mode analysis.** Identify at least five realistic failure scenarios (agent timeout, unexpected input, external dependency failure, conflicting agent outputs, state corruption) and document the mitigation strategy for each. Include both detection mechanisms (how you know something failed) and recovery procedures (what happens next).

- **Tool and integration design.** If agents use external tools, APIs, or data sources, document the integration architecture: how tools are accessed, how results are validated, how failures are handled, and how tool dependencies affect system reliability.

### Deliverable 4: Context Packages

**Maps to:** Module 5 (Context Engineering and Structural Prompting)

This is where your semantic model and agent architecture become operational through carefully engineered information delivery.

**Required contents:**

- **Context architecture.** Document your overall context strategy: how context is organized into layers (base, domain, task), how layers compose for each agent, and how you manage the context window budget.

- **Complete context packages.** Provide the full context package for at least three agents in your system. Each package should show the actual structure that would be delivered to the agent, including system instructions, domain knowledge, constraints, examples, and output format specifications.

- **Layering strategy.** Explain how base context (shared across all agents), domain context (specific to the problem domain), and task context (specific to the current operation) are composed. Show how changes to one layer propagate appropriately without breaking other layers.

- **Consistency validation.** Demonstrate that your context packages are consistent with each other and with the ontology. If Agent A uses the term "verified customer" in its context, Agent B must use the same term with the same meaning. Provide evidence of cross-agent consistency checks.

- **Hardening results.** Show results from testing your context packages against at least three challenging scenarios: an ambiguous input, an adversarial input (attempting to make the agent behave outside its role), and a boundary condition (an input at the edge of the agent's defined scope).

### Deliverable 5: Evaluation Suite with Quality Evidence

**Maps to:** Module 6 (Evaluation, Quality, and Observability)

This is where you prove your system works, and more importantly, where you build the infrastructure to detect when it stops working.

**Required contents:**

- **Metric definitions.** Define each quality metric with precision: what it measures, how it is calculated, what the target range is, and why this metric matters for your specific domain. Avoid generic metrics without domain context.

- **Evaluation suite.** A structured collection of at least 20 test cases organized by type: happy-path tests, edge-case tests, adversarial tests, and regression benchmarks. Each test case must specify the input, the expected output criteria, and the pass/fail logic.

- **Baseline results.** Run your evaluation suite and present the results as a baseline. Include not just pass/fail counts but the quality distribution: how does the system perform across the range of test cases? Where is it strongest? Where is it weakest?

- **Regression detection strategy.** Document how you would detect quality degradation over time. What metrics would you monitor? What thresholds would trigger alerts? How would you distinguish between a genuine regression and normal variance?

- **Observability design.** Specify what data the system logs during operation, how that data is structured, and how it supports both debugging and quality monitoring. Include at least one dashboard design showing the key operational metrics you would track.

### Deliverable 6: Security, Governance and Ethics Plan

**Maps to:** Module 7 (Security, Governance, and Ethics)

This is where you demonstrate that your system is not just functional but responsible.

**Required contents:**

- **Threat model.** A systematic analysis of the threats specific to your system. For each threat, document the attack vector, the potential impact, the likelihood, and the mitigation strategy. Cover at least: prompt injection, data leakage, privilege escalation, denial of service, and any domain-specific threats.

- **Access control design.** Define who and what can access each component, data store, and operation in your system. Apply the principle of least privilege: every entity gets only the minimum access it needs to perform its function. Document the access control model (role-based, attribute-based, or hybrid) and justify your choice.

- **Governance framework.** Define the roles, processes, and accountability chains for operating your system. Who approves changes to the ontology? Who reviews agent behavior? Who responds to incidents? Who makes decisions about ethical edge cases? The governance framework should be practical enough that a real team could follow it.

- **Ethical analysis.** Analyze the ethical implications of your system across at least three dimensions: fairness and bias (does the system treat all users equitably?), transparency (can affected parties understand how decisions are made?), and accountability (who is responsible when the system causes harm?). For each dimension, propose concrete architectural mechanisms for mitigation, not just policy statements.

- **Audit trail design.** Specify what events are logged, what data is captured with each event, how logs are stored and protected, and how they support both operational debugging and compliance review.

### Deliverable 7: Operational Plan with Scaling Strategy

**Maps to:** Module 8 (Product, Operations and Scale)

This is where your architecture meets reality. A system that cannot be deployed, operated, and scaled is a thought experiment, not an architecture.

**Required contents:**

- **Deployment strategy.** How will the system be deployed? What infrastructure does it require? What is the rollout plan (big-bang, canary, blue-green, or phased)? What rollback procedures exist if deployment fails?

- **SLO definitions.** Define Service Level Objectives for your system with specific, measurable targets. For each SLO, define the measurement method, the target value, the error budget, and the consequences of budget exhaustion. SLOs should cover availability, latency, correctness, and any domain-specific quality dimensions.

- **Operational runbooks.** Provide detailed runbooks for at least three operational scenarios: a routine maintenance task, a common issue resolution, and a critical incident response. Each runbook should be step-by-step, specific enough that an on-call engineer unfamiliar with the system could follow it.

- **Cost analysis.** Estimate the operational cost of your system in its initial deployment and at two subsequent scale points. Identify the primary cost drivers (API calls, compute, storage, human review) and the levers available for cost optimization.

- **Scaling strategy.** Identify the architectural bottlenecks that would limit scale and document your strategy for addressing each one. The strategy should be phased: what changes at 10x scale? At 100x? What architectural decisions would need to be revisited?

- **Evolution roadmap.** A quarterly plan covering at least two quarters, showing how the system would evolve after initial deployment. Include planned feature additions, architectural improvements, and the feedback loops that would inform prioritization.

---

## Delivery format

Your capstone is delivered in four parts. Together, they demonstrate both depth and communication ability.

### 1. Technical document (10-20 pages)

This is the core deliverable. It contains all seven deliverables organized into a coherent narrative. The document should be rigorous enough for a technical reviewer and clear enough for a senior stakeholder.

Guidelines for the technical document:

- Use clear headings and consistent formatting.
- Include diagrams where they add clarity (architecture diagrams, workflow diagrams, ontology maps).
- Cite your design decisions. Do not just say what you decided; explain why, and what alternatives you considered.
- Aim for precision over length. A 12-page document that is clear and complete is better than a 20-page document padded with filler.

### 2. Artifact repository

A structured repository containing all the working artifacts referenced in the technical document. This is not a code repository (unless your capstone includes implementation). It is a collection of the actual artifacts your architecture produces and depends on.

The repository should include:

- Ontology definition files.
- Context packages (the actual prompt structures).
- Evaluation suite (test cases, expected outputs, baseline results).
- Runbooks and operational procedures.
- Any configuration files, schemas, or specifications referenced in the document.

Organize the repository with a clear folder structure and a top-level inventory file that explains what each artifact is and where to find it.

### 3. Executive presentation (15 minutes)

A concise presentation aimed at a non-technical senior audience. The goal is to communicate the value proposition, the architectural approach, and the operational readiness of your system in terms that a business leader would understand and find compelling.

The executive presentation should cover:

- What problem you are solving and why it matters.
- How the system works at a high level (avoid technical jargon).
- What evidence you have that it works (key metrics and results).
- What it will take to deploy and operate (resources, timeline, cost).
- What the expected business impact is (tied to your KPIs).

### 4. Technical defense (15 minutes)

A technical Q and A session with the assessment board. The board will ask probing questions about your design decisions, your tradeoffs, your evaluation methodology, and your operational plans. This is not a memorization test. It is a conversation between professionals.

The technical defense tests three things:

- **Depth of understanding.** Can you explain not just what you designed but why? Can you articulate the tradeoffs you made?
- **Intellectual honesty.** Can you acknowledge the limitations and risks of your architecture? Do you know what you do not know?
- **Adaptive thinking.** Can you reason about scenarios you did not anticipate? If the board poses a new requirement or a new failure mode, can you think through how your architecture would handle it?

---

## Evaluation criteria

Your capstone is evaluated against the six dimensions defined in the [Assessment Rubrics](./rubricas-de-avaliacao.md). Each deliverable contributes to one or more dimensions:

| Deliverable | Primary dimensions |
|---|---|
| Problem Definition and KPIs | Product, Operations and Scale |
| Domain Ontology | Semantic Modeling |
| Multi-Agent Architecture | System Architecture |
| Context Packages | Context Engineering |
| Evaluation Suite | Evaluation and Quality |
| Security and Ethics Plan | Security, Governance and Ethics |
| Operational Plan | Product, Operations and Scale |

The cross-cutting criteria (consistency, traceability, practical applicability) are evaluated across all deliverables simultaneously.

### Passing thresholds

| Result | Requirements |
|---|---|
| **Approved with distinction** | Composite score at or above 8.5, no dimension below 7.0 |
| **Approved** | Composite score at or above 7.0, no dimension below 5.5 |
| **Revision required** | Composite score below 7.0, or any dimension below 5.5 |

---

## Timeline suggestions

The capstone is designed to be completed in four to six weeks of focused work. Here is a suggested timeline, but adjust it to fit your schedule and working style.

### Week 1: Foundation

- Finalize your problem selection.
- Write the problem definition and stakeholder analysis.
- Begin the domain ontology with concept inventory and relationship mapping.
- Set up your artifact repository structure.

### Week 2: Semantic core

- Complete the domain ontology including constraints and contracts.
- Perform the ambiguity analysis.
- Begin the agent architecture design, ensuring agents align with ontology concepts.

### Week 3: System design

- Complete the multi-agent architecture and workflow specifications.
- Design context packages for all agents.
- Run initial consistency checks between ontology, agents, and context.

### Week 4: Quality and safety

- Build the evaluation suite and run baseline tests.
- Develop the threat model and security design.
- Write the governance framework and ethical analysis.
- Iterate on earlier deliverables based on what you discover during evaluation.

### Week 5: Operations and integration

- Write the operational plan including SLOs, runbooks, and cost analysis.
- Develop the scaling strategy and evolution roadmap.
- Perform a full consistency review across all deliverables.
- Begin drafting the technical document.

### Week 6: Polish and presentation

- Finalize the technical document.
- Organize and verify the artifact repository.
- Prepare the executive presentation.
- Practice the technical defense with a colleague or mentor.
- Self-assess against the rubrics and address any gaps.

### A note on iteration

The timeline above is linear for simplicity, but real work is iterative. You will discover issues with your ontology while designing agents. You will find gaps in your context packages while building evals. You will realize your security model needs revision when you write the operational plan. This is normal and healthy. Budget time for iteration, especially in weeks 4 and 5.

---

## Tips for success

These tips come from patterns observed across many capstone submissions, both successful and unsuccessful.

### Start with the ontology, not the agents

The most common structural mistake is designing agents first and then retrofitting an ontology to match. This inverts the entire SSA approach. Your ontology should drive your agent design, not the other way around. If you find yourself adjusting concept definitions to match how you already designed the agents, you have the dependency backwards.

### Consistency is more important than complexity

A simple system with perfect consistency across all deliverables will score higher than a complex system with inconsistent terminology, mismatched interfaces, or gaps between the ontology and the implementation. The assessment board is looking for architectural discipline, not architectural ambition.

### Show your reasoning, not just your decisions

For every significant design decision, document the alternatives you considered and why you chose what you chose. "We selected a hierarchical topology" is a fact. "We selected a hierarchical topology because our domain requires a central authority for compliance decisions, and the alternative of peer-to-peer coordination would create accountability gaps" is reasoning. The assessment board values reasoning over conclusions.

### Test your own work adversarially

Before submitting, try to break your own architecture. What happens if an agent receives input that violates the ontology? What if two agents produce contradictory outputs? What if a critical external dependency goes down? If you can break it, fix it. If you cannot break it, you have not tried hard enough.

### Do not neglect operations

Many candidates produce excellent technical architectures and then rush through the operational plan. The assessment board notices. A system without a credible operational plan is a system that cannot be deployed, and a system that cannot be deployed is not a product. Give the operational deliverables the same rigor you give the technical ones.

### Write for your reviewer, not for yourself

Your technical document will be read by someone who does not share your implicit context. Define your terms. Explain your assumptions. Reference your ontology explicitly when using domain terminology. If a reviewer has to guess what you mean, you have already lost clarity, and clarity is the foundation of semantic architecture.

---

## What passing means for the SSA career

Passing the SSA capstone and earning the certification means you have demonstrated, under rigorous professional evaluation, the ability to design complete semantic systems architectures. This is not a theoretical credential. It is evidence of applied competence.

Specifically, the SSA certification signals that you can:

- **Decompose complex domains** into precise, computable meaning structures that drive system behavior.
- **Design multi-agent systems** with clear responsibilities, robust coordination, and graceful failure handling.
- **Engineer context** that makes AI agents reliable, consistent, and aligned with domain constraints.
- **Build evaluation infrastructure** that provides evidence of quality and detects degradation before users do.
- **Integrate security, governance, and ethics** as architectural constraints rather than afterthoughts.
- **Plan for operations and scale** with the rigor that separates prototypes from products.

The SSA certification positions you at the intersection of AI engineering, systems architecture, and domain expertise. As organizations move from experimenting with AI to deploying it in production, they need architects who can design the meaning structures that make AI systems reliable, governable, and valuable.

Your capstone is not just an assessment artifact. It is the first entry in your professional portfolio as a Semantic Systems Architect. Build it with the care and rigor you would bring to any system you expect to operate in the real world.
