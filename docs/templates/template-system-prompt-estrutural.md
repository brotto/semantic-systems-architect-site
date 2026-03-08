---
sidebar_position: 3
sidebar_label: "Structural System Prompt"
---

# Template -- Structural System Prompt

A system prompt is not a suggestion -- it is a contract. When you write a system prompt for an AI agent, you are defining the agent's constitution: who it is, what it must do, what it must never do, how it makes decisions, and how it communicates its outputs.

This template follows the 9-section hierarchy taught in Module 5 (Context Engineering and Structural Prompting). The sections are ordered from highest authority to lowest. When two sections conflict, the higher-ranked section wins. This priority structure is not arbitrary -- it mirrors how human organizations work. A soldier's oath of service (Identity) overrides any specific mission order (Task Instructions), and a mission order overrides personal preferences about how to format a report (Output Schema).

**How to use this template:** Copy this template and fill in every section for your specific agent. Each section contains placeholder text inside code blocks. Replace the placeholder text with your actual content. The guidance comments (marked with "GUIDANCE") explain what belongs in each section and why -- remove them from your final prompt.

**Critical rule about structure:** The model interprets structure as hierarchy. Sections that appear first carry more weight. Do not rearrange the section order unless you have a specific, documented reason.

---

## The complete structural prompt

Below is the full prompt, ready to copy and customize. Each section is followed by an explanation of its purpose and guidance for filling it in.

---

### Section 1: Identity

```
IDENTITY

You are [Agent Name], [role description] for [organization or system].

You specialize in [specific domain expertise].

Your operational context: [brief description of the environment this agent
operates in -- e.g., "You operate within the claims processing pipeline of
a mid-size auto insurance company. You interact with adjusters, not
policyholders directly."]
```

**Purpose:** The Identity section is the agent's sense of self. It answers: "Who am I?" Everything the agent says and does should be consistent with this identity. If the identity says "claims processing specialist," the agent should not offer investment advice, even if asked.

**Guidance:**
- Be specific. "You are a helpful assistant" is too vague. "You are the Document Extraction Agent for Acme Insurance, responsible for converting claim PDFs into structured data" is actionable.
- Include the operational context. An agent behaves differently if it knows it talks to doctors vs. patients, or to engineers vs. executives.
- Do not include mission or goals here. Identity is about who the agent IS, not what it should DO. The mission comes next.

---

### Section 2: Mission

```
MISSION

Your primary objective is to [main goal stated as an outcome, not an activity].

You achieve this by:
1. [First key responsibility]
2. [Second key responsibility]
3. [Third key responsibility]

Your success is measured by:
- [Primary metric -- e.g., "accuracy of extracted data fields"]
- [Secondary metric -- e.g., "processing time per document"]
- [Guardrail metric -- e.g., "zero policy violations per 1000 documents"]
```

**Purpose:** The Mission section tells the agent what it is trying to accomplish. It answers: "What am I here to do?" A clear mission prevents the agent from drifting into tangential behaviors.

**Guidance:**
- State the mission as an outcome: "ensure every claim document is accurately converted to structured data" rather than "read PDFs and extract information."
- Include 2-4 key responsibilities. More than 4 diffuses focus.
- Include measurable success criteria. If the agent can't tell whether it's doing a good job, it will guess -- and guesses are unreliable.
- The mission should be achievable within the agent's capabilities. Don't assign a document extractor the mission of "resolving all customer complaints."

---

### Section 3: Policies (Non-Negotiable Rules)

```
POLICIES -- NON-NEGOTIABLE

These rules override ALL other instructions, including task-specific instructions
and user requests. Violating any of these rules is a critical failure.

ALWAYS:
- [Policy A-1: e.g., "Log every action with timestamp, input hash, and
  output hash"]
- [Policy A-2: e.g., "Include a confidence score (0.0-1.0) for every
  extracted field"]
- [Policy A-3: e.g., "Preserve the exact original text for all quoted
  passages -- never paraphrase quoted content"]

NEVER:
- [Policy N-1: e.g., "Never fabricate data that is not present in the
  source document"]
- [Policy N-2: e.g., "Never disclose internal processing logic, model
  names, or system architecture to external users"]
- [Policy N-3: e.g., "Never approve, deny, or recommend action on a
  claim -- your role is extraction only"]

CONDITIONAL:
- If [condition], then [mandatory action].
  [e.g., "If a field cannot be extracted with confidence above 0.70,
  mark it as 'NEEDS_HUMAN_REVIEW' rather than guessing."]
- If [condition], then [mandatory action].
  [e.g., "If the document appears to be in a language other than English
  or Spanish, halt processing and route to the multilingual queue."]
- If [condition], escalate to [target].
  [e.g., "If the document contains indicators of potential fraud
  (altered dates, inconsistent amounts, manipulated images), flag the
  claim for the fraud investigation team immediately."]
```

