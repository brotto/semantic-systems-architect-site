---
sidebar_position: 4
title: Indoor Academy
---

# Internal SSA Academy

## The corporate university analogy

Large organizations have long understood that strategic capabilities cannot be built through external training alone. That is why many of them create corporate universities -- internal learning institutions that develop the specific skills their business needs, in the specific context of how their business operates.

Think about how a hospital trains its residents. Medical school provides the theoretical foundation, but the hospital's own residency program teaches how medicine is practiced here -- with these patient populations, these equipment sets, these protocols, these specialists. A resident who trained at Hospital A is competent, but they still need to learn how things work at Hospital B.

An internal SSA Academy serves the same purpose. The SSA curriculum (the main learning track on this site) provides the conceptual and technical foundation. Your internal academy teaches how SSA is practiced at your company -- with your domains, your tools, your standards, your risk appetite, your specific challenges.

Without an internal academy, every new hire or role transition requires ad-hoc mentoring from whoever happens to be available. Quality is inconsistent. Knowledge is fragile -- concentrated in a few people's heads rather than encoded in a sustainable learning system. With an internal academy, you have a repeatable machine that converts capable professionals into effective SSA practitioners in your specific context.

---

## Three learning tracks

The internal academy is organized into three tracks, each targeting a different audience and depth level. Every track builds on the previous one, and completion of each track corresponds to an internal certification level.

### Track 1: Foundations (mandatory for all)

**Audience:** Everyone who works on or with AI systems -- developers, product managers, designers, QA engineers, data analysts, and business stakeholders. This track creates a shared language and shared awareness across the organization.

**Goal:** Understand what SSA is, why it matters, and how to participate in SSA practices as a team member (even if you are not a practicing SSA).

**Topics:**

- What is semantic architecture and why it replaces ad-hoc prompting
- Core SSA concepts: ontology, semantic contracts, eval suites, context engineering
- Your company's SSA principles and quality standards
- How to read and provide feedback on an architecture spec
- How to participate in an architecture review
- How to write good evaluation cases from a domain expert perspective
- Your company's AI safety standards and when to escalate concerns

**Duration:** 16 hours total, delivered over 2 weeks

**Format:**

- 4 live sessions (2 hours each): concept introduction, company context, Q&A
- 4 self-paced modules (1 hour each): core concept deep-dives with quizzes
- 1 group exercise (4 hours): collaborative architecture review of a real company project

**Assessment:** Written quiz covering core concepts (80% pass threshold) plus participation in the group architecture review exercise.

### Track 2: Practitioner (architecture and operation)

**Audience:** Team members who will actively design and maintain SSA architectures -- typically senior developers, tech leads, or dedicated SSA practitioners.

**Goal:** Be able to independently design, implement, evaluate, and maintain SSA architectures for projects within your domain.

**Topics:**

- Domain decomposition: how to analyze a business domain and extract its semantic structure
- Ontology construction: entity identification, relationship mapping, constraint definition, vocabulary standardization
- Semantic contract design: behavioral specifications, boundary conditions, error handling, safety constraints
- Agent architecture: role design, orchestration topology, communication protocols
- Context engineering: context package design, information hierarchy, prompt architecture
- Evaluation design: eval suite construction, baseline establishment, regression testing, metric selection
- Operational SSA: monitoring semantic quality, incident detection, post-mortem analysis
- Your company's template library: how to use and contribute to shared templates
- Your company's evaluation infrastructure: how to run evals, track results, and identify regressions

**Duration:** 40 hours total, delivered over 4 weeks

**Format:**

- 8 live workshops (2 hours each): hands-on practice with real company cases
- 4 lab sessions (3 hours each): building complete SSA architectures under mentor supervision
- 4 pair architecture reviews (1.5 hours each): reviewing a peer's architecture and receiving feedback on your own
- 1 capstone project (8 hours): designing a complete SSA architecture for a real company initiative

**Assessment:** Capstone project evaluated by an SSA Lead against the practitioner rubric (covering ontology quality, contract completeness, eval suite rigor, safety coverage, and documentation clarity). Must achieve "proficient" rating in all categories.

### Track 3: Lead (governance and scale)

**Audience:** Experienced SSA practitioners who will lead SSA practice for a team, domain, or the entire organization.

**Goal:** Be able to set standards, design governance structures, mentor practitioners, measure impact, and drive SSA adoption at organizational scale.

**Topics:**

