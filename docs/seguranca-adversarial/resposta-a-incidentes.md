---
sidebar_position: 6
title: Incident Response
---

# Adversarial Incident Response

## The hospital infection control analogy

When a hospital detects a dangerous infection, it follows a precise protocol: isolate the patient to prevent spread, treat the infection to stop the damage, investigate the source to understand how it happened, and implement preventive measures so it does not happen again. The protocol does not depend on how the staff feels about the situation. It does not vary based on who is on shift. It is a standardized response that works the same way every time.

Adversarial incident response for SSA systems follows the same logic. When an attack succeeds -- when someone bypasses your defenses and the system does something it should not do -- you need a protocol. Not a panic response. Not a meeting to discuss what to do. A protocol: a predefined sequence of actions that limits damage, preserves evidence, identifies root causes, and prevents recurrence.

This chapter gives you that protocol.

---

## Severity classification

Not all adversarial incidents are equally serious. A blocked attack that slightly degraded the user experience is not the same as a data breach. Your response must be proportional to the severity.

### S1: Critical -- Data exposure or unauthorized critical action

**Definition.** The attack resulted in one or more of the following:

- Exposure of sensitive data (personal information, financial data, internal credentials, system prompts with security-sensitive content)
- Execution of an unauthorized critical action (payment processing, data deletion, external communication with sensitive content)
- Compromise of system integrity that could enable further attacks (credential exposure, privilege escalation)

**Examples.**
- The system revealed customer personal data to an unauthorized user.
- The system sent an email containing internal business data to an external address.
- The system executed a database deletion that was triggered by an adversarial input.
- The system exposed its API keys or service account credentials in a response.

**Response timeline.** Containment within 1 hour. Investigation within 24 hours. Remediation within 48 hours.

### S2: High -- Guardrail bypass without irreversible impact

**Definition.** The attack successfully bypassed one or more security controls, but the impact is contained and no irreversible damage occurred.

- The system revealed its system prompt content (but no sensitive data beyond the prompt).
- The system followed an adversarial instruction (changed behavior, adopted an unauthorized persona) but did not access sensitive data or execute critical actions.
- The system produced output that violates its behavioral policies but did not cause downstream harm.

**Examples.**
- The system adopted a "jailbroken" persona and provided information outside its intended scope.
- The system followed instructions injected through a retrieved document, but the resulting action was limited to generating inappropriate text.
- The system's output classification (tone, topic, scope) deviated from its defined policies.

**Response timeline.** Containment within 4 hours. Investigation within 48 hours. Remediation within one week.

### S3: Low -- Blocked attempt with observable effects

**Definition.** The attack was blocked by defenses, but the blocking produced observable side effects.

- A legitimate user was incorrectly flagged and had their request blocked (false positive triggered by an attack pattern).
- The system detected an attack and responded correctly, but the defensive response itself revealed information about the defense mechanisms.
- An attack probing campaign was detected, indicating an active threat actor, but no defenses were bypassed.

**Examples.**
- A legitimate customer asking about refund policies was flagged because their message contained phrases similar to known injection patterns.
- The system's refusal message was overly specific about why the request was blocked, giving the attacker information about what defenses are in place.
- Monitoring detected a series of systematically crafted messages from a single user, indicating automated probing.

**Response timeline.** Investigation within one week. Remediation in the next scheduled update cycle.

---

## Response procedures by severity

### S1 response: Critical incidents

**Step 1: Immediate containment (0-1 hour)**

The priority is to stop the bleeding. Contain the attack vector before investigating.

- **Disable the vulnerable flow.** If the attack came through a specific feature, endpoint, or agent, disable it immediately. A disabled feature is better than an actively exploited one.
- **Revoke exposed credentials.** If any API keys, tokens, or service account credentials were exposed, rotate them immediately.
- **Block the attacker.** If the attack came from an identifiable source (specific user account, IP address, API key), block that source.
- **Preserve the state.** Before making any changes to the system, capture its current state: the conversation logs, the system configuration, the model version, and the state of all components involved.

**Step 2: Evidence collection (1-4 hours)**

Collect and preserve all evidence while it is fresh. See the Evidence Collection section below for details.

**Step 3: Impact assessment (4-24 hours)**

Determine the full scope of the incident:

- What data was exposed? Exactly which records, which fields, which users were affected?
- What actions were taken? What did the system do that it should not have done?
- What is the blast radius? Could the exposed information or unauthorized actions enable further attacks?
- Are there downstream effects? Did the compromised output reach other systems, other users, or external parties?

**Step 4: Stakeholder notification (within 24 hours)**

Notify the appropriate stakeholders based on the impact assessment. See the Communication section below.

**Step 5: Remediation (24-48 hours)**

Fix the vulnerability that enabled the attack:

- Implement the defense that was missing or strengthen the defense that failed.
- Run the adversarial eval suite to verify the fix works.
- Run a focused red team session targeting the same attack vector to confirm the fix holds.

