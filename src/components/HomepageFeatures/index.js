import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Conceptual foundations',
    description:
      'Foundations of computational semantics, ontologies, and decision design for AI.',
  },
  {
    title: 'Applied architecture',
    description:
      'Design of agents, workflows, semantic contracts, and context engineering.',
  },
  {
    title: 'Practice and certification',
    description:
      'Labs, templates, rubrics, and capstone to form a production-ready SSA.',
  },
  {
    title: 'Foundational movement',
    description:
      'Declaration, manifesto, and open roadmap to build SSA as a lasting discipline.',
  },
];

function Feature({title, description}) {
  return (
    <article className={clsx('col col--3', styles.card)}>
      <Heading as="h3" className={styles.cardTitle}>
        {title}
      </Heading>
      <p>{description}</p>
    </article>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props) => (
            <Feature key={props.title} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
