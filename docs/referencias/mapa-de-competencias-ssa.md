---
sidebar_position: 1
sidebar_label: "Competency Map"
---

# SSA Competency Map

## Purpose of this map

This document defines the competencies that a Semantic Systems Architect develops across the SSA Core Track. It serves three purposes: helping learners understand what skills they are building, helping organizations evaluate SSA readiness, and helping individuals plan their professional development.

Each competency is organized by the module where it is primarily developed. Cross-cutting competencies that span multiple modules are listed separately at the end.

---

## How to read each competency

Every competency entry follows this structure:

- **Name**: a short label for the competency.
- **Description**: what this competency is and why it matters.
- **Observable behaviors**: what someone who has this competency actually does in practice.
- **Evidence**: what artifacts or outputs demonstrate this competency.
- **Proficiency levels**: three stages of development (Awareness, Application, Mastery).

---

## Module 1 — SSA Fundamentals

### 1.1 Paradigm recognition

**Description.** The ability to identify and articulate the difference between syntax-centered software development and meaning-centered system architecture.

**Observable behaviors.** Explains why AI systems require a different design approach. Identifies when a problem is being treated as a coding problem when it is actually a meaning problem. Communicates the shift to non-technical stakeholders.

**Evidence.** A comparison table contrasting classical and semantic system design. A written explanation of the SSA role that a hiring manager could use.

**Proficiency levels.**
- *Awareness:* Can describe the shift from code to meaning in general terms.
- *Application:* Can identify specific examples in a real system where the shift applies.
- *Mastery:* Can teach the paradigm shift to others and use it to evaluate organizational readiness.

### 1.2 Problem reframing

**Description.** The ability to transform vague, ambiguous requests into structured semantic specifications with explicit intentions, constraints, and risks.

**Observable behaviors.** Asks clarifying questions before designing. Surfaces hidden assumptions. Produces structured problem statements that separate facts from interpretations.

**Evidence.** A kickoff document with stakeholders, constraints, architecture hypotheses, and semantic risks.

**Proficiency levels.**
- *Awareness:* Recognizes that vague problems need reframing before design begins.
- *Application:* Produces a structured specification from an ambiguous brief within a defined timeframe.
- *Mastery:* Reframes problems in real time during stakeholder conversations, guiding the group toward precision.

### 1.3 SSA role differentiation

**Description.** The ability to distinguish the SSA role from adjacent roles such as prompt engineer, AI developer, data scientist, and software architect.

**Observable behaviors.** Explains the unique value of the SSA role without diminishing other roles. Identifies which problems belong to the SSA and which belong to other team members.

**Evidence.** A role boundary map showing overlaps and distinctions with at least four adjacent roles.

**Proficiency levels.**
- *Awareness:* Can list the main differences between SSA and adjacent roles.
- *Application:* Can position the SSA role within a specific organizational structure.
- *Mastery:* Can design a team structure that integrates the SSA role with existing engineering and product functions.

### 1.4 Architecture canvas construction

**Description.** The ability to map all the components of SSA work into a single visual and conceptual overview.

**Observable behaviors.** Produces an architecture canvas that shows the relationships between ontology, agents, workflows, context, evaluation, security, and operations. Uses the canvas to communicate scope and progress.

**Evidence.** A completed SSA architecture canvas for a real or simulated project.

**Proficiency levels.**
- *Awareness:* Can identify the main components of an SSA architecture.
- *Application:* Can produce a canvas for a specific project and use it to plan work.
- *Mastery:* Can adapt the canvas format for different audiences and use it to drive architectural decisions.

---

## Module 2 — Semantic Modeling and Ontologies

### 2.1 Domain decomposition

**Description.** The ability to break any domain into entities, relationships, states, transitions, and invariants.

**Observable behaviors.** Interviews domain experts and extracts structured knowledge. Identifies entities that are implicit in how people talk about the domain. Maps lifecycle states and valid transitions.

**Evidence.** A versioned domain ontology with at least 12 entities, their relationships, lifecycle states, and examples.

