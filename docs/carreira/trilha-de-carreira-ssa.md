---
sidebar_position: 2
sidebar_label: "Career Path"
---

# Career Path -- Semantic Systems Architect

## The civil engineering analogy

Consider how an architecture career in civil engineering progresses.

You start as a **drafter**, turning someone else's vision into technical drawings. You learn materials, codes, and standards. You work under close supervision.

You become an **architect**, designing buildings end-to-end. You manage structural constraints, client needs, and regulatory requirements. You lead small teams.

You grow into a **principal architect**, overseeing multiple projects, setting design standards for the firm, and mentoring younger architects.

Eventually, some become **city planners** -- working not at the scale of individual buildings but at the scale of entire neighborhoods and cities. They define zoning laws, infrastructure standards, and long-term development strategy.

The SSA career path follows the same progression. You start by modeling domains under guidance. You grow to design complete semantic architectures. You advance to leading teams and setting organizational standards. At the highest levels, you shape how entire industries think about AI systems.

This guide defines five career levels, with clear expectations for each. It is a map, not a mandate -- individual paths will vary, but the progression of scope, autonomy, and impact is consistent.

---

## Level 1: SSA Associate

**The drafter. Learning the craft under guidance.**

### Role summary

The SSA Associate is an entry-level practitioner focused on learning the fundamentals of semantic modeling and evaluation. They work under the close guidance of a senior SSA or team lead. Their primary job is to build fluency with SSA tools and methods by applying them to well-defined, bounded problems.

Think of a junior architect who drafts floor plans based on a senior architect's design. They do not yet design buildings from scratch, but they develop the technical precision and domain understanding that will make them capable designers in time.

### Responsibilities

- Maintain and update existing domain ontologies as the business evolves (new products, new policies, changing terminology).
- Create and run evaluation suites under guidance. Write test cases, execute evals, document results, and flag anomalies for senior review.
- Contribute to context packages by drafting sections that a senior SSA reviews and approves.
- Document domain knowledge acquired through stakeholder interviews and system analysis.
- Participate in semantic review sessions, learning how experienced SSAs evaluate system behavior.

### Required skills

- Foundational understanding of ontology design: entities, relationships, constraints, and definitions.
- Ability to write clear, structured natural language specifications.
- Basic understanding of how LLMs process context and instructions.
- Familiarity with evaluation methodologies: what makes a good test case, how to interpret results.
- Active listening and interviewing skills for domain knowledge acquisition.

### Typical projects

- Update the customer support ontology when three new product categories are launched.
- Write 30 eval test cases for the billing domain and run them against the current system.
- Draft the glossary section of a new domain ontology based on interviews with five subject matter experts.
- Document the semantic gaps identified during a quarterly ontology review.

### Expected artifacts

- Updated ontology sections (reviewed and approved by a senior SSA).
- Eval test suites with documented results.
- Domain glossaries and terminology maps.
- Meeting notes and interview summaries from domain expert sessions.

### Promotion criteria

- Demonstrates consistent quality in ontology updates without requiring significant revision.
- Can independently design and run an eval suite for a bounded domain.
- Receives positive feedback from domain experts on their interviewing and documentation quality.
- Shows growing ability to identify semantic issues proactively, not just when assigned.
- Has completed the SSA Academy core curriculum.

### Time in role

Typically 12-18 months. The goal is to build enough fluency and domain exposure to design systems end-to-end.

---

## Level 2: SSA Practitioner

**The architect. Designing complete systems.**

### Role summary

The SSA Practitioner designs and delivers end-to-end semantic architectures for moderate-complexity systems. They own the full SSA lifecycle: domain decomposition, ontology design, agent architecture, context packages, eval frameworks, and production monitoring. They work with moderate autonomy, checking in with senior SSAs on strategic decisions but handling day-to-day design independently.

This is the architect who designs a complete house -- not just the floor plan, but the structural system, the mechanical layout, the materials specification, and the relationship between all rooms. They coordinate with builders, handle client feedback, and ensure the finished building matches the design.

### Responsibilities

- Lead semantic architecture for projects involving 2-5 agents and a single bounded domain.
- Design complete ontologies from scratch based on domain research and stakeholder interviews.
- Architect multi-agent systems: define roles, orchestration topology, communication protocols, and failure handling.
- Build and maintain comprehensive eval suites covering functional, semantic, safety, and adversarial dimensions.
- Collaborate directly with engineering teams on implementation, providing design guidance and reviewing the semantic fidelity of the built system.
- Run internal pilots and iterate based on user feedback.
- Set quality standards for context packages and system prompts within their projects.

