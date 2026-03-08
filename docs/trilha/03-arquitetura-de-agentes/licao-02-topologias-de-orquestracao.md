---
sidebar_position: 3
sidebar_label: "Lesson 2 — Orchestration topologies"
---

# Lesson 2 — Orchestration topologies

## The team is hired — now how do they work?

In Lesson 1, you designed the agents: who they are, what they do, and what they must never do. Now comes the next question: **how do they coordinate?**

This is not a trivial decision. The same team of agents can work in fundamentally different ways depending on how you organize them, and each approach has different strengths, costs, and failure modes.

Think about this in everyday terms.

---

## Three ways to run a kitchen

Imagine three restaurants, all with the same team: a head chef, a sous-chef, a pastry chef, a line cook, and a dishwasher. Same people, same skills. But each restaurant organizes the work differently.

### Restaurant A: The conductor kitchen

The head chef stands at the center. Every order comes to the head chef first. The head chef reads the order, decides which team member handles what, gives specific instructions to each person, collects the finished components, inspects them, and decides when the dish is ready to serve.

**How it feels:** organized, controlled, predictable. The head chef sees everything and can catch problems early. But if the head chef is slow, the entire kitchen is slow. And the head chef becomes a bottleneck during rush hour.

**This is the Supervisor topology.**

### Restaurant B: The assembly line kitchen

The order enters at one end of the kitchen. The first station (appetizers) handles the first course and passes the ticket to the next station (main course), which passes to the next (desserts), which passes to plating, which passes to service. Each station does its part and hands off to the next.

**How it feels:** efficient, scalable, specialized. Each station only needs to know their own part. But if one station is slow, everything behind it backs up. And if the appetizer station makes an error, it might not be caught until plating — when it's too late to fix easily.

**This is the Pipeline topology.**

### Restaurant C: The collaborative kitchen

There's no single commander. Each team member sees the incoming orders on a shared board. They self-organize: the pastry chef takes dessert orders, the line cook takes main dishes. If someone finishes their work early, they help where needed. They communicate constantly — "I need the sauce in 3 minutes," "the oven is at capacity, delay that roast by 5 minutes."

**How it feels:** flexible, adaptive, fast in chaotic situations. But requires experienced, trustworthy team members. If someone makes a mistake, there's no single person catching it. Coordination overhead is high — everyone has to stay aware of what everyone else is doing.

**This is the Swarm (Federated) topology.**

---

## Topology 1: Supervisor + Specialists

### How it works

One agent — the **supervisor** — receives all incoming requests and orchestrates the other agents. The supervisor decides:
- Which agents to invoke
- In what order
- What information to pass to each
- When the task is complete

The specialist agents do their specific work and return results to the supervisor. The supervisor synthesizes the results and produces the final output.

```
                    [Request]
                       |
                       v
                  [Supervisor]
                 /     |      \
                v      v       v
          [Agent A] [Agent B] [Agent C]
                \      |      /
                 v     v     v
                  [Supervisor]
                       |
                       v
                   [Response]
```

### When to use it

The supervisor topology works best when:

- **The task requires judgment about which agents to use.** Not every request needs every agent. The supervisor can dynamically decide: "This is a simple question — I only need the knowledge retriever and the response writer. Skip the account lookup."

- **The system needs centralized quality control.** The supervisor sees every intermediate result and can catch errors before they compound. If Agent B produces something that contradicts Agent A's output, the supervisor notices.

- **The task order isn't always the same.** Sometimes you need retrieval before reasoning; sometimes you need reasoning first. The supervisor adapts the workflow based on the specific request.

- **Explainability is important.** Because the supervisor makes all routing decisions, you can trace exactly why each agent was invoked and in what order. This is critical in regulated industries (healthcare, finance, legal) where you need to explain how a decision was reached.

### Everyday analogy: the film director

A film director doesn't act, doesn't operate the camera, doesn't do the lighting. But they decide: "Camera 2, give me a close-up of the actor's face. Lighting, dim the background. Sound, fade in the music. Actor, deliver the line with more emotion."