**Proficiency levels.**
- *Awareness:* Can identify entities and relationships in a simple domain.
- *Application:* Can build a complete ontology for a moderately complex domain with lifecycle states and invariants.
- *Mastery:* Can decompose highly complex or ambiguous domains and resolve conflicts between domain expert perspectives.

### 2.2 Constraint engineering

**Description.** The ability to classify domain rules as hard constraints, soft constraints, or exceptions, and to specify enforcement behavior for each.

**Observable behaviors.** Distinguishes rules that must never be violated from rules that represent preferences. Defines what happens at constraint boundaries. Documents exception-handling procedures.

**Evidence.** A constraint matrix classifying every important rule with enforcement behavior and escalation paths.

**Proficiency levels.**
- *Awareness:* Can explain the difference between hard and soft constraints.
- *Application:* Can produce a constraint matrix for a real domain and test it against edge cases.
- *Mastery:* Can negotiate constraint classifications with stakeholders and design graduated enforcement strategies.

### 2.3 Semantic contract design

**Description.** The ability to create input/decision/output specifications that are usable by prompts, agents, tools, and evaluation suites.

**Observable behaviors.** Writes contracts that are precise enough for automated evaluation and clear enough for human review. Includes schemas, examples, and boundary conditions.

**Evidence.** A semantic contract package with specifications for key system components.

**Proficiency levels.**
- *Awareness:* Can describe what a semantic contract contains.
- *Application:* Can write contracts for multiple system components and verify them against test cases.
- *Mastery:* Can design contract versioning strategies and manage contract evolution across system releases.

### 2.4 Ambiguity detection and resolution

**Description.** The ability to identify expressions that different people interpret differently, and to resolve them with operational definitions.

**Observable behaviors.** Collects ambiguous expressions from stakeholders. Tests interpretation divergence. Produces operational definitions that reduce disagreement.

**Evidence.** An ambiguity stress test demonstrating measurable reduction in interpretation disagreement.

**Proficiency levels.**
- *Awareness:* Can recognize obvious ambiguities in domain language.
- *Application:* Can systematically surface and resolve ambiguities in a specific domain.
- *Mastery:* Can design ongoing ambiguity detection processes for evolving domains.

---

## Module 3 — Agent Architecture

### 3.1 Agent role design

**Description.** The ability to define agent roles with clear boundaries, responsibilities, and prohibited behaviors.

**Observable behaviors.** Creates role specifications that state what each agent does and what it must never do. Designs cognitive specializations that minimize overlap. Defines escalation criteria.

**Evidence.** An agent matrix defining 6 or more agents with roles, scopes, and boundaries.

**Proficiency levels.**
- *Awareness:* Can describe the concept of role-based agent design.
- *Application:* Can design a multi-agent team for a specific use case with clear role boundaries.
- *Mastery:* Can optimize agent role distributions for cost, latency, and quality across complex systems.

### 3.2 Topology selection

**Description.** The ability to choose between orchestration topologies (supervisor, pipeline, swarm, hybrid) based on system requirements.

**Observable behaviors.** Evaluates tradeoffs between topologies. Justifies choices with explicit criteria. Identifies when a topology needs to change as requirements evolve.

**Evidence.** A topology decision memo comparing three approaches and justifying the chosen one.

**Proficiency levels.**
- *Awareness:* Can describe the three main orchestration topologies and their tradeoffs.
- *Application:* Can select and justify a topology for a specific system with documented reasoning.
- *Mastery:* Can design hybrid topologies and plan topology migrations as systems evolve.

### 3.3 Handoff protocol specification

**Description.** The ability to define exactly what information passes between agents, what triggers transitions, and how failures are detected.

**Observable behaviors.** Writes handoff specifications with message schemas, confidence signals, and escalation criteria. Tests handoff behavior under normal and failure conditions.

**Evidence.** A handoff protocol specification with message schemas, confidence signals, and escalation criteria.

