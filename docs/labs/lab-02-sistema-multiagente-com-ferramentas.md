---
sidebar_position: 2
sidebar_label: "Lab 2 — Multi-agent system"
---

# Lab 2 — Multi-Agent System with Tools

## Overview: from model to team

In Lab 1, you built the rulebook — a domain model with entities, relationships, constraints, and semantic contracts. That rulebook is precise, testable, and comprehensive. But a rulebook sitting on a shelf does nothing. Someone has to use it.

In this lab, you build the team that uses it.

Think of Lab 1 as designing the playbook for a soccer team: formations, positions, rules of play, what each position is responsible for. Lab 2 is where you assemble the actual team — assign players to positions, define how they communicate on the field, decide what happens when the ball goes to the goalkeeper, and rehearse specific plays until the team can execute them reliably.

This lab integrates Modules 3, 4, and 5 of the Core Track — agent architecture, workflows and tools, and context engineering. You will design agents with clear roles, connect them in an orchestration topology, integrate external tools, and run real scenarios through the system to prove it works.

The domain model from Lab 1 is your starting point. If you did not complete Lab 1, you cannot do Lab 2. The agents you build here are only as good as the semantic contracts that define their behavior.

---

## The challenge

Design and demonstrate a multi-agent system for your Lab 1 domain that includes:

- **At least 4 specialized agents**, each with a distinct cognitive role
- **At least 2 external tool integrations** (database lookups, API calls, file operations, calculations, or similar)
- **A defined orchestration topology** (supervisor, pipeline, swarm, or hybrid)
- **Formal handoff protocols** between agents
- **10 executed scenarios** with full logs and analysis

Your deliverable is not a working codebase. It is a complete architectural specification with enough detail that a developer could implement it, plus evidence (from scenario execution) that the design works.

---

## Step-by-step methodology

### Phase 1: Agent role definition (estimated time: 60 minutes)

Go back to the semantic contracts from Lab 1. Each contract describes work that needs to be done. Your job now is to decide WHO does WHAT.

**What to do:**

1. List every cognitive task your system must perform. Think about the full lifecycle of a request in your domain — from the moment input arrives to the moment a result is delivered. What happens at each step? Write each step as a task.

   For a veterinary clinic, this might look like:
   - Understand the nature of the inquiry (is this an emergency, a routine appointment, a billing question?)
   - Retrieve the pet's medical history
   - Retrieve the owner's contact and billing information
   - Determine the appropriate veterinarian based on species and issue type
   - Check appointment availability
   - Apply scheduling constraints (minimum gap between appointments, vet specialization match)
   - Generate a response to the owner
   - Validate the response for accuracy and policy compliance
   - Execute the booking or action

2. Group these tasks by cognitive type. Tasks that require the same mode of thinking belong together. Classification tasks go together. Retrieval tasks go together. Reasoning tasks go together. Refer to the six cognitive roles from Module 3: Planner, Retriever, Reasoner, Critic, Executor, and Guardrail.

3. For each group, define an agent. Give it a name that reflects its role (not generic names like "Agent 1"). For each agent, specify:

```
Agent: [descriptive name]
Role type: [Planner / Retriever / Reasoner / Critic / Executor / Guardrail]

RESPONSIBLE FOR:
  - [task 1]
  - [task 2]
  - ...

NOT RESPONSIBLE FOR:
  - [task that belongs to another agent]
  - [task that belongs to another agent]

MUST NEVER:
  - [forbidden action 1]
  - [forbidden action 2]

RECEIVES FROM: [which agents send it information]
SENDS TO: [which agents it sends information to]

CONTEXT REQUIREMENTS:
  - [what information this agent needs in its context window to do its job]
```

4. Run the confusion test: for every pair of agents, ask "is there any task where it's unclear which agent handles it?" If yes, resolve the ambiguity before moving on.

**Output of Phase 1:** an agent roster with at least 4 fully specified agents.

**The restaurant kitchen analogy:** a restaurant kitchen has a head chef (planner), line cooks (executors), a sous chef (reasoner who adjusts recipes based on available ingredients), a food runner (retriever who brings plates to the right table), and a quality checker (critic who inspects every plate before it leaves the kitchen). Each person has a clear station. Nobody does someone else's job. This clarity is what makes a kitchen work at speed.

### Phase 2: Topology selection (estimated time: 30 minutes)

Now you decide how your agents coordinate. The three primary topologies are:

**Supervisor topology:** one agent (the supervisor) receives all requests, delegates tasks to specialized agents, collects their results, and produces the final output. Like a manager who assigns work to team members and reviews the results.

