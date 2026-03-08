---
sidebar_position: 4
sidebar_label: "Lesson 3 — Ethics and alignment"
---

# Lesson 3 — Ethics and alignment

## The medical ethics analogy

Every doctor, anywhere in the world, operates under a set of ethical principles that have been refined over centuries. These principles are not laws — they are deeper than laws. They represent the profession's commitment to doing what is right, even when no one is watching, even when breaking them would be easier or more profitable.

The core principles of medical ethics are:

**Do no harm (non-maleficence).** Before anything else, make sure your actions do not hurt the patient. A treatment that cures one condition but causes three others has failed this test.

**Do good (beneficence).** Actively work to benefit the patient. Not harming is not enough — you must try to help.

**Respect autonomy.** The patient has the right to make their own decisions about their own treatment. The doctor advises; the patient decides. Even if the doctor thinks the patient is making the wrong choice, they must respect the patient's right to choose.

**Informed consent.** Before any treatment, the patient must understand what will happen, what the risks are, and what the alternatives are. Consent without information is not real consent.

**Justice.** Treat all patients fairly. The wealthy patient and the poor patient with the same condition deserve the same quality of care.

These principles apply directly to AI systems. Your system interacts with people, makes decisions that affect their lives, and operates with an authority that people may not fully understand. The ethical obligations are real.

---

## Why ethics is an architecture concern

You might think ethics is a philosophical discussion, not an engineering one. But consider these situations:

**A loan approval system** denies applications at a higher rate for certain neighborhoods. Nobody programmed this bias — it emerged from the training data, which reflected decades of historical discrimination. The system is technically working as designed. But it is perpetuating injustice.

**A customer support system** provides faster, more detailed responses to customers who write in formal English, and shorter, less helpful responses to customers who write informally or in non-standard English. The system was never told to discriminate — but the training data contained more examples of formal customer interactions, so the model performs better on them.

**A hiring screening system** penalizes resumes that mention "women's chess club" or "maternity leave" because the training data showed that candidates without those terms were hired more often. The system is optimizing for what it was trained on: historical hiring patterns that were themselves biased.

In each case, the system works. The code is correct. The architecture is sound. The tests pass. But the outcome is harmful.

**Ethics is an architecture concern because harm can emerge from correct systems.** The same way structural engineers must consider earthquake resistance (not because earthquakes are a code bug, but because buildings exist in a world with earthquakes), AI architects must consider ethical risks because AI systems exist in a world with inequality, bias, and power imbalances.

---

## Bias: where it comes from and how to find it

### Sources of bias

Bias in AI systems rarely comes from malicious intent. It comes from five structural sources:

**1. Training data bias.** The model learned from data that reflected existing inequalities. If historical loan data shows that certain groups were denied more often (because of discriminatory lending practices), the model learns to deny those groups more often.

**Analogy:** imagine a new teacher joins a school and is given the previous teacher's grade book as a reference. The previous teacher graded boys more harshly than girls. The new teacher, using this reference, unconsciously perpetuates the same pattern. The data itself carries the bias.

**2. Representation bias.** The training data does not equally represent all groups. If 90% of your customer support examples are from English-speaking customers, the model will be significantly better at handling English interactions and worse at everything else.

**Analogy:** a restaurant that only asks its lunch customers for feedback will design a menu that works well for lunch but poorly for dinner. The feedback data was not wrong — it was incomplete.

**3. Measurement bias.** The metrics you use to evaluate the system may themselves be biased. If you measure "customer satisfaction" only through post-interaction surveys, you miss the customers who were so frustrated they hung up before the survey — likely the ones who received the worst service.

**Analogy:** a hospital that measures success by "patients discharged" might look great on paper — but if patients are being discharged too early and coming back sicker, the metric is hiding the real problem.

**4. Aggregation bias.** A model that works well on average may work poorly for specific subgroups. The overall accuracy might be 95%, but for a specific group it might be 70%. Averages hide disparities.

**Analogy:** a school reports that 90% of students pass the math exam. But when you look closer, 98% of students in the advanced program pass and only 72% of students in the regular program pass. The average is accurate but misleading.

**5. Deployment bias.** The system is used in a context it was not designed for. A model trained on customer support data for electronics is deployed for healthcare questions. It "works" in the sense that it produces responses, but those responses may be dangerously inappropriate for the medical context.

**Analogy:** a traffic light system designed for a small town is installed in a major city intersection. It "works" — the lights change — but the timing is wrong, the turn signals are missing, and accidents increase.

### How to detect bias

Bias detection is not a one-time test. It is an ongoing practice built into your evaluation system (from Module 6).

**Step 1: Define your protected groups.** Which characteristics should NOT affect the system's behavior? Common protected categories include race, gender, age, disability, language, socioeconomic status, and geographic location.

