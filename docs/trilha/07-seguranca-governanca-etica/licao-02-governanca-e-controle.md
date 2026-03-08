---
sidebar_position: 3
sidebar_label: "Lesson 2 — Governance and access control"
---

# Lesson 2 — Governance and access control

## The government analogy

Every functioning country has a structure that prevents chaos: a **constitution** that defines the fundamental rules, **branches of government** that separate powers, **checks and balances** that prevent any one branch from dominating, and **laws and regulations** that translate principles into enforceable rules.

Why does this matter? Because power without structure leads to abuse. Even well-intentioned leaders need constraints. The system of governance exists not because everyone is bad, but because unchecked power — no matter who holds it — eventually causes harm.

AI systems face the same problem. An agent with access to customer data, business tools, and decision-making authority holds real power. Without governance — without clear rules about who can do what, who watches the watchers, and how decisions are reviewed — that power becomes dangerous. Not because the AI is malicious, but because ungoverned power is inherently risky.

This lesson teaches you to build the "government" of your AI system: the structures that ensure power is distributed, constrained, monitored, and accountable.

---

## What governance means for AI systems

Governance is the system of rules, practices, and processes by which an organization directs and controls its AI systems. It answers five fundamental questions:

**1. Who decides?** Which agents, humans, or teams have authority over which decisions? The president cannot pass laws alone. The parliament cannot command the military alone. Similarly, your customer support agent should not approve refunds above a certain amount alone.

**2. What are the rules?** What policies govern how the system operates? These are not the agent's prompt instructions — they are the organizational rules that determine what the prompts should contain. The constitution comes before the laws.

**3. How are decisions tracked?** Every significant action needs a record. Not just "what happened" but "why it happened, who authorized it, and what information was used." In government, this is the legislative record, the court proceedings, the meeting minutes. In AI systems, this is the audit trail.

**4. Who watches the watchers?** If the security team monitors the AI, who monitors the security team? If the model evaluates its own output, who evaluates the evaluator? Governance requires oversight of oversight.

**5. How do things change?** Policies evolve. Laws are amended. How does your AI system handle change? Who can modify agent instructions? Who approves new tools? What testing is required before a change goes live?

---

## Access control: the separation of powers

### The principle of least privilege

In government, the principle is clear: a traffic officer does not need access to classified military documents. A postal worker does not need the nuclear launch codes. Each role gets exactly the access it needs to do its job — no more, no less.

In AI systems, this principle translates to: **each agent should have access only to the data and tools it needs for its specific role.**

Consider a system with three agents:

- **Triage Agent:** reads customer messages and classifies them by topic and urgency
- **Support Agent:** resolves customer issues using the knowledge base and policy rules
- **Escalation Agent:** handles complex cases, including refunds and account modifications

What access does each need?

```
TRIAGE AGENT
  Data access:
    - Customer message (read only)
    - Customer tier (read only)
    - Category taxonomy (read only)
  Tool access:
    - Classification tool
    - Routing tool
  Cannot access:
    - Customer account details
    - Financial data
    - Refund tools
    - Account modification tools

SUPPORT AGENT
  Data access:
    - Customer message (read only)
    - Customer profile — basic info (read only)
    - Knowledge base articles (read only)
  Tool access:
    - Knowledge search tool
    - Response composition tool
    - Ticket update tool (append only)
  Cannot access:
    - Customer financial data
    - Refund approval tools
    - Account modification tools

ESCALATION AGENT
  Data access:
    - Full customer profile (read only)
    - Transaction history (read only)
    - Previous interactions (read only)
  Tool access:
    - Refund tool (limited to policy thresholds)
    - Account modification tool (limited to specific fields)
    - Manager notification tool
  Cannot access:
    - System configuration
    - Other customers' data
    - Tools outside defined scope
```

**Why this matters:** if the Triage Agent is compromised through prompt injection, the attacker gains access to... a classification tool and a routing tool. Not customer financial data. Not refund capabilities. The blast radius is contained because the agent never had access to the dangerous things in the first place.

### Access control enforcement

Access control must be enforced at the **tool level**, not just at the **prompt level.**

**Prompt-level enforcement** means telling the agent in its instructions: "You are not allowed to access the refund tool." This is important but insufficient. A prompt injection attack can override prompt-level restrictions by design — that is what prompt injection does.

