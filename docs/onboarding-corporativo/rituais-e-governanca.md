---
sidebar_position: 5
title: Rituals and Governance
---

# Rituals and Governance

## The sports team practice schedule analogy

A professional sports team does not succeed through talent alone. Talented players who never practice together, never review game film, and never refine their strategies will lose to a less talented team that practices relentlessly. The difference is discipline -- the recurring rhythms of preparation, review, and improvement that convert individual skill into collective performance.

Think about what a professional basketball team's week looks like. There are daily practices focused on specific skills. There are film sessions where the team reviews past games, identifying what worked and what did not. There are strategy meetings before each game where the coaching staff adapts the game plan to the upcoming opponent. There are post-game reviews where the team processes what just happened while it is still fresh. And there is a preseason where the team establishes its identity, its playbook, and its standards for the year.

None of these activities are optional. None of them are "extra." They are the operating system of a high-performing team. Without them, even the best players underperform.

SSA rituals serve the same function. They are the recurring practices that convert individual SSA skill into organizational AI quality. Without them, SSA adoption is a training program that fades after the workshops end. With them, SSA adoption is a living, self-improving discipline that gets stronger over time.

---

## Weekly rituals

Weekly rituals are the heartbeat of SSA practice. They create consistent touchpoints for quality improvement, knowledge sharing, and early problem detection. Each one should be short, focused, and valuable enough that people want to attend -- not just feel obligated.

### Architecture Clinic

**What it is:** A 60-minute peer review session where one or two teams present a current architecture challenge and receive structured feedback from SSA peers.

**Who attends:** All SSA practitioners and leads. Domain experts from the presenting team are welcome and encouraged.

**Format:**

1. **Presenter sets context** (10 minutes): What is the system? What domain does it serve? What is the specific challenge?
2. **Architecture walkthrough** (15 minutes): Walk through the relevant parts of the architecture -- the ontology structure, the semantic contracts, the agent topology, the eval results. Focus on the area where feedback is needed.
3. **Structured feedback** (25 minutes): Attendees ask questions and offer suggestions. Use the "what works, what concerns me, what I would try" framework to keep feedback constructive.
4. **Action items** (10 minutes): The presenter captures the top three insights and commits to specific follow-up actions.

**Why it works:** The Architecture Clinic provides something that individual practitioners cannot get on their own: diverse perspectives. A practitioner working in customer support sees patterns differently than one working in financial compliance. When they review each other's work, both benefit. The customer support practitioner learns about rigorous constraint handling from the compliance practitioner. The compliance practitioner learns about conversational flow design from the support practitioner.

**Common failure modes:**
- The clinic becomes a lecture instead of a dialogue. Fix this by enforcing the feedback structure and limiting presentation time.
- The same people always present. Fix this by rotating presenters and making it a norm that every team presents at least once per quarter.
- Feedback is too polite to be useful. Fix this by modeling direct, constructive feedback from the SSA Lead and by creating a safe environment where "I have a concern about this" is welcomed rather than penalized.

### Eval review

**What it is:** A 45-minute session focused specifically on evaluation results across teams. This is where the organization tracks whether AI systems are getting better or worse, and identifies emerging quality issues before they reach production.

**Who attends:** SSA practitioners and leads. Engineering partners who maintain eval infrastructure.

**Format:**

1. **Dashboard review** (15 minutes): Walk through the organization-wide eval dashboard. Which systems improved this week? Which regressed? Are there any new red flags?
2. **Deep dive** (20 minutes): Select one or two notable trends for deeper analysis. Why did System X regress on semantic accuracy? What changed? Is it a data issue, a prompt change, or a genuine capability limitation?
3. **Action items** (10 minutes): Assign investigation or remediation tasks for any concerning trends.

**Why it works:** Regular eval review creates an early warning system. Issues that would otherwise be discovered through customer complaints or production incidents are caught when they are small and easy to fix. It also creates visibility and accountability -- when everyone knows their eval results will be reviewed weekly, they invest more in evaluation quality.

### Standards improvement

**What it is:** A 30-minute session focused on evolving the organization's SSA standards -- templates, patterns, guidelines, and best practices.

**Who attends:** SSA leads and any practitioners who have proposed or are working on standards changes.

**Format:**

1. **Incoming proposals** (10 minutes): Review any new standards proposals submitted since the last session. Decide whether to accept, modify, or defer each one.
2. **In-progress updates** (10 minutes): Check on standards currently being developed or revised. Are they on track? Do they need input from additional stakeholders?
3. **Retirement review** (10 minutes): Identify any existing standards that are outdated, unused, or counterproductive. Mark them for retirement.

**Why it works:** Standards that are not actively maintained become stale, which leads to one of two bad outcomes: people follow outdated standards (producing suboptimal work), or people ignore standards entirely (producing inconsistent work). A weekly improvement cadence keeps standards alive and relevant.

---

## Monthly rituals

Monthly rituals operate at a higher level than weekly ones. They focus on trends, cross-team coordination, and stakeholder communication -- things that are too broad for a weekly session and too urgent for a quarterly one.

### Quality retrospective

