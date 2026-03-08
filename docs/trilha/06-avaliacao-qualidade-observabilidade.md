# Módulo 6 - Avaliação, Qualidade e Observabilidade

## Objetivo

Transformar qualidade de IA em disciplina de engenharia mensurável com evals contínuas.

## Competências

- Definir métricas de qualidade por tipo de tarefa.
- Construir suíte de avaliação offline e online.
- Instrumentar traços semânticos para depuração e melhoria contínua.

## Conteúdo

1. Fundamentos de avaliação
- Métricas objetivas (acurácia, cobertura, latência, custo)
- Métricas semânticas (coerência, aderência a políticas, utilidade)

2. Evals estruturadas
- Dataset de casos críticos
- Rubricas de julgamento
- Testes de regressão semântica

3. Observabilidade
- Traces por etapa
- Eventos de decisão
- Alertas de drift

4. Governança de qualidade
- Gates para deploy
- Critérios de rollback
- Ciclo de melhoria orientado a evidência

## Exercícios

1. Criar suíte inicial com 50 casos (happy path, edge, adversarial).
2. Definir gate mínimo para release.
3. Simular regressão e executar resposta operacional.

## Entregável

"Suite de Qualidade SSA" + dashboard mínimo.

## Checklist de conclusão

- Existe baseline de qualidade.
- Mudanças têm comparação antes/depois.
- Time decide com dados, não percepção.
