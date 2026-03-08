---
sidebar_position: 2
sidebar_label: "Anti-patterns and Recovery"
---

# Anti-patterns and Recovery

Every experienced architect has a collection of scars -- projects that failed not because the team lacked skill but because the system's design contained structural flaws that only revealed themselves under pressure. Anti-patterns are these structural flaws. They are design choices that feel reasonable at the time but reliably produce failure.

This playbook documents eight anti-patterns that SSAs encounter repeatedly across AI system projects. For each one, you will find the symptoms that reveal it, the root cause analysis explaining why it happens, a real-world analogy to make it memorable, a step-by-step recovery procedure, and a prevention checklist for future projects.

The goal is not just to fix problems after they appear. The goal is to develop the instinct to smell them before they cause damage.

---

## Anti-pattern 1: Monolithic Prompt Without Contract

### Symptom Description

The system produces inconsistent results between runs. The same input produces different outputs depending on phrasing, time of day, or seemingly random factors. When the team tries to improve the prompt, changes that fix one category of responses break another. The prompt has become a tangled document that nobody fully understands. New team members read it and ask, "What exactly is this supposed to do?"

### Root Cause Analysis

A monolithic prompt is a single large prompt that contains the agent's identity, behavioral rules, domain knowledge, output format specifications, edge case handling, and quality criteria all mixed together in natural language. There is no separation of concerns, no explicit contract, and no way to test individual aspects of the agent's behavior in isolation.

This happens because building an AI agent by editing a single prompt file is the fastest way to get a working prototype. The prompt starts small and clear. Then someone adds a rule to handle an edge case. Then another rule. Then a paragraph of domain knowledge. Then formatting instructions. Within weeks, the prompt is 3,000 tokens of accumulated decisions with no structure.

### Real-World Analogy

Imagine a restaurant where the head chef gives new cooks a single handwritten note that contains the recipes, the hygiene rules, the customer service expectations, the inventory management procedures, and the emergency protocols -- all in one continuous paragraph, in no particular order, with abbreviations that only the head chef understands. The new cook reads it, does their best, and produces inconsistent food. The head chef adds more notes to the document. The document gets longer and less coherent. Eventually the restaurant hires a second cook, gives them the same document, and the two cooks produce completely different dishes from the same instructions.

### Step-by-Step Recovery Procedure

**Step 1: Audit the existing prompt.** Read the entire prompt and categorize every sentence into one of these buckets: Identity (who the agent is), Objective (what it should accomplish), Policies (rules it must follow), Format (how outputs should look), Knowledge (domain-specific information), and Edge Cases (special handling rules).

**Step 2: Extract the semantic contract.** Write a formal contract document that specifies the agent's identity, scope boundaries, input expectations, output schema, quality criteria, and failure behaviors. This contract exists as a separate, reviewable artifact -- not embedded in the prompt.

**Step 3: Restructure the prompt around the contract.** Rewrite the prompt with clear sections. Each section corresponds to one aspect of the contract. Use explicit headers and delimiters so that sections can be modified independently.

**Step 4: Build validation tests.** For each aspect of the contract, write at least three test cases: one that should succeed, one that should fail, and one edge case. Run these tests against the restructured prompt to verify that the refactoring preserved the intended behavior.

**Step 5: Establish change control.** Any modification to the prompt must reference the contract. "I am changing the output format" must point to the Format section of the contract and include updated tests.

### Prevention Checklist

- [ ] Every agent has a written semantic contract before the prompt is drafted
- [ ] The prompt is structured with clearly delimited sections
- [ ] Each section of the prompt maps to a specific section of the contract
- [ ] Test cases exist for every requirement in the contract
- [ ] A change to the prompt requires an updated test

---

## Anti-pattern 2: Agents with Overlapping Scope

### Symptom Description

Two or more agents produce responses to the same request, and those responses conflict. Users receive contradictory information depending on which agent handles their request. The routing logic becomes increasingly complex as the team adds rules to prevent overlap, but new overlaps keep appearing. Team discussions about "whose job is this" become frequent and unproductive.

### Root Cause Analysis

This happens when agent scopes are defined in positive terms ("Agent A handles customer questions") without corresponding negative boundaries ("Agent A does NOT handle billing disputes"). It also happens when agents are created incrementally -- Agent A exists, a new need arises, Agent B is created to handle it, and nobody checks whether Agent B's scope overlaps with Agent A's.

The deeper cause is that scope boundaries are treated as obvious when they are actually ambiguous. "Customer questions" and "billing support" seem like distinct categories until a customer asks a question about their bill.

