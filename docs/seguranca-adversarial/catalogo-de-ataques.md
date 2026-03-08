---
sidebar_position: 3
title: Catalogo de Ataques
---

# Catalogo de ataques adversariais

## Categoria 1: Prompt injection direto

Exemplo:
- usuario tenta sobrescrever instrucoes mandatórias do sistema.

Defesa:
- separacao estrita de instrucoes de sistema e entrada do usuario.
- classificador de intencao maliciosa.

## Categoria 2: Injeção via contexto recuperado

Exemplo:
- documento indexado contem instrucoes maliciosas ocultas.

Defesa:
- sanitizacao de fontes.
- politica de confianca por fonte.
- isolamento entre conteudo e politicas do sistema.

## Categoria 3: Exfiltracao de dados

Exemplo:
- tentativa de extrair dados sensiveis por perguntas indiretas.

Defesa:
- mascaramento e controle de acesso por escopo.
- filtros de output por classificacao de sensibilidade.

## Categoria 4: Tool abuse

Exemplo:
- ataque para executar acao externa nao autorizada.

Defesa:
- allowlist de ferramentas.
- validacao rigorosa de argumentos.
- aprovacao humana para acoes de alto impacto.

## Categoria 5: Manipulacao de decisao

Exemplo:
- usuario induz sistema a priorizacao indevida.

Defesa:
- regras de decisao explicitas.
- validacao cruzada com agente critico.
