# Módulo 3 - Arquitetura de Agentes

## Objetivo

Projetar sistemas multiagente com papéis claros, protocolos de cooperação e limites de autonomia.

## Competências

- Definir papéis de agentes por especialização cognitiva.
- Escolher topologia de orquestração (centralizada, federada, hierárquica).
- Criar protocolos de handoff e validação entre agentes.

## Conteúdo

1. Taxonomia de agentes
- Planner
- Retriever
- Reasoner
- Critic
- Executor
- Guardrail

2. Topologias
- Supervisor + especialistas
- Pipeline por estágio
- Swarm com arbitragem

3. Protocolos de cooperação
- Esquema de mensagens
- Contratos de handoff
- Controle de versão semântica

4. Controle de autonomia
- Níveis de confiança
- Alçadas de decisão
- Escalonamento para humano

## Exercícios

1. Projetar arquitetura multiagente para atendimento B2B complexo.
2. Definir protocolo de handoff em formato estruturado.
3. Simular falhas de coordenação e desenhar recovery.

## Entregável

Diagrama + documento: "Arquitetura de Agentes SSA v1".

## Checklist de conclusão

- Cada agente tem missão, escopo e limites explícitos.
- Existe estratégia de fallback segura.
- A cooperação reduz custo e aumenta qualidade.
