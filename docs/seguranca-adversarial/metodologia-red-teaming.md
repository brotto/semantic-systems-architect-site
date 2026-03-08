---
sidebar_position: 4
title: Red Teaming Methodology
---

# Red Teaming Methodology

## The fire drill analogy

Every building has a fire escape plan. But a plan on paper is just a theory. The only way to know if the plan actually works is to run a fire drill: a controlled simulation of the real emergency.

Red teaming for AI systems is a fire drill. You simulate adversarial attacks under controlled conditions to discover whether your defenses work before a real attacker tests them for you. The difference between a fire drill and an actual fire is that in a drill, you control the conditions, you learn from the results, and nobody gets hurt. In a real fire, you find out what works and what does not while the building is burning.

Red teaming is not hacking. A hacker tries to break in. A red team tries to break in so they can tell you how to fix the door. The goal is never to cause damage -- it is to discover vulnerabilities and strengthen defenses before adversaries find them.

---

## What red teaming is (and is not) for AI systems

### What red teaming is

- **A structured methodology** for systematically testing an AI system's resistance to adversarial behavior.
- **A collaborative exercise** between the red team (attackers) and the blue team (defenders). Both sides learn.
- **A measurement tool** that produces quantitative data: bypass rates, detection rates, and response times.
- **A continuous practice** that happens regularly throughout the system's lifecycle, not once before launch.
- **A professional discipline** with rules of engagement, ethical boundaries, and documentation requirements.

### What red teaming is not

- **Not a one-time audit.** A single red team exercise is a snapshot. Threats evolve, systems change, and new attack techniques emerge. Red teaming must be ongoing.
- **Not adversarial chaos.** Red teaming is not "try everything and see what breaks." It is a structured campaign with specific objectives, selected tactics, and measured outcomes.
- **Not a blame exercise.** If the red team finds a vulnerability, that is a success, not a failure. The purpose is to find problems before attackers do.
- **Not just prompt injection testing.** Red teaming covers all attack surfaces and all attack categories. Focusing only on prompt injection leaves other surfaces unexamined.
- **Not a substitute for systematic evals.** Red teaming is creative and exploratory. Evals are systematic and repeatable. You need both.

---

## The five-phase red teaming cycle

Red teaming follows a five-phase cycle. Each phase builds on the previous one, and the entire cycle repeats at regular intervals.

### Phase 1: Scope definition

Before any testing begins, you must define what you are testing, why, and within what boundaries.

**Scope elements:**

- **Target system**: Which system, agent, or workflow is being tested? Be specific. Testing "the customer support bot" is different from testing "the customer support bot's refund processing workflow."
- **Attack surfaces in scope**: Which of the five attack surfaces will the campaign cover? A focused campaign might test only user input injection. A comprehensive campaign covers all five surfaces.
- **Attack categories in scope**: Which categories from the attack catalog will be attempted? You might focus on prompt injection and data extraction, or cover all eight categories.
- **Success criteria for attacks**: What counts as a successful attack? Define this clearly. For example: "The system reveals content from its system prompt" or "The system executes a tool call that was not explicitly requested by the user."
- **Out of scope**: What will NOT be tested? This is important for safety. Testing should not involve real customer data, production systems with live users, or techniques that could cause permanent damage.

**Scope document template:**

```
RED TEAM CAMPAIGN: [Campaign Name]
Target system: [System identifier]
Campaign dates: [Start] to [End]
Surfaces in scope: [List]
Attack categories: [List]
Success criteria: [Specific, measurable definitions]
Out of scope: [Explicit exclusions]
Environment: [Staging / sandbox / isolated test]
Approved by: [Name and date]
```

### Phase 2: Tactic selection

Once the scope is defined, select the specific tactics you will use. Tactics are the concrete approaches the red team will employ during the campaign.

**The attack tactic matrix.** Organize your tactics by surface and sophistication level:

| Surface | Basic | Intermediate | Advanced |
|---|---|---|---|
| User input | Simple override commands | Multi-turn manipulation | Context-aware adaptive attacks |
| Retrieved content | Obvious instruction text in documents | Hidden text with instruction patterns | Subtle content that shifts reasoning without obvious instructions |
| Tool integrations | Direct requests for unauthorized tool use | Parameter manipulation through conversation | Chained tool calls that combine to achieve unauthorized effects |
| Memory/state | Single-turn state injection | Multi-session preference poisoning | Gradual state drift across many interactions |
| Output layer | Requests for raw system data in output | Manipulation of output formatting to hide content | Exploitation of downstream processing of AI output |

