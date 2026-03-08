---
sidebar_position: 7
title: Lab Corporate Rollout
---

# Lab -- Corporate SSA Rollout

## Challenge overview

This lab is the capstone of the Corporate Onboarding track. It integrates everything you have learned about the adoption model, the 30-60-90 plan, the internal academy, rituals and governance, and impact metrics into a single, realistic planning exercise.

**Your challenge:** Plan a complete SSA rollout for a fictional company with three squads at different maturity levels. You will produce a comprehensive rollout plan that accounts for each squad's starting point, designs a tailored adoption path for each, and coordinates the overall effort into a coherent organizational strategy.

This is not a theoretical exercise. The scenario is designed to replicate the messy reality of organizational adoption -- where teams have different histories, different capabilities, different levels of enthusiasm, and different business pressures. Your plan must work in this reality, not in an idealized version of it.

---

## The scenario

**Company:** MedServe Technologies, a mid-size health technology company with 400 employees. MedServe provides AI-powered tools for healthcare providers: clinical documentation assistance, patient triage support, and insurance claim processing.

**Context:** The CTO has decided to adopt SSA practices across the AI engineering organization after two significant incidents: a clinical documentation system that hallucinated medication dosages (caught before deployment but embarrassing), and an insurance claim processor that systematically undercategorized complex claims (discovered after three months in production). The company has no formal SSA practice. An SSA Lead has been hired (that is you, for this exercise) and given a mandate to roll out SSA practices across three squads in the first quarter.

**Your budget:** 1 SSA Lead (you), budget for 2 additional SSA Practitioner hires (starting Day 15), and approval to allocate 20% of each squad's engineering time to SSA training and practice for the first 90 days.

### Squad Alpha: Clinical Documentation

**Product:** An AI assistant that helps physicians write clinical notes by listening to patient encounters and generating structured documentation.

**Team:** 8 people -- 1 product manager, 4 engineers, 1 ML engineer, 1 clinical advisor (part-time), 1 QA engineer.

**AI maturity:** Moderate. They have a working production system with prompt templates, basic output validation, and a small set of manual test cases (about 20). They do not have a formal ontology, semantic contracts, or automated evaluation. The clinical advisor reviews outputs occasionally but there is no systematic evaluation process.

**Attitude:** Cautiously positive. The medication dosage incident happened on their watch, and they know they need better quality practices. But they are also under pressure to ship three new specialty modules (cardiology, orthopedics, dermatology) this quarter, and they worry that SSA will slow them down.

**Key stakeholder:** Dr. Sarah Chen, the clinical advisor. She has deep domain expertise but limited availability (2 days per week). She is the only person who can truly validate clinical accuracy.

### Squad Beta: Patient Triage

**Product:** A chatbot that helps patients describe symptoms, provides initial guidance, and routes them to the appropriate care level (self-care, telehealth, urgent care, emergency).

**Team:** 6 people -- 1 product manager, 3 engineers, 1 UX researcher, 1 compliance officer.

**AI maturity:** Low. The system was built rapidly to meet a partnership deadline. Prompts are long, unstructured, and maintained by a single engineer who "knows how they work." There are no formal evaluations -- quality is assessed through periodic manual reviews of conversation logs and by tracking user complaints.

**Attitude:** Skeptical. The team feels overworked and views SSA as "more process" being imposed on them. The engineer who maintains the prompts (Jake) is particularly resistant -- he sees SSA as a threat to his role and expertise.

**Key stakeholder:** Maria Santos, the compliance officer. She is worried about regulatory risk (the triage system gives medical guidance, which has legal implications) and is enthusiastic about SSA practices that could provide audit trails and documented decision logic.

### Squad Gamma: Insurance Claims

**Product:** An AI system that reads insurance claims, categorizes them, identifies missing information, and suggests processing actions.

**Team:** 5 people -- 1 product manager, 3 engineers, 1 domain expert (former insurance adjuster).

**AI maturity:** Very low. The system was a proof-of-concept that got pushed to production without formal engineering practices. The "architecture" is a single large prompt with examples embedded directly in it. The undercategorization incident was discovered by an external audit, not by internal quality processes.

**Attitude:** Demoralized. The team knows their system has quality problems but feels they do not have the skills or time to fix them. They are also embarrassed by the audit findings and are looking for help rather than resisting it.

**Key stakeholder:** Tom Rivera, the domain expert and former insurance adjuster. He has 15 years of claims processing experience and can articulate the domain rules with precision, but he has no technical background and does not understand AI systems beyond "it reads the claim and tells you what to do."

---

## Deliverables

