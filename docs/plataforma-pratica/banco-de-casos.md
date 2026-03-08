---
sidebar_position: 2
title: Case Bank
---

# Case Bank

## What is a case

A case is the standardized unit of practice in the SSA platform. Think of it like a clinical case in medical training. A medical student does not learn surgery by reading about anatomy alone. They study structured clinical cases: a patient with specific symptoms, a medical history, test results, constraints, and the student must formulate a diagnosis and treatment plan. The case is realistic enough to teach, structured enough to evaluate, and contained enough to practice.

An SSA case works the same way. It describes a scenario where a semantic architecture is needed, provides enough context and data to work with, defines what good behavior looks like, and establishes clear criteria for evaluating the solution. Cases are the raw material for individual practice, team training, architecture validation, and community benchmarking.

A good case is not a toy example. It captures the messiness, ambiguity, and trade-offs of real-world problems, but packages them in a format that makes learning possible.

---

## Case structure

Every case in the bank follows a standardized structure. This consistency is deliberate. Just as medical records follow a standard format so any doctor can quickly understand a patient's situation, SSA cases follow a standard format so any practitioner can quickly understand the challenge and start working.

### Required fields

**id** -- A unique identifier for the case, following the pattern `CASE-[domain]-[number]`. Example: `CASE-HEALTH-042`. This makes cases easy to reference in evals, discussions, and capstones.

**domain** -- The industry or application area the case belongs to. Healthcare, legal, customer support, e-commerce, education, finance, human resources, or any other domain where semantic architectures apply.

**scenario** -- A narrative description of the situation. This is the "story" of the case: who needs the system, what problem they face, what the current situation looks like, and what constraints exist. A good scenario reads like a project brief you might receive from a real client. It should be 200 to 500 words long, rich enough to give context, focused enough to stay tractable.

**input_data** -- The data, documents, policies, or knowledge artifacts that the practitioner receives to work with. This might include sample customer complaints, policy documents, domain terminology lists, process descriptions, or example interactions. Input data makes the case concrete rather than abstract.

**expected_behavior** -- A description of what a well-designed system should do when operating correctly. This is not a single "right answer" but rather a set of behavioral expectations. For example: "The system should correctly classify complaint severity in at least 90% of test interactions" or "The agent should escalate to a human whenever the customer mentions legal action."

**constraints** -- Boundaries that the solution must respect. These might include regulatory requirements ("must comply with HIPAA"), business rules ("never offer more than 20% discount without approval"), safety limits ("never provide medical diagnoses"), technical boundaries ("must operate within 500ms latency"), or ethical guardrails ("must not use demographic data for prioritization").

**evaluation_criteria** -- The rubric that will be used to assess solutions. This is a structured list of dimensions with scoring criteria. Typical dimensions include semantic accuracy, constraint compliance, architecture coherence, edge-case handling, and operational viability. Each dimension should have clear descriptions of what constitutes poor, acceptable, good, and excellent work.

**difficulty** -- One of three levels: beginner, intermediate, or advanced. This tells practitioners what to expect in terms of domain complexity, number of interacting constraints, ambiguity in the scenario, and architectural sophistication required.

### Optional fields

**skill_focus** -- Which SSA competency the case primarily exercises: ontology design, agent architecture, context engineering, workflow design, evaluation design, security and governance, or operations. A case can have multiple skill focuses, but naming the primary one helps practitioners find cases that target their growth areas.

**related_cases** -- Links to other cases that form a natural learning sequence or explore the same domain from different angles.

**author_notes** -- Guidance from the case author about common pitfalls, interesting variations, or pedagogical intent behind the case design.

---

## Case categories

The Case Bank is organized along three dimensions, and practitioners can filter by any combination of them.

### By domain

