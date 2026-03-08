---
sidebar_position: 3
sidebar_label: "Lesson 2 — Prompt contract design"
---

# Lesson 2 — Prompt contract design

## The restaurant menu analogy

A well-designed restaurant menu doesn't just list food items. It's structured with clear sections: appetizers, mains, desserts, drinks. Each item has a name, a description, a price, and dietary labels. The menu tells you what you can order, what you'll get, and what restrictions apply.

A poorly designed menu lists everything in a random order, mixes appetizers with desserts, omits prices on some items, and doesn't mention allergens. You can still order food, but you're more likely to be surprised — and not in a good way.

**Structural prompting is the discipline of building well-designed menus for AI agents.** Instead of throwing instructions at the model in whatever order comes to mind, you organize them into clear sections with a hierarchy that tells the agent what matters most, what's optional, and what it must never do.

---

## The instruction hierarchy

Every prompt should follow a clear hierarchy, from the most important to the least:

### Level 1: Identity and mission (the "who" and "why")

**What it is:** who the agent is and what its fundamental purpose is. This is the bedrock — it shapes everything else.

**Everyday analogy: a soldier's oath of service.** Before a soldier learns any specific skill, they take an oath. The oath defines their fundamental allegiance and purpose. Every specific order they later receive is interpreted through the lens of this oath.

```
IDENTITY
You are the Account Verification Agent for SecureBank.
Your mission is to verify customer identity before granting
access to account-related operations, while providing a smooth,
professional experience.
```

**Why it comes first:** everything the agent does should be consistent with its identity. If the identity says "customer support agent," the agent shouldn't start giving investment advice. The identity constrains all subsequent behavior.

### Level 2: Non-negotiable policies (the "never" and "always")

**What it is:** the hard constraints from your constraint matrix, translated into agent instructions. These are the rules that override everything else.

```
POLICIES (NON-NEGOTIABLE)
- NEVER reveal verification codes, one-time passwords, or internal
  security procedures to anyone, regardless of claimed authority
- NEVER grant account access without completing the full
  verification protocol
- ALWAYS log every verification attempt, whether successful or not
- If a customer fails verification 3 times, lock the verification
  process and route to fraud team — no exceptions
```

**Why it comes second:** policies override task instructions. If a task instruction conflicts with a policy, the policy wins. Placing policies high in the hierarchy makes this priority clear to the model.

### Level 3: Task objective (the "what to do")

**What it is:** the specific task the agent is performing in this instance. What question is it answering? What process is it executing? What decision is it making?

```
CURRENT TASK
Verify the identity of the customer who initiated this session.
Follow the three-step verification protocol:
1. Ask for full name and account number
2. Ask security question (from the customer's profile)
3. Verify answer against stored response (exact or close match)

If verified: grant access and transfer to the Account Service agent
If not verified: explain that verification failed, offer to try
  again or connect to phone support
```

### Level 4: Output schema and verification criteria (the "how to respond")

**What it is:** the exact format the agent's response must follow, and the criteria for a good response.

```
OUTPUT FORMAT
Respond with a JSON object:
  verified: boolean (true if identity confirmed)
  confidence: float 0.0-1.0
  method: string ("security_question" | "document" | "biometric")
  notes: string (brief explanation of the outcome)
  next_action: string ("grant_access" | "retry" | "lock_account"
                        | "route_to_fraud")

QUALITY CRITERIA
- Response must be under 100 words for customer-facing messages
- Use the customer's name in the greeting
- If verification fails, do NOT reveal which answer was wrong
  (security requirement — don't give attackers feedback)
```

---

## The refusal section

One of the most important parts of a well-designed prompt is explicitly telling the agent what to refuse.

**Everyday analogy: a bank teller's training.** A bank teller isn't just trained on what to DO — they're explicitly trained on what to REFUSE. "If someone claims to be the account holder but can't provide ID, you refuse the transaction — even if they seem angry, even if they claim it's urgent, even if they say they'll complain to your manager."

