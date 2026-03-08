---
sidebar_position: 2
sidebar_label: "Lesson 1 — Context architecture"
---

# Lesson 1 — Context architecture

## The employee's first day

Imagine you're starting a new job. On your first day, your manager hands you everything you need to know:

- **The company handbook** (who we are, our values, what we never do)
- **Your job description** (your role, your responsibilities, your limits)
- **The current project brief** (what you're working on today, the specific goals)
- **The relevant files** (documents, data, and references for today's work)

Now imagine instead, your manager hands you a single, 50-page document that mixes company history with today's task, sprinkles in random policy notes, and includes data from three different projects without labeling which is which.

The first approach — layered, organized, purpose-driven — lets you find what you need, understand priorities, and act correctly. The second approach — a monolithic dump — leads to confusion, mistakes, and missed details.

**This is exactly the difference between engineered context and a monolithic prompt.**

---

## What is context?

In AI systems, **context** is everything the language model sees when it processes a request. This includes:

- The system prompt (instructions that define the agent's behavior)
- The conversation history (what's been said so far)
- Retrieved information (data pulled from databases, documents, or APIs)
- The current request (what the user or system is asking right now)

The model has no memory beyond what's in its context window. It doesn't "remember" previous conversations. It doesn't "know" your company's policies unless they're in the prompt. It doesn't have access to customer data unless it's been retrieved and included.

**Everything the agent knows, it knows because you put it in the context.**

This makes context engineering the most important practical skill in AI system design. A brilliant model with poor context produces poor results. A good model with excellent context produces excellent results.

---

## The three layers of context

All context in an AI system falls into one of three layers:

### Layer 1: Static context (the foundation)

**What it is:** information that doesn't change between requests. The agent's identity, mission, policies, rules, and constant knowledge.

**Everyday analogy: the constitution of a country.** The constitution defines the fundamental rules, values, and structures. It doesn't change with every new law or every new president. It's the bedrock that everything else is built on.

**In AI systems, static context includes:**
- The agent's identity ("You are a customer support agent for Acme Corp")
- Core policies ("Never provide medical advice," "Always include a disclaimer for financial information")
- The ontology vocabulary ("A 'ticket' has these attributes..." — referenced from your Module 2 work)
- Hard constraints from the constraint matrix ("Never share customer PII with other customers")
- Output format requirements ("Always respond in JSON with these fields")

**Key properties:**
- Changes rarely (only when policies or the system design changes)
- Is the same for every request
- Should be versioned (track changes like you'd track changes to a constitution)
- Is the foundation for all agent behavior

### Layer 2: Dynamic context (the situation)

**What it is:** information that changes with each request or session. The specific details of what's happening right now.

**Everyday analogy: the morning briefing at a hospital.** Every morning, the incoming shift gets a briefing: "Room 3 has a new patient admitted overnight, post-surgery, allergic to penicillin. Room 7 is being discharged today. The MRI machine is down for maintenance." This information is specific to today. Tomorrow's briefing will be different.

**In AI systems, dynamic context includes:**
- The current customer's profile (tier, history, preferences)
- The current conversation history (what's been said so far in this interaction)
- Real-time system state (current queue size, agent availability, ongoing incidents)
- Session decisions (what was decided earlier in this workflow)
- Temporal information (current time, day of week, holiday schedules)

**Key properties:**
- Changes with every request or session
- Must be assembled at runtime (from databases, APIs, or previous workflow steps)
- Has a freshness window (stale dynamic context is dangerous)
- Should be clearly separated from static context (so the agent doesn't confuse permanent rules with temporary data)

### Layer 3: Retrieved context (the reference materials)

**What it is:** information pulled from external knowledge sources in response to the specific request. Documents, articles, previous cases, or data that's relevant to what the agent is currently processing.

**Everyday analogy: the research a lawyer does before a trial.** The lawyer knows the law (static context) and knows the details of this particular case (dynamic context). But for a specific legal question, they go to the library and find relevant precedents, statutes, and scholarly articles. These reference materials aren't about the case in general — they're about the specific question at hand.

**In AI systems, retrieved context includes:**
- Knowledge base articles relevant to the current query
- Previous similar cases or tickets
- Product documentation for the specific product mentioned
- Policy documents that apply to this specific situation
- RAG (Retrieval Augmented Generation) results

**Key properties:**
- Retrieved on-demand based on the specific request
- Relevance varies (not all retrieved documents are equally useful)
- Must be curated (sending 50 irrelevant documents is worse than sending 2 relevant ones)
- Has a trust level (some sources are more authoritative than others)

---

## Why separation matters

Mixing all three layers into a single prompt creates problems:

**Problem 1: Instruction confusion.** When policies, data, and task instructions are mixed together, the model can confuse a policy ("never share PII") with a piece of customer data ("the customer's email is john@example.com"). Separation prevents this.

**Problem 2: Context window waste.** Context windows have limits. If you repeat the entire company handbook in every prompt even when only one policy is relevant, you waste space that could hold more useful information.

**Problem 3: Inconsistency.** If policies are embedded in prompts rather than maintained centrally, different agents might have different versions of the same policy. One agent says refunds are limited to $100, another says $200. Centralized static context prevents this.

**Problem 4: Maintenance difficulty.** When a policy changes, you need to find and update every prompt that mentions it. With layered context, you update the static layer once and all agents inherit the change.

---

## Decomposing a monolithic prompt

Let's take a real example of a monolithic prompt and decompose it into layers.

### Before: the monolithic prompt

```
You are a helpful customer support agent for CloudStore, an online
electronics retailer. Be friendly and professional. Always greet
the customer by name if available.

The customer's name is Sarah Chen. She has been a Premium member
since 2023. She has 3 open orders and has previously contacted
support about a delayed shipment last month.

When handling refund requests, check if the order was placed within
30 days. If yes and the item is unopened, approve the refund
immediately. If the item is opened, offer store credit instead.
Premium members get an extra 15 days on the refund window.

Here are some relevant articles from our knowledge base:
[Article 1: Return Policy Details - 500 words]
[Article 2: Premium Member Benefits - 300 words]
[Article 3: Shipping Delay FAQ - 400 words]

Never share other customers' information. Never provide medical
advice. Always include order numbers in your responses. If you're
not sure about something, say so and offer to connect the customer
with a specialist.

The customer is asking about returning a laptop she bought 25 days ago.

Respond in a helpful, concise manner.
```

### After: decomposed into three layers

**STATIC CONTEXT (System Prompt — rarely changes):**
```
IDENTITY
You are a customer support agent for CloudStore, an online
electronics retailer.

COMMUNICATION STYLE
- Friendly, professional tone
- Greet by name when available
- Concise responses with clear next steps
- Always include relevant order numbers

POLICIES (HARD — never break)
- Never share other customers' information
- Never provide medical, legal, or financial advice
- If uncertain, say so and offer specialist connection

REFUND RULES
- Standard window: 30 days from purchase
- Premium members: 45 days from purchase
- Unopened items: full refund
- Opened items: store credit only
- Damaged items: case-by-case (escalate if over $200)

OUTPUT FORMAT
- Start with greeting
- Acknowledge the customer's concern
- Provide solution or next steps
- Close with availability to help further
```

**DYNAMIC CONTEXT (assembled at runtime):**
```
CUSTOMER PROFILE
- Name: Sarah Chen
- Membership: Premium (since 2023)
- Open orders: 3
- Previous contacts: 1 (delayed shipment, resolved last month)

CURRENT REQUEST
- Topic: laptop return
- Purchase date: 25 days ago
- Within standard window: yes
- Within premium window: yes

SESSION STATE
- First message in this conversation
- No previous decisions in this session
```

**RETRIEVED CONTEXT (based on this specific request):**
```
RELEVANT KNOWLEDGE
[Article: Return Policy Details - section on electronics returns]
  Key point: Electronics must include all original accessories
  and packaging for full refund.

[Article: Premium Member Benefits - section on extended returns]
  Key point: Premium members have 45-day return window and
  free return shipping.

Note: Article on Shipping Delay FAQ was retrieved but is not
relevant to this request (return, not delay) — excluded.
```

### What changed

1. **Static rules are centralized** — if the refund window changes, you update ONE place
2. **Dynamic data is clearly labeled** — the agent knows this is about Sarah Chen, not a general policy
3. **Retrieved context is curated** — only relevant articles are included, and irrelevant ones are explicitly excluded
4. **Each layer has a clear purpose** — the agent can distinguish between "what I always do" and "what matters right now"

---

## The context map

A **context map** is the document that shows how context is organized for a specific agent. It specifies what goes in each layer, where it comes from, and how it's assembled.

```
CONTEXT MAP — Customer Support Agent

STATIC LAYER
  Source: system prompt template v2.3
  Updated: when policies change (last: 2024-03-15)
  Includes:
    - Agent identity and mission (50 words)
    - Communication style guide (100 words)
    - Hard constraint policies (150 words)
    - Refund/return rules (200 words)
    - Output format specification (100 words)
  Total: ~600 tokens

DYNAMIC LAYER
  Source: assembled by Context Builder agent at runtime
  Includes:
    - Customer profile (from Customer DB, ~100 tokens)
    - Request classification (from Classifier agent, ~50 tokens)
    - Session history (from conversation, variable size)
    - Active flags (from constraint checks, ~30 tokens)
  Total: ~200-500 tokens (varies by conversation length)

RETRIEVED LAYER
  Source: assembled by Knowledge Retriever agent
  Max items: 3 articles (to avoid context pollution)
  Max tokens: 800 (truncate if necessary)
  Relevance threshold: 0.7 (exclude below this score)
  Includes:
    - Knowledge base articles matching the request topic
    - Previous similar resolved cases (if available)
  Total: ~400-800 tokens

TOTAL CONTEXT BUDGET: ~1,200-1,900 tokens
(well within model limits, leaving room for generation)
```

---

## Practice activity

Take one of the agents from your Module 3 architecture and decompose its context:

1. **Identify the current state.** If you were to write a single prompt for this agent right now, what would be in it? Write the monolithic version first.

2. **Decompose into three layers.**
   - What belongs in the static layer? (Rules, identity, policies, output format)
   - What belongs in the dynamic layer? (Runtime data, session state, current request)
   - What belongs in the retrieved layer? (Knowledge base hits, relevant documents, similar cases)

3. **Draw the context map.** For each layer, specify: where the content comes from, approximately how many tokens it uses, and how often it changes.

4. **Identify what was excluded.** What information does the agent NOT need? Explicit exclusion is as important as explicit inclusion — unnecessary context dilutes the useful context.

5. **Check for mixing.** Review your three layers. Is there anything in the dynamic layer that should be static? Is there anything in the static layer that actually changes per request?

---

## Key takeaways

1. **Context is everything the agent sees.** An agent with no context about your company, policies, or customer can't act correctly for your company, follow your policies, or serve your customers. Context engineering is the most practical skill in AI system design.

2. **Three layers: static, dynamic, retrieved.** Static context is the foundation (identity, policies, rules). Dynamic context is the situation (customer data, current request, session state). Retrieved context is the reference material (relevant documents, similar cases).

3. **Separation enables maintenance, consistency, and efficiency.** When layers are mixed, changing a policy means updating every prompt. When layers are separated, you update once and every agent inherits the change.

4. **Less is more.** Including irrelevant context doesn't help — it hurts. Models can get confused by too much information, just like a person reading a 50-page document when they only needed page 3. Curate aggressively.

5. **Context maps are architecture documents.** They specify what each agent sees, where it comes from, and how it's assembled. Like any architecture document, they should be versioned, reviewed, and maintained.

---

## What comes next

You now understand what the agent sees. In **Lesson 2 — Prompt contract design**, you'll learn how to structure the instructions within the context to make agent behavior predictable, consistent, and controllable.
