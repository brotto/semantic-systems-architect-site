---
sidebar_position: 5
sidebar_label: "Application A — Security audit"
---

# Application A — Security audit

## Objective

In this application, you will conduct a comprehensive **security assessment** of the AI system you have been designing across all previous modules. This is not a theoretical exercise — it is the same process that a security team would follow before approving a system for production deployment.

Think of this as the building inspection before a new hospital opens. The architect designed it, the engineers built it, and now the inspectors walk through every room, check every door, test every fire alarm, and verify that everything meets safety codes. They do not assume the design is correct — they verify it.

Your security audit will examine your system from the attacker's perspective, identify vulnerabilities, assess their severity, and produce a documented plan for addressing them.

---

## The assignment

Using your complete system design (ontology, agent architecture, workflows, tool contracts, context packages, and evaluation infrastructure), conduct a structured security assessment.

---

## Deliverable structure

### Section 1: System overview and scope (half page)

Provide a concise summary of the system being audited:

```
SECURITY AUDIT
System: [name]
Version: [version being audited]
Date: [date]
Auditor: [your name]

Scope:
  - All agents and their interactions
  - All tool integrations
  - All data flows (input, storage, retrieval, output)
  - All user-facing interfaces
  - All administrative interfaces

Out of scope:
  - Infrastructure security (cloud provider, network)
  - Physical security
  - [anything else you are deliberately excluding]
```

### Section 2: Asset inventory (half page)

List every asset in your system that needs protection. Classify each by criticality:

```
ASSET INVENTORY

Critical assets (compromise would cause severe harm):
  - [list with justification]

Important assets (compromise would cause significant harm):
  - [list with justification]

Standard assets (compromise would cause minor harm):
  - [list with justification]
```

Consider: customer data, agent configurations, system prompts, tool credentials, API keys, knowledge base content, audit logs, business logic, and decision models.

### Section 3: Attack surface map (1 page)

For every point where external input enters your system, document it:

```
ATTACK SURFACE MAP

Surface 1: [name]
  Type: [user input / data ingestion / agent communication /
        tool interface / admin interface]
  Description: [what this surface does]
  Input type: [natural language / structured data / files / etc.]
  Authentication: [how access is controlled]
  Data sensitivity: [what sensitive data flows through here]
  Existing defenses: [what protections are already in place]
```

Map at least 5 attack surfaces. Be thorough — the surfaces you miss are the ones attackers find.

### Section 4: Threat enumeration (2 pages)

Using the STRIDE framework from Lesson 1, enumerate at least 12 threats across your system. For each threat:

```
THREAT: [short name]
  ID: T-001
  STRIDE category: [S/T/R/I/D/E]
  Attack surface: [which surface from Section 3]
  Description: [how the attack works, specifically for your system]
  Attacker profile: [who would do this and why]
  Likelihood: [Low / Medium / High]
    Justification: [why this likelihood]
  Impact: [Low / Medium / High / Critical]
    Justification: [what damage would result]
  Risk score: [Likelihood x Impact matrix position]
```

Ensure you cover at least:
- 2 prompt injection scenarios (direct and indirect)
- 2 data-related threats (poisoning, exfiltration)
- 2 privilege-related threats (escalation, unauthorized access)
- 2 operational threats (denial of service, quality degradation)
- At least 4 additional threats specific to your system

### Section 5: Risk matrix (half page)

Plot all your threats on a risk matrix:

```
RISK MATRIX

                    Impact
              Low    Medium    High    Critical
Likelihood
  High      | ...  | ...    | ...   | ...
  Medium    | ...  | ...    | ...   | ...
  Low       | ...  | ...    | ...   | ...

Critical zone (High likelihood + High/Critical impact): [list]
Priority zone (Medium+ likelihood + Medium+ impact): [list]
Monitor zone (Low likelihood or Low impact): [list]
```

### Section 6: Mitigation plan (2 pages)

For every threat in the Critical and Priority zones, design specific mitigations:

```
MITIGATION PLAN

Threat: T-001 [name]
  Risk: [from matrix]

  Mitigation 1: [name]
    Type: [Preventive / Detective / Corrective]
    Description: [exactly what this defense does]
    Where in architecture: [which component implements it]
    Implementation complexity: [Low / Medium / High]
    Dependencies: [what needs to be in place first]

  Mitigation 2: [name]
    Type: [Preventive / Detective / Corrective]
    Description: [exactly what this defense does]
    Where in architecture: [which component implements it]

  Residual risk after mitigations: [Low / Medium / High]
  Justification: [why this residual level is acceptable]
```

Each critical threat should have at least two mitigations (defense in depth). Each priority threat should have at least one.

### Section 7: Monitoring and detection (1 page)

Some threats will bypass prevention. How will you detect them?

```
MONITORING REQUIREMENTS

Monitor 1: [name]
  What it detects: [which threats]
  Data source: [what logs or metrics are watched]
  Alert condition: [specific trigger criteria]
  Response: [what happens when the alert fires]
  Review frequency: [how often the monitor itself is reviewed]
```

Define at least 5 monitors covering:
- Prompt injection attempts
- Unusual access patterns
- Decision anomalies
- System performance degradation
- Data integrity violations

### Section 8: Gaps and recommendations (half page)

Honest assessment of what your audit did NOT cover and where your defenses remain weak:

```
KNOWN GAPS

Gap 1: [description]
  Why it is a gap: [what prevented addressing it]
  Risk if unaddressed: [what could happen]
  Recommended next step: [what should be done]
  Priority: [immediate / next quarter / future]
```

---

## Evaluation criteria

| Criterion | What "good" looks like |
|---|---|
| **Completeness** | All 8 sections are present and substantive. No section is a placeholder. At least 12 threats are enumerated. At least 5 attack surfaces are mapped. |
| **Specificity** | Threats are specific to YOUR system, not generic AI threats copied from a textbook. Mitigations reference specific components from your architecture. |
| **Depth** | Threats include realistic attack scenarios. Mitigations are technically feasible. Residual risk assessments are honest. |
| **STRIDE coverage** | All six STRIDE categories are represented in the threat enumeration. No category is ignored. |
| **Actionability** | A security engineer could read this audit and implement the mitigations. No vague recommendations like "improve security." |

---

## Tips for success

- **Be the attacker first.** Before you think about defenses, spend time thinking about how you would attack your own system. What would you try first? What information would you probe for? Which agent would you target? The best security auditors think like attackers.

- **Trace data flows.** Follow a piece of sensitive data through your entire system. Where does it enter? Where is it stored? Which agents see it? Where does it exit? Every point in that journey is a potential vulnerability.

- **Challenge your own assumptions.** "The agent would never do that" is not a defense. If the agent CAN do something (because it has tool access), assume an attacker will find a way to make it do that thing. Design defenses accordingly.

- **Prioritize ruthlessly.** You will not fix everything. The goal is to identify the most dangerous threats and address those first. A system with 3 critical mitigations implemented is safer than a system with 20 mitigations planned but none implemented.

- **Document what you did NOT test.** An audit that claims to cover everything is either lying or superficial. Honest gaps are a sign of maturity, not weakness.
