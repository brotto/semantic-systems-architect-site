---
sidebar_position: 1
sidebar_label: "Architectural Patterns"
---

# SSA Architectural Patterns

Choosing the right architectural pattern for an AI system is like choosing the right organizational structure for a hospital. A small rural clinic does not need the departmental hierarchy of a major research hospital, but a research hospital cannot function with the flat structure of a rural clinic. The pattern must match the problem.

This playbook covers six foundational patterns that SSAs encounter in practice. Each pattern has specific strengths, specific failure modes, and specific conditions under which it is the right choice. The goal is not to memorize patterns but to develop the judgment to select, combine, and adapt them for real projects.

---

## How to Use This Playbook

Before diving into patterns, understand the decision process:

1. **Characterize the problem** -- What are the inputs, outputs, decision complexity, risk level, and volume?
2. **Identify constraints** -- What are the latency requirements, budget limits, regulatory obligations, and team capabilities?
3. **Select a candidate pattern** -- Use the decision matrix at the end of this playbook.
4. **Validate against anti-patterns** -- Cross-reference with the Anti-patterns and Recovery playbook.
5. **Plan for evolution** -- No pattern is permanent. Design for the ability to migrate between patterns as needs change.

---

## Pattern 1: Supervisor + Experts

### The Analogy

Think of a hospital emergency department. A triage nurse (the supervisor) evaluates every patient who walks in. Based on the assessment, the nurse routes the patient to the appropriate specialist -- a cardiologist, an orthopedic surgeon, or a general practitioner. The triage nurse does not treat patients directly but understands enough about every specialty to make correct routing decisions.

### Architecture Description

The Supervisor + Experts pattern consists of one coordinating agent (the supervisor) and multiple specialized agents (the experts). The supervisor receives incoming requests, analyzes them, determines which expert or combination of experts should handle each request, dispatches the work, and assembles the final response.

```
[User Request]
      |
      v
 [Supervisor Agent]
   /    |    \
  v     v     v
[Expert A] [Expert B] [Expert C]
  \     |     /
   v    v    v
 [Supervisor Agent]
      |
      v
 [Final Response]
```

### When to Use

- The problem domain spans multiple distinct skill areas that require different instructions, tools, or knowledge bases.
- You need centralized control over routing decisions and can afford the latency of a coordination layer.
- Auditability is important -- you want a clear record of why each request was routed to a specific expert.
- The number of experts is manageable (typically 3 to 8). Beyond that, the supervisor's routing logic becomes brittle.

### When NOT to Use

- The problem is sequential in nature, where each step depends on the output of the previous step. Use a Pipeline instead.
- All tasks are similar enough that one well-designed agent can handle them. Adding a supervisor to route between near-identical agents adds cost without value.
- Latency is extremely tight. The supervisor adds at least one extra LLM call to every request.
- You need peer-to-peer coordination between experts. The supervisor creates a hub-and-spoke topology that makes lateral communication awkward.

### Key Contracts

The Supervisor + Experts pattern requires three types of contracts:

**Routing Contract** -- Defines how the supervisor selects experts. This contract specifies the classification criteria, the mapping between request categories and experts, and the fallback behavior when no expert matches.

**Expert Contract** -- Each expert agent has its own semantic contract defining its identity, scope boundaries, input expectations, output format, and quality criteria. Every expert must declare what it can and cannot handle.

**Assembly Contract** -- When multiple experts contribute to a response, the assembly contract defines how the supervisor combines, prioritizes, and resolves conflicts between expert outputs.

### Failure Modes

**Supervisor Bottleneck** -- Every request passes through the supervisor, making it a single point of failure. If the supervisor misclassifies a request, the entire response fails even if the experts are functioning perfectly. Mitigation: implement a confidence threshold on routing decisions. When the supervisor's confidence is below the threshold, route to a fallback expert or escalate to a human.

**Expert Scope Creep** -- Over time, experts accumulate responsibilities that overlap with other experts. Two experts start answering the same type of question with different answers. Mitigation: enforce strict scope boundaries in expert contracts and run regular scope audits using test suites that verify each expert rejects out-of-scope requests.

