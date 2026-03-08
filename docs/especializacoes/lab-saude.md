---
sidebar_position: 3
title: Lab Health
---

# Lab SSA -- Healthcare

## The challenge

You are the Semantic Systems Architect for BrightCare, a network of walk-in urgent care clinics. BrightCare sees approximately 150 patients per day and currently relies on a nurse at the front desk to perform initial triage. During peak hours, patients wait up to 40 minutes before anyone assesses whether their condition is urgent.

BrightCare has asked you to design an AI-assisted triage system that patients interact with upon arrival (via a tablet in the waiting area). The system must classify the patient's presenting symptoms, assign a preliminary severity level, and immediately alert clinical staff when a high-risk case is detected.

Your job is not to build the software. Your job is to design the complete semantic architecture: the ontology, the constraints, the agent topology, the escalation protocol, and the evaluation framework.

---

## What makes this hard

This challenge combines several difficulties that do not appear in non-clinical domains:

**Asymmetric cost of errors.** Missing a critical case (under-triaging a heart attack) is catastrophically worse than over-triaging a mild case (sending a cold patient to fast-track). Your entire architecture must reflect this asymmetry. Every design decision should ask: "What happens when this fails?"

**Incomplete information.** Patients are not medical professionals. They describe symptoms in everyday language ("my chest feels funny" instead of "substernal pressure with radiation to the left arm"). They may forget to mention medications. They may not know their allergies. The system must handle vague, incomplete, and potentially inaccurate input without ever treating uncertainty as certainty.

**Red-flag immediacy.** Certain symptom patterns require immediate clinical attention -- not in 10 minutes, not after the questionnaire is complete, but now. The system must interrupt its own workflow to escalate when a red flag appears. Think of a fire alarm: it doesn't wait for you to finish cooking before it sounds.

**Regulatory and ethical boundaries.** The system must not diagnose. It must not prescribe. It must not replace clinical judgment. It supports, informs, and escalates. Drawing this line clearly in the architecture is essential.

---

## Deliverables

You must produce four artifacts. Each artifact has specific minimum requirements.

### Deliverable 1: Clinical ontology (minimum 10 entities)

Design a domain ontology that captures the essential structure of urgent care triage. Your ontology must include at least 10 entities with:

- Clearly defined attributes for each entity
- Relationships between entities (with cardinality)
- State definitions and valid transitions for entities that change over time
- At least 2 concrete examples per entity

**Required entities (you may add more):**

| Entity | Purpose |
|---|---|
| Patient | The person seeking care |
| Symptom | A reported clinical observation |
| SymptomCluster | A group of symptoms with clinical significance |
| RedFlag | A symptom or pattern requiring immediate escalation |
| TriageLevel | The assigned severity classification (ESI 1-5) |
| VitalSign | Measurable physiological parameters |
| Medication | Current medications the patient is taking |
| Allergy | Known allergic reactions |
| ClinicalAlert | A system-generated safety notification |
| Escalation | A handoff from system to human clinician |

For each entity, specify which attributes are mandatory (the system cannot proceed without them) and which are optional (valuable if available, but the system can function without them).

**Reference standards:** Your ontology should reference ICD-10 codes for conditions, RxNorm for medications, and ESI levels for triage classification. You do not need to include these entire systems -- but your entities should include fields for standard codes so that outputs can be cross-referenced against established clinical knowledge.

### Deliverable 2: Escalation protocol

Design a complete escalation protocol that defines when, how, and to whom the system escalates cases. Your protocol must include:

**Trigger conditions:**
- List every condition that triggers escalation (red-flag symptoms, low confidence scores, conflicting information, patient distress signals)
- For each trigger, specify whether escalation is immediate (interrupt workflow) or deferred (complete current step, then escalate)

**Escalation levels:**
- Define at least 3 escalation levels (e.g., nurse review within 15 minutes, physician review within 5 minutes, immediate emergency response)
- Map each trigger condition to a specific escalation level

**Handoff content:**
- Define exactly what information the receiving clinician receives in the handoff package
- Include: symptom summary, system assessment with confidence level, reason for escalation, patient history snapshot, and time elapsed since arrival

**Fallback behavior:**
- What happens if the escalation target (nurse, physician) does not acknowledge within the expected timeframe?
- What happens if the system itself fails (crashes, loses connection)?
- The default behavior in any failure mode must be: assume the worst, escalate to the highest available level

### Deliverable 3: Safety guardrails

Define the safety rules that the system must enforce. Organize them into three categories:

**Blocking rules (output is stopped):**
- The system must never assign a TriageLevel of 4 or 5 (low severity) when any red-flag symptom is present
- The system must never generate output without a stated confidence level
- The system must never suggest a medication or treatment (it performs triage, not prescription)

**Warning rules (output is annotated):**
- If the patient reports taking more than 5 concurrent medications, flag for polypharmacy review
- If the patient's reported symptoms conflict with each other (e.g., "no pain" and "severe discomfort"), flag the inconsistency
- If the patient's age falls outside the typical range for a suspected condition, flag for attention

**Logging rules (output is tracked):**
- Every triage interaction must be logged with timestamps, inputs, outputs, and confidence levels
- Every escalation must be logged with trigger reason, escalation level, and response time
- Every overridden system recommendation must be logged with the clinician's justification

### Deliverable 4: Evaluation suite

Create an evaluation suite with at least 40 test cases organized as follows:

