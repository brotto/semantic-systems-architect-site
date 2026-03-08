# Playbook - Padrões Arquiteturais SSA

## Padrão 1: Supervisor + Especialistas

Quando usar:
- Problemas com múltiplas competências.
- Necessidade de coordenação explícita.

Vantagens:
- Controle central.
- Boa auditabilidade.

Riscos:
- Gargalo no supervisor.

## Padrão 2: Pipeline por estágio

Quando usar:
- Processos sequenciais previsíveis.
- Requisitos de rastreabilidade por etapa.

Vantagens:
- Simplicidade operacional.
- Fácil medição de performance por fase.

Riscos:
- Menos adaptável a casos inesperados.

## Padrão 3: Critic Loop

Quando usar:
- Saídas de alto impacto exigem revisão interna.

Vantagens:
- Reduz erro sem elevar intervenção humana em todos os casos.

Riscos:
- Pode aumentar latência e custo.

## Padrão 4: Human-in-the-loop seletivo

Quando usar:
- Decisões sensíveis, reguladas ou irreversíveis.

Vantagens:
- Controle de risco.

Riscos:
- Pode reduzir escala se mal calibrado.

## Padrão 5: Roteamento por complexidade

Quando usar:
- Carga heterogênea de tarefas com diferentes custos ideais.

Vantagens:
- Otimiza custo/qualidade.

Riscos:
- Classificação ruim degrada resultado.
