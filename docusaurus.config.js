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
      image: 'img/docusaurus-social-card.jpg',
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
            to: '/docs/intro',
            position: 'left',
            label: 'Guide',
          },
          {
            to: '/docs/manifesto/declaration',
            position: 'left',
            label: 'Manifesto',
          },
          {
            to: '/docs/comunidade/roadmap-publico',
            position: 'left',
            label: 'Roadmap',
          },
          {
            to: '/docs/especializacoes/visao-geral',
            position: 'left',
            label: 'Specializations',
          },
          {
            to: '/docs/plataforma-pratica/visao-geral',
            position: 'left',
            label: 'Practice',
          },
          {
            to: '/docs/arquiteturas-avancadas/visao-geral',
            position: 'left',
            label: 'Advanced',
          },
          {
            to: '/docs/economia-ia/visao-geral',
            position: 'left',
            label: 'Economics',
          },
          {
            to: '/docs/seguranca-adversarial/visao-geral',
            position: 'left',
            label: 'Security',
          },
          {
            to: '/docs/onboarding-corporativo/visao-geral',
            position: 'left',
            label: 'Onboarding',
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
            title: 'Course',
            items: [
              {
                label: 'Declaration',
                to: '/docs/manifesto/declaration',
              },
              {
                label: 'Overview',
                to: '/docs/intro',
              },
              {
                label: 'Core Track',
                to: '/docs/trilha/fundamentos-ssa',
              },
            ],
          },
          {
            title: 'Project',
            items: [
              {
                label: 'Templates',
                to: '/docs/templates/template-architecture-spec-semantica',
              },
              {
                label: 'Capstone',
                to: '/docs/certificacao/capstone-ssa',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'How to contribute',
                to: '/docs/comunidade/como-contribuir',
              },
              {
                label: 'Repository',
                href: 'https://github.com/brotto/semantic-systems-architect-site',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} SSA Academy.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
