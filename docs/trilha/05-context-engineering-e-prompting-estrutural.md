# Module 5 - Context Engineering and Structural Prompting

## Aim

Teach context drawing as an architectural discipline, not as an ad-hoc attempt at a prompt.

## Skills

- Build task-oriented context packages.
- Defines instruction layers (identity, policy, objective, format).
- Implement strategies to reduce ambiguity and hallucination.

## Content

1. Context architecture
- static context
- Dynamic context
- Recovered context

2. Instruction hierarchy
- global mission
- Mandatory rules
- Operational heuristics
- Output style

3. Advanced Strategies
- Semantic few-shot
- Scope delimitation
- Prompt decomposition
- Guided self-critique

4. Anti-patterns
- Monolithic prompts
- Conflicting goals
- Format without validation

## Exercises

1. Refactor a bad prompt into modular context architecture.
2. Create variations per persona/risk without breaking invariants.
3. Measure consistency gain in batch of cases.

## Deliverable

"SSA Context Package" versioned with rationale.

## Completion checklist

- Prompt stops being a single text and becomes a system.
- Changes are trackable by version.
- Result improves stability without uncontrolled increase in cost.