- Standards management: how to propose, review, approve, and retire architectural standards
- Governance design: decision rights, review processes, escalation paths, compliance integration
- Team architecture: designing SSA team structure for different organizational models (embedded, centralized, hybrid)
- Mentoring and coaching: how to develop SSA practitioners through code review, architecture review, and pair work
- Impact measurement: connecting SSA practices to business outcomes through attribution models
- Change management: overcoming resistance, building champions, sustaining momentum
- Cross-domain integration: managing ontology consistency across domains, resolving semantic conflicts
- Advanced evaluation: adversarial testing, cross-system evaluation, evaluation of evaluation suites
- Strategic planning: SSA roadmap development, resource planning, maturity assessment
- Stakeholder communication: translating SSA quality into business language for executives, board members, and clients

**Duration:** 32 hours total, delivered over 4 weeks (can overlap with active practitioner work)

**Format:**

- 4 seminars (2 hours each): case study analysis of SSA adoption at different organizations
- 4 leadership labs (3 hours each): practicing governance design, stakeholder communication, and mentoring scenarios
- 2 shadow sessions (4 hours each): observing and debriefing an SSA Lead during real architecture reviews and governance meetings
- 1 strategic project (8 hours): designing the SSA adoption plan for a new domain or team

**Assessment:** Strategic project evaluated by the SSA Lead or external SSA advisor. Must demonstrate strategic thinking, governance design capability, and ability to connect SSA practices to business outcomes. Additionally, the candidate must have at least 3 months of practitioner experience with documented positive feedback from mentored practitioners.

---

## Learning mechanisms

Beyond the formal tracks, the internal academy uses three ongoing learning mechanisms that sustain skill development after formal training ends.

### Cohort-based training

Every training cycle forms a cohort -- a group of 8 to 12 people who go through the same track together. Cohorts create peer relationships, shared experience, and mutual accountability that persist long after the training ends.

Think of it like a college class. You might forget what the professor said, but you remember the study group. The people you struggled alongside become your professional network within the company. When you encounter a tricky ontology problem six months later, you message your cohort group chat and get three perspectives in an hour.

Cohort design principles:

- **Mix teams.** Each cohort should include people from different teams and domains. Cross-pollination is one of the most valuable side effects of cohort training.
- **Consistent pace.** The entire cohort progresses together. This prevents people from falling behind and ensures the group exercises are meaningful.
- **Shared channel.** Create a dedicated communication channel for each cohort that persists after training. This becomes a support network.
- **Cohort presentations.** At the end of each track, cohorts present their capstone work to each other. This creates visibility and healthy quality standards.

### Pair architecture reviews

The single most effective learning mechanism in SSA is the pair architecture review -- two practitioners sitting down together to review one of their architectures in detail.

This works for the same reason code reviews work in software engineering, but amplified. Reviewing an architecture forces you to articulate your reasoning, which deepens your own understanding. Seeing someone else's architecture exposes you to different approaches, different domain challenges, and different ways of thinking about semantic structure.

Pair review protocol:

1. **Author presents** (15 minutes): walk through the architecture -- ontology, contracts, eval suite, key design decisions.
2. **Reviewer questions** (20 minutes): ask questions that probe reasoning, completeness, and consistency. Not "this is wrong" but "what happens when X?"
3. **Joint improvement** (15 minutes): together, identify the top three improvements and sketch solutions.
4. **Reflection** (10 minutes): what did each person learn from this review?

Schedule pair reviews every two weeks. Rotate partners so that every practitioner reviews with every other practitioner over time.

### Community of practice

The SSA Community of Practice (CoP) is a regular gathering of all SSA practitioners in the organization -- regardless of level or team. It serves as the connective tissue of the SSA practice, ensuring that knowledge, patterns, and improvements flow across team boundaries.

CoP activities:

- **Monthly meetup** (90 minutes): a case presentation (one practitioner shares a recent architecture challenge and how they solved it), followed by open discussion. This is the primary vehicle for pattern sharing.
- **Office hours** (weekly, 1 hour): an SSA Lead is available for drop-in questions and consultations. No appointment needed, no formal agenda. This low-friction format catches problems early.
- **Pattern proposals**: any practitioner can propose a new pattern for the shared catalog. The CoP reviews proposals, provides feedback, and votes on inclusion. This democratizes the evolution of organizational standards.
- **Reading group** (monthly): the CoP selects and discusses one article, paper, or case study related to SSA practice. This keeps the community connected to external developments and new ideas.

---

## Assessment and certification

Internal certification creates clear milestones, motivates continued learning, and provides the organization with a reliable signal of capability.

### Certification levels