The director sees the whole picture. Each specialist executes their craft. The director decides when the shot is perfect. This centralized vision is what makes the final product coherent.

### Trade-offs

| Advantage | Disadvantage |
|---|---|
| Centralized control and visibility | Supervisor is a single point of failure |
| Dynamic routing based on context | Supervisor can become a bottleneck |
| Easy to debug (one decision-maker) | Supervisor needs to understand all agents |
| Good for variable workflows | Additional latency (everything goes through supervisor) |
| Natural quality checkpoints | Supervisor prompt becomes complex |

### Warning signs it's wrong for your system

- If the workflow is always the same (same agents, same order), a supervisor adds overhead without benefit. Use a pipeline instead.
- If the supervisor prompt becomes too complex (trying to understand 10+ agents), it will start making poor routing decisions. Break the system into smaller supervised groups.

---

## Topology 2: Stage Pipeline

### How it works

Agents are arranged in a fixed sequence. Each agent receives input from the previous stage, does its work, and passes the result to the next stage. The workflow is always the same — no routing decisions needed.

```
[Request] → [Stage 1] → [Stage 2] → [Stage 3] → [Stage 4] → [Response]
```

### When to use it

The pipeline topology works best when:

- **The processing steps are always the same.** Every request goes through the same stages in the same order. There's no branching, no "sometimes we skip stage 3."

- **Each stage genuinely transforms the data.** Stage 1 produces something that stage 2 couldn't produce from the raw input alone. Each stage adds value that the next stage depends on.

- **Throughput matters more than latency for individual requests.** While one request is at stage 3, another can be at stage 2, and a third at stage 1. This pipelining increases overall throughput even if each individual request takes the same time.

- **The domain is well-understood and stable.** Pipelines work when you know what processing is needed. If requirements change frequently, a pipeline becomes brittle — you'd need to reconfigure the entire chain.

### Everyday analogy: car manufacturing

An automobile assembly line is the classic pipeline. The car frame enters at one end. Station 1 installs the engine. Station 2 attaches the body panels. Station 3 paints. Station 4 installs the interior. Station 5 adds electronics. Station 6 does quality inspection.

Each station receives a partially complete car and adds one thing. The order matters — you can't paint before attaching the body panels. And the process is the same for every car of the same model.

No station decides "should I skip painting today?" or "maybe I should install the engine differently." The sequence is fixed, tested, and optimized.

### Example: document processing pipeline

```
[Upload] → [Extract Text] → [Classify Document] → [Extract Fields] → [Validate] → [Store]

Stage 1 (Text Extraction):
  Input: raw document (PDF, image, scan)
  Output: structured text with layout information

Stage 2 (Classification):
  Input: structured text
  Output: document type (invoice, contract, receipt, letter)

Stage 3 (Field Extraction):
  Input: structured text + document type
  Output: key-value pairs (date, amount, parties, etc.)

Stage 4 (Validation):
  Input: extracted fields + document type
  Output: validated fields with confidence scores, flagged issues

Stage 5 (Storage):
  Input: validated fields
  Output: stored record with audit trail
```

### Trade-offs

| Advantage | Disadvantage |
|---|---|
| Simple and predictable | Inflexible — same path for every request |
| Easy to test each stage independently | If one stage fails, the whole pipeline stops |
| High throughput with parallel pipelines | Adding a new stage requires restructuring |
| No routing complexity | Error at stage 1 propagates through all stages |
| Clear performance profiling (bottleneck = slowest stage) | Overdesigned for simple tasks |

### Warning signs it's wrong for your system

