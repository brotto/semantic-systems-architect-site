---
sidebar_position: 7
sidebar_label: "Assessment"
---

# Module 7 — Assessment

## What you should have produced

By completing this module, you should have the following artifacts:

| # | Artifact | Source |
|---|---|---|
| 1 | Threat model with asset inventory, attack surface map, STRIDE-based threat enumeration, and mitigation plan | Lesson 1 practice activity |
| 2 | Governance model with access controls, audit trail design, compliance traceability, and change management process | Lesson 2 practice activity |
| 3 | Ethical audit with stakeholder impacts, bias assessment, transparency requirements, and human oversight levels | Lesson 3 practice activity |
| 4 | Complete security assessment with 12+ threats, risk matrix, and actionable mitigation plan | Application A |
| 5 | Ethical decision framework with principles, bias tests, transparency protocols, oversight model, and trade-off register | Application B |

---

## Assessment rubric

Each dimension is scored **0, 1, or 2**. Total possible: **10 points**. Passing threshold: **8/10**.

### Dimension 1: Threat model completeness (0-2)

| Score | Description |
|---|---|
| **0** | No threat model exists, or it lists only generic threats without connecting them to the specific system. Fewer than 5 threats. No risk assessment. |
| **1** | Threat model exists with 8+ threats covering at least 4 STRIDE categories. Some threats are specific to the system. Likelihood and impact are assessed but justifications are thin. Mitigations exist for high-risk threats but lack depth. |
| **2** | Comprehensive threat model with 12+ threats covering all 6 STRIDE categories. Threats are specific to the system's agents, tools, and data flows. Each threat has justified likelihood and impact scores. Mitigations are layered (preventive + detective + corrective) for critical threats. Attack surfaces are thoroughly mapped. An implementer could build the defenses from this document. |

### Dimension 2: Governance and control practicality (0-2)

| Score | Description |
|---|---|
| **0** | No governance structure defined. Access controls are absent or vague ("agents should only access what they need" without specifying what that is). No audit trail design. No change management process. |
| **1** | Access control matrix exists but is incomplete (some agents or tools are not covered). Audit trail is defined but missing key fields (no reasoning capture, no decision inputs). Change management exists but does not differentiate risk levels. Compliance is mentioned but not traced to specific architectural components. |
| **2** | Complete access control matrix covering every agent, every tool, and every data flow. Access is enforced at the tool level, not just the prompt level. Audit trail captures inputs, reasoning, decision, and outcome for every significant action. Change management differentiates risk levels with proportional approval, testing, and monitoring requirements. At least one compliance requirement is fully traced from regulation to architectural implementation with evidence. |

### Dimension 3: Ethical depth (0-2)

| Score | Description |
|---|---|
| **0** | No ethical analysis. Or ethics is mentioned only as a general aspiration ("we should be fair") without specific principles, tests, or measurements. No bias assessment. No stakeholder analysis. |
| **1** | Ethical principles exist but are generic (not tailored to the system). Stakeholder analysis identifies obvious groups but misses vulnerable or indirect stakeholders. Bias assessment mentions risk areas but lacks specific test cases. Transparency requirements exist but are incomplete (missing some scenario types). |
| **2** | 4+ ethical principles tailored to the specific system, each with concrete test questions and measurable metrics. Stakeholder map includes 5+ groups including vulnerable and indirect stakeholders with honest impact assessment. Bias assessment covers 4+ risk areas with specific test case pairs. Transparency protocols define exactly what is communicated for each outcome type. Ethical trade-offs are documented honestly — the framework acknowledges genuine tensions rather than claiming everything is solved. |

### Dimension 4: Human oversight design (0-2)

| Score | Description |
|---|---|
| **0** | No human oversight considered. The system operates fully autonomously with no escalation paths. Or oversight is mentioned but no specific triggers, processes, or roles are defined. |
| **1** | Oversight levels are assigned to some decisions but not all. Escalation triggers exist but are vague ("when the agent is unsure"). Human review processes are defined but lack detail on what information the reviewer receives and what actions they can take. |
| **2** | Every significant decision type is assigned an appropriate oversight level (0-3) with justification. Escalation triggers are specific and measurable (financial thresholds, confidence scores, policy edge cases). The escalation information package is defined — reviewers know exactly what they receive and what they can do. The oversight model scales appropriately: low-risk decisions are autonomous, high-risk decisions require human approval. Override authority and audit requirements are specified for each level. |

### Dimension 5: Security-ethics integration (0-2)