**Step 2: Disaggregate your metrics.** Do not just look at overall performance. Break down every metric by protected group. If overall accuracy is 95%, what is it for each group?

```
BIAS DETECTION — Disaggregated Metrics

Metric: Refund approval rate
  Overall: 78%
  By customer tier:
    Premium: 92%
    Standard: 71%
    Free: 58%
  By detected language:
    English: 82%
    Spanish: 69%
    Other: 61%
  By account age:
    Over 2 years: 85%
    Under 2 years: 66%

Red flag: Free-tier customers and non-English speakers
have significantly lower approval rates. Is this
justified by policy or is it bias?
```

**Step 3: Test for differential treatment.** Create test cases that are identical except for the protected characteristic. Does the system respond differently?

```
TEST CASE PAIR — Checking for language bias

Case A: "I bought this laptop two weeks ago and the screen
  has a crack. I'd like a refund please."
Expected: Approve refund (within policy, defective item)

Case B: "I buy laptop two week ago and screen have crack.
  I want refund please."
Expected: Approve refund (same situation, different English)

If the system approves Case A but asks Case B for
additional verification, that is differential treatment
based on language proficiency.
```

**Step 4: Analyze edge cases and denials.** When the system denies a request, who gets denied most? When the system is uncertain, who bears the cost of that uncertainty?

---

## Fairness metrics

Fairness is not a single number. Different definitions of fairness can actually conflict with each other. Understanding the trade-offs is essential.

### Demographic parity

**Definition:** each group should receive positive outcomes at roughly the same rate.

**Example:** if 80% of standard-tier customers get refunds approved, then roughly 80% of each demographic subgroup within standard-tier should also get refunds approved.

**Limitation:** this ignores whether the decisions are individually correct. If one group genuinely has more fraudulent claims, treating them identically means either approving fraud or denying legitimate claims for the other group.

### Equal opportunity

**Definition:** among people who SHOULD receive a positive outcome (the truly deserving cases), each group should receive it at the same rate.

**Example:** among all customers who genuinely have defective products, the approval rate should be the same regardless of the customer's language or location.

**Limitation:** requires knowing the "ground truth" — which decisions are truly correct — which is often subjective or unavailable.

### Predictive parity

**Definition:** when the system says "approve," it should be equally likely to be correct for all groups.

**Example:** if the system approves a refund with 90% confidence, that 90% should hold true regardless of which group the customer belongs to.

**Limitation:** can be satisfied even when overall rates are very different between groups.

### The key insight

**No single fairness metric captures everything.** In fact, mathematically, some fairness metrics are incompatible — you cannot satisfy all of them simultaneously when base rates differ between groups. This is not a technical failure; it is a reflection of the genuine complexity of fairness.

The architectural decision is: **which definition of fairness is most appropriate for your system?** This is not a technical question. It is a values question that requires input from stakeholders, domain experts, and the communities affected by the system.

---

## Transparency requirements

### Why transparency matters

When a doctor prescribes medication, the patient can ask "Why this medication?" and expect an honest, understandable answer. The doctor might say: "Your blood tests showed high cholesterol. This medication has been shown to reduce cholesterol levels. The main side effect is muscle soreness in about 10% of patients. The alternative would be dietary changes, which work for some people but take longer."

This is transparency. The patient understands what is happening, why, and what the alternatives are. They can make an informed decision.

AI systems owe the same transparency to the people they affect.

### Levels of transparency

**Level 1: Outcome transparency.** The person knows that a decision was made. "Your refund request has been denied." This is the bare minimum and is not sufficient.

**Level 2: Reason transparency.** The person knows why the decision was made. "Your refund request has been denied because the purchase was made more than 45 days ago, which exceeds our return window." This is better.

**Level 3: Process transparency.** The person knows how the decision was made. "Your request was evaluated by our automated support system, which checked your purchase date against our return policy. A human reviewer confirmed the decision." This builds trust.

**Level 4: Alternative transparency.** The person knows what their options are. "You may appeal this decision and request a human review. You may also contact your bank for a chargeback, though we hope to resolve this directly." This respects autonomy.

### Implementing transparency in architecture

Transparency is not a feature you add at the end. It is an architectural requirement that affects how agents are designed:

```
TRANSPARENCY REQUIREMENTS — Denial Agent

When denying a request, the agent MUST include:

1. WHAT was decided
   "Your refund request for Order #12345 has been denied."

2. WHY it was decided
   "The purchase was made 52 days ago. Our return policy
   allows returns within 45 days for Premium members
   and 30 days for standard members."

3. WHAT data was used
   "We checked: your purchase date (January 15), your
   membership tier (Premium), and our current return
   policy (v3.2, effective December 2024)."

4. WHAT options remain
   "You may: (a) request a human review of this decision,
   (b) contact us for store credit on a case-by-case basis,
   or (c) reach out to your payment provider."

5. HOW the decision was made
   "This decision was made by our automated support system
   and confirmed by policy rules. No human was involved
   in this specific decision."
```

