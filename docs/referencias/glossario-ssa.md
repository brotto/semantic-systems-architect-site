---
sidebar_position: 2
sidebar_label: "Glossary"
---

# SSA Glossary

This glossary defines the key terms used throughout the SSA Academy curriculum. Each entry includes the term, a definition, the module where the term is primarily introduced, and a concrete example.

Use this reference whenever you encounter an unfamiliar term in the lessons, applications, or assessments.

---

## A

**Agent.** An intelligent component within an AI system that receives context, makes decisions, and produces outputs according to its semantic contract. Agents are distinguished from traditional software services by their ability to interpret meaning rather than only execute code. Introduced in Module 3.
*Example:* A triage agent in a customer support system reads an incoming message, classifies the customer's intent, assesses urgency, and routes the request to the appropriate specialist agent.

**Agent matrix.** A structured document that defines every agent in a multi-agent system, including each agent's role, scope, boundaries, inputs, outputs, and prohibited behaviors. Introduced in Module 3.
*Example:* A table listing six agents (triage, billing, technical support, escalation, quality review, and audit) with columns for role description, allowed actions, prohibited actions, and escalation triggers.

**Ambiguity stress test.** A structured exercise in which the practitioner collects expressions from a domain that different people interpret differently, then measures interpretation divergence and resolves it with operational definitions. Introduced in Module 2.
*Example:* The word "urgent" might mean "within 1 hour" to the support team and "within 24 hours" to the engineering team. The stress test surfaces this gap and produces an operational definition.

**Architecture canvas.** A visual and conceptual overview that maps all the components of SSA work (ontology, agents, workflows, context, evaluation, security, operations) and their relationships. Introduced in Module 1.
*Example:* A single-page diagram showing how the domain ontology feeds into agent role definitions, which connect to workflow stages, which reference context packages, which are verified by the eval suite.

---

## B

**Blameless post-mortem.** A structured review process conducted after an incident that focuses on understanding what happened and improving the system, without assigning personal blame. The goal is organizational learning, not punishment. Introduced in Module 8.
*Example:* After an agent produces incorrect billing calculations for 3 hours, the team documents the timeline, identifies the root cause (a constraint that was classified as soft when it should have been hard), and updates the constraint matrix.

---

## C

**Circuit breaker.** A resilience pattern that stops a failing operation from being retried indefinitely. When a tool or service fails repeatedly, the circuit breaker "opens" and redirects the workflow to a fallback path, preventing cascading failures. Introduced in Module 4.
*Example:* If the payment API fails three times in a row, the circuit breaker stops calling it and routes the request to a queue for manual processing instead of making the user wait through more failures.

**Compensation action.** A corrective action taken to undo or mitigate the effects of a partially completed workflow step that cannot be completed normally. Introduced in Module 4.
*Example:* If an agent successfully creates a support ticket but fails to send the confirmation email, the compensation action adds a flag to the ticket noting that the customer was not notified.

**Competency map.** A structured reference that lists every competency developed across the SSA curriculum, organized by module, with descriptions, observable behaviors, evidence requirements, and proficiency levels. Introduced in the Reference section.
*Example:* The entry for "Domain decomposition" describes what this competency is, what someone who has it does in practice, what artifacts prove they have it, and what Awareness versus Application versus Mastery looks like.

**Constraint matrix.** A document that classifies every important domain rule as a hard constraint, soft constraint, or exception, and specifies the enforcement behavior for each category. Introduced in Module 2.
*Example:* In a medical scheduling system, "a patient cannot have two appointments at the same time" is a hard constraint, "appointments should be at least 30 minutes apart" is a soft constraint, and "emergency appointments can override all scheduling rules" is an exception.

**Context engineering.** The discipline of designing the complete package of information, instructions, and rules that shapes an agent's behavior. It includes deciding what the agent sees, what it knows, and how its instructions are structured. Introduced in Module 5.
*Example:* Designing a context package for a legal review agent that includes the company's compliance policies as static context, the specific document under review as dynamic context, and relevant precedents retrieved from a knowledge base as retrieved context.