### Required skills

- Strong ontology design: can decompose an unfamiliar domain into a coherent semantic model within 2-3 weeks.
- Multi-agent architecture: understands orchestration patterns, can design agent topologies that balance capability with simplicity.
- Context engineering: can craft system prompts that are precise, complete, and maintainable.
- Evaluation design: can create eval frameworks that catch subtle semantic failures, not just obvious bugs.
- Stakeholder communication: can explain semantic architecture concepts to non-technical audiences.
- Project management: can scope work, estimate timelines, and manage dependencies.

### Typical projects

- Design the complete semantic architecture for an internal knowledge assistant covering three product lines.
- Build a multi-agent customer support system that handles classification, resolution, and escalation.
- Create an eval framework for a document processing pipeline that must comply with industry regulations.
- Architect a recommendation system's semantic layer, defining how user intent maps to product categories.

### Expected artifacts

- Complete domain ontologies with full entity-relationship models.
- Agent architecture specifications with orchestration diagrams.
- Context packages for all agents in a system.
- Comprehensive eval suites with 50 or more test cases.
- Production monitoring dashboards and SLO definitions.
- Semantic maintenance runbooks.

### Promotion criteria

- Has delivered 2-3 production systems with documented business impact.
- Eval scores for their systems consistently meet or exceed SLO targets.
- Engineering teams request to work with them (a strong signal of design quality and collaboration).
- Can handle unfamiliar domains without close guidance.
- Begins mentoring SSA Associates informally.
- Contributes to the organization's SSA methodology (templates, patterns, best practices).

### Time in role

Typically 2-3 years. The goal is to develop the judgment and breadth needed to handle complex, multi-domain systems and lead other SSAs.

---

## Level 3: Senior SSA

**The principal architect. Leading complex systems and teams.**

### Role summary

The Senior SSA handles the organization's most complex semantic challenges: systems that span multiple domains, involve many agents, require sophisticated governance, or operate under strict regulatory constraints. They lead small teams of SSA Practitioners and Associates. They are recognized domain experts in at least one area.

This is the principal architect who designs a hospital, a university campus, or a mixed-use development. The projects are large, the constraints are complex, the stakeholders are many, and the consequences of poor design are severe. They do not just design -- they set the design methodology for their team.

### Responsibilities

- Lead semantic architecture for complex systems spanning 3 or more domains and involving 5-15 agents.
- Develop deep domain expertise in at least one critical business area (finance, healthcare, legal, operations).
- Define evaluation strategies for systems where correctness is nuanced, context-dependent, or regulated.
- Lead a team of 2-5 SSAs: assign work, review designs, provide mentoring, and ensure quality.
- Establish quality standards for semantic artifacts within their team or domain.
- Drive architectural decisions during incident response when semantic failures affect production systems.
- Present semantic architecture strategy to executive stakeholders.

### Required skills

- Expert-level ontology design across multiple domains.
- Advanced agent architecture: can design systems with complex orchestration, fallback behaviors, and graceful degradation.
- Deep understanding of at least one industry domain (enough to challenge domain experts and identify gaps in their thinking).
- Team leadership: can delegate effectively, provide constructive feedback, and develop junior team members.
- Strategic communication: can connect technical decisions to business outcomes for executive audiences.
- Incident management: can diagnose and resolve semantic failures under pressure.

### Typical projects

- Architect a cross-functional AI system that integrates customer support, billing, and compliance into a unified semantic framework.
- Lead the semantic design for a regulated industry product that must pass external audit.
- Design the evaluation and monitoring strategy for a portfolio of 10 or more AI systems.
- Develop the domain ontology for a new business line, including regulatory constraint modeling.

### Expected artifacts

- Cross-domain ontology architectures with integration specifications.
- Team-level quality standards and review checklists.
- Evaluation strategies for complex, multi-domain systems.
- Domain expertise documentation that becomes organizational reference material.
- Incident post-mortems with semantic root cause analysis.
- Presentations to executive stakeholders on semantic architecture strategy.

### Promotion criteria

- Has led 2-3 complex, multi-domain projects with measurable business outcomes.
- Their team's work is consistently high quality (as measured by peer review and production SLOs).
- Is recognized as the go-to expert for at least one critical domain.
- Has developed at least one SSA Practitioner who was promoted.
- Contributes to the SSA discipline beyond their organization (conference talks, published patterns, open-source contributions).
- Is trusted by executive leadership to make strategic architectural decisions.