### Real-World Analogy

Imagine a school where both the math teacher and the science teacher believe they are responsible for teaching statistics. The math teacher teaches statistics using abstract proofs and theoretical distributions. The science teacher teaches statistics using experimental data and practical methods. Students get confused because they receive contradictory approaches to the same topic, and neither teacher knows what the other is teaching.

### Step-by-Step Recovery Procedure

**Step 1: Map current agent scopes.** For every agent in the system, document what it actually handles (not what it was designed to handle). Review logs of the last 500 requests to see which agents answered which questions.

**Step 2: Identify overlaps.** Create a matrix of agents versus request categories. Mark every cell where more than one agent claims the category. These are your overlaps.

**Step 3: Assign ownership.** For each overlapping category, designate one agent as the owner. The decision should be based on which agent handles that category better (measured by quality metrics), not on which team built which agent.

**Step 4: Define negative boundaries.** Update each agent's contract to include explicit "out of scope" declarations. Agent A's contract should list the specific categories it does NOT handle, not just the ones it does.

**Step 5: Implement handoff protocols.** When an agent receives a request outside its scope, it must know where to send it. Define the handoff mechanism: does the agent redirect, transfer, or escalate? What information is passed along?

**Step 6: Test the boundaries.** Create a test suite of boundary cases -- requests that sit exactly on the line between two agents' scopes. Verify that the routing is consistent and correct.

### Prevention Checklist

- [ ] Every agent contract includes both "in scope" and "out of scope" declarations
- [ ] A scope matrix exists showing all agents and all request categories
- [ ] Boundary test cases are part of the standard test suite
- [ ] New agent creation requires a scope review against all existing agents
- [ ] Handoff protocols are documented and tested

---

## Anti-pattern 3: Quality Without Metrics

### Symptom Description

Quality discussions in team meetings rely on subjective language: "The responses feel better," "This seems more accurate," "Users appear happier." When asked whether the latest change improved quality, the team cannot answer with data. They demonstrate cherry-picked examples that support their position. When a regression occurs, it is discovered weeks later by a frustrated user rather than by the team's monitoring.

### Root Cause Analysis

Teams skip metric definition because it requires hard decisions about what "quality" means. Is accuracy more important than completeness? Is speed more important than depth? These tradeoffs are uncomfortable to make explicit because they reveal conflicting priorities within the team.

Additionally, measuring AI output quality is genuinely difficult. Unlike traditional software where tests have clear pass/fail criteria, AI outputs exist on a spectrum. Teams defer the measurement problem until later, and later never comes.

### Real-World Analogy

Imagine a construction company that builds houses without inspection standards. The foreman walks through each house and declares it "looks good" based on gut feeling. Some houses have excellent foundations and poor plumbing. Others have beautiful kitchens but crooked walls. When a homeowner complains, the company argues about whether the issue is really a problem. There are no standards to reference, no measurements to compare, and no baseline to show whether quality is improving or declining.

### Step-by-Step Recovery Procedure

