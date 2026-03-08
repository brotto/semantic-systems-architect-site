---
sidebar_position: 6
sidebar_label: "Application B — Traceability package"
---

# Application B — Traceability package

## Objective

In this application, you will design a traceability system that makes every workflow execution fully observable, reproducible, and debuggable. When something goes wrong — or when someone asks "why did the system do X?" — your traceability package provides the answer.

This is the SSA's equivalent of an airplane's black box: it records everything that matters without interfering with normal operations, and it becomes invaluable when you need to understand what happened.

---

## Why traceability matters

**Everyday analogy: the medical chart.** Every time a doctor examines you, prescribes medication, or orders a test, they write it in your chart. If a new doctor takes over your care, they read the chart and know your entire history. If something goes wrong, the chart shows exactly what decisions were made, when, and by whom.

Without the chart, the new doctor is guessing. An investigation into a medical error has no evidence. A patient asking "why was I prescribed this?" gets no answer.

AI systems need the same rigor. When a customer says "your system gave me the wrong answer," you need to trace back through the entire workflow and understand: what data did the system have? What decisions did it make? What tools did it invoke? What went right and what went wrong?

---

## The assignment

Design a complete traceability package for the pipeline you built in Application A. The package has three components:

### Component 1: Execution logs (2 pages)

Design the logging format for your pipeline. Every workflow execution should produce a log that captures:

**Workflow-level log:**
```
Workflow Execution Log

execution_id: [unique identifier]
workflow_name: [name of the pipeline]
trigger: [what started this execution]
start_time: [ISO timestamp]
end_time: [ISO timestamp]
duration_ms: [total processing time]
status: [completed | failed | degraded | escalated]
steps_executed: [list of steps that ran]
steps_skipped: [list of steps skipped, with reasons]
final_output: [summary of what was produced]
error_summary: [if failed: what went wrong]
```

**Step-level log (for each step):**
```
Step Log

step_name: [name]
step_number: [sequence position]
agent: [which agent handled this step]
start_time: [ISO timestamp]
end_time: [ISO timestamp]
duration_ms: [processing time for this step]

input_summary: [what the step received — truncated for PII safety]
output_summary: [what the step produced — truncated for PII safety]
confidence: [if applicable — the agent's confidence in its output]

tools_invoked: [list of tools called]
tool_results: [success/failure for each tool call]

decisions_made: [key decisions at this step]
rules_applied: [which constraints/rules governed the decision]

status: [completed | failed | retried | skipped]
retry_count: [number of retries, if any]
fallback_used: [which fallback was activated, if any]
```

**Design questions:**
- What level of detail is appropriate? (Too little = unhelpful; too much = noise)
- What must NOT be logged? (PII, secrets, full message bodies with personal data)
- How long should logs be retained?
- Who can access the logs? (Support team? Engineers? Compliance?)

### Component 2: Decision-level event tracking (1-2 pages)

Beyond operational logs, capture every DECISION the system makes as a structured event. Decisions are the most important things to trace because they're where the system could have gone a different direction.

**Decision event format:**
```
Decision Event

decision_id: [unique identifier]
execution_id: [links to the workflow execution]
step: [which step made this decision]
agent: [which agent made this decision]
timestamp: [when the decision was made]

decision_type: [classification | routing | approval | escalation | strategy]

question: [what was being decided — in plain language]
  Example: "Should this refund request be auto-approved?"

input_evidence: [what information was used to make the decision]
  Example: "order_amount: $35, customer_tier: premium,
            tracking_status: delivered, dispute_type: quality"

decision_made: [what was decided]
  Example: "Auto-approve refund of $35"

alternatives_considered: [what other options existed]
  Example: "Deny (tracking shows delivered), Partial refund,
            Escalate to manager"

reasoning: [why this decision was chosen over alternatives]
  Example: "Order under $50 + premium customer = auto-approve
            per policy S07. Tracking shows delivered but customer
            reports quality issue, which tracking can't verify."

confidence: [how confident the agent was]
  Example: 0.88

rules_applied: [which constraints governed this decision]
  Example: "S07 (auto-approve refunds under $50 for premium),
            H03 (never auto-approve over $200)"

outcome_observed: [what actually happened as a result — filled in later]
  Example: "Refund processed successfully. Customer satisfied."
```

