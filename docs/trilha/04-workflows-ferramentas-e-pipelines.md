# Módulo 4 - Workflows, Ferramentas e Pipelines

## Objetivo

Estruturar fluxos ponta a ponta que integrem LLMs, ferramentas externas, dados e ações com rastreabilidade.

## Competências

- Projetar workflows determinísticos + etapas adaptativas.
- Definir contratos de tool use e validação de chamadas.
- Separar pipeline de raciocínio, pipeline de dados e pipeline de execução.

## Conteúdo

1. Anatomia de um workflow SSA
- Trigger
- Context build
- Deliberação
- Execução
- Verificação
- Auditoria

2. Integração com ferramentas
- Catálogo de tools
- Schema de argumentos
- Política de retries e timeout

3. Gestão de estado
- Estado efêmero
- Estado de sessão
- Estado persistente

4. Resiliência operacional
- Idempotência
- Compensação
- Circuit breaker semântico

## Exercícios

1. Construir um workflow de 8 etapas com 3 integrações externas.
2. Definir política de erro para cada etapa.
3. Criar diagrama de observabilidade do fluxo.

## Entregável

"Pipeline Operacional SSA" com mapa de execução e SLAs.

## Checklist de conclusão

- Fluxo reproduzível com logs auditáveis.
- Erros previstos têm fallback explícito.
- Dependências externas têm isolamento de falhas.