**Proficiency levels.**
- *Awareness:* Can explain why handoff protocols matter in multi-agent systems.
- *Application:* Can design handoff protocols for a specific multi-agent architecture.
- *Mastery:* Can design self-healing handoff mechanisms and cross-system handoff standards.

### 3.4 Failure mode anticipation

**Description.** The ability to identify what can go wrong in multi-agent systems and design recovery mechanisms before problems occur.

**Observable behaviors.** Conducts failure mode analysis. Documents detection strategies and recovery procedures for each identified failure. Runs failure drills.

**Evidence.** A failure drill report documenting 5 or more failure scenarios with detection and recovery strategies.

**Proficiency levels.**
- *Awareness:* Can list common failure modes in multi-agent systems.
- *Application:* Can conduct a failure mode analysis and design recovery mechanisms for a specific system.
- *Mastery:* Can design chaos engineering practices for AI systems and build organizational failure response capability.

---

## Module 4 — Workflows, Tools and Pipelines

### 4.1 End-to-end workflow design

**Description.** The ability to design complete workflows from trigger to audit, with clear stages, decision points, and verification steps.

**Observable behaviors.** Maps business processes into structured AI workflows. Identifies decision points that require verification. Includes audit checkpoints at critical stages.

**Evidence.** A workflow blueprint mapping a complete business process with decision points and verification gates.

**Proficiency levels.**
- *Awareness:* Can describe the stages of an AI workflow.
- *Application:* Can design a workflow for a specific process with appropriate verification gates.
- *Mastery:* Can design adaptive workflows that modify their own behavior based on runtime signals.

### 4.2 Tool integration specification

**Description.** The ability to specify how agents interact with external tools in a way that is reliable, safe, and auditable.

**Observable behaviors.** Writes tool contracts with argument schemas, permissions, and safety rules. Defines validation steps for tool inputs and outputs. Documents failure modes for each tool integration.

**Evidence.** A tool registry specifying every external tool with schemas, permissions, and safety rules.

**Proficiency levels.**
- *Awareness:* Can describe what a tool contract should contain.
- *Application:* Can specify tool integrations for a specific system with safety and validation rules.
- *Mastery:* Can design tool abstraction layers that allow tool replacement without system redesign.

### 4.3 Operational resilience design

**Description.** The ability to build retry, fallback, compensation, and graceful degradation strategies into AI workflows.

**Observable behaviors.** Defines failure policies for every critical step. Designs circuit breakers and timeout strategies. Plans compensation actions for partially completed operations.

**Evidence.** A failure policy matrix defining retry, fallback, and compensation strategies for every critical step.

**Proficiency levels.**
- *Awareness:* Can explain basic resilience patterns such as retry and fallback.
- *Application:* Can design a resilience strategy for a specific workflow with appropriate degradation behavior.
- *Mastery:* Can design system-wide resilience architectures with cascading failure prevention and automated recovery.

### 4.4 Traceability design

**Description.** The ability to design logging and event tracking that supports debugging, incident investigation, and compliance auditing.

**Observable behaviors.** Defines what events to capture at each workflow stage. Designs trace formats that support both automated analysis and human investigation. Plans log retention and access policies.

**Evidence.** A traceability package with execution logs, decision-level event tracking, and an incident replay guide.

**Proficiency levels.**
- *Awareness:* Can explain why traceability matters in AI systems.
- *Application:* Can design a traceability strategy for a specific system.
- *Mastery:* Can design organization-wide traceability standards that support cross-system incident investigation.

---

## Module 5 — Context Engineering and Structural Prompting

### 5.1 Context architecture

**Description.** The ability to design what an agent sees, knows, and is told to do, separating static rules from dynamic information from retrieved knowledge.

**Observable behaviors.** Decomposes monolithic prompts into modular, layered components. Identifies what information belongs in the system prompt versus what should be injected at runtime. Manages context window budgets.

**Evidence.** A context map decomposing a prompt into modular, layered components. A versioned context package.

