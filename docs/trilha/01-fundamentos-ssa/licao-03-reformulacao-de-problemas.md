---
sidebar_position: 4
sidebar_label: "Lesson 3 — Problem reframing"
---

# Lesson 3 — Problem reframing

## The most important SSA skill

If you learn only one thing from this entire course, let it be this: **the ability to transform a vague request into a precise semantic specification.**

Everything else — ontologies, contracts, agent architectures, evaluation suites — builds on this foundational skill. If you can reframe problems well, you can do SSA work. If you can't, no amount of technical knowledge will save you.

Why? Because every project starts the same way: someone walks in with a vague idea.

---

## The doctor analogy

Think about what happens when you visit a doctor.

**You say:** "I don't feel well."

This is useless information. It tells the doctor nothing actionable. A hundred different conditions produce "I don't feel well."

**The doctor asks:**
- "Where does it hurt?" → **Location** (localization of the problem)
- "Since when?" → **Duration** (temporal context)
- "How would you describe the pain — sharp, dull, burning?" → **Quality** (characterization)
- "What makes it better or worse?" → **Modifiers** (conditional factors)
- "Any other symptoms?" → **Associated signals** (related context)
- "Have you had this before?" → **History** (precedent)
- "Are you taking any medications?" → **Constraints** (existing conditions that affect the solution)
- "On a scale of 1 to 10, how bad is it?" → **Severity** (prioritization)

After 5 minutes of questions, "I don't feel well" has become: "Intermittent sharp pain in the upper right abdomen, started 3 days ago, worsens after eating fatty foods, no fever, no prior episodes, currently taking blood pressure medication, severity 6/10."

Now the doctor can work. This structured description narrows the possibilities, suggests specific tests, and points toward a diagnosis.

**The SSA does exactly the same thing — but with business and technical problems.**

---

## What "vague" really means

When someone says "we need AI for our customer support," this statement is vague in at least seven ways:

| Dimension | What's missing | What we need |
|---|---|---|
| **Who** | Which customers? All, or a segment? | Target audience definition |
| **What** | What kind of support? Troubleshooting? Billing? General questions? | Scope of the system |
| **Why** | What's the actual problem? Too slow? Too expensive? Inconsistent quality? | Root cause identification |
| **How well** | What does "good" support look like? What's acceptable? | Success criteria |
| **Constraints** | What can't the system do? What data can it access? | Boundaries |
| **Risk** | What happens if it goes wrong? How bad is it? | Risk assessment |
| **Priority** | What should work first? What can wait? | Implementation roadmap |

The SSA's job is to fill in every cell of this table before any design or implementation begins.

---

## The renovation analogy

Here's another way to see it.

You call a home renovation company and say: "I want a nicer kitchen."

An amateur contractor says: "Sure! We'll start Monday." They rip out the cabinets, pick some tiles they think look nice, and three months later you have an expensive kitchen you hate because they never asked what "nicer" meant to you.

A professional architect asks:

- "What don't you like about the current kitchen?" (problem diagnosis)
- "How do you use your kitchen? Do you cook a lot? Entertain?" (use case analysis)
- "What's your budget?" (constraint identification)
- "Do you have any preferences for style — modern, rustic, minimalist?" (aesthetic requirements)
- "Are there structural limitations — load-bearing walls, plumbing locations?" (technical constraints)
- "What's non-negotiable for you?" (hard requirements)
- "What would make you say 'this kitchen is perfect'?" (success criteria)

After this conversation, "nicer kitchen" has become: "Open-plan modern kitchen for a family that cooks daily, budget $40K, must keep the window, needs an island with bar seating, priority on storage and counter space, success = I can cook dinner for 6 people comfortably."

Now the architect can design. And the result will actually match what the client wanted.

**The SSA does this same transformation, but for AI systems.**

---

## The reframing process: five steps

Here is a repeatable process for turning any vague request into a semantic specification. You can use this for any project, any domain, any scale.

### Step 1: Identify the real problem

The stated problem is almost never the real problem.

"We need a chatbot" is not a problem. It's a solution someone imagined. The real problem might be: "Our support team is overwhelmed and response times are unacceptable." Or it might be: "We're losing customers because our FAQ is impossible to navigate." Or: "We want to offer 24/7 support without hiring night shift staff."

Each of these real problems leads to a different architecture.

**How to do it:** ask "why" three times.

- "We need a chatbot." → **Why?** → "Because customers complain about support."
- "Why do customers complain?" → "Because they wait too long for answers."
- "Why do they wait too long?" → "Because our team is small and tickets are mostly routine questions that have standard answers."

Now you have the real problem: **routine questions with standard answers are consuming human agent time, causing long wait times for all customers.** This leads to a very specific solution: an AI system that handles routine questions automatically and routes complex issues to humans.

