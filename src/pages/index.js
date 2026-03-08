import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

const stats = [
  { value: '8', label: 'Core modules' },
  { value: '60h', label: 'Total workload' },
  { value: '120+', label: 'Lessons and labs' },
  { value: '3', label: 'Domain specializations' },
];

const tracks = [
  {
    title: 'Core Track',
    description:
      'Eight modules from foundations to production: semantic modeling, agent architecture, workflows, context engineering, evaluation, security, and scale.',
    link: '/docs/trilha/fundamentos-ssa',
    tag: '8 modules',
  },
  {
    title: 'Labs and Templates',
    description:
      'Three hands-on labs plus four reusable architecture templates. Build real systems, not toy examples.',
    link: '/docs/labs/lab-01-modelagem-dominio-contrato-semantico',
    tag: '7 resources',
  },
  {
    title: 'Certification',
    description:
      'Assessment rubrics across six dimensions and a capstone project to prove production readiness.',
    link: '/docs/certificacao/rubricas-de-avaliacao',
    tag: 'Capstone',
  },
];

const specializations = [
  {
    title: 'Healthcare',
    description: 'Clinical triage, safety guardrails, HIPAA constraints, and escalation protocols.',
    link: '/docs/especializacoes/ssa-para-saude',
    accent: 'green',
  },
  {
    title: 'Legal',
    description: 'Contract analysis, clause classification, risk scoring, and jurisdictional rules.',
    link: '/docs/especializacoes/ssa-para-juridico',
    accent: 'blue',
  },
  {
    title: 'B2B Support',
    description: 'Ticket classification, SLA management, escalation logic, and churn prediction.',
    link: '/docs/especializacoes/ssa-para-suporte-b2b',
    accent: 'orange',
  },
];

const advancedTracks = [
  {
    title: 'Advanced Architectures',
    description: 'RAG in production: ingestion, retrieval, reranking, evaluation, and operations.',
    link: '/docs/arquiteturas-avancadas/visao-geral',
  },
  {
    title: 'AI Economics',
    description: 'Cost models, unit economics, technical optimization, and FinOps governance.',
    link: '/docs/economia-ia/visao-geral',
  },
  {
    title: 'Adversarial Security',
    description: 'Threat models, attack catalogs, red teaming, adversarial evals, and incident response.',
    link: '/docs/seguranca-adversarial/visao-geral',
  },
  {
    title: 'Corporate Onboarding',
    description: 'Adoption models, 30-60-90 plans, internal academies, and impact metrics.',
    link: '/docs/onboarding-corporativo/visao-geral',
  },
];

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();

  return (
    <header className={styles.hero}>
      <div className="container">
        <p className={styles.kicker}>brotto.io presents</p>
        <Heading as="h1" className={styles.heroTitle}>
          {siteConfig.title}
        </Heading>
        <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
        <div className={styles.statRow}>
          {stats.map((s) => (
            <div key={s.label} className={styles.stat}>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
        <div className={styles.buttons}>
          <Link className="button button--lg" to="/docs/intro">
            Start learning
          </Link>
          <Link className="button button--secondary button--lg" to="/manifesto">
            Read manifesto
          </Link>
        </div>
      </div>
    </header>
  );
}

function LearningPath() {
  return (
    <section className={styles.section}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          Learning path
        </Heading>
        <p className={styles.sectionSub}>
          A structured progression from first principles to production-ready systems.
        </p>
        <div className={styles.trackGrid}>
          {tracks.map((t) => (
            <Link key={t.title} to={t.link} className={styles.trackCard}>
              <span className={styles.trackTag}>{t.tag}</span>
              <Heading as="h3" className={styles.trackTitle}>{t.title}</Heading>
              <p className={styles.trackDesc}>{t.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Specializations() {
  return (
    <section className={clsx(styles.section, styles.sectionAlt)}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          Domain specializations
        </Heading>
        <p className={styles.sectionSub}>
          Apply SSA principles to real industries with dedicated ontologies, constraints, and labs.
        </p>
        <div className={styles.specGrid}>
          {specializations.map((s) => (
            <Link key={s.title} to={s.link} className={clsx(styles.specCard, styles[s.accent])}>
              <Heading as="h3" className={styles.specTitle}>{s.title}</Heading>
              <p className={styles.specDesc}>{s.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function AdvancedTracks() {
  return (
    <section className={styles.section}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          Advanced tracks
        </Heading>
        <p className={styles.sectionSub}>
          Deep dives into production concerns that every SSA must master.
        </p>
        <div className={styles.advGrid}>
          {advancedTracks.map((t) => (
            <Link key={t.title} to={t.link} className={styles.advCard}>
              <Heading as="h3" className={styles.advTitle}>{t.title}</Heading>
              <p className={styles.advDesc}>{t.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function CommunityBanner() {
  return (
    <section className={clsx(styles.section, styles.sectionAlt)}>
      <div className="container">
        <div className={styles.communityBanner}>
          <div>
            <Heading as="h2" className={styles.sectionTitle}>
              Open discipline, open community
            </Heading>
            <p className={styles.communityText}>
              SSA is not a proprietary framework. It is a public discipline with shared standards,
              community governance, and a transparent roadmap.
            </p>
          </div>
          <div className={styles.communityButtons}>
            <Link className="button button--lg" to="/docs/comunidade/como-contribuir">
              Contribute
            </Link>
            <Link className="button button--secondary button--lg" to="/docs/comunidade/roadmap-publico">
              View roadmap
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();

  return (
    <Layout title={siteConfig.title} description="Open platform for SSA training">
      <HomepageHeader />
      <main>
        <LearningPath />
        <Specializations />
        <AdvancedTracks />
        <CommunityBanner />
      </main>
    </Layout>
  );
}
