---
sidebar_position: 1
sidebar_label: "Semantic Architecture Spec"
---

# Template -- Semantic Architecture Spec

This is the master blueprint for any AI system designed by a Semantic Systems Architect. Think of it as the architectural drawing for a building: before any brick is laid, every room, wall, and pipe must be specified on paper. A builder who skips the blueprint ends up tearing down walls. An SSA who skips this spec ends up tearing down agents.

**How to use this template:** Copy this entire document into your project repository. Fill in every section. If a section does not apply, write "Not applicable -- reason" rather than leaving it blank. Blank sections are invisible risks; explicitly excluded sections are deliberate decisions.

**When to write this spec:** Before any code is written. Before any prompt is drafted. Before any model is selected. This document is the contract between the SSA, the engineering team, the business stakeholders, and the AI agents themselves.

---

## 1. Context

**Purpose:** Establish the business reality that this system exists within. Every architectural decision will be traced back to this section. If someone asks "why does the agent do X?", the answer should start here.

Think of this section as the patient history a doctor reads before performing surgery. Without it, the surgery might be technically perfect but solve the wrong problem.

### 1.1 Business problem

Describe the specific business problem this system addresses. Be precise -- "improve customer experience" is too vague. "Reduce average ticket resolution time from 14 minutes to under 5 minutes for Tier-1 support queries" is actionable.

```
Problem statement:
[One to three sentences describing the core problem in business terms]

Current state:
[How this problem is handled today -- manually, with existing tools, or not at all]

Cost of inaction:
[What happens if this problem remains unsolved -- lost revenue, compliance risk, operational burden]
```

**Example:**

```
Problem statement:
Insurance claims adjusters spend 65% of their time on initial document review
for standard auto claims, leaving only 35% for complex cases requiring judgment.

Current state:
All claims enter a single manual queue. Adjusters review every document
regardless of complexity. Average processing time: 4.2 days per claim.

Cost of inaction:
$2.3M annual labor cost on reviewable claims. Customer NPS dropped 12 points
in the last quarter due to processing delays.
```

### 1.2 Impacted users

| User group | Role in the system | Key needs | Risk if system fails |
|---|---|---|---|
| _e.g., Claims adjusters_ | _Primary operators; review agent outputs_ | _Accurate summaries, clear flags_ | _Miss fraudulent claim, approve invalid amount_ |
| _e.g., Policyholders_ | _End beneficiaries; submit claims_ | _Fast resolution, transparency_ | _Delayed payment, loss of trust_ |
| _e.g., Compliance officers_ | _Auditors; review decisions post-hoc_ | _Full audit trail, explainability_ | _Regulatory violation, fines_ |

### 1.3 Expected outcomes

| Outcome | Current baseline | Target | Measurement method |
|---|---|---|---|
| _e.g., Claim review time_ | _4.2 days_ | _< 1 day for standard claims_ | _Median time from submission to initial decision_ |
| _e.g., Accuracy on standard claims_ | _94%_ | _> 97%_ | _Agreement rate with senior adjuster review_ |
| _e.g., Adjuster satisfaction_ | _Not measured_ | _> 4.0 / 5.0_ | _Monthly survey_ |

### 1.4 Constraints and assumptions

```
Constraints:
- [e.g., Must run on existing AWS infrastructure]
- [e.g., Must comply with state insurance regulations in CA, TX, NY]
- [e.g., Budget ceiling: $15K/month in inference costs]
- [e.g., Cannot access policyholder medical records]

Assumptions:
- [e.g., Claims arrive as PDFs with structured cover sheets]
- [e.g., Adjusters will review all agent recommendations before approval]
- [e.g., Training data from last 3 years is representative of current claim patterns]
```

---

## 2. Scope

**Purpose:** Draw a hard line around what this system does and does not do. Scope creep is the silent killer of AI projects. This section is a fence: everything inside the fence is your responsibility; everything outside is not.

Think of scope like the walls of a stadium. Inside, you control the experience. Outside, you don't -- and you shouldn't pretend you do.

### 2.1 In scope

List every capability the system will provide. Be specific enough that someone could write a test case for each item.