### Time in role

Typically 3-5 years. Some practitioners remain at this level for an entire career and find deep satisfaction in the combination of technical expertise and team leadership.

---

## Level 4: Staff SSA

**The city planner. Designing organizational systems.**

### Role summary

The Staff SSA works at the organizational scale. They do not design individual systems -- they design the standards, patterns, and governance frameworks that enable all SSAs across the organization to work effectively. They are the architects of the architecture practice itself.

Think of this as the city planner who does not design individual buildings but defines the zoning laws, infrastructure standards, and urban design principles that shape how all buildings in the city relate to each other. They ensure that the hospital, the school, and the residential neighborhood work together as a coherent whole.

### Responsibilities

- Define and maintain the organization's SSA methodology: templates, patterns, review processes, and quality standards.
- Design cross-team semantic architectures that ensure consistency across multiple products and domains.
- Establish the organization's ontology governance framework: how domain models are created, versioned, reviewed, and deprecated.
- Mentor Senior SSAs and develop the overall capability of the SSA practice.
- Evaluate and recommend tools, platforms, and processes for semantic architecture work.
- Represent the SSA perspective in organizational technology strategy discussions.
- Lead cross-functional initiatives that require semantic architecture coordination across teams.
- Conduct organization-wide architecture reviews to ensure semantic consistency.

### Required skills

- Systems thinking at the organizational level: understanding how multiple products, teams, and domains interact.
- Methodology design: can create processes and standards that scale across diverse teams.
- Organizational influence: can drive change without direct authority, through persuasion, collaboration, and demonstrated value.
- Technical breadth: understands enough about infrastructure, data engineering, ML ops, and security to architect solutions that integrate with all of them.
- Mentoring and coaching: can develop SSAs at all levels, from Associates to Seniors.
- Written communication at publication quality: their documents become organizational references.

### Typical projects

- Design a company-wide ontology governance framework covering 8 product lines.
- Create the standard SSA toolkit: templates, review checklists, eval frameworks, and onboarding materials.
- Lead a cross-team initiative to unify the semantic models used by three previously independent product teams.
- Evaluate and recommend an observability platform for semantic quality monitoring across the organization.
- Design the SSA hiring process: job descriptions, interview rubrics, and assessment exercises.

### Expected artifacts

- Organizational SSA methodology documentation.
- Cross-team ontology integration architectures.
- Governance frameworks for ontology lifecycle management.
- SSA hiring and assessment materials.
- Technology evaluation reports with recommendations.
- Organization-wide semantic quality dashboards.

### Promotion criteria

- The SSA practice has measurably improved under their leadership (better quality, faster delivery, higher team satisfaction).
- Cross-team architectural consistency has increased.
- Has developed at least two Senior SSAs.
- Is recognized externally as an authority on semantic architecture (invited talks, published articles, advisory roles).
- Can influence organizational technology strategy at the VP level.

### Time in role

Variable. Many Staff SSAs remain at this level indefinitely, as it combines deep technical work with broad organizational impact. Some progress to Principal SSA, which shifts the focus from organizational to industry-wide.

---

## Level 5: Principal SSA

**The urban theorist. Shaping the discipline.**

### Role summary

The Principal SSA operates at the industry level. They define how the discipline of semantic systems architecture evolves. They advise organizations on AI strategy, contribute to industry standards, publish research, and shape the next generation of SSA methodology.

This is the urbanist who does not just plan one city but writes the textbooks that teach other planners, advises governments on national housing policy, and shapes the theoretical frameworks that define how cities are designed worldwide.

### Responsibilities

- Define the strategic direction for the SSA discipline within the organization and beyond.
- Advise C-level executives on AI architecture strategy and investment priorities.
- Contribute to industry standards for semantic architecture, AI governance, and system evaluation.
- Publish research, frameworks, and methodologies that advance the SSA discipline.
- Provide strategic consulting to other organizations on semantic architecture adoption.
- Shape the SSA Academy curriculum and certification standards.
- Represent the organization in industry forums, standards bodies, and academic partnerships.
- Identify emerging technologies and assess their impact on semantic architecture practice.

### Required skills