Select tactics that match the sophistication level you want to test. Early campaigns should start with basic tactics to establish a baseline. As defenses improve, advance to more sophisticated tactics.

**Tactic documentation:**

For each selected tactic, document:
- Tactic ID and name
- Target surface and attack category
- Sophistication level
- Expected system behavior (if defenses work correctly)
- Indicators of success (if the attack works)

### Phase 3: Controlled campaign execution

This is where the actual testing happens. The red team executes the selected tactics against the target system in a controlled environment.

**Campaign execution rules:**

1. **Isolated environment.** Never test against production systems with real users. Use a staging environment, a sandbox, or a dedicated test instance that mirrors production.

2. **No real sensitive data.** Populate the test environment with synthetic data. If the system accesses a knowledge base, use synthetic documents. If it connects to APIs, use mock services.

3. **Full logging.** Every interaction must be logged: the exact input, the system's response, any tool calls made, and the test operator's notes. This log is the raw material for analysis.

4. **Controlled escalation.** Start with basic tactics. If they fail (meaning defenses work), escalate to intermediate tactics. If those fail too, escalate to advanced tactics. This approach maps the defense threshold: at what sophistication level do defenses begin to fail?

5. **Time-boxed sessions.** Set a time limit for each tactic. If the red team cannot succeed with a specific tactic within the time box, document it as defended and move on.

**Session documentation template:**

```
Session: [ID]
Date and time: [Timestamp]
Tester: [Name]
Tactic: [Tactic ID and name]
Input provided: [Exact text or action]
System response: [Exact output]
Tool calls triggered: [If any]
Result: [Blocked / Partially blocked / Bypassed]
Notes: [Observations, ideas for follow-up]
```

### Phase 4: Measurement and analysis

After the campaign, analyze the results to produce actionable metrics and insights.

**Core metrics:**

- **Bypass rate**: The percentage of attack attempts that successfully bypassed defenses. Calculate this overall and per surface, per category, and per sophistication level.
  - Formula: bypass rate = successful attacks / total attempts

- **Detection rate**: The percentage of attacks (both blocked and successful) that were detected by monitoring systems. An attack that succeeds but is detected is less dangerous than one that succeeds silently.
  - Formula: detection rate = detected attacks / total attempts

- **Time-to-detect**: For attacks that were detected, how long did detection take? Immediate detection is ideal. Detection after hours or days means the attacker had a window of opportunity.

- **False positive rate**: What percentage of legitimate interactions were incorrectly flagged as attacks? High false positive rates degrade the user experience and create alert fatigue.

- **Defense coverage**: Which tactics were fully defended, partially defended, or undefended? Map this back to the tactic matrix to identify gaps.

**Analysis framework:**

For each successful attack, analyze:
- Which defense layer failed? Was it input validation, content filtering, behavioral monitoring, or output filtering?
- Was the failure a gap (no defense existed for this tactic) or a weakness (a defense existed but was insufficient)?
- What is the minimum sophistication level required to bypass defenses on each surface?
- Are there patterns in the failures? Do all failures share a common root cause?

### Phase 5: Remediation and validation

The red team campaign produced a list of vulnerabilities. Now fix them and verify that the fixes work.

**Remediation process:**

1. **Prioritize by risk.** Use the risk scoring from your threat model. Fix critical and high-risk vulnerabilities first.

2. **Design the fix.** For each vulnerability, design a specific defense. This might be a system prompt modification, a new input filter, a tool usage policy change, or an output validation rule.

3. **Implement and test.** Implement the fix and run the specific attack that exploited the vulnerability. If the attack no longer works, the fix is effective.

4. **Regression check.** Run the complete red team campaign again (or at least a representative subset) to ensure the fix did not introduce new vulnerabilities or break existing defenses.

5. **Document.** Update the threat model, the defense documentation, and the red team playbook with the new findings and fixes.

---

## Campaign design

### Duration

Campaign duration depends on scope:

- **Focused campaign** (single surface, single category): 2-3 days of active testing.
- **Standard campaign** (multiple surfaces, multiple categories): 1-2 weeks.
- **Comprehensive campaign** (all surfaces, all categories, multiple sophistication levels): 2-4 weeks.

Plan for analysis and documentation time on top of active testing time. A one-week testing campaign typically needs another week for analysis and reporting.

### Team composition

A good red team combines different perspectives:

- **SSA expert**: Understands the semantic architecture and can identify weaknesses in the design.
- **Security specialist**: Knows adversarial techniques and can adapt generic attack patterns to the specific system.
- **Domain expert**: Understands the business context and can craft attacks that are realistic for the domain.
- **Fresh eyes**: Someone unfamiliar with the system who can find vulnerabilities that the builders overlooked due to familiarity.