- If different requests need different processing steps, a pipeline forces unnecessary stages on some requests.
- If you need to go backward (stage 3 discovers something that should change stage 1's output), pipelines don't support backtracking naturally.
- If stages have very different processing times, the slowest stage creates a bottleneck that wastes the speed of faster stages.

---

## Topology 3: Federated Swarm

### How it works

Agents operate semi-independently. There's no single supervisor telling them what to do. Instead, agents observe a shared context (a task board, a shared memory space, or a message bus), claim work they're suited for, and coordinate with each other through messages.

```
         [Shared Context / Task Board]
          /      |       |       \
         v       v       v        v
    [Agent A] [Agent B] [Agent C] [Agent D]
         \       |       |       /
          v      v       v      v
         [Shared Context / Task Board]
```

### When to use it

The swarm topology works best when:

- **Tasks can be decomposed and handled in parallel.** If five sub-tasks need to happen and none depends on the others, five agents can work simultaneously. This is much faster than a pipeline or supervisor routing them one by one.

- **The system needs to scale dynamically.** If today's workload requires 3 agents and tomorrow's requires 30, a swarm can grow and shrink without redesigning the architecture.

- **No single agent has enough context for centralized decisions.** In some domains, the information is distributed — no one agent can see the full picture. Agents make local decisions based on their local context and coordinate through shared state.

- **Resilience matters more than control.** If one agent fails in a swarm, the others continue working. In a supervisor topology, if the supervisor fails, everything stops. In a pipeline, if any stage fails, the pipeline breaks.

### Everyday analogy: an ant colony

An ant colony has no project manager. When a scout ant discovers food, it leaves a pheromone trail. Other ants detect the pheromone and follow the trail. If the food source is rich, more ants come and reinforce the trail. If the food runs out, the trail fades and ants explore elsewhere.

Each ant makes simple local decisions: "Do I smell pheromone? Follow it. Is there food here? Take it back." No ant sees the big picture. But the colony as a whole efficiently finds and harvests food, builds complex structures, and adapts to changing environments.

This is the power — and the risk — of a swarm. It's incredibly adaptive, but no single entity is in control.

### Example: research and analysis system

```
Task: "Analyze the competitive landscape for our new product"

Shared task board:
  - Task 1: Find competitor pricing information [available]
  - Task 2: Analyze competitor feature matrices [available]
  - Task 3: Find recent market reports [available]
  - Task 4: Analyze customer sentiment on competitor products [available]
  - Task 5: Synthesize findings into executive summary [blocked: needs 1-4]

Agent: Market Researcher (claims Task 1 + Task 3)
  Works in parallel on pricing and reports

Agent: Product Analyst (claims Task 2)
  Works on feature comparison

Agent: Sentiment Analyzer (claims Task 4)
  Works on customer sentiment analysis

When Tasks 1-4 complete → Task 5 becomes available
Agent: Synthesis Writer (claims Task 5)
  Reads all results, produces summary
```

### Trade-offs

| Advantage | Disadvantage |
|---|---|
| High parallelism (agents work simultaneously) | Harder to debug (no central view) |
| Resilient to individual agent failures | Risk of conflicting outputs |
| Scales dynamically | Requires sophisticated coordination |
| Adapts to variable workloads | Quality control is distributed (no single gatekeeper) |
| No single bottleneck | Harder to guarantee consistency |

### Warning signs it's wrong for your system

- If tasks are highly sequential (step 2 can't start until step 1 finishes), a swarm adds coordination overhead without gaining parallelism.
- If quality and consistency are paramount (medical, legal), the lack of centralized quality control is a risk.
- If you need to explain the exact decision path (regulatory requirements), a swarm's emergent behavior is hard to trace.

---

## Choosing the right topology

There's no universally best topology. The right choice depends on your system's specific requirements. Here's a decision framework.

### Decision Factor 1: Workflow variability

**"Is the processing path always the same, or does it change based on the request?"**

- Same path every time → **Pipeline**
- Usually similar but with some variation → **Supervisor**
- Highly variable, unpredictable → **Swarm**

### Decision Factor 2: Explainability requirements

**"Do stakeholders need to understand exactly how each decision was made?"**

- Yes, every step must be traceable → **Supervisor** (central decision log) or **Pipeline** (fixed sequence)
- Partially — outcomes matter more than the path → **Swarm with logging**
- No — results are what matter → any topology works

### Decision Factor 3: Latency tolerance

**"How fast does the system need to respond?"**

- Very fast (sub-second) → **Pipeline** (minimal routing overhead) or **Swarm** (parallel execution)
- Moderate (seconds) → any topology works
- Tolerant (minutes) → any topology works; choose based on other factors

### Decision Factor 4: Failure criticality

**"What happens if something goes wrong?"**

- System must never produce a wrong answer → **Supervisor** (centralized checking) with **critic guardrail**
- Wrong answers are costly but recoverable → **Pipeline** with validation stage
- Wrong answers are acceptable if flagged → **Swarm** with confidence thresholds

### Decision Factor 5: Scale requirements

**"Does the system need to handle variable load?"**

- Fixed, predictable load → **Pipeline**
- Variable load with peaks → **Supervisor** (can skip unnecessary agents) or **Swarm** (can scale agents)
- Massive parallel processing → **Swarm**

### The decision matrix

| Factor | Pipeline | Supervisor | Swarm |
|---|---|---|---|
| Fixed workflow | Best | Good | Overkill |
| Variable workflow | Poor | Best | Good |
| High explainability | Good | Best | Difficult |
| Low latency | Best | Moderate | Good (parallel) |
| High reliability | Good | Best | Moderate |
| High scalability | Moderate | Moderate | Best |
| Simple to implement | Best | Moderate | Complex |

---

## Hybrid topologies

In practice, many real systems combine topologies. This is not only acceptable — it's often the best approach.

### Supervisor + Pipeline

A supervisor receives requests and routes them. But some agents within the supervised system work as a pipeline — the retriever always feeds the reasoner, which always feeds the writer.

```
              [Supervisor]
             /     |       \
            v      v        v
    [Guardrail]  [Pipeline]  [Escalator]
                 /    |    \
                v     v     v
          [Retrieve] [Reason] [Write]
```

### Supervisor + Swarm

A supervisor receives complex tasks and decomposes them. The subtasks are placed on a shared board where a swarm of worker agents picks them up in parallel. The supervisor reassembles the results.

**Everyday analogy:** a project manager creates a task list (supervisor behavior), posts the tasks on a project board, and team members pick up tasks based on their skills and availability (swarm behavior). The project manager reviews the completed work and assembles the final deliverable (supervisor again).

### When to go hybrid

You should consider a hybrid topology when:
- Different parts of your system have different requirements (one part needs strict control, another needs high throughput)
- The overall workflow is variable (supervisor) but individual processing paths are fixed (pipeline)
- You need both parallel execution (swarm) and centralized quality control (supervisor)

---

## Practice activity

Take the agent matrix you designed in Lesson 1 and design the orchestration topology:

1. **Map the workflow:** draw how information flows between your agents. Which agent feeds into which? Are there any parallel paths?

2. **Apply the five decision factors** to your system. Write one sentence for each factor explaining your system's position.

3. **Choose a topology** (or hybrid) and write a one-paragraph justification explaining why this topology fits your system's needs better than the alternatives.

4. **Draw the topology diagram** showing how agents connect and how information flows.

5. **Identify the weaknesses** of your chosen topology for your specific use case. What could go wrong? What would you monitor?

---

## Key takeaways

1. **Topology is about coordination, not capability.** The same agents can be organized as a supervised team, a pipeline, or a swarm. The topology doesn't change what agents do — it changes how they work together.

2. **Pipeline for predictable workflows, supervisor for variable workflows, swarm for parallel workflows.** This is the simplest decision rule. Most systems fall clearly into one of these categories.

3. **Supervisor topology is the safest default.** If you're not sure which to choose, start with a supervisor. It's the easiest to debug, the most transparent, and the most controllable. You can optimize later if you need more speed or parallelism.

4. **Hybrid topologies are normal.** Real-world systems rarely fit perfectly into one topology. A supervisor routing work to a pipeline that includes a swarm for research tasks is a perfectly valid design — as long as each part is justified.

5. **Every topology has failure modes.** A supervisor can be a bottleneck. A pipeline can propagate errors. A swarm can produce inconsistencies. Knowing the failure modes of your chosen topology is as important as knowing its strengths.

---

## What comes next

You've designed the team (Lesson 1) and decided how they coordinate (Lesson 2). In **Lesson 3 — Handoff protocols and safety**, you'll define the details of agent communication: what information passes between agents, what happens when an agent fails, and how the system recovers gracefully from problems.