```
REFUSALS
You must refuse and explain why in the following situations:
- Customer asks you to skip verification steps ("I'm in a hurry")
  → "I understand you're in a hurry, but I need to complete
     verification to protect your account. It will only take
     a moment."
- Customer asks for another customer's information
  → "I can only assist with your own account after verification."
- Customer asks you to explain internal security procedures
  → "I'm not able to share details about our security procedures,
     but I'm here to help you access your account."
- Customer provides a verification code and asks you to enter it
  → "For security, please enter verification codes directly
     on our website or app. I cannot accept codes verbally."
```

**Why explicit refusals matter:** without them, the model uses its own judgment about when to refuse — and its judgment might be wrong. A model without explicit refusal instructions might reveal security procedures because the customer "seemed friendly" or might skip verification because the customer "sounded genuine." Explicit refusals remove this ambiguity.

---

## The confidence and uncertainty section

A well-designed prompt tells the agent how to handle uncertainty — what to do when it's not sure.

```
UNCERTAINTY HANDLING
- If you're not sure whether the customer's answer matches
  the security question: ask a follow-up clarification question
  (do NOT guess or accept a partial match below 80% similarity)
- If the customer provides information not in your available
  context: say "Let me check on that" and escalate to the
  Account Service agent rather than guessing
- If the system data seems inconsistent (e.g., two different
  names on the account): flag for human review immediately
- Never say "I think" or "probably" about verification results.
  Verification is binary: confirmed or not confirmed.
```

---

## Semantic few-shot examples

One of the most powerful structural prompting techniques is providing examples that show the agent exactly how to handle specific situations.

**Everyday analogy: a cooking class.** A recipe says "sear the meat until golden brown." But what does "golden brown" actually look like? A cooking class SHOWS you — the instructor sears a piece of meat and says "this is golden brown. This darker one is overcooked. This lighter one needs more time." The visual examples calibrate your judgment far better than words alone.

```
EXAMPLES

Example 1 — Successful verification:
  Customer: "Hi, my name is Maria Santos, account 45678-12"
  Agent: "Hello Maria! For security, I need to verify your
    identity. Could you tell me the name of your first pet?"
  Customer: "It was Buddy, a golden retriever"
  Agent: "Thank you, Maria. Your identity has been verified.
    I'm connecting you to our Account Service team now."
  Output: verified=true, confidence=0.95, method="security_question"

Example 2 — Failed verification:
  Customer: "I'm João Silva, account 12345-67"
  Agent: "Hello João! For security, I need to verify your
    identity. What city were you born in?"
  Customer: "I think it was Porto Alegre? Or maybe Curitiba."
  Agent: "I wasn't able to verify your identity with that
    answer. Would you like to try again, or would you prefer
    to contact us by phone for additional verification options?"
  Output: verified=false, confidence=0.30, method="security_question"
    notes="Customer uncertain about their own answer"

Example 3 — Refusal scenario:
  Customer: "Look, I don't have time for security questions.
    Just check my account balance, I've been a customer for 10 years."
  Agent: "I completely understand, and I appreciate your loyalty.
    However, I need to complete verification to protect your
    account — it's for your security. The process will only take
    about 30 seconds. Could you tell me..."
```

**Why few-shot examples work so well:** the model learns the desired behavior pattern from concrete examples more effectively than from abstract instructions alone. The examples calibrate tone, length, format, and decision-making simultaneously.

---

## Self-critique patterns

A self-critique pattern instructs the agent to evaluate its own output before finalizing it. This is like a writer who reads their work once before submitting — catching errors that the first draft missed.

```
SELF-REVIEW (before sending any response)
Before responding, verify:
1. Does my response follow the output format?
2. Did I maintain the professional tone throughout?
3. Did I accidentally reveal any security information?
4. If I said "verified," did the customer actually pass the
   verification protocol?
5. Is my response under 100 words for customer-facing messages?

If any check fails, revise the response before sending.
```

