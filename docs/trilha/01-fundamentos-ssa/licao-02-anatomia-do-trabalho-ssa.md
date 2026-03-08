---
sidebar_position: 3
sidebar_label: "Lesson 2 — The anatomy of SSA work"
---

# Lesson 2 — The anatomy of SSA work

## The question everyone asks

"Okay, I understand the shift. But what does an SSA actually *do* all day? What do they produce? What's the work?"

Fair question. In Lesson 1, we established that an SSA designs meaning structures for intelligent systems. But that sounds abstract. Let's make it concrete.

In this lesson, we'll map the complete anatomy of SSA work: the six things an SSA does, the artifacts they produce, and how those artifacts connect to each other.

---

## The restaurant analogy

The best way to understand SSA work is to think about how a great restaurant works.

A great restaurant is not great because of one thing. It's great because someone designed how everything fits together — the menu, the kitchen workflow, the service protocol, the quality standards, the training of staff, and the handling of problems.

That "someone" is usually the head chef or the restaurant designer. They don't cook every dish personally. They design the system that produces great food consistently.

Let's map this to SSA:

| Restaurant | SSA equivalent |
|---|---|
| **Menu design** — what dishes exist, what ingredients they use, what dietary restrictions apply | **Domain ontology** — what entities exist, what attributes they have, what rules govern them |
| **Kitchen workflow** — who prepares what, in what order, how dishes flow from station to station | **Agent architecture** — which AI agents handle what tasks, how they coordinate |
| **Recipes** — precise specifications for each dish: ingredients, quantities, steps, timing | **Semantic contracts** — precise specifications for each system component: input, decision, output, constraints |
| **Quality standards** — how to check if a dish is done right, what to do if it's wrong | **Evaluation framework** — how to test if the system works correctly, what to do when it fails |
| **Service protocol** — how waiters interact with customers, when to involve the manager | **Context engineering** — how the system interacts with users, when to escalate to humans |
| **Safety rules** — food allergies, hygiene, what's never acceptable | **Security and governance** — data protection, ethical constraints, what the system must never do |

The head chef doesn't chop onions. They design the system that produces consistently excellent food. The SSA doesn't write code. They design the system that produces consistently excellent AI behavior.

---

## The six competencies of an SSA

An SSA works across six core areas. Think of these as the six things you need to be able to do to call yourself a Semantic Systems Architect.

### 1. Conceptual modeling

**What it is:** breaking down a complex real-world problem into clear, structured pieces that a machine can work with.

**Everyday analogy:** think about how a doctor diagnoses a patient. The patient says "I don't feel well." The doctor breaks this down: Where does it hurt? Since when? What makes it better or worse? Any other symptoms? Family history? Current medications?

The doctor is doing conceptual modeling — decomposing a vague problem into structured categories (location, duration, intensity, associated symptoms, risk factors). Each category has specific possible values. Together, they form a model that enables diagnosis.

The SSA does the same thing, but for business and technical problems.

**Example:** a company says "we want AI to help our sales team." An SSA decomposes this:

- Who is on the sales team? (roles, experience levels, responsibilities)
- What does "help" mean? (generate leads? qualify prospects? draft proposals? forecast revenue?)
- What information do salespeople already have? (CRM data, email history, call notes)
- What decisions do they need to make? (which leads to pursue, what to say, when to follow up)
- What's the current pain? (too many leads, low conversion, slow proposal writing)
- What would success look like? (20% more qualified meetings? 50% faster proposals?)

After this decomposition, "help our sales team" has become a precise specification of entities, decisions, constraints, and success criteria.

### 2. Semantic architecture design

**What it is:** designing the intention structure of the system — what it knows, what it decides, how it reasons, what it produces.

**Everyday analogy:** think about designing the rules for a board game. You need to define:

- What are the pieces and what can each one do? (entities and capabilities)
- What are the valid moves? (allowed actions)
- What determines who wins? (success criteria)
- What happens when there's a conflict? (resolution rules)
- What's not allowed? (constraints)

