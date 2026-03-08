---
sidebar_position: 6
sidebar_label: "Application B — Ethical framework"
---

# Application B — Ethical framework

## Objective

In this application, you will build a complete **ethical decision framework** for your AI system — a document that makes your values explicit, your criteria measurable, and your accountability structures clear.

Think of this as writing the code of ethics for a new profession. When medicine established its ethical framework, doctors did not just say "be good." They defined specific principles (do no harm, informed consent, autonomy, justice), created specific tests for each principle, established review processes, and built institutions to enforce them. Over centuries, these abstract principles became concrete practices: informed consent forms, ethics review boards, malpractice standards.

Your framework does the same thing for your AI system: it turns abstract values into concrete, testable, enforceable practices.

---

## The assignment

Design and document a complete ethical decision framework for the AI system you have been building throughout the course.

---

## Deliverable structure

### Section 1: System ethical profile (half page)

Before defining principles, understand the ethical landscape of your system:

```
ETHICAL PROFILE

System: [name]
Domain: [industry/context]
Decision types: [what kinds of decisions does this system make?]
Affected populations: [who is affected by these decisions?]
Power dynamics: [does the system have power over vulnerable people?]
Reversibility: [can decisions be undone?]
Scale: [how many people are affected?]
Autonomy level: [how much does the system decide on its own?]

Overall ethical risk: [Low / Medium / High / Critical]
Justification: [why this level]
```

A system that recommends movies has a different ethical profile than a system that approves loans. The framework should be proportional to the risk.

### Section 2: Stakeholder impact map (1 page)

For each group affected by your system, analyze the impacts:

```
STAKEHOLDER IMPACT MAP

Stakeholder group: [name]
  Relationship to system: [user / subject / operator / bystander]
  Positive impacts:
    - [specific benefit with explanation]
    - [specific benefit with explanation]
  Negative impacts:
    - [specific risk with explanation]
    - [specific risk with explanation]
  Vulnerability factors:
    - [what makes this group especially susceptible to harm]
  Power to respond:
    - [can they opt out? appeal? seek alternatives?]
  Priority level: [how much ethical attention this group needs]
```

Map at least 5 stakeholder groups. Include at least one group that does not directly use the system but is affected by it (for example, employees whose jobs may change, or communities whose data is processed).

### Section 3: Ethical principles (1.5 pages)

Define 4-6 ethical principles specific to your system. For each principle:

```
PRINCIPLE: [name]

Statement: [one clear sentence expressing the principle]

What this means in our system:
  - [specific behavioral requirement]
  - [specific behavioral requirement]
  - [specific behavioral requirement]

What this does NOT mean:
  - [common misinterpretation, clarified]
  - [boundary of the principle]

Test questions:
  - [question you can ask about any system decision to check
    if this principle is being upheld]
  - [another test question]

Measurement:
  - [how you would quantitatively measure adherence to
    this principle]
  - [what metric would indicate a violation]

Tension with other principles:
  - [which other principles might this conflict with, and
    when that conflict might arise]

Priority: [when this principle conflicts with others,
  how is the conflict resolved?]
```

Do not simply copy generic principles. Translate them into the specific reality of your system. "Be fair" is a starting point, not a finished principle. "Apply refund policies consistently regardless of the customer's language, communication style, or emotional tone" is a principle you can test.

### Section 4: Bias assessment (1 page)

Analyze your system for bias risk:

```
BIAS ASSESSMENT

Assessment area 1: [name]
  Type of bias risk: [training data / representation /
    measurement / aggregation / deployment]
  Description: [how bias could manifest in your system]
  Protected groups affected: [which groups]
  Detection method: [how you would find this bias]
  Example test case pair:
    Case A: [input from group A]
    Case B: [equivalent input from group B]
    Expected: [same treatment]
    Red flag: [what differential treatment would look like]
  Mitigation strategy: [what you would do if bias is found]
```

Assess at least 4 bias risk areas. Be specific to your system, not generic.

### Section 5: Transparency protocol (1 page)

Define exactly how your system communicates with the people it affects:

```
TRANSPARENCY PROTOCOL

Scenario type: [positive outcome / negative outcome /
  uncertain outcome / error]

For each scenario type, define:

Disclosure requirements:
  - What the person MUST be told: [specifics]
  - What the person SHOULD be told if they ask: [specifics]
  - What the person MUST NOT be told: [specifics, with reason]

Language requirements:
  - Reading level: [target comprehension level]
  - Jargon avoidance: [technical terms that must be translated]
  - Cultural sensitivity: [considerations for different audiences]

Response template:
  "[actual template text the agent should use, with
  placeholders for specific details]"
```

Define transparency protocols for at least 3 scenario types, including the most negative outcome your system can produce.

### Section 6: Human oversight model (1 page)

Define the oversight structure:

```
HUMAN OVERSIGHT MODEL

Decision: [specific decision the system makes]
  Oversight level: [0-3, from Lesson 3]
  Justification: [why this level is appropriate]
  Escalation triggers: [specific conditions that require
    human involvement]
  Human reviewer: [role/team responsible]
  Review process:
    - [step-by-step process for human review]
  Override authority: [can the human override the system? always?]
  Audit requirement: [what is logged about the oversight]
```

Define oversight for at least 5 different decisions your system makes, ranging from low-risk (level 0) to high-risk (level 2 or 3).

### Section 7: Ethical review process (half page)

How will your ethical framework be maintained and enforced?

```
ETHICAL REVIEW PROCESS

Regular review:
  Frequency: [monthly / quarterly]
  Reviewer: [role/team]
  Inputs: [what data and metrics are reviewed]
  Outputs: [what the review produces]

Trigger-based review:
  Triggers: [events that require immediate ethical review]
  Examples:
    - Customer complaint alleging bias or discrimination
    - Metric showing significant disparity between groups
    - New regulation or legal requirement
    - System expansion to new population or use case
  Response time: [how quickly must the review start]

Escalation path:
  Level 1: [team-level review]
  Level 2: [department-level review]
  Level 3: [organizational-level review]
  External: [when external review is needed]
```

### Section 8: Ethical trade-offs register (half page)

Document the genuine ethical tensions in your system — the places where there is no easy answer:

```
ETHICAL TRADE-OFF REGISTER

Trade-off 1: [name]
  Principles in tension: [which principles conflict]
  Description: [the specific situation where they conflict]
  Example scenario: [a concrete case]
  Current resolution: [how you currently handle this]
  Justification: [why this resolution was chosen]
  Open questions: [what remains unresolved]
  Review triggers: [when to revisit this trade-off]
```

Document at least 3 genuine trade-offs. These are the most intellectually honest and valuable parts of the framework. A system that claims to have no ethical trade-offs has not been examined seriously.

---

## Evaluation criteria

| Criterion | What "good" looks like |
|---|---|
| **Specificity** | Principles are tailored to your system, not generic platitudes. Test questions reference specific system behaviors. Bias assessments reference specific data flows and decisions. |
| **Completeness** | All 8 sections are present and substantive. At least 4 principles, 5 stakeholders, 4 bias areas, 3 transparency protocols, 5 oversight decisions, and 3 trade-offs. |
| **Testability** | Every principle has concrete test questions and measurable metrics. An evaluator could check whether the system is upholding each principle using the criteria provided. |
| **Honesty** | Trade-offs are genuinely difficult dilemmas, not straw-man problems. Gaps and uncertainties are acknowledged. The framework does not claim to solve all ethical challenges. |
| **Actionability** | A development team could implement the transparency protocols, bias detection tests, and oversight structures described in this framework. Nothing is left as "we should think about this later." |

---

## Tips for success

- **Start with the harm.** The most useful ethical frameworks start not with aspirational principles but with a clear-eyed assessment of what could go wrong. What is the worst thing your system could do? Work backward from there.

- **Talk to stakeholders.** Even as a design exercise, imagine the perspectives of different people affected by your system. What would the frustrated customer say? The overworked support agent? The privacy-conscious user? The person who does not speak the dominant language?

- **Test your principles against edge cases.** A principle that works for the easy cases but breaks on the hard cases is not a useful principle. Run your principles through the most difficult scenarios you can imagine.

- **Do not confuse fairness with equality.** Treating everyone identically is not always fair. A system that offers the same support to a visually impaired user and a sighted user may be providing equal treatment but unequal access. Fairness sometimes requires different treatment to achieve equal outcomes.

- **Document the tensions.** The ethical trade-off register is the heart of this framework. Every real system has genuine tensions between competing values. Documenting them honestly is more valuable than pretending they do not exist.