- Visionary thinking: can anticipate where AI systems are heading and position the organization accordingly.
- Industry perspective: understands how semantic architecture applies across different sectors and scales.
- Executive communication: can present to boards, investors, and industry leaders.
- Research methodology: can design studies, analyze trends, and publish rigorous findings.
- Political navigation: can influence industry direction through standards bodies, partnerships, and thought leadership.
- Teaching and curriculum design: can structure learning experiences that develop the next generation of practitioners.

### Typical projects

- Define a 3-year AI architecture strategy for a large enterprise.
- Contribute to an industry working group on standards for AI system evaluation.
- Publish a framework for measuring semantic quality in production AI systems.
- Advise three organizations on their SSA practice establishment.
- Design the certification criteria for Senior SSA and Staff SSA levels.

### Expected artifacts

- Published research papers and industry frameworks.
- Strategic advisory reports for executive leadership.
- Industry standard contributions and position papers.
- Conference keynotes and workshop curricula.
- Strategic technology assessments.

### Promotion criteria

This is the terminal level. Progression beyond Principal SSA is into executive leadership (VP of AI Architecture, CTO) or into academic/advisory roles.

### Time in role

Indefinite. Principal SSAs are rare and highly valued. They typically have 10 or more years of experience in semantic architecture or closely related fields.

---

## Skills matrix across all levels

The following matrix shows how key competencies deepen across the career path. Think of it as a proficiency scale: **Foundational** means you understand the concepts and can apply them with guidance. **Working** means you can apply them independently. **Expert** means you can teach others and handle edge cases. **Strategic** means you shape how the discipline approaches the topic.

| Skill area | Associate | Practitioner | Senior | Staff | Principal |
|---|---|---|---|---|---|
| Ontology design | Foundational | Working | Expert | Expert | Strategic |
| Agent architecture | Foundational | Working | Expert | Expert | Strategic |
| Context engineering | Foundational | Working | Expert | Expert | Strategic |
| Eval design | Working | Working | Expert | Expert | Strategic |
| Domain expertise | Foundational | Working | Expert (1 domain) | Expert (2-3 domains) | Strategic |
| Stakeholder communication | Foundational | Working | Expert | Expert | Strategic |
| Team leadership | -- | -- | Working | Expert | Strategic |
| Methodology design | -- | -- | Foundational | Expert | Strategic |
| Organizational influence | -- | -- | Working | Expert | Strategic |
| Industry vision | -- | -- | -- | Foundational | Expert |

---

## Adjacent career paths

The SSA career path is not the only destination. The skills you develop as an SSA open doors to several related roles. The architecture of your career, like any good architecture, should be intentional and adaptable.

### AI Product Manager

**What it is:** Leads product strategy for AI-powered products. Defines what to build, for whom, and why.

**How SSA skills apply:** Your ontology design skills translate directly to product requirements. Your eval frameworks become product quality metrics. Your domain expertise becomes product insight. You understand both the technical possibilities and the business constraints.

**When to consider this path:** You find yourself more excited about defining what should be built than designing how to build it. You enjoy working directly with customers and shaping product roadmaps.

### AI Engineering Lead

**What it is:** Leads the engineering team that builds and operates AI systems. Manages infrastructure, deployment, and operational excellence.

**How SSA skills apply:** Your architectural thinking scales to infrastructure design. Your understanding of semantic quality translates to operational monitoring. Your context engineering experience gives you deep insight into LLM behavior.

**When to consider this path:** You enjoy the implementation side as much as the design side. You are energized by leading engineering teams and solving operational challenges.

### AI Ethics Officer

**What it is:** Ensures AI systems are designed and operated responsibly. Defines governance policies, conducts audits, and manages risk.

**How SSA skills apply:** Your constraint modeling is the foundation of responsible AI governance. Your eval methodology becomes audit methodology. Your ontology skills help define fairness, bias, and safety in precise, testable terms.

**When to consider this path:** You are deeply motivated by the societal impact of AI. You want to ensure that systems are not just effective but also fair, transparent, and accountable.

---

## How SSA relates to existing roles

The SSA role does not exist in a vacuum. It has meaningful overlap with -- and important distinctions from -- several established roles.

### SSA vs. Solutions Architect

A Solutions Architect designs how technology components fit together to solve a business problem. An SSA designs how meaning flows through an AI system. The Solutions Architect thinks in terms of services, APIs, and infrastructure. The SSA thinks in terms of entities, constraints, and semantic contracts. In practice, these roles collaborate closely: the Solutions Architect ensures the system can be built and deployed, while the SSA ensures it reasons and behaves correctly.

