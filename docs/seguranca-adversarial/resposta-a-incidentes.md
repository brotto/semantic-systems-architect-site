---
sidebar_position: 6
title: Resposta a Incidentes
---

# Resposta a incidentes adversariais

## Classificacao de severidade

- S1: exposicao de dados ou acao critica indevida.
- S2: bypass de guardrail sem impacto irreversivel.
- S3: tentativa bloqueada com comportamento degradado.

## Runbook rapido

1. Conter vetor de ataque.
2. Desativar fluxo vulneravel se necessario.
3. Executar suite de regressao.
4. Aplicar patch de guardrail/politica.
5. Validar com red team de confirmacao.
6. Publicar post-mortem tecnico.

## Post-mortem minimo

- linha do tempo
- causa raiz
- impacto
- acao corretiva
- acao preventiva