- **Healthcare** -- Clinical protocols, patient triage, medication management, appointment scheduling, medical records summarization
- **Legal** -- Contract analysis, compliance checking, legal research assistance, document review, regulatory interpretation
- **Customer support** -- Ticket classification, resolution routing, escalation protocols, knowledge base management, multi-channel coordination
- **E-commerce** -- Product recommendation, order management, return processing, fraud detection, inventory coordination
- **Education** -- Content personalization, assessment design, student support, curriculum mapping, learning analytics
- **Finance** -- Risk assessment, compliance monitoring, customer onboarding, fraud investigation, regulatory reporting
- **Human resources** -- Candidate screening, policy interpretation, employee support, performance assessment, benefits administration

### By complexity

**Beginner cases** involve a single domain, clear constraints, limited ambiguity, and straightforward evaluation criteria. A beginner case might ask you to design an ontology for a simple FAQ bot or create a context package for a single-purpose agent. These cases are ideal for practitioners who have completed the first two or three modules of the SSA learning track.

**Intermediate cases** introduce cross-domain complexity, competing constraints, ambiguous edge cases, and multi-agent coordination needs. An intermediate case might ask you to design an architecture for a support system that handles both technical troubleshooting and billing disputes, requiring different agents with different knowledge and different escalation paths. These cases match practitioners who have completed most of the learning track.

**Advanced cases** present production-scale challenges with regulatory pressure, safety-critical scenarios, complex governance requirements, multi-stakeholder coordination, and operational resilience needs. An advanced case might describe a healthcare triage system that must comply with regulatory frameworks, handle life-threatening emergencies differently from routine inquiries, coordinate between AI agents and human clinicians, and maintain full auditability. These cases are designed for experienced practitioners and capstone-level work.

### By skill focus

- **Ontology design** -- Cases that primarily challenge your ability to decompose a domain into well-structured semantic models
- **Agent architecture** -- Cases centered on designing agent roles, coordination protocols, and delegation patterns
- **Context engineering** -- Cases focused on packaging the right information in the right format for the right moment
- **Workflow design** -- Cases about designing multi-step processes with branching, error handling, and human-in-the-loop checkpoints
- **Evaluation design** -- Cases where the primary challenge is defining how to measure whether the system works correctly
- **Security and governance** -- Cases focused on threat modeling, access control, audit requirements, and ethical guardrails
- **Operations** -- Cases about deployment strategies, monitoring, incident response, and scaling semantic architectures

---

## How to use cases

### Individual practice

Pick a case that matches your current level and the skill you want to develop. Read the scenario thoroughly. Study the input data. Then design your solution without looking at any reference answers. After you finish, run the evaluation criteria against your own work. Be honest about where you scored well and where you fell short. This self-assessment habit is one of the most valuable things the Case Bank teaches.

### Team training

A team lead selects a case and assigns it to the entire team. Each member works independently, then the team meets to compare approaches. The structured evaluation criteria give the discussion a concrete foundation. Instead of vague debates about whose approach is "better," the team scores each solution against the same rubric and discusses the differences.

### Architecture validation

When you are building a real system, find cases in the same domain and at a similar complexity level. Work through them as a warm-up before starting your actual architecture. The cases will surface domain-specific challenges you might not have considered, edge cases you need to handle, and constraints you should verify with your stakeholders.

### Benchmarking

Organizations can use a standard set of cases to benchmark their teams' SSA capabilities over time. Run the same case set every quarter, track scores across the evaluation dimensions, and watch where improvement happens and where it stalls.

---

## Quality criteria for cases

Not every scenario makes a good case. The community maintains quality standards to ensure the Case Bank remains a reliable learning resource.

**Realism** -- The scenario must be grounded in plausible real-world situations. Fantasy scenarios with no practical analog dilute the bank's value. A good case should feel like something a practitioner might actually encounter in professional work.

**Clarity** -- The scenario, constraints, and evaluation criteria must be unambiguous enough that two different practitioners reading the same case would understand the challenge in the same way. This does not mean eliminating all ambiguity from the scenario itself. Real problems are ambiguous. But the case structure must be clear about what is intentionally ambiguous (part of the challenge) and what is fixed.

**Pedagogical value** -- The case must teach something specific. It should exercise identifiable skills and confront practitioners with decisions that have non-obvious trade-offs. A case where the "right answer" is obvious has no teaching value.

