---
sidebar_position: 2
sidebar_label: "Lesson 1 — Role design"
---

# Lesson 1 — Role design

## The hospital team

Walk into any hospital emergency room and you'll see a remarkable system at work.

There's a **triage nurse** at the entrance. Their job is narrow and critical: assess every patient who walks in, determine how urgent their case is, and route them to the right place. The triage nurse does NOT treat patients. They don't prescribe medication. They don't perform surgery. They assess, classify, and route.

Down the hall, there's an **emergency physician**. They examine patients, order tests, make diagnoses, and decide on treatment plans. But they don't perform the tests themselves (the lab does that), they don't administer the treatments (nurses do that), and they don't handle the billing (administration does that).

In the operating room, there's a **surgeon** — deeply specialized in a specific type of procedure. The surgeon doesn't diagnose (that happened earlier), doesn't manage the patient's medication schedule (the pharmacist does that), and doesn't decide whether the surgery is covered by insurance (that's not their concern).

Every person in this hospital has a **clear role**, a **defined scope**, and — crucially — **things they must NOT do**. The triage nurse must never prescribe medication. The surgeon must never skip the pre-surgical checklist. The pharmacist must never dispense a drug without a valid prescription.

**This is exactly how you design AI agents.**

---

## Why single-agent systems fail

Before we dive into roles, let's understand why you can't just build one smart agent that does everything.

Imagine you hired one person to run an entire restaurant: they'd greet customers, take orders, cook the food, serve the plates, wash the dishes, manage inventory, handle complaints, and do the accounting. Even if this person were incredibly talented, they'd fail — not because they lack ability, but because the job requires **different modes of thinking** at different times.

Cooking requires focus and timing. Greeting customers requires warmth and attention. Handling complaints requires patience and diplomacy. Doing accounting requires precision and detachment. These are fundamentally different cognitive modes. Switching between them constantly leads to errors, delays, and burnout.

AI agents face the same problem. A language model asked to simultaneously classify a customer's intent, look up their account history, determine the best response, check for safety issues, and format the output in the right schema — all in a single prompt — will do all of these tasks poorly. It's trying to be the triage nurse, the doctor, the surgeon, and the pharmacist all at once.

**The solution: cognitive specialization.** Give each agent one clear job. Let it excel at that job. Then connect the agents so they work as a team.

---

## The six cognitive roles

In AI systems, there are six fundamental types of cognitive work. Not every system needs all six, but understanding them helps you decide which roles your system requires.

### Role 1: The Planner

**What it does:** looks at a complex task and breaks it into steps. Decides what needs to happen, in what order, and with what resources.

**Everyday analogy: a wedding planner.** When a couple says "we want a beautiful outdoor wedding for 150 guests in June," the wedding planner doesn't start arranging flowers. Instead, they create a plan: venue first, then catering, then decorations, then invitations, then logistics. They sequence the tasks, identify dependencies (you can't send invitations until you have a venue), and allocate resources.

**In an AI system:** a planner agent receives a complex request ("help this customer migrate from our free plan to enterprise") and decomposes it into steps: verify eligibility, calculate pricing, generate migration plan, review data compatibility, prepare the proposal.

**Scope:** the planner decides WHAT to do and in WHAT ORDER. It does NOT execute the steps itself.

**Forbidden actions:** a planner must never skip straight to execution. If the planner starts doing the work instead of planning it, you've lost the benefit of having a plan — and you've lost the ability to review the plan before work begins.

### Role 2: The Retriever

**What it does:** finds and delivers specific information from knowledge sources. Searches, filters, and returns relevant data.

**Everyday analogy: a research librarian.** You walk into a library and say "I need information about the economic impact of renewable energy in developing countries." The librarian doesn't give you their personal opinion on the topic. They go to the shelves (or databases), find the most relevant sources, and bring them to you. They might say "this book has a great chapter on solar energy in Sub-Saharan Africa, and this journal article covers wind farm economics in Southeast Asia." Their job is to find and deliver — not to analyze or decide.

**In an AI system:** a retriever agent receives a query, searches through documents, databases, or APIs, and returns the relevant information. When a customer asks about their account, the retriever finds their account details, recent transactions, and relevant policies.

**Scope:** the retriever finds and delivers information. It does NOT interpret, judge, or act on the information.

**Forbidden actions:** a retriever must never make decisions based on what it finds. If it discovers that a customer's account is overdue, it should return that data — not decide to suspend the account. Decisions belong to other roles.