**What it is:** A 90-minute session where the SSA practice reflects on the past month's quality performance, identifies systemic issues, and plans improvements.

**Who attends:** All SSA practitioners and leads, plus engineering partners and product managers from teams with significant quality events.

**Format:**

1. **Monthly metrics review** (20 minutes): review key quality metrics for the past month -- eval pass rates, incident counts, architecture review completion rates, eval suite coverage.
2. **Incident analysis** (30 minutes): for each significant quality incident in the past month, review the post-mortem. What was the root cause? Was it a gap in the ontology, the contracts, the eval suite, or the safety controls? What has been done to prevent recurrence?
3. **Pattern identification** (20 minutes): look across incidents and metrics for systemic patterns. Are multiple teams struggling with the same type of problem? Is there a common gap that a new standard or training module could address?
4. **Improvement commitments** (20 minutes): agree on two or three specific improvements to pursue in the coming month. Assign owners and deadlines.

### Cross-team sync

**What it is:** A 60-minute session where SSA practitioners from different teams share learnings, coordinate on shared concerns, and align on cross-cutting initiatives.

**Who attends:** One SSA representative from each active team, plus SSA leads.

**Format:**

1. **Round-robin updates** (30 minutes, 3-5 minutes per team): each team shares their most interesting learning, their biggest challenge, and any request for help from other teams.
2. **Cross-cutting topics** (20 minutes): discuss issues that affect multiple teams -- shared ontology terms that need alignment, cross-system evaluation scenarios, common integration patterns.
3. **Resource coordination** (10 minutes): identify opportunities for teams to help each other -- sharing evaluation cases, lending domain expertise, coordinating on shared dependencies.

### Stakeholder reporting

**What it is:** A structured monthly report to leadership and business stakeholders on the state of SSA practice and AI quality across the organization.

This is not a meeting -- it is a document or dashboard update. Keeping it written rather than meeting-based respects stakeholder time and creates a permanent record.

**Content:**

- Summary of key quality metrics and trends (improving, stable, declining)
- Notable achievements: new architectures deployed, quality milestones reached, incidents prevented
- Concerns: emerging risks, capability gaps, resource constraints
- Upcoming priorities: what the SSA practice plans to focus on next month
- One specific impact story: a concrete example of how SSA practices produced measurable business value

**Why it works:** Regular stakeholder reporting builds sustained organizational support. When leadership sees consistent evidence of SSA value, they continue investing. When they see problems reported proactively (rather than discovered in a crisis), they trust the SSA practice to manage risk effectively.

---

## Quarterly rituals

Quarterly rituals are strategic. They set direction, assess progress, and align SSA practice with evolving business priorities.

### Strategy review

**What it is:** A half-day session where SSA leadership and business stakeholders review the SSA strategy and adjust it based on business developments, organizational changes, and lessons learned.

**Who attends:** SSA Lead, executive sponsor, heads of engineering and product, and any business leaders responsible for major AI initiatives.

**Agenda:**

1. **Business context update** (30 minutes): what has changed in the business environment? New priorities? New regulations? New competitors? New customer needs?
2. **SSA impact review** (45 minutes): review the quarter's SSA impact metrics. Where did SSA practices produce clear business value? Where did they fall short? Why?
3. **Maturity assessment** (30 minutes): review the organization's SSA maturity using the maturity model. How has maturity progressed since last quarter? What is blocking further progress?
4. **Strategy adjustment** (45 minutes): based on the above, adjust SSA priorities for the next quarter. Which domains should receive more SSA investment? Which practices need strengthening? What new capabilities should be developed?
5. **Resource planning** (30 minutes): confirm resource allocation -- training budget, headcount, tooling investment -- for the next quarter.

### Maturity assessment

**What it is:** A structured evaluation of each team's SSA maturity, conducted quarterly using the maturity model from the Adoption Model section.

**Process:**

1. Each team self-assesses their maturity level using a standardized rubric covering: ontology completeness, contract rigor, eval suite coverage, safety controls, governance participation, and knowledge sharing.
2. The SSA Lead reviews self-assessments, calibrates across teams, and identifies organizational patterns.
3. Results are shared with teams along with specific recommendations for advancing to the next maturity level.

**Why it matters:** Maturity assessment makes progress visible. Teams that have been quietly improving get recognized. Teams that are stuck get targeted support. The organization can track its overall trajectory and identify systemic barriers.

### Roadmap planning

**What it is:** A working session where SSA leads plan the next quarter's SSA roadmap -- which teams to onboard, which standards to develop, which capabilities to build, and which problems to solve.

**Output:** A one-page quarterly roadmap document with:
- Priority initiatives (maximum five)
- For each initiative: objective, owner, key milestones, dependencies, and success criteria
- Resource allocation: who is working on what
- Risk register: what could go wrong and how to mitigate it

---

## Governance structure

Rituals create rhythm. Governance creates clarity about who decides what, and how decisions are made.

### SSA Guild

**What it is:** The community of all SSA-certified practitioners in the organization. The Guild is not a decision-making body -- it is a professional community that maintains standards, shares knowledge, and advocates for SSA quality.