**Context package.** A versioned artifact that bundles everything an agent needs to perform its function: mission statement, policies, ontology references, output schema, few-shot examples, and change log. Introduced in Module 5.
*Example:* A context package for a product recommendation agent that includes the product taxonomy, pricing rules, personalization policies, output format specification, three example interactions, and a version history.

**Context window budget.** The practice of managing the limited amount of information that can fit in an agent's context window, prioritizing the most important information and managing what is included versus excluded. Introduced in Module 5.
*Example:* A context window of 128,000 tokens must accommodate 2,000 tokens for the system prompt, 500 tokens for the ontology reference, up to 4,000 tokens for retrieved documents, and the remaining space for the conversation history.

---

## D

**Domain ontology.** A formal structure that defines everything that exists in a system's world: the entities, their properties, their relationships, their valid states, and the rules that govern them. It serves as the shared knowledge backbone that all agents reference. Introduced in Module 2.
*Example:* An e-commerce ontology defines entities like Product, Order, Customer, Shipment, and Return, their relationships (a Customer places an Order, an Order contains Products), their states (Order can be pending, confirmed, shipped, delivered, returned), and their rules (an Order cannot be shipped before payment is confirmed).

---

## E

**Error budget.** The acceptable amount of quality degradation over a given period, derived from the SLO. If the system's SLO is 99% accuracy, the error budget is 1%, which means 1% of responses can fall below the quality threshold before the team must stop making changes and focus on reliability. Introduced in Module 8.
*Example:* A customer support agent has an SLO of 95% correct resolutions per week. In a week with 1,000 interactions, the error budget allows 50 incorrect resolutions. If the system reaches 48, the team pauses feature work and investigates.

**Eval suite (evaluation suite).** A structured collection of test cases designed to measure the quality and correctness of an AI system's behavior. It includes golden datasets, rubric-based scoring criteria, and regression gates. Introduced in Module 6.
*Example:* A suite of 60 test cases for a medical triage agent, covering 20 common scenarios, 20 edge cases (unusual symptom combinations), and 20 adversarial scenarios (attempts to extract medical advice the agent should not give).

---

## F

**Failure drill.** A structured exercise in which the team deliberately simulates failure conditions in a controlled environment to test the system's detection and recovery mechanisms. Introduced in Module 3.
*Example:* The team simulates a scenario where the main classification agent stops responding, and observes whether the supervisor agent detects the failure within the defined timeout and routes the request to the fallback agent.

**Failure policy matrix.** A document that defines retry, fallback, and compensation strategies for every critical step in a workflow. Introduced in Module 4.
*Example:* A matrix listing each workflow step, the types of failures that can occur, the number of retries allowed, the timeout duration, the fallback behavior, and the compensation action if the step cannot be completed.

**Few-shot examples.** A small set of carefully chosen input-output pairs included in an agent's context to demonstrate the expected behavior pattern. They serve as behavioral anchors that guide the model toward consistent responses. Introduced in Module 5.
*Example:* Three examples showing how a classification agent should categorize customer messages: one example of a billing inquiry, one example of a technical issue, and one example of a complaint that requires escalation.

---

## G

**Golden dataset.** A curated set of test cases with known correct answers, used as the ground truth for evaluating system quality. Each entry includes the input, the expected output, and often the reasoning behind the expected output. Introduced in Module 6.
*Example:* A set of 100 customer messages, each annotated with the correct category, priority level, and expected agent response, reviewed and approved by domain experts.

**Governance model.** A structured framework that defines who can do what within an AI system, including access controls, audit requirements, approval workflows, and change management procedures. Introduced in Module 7.
*Example:* A governance model that specifies that only senior SSAs can modify the domain ontology, all prompt changes require peer review, model tier changes require product owner approval, and all changes are logged in an audit trail.

**Graceful degradation.** A design strategy in which a system provides reduced but still useful functionality when a component fails, rather than failing completely. The system communicates its limitations transparently. Introduced in Module 4.
*Example:* When the recommendation engine is unavailable, the product page shows the most popular items in the category instead of personalized recommendations, with a note indicating that recommendations are temporarily unavailable.

