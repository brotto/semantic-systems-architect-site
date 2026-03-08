---
sidebar_position: 7
sidebar_label: "Assessment"
---

# Module 8 — Assessment

## What you should have produced

By completing this module, you should have the following artifacts:

| # | Artifact | Source |
|---|---|---|
| 1 | Feature prioritization matrix with 8-10 features rated across 6 AI-specific dimensions | Lesson 1 practice activity |
| 2 | Two-quarter product roadmap with objectives, capabilities, assumptions, and success criteria | Lesson 1 practice activity |
| 3 | Stakeholder communication plan for 3 stakeholder groups | Lesson 1 practice activity |
| 4 | SLO table with 8+ SLOs (traditional and AI-specific) | Lesson 2 practice activity |
| 5 | One complete runbook for an AI-specific operational scenario | Lesson 2 practice activity |
| 6 | Incident severity classification covering both infrastructure and semantic failures | Lesson 2 practice activity |
| 7 | Operational scorecard with metrics, targets, and measurement methods | Lesson 2 practice activity |
| 8 | Model-tier strategy with routing criteria and cost expectations | Lesson 3 practice activity |
| 9 | Domain expansion plan with ontology adaptation and governance review | Lesson 3 practice activity |
| 10 | Ontology evolution scenario with migration plan | Lesson 3 practice activity |
| 11 | Technical debt audit with 5 items classified by risk | Lesson 3 practice activity |
| 12 | Scale playbook summary with growth scenario and bottleneck analysis | Lesson 3 practice activity |
| 13 | Complete launch plan (8 sections) | Application A |
| 14 | Complete operations plan (6 sections) | Application B |

---

## Assessment rubric

Each dimension is scored **0, 1, or 2**. Total possible: **10 points**. Passing threshold: **8/10**.

### Dimension 1: Product alignment (0-2)

Does your work demonstrate the ability to translate technical architecture into product strategy that creates real value for real users?

| Score | Description |
|---|---|
| **0** | Product thinking is absent. Features are defined in technical terms without reference to users. The roadmap reads like a development backlog, not a product plan. No clear connection between architecture decisions and business outcomes. |
| **1** | Basic product awareness. Users are identified and features are connected to user needs, but the connection is shallow. The roadmap has objectives but they are vague ("improve accuracy") rather than specific ("increase classification accuracy from 87% to 93% for the top 5 categories"). Stakeholder communication exists but is generic. |
| **2** | Strong product thinking throughout. Users are deeply understood — not just their roles, but their daily reality and how the system changes it. Features are prioritized using AI-specific dimensions (reliability, failure impact, feedback observability, governance burden). The roadmap has specific, measurable objectives with honest assumptions. Stakeholder communication is tailored to each audience. The north-star metric captures value, quality, and safety. |

### Dimension 2: Operational readiness (0-2)

Is the system ready for day-two operations? Could a team use your artifacts to keep the system running reliably?

| Score | Description |
|---|---|
| **0** | Operations are an afterthought. SLOs are missing or vague ("high availability"). No incident classification. No runbooks. No on-call structure. The plan assumes everything will work and has no provisions for when it doesn't. |
| **1** | Basic operational structure. SLOs exist but are limited to infrastructure metrics (availability, latency) without semantic SLOs (accuracy, hallucination rate, drift). Incident classification exists but does not distinguish between infrastructure and semantic failures. Runbooks exist but are too generic to be useful at 3 AM. |
| **2** | Comprehensive operational readiness. SLOs cover infrastructure, semantic quality, and business metrics, with specific targets and error budgets. Incident classification handles both traditional failures and AI-specific semantic failures with clear severity criteria and examples. Runbooks are specific enough for an unfamiliar on-call engineer to follow. Post-mortem process is blameless and focused on systemic improvement. The operational scorecard provides at-a-glance system health. |

### Dimension 3: Cost discipline (0-2)

Do you demonstrate understanding of AI system economics and the ability to manage costs at scale?

| Score | Description |
|---|---|
| **0** | Cost is not addressed, or is addressed only as "API costs." No model-tier strategy. No cost per completed outcome calculation. No cost projections for growth. |
| **1** | Basic cost awareness. Model-tier strategy exists but is simplistic. Cost per outcome is mentioned but not fully calculated (missing human review costs, error correction costs). Cost projections exist but only for AI processing, not for human review, infrastructure, or operational overhead. |
| **2** | Rigorous cost discipline. Model-tier strategy routes requests intelligently based on complexity, risk, and cost. Cost per completed outcome includes all factors: AI processing, human review, retries, error correction, and operational overhead. Cost projections cover all categories at multiple growth stages. There is a clear relationship between cost investment and quality/safety outcomes. The cost model informs product decisions (which features to prioritize, which to defer). |