**Responsibilities:**
- Maintain the pattern catalog and template library
- Propose and review standards changes
- Organize the community of practice activities
- Mentor new practitioners
- Represent SSA perspectives in cross-functional discussions

**Membership:** All SSA-certified practitioners are Guild members. Participation is expected, not optional. Active participation (presenting at clinics, reviewing standards, mentoring) is a recertification requirement.

### Architecture Review Board (ARB)

**What it is:** A small group of senior SSA practitioners and leads who make binding decisions about architectural standards, approve significant architecture changes, and resolve architectural disputes.

**Composition:** SSA Lead (chair), two to three senior practitioners, one engineering partner, one risk/compliance partner. Rotate practitioner seats annually to prevent stagnation.

**Decision rights:**

- **The ARB decides:** approval of new architectural standards, approval of significant deviations from existing standards, resolution of cross-team architectural conflicts, assessment of architecture readiness for production release.
- **The ARB advises (but does not decide):** team-level architecture design choices (teams have autonomy within standards), tooling selection (engineering leads decide), business prioritization (product and business leads decide).
- **The ARB escalates:** changes affecting regulatory compliance (to legal/compliance), changes affecting security posture (to security team), changes requiring additional budget (to executive sponsor).

### Decision rights matrix

A decision rights matrix clarifies who has authority over different types of decisions. This prevents both bottlenecks (where everything needs approval from a small group) and chaos (where nobody knows who decides).

| Decision type | Team SSA decides | ARB decides | Executive sponsor decides |
|---|---|---|---|
| Architecture design for a project | Yes | Advises | No |
| Deviation from standards | Proposes | Approves | No |
| New standard adoption | Proposes | Approves | Informed |
| Production release readiness | Recommends | Approves | No |
| SSA budget allocation | Proposes | Recommends | Approves |
| New tool adoption | Recommends | Advises | Approves |
| Incident response actions | Executes | Reviews post-mortem | Informed if critical |

---

## Standards management lifecycle

Standards are living documents. They need a clear lifecycle to remain useful without becoming bureaucratic overhead.

### How to propose a standard

Any SSA Guild member can propose a new standard or a change to an existing one. The proposal process is intentionally lightweight:

1. **Write a one-page proposal** covering: what problem does this standard solve? What does the standard specify? What is the evidence that it works (from practice or from external research)? What are the known limitations?
2. **Submit to the weekly standards improvement session** for initial review.
3. **Incorporate feedback** and submit the refined proposal to the ARB for approval.

### How to review a standard

The ARB reviews proposals against four criteria:

- **Clarity.** Is the standard specific enough that two different practitioners would implement it the same way?
- **Value.** Does the standard solve a real problem that multiple teams face?
- **Feasibility.** Can teams adopt the standard without unreasonable effort or disruption?
- **Testability.** Can compliance with the standard be verified through architecture review or evaluation?

### How to approve a standard

If the proposal meets all four criteria, the ARB approves it. Approved standards enter a 30-day trial period where adopting teams provide feedback on practical applicability. After the trial, the ARB confirms, modifies, or withdraws the standard based on feedback.

### How to retire a standard

Standards become obsolete as technology, practices, and organizational context evolve. Any Guild member can propose retirement. The ARB reviews retirement proposals quarterly. A standard is retired when:

- It addresses a problem that no longer exists
- It has been superseded by a better standard
- It is consistently ignored because teams have found a better approach
- It creates more overhead than value

Retired standards are archived (not deleted) so that the reasoning behind them remains accessible.

---

## Getting started

If you are implementing SSA rituals for the first time, do not try to start everything at once. Begin with the three weekly rituals -- Architecture Clinic, eval review, and standards improvement -- and the monthly quality retrospective. These four rituals provide the essential rhythm of practice, review, and improvement.

Add the remaining monthly and quarterly rituals as your SSA practice matures and as the number of active SSA teams grows. By the time you have more than five active SSA teams, you should have all rituals in place.

The governance structure -- Guild, ARB, decision rights matrix -- should be established by the end of the first 90-day cycle, but it can start informally. The SSA Lead makes decisions initially. The ARB forms when there are enough senior practitioners to staff it. The Guild emerges naturally as the community of certified practitioners grows.

---

## Key takeaways

1. **Rituals are the operating system of SSA practice.** Without them, SSA adoption is a training event that fades. With them, it is a self-improving discipline.

2. **Weekly rituals create rhythm.** Architecture Clinic, eval review, and standards improvement keep quality improving continuously.

3. **Monthly rituals create visibility.** Quality retrospectives, cross-team sync, and stakeholder reporting ensure that problems are caught early and value is communicated consistently.

4. **Quarterly rituals create direction.** Strategy review, maturity assessment, and roadmap planning align SSA practice with evolving business priorities.

5. **Governance creates clarity.** The Guild, the ARB, and the decision rights matrix ensure that everyone knows who decides what and how decisions are made.

6. **Standards are living documents.** The propose-review-approve-retire lifecycle keeps standards useful without letting them become stale or bureaucratic.