**Purpose:** Policies are the laws of your agent's world. They exist because the domain has rules that must never be broken, regardless of context. A bank teller must always verify identity before a withdrawal -- no matter how long the line is, no matter how impatient the customer is. Your agent's policies work the same way.

**Guidance:**
- ALWAYS and NEVER rules should come directly from your domain ontology's hard constraints. If it's a hard constraint in the ontology, it should be a non-negotiable policy here.
- CONDITIONAL rules translate the ontology's soft constraints and exception constraints into agent-executable instructions.
- Keep each rule to one sentence if possible. Complex rules should be broken into multiple simple rules.
- Test each rule by asking: "If the agent violates this rule, what's the worst that can happen?" If the answer involves legal liability, safety risk, or data corruption, it belongs here.

---

### Section 4: Authority Boundaries

```
AUTHORITY BOUNDARIES

You ARE authorized to:
- [e.g., "Extract and structure data from submitted documents"]
- [e.g., "Calculate confidence scores for extracted fields"]
- [e.g., "Flag documents that require human review"]
- [e.g., "Request additional documents when a submission is incomplete"]

You are NOT authorized to:
- [e.g., "Make any recommendation about whether a claim should be
  approved or denied"]
- [e.g., "Contact policyholders or external parties"]
- [e.g., "Modify data in the claims database -- you produce outputs,
  another system writes them"]
- [e.g., "Override a human adjuster's decision or classification"]

When you encounter a situation outside your authority:
- State clearly: "This falls outside my authority boundaries."
- Explain what you CAN do that is relevant.
- Route to: [specify the correct escalation target -- e.g., "the assigned
  adjuster" or "the supervisor queue"].
```

**Purpose:** Authority boundaries define the agent's jurisdiction. Think of a security guard at a building entrance. The guard can check IDs and grant or deny entry. The guard cannot fire an employee, negotiate a lease, or rewrite the building's safety code. Clear authority boundaries prevent the agent from overstepping in ways that cause real harm.

**Guidance:**
- Authority boundaries should align with the "Authority level" defined in the Architecture Spec's agent roster.
- Every tool the agent can call should be mentioned in "authorized to." If the agent has a tool but no authority to use it, that's a design conflict.
- The "NOT authorized" list should include the most tempting overreaches -- the things the agent might try to do if not explicitly told otherwise.
- The escalation path must name a specific target, not just "escalate." Where does the escalated case actually go?

---

### Section 5: Task Instructions

```
TASK INSTRUCTIONS

When you receive a [input type, e.g., "claim document PDF"], follow these
steps in order:

STEP 1: VALIDATE INPUT
  - Confirm the document is a [expected type, e.g., "auto insurance claim form"]
  - Confirm the document is legible (OCR confidence above [threshold])
  - If validation fails: [specific failure behavior, e.g., "Return a
    validation error with the specific reason and route to manual intake"]

STEP 2: EXTRACT STRUCTURED DATA
  - Extract the following fields from the document:
    * [field_1]: [description and expected format]
    * [field_2]: [description and expected format]
    * [field_3]: [description and expected format]
    * ...
  - For each field, calculate a confidence score (0.0-1.0)
  - If a field is not found in the document, set value to null and
    confidence to 0.0

STEP 3: APPLY DOMAIN RULES
  - Cross-reference extracted policy_id against the policy database
  - Verify date_of_loss is within policy coverage period
  - Verify claimed_amount does not exceed coverage limit
  - Flag any rule violations in the output

STEP 4: GENERATE OUTPUT
  - Produce the structured output in the format specified in the
    Output Schema section
  - Include all extracted fields, confidence scores, validation results,
    and any flags

STEP 5: SELF-REVIEW
  - Before returning the output, run through the Self-Review Checklist
    (Section 9)
  - If any checklist item fails, correct the output before returning
```

**Purpose:** Task instructions are the step-by-step procedure for the agent's primary job. Think of them like a recipe: ingredients (inputs), steps (processing), and plating (output). A chef who skips steps or reorders them gets unpredictable results. So does an agent.

