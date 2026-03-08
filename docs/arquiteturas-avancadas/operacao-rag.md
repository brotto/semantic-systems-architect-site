---
sidebar_position: 6
title: Operacao e Runbook
---

# Operacao de RAG em producao

## SLOs recomendados

- Latencia P95 da resposta final.
- Taxa de sucesso de retrieval.
- Taxa de respostas com citacao valida.
- Taxa de escalonamento humano.

## Alertas criticos

1. Queda abrupta de recall.
2. Aumento de respostas sem citacao.
3. Crescimento anormal de custo por consulta.
4. Falhas de indexacao recorrentes.

## Runbook de incidente

1. Classificar incidente (dados, retrieval, geracao, seguranca).
2. Congelar release em progresso.
3. Executar suite de regressao RAG.
4. Aplicar rollback de index/config se necessario.
5. Registrar causa raiz e acao preventiva.

## Operacao economica

- Cache de consultas frequentes.
- Roteamento por complexidade (modelo leve vs pesado).
- Budget de tokens por tipo de pergunta.
