// @ts-check

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Semantic Systems Architect',
  tagline: 'Computing beyond syntax, toward the architecture of meaning',
  favicon: 'img/brotto-logo-256.png',

  future: {
    v4: true,
  },

  url: 'https://brotto.github.io',
  baseUrl: '/semantic-systems-architect-site/',

  organizationName: 'brotto',
  projectName: 'semantic-systems-architect-site',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      ({
        hashed: true,
        language: ['en'],
        indexBlog: false,
        docsRouteBasePath: '/docs',
      }),
    ],
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: 'docs',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/brotto-logo-256.png',
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },
      navbar: {
        title: 'brotto.io | SSA',
        logo: {
          alt: 'brotto.io',
          src: 'img/brotto-logo-256.png',
          width: 32,
          height: 32,
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Course',
          },
          {
            to: '/manifesto',
            position: 'left',
            label: 'Manifesto',
          },
          {
            type: 'dropdown',
            label: 'Explore',
            position: 'left',
            items: [
              {
                label: 'Specializations',
                to: '/docs/especializacoes/visao-geral',
              },
              {
                label: 'Advanced Architectures',
                to: '/docs/arquiteturas-avancadas/visao-geral',
              },
              {
                label: 'AI Economics',
                to: '/docs/economia-ia/visao-geral',
              },
              {
                label: 'Adversarial Security',
                to: '/docs/seguranca-adversarial/visao-geral',
              },
              {
                label: 'Corporate Onboarding',
                to: '/docs/onboarding-corporativo/visao-geral',
              },
              {
                label: 'Practice Platform',
                to: '/docs/plataforma-pratica/visao-geral',
              },
            ],
          },
          {
            to: '/docs/comunidade/roadmap-publico',
            position: 'left',
            label: 'Community',
          },
          {
            href: 'https://github.com/brotto/semantic-systems-architect-site',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Learn',
            items: [
              {
                label: 'Course overview',
                to: '/docs/intro',
              },
              {
                label: 'Core Track',
                to: '/docs/trilha/fundamentos-ssa',
              },
              {
                label: 'Labs',
                to: '/docs/labs/lab-01-modelagem-dominio-contrato-semantico',
              },
              {
                label: 'Templates',
                to: '/docs/templates/template-architecture-spec-semantica',
              },
              {
                label: 'Certification',
                to: '/docs/certificacao/capstone-ssa',
              },
            ],
          },
          {
            title: 'Explore',
            items: [
              {
                label: 'Specializations',
                to: '/docs/especializacoes/visao-geral',
              },
              {
                label: 'Advanced Architectures',
                to: '/docs/arquiteturas-avancadas/visao-geral',
              },
              {
                label: 'AI Economics',
                to: '/docs/economia-ia/visao-geral',
              },
              {
                label: 'Adversarial Security',
                to: '/docs/seguranca-adversarial/visao-geral',
              },
              {
                label: 'Corporate Onboarding',
                to: '/docs/onboarding-corporativo/visao-geral',
              },
            ],
          },
          {
            title: 'Resources',
            items: [
              {
                label: 'Playbooks',
                to: '/docs/playbooks/padroes-arquiteturais-ssa',
              },
              {
                label: 'Career path',
                to: '/docs/carreira/trilha-de-carreira-ssa',
              },
              {
                label: 'Glossary',
                to: '/docs/referencias/glossario-ssa',
              },
              {
                label: 'Competency map',
                to: '/docs/referencias/mapa-de-competencias-ssa',
              },
              {
                label: 'Practice Platform',
                to: '/docs/plataforma-pratica/visao-geral',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Manifesto',
                to: '/manifesto',
              },
              {
                label: 'How to contribute',
                to: '/docs/comunidade/como-contribuir',
              },
              {
                label: 'Governance',
                to: '/docs/comunidade/governanca',
              },
              {
                label: 'Roadmap',
                to: '/docs/comunidade/roadmap-publico',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/brotto/semantic-systems-architect-site',
              },
            ],
          },
        ],
        copyright: `Copyright \u00a9 ${new Date().getFullYear()} SSA Academy \u00b7 brotto.io`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
