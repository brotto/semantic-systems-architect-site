---
sidebar_position: 2
title: SSA for Health
---

# SSA for Healthcare

## Why healthcare needs semantic architecture

Healthcare is one of the few domains where a poorly designed AI system can directly harm or kill someone. This is not hypothetical. A triage system that underestimates severity can delay treatment for a patient having a heart attack. A summarization tool that omits a drug allergy from a medical record can lead to a fatal prescription. A decision support system that hallucinates a clinical guideline can cause a physician to administer the wrong treatment.

In most industries, AI failures produce inconvenience, lost revenue, or customer frustration. In healthcare, AI failures produce injury, disability, or death. This changes everything about how you design the system.

Think of it like the difference between building a garden shed and building a bridge. A garden shed with a slightly crooked wall is fine -- it still stores your tools. A bridge with a slightly crooked support beam collapses and kills people. Healthcare AI is bridge engineering, not shed building. Every decision in the semantic architecture must be made with the understanding that the system's outputs affect human bodies.

Three forces make SSA indispensable in healthcare:

### Clinical safety

Every output of a clinical system must be safe. Not "usually safe" or "safe on average" -- safe in every individual case. This means the system must know when it doesn't know, must escalate when it is uncertain, and must never present a guess as a fact. Safety is not a feature you add later. It is the foundation on which everything else is built.

### Traceability

When a clinical decision is made, every stakeholder -- the patient, the physician, the hospital, the regulator -- needs to understand how that decision was reached. What data was considered? What rules were applied? What alternatives were evaluated? Why was this path chosen? A clinical AI system that cannot answer these questions is a liability, not an asset.

### Regulatory compliance

Healthcare is one of the most heavily regulated industries in the world. In the United States, HIPAA governs patient data privacy. FDA regulations govern clinical decision support tools. CMS rules govern billing and reimbursement. In the EU, GDPR adds data protection requirements, and the MDR (Medical Device Regulation) may classify AI tools as medical devices. A semantic architecture for healthcare must encode these regulatory requirements as hard constraints -- rules the system can never violate regardless of the situation.

---

## Priority use cases

Healthcare is vast. You could apply SSA to hospital logistics, insurance claims, pharmaceutical research, or public health surveillance. But the highest-impact use cases -- where SSA delivers the most value relative to the risk -- cluster around clinical decision support.

### 1. Symptom triage

A patient presents with a set of symptoms. The system must assess severity, identify possible conditions, and route the patient to the appropriate level of care: self-care advice, primary care appointment, urgent care visit, or emergency department.

This is the most common entry point for clinical AI and also the most dangerous. A triage system that tells a patient with chest pain to "take an aspirin and rest" when they are having a myocardial infarction can be fatal. The SSA's job is to design the ontology, constraints, and escalation protocols that make this impossible.

### 2. Medical record summarization

A physician needs a concise summary of a patient's history before an appointment. The patient has visited multiple specialists, taken various medications, and had several procedures over the past five years. The system must synthesize this information into a structured, accurate summary that highlights what matters for the current visit.

The risk here is omission. If the summary fails to mention a known drug allergy, or a previous adverse reaction, or an ongoing treatment from another specialist, the physician may make decisions based on incomplete information. The ontology must ensure that safety-critical information is always surfaced, regardless of how the summary is formatted.

### 3. Clinical decision support

A physician is evaluating treatment options for a patient. The system provides evidence-based recommendations, cross-references clinical guidelines, checks for contraindications, and flags potential drug interactions. The system does not make the decision -- it provides the physician with structured information to support their decision.

The critical constraint here is transparency. Every recommendation must be traceable to a specific guideline, study, or protocol. The system must never present an AI-generated inference as if it were an established clinical fact.

### 4. Medication interaction checking

A physician prescribes a new medication. The system checks the new prescription against the patient's current medications, allergies, diagnoses, and lab results. It flags potential interactions, contraindications, and dosage concerns.

This is a well-defined problem with clear data sources (drug interaction databases like DrugBank) and clear rules (interaction severity levels, contraindication categories). It is an excellent candidate for SSA because the ontology is relatively standardized and the constraints are mostly hard constraints.

---

## Domain-specific ontology

Healthcare has some of the most complex domain ontologies of any industry. Fortunately, much of the work has already been done. Standard clinical terminologies exist and should be referenced -- not reinvented.

### Core clinical entities