**Assembly Conflicts** -- When two experts provide contradictory information, the supervisor must resolve the conflict. Without explicit resolution rules, the supervisor may silently drop one expert's contribution. Mitigation: define explicit conflict resolution strategies in the assembly contract -- priority ranking, confidence-based selection, or escalation to human review.

### Scaling Considerations

Adding more experts does not scale linearly. Each new expert increases the complexity of the supervisor's routing logic. At around 8-10 experts, consider grouping experts into sub-teams, each with its own sub-supervisor. This creates a hierarchical Supervisor + Experts pattern.

---

## Pattern 2: Pipeline by Stage

### The Analogy

Think of a car assembly line. The chassis arrives at Station 1, where the frame is welded. It moves to Station 2, where the engine is installed. Station 3 adds the electrical system. Station 4 paints the body. Each station has a specific job, specific inputs it expects, and specific outputs it produces. No station needs to understand what the other stations do -- it only needs to honor the contract with the stations immediately before and after it.

### Architecture Description

The Pipeline pattern processes work through a fixed sequence of stages. Each stage receives a defined input, performs a transformation, and produces a defined output that becomes the input for the next stage. The output of the final stage is the system's response.

```
[Input] -> [Stage 1: Extract] -> [Stage 2: Analyze] -> [Stage 3: Decide] -> [Stage 4: Format] -> [Output]
             |                     |                     |                     |
             v                     v                     v                     v
         [Stage Log]           [Stage Log]           [Stage Log]           [Stage Log]
```

### When to Use

- The work naturally decomposes into sequential steps where each step depends on the output of the previous one.
- You need fine-grained traceability. Because each stage logs its input and output, you can pinpoint exactly where a problem occurred.
- Different stages benefit from different model configurations (temperature, model size, tool access).
- The process is relatively stable -- the stages do not change frequently.

### When NOT to Use

- The problem requires dynamic routing based on content. A pipeline cannot skip stages or reorder itself mid-execution.
- Multiple independent tasks need to run in parallel. A pipeline is inherently sequential.
- The problem is exploratory -- you do not know in advance what steps will be needed.

### Key Contracts: Stage Contracts

Every stage in a pipeline requires a Stage Contract that defines:

**Input Schema** -- The exact structure and content the stage expects to receive. If Stage 2 expects a JSON object with fields "entities" and "relationships," this must be specified precisely.

**Transformation Logic** -- What the stage does with its input. This is the stage's semantic contract -- its identity, instructions, and quality criteria.

**Output Schema** -- The exact structure and content the stage produces. This must be compatible with the next stage's Input Schema.

**Stage Metadata** -- Each stage output includes metadata: processing time, confidence score, model used, and any warnings or anomalies detected. This metadata travels with the payload through the entire pipeline.

### Failure Modes

**Cascade Failure** -- An error in Stage 1 propagates through every subsequent stage, potentially amplifying with each step. A small extraction error becomes a large analysis error becomes a catastrophic decision. Mitigation: implement validation gates between stages. Each gate checks the output of the previous stage against its schema before passing it forward.

**Schema Drift** -- Over time, a stage's output gradually deviates from its documented schema. Downstream stages compensate silently until the drift becomes too large and the pipeline breaks suddenly. Mitigation: automated schema validation on every pipeline execution, not just during development.

**Bottleneck Stage** -- One stage takes significantly longer than others, creating a throughput ceiling. Mitigation: identify the bottleneck stage through monitoring and either optimize it, split it into sub-stages, or run multiple instances of it in parallel.

### Traceability

The Pipeline pattern's greatest strength is traceability. For every output the system produces, you can reconstruct the exact sequence of transformations:

- What was the raw input?
- What did each stage produce?
- How long did each stage take?
- What model and configuration did each stage use?
- Where did quality degrade?

This makes the Pipeline pattern ideal for regulated industries where audit trails are required.