A well-designed game is fun and balanced because the rules create meaningful choices. A poorly designed game is frustrating because the rules create confusion or unfairness.

The SSA designs the "rules of the game" for an AI system. What can it do? What must it never do? How does it decide? What constitutes a good outcome?

**Example:** for the sales AI system, the semantic architecture might specify:

- The system can access CRM data and email history, but NOT personal social media
- It can suggest follow-up actions, but NOT send emails automatically
- It classifies leads using (company size, engagement level, budget signal, timeline)
- It must explain its reasoning ("I recommend pursuing this lead because...")
- If confidence is below 60%, it flags the lead for human review instead of classifying it

### 3. Knowledge structure design

**What it is:** defining what the system knows, how it organizes that knowledge, and what the boundaries of its knowledge are.

**Everyday analogy:** think about a library. A library is not just a room full of books. It's an organized knowledge system:

- Books are categorized by subject (Dewey Decimal, Library of Congress)
- There's a catalog that lets you find what you need
- Reference materials are separate from circulating materials
- Some sections are restricted (rare books, archives)
- The library knows what it has — and what it doesn't have

The SSA builds the "library" for an AI system. What knowledge does it contain? How is it organized? What's always available vs. what's retrieved on demand? What does the system know it doesn't know?

**Example:** the sales AI system's knowledge structure:

- **Always available:** company's product catalog, pricing tiers, qualification criteria, competitor overview
- **Retrieved on demand:** specific customer history, recent interactions, industry benchmarks
- **Explicitly excluded:** internal financial data, employee personal information, unreleased product plans
- **Known unknowns:** the system knows it doesn't have competitor pricing details and should not guess

### 4. AI orchestration

**What it is:** designing how multiple AI agents work together to accomplish complex tasks.

**Everyday analogy:** think about a hospital emergency department. It's not one person doing everything. It's a coordinated team:

- **Triage nurse** assesses urgency and routes patients
- **Emergency doctor** diagnoses and treats
- **Lab technician** runs tests
- **Radiologist** reads imaging
- **Specialist** is called for complex cases
- **Administrator** handles paperwork and insurance

Each person has a clear role, clear boundaries, and clear handoff protocols. They share information through the patient chart. When something is beyond one person's scope, they escalate.

The SSA designs the same kind of coordinated system, but with AI agents instead of people.

**Example:** the sales AI system might use multiple agents:

- **Lead Classifier** — evaluates incoming leads against qualification criteria
- **Research Agent** — gathers information about companies and contacts
- **Proposal Drafter** — creates initial proposal documents
- **Follow-up Planner** — suggests timing and content for follow-ups
- **Supervisor Agent** — coordinates the others, handles exceptions

Each agent has a clear job, clear inputs and outputs, and clear rules for when to involve a human.

### 5. Semantic workflow design

**What it is:** designing the end-to-end flow of work through the system — what triggers it, what steps happen, what decisions are made, and what the outputs are.

**Everyday analogy:** think about how a restaurant handles an order:

1. Customer orders (trigger)
2. Waiter records the order with any modifications (input capture)
3. Kitchen receives the order and checks ingredient availability (validation)
4. Chef assigns the order to the right station (routing)
5. Cook prepares the dish following the recipe (execution)
6. Chef checks the dish before it goes out (quality control)
7. Waiter delivers and checks customer satisfaction (delivery + feedback)
8. If something's wrong, there's a clear protocol for fixing it (error handling)

This is a workflow. Each step has a clear trigger, a clear action, a clear output, and a clear next step. The SSA designs the same kind of flow for AI systems.

**Example:** the sales AI's lead qualification workflow:

1. New lead enters the CRM (trigger)
2. Research Agent gathers company info and recent news (context building)
3. Lead Classifier evaluates against qualification criteria (decision)
4. If high confidence: route to appropriate salesperson with briefing (action)
5. If low confidence: flag for human review with reasoning (escalation)
6. Follow-up Planner schedules the first touchpoint (planning)
7. System logs the decision, reasoning, and confidence for review (audit)