### Role 3: The Reasoner

**What it does:** analyzes information, draws conclusions, and makes judgments. This is the "thinking" role — it evaluates evidence and reaches decisions.

**Everyday analogy: a doctor interpreting test results.** When blood work comes back from the lab, the doctor reads the numbers, compares them to normal ranges, considers the patient's symptoms and history, and reaches a diagnosis. The doctor didn't run the tests (the lab did that), and the doctor won't administer the treatment (the nurse will do that). The doctor's job is to think — to take the available information and reach a conclusion.

**In an AI system:** a reasoner agent receives the information gathered by the retriever, applies the decision rules from the semantic contract, and produces a judgment. "Based on the customer's usage patterns, account tier, and the pricing rules in our constraint matrix, the recommended plan is Enterprise-Plus at the promotional rate."

**Scope:** the reasoner analyzes and decides. It takes information as input and produces judgments as output.

**Forbidden actions:** a reasoner must never go searching for information on its own (that's the retriever's job) and must never execute actions (that's the executor's job). If the reasoner needs more information, it should request it — not go find it.

### Role 4: The Critic

**What it does:** reviews and evaluates the work of other agents. Checks for errors, inconsistencies, and policy violations.

**Everyday analogy: a newspaper editor.** A journalist writes an article. Before it's published, the editor reads it. The editor checks: Are the facts accurate? Is the writing clear? Does it follow the publication's style guidelines? Is there any potential legal issue? The editor doesn't write the article — they evaluate it. And their feedback goes back to the journalist for revision if needed.

**In an AI system:** a critic agent receives the output of other agents and evaluates it. When the reasoner produces a recommendation, the critic checks: Does this recommendation align with our constraint matrix? Does it violate any hard constraints? Is the confidence level high enough? Is the explanation clear and appropriate for the customer?

**Scope:** the critic evaluates and provides feedback. It approves, rejects, or requests revision.

**Forbidden actions:** a critic must never produce original work. Its power comes from being a pure evaluator — if it starts generating its own answers, it can no longer objectively judge them. The judge shouldn't also be the lawyer.

### Role 5: The Executor

**What it does:** carries out specific actions in the real world — sends emails, updates databases, creates records, triggers workflows.

**Everyday analogy: a pharmacist dispensing medication.** The doctor diagnosed the patient, chose the medication, and wrote the prescription. The pharmacist's job is to fill the prescription correctly: the right drug, right dosage, right form, right label. The pharmacist doesn't decide which drug to prescribe (the doctor did that) and doesn't diagnose the patient (that happened earlier). The pharmacist executes a specific, well-defined action.

**In an AI system:** an executor agent receives a clear instruction ("send this email to the customer," "update the account status to active," "generate and save this report") and carries it out. The executor follows the instruction precisely, applying any safety checks defined in its contract.

**Scope:** the executor performs actions. It turns decisions into real-world effects.

**Forbidden actions:** an executor must never make decisions about what to do. It does what it's told (within its safety boundaries). If an executor starts deciding "actually, I think we should send a different email," it has stepped outside its role. An executor that makes its own decisions is an unsupervised agent — and unsupervised agents are dangerous.

### Role 6: The Guardrail

**What it does:** monitors everything that passes through the system and blocks anything unsafe, inappropriate, or policy-violating.

**Everyday analogy: airport security.** Every passenger and every bag passes through security screening. The security officer doesn't care where you're going, who you are, or why you're traveling. They have one job: check if anything dangerous is passing through. They don't book your flight. They don't carry your luggage. They scan, evaluate, and either clear or flag.

**In an AI system:** a guardrail agent checks inputs and outputs for safety issues. Before a response is sent to a customer, the guardrail scans for: personal information that shouldn't be shared, promises the company can't keep, medical or legal advice the system shouldn't give, harmful or offensive content, and violations of hard constraints from the constraint matrix.

**Scope:** the guardrail monitors and blocks. It's the last line of defense between the system and the real world.

**Forbidden actions:** a guardrail must never fix the problems it finds — only flag them. If the guardrail detects that a response contains personal information, it should block the response and route it back for correction — not try to fix the response itself. Why? Because a guardrail that modifies content can introduce new errors. Its job is to detect, not to repair.

---

## Designing a role matrix

Now you know the six cognitive roles. But how do you decide which roles your system needs and how to scope them?

### Step 1: List the cognitive tasks

Go back to your semantic contracts from Module 2. Every contract describes work that needs to be done. List every distinct cognitive task:

- Classifying (understanding what something is)
- Retrieving (finding information)
- Reasoning (making judgments)
- Generating (creating content)
- Validating (checking quality)
- Executing (performing actions)

### Step 2: Group tasks into roles

Tasks that require the same type of thinking get grouped into the same role. Tasks that require different types of thinking belong to different roles.

**The key question:** "Would doing these two tasks in the same prompt require the agent to switch cognitive modes?"

If the answer is yes, they belong in separate roles.

**Example — a customer support system:**

| Task | Cognitive type | Assigned role |
|---|---|---|
| Understand what the customer is asking | Classification | Classifier Agent |
| Find the customer's account details | Retrieval | Account Retriever |
| Find relevant knowledge base articles | Retrieval | Knowledge Retriever |
| Decide the best response strategy | Reasoning | Response Strategist |
| Generate the actual response text | Generation | Response Writer |
| Check response for policy compliance | Validation | Compliance Guardrail |
| Send the response and update ticket | Execution | Ticket Executor |

### Step 3: Define scope and boundaries for each role

For every role, document three things:

**1. What it IS responsible for (scope):**
- What decisions it makes
- What information it accesses
- What output it produces

**2. What it is NOT responsible for (exclusions):**
- What tasks belong to other agents
- What information it should not access
- What actions it should not take

**3. What it must NEVER do (forbidden actions):**
- Hard constraints that apply specifically to this agent
- Actions that would create safety risks if this agent performed them
- Decisions that exceed this agent's authority

**Example — the Response Writer agent:**

```
Agent: Response Writer

RESPONSIBLE FOR:
  - Generating a customer-facing response based on the strategy provided
  - Adapting tone and language to match customer context
  - Including relevant information from the knowledge base excerpts provided
  - Structuring the response for clarity and actionability

NOT RESPONSIBLE FOR:
  - Deciding WHAT to tell the customer (the Strategist does that)
  - Looking up customer data (the Retriever does that)
  - Checking compliance (the Guardrail does that)
  - Sending the response (the Executor does that)

MUST NEVER:
  - Include personal opinions or make promises not in the strategy
  - Access customer data directly (receives only what the Retriever provides)
  - Bypass the Guardrail by sending responses directly
  - Provide medical, legal, or financial advice
```

### Step 4: Validate with the "confusion test"

For each pair of agents, ask: "Is there any task where it's unclear which agent should handle it?"

If the answer is yes, you have a **role overlap**. Fix it by either:
1. Moving the ambiguous task to one agent exclusively
2. Creating a new specialized agent for that task
3. Defining explicit rules for when each agent handles it

**Role overlap is the number one cause of multi-agent system failures.** When two agents both think they should handle something, you get duplicated work, conflicting responses, or — worst of all — neither agent handles it because each assumes the other will.

**Everyday analogy:** imagine two parents both assume the other is picking up the child from school. The result: the child is stranded. Clear role assignment prevents this — "Mom picks up on Mondays, Wednesdays, Fridays. Dad picks up on Tuesdays and Thursdays. No exceptions without explicit communication."

---

## A worked example: e-commerce product recommendation system

Let's design the agent roles for a system that recommends products to online shoppers.

### The cognitive tasks

1. Understand what the customer is browsing/searching for
2. Retrieve the customer's purchase history and preferences
3. Retrieve product catalog information for matching products
4. Reason about which products best match the customer's needs
5. Generate personalized recommendation descriptions
6. Check recommendations for inappropriate suggestions (age restrictions, recently returned items, out-of-stock)
7. Present recommendations to the customer

### The role matrix

```
Agent: Intent Analyzer (Planner)
  Scope: Understand the customer's current browsing context and
         infer what they're looking for
  Not responsible for: product matching, recommendation generation
  Forbidden: accessing purchase history directly, making purchase
             decisions for the customer

Agent: Customer Profile Retriever (Retriever)
  Scope: Fetch customer preferences, purchase history, browsing
         patterns, wish list, size/color preferences
  Not responsible for: analyzing the data, deciding what to recommend
  Forbidden: modifying customer data, accessing payment information

Agent: Catalog Search Agent (Retriever)
  Scope: Search product catalog based on criteria from the Intent
         Analyzer, return matching products with metadata
  Not responsible for: ranking products, personalizing results
  Forbidden: modifying product data, accessing pricing algorithms

Agent: Recommendation Reasoner (Reasoner)
  Scope: Compare customer profile with available products, apply
         recommendation rules, rank and select top recommendations
  Not responsible for: writing descriptions, checking safety
  Forbidden: using only popularity (must personalize), recommending
             products the customer recently returned

Agent: Description Writer (Executor)
  Scope: Write personalized, compelling descriptions for each
         recommended product, highlighting features relevant to
         this specific customer
  Not responsible for: choosing which products to recommend
  Forbidden: making false claims about products, creating urgency
             manipulation ("only 2 left!" unless verified)

Agent: Recommendation Guard (Guardrail)
  Scope: Check all recommendations before display for age
         restrictions, out-of-stock items, recalled products,
         items from blocked sellers
  Not responsible for: choosing alternatives (flags and blocks only)
  Forbidden: modifying recommendations (only approve or reject)
```

