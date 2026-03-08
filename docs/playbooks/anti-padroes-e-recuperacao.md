# Playbook - Anti-padrões e Recuperação

## Anti-padrão 1: Prompt monolítico sem contrato

Sintoma:
- Resultado inconsistente entre execuções.

Correção:
- Separar identidade, política, objetivo e formato.
- Introduzir contrato semântico e validação de output.

## Anti-padrão 2: Agentes com escopo sobreposto

Sintoma:
- Conflito de decisões e respostas redundantes.

Correção:
- Reespecificar missão e fronteira de cada agente.
- Definir protocolo de handoff.

## Anti-padrão 3: Qualidade sem métricas

Sintoma:
- Discussão subjetiva sobre "parece melhor".

Correção:
- Criar baseline + suite de evals + gate de release.

## Anti-padrão 4: Falta de governança de risco

Sintoma:
- Incidentes de segurança sem trilha de causa.

Correção:
- Implementar matriz de risco, controles de acesso e auditoria.

## Anti-padrão 5: Escala sem operação

Sintoma:
- Sistema quebra em volume real.

Correção:
- Definir SLOs, runbook, alertas e processo de incident response.
