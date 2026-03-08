---
sidebar_position: 4
title: SSA para Juridico
---

# SSA para Juridico

## Objetivo

Projetar sistemas para analise juridica assistida com foco em coerencia normativa, explicabilidade e controle de risco regulatorio.

## Casos de uso prioritarios

1. Classificacao de documentos e clausulas.
2. Analise preliminar de risco contratual.
3. Geração de minutas com politicas institucionais.

## Ontologia minima recomendada

- Documento
- Clausula
- Obrigacao
- Risco
- Jurisdicao
- Precedente
- Politica interna
- Parecer preliminar

## Riscos criticos

- Interpretacao normativa sem base documental.
- Uso de jurisdicao incorreta.
- Saida assertiva sem nivel de confianca.

## Arquitetura de referencia

- Agente `doc-parser`: extrai estrutura juridica.
- Agente `legal-reasoner`: compara com normas e politicas.
- Agente `risk-critic`: pontua risco e lacunas.
- Agente `compliance-guard`: valida aderencia de output.

## Evals essenciais

- Precisao na classificacao de clausulas.
- Cobertura de riscos contratuais criticos.
- Qualidade do rationale juridico.

## Proximo passo

Executar [Lab Juridico](./lab-juridico)