```
1. [e.g., Extract structured data from auto claim PDFs: date of loss,
   vehicle info, damage description, estimated amount]
2. [e.g., Classify claims into standard (auto-processable) vs. complex
   (requires human review)]
3. [e.g., Generate initial claim summary for adjuster review]
4. [e.g., Flag potential fraud indicators based on pattern matching]
5. [e.g., Route complex claims to appropriate specialist queue]
```

### 2.2 Out of scope

Equally important -- list what this system will NOT do. This prevents stakeholders from assuming capabilities that don't exist.

```
1. [e.g., Final claim approval -- all decisions require human confirmation]
2. [e.g., Direct communication with policyholders]
3. [e.g., Processing of health insurance or life insurance claims]
4. [e.g., Integration with external fraud detection databases (Phase 2)]
5. [e.g., Multilingual support beyond English and Spanish]
```

### 2.3 Boundary decisions log

Document the key "in or out" decisions and why they were made. This prevents future re-litigation of settled questions.

| Decision | In/Out | Rationale | Decided by | Date |
|---|---|---|---|---|
| _e.g., Fraud scoring_ | _In (limited)_ | _Flag only, no block authority_ | _VP Claims + Legal_ | _2025-01-15_ |
| _e.g., Payment disbursement_ | _Out_ | _Regulatory requires human approval_ | _Compliance_ | _2025-01-15_ |

---

## 3. Domain Ontology (Summary)

**Purpose:** Provide a compact reference to the domain model that underpins this system. The full ontology lives in a separate document (see the Domain Ontology Template), but this section captures the essentials so that anyone reading the spec understands the semantic foundation.

Think of this as the legend on a map. You don't redraw the entire map here, but you explain enough that the reader can orient themselves.

### 3.1 Key entities

| Entity | Definition | Key attributes | Primary states |
|---|---|---|---|
| _e.g., Claim_ | _A request for insurance coverage payment_ | _claim_id, policy_id, date_of_loss, type, amount_ | _submitted, in_review, approved, denied, escalated_ |
| _e.g., Policy_ | _An active insurance contract_ | _policy_id, holder_id, coverage_type, limits, status_ | _active, lapsed, cancelled_ |
| _e.g., Adjuster_ | _Human reviewer assigned to evaluate claims_ | _adjuster_id, specialization, caseload_ | _available, assigned, on_leave_ |

### 3.2 Key relationships

```
Claim --[belongs_to]--> Policy (many-to-one)
Claim --[assigned_to]--> Adjuster (many-to-one)
Policy --[held_by]--> Customer (many-to-one)
Claim --[has_many]--> Document (one-to-many)
```

### 3.3 Critical invariants

These are the rules that must never be violated, regardless of any other system behavior.

```
1. A claim cannot be approved if the associated policy is not active.
2. A claim amount cannot exceed the policy coverage limit.
3. Every claim state transition must be logged with timestamp, actor, and reason.
4. A denied claim must always include a human-reviewed rationale.
```

**Reference:** Full domain ontology document at [link to ontology template].

---

## 4. Agent Architecture

**Purpose:** Define every agent in the system -- its role, capabilities, boundaries, and interfaces. Each agent is like a specialist employee: they have a job title, a job description, tools they can use, and limits on their authority.

### 4.1 Agent roster

For each agent in the system, fill in one block:

```
AGENT: [Name]
  Role: [One-sentence description of what this agent does]
  Mission: [The outcome this agent is responsible for achieving]
  Inputs: [What data/context this agent receives]
  Outputs: [What this agent produces]
  Tools: [External systems or APIs this agent can call]
  Authority level: [What decisions this agent can make autonomously]
  Escalation path: [Where this agent sends cases it cannot handle]
  Failure mode: [What happens when this agent cannot complete its task]
```

**Example:**

```
AGENT: Document Extractor
  Role: Extract structured data from claim PDF documents
  Mission: Produce a complete, accurate structured record from each claim document
  Inputs: Raw PDF file, document type classification
  Outputs: Structured JSON with extracted fields, confidence scores per field
  Tools: OCR service, PDF parser, field validation API
  Authority level: Can flag low-confidence extractions; cannot modify extracted values
  Escalation path: Fields with confidence < 0.85 are flagged for human review
  Failure mode: If extraction fails entirely, claim is routed to manual queue
    with error details attached
```

### 4.2 Agent interaction map

