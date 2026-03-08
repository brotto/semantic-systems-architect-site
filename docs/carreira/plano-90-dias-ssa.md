---
sidebar_position: 1
sidebar_label: "90-Day Plan"
---

# The 90-Day Plan -- SSA Onboarding

## The residency analogy

When a new doctor begins their residency at a hospital, they do not walk in on Day 1 and perform surgery. They observe. They learn how the hospital works -- its protocols, its culture, its unspoken rules. They shadow experienced physicians. They handle small, supervised cases. Gradually, they earn the trust and context needed to operate independently.

The first 90 days of a Semantic Systems Architect in a new organization follow the same pattern. You are not expected to redesign everything on Day 1. You are expected to absorb, demonstrate competence in small wins, and progressively take on more complex, more autonomous work.

This guide gives you a week-by-week playbook for that progression. It is divided into three phases:

- **Phase 1 (Days 1-30): Foundation** -- understand the organization, map what exists, deliver your first ontology draft.
- **Phase 2 (Days 31-60): Assisted Execution** -- design your first agent architecture, implement context packages, run your first eval suite.
- **Phase 3 (Days 61-90): Controlled Scale** -- launch to production, establish monitoring, train the team, present a quarterly roadmap.

Each phase includes objectives, mindset guidance, weekly activities, deliverables, success criteria, common pitfalls, and the stakeholder relationships you need to build.

---

## Phase 1: Foundation (Days 1-30)

### Objective

Absorb the organization's language, existing systems, and decision-making culture. Deliver a first ontology draft and build the relationships that will make everything else possible.

### Mindset

You are a detective, not a consultant. Your job right now is to listen, not to prescribe. Resist the urge to redesign things before you understand why they were built the way they were. Every system has a history, and that history carries reasons -- some good, some outdated, all important to understand.

Think of a doctor joining a new hospital. Before they can improve patient care, they need to know: How does this hospital do rounds? What are the referral pathways? Which nurses know more about certain patients than the attending physicians? Where is institutional knowledge stored, and where is it lost?

You are mapping the same kind of landscape, but for meaning: Where does this organization capture its domain knowledge? Where does meaning get lost between teams? Where are decisions being made without clear definitions?

### Week 1: Orientation and listening

**Activities:**

- Meet your direct manager and align on expectations for the first 90 days. Ask them: "What would make my first month a success in your eyes?"
- Identify the 5-7 people who know the most about the current AI systems, the business domain, and the data landscape. Schedule 30-minute conversations with each.
- Read all existing documentation: system architecture docs, API specs, product requirements, internal wikis. Take notes on where language is inconsistent or where domain terms are used differently by different teams.
- Set up your development environment. Get access to all relevant repositories, dashboards, and communication channels.
- Create a personal "domain journal" where you record new terms, ambiguities, and questions every day.

**Deliverable:**

- A stakeholder map listing who owns what, who influences what, and who you need relationships with. This can be a simple diagram on a whiteboard or a one-page document.

### Week 2: System archaeology

**Activities:**

- Map the current AI systems: what models are in use, what prompts drive them, what data they consume, what outputs they produce. You are drawing a picture of the current semantic landscape.
- Interview 3-5 end users (internal or external) who interact with the AI systems daily. Ask them: "What does this system get right? What does it get wrong? What surprises you?"
- Identify the top 3-5 pain points where ambiguity or meaning failure causes real business problems. Examples: the support bot misclassifies tickets, the recommendation engine suggests irrelevant products, the document processor misinterprets contract clauses.
- Review existing prompts and system instructions. Flag areas where terms are undefined, where constraints are implicit, or where the same concept is described with different words in different places.

**Deliverable:**

- A "Semantic Landscape Assessment" -- a 2-3 page document describing the current state of meaning in the organization's AI systems. It should answer: What domain knowledge is captured? What is missing? Where does meaning break down?

### Week 3: First ontology draft

**Activities:**

- Select one bounded domain for your first ontology. Choose something important enough to matter but small enough to complete in a week. Good candidates: a product category, a customer segment, a support workflow, a compliance area.
- Decompose the domain into entities, relationships, constraints, and definitions. Use the Domain Ontology Template from the SSA toolkit.
- Validate your ontology with at least two domain experts. Show them your definitions and ask: "Is this how you would describe it? What am I missing? What would you say differently?"
- Revise based on feedback. The goal is not perfection -- it is a credible first draft that demonstrates you understand the domain.

**Deliverable:**

