---
sidebar_position: 5
sidebar_label: "Application A — Launch plan"
---

# Application A — Launch plan

## Objective

In this application, you will produce a complete **launch plan** for the AI system you have been developing throughout this course. This document transforms your architecture, evaluation framework, and governance controls into a structured plan for putting the system in front of real users and delivering real value.

This is the bridge between design and reality. Everything you have built across eight modules converges here.

---

## Why this matters

Most AI projects die in the gap between "it works in development" and "it works in production." The prototype impresses stakeholders. The demo gets applause. And then... nothing. The system never launches, or it launches poorly, or it launches and nobody uses it.

The reason is almost always the same: nobody planned the launch.

**Everyday analogy:** think about opening a school. You have hired excellent teachers, designed a great curriculum, built a beautiful building, and stocked the library. But you have not enrolled students, hired administrative staff, set up a transportation system, communicated with parents, arranged meal service, or established safety protocols. On the first day, 200 students arrive and there are no buses, no lunches, and no one at the front desk. The teaching quality is irrelevant — the school cannot function.

A launch plan prevents this. It answers every question that the architecture does not: who are the first users? How do they get access? What do they see on day one? What happens when something goes wrong? How do you know if it is working? Who makes the decision to expand or shut down?

---

## The assignment

Produce a complete launch plan for your AI system. Use the system you have been building through the course, or choose one of the following scenarios:

**Option 1: Your course project.** Use the system you have been designing, building, and evaluating throughout Modules 1-7. This is the recommended option — your launch plan will reference specific artifacts you have already created.

**Option 2: A workplace system.** If you have a real AI system at work that is approaching production readiness, create a launch plan for it.

**Option 3: A provided scenario.** Choose one:

- **Scenario A:** A legal research assistant that helps paralegals find relevant case law, summarize rulings, and identify precedents. The law firm has 40 paralegals across 3 offices.
- **Scenario B:** A municipal service request classifier that reads citizen complaints (potholes, noise, trash, permits) and routes them to the correct department with priority levels. The city receives 500+ requests daily.
- **Scenario C:** An educational tutoring assistant for a university's introductory statistics course. 800 students per semester, needing help with concepts, problem-solving, and exam preparation.

---

## Document structure

Your launch plan should contain the following eight sections.

### Section 1: Launch summary (half page)

A concise overview that anyone — from an executive to a new team member — can read and understand.

**Include:**

> **System name:** [Name]
>
> **One-sentence purpose:** [What it does, for whom, and why]
>
> **Launch date target:** [Date or date range]
>
> **Launch type:** [Pilot / Soft launch / Full launch]
>
> **Initial user group:** [Who gets access first, and how many]
>
> **Key success metric:** [The single most important number that tells you if the launch is working]
>
> **Go/no-go decision maker:** [Name and role of the person who decides if launch proceeds]

### Section 2: Value proposition and user definition (one page)

Define who your users are and why they should care about this system.

**For each user segment, specify:**

| Element | Description |
|---|---|
| **Who they are** | Role, context, typical day |
| **What problem they have today** | The specific pain point this system addresses |
| **How they solve it today** | Current workaround (manual process, existing tool, etc.) |
| **What the system offers them** | The specific improvement — stated in terms they care about |
| **How they will access it** | Interface, integration point, workflow change |
| **What changes for them** | How their daily work is different after launch |

**Include a "jobs to be done" analysis:** what are the top 3-5 tasks your system performs, stated as outcomes the user wants to achieve?

### Section 3: Feature scope for launch (one page)

Not everything launches on day one. Define what is included and what is explicitly excluded.

**Include a feature classification table:**

| Feature | Status | Reliability | Rationale |
|---|---|---|---|
| [Feature 1] | Launch (included) | 93% accuracy | Core value proposition, high confidence |
| [Feature 2] | Launch (included) | 89% accuracy | Essential for user workflow, with human fallback |
| [Feature 3] | Deferred to Q2 | 76% accuracy | Reliability too low for production; needs improvement |
| [Feature 4] | Deferred indefinitely | Unknown | Governance review not complete |

**For each included feature, specify:**
- The capability in user-facing terms
- The reliability target (accuracy, error rate, or other measure)
- The fallback behavior when the AI is uncertain or wrong
- The human touchpoint (where a human reviews, overrides, or intervenes)

**For each deferred feature, specify:**
- Why it is deferred
- What needs to happen before it can launch
- Estimated timeline (if known)

### Section 4: Launch sequence and timeline (one page)

A step-by-step plan from "today" to "launch day" and the first 30 days after.

**Pre-launch (T-minus 4 weeks to T-minus 1 week):**
- Technical readiness checks
- Staging environment validation
- User acceptance testing with pilot group
- Training and documentation completion
- Governance review and sign-off
- Communication plan execution (announcing to stakeholders)

**Launch week (T-zero):**
- Day-by-day plan for the launch week
- Who is on-call and what their responsibilities are
- Monitoring focus areas for the first 72 hours
- Communication cadence (daily status updates to stakeholders)

**Post-launch (T-plus 1 to T-plus 30):**
- Weekly review cadence
- Feedback collection mechanism
- Performance evaluation schedule
- Decision points for expanding or adjusting

**Include a milestone table:**

| Milestone | Target date | Dependency | Owner |
|---|---|---|---|
| Staging environment ready | [Date] | Infrastructure team | [Name] |
| Pilot user testing complete | [Date] | Pilot group availability | [Name] |
| Governance sign-off | [Date] | Security review completion | [Name] |
| User training delivered | [Date] | Documentation complete | [Name] |
| Launch day | [Date] | All above milestones met | [Name] |
| 30-day review | [Date] | 30 days of production data | [Name] |

### Section 5: Risk register and mitigation (one page)

