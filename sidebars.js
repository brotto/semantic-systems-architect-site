// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Trilha Principal',
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
      label: 'Laboratorios',
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
      label: 'Certificacao',
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
      label: 'Carreira',
      items: [
        'carreira/plano-90-dias-ssa',
        'carreira/trilha-de-carreira-ssa',
      ],
    },
    {
      type: 'category',
      label: 'Especializacoes',
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
      label: 'Plataforma de Pratica',
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
      label: 'Arquiteturas Avancadas',
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
      label: 'Economia de IA',
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
      label: 'Referencias',
      items: [
        'referencias/mapa-de-competencias-ssa',
        'referencias/glossario-ssa',
        'referencias/roteiro-de-estudos-e-leitura',
      ],
    },
    {
      type: 'category',
      label: 'Comunidade',
      items: [
        'comunidade/como-contribuir',
        'comunidade/governanca',
        'comunidade/roadmap-publico',
      ],
    },
  ],
};

export default sidebars;
