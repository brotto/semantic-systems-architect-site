import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './manifesto.module.css';

const theses = [
  {
    title: 'From Syntax to Semantics',
    text: 'Computing is moving from rigid syntax as a primary interface to structured meaning as a design medium.',
  },
  {
    title: 'Intention as Architecture',
    text: 'In the AI era, system behavior can be architected through language, ontologies, goals, and decision contracts.',
  },
  {
    title: 'Open Foundational Movement',
    text: 'SSA is not only a role. It is an open discipline that needs public standards, shared methods, and community governance.',
  },
];

const signatories = [
  {
    name: 'brotto.io',
    role: 'Founding Steward',
    note: 'Initiator and maintainer of the open SSA platform.',
  },
];

const signatureIssueUrl =
  'https://github.com/brotto/semantic-systems-architect-site/issues/new?template=manifesto_signature.yml';

export default function ManifestoPage() {
  return (
    <Layout
      title="SSA Declaration"
      description="The campaign page for the Semantic Systems Architect declaration and manifesto."
    >
      <main className={styles.page}>
        <header className={styles.hero}>
          <div className="container">
            <p className={styles.kicker}>Foundational movement</p>
            <Heading as="h1" className={styles.title}>
              The Semantic Systems Architect Declaration
            </Heading>
            <p className={styles.subtitle}>
              A fundamental shift is unfolding in computing. We are moving from coding syntax to architecting
              meaning.
            </p>
            <div className={styles.heroButtons}>
              <Link className="button button--lg" to="/docs/manifesto/ssa-manifesto">
                Read long manifesto
              </Link>
              <Link className="button button--secondary button--lg" href={signatureIssueUrl}>
                Sign declaration
              </Link>
            </div>
          </div>
        </header>

        <section className={styles.section}>
          <div className="container">
            <div className={styles.declarationCard}>
              <Heading as="h2">Declaration (short version)</Heading>
              <p>Programming was treated as writing code. But code was always an intermediary.</p>
              <p>The deepest substrate of computation is meaning.</p>
              <p>
                As AI systems learn to operate over semantic structures, a new engineering layer emerges: architecture
                of intention, goals, agents, and knowledge.
              </p>
              <p>That layer is Semantic Systems Architecture.</p>
              <p>Its practitioner is the Semantic Systems Architect.</p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <Heading as="h2" className={styles.sectionTitle}>
              Why this matters now
            </Heading>
            <div className={styles.grid}>
              {theses.map((item) => (
                <article key={item.title} className={styles.card}>
                  <Heading as="h3">{item.title}</Heading>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <Heading as="h2" className={styles.sectionTitle}>
              Community signatures
            </Heading>
            <p className={styles.sectionText}>
              Add your signature to this declaration and help establish SSA as a shared public discipline.
            </p>
            <div className={styles.signatureList}>
              {signatories.map((signatory) => (
                <article key={signatory.name} className={styles.signatureCard}>
                  <Heading as="h3">{signatory.name}</Heading>
                  <p className={styles.signatureMeta}>{signatory.role}</p>
                  <p>{signatory.note}</p>
                </article>
              ))}
            </div>
            <div className={styles.signatureActions}>
              <Link className="button button--lg" href={signatureIssueUrl}>
                Submit signature
              </Link>
              <Link className="button button--secondary button--lg" to="/docs/comunidade/como-contribuir">
                Contribute content
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <Heading as="h2" className={styles.sectionTitle}>
              Share text
            </Heading>
            <div className={styles.shareBox}>
              <p>
                The Semantic Systems Architect Declaration: computing is moving from syntax to semantics. A new
                discipline is emerging to design systems through language, intention, and structured meaning.
              </p>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
