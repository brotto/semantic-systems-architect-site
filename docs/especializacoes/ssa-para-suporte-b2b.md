---
sidebar_position: 6
title: SSA for B2B Support
---

# SSA for B2B Support

## Why B2B support needs semantic architecture

Business-to-business support is fundamentally different from consumer support. When a consumer has a problem with a streaming service, they might be mildly annoyed. When a B2B customer has a problem with their CRM, ERP, or payment processing platform, their entire business operation may grind to a halt. Revenue stops. Employees sit idle. Downstream customers are affected. The stakes are contractual, financial, and relational -- all at the same time.

Think about the difference between a neighborhood plumber and the city water utility. If the neighborhood plumber fixes your kitchen faucet slowly, you are inconvenienced. If the city water utility fails, thousands of homes and businesses lose water, hospitals can't operate, and factories shut down. B2B support is utility-grade support. The consequences of failure cascade through the customer's entire organization.

Three forces make SSA indispensable in B2B support:

### SLA compliance

B2B relationships are governed by Service Level Agreements -- contractual commitments that specify response times, resolution times, uptime percentages, and penalties for non-compliance. An SLA is not a guideline. It is a contract. Missing an SLA means financial penalties (credits, refunds, or contractual damages), and repeated SLA violations can trigger contract termination clauses.

An AI support system must be aware of SLA deadlines at every step. When a ticket comes in, the system must immediately know: what is this customer's SLA tier? How much time do we have to respond? What happens if we miss the deadline? This awareness must be built into the architecture, not bolted on as an afterthought.

### Context-driven resolution

B2B support problems are rarely simple. A consumer might report "my app crashes." A B2B customer reports "our API integration is returning 504 errors on batch uploads exceeding 10,000 records, but only during business hours, and it started after your last platform update on Tuesday." This requires the system to understand the customer's specific environment: what products they use, what integrations they have, what their configuration looks like, and what recent changes might be relevant.

Without semantic architecture, this context is scattered across CRM records, previous tickets, deployment logs, and the memories of individual support engineers. The AI system must assemble this context automatically so that every interaction starts with a complete picture.

### Intelligent escalation

B2B support involves multiple teams: front-line support, product specialists, engineering, customer success managers, and sometimes executives. Knowing when to escalate, to whom, and with what context is the difference between a smooth resolution and a frustrating runaround.

A customer who reports a critical production issue should not be routed through three tiers of support over two days. They should be escalated immediately to the team that can fix the problem, with a complete handoff package. The semantic architecture must define escalation triggers, routing rules, and handoff protocols.

---

## Priority use cases

### 1. Ticket classification

Every incoming ticket must be classified by several dimensions: product area, issue type (bug, configuration, feature request, billing), severity (how badly the customer is affected), urgency (how quickly it needs attention), and SLA tier (what the contract requires).

This classification determines everything downstream: who handles it, how quickly, and with what priority. A misclassification can mean a critical issue sits in a queue for hours while a cosmetic issue gets immediate attention. Think of it as triage in an emergency room: the classification determines who gets treated first, and getting it wrong can be fatal to the customer relationship.

### 2. Log-based diagnosis

Many B2B support issues involve technical systems. Customers submit log files, error messages, stack traces, and screenshots. The system must parse these technical artifacts, identify patterns, and formulate diagnostic hypotheses.

This is where AI excels: a human support engineer might spend 30 minutes reading through a 5,000-line log file looking for the relevant error. An AI system can scan the entire file in seconds, cross-reference the error patterns against a knowledge base of known issues, and present a ranked list of probable causes.

### 3. Knowledge base retrieval

Most B2B support organizations maintain a knowledge base -- documentation, runbooks, troubleshooting guides, known issue articles, and previous ticket resolutions. The system must search this knowledge base intelligently, not just by keyword matching but by understanding the customer's problem and finding content that addresses it.

A customer who reports "data isn't syncing" should get the specific runbook for diagnosing sync failures in their product version, with their integration type, on their deployment platform -- not a generic keyword match.

### 4. Escalation management

When the front-line system cannot resolve an issue, it must escalate. Good escalation means packaging the complete context so the receiving team can act immediately, routing to the right specialist team, and tracking the escalation to ensure it is picked up within the SLA window.

### 5. Customer health scoring

Beyond individual tickets, the system should maintain a holistic view of each customer's relationship health. A customer who submits five critical tickets in two weeks is a retention risk, not five separate problems. The system must aggregate ticket patterns, resolution times, and satisfaction signals into a health score that alerts customer success teams before a customer churns.

