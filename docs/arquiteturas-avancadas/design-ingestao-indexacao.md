---
sidebar_position: 3
title: Ingestao e Indexacao
---

# Design de ingestao e indexacao

## Pipeline recomendado

1. Coleta de fontes confiaveis.
2. Normalizacao (encoding, limpeza, estrutura).
3. Chunking semantico orientado a tarefa.
4. Enriquecimento de metadados.
5. Embeddings e indexacao.

## Regras de chunking

- Chunk por unidade de sentido, nao por tamanho fixo cego.
- Preservar fronteira de secoes importantes.
- Registrar `source_id`, `section_id`, `version` e `timestamp`.

## Metadados obrigatorios

- dominio
- classificacao de sensibilidade
- versao da fonte
- confiabilidade
- validade temporal

## Estrategia de atualizacao

- Reindex incremental diario para mudancas frequentes.
- Rebuild completo quando schema de metadados mudar.
- Tombstone para documentos descontinuados.
