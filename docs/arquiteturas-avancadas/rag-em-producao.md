---
sidebar_position: 2
title: RAG em Producao
---

# RAG em producao para SSA

## Objetivo

Construir sistemas de Retrieval-Augmented Generation com comportamento confiavel em ambiente real.

## Princípios

1. Separar claramente recuperacao, raciocinio e resposta.
2. Tratar contexto como contrato, nao como texto livre.
3. Medir recall, precisao de resposta e seguranca continuamente.
4. Projetar fallback para ausencia de evidencias.

## Arquitetura de referencia

1. Camada de ingestao e curadoria de conhecimento.
2. Camada de indexacao vetorial + metadados estruturados.
3. Camada de retrieval com filtros e reranking.
4. Camada de geracao com citacoes e politicas.
5. Camada de avaliacao, observabilidade e governanca.

## Modos de falha mais comuns

- Recuperar contexto irrelevante (low recall).
- Recuperar contexto correto mas gerar resposta errada.
- Vazar dados sensiveis por retrieval sem controle.
- Saturar custo/latencia por consultas sem roteamento.

## Metricas minimas

- Recall@k por dominio.
- Precision@k do retriever.
- Faithfulness da resposta com evidencia.
- Taxa de "nao sei" quando faltam evidencias.
- Latencia P50/P95 por etapa.

## Entregavel esperado

Uma arquitetura RAG versionada com:
- contratos de dados
- politicas de retrieval
- suite de evals
- runbook de operacao