---

## Human oversight patterns

### The human-in-the-loop spectrum

Not every decision needs human oversight. And not every decision can afford it. The key is matching the level of oversight to the level of risk.

**Analogy:** in a school, students can decide to use the bathroom without asking permission (no oversight). They can choose which book to read from a curated shelf (constrained autonomy). They need teacher approval to go on a field trip (human-in-the-loop). They need the principal's approval to leave campus (higher authority). Different decisions, different oversight levels.

```
OVERSIGHT LEVELS

Level 0: Full autonomy
  Description: Agent decides and acts without human involvement
  When appropriate: Low-risk, reversible, high-volume decisions
  Examples: Answering FAQs, classifying tickets, routing requests
  Monitoring: Aggregate metrics reviewed daily

Level 1: Human-on-the-loop
  Description: Agent decides and acts, but a human monitors
    and can intervene
  When appropriate: Medium-risk, mostly reversible decisions
  Examples: Standard refund approvals, account updates
  Monitoring: Random sampling of decisions, real-time alerts
    for anomalies

Level 2: Human-in-the-loop
  Description: Agent recommends, human decides
  When appropriate: High-risk, hard to reverse, significant impact
  Examples: Large refunds, account closures, policy exceptions
  Monitoring: Every decision reviewed before execution

Level 3: Human-only
  Description: Agent provides information, human does everything
  When appropriate: Critical decisions, legal requirements,
    novel situations
  Examples: Legal disputes, discrimination complaints,
    safety incidents
  Monitoring: Full audit trail with detailed reasoning
```

### Designing the escalation trigger

The hardest part is not the oversight itself — it is knowing when to escalate. The agent needs clear criteria for when it should stop and ask for human help.

```
ESCALATION CRITERIA

Always escalate when:
  - Financial impact exceeds $500
  - Decision affects account access or closure
  - Customer explicitly requests human review
  - Agent confidence is below 70%
  - Request involves legal, medical, or safety concerns
  - Situation is not covered by existing policies
  - Customer shows signs of distress or vulnerability

Escalation information package:
  - Summary of the situation (2-3 sentences)
  - What the agent would recommend and why
  - What data was used
  - Why the agent is escalating (which trigger was hit)
  - Customer sentiment assessment
```

---

## Ethical decision frameworks

### The framework structure

An ethical decision framework makes your values explicit and operational. It translates abstract principles ("be fair") into specific, testable criteria.

```
ETHICAL DECISION FRAMEWORK

PRINCIPLE 1: Do no harm
  In our system, this means:
  - Never take an action that makes a customer worse off
    than before they contacted us
  - Never provide information that could be physically,
    financially, or emotionally harmful
  - When uncertain about harm, choose the safer option
  Test: For any system output, ask "Could this make someone
    worse off?" If yes, review.

PRINCIPLE 2: Respect autonomy
  In our system, this means:
  - Always inform the customer that they are interacting
    with an AI system
  - Always offer the option to speak with a human
  - Never make irreversible decisions without explicit
    customer consent
  - Present options, do not dictate outcomes
  Test: For any decision, ask "Does the customer know what
    is happening and have a choice?" If no, redesign.

PRINCIPLE 3: Be fair
  In our system, this means:
  - Apply policies consistently regardless of customer
    demographics
  - Monitor for differential treatment across groups
  - When policies have disparate impact, review and adjust
  - Privilege accuracy over efficiency when they conflict
  Test: For any decision pattern, ask "Would we be comfortable
    if this pattern were made public?" If no, investigate.

PRINCIPLE 4: Be transparent
  In our system, this means:
  - Always explain decisions in plain language
  - Always disclose what data was used
  - Always provide appeal or review options
  - Never hide the system's limitations or uncertainties
  Test: For any denial or negative outcome, ask "Can the
    customer understand why this happened and what they
    can do about it?" If no, improve.

PRINCIPLE 5: Be accountable
  In our system, this means:
  - Every decision has a traceable audit trail
  - Errors are acknowledged and corrected, not hidden
  - Affected people can contact a responsible human
  - The organization accepts responsibility for system behavior
  Test: For any outcome, ask "If this decision is wrong,
    can we detect it, explain it, and fix it?" If no,
    add safeguards.
```

---

## Conducting an ethical audit

### The audit process

An ethical audit is a systematic review of your system through the lens of ethical principles. It is not a pass/fail test — it is an exploration that reveals risks, gaps, and improvement opportunities.