**Proficiency levels.**
- *Awareness:* Can describe the different layers of an agent's context.
- *Application:* Can design a modular context architecture for a specific agent system.
- *Mastery:* Can design context architectures that adapt dynamically based on task type and available context budget.

### 5.2 Structural prompting

**Description.** The ability to organize instructions so that agent behavior is predictable, consistent, and controllable, using techniques like identity sections, policy blocks, output schemas, and refusal rules.

**Observable behaviors.** Writes prompts with clear hierarchical structure. Uses few-shot examples strategically. Enforces output schemas. Designs explicit refusal behaviors.

**Evidence.** A structural prompt template with identity, policy, task, schema, and refusal sections.

**Proficiency levels.**
- *Awareness:* Can describe the components of a well-structured prompt.
- *Application:* Can convert unstructured prompts into structured, layered instructions.
- *Mastery:* Can design prompt template systems that maintain consistency across dozens of agents.

### 5.3 Prompt consistency measurement

**Description.** The ability to systematically test whether a prompt produces consistent behavior across varied inputs and conditions.

**Observable behaviors.** Designs consistency test suites. Measures behavior variance across runs. Identifies and fixes sources of inconsistency.

**Evidence.** A consistency report measuring agent behavior before and after structural improvements.

**Proficiency levels.**
- *Awareness:* Can explain why prompt consistency is a concern.
- *Application:* Can measure consistency for a specific prompt and improve it through structural changes.
- *Mastery:* Can design automated consistency monitoring for production prompt systems.

### 5.4 Prompt hardening

**Description.** The ability to improve prompt performance across cost, latency, and quality dimensions through systematic optimization.

**Observable behaviors.** Identifies prompt components that waste tokens. Reduces latency without sacrificing quality. Documents before/after metrics. Manages prompt drift over time.

**Evidence.** A prompt hardening case study with before/after metrics on cost, latency, and quality.

**Proficiency levels.**
- *Awareness:* Can describe common prompt inefficiencies.
- *Application:* Can optimize a specific prompt with measurable improvements.
- *Mastery:* Can design prompt optimization pipelines that continuously improve production prompts.

---

## Module 6 — Evaluation, Quality and Observability

### 6.1 Quality metric design

**Description.** The ability to define metrics that connect business outcomes to measurable technical signals.

**Observable behaviors.** Maps business KPIs to quality indicators to technical signals. Defines thresholds and ownership for each metric. Distinguishes between objective metrics and semantic metrics.

**Evidence.** A metric contract mapping business KPIs to quality indicators to technical signals.

**Proficiency levels.**
- *Awareness:* Can list common quality metrics for AI systems.
- *Application:* Can design a metric framework for a specific system with clear thresholds.
- *Mastery:* Can design organization-wide quality measurement standards and metric evolution processes.

### 6.2 Evaluation suite construction

**Description.** The ability to build test suites with golden datasets, rubric-based scoring, and regression gates.

**Observable behaviors.** Creates test cases covering happy path, edge cases, and adversarial scenarios. Designs rubrics that enable consistent scoring. Implements regression gates that block deployments when quality drops.

**Evidence.** An evaluation suite of 50 or more test cases with rubric-based scoring.

**Proficiency levels.**
- *Awareness:* Can describe the components of an evaluation suite.
- *Application:* Can build a comprehensive eval suite for a specific system.
- *Mastery:* Can design eval infrastructure that scales across multiple systems and teams.

### 6.3 Observability implementation

**Description.** The ability to design monitoring that makes quality visible, degradation detectable, and improvement provable.

**Observable behaviors.** Designs trace architectures. Defines alert rules with appropriate thresholds. Creates incident runbooks. Establishes triage processes.

**Evidence.** An observability playbook with trace architecture, alert rules, incident runbook, and triage process.

**Proficiency levels.**
- *Awareness:* Can explain the difference between logging and observability.
- *Application:* Can implement an observability strategy for a specific system.
- *Mastery:* Can design observability platforms that serve multiple teams and systems.

### 6.4 Regression detection

**Description.** The ability to detect, diagnose, and mitigate quality degradation after system changes.