### Dimension 4: Scalability realism (0-2)

Is the scaling strategy grounded in reality? Does it identify genuine constraints and propose specific solutions?

| Score | Description |
|---|---|
| **0** | Scaling is not addressed, or is addressed with hand-waving ("we will add more servers"). No bottleneck analysis. No domain expansion methodology. No ontology evolution plan. |
| **1** | Basic scaling awareness. Growth projections exist but are not supported by bottleneck analysis. Domain expansion is mentioned but lacks the systematic approach (ontology adaptation, contract revision, evaluation data, governance review). Ontology evolution is acknowledged but no migration methodology is described. Technical debt is not tracked. |
| **2** | Realistic and comprehensive scaling strategy. Growth projections are specific and grounded. Bottleneck analysis identifies real constraints across infrastructure, governance, and human capacity — not just server limits. Domain expansion follows a systematic checklist. Ontology evolution has a clear methodology: versioning, migration plans, validation, rollback, and stakeholder communication. Technical debt is tracked, classified, and budgeted for. The scale playbook prepares the team for growth instead of reacting to it. |

### Dimension 5: Governance continuity (0-2)

Do the governance and compliance controls from Module 7 carry through into operations and scale, or do they get lost in the transition?

| Score | Description |
|---|---|
| **0** | Governance is absent from the operational and scaling plans. The security controls, ethical constraints, and compliance requirements from Module 7 are not reflected in the production operations. It is as if governance was a design exercise that ended when implementation began. |
| **1** | Governance is present but superficial. A compliance checklist exists but is not connected to specific operational practices. Audits are mentioned but schedules and scopes are vague. Guardrail monitoring is referenced but not integrated into the SLO framework. Scaling to new domains does not include governance impact assessment. |
| **2** | Governance is woven into every operational and scaling decision. SLOs include safety metrics with zero-tolerance thresholds. Incident classification explicitly addresses semantic safety failures. The audit schedule covers accuracy, safety, bias, and compliance with specific frequencies and responsibilities. Domain expansion includes a mandatory governance review. The escalation matrix includes governance and legal paths for sensitive incidents. The evolution roadmap anticipates new governance requirements as the system grows. Governance is not a checkpoint — it is a continuous practice. |

---

## Self-assessment checklist

Before submitting, verify:

### Lessons

- [ ] I can explain why an AI product is different from a traditional software product, using at least 3 specific differences
- [ ] I can prioritize features using AI-specific dimensions: reliability, failure impact, feedback observability, and governance burden
- [ ] I can design a product roadmap using the three-horizon framework with explicit assumptions and learning goals
- [ ] I can define SLOs for both traditional metrics (availability, latency) and AI-specific metrics (accuracy, hallucination rate, drift)
- [ ] I can write a runbook that an unfamiliar engineer could follow at 3 AM during an incident
- [ ] I can conduct a blameless post-mortem that finds root causes, not scapegoats
- [ ] I can design a model-tier routing strategy that balances cost, quality, and risk
- [ ] I can plan ontology evolution with versioning, migration, validation, and rollback
- [ ] I can identify and classify semantic technical debt, and budget for paying it down

### Application A — Launch plan

- [ ] My launch summary is clear enough for anyone to understand what is being launched, for whom, and when
- [ ] My feature scope distinguishes between launch features and deferred features with specific rationale for each
- [ ] My launch timeline has specific milestones with owners and dependencies
- [ ] My risk register covers technical, semantic, user adoption, and organizational risks
- [ ] My success criteria are specific and measurable, with a clear decision framework for success/adjustment/failure
- [ ] My go/no-go checklist covers technical, operational, governance, user, and business readiness

### Application B — Operations plan

- [ ] My SLO framework has at least 10 SLOs covering infrastructure, semantic quality, and business metrics
- [ ] My ownership model has clear primary and backup owners for every system component
- [ ] My incident classification handles both infrastructure failures and semantic failures with specific examples
- [ ] I have at least 2 complete, detailed runbooks
- [ ] My scaling strategy includes growth projections, bottleneck analysis, and cost projections with all cost categories
- [ ] My evolution roadmap addresses ontology changes, capability expansion, technical debt, and version management
- [ ] My governance operations include specific audit schedules with frequencies, scopes, and responsible parties