Describe how agents communicate with each other. Who calls whom, what data flows between them, and what happens when communication fails.

```
Flow: [Trigger] --> Agent A --> Agent B --> [Output]

Example:
New claim PDF uploaded
  --> Document Extractor (produces structured data)
  --> Claim Classifier (determines standard vs. complex)
  --> IF standard: Summary Generator (produces adjuster brief)
  --> IF complex: Route to specialist queue with extracted data
```

### 4.3 Human-in-the-loop points

| Decision point | Agent involved | Human role | Timeout behavior |
|---|---|---|---|
| _e.g., Claim approval_ | _Summary Generator_ | _Adjuster confirms or overrides_ | _Auto-escalate to supervisor after 48h_ |
| _e.g., Fraud flag review_ | _Claim Classifier_ | _Fraud analyst investigates_ | _Claim paused, no auto-action_ |

---

## 5. Operational Flow

**Purpose:** Define the end-to-end process as a sequence of steps with clear triggers, handoffs, and fallbacks. This is the assembly line diagram for your system.

Think of an airport's baggage handling system. Every bag follows a defined path from check-in to carousel. There are scanners at checkpoints, diverters for exceptions, and a lost-baggage protocol when things go wrong. Your operational flow serves the same purpose.

### 5.1 Primary flow

```
Step 1: TRIGGER
  Event: [What starts the process -- e.g., new claim document uploaded]
  Source: [Where it comes from -- e.g., customer portal, email intake]
  Validation: [What must be true for the flow to begin -- e.g., valid policy number]

Step 2: [STEP NAME]
  Actor: [Agent or human performing this step]
  Action: [What happens]
  Input: [What this step receives]
  Output: [What this step produces]
  Success criteria: [How we know this step succeeded]
  Timeout: [Maximum time allowed]

Step 3: [STEP NAME]
  ...

Step N: COMPLETION
  Output: [Final deliverable -- e.g., claim summary in adjuster dashboard]
  Notification: [Who is notified -- e.g., assigned adjuster receives alert]
  Logging: [What is recorded -- e.g., full trace ID, timestamps, decisions]
```

### 5.2 Exception flows

For each known exception, define the alternate path:

```
EXCEPTION: [Name -- e.g., Unreadable document]
  Detection: [How the system detects this -- e.g., OCR confidence < 0.5 overall]
  Response: [What happens -- e.g., route to manual intake queue]
  Notification: [Who is alerted]
  Recovery: [How the claim re-enters the primary flow after resolution]
```

### 5.3 Tool integrations

| Tool / API | Purpose | Called by | Authentication | Rate limit | Fallback if unavailable |
|---|---|---|---|---|---|
| _e.g., OCR Service_ | _Text extraction from PDFs_ | _Document Extractor_ | _API key_ | _100 req/min_ | _Queue claim, retry in 5 min_ |
| _e.g., Policy Database_ | _Verify policy status_ | _Claim Classifier_ | _Service account_ | _500 req/min_ | _Flag as "unverified", require human check_ |

---

## 6. Semantic Policy

**Purpose:** Translate the domain ontology's constraints into operational rules the system enforces. Policies are the laws of your system. Some laws are absolute (hard rules), some are contextual (soft rules), and some define when the system must stop and refuse to act.

Think of policies like traffic laws. "Drive on the right side of the road" is a hard rule -- no exceptions. "Yield to pedestrians" is a contextual rule -- it depends on who has the right of way. "Do not enter" is a blocking rule -- you simply cannot proceed.

### 6.1 Hard rules (non-negotiable)

These rules apply in every case, with no exceptions. Violating a hard rule is a system defect.

```
HR-01: [Rule statement]
       Domain justification: [Why this rule exists in the domain]
       Enforcement: [How the system enforces this -- validation, filter, check]
       Violation response: [What happens if violated -- block, alert, rollback]

HR-02: ...
```

**Example:**

```
HR-01: A claim must never be auto-approved if the requested amount exceeds
       $10,000.
       Domain justification: Regulatory requirement for human review above threshold.
       Enforcement: Pre-output validation check on amount field.
       Violation response: Block output, route to human review, log incident.
```

### 6.2 Soft rules (contextual)