- A v1 Domain Ontology for your chosen bounded domain, following the standard template. Include entity definitions, relationship maps, constraint specifications, and a glossary of domain terms.

### Week 4: First evals and Phase 1 synthesis

**Activities:**

- Design a minimal evaluation suite for the domain you modeled. Create 10-15 test cases that probe whether an AI system can correctly apply the definitions and constraints in your ontology. Include positive cases (the system should get these right), negative cases (the system should refuse or flag these), and edge cases (ambiguous situations where the correct answer depends on context).
- Run your eval suite against the existing system. Document the results. This gives you a quantified baseline: "Today, the system handles 60% of these cases correctly."
- Prepare a Phase 1 summary presentation for your manager and key stakeholders. Include: what you learned, what you built, what you recommend for the next 30 days.
- Begin drafting a backlog of semantic improvement opportunities, ranked by business impact.

**Deliverable:**

- A minimal evals suite (10-15 cases) with baseline results.
- A Phase 1 summary document.

### Success criteria for Phase 1

- You can explain the organization's domain in your own words, and domain experts agree with your explanation.
- Your ontology draft has been reviewed and accepted (with feedback) by at least two domain experts.
- Your eval suite has produced a measurable baseline.
- Your manager can articulate what you have accomplished and why it matters.
- You have working relationships with at least 5 people across engineering, product, and domain expertise.

### Common pitfalls in Phase 1

**Pitfall 1: Trying to fix everything immediately.** You see problems everywhere. The prompts are inconsistent. The data is messy. The architecture is tangled. You want to redesign it all. Resist. Your job in Phase 1 is to understand, not to fix. Premature solutions based on incomplete understanding create more problems than they solve.

**Pitfall 2: Working in isolation.** You spend weeks in deep focus, producing beautiful documents that nobody asked for and nobody has seen. When you finally present them, they miss the mark because you didn't validate your understanding along the way. Show your work early and often.

**Pitfall 3: Using jargon before building trust.** You talk about "ontological decomposition" and "semantic contracts" in your first week. People's eyes glaze over. Speak the organization's language first. Introduce SSA terminology gradually, after you have demonstrated value.

**Pitfall 4: Ignoring the social landscape.** You focus entirely on systems and documents, and forget that organizations run on relationships. The engineer who built the current prompt system has opinions. The product manager who defined the requirements has context. The customer success lead knows what customers actually complain about. Neglect these relationships and your technical work will stall.

### Stakeholder relationships to build in Phase 1

| Stakeholder | Why they matter | How to engage |
|---|---|---|
| Engineering lead | They own the systems you will architect for | Pair on a technical review of current prompts |
| Product manager | They define what "success" means for the business | Ask them to walk you through the product roadmap |
| Domain expert (SME) | They hold the knowledge your ontology must capture | Interview them, validate your drafts with them |
| Data team lead | They know what data exists and what its quality is | Review the data catalog together |
| Your manager | They set expectations and remove blockers | Weekly 1:1 with clear agenda and updates |

---

## Phase 2: Assisted Execution (Days 31-60)

### Objective

Design and deliver your first complete semantic flow: agent architecture, context packages, and a working eval suite. Run a pilot with internal users.

### Mindset

You have earned the right to build. But you are still learning the organization's rhythm. Think of the resident who has completed their observation month and is now performing procedures -- but always with an attending physician nearby. You design, you execute, but you do it with close collaboration and frequent check-ins.

The key word for Phase 2 is "assisted." You are not a lone architect working in a tower. You are embedded with engineering and product teams, co-creating solutions, and learning from the friction that emerges when semantic designs meet implementation reality.

### Week 5: Agent architecture design

**Activities:**

- Based on your Phase 1 assessment, select one workflow or capability for your first agent architecture. Choose something that has clear business impact and that you have domain knowledge for from your ontology work.
- Define the agent roles: what does each agent know, what can it decide, what must it escalate? Use the Architecture Spec template.
- Map the orchestration topology: how do agents communicate? What is the flow of information and decisions? Where are the handoff points?
- Review your design with the engineering lead. Get feedback on feasibility, performance implications, and integration constraints.

**Deliverable:**

- A v1 Agent Architecture Specification, including role definitions, orchestration topology, and integration requirements.

### Week 6: Context package implementation

**Activities:**