---

## Pattern 3: Federated Swarm

### The Analogy

Think of a farmers' market. Each vendor operates independently -- they set their own prices, manage their own inventory, and serve their own customers. There is no central authority telling the cheese vendor how much to charge or the flower vendor which flowers to stock. Yet the market as a whole functions because vendors follow shared norms (arrive before opening, clean your stall, do not block the walkways) and coordinate peer-to-peer when needed (the bread vendor refers customers to the jam vendor next door).

### Architecture Description

The Federated Swarm pattern consists of autonomous agents that coordinate with each other without a central supervisor. Each agent has its own objectives, its own knowledge, and its own decision-making authority. Agents communicate through a shared protocol -- typically a message bus or shared workspace -- and reach collective decisions through consensus mechanisms.

```
[Agent A] <---> [Agent B]
    ^   \       /   ^
    |    v     v    |
    |  [Shared Workspace]  |
    |    ^     ^    |
    v   /       \   v
[Agent C] <---> [Agent D]
```

### When to Use

- The problem is genuinely distributed -- different agents have access to different information sources and no single agent could hold all the context.
- You need resilience. If one agent fails, the others continue operating.
- The domain requires exploration and creativity, where multiple independent perspectives produce better outcomes than a single coordinated perspective.
- You are modeling a system that is naturally decentralized (market analysis, multi-stakeholder negotiation, distributed data analysis).

### When NOT to Use

- You need deterministic, reproducible outputs. Swarm consensus is inherently non-deterministic.
- The problem requires tight coordination and precise sequencing. Autonomous agents do not guarantee execution order.
- You have strict latency requirements. Consensus takes time.
- The team lacks experience with distributed systems. Federated swarms are the hardest pattern to debug and monitor.

### Key Contracts

**Communication Protocol** -- All agents must speak the same language. Define the message format, the addressing scheme (how agents find each other), and the delivery guarantees (at-least-once, exactly-once).

**Consensus Rules** -- How do agents reach agreement? Majority vote, unanimous agreement, weighted voting based on confidence scores, or designated authority on specific topics? Define this explicitly.

**Boundary Declarations** -- Each agent declares its domain of expertise and defers to other agents on topics outside its domain. Without these declarations, agents may produce conflicting outputs on the same topic with no way to resolve the conflict.

### Failure Modes

**Consensus Deadlock** -- Agents cannot reach agreement and the system stalls. Mitigation: implement a timeout with a designated tiebreaker mechanism -- either a fallback agent with authority or escalation to human judgment.

**Echo Chamber** -- Agents reinforce each other's errors instead of correcting them. If Agent A produces an incorrect analysis and Agent B defers to Agent A's expertise, the error propagates through the swarm. Mitigation: require independent reasoning. Agents must form their own conclusions before seeing other agents' outputs.

**Free Rider Problem** -- Some agents contribute little but consume resources. In cost-constrained environments, ensure every agent has a measurable contribution.

---

## Pattern 4: Hybrid Supervisor-Pipeline

### The Analogy

Think of a restaurant kitchen during dinner service. The head chef (supervisor) receives orders and assigns them to stations. But within each station, work flows through a pipeline -- the grill station first sears the steak, then rests it, then slices it. The head chef coordinates between stations (the salad should be ready when the steak is done), while each station manages its own internal sequence.

### Architecture Description

The Hybrid pattern combines a Supervisor at the top level with Pipelines inside each expert branch. The supervisor routes requests to the appropriate pipeline, and each pipeline processes its portion of the work through sequential stages.

```
[User Request]
      |
      v
 [Supervisor Agent]
   /         \
  v           v
[Pipeline A]  [Pipeline B]
 |  |  |       |  |  |
 S1 S2 S3     S1 S2 S3
  \  |  /       \  |  /
   v v v         v v v
[Result A]    [Result B]
      \          /
       v        v
   [Supervisor Agent]
         |
         v
    [Final Response]
```

### When to Use

