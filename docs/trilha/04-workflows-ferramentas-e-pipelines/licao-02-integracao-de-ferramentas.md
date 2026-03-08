---
sidebar_position: 3
sidebar_label: "Lesson 2 — Tool integration"
---

# Lesson 2 — Tool integration

## The craftsman's toolbox

A master carpenter doesn't grab any tool at random. They know exactly which tool to use for each task, how to use it safely, and what to do if a tool breaks. They know that a hammer is for nails, not for screws. They know that a table saw needs a safety guard. They know that if the drill battery dies, they can switch to a hand drill.

**AI agents are craftsmen, and their tools are databases, APIs, email services, search engines, calculators, and file systems.** Just as a carpenter needs to know how each tool works, an agent needs a precise specification of each tool: what it does, what it requires, what it returns, and what can go wrong.

This specification is the **tool contract** — and it's just as important as the agent's semantic contract. A powerful agent with a poorly specified tool is like a skilled carpenter with a defective saw: the result won't be what you intended.

---

## What is a tool?

In AI systems, a "tool" is any capability that extends what the language model can do on its own. A language model can reason, classify, and generate text. But it can't — by itself — check today's weather, look up a customer's account, send an email, or process a payment.

Tools bridge this gap. They let the AI agent interact with the real world.

**Everyday analogy: a smartphone.** Your phone by itself makes calls and sends texts. But with apps (tools), it can navigate streets, check your bank balance, control your home thermostat, order food, and measure your heart rate. Each app has a specific function, requires specific inputs, and produces specific outputs.

### Types of tools

**Read tools (information retrieval):**
- Database queries (fetch customer record, look up product details)
- Search engines (find relevant documents, search knowledge base)
- API calls for data (get weather, get stock price, get shipping status)
- File reading (read a document, load a configuration)

**Write tools (state modification):**
- Database updates (update customer status, create a new record)
- Email/message sending (send confirmation, post notification)
- File creation (generate report, save analysis)
- External system updates (update CRM, trigger shipping)

**Compute tools (processing):**
- Calculators (math operations, currency conversion)
- Validators (check email format, verify address)
- Transformers (convert file format, translate language)
- Analyzers (sentiment analysis, image recognition)

**The critical distinction:** read tools are safe by default — they don't change anything. Write tools are risky — they modify the world. Compute tools are usually safe but can be slow or expensive. Your tool contracts should reflect this distinction.

---

## The tool contract

Every tool needs a contract — a precise specification that tells the agent exactly how to use it. Just like a semantic contract has input, decision, and output parts, a tool contract has five parts.

### Part 1: Identity and purpose

```
Tool: send_email
  Purpose: Send an email to one or more recipients
  Category: Write (modifies world state)
  Risk level: Medium (emails cannot be recalled once sent)
```

What does this tool do? What category is it (read/write/compute)? How risky is using it? An agent needs to know this before deciding whether and when to invoke the tool.

### Part 2: Input schema (what the tool needs)

```
Arguments:
  Required:
    - to: list of email addresses (1-10 recipients)
    - subject: string (1-200 characters)
    - body: string (1-50000 characters)
  Optional:
    - cc: list of email addresses (0-10)
    - attachments: list of file references (0-5, max 25MB total)
    - priority: enum (normal, high) — default: normal
    - reply_to: email address

Validation:
  - All email addresses must pass format validation
  - Subject must not be empty
  - Body must not contain disallowed patterns (credit card numbers,
    social security numbers — checked via regex)
  - Attachments must be from approved file types (pdf, docx, xlsx, png)
  - Total payload must not exceed 25MB
```

**Why strict schemas matter:** without a schema, the agent might try to send an email with no subject, 50 recipients, and a 200MB attachment. The schema catches these errors before the tool is invoked — not after the email is half-sent.

**Everyday analogy:** a vending machine has a coin slot that only accepts specific coins. You can't insert a button or a paper clip. The physical constraint prevents invalid inputs. Tool schemas are digital coin slots.

### Part 3: Output schema (what the tool returns)