**Guardrail.** A behavioral risk containment mechanism that prevents an AI system from producing outputs that violate defined policies, safety requirements, or ethical boundaries. Guardrails can operate at the input level, the output level, or both. Introduced in Module 7.
*Example:* An output guardrail that checks every response from a financial advice agent and blocks any response that contains specific investment recommendations, replacing it with a disclosure statement directing the user to a licensed advisor.

---

## H

**Handoff.** The formal transfer of state and responsibility from one agent to another within a multi-agent system. A well-designed handoff includes the information being passed, the confidence level of the sending agent, and the criteria that triggered the transfer. Introduced in Module 3.
*Example:* When a triage agent determines that a customer message is about a billing dispute, it hands off to the billing agent with a message containing the customer ID, the identified issue category, the confidence score (0.92), the original message, and relevant account history.

**Handoff protocol.** A formal specification that defines how agents transfer work between each other. It includes message schemas, required fields, confidence thresholds, escalation criteria, and failure handling procedures. Introduced in Module 3.
*Example:* A protocol specifying that every handoff message must include sender agent ID, receiver agent ID, handoff reason, confidence score, payload (structured data), and a fallback instruction if the receiving agent cannot process the request.

**Hard constraint.** A domain rule that must never be violated under any circumstances. Violation of a hard constraint represents a system failure that should trigger alerts and potentially halt processing. Introduced in Module 2.
*Example:* In a pharmaceutical system, "a prescription cannot exceed the maximum safe dosage for the patient's weight and age" is a hard constraint. There is no business justification for ever violating this rule.

---

## I

**Invariant.** A property or condition that must always remain true throughout the lifecycle of an entity in the system. Invariants are a specific type of hard constraint tied to entity state. Introduced in Module 2.
*Example:* In an order management system, the invariant "the total of all line items must equal the order total" must hold true at every point in the order's lifecycle, from creation through modification to completion.

---

## K

**Kickoff document.** A structured document produced at the start of an SSA project that identifies stakeholders, constraints, architecture hypotheses, semantic risks, and success criteria. It serves as the foundation for all subsequent design work. Introduced in Module 1.
*Example:* A kickoff document for an AI-powered customer onboarding system that lists the product owner, engineering lead, and compliance officer as stakeholders; identifies regulatory constraints around data handling; hypothesizes a three-agent architecture; and notes the risk that "onboarding" means different things to different departments.

---

## L

**Lifecycle state.** One of the defined states that an entity can occupy during its existence in the system. States are connected by valid transitions, and each transition may have preconditions and postconditions. Introduced in Module 2.
*Example:* A support ticket can be in states: open, assigned, in-progress, pending-customer, resolved, or closed. Valid transitions include open-to-assigned and in-progress-to-pending-customer, but not closed-to-open.

---

## M

**Metric contract.** A document that maps business KPIs to quality indicators to technical signals, with defined thresholds, measurement methods, and ownership for each metric. Introduced in Module 6.
*Example:* A metric contract that maps "customer satisfaction" (business KPI) to "first-response accuracy" (quality indicator) to "eval suite pass rate on golden dataset" (technical signal), with a threshold of 92%, measured daily, owned by the SSA team lead.

**Model-tier routing.** The practice of directing different types of requests to different AI models based on complexity, cost, latency requirements, or quality needs. Simpler requests go to smaller, faster, cheaper models; complex requests go to larger, more capable models. Introduced in Module 8.
*Example:* A system that routes simple FAQ-style questions to a small, fast model at 0.001 USD per request, medium-complexity questions to a mid-tier model at 0.01 USD per request, and complex reasoning tasks to a large model at 0.10 USD per request.

---

## N

**North-star metric.** The single most important metric that captures whether the AI system is delivering on its core promise. All other metrics and optimization efforts should ultimately serve this metric. Introduced in Module 8.
*Example:* For an AI-powered customer support system, the north-star metric might be "percentage of customer issues fully resolved without human intervention within the first interaction."

