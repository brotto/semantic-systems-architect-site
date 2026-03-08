// @ts-check

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Semantic Systems Architect',
  tagline: 'Curso aberto para modelar sistemas via semantica e IA',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://brotto.github.io',
  baseUrl: '/semantic-systems-architect-site/',

  organizationName: 'brotto',
  projectName: 'semantic-systems-architect-site',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'pt-BR',
    locales: ['pt-BR'],
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
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'SSA Academy',
        logo: {
          alt: 'SSA Academy',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Curso',
          },
          {
            to: '/docs/intro',
            position: 'left',
            label: 'Guia',
          },
          {
            to: '/docs/comunidade/roadmap-publico',
            position: 'left',
            label: 'Roadmap',
          },
          {
            to: '/docs/especializacoes/visao-geral',
            position: 'left',
            label: 'Especializacoes',
          },
          {
            to: '/docs/plataforma-pratica/visao-geral',
            position: 'left',
            label: 'Pratica',
          },
          {
            to: '/docs/arquiteturas-avancadas/visao-geral',
            position: 'left',
            label: 'Avancadas',
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
            title: 'Curso',
            items: [
              {
                label: 'Visao Geral',
                to: '/docs/intro',
              },
              {
                label: 'Trilha Principal',
                to: '/docs/trilha/fundamentos-ssa',
              },
            ],
          },
          {
            title: 'Projeto',
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
            title: 'Comunidade',
            items: [
              {
                label: 'Como contribuir',
                to: '/docs/comunidade/como-contribuir',
              },
              {
                label: 'Repositorio',
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
