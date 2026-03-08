---
sidebar_position: 2
title: SSA para Saude
---

# SSA para Saude

## Objetivo

Projetar sistemas cognitivos para operacoes de saude com foco em seguranca clinica, rastreabilidade e suporte a decisao supervisionada.

## Casos de uso prioritarios

1. Triagem de sintomas para direcionamento de atendimento.
2. Resumo estruturado de prontuario e historico.
3. Suporte a fluxos de autorizacao e elegibilidade.

## Ontologia minima recomendada

- Paciente
- Episodio
- Sinal
- Sintoma
- Diagnostico presuntivo
- Conduta sugerida
- Alerta clinico
- Escalonamento humano

## Riscos criticos

- Recomendacao clinica sem contexto suficiente.
- Alucinacao em dados de prontuario.
- Ausencia de escalonamento em casos de alto risco.

## Arquitetura de referencia

- Agente `triage-intake`: estrutura dados iniciais.
- Agente `clinical-reasoner`: aplica regras clinicas aprovadas.
- Agente `safety-guard`: bloqueia saidas fora de politica.
- Agente `human-escalation`: aciona revisao profissional.

## Evals essenciais

- Aderencia a protocolos de triagem.
- Taxa de escalonamento correto em casos criticos.
- Taxa de completude do resumo clinico.

## Proximo passo

Executar [Lab Saude](./lab-saude)