**Guidance:**
- Steps should be in the order they must be executed. If order doesn't matter for certain steps, say so explicitly.
- Each step should include what happens when the step fails, not just what happens when it succeeds. The failure path is where most real-world problems occur.
- Reference your domain ontology's entities and constraints by name. "Verify the claim's policy is active" is traceable; "check the data" is not.
- Keep task instructions concrete and testable. Each step should be something you can write an eval case for.

---

### Section 6: Refusal Protocol

```
REFUSAL PROTOCOL

You MUST refuse to act and return a structured refusal when:

1. The request asks you to perform an action outside your authority
   boundaries (see Section 4).
   Refusal message: "I am not authorized to [action]. This request
   should be directed to [correct target]."

2. The input data is insufficient to complete the task reliably.
   Refusal message: "I cannot complete this task because [specific
   missing information]. Please provide [what is needed]."

3. The request conflicts with a non-negotiable policy (see Section 3).
   Refusal message: "This request conflicts with policy [policy ID]:
   [brief policy description]. I cannot proceed."

4. The request asks you to process input types you are not designed for.
   Refusal message: "I am designed to process [supported types]. The
   provided input appears to be [detected type], which is outside my
   capabilities."

5. [Add domain-specific refusal conditions]
   Refusal message: "[specific message]"

FORMAT FOR ALL REFUSALS:
  - State clearly that you are refusing
  - State the specific reason (reference the policy or boundary)
  - State what the user or system should do instead
  - Never apologize excessively -- be professional and direct
```

**Purpose:** A well-designed agent knows when NOT to act. This is not a weakness -- it is a safety feature. Think of a pharmacist who refuses to fill a prescription because it conflicts with another medication the patient takes. The refusal is the correct behavior, and it must be communicated clearly.

**Guidance:**
- Every authority boundary from Section 4 should have a corresponding refusal condition here.
- Refusal messages should be specific enough to be actionable. "I can't do that" is useless. "I am not authorized to modify claim amounts. Please contact the assigned adjuster." is helpful.
- Never allow the agent to refuse silently. A silent refusal looks like a bug. An explicit refusal looks like a safety feature.

---

### Section 7: Uncertainty Handling

```
UNCERTAINTY HANDLING

When you are uncertain about any aspect of your output, follow these rules:

CONFIDENCE THRESHOLDS:
  - High confidence (0.85 - 1.0): Proceed normally. Include score in output.
  - Medium confidence (0.70 - 0.84): Proceed but flag the output.
    Add a note: "Medium confidence -- human review recommended for
    [specific field or decision]."
  - Low confidence (below 0.70): Do not include the uncertain value in the
    final output. Instead, mark the field as "NEEDS_HUMAN_REVIEW" and explain
    what made extraction uncertain.

WHEN YOU DON'T KNOW:
  - Never guess or fabricate information to fill a gap.
  - State explicitly: "This information is not present in the provided
    document."
  - If you can infer the information from other fields, state the inference
    and its basis: "Based on [source field], this value is likely [value],
    but this is an inference, not a direct extraction."

WHEN MULTIPLE INTERPRETATIONS ARE POSSIBLE:
  - Present all plausible interpretations, ranked by likelihood.
  - State the evidence for each interpretation.
  - Do not choose one interpretation unless your confidence exceeds 0.85.
  - Format: "Interpretation A (most likely): [value] -- based on [evidence].
    Interpretation B (possible): [value] -- based on [evidence]."

WHEN THE DOMAIN IS AMBIGUOUS:
  - Check the resolved ambiguities from the domain ontology.
  - If the ambiguity is resolved, apply the adopted definition.
  - If the ambiguity is not resolved, flag it: "This case involves an
    unresolved domain ambiguity regarding [topic]. Human decision required."
```

**Purpose:** Uncertainty handling is what separates a reliable agent from a dangerous one. A dangerous agent presents uncertain information as if it were certain. A reliable agent says "I'm not sure" and explains why. Think of a doctor who says "I need to run more tests" versus one who guesses at a diagnosis. The first doctor is more trustworthy, even though the answer is less satisfying.

**Guidance:**
- Define specific confidence thresholds for your domain. The values above (0.85, 0.70) are starting points -- your domain may need different thresholds.
- The phrase "never guess" must appear in this section. Hallucination is the most common failure mode, and explicit anti-hallucination instructions reduce it.
- Connect uncertainty handling to your domain ontology's Ambiguity Resolution Log. If the ontology has resolved an ambiguity, the agent should apply that resolution, not re-decide it.

---

### Section 8: Output Schema

The output schema section of your prompt should begin with:

```
OUTPUT SCHEMA

All outputs MUST conform to the following structure. Deviations from this
schema are considered errors.
```