These rules apply in most cases but have defined exceptions. Each exception must be documented.

```
SR-01: [Rule statement]
       Default behavior: [What normally happens]
       Exception condition: [When this rule does not apply]
       Exception behavior: [What happens instead]
```

### 6.3 Blocking criteria

These define when the system must refuse to produce any output. A blocked case is not a failure -- it is a deliberate safety mechanism.

```
BC-01: [Condition that triggers blocking]
       Response: [What the system says/does when blocked]
       Escalation: [Where blocked cases go]
```

---

## 7. Evaluation

**Purpose:** Define how you will know whether the system works. Evaluation is not an afterthought -- it is the contract that determines whether the system ships or not.

Think of evaluation like the inspection checklist for a new building. The building isn't "done" when the last nail is hammered. It's done when it passes inspection.

### 7.1 Metric contracts

| Metric ID | Metric name | Definition | Target | Gate (pass/fail threshold) | Measurement method |
|---|---|---|---|---|---|
| _M-01_ | _Extraction accuracy_ | _% of fields correctly extracted vs. human annotation_ | _> 95%_ | _Fail if < 92%_ | _100-case golden dataset_ |
| _M-02_ | _Classification precision_ | _% of "standard" classifications that are correct_ | _> 90%_ | _Fail if < 85%_ | _Confusion matrix on test set_ |
| _M-03_ | _Policy compliance_ | _% of outputs that violate zero hard rules_ | _100%_ | _Fail if < 100%_ | _Automated rule checker on all outputs_ |

### 7.2 Evaluation dataset

```
Dataset name: [e.g., Claims Eval Set v1.0]
Size: [e.g., 200 cases]
Composition:
  - Happy path cases: [count and %]
  - Edge cases: [count and %]
  - Adversarial cases: [count and %]
  - Ambiguity cases: [count and %]
Source: [Where the data came from -- production samples, synthetic, expert-created]
Refresh cadence: [How often the dataset is updated]
```

### 7.3 Release gate

```
Release gate definition:
  ALL of the following must be true:
  - [ ] All metrics meet their gate thresholds
  - [ ] Zero hard rule violations in the full eval suite
  - [ ] No regression > 2% on any metric vs. previous release
  - [ ] Manual review of [N] randomly sampled outputs by [role]
  - [ ] Sign-off by [stakeholder roles]
```

**Reference:** Full evaluation suite at [link to evaluation suite template].

---

## 8. Security and Governance

**Purpose:** Identify the threats this system faces and the controls that mitigate them. Every AI system is a target -- for prompt injection, data poisoning, misuse, and unintended harm. This section is your security posture.

Think of security like the locks, alarms, and cameras in a bank. The vault doesn't just hold money -- it has multiple layers of protection, each designed to stop a different kind of threat.

### 8.1 Risk registry

| Risk ID | Threat | Likelihood | Impact | Mitigation | Residual risk |
|---|---|---|---|---|---|
| _R-01_ | _Prompt injection via claim documents_ | _Medium_ | _High_ | _Input sanitization, output validation_ | _Low_ |
| _R-02_ | _Model hallucinating policy terms_ | _Medium_ | _High_ | _Grounding to policy database, confidence thresholds_ | _Medium_ |
| _R-03_ | _Data leakage of PII in logs_ | _Low_ | _Critical_ | _PII masking in all log outputs_ | _Low_ |

### 8.2 Access controls

```
Agent access:
  - Document Extractor: read-only access to claim documents
  - Claim Classifier: read-only access to policy database
  - No agent has write access to any system of record

Human access:
  - Adjusters: read/approve/deny on assigned claims only
  - Supervisors: read/approve/deny on all claims in their region
  - Admins: system configuration, no claim-level access

Audit logging:
  - Every agent action logged with timestamp, input hash, output hash, and trace ID
  - Logs retained for [duration] per [regulation]
  - Tamper-evident log storage
```

### 8.3 Compliance requirements

| Regulation / Standard | Requirement | How this system complies |
|---|---|---|
| _e.g., State Insurance Code_ | _Human review for claims above threshold_ | _Hard rule HR-01, human-in-loop at approval_ |
| _e.g., GDPR / LGPD_ | _Data minimization, right to explanation_ | _PII masking, decision rationale in every output_ |

---