What could go wrong during or after launch, and what is your plan for each risk?

**Include at least 8 risks across these categories:**

**Technical risks:** system unavailable, latency too high, integration failures

**Semantic risks:** AI produces wrong answers, misclassifies inputs, hallucinates information

**User adoption risks:** users do not trust the system, users find it confusing, users bypass it entirely

**Organizational risks:** stakeholder priorities change, budget is reduced, key team member leaves

**For each risk:**

| Risk | Category | Likelihood | Impact | Mitigation | Trigger for escalation |
|---|---|---|---|---|---|
| [Risk] | [Category] | H/M/L | H/M/L | [What you will do] | [When you escalate] |

### Section 6: Stakeholder communication plan (half page)

Who needs to know about the launch, what do they need to know, and when?

**Communication matrix:**

| Stakeholder | Message | Channel | Timing | Owner |
|---|---|---|---|---|
| Executive sponsor | Launch readiness and success criteria | Briefing | T-minus 1 week | [Name] |
| End users | What the system does and how to use it | Training session + guide | T-minus 3 days | [Name] |
| Support team | How to handle user questions and issues | Workshop + runbook | T-minus 1 week | [Name] |
| Compliance team | Governance attestation and monitoring plan | Report | T-minus 2 weeks | [Name] |
| Affected teams | How their workflow changes | Team meeting | T-minus 1 week | [Name] |

### Section 7: Success criteria and measurement (half page)

How will you know if the launch succeeded? Define specific, measurable criteria.

**30-day success criteria:**

| Metric | Target | Measurement method | Review frequency |
|---|---|---|---|
| User adoption rate | [X]% of target users active | Usage tracking | Weekly |
| Task completion rate | [X]% of tasks completed without human override | System logs | Daily |
| User satisfaction | [X]/5 average rating | Post-interaction survey | Weekly |
| Accuracy (SLO) | Above [X]% | Automated evaluation + human audit | Weekly |
| Incident rate | Fewer than [X] S1/S2 incidents | Incident tracking | Ongoing |
| Cost per outcome | Below $[X] | Cost monitoring | Weekly |

**Decision framework:**

| Outcome | Criteria | Action |
|---|---|---|
| **Launch succeeds** | All success metrics met or exceeded for 30 days | Proceed to expansion phase |
| **Launch needs adjustment** | 1-2 metrics below target, trending positive | Investigate root cause, adjust, continue monitoring |
| **Launch fails** | 3+ metrics below target, or any safety violations | Pause launch, conduct review, decide to fix or roll back |

### Section 8: Go/no-go checklist (half page)

The final pre-launch verification. Every item must be checked before launch proceeds.

**Technical readiness:**
- [ ] System deployed to production environment
- [ ] All SLOs verified in staging
- [ ] Monitoring and alerting configured and tested
- [ ] Fallback mechanisms tested and verified
- [ ] Rollback procedure tested and documented

**Operational readiness:**
- [ ] On-call rotation established
- [ ] Runbooks written and reviewed
- [ ] Incident response process confirmed
- [ ] Support team trained and briefed

**Governance readiness:**
- [ ] Security review completed and signed off
- [ ] Privacy impact assessment completed
- [ ] Compliance requirements verified
- [ ] Guardrails tested in production-like conditions

**User readiness:**
- [ ] User training materials prepared
- [ ] Pilot testing completed with representative users
- [ ] Feedback collection mechanism in place
- [ ] User support channel established

**Business readiness:**
- [ ] Success criteria defined and agreed with stakeholders
- [ ] Budget approved for launch and first quarter of operations
- [ ] Executive sponsor briefed and aligned
- [ ] Go/no-go decision documented

---

## Deliverable

A document (5-8 pages) containing all eight sections:

- [ ] Launch summary
- [ ] Value proposition and user definition
- [ ] Feature scope for launch (included vs. deferred)
- [ ] Launch sequence and timeline with milestones
- [ ] Risk register with at least 8 risks and mitigations
- [ ] Stakeholder communication plan
- [ ] Success criteria and measurement framework
- [ ] Go/no-go checklist

---

## Evaluation criteria

| Criterion | What "good" looks like |
|---|---|
| **Clarity and completeness** | A new team member could read the plan and understand exactly what is being launched, for whom, when, and how success is measured. Nothing is left ambiguous. |
| **Realism** | The plan is achievable. Timelines are reasonable. Risks are honest, not downplayed. Success criteria are specific, not aspirational. |
| **User-centeredness** | The plan is organized around user value, not technical features. You demonstrate understanding of who uses the system and what they care about. |
| **Risk awareness** | Risks span technical, semantic, organizational, and user adoption categories. Mitigations are specific and actionable. You have planned for the system failing, not just succeeding. |
| **Governance integration** | Security, compliance, and ethical considerations are woven into the plan — not a checkbox at the end. |

---

## Tips for success

- **Write for the skeptic.** Your launch plan should convince someone who is cautious about AI that this launch is well-considered, responsible, and prepared for problems. If the plan only works when everything goes right, it is not a plan — it is a wish.
- **Be specific about the first day.** What does a user see when they first access the system? What is their first action? What happens when it goes right? What happens when it goes wrong? The first experience shapes everything.
- **Include the "what if we fail" scenario.** The best launch plans include a clear decision framework for pausing, adjusting, or rolling back. This is not pessimism — it is professionalism. Knowing when to stop is as important as knowing when to start.
- **Reference your earlier work.** Your ontology (Module 2), contracts (Module 2-3), evaluation framework (Module 6), and governance controls (Module 7) are the foundation of this launch plan. Reference them explicitly. Show how the launch plan connects to the architecture.
- **Think about change management.** If this system changes how people work, the launch plan must address the human side: training, support, communication, and feedback. A technically perfect launch that alienates users is a failed launch.
