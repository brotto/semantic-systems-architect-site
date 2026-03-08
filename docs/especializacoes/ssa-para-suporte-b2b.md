---
sidebar_position: 6
title: SSA para Suporte B2B
---

# SSA para Suporte B2B

## Objetivo

Projetar sistemas de suporte tecnico B2B com foco em resolucao orientada por contexto, SLA e escalonamento inteligente.

## Casos de uso prioritarios

1. Classificacao de tickets por impacto e urgencia.
2. Diagnostico assistido por logs e base de conhecimento.
3. Orquestracao de handoff entre suporte, engenharia e sucesso do cliente.

## Ontologia minima recomendada

- Conta
- Ticket
- Incidente
- Severidade
- Dependencia tecnica
- Solucao proposta
- Escalonamento
- SLA

## Riscos criticos

- Priorizacao incorreta de severidade.
- Solucao nao reproduzivel.
- Escalonamento tardio em incidentes de alto impacto.

## Arquitetura de referencia

- Agente `ticket-intake`: normaliza contexto e prioridade.
- Agente `diagnostic-reasoner`: formula hipoteses tecnicas.
- Agente `kb-retriever`: busca evidencias em runbooks.
- Agente `ops-escalation`: define handoff e proxima acao.

## Evals essenciais

- Acuracia da classificacao de severidade.
- Tempo medio para recomendacao util.
- Taxa de resolucao sem reabertura.

## Proximo passo

Executar [Lab Suporte B2B](./lab-suporte-b2b)