### 6. System reasoning design

**What it is:** specifying how the system thinks — what evidence it considers, what reasoning strategy it uses, how it handles uncertainty, and when it defers to humans.

**Everyday analogy:** think about how a judge makes a decision. A judge doesn't just have a gut feeling. They follow a structured reasoning process:

- What are the facts of the case? (evidence)
- What law applies? (rules)
- What precedents exist? (prior knowledge)
- What are the arguments from each side? (multiple perspectives)
- Where is there uncertainty? (confidence assessment)
- What is the ruling, and what is the reasoning behind it? (decision + justification)

The SSA designs the same kind of reasoning structure for AI systems. Not "figure it out" — but "here's how to think about this."

**Example:** the sales AI's lead scoring reasoning:

- Consider: company size, industry, engagement signals, budget indicators, timeline urgency
- Weight: recent engagement signals higher than static firmographic data
- Compare: against the last 100 leads that converted vs. didn't convert
- Confidence: express as percentage with factors that increase/decrease confidence
- Threshold: above 75% = recommend, 50-75% = suggest with caveats, below 50% = flag for review
- Always explain: "This lead scored 82% because [specific reasons]"

---

## The artifacts an SSA produces

Each competency produces specific, tangible outputs. These are not just documents — they are the semantic specification of the system.

### Artifact 1: Domain Ontology

**What it is:** a structured map of everything that exists in the system's domain — entities, their attributes, their relationships, their valid states.

**Everyday example:** think about a school yearbook. It contains:
- Students (name, photo, class, activities)
- Classes (name, teacher, room, schedule)
- Activities (name, type, members, schedule)
- Teachers (name, subjects, department)

And relationships: students belong to classes, participate in activities, are taught by teachers. This is a simple ontology of a school.

**In SSA:** the domain ontology for a customer support system might define:
- Customer (id, name, tier, account_age, satisfaction_history)
- Ticket (id, category, urgency, status, assigned_agent)
- Product (id, name, category, known_issues, documentation_link)
- Policy (id, scope, rules, exceptions, last_updated)

With relationships: customers create tickets, tickets reference products, policies govern ticket resolution.

### Artifact 2: Constraint Matrix

**What it is:** a classification of all the rules the system must follow, organized by how strict they are.

**Everyday example:** think about the rules in a household:
- **Hard rules (never break):** don't leave the stove on unattended, lock the door at night
- **Soft rules (prefer but flexible):** eat dinner together, keep the living room tidy
- **Exception rules (can override with reason):** bedtime is 10pm, but can stay up late for special occasions

**In SSA:** the constraint matrix might include:
- **Hard:** never share customer data between accounts; always escalate safety complaints
- **Soft:** prefer routing tickets to agents who handled the customer before
- **Exception:** SLA can be extended if the customer confirms they're okay waiting

### Artifact 3: Semantic Contracts

**What it is:** a precise specification of what each component of the system does — what it receives, what it decides, and what it produces.

**Everyday example:** think about a job description. A good job description says:
- What you'll receive (assignments, resources, information)
- What you're responsible for deciding (priorities, approaches, quality standards)
- What you must produce (deliverables, reports, results)
- What you're NOT responsible for (things outside your scope)

**In SSA:** a semantic contract for a "Ticket Classifier" agent:
- **Input:** ticket text, customer tier, product category, ticket history
- **Decision:** classify urgency (low, medium, high, critical) and category (billing, technical, complaint, request)
- **Output:** structured classification with confidence score and reasoning
- **Constraints:** never classify safety issues as low urgency; if confidence < 60%, output "needs_human_review"

### Artifact 4: Agent Architecture

**What it is:** a map of which AI agents exist, what each one does, and how they work together.

**Think of it as:** an organizational chart for AI. Just like a company org chart shows who reports to whom and who handles what, the agent architecture shows which agents exist, what their roles are, and how they coordinate.

### Artifact 5: Context Package

**What it is:** the complete set of information and instructions that the AI system works with.

