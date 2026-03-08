# Contributing to SSA Academy

Obrigado por contribuir com o projeto do curso Semantic Systems Architect.

## Fluxo rapido

1. Faça fork do repositorio.
2. Crie uma branch descritiva: `feat/...`, `fix/...`, `docs/...`.
3. Rode localmente:
   - `npm install`
   - `npm start` (desenvolvimento)
   - `npm run build` (validacao)
4. Atualize ou crie conteudo em `docs/`.
5. Abra Pull Request usando o template.

## Padrao editorial

- Linguagem direta, objetiva e didatica.
- Evite jargao sem definicao.
- Quando adicionar conceitos novos, atualizar `docs/referencias/glossario-ssa.md`.
- Sempre incluir exemplos praticos quando possivel.

## Padrao tecnico

- Nao editar arquivos gerados (`build/`, `.docusaurus/`).
- Links internos devem usar caminhos do Docusaurus.
- Se alterar navegacao, atualizar `sidebars.js`.
- Para contribuicoes praticas, usar `community-assets/` com os templates oficiais.
- Casos e capstones devem remover qualquer dado sensivel.

## Checklist do PR

- Conteudo coerente com a taxonomia SSA.
- Navegacao atualizada.
- `npm run build` executa sem erro.
- Escopo e impacto descritos na PR.
