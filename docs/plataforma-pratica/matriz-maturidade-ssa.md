---
sidebar_position: 5
title: Maturity Matrix
---

# SSA Maturity Matrix

## What the matrix measures

Imagine you are learning to drive. On day one, you grip the steering wheel with white knuckles, stare straight ahead, and forget to check your mirrors. After a few months, you can handle traffic, parallel park, and drive in rain. After years, you merge onto highways without thinking, anticipate other drivers' mistakes, and adjust your driving style for road conditions automatically. You went from conscious incompetence to unconscious competence.

The SSA Maturity Matrix maps this same progression, but for the practice of designing semantic architectures. It tells you where you are, what "better" looks like, and what specific capabilities you need to develop to reach the next level. It works for individuals assessing their own growth, teams evaluating their collective capability, and organizations benchmarking their AI system design practices.

The matrix measures six dimensions of SSA practice across five levels of maturity. Each cell describes what practice actually looks like at that level, not in abstract terms but in concrete, observable behaviors and artifacts.

---

## The six dimensions

### 1. Semantic modeling

This dimension covers how well you decompose domains into structured meaning: entities, relationships, categories, terminology, and semantic contracts. It is the foundation of all SSA work because every other dimension depends on how clearly and accurately the domain is modeled.

### 2. Agent architecture

This dimension covers how well you design agent roles, coordination patterns, delegation protocols, and tool integration. It measures your ability to decompose complex behavior across multiple specialized agents that work together coherently.

### 3. Context engineering

This dimension covers how well you package information for AI consumption: what goes into each context window, how relevance is determined, how context is structured, and how information flows between system components. Good context engineering is the difference between an AI that understands the situation and one that guesses.

### 4. Evaluation and observability

This dimension covers how well you measure, test, and monitor system behavior. It includes eval suite design, metric definition, scoring methodology, dashboards, alerts, and the ability to answer the question "is this system working correctly right now?"

### 5. Security and governance

This dimension covers how well you protect systems from misuse, enforce boundaries, maintain audit trails, handle compliance requirements, and ensure ethical operation. It includes threat modeling, access control, policy enforcement, and incident response.

### 6. Operations and scale

This dimension covers how well you deploy, maintain, and evolve semantic architectures in production. It includes deployment strategies, monitoring workflows, incident management, update processes, and the ability to scale systems without losing semantic coherence.

---

## The five maturity levels

### Level 1: Initial (Ad-hoc)

At this level, work happens without consistent structure. Decisions are made case by case, based on intuition or whatever seems to work at the moment. There are no repeatable processes, no shared standards, and no systematic way to evaluate quality. Think of a home cook who improvises every meal without recipes, measurements, or planning. Sometimes the food is great. Sometimes it is terrible. There is no way to predict which it will be.

### Level 2: Developing

At this level, basic practices are emerging. There is awareness of what good work looks like, and some processes are beginning to take shape. Work is no longer purely ad-hoc, but it is not yet standardized. Think of a cook who has started following recipes and measuring ingredients, but still skips steps, substitutes freely, and does not understand why the recipe works.

### Level 3: Defined

At this level, standardized processes are in place and followed consistently. There are documented approaches, shared templates, and agreed-upon practices. Quality is predictable because the process is repeatable. Think of a trained chef who follows established techniques, understands food science, and produces consistently good results using known methods.

### Level 4: Managed

At this level, work is not only standardized but measured. Metrics drive decisions. Performance is tracked over time. Processes are tuned based on data rather than intuition. Think of a restaurant kitchen that tracks food cost percentages, customer satisfaction scores, ticket times, and waste metrics, then adjusts operations based on what the numbers reveal.

### Level 5: Optimized

At this level, continuous improvement is systematic. The organization actively seeks new approaches, runs experiments, shares innovations, and pushes the boundaries of what is possible. Best practices evolve rapidly because the system for improving them is itself well-designed. Think of a culinary research lab that tests new techniques, publishes findings, trains other kitchens, and systematically advances the state of the art.

---

## Reading the matrix

Each cell in the matrix contains four elements:

- **Description** -- What practice looks like at this level for this dimension. Written in concrete, observable terms so you can recognize it in your own work.
- **Typical artifacts** -- What tangible outputs (documents, dashboards, tools, processes) you would expect to find at this level. If the artifacts exist, you have evidence. If they do not, the level claim is unsupported.
- **Transition criteria** -- What you specifically need to do or build to move from this level to the next. These are not vague aspirations; they are concrete actions that produce the artifacts of the next level.

Think of the matrix like a map of a mountain range with six peaks. Your position on each peak is independent. You might be high on one and low on another. The map does not judge where you are; it shows you where you could go and what the path looks like.

---

## The full matrix

### Dimension 1: Semantic modeling

**Level 1 -- Initial.** Domain terms are used inconsistently. There are no formal ontologies. Different team members use different words for the same concept. The domain model, if it exists at all, lives in someone's head. Typical artifacts: none, or ad-hoc glossaries that nobody maintains. To advance: create your first written domain glossary and use it consistently in one project.

**Level 2 -- Developing.** Basic domain glossaries exist. Entity-relationship models are sketched for major projects. Terms are defined but definitions are sometimes vague or inconsistent. Typical artifacts: informal glossaries, simple ER diagrams, early ontology drafts. To advance: develop formal semantic contracts with explicit invariants and use them to govern system behavior.

**Level 3 -- Defined.** Standardized ontology templates are used across projects. Semantic contracts are explicit and enforced. Term definitions include boundary conditions and disambiguation rules. Typical artifacts: formal ontologies in standard formats, semantic contract documents, domain-specific terminology guides. To advance: implement systematic testing of semantic models against real-world edge cases and measure ontology coverage.

**Level 4 -- Managed.** Ontology quality is measured through coverage metrics, ambiguity scores, and eval results. Semantic models are versioned and changes are tracked with impact analysis. Typical artifacts: versioned ontologies with changelogs, coverage reports, ambiguity analysis dashboards. To advance: implement cross-domain ontology reuse and systematic ontology evolution based on production feedback.

**Level 5 -- Optimized.** Ontology design continuously improves through production feedback loops. Cross-domain patterns are identified and shared. Novel modeling approaches are tested and published. The organization contributes to community standards. Typical artifacts: ontology pattern libraries, published research, community contributions, automated ontology quality tools.

### Dimension 2: Agent architecture

**Level 1 -- Initial.** A single monolithic prompt does everything. There is no concept of specialized agents, role separation, or coordination protocols. The system is one large instruction set. Typical artifacts: a single system prompt, maybe with some conditional sections. To advance: decompose one monolithic prompt into two or more specialized agents with defined roles.

**Level 2 -- Developing.** Multiple agents exist with basic role separation. Coordination is manual or hardcoded. Error handling between agents is minimal. Delegation happens but without clear protocols. Typical artifacts: multiple prompts with basic hand-off logic, simple routing rules. To advance: define explicit coordination protocols and delegation contracts between agents.

**Level 3 -- Defined.** Agent topologies follow documented patterns. Coordination protocols are explicit. Delegation rules are defined with fallback behaviors. Error handling is designed, not improvised. Typical artifacts: agent topology diagrams, coordination protocol documents, delegation contracts, error-handling specifications. To advance: measure coordination efficiency and agent utilization; optimize topologies based on data.

**Level 4 -- Managed.** Agent performance is individually measured. Coordination overhead is tracked. Bottlenecks are identified through monitoring data. Topology changes are validated through evals before deployment. Typical artifacts: agent performance dashboards, coordination metrics, A/B test results for topology changes. To advance: implement dynamic agent topologies that adapt based on workload patterns and performance data.

**Level 5 -- Optimized.** Agent architectures evolve through systematic experimentation. New coordination patterns are tested, validated, and shared. The organization develops novel topologies and contributes to community knowledge. Typical artifacts: published architectural patterns, experimental results, community contributions, self-tuning coordination systems.

### Dimension 3: Context engineering

**Level 1 -- Initial.** Everything is dumped into the prompt at once. There is no strategy for what information to include, when to include it, or how to structure it. Context windows overflow or contain irrelevant information. Typical artifacts: unstructured prompts with raw data pasted in. To advance: organize context into named sections and deliberately decide what to include and exclude.