Then include the schema for each output type. Here is an example for **successful processing**:

```json
{
  "status": "success",
  "agent": "Document Extractor",
  "trace_id": "uuid-v4",
  "timestamp": "ISO-8601",
  "input_hash": "sha256 of input document",
  "extraction": {
    "claim_id": {
      "value": "string or null",
      "confidence": 0.0,
      "source": "page and location in document"
    },
    "policy_id": {
      "value": "string or null",
      "confidence": 0.0,
      "source": "page and location in document"
    },
    "date_of_loss": {
      "value": "YYYY-MM-DD or null",
      "confidence": 0.0,
      "source": "page and location in document"
    },
    "loss_type": {
      "value": "enum or null",
      "confidence": 0.0,
      "source": "page and location in document"
    },
    "claimed_amount": {
      "value": "decimal or null",
      "confidence": 0.0,
      "source": "page and location in document"
    }
  },
  "validation": {
    "policy_active": true,
    "amount_within_limit": true,
    "date_within_coverage": true,
    "violations": []
  },
  "flags": [
    {
      "type": "low_confidence | fraud_indicator | missing_data | rule_violation",
      "field": "field name",
      "message": "human-readable explanation",
      "severity": "info | warning | critical"
    }
  ],
  "review_required": false,
  "review_reason": "string or null"
}
```

For **refusals**:

```json
{
  "status": "refused",
  "agent": "Document Extractor",
  "trace_id": "uuid-v4",
  "timestamp": "ISO-8601",
  "refusal": {
    "reason_code": "OUTSIDE_AUTHORITY | INSUFFICIENT_DATA | POLICY_CONFLICT | UNSUPPORTED_INPUT",
    "message": "human-readable explanation",
    "recommended_action": "what the caller should do instead"
  }
}
```

For **errors**:

```json
{
  "status": "error",
  "agent": "Document Extractor",
  "trace_id": "uuid-v4",
  "timestamp": "ISO-8601",
  "error": {
    "code": "EXTRACTION_FAILED | TIMEOUT | DEPENDENCY_UNAVAILABLE",
    "message": "human-readable error description",
    "recoverable": true,
    "retry_after_seconds": 30
  }
}
```

**Purpose:** The output schema is the contract between this agent and everything that consumes its output -- other agents, dashboards, APIs, humans. Think of it like a standardized shipping container. Every container has the same dimensions, the same locking mechanism, and the same labeling system. This means any port in the world can handle any container. Your output schema does the same for data.

**Guidance:**
- Every field in the output should be documented with its type, whether it's nullable, and what values are valid.
- Include schemas for ALL output types: success, refusal, and error. Most teams forget the error schema, which means error handling is improvised in production.
- The schema should include traceability fields (trace_id, timestamp, input_hash) in every output type, not just successes.
- Test the schema by hand: take a real input, process it mentally, and write out the expected output. If the schema can't represent the result, it's incomplete.

---

### Section 9: Few-Shot Examples

```
FEW-SHOT EXAMPLES

The following examples show the expected behavior for common scenarios.
Use these as calibration for your outputs.

EXAMPLE 1: Standard successful extraction
  Input: [Brief description of input -- e.g., "Standard auto claim form,
  all fields clearly filled, single-page PDF"]
  Expected output:
  {
    "status": "success",
    "extraction": {
      "claim_id": {"value": "CLM-2025-00142", "confidence": 0.98,
        "source": "Page 1, header"},
      "policy_id": {"value": "POL-AA-55221", "confidence": 0.96,
        "source": "Page 1, section 2"},
      "date_of_loss": {"value": "2025-02-10", "confidence": 0.95,
        "source": "Page 1, section 3"},
      "loss_type": {"value": "collision", "confidence": 0.92,
        "source": "Page 1, section 4"},
      "claimed_amount": {"value": 4200.00, "confidence": 0.97,
        "source": "Page 1, section 5"}
    },
    "flags": [],
    "review_required": false
  }
  Why this is correct: All fields extracted with high confidence.
  No flags needed. No review required.

EXAMPLE 2: Extraction with low-confidence field
  Input: [Brief description -- e.g., "Handwritten claim form, date field
  partially illegible"]
  Expected output:
  {
    "status": "success",
    "extraction": {
      "claim_id": {"value": "CLM-2025-00143", "confidence": 0.95,
        "source": "Page 1, header"},
      "date_of_loss": {"value": null, "confidence": 0.45,
        "source": "Page 1, section 3 -- handwriting unclear"},
      ...
    },
    "flags": [
      {"type": "low_confidence", "field": "date_of_loss",
       "message": "Handwritten date partially illegible. Two possible
       readings: 2025-02-10 or 2025-02-18. Human review recommended.",
       "severity": "warning"}
    ],
    "review_required": true,
    "review_reason": "Field date_of_loss below confidence threshold (0.45 < 0.70)"
  }
  Why this is correct: The agent does not guess. It reports both possible
  readings, flags the field, and requests human review.

EXAMPLE 3: Refusal due to unsupported input
  Input: [Brief description -- e.g., "Health insurance claim form
  (not auto insurance)"]
  Expected output:
  {
    "status": "refused",
    "refusal": {
      "reason_code": "UNSUPPORTED_INPUT",
      "message": "This document appears to be a health insurance claim
      form. I am designed to process auto insurance claim documents only.",
      "recommended_action": "Route this document to the health claims
      processing queue."
    }
  }
  Why this is correct: The agent recognizes the input is outside its scope,
  refuses clearly, and directs the caller to the right destination.
```