**Think of it as:** an employee's orientation package. When someone joins a company, they receive: the company handbook (permanent rules), their team's current priorities (dynamic context), and access to relevant databases (reference materials). The context package is the same thing for an AI agent.

### Artifact 6: Quality Suite

**What it is:** the set of tests, metrics, and standards used to verify that the system works correctly.

**Think of it as:** a restaurant health inspection checklist. The inspector doesn't just ask "is the food good?" They check specific, measurable criteria: food temperature, storage practices, cleanliness, handling procedures. The quality suite does the same for AI systems.

---

## How the artifacts connect

These six artifacts are not independent documents. They form a system where each one builds on and references the others:

```
Domain Ontology
    ↓ defines the vocabulary for...
Constraint Matrix
    ↓ governs the rules in...
Semantic Contracts
    ↓ specify the behavior of...
Agent Architecture
    ↓ determines the structure of...
Context Package
    ↓ is validated by...
Quality Suite
```

Think of it like building a house:
- The **ontology** is the lot survey — what exists on the terrain
- The **constraints** are the building codes — what you can and cannot do
- The **contracts** are the blueprints — what each room does
- The **agent architecture** is the construction plan — who builds what
- The **context package** is the materials specification — what resources to use
- The **quality suite** is the inspection checklist — how to verify it's right

No single artifact works alone. Together, they form the complete semantic specification of the system.

---

## What makes a good SSA

Based on everything we've covered, a good SSA is someone who:

1. **Thinks in structures, not solutions.** They don't jump to "let's build a chatbot." They ask "what is the meaning structure of this problem?"

2. **Makes the implicit explicit.** They surface the hidden assumptions, rules, and decisions that others take for granted.

3. **Designs for failure.** They don't just design the happy path. They ask "what can go wrong?" and design how the system handles it.

4. **Communicates with precision.** They can express complex ideas in clear, unambiguous language — because that language IS the engineering specification.

5. **Respects boundaries.** They know what the SSA does and what the SSA doesn't do. They design the architecture. They don't implement it.

---

## Practice activity

Go back to the everyday system you analyzed in Lesson 1 (email, food delivery, banking app, etc.) and now try to:

1. **List 3 entities** from its domain ontology with their key attributes.
   Example: "Order (id, customer, restaurant, items, status, delivery_time, payment_status)"

2. **Identify 2 hard constraints** the system never violates.
   Example: "Never process a payment without customer confirmation"

3. **Write 1 semantic contract** for a component of the system.
   Example: "Input: customer location + cuisine preference + time. Decision: rank restaurants by relevance. Output: ordered list with estimated delivery times. Constraint: never show restaurants that are currently closed."

4. **Name 2 agents** that would exist in this system's architecture.
   Example: "Restaurant Ranker (selects and orders restaurants for display), Order Tracker (monitors order status and notifies customer)"

Don't worry about being perfect. The goal is to practice seeing systems through the SSA lens — as structures of meaning, not structures of code.

---

## Key takeaways

1. **An SSA has six core competencies:** conceptual modeling, semantic architecture design, knowledge structure design, AI orchestration, semantic workflow design, and system reasoning design.

2. **An SSA produces six core artifacts:** domain ontology, constraint matrix, semantic contracts, agent architecture, context package, and quality suite.

3. **The artifacts form a connected system.** Each one builds on and references the others. Together, they are the complete semantic specification of an AI system.

4. **SSA work is like restaurant design.** You don't cook the dishes — you design the system that produces consistently excellent dishes. The menu, the kitchen workflow, the recipes, the quality standards, the service protocol, the safety rules.

5. **The key skill is making the implicit explicit.** Every system has hidden rules, assumptions, and decisions. The SSA's job is to surface them, structure them, and make them into engineering artifacts.

---

## What comes next

In **Lesson 3**, we'll put this into practice with the most important skill an SSA needs: **problem reframing**. How do you take a vague, ambiguous request ("we need AI for our business") and transform it into a precise semantic specification that can actually be built?
