# SSA Academy Site

Website for the **Semantic Systems Architect (SSA)** course/guide, built with Docusaurus.

## The Semantic Systems Architect Declaration

A fundamental shift is happening in computing.

Code was never the final substrate. It was an intermediary.

The deepest layer of computation is meaning.

With AI, machines can increasingly operate on structured meaning, not only rigid syntax. This opens a new engineering discipline where language is an interface, intention is architecture, and AI is the implementation mechanism.

That discipline is **Semantic Systems Architecture**.

Its architect is the **Semantic Systems Architect**.

## Foundational layers

Use these three layers as the project's conceptual core:

1. `README.md` -> short declaration (entry point)
2. `manifesto/ssa-manifesto.md` -> full manifesto (foundational text)
3. `foundations/` -> philosophical and theoretical essays

## Requirements

- Node.js 20+
- npm 10+

## Run locally

```bash
npm install
npm start
```

The site runs at `http://localhost:3000`.

## Production build

```bash
npm run build
npm run serve
```

## Content structure

- `docs/trilha`: core modules
- `docs/labs`: applied labs
- `docs/templates`: reusable templates
- `docs/certificacao`: rubrics and capstone
- `docs/playbooks`: patterns and anti-patterns
- `docs/carreira`: career track
- `docs/especializacoes`: domain tracks (health, legal, B2B support)
- `docs/plataforma-pratica`: case bank, evals, capstones, maturity
- `docs/arquiteturas-avancadas`: technical guides (production RAG and labs)
- `docs/economia-ia`: costs, unit economics, FinOps, optimization
- `docs/seguranca-adversarial`: threat modeling, red teaming, incident response
- `docs/onboarding-corporativo`: enterprise adoption, internal academy, rollout
- `docs/referencias`: glossary, competency map, study roadmap
- `docs/comunidade`: contribution guides, governance, and roadmap
- `docs/manifesto`: declaration, manifesto topic, and foundational theses
- `manifesto`: canonical declaration and long-form manifesto texts
- `foundations`: philosophical and theoretical foundation papers
- `glossary`: repository-level SSA vocabulary
- `examples`: concrete semantic-systems examples
- `research`: research notes and open questions
- `course`: course packaging layer
- `community-assets`: templates and community submission assets
  - `community-assets/rag`: architecture templates, eval dataset, operational checklist
  - `community-assets/economia`: cost templates, dashboard, optimization experiments
  - `community-assets/security`: adversarial cases, suites, secure-release checklist
  - `community-assets/onboarding`: rollout, stakeholder, and adoption scorecard templates

## Collaboration

- Guide: `CONTRIBUTING.md`
- Code of conduct: `CODE_OF_CONDUCT.md`
- Issues: `.github/ISSUE_TEMPLATE/`
- PR template: `.github/pull_request_template.md`

## GitHub publishing

Target repository: `https://github.com/brotto/semantic-systems-architect-site`

1. Push to `main`.
2. Enable GitHub Pages with source `GitHub Actions`.
3. `deploy.yml` publishes automatically on each push to `main`.

## Useful commands

```bash
npm run clear
npm run swizzle
npm run docusaurus -- --help
```