**Why this matters:** six months from now, if a manager asks "why are we auto-approving so many refunds?", you can query the decision events, see the pattern, and trace each decision back to its rules and evidence. Without decision tracking, you'd have to guess.

### Component 3: Incident replay guide (1 page)

Design a step-by-step guide for replaying any workflow execution from the logs. When something goes wrong, this guide tells an investigator how to reconstruct exactly what happened.

**Replay guide format:**
```
Incident Replay Guide

Purpose: Enable any team member to reconstruct a workflow execution
         and understand what happened and why.

Step 1: Locate the execution
  - Find the execution_id (from customer complaint, alert, or search)
  - Pull the workflow-level log for this execution
  - Note: status, duration, any errors flagged

Step 2: Review the timeline
  - Pull all step-level logs for this execution_id
  - Sort by start_time to see the sequence
  - Identify: which steps completed? which failed? which were skipped?

Step 3: Examine decisions
  - Pull all decision events for this execution_id
  - For each decision, review:
    - What evidence was available?
    - What was decided?
    - What alternatives existed?
    - Was the confidence high enough?

Step 4: Check tool interactions
  - For each tool invoked, review:
    - What was sent to the tool?
    - What did the tool return?
    - Were there retries? Timeouts? Errors?

Step 5: Identify the failure point
  - Where in the sequence did things go wrong?
  - Was it a tool failure, a decision error, a missing context,
    or something else?
  - Did the recovery mechanisms activate? Did they help?

Step 6: Determine root cause
  - Categories: data issue, logic error, tool failure,
    constraint gap, edge case, adversarial input
  - Was this preventable? How?

Step 7: Document findings
  - What happened (factual timeline)
  - Why it happened (root cause)
  - What was the impact (customer effect, business impact)
  - What should change (prevention recommendations)
```

---

## Deliverable

A document (4-6 pages) containing:

- [ ] Execution log format with workflow-level and step-level templates
- [ ] Decision event tracking format with at least 3 example decision events from your pipeline
- [ ] Incident replay guide with clear step-by-step instructions
- [ ] Privacy considerations: what is NOT logged and why
- [ ] Retention policy: how long logs are kept and who can access them
- [ ] At least one example replay: walk through a failure scenario from Application A using your logging format

---

## Evaluation criteria

| Criterion | What "good" looks like |
|---|---|
| **Log completeness** | Both workflow-level and step-level logs capture timing, inputs, outputs, decisions, and errors. No critical information is missing. |
| **Decision granularity** | Every significant decision is captured as a structured event with evidence, reasoning, alternatives, and confidence. Not just "what" but "why." |
| **Replay usability** | The replay guide is clear enough that someone who wasn't involved in the original execution could reconstruct and understand it. |
| **Privacy awareness** | PII and sensitive data are explicitly excluded from logs. The policy is documented, not assumed. |
| **Practical value** | The traceability package would actually help a real team debug issues, answer customer questions, and improve the system. |

---

## Tips for success

- **Log decisions, not just events.** "Step 3 completed" tells you nothing useful. "Step 3 decided to auto-approve because order < $50 and customer is premium (confidence 0.88, rule S07)" tells you everything.

- **Design for the investigator.** When something goes wrong at 3 AM, the on-call engineer will read your logs. Make them understandable, searchable, and structured. If the engineer has to parse raw text to find the failure, the logs have failed.

- **Privacy is not optional.** Logging customer email addresses, phone numbers, or message contents creates a privacy liability. Log enough to trace the decision, but use identifiers (customer_id) instead of personal data wherever possible.

- **Test your replay guide.** Pick a scenario, generate mock logs, and try to follow your replay guide. Can you actually reconstruct what happened? If you get stuck, the guide needs more detail.

- **Retention has legal implications.** Some industries require keeping logs for years. Others require deleting them promptly. Document your retention policy explicitly.