**Step 1: Define quality dimensions.** Identify the 3-5 most important aspects of quality for your system. Common dimensions include: accuracy (is the output factually correct?), completeness (does the output cover all relevant points?), relevance (does the output address the user's actual question?), format compliance (does the output follow the specified structure?), and safety (does the output avoid harmful content?).

**Step 2: Create a baseline measurement.** Take a representative sample of 100+ recent outputs. Have human evaluators score each output on your quality dimensions using a consistent rubric. This is your baseline.

**Step 3: Build an automated evaluation suite.** For each quality dimension, create automated checks where possible. Format compliance can be checked programmatically. Accuracy can be partially checked against known facts. Relevance can be estimated using semantic similarity. Not everything can be automated, but everything should be measured.

**Step 4: Establish release gates.** Define the minimum quality scores required for a change to be deployed. No change goes to production without passing the evaluation suite. If automated scores drop below the threshold, the change is blocked until investigated.

**Step 5: Implement continuous monitoring.** Quality does not stop at release. Monitor production outputs continuously. Sample and evaluate a percentage of live responses. Track quality trends over time. Set alerts for quality drops.

### Prevention Checklist

- [ ] Quality dimensions are defined and documented before the first prototype
- [ ] A human-evaluated baseline exists for every quality dimension
- [ ] An automated evaluation suite runs on every change
- [ ] Release gates are defined and enforced
- [ ] Production quality is monitored continuously with alerts

---

## Anti-pattern 4: Context Overload

### Symptom Description

The agent's prompt or context window is packed with information -- instructions, knowledge, examples, rules, and metadata -- to the point where the agent starts ignoring parts of it. The agent follows some instructions but not others, apparently at random. Adding more context makes the problem worse rather than better. The team observes that shorter prompts sometimes produce better results than longer ones, which feels counterintuitive.

### Root Cause Analysis

Language models have finite attention. Even within a large context window, the model allocates attention unevenly -- information at the beginning and end of the context tends to receive more attention than information in the middle. When the context is overloaded, critical instructions compete with background information for the model's attention, and the background information sometimes wins.

This anti-pattern is especially common in RAG systems where retrieval pulls in large amounts of context without filtering for relevance, and in agent systems where every tool description, every policy, and every edge case rule is crammed into a single prompt.

### Real-World Analogy

Imagine a pilot who is handed a 200-page flight manual and told to follow all of it during a 30-minute flight. The manual contains emergency procedures, routine checklists, maintenance schedules, historical weather data, airline corporate policies, and meal service guidelines -- all in one document. The pilot cannot attend to all 200 pages simultaneously and will inevitably miss critical items while reading about irrelevant ones. A well-designed cockpit gives the pilot exactly the information needed for each phase of flight, nothing more.

### Step-by-Step Recovery Procedure

**Step 1: Audit context usage.** Measure how much of the context window is being used and categorize the content. How many tokens are instructions? How many are examples? How many are retrieved documents? How many are tool descriptions?

**Step 2: Apply the relevance test.** For every piece of information in the context, ask: "If I remove this, does the agent's output quality change on my test suite?" If removing it has no measurable impact, remove it permanently.

**Step 3: Implement dynamic context loading.** Instead of loading everything into every request, load only what is relevant. Tool descriptions should only appear when the tool might be needed. Domain knowledge should be retrieved based on the query. Examples should be selected based on similarity to the current input.

**Step 4: Prioritize context placement.** Place the most critical instructions at the beginning and end of the context, where attention is highest. Place variable or less critical information in the middle.

**Step 5: Set context budgets.** Define maximum token allocations for each category of context content. Instructions get a maximum of X tokens. Retrieved documents get a maximum of Y tokens. Examples get a maximum of Z tokens. These budgets prevent any category from crowding out the others.

### Prevention Checklist

- [ ] Context window usage is monitored and reported
- [ ] Every item in the context has a documented justification for its inclusion
- [ ] Retrieval systems have relevance thresholds and maximum result counts
- [ ] Critical instructions are placed at high-attention positions
- [ ] Context budgets exist and are enforced

---

## Anti-pattern 5: Tool Integration Without Contracts

### Symptom Description

An agent has access to external tools (APIs, databases, calculators, search engines) but the integration is fragile. The agent calls tools with incorrect parameters, misinterprets tool responses, or calls tools when it should not. When the external API changes its response format, the agent breaks silently -- producing outputs that look plausible but contain incorrect data derived from misinterpreted API responses.

### Root Cause Analysis

Tool integration in AI systems requires two layers of specification that teams often skip. The first layer is the technical specification -- the API schema, authentication, rate limits, and error codes. Most teams handle this adequately because it is familiar software engineering.

The second layer is the semantic specification -- when should the agent decide to use this tool? What does a successful response mean? What does the agent do if the tool returns unexpected data? How does the agent communicate tool limitations to the user? This semantic layer is frequently left to the model's "common sense," which is not reliable enough for production systems.

### Real-World Analogy

Imagine giving a new employee a phone and a list of phone numbers without any context. "Here is the supplier's number. Here is the bank's number. Here is the lawyer's number. Use them as needed." The employee does not know when to call the supplier versus the bank, what questions to ask, how to interpret the answers, or what to do if nobody picks up. They have the tools but lack the contracts for using them.

### Step-by-Step Recovery Procedure

**Step 1: Inventory all tool integrations.** List every tool the agent can access. For each tool, document: what it does, when it should be used, what inputs it expects, what outputs it provides, and what errors it can return.

**Step 2: Write a tool contract for each integration.** The contract should include: trigger conditions (when should the agent use this tool?), input mapping (how does the agent translate user intent into tool parameters?), output interpretation (how does the agent translate tool responses into user-facing information?), error handling (what does the agent do when the tool fails or returns unexpected data?), and fallback behavior (what does the agent do when the tool is unavailable?).

**Step 3: Add tool response validation.** Before the agent uses a tool's response, validate it against the expected schema. If the response does not match expectations, trigger the error handling path rather than allowing the agent to interpret malformed data.

**Step 4: Test tool integrations independently.** Create test cases that exercise each tool integration: normal use, edge cases, error conditions, and timeout scenarios. These tests should run independently of the agent's other functionality.

**Step 5: Monitor tool usage in production.** Track which tools the agent calls, how often, with what parameters, and what responses it receives. Alert on anomalies: unusual call patterns, unexpected error rates, or response format changes.

### Prevention Checklist

- [ ] Every tool has a written semantic contract covering trigger, input, output, error, and fallback
- [ ] Tool response validation is implemented and active
- [ ] Tool integration tests cover normal, edge, error, and timeout scenarios
- [ ] Tool usage is monitored with anomaly detection
- [ ] External API changes trigger automatic contract review

---

## Anti-pattern 6: Missing Fallback Chains

### Symptom Description

When the primary approach fails, the system returns an error message (or worse, an empty response) instead of attempting an alternative approach. Users encounter dead ends. The team discovers failures only when users complain, because the system treats failure as a terminal state rather than a branching point.

### Root Cause Analysis

Fallback planning is cut because it feels like pessimism. The team focuses on making the primary path work well and defers failure handling to "later." When failures do occur, the team fixes them one at a time with ad hoc patches rather than implementing a systematic fallback strategy.

The deeper issue is that AI systems fail differently than traditional software. Traditional software fails with clear error codes. AI systems fail with plausible-sounding but incorrect outputs, with partial results, with timeouts, or with low-confidence responses. These "soft failures" require different handling than hard crashes.

### Real-World Analogy

Imagine a hospital that has only one ambulance route to the emergency department. On a normal day, the route works. On the day a water main breaks and floods the road, ambulances cannot reach the hospital and patients cannot be treated. A well-designed hospital has multiple routes, a helipad, and agreements with nearby hospitals to accept overflow -- not because the hospital expects daily disasters, but because when an emergency occurs, the response must be immediate, not improvised.

### Step-by-Step Recovery Procedure

**Step 1: Map all failure points.** For every component in the system, list the ways it can fail: timeout, error response, low-confidence output, unexpected format, rate limit exceeded, model unavailable.

**Step 2: Design fallback chains.** For each failure point, define a sequence of alternatives. The chain typically follows a pattern of decreasing capability: try the primary approach, then try a simpler alternative, then try a cached response, then return a graceful degradation message. Each link in the chain should be less capable but more reliable than the previous one.

**Step 3: Implement graceful degradation messages.** When all fallbacks are exhausted, the system must communicate clearly to the user: what happened, what the system tried, and what the user can do next. "Something went wrong" is not a graceful degradation message. "I was unable to retrieve your account details because the account system is temporarily unavailable. You can try again in a few minutes or call support at 555-0100" is.

**Step 4: Test fallback chains explicitly.** Simulate each failure mode and verify that the system correctly traverses the fallback chain. These tests are as important as happy-path tests.

**Step 5: Monitor fallback activation.** Track how often each fallback level is activated. A fallback that activates frequently indicates a reliability problem with the primary path. A fallback that never activates might not work when it is finally needed.

### Prevention Checklist

- [ ] Every component has a documented failure mode list
- [ ] Every failure mode has a fallback chain with at least two alternatives
- [ ] Graceful degradation messages are written and reviewed
- [ ] Fallback chain tests are part of the standard test suite
- [ ] Fallback activation rates are monitored in production

---

## Anti-pattern 7: Governance Theater

### Symptom Description

The team has extensive documentation about risk management, ethical guidelines, and quality policies. These documents exist in a shared drive, are referenced in meetings, and are included in compliance reports. But the actual system does not implement them. The risk matrix exists but is not connected to any code. The ethical guidelines exist but are not reflected in agent contracts. The quality policies exist but are not enforced by automated checks. Governance is performed rather than practiced.

### Root Cause Analysis

Governance theater arises from the gap between the people who write policies and the people who build systems. Policy writers create documents using compliance language. Engineers implement code using technical specifications. Nobody bridges the two. The policies are technically accurate but operationally useless -- they say "the system must ensure fairness" without specifying how fairness is measured, at what threshold it is considered sufficient, or what happens when it falls short.

Organizational incentives compound the problem. Teams are rewarded for having policies (a checkbox on the compliance audit) rather than for implementing them (an ongoing engineering effort with costs and tradeoffs).

### Real-World Analogy

Imagine a building with a fire safety plan that specifies evacuation routes, assembly points, and fire warden assignments. The plan is posted in the lobby. The fire wardens are named. The evacuation routes are drawn on maps. But nobody has ever conducted a fire drill. The fire exits are blocked by storage boxes. The fire wardens do not know they are fire wardens. The extinguishers have not been inspected in three years. The plan exists. The safety does not.

### Step-by-Step Recovery Procedure

**Step 1: Audit policy implementation.** For every governance policy, ask: "Where in the system is this policy enforced? Show me the code, the configuration, or the automated check." If the answer is "it is in the documentation," the policy is theater.

**Step 2: Translate policies into testable requirements.** Convert each policy from compliance language to engineering language. "The system must ensure fairness" becomes "The system's acceptance rate for demographic group A must be within 5 percentage points of the acceptance rate for demographic group B, measured weekly on a sample of 1,000 decisions."

**Step 3: Implement automated enforcement.** For each testable requirement, build an automated check that runs continuously. The check should produce a clear pass/fail result and trigger an alert on failure.

**Step 4: Connect governance to deployment.** Governance checks should be part of the deployment pipeline. A system that fails a governance check should not be deployable, just as a system that fails its functional tests should not be deployable.

**Step 5: Conduct governance drills.** Periodically simulate governance failures and verify that the team responds correctly. Can the team detect a fairness violation? How long does it take? Who is notified? What is the remediation process?

### Prevention Checklist

- [ ] Every governance policy has a corresponding automated check
- [ ] Governance checks are part of the deployment pipeline
- [ ] Governance metrics are monitored in production dashboards
- [ ] Governance drills are conducted at least quarterly
- [ ] Policy changes trigger implementation updates, and vice versa

---

## Anti-pattern 8: Premature Scaling

### Symptom Description

The system is designed for scale it has not yet achieved. The architecture includes distributed message queues, multi-region deployment, auto-scaling clusters, and sophisticated load balancing -- but it serves 50 requests per day. The team spends more time maintaining infrastructure than improving the AI system. Debugging is difficult because requests pass through layers of abstraction designed for a million users but obscuring the behavior of the actual fifty.

Alternatively, the system is scaled operationally (handling high volume) but without the operational foundations to support that volume: no runbooks, no SLOs, no alerting, no incident response process. The system handles 10,000 requests per day until something goes wrong, and then nobody knows how to diagnose or fix it.

### Root Cause Analysis

Premature scaling comes from two sources. The first is anticipation -- the team builds for the traffic they hope to receive rather than the traffic they actually have. This feels prudent but consumes engineering resources that would be better spent on the AI system's core quality.

The second source is cargo culting -- the team adopts the architecture of a large-scale system (often described in a tech blog from a major company) without considering whether their problem has the same characteristics. The architecture that makes sense for a system serving millions of users actively harms a system serving dozens.

### Real-World Analogy

Imagine a new neighborhood bakery that, before serving its first customer, builds a commercial kitchen sized for a factory, installs an automated order management system designed for restaurant chains, hires a logistics coordinator to manage a fleet of delivery trucks, and subscribes to enterprise-grade inventory management software. The bakery opens. Ten customers come per day. The baker spends more time managing the infrastructure than baking bread. The bread suffers. Customers stop coming. The baker blames the market rather than recognizing that the infrastructure was the problem.

### Step-by-Step Recovery Procedure

**Step 1: Measure actual load.** How many requests per day, per hour, per minute does the system actually receive? What is the peak? What is the average? What is the growth rate?

**Step 2: Right-size the infrastructure.** Based on actual load plus a reasonable growth buffer (typically 2-3x current peak), simplify the infrastructure. Replace distributed systems with single-instance deployments where volume allows. Replace auto-scaling with fixed capacity where the load is predictable.

**Step 3: Build operational foundations before scaling.** Before adding capacity, ensure you have: SLOs (what does "working correctly" mean in measurable terms?), monitoring (can you see when the system is not meeting SLOs?), alerting (are you notified when SLOs are breached?), runbooks (what does the on-call engineer do when an alert fires?), and incident response (how does the team coordinate when something goes seriously wrong?).

**Step 4: Define scaling triggers.** Instead of scaling preemptively, define the conditions under which scaling is warranted. "When average response latency exceeds 2 seconds for 5 consecutive minutes" is a scaling trigger. "We might get more users someday" is not.

**Step 5: Scale one dimension at a time.** When scaling is needed, change one thing: add capacity, add a cache, add a region. Measure the impact before changing the next thing. Multi-variable changes make it impossible to understand what worked and what did not.

### Prevention Checklist

- [ ] Architecture decisions are based on measured load, not projected load
- [ ] SLOs, monitoring, alerting, and runbooks exist before scaling
- [ ] Infrastructure complexity is proportional to actual requirements
- [ ] Scaling triggers are defined and documented
- [ ] Each scaling change is measured independently

---

## The Smell Test: Quick Diagnostic Questions

When you arrive at a new project or suspect something is wrong with an existing one, run through these diagnostic questions. Each question targets a specific anti-pattern. If you answer "yes" to a question, investigate the corresponding anti-pattern.

### Prompt and Contract Health

**"Can a new team member read the agent's prompt and understand exactly what it should and should not do within 5 minutes?"**
If no -- suspect Monolithic Prompt Without Contract (Anti-pattern 1).

**"Can you remove a paragraph from the agent's prompt without worrying about breaking something unexpected?"**
If no -- suspect Monolithic Prompt Without Contract (Anti-pattern 1) or Context Overload (Anti-pattern 4).

### Scope and Boundaries

**"If I send the same ambiguous request to the system twice, will it always be handled by the same agent?"**
If no -- suspect Agents with Overlapping Scope (Anti-pattern 2).

**"Can each agent clearly state what it refuses to handle?"**
If no -- suspect Agents with Overlapping Scope (Anti-pattern 2).

### Quality and Measurement

**"Can you tell me, with a number, whether the system is better this week than last week?"**
If no -- suspect Quality Without Metrics (Anti-pattern 3).

**"Is there an automated check that would prevent a quality regression from reaching production?"**
If no -- suspect Quality Without Metrics (Anti-pattern 3).

### Context and Tools

**"What percentage of the context window is used on an average request?"**
If the answer is "I don't know" or above 80% -- suspect Context Overload (Anti-pattern 4).

**"What happens if one of the agent's tools returns an error?"**
If the answer is "I don't know" or "it crashes" -- suspect Tool Integration Without Contracts (Anti-pattern 5).

### Resilience

**"What happens when the primary model provider has an outage?"**
If the answer involves panic -- suspect Missing Fallback Chains (Anti-pattern 6).

**"Show me the last time a fallback was triggered and how long it took the team to notice."**
If the fallback has never been triggered or there is no record -- suspect Missing Fallback Chains (Anti-pattern 6).

### Governance

**"Pick any policy from the governance documentation. Show me the code that enforces it."**
If the connection between policy and code requires more than 60 seconds to demonstrate -- suspect Governance Theater (Anti-pattern 7).

### Scale and Operations

**"What is the ratio of infrastructure engineers to AI engineers on this project?"**
If the infrastructure team is larger than the AI team for a system serving fewer than 10,000 requests per day -- suspect Premature Scaling (Anti-pattern 8).

**"Do you have a runbook for the three most common production incidents?"**
If no runbook exists -- suspect Premature Scaling without operational foundations (Anti-pattern 8).

---

## Recovery Priority Framework

When multiple anti-patterns are present (and they usually are), address them in this order:

**Priority 1: Safety and governance.** Fix Governance Theater (Anti-pattern 7) and Missing Fallback Chains (Anti-pattern 6) first. A system without real governance or resilience is actively risky.

**Priority 2: Foundations.** Fix Monolithic Prompt Without Contract (Anti-pattern 1) and Quality Without Metrics (Anti-pattern 3) next. Without contracts and metrics, you cannot reliably improve anything else.

**Priority 3: Architecture.** Fix Agents with Overlapping Scope (Anti-pattern 2) and Tool Integration Without Contracts (Anti-pattern 5). These cause ongoing quality problems but are less urgent than foundational issues.

**Priority 4: Optimization.** Fix Context Overload (Anti-pattern 4) and Premature Scaling (Anti-pattern 8) last. These affect efficiency and cost but do not typically cause outright failures.

---

## Practitioner Checklist

Run this checklist at the start of every new project and monthly on ongoing projects:

- [ ] Every agent has a structured contract, not a monolithic prompt
- [ ] Agent scopes are non-overlapping with explicit negative boundaries
- [ ] Quality is measured with numbers, not adjectives
- [ ] Context usage is monitored and budgeted
- [ ] Tool integrations have semantic contracts, not just API documentation
- [ ] Fallback chains exist and have been tested
- [ ] Governance policies are enforced by code, not just by documents
- [ ] Infrastructure complexity matches actual, measured load