## 9. Operations

**Purpose:** Define how the system runs in production -- not just how it works when everything is fine, but how you detect, respond to, and recover from problems.

Think of operations like the maintenance manual for an airplane. The plane works beautifully in the air, but it also needs pre-flight checklists, real-time instrument monitoring, and emergency procedures.

### 9.1 Service level objectives (SLOs)

| SLO | Target | Measurement | Alert threshold |
|---|---|---|---|
| _e.g., Availability_ | _99.5% uptime_ | _Heartbeat check every 60s_ | _Alert if down > 3 min_ |
| _e.g., Latency_ | _< 30s per claim processing_ | _P95 latency metric_ | _Alert if P95 > 45s for 5 min_ |
| _e.g., Error rate_ | _< 1% failed extractions_ | _Error count / total count_ | _Alert if > 2% in rolling 1h_ |

### 9.2 Monitoring and alerts

```
Dashboard: [Where operators monitor the system -- e.g., Grafana, Datadog]

Alert channels:
  - Critical: [e.g., PagerDuty --> on-call engineer]
  - Warning: [e.g., Slack channel --> team]
  - Info: [e.g., Daily digest email --> stakeholders]

Key signals to monitor:
  - Inference cost per claim (budget tracking)
  - Confidence score distribution (model drift detection)
  - Hard rule violation count (should always be zero)
  - Queue depth (backlog detection)
```

### 9.3 Runbook reference

| Scenario | Runbook | Owner |
|---|---|---|
| _e.g., Model latency spike_ | _[link to runbook]_ | _ML Ops team_ |
| _e.g., Hard rule violation detected_ | _[link to runbook]_ | _SSA + Compliance_ |
| _e.g., Upstream API outage_ | _[link to runbook]_ | _Platform team_ |

---

## 10. Evolution

**Purpose:** Define how this system will grow and improve over time. A system that cannot evolve is a system that will be replaced. This section captures the hypotheses you want to test and the roadmap for future capabilities.

Think of evolution like a garden plan. You plant the first crops this season, but you already know what you want to plant next season, and you leave space in the soil for it.

### 10.1 Hypotheses backlog

Each hypothesis is a bet about how the system can improve. Hypotheses are tested, not assumed.

| Hypothesis ID | Statement | Expected impact | How to test | Priority |
|---|---|---|---|---|
| _H-01_ | _Adding vehicle image analysis will improve fraud detection by 15%_ | _Reduced fraud losses_ | _A/B test with 500 claims_ | _High_ |
| _H-02_ | _Fine-tuning the classifier on regional data will improve accuracy by 5%_ | _Better regional performance_ | _Regional eval split_ | _Medium_ |

### 10.2 Version roadmap

| Version | Planned capabilities | Dependencies | Target date |
|---|---|---|---|
| _v1.0_ | _Core extraction + classification + summary_ | _None_ | _[date]_ |
| _v1.1_ | _Fraud flag indicators_ | _Fraud pattern database_ | _[date]_ |
| _v2.0_ | _Multi-document claims, image analysis_ | _Vision model integration_ | _[date]_ |

### 10.3 Deprecation plan

```
When a version is superseded:
  1. New version runs in shadow mode for [duration], processing same inputs
  2. Metrics compared between old and new versions
  3. If new version meets all gates: old version enters sunset period of [duration]
  4. During sunset: old version handles overflow only
  5. After sunset: old version decommissioned, artifacts archived
```

---

## Appendix: Document metadata

```
Spec title: [System name] -- Semantic Architecture Specification
Version: [e.g., 1.0]
Author: [SSA name]
Reviewers: [Names and roles]
Created: [Date]
Last updated: [Date]
Status: [Draft / In Review / Approved / Superseded]
```

---

**Completion checklist:**

Before marking this spec as complete, verify that:

- [ ] Every section is filled in or explicitly marked "Not applicable" with a reason
- [ ] All hard rules from the domain ontology appear in Section 6
- [ ] Every agent has a defined failure mode
- [ ] Every metric has a gate threshold, not just a target
- [ ] At least one human-in-the-loop point is defined
- [ ] The security risk registry has been reviewed by someone outside the project team
- [ ] The spec has been reviewed by at least one business stakeholder and one technical stakeholder