---

## Domain-specific ontology

### Core support entities

```
Customer (Account)
  - id, company_name, industry, size (SMB/mid-market/enterprise)
  - contract_tier (standard/premium/enterprise)
  - products: list of subscribed products with versions
  - integrations: list of active integrations
  - deployment_type (cloud/on-premise/hybrid)
  - csm_assigned: customer success manager
  - health_score: 0-100
  - renewal_date, contract_value
  - States: onboarding, active, at_risk, churned

Ticket
  - id, customer_id, created_at, channel (email/chat/phone/API)
  - subject, description, attachments
  - product_area, issue_type (bug/config/feature_request/billing/outage)
  - severity: SEV1 (critical) / SEV2 (major) / SEV3 (moderate) / SEV4 (minor)
  - urgency: immediate, high, normal, low
  - priority: computed from severity x urgency x customer_tier x churn_risk
  - sla_response_deadline, sla_resolution_deadline
  - assigned_team, assigned_agent
  - States: new --> triaged --> in_progress --> pending_customer --> resolved --> closed
                                                                --> reopened (back to in_progress)

Incident
  - id, type (outage/degradation/security/data_loss)
  - affected_products, affected_customers: lists
  - severity, start_time, detection_time, resolution_time
  - root_cause, remediation
  - States: detected --> investigating --> mitigating --> resolved --> post_mortem_complete

SLA
  - id, customer_id, tier
  - response_time_target (by severity): e.g., SEV1 = 15 min, SEV2 = 1 hour
  - resolution_time_target (by severity): e.g., SEV1 = 4 hours, SEV2 = 8 hours
  - uptime_target: percentage (e.g., 99.9%)
  - penalty_structure: credit percentages for breaches
  - measurement_period: monthly/quarterly

Product
  - id, name, current_version, release_date
  - known_issues: list of open bugs with workarounds
  - recent_changes: list of changes in last 30 days
  - documentation_url, runbook_url

Resolution
  - id, ticket_id, type (fix/workaround/configuration_change/feature_request_logged)
  - description, steps_taken
  - verified_by_customer: boolean
  - time_to_resolution
  - reusable: boolean (can this resolution be added to the KB?)

Escalation
  - id, ticket_id, from_team, to_team
  - reason (expertise_needed/sla_risk/customer_request/severity_upgrade)
  - context_package: snapshot of all relevant information
  - sla_time_remaining at escalation
  - States: initiated --> acknowledged --> in_progress --> resolved

KnowledgeArticle
  - id, title, product, category
  - content, last_updated
  - resolution_count: how many tickets this article has resolved
  - applicability: product_versions, deployment_types, integration_types
```

### Priority model: impact x urgency x churn risk

The most critical design decision in B2B support ontology is how tickets are prioritized. A simple severity scale is insufficient because it doesn't account for the customer's context.

```
Priority = f(severity, urgency, customer_tier, churn_risk)

severity (how bad is the problem):
  SEV1 = production down, no workaround
  SEV2 = major functionality impaired, workaround exists
  SEV3 = moderate impact, normal operations possible
  SEV4 = minor issue, cosmetic or informational

urgency (how quickly must it be resolved):
  immediate = business operations stopped now
  high = significant business impact within hours
  normal = important but not time-sensitive
  low = can wait for next release or scheduled maintenance

customer_tier (contractual importance):
  enterprise = largest accounts, premium SLAs, dedicated CSM
  mid-market = significant accounts, standard SLAs
  SMB = smaller accounts, basic SLAs

churn_risk (relationship health):
  high = multiple recent escalations, low satisfaction, renewal approaching
  medium = some recent issues, generally satisfied
  low = healthy relationship, long-term customer
```

A SEV3 ticket from a high-churn-risk enterprise customer may be prioritized higher than a SEV2 ticket from a healthy SMB customer. The ontology must capture this nuance.

---

## Domain-specific constraints

### Hard constraints (non-negotiable)

**SLA deadlines:**
- The system must track SLA response and resolution deadlines for every ticket and escalate automatically when a deadline is at risk
- SLA calculations must use business hours or calendar hours as specified in each customer's contract
- SLA breach notifications must go to the support manager and the customer success manager simultaneously

**Data access per tier:**
- Support agents can only access customer data for accounts assigned to them or escalated to their team
- Customer-specific configuration data, API keys, and log files must not be visible across customer boundaries
- Diagnostic data shared by one customer must never appear in responses to another customer

