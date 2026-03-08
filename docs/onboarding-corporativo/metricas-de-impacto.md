---
sidebar_position: 6
title: Impact Metrics
---

# Impact Metrics

## The hospital quality metrics analogy

Consider how a good hospital measures its own quality. It does not rely on a single number. It uses three layers of metrics, each answering a different question:

- **Patient outcomes.** Are patients getting better? What is the mortality rate for specific procedures? What is the readmission rate? These are the ultimate measures -- they tell you whether the hospital is fulfilling its core mission.
- **Process metrics.** Are the processes that lead to good outcomes being followed? Are hand hygiene protocols observed? Is the surgical checklist completed? Are medications administered on time? These are leading indicators -- they predict outcomes before outcomes happen.
- **Learning metrics.** Is the hospital getting better over time? How many staff completed training this quarter? How quickly are new protocols adopted? Are post-incident reviews producing actionable improvements? These measure the hospital's capacity to improve.

If a hospital only measured patient outcomes, it would detect problems only after patients suffered. If it only measured process compliance, it would have no idea whether its processes actually produced good outcomes. If it only measured learning activity, it would know that people attended training but not whether they applied what they learned.

The power is in the combination. A hospital that sees rising readmission rates (outcome), declining hand hygiene compliance (process), and stalled training completion (learning) knows exactly what is happening and where to intervene: restart training, reinforce process compliance, and outcomes will follow.

SSA impact measurement works the same way. You need three layers -- learning, technical, and business -- connected through clear attribution so you can trace improvements (or declines) from cause to effect.

---

## Learning metrics

Learning metrics measure the effectiveness of your SSA Academy and development programs. They answer the question: "Is our organization building SSA capability as planned?"

### Completion rate

**What it measures:** The percentage of targeted staff who have completed each academy track within the planned timeline.

**How to calculate:** (Number of people who completed the track / Number of people who were scheduled to complete it) x 100.

**Why it matters:** Completion rate is the most basic health indicator of your academy. If people are not completing training, nothing else in the SSA adoption plan will work. Low completion rates signal scheduling conflicts, motivation problems, or content quality issues.

**Healthy range:** 85% or above for Foundations (which is mandatory), 75% or above for Practitioner (which requires more commitment), 70% or above for Lead (which has a smaller target audience).

**Warning signs:** Completion rate below 60% for any track suggests a systemic problem -- either the training is not valued, not accessible, or not scheduled properly.

### Time-to-first-delivery

**What it measures:** The number of days between a practitioner completing SSA training and delivering their first production SSA architecture (ontology, contracts, eval suite, and architecture spec for a real project).

**Why it matters:** Training that does not translate into practice is wasted investment. Time-to-first-delivery measures how quickly training converts into applied capability. A short time-to-first-delivery means the training is practical, the organizational environment supports application, and practitioners have real projects to work on.

**Healthy range:** 30 to 60 days after completing Practitioner training. If it takes more than 90 days, practitioners are either not assigned to SSA work or face organizational barriers to applying their skills.

**How to reduce it:** Assign practitioners to real SSA projects during training (not after). The capstone project should be a real company initiative, not a hypothetical exercise. Ensure managers are committed to giving practitioners SSA work immediately after certification.

### Internal certification scores

**What it measures:** The average scores on capstone evaluations for each academy track, broken down by competency area.

**Why it matters:** Certification scores reveal the quality of training, not just the quantity. If average scores are high, the academy is producing competent practitioners. If scores are low in specific areas (e.g., evaluation design), the curriculum needs strengthening in those areas.

**How to use it:** Track scores by competency area over time. If ontology design scores are consistently high but eval suite design scores are consistently low, invest in better evaluation training. If all scores decline over time, the academy may be cutting corners or the instructors may need development.

### Knowledge retention

**What it measures:** Performance on follow-up assessments administered 3 and 6 months after certification. These are not repeat exams -- they are brief assessments focused on whether practitioners still apply core concepts correctly.

**Why it matters:** Certification proves someone learned the material once. Retention proves they internalized it. If retention is low, the academy is producing certificates, not capability. Common causes of low retention include: training that is too theoretical, insufficient hands-on practice after certification, and lack of peer support.

---

## Technical metrics

Technical metrics measure the quality of SSA artifacts and the health of AI systems operating under SSA governance. They answer the question: "Are our SSA practices producing technically sound systems?"

### Ontology coverage

**What it measures:** The percentage of an AI system's domain that is explicitly modeled in the ontology, versus the percentage that is implicit or undocumented.

**How to assess:** For each major AI system, list all the entities, relationships, constraints, and vocabulary that the system depends on. Then check how many of these are explicitly captured in the ontology. The rest are implicit -- lurking in prompts, code, or tribal knowledge.

**Why it matters:** Implicit domain knowledge is the number one source of AI system failures. When the system "knows" something that is not documented in the ontology, that knowledge cannot be reviewed, tested, or maintained. It is invisible until it causes a problem.