**Observable behaviors.** Identifies regression signals in monitoring data. Traces regressions to specific changes. Designs mitigation strategies. Documents lessons learned.

**Evidence.** A regression drill report demonstrating detection, diagnosis, and mitigation of quality degradation.

**Proficiency levels.**
- *Awareness:* Can explain what semantic regression is.
- *Application:* Can detect and diagnose a regression in a specific system.
- *Mastery:* Can design automated regression detection systems and organizational learning processes.

---

## Module 7 — Security, Governance and Ethics

### 7.1 Threat modeling

**Description.** The ability to identify and model threats specific to AI systems, including prompt injection, data poisoning, model manipulation, and social engineering.

**Observable behaviors.** Conducts structured threat analysis. Maps attack vectors to system components. Prioritizes threats by likelihood and impact. Designs mitigations.

**Evidence.** A threat model mapping attack vectors, risks, and mitigations for the system.

**Proficiency levels.**
- *Awareness:* Can list common AI-specific attack vectors.
- *Application:* Can produce a threat model for a specific system.
- *Mastery:* Can design threat modeling processes for organizations and adapt models as new attack types emerge.

### 7.2 Governance design

**Description.** The ability to design access controls, audit trails, approval workflows, and compliance frameworks for AI systems.

**Observable behaviors.** Defines who can do what within the system. Designs audit trails that satisfy compliance requirements. Creates approval workflows for high-risk actions.

**Evidence.** A governance model with access controls, audit requirements, and approval workflows.

**Proficiency levels.**
- *Awareness:* Can describe basic governance principles for AI systems.
- *Application:* Can design a governance framework for a specific system.
- *Mastery:* Can design organization-wide AI governance standards aligned with regulatory requirements.

### 7.3 Ethical reasoning in architecture

**Description.** The ability to apply ethical reasoning to architecture decisions, including bias detection, fairness measurement, transparency, and human oversight.

**Observable behaviors.** Identifies ethical risks in system design. Designs fairness metrics. Creates transparency mechanisms. Defines human override procedures.

**Evidence.** An ethical audit and decision framework with explicit values and accountability structures.

**Proficiency levels.**
- *Awareness:* Can identify common ethical concerns in AI systems.
- *Application:* Can conduct an ethical audit and design mitigation strategies.
- *Mastery:* Can design ethical frameworks that are enforceable through technical controls and organizational processes.

### 7.4 Security assessment

**Description.** The ability to conduct structured security assessments of AI systems using established methodologies.

**Observable behaviors.** Applies assessment frameworks systematically. Tests security controls. Documents findings with severity ratings and remediation recommendations.

**Evidence.** A security assessment report with findings, severity ratings, and remediation plan.

**Proficiency levels.**
- *Awareness:* Can describe the purpose and structure of a security assessment.
- *Application:* Can conduct a security assessment of a specific AI system.
- *Mastery:* Can design and lead security assessment programs across an organization.

---

## Module 8 — Product, Operations and Scale

### 8.1 Product strategy for AI

**Description.** The ability to translate SSA architecture into product strategy, aligning semantic design decisions with business goals, user needs, and market timing.

**Observable behaviors.** Creates product roadmaps tied to architecture capabilities. Defines value propositions grounded in system behavior. Plans iterative releases with measurable outcomes.

**Evidence.** A two-quarter product roadmap aligning architecture capabilities with business outcomes.

**Proficiency levels.**
- *Awareness:* Can explain how AI architecture decisions affect product strategy.
- *Application:* Can create a product roadmap for a specific AI system.
- *Mastery:* Can design product strategies that balance technical debt, market pressure, and architecture integrity.

### 8.2 Operational discipline

**Description.** The ability to define and maintain SLOs, ownership models, incident response protocols, and continuous improvement cycles.

**Observable behaviors.** Defines SLOs with clear measurement methods. Assigns ownership for every operational concern. Creates incident response procedures. Conducts post-mortems and implements improvements.