**Level 2 -- Developing.** Context is organized into sections. Some thought goes into what to include. Basic retrieval may be used to pull relevant information. But context packages are not standardized, and there is no systematic approach to relevance. Typical artifacts: sectioned prompts, basic retrieval configurations. To advance: create reusable context package templates with explicit inclusion and exclusion criteria.

**Level 3 -- Defined.** Context packages follow standardized templates. Inclusion criteria are explicit. Information is structured for optimal AI processing. Context is tested to verify that the AI interprets it correctly. Typical artifacts: context package templates, inclusion/exclusion criteria documents, context validation test results. To advance: measure context effectiveness and optimize packages based on eval data.

**Level 4 -- Managed.** Context quality is measured through downstream eval performance. Context packages are optimized based on data showing which information improves and which degrades system behavior. Token usage is tracked and optimized. Typical artifacts: context effectiveness dashboards, token usage reports, context optimization experiments. To advance: implement adaptive context that adjusts based on real-time signals and learned relevance patterns.

**Level 5 -- Optimized.** Context engineering is a continuous optimization process. Novel packaging strategies are tested experimentally. Cross-domain context patterns are identified and shared. The organization pushes the boundaries of how effectively information can be delivered to AI systems. Typical artifacts: published context engineering research, adaptive context systems, community-shared patterns.

### Dimension 4: Evaluation and observability

**Level 1 -- Initial.** Testing is manual and informal. "It seems to work" is the primary quality assessment. There are no eval suites, no metrics, and no systematic way to detect regressions. Typical artifacts: none, or informal notes about test results. To advance: create your first structured eval with at least five cases and a simple rubric.

**Level 2 -- Developing.** Basic eval suites exist. Some metrics are defined. Testing is somewhat systematic but not comprehensive. Regressions are sometimes caught but not consistently. Typical artifacts: simple eval scripts, basic metric definitions, manual test checklists. To advance: standardize eval methodology, define coverage requirements, and implement automated eval pipelines.

**Level 3 -- Defined.** Eval suites are standardized and comprehensive. Coverage requirements are defined. Scoring rubrics are documented and calibrated. Results are tracked over time. Typical artifacts: comprehensive eval suites, calibrated rubrics, historical score records, coverage reports. To advance: build real-time observability systems and implement statistical process control on eval metrics.

**Level 4 -- Managed.** Eval results drive development decisions. Real-time monitoring detects anomalies. Statistical trends are tracked and acted upon. Quality gates prevent deployment of underperforming changes. Typical artifacts: real-time dashboards, anomaly detection systems, trend analyses, automated quality gates. To advance: implement continuous evaluation in production and develop predictive quality models.

**Level 5 -- Optimized.** Evaluation methodology itself is continuously improved. Novel metrics and assessment approaches are developed. The organization contributes eval innovations to the community. Production systems self-monitor and flag emerging issues before they become failures. Typical artifacts: published eval research, predictive quality models, self-monitoring systems, community-contributed eval frameworks.

### Dimension 5: Security and governance

**Level 1 -- Initial.** Security is an afterthought. No threat model exists. Guardrails, if present, are ad-hoc. No audit trail. No compliance verification. The system is trusted to behave correctly because nobody has tested whether it misbehaves. Typical artifacts: none. To advance: create a basic threat model and implement one safety guardrail with testing.

**Level 2 -- Developing.** Basic guardrails are in place. A simple threat model identifies obvious risks. Some constraints are enforced. Access controls exist but may have gaps. Typical artifacts: basic threat list, simple guardrail rules, initial access control definitions. To advance: develop a comprehensive threat model, implement systematic guardrail testing, and establish audit logging.

**Level 3 -- Defined.** Comprehensive threat models are maintained. Guardrails are systematically tested. Audit trails capture all significant decisions. Compliance requirements are documented and verified. Incident response procedures exist. Typical artifacts: formal threat models, guardrail test suites, audit logs, compliance checklists, incident response playbooks. To advance: measure security effectiveness through red-team exercises and implement automated compliance monitoring.