**Healthy range:** 80% or above for production systems. 60% is acceptable for early-stage projects. Below 60% indicates significant implicit knowledge risk.

### Eval suite maturity

**What it measures:** The sophistication and completeness of evaluation suites across the organization. This is not a single number -- it is a composite assessment covering:

- **Coverage:** What percentage of the system's intended behaviors are tested by the eval suite? Are edge cases covered? Are safety-critical behaviors covered?
- **Automation:** What percentage of evaluations run automatically versus requiring manual execution?
- **Baseline stability:** How stable is the baseline? Are eval results consistent across runs, or do they fluctuate unpredictably?
- **Regression detection:** When a system change causes quality degradation, how quickly does the eval suite detect it?
- **Evolution:** How frequently is the eval suite updated to cover new behaviors, new edge cases, and lessons from incidents?

**Why it matters:** The eval suite is the immune system of an AI system. A weak eval suite means problems slip through undetected. A strong eval suite catches regressions before they reach users. Eval suite maturity is arguably the single most important technical metric because it determines how quickly you detect and correct quality problems.

**Maturity levels:**

- **Level 1 (basic):** Manual evaluation of a few key scenarios. No automation. No baseline.
- **Level 2 (structured):** Documented eval cases covering main use scenarios and key edge cases. Partially automated. Baseline established.
- **Level 3 (comprehensive):** Extensive coverage including adversarial scenarios. Fully automated. Stable baseline. Regression detection within 24 hours.
- **Level 4 (predictive):** Eval suite evolves proactively based on usage patterns and incident trends. Evaluation of evaluation quality itself. Cross-system evaluation scenarios.

### Security posture score

**What it measures:** The robustness of an AI system against adversarial attacks and safety failures, assessed through the adversarial evaluation framework from the Security track.

**Components:**
- Prompt injection resistance: percentage of injection attempts that are correctly blocked
- Jailbreak resistance: percentage of jailbreak attempts that fail to elicit policy-violating behavior
- Data leakage prevention: percentage of extraction attempts that fail to surface sensitive information
- Safety constraint adherence: percentage of test scenarios where safety constraints are correctly enforced

**Why it matters:** Security posture measures whether the system is safe to operate, not just whether it produces correct outputs. A system can score well on functional evaluations while being vulnerable to adversarial manipulation. The security posture score ensures that safety is measured independently of functionality.

### Architecture spec compliance

**What it measures:** The percentage of AI systems in production that have a complete, current architecture spec following SSA standards.

**Why it matters:** Architecture specs are the documentation of intent. Without them, understanding why a system behaves the way it does requires reverse-engineering the prompts, the code, and the configuration -- which is expensive and error-prone. High compliance means the organization can review, audit, and maintain its AI systems efficiently.

---

## Business metrics

Business metrics connect SSA practices to outcomes that executives, board members, and business stakeholders care about. They answer the question: "Is our investment in SSA producing business value?"

### Time-to-production

**What it measures:** The number of days from project kickoff to production deployment for AI initiatives.

**Why it matters:** This is often the first objection raised against SSA practices -- "doesn't all this architecture and evaluation slow us down?" The data usually shows the opposite. Teams that invest in upfront architecture and evaluation reach production faster because they avoid the rework cycles that plague ad-hoc approaches. Measure this to prove or disprove the "SSA slows us down" hypothesis with data.

**How to compare:** Track time-to-production for SSA-governed projects versus non-SSA projects. Control for project complexity as much as possible. Over time, the SSA advantage typically becomes clear: slightly longer design phase, much shorter debugging and rework phase, net faster delivery.

### Cost per AI project

**What it measures:** The total cost of delivering an AI initiative from concept to production, including design, development, evaluation, deployment, and initial operation.

**Why it matters:** SSA practices have a cost -- training, architecture time, evaluation infrastructure. They also have a benefit -- fewer incidents, less rework, faster iteration, better reuse. Cost per project captures both sides of the equation. If SSA practices reduce total project cost (by reducing rework and incidents more than they add in process), the business case is clear.

### Quality improvement trend

**What it measures:** The trajectory of AI system quality over time, measured through eval suite pass rates, incident rates, and customer satisfaction scores.

**Why it matters:** Individual quality measurements are snapshots. Trends tell the real story. A system with a 75% eval pass rate that is improving 5 points per quarter is in much better shape than a system with an 85% pass rate that is declining. Trend data also reveals whether SSA practices are producing sustained improvement or just a one-time bump.

### Incident reduction

**What it measures:** The number and severity of AI-related incidents per quarter, compared to the pre-SSA baseline.

**Why it matters:** Incidents are expensive -- in direct cost (investigation time, remediation effort), indirect cost (customer trust damage, regulatory attention), and opportunity cost (the team is fixing problems instead of building features). Incident reduction is one of the most tangible and compelling business metrics for SSA adoption.

**How to track:** Classify incidents by severity (critical, major, minor) and by root cause (ontology gap, contract violation, eval gap, safety control failure, infrastructure issue). Track total incidents per quarter and incidents per production AI system. The per-system metric controls for the natural increase in total incidents as the organization deploys more AI systems.