**Everyday analogy:** when a child says "I'm bored," the problem isn't boredom — it's that they don't know what activity would satisfy them right now. "What did you enjoy doing last time?" is more useful than "here's a toy."

### Step 2: Define the entities

What are the "things" in this problem? What objects, concepts, roles, and categories exist?

Going back to our customer support example:

- **Customers** — who they are, their history, their tier (free, premium, enterprise)
- **Tickets** — what they're about, when they were created, their urgency
- **Knowledge base** — what answers exist, how up-to-date they are
- **Support agents** — who they are, what they specialize in, their availability
- **Products** — what the company sells, known issues, documentation
- **Policies** — refund rules, SLA commitments, escalation criteria

Each entity has attributes. A **customer** has a name, an account type, a support history, and a satisfaction score. A **ticket** has a category, a creation time, an urgency level, and a resolution status.

**Everyday analogy:** when you organize a wedding, you first list all the "things" involved: guests, venue, catering, music, flowers, photographer, invitations. You can't plan the wedding without knowing what all the pieces are. The entity list is your wedding planning checklist.

### Step 3: Map the decisions

What decisions does this system need to make? Be specific.

For our customer support system:

1. **Classification:** Is this a billing question, a technical issue, a complaint, or a feature request?
2. **Urgency assessment:** Is this urgent (system down, security issue) or routine?
3. **Routing:** Should this go to the AI, a specific human agent, or a specialist team?
4. **Response generation:** What answer should the AI give? Is it confident enough to answer directly?
5. **Escalation:** When should the AI stop trying and hand off to a human?
6. **Follow-up:** Was the issue resolved? Does the customer need a follow-up?

For each decision, specify:
- **What information is needed** to make it (inputs)
- **What rules govern it** (constraints)
- **What the possible outcomes are** (outputs)
- **What happens when the system isn't sure** (uncertainty handling)

**Everyday analogy:** think about a traffic light system. Every intersection needs decisions: when to turn green, for how long, how to handle pedestrian requests, what to do in an emergency (turn all red). The decisions are specific, governed by rules, and have clear outcomes.

### Step 4: Specify the constraints

What can the system never do? What must it always do? What's preferred but flexible?

**Hard constraints (never violate):**
- Never reveal one customer's data to another customer
- Always escalate complaints about safety or security to a human
- Never make promises about refunds without checking the policy
- Never provide medical, legal, or financial advice