---

## O

**Observability.** The ability to understand the internal state of a system by examining its outputs, traces, and logs. In AI systems, observability goes beyond error detection to include tracking decision quality, behavioral consistency, and semantic correctness. Introduced in Module 6.
*Example:* An observability dashboard that shows not just whether the agent responded (availability) but how confidently it responded (confidence distribution), whether its responses matched expected patterns (semantic consistency), and how response quality has trended over the past 7 days.

**Ontology evolution.** The process of updating and extending the domain ontology over time as the domain changes, new entities emerge, or understanding deepens. Ontology evolution must be managed carefully to avoid breaking existing contracts and agents. Introduced in Module 8.
*Example:* Adding a new entity type "Subscription" to an e-commerce ontology that previously only handled one-time purchases, which requires updating the Order entity relationships, creating new lifecycle states, and modifying all agents that handle orders.

**Operational definition.** A precise, measurable specification that replaces an ambiguous term with a definition that different people will apply consistently. Operational definitions eliminate interpretation disagreement. Introduced in Module 2.
*Example:* Replacing the ambiguous term "high-priority customer" with the operational definition "a customer with annual revenue greater than 50,000 USD, or a customer with an active enterprise contract, or a customer explicitly flagged by the account manager."

---

## P

**Pipeline (topology).** An orchestration topology in which agents are arranged in a linear sequence, each processing the output of the previous one. Data flows in one direction, and each agent adds a specific transformation or decision. Introduced in Module 3.
*Example:* A content moderation pipeline where Agent 1 extracts text from the submission, Agent 2 classifies the content category, Agent 3 checks policy compliance, and Agent 4 generates the moderation decision.

**Policy pack.** A collection of explicit rules and guidelines that define what an agent or system is allowed to do, must do, and must never do. Policy packs are referenced by context packages and enforced by guardrails. Introduced in Module 7.
*Example:* A policy pack for a financial services agent that includes rules about not providing investment advice, not sharing customer data across accounts, always disclosing that it is an AI system, and escalating to a human when the customer explicitly requests one.

**Prompt drift.** The gradual degradation of prompt effectiveness over time, caused by model updates, changing user behavior, or accumulating edge cases that the original prompt did not anticipate. Introduced in Module 5.
*Example:* A classification prompt that achieved 95% accuracy at launch gradually drops to 87% over three months as the model receives updates that change how it interprets certain instruction patterns.

---

## R

**Regression gate.** An automated checkpoint in the deployment process that compares the quality of a new version against the current version using the eval suite. If quality drops below the defined threshold, the gate blocks the deployment. Introduced in Module 6.
*Example:* Before deploying a new version of the triage agent, the regression gate runs the full eval suite of 60 test cases. If accuracy drops by more than 2 percentage points compared to the current version, the deployment is blocked.

**Role matrix.** A document that defines every role in a multi-agent system, specifying what each role is responsible for, what it is allowed to do, what it is prohibited from doing, and how it interacts with other roles. Synonymous with agent matrix. Introduced in Module 3.
*Example:* A matrix showing that the billing agent can access payment history and process refunds but cannot access medical records or modify account settings.

---

## S

**Semantic contract.** An explicit agreement that specifies what a system component receives (input), what decisions it makes (decision logic), and what it produces (output), defined in terms of meaning rather than only data types. Semantic contracts are the bridge between the ontology and the implementation. Introduced in Module 2.
*Example:* A contract for a refund eligibility agent that specifies: it receives an order ID and a refund reason; it decides whether the refund is eligible based on the return policy, order age, and product condition; it outputs a structured decision with eligibility status, applicable policy rule, and recommended refund amount.

**Semantic interface.** An integration point between system components defined by intention and meaning, not just technical data types. Semantic interfaces ensure that both the sender and receiver agree on what the data means, not just what format it takes. Introduced in Module 2.
*Example:* An interface between the triage agent and the billing agent that specifies not just that a "customer ID" field is a string, but that it refers to the unique identifier of the customer who initiated the current interaction, and must correspond to an active account.