```
Patient
  - id, name, date_of_birth, sex, blood_type
  - allergies: list of known allergies with severity
  - current_medications: list with dosages and start dates
  - active_conditions: list of current diagnoses
  - insurance_status, primary_physician
  - States: active, discharged, transferred, deceased

Symptom
  - name, body_system, severity (mild/moderate/severe)
  - onset (acute/gradual), duration
  - associated_symptoms: list
  - red_flags: boolean indicators for emergency signs

Condition (Diagnosis)
  - name, ICD-10_code, category (acute/chronic/congenital)
  - severity, stage (if applicable)
  - status: suspected, confirmed, ruled_out, resolved

Medication
  - name, drug_class, route (oral/IV/topical)
  - dosage, frequency, duration
  - contraindications: list of conditions or drugs
  - interaction_warnings: list with severity levels

Procedure
  - name, CPT_code, type (diagnostic/therapeutic/surgical)
  - body_system, risk_level
  - prerequisites: list of required tests or conditions

Clinical Encounter
  - id, patient_id, provider_id, date_time
  - type (office_visit/ER/telehealth/inpatient)
  - chief_complaint, assessment, plan
  - States: scheduled, in_progress, completed, documented

Clinical Alert
  - type (drug_interaction/allergy/critical_value/red_flag)
  - severity (informational/warning/critical/blocking)
  - source_data, triggered_rule
  - acknowledged_by, action_taken

Escalation
  - trigger_reason, urgency_level
  - from_agent, to_role (nurse/physician/specialist/ER)
  - patient_context_snapshot, time_constraint
```

### Standard terminology references

Do not invent your own medical vocabulary. Reference established systems:

- **ICD-10/ICD-11** for diagnoses and conditions. When the system identifies a condition, it should map to an ICD code.
- **SNOMED CT** for clinical terms. SNOMED provides a comprehensive, multilingual clinical terminology.
- **RxNorm** for medications. RxNorm provides normalized names for drugs and links to interaction databases.
- **CPT codes** for procedures. These are essential for billing and documentation.
- **LOINC** for laboratory tests and results.

Your ontology does not need to include these entire systems. But every clinical entity in your ontology should reference the appropriate standard code system, so that the system's outputs can be validated against established medical knowledge.

### Clinical states

Clinical entities have states that follow strict medical logic:

```
Condition lifecycle:
  suspected --> under_investigation --> confirmed --> in_treatment --> resolved
  suspected --> under_investigation --> ruled_out
  confirmed --> in_treatment --> chronic (never resolves)
  Any state --> emergency (if acute deterioration)

Invalid transitions:
  - ruled_out cannot become confirmed without new evidence
  - resolved cannot become in_treatment without re-diagnosis
  - chronic cannot become resolved (by definition)
```

Getting state transitions right is critical. A system that marks a chronic condition as "resolved" will stop monitoring it. A system that allows a ruled-out condition to reappear without new evidence will confuse clinicians.

---

## Domain-specific constraints

Healthcare constraints are dominated by hard constraints -- rules that absolutely cannot be broken. This is unusual. In most domains, the balance is roughly 60% soft constraints and 40% hard. In healthcare, it is closer to the reverse.

### Hard constraints (non-negotiable)

**Patient safety constraints:**
- The system must never recommend a medication to which the patient has a documented allergy
- The system must never dismiss a red-flag symptom (chest pain, sudden severe headache, difficulty breathing, signs of stroke) without escalation
- The system must always disclose its confidence level. It must never present an uncertain assessment as a definitive conclusion
- The system must escalate to a human clinician whenever clinical uncertainty exceeds a defined threshold

**Clinical protocol constraints:**
- Triage classifications must follow established protocols (e.g., Emergency Severity Index -- ESI levels 1-5)
- Drug dosage recommendations must fall within published therapeutic ranges for the patient's age, weight, and renal/hepatic function
- Clinical summaries must include all active medications, known allergies, and unresolved conditions -- omission of any of these is a system failure

**Privacy and regulatory constraints:**
- Patient data must never be exposed to unauthorized parties (HIPAA)
- The system must log every access to patient records with user identity and timestamp
- Clinical data must not be used for purposes beyond the patient's care without explicit consent
- De-identification must be complete before any data is used for analytics or system improvement

### Soft constraints (adjustable)

- Summary length and format preferences (a physician may prefer bullet points, another may prefer narrative)
- Alert threshold sensitivity (some clinicians want more alerts, some want fewer -- as long as critical alerts are never suppressed)
- Communication tone (formal vs. conversational for patient-facing interactions)
- Documentation detail level (more or less context in clinical notes, depending on the practice)

