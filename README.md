# SSA Academy Site

Site do curso/guia **Semantic Systems Architect (SSA)** construído com Docusaurus.

## Requisitos

- Node.js 20+
- npm 10+

## Rodar local

```bash
npm install
npm start
```

O site sera servido em `http://localhost:3000`.

## Build de producao

```bash
npm run build
npm run serve
```

## Estrutura de conteudo

- `docs/trilha`: modulos centrais
- `docs/labs`: praticas aplicadas
- `docs/templates`: artefatos reutilizaveis
- `docs/certificacao`: rubricas e capstone
- `docs/playbooks`: padroes e anti-padroes
- `docs/carreira`: progressao profissional
- `docs/referencias`: glossario, competencias e estudos

## Publicar no GitHub

Repositorio alvo: `https://github.com/brotto/semantic-systems-architect-site`

1. Faça push da branch `main`.
2. Habilite GitHub Pages com fonte `GitHub Actions`.
3. O workflow `deploy.yml` publica automaticamente a cada push em `main`.

## Comandos uteis

```bash
npm run clear
npm run swizzle
npm run docusaurus -- --help
```