For smaller organizations, one person can fill multiple roles. But never have the system's primary designer be the only red team member. Building and attacking require different mindsets.

### Rules of engagement

Every campaign needs explicit rules of engagement:

1. **Authorization**: The campaign must be authorized by a system owner or security lead. Document the authorization.
2. **Boundaries**: Define what the red team is NOT allowed to do. No testing against production. No real customer data. No techniques that could cause lasting damage.
3. **Communication**: Define how the red team communicates findings. Critical vulnerabilities (attacks that could cause immediate harm) should be reported immediately, not at the end of the campaign.
4. **Data handling**: All test data, logs, and findings are confidential. Define who has access and how long data is retained.
5. **Ethical limits**: Do not develop or document attack techniques that could cause real-world harm beyond the testing context.

---

## Responsible red teaming

Red teaming carries ethical responsibilities. You are developing knowledge about how to attack AI systems. That knowledge must be handled responsibly.

### Ethical boundaries

- **Test only systems you own or have authorization to test.** Never red-team someone else's system without explicit permission.
- **Do not share exploits publicly.** If you find a vulnerability, report it to the system owner. Do not publish working attack payloads.
- **Do not create reusable attack tools.** The purpose of red teaming is to improve specific systems, not to build general-purpose attack frameworks.
- **Consider downstream effects.** Even in a test environment, consider what would happen if your test data leaked. Do not create test scenarios that could cause harm if misunderstood or taken out of context.

### Disclosure and documentation

When the red team finds a vulnerability:

1. **Document it completely.** Include the attack vector, the exact inputs, the system's response, the failed defense, and the potential impact.
2. **Report it promptly.** Critical vulnerabilities should be reported within hours. Other findings should be reported within the campaign reporting timeline.
3. **Recommend fixes.** Do not just report problems -- propose solutions. The red team's knowledge of the attack gives them insight into what would stop it.
4. **Verify fixes.** After remediation, the red team should verify that the fix works by re-attempting the attack.

### Documentation standards

Every red team campaign produces a report. The report should include:

```
RED TEAM CAMPAIGN REPORT

1. EXECUTIVE SUMMARY
   - Campaign scope and duration
   - Key findings (critical vulnerabilities first)
   - Overall assessment (system readiness level)

2. METHODOLOGY
   - Scope definition
   - Tactics selected
   - Environment description
   - Team composition

3. FINDINGS
   For each finding:
   - Finding ID and severity
   - Attack surface and category
   - Tactic used
   - Defense that failed (or was absent)
   - Potential impact
   - Recommended remediation

4. METRICS
   - Overall bypass rate
   - Detection rate
   - Breakdown by surface and category
   - Comparison to previous campaigns (if applicable)

5. RECOMMENDATIONS
   - Prioritized list of remediations
   - Suggested improvements to monitoring
   - Recommendations for future campaigns

6. APPENDIX
   - Detailed session logs
   - Exact inputs and outputs for each finding
```

---

## Integrating red teaming into the development lifecycle

Red teaming should not be a one-time event. Integrate it into your development process:

- **Pre-launch**: Run a comprehensive campaign before the system goes live. No system should launch without at least one red team exercise.
- **Post-update**: After significant system changes (new agents, new tools, new data sources, prompt modifications), run a focused campaign targeting the changed components.
- **Periodic**: Run a standard campaign on a regular schedule (quarterly for most systems, monthly for high-risk systems).
- **Triggered**: If a new attack technique is published in the AI security community, run a focused campaign to test whether your system is vulnerable.

Each campaign builds on the previous one. Your attack tactic matrix grows over time. Your sophistication levels increase. Your defenses strengthen. This is the virtuous cycle of adversarial security: the better your red team gets, the stronger your defenses become.

---

## Key takeaways

1. **Red teaming is a fire drill**, not arson. The goal is to discover vulnerabilities under controlled conditions so you can fix them before real attackers find them.

2. **The five-phase cycle** -- scope, tactic selection, controlled campaign, measurement, remediation -- provides a structured and repeatable methodology.

3. **Measure everything.** Bypass rates, detection rates, time-to-detect, and false positive rates give you objective data about your system's security posture.

4. **Responsible practice matters.** Ethical boundaries, proper disclosure, and thorough documentation distinguish professional red teaming from reckless experimentation.

5. **Red teaming is continuous.** A single campaign is a snapshot. Ongoing campaigns create a feedback loop that steadily strengthens your defenses over time.