**Step 6: Post-incident analysis (within one week)**

Conduct a thorough post-incident analysis. See the Post-Incident Analysis section below.

### S2 response: High-severity incidents

**Step 1: Containment (0-4 hours)**

- Identify the specific defense that was bypassed and add a temporary mitigation (additional input filter, output check, or access restriction).
- If the bypass is easily reproducible, disable the affected flow until a fix is deployed.
- If the bypass required sophisticated techniques unlikely to be repeated quickly, add monitoring and proceed with investigation.

**Step 2: Evidence collection (same day)**

Collect conversation logs, system state, and any monitoring data related to the incident.

**Step 3: Root cause analysis (within 48 hours)**

Identify why the defense failed:

- Was the defense absent (no control existed for this attack type)?
- Was the defense insufficient (a control existed but was not robust enough)?
- Was the defense misconfigured (a control existed and should have worked but was not properly set up)?

**Step 4: Remediation (within one week)**

- Implement or strengthen the relevant defense.
- Add the attack pattern to the adversarial eval suite as a new test case.
- Run regression tests to ensure the fix does not break other defenses.

**Step 5: Documentation**

Update the threat model, the adversarial eval suite, and the defense documentation to reflect what was learned.

### S3 response: Low-severity incidents

**Step 1: Log and categorize**

Document the incident: what happened, what triggered it, and what the system did.

**Step 2: Analyze patterns**

- If the incident was a false positive, analyze why the legitimate request was flagged. Adjust the defense to reduce false positives.
- If the incident was a detected probing campaign, assess the attacker's sophistication and targets. This intelligence informs future red teaming and defense priorities.

**Step 3: Improve and update**

- Add the case to the adversarial eval suite.
- If the defensive response revealed information about the defense mechanisms, redesign the response to be less informative to attackers.
- Update the defense tuning to reduce false positives while maintaining attack blocking rates.

---

## Evidence collection

Good evidence collection is the difference between a useful post-incident analysis and a guessing game. Collect evidence systematically, as if you were preparing for a legal proceeding -- because in some cases, you might be.

### What to capture

**Conversation data:**
- The complete conversation log, from the first message to the last.
- Exact timestamps for every message, tool call, and system action.
- The user identifier (anonymized if appropriate for the incident type).
- The session identifier and any session metadata.

**System state:**
- The exact version of the system prompt at the time of the incident.
- The model version and configuration.
- The state of any filters, classifiers, or guardrails.
- The content of retrieved documents (for RAG-based attacks).
- The state of the memory or session store (for state poisoning attacks).

**Infrastructure data:**
- Server logs covering the incident period.
- API call logs for any external tools or services accessed during the incident.
- Monitoring and alerting data: what did the monitoring system detect, and when?

**Contextual data:**
- Was the attacker a known user? What is their history with the system?
- Were there any recent system changes (prompt updates, model changes, new data sources) that might have created the vulnerability?
- Were there any related incidents in the recent past?

### Chain of custody

For S1 incidents, maintain a formal chain of custody for evidence:

- Document who collected each piece of evidence and when.
- Store evidence in a secure, tamper-evident location.
- Control access to evidence: only the investigation team should have access.
- Do not modify original evidence. Work with copies.

This matters because S1 incidents may involve regulatory reporting, legal proceedings, or customer notifications where the integrity of evidence could be challenged.

### Forensic analysis

For complex incidents, perform forensic analysis:

- **Timeline reconstruction**: Build a minute-by-minute timeline of the incident. When did the attack start? When was it detected? When did containment happen? What happened in between?
- **Attack path analysis**: How did the attack flow through the system? Which components were involved? Where did each defense layer succeed or fail?
- **Counterfactual analysis**: What would have happened if specific defenses had not been in place? This helps you understand the value of existing defenses and the impact of the ones that failed.

---

## Post-incident analysis

Every incident is a learning opportunity. The post-incident analysis turns a negative event into improved defenses.

### Root cause identification

Go beyond the immediate cause to find the root cause. The immediate cause is "the input filter did not catch this injection pattern." The root cause might be "the input filter relies on keyword matching, which is fundamentally insufficient for detecting semantically varied injection attempts."

Use the "five whys" technique:

1. **Why did the attack succeed?** Because the input filter did not block it.
2. **Why did the input filter not block it?** Because the attack used language that did not match any filter patterns.
3. **Why did the filter patterns not cover this language?** Because the patterns were designed based on known attack examples, and this was a novel variation.
4. **Why was the filter not designed to handle novel variations?** Because we relied on keyword matching instead of semantic classification.
5. **Why did we rely on keyword matching?** Because we had not implemented a classifier-based defense for this surface.

The root cause is at level 4 or 5, not at level 1. Fixing the root cause prevents classes of attacks, not just the specific variant that was used.

### Defense gap identification

Map the incident against your defense layers:

| Layer | Expected behavior | Actual behavior | Gap? |
|---|---|---|---|
| Input validation (walls) | Block instruction-like patterns | Did not detect the pattern | Yes -- keyword matching is too narrow |
| Content filtering (moat) | Neutralize adversarial content | Not triggered (attack came via user input, not content) | No -- but should we also filter user input? |
| Monitoring (guards) | Detect behavioral anomalies | Detected the anomaly 15 minutes after the response | Partial -- detection was too slow |
| Critical controls (keep) | Require approval for critical actions | Not applicable (no critical action was taken) | No |

### Remediation plan

For each gap identified, define a remediation:

```
Gap: Input validation relies on keyword matching
Remediation: Implement a classifier-based input filter that
  detects adversarial intent semantically, not just by keywords
Owner: [Name]
Timeline: 2 weeks
Verification: Add the incident attack pattern to the adversarial
  eval suite and verify the new filter blocks it
```

### Post-incident report template

```
POST-INCIDENT REPORT

Incident ID: [INC-YYYY-NNN]
Severity: [S1 / S2 / S3]
Date and time: [When the incident occurred]
Date detected: [When the incident was detected]
Date contained: [When containment was achieved]
Date resolved: [When remediation was complete]

1. SUMMARY
   One-paragraph description of what happened.

2. TIMELINE
   Minute-by-minute (S1) or hour-by-hour (S2/S3) timeline.

3. IMPACT
   What was the damage? Who was affected?

4. ROOT CAUSE
   Five-whys analysis leading to the root cause.

5. DEFENSE GAP ANALYSIS
   Table of defense layers and their performance during the incident.

6. REMEDIATION ACTIONS
   List of remediations with owners and timelines.

7. PREVENTIVE ACTIONS
   Changes to prevent similar incidents in the future.

8. LESSONS LEARNED
   What did this incident teach us about our system, our defenses,
   or our process?

9. EVAL SUITE UPDATES
   New test cases added to the adversarial eval suite based on
   this incident.
```

---

## Communication

Different stakeholders need different information at different times.

### Internal notification

**Immediate (within 1 hour of detection for S1, within 4 hours for S2):**
- Notify the incident response team.
- Notify the engineering team responsible for the affected system.
- Notify the security lead.

**After impact assessment:**
- Notify the product owner with impact details.
- Notify management with a summary and expected resolution timeline.

### Stakeholder communication

**For S1 incidents involving customer data:**
- Notify affected customers with a clear, honest explanation of what happened, what data was involved, and what you are doing about it.
- Provide specific, actionable steps customers can take (change passwords, monitor accounts).
- Do not speculate about the attacker or the cause. Share only confirmed facts.

**For S1 incidents involving critical actions:**
- Notify any parties affected by the unauthorized actions.
- Reverse unauthorized actions if possible.
- Document what happened for any parties that need to take follow-up action.

### Regulatory reporting

Some incidents may require regulatory reporting depending on your jurisdiction and industry:

- Data breaches involving personal data may trigger reporting requirements under privacy regulations.
- Incidents in regulated industries (healthcare, finance) may have specific reporting timelines and requirements.
- Consult with your legal team for any S1 incident to determine reporting obligations.

---

## Building an incident response capability

Do not wait for an incident to build your response capability. Prepare in advance:

### Incident response team

Define who is on the incident response team, what their roles are, and how to reach them:

- **Incident commander**: Coordinates the response, makes containment decisions, manages communication.
- **Technical lead**: Investigates the technical details, identifies the root cause, designs the remediation.
- **SSA lead**: Analyzes the semantic architecture implications, updates the threat model and eval suite.
- **Communications lead**: Manages internal and external communication.

### Runbooks

Write runbooks for common incident types. A runbook is a step-by-step guide that tells the incident responder exactly what to do. It removes decision-making from the heat of the moment.

Create runbooks for:
- System prompt exposure
- Sensitive data leakage
- Unauthorized tool execution
- Guardrail bypass
- Coordinated probing campaign

### Drills

Practice your incident response before you need it. Run incident response drills:

1. Create a realistic incident scenario (based on your threat model).
2. Notify the incident response team that a drill is happening.
3. Walk through the response procedure step by step.
4. Time each phase and compare against your target timelines.
5. Debrief: what worked, what did not, what needs to change?

Run drills quarterly. Rotate the scenarios so the team practices different incident types.

---

## Key takeaways

1. **Three severity levels** -- S1 (critical), S2 (high), S3 (low) -- determine the urgency and scope of your response.

2. **Follow the protocol**, not your instincts. Predefined response procedures work better than ad-hoc reactions, especially under pressure.

3. **Collect evidence systematically.** Every incident is a learning opportunity, but only if you capture the data you need for analysis.

4. **Find the root cause**, not just the immediate cause. Fix the class of vulnerability, not just the specific variant that was exploited.

5. **Communicate clearly.** Different stakeholders need different information at different times. Over-communicating is better than under-communicating.

6. **Prepare before incidents happen.** Build the team, write the runbooks, run the drills. When a real incident occurs, you want execution, not planning.