**Evaluation readiness** -- The evaluation criteria must be specific enough to produce consistent scores across different evaluators. If two experienced SSAs would score the same solution very differently using the provided rubric, the rubric needs refinement.

**Appropriate scoping** -- The case must be solvable within a reasonable time frame. Beginner cases should take 2 to 4 hours. Intermediate cases should take 4 to 8 hours. Advanced cases should take 8 to 20 hours. A case that requires months of work is a capstone project, not a case.

---

## Example case template

Below is a complete example showing how a case looks when properly structured.

```yaml
id: CASE-SUPPORT-017
domain: customer-support
difficulty: intermediate
skill_focus: [agent-architecture, context-engineering]
title: "Multi-tier support with escalation for a SaaS billing system"

scenario: |
  A mid-size SaaS company serving 12,000 business customers receives
  approximately 400 support tickets per day. Tickets fall into three
  categories: technical issues (45%), billing questions (35%), and
  account management requests (20%).

  The company wants to deploy an AI-powered support system that handles
  routine inquiries autonomously while escalating complex or sensitive
  issues to human agents. The billing category is particularly sensitive
  because errors can lead to customer churn and, in some cases, legal
  disputes over contract terms.

  The system must integrate with the existing CRM, billing platform,
  and knowledge base. Human agents should receive full context when a
  ticket is escalated, including the AI's preliminary analysis and
  any customer interaction history.

input_data:
  - "50 sample support tickets across all three categories"
  - "Company refund and billing adjustment policies (3-page document)"
  - "SLA definitions by customer tier (Gold, Silver, Bronze)"
  - "Escalation rules currently used by the human team"
  - "Sample knowledge base articles (15 articles)"

expected_behavior:
  - "Correctly classify ticket category with at least 92% accuracy"
  - "Resolve routine billing inquiries without human intervention"
  - "Escalate all tickets mentioning legal action or contract disputes"
  - "Provide human agents with structured context on escalation"
  - "Respect SLA response times by customer tier"
  - "Never modify billing records without human approval"

constraints:
  - "Must comply with the company's data retention policy"
  - "Must not share one customer's data with another"
  - "Billing adjustments above $500 require human approval"
  - "System must operate within 3-second response latency"
  - "All AI decisions must be logged for audit purposes"

evaluation_criteria:
  semantic_accuracy:
    weight: 25
    description: "How well the ontology captures the support domain"
  constraint_compliance:
    weight: 25
    description: "Whether all stated constraints are enforced"
  architecture_coherence:
    weight: 20
    description: "Quality of agent roles, coordination, and escalation"
  edge_case_handling:
    weight: 15
    description: "How the system handles ambiguous or unusual tickets"
  operational_viability:
    weight: 15
    description: "Feasibility of deployment, monitoring, and maintenance"

author_notes: |
  This case deliberately creates tension between efficiency (resolving
  tickets fast) and safety (never making billing errors). Strong solutions
  will show clear decision boundaries for when the AI should act
  autonomously versus when it should involve a human. Watch for solutions
  that over-escalate (safe but defeats the purpose) or under-escalate
  (efficient but risky).

related_cases:
  - CASE-SUPPORT-003  # Single-tier support basics
  - CASE-SUPPORT-011  # SLA-driven prioritization
  - CASE-LEGAL-008    # Contract dispute handling
```

---

## Assets and resources

The following templates and samples are available in the community repository:

- `community-assets/case-bank/template-case.yaml` -- Empty case template with all fields and inline documentation
- `community-assets/case-bank/samples/` -- Directory of completed example cases across domains and difficulty levels
- `community-assets/case-bank/rubric-guide.md` -- Guide for writing clear, consistent evaluation criteria
- `community-assets/case-bank/domain-glossaries/` -- Domain-specific terminology references to help case authors write realistic scenarios

---

## Contributing cases

The Case Bank grows through community contributions. If you have a scenario from your professional experience (appropriately anonymized), a domain you know well enough to create realistic challenges, or a pedagogical idea you want to test, consider submitting a case.

The detailed submission process, quality requirements, and review workflow are described in [How to Submit](./como-submeter).