**Pipeline topology:** agents are arranged in a sequence. Each agent processes the request and passes it to the next. Like an assembly line where each station adds something to the product.

**Swarm topology:** agents operate independently and coordinate through shared state or message passing. Like a team of ants that each follow simple rules but collectively solve complex problems.

**Hybrid topology:** a combination of the above. Common pattern: a supervisor delegates to a pipeline, which includes a guardrail at the end.

**What to do:**

1. Evaluate which topology fits your system. Consider:
   - How predictable is the workflow? (Predictable workflows suit pipelines. Variable workflows suit supervisors.)
   - How many agents need to coordinate? (Few agents suit pipelines. Many agents suit supervisors.)
   - Do agents need to work in parallel? (If yes, consider supervisor or swarm.)
   - Is there a single "right order" for tasks, or does the order depend on the input? (Fixed order suits pipelines. Variable order suits supervisors.)

2. Draw the topology diagram showing every agent as a node and every communication channel as an arrow. Label each arrow with what information flows along it.

3. Write a justification paragraph explaining why you chose this topology over the alternatives. What would go wrong if you had chosen a different topology?

**Output of Phase 2:** a topology diagram, a justification paragraph, and a list of all communication channels with their data formats.

### Phase 3: Handoff protocol design (estimated time: 45 minutes)

When one agent finishes its work and passes the result to the next agent, that transition is called a handoff. Handoffs are where most multi-agent systems fail. Information gets lost. Context gets corrupted. Errors propagate silently.

**What to do:**

1. For each handoff in your topology (each arrow in your diagram), define a formal handoff protocol:

```
Handoff: [source agent] --> [destination agent]
Trigger: [what event causes this handoff]
Payload:
  - [field 1]: [type] — [description]
  - [field 2]: [type] — [description]
  ...
Validation:
  - [what the receiving agent checks before accepting the handoff]
On failure:
  - [what happens if validation fails — retry, escalate, abort?]
```

2. Define the message format that all agents use. A consistent message format prevents the "lost in translation" problem. Every message should include at minimum:
   - A request identifier (so you can trace the full journey of a request through the system)
   - The sender agent's name
   - The intended recipient
   - The payload (the actual data)
   - A status indicator (success, partial, error)
   - A timestamp

3. For each handoff, identify what can go wrong and how the system recovers. What if the receiving agent is overloaded? What if the payload is malformed? What if the source agent sends contradictory information?

**Output of Phase 3:** handoff specifications for every connection in your topology, a standard message format, and failure recovery procedures.

**The relay race analogy:** in a relay race, the handoff of the baton is the most dangerous moment. Runners are moving at full speed, the baton must pass from one hand to another without dropping, and both runners must be in the exchange zone at the right time. A team with four fast runners but sloppy handoffs will lose to a team with four average runners and perfect handoffs. The same is true for agents. Individual capability matters less than the quality of the handoffs between them.

### Phase 4: Tool contract writing (estimated time: 60 minutes)

At least two of your agents must use external tools — capabilities beyond language processing, such as database queries, API calls, calculations, file operations, or external service integrations.

**What to do:**

1. Identify which agents need external tools and what those tools do. Think about what operations cannot be done by language processing alone. Looking up a patient's record requires a database query. Checking appointment availability requires a calendar API. Calculating a dosage requires a mathematical function.

2. For each tool, write a tool contract:

```
Tool: [descriptive name]
Used by: [which agent(s)]
Purpose: [what it does in one sentence]

Input schema:
  - [parameter 1]: [type] — [description] — [required/optional]
  - [parameter 2]: [type] — [description] — [required/optional]

Output schema:
  - [field 1]: [type] — [description]
  - [field 2]: [type] — [description]

Error responses:
  - [error code/type]: [meaning] — [agent's recovery action]
  - [error code/type]: [meaning] — [agent's recovery action]

Rate limits / constraints:
  - [any limits on usage frequency, payload size, etc.]

Example call:
  Input: [realistic example input]
  Output: [realistic example output]

Example error:
  Input: [input that causes an error]
  Output: [the error response]
  Recovery: [what the agent does next]
```

3. For each tool, define the error policy: what does the agent do when the tool fails? Options include retry (how many times? with what backoff?), fallback to an alternative tool, return a partial result with a warning, or escalate to a human.

4. For each tool, specify authorization: who is allowed to invoke this tool? Under what conditions? Are there any constraints on how often it can be called?

**Output of Phase 4:** at least 2 fully specified tool contracts with schemas, examples, error policies, and authorization rules.

