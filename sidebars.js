// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Core Track',
      items: [
        'trilha/fundamentos-ssa',
        'trilha/modelagem-semantica-e-ontologias',
        'trilha/arquitetura-de-agentes',
        'trilha/workflows-ferramentas-e-pipelines',
        'trilha/context-engineering-e-prompting-estrutural',
        'trilha/avaliacao-qualidade-observabilidade',
        'trilha/seguranca-governanca-etica',
        'trilha/produto-operacao-escala',
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