The key rule: **no soft constraint can ever override a hard constraint.** A clinician's preference for fewer alerts cannot suppress a critical drug interaction warning. A summary format preference cannot cause the omission of a known allergy.

---

## Agent architecture for clinical systems

Clinical AI systems benefit from a multi-agent architecture where each agent has a clear, narrow responsibility. This separation of concerns is not just a design preference in healthcare -- it is a safety requirement. When responsibilities are separated, failures are contained. A bug in the summarization agent cannot cause the safety checker to miss a drug interaction.

### Agent: Triage Intake

**Role:** Collect and structure the patient's presenting symptoms.

**Input:** Patient-reported symptoms (free text or structured questionnaire).

**Output:** A structured symptom profile with severity assessment, onset information, associated symptoms, and identified red flags.

**Key behavior:** This agent asks clarifying questions when symptom descriptions are vague. If a patient says "I feel bad," the agent probes for specifics: location of discomfort, duration, severity on a scale, associated symptoms. It never guesses. If a red-flag symptom is identified at any point, it immediately triggers escalation regardless of the questionnaire's completion status.

### Agent: Clinical Reasoner

**Role:** Map the structured symptom profile to possible conditions and recommended care levels.

**Input:** Structured symptom profile from Triage Intake, plus relevant patient history (medications, conditions, allergies).

**Output:** A prioritized list of possible conditions with confidence levels, and a recommended care level (self-care, primary care, urgent care, emergency).

**Key behavior:** This agent applies clinical reasoning rules derived from established protocols. It explicitly states its confidence level for each assessment. When multiple conditions are possible, it lists them in order of severity (not probability), because the cost of missing a severe condition is far higher than the cost of over-triaging.

### Agent: Safety Guard (Guardrail)

**Role:** Review every output before it reaches a clinician or patient, checking for safety violations.

**Input:** Any output from any other agent, plus the patient's safety profile (allergies, contraindications, active alerts).

**Output:** Approved output (unchanged), modified output (with safety annotations), or blocked output (with explanation of the safety concern).

**Key behavior:** This agent is the last checkpoint. It verifies that no output contradicts a hard constraint. It checks medication recommendations against allergy records. It verifies that red-flag symptoms have triggered appropriate escalation. It confirms that confidence levels are stated. If any safety rule is violated, the output is blocked -- not modified, not flagged, but stopped.

Think of this agent as the braking system in a car. The driver (the other agents) decides where to go and how fast to drive. The brakes exist for one purpose: to prevent the car from going where it shouldn't. The braking system doesn't navigate. It doesn't optimize the route. It stops the car when stopping is necessary.

### Agent: Human Escalation

**Role:** Transfer the case to a human clinician when automated handling is insufficient.

**Input:** Escalation trigger (from any agent), patient context snapshot, urgency level.

**Output:** A structured handoff package containing the patient's symptom profile, the system's assessment with confidence levels, the reason for escalation, and the recommended urgency of human review.

**Key behavior:** This agent creates a context-rich handoff so that the receiving clinician does not need to start from scratch. It includes everything the system knows and everything the system is uncertain about. It tags the urgency level so the clinician knows whether this needs attention in minutes or hours.

---

## Ethical considerations unique to healthcare

### Informed consent

Patients have the right to know when an AI system is involved in their care. The system must disclose its nature -- it is not a doctor, not a nurse, and not a substitute for professional medical judgment. This is not just an ethical obligation; in many jurisdictions, it is a legal one.

### Algorithmic bias in clinical populations

Clinical AI systems can inherit biases from training data. If training data underrepresents certain populations -- racial minorities, elderly patients, pregnant women, children -- the system's assessments may be less accurate for those groups.

The SSA must design evaluation suites that explicitly test for demographic fairness. A triage system that performs well on average but systematically under-triages chest pain in women (a documented problem in real clinical practice) is not safe. Evaluation must be disaggregated by demographic group, not just reported as an aggregate score.

### Transparency requirements

Every clinical recommendation must be explainable. "The AI said so" is never an acceptable justification for a clinical decision. The system must be able to show which data it considered, which rules it applied, and how it reached its conclusion. This traceability is essential for clinician trust, patient rights, and legal defensibility.

### The boundary of autonomy