### Why this design works

Notice that no agent has two cognitive modes. The Intent Analyzer only understands — it doesn't search. The Catalog Search only retrieves — it doesn't rank. The Reasoner only thinks — it doesn't write. Each agent does one thing well, and the system works because the agents are connected in a clear sequence.

Also notice what each agent is FORBIDDEN from doing. The Customer Profile Retriever cannot access payment information — even though it could be technically possible. The Description Writer cannot create false urgency — even though it might increase conversions. These boundaries protect the system from doing the wrong thing efficiently.

---

## Common mistakes in role design

### Mistake 1: The "God Agent"

Creating one agent that does everything. "Our AI agent handles customer inquiries, looks up data, makes decisions, writes responses, and monitors quality." This agent will do all of these things poorly. Split it up.

**The fix:** if your agent description uses the word "and" more than twice, it's probably doing too many things.

### Mistake 2: Too many agents for simple tasks

Not every system needs six agents. If your use case is "classify incoming emails into three categories," you might need one classifier agent and one guardrail. Creating a planner, retriever, reasoner, critic, executor, and guardrail for a simple classification task is overengineering.

**The fix:** only create agents for cognitive modes that genuinely need separation. If one agent can handle two related tasks without switching modes, let it.

### Mistake 3: Agents with no boundaries

Defining what agents DO but not what they must NOT do. Scopes without boundaries lead to role creep — agents gradually taking on more responsibility until they overlap with other agents.

**The fix:** for every agent, the "must never" list is as important as the "responsible for" list.

### Mistake 4: Symmetric agents with no tiebreaker

Two agents with overlapping responsibilities and no rule for who takes priority when both could handle a task.

**The fix:** if two agents could handle the same task, one must be the primary handler and the other the fallback. Never leave it ambiguous.

---

## Practice activity

Take the domain and semantic contracts you built in Module 2, and design a role matrix for a multi-agent system:

1. **List all cognitive tasks** your system needs to perform (aim for 8+ tasks)
2. **Group tasks into roles** using the six cognitive role types as a guide
3. **For each role, specify:**
   - What it IS responsible for (scope)
   - What it is NOT responsible for (exclusions)
   - What it must NEVER do (forbidden actions)
4. **Run the confusion test:** for each pair of agents, verify there's no ambiguity about who handles what
5. **Document one potential role overlap** you identified and how you resolved it

---

## Key takeaways

1. **Agents are team members, not universal workers.** Each agent should have one clear cognitive mode — classify, retrieve, reason, evaluate, execute, or guard. An agent that tries to do everything does everything poorly.

2. **The six cognitive roles are a starting point, not a mandate.** Not every system needs all six. Use them as a vocabulary for thinking about what kinds of work your system does, then create the roles that match.

3. **Boundaries are as important as scopes.** Defining what an agent must NOT do is just as critical as defining what it should do. Boundaries prevent role overlap, safety violations, and the gradual creep toward a "God Agent."

4. **Role overlap is the enemy.** When two agents both think they're responsible for the same task, you get duplication, conflict, or abandonment. The confusion test catches this before it becomes a problem in production.

5. **Good role design makes the rest of the architecture easier.** When roles are clear, orchestration becomes straightforward (you know who talks to whom), handoffs become simple (you know what each agent needs), and failure recovery becomes possible (you know where to look when something goes wrong).

---

## What comes next

You've designed the team — you know WHO does WHAT. In **Lesson 2 — Orchestration topologies**, you'll decide HOW the team works together. Does a supervisor coordinate everyone? Do agents pass work in a pipeline? Or do they self-organize as a swarm? Each topology has trade-offs, and the SSA must choose the right one for each system.
