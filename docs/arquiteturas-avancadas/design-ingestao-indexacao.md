---
sidebar_position: 3
title: Ingestion and Indexation
---

# Ingestion and indexing design

## Recommended pipeline

1. Collection from reliable sources.
2. Normalization (encoding, cleaning, structure).
3. Task-oriented semantic chunking.
4. Metadata enrichment.
5. Embeddings and indexing.

## Chunking rules

- Chunk by sense unit, not by blind fixed size.
- Preserve the boundaries of important sections.
- Register `source_id`, `section_id`, `version` and `timestamp`.

## Mandatory metadata

- domain
- sensitivity rating
- source version
- reliability
- temporal validity

## Update strategy

- Daily incremental reindex for frequent changes.
- Full rebuild when metadata schema changes.
- Tombstone for discontinued documents.