**Evidence.** An operational scorecard with SLOs, alert definitions, ownership assignments, and escalation paths.

**Proficiency levels.**
- *Awareness:* Can describe what SLOs are and why they matter for AI systems.
- *Application:* Can design an operational framework for a specific system.
- *Mastery:* Can build operational excellence cultures across engineering organizations.

### 8.3 Scale planning

**Description.** The ability to plan horizontal growth, multi-domain deployment, ontology evolution, and version management without losing semantic integrity.

**Observable behaviors.** Designs growth scenarios with cost projections. Plans ontology evolution strategies. Manages version transitions across system components.

**Evidence.** A scale playbook with growth scenarios, cost projections, and ontology evolution strategies.

**Proficiency levels.**
- *Awareness:* Can describe common scaling challenges in AI systems.
- *Application:* Can design a scaling strategy for a specific system.
- *Mastery:* Can design scaling architectures that preserve quality across multiple domains, teams, and markets.

### 8.4 Launch readiness

**Description.** The ability to prepare a complete go-to-market and launch plan for an AI system, integrating architecture, operations, security, and product concerns.

**Observable behaviors.** Creates launch checklists covering every system dimension. Coordinates across technical and business teams. Plans rollback procedures. Defines success criteria.

**Evidence.** A launch plan and operations plan ready for stakeholder review.

**Proficiency levels.**
- *Awareness:* Can list the components of an AI system launch plan.
- *Application:* Can create a launch plan for a specific system.
- *Mastery:* Can design repeatable launch processes for organizations that deploy multiple AI systems.

---

## Cross-cutting competencies

The following competencies are developed across multiple modules and are essential to effective SSA practice.

### Systems thinking

**Description.** The ability to see the AI system as a whole, understanding how changes in one component affect others. Developed throughout all modules but especially in Modules 3, 4, and 8.

**Observable behaviors.** Traces the impact of a design decision across ontology, agents, workflows, context, evaluation, and operations. Identifies feedback loops and emergent behaviors. Anticipates second-order effects.

### Stakeholder communication

**Description.** The ability to communicate architectural decisions, risks, and tradeoffs to both technical and non-technical audiences. Developed throughout all modules but especially in Modules 1, 7, and 8.

**Observable behaviors.** Adjusts technical depth based on audience. Uses analogies and examples to explain complex concepts. Produces documentation that different audiences can use.

### Ethical reasoning

**Description.** The ability to identify ethical dimensions in technical decisions and design systems that reflect explicit values. Developed throughout all modules but especially in Module 7.

**Observable behaviors.** Raises ethical concerns proactively during design. Designs systems with transparency and human oversight. Documents value tradeoffs and decision rationale.

### Continuous improvement

**Description.** The ability to learn from production experience and systematically improve the system over time. Developed throughout all modules but especially in Modules 6 and 8.

**Observable behaviors.** Conducts blameless post-mortems. Turns incidents into system improvements. Tracks improvement metrics over time. Maintains a learning backlog.

---

## Self-assessment guide

Use this competency map for personal development planning with the following process:

1. **Baseline assessment.** Rate yourself on each competency at your current proficiency level (Awareness, Application, or Mastery). Be honest -- awareness is a legitimate starting point.

2. **Target setting.** For each competency, identify your target proficiency level within a specific timeframe (for example, 90 days).

3. **Gap analysis.** Identify the largest gaps between your current and target levels. These are your priority development areas.

4. **Evidence collection.** As you progress through the curriculum, collect artifacts that demonstrate your competency development. Each module produces specific artifacts that serve as evidence.

5. **Periodic review.** Revisit this map every 4 weeks. Update your self-assessment based on new evidence. Adjust your targets as needed.

6. **Peer validation.** When possible, ask a peer or mentor to review your self-assessment. External perspectives help calibrate your evaluation.

This map is a living tool. As the SSA discipline evolves, new competencies will emerge and existing ones will deepen. The goal is not to reach Mastery in every competency immediately, but to build a deliberate, evidence-based development practice.