You must produce the following six deliverables. Each should be a substantive document, not a list of bullet points. Write as if you were presenting this plan to MedServe's CTO for approval.

### Deliverable 1: 30-60-90 plan per squad

Create a tailored 30-60-90 plan for each squad, following the framework from the 30-60-90 Plan section but adapted to each squad's specific maturity level, team composition, attitude, and business context.

For each squad and each phase, specify:

- **Activities:** What will be done, by whom, and in what order.
- **Deliverables:** What concrete artifacts will be produced.
- **Success criteria:** How you will know the phase was successful.
- **Risk mitigation:** What could go wrong and how you will address it.

**Key considerations:**
- Squad Alpha has moderate maturity and is under delivery pressure. How do you introduce SSA practices without blocking the specialty module launches?
- Squad Beta has a skeptical team member who feels threatened. How do you win Jake over? How do you use Maria's compliance enthusiasm as leverage?
- Squad Gamma has the lowest maturity but the highest willingness. How do you help them without overwhelming them?

### Deliverable 2: Stakeholder map

Create a stakeholder map for the entire rollout. For each stakeholder, document:

- **Name and role** (from the scenario description)
- **Interest level:** How much do they care about SSA adoption? (High, Medium, Low)
- **Influence level:** How much power do they have to support or block adoption? (High, Medium, Low)
- **Current attitude:** Supporter, Neutral, or Skeptic
- **Key concern:** What is their primary worry or motivation regarding SSA?
- **Engagement strategy:** How will you engage with this person to maximize support and minimize resistance?

Include the CTO, each squad's product manager, the key stakeholders named in the scenario (Dr. Chen, Jake, Maria, Tom), and any other roles you think are relevant.

### Deliverable 3: Training plan

Design the training plan for all three squads, using the Internal Academy framework. Specify:

- **Who takes which track** (Foundations, Practitioner, Lead) and when.
- **Cohort composition:** How will you form cohorts across the three squads?
- **Scheduling:** How will training be scheduled given the 20% time allocation and each team's delivery pressures?
- **Adaptation:** How will you adapt training content for the healthcare domain context?
- **Special cases:** How will you handle Dr. Chen's limited availability? How will you handle Tom's non-technical background? How will you address Jake's resistance?

### Deliverable 4: Success criteria

Define the success criteria for the overall rollout at the 30-day, 60-day, and 90-day marks. These should be:

- **Specific:** Not "improve quality" but "achieve X% eval pass rate."
- **Measurable:** You must be able to determine objectively whether the criterion was met.
- **Relevant:** Each criterion should connect to MedServe's business goals (patient safety, regulatory compliance, claims accuracy).
- **Differentiated:** Criteria should be different for each squad, reflecting their different starting points and contexts.

Also define the "must-have" versus "nice-to-have" criteria for each milestone. What would make you recommend proceeding to the next phase? What would make you recommend pausing?

### Deliverable 5: Governance and ritual plan

Design the governance and ritual structure for MedServe's SSA practice, using the Rituals and Governance framework. Specify:

- **Which rituals to start with** and when to add more. Remember that not all rituals make sense on Day 1.
- **How to handle cross-squad coordination** given the different maturity levels and pace of adoption.
- **Initial governance structure:** Who makes what decisions during the rollout? How does this evolve as the practice matures?
- **Standards management:** How will you develop MedServe's initial SSA standards? How will healthcare domain considerations shape these standards?

### Deliverable 6: Metrics and reporting plan

Design the metrics and reporting structure for the rollout, using the Impact Metrics framework. Specify:

- **Which metrics to track** from Day 1, and which to add later.
- **How to establish baselines** for each squad given their different maturity levels.
- **Reporting cadence and audience:** What does the CTO see and when? What do squad leads see? What do individual practitioners see?
- **Impact attribution:** How will you demonstrate that SSA practices are causing improvements, not just correlating with them?

---

## Evaluation rubric

Your rollout plan will be evaluated against six criteria. For each criterion, the rubric describes what "excellent," "proficient," and "needs improvement" look like.

### 1. Deployment clarity

- **Excellent:** Every activity, deliverable, and milestone is specific enough that someone else could execute the plan without additional guidance. Dependencies between squads are identified and managed. Timeline is realistic given the resource constraints.
- **Proficient:** The plan is clear and actionable for most elements. Some activities could be more specific. Dependencies are mostly identified.
- **Needs improvement:** The plan is vague or generic. Activities are described at a high level without concrete details. It reads like a copy of the 30-60-90 template rather than an adaptation to MedServe's specific situation.

### 2. Organizational viability