- The problem has multiple distinct domains (requiring a supervisor for routing) AND each domain involves multi-step processing (requiring pipelines within each domain).
- You want the auditability of pipelines (per-stage tracing) combined with the flexibility of a supervisor (dynamic routing).
- Different request types require different numbers of processing steps. A simple request might go through a 2-stage pipeline while a complex request goes through a 5-stage pipeline.

### When NOT to Use

- The problem is simple enough for a single pattern. Hybrids add architectural complexity that must be justified by problem complexity.
- Your team is still learning to operate AI systems. Master individual patterns before combining them.
- You are in the prototyping phase. Start with the simplest pattern that works and evolve toward a hybrid only when you have evidence that a single pattern is insufficient.

### Key Contracts

All contracts from both the Supervisor and Pipeline patterns apply. Additionally:

**Cross-Pipeline Contract** -- When the supervisor needs to combine outputs from multiple pipelines, define how results are merged. This is similar to the Assembly Contract in Supervisor + Experts but must also account for the different processing depths of each pipeline.

**Escalation Contract** -- Define what happens when a pipeline encounters an input it cannot handle. Does it return an error to the supervisor? Does the supervisor reroute to a different pipeline? Does the system escalate to a human?

### Failure Modes

This pattern inherits failure modes from both parent patterns. The most common unique failure is **Complexity Overload** -- the system becomes so architecturally complex that no single person on the team understands all of its behaviors. Mitigation: maintain a living architecture diagram that is updated with every change, and assign ownership of each pipeline to a specific team member.

---

## Pattern 5: Human-in-the-Loop Gateway

### The Analogy

Think of a pharmaceutical company's drug approval process. Most quality checks are automated -- machines test chemical composition, purity, and stability. But before any drug reaches patients, a human pharmacist reviews the final batch. The automated checks handle volume; the human check handles judgment. The human does not review every test result -- only the final decision point.

### Architecture Description

The Human-in-the-Loop Gateway pattern inserts a human decision point at a specific location in an otherwise automated system. The key design choice is WHERE to place the gateway -- too early and you lose automation benefits; too late and you risk errors propagating past the point of correction.

```
[Input] -> [Automated Processing] -> [Gateway Check]
                                         |
                                    [Confidence >= Threshold?]
                                      /              \
                                    Yes               No
                                    |                  |
                                    v                  v
                              [Auto-approve]    [Human Review Queue]
                                    |                  |
                                    v                  v
                              [Execute]          [Human Decision]
                                                   /        \
                                                Approve    Reject/Modify
                                                  |            |
                                                  v            v
                                              [Execute]   [Return to Processing]
```

### When to Use

- Decisions are high-stakes, irreversible, or regulated. Medical diagnoses, legal filings, financial transactions above a threshold, content moderation of edge cases.
- You need to build trust in a new system. Start with human review on everything, then gradually reduce the review scope as confidence grows.
- The cost of a false positive or false negative is asymmetric. If approving something bad is much worse than rejecting something good (or vice versa), human judgment helps calibrate the threshold.

### When NOT to Use

- Response time requirements are shorter than human review time. If the system needs sub-second responses and human review takes minutes, the gateway becomes a bottleneck.
- The volume of requests exceeds available human review capacity with no way to filter. If 80% of requests require human review, you have automated the wrong part of the problem.
- The human reviewers lack domain expertise. A human gateway is only as good as the humans staffing it.

### Key Contracts

**Escalation Criteria Contract** -- Precisely define what triggers human review. This is typically based on confidence scores, risk classifications, content categories, or anomaly detection. Vague criteria like "escalate when uncertain" lead to either over-escalation (humans review everything) or under-escalation (nothing gets reviewed).

**Review Interface Contract** -- Define what information the human reviewer sees. The reviewer needs the original input, the system's recommendation, the confidence score, the reasoning chain, and any relevant context. A reviewer who only sees "approve or reject this output" without context will make poor decisions.

**SLA Contract** -- Define the maximum time a request can wait in the human review queue. What happens if the SLA is breached? Does the system auto-approve, auto-reject, or escalate further?