**The carpenter's toolbox analogy:** a carpenter does not just "have tools." Each tool has a specific purpose (hammer for nails, saw for cutting, level for alignment), a correct way to use it (you don't hammer with a screwdriver), and safety rules (wear goggles when using the saw). A tool without a contract is like a power tool without a safety manual — functional but dangerous.

### Phase 5: Scenario execution (estimated time: 90 minutes)

This is where theory meets practice. You will run 10 scenarios through your system design and document what happens at every step.

**What to do:**

1. Design 10 scenarios that test different aspects of your system. These should include:
   - **3 happy path scenarios:** everything works as expected. The standard cases that represent 80 percent of real usage.
   - **3 edge case scenarios:** unusual but valid inputs. A patient with no prior medical history. An appointment request for a date two years in the future. A course registration for a student who has already graduated.
   - **2 failure scenarios:** something goes wrong. A tool returns an error. An agent receives contradictory information. A hard constraint is violated.
   - **2 handoff stress scenarios:** situations that specifically test the handoff protocols. Two requests arriving simultaneously. An agent that needs information from two other agents before it can proceed. A chain of three handoffs where an error in the first must propagate correctly through the rest.

2. For each scenario, produce a complete execution log in the following format:

```
SCENARIO [number]: [descriptive title]
Category: [happy path / edge case / failure / handoff stress]
Initial input: [the request that starts the scenario]

STEP 1: [agent name] receives input
  Context available: [what the agent knows at this point]
  Action taken: [what the agent does]
  Tool calls (if any): [tool name, input, output]
  Decision: [what the agent decides]
  Output: [what the agent sends and to whom]

STEP 2: [next agent name] receives handoff
  Payload received: [what was in the handoff]
  Validation: [pass/fail, with details]
  Action taken: [what the agent does]
  ...

[continue for all steps]

FINAL OUTPUT: [the system's final response or action]
CONSTRAINTS CHECKED: [list of constraints that were evaluated during this scenario]
RESULT: [pass/fail, with explanation if fail]
```

3. After all 10 scenarios, write a summary analysis: what worked well? What revealed design weaknesses? What would you change in your architecture based on what you learned from running the scenarios?

**Output of Phase 5:** 10 complete execution logs and a summary analysis.

**The fire drill analogy:** fire drills are annoying, but they reveal problems that blueprints cannot. The blueprint says the exit is 20 meters away. The fire drill reveals that the exit door sticks, that the hallway is blocked by a filing cabinet, and that nobody knows where the fire extinguisher is. Running scenarios through your system is your fire drill. The architecture diagram says it works. The scenarios prove whether it actually works.

---

## Deliverable specifications

You must submit the following artifacts:

### Artifact 1: Agent roster

A structured document defining each agent. Minimum 4 agents. Each agent must have: name, role type, responsibilities, exclusions, forbidden actions, input/output connections, and context requirements.

### Artifact 2: Topology diagram and justification

A visual diagram showing all agents, all communication channels, and the direction of data flow. Accompanied by a paragraph justifying the topology choice.

### Artifact 3: Handoff protocol specifications

A formal specification for every handoff in the system. Each specification must include: trigger, payload schema, validation rules, and failure recovery procedures. Must include a standard message format used across all handoffs.

### Artifact 4: Tool contracts

At least 2 tool contracts, each with input/output schemas, error responses, rate limits, example calls, example errors, and authorization rules.

### Artifact 5: Scenario execution logs

10 complete execution logs following the format specified above. Must include at least 3 happy path, 3 edge case, 2 failure, and 2 handoff stress scenarios.

### Artifact 6: Summary analysis

A one-page analysis of what the scenarios revealed about the system design, including at least 2 strengths and 2 weaknesses discovered through execution.

---

## Evaluation rubric

Your lab will be evaluated across four dimensions, each scored from 0 to 10.

### Dimension 1: Architecture and separation of responsibilities (0-10)

Are agent roles clear and distinct? Is there role overlap? Does each agent have a coherent cognitive mode, or are agents doing too many unrelated things?

- **8-10:** Every agent has a clear, single cognitive mode. No overlap between agents. The confusion test passes for all pairs. Forbidden actions are specific and meaningful.
- **5-7:** Agents are mostly well-defined, but one or two have overlapping responsibilities or vague scopes. Forbidden actions are generic.
- **0-4:** Significant overlap between agents. "God agents" that do too many things. Missing forbidden actions. Roles that could be combined without loss.

### Dimension 2: Robustness of protocols (0-10)