**Tool-level enforcement** means the refund tool itself checks: "Is the calling agent authorized to use me? Does it have a valid session token? Is the requested amount within its authorized limit?" Even if the agent is tricked into trying to call the tool, the tool refuses.

**Analogy:** telling a security guard "Don't let anyone into the vault" is prompt-level enforcement. Installing a vault door that only opens with the right key is tool-level enforcement. You need both, but only the second one works when the guard is compromised.

```
TOOL ACCESS CONTROL — Refund Tool

Authentication:
  - Calling agent must present a valid session token
  - Token must be issued by the Workflow Orchestrator
  - Token must include the "refund:execute" permission

Authorization rules:
  - Standard agents: refund up to $50
  - Escalation agents: refund up to $500
  - Manager approval required: above $500
  - No single agent can process more than $2,000 in refunds per hour

Audit:
  - Every call logged with: agent ID, customer ID, amount,
    timestamp, decision, and reason
  - Failed authorization attempts trigger alert
```

### Role-based access control (RBAC) for agents

Just as organizations assign roles to employees (manager, clerk, auditor), you can assign roles to agents. Each role carries specific permissions:

```
ROLE DEFINITIONS

role: reader
  description: Can retrieve and display information
  data_access: read-only to assigned data domains
  tool_access: search, retrieve, display
  restrictions: cannot modify any data

role: operator
  description: Can process standard operations within policy
  data_access: read-write to assigned data domains
  tool_access: reader tools + create, update (within limits)
  restrictions: cannot approve exceptions, cannot modify policies

role: approver
  description: Can authorize actions that exceed standard limits
  data_access: reader access + audit logs
  tool_access: operator tools + approval tools
  restrictions: cannot modify system configuration

role: administrator
  description: Can modify system configuration and policies
  data_access: full read access + configuration
  tool_access: all tools + configuration tools
  restrictions: changes require dual approval, all changes logged
```

---

## Audit trails: the record of everything

### Why audit matters

Imagine a courtroom where nobody took notes. The judge made a ruling, but there is no record of what evidence was presented, what arguments were made, or what reasoning led to the decision. If someone appeals, there is nothing to review.

This is what happens when your AI system makes decisions without an audit trail. A customer calls to say they were wrongly denied a refund. You check the system and find... nothing. The agent denied it, but you do not know what data it used, what rules it applied, or why it reached that conclusion.

Audit trails serve three critical purposes:

**1. Accountability:** when something goes wrong, you can determine what happened and why. This is not about blame — it is about understanding and fixing the system.

**2. Compliance:** many industries require records of automated decisions. Financial services, healthcare, and government regulations may mandate that you can explain why a decision was made.

**3. Improvement:** audit data is the raw material for system improvement. If you can see patterns in agent decisions — "the agent approves 40% fewer refunds on Mondays" — you can investigate and fix systematic issues.

### What to log

Every significant agent action should produce an audit record:

```
AUDIT RECORD STRUCTURE

record_id: unique identifier
timestamp: when the action occurred
agent_id: which agent took the action
session_id: which conversation or workflow this belongs to
action_type: what was done (classify, respond, approve, deny, escalate)
inputs:
  - user_message: what the user said (redacted if necessary)
  - context_used: what information the agent was given
  - tools_called: which tools were invoked
  - retrieved_documents: which knowledge articles were used
decision:
  - outcome: what the agent decided
  - confidence: how confident the agent was (if available)
  - reasoning: why it decided this (if captured)
  - alternatives_considered: what other options were available
policy_references:
  - which policies were applied
  - any policy exceptions or edge cases encountered
human_involvement:
  - was a human consulted? who?
  - did a human override the agent's decision?
outcome:
  - was the action successful?
  - did the customer express satisfaction?
  - was the decision later reversed?
```

### Audit immutability

Audit logs must be **append-only.** No one — not the agents, not the administrators, not the engineers — should be able to delete or modify audit records. If an entry is incorrect, you add a correction record; you do not modify the original.

**Analogy:** a ship's log is written in ink, and pages cannot be torn out. If the captain wrote the wrong coordinates, they draw a line through the error and write the correction. The original entry remains visible. This is how investigators reconstruct what happened during an incident.

---

## Compliance frameworks

### What compliance means