```
Returns:
  Success:
    - status: "sent"
    - message_id: string (unique identifier)
    - timestamp: ISO datetime
    - recipients_count: number
  Failure:
    - status: "failed"
    - error_code: enum (invalid_address, rate_limited,
                        service_unavailable, size_exceeded)
    - error_message: string (human-readable description)
    - retryable: boolean
```

The agent must know what to expect from the tool — both on success and failure. "The tool returned something" isn't enough. The agent needs to know the exact format so it can act on the result.

### Part 4: Permissions and safety rules

```
Permissions:
  - Can only send to external addresses if agent has "external_comms" scope
  - Cannot send to more than 5 unique recipients per hour (rate limit)
  - Cannot send attachments without "attachment" scope
  - Cannot send on behalf of another user without "delegation" scope

Safety rules:
  - All outgoing emails must pass the guardrail agent before sending
  - Emails containing customer PII must be flagged for review
  - "Reply all" is disabled by default (requires explicit override)
  - Promotional content must include unsubscribe link (legal requirement)

Forbidden uses:
  - Never send emails based on triggers from untrusted sources
  - Never include system credentials or API keys in email body
  - Never CC the customer on internal escalation emails
```

**Why permissions matter:** without them, an agent could theoretically send unlimited emails to anyone, attach any file, and include any content. Permissions are guardrails that prevent well-intentioned agents from doing harmful things.

### Part 5: Operational specifications

```
Performance:
  - Expected latency: 500ms - 2 seconds
  - Timeout: 10 seconds (after which, consider failed)

Retry policy:
  - Retryable errors: rate_limited (wait 60s), service_unavailable (wait 5s)
  - Non-retryable errors: invalid_address, size_exceeded
  - Max retries: 3
  - Backoff: exponential (5s, 10s, 20s)

Idempotency:
  - NOT idempotent — calling twice sends two emails
  - Use message_id to deduplicate if needed

Compensation:
  - No automatic recall available
  - If sent in error: create incident record for human follow-up
  - For urgent recalls: contact email administrator directly
```

**Idempotency** is a crucial concept. If you call a tool twice with the same input, does it produce the same result or do something twice?

- A **read tool** is naturally idempotent — fetching a customer record twice returns the same record both times.
- A **write tool** may NOT be idempotent — sending an email twice sends two emails. Charging a credit card twice charges the customer double.

The tool contract must specify this so the agent knows whether a retry is safe.

**Everyday analogy: the elevator button.** Pressing the elevator button once calls the elevator. Pressing it five more times doesn't call five more elevators — the system is idempotent. But a crosswalk button that sends a "walk" request to the traffic controller might change the light sequence if pressed at certain moments — not idempotent. You need to know the difference.

---

## Building a tool registry

A **tool registry** is the complete catalog of tools available to your system's agents. Think of it as a toolbox inventory — every tool listed, described, and categorized.

### Registry format

```
TOOL REGISTRY

Tool: search_knowledge_base
  Purpose: Search internal documentation for relevant articles
  Category: Read
  Risk: Low
  Availability: 99.9% SLA
  Used by: Knowledge Retriever agent
  Contract: [reference to full contract]

Tool: update_customer_record
  Purpose: Modify a customer's profile data
  Category: Write
  Risk: Medium (changes are logged but hard to undo at scale)
  Availability: 99.5% SLA
  Used by: Account Manager agent
  Contract: [reference to full contract]

Tool: calculate_refund_amount
  Purpose: Compute refund based on policy rules
  Category: Compute
  Risk: Low (no side effects)
  Availability: 100% (runs locally)
  Used by: Refund Calculator agent
  Contract: [reference to full contract]
```

### Which agents can use which tools?

Not every agent should have access to every tool. Just as not every employee in a company has the keys to every room, agents should only have access to the tools they need.

**The principle of least privilege:** each agent gets access to the minimum set of tools required for its role. The Classifier agent doesn't need access to send_email. The Response Writer doesn't need access to update_customer_record.