**Semantic on-call.** An operational practice focused on monitoring and responding to AI behavior incidents, as distinct from infrastructure incidents. Semantic on-call focuses on quality degradation, contract violations, and behavioral anomalies. Introduced in Module 8.
*Example:* The semantic on-call engineer notices that the sentiment analysis agent has started classifying sarcastic messages as positive, which is a behavioral change that would not trigger any infrastructure alerts but represents a quality failure.

**Semantic regression.** A worsening of the conceptual or behavioral quality of an AI system after a change, even if the system continues to function technically. Semantic regression is often invisible to traditional monitoring because no errors are thrown. Introduced in Module 6.
*Example:* After a model update, the support agent continues to respond to all queries (no errors) but starts giving overly generic answers that no longer reference the customer's specific situation, reducing resolution quality by 15%.

**Semantic Systems Architect (SSA).** A professional who designs computer systems through language-oriented semantic modeling. The SSA defines meaning structures -- ontologies, contracts, context packages, and evaluation criteria -- that guide AI system behavior. Introduced in Module 1.
*Example:* An SSA at a healthcare company designs the domain ontology for a patient intake system, defines the semantic contracts for the triage, scheduling, and follow-up agents, creates the context packages, builds the eval suite, and oversees the system's operational quality.

**Semantic technical debt.** The accumulation of shortcuts, ambiguities, and unresolved inconsistencies in the meaning layer of an AI system. Like traditional technical debt, it increases the cost and risk of future changes. Introduced in Module 8.
*Example:* Using the same word "status" to mean three different things in different parts of the ontology (order status, delivery status, payment status) without creating distinct terms. This works initially but causes confusion as the system grows.

**SLA (Service Level Agreement).** A formal agreement between a service provider and a customer that defines the expected level of service, typically with consequences for violations. In AI systems, SLAs must account for both availability and quality dimensions. Introduced in Module 8.
*Example:* An SLA guaranteeing that the AI support system will be available 99.9% of the time and will correctly resolve at least 90% of tier-1 support requests, with a credit mechanism if either target is missed.

**SLI (Service Level Indicator).** A quantitative measurement of a specific aspect of the service level. SLIs are the raw measurements from which SLOs are evaluated. Introduced in Module 8.
*Example:* The ratio of requests where the agent's response was rated as correct by the eval suite to the total number of requests processed, measured every hour.

**SLO (Service Level Objective).** An internal target for a specific quality metric, expressed as a percentage or threshold over a time period. SLOs are more ambitious than SLAs and serve as the team's internal quality bar. Introduced in Module 8.
*Example:* An SLO stating that 95% of customer interactions should receive a correct resolution within the first response, measured weekly, with the team investigating whenever the rate drops below 93%.

**Soft constraint.** A domain rule that represents a preference or guideline that should generally be followed but can be violated when justified. Soft constraints have costs associated with violation rather than absolute prohibition. Introduced in Module 2.
*Example:* In a scheduling system, "appointments should be at least 30 minutes apart" is a soft constraint. It can be violated when a patient has an urgent need, but the system should log the violation and notify the scheduler.

**STRIDE framework.** A threat modeling methodology that categorizes threats into six types: Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, and Elevation of privilege. Adapted for AI systems to include semantic threats. Introduced in Module 7.
*Example:* Applying STRIDE to an AI system: Spoofing (an attacker impersonates a legitimate user), Tampering (prompt injection modifies the agent's behavior), Repudiation (no audit trail for the agent's decisions), Information disclosure (the agent leaks training data), Denial of service (flooding the system with requests), Elevation of privilege (a user tricks the agent into performing admin-level actions).