- Build the context packages that your agents need. A context package is the structured knowledge and instructions that an agent receives at runtime -- the domain ontology, the semantic contracts, the behavioral constraints, the relevant data.
- For each agent role, define: What knowledge does this agent need? What constraints govern its behavior? What does it need to know about the other agents in the system?
- Implement the system prompts using the Structural System Prompt template. These are not casual prompts -- they are engineered specifications that define the agent's identity, capabilities, and boundaries.
- Begin instrumenting the system for observability. Define what you want to measure: decision quality, response consistency, constraint adherence, escalation rates.

**Deliverable:**

- Complete context packages for all agents in your architecture.
- Instrumented observability for at least 3 key metrics.

### Week 7: Eval suite and internal pilot

**Activities:**

- Expand your minimal eval suite into a comprehensive evaluation framework. Include functional tests (does the system produce correct outputs?), semantic tests (does the system reason consistently with the ontology?), safety tests (does the system respect constraints and boundaries?), and adversarial tests (does the system behave correctly under unexpected inputs?).
- Run the full eval suite and document results. Compare against your Phase 1 baseline.
- Launch a small internal pilot: 3-5 internal users who will use the new system for real tasks and provide structured feedback. Give them a simple feedback form with three questions: What worked? What surprised you? What failed?
- Monitor the pilot closely. Sit with users. Watch them interact with the system. The most valuable insights come from observing behavior, not reading reports.

**Deliverable:**

- A comprehensive eval suite with documented results.
- A running internal pilot with structured feedback collection.

### Week 8: Iteration and Phase 2 synthesis

**Activities:**

- Analyze pilot feedback. Categorize issues as: semantic gaps (the ontology is incomplete), architectural issues (the agent design needs adjustment), implementation bugs (the code needs fixing), or expectation mismatches (users expected something different from what was designed).
- Iterate on your architecture and context packages based on feedback. This is where the real learning happens. The gap between your design and what users actually experience reveals where your semantic model was incomplete or inaccurate.
- Document your iteration decisions: what changed, why, what you learned. This creates the institutional knowledge that will help the next SSA who works on this domain.
- Prepare a Phase 2 summary for stakeholders. Include: what you built, pilot results, what you learned, what you recommend for the production launch.

**Deliverable:**

- Updated architecture and context packages based on pilot feedback.
- A Phase 2 summary document with iteration log.

### Success criteria for Phase 2

- Your agent architecture is documented, reviewed by engineering, and implementable.
- Context packages are complete and follow the standard templates.
- Your eval suite shows measurable improvement over the Phase 1 baseline.
- Internal pilot users can describe what the system does well and where it needs improvement.
- Engineering trusts your designs enough to implement them without extensive rework.

### Common pitfalls in Phase 2

**Pitfall 1: Over-engineering the architecture.** You design a beautiful 7-agent system with complex orchestration when a 2-agent system would handle 90% of cases. Start simple. Add complexity only when the evals tell you it is needed.

**Pitfall 2: Skipping the pilot.** You are confident in your design, so you push for immediate production launch. This almost always leads to surprises. Internal pilots catch problems that evals miss, because real users do things you never imagined.

**Pitfall 3: Treating eval results as pass/fail.** Evals are not unit tests. They are measurements of semantic fidelity. A score of 75% is not a "failure" -- it is a data point that tells you where the ontology needs refinement. The goal is continuous improvement, not binary perfection.

**Pitfall 4: Designing without engineering input.** You create a context package that is semantically beautiful but technically impossible to implement within latency requirements. Always validate feasibility with the people who will build it.

### Stakeholder relationships to build in Phase 2

| Stakeholder | Why they matter | How to engage |
|---|---|---|
| Implementation engineers | They translate your designs into running systems | Pair on context package implementation |
| QA/Testing team | They can amplify your eval methodology | Co-create the eval suite, share results |
| Internal pilot users | They validate your design against reality | Observe them, debrief with them, thank them |
| Security/compliance team | They define constraints your system must respect | Review your safety controls together |
| Executive sponsor | They need to see progress to continue supporting | Share pilot results with business-relevant framing |

---

## Phase 3: Controlled Scale (Days 61-90)

### Objective

Launch your system to production, establish monitoring and governance, train the team to maintain and evolve it, and present a quarterly roadmap.

### Mindset

You are transitioning from builder to steward. The resident is now managing their own patients, but they are also teaching medical students and contributing to hospital protocols. In Phase 3, you are no longer proving you can do the work -- you are establishing how the work should be done.

The key question for Phase 3 is not "Does it work?" but "Can it keep working without me?" A good architect does not build systems that depend on them personally. They build systems that the organization can maintain, evolve, and improve independently.

