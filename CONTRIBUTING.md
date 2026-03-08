# Contributing to SSA Academy

Thank you for contributing to the Semantic Systems Architect course project.

## Quick flow

1. Fork the repository.
2. Create a descriptive branch: `feat/...`, `fix/...`, `docs/...`.
3. Run locally:
   - `npm install`
   - `npm start` (development)
   - `npm run build` (validation)
4. Update or create content in `docs/`.
5. Open a Pull Request using the template.

## Editorial standard

- Use direct, objective, didactic language.
- Avoid undefined jargon.
- When adding new concepts, update `docs/referencias/glossario-ssa.md`.
- Include practical examples whenever possible.

## Technical standard

- Do not edit generated files (`build/`, `.docusaurus/`).
- Internal links must use Docusaurus paths.
- If you change navigation, update `sidebars.js`.
- For practical contributions, use official templates in `community-assets/`.
- Cases and capstones must remove any sensitive data.

## PR checklist

- Content is consistent with SSA taxonomy.
- Navigation is updated when needed.
- `npm run build` runs without errors.
- Scope and impact are clearly described.