Clinical AI systems must operate as decision support tools, not autonomous decision makers. The final clinical decision always rests with a licensed healthcare professional. The system informs; the clinician decides. This boundary must be architecturally enforced, not just documented in a disclaimer.

---

## Case study: assisted triage for an urgent care clinic

### The scenario

CityMed Urgent Care operates three clinics in a metropolitan area. They see approximately 200 patients per day across all locations. Current triage is performed by a nurse at intake, but during peak hours (evenings and weekends), the wait for triage can exceed 45 minutes. CityMed wants an AI-assisted triage system that patients can use while waiting, so that high-severity cases are identified and escalated immediately.

### The design challenge

The system must balance two competing pressures:
- **Safety:** it must never under-triage a serious condition. A patient with chest pain must be flagged for immediate attention even if the waiting room is full.
- **Efficiency:** it must be accurate enough to reduce unnecessary escalations. If it escalates everything, it provides no value.

### Ontology decisions

The SSA identifies 12 core entities for this system: Patient, Symptom, SymptomCluster, RedFlag, TriageLevel, CareRecommendation, ClinicalAlert, Encounter, VitalSign, MedicalHistory, Medication, and Escalation.

Key design decisions:

- **TriageLevel** uses ESI (Emergency Severity Index) levels 1-5, not a custom scale. This ensures compatibility with existing clinical protocols and nurse training.
- **RedFlag** is a separate entity, not just an attribute of Symptom. This makes red flags first-class citizens that trigger automatic escalation regardless of the overall triage assessment.
- **SymptomCluster** groups related symptoms into clinically meaningful patterns. "Chest pain + shortness of breath + sweating" is not three separate symptoms -- it is a cluster that suggests acute coronary syndrome.

### Constraint architecture

Hard constraints:
- Red-flag symptoms always escalate to ESI level 1 or 2, regardless of other factors
- No triage recommendation is issued without confirming current medications and known allergies
- Every triage output includes a confidence level and a disclaimer that this is decision support, not a diagnosis
- Patient data is encrypted at rest and in transit, with access logged

Soft constraints:
- Triage questionnaire adapts language complexity based on patient age and stated preferences
- Summary format follows clinic-specific templates (adjustable per location)

### Agent topology

```
Patient input --> [Triage Intake Agent] --> structured symptom profile
                                              |
                                              v
                  [Clinical Reasoner Agent] --> triage assessment + care recommendation
                                              |
                                              v
                  [Safety Guard Agent] --> validated output OR blocked output
                                              |
                         +--------------------+--------------------+
                         |                                         |
                    (if safe)                                 (if blocked)
                         |                                         |
                    Deliver to                              [Escalation Agent]
                    patient/nurse                                  |
                                                            Immediate nurse
                                                            notification
```

### Evaluation design

The eval suite contains 60 test cases:
- 20 common presentations (colds, minor injuries, stomach issues) -- expected ESI 4-5
- 15 moderate presentations (infections, sprains, moderate pain) -- expected ESI 3
- 15 serious presentations (chest pain, stroke symptoms, severe allergic reactions) -- expected ESI 1-2
- 10 ambiguous presentations (symptoms that could be benign or severe) -- expected escalation to human

Key metrics:
- **Sensitivity for critical cases:** the system must identify at least 99% of ESI 1-2 cases. A single missed heart attack in production is unacceptable.
- **Specificity for routine cases:** the system must correctly classify at least 85% of ESI 4-5 cases without unnecessary escalation.
- **Red-flag detection rate:** 100%. This is not a target -- it is a requirement. Every red-flag symptom must trigger escalation, every time.
- **Confidence calibration:** when the system says it is 80% confident, it should be correct approximately 80% of the time.

### Lessons from this case study

1. **Safety constraints came first.** The ontology and agent architecture were designed around safety requirements, not around efficiency goals. Efficiency is important, but it is always secondary to safety.
2. **Standard terminologies prevented reinvention.** Using ESI levels and ICD codes connected the system to established clinical practice rather than creating an isolated AI vocabulary.
3. **The Safety Guard is architecturally separate.** It cannot be bypassed, overridden, or disabled by other agents. This separation is a design decision, not just a good practice.
4. **Evaluation is asymmetric.** The system is evaluated more harshly on missed critical cases than on over-triaging routine cases. This asymmetry reflects the real-world cost structure: under-triaging can kill; over-triaging is merely inconvenient.

---

## Next step

Apply what you've learned in the [Healthcare Lab](./lab-saude), where you'll build an assisted triage flow from scratch.