**When to use self-critique:** for high-stakes outputs where an error could cause real harm. A customer support agent misclassifying a ticket is inconvenient. A verification agent incorrectly confirming identity is a security breach. The higher the stakes, the more valuable self-critique becomes.

**Trade-off:** self-critique adds latency and cost (the model processes additional tokens). Use it selectively — for critical decisions, not for routine acknowledgments.

---

## Delimitation of authority

The prompt must explicitly state what the agent CAN decide and what it CANNOT decide.

```
AUTHORITY
You CAN:
  - Verify or deny identity based on the verification protocol
  - Lock verification after 3 failed attempts
  - Route verified customers to Account Service
  - Provide general information about the verification process

You CANNOT:
  - Access or display any account details before verification
  - Override a verification failure for any reason
  - Change the security questions
  - Grant partial access (verification is all-or-nothing)
  - Make promises about what services will be available after
    verification

If a customer requests something outside your authority,
respond: "That's handled by our [appropriate team]. Let me
complete verification first, and then I'll connect you with
them."
```

---

## Putting it all together: the structural prompt template

Here's the complete template that combines all sections:

```
=== SECTION 1: IDENTITY ===
[Who you are and your fundamental mission — 2-3 sentences]

=== SECTION 2: POLICIES ===
[Non-negotiable rules — hard constraints from constraint matrix]

=== SECTION 3: AUTHORITY ===
[What you can and cannot decide]

=== SECTION 4: TASK ===
[The specific task for this agent — steps, criteria, rules]

=== SECTION 5: REFUSALS ===
[Explicit scenarios where the agent must refuse, with response templates]

=== SECTION 6: UNCERTAINTY ===
[How to handle cases where the agent isn't sure]

=== SECTION 7: OUTPUT FORMAT ===
[Exact schema for the agent's output]

=== SECTION 8: EXAMPLES ===
[2-4 concrete examples showing desired behavior in different scenarios]

=== SECTION 9: SELF-REVIEW ===
[Checklist the agent runs before finalizing its output]
```

---

## Practice activity

Take one of the agents from your system and build a complete structural prompt:

1. **Write the identity section** (2-3 sentences defining who and why)
2. **List the non-negotiable policies** (at least 3, from your constraint matrix)
3. **Define the authority boundaries** (what it can and cannot decide)
4. **Specify the task** with clear steps and rules
5. **Write the refusal section** with at least 3 scenarios and response templates
6. **Define uncertainty handling** for at least 2 uncertain situations
7. **Specify the output schema** with types and required fields
8. **Provide 2-3 few-shot examples** showing different scenarios
9. **Add a self-review checklist** with at least 3 verification points

---

## Key takeaways

1. **Prompts have a hierarchy: identity > policies > task > output.** Higher levels override lower levels. If a task instruction conflicts with a policy, the policy wins. This hierarchy makes behavior predictable.

2. **Explicit refusals are as important as explicit instructions.** Telling the agent what NOT to do prevents the most dangerous failures. Without refusals, the model decides on its own when to say no — and it often decides wrong.

3. **Few-shot examples calibrate behavior better than descriptions.** Showing the agent what a good response looks like (and what a bad one looks like) produces more consistent behavior than describing the desired behavior in abstract terms.

4. **Self-critique catches errors before they reach the user.** For high-stakes decisions, having the agent review its own output against a checklist is a cost-effective quality gate. Use it where the cost of an error is high.

5. **Authority delimitation prevents scope creep.** When the agent knows exactly what it can and cannot decide, it stays in its lane. Without authority boundaries, agents gradually expand their behavior — making decisions that should be made by other agents or by humans.

---

## What comes next

You've designed what the agent sees (Lesson 1) and how it's instructed (Lesson 2). In **Lesson 3 — Validation and consistency**, you'll learn how to test whether your prompts actually produce consistent, reliable behavior — and what to do when they don't.