**Level 4 -- Managed.** Security posture is continuously measured. Red-team exercises are conducted regularly. Compliance monitoring is automated. Incident response is practiced and timed. Security metrics drive investment decisions. Typical artifacts: red-team reports, automated compliance dashboards, incident response metrics, security investment analyses. To advance: implement predictive threat detection and contribute to community security standards.

**Level 5 -- Optimized.** Security and governance practices evolve proactively. Novel threats are anticipated through research. The organization contributes to community security knowledge. Governance frameworks are refined based on production experience and shared publicly. Typical artifacts: published threat research, novel governance frameworks, community security contributions, predictive threat detection systems.

### Dimension 6: Operations and scale

**Level 1 -- Initial.** Deployment is manual and inconsistent. There is no monitoring. Incidents are discovered when users complain. Updates are applied directly to production without testing. Typical artifacts: none, or informal deployment notes. To advance: implement a basic deployment checklist and set up one monitoring alert.

**Level 2 -- Developing.** Basic deployment processes exist. Some monitoring is in place. Incidents are detected but response is ad-hoc. Updates follow a loose process. Typical artifacts: deployment checklists, basic monitoring dashboards, informal incident logs. To advance: standardize deployment pipelines, implement comprehensive monitoring, and document incident response procedures.

**Level 3 -- Defined.** Deployment pipelines are standardized. Monitoring covers key metrics. Incident response procedures are documented and practiced. Update processes include testing stages. Typical artifacts: CI/CD pipelines, monitoring dashboards, incident response playbooks, staged deployment procedures. To advance: implement data-driven operational optimization and measure deployment reliability.

**Level 4 -- Managed.** Operational metrics drive decisions. Deployment reliability is measured and optimized. Incident response times are tracked. Capacity planning is data-driven. Operational costs are monitored and optimized. Typical artifacts: operational dashboards, reliability metrics, incident response time reports, capacity models, cost optimization reports. To advance: implement self-healing systems and contribute operational patterns to the community.

**Level 5 -- Optimized.** Operations are continuously improved through systematic experimentation. Novel operational patterns are developed and shared. Systems self-heal from common failures. Scaling is automatic and semantically aware. The organization contributes operational knowledge to the community. Typical artifacts: self-healing system designs, published operational research, community-contributed operational patterns, auto-scaling configurations.

---

## Assessment methodology

### Self-assessment

The simplest and fastest approach. An individual or team reads the level descriptions for each dimension and honestly selects the level that best matches their current practice. Self-assessment is useful for quick diagnostics and personal development planning, but it tends toward optimism. Most people rate themselves one level higher than they actually are.

To improve self-assessment accuracy:

- For each level you select, identify the specific artifacts that prove you are at that level. If you cannot point to concrete evidence, you are probably at the level below.
- Ask yourself whether you are at the level consistently or only in your best moments. Maturity is about consistent practice, not peak performance.
- Have a colleague review your self-assessment and challenge it constructively.

### Peer assessment

Two or more practitioners independently assess the same individual or team, then compare their assessments. Discrepancies reveal blind spots and biases. The discussion about why assessors disagree is often more valuable than the final score.

Peer assessment protocol:

1. Each assessor independently scores all six dimensions.
2. For each score, the assessor cites specific evidence (artifacts, observed behaviors, documented decisions).
3. Assessors meet to compare scores and discuss discrepancies.
4. For any dimension where scores differ by more than one level, the assessors must reach consensus through discussion.
5. The final assessment includes both the agreed score and a summary of the discussion.

### Evidence-based scoring

The most rigorous approach. The assessment is based entirely on documented evidence: artifacts produced, evals completed, processes documented, metrics collected, incidents handled. Each level in each dimension lists typical artifacts; the evidence-based approach requires that those artifacts exist and can be presented.

This approach is best suited for organizational assessments where objectivity and accountability matter. It takes longer (typically 2 to 3 days for a full assessment) but produces results that are defensible and trackable over time.

---

## Using the matrix

### Individual development