**Escalation thresholds:**
- SEV1 tickets that are not acknowledged within the SLA response time must auto-escalate to the support manager
- Any ticket that is reopened more than twice must escalate to a senior engineer regardless of severity
- Any ticket from a customer with health_score below 30 must be flagged for the customer success manager

### Soft constraints (adjustable)

**Escalation thresholds (fine-tuning):**
- The default threshold for "at risk of SLA breach" is 75% of the deadline elapsed. This can be adjusted to 50% or 90% based on team capacity.
- The number of reopens before senior escalation (default: 2) can be adjusted by product area

**Communication preferences:**
- Some customers prefer detailed technical explanations. Others prefer executive summaries. The system should adapt based on customer preferences.
- Update frequency should follow customer preference or SLA requirements, whichever is more frequent.

**Knowledge base suggestions:**
- The system may suggest KB articles to customers before creating a ticket (deflection). Some enterprise customers prefer to always have a ticket created regardless.

---

## Agent architecture for B2B support systems

### Agent: Classifier

**Role:** Receive incoming tickets and assign product area, issue type, severity, urgency, and priority.

**Input:** Ticket subject, description, attachments, customer account data (products, tier, health score, recent ticket history).

**Output:** Classified ticket with all priority dimensions populated, SLA deadlines calculated, and initial routing recommendation.

**Key behavior:** The classifier considers both the ticket content and the customer context. A ticket that says "login doesn't work" from an enterprise customer with a production-critical deployment is not the same as the same message from an SMB customer on a trial plan. The classifier enriches the ticket with customer context before assigning priority.

Think of this agent as the intake nurse in an emergency room. The nurse doesn't just listen to the complaint -- they check vital signs, review medical history, and consider the whole patient.

### Agent: Diagnostician

**Role:** Analyze the technical details of the ticket and formulate diagnostic hypotheses.

**Input:** Classified ticket, customer's product configuration, recent platform changes, attached log files or error messages.

**Output:** A ranked list of probable causes with confidence levels, suggested diagnostic steps, and references to relevant KB articles or known issues.

**Key behavior:** This agent cross-references the reported symptoms against three sources: the customer's specific environment (their product version, integrations, configuration), the platform's recent changes (was there a deployment that might explain the timing?), and the historical knowledge base (has this pattern been seen before?).

When the diagnostician identifies a probable cause with high confidence, it suggests a resolution. When confidence is low, it suggests diagnostic steps that will narrow down the cause. It never guesses. When it doesn't know, it says so and recommends escalation to a specialist.

### Agent: KB Retriever

**Role:** Search the knowledge base for articles, runbooks, and previous resolutions relevant to the current ticket.

**Input:** Ticket classification, diagnostic hypotheses, customer's product configuration.