---

## What passing means — and what it means for the full course

### Module 8 passing

Scoring **8/10 or higher** in this module means you have demonstrated the ability to:

- Think about AI systems as products that serve users, not just technical artifacts
- Build operational foundations that keep systems reliable in production
- Plan for growth with realistic constraints and genuine cost discipline
- Maintain governance integrity as the system evolves and scales

### Full SSA core track completion

Module 8 is the final module. Passing it — with passing grades in all eight modules — means you have completed the SSA core track.

Here is what you have accomplished across all eight modules:

**Module 1 — SSA Fundamentals:** You understood the paradigm shift from code-centered to meaning-centered system design. You learned to see the semantic architecture hidden in every system.

**Module 2 — Semantic Modeling and Ontologies:** You learned to decompose domains into structured ontologies, engineer constraints, and package semantic contracts that AI systems can interpret.

**Module 3 — Agent Architecture:** You designed multi-agent systems with clear roles, orchestration topologies, and safety protocols.

**Module 4 — Workflows, Tools and Pipelines:** You built operational workflows that integrate AI agents with tools, data sources, and human processes, with resilience and traceability.

**Module 5 — Context Engineering and Structural Prompting:** You engineered the context packages that shape AI behavior, designed contractual prompts, and validated consistency across system boundaries.

**Module 6 — Evaluation and Continuous Quality:** You built evaluation frameworks that measure semantic quality, detect regression, and drive continuous improvement.

**Module 7 — Security, Governance and Ethics:** You identified AI-specific threats, designed governance controls, and built incident response capabilities that protect users and organizations.

**Module 8 — Product, Operations and Scale:** You translated all of this into a product that delivers value, an operation that stays reliable, and a system that grows without breaking.

Together, these eight modules form a complete professional practice: the ability to design, build, evaluate, govern, launch, operate, and scale intelligent systems grounded in meaning.

---

## If you don't pass

Scoring **below 8/10** means specific dimensions need more work. Here is targeted guidance for each:

- **Low on product alignment:** revisit Lesson 1 and focus on the user. Put away the architecture for an hour and write about who uses the system, what their day looks like, and what changes for them. Product thinking starts with people, not technology.

- **Low on operational readiness:** revisit Lesson 2 and imagine yourself on-call at 3 AM when the system is failing. What do you need? That is what your operations plan should provide: clear dashboards, specific alert thresholds, step-by-step runbooks, and an escalation path you can follow while half-asleep.

- **Low on cost discipline:** revisit the "cost per completed outcome" section in Lesson 3. Start with a single user request and trace every cost it generates: the API call, the processing time, the human review if triggered, the error correction if wrong. Add it all up. Then multiply by your daily volume. This exercise makes cost real.

- **Low on scalability realism:** revisit the franchise analogy in Lesson 3. Think about what actually breaks when you grow: not just servers, but evaluation coverage, governance capacity, human review bandwidth, and ontology fitness for new domains. Scale is not just "more" — it is "more of everything, including the hard parts."

- **Low on governance continuity:** go back to your Module 7 deliverables and ask, for each control you designed: "How does this work in production?" "Who monitors it?" "What happens when it triggers?" "Does it still apply at 10x scale?" If you cannot answer these questions, your governance is design-only, not operational.

---

## Capstone bridge

There is no Module 9. This is the end of the structured curriculum and the beginning of your professional practice.

You now have the complete SSA toolkit:

1. **See meaning** where others see features (Module 1)
2. **Model domains** with precision and structure (Module 2)
3. **Architect agents** that collaborate and reason (Module 3)
4. **Build workflows** that are resilient and traceable (Module 4)
5. **Engineer context** that shapes behavior reliably (Module 5)
6. **Evaluate quality** continuously and rigorously (Module 6)
7. **Govern responsibly** with security, ethics, and compliance (Module 7)
8. **Deliver value** through products that operate and scale (Module 8)

The real test is not this assessment. The real test is your first project where a stakeholder says "We need an AI system that..." and you know exactly how to begin: understand the domain, model the meaning, architect the agents, build the workflows, engineer the context, evaluate the quality, govern the risks, launch the product, operate the system, and scale with discipline.

You do not need permission to practice. You need practice.

Go build something that matters.