### Failure Modes

**Automation Bias** -- Human reviewers begin rubber-stamping the system's recommendations without applying independent judgment. When 99% of automated decisions are correct, humans stop paying attention to the 1% that are wrong. Mitigation: periodically inject known-incorrect decisions to keep reviewers alert. Track reviewer override rates -- a reviewer who never overrides is not reviewing.

**Queue Overflow** -- The volume of escalated requests exceeds human capacity. The queue grows, SLAs are breached, and the system effectively stalls. Mitigation: monitor escalation rates continuously. If the rate exceeds capacity, either adjust the escalation threshold (accept more risk on automated decisions) or add reviewer capacity.

---

## Pattern 6: Retrieval-Augmented Decision (RAG-Enhanced Agents)

### The Analogy

Think of a lawyer preparing for a case. The lawyer does not memorize every law, precedent, and regulation. Instead, the lawyer knows how to research -- which databases to search, which keywords to use, how to evaluate the relevance of a precedent, and how to synthesize findings into an argument. The lawyer's expertise is not in storage but in retrieval and application.

### Architecture Description

The Retrieval-Augmented Decision pattern equips agents with access to external knowledge sources. Before making a decision, the agent retrieves relevant information from vector databases, document stores, APIs, or other knowledge bases. The retrieved context is incorporated into the agent's prompt, grounding its reasoning in factual, up-to-date information.

```
[User Query]
      |
      v
[Query Analysis Agent]
      |
      v
[Retrieval Strategy]
   /     |      \
  v      v       v
[Vector DB] [API] [Doc Store]
  \      |      /
   v     v     v
[Context Assembly]
      |
      v
[Decision Agent + Retrieved Context]
      |
      v
[Grounded Response]
```

### When to Use

- The agent needs access to information that changes frequently -- product catalogs, policy documents, regulatory updates, knowledge bases.
- You need to ground agent responses in verifiable sources. RAG allows every claim to be traced back to a specific document.
- The knowledge base is too large to fit in a single prompt context window.
- You need to reduce hallucination in domains where accuracy is critical.

### When NOT to Use

- The task is purely analytical or creative and does not benefit from external knowledge.
- The knowledge base is small enough to include directly in the prompt. RAG adds latency and complexity. If your entire knowledge base fits in 2,000 tokens, just include it.
- Retrieval quality is poor. RAG with bad retrieval is worse than no RAG -- it grounds the agent in irrelevant information and creates a false sense of accuracy.

### Key Contracts

**Retrieval Contract** -- Define the retrieval strategy: what sources to search, how to construct queries, how many results to retrieve, and what relevance threshold to apply. A retrieval contract that says "search everything and return the top 10" is too vague. Specify the sources, the ranking criteria, and the minimum relevance score.

**Context Assembly Contract** -- Define how retrieved documents are formatted and presented to the decision agent. Should they be summarized? Quoted directly? Ranked by relevance? How much context is too much? Overloading the agent with retrieved context can be as harmful as providing none.

**Citation Contract** -- Define how the agent references its sources. Every factual claim should be traceable to a specific retrieved document. The citation format, the granularity (document-level or passage-level), and the handling of conflicting sources must be specified.

### Failure Modes

**Retrieval Poisoning** -- If the knowledge base contains incorrect or outdated information, the agent will confidently produce incorrect responses grounded in bad data. Mitigation: implement knowledge base quality controls -- regular audits, version tracking, and freshness indicators on every document.

**Context Window Saturation** -- Too much retrieved context crowds out the agent's instructions and reasoning space. The agent becomes a summarizer of retrieved documents rather than a decision-maker. Mitigation: limit retrieved context to a fixed percentage of the total context window. Prioritize quality over quantity in retrieval.

**Retrieval Latency** -- Complex retrieval strategies across multiple sources add latency to every request. Mitigation: implement retrieval caching for frequently asked queries, and set latency budgets for each retrieval source.

---

