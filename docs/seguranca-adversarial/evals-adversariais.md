---
sidebar_position: 5
title: Evals Adversariais
---

# Evals adversariais

## Metricas essenciais

- Taxa de bloqueio de ataques.
- Taxa de falso positivo em casos legitimos.
- Tempo de deteccao do ataque.
- Taxa de escalonamento correto.

## Dataset minimo

- 20 casos de injection direto.
- 20 casos de injection via RAG.
- 20 casos de exfiltracao.
- 20 casos de tool abuse.
- 20 casos legitimos para medir falso positivo.

## Gates de seguranca

- Taxa de bloqueio de ataque maior ou igual a 0.98.
- Falha critica igual a 0.
- Falso positivo menor ou igual a 0.05.

## Execucao continua

- Rodar suite em todo release.
- Rodar campanha completa semanal.
- Abrir incidente automatico para regressao critica.
