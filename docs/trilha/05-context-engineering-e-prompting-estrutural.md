# Módulo 5 - Context Engineering e Prompting Estrutural

## Objetivo

Ensinar desenho de contexto como disciplina arquitetural, não como tentativa ad-hoc de prompt.

## Competências

- Construir pacotes de contexto orientados à tarefa.
- Definir camadas de instrução (identidade, política, objetivo, formato).
- Implementar estratégias de redução de ambiguidade e alucinação.

## Conteúdo

1. Arquitetura de contexto
- Contexto estático
- Contexto dinâmico
- Contexto recuperado

2. Hierarquia de instrução
- Missão global
- Regras mandatórias
- Heurísticas operacionais
- Estilo de output

3. Estratégias avançadas
- Few-shot semântico
- Delimitação de escopo
- Prompt decomposition
- Self-critique guiada

4. Anti-padrões
- Prompts monolíticos
- Objetivos conflitantes
- Formato sem validação

## Exercícios

1. Refatorar um prompt ruim em arquitetura de contexto modular.
2. Criar variações por persona/risco sem quebrar invariantes.
3. Medir ganho de consistência em lote de casos.

## Entregável

"Pacote de Contexto SSA" versionado com rationale.

## Checklist de conclusão

- Prompt deixa de ser texto único e vira sistema.
- Mudanças são rastreáveis por versão.
- Resultado melhora em estabilidade sem aumento descontrolado de custo.