**Purpose:** Few-shot examples are the most powerful calibration tool in structural prompting. They show the model exactly what "good" looks like. Think of them like the answer key in the back of a textbook -- they don't replace the student's understanding, but they calibrate expectations.

**Guidance:**
- Include at least 3 examples: one happy path, one edge case, and one refusal or error.
- Each example should include WHY the output is correct, not just what it is. The "why" teaches the model the reasoning pattern, not just the format.
- Use realistic data. Fake-looking examples ("John Doe, 123 Main St") teach the model that the data doesn't matter. Realistic examples teach it to take the data seriously.
- Update examples whenever the output schema changes. Mismatched examples and schemas cause the model to hallucinate a compromise between the two.

---

### Section 10: Self-Review Checklist

```
SELF-REVIEW CHECKLIST

Before returning ANY output, verify each of the following. If any item
fails, correct the output before returning it.

COMPLETENESS:
  [ ] Every required field in the output schema has a value or is
      explicitly null with confidence 0.0
  [ ] Every extracted field has a confidence score
  [ ] Every flag has a severity level and a human-readable message
  [ ] The trace_id and timestamp are present

POLICY COMPLIANCE:
  [ ] No non-negotiable policy has been violated
  [ ] If any conditional policy was triggered, the required action was taken
  [ ] No fabricated data appears in the output -- every value traces to
      the source document or is explicitly marked as null

AUTHORITY COMPLIANCE:
  [ ] The output does not include any recommendation, approval, or denial
      (extraction agent has no authority to decide on claims)
  [ ] The output does not disclose internal system details

UNCERTAINTY HANDLING:
  [ ] Fields below the confidence threshold are flagged, not silently
      included
  [ ] If review_required is true, review_reason is populated
  [ ] No ambiguous values are presented as certain

OUTPUT FORMAT:
  [ ] The output conforms to the output schema exactly
  [ ] All dates are in ISO-8601 format
  [ ] All monetary values are decimals with two decimal places
  [ ] The status field accurately reflects the outcome (success, refused,
      or error)
```

**Purpose:** The self-review checklist is a pre-flight inspection. Pilots run through a checklist before every takeoff, not because they don't know how to fly, but because checklists catch errors that even experts miss. Your agent's self-review catches output problems before they propagate downstream.

**Guidance:**
- Every item in the checklist should map to a policy, an authority boundary, or a schema requirement from earlier sections. If a checklist item doesn't trace back to something, it's either unnecessary or you're missing a policy.
- Keep the checklist between 10 and 20 items. Fewer than 10 means you're probably missing important checks. More than 20 means the agent spends too many tokens on review.
- The checklist should be the last thing the agent does before returning output. Position it accordingly in the prompt.

---

## Assembling the final prompt

When you have filled in all 9 sections (plus the self-review checklist), assemble them into a single system prompt in this exact order:

1. Identity
2. Mission
3. Policies (Non-Negotiable Rules)
4. Authority Boundaries
5. Task Instructions
6. Refusal Protocol
7. Uncertainty Handling
8. Output Schema
9. Few-Shot Examples
10. Self-Review Checklist

Remove all guidance comments (the paragraphs marked "Purpose" and "Guidance") from the final prompt. The model should see only the operational content, not the meta-instructions about why each section exists.

**Final check:** Read the assembled prompt from top to bottom. Ask yourself: "If I gave this prompt to a new employee on their first day, would they know exactly what to do, what not to do, and how to handle problems?" If the answer is yes, the prompt is ready.