**Common presentations (20 cases):**
Test cases representing everyday urgent care visits -- colds, minor cuts, stomach upset, mild back pain, ear infections. Expected triage level: ESI 4-5. The system should handle these efficiently without escalation.

Example test case format:
```
Case ID: COMMON-007
Patient: 34-year-old female
Symptoms: sore throat for 2 days, mild fever (38.1C), no difficulty swallowing
Medications: daily multivitamin
Allergies: none known
Expected TriageLevel: ESI 5
Expected Escalation: none
Expected Confidence: high (>85%)
```

**Edge cases (10 cases):**
Test cases with ambiguous, incomplete, or conflicting information. These test whether the system appropriately handles uncertainty.

Examples: patient who cannot describe symptoms clearly, patient who reports contradictory information, patient whose symptoms could indicate either a benign or serious condition, patient with an unusual combination of symptoms.

**Critical cases (10 cases):**
Test cases representing potentially life-threatening conditions: chest pain with cardiac risk factors, stroke symptoms (sudden weakness, speech difficulty, facial drooping), severe allergic reactions, signs of sepsis, acute abdomen.

For critical cases, the only acceptable outcome is immediate escalation. Any test case where the system fails to escalate a critical case is a system failure regardless of how well it performs on everything else.

---

## Evaluation rubric

Your lab submission is evaluated across four dimensions. Each dimension is scored from 0 to 10.

### Dimension 1: Operational safety (0-10)

| Score | Description |
|---|---|
| 0-2 | Safety rules are absent or vaguely stated. No blocking rules defined. Red flags not addressed. |
| 3-4 | Some safety rules exist but are incomplete. Red flags partially covered. No fallback behavior defined. |
| 5-6 | Safety rules cover common scenarios. Red flags addressed. Blocking rules present but not exhaustive. Fallback behavior defined but not robust. |
| 7-8 | Comprehensive safety rules. All known red flags addressed. Blocking, warning, and logging rules clearly defined. Fallback behavior handles system failures. |
| 9-10 | Safety architecture is thorough and defensible. Every hard constraint is enforceable. Failure modes default to safe states. The system is designed to fail safely rather than fail silently. |

### Dimension 2: Justification clarity (0-10)

| Score | Description |
|---|---|
| 0-2 | System outputs provide no explanation. Triage levels assigned without rationale. |
| 3-4 | Some justification provided but inconsistent. Confidence levels absent or meaningless. |
| 5-6 | Every output includes a basic rationale. Confidence levels present but not well-calibrated. |
| 7-8 | Every output includes a clear rationale citing the specific symptoms and rules that led to the assessment. Confidence levels are meaningful and well-defined. |
| 9-10 | Justifications are clinician-ready. A nurse or physician reading the system's output can immediately understand what was assessed, why, and what the system is uncertain about. Confidence levels are calibrated against clinical evidence. |

### Dimension 3: Decision traceability (0-10)

| Score | Description |
|---|---|
| 0-2 | No audit trail. Impossible to reconstruct how a decision was made. |
| 3-4 | Partial logging. Some decisions are traceable but gaps exist. |
| 5-6 | All decisions are logged with inputs and outputs. Escalation events are tracked. |
| 7-8 | Complete audit trail from patient input to system output. Every agent's contribution is traceable. Escalation chain is fully documented. |
| 9-10 | Audit trail meets regulatory requirements (HIPAA, clinical documentation standards). Any decision can be fully reconstructed from the logs, including what data was available, what rules were applied, and what alternatives were considered. |

### Dimension 4: Critical case coverage (0-10)

| Score | Description |
|---|---|
| 0-2 | Critical cases are not tested or are poorly represented. |
| 3-4 | Some critical cases tested but coverage is spotty. Major emergency presentations missing. |
| 5-6 | Common critical presentations are covered (chest pain, stroke, severe allergy). Some gaps in edge cases. |
| 7-8 | Comprehensive critical case coverage. Includes obvious presentations and atypical presentations (e.g., heart attack presenting as jaw pain and nausea rather than classic chest pain). |
| 9-10 | Critical case coverage includes typical, atypical, and demographic-specific presentations. Tests for known bias patterns (e.g., women presenting with non-classic heart attack symptoms). Includes cases where multiple conditions co-exist. |

---

## Submission checklist

Before submitting, verify:

- [ ] Ontology contains at least 10 entities with attributes, relationships, and state transitions
- [ ] Every entity includes at least 2 concrete examples
- [ ] Escalation protocol covers all identified trigger conditions
- [ ] Escalation protocol includes fallback behavior for system failures
- [ ] Safety guardrails are organized into blocking, warning, and logging categories
- [ ] No safety guardrail allows a red-flag symptom to receive a low-severity triage level
- [ ] Evaluation suite contains at least 40 test cases (20 common, 10 edge, 10 critical)
- [ ] Every critical test case expects immediate escalation
- [ ] All outputs include confidence levels and rationales
- [ ] Standard clinical terminologies (ICD-10, ESI, RxNorm) are referenced where applicable

---

## What comes next

After completing this lab, you can use your deliverables as a foundation for the capstone project if your organization operates in healthcare or a related domain. The ontology, constraints, and evaluation framework you built here can be adapted to the specific conditions of your workplace.

If you are pursuing other specializations, continue to [SSA for Legal](./ssa-para-juridico).
