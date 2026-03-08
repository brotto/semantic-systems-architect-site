---
sidebar_position: 5
sidebar_label: "Application A — Multi-agent design package"
---

# Application A — Multi-agent design package

## Objective

In this application, you will design a complete multi-agent system for a real domain. You'll combine everything from the three lessons — role design, topology selection, and handoff protocols — into a single, coherent architecture document that could be handed to a development team for implementation.

This is the SSA's equivalent of an architect's blueprint: detailed enough to build from, clear enough for any team member to understand, and rigorous enough that safety is built in from the start.

---

## The assignment

Choose the same domain you used in Module 2 (where you built your ontology and constraint matrix), or choose a new domain if you prefer:

**Domain A: An AI-powered customer support system**
A company receives hundreds of tickets daily across email, chat, and phone. The AI system must classify tickets, find relevant information, decide on response strategies, generate responses, and handle escalations.

**Domain B: An automated content moderation system**
A social media platform needs to review user-generated content for policy violations. The system must analyze text, images, and context, make moderation decisions, handle appeals, and escalate edge cases.

**Domain C: An intelligent document processing system**
A law firm receives thousands of contracts, filings, and legal documents. The system must extract information, classify documents, identify key clauses, flag risks, and prepare summaries for lawyers.

**Domain D: Your own project**
Use a real system from your work or personal projects. Real domains produce the strongest learning.

---

## Deliverable structure

### Section 1: System overview (half page)

Describe the system in 3-5 sentences:
- What does it do?
- Who uses it?
- What are the main inputs and outputs?
- What are the critical requirements (safety, speed, accuracy)?

### Section 2: Agent matrix (2-3 pages)

Define at least 6 agents. For each:

```
Agent: [Name]
  Role type: [Planner / Retriever / Reasoner / Critic / Executor / Guardrail]

  RESPONSIBLE FOR:
    - [specific task 1]
    - [specific task 2]
    - [specific task 3]

  NOT RESPONSIBLE FOR:
    - [what other agents handle]
    - [what this agent must not touch]

  MUST NEVER:
    - [forbidden action 1]
    - [forbidden action 2]

  Semantic contract reference:
    - Input: [what it receives — reference Module 2 contracts]
    - Output: [what it produces]
    - Key constraints: [which constraints from the matrix apply]

  Failure behavior:
    - If this agent fails, [what happens]
    - Escalation target: [who receives the escalation]
```

**Quality checklist:**
- [ ] Every agent has a single cognitive role type (no multi-role agents)
- [ ] Every agent has a "MUST NEVER" list with at least 2 items
- [ ] Every pair of agents has clear, non-overlapping scope
- [ ] Every agent references specific constraints from the Module 2 matrix
- [ ] Failure behavior is defined for every agent

### Section 3: Topology diagram and justification (1 page)

Draw the topology showing:
- How agents connect to each other
- The direction of information flow
- Where parallel processing occurs (if any)
- Where escalation paths lead

Include a one-paragraph justification explaining:
- Which topology you chose (supervisor, pipeline, swarm, or hybrid)
- Why this topology fits your system's requirements
- What trade-offs you accepted
- What you'd monitor for signs that the topology needs to change

### Section 4: Handoff protocol specification (2 pages)

Define the handoff message format for your system, then document:

**The happy path:** the complete handoff sequence for a typical request, showing every message between agents.

**Three unhappy paths:**
1. A timeout scenario with recovery
2. A low-confidence scenario with escalation
3. A constraint violation scenario with correction

For each handoff, show the actual message contents (payload, context, confidence, routing, active constraints).

### Section 5: Shared memory strategy (half page)

Multi-agent systems need a way to share state. Define:

- **What information is shared** between all agents (the "shared context")
- **What information is private** to each agent
- **How shared state is updated** (who can write, when, conflict resolution)
- **What happens when shared state is inconsistent** (detection and recovery)

Think of this as the shared whiteboard in a team room: everyone can read it, but there are rules about who writes what and how to resolve conflicting notes.

### Section 6: Escalation map (half page)

Draw the complete escalation hierarchy:

```
Level 1: Agent → Peer Agent (clarification requests)
Level 2: Agent → Supervisor (routing/confidence issues)
Level 3: Supervisor → Senior Agent or Committee (complex decisions)
Level 4: Any Agent → Human (cases requiring human judgment)
```

For each level, specify:
- What triggers escalation to this level
- What information must accompany the escalation
- Expected response time
- What happens if this level can't resolve the issue

---

## Evaluation criteria

| Criterion | What "good" looks like |
|---|---|
| **Role clarity** | Every agent has one cognitive role with clear scope, exclusions, and forbidden actions. No overlapping responsibilities between agents. |
| **Topology fitness** | The chosen topology matches the system's requirements (variability, explainability, latency, reliability). Justification addresses trade-offs honestly. |
| **Protocol completeness** | Handoff messages include all five components. Happy and unhappy paths are fully specified. Failure recovery is practical and specific. |
| **Shared memory design** | Clear rules for what's shared vs. private, who can write, and how inconsistencies are detected and resolved. |
| **Escalation coverage** | Every failure mode has an escalation path. No agent can get stuck without a way to escalate. Human fallback is always available. |

---

## Tips for success

- **Start with the happy path.** Design the system for when everything works perfectly. Once the happy path is clear, the failure modes become easier to identify — they're all the places where the happy path can break.

- **Use your Module 2 artifacts.** Your ontology defines the vocabulary your agents use. Your constraint matrix defines the rules they follow. Your semantic contracts define what each agent receives and produces. This application should reference those artifacts directly.

- **The confusion test is non-negotiable.** For every pair of agents, verify there's no ambiguity about who handles what. If you find overlap, fix it before proceeding.

- **Keep shared memory minimal.** Share only what multiple agents genuinely need. The more you share, the more complex the consistency problem becomes. When in doubt, keep information private to the agent that produces it and pass it explicitly through handoffs.

- **Every failure needs a recovery.** If your failure scenario ends with "the system fails," that's not a design — that's a bug. Every failure must have a path to recovery, even if that recovery is "transfer to human with full context."