Compliance means your system operates within the legal and regulatory requirements that apply to your industry and jurisdiction. This is not optional — it is the law.

Common compliance requirements for AI systems include:

**Data protection (GDPR, CCPA, etc.):**
- Right to explanation: customers can ask why a decision was made
- Right to human review: customers can request a human review of any automated decision
- Data minimization: collect and process only the data you need
- Purpose limitation: use data only for the stated purpose
- Data retention limits: delete data after it is no longer needed

**Industry-specific regulations:**
- Financial services: fair lending, anti-discrimination, transaction monitoring
- Healthcare: patient privacy (HIPAA), clinical decision support rules
- Government: transparency, accessibility, equal treatment

**AI-specific regulations (emerging):**
- EU AI Act: risk-based classification, transparency requirements, human oversight
- NIST AI Risk Management Framework: risk assessment, governance, monitoring

### Compliance traceability

For each compliance requirement, you need to show how your system meets it:

```
COMPLIANCE TRACEABILITY MAP

Requirement: GDPR Article 22 — Right to human review
  of automated decisions
Where enforced:
  - Workflow design: all high-impact decisions include
    human-in-the-loop step
  - Agent instructions: agent must offer human review
    when denying claims
  - Tool constraints: denial tool requires manager
    approval above threshold
Evidence:
  - Audit log shows human review flag on all denial records
  - Escalation metrics show % of decisions reviewed by humans
  - Customer communication includes human review option
Review frequency: Quarterly

Requirement: Data minimization — Process only necessary data
Where enforced:
  - Context packages: agents receive only data fields
    relevant to their role (Module 5 artifacts)
  - Tool access controls: agents cannot query unnecessary
    customer fields
  - Data pipeline: customer profiles are filtered before
    entering agent context
Evidence:
  - Context maps show exactly which fields each agent receives
  - Access logs show no queries for unauthorized fields
  - Regular audit confirms no unnecessary data in agent context
Review frequency: Monthly
```

---

## Change management: how things evolve

### The danger of uncontrolled change

In government, changing a law requires a formal process: proposal, committee review, debate, vote, executive approval, publication. This process exists because laws affect everyone, and changing them without due process leads to confusion, injustice, and erosion of trust.

In AI systems, change management addresses a similar concern. When someone modifies an agent's system prompt, it affects every interaction that agent has. When someone adds a new tool, it changes what the agent can do. When someone updates the knowledge base, it changes what the agent knows.

Without a change management process, you get:
- An engineer modifies a prompt on Friday afternoon and customer satisfaction drops 30% over the weekend
- Someone adds a new data source to the knowledge base without validating it, and the agent starts giving wrong answers
- A well-intentioned policy change in one agent's prompt contradicts a policy in another agent's prompt

### Change management process

```
CHANGE MANAGEMENT FRAMEWORK

CHANGE CATEGORIES

Category 1: Low risk
  Examples: fixing typos, clarifying existing instructions,
    adding knowledge base articles
  Approval: single reviewer
  Testing: basic smoke test (5 cases)
  Rollback: immediate if issues detected

Category 2: Medium risk
  Examples: modifying agent policies, adjusting decision
    thresholds, adding new tool integrations
  Approval: technical reviewer + domain reviewer
  Testing: full test suite (20+ cases) + regression test
  Rollback: within 1 hour if issues detected
  Monitoring: enhanced monitoring for 48 hours after deployment

Category 3: High risk
  Examples: changing security policies, modifying access
    controls, adding new agent capabilities, changing
    compliance-relevant behavior
  Approval: technical reviewer + domain reviewer
    + security reviewer + management sign-off
  Testing: full test suite + adversarial testing
    + compliance review
  Rollback: immediate if any issue detected
  Monitoring: enhanced monitoring for 1 week after deployment
  Documentation: full change report with rationale and
    impact analysis
```

### Approval workflows

Not all changes are equal, and not all changes should be approved by the same people.

**Analogy:** in a school, a teacher can decide to rearrange the desks in their classroom (low-risk change). Moving a class to a different room requires the principal's approval (medium-risk change). Changing the curriculum requires the school board's approval (high-risk change). Each level of impact requires a corresponding level of authority.