- **Excellent:** The plan accounts for each squad's attitude, capacity, and constraints. Resistance strategies are specific to the individuals involved (Jake, Dr. Chen's limited availability, Squad Gamma's demoralization). The 20% time allocation is realistically distributed across training, practice, and delivery work.
- **Proficient:** The plan generally accounts for organizational realities. Most resistance strategies are sensible. Resource allocation is mostly realistic.
- **Needs improvement:** The plan ignores organizational dynamics. It assumes everyone will cooperate fully. It overcommits squad time or underestimates resistance. It treats all three squads the same despite their very different starting points.

### 3. Risk control and governance

- **Excellent:** The plan identifies specific risks for each squad and provides concrete mitigation strategies. Healthcare-specific risks (patient safety, regulatory compliance, clinical accuracy) are given appropriate weight. The governance structure balances quality assurance with team autonomy. Decision rights are clearly defined.
- **Proficient:** Major risks are identified with reasonable mitigations. Healthcare considerations are present. Governance is defined but could be more specific.
- **Needs improvement:** Risk identification is generic or absent. Healthcare-specific risks are underweighted (this is a healthcare company -- patient safety is paramount). Governance is either too heavy (bureaucratic) or too light (no meaningful quality gates).

### 4. Potential for measurable impact

- **Excellent:** Success criteria are specific, measurable, and differentiated by squad. Metrics are connected to MedServe's business outcomes (patient safety, claim accuracy, regulatory compliance). The attribution model is credible. Baseline establishment is practical given each squad's current data availability.
- **Proficient:** Success criteria are mostly measurable. Metrics cover the three layers (learning, technical, business). Attribution is attempted.
- **Needs improvement:** Success criteria are vague ("improve quality"). Metrics are disconnected from business outcomes. No attribution model. Baselines are not established.

### 5. Stakeholder engagement

- **Excellent:** The stakeholder map is comprehensive and the engagement strategies are tailored to each person's concerns, motivations, and influence. The plan uses supporters (Maria, Tom) to build momentum and addresses skeptics (Jake) with specific, credible strategies. Dr. Chen's limited availability is handled with a practical plan.
- **Proficient:** Major stakeholders are identified with reasonable engagement strategies. Supporter and skeptic dynamics are recognized.
- **Needs improvement:** Stakeholders are listed but not analyzed. Engagement strategies are generic. Key dynamics (Jake's resistance, Dr. Chen's scarcity) are not addressed.

### 6. Adaptability and learning

- **Excellent:** The plan includes explicit decision points where the approach may change based on data. Phase transitions include go/no-go criteria. The plan describes what to do if things go wrong (a squad falls behind, a key person leaves, a major incident occurs). The plan improves itself -- it includes retrospectives and adjustment mechanisms.
- **Proficient:** The plan acknowledges that adaptation may be needed. Some contingency thinking is present.
- **Needs improvement:** The plan is rigid. It assumes everything will go as planned. There are no contingency plans, no decision points, and no learning mechanisms.

---

## Submission format

Organize your deliverables as a single document with six clearly labeled sections. Use headings, subheadings, and tables where appropriate to make the plan scannable and actionable.

Target length: 3,000 to 5,000 words total across all six deliverables. Longer is not better -- a concise plan that covers everything is stronger than a verbose plan that repeats itself.

Before submitting, review your plan against this checklist:

- Does each squad's plan reflect their specific maturity level and team dynamics?
- Are the named stakeholders (Dr. Chen, Jake, Maria, Tom) each addressed by name with specific engagement strategies?
- Do the success criteria use specific numbers, not vague adjectives?
- Is the timeline realistic given one SSA Lead plus two practitioners and 20% squad time?
- Does the plan address healthcare-specific concerns (patient safety, clinical accuracy, regulatory compliance) with appropriate seriousness?
- Would you be confident presenting this plan to a CTO and defending every choice you made?

---

## Key takeaways

1. **Real rollout is messy.** Three squads with three different starting points, three different attitudes, and three different business pressures. Your plan must work in this complexity, not ignore it.

2. **People determine success.** The technical plan is important, but the stakeholder engagement plan is more important. A technically perfect plan that ignores Jake's resistance or Dr. Chen's limited availability will fail.

3. **Healthcare demands extra rigor.** Patient safety is not just a nice-to-have. In a healthcare company, SSA quality practices are directly connected to patient outcomes. Your plan should reflect this gravity.

4. **Measure from the start.** If you do not establish baselines in Phase 1, you cannot prove impact in Phase 3. Plan your measurement strategy alongside your adoption strategy, not after it.

5. **Plan for adaptation.** No plan survives contact with reality unchanged. The best plans include explicit mechanisms for learning and adjusting as new information emerges.