**Soft constraints (prefer but flexible):**
- Prefer routing returning customers to agents who've helped them before
- Try to resolve issues in a single interaction (but don't force it)
- Keep responses under 200 words (but longer is okay if necessary)

**Exception policies (can override with justification):**
- SLA response times can be extended during acknowledged outages
- A senior agent can override the AI's classification if they disagree

**Everyday analogy:** think about rules in a household with children.
- **Hard rules:** never cross the street alone, always wear a seatbelt
- **Soft rules:** brush your teeth before bed (sometimes you forget, it's not a crisis)
- **Exception rules:** bedtime is 9pm, but you can stay up late on Friday if homework is done

The constraint specification tells the AI system which rules are which — so it knows what it can bend and what it can never break.

### Step 5: Define success and failure

How do you know if the system is working? How do you know if it's failing?

**Success criteria:**
- 80% of routine questions resolved without human intervention
- Average response time under 30 seconds for AI-handled tickets
- Customer satisfaction rating of 4.2/5 or higher
- Zero instances of leaked customer data
- Escalation to humans happens within 60 seconds when needed

**Failure indicators:**
- Customer repeats the same question 3+ times (system doesn't understand)
- AI answers confidently with incorrect information (hallucination)
- Complaint about AI behavior reaches management (trust breakdown)
- System fails to escalate a safety issue (critical failure)

**Everyday analogy:** think about hiring a babysitter. Your success criteria: kids are safe, fed, bathed, and in bed by 9pm. Your failure indicators: kids are still awake at midnight, someone is injured, the house is on fire. You communicate both — what "good" looks like AND what "bad" looks like — so the babysitter knows the full picture.

---

## A complete reframing example

Let's walk through the full process with a different scenario.

**Vague request:** "We need AI to help our legal team with contract review."

### Step 1: The real problem

- **Why?** "Lawyers spend too much time reading standard contracts."
- **Why?** "Most contracts are similar, but lawyers read every page to find the unusual clauses."
- **Why can't they just skim?** "Because missing a risky clause can cost millions."

**Real problem:** lawyers need to identify unusual or risky clauses in contracts quickly, but thoroughness requirements make manual review slow and expensive.

### Step 2: Entities

- **Contract** (type, parties, jurisdiction, date, value, status)
- **Clause** (category, standard_language, actual_language, risk_level, position_in_contract)
- **Risk** (type, severity, precedent, required_action)
- **Playbook** (clause_type, acceptable_language, unacceptable_language, negotiation_guidance)
- **Reviewer** (name, specialization, workload, authority_level)

### Step 3: Decisions

1. **Clause classification:** Is this clause standard, modified, or non-standard?
2. **Risk assessment:** If modified/non-standard, what's the risk level?
3. **Comparison:** How does this clause differ from the playbook's acceptable language?
4. **Routing:** Which issues need lawyer attention vs. can be auto-flagged?
5. **Summary:** What's the overall risk profile of this contract?

### Step 4: Constraints

- **Hard:** Never approve a contract — only flag and recommend. The human lawyer always makes the final decision.
- **Hard:** Never provide legal advice. Only highlight and compare.
- **Hard:** All contract data stays within the company's secure environment.
- **Soft:** Flag clauses in order of risk severity (highest first).
- **Exception:** For contracts under $10K, a senior associate can skip full review if AI finds no non-standard clauses.

### Step 5: Success and failure

- **Success:** review time reduced by 60%; zero missed high-risk clauses in 6 months; lawyers trust the system enough to rely on its flagging.
- **Failure:** system flags everything as risky (too many false positives, lawyers ignore it); system misses a genuinely risky clause; system is too slow to use in practice.

**Result:** "We need AI for contract review" has become a precise specification with entities, decisions, constraints, and success criteria. A development team can now build this. And, critically, everyone agrees on what "success" means before a single line of code is written.

---

## The three most common reframing mistakes

### Mistake 1: Accepting the solution, not the problem

The stakeholder says "we need a chatbot." The SSA who accepts this is already constrained. Maybe the right solution is a search engine, a knowledge base, an email automation, or a simple FAQ page. The SSA reframes: "What problem are you trying to solve?" The solution follows from the problem, not the other way around.

**Analogy:** if someone asks you to buy a hammer, the SSA asks "what are you trying to hang?" Maybe they need a screw, not a nail. Or maybe adhesive strips are better. The tool comes after understanding the task.

### Mistake 2: Skipping constraints

Everyone loves to talk about what the system should do. Nobody likes to talk about what it shouldn't do. But constraints are often more important than capabilities, because constraint violations cause the worst failures.

**Analogy:** a bridge doesn't fail because it can't fly. It fails because it can't hold the weight it was supposed to hold. The constraints (weight capacity, wind resistance, earthquake tolerance) are what keep people safe. Capabilities are exciting. Constraints are essential.

### Mistake 3: Vague success criteria

"The system should work well" is not a success criterion. "The system should resolve 80% of routine tickets in under 30 seconds with a customer satisfaction rating above 4.0" is a success criterion. If you can't measure it, you can't know if you've succeeded.

**Analogy:** "Run faster" is not a training goal. "Run 5K in under 25 minutes by March" is a training goal. The difference between vague aspiration and achievable target is specificity.

---

## Practice activity

Here are three vague requests. For each one, apply the five-step reframing process:

**Request 1:** "We want AI to help with hiring."

**Request 2:** "Can you build something that summarizes our meetings?"

**Request 3:** "We need to use AI to reduce costs."

For each request, produce:

1. **The real problem** (ask "why" three times)
2. **Key entities** (at least 5)
3. **Decisions the system must make** (at least 3)
4. **Constraints** (at least 2 hard, 2 soft)
5. **Success criteria** (at least 3 measurable outcomes)

Write your answers in plain language. Keep each reframing to one page. The goal is practicing the skill, not producing a perfect document.

**Bonus challenge:** take a real, vague request from your own work or life and reframe it. This is where the skill becomes most powerful — when you apply it to something you actually care about.

---

## Key takeaways

1. **Vague requests are the starting point, not the enemy.** Every project starts with ambiguity. The SSA's job is not to complain about vagueness — it's to resolve it systematically.

2. **The five-step process works for any domain:** identify the real problem → define entities → map decisions → specify constraints → define success and failure. You can use this process for AI systems, home renovations, wedding planning, or career decisions.

3. **The stated problem is almost never the real problem.** "We need a chatbot" is a solution. "Our customers wait too long for answers to routine questions" is a problem. Always reframe to the problem.

4. **Constraints are as important as capabilities.** What the system must never do is often more critical than what it should do. Design for both.

5. **If you can't measure success, you don't know what you're building.** Every specification needs concrete, measurable criteria for what "working" looks like.

6. **This skill transfers everywhere.** Problem reframing is not just for SSA work. It's a life skill. Any time someone presents you with a vague request, you can apply this process to turn it into something actionable.

---

## What comes next

You now have the three foundational skills: understanding the paradigm shift (Lesson 1), knowing what an SSA works with (Lesson 2), and reframing problems into precise specifications (Lesson 3).

In **Application A**, you'll apply these skills to a real system — diagnosing its hidden semantic decisions. In **Application B**, you'll produce a complete SSA kickoff document. These applications are where theory becomes practice.