Map yourself on the matrix. Identify your strongest and weakest dimensions. Choose one weak dimension to focus on for the next quarter. Read the description of the next level up and identify the specific capabilities and artifacts you need to develop. Use cases from the Case Bank that exercise that dimension. Track your progress by repeating the assessment quarterly.

A common pattern: practitioners start strong in one or two dimensions (often semantic modeling and context engineering) and weak in others (often security/governance and operations). The matrix makes these imbalances visible so you can address them intentionally rather than accidentally.

### Team assessment

Each team member completes a self-assessment. The team then meets to discuss and calibrate, arriving at a consensus team score for each dimension. This exercise often reveals that team members have different perceptions of the team's capabilities, which itself is a valuable discovery.

The team-level matrix becomes a development roadmap: which dimensions need investment? Which team members can mentor others in their areas of strength? Where does the team need external help?

### Organizational benchmarking

Multiple teams within an organization each complete the assessment. Results are aggregated to show organizational patterns: are all teams weak in the same dimension? Are some teams significantly ahead of others? Where should organizational investment (training, tooling, process improvement) be focused?

Organizations can also benchmark against the community by comparing their scores with published community averages (anonymized and aggregated from community self-assessments).

### Quarterly cadence

Whatever your assessment context (individual, team, or organization), the recommended cadence is quarterly. More frequent assessments create noise because maturity changes slowly. Less frequent assessments lose the feedback loop that drives improvement.

A quarterly assessment cycle looks like this:

1. **Week 1:** Conduct the assessment using your chosen methodology.
2. **Week 2:** Compare with the previous quarter. Identify where movement happened and where it did not.
3. **Week 3:** Choose one dimension to focus on for the upcoming quarter. Define specific goals tied to the next level's artifacts and transition criteria.
4. **Weeks 4 through 12:** Execute the development plan. Use cases from the Case Bank, run evals, study Reference Capstones, and build the artifacts your target level requires.
5. **Week 13:** Reassess. The cycle begins again.

This cadence turns the matrix from a one-time diagnostic into a continuous improvement engine.

---

## Common maturity patterns

Through community assessments, certain patterns appear frequently:

**The ontology-heavy profile.** Practitioners who come from knowledge management or information architecture backgrounds often score high on semantic modeling but low on agent architecture and operations. Their domain models are excellent, but they struggle to turn those models into working systems.

**The builder profile.** Practitioners who come from software engineering backgrounds often score high on agent architecture and operations but low on semantic modeling and security/governance. They build systems that work but lack the semantic rigor that makes those systems reliable and maintainable.

**The academic profile.** Practitioners who come from research backgrounds often score high on evaluation/observability and semantic modeling but low on operations and security/governance. They can assess systems brilliantly but have limited experience running them in production.

**The compliance-first profile.** Practitioners from regulated industries often score high on security/governance but lower on other dimensions. They know how to control systems but may lack the creative architectural thinking needed to design them well in the first place.

None of these profiles is wrong. Each represents a legitimate starting point. The matrix makes the profile visible so you can deliberately round out your capabilities rather than unconsciously staying in your comfort zone.

---

## Assessment template

Record your assessment results using the standardized template at `community-assets/evals/template-maturity-assessment.md`. The template includes:

- A scoring form for all six dimensions
- Space for evidence citations at each level
- A summary section for strengths, gaps, and priority actions
- Historical tracking to compare assessments over time

---

## Key principles

The matrix is a **diagnostic tool, not a judgment**. Being at Level 2 in some dimension is not a failure; it is an honest starting point for growth. The matrix only helps you if you use it honestly.

The matrix measures **consistent practice, not peak capability**. You are at the level you operate at most of the time, not the level you reach on your best day.

The matrix is **dimensional, not linear**. A team at Level 4 in semantic modeling and Level 2 in operations is not "Level 3 overall." They are exactly what the matrix says: strong modelers who need operational maturity. Averaging the scores would hide the very information the matrix is designed to reveal.

**Higher is not always necessary.** Not every individual, team, or organization needs to be at Level 5 in every dimension. The right maturity level depends on the context: the domain, the risk level, the scale, and the organizational strategy. A small team prototyping a low-risk internal tool does not need Level 5 operations. A team building safety-critical healthcare systems does.