## Pattern Selection Decision Matrix

Use these questions to guide your pattern selection:

**Question 1: Is the work sequential or parallel?**
- Sequential with fixed steps -- Pipeline
- Parallel across distinct domains -- Supervisor + Experts
- Both -- Hybrid Supervisor-Pipeline

**Question 2: Is centralized control needed?**
- Yes, with clear routing logic -- Supervisor + Experts
- No, agents can self-coordinate -- Federated Swarm
- Partially, with human oversight -- Human-in-the-Loop Gateway

**Question 3: Does the agent need external knowledge?**
- Yes, from dynamic sources -- Add RAG to any pattern
- No, the task is self-contained -- Choose based on other criteria

**Question 4: What is the risk level of decisions?**
- Low risk, high volume -- Automate fully (Pipeline or Supervisor)
- High risk, any volume -- Add Human-in-the-Loop Gateway
- Mixed risk levels -- Use confidence-based routing to a gateway

**Question 5: What is the team's experience level?**
- New to AI systems -- Start with Pipeline (simplest to debug)
- Experienced with single agents -- Move to Supervisor + Experts
- Experienced with distributed systems -- Consider Federated Swarm
- Mature operations -- Hybrid patterns and RAG augmentation

---

## Composition Rules

Patterns are building blocks, not final architectures. Here are the rules for combining them:

**Rule 1: Start with one pattern and add complexity only when you have evidence that the current pattern is insufficient.** Do not begin with a Hybrid Supervisor-Pipeline-RAG-Gateway architecture. Begin with a Pipeline. When the Pipeline fails to handle a specific class of requests, add a Supervisor layer to route between two Pipelines.

**Rule 2: Every pattern boundary requires a contract.** When a Supervisor routes to a Pipeline, the interface between them must be specified. When a Pipeline stage queries a RAG system, the retrieval contract must be explicit. Undocumented boundaries are where systems break.

**Rule 3: RAG is a capability, not a pattern.** RAG can be added to any agent within any pattern. A Supervisor can use RAG to improve its routing decisions. A Pipeline stage can use RAG to ground its analysis. An expert in a Supervisor + Experts pattern can use RAG for domain-specific knowledge. Treat RAG as an augmentation layer, not a standalone architecture.

**Rule 4: Human-in-the-Loop is a gateway, not a pattern replacement.** Adding human review does not change the underlying pattern. A Pipeline with a human gateway at Stage 3 is still a Pipeline. A Supervisor with human review on the routing decision is still a Supervisor + Experts. The gateway is an insertion point, not an architecture.

**Rule 5: Monitor before you optimize.** Before changing patterns or adding complexity, instrument what you have. Measure latency per stage, accuracy per expert, escalation rates at gateways, and retrieval relevance scores. Data-driven pattern evolution produces better results than intuition-driven redesigns.

---

## Quick Reference Summary

| Pattern | Best For | Complexity | Latency | Auditability |
|---|---|---|---|---|
| Supervisor + Experts | Multi-domain routing | Medium | Medium | High |
| Pipeline by Stage | Sequential processing | Low | Predictable | Very High |
| Federated Swarm | Distributed exploration | High | Variable | Low |
| Hybrid Supervisor-Pipeline | Complex multi-domain + multi-step | High | Medium-High | High |
| Human-in-the-Loop Gateway | High-risk decisions | Medium | High (human delay) | Very High |
| RAG-Enhanced Decision | Knowledge-grounded reasoning | Medium | Medium-High | High (with citations) |

---

## Practitioner Checklist

Before deploying any pattern, verify:

- [ ] Every agent has a semantic contract with explicit scope boundaries
- [ ] Every interface between components has a documented contract
- [ ] Failure modes have been identified and mitigations are in place
- [ ] Monitoring and observability are configured for every component
- [ ] The team understands the pattern well enough to debug it at 2 AM
- [ ] There is a documented plan for evolving the pattern as needs change
- [ ] Anti-patterns have been checked against the Anti-patterns and Recovery playbook
