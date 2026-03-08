---
sidebar_position: 5
title: Avaliacao de RAG
---

# Avaliacao de sistemas RAG

## Camadas de avaliacao

1. Avaliacao de retrieval.
2. Avaliacao de geracao.
3. Avaliacao end-to-end de tarefa.
4. Avaliacao de seguranca e compliance.

## Dataset minimo

- 30 casos de rotina.
- 10 casos de borda.
- 10 casos adversariais.
- 10 casos sem evidencia suficiente.

## Rubrica minima

- Aderencia a evidencia.
- Corretude da resposta.
- Completude para decisao.
- Transparencia de incerteza.
- Conformidade com politicas.

## Gates de release sugeridos

- Faithfulness maior ou igual a 0.90
- Falhas criticas = 0
- Regressao de recall menor ou igual a 2%
