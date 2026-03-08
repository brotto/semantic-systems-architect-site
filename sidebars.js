// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Manifesto',
      items: [
        'manifesto/declaration',
        'manifesto/ssa-manifesto',
        'manifesto/foundational-theses',
      ],
    },
    {
      type: 'category',
      label: 'Core Track',
      items: [
        {
          type: 'category',
          label: 'Module 1 — SSA Fundamentals',
          link: { type: 'doc', id: 'trilha/fundamentos-ssa/index' },
          items: [
            'trilha/fundamentos-ssa/licao-01-do-codigo-ao-significado',
            'trilha/fundamentos-ssa/licao-02-anatomia-do-trabalho-ssa',
            'trilha/fundamentos-ssa/licao-03-reformulacao-de-problemas',
            'trilha/fundamentos-ssa/aplicacao-01-diagnostico',
            'trilha/fundamentos-ssa/aplicacao-02-kickoff',
            'trilha/fundamentos-ssa/avaliacao',
          ],
        },
        {
          type: 'category',
          label: 'Module 2 — Semantic Modeling & Ontologies',
          link: { type: 'doc', id: 'trilha/modelagem-semantica-e-ontologias/index' },
          items: [
            'trilha/modelagem-semantica-e-ontologias/licao-01-decomposicao-de-dominio',
            'trilha/modelagem-semantica-e-ontologias/licao-02-engenharia-de-restricoes',
            'trilha/modelagem-semantica-e-ontologias/licao-03-empacotamento-de-contratos',
            'trilha/modelagem-semantica-e-ontologias/aplicacao-01-ontologia-v1',
            'trilha/modelagem-semantica-e-ontologias/aplicacao-02-teste-de-ambiguidade',
            'trilha/modelagem-semantica-e-ontologias/avaliacao',
          ],
        },
        {
          type: 'category',
          label: 'Module 3 — Agent Architecture',
          link: { type: 'doc', id: 'trilha/arquitetura-de-agentes/index' },
          items: [
            'trilha/arquitetura-de-agentes/licao-01-design-de-papeis',
            'trilha/arquitetura-de-agentes/licao-02-topologias-de-orquestracao',
            'trilha/arquitetura-de-agentes/licao-03-protocolos-e-seguranca',
            'trilha/arquitetura-de-agentes/aplicacao-01-pacote-multiagente',
            'trilha/arquitetura-de-agentes/aplicacao-02-simulacao-de-falhas',
            'trilha/arquitetura-de-agentes/avaliacao',
          ],
        },
        {
          type: 'category',
          label: 'Module 4 — Workflows, Tools & Pipelines',
          link: { type: 'doc', id: 'trilha/workflows-ferramentas-e-pipelines/index' },
          items: [
            'trilha/workflows-ferramentas-e-pipelines/licao-01-design-de-workflows',
            'trilha/workflows-ferramentas-e-pipelines/licao-02-integracao-de-ferramentas',
            'trilha/workflows-ferramentas-e-pipelines/licao-03-resiliencia-operacional',
            'trilha/workflows-ferramentas-e-pipelines/aplicacao-01-pipeline-operacional',
            'trilha/workflows-ferramentas-e-pipelines/aplicacao-02-pacote-rastreabilidade',
            'trilha/workflows-ferramentas-e-pipelines/avaliacao',
          ],
        },
        {
          type: 'category',
          label: 'Module 5 — Context Engineering & Prompting',
          link: { type: 'doc', id: 'trilha/context-engineering-e-prompting-estrutural/index' },
          items: [
            'trilha/context-engineering-e-prompting-estrutural/licao-01-arquitetura-de-contexto',
            'trilha/context-engineering-e-prompting-estrutural/licao-02-design-de-prompt-contratual',
            'trilha/context-engineering-e-prompting-estrutural/licao-03-validacao-e-consistencia',
            'trilha/context-engineering-e-prompting-estrutural/aplicacao-01-pacote-de-contexto',
            'trilha/context-engineering-e-prompting-estrutural/aplicacao-02-sprint-de-hardening',
            'trilha/context-engineering-e-prompting-estrutural/avaliacao',
          ],
        },
        {
          type: 'category',
          label: 'Module 6 — Evaluation, Quality & Observability',
          link: { type: 'doc', id: 'trilha/avaliacao-qualidade-observabilidade/index' },
          items: [
            'trilha/avaliacao-qualidade-observabilidade/licao-01-definicao-de-metricas',
            'trilha/avaliacao-qualidade-observabilidade/licao-02-construcao-de-eval-suite',
            'trilha/avaliacao-qualidade-observabilidade/licao-03-monitoramento-operacional',
            'trilha/avaliacao-qualidade-observabilidade/aplicacao-01-suite-de-qualidade',
            'trilha/avaliacao-qualidade-observabilidade/aplicacao-02-drill-de-regressao',
            'trilha/avaliacao-qualidade-observabilidade/avaliacao',
          ],
        },
        {
          type: 'category',
          label: 'Module 7 — Security, Governance & Ethics',
          link: { type: 'doc', id: 'trilha/seguranca-governanca-etica/index' },
          items: [
            'trilha/seguranca-governanca-etica/licao-01-modelo-de-ameacas',
            'trilha/seguranca-governanca-etica/licao-02-governanca-e-controle',
            'trilha/seguranca-governanca-etica/licao-03-etica-e-alinhamento',
            'trilha/seguranca-governanca-etica/aplicacao-01-auditoria-de-seguranca',
            'trilha/seguranca-governanca-etica/aplicacao-02-framework-etico',
            'trilha/seguranca-governanca-etica/avaliacao',
          ],
        },
        {
          type: 'category',
          label: 'Module 8 — Product, Operations & Scale',
          link: { type: 'doc', id: 'trilha/produto-operacao-escala/index' },
          items: [
            'trilha/produto-operacao-escala/licao-01-produto-e-roadmap',
            'trilha/produto-operacao-escala/licao-02-operacoes-e-incidentes',
            'trilha/produto-operacao-escala/licao-03-escala-e-evolucao',
            'trilha/produto-operacao-escala/aplicacao-01-plano-de-lancamento',
            'trilha/produto-operacao-escala/aplicacao-02-plano-de-operacoes',
            'trilha/produto-operacao-escala/avaliacao',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Labs',
      items: [
        'labs/lab-01-modelagem-dominio-contrato-semantico',
        'labs/lab-02-sistema-multiagente-com-ferramentas',
        'labs/lab-03-hardening-para-producao',
      ],
    },
    {
      type: 'category',
      label: 'Templates',
      items: [
        'templates/template-architecture-spec-semantica',
        'templates/template-ontologia-de-dominio',
        'templates/template-system-prompt-estrutural',
        'templates/template-suite-de-evals',
      ],
    },
    {
      type: 'category',
      label: 'Certification',
      items: [
        'certificacao/rubricas-de-avaliacao',
        'certificacao/capstone-ssa',
      ],
    },
    {
      type: 'category',
      label: 'Playbooks',
      items: [
        'playbooks/padroes-arquiteturais-ssa',
        'playbooks/anti-padroes-e-recuperacao',
      ],
    },
    {
      type: 'category',
      label: 'Career',
      items: [
        'carreira/plano-90-dias-ssa',
        'carreira/trilha-de-carreira-ssa',
      ],
    },
    {
      type: 'category',
      label: 'Specializations',
      items: [
        'especializacoes/visao-geral',
        'especializacoes/ssa-para-saude',
        'especializacoes/lab-saude',
        'especializacoes/ssa-para-juridico',
        'especializacoes/lab-juridico',
        'especializacoes/ssa-para-suporte-b2b',
        'especializacoes/lab-suporte-b2b',
      ],
    },
    {
      type: 'category',
      label: 'Practice Platform',
      items: [
        'plataforma-pratica/visao-geral',
        'plataforma-pratica/banco-de-casos',
        'plataforma-pratica/evals-comunitarias',
        'plataforma-pratica/capstones-referencia',
        'plataforma-pratica/matriz-maturidade-ssa',
        'plataforma-pratica/como-submeter',
      ],
    },
    {
      type: 'category',
      label: 'Advanced Architectures',
      items: [
        'arquiteturas-avancadas/visao-geral',
        'arquiteturas-avancadas/rag-em-producao',
        'arquiteturas-avancadas/design-ingestao-indexacao',
        'arquiteturas-avancadas/retrieval-e-reranking',
        'arquiteturas-avancadas/avaliacao-rag',
        'arquiteturas-avancadas/operacao-rag',
        'arquiteturas-avancadas/lab-rag-producao',
      ],
    },
    {
      type: 'category',
      label: 'AI Economics',
      items: [
        'economia-ia/visao-geral',
        'economia-ia/modelo-de-custos',
        'economia-ia/unit-economics',
        'economia-ia/otimizacao-tecnica',
        'economia-ia/governanca-finops',
        'economia-ia/dashboard-e-metricas',
        'economia-ia/lab-otimizacao-custos',
      ],
    },
    {
      type: 'category',
      label: 'Adversarial Security',
      items: [
        'seguranca-adversarial/visao-geral',
        'seguranca-adversarial/modelo-de-ameacas',
        'seguranca-adversarial/catalogo-de-ataques',
        'seguranca-adversarial/metodologia-red-teaming',
        'seguranca-adversarial/evals-adversariais',
        'seguranca-adversarial/resposta-a-incidentes',
        'seguranca-adversarial/lab-seguranca-adversarial',
      ],
    },
    {
      type: 'category',
      label: 'Corporate Onboarding',
      items: [
        'onboarding-corporativo/visao-geral',
        'onboarding-corporativo/modelo-de-adocao',
        'onboarding-corporativo/plano-30-60-90',
        'onboarding-corporativo/academia-interna',
        'onboarding-corporativo/rituais-e-governanca',
        'onboarding-corporativo/metricas-de-impacto',
        'onboarding-corporativo/lab-rollout-corporativo',
      ],
    },
    {
      type: 'category',
      label: 'References',
      items: [
        'referencias/mapa-de-competencias-ssa',
        'referencias/glossario-ssa',
        'referencias/roteiro-de-estudos-e-leitura',
      ],
    },
    {
      type: 'category',
      label: 'Community',
      items: [
        'comunidade/como-contribuir',
        'comunidade/governanca',
        'comunidade/roadmap-publico',
      ],
    },
  ],
};

export default sidebars;