Are the handoff protocols and tool contracts detailed enough to be implemented? Do they handle errors and edge cases?

- **8-10:** Every handoff has a full specification with validation and failure recovery. Tool contracts include realistic error scenarios and recovery actions. The message format is consistent and complete.
- **5-7:** Handoff protocols exist but are missing error handling or validation rules. Tool contracts describe the happy path but not failures.
- **0-4:** Handoff protocols are informal or missing. Tool contracts are incomplete. No error handling specified.

### Dimension 3: Operational resilience (0-10)

Can the system handle failures gracefully? When a tool fails, when an agent produces bad output, when a handoff is rejected — does the system recover or collapse?

- **8-10:** Failure scenarios demonstrate graceful degradation. The system has fallback paths. Errors are detected and handled at every handoff. No single agent failure crashes the entire system.
- **5-7:** Some failure handling exists but is incomplete. The system handles common errors but would collapse under unusual failures.
- **0-4:** No failure handling. The system assumes everything works. A single agent failure cascades into total system failure.

### Dimension 4: Quality of evidence (0-10)

Do the 10 execution logs actually demonstrate that the system works? Are they realistic? Do they cover enough variety? Is the analysis honest about weaknesses?

- **8-10:** Execution logs are detailed, realistic, and cover all four scenario types. The analysis identifies specific weaknesses and proposes concrete improvements. Logs show constraint checking at each step.
- **5-7:** Execution logs exist but lack detail or variety. The analysis is superficial. Some scenarios feel artificial or contrived.
- **0-4:** Execution logs are incomplete or missing. Analysis is absent or dishonest (claims no weaknesses). Scenarios only cover happy paths.

**Minimum passing score: 30 out of 40.**

---

## Tips and common mistakes

**Tip 1: Let Lab 1 guide you.** Your semantic contracts already define the workflows. Your constraint matrix already defines the rules. Your entity catalog already defines the vocabulary. Don't reinvent these — reference them directly. When an agent needs to check a constraint, point to the specific constraint ID from your Lab 1 matrix.

**Tip 2: Fewer agents, better defined, beats more agents, poorly defined.** Four well-defined agents with crystal-clear boundaries will outperform eight vaguely defined agents with overlapping responsibilities. Resist the urge to add agents just to hit a number.

**Tip 3: The handoff protocol is your most important artifact.** If you run out of time, spend it on handoff specifications rather than adding more agents. A system with perfect agents but sloppy handoffs will fail. A system with good agents and excellent handoffs will succeed.

**Tip 4: Run the failure scenarios first.** When you start Phase 5, resist the temptation to run all the happy path scenarios first. Start with one failure scenario. It will immediately reveal gaps in your error handling and force you to strengthen your protocols before documenting the rest.

**Tip 5: Make tool errors realistic.** "The tool throws an error" is not a realistic scenario. "The database query returns zero results because the patient was registered under a misspelled name" is. Realistic error scenarios test your system's real resilience, not its ability to handle generic failures.

**Common mistake 1: Agents without context specifications.** Defining what an agent does but not what information it needs to do its job. If the Reasoner agent needs the patient's allergy list to check medication constraints, that must be in the context requirements — not assumed.

**Common mistake 2: Symmetric handoffs with no priority.** When two agents can both send information to a third agent, what happens if they send conflicting information? You need a priority rule or a conflict resolution mechanism.

**Common mistake 3: Tool contracts without error cases.** Every external tool will fail eventually. A tool contract that only describes successful calls is incomplete. You must specify what happens when the database is unavailable, when the API returns an unexpected format, or when the calculation hits a division-by-zero.

**Common mistake 4: Scenario logs that skip steps.** Each scenario log must show every step. If you skip from "the Classifier agent receives the input" to "the system sends a response," you have hidden all the interesting parts — the reasoning, the handoffs, the constraint checks. The steps in between are where the architecture is actually tested.

---

## Connection to Lab 3

Lab 3 will take everything you built in Lab 2 and prepare it for the real world. Your agents will face adversarial inputs. Your tool contracts will be audited for security vulnerabilities. Your handoff protocols will be stress-tested with load. Your system will need monitoring, alerting, and incident response procedures.

Think of it this way: Lab 2 proves that your system works under controlled conditions. Lab 3 proves that your system works when conditions are no longer controlled.

Keep every artifact from Lab 2. You will need the agent roster, the topology diagram, the handoff protocols, and especially the scenario execution logs — because Lab 3 will turn those 10 scenarios into a suite of 50 or more evaluation cases.
