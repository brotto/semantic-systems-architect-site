---
sidebar_position: 5
sidebar_label: "Application A — Context package"
---

# Application A — Context package v1

## Objective

In this application, you will produce a complete, versioned **context package** — the production-ready artifact that contains everything an agent needs to operate correctly. This package is the bridge between your design work (ontology, contracts, agent architecture) and the actual running system.

A context package is like a pilot's operations manual: it contains everything the pilot needs to fly safely, organized in a way that makes critical information immediately accessible.

---

## The assignment

Choose one of the agents from your system architecture and build its complete context package.

---

## Deliverable structure

### Section 1: Package metadata (quarter page)

```
CONTEXT PACKAGE

Agent: [name]
Version: 1.0
Last updated: [date]
Author: [your name]
Status: [draft | review | approved]
Dependencies: [which other agents/tools this package requires]
Change log:
  v1.0 — Initial version. Covers all core scenarios.
```

### Section 2: Static context — mission and identity (half page)

Write the complete identity section for this agent. Include:
- Who the agent is (1-2 sentences)
- Its fundamental mission (1 sentence)
- The tone and style it should use
- What distinguishes this agent from others in the system

### Section 3: Static context — policies (1 page)

Document all non-negotiable policies for this agent:
- Hard constraints from the constraint matrix (with references)
- Refusal scenarios with response templates
- Authority boundaries (can/cannot)
- Data handling rules (what it can access, what it must never store)

### Section 4: Static context — ontology references (half page)

Extract the relevant subset of your domain ontology for this agent:
- Which entities does it work with?
- Which attributes matter for its decisions?
- Which states and transitions does it need to know about?
- Which constraints specifically apply to these entities?

Don't include the entire ontology — only the parts this agent needs. This is surgical precision, not a data dump.

### Section 5: Dynamic context specification (half page)

Define what dynamic information this agent receives at runtime:
- Customer/user data (which fields, from which source)
- Session state (what's been decided so far)
- System state (current load, availability, flags)
- Temporal context (time of day, day of week, if relevant)

For each piece of dynamic data, specify:
- Source (which database, API, or previous agent)
- Freshness requirement (real-time, cached, or historical)
- Fallback if unavailable

### Section 6: Retrieved context specification (half page)

Define what retrieved information this agent uses:
- Which knowledge sources it searches
- Maximum number of retrieved items
- Relevance threshold
- How retrieved context is formatted and presented

### Section 7: Output schema (half page)

Specify the exact output format:
- Fields with types
- Required vs. optional fields
- Guarantees and non-guarantees
- Self-review checklist

### Section 8: Few-shot examples (1 page)

Provide 3-4 examples covering:
- The standard/happy case
- An edge case
- A refusal case
- An uncertainty case

### Section 9: Change log and rationale (quarter page)

For v1.0, document:
- Key design decisions made while building this package
- What was included and what was deliberately excluded
- Known limitations of this version
- Planned improvements for v1.1

---

## Evaluation criteria

| Criterion | What "good" looks like |
|---|---|
| **Completeness** | All nine sections are present and substantive. No section is a placeholder. |
| **Ontology integration** | The package references specific entities, attributes, and constraints from the Module 2 artifacts. Context and contract are traceable. |
| **Layer separation** | Static, dynamic, and retrieved contexts are cleanly separated. No mixing of permanent rules with runtime data. |
| **Actionability** | A developer could take this package, plug it into a model, and have a working agent. No ambiguous instructions. |
| **Maintainability** | The package is versioned with a change log. Modifications to any section are easy to make without affecting others. |

---

## Tips for success

- **Write for the implementer.** The person reading this package will not be you — it might be a developer, a product manager, or a future SSA. Write clearly enough that someone who wasn't involved in the design can understand and use the package.

- **Test your examples.** Before including a few-shot example, mentally walk through it: does the agent's response follow all the policies? Does it match the output schema? Does it stay within authority boundaries? If not, fix the example — bad examples teach bad behavior.

- **Include what's excluded.** Explicitly noting "this agent does NOT need customer payment history" is as valuable as noting what it does need. Explicit exclusions prevent context bloat over time.

- **Keep it under 2,000 tokens.** A context package that exceeds the model's attention capacity defeats its purpose. Be concise. Every word should earn its place.
