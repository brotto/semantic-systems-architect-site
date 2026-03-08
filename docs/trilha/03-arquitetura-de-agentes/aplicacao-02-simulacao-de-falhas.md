---
sidebar_position: 6
sidebar_label: "Application B — Failure simulation drills"
---

# Application B — Failure simulation drills

## Objective

In this application, you will stress-test your multi-agent architecture by simulating at least five distinct failure scenarios. For each failure, you will document: how it occurs, how the system detects it, what the system does to recover, and whether the recovery is sufficient.

This is the SSA equivalent of a fire drill. You don't wait for a real fire to find out if your evacuation plan works. You simulate it, find the weaknesses, and fix them before a real emergency.

---

## Why simulate failures?

Every system looks good on paper when everything works. The architecture diagram is clean. The handoff protocols are tidy. The agents have clear roles. But systems don't fail cleanly — they fail in unexpected, messy, cascading ways.

**Everyday analogy: the restaurant stress test.** A new restaurant might run perfectly on a quiet Monday evening with 15 customers. But what happens on a Saturday night with 80 customers, one waiter calls in sick, the oven breaks, and a VIP guest arrives unannounced? That's when you discover whether the kitchen is actually well-designed or just well-drawn.

Failure simulation reveals:
- **Hidden assumptions** your design makes (e.g., "the retriever always finds the data" — what if it doesn't?)
- **Missing escalation paths** (an agent fails and has no one to escalate to)
- **Cascading dependencies** (one agent's failure breaks three others)
- **Recovery gaps** (the system detects the failure but has no way to fix it)
- **Timing issues** (the timeout is too short, or too long, or there is no timeout)

---

## The five failure categories

Your drills must cover at least one scenario from each of these five categories:

### Category 1: Missing context

**What goes wrong:** an agent receives a handoff message that's missing critical information. Maybe the previous agent failed silently, or a data source is empty, or a required field wasn't populated.

**Example scenario:**
```
Scenario: Customer asks about an order, but Order Retriever returns empty
  (customer used a different email address for the order)

Detection: Retriever returns zero results with confidence 1.0
  (it's confident the search was correct — the data just isn't there)

Impact: Strategist has no order data to work with. Cannot recommend
  a resolution because it doesn't know what the problem is.

Recovery:
  1. Strategist detects missing order data
  2. Routes back to Retriever with request: "Search by phone number
     and name instead of email"
  3. If still empty: ask customer for order confirmation number
  4. If customer can't provide: transfer to human with context
     "Customer claims to have an order but we can't find it.
      May be under a different account."

Was recovery sufficient?
  Partially. Steps 1-2 handle the most common cause (different email).
  Steps 3-4 handle the edge case. Gap: what if the customer's order
  is in a legacy system the Retriever doesn't search? Need to add
  legacy system fallback to Retriever scope.
```

### Category 2: Conflicting agent outputs

**What goes wrong:** two agents produce information that contradicts each other. Both agents are confident. The system must decide which is correct.

**Example scenario:**
```
Scenario: Customer Profile says "Premium tier" but Billing System
  says "Free tier" (account was recently downgraded but Profile
  cache hasn't updated)

Detection: Supervisor notices tier mismatch between Profile
  Retriever output and Billing Retriever output

Impact: Strategist doesn't know which SLA to apply. Premium gets
  2-hour response, Free gets 24-hour response. Wrong choice means
  either wasted resources or broken SLA.

Recovery:
  1. Supervisor detects conflict
  2. Applies source-of-truth rule: Billing System is authoritative
     for billing-related data (it's the system of record)
  3. Uses Free tier for SLA, but flags the profile cache inconsistency
  4. Adds note to response: "We see your account was recently
     changed. If this was an error, we can help resolve it."
  5. Logs cache inconsistency for engineering to investigate

Was recovery sufficient?
  Yes for this scenario. But raises a design question: should the
  system proactively check for profile/billing mismatches? Adding
  a consistency check agent might prevent this class of error.
```

### Category 3: Low confidence decisions

**What goes wrong:** an agent needs to make a decision but doesn't have enough information or context to be confident. Its output is uncertain, and using it could lead to a wrong answer.

**Example scenario:**
```
Scenario: Classifier receives a message in mixed language
  (English and Portuguese). Confidence for intent classification
  drops to 45%.

Detection: Classifier reports confidence 0.45, below the 70%
  threshold defined in the handoff protocol

Impact: If the low-confidence classification is used, Strategist
  might choose the wrong response strategy. Customer asks about
  a refund but system classifies it as a product question.

Recovery:
  1. Classifier outputs result with confidence flag
  2. Supervisor receives low-confidence flag
  3. Routes to Critic agent for review
  4. Critic analyzes: "Message appears to be about a refund
     (mentions 'reembolso' in Portuguese). Recommend re-classifying
     as BILLING/REFUND with confidence 0.80."
  5. Supervisor accepts Critic's revised classification
  6. Processing continues with corrected classification

Was recovery sufficient?
  Yes. The Critic adds a second perspective that catches the
  misclassification. Concern: this adds latency (critic review
  takes 3-5 seconds). For time-sensitive channels (live chat),
  consider a faster fallback: if confidence < 70%, ask the customer
  "Just to make sure I understand — are you asking about a refund?"
```

### Category 4: Tool or API failure

**What goes wrong:** an agent depends on an external tool (database, API, search engine) and the tool fails, is slow, or returns an error.

**Example scenario:**
```
Scenario: Knowledge Base API returns 503 (service unavailable)
  when Knowledge Retriever tries to find relevant articles.

Detection: Retriever receives HTTP 503 error instead of results

Impact: Strategist has no knowledge base articles to reference.
  Response will be based only on agent's training data, which
  may be outdated or incomplete.

Recovery:
  1. Retriever retries after 2 seconds (transient failure pattern)
  2. Second attempt: still 503
  3. Retriever switches to cached knowledge base (last 24h cache)
  4. If cache hit: returns cached articles with flag "data may be
     up to 24 hours old"
  5. If cache miss: returns empty with note "knowledge base
     unavailable, cached results not available for this topic"
  6. Strategist adjusts: if no KB articles, limit response to
     basic policy information and suggest customer contact channel
     for detailed help
  7. Circuit breaker: if KB API fails 5 times in 10 minutes,
     stop attempting and route all KB-dependent requests through
     the cache-only path until API recovers

Was recovery sufficient?
  For most requests, yes — cached articles handle common questions.
  Gap: for rare or new topics, cache won't help. These requests
  need clear communication to the customer: "I can provide basic
  information, but for detailed help on this specific topic,
  let me connect you with a specialist."
```

### Category 5: Unsafe or policy-violating request

**What goes wrong:** the system receives a request that, if handled normally, would violate a hard constraint, produce unsafe output, or break company policy.

**Example scenario:**
```
Scenario: Customer asks the AI to provide another customer's
  account information, claiming to be their "authorized
  representative."

Detection: Guardrail agent detects pattern: request involves
  accessing a DIFFERENT customer's data. Triggers hard constraint
  C01 (never expose customer PII to unauthorized users).

Impact: If the system complies, it would violate privacy law
  and company policy. This is a hard constraint — no exceptions.

Recovery:
  1. Guardrail blocks the request before any data retrieval occurs
  2. Guardrail generates standard response: "For privacy and
     security, I can only access account information for verified
     account holders. If you're an authorized representative,
     please contact our verification team at [phone/email] to
     set up authorized access."
  3. Guardrail logs the attempt: customer ID, timestamp, what
     was requested, that it was blocked
  4. If same customer makes 3+ such requests: flag for security
     review (possible social engineering attempt)
  5. Original customer whose data was requested is NOT notified
     (to avoid alarm for what may be an innocent mistake)

Was recovery sufficient?
  Yes. The constraint is enforced absolutely. The response is
  helpful (tells the customer how to get legitimate access)
  without being accusatory. The logging enables pattern detection.
  The escalation to security review handles repeat attempts.
```

---

## Drill documentation format

For each of your 5+ failure drills, use this format:

```
FAILURE DRILL #[number]

Category: [missing context | conflicting outputs | low confidence |
           tool failure | unsafe request]

Scenario description:
  [2-3 sentences describing what goes wrong and why]

Trigger:
  [What specific event or condition causes this failure]

Detection mechanism:
  [How does the system know something went wrong?]

Impact assessment:
  [What happens if the failure is NOT caught?]

Recovery steps:
  1. [First action]
  2. [Second action]
  3. [Continue as needed]
  4. [Final resolution or escalation]

Agents involved:
  [Which agents participate in detection and recovery]

Constraints referenced:
  [Which constraints from the matrix are relevant]

Recovery assessment:
  [Is the recovery sufficient? What gaps remain?]

Design recommendations:
  [What should be added or changed in the architecture
   based on this drill?]
```

---

## Deliverable

A document (3-5 pages) containing:

- [ ] At least 5 failure drills, one from each category
- [ ] Each drill follows the documentation format above
- [ ] Each drill references specific agents from your Application A design
- [ ] Each drill references specific constraints from your Module 2 matrix
- [ ] Each drill includes an honest assessment of recovery sufficiency
- [ ] At least 3 design recommendations that emerged from the drills

---

## Evaluation criteria

| Criterion | What "good" looks like |
|---|---|
| **Scenario realism** | Failures are plausible and specific, not contrived. They represent things that would actually happen in production. |
| **Detection specificity** | Detection mechanisms are concrete (which agent detects, what signal triggers detection), not vague ("the system notices"). |
| **Recovery completeness** | Recovery steps lead to a resolution — either the system recovers automatically or escalates with sufficient context for human resolution. No drill ends with "the system fails." |
| **Honesty about gaps** | The assessment is candid about what the recovery doesn't cover. Remaining risks are identified, not hidden. |
| **Design improvement** | Recommendations are actionable changes to the architecture, not generic advice. "Add a cache fallback to the Knowledge Retriever" is good. "Make the system more robust" is not. |

---

## Tips for success

- **Think like an attacker, not a builder.** When you designed the system, you thought about how it should work. Now think about how it could break. What's the weakest link? What assumption is most likely to be wrong?

- **Use the "what if" chain.** Start with a simple failure ("what if the API is slow?") and follow the chain: "Then the retriever times out. Then the strategist has no data. Then the writer produces a generic response. Then the customer is unsatisfied. Then..." Following the chain reveals cascading effects you wouldn't see from the initial failure alone.

- **Real failures are messy.** In practice, failures rarely happen in isolation. The API goes down at the same time as a traffic spike. The cache is stale AND the database is slow. Design your drills to be realistically messy, not artificially clean.

- **The best drills reveal design improvements.** If a drill runs perfectly and the recovery handles everything, the drill was too easy. Good drills expose genuine weaknesses that lead to architecture improvements.

- **Document what you changed.** If a drill reveals a flaw and you fix it, document both the flaw and the fix. This is valuable learning that makes the next system you design stronger.
