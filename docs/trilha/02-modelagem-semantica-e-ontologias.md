# Módulo 2 - Modelagem Semântica e Ontologias

## Objetivo

Capacitar o SSA a criar modelos de domínio robustos para guiar LLMs com consistência e previsibilidade.

## Competências

- Construir ontologias de domínio aplicadas a sistemas de IA.
- Definir entidades, relações, invariantes e estados.
- Especificar contratos semânticos para entrada, transformação e saída.

## Conteúdo

1. Modelagem de domínio para IA
- Entidades e atributos essenciais
- Relações e cardinalidade
- Taxonomias e níveis de abstração

2. Invariantes e políticas
- Regras invioláveis
- Regras contextuais
- Critérios de exceção

3. Contratos semânticos
- Contrato de input
- Contrato de decisão
- Contrato de output

4. Anti-padrões
- Ontologia vaga
- Campos sobrepostos
- Semântica implícita

## Exercícios

1. Criar ontologia v1 de um domínio real com no mínimo 12 entidades.
2. Definir 15 invariantes (hard e soft constraints).
3. Mapear ambiguidades linguísticas e resolver com definições operacionais.

## Entregável

"Especificação Ontológica SSA" contendo:
- dicionário de entidades
- grafo de relações
- invariantes
- exemplos válidos e inválidos

## Checklist de conclusão

- Modelo reduz ambiguidade de forma mensurável.
- Qualquer novo membro entende o domínio sem conversa adicional.
- LLM gera respostas mais estáveis ao usar a ontologia.