---

## Impact attribution

Metrics are only useful if you can connect them to their causes. Impact attribution answers the question: "Did SSA practices cause this improvement, or would it have happened anyway?"

### The attribution chain

Build explicit connections between your three metric layers:

```
Learning metrics → Technical metrics → Business metrics
```

For example:
- "We trained 12 practitioners (learning) who improved eval suite coverage from 40% to 80% (technical), which caught 15 regressions before production (technical), reducing customer-facing incidents by 40% (business)."
- "Time-to-first-delivery improved from 90 days to 35 days (learning), which meant more systems got architecture specs before launch (technical), which reduced post-launch rework by 30% (business), saving an estimated 200 engineering hours per quarter (business)."

### Controlled comparison

When possible, compare SSA-governed teams with non-SSA teams working on similar projects. This is not always feasible (teams differ in many ways beyond SSA adoption), but when the comparison is reasonable, it provides the most compelling evidence.

Things to compare:
- Time-to-production for similar-complexity projects
- Incident rates per production system
- Rework time as a percentage of total project time
- Customer satisfaction scores for AI-powered features

### Counterfactual tracking

For each significant incident or quality issue, ask: "Would SSA practices have prevented or mitigated this?" Track the answers:

- **Prevented:** The ontology, contracts, eval suite, or safety controls would have caught the issue before production. This is direct SSA impact.
- **Mitigated:** SSA practices would have reduced the severity or accelerated the resolution. This is partial SSA impact.
- **Unaffected:** The issue would have occurred regardless of SSA practices (e.g., infrastructure failures, third-party API outages). This is not SSA impact.

Over time, the ratio of prevented-to-unaffected incidents provides a compelling picture of SSA's protective value.

---

## Reporting

Metrics are only valuable if the right people see them at the right time in the right format.

### Executive dashboard

**Audience:** C-suite, VP-level, executive sponsor.

**Cadence:** Monthly update, quarterly deep-dive.

**Content:**
- Three to five headline business metrics with trend arrows (improving/stable/declining)
- One paragraph executive summary: what is working, what needs attention, what is planned
- One impact story: a specific, concrete example of SSA value
- Budget status: investment versus plan

**Principles:** Keep it to one page. Use business language, not technical jargon. Lead with outcomes, not activities. Executives do not need to know that you ran 3,000 evaluation cases this month -- they need to know that AI quality improved 12% and incidents dropped 40%.

### Team scorecard

**Audience:** SSA practitioners, team leads, engineering managers.

**Cadence:** Weekly update.

**Content:**
- Technical metrics for each team's AI systems: eval pass rates, security posture, architecture spec compliance
- Trend indicators: improving, stable, or declining over the past 4 weeks
- Red flags: any metric that has crossed a warning threshold
- Comparison to targets: are teams on track for their quarterly goals?

**Principles:** Make it actionable. Every metric should connect to a specific action: investigate this regression, update this eval suite, review this architecture. The scorecard is a tool for improvement, not a report card.

### Individual development tracking

**Audience:** SSA practitioners, their managers, the academy team.

**Cadence:** Updated after each certification milestone and quarterly review.

**Content:**
- Certification status: which tracks completed, which in progress
- Portfolio status: capstone evaluations, pair review records, production architectures delivered
- Skill assessment: strengths and growth areas identified through reviews and mentoring
- Development plan: what the practitioner is working on next and what support they need

**Principles:** Development tracking is private to the individual and their manager. It is a growth tool, not a ranking tool. The purpose is to help each practitioner identify their next development step and get the support they need to take it.

---

## Getting started with metrics

If you are just beginning SSA adoption, do not try to implement all metrics at once. Start with the five that matter most in the first 90 days:

1. **Training completion rate** -- are people getting trained?
2. **Time-to-first-delivery** -- are they applying what they learned?
3. **Eval suite coverage** -- are systems being evaluated?
4. **Incident count** -- are problems decreasing?
5. **Time-to-production** -- is delivery getting faster?

Add the remaining metrics as your practice matures and your data infrastructure supports them. By the end of the first year, you should have all three layers -- learning, technical, and business -- measured and connected through attribution.

---

## Key takeaways

1. **Three layers, three questions.** Learning metrics ask "are we building capability?" Technical metrics ask "are our systems well-built?" Business metrics ask "are we delivering value?"

2. **Attribution connects the layers.** Without clear connections between learning, technical, and business metrics, you cannot prove that SSA investment produces business value. Build the attribution chain explicitly.

3. **Trends matter more than snapshots.** A system improving from 70% to 85% over three quarters tells a much more compelling story than a snapshot showing 85% today.

4. **Report for the audience.** Executives need one page with business outcomes. Teams need weekly scorecards with actionable details. Individuals need private development tracking.

5. **Start simple, add complexity.** Five metrics in the first 90 days, full coverage by end of year. Do not let measurement complexity delay adoption.
