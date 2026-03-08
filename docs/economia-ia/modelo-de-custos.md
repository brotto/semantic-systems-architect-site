---
sidebar_position: 2
title: Modelo de Custos
---

# Modelo de custos de sistemas de IA

## Componentes de custo

1. Inferencia (tokens de entrada e saida).
2. Embeddings e indexacao.
3. Retrieval e infra de armazenamento.
4. Ferramentas externas e APIs de terceiros.
5. Observabilidade, evals e operacao.

## Formula base

Custo total mensal = custo de inferencia + custo de dados + custo de operacao + custo de falhas.

## Custos ocultos

- Reprocessamento por respostas inadequadas.
- Escalonamento humano por baixa confianca.
- Custo de incidentes e rollback.
- Retrabalho em suporte e engenharia.

## Modelo por jornada

Mapeie cada fluxo com:
- volume mensal
- custo por execucao
- taxa de erro
- taxa de escalonamento

Use o template: `community-assets/economia/template-cost-model.csv`.