**Output:** A ranked list of KB articles with relevance scores and applicability assessments (does this article apply to this customer's version, deployment type, and integration setup?).

**Key behavior:** The retriever goes beyond keyword matching. It understands the customer's specific context and filters results accordingly. A runbook written for cloud deployments is irrelevant for an on-premise customer, even if the error message matches. The retriever must know the difference and filter appropriately.

### Agent: Resolution Advisor

**Role:** Synthesize diagnostic output and KB results into a recommended resolution path.

**Input:** Diagnostic hypotheses, relevant KB articles, customer history (have they seen this before? what worked last time?).

**Output:** A step-by-step resolution recommendation with confidence level, expected resolution time, and fallback plan if the recommended steps don't work.

**Key behavior:** This agent produces actionable recommendations. Not "check the configuration" but "verify that the API rate limit in Settings > Integrations > API Management is set to at least 10,000 requests/hour, as batch uploads exceeding the default 5,000 limit will return 504 errors." Specificity is what makes the recommendation useful.

### Agent: Escalation Manager

**Role:** Monitor ticket progress against SLA deadlines and trigger escalation when needed.

**Input:** All active tickets, their SLA deadlines, current status, and resolution progress.

**Output:** Escalation decisions with routing, context packages, and notifications.

**Key behavior:** This agent runs continuously, not just when triggered. It monitors the clock for every active ticket and proactively escalates when SLA risk is detected. It does not wait for a support engineer to request escalation -- it initiates it when the data shows that the current path will not meet the deadline.

When escalating, this agent creates a complete context package: what the customer reported, what diagnostic steps were tried, what was found, what was attempted, and why escalation is needed. The receiving team should be able to act immediately without asking the customer to repeat anything.

---

## Case study: enterprise support system for a SaaS platform

### The scenario

DataFlow is a B2B data integration platform used by 400 enterprise customers. Their support team of 25 engineers handles approximately 1,200 tickets per month. Current pain points:

- 30% of tickets are misclassified on intake, leading to incorrect routing and delayed resolution
- Average time to first meaningful response is 4.2 hours, against an SLA target of 2 hours for enterprise customers
- 18% of resolved tickets are reopened within 7 days
- Two enterprise customers churned last quarter, citing poor support experience

### The design challenge

DataFlow needs a system that improves classification accuracy, accelerates first response, reduces reopen rates, and provides early warning for at-risk accounts. The system must work alongside the existing support team, not replace them.

### Ontology decisions

The SSA identifies 10 core entities: Customer, Ticket, Incident, SLA, Product, KnownIssue, Resolution, Escalation, KnowledgeArticle, and CustomerHealthScore.

Key design decisions:

- **Product** includes a "recent_changes" attribute that is automatically populated from the deployment pipeline. This allows the diagnostician to correlate ticket timing with platform changes -- a pattern that explains many B2B support issues.
- **KnownIssue** is a separate entity from KnowledgeArticle. Known issues are active problems that have not yet been fixed. KB articles are general troubleshooting content. The system must know the difference because a known issue requires a workaround and a timeline, not a generic fix.
- **CustomerHealthScore** is computed daily from ticket volume, severity distribution, reopen rate, satisfaction signals, and contract renewal proximity. It is not a static attribute -- it is a continuously updated entity that drives proactive behavior.

### Constraint architecture

Hard constraints:
- SLA deadlines are tracked in real-time. When a ticket reaches 75% of its SLA response deadline without acknowledgment, the system auto-escalates.
- SEV1 tickets always bypass the regular queue and route directly to a senior engineer plus the on-call product specialist.
- Customer data isolation is enforced at every layer. No diagnostic data, configuration details, or account information crosses customer boundaries.

Soft constraints:
- Communication cadence follows customer preference (some want updates every 2 hours, some want daily summaries).
- KB deflection is enabled for standard-tier customers but disabled for enterprise customers who expect white-glove service.
- Auto-resolution suggestions are shown to agents before being sent to customers, allowing the agent to personalize the response.

### Agent topology

```
Incoming ticket --> [Classifier Agent] --> classified + prioritized ticket
                                              |
                    +-------------------------+-------------------------+
                    |                                                   |
                    v                                                   v
          [Diagnostician Agent]                               [KB Retriever Agent]
                    |                                                   |
                    +-------------------------+-------------------------+
                                              |
                                              v
                                   [Resolution Advisor Agent]
                                              |
                                              v
                                     Agent recommendation
                                              |
                                              v
                                   Human agent review + action
                                              |
                     (continuous monitoring)   |
                    [Escalation Manager Agent] |
                              monitors all active tickets
```

### Evaluation design

The eval suite contains 60 test tickets:
- 25 common issues (password resets, configuration questions, feature inquiries) -- expected SEV3-4, standard routing
- 15 technical issues (integration errors, performance degradation, data sync failures) -- expected SEV2-3, specialist routing
- 10 critical issues (production outages, data loss, security incidents) -- expected SEV1, immediate escalation
- 5 customer-context tickets (same issue, different customers with different tiers and health scores) -- tests priority model
- 5 escalation scenarios (tickets that should trigger time-based, reopen-based, or customer-health-based escalation)

Key metrics:
- **Classification accuracy:** at least 90% of tickets classified correctly on all dimensions (product, issue type, severity)
- **SLA compliance:** the system should enable 95% SLA compliance, up from the current 78%
- **Reopen rate:** target below 10%, down from 18%
- **Escalation precision:** at least 85% of automated escalations should be confirmed as appropriate by the receiving team

### Lessons from this case study

1. **Customer context is as important as ticket content.** The same error message means different things from different customers. The ontology must make customer context available to every agent.
2. **SLA tracking is a continuous process, not a one-time calculation.** The escalation manager runs as a background monitor, not as a triggered action.
3. **Known issues need a separate entity.** Conflating known issues with KB content leads to confusing responses when the real answer is "this is a known bug, here is the workaround."
4. **Customer health scoring connects tickets to business outcomes.** Without it, support is reactive. With it, support becomes proactive -- identifying at-risk accounts before they churn.

---

## Next step

Apply what you've learned in the [B2B Support Lab](./lab-suporte-b2b), where you'll build a ticket handling flow from scratch.