| Score | Description |
|---|---|
| **0** | Security and ethics are treated as completely separate concerns. The threat model ignores ethical risks. The ethical framework ignores security threats. No connection between the two. |
| **1** | Some connection exists between security and ethics (for example, the threat model mentions privacy, or the ethical framework mentions data protection). But the integration is shallow — the two documents could have been written by different people who never talked. |
| **2** | Security and ethics are integrated throughout. The threat model includes threats to fairness and transparency (not just to confidentiality and availability). The ethical framework includes security mechanisms as safeguards for ethical principles. Access controls serve both security and privacy. Audit trails serve both compliance and accountability. The system is designed as a whole, not as separate security and ethics layers bolted together. |

---

## Self-assessment checklist

### Lessons

- [ ] I can identify the four major AI-specific threat categories (prompt injection, data poisoning, model manipulation, social engineering)
- [ ] I can apply the STRIDE framework to AI systems and enumerate specific threats
- [ ] I can design layered defenses that combine preventive, detective, and corrective controls
- [ ] I understand the principle of least privilege and can apply it to agent access control
- [ ] I can design audit trails that capture decisions, reasoning, and accountability
- [ ] I understand change management and why different risk levels require different processes
- [ ] I can identify five sources of bias in AI systems
- [ ] I understand the differences between fairness metrics and why they can conflict
- [ ] I can design transparency protocols that inform people about decisions affecting them
- [ ] I can assign appropriate human oversight levels based on decision risk

### Application A — Security audit

- [ ] My threat model has 12+ threats covering all 6 STRIDE categories
- [ ] Each threat is specific to my system (not generic AI threats)
- [ ] I have mapped at least 5 attack surfaces with existing defenses documented
- [ ] My risk matrix plots all threats by likelihood and impact
- [ ] Critical and priority threats have layered mitigations
- [ ] I have defined at least 5 monitoring requirements for threat detection
- [ ] Known gaps are honestly documented with recommendations

### Application B — Ethical framework

- [ ] I have defined 4+ ethical principles tailored to my system
- [ ] Each principle has concrete test questions and measurable metrics
- [ ] My stakeholder map includes at least 5 groups including vulnerable populations
- [ ] I have assessed at least 4 bias risk areas with specific test case pairs
- [ ] Transparency protocols cover at least 3 scenario types including negative outcomes
- [ ] Human oversight is defined for at least 5 decision types across multiple levels
- [ ] I have documented at least 3 genuine ethical trade-offs with honest analysis
- [ ] An ethical review process is defined with regular and trigger-based reviews

---

## What passing means

Scoring **8/10 or higher** means you can:

- Design threat models that identify and prioritize AI-specific vulnerabilities with actionable mitigations
- Build governance structures that enforce access control, maintain audit trails, satisfy compliance requirements, and manage change safely
- Conduct ethical audits that reveal bias, define fairness, require transparency, and establish human oversight
- Integrate security and ethics into a coherent system design rather than treating them as afterthoughts

---

## If you don't pass

- **Low on threat model completeness:** revisit your system architecture and walk through each data flow from input to output. At each step, ask: "What could go wrong here? Who would do it? How?" Use the STRIDE categories as a checklist — if you have no threats in a category, you have not looked hard enough.

- **Low on governance practicality:** the most common gap is vague access controls. Go back to each agent and list exactly which tools and data fields it can access. If you cannot list them precisely, your access control is too vague. For audit trails, ask: "If this decision is wrong, can I reconstruct what happened and why?" If not, add more fields.

- **Low on ethical depth:** generic principles are the most common problem. Take each principle and apply it to a specific decision your system makes. If the principle does not tell you what to do in that specific case, it is too vague. Rewrite it until it gives actionable guidance. For bias assessment, create actual test case pairs and mentally run them through your system.

- **Low on human oversight:** check whether you have escalation triggers for every high-risk decision. If an agent can approve a $1,000 refund without human review, ask why. If an agent can deny service without explanation, ask why. Match oversight level to risk level for every decision type.

- **Low on integration:** read your security audit and ethical framework side by side. Does the security audit mention privacy and fairness? Does the ethical framework mention defense against attacks that undermine ethical principles? If they read like separate documents, add cross-references and shared concerns.

---

## Bridge to Module 8

You now have a system that is designed (Modules 1-4), instructed (Module 5), measured (Module 6), and protected (Module 7). The architecture is complete.

But an architecture is not a product. A design is not a deployment. A system on paper is not a system in the world.

**Module 8 — Product, Operations and Scale** connects everything you have built to the real world: how the system creates value for users and organizations, how it is operated and maintained in production, and how it scales to handle growth without losing quality, security, or ethical integrity. If Modules 1-7 asked "how should this system be built?", Module 8 asks "how does this system live?"