```
APPROVAL WORKFLOW — Medium Risk Change

Step 1: Proposal
  Who: Change requester (any team member)
  What: Change description, rationale, affected components,
    risk assessment
  Artifact: Change request document

Step 2: Technical review
  Who: SSA or technical lead
  What: Is the change technically sound? Are there
    unintended consequences?
  Check: Does this change affect other agents' behavior?
  Artifact: Technical review notes

Step 3: Domain review
  Who: Business stakeholder or domain expert
  What: Does this change align with business goals?
    Does it affect customer experience?
  Check: Are there compliance implications?
  Artifact: Domain approval

Step 4: Testing
  Who: Change requester with reviewer oversight
  What: Run full test suite, compare before and after
  Check: No regressions on any metric
  Artifact: Test results report

Step 5: Deployment
  Who: Change requester
  What: Deploy to production with enhanced monitoring
  Check: Monitor key metrics for anomalies
  Artifact: Deployment log

Step 6: Post-deployment review (48 hours later)
  Who: Change requester + technical reviewer
  What: Review metrics, customer feedback, error rates
  Decision: Confirm change or roll back
  Artifact: Post-deployment report
```

---

## Building your governance model

### The governance document structure

```
GOVERNANCE MODEL — [System Name]
Version: 1.0
Date: [date]

1. GOVERNANCE PRINCIPLES
   - What values guide decisions about this system?
   - What is the system's relationship to human authority?
   - What cannot be delegated to the AI?

2. ROLES AND RESPONSIBILITIES
   - Who operates the system?
   - Who monitors it?
   - Who can change it?
   - Who handles incidents?

3. ACCESS CONTROL MATRIX
   - For each agent: what data it can access, what tools it
     can use, what decisions it can make
   - For each human role: what system components they can
     view, modify, or approve

4. AUDIT REQUIREMENTS
   - What is logged and in what format
   - Retention periods
   - Who has access to audit data
   - Immutability guarantees

5. COMPLIANCE MAP
   - Which regulations apply
   - How each requirement is met
   - Evidence and documentation
   - Review schedule

6. CHANGE MANAGEMENT
   - Categories and approval requirements
   - Testing requirements by category
   - Rollback procedures
   - Post-deployment monitoring

7. INCIDENT RESPONSE
   - How security incidents are detected
   - Escalation paths
   - Communication plans
   - Post-incident review process

8. REVIEW AND EVOLUTION
   - How often this governance model is reviewed
   - Who reviews it
   - How changes to governance are approved
```

---

## Practice activity

Design the governance model for your AI system:

1. **Define your governance principles.** What values guide your system? What must always remain under human control? Write 3-5 principles.

2. **Build the access control matrix.** For each agent in your system, specify: what data it can access, what tools it can use, and what the maximum impact of its decisions can be.

3. **Design the audit trail.** What fields does each audit record contain? Where are logs stored? How long are they retained?

4. **Map one compliance requirement.** Choose the most relevant regulation for your system and trace how your architecture satisfies it.

5. **Create an approval workflow.** For a medium-risk change (like modifying an agent's decision threshold), design the complete approval process from proposal to post-deployment review.

6. **Identify governance gaps.** Where is your governance model weakest? What could go wrong even with these controls in place?

---

## Key takeaways

1. **Governance is the government of your AI system.** It answers who decides, what are the rules, how decisions are tracked, who watches the watchers, and how things change. Without governance, even well-designed systems become unpredictable.

2. **Access control is the separation of powers.** Each agent gets only the access it needs. Enforcement happens at the tool level, not just the prompt level. If an agent is compromised, the damage is contained.

3. **Audit trails are the memory of the system.** Every significant decision is logged with its inputs, reasoning, and outcome. Logs are append-only and immutable. Without audit trails, you cannot investigate, comply, or improve.

4. **Compliance is not optional.** Regulations mandate transparency, human oversight, data protection, and accountability. Your architecture must trace how each requirement is met with specific evidence.

5. **Change management prevents unintended consequences.** Every modification to the system — from prompt tweaks to new capabilities — goes through a process proportional to its risk. Testing, approval, monitoring, and rollback are not bureaucracy; they are safety.

---

## What comes next

You now have security controls (Lesson 1) and governance structures (this lesson) to protect and manage your system. But security and governance address what the system is ALLOWED to do. **Lesson 3 — Ethics and alignment** addresses what the system SHOULD do — the moral and ethical dimensions that no policy document can fully capture.