```
Agent → Tool Access Matrix

                     search_kb  update_record  send_email  calc_refund
Classifier              ✗            ✗            ✗           ✗
Knowledge Retriever      ✓            ✗            ✗           ✗
Account Retriever        ✗            ✗            ✗           ✗
Strategist               ✗            ✗            ✗           ✓
Writer                   ✗            ✗            ✗           ✗
Executor                 ✗            ✓            ✓           ✗
Guardrail                ✓            ✗            ✗           ✗
```

Notice: the Executor is the only agent that can modify state (update records, send emails). Other agents can read and compute, but they can't change the world. This is a safety design — it concentrates risk in one agent that can be heavily monitored.

---

## State management strategy

As workflows process requests, they create and consume **state** — information that must be available at different stages. Not all state is equal. Some disappears after the workflow is complete. Some persists forever.

### Three types of state

**Ephemeral state (lives during a single workflow step):**
- The intermediate calculations a reasoner performs
- The temporary variables used to format a response
- The raw API response before it's parsed

**Everyday analogy:** the scratch paper a student uses during a math exam. It helps them reach the answer, but it's thrown away after the exam is over.

**Session state (lives for the duration of a conversation or workflow):**
- The customer's current request and accumulated context
- The decisions made so far in this workflow
- The agent outputs that downstream agents need

**Everyday analogy:** the notes a doctor takes during a patient visit. They're needed throughout the appointment but aren't part of the permanent medical record until finalized.

**Persistent state (lives beyond any single workflow):**
- Customer records, order history, account settings
- Audit logs, decision records, compliance data
- Model performance metrics, system configuration

**Everyday analogy:** the medical record that follows you from doctor to doctor, year to year. It's the permanent, shared source of truth.

### State management rules

1. **Default to ephemeral.** Only promote state to session or persistent when there's a clear reason. More persistent state means more storage, more consistency concerns, and more privacy liability.

2. **Session state belongs to the workflow, not to individual agents.** Agents read and contribute to the shared session state, but no agent "owns" it. This prevents information silos.

3. **Persistent state must have an owner.** Every persistent record should have a clear system of record (where is the canonical version?) and clear access rules (who can read? who can write?).

4. **State transitions must be explicit.** When data moves from ephemeral to session to persistent, this should be a deliberate act — not an accident. "I'm saving this to the customer's permanent record because our policy requires it" — not "the data happened to stick around."

---

## Practice activity

Take the workflow you designed in Lesson 1 and add tool integration:

1. **Identify every tool** your workflow needs (at least 3). Classify each as read, write, or compute.

2. **Write a complete tool contract** for your most important write tool (the one with the most risk). Include all five parts: identity, input schema, output schema, permissions, and operational specs.

3. **Build the agent-tool access matrix** for your system. Which agents can use which tools? Justify every access grant.

4. **Define the state management strategy:** for each piece of data in your workflow, classify it as ephemeral, session, or persistent. Explain why.

---

## Key takeaways

1. **Tools are the bridge between decisions and reality.** An agent can decide to send an email, but without the email tool, it's just a thought. Tools make AI agents operational — and tool contracts make them safe.

2. **Every tool needs a contract with five parts:** identity, input schema, output schema, permissions, and operational specifications. Skipping any part creates gaps that lead to failures.

3. **Least privilege is non-negotiable.** Every agent should have access only to the tools it needs. Concentrating write tools in specific agents (like the Executor) makes the system safer and easier to monitor.

4. **Idempotency determines retry safety.** If calling a tool twice produces two effects (two emails, two charges), the agent must know this before retrying. Tool contracts must specify whether operations are idempotent.

5. **State has a lifecycle: ephemeral, session, persistent.** Default to ephemeral. Promote deliberately. Every persistent record needs an owner, access rules, and a reason to exist.

---

## What comes next

In **Lesson 3 — Operational resilience**, you'll learn how to handle the inevitable: tools fail, APIs go down, databases are slow, and external services behave unexpectedly. You'll design retry policies, fallback paths, compensation strategies, and graceful degradation so your system keeps working even when its tools don't.
