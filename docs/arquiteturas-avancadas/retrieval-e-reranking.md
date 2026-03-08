---
sidebar_position: 4
title: Retrieval e Reranking
---

# Retrieval e reranking

## Fluxo recomendado

1. Query understanding com classificacao de intencao.
2. Filtro por metadados (dominio, data, sensibilidade).
3. Busca hibrida (vetorial + lexical).
4. Reranking por relevancia semantica.
5. Selecao final de contexto com budget de tokens.

## Boas praticas

- Definir `k` dinamico por complexidade da pergunta.
- Aplicar penalidade para fontes desatualizadas.
- Bloquear trechos de alta sensibilidade sem permissao.
- Forcar citacao de origem no output final.

## Guardrails

- Se score de evidencia < limiar, responder com incerteza explicita.
- Se fontes conflitam, sinalizar conflito e pedir revisao humana.
- Nunca preencher lacunas com suposicao silenciosa.