### Week 9: Production launch

**Activities:**

- Finalize production readiness. Review your architecture, context packages, and eval suite with the full engineering and product team. Address all open issues from the pilot.
- Define SLOs (Service Level Objectives) for semantic quality. These are the thresholds that define "acceptable" system behavior. Examples: "The system correctly classifies 95% of tickets." "Constraint violations occur in less than 1% of interactions." "Escalation to humans happens within 30 seconds of trigger conditions."
- Create a runbook for common semantic issues: What to do when the system misclassifies a domain entity. How to update the ontology when a new product is launched. How to add new constraints when compliance requirements change. The runbook should be clear enough that someone who is not an SSA can follow it for routine maintenance.
- Execute a staged rollout. Start with 10% of traffic. Monitor closely. Expand gradually.

**Deliverable:**

- Production deployment with staged rollout.
- SLO definitions and monitoring dashboards.
- A semantic maintenance runbook.

### Week 10: Monitoring and governance

**Activities:**

- Establish continuous monitoring for semantic quality. Your eval suite should run automatically on a regular cadence -- daily or weekly, depending on the system's change frequency.
- Publish a policy pack: the collection of documents that govern how the organization manages semantic architecture. This includes the ontology management process (how to add, change, or deprecate domain terms), the context package update process (how to modify agent instructions), the eval management process (how to add or update test cases), and the escalation process (what happens when semantic quality drops below SLO thresholds).
- Set up alerting: when eval scores drop below thresholds, when new edge cases are detected, when constraint violations spike. These alerts should reach both the SSA and the engineering team.
- Conduct a post-launch retrospective with the full team. What went well? What surprised you? What would you do differently next time?

**Deliverable:**

- Automated eval monitoring with alerting.
- Published policy pack.
- Post-launch retrospective document.

### Week 11: Team training

**Activities:**

- Design and deliver a training session for the engineering team on semantic architecture fundamentals. They do not need to become SSAs, but they need to understand: what ontologies are and why they matter, how to read and interpret context packages, how to run and interpret eval suites, and when to escalate semantic issues to the SSA.
- Create a "Semantic Architecture Quick Reference" -- a one-page guide that engineers can keep on their desk (or in their bookmarks) for daily reference.
- Identify 1-2 engineers who show aptitude and interest in semantic work. Begin mentoring them. They are your future SSA Associates, and investing in them multiplies your impact.
- Document all tribal knowledge you have accumulated. Everything you know about the domain, the system, and the organization should be written down, not stored only in your head.

**Deliverable:**

- Training session delivered (with slides and recording).
- Semantic Architecture Quick Reference document.
- Mentoring relationships initiated.

### Week 12: Quarterly roadmap and Phase 3 synthesis

**Activities:**

- Prepare a quarterly SSA roadmap: what you plan to accomplish in the next 90 days. This should include: new domains to model, existing ontologies to expand, architectural improvements based on production data, eval coverage to extend, and team capability to build.
- Present the roadmap to your manager and executive sponsor. Frame it in terms of business outcomes: "In Q2, I plan to extend the ontology to cover product returns, which will enable the support system to handle 30% more ticket types autonomously."
- Write a comprehensive 90-day retrospective. What worked in your onboarding? What would you do differently? What advice would you give to the next SSA who joins the organization? This document is a gift to your future colleagues.
- Celebrate. You have gone from zero to production in 90 days. That is a significant accomplishment.

**Deliverable:**

- Quarterly SSA roadmap.
- 90-day retrospective document.

### Success criteria for Phase 3

- The system is running in production and meeting SLO targets.
- Monitoring and alerting are operational.
- The policy pack is published and the team knows how to follow it.
- At least one engineer can perform routine semantic maintenance using the runbook.
- Your manager and executive sponsor can articulate the business value of your work.
- A quarterly roadmap has been reviewed and approved.

### Common pitfalls in Phase 3

**Pitfall 1: Launching without a runbook.** You push to production, declare victory, and then go on vacation. When something breaks, nobody knows what to do. Always launch with a maintenance plan.

**Pitfall 2: Making yourself a bottleneck.** If every semantic decision requires your personal approval, you have not scaled -- you have become a single point of failure. Train others. Document processes. Build the muscle so the organization can function without you for a week.

**Pitfall 3: Treating the roadmap as a promise.** A quarterly roadmap is a plan, not a commitment. It will change as you learn more. Present it with appropriate caveats: "Based on what we know today, here is what I recommend. We will revisit at the end of each month."