**SSA Foundation Certified.** Has completed the Foundations track and passed the written assessment. This person understands SSA concepts and can participate meaningfully in architecture reviews and evaluation design.

**SSA Practitioner Certified.** Has completed the Practitioner track, passed the capstone evaluation, and has at least one successful SSA architecture delivered to production. This person can independently design and maintain SSA architectures within their domain.

**SSA Lead Certified.** Has completed the Lead track, passed the strategic project evaluation, has at least 6 months of practitioner experience, and has mentored at least two other practitioners. This person can lead SSA practice for a team or domain.

### Portfolio requirements

Certification is not just about completing courses. Each level requires a portfolio of evidence demonstrating applied capability:

- **Foundation:** participation records from the group architecture review exercise, plus the written quiz.
- **Practitioner:** the capstone architecture, at least 4 documented pair reviews (2 as author, 2 as reviewer), and one production SSA architecture with its eval suite.
- **Lead:** the strategic project, at least 3 documented mentoring sessions with feedback from mentees, and one governance artifact (standards proposal, review process design, or impact assessment) that was adopted by the organization.

### Recertification

Certifications are valid for 12 months. Recertification requires:

- Evidence of continued practice (at least 2 architecture reviews and 2 CoP participation records in the past year)
- Completion of any new required modules added since last certification
- A brief self-assessment of growth areas and learning goals for the next year

This is intentionally lightweight. The goal is to ensure continued engagement, not to create bureaucratic overhead.

---

## Sustaining the academy

An internal academy is not a one-time training event. It is a permanent organizational function that requires ongoing investment and maintenance.

### Instructor development

The academy needs instructors, and the best instructors are internal practitioners who combine SSA expertise with deep knowledge of the company context.

Instructor pipeline:

1. **Identify candidates.** Look for Lead-certified practitioners who are effective communicators and enjoy teaching. Technical depth alone is not enough -- the best SSA practitioners are not always the best teachers.
2. **Train the trainers.** Before someone teaches, they should co-facilitate at least one session with an experienced instructor. This apprenticeship model ensures quality while building capacity.
3. **Rotate instructors.** Do not let the same person teach every session. Rotation prevents burnout, brings diverse perspectives, and builds teaching capacity across the organization.
4. **Compensate the effort.** Teaching takes time away from delivery work. Ensure that managers account for teaching load in workload planning and that teaching is recognized in performance reviews.

### Content updates

SSA practices evolve. AI capabilities change. Company standards mature. The academy curriculum must evolve with them.

Update cadence:

- **After every training cycle:** collect participant feedback and instructor observations. Make minor adjustments to exercises, examples, and pacing.
- **Quarterly:** review the curriculum against current SSA standards and practices. Update any content that has become outdated. Add new topics that have emerged as important.
- **Annually:** conduct a comprehensive curriculum review. Assess whether the track structure still makes sense. Consider adding new tracks or restructuring existing ones based on organizational needs.

### Feedback loops

The academy should continuously improve based on three feedback sources:

1. **Participant satisfaction.** After each training module, collect a brief survey: Was this useful? Was the difficulty appropriate? What would you change? Track satisfaction trends over time.
2. **On-the-job performance.** After certification, track how well graduates perform in real SSA work. Do their architectures pass review? Do their eval suites catch issues? Are their teams more effective? This is the ultimate measure of academy quality.
3. **Business impact.** Connect academy graduates' work to business outcomes. Teams with certified SSAs should show measurable quality improvements. If they do not, the academy is teaching the wrong things or teaching the right things ineffectively.

Close the loop: share feedback results with instructors, adjust the curriculum accordingly, and communicate changes back to the organization. This demonstrates that the academy listens, learns, and improves -- which is exactly what it teaches SSA practitioners to do with their own systems.

---

## Key takeaways

1. **Three tracks, three audiences.** Foundations for everyone, Practitioner for builders, Lead for leaders. Each track has clear objectives, appropriate depth, and meaningful assessment.

2. **Formal training is the beginning, not the end.** Cohorts, pair reviews, and the community of practice sustain learning long after the classroom sessions are over.

3. **Certification means demonstrated capability, not just completed coursework.** Portfolios, production work, and mentoring evidence ensure that certification reflects real ability.

4. **The academy is a permanent function.** It needs instructors, content updates, and feedback loops to remain effective over time. Treat it as infrastructure, not as a project.

5. **Mix people across teams.** Cross-pollination through diverse cohorts is one of the academy's most valuable outputs, often more valuable than the formal curriculum itself.