### SSA vs. ML Engineer

An ML Engineer trains, optimizes, and deploys machine learning models. An SSA designs the semantic layer that governs how those models are used in production. The ML Engineer cares about model accuracy, latency, and throughput. The SSA cares about whether the model's output aligns with domain meaning and business constraints. They are complementary: the ML Engineer provides the reasoning engine, and the SSA provides the reasoning structure.

### SSA vs. Prompt Engineer

A Prompt Engineer writes and optimizes prompts for language models. An SSA designs the entire semantic architecture of which prompts are one component. The relationship is like that between a copywriter and an advertising creative director. The copywriter writes the ad copy. The creative director designs the campaign -- the strategy, the audience, the channels, the brand positioning. The prompt is one artifact. The semantic architecture is the system.

### SSA vs. Data Architect

A Data Architect designs how data is stored, organized, and accessed. An SSA designs how meaning is extracted from that data and used to drive AI behavior. The Data Architect ensures the data is clean, structured, and available. The SSA ensures the data is interpreted correctly in context. They need each other: without good data, semantic models have nothing to work with. Without semantic models, good data is just well-organized noise.

---

## Salary positioning guidance

Rather than citing specific numbers (which vary enormously by geography, industry, and company size), here is a framework for understanding how SSA compensation should be positioned.

### The positioning principle

An SSA should be compensated comparably to other architecture roles at the same scope and impact level. The reference points are:

- **SSA Associate** aligns with junior Software Engineer or junior Data Analyst compensation.
- **SSA Practitioner** aligns with mid-level Software Architect or Solutions Architect compensation.
- **Senior SSA** aligns with Senior Solutions Architect or Engineering Manager compensation.
- **Staff SSA** aligns with Staff Engineer or Principal Solutions Architect compensation.
- **Principal SSA** aligns with Distinguished Engineer or VP of Engineering compensation.

### How to build your case

When negotiating compensation, focus on three dimensions:

**1. Scope of impact.** How many systems, teams, or business lines does your work affect? A Practitioner who architects the semantic layer for one product is scoped differently from a Senior who designs cross-domain architecture for five products.

**2. Measurable outcomes.** What business metrics improved because of your work? Reduced error rates, faster resolution times, lower operational costs, higher user satisfaction -- these are the numbers that justify compensation.

**3. Scarcity of the skill.** Semantic systems architecture is a new discipline. Organizations that need SSAs often cannot find them. This scarcity is real and should be reflected in your negotiation.

### The portfolio approach

Build a portfolio of your work the way an architect builds a portfolio of buildings. Include: domain ontologies you designed, agent architectures you specified, eval results showing improvement, and business outcomes your work enabled. This portfolio is your strongest negotiation tool, because it provides tangible evidence of what you deliver and what it is worth.

---

## Building your career: practical advice

### Keep a decision log

Every significant architectural decision you make -- and the reasoning behind it -- should be recorded. Over time, this log becomes a powerful tool for reflection, for mentoring others, and for building your portfolio. It also protects you: when someone asks "why did we design it this way?", you have the answer.

### Invest in domain depth, not just technical breadth

The most valuable SSAs are not generalists who can model any domain superficially. They are practitioners who have deep expertise in one or two domains and can apply that depth to produce architectures that experts respect. Pick a domain that fascinates you and go deep.

### Teach what you learn

The fastest way to solidify your understanding of semantic architecture is to teach it. Write internal blog posts. Run lunch-and-learn sessions. Mentor Associates. Explain your designs to non-technical colleagues. Teaching forces you to clarify your thinking and reveals gaps in your understanding.

### Connect to the broader community

The SSA discipline is young and evolving rapidly. Connect with other practitioners through the SSA Academy community, industry conferences, and open-source contributions. The patterns you discover may help others. The patterns others discover will certainly help you.

---

## The long view

A career in semantic systems architecture is a career in meaning. You are part of a discipline that is still being defined. The first generation of SSAs -- the people reading this guide -- will shape what this profession becomes.

In civil engineering, it took generations to go from simple structures to the complex built environments we inhabit today. The journey required drafters, architects, engineers, and planners working together across decades to develop the methods, standards, and institutions that make modern cities possible.

Semantic systems architecture is at the beginning of that same arc. Your career is not just a personal journey. It is a contribution to the foundations of how humans and intelligent systems work together.

Make it deliberate. Make it rigorous. Make it matter.