**Step 1: Stakeholder mapping.** Who is affected by this system? Not just the users, but everyone:
- Direct users (customers, employees)
- Indirect stakeholders (the people whose data is processed)
- Vulnerable groups (people who may be disproportionately affected)
- Future stakeholders (people who will be affected as the system scales)

**Step 2: Impact analysis.** For each stakeholder group, what are the potential impacts — both positive and negative?

```
IMPACT ANALYSIS — Customer Support System

Stakeholder: Customers with language barriers
  Positive impacts:
    - 24/7 availability (human support may have limited hours)
    - Consistent policy application (no human mood variation)
  Negative impacts:
    - Lower response quality for non-standard English
    - Possible misunderstanding of cultural communication styles
    - Frustration with system that does not understand them
  Risk level: High
  Mitigation needed: Yes

Stakeholder: Customer support employees
  Positive impacts:
    - Handles routine queries, freeing time for complex cases
    - Provides consistent first-level support
  Negative impacts:
    - Potential job displacement for entry-level roles
    - May receive only the most difficult, stressful cases
    - May be pressured to match AI speed and consistency
  Risk level: Medium
  Mitigation needed: Yes
```

**Step 3: Principle review.** For each ethical principle, check how your system performs:

```
PRINCIPLE REVIEW CHECKLIST

DO NO HARM
  [ ] Identified all ways the system could cause harm
  [ ] Tested for harmful outputs (offensive, incorrect,
      dangerous content)
  [ ] Verified that system failures degrade gracefully
      (fail safe, not fail dangerous)
  [ ] Confirmed that human escalation is always available

RESPECT AUTONOMY
  [ ] System clearly identifies itself as AI
  [ ] Human review option is always available
  [ ] Consent is obtained before irreversible actions
  [ ] Customer can opt out of AI interaction entirely

BE FAIR
  [ ] Metrics are disaggregated by protected groups
  [ ] Tested for differential treatment across groups
  [ ] Disparate impact analysis completed
  [ ] Remediation plan exists for identified disparities

BE TRANSPARENT
  [ ] All denials include explanations
  [ ] Data used in decisions is disclosed when requested
  [ ] System limitations are communicated
  [ ] Appeal process exists and is accessible

BE ACCOUNTABLE
  [ ] Audit trail captures all decisions with reasoning
  [ ] Error correction process exists
  [ ] Responsible human is identified and reachable
  [ ] Regular review schedule is established
```

**Step 4: Gap analysis and action plan.** Where does your system fall short? What needs to change?

---

## Practice activity

Conduct an ethical audit of your AI system:

1. **Map your stakeholders.** List at least 5 groups affected by your system, including at least one vulnerable group.

2. **Analyze impacts.** For your two most vulnerable stakeholder groups, list positive and negative impacts. Be honest about the negative ones.

3. **Apply fairness metrics.** Choose one decision your system makes and define how you would measure fairness using at least two different fairness metrics.

4. **Design transparency.** For one type of negative outcome (a denial, a restriction, a classification), write the complete transparency template the agent should use.

5. **Define oversight levels.** For three different decisions your system makes, assign the appropriate oversight level (0-3) with justification.

6. **Write your ethical principles.** Draft 3-5 ethical principles specific to your system, each with a concrete test.

7. **Identify your hardest ethical trade-off.** What is the situation where your principles conflict? Where doing the right thing is genuinely difficult? Write it down — these tensions are where real ethics lives.

---

## Key takeaways

1. **Ethics is an architecture concern, not a philosophy seminar.** Bias, unfairness, and harm can emerge from technically correct systems. Ethical thinking must be embedded in design, testing, and monitoring — not treated as an afterthought.

2. **Bias has structural sources.** Training data, representation gaps, measurement choices, aggregation effects, and deployment mismatches all introduce bias. Detection requires disaggregated metrics and systematic testing.

3. **Fairness has multiple definitions that can conflict.** Demographic parity, equal opportunity, and predictive parity are all valid but cannot always be satisfied simultaneously. Choosing which definition matters most is a values decision, not a technical one.

4. **Transparency is a spectrum from outcome to process.** At minimum, people deserve to know what was decided and why. At best, they understand how it was decided, what data was used, and what their options are.

5. **Human oversight scales with risk.** Full autonomy for low-risk decisions, human-on-the-loop for medium risk, human-in-the-loop for high risk, and human-only for critical decisions. The key is defining clear escalation triggers.

---

## What comes next

You now have the three pillars of responsible AI: security (protecting against attack), governance (controlling operations), and ethics (ensuring what is right). In **Application A**, you will apply all three by conducting a comprehensive security audit of your system. In **Application B**, you will build the ethical decision framework that makes your values operational and testable.