**Pitfall 4: Forgetting to tell the story.** You did excellent technical work, but nobody knows about it because you never communicated the impact. Frame your results in business language. "We reduced ticket misclassification from 40% to 8%" is more powerful than "we improved the ontology's entity resolution coverage."

### Stakeholder relationships to deepen in Phase 3

| Stakeholder | Why they matter | How to engage |
|---|---|---|
| Engineering team (broad) | They maintain what you build | Train them, create runbooks, be available |
| Product leadership | They fund your roadmap | Present business outcomes, not technical details |
| Peer SSAs (if any) | They share patterns and learn from your experience | Start a practice community, share retrospectives |
| External domain experts | They keep your ontology current as the domain evolves | Schedule quarterly review sessions |
| HR/Talent team | They need to understand the SSA role for hiring | Help them write job descriptions, define interview rubrics |

---

## What your manager should expect

If you are managing an SSA through their first 90 days, here is what you should see at each phase:

### After Phase 1 (Day 30)

- The SSA can explain your domain in clear, structured terms.
- You have a stakeholder map and a semantic landscape assessment.
- There is a first ontology draft that domain experts have validated.
- There is a minimal eval suite with baseline measurements.
- The SSA has built working relationships across 2-3 teams.

**Red flag:** The SSA has been working alone, has not talked to domain experts, or cannot explain what the current systems do.

### After Phase 2 (Day 60)

- There is a documented agent architecture that engineering can implement.
- Context packages and system prompts follow standard templates.
- Eval scores show measurable improvement over the Phase 1 baseline.
- An internal pilot is running and producing structured feedback.
- Engineering describes the SSA as "easy to work with" and "pragmatic."

**Red flag:** The SSA has designed something beautiful on paper that engineering says is impossible to implement, or the pilot was skipped because "we're confident."

### After Phase 3 (Day 90)

- A system is running in production and meeting defined SLOs.
- There are monitoring dashboards, alerting, and a maintenance runbook.
- At least one engineer can perform routine semantic maintenance.
- There is a quarterly roadmap tied to business outcomes.
- The SSA can explain the ROI of their work in business language.

**Red flag:** The SSA is the only person who can maintain the system, the roadmap is a wish list with no business justification, or there is no monitoring in place.

### How to support your SSA

- **Give them access.** An SSA cannot design systems they cannot see. Ensure they have access to all relevant codebases, documentation, dashboards, and communication channels from Day 1.
- **Introduce them broadly.** The SSA needs relationships across teams. Make introductions. Explain to other teams what the SSA does and why their cooperation matters.
- **Protect their learning time.** Phase 1 is about absorption, not output. Resist the urge to assign urgent projects in the first two weeks.
- **Review their work, not just their output.** Ask to see the ontology drafts, the eval results, the architecture specs. The quality of the process matters as much as the deliverables.
- **Connect their work to business goals.** Help the SSA understand which metrics the leadership team cares about, so they can frame their work accordingly.

---

## The complete deliverables checklist

| Phase | Week | Deliverable |
|---|---|---|
| Phase 1 | Week 1 | Stakeholder map |
| Phase 1 | Week 2 | Semantic landscape assessment |
| Phase 1 | Week 3 | v1 domain ontology |
| Phase 1 | Week 4 | Minimal eval suite with baseline, Phase 1 summary |
| Phase 2 | Week 5 | v1 agent architecture specification |
| Phase 2 | Week 6 | Context packages, observability instrumentation |
| Phase 2 | Week 7 | Comprehensive eval suite, internal pilot launch |
| Phase 2 | Week 8 | Updated architecture, Phase 2 summary with iteration log |
| Phase 3 | Week 9 | Production deployment, SLOs, runbook |
| Phase 3 | Week 10 | Automated monitoring, policy pack, retrospective |
| Phase 3 | Week 11 | Team training, quick reference guide |
| Phase 3 | Week 12 | Quarterly roadmap, 90-day retrospective |

---

## After the first 90 days

At the end of this plan, you are no longer the "new SSA." You are an SSA who has shipped. You have a production system, a trained team, a monitoring framework, and a roadmap. You have relationships across the organization. You have a track record.

The next question is: what kind of SSA do you want to become? The **Career Path** guide covers the full progression from SSA Associate to Principal SSA -- the long arc of a career in semantic systems architecture.

Your first 90 days are your residency. The rest of your career is your practice. Make it count.