**Structural prompting.** The technique of organizing agent instructions using a clear hierarchical structure with distinct sections for identity, policies, task instructions, output schemas, and refusal rules. Structural prompting improves predictability and consistency. Introduced in Module 5.
*Example:* A prompt organized into sections: IDENTITY (you are a billing support agent), POLICIES (never disclose other customers' information, always verify identity before making changes), TASK (help the customer resolve their billing question), OUTPUT SCHEMA (respond in the defined JSON format), REFUSAL (if asked about non-billing topics, redirect to the appropriate department).

**Supervisor (topology).** An orchestration topology in which a central supervisor agent receives requests, decides which specialist agents should handle them, monitors their progress, and assembles the final response. Introduced in Module 3.
*Example:* A supervisor agent receives a complex customer request, determines it requires input from both the billing agent and the technical support agent, dispatches work to both, collects their responses, and synthesizes a unified reply.

**Swarm (topology).** An orchestration topology in which agents operate with greater autonomy, communicating peer-to-peer without a central supervisor. Agents coordinate through shared state or message passing. Suitable for problems where centralized control would create bottlenecks. Introduced in Module 3.
*Example:* A research system where multiple analysis agents independently explore different aspects of a question, share their findings through a shared workspace, build on each other's results, and converge toward a comprehensive answer without any single agent directing the process.

---

## T

**Threat model.** A structured analysis that maps the attack vectors, risks, vulnerabilities, and mitigations relevant to a specific AI system. A threat model identifies what can go wrong, who might cause it, and how the system defends against it. Introduced in Module 7.
*Example:* A threat model for a customer-facing chatbot that identifies prompt injection as a high-likelihood, high-impact threat; maps the attack surface (user input, retrieved documents, tool outputs); and defines mitigations (input sanitization, output validation, guardrails on sensitive actions).

**Tool contract.** A specification that defines how an agent interacts with an external tool, including the tool's purpose, argument schema, required permissions, expected outputs, error handling, and safety rules. Introduced in Module 4.
*Example:* A tool contract for a database query tool specifying that the agent can execute read-only queries on the customer database, must include a customer ID in every query, cannot access the payments table, and must handle timeout errors by returning a "data unavailable" message.

**Topology.** The structural pattern that defines how agents are organized and communicate within a multi-agent system. The three primary topologies are supervisor, pipeline, and swarm, with hybrid combinations possible. Introduced in Module 3.
*Example:* Choosing a pipeline topology for a document processing system where each stage (extraction, classification, validation, storage) must happen in sequence, versus a supervisor topology for a customer service system where different request types need to be routed to different specialists.

**Traceability.** The ability to track every decision, action, and data transformation through an AI system from input to output. Traceability supports debugging, incident investigation, compliance auditing, and continuous improvement. Introduced in Module 4.
*Example:* A trace record that shows a customer message arrived at 14:32:07, was classified by the triage agent at 14:32:08 with confidence 0.94, was routed to the billing agent at 14:32:08, the billing agent retrieved the account record at 14:32:09, and produced the final response at 14:32:11.

---

## U

**Unit economics.** The financial analysis of what it costs to serve a single unit of value (one customer interaction, one document processed, one decision made) in an AI system. Unit economics are essential for understanding whether the system is financially sustainable at scale. Introduced in Module 8.
*Example:* Calculating that each customer support interaction costs 0.08 USD in model inference, 0.02 USD in retrieval, and 0.01 USD in infrastructure, for a total of 0.11 USD per interaction, compared to 4.50 USD for a human agent handling the same request.

---

## V

**Versioned ontology.** A domain ontology maintained under version control, with a change log that documents what changed, why it changed, and what impact the change has on existing contracts, agents, and evaluations. Introduced in Module 2.
*Example:* Ontology v2.3 adds a new entity "Subscription" and modifies the "Order" entity to include a "recurring" flag. The change log notes that this change requires updates to the billing agent contract and the addition of 15 new eval test cases.

---

## W

**Workflow blueprint.** A structured document that maps a complete business process from trigger to audit, showing every stage, decision point, verification gate, and the agents responsible for each step. Introduced in Module 4.
*Example:* A blueprint for a loan application workflow showing the trigger (application submitted), intake stage (document collection agent), verification stage (identity verification agent, income verification agent running in parallel), decision stage (underwriting agent), notification stage (customer communication agent), and audit stage (compliance logging).
