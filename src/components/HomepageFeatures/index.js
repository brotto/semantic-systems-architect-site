import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Base conceitual',
    description:
      'Fundamentos de semantica computacional, ontologias e design de decisao para IA.',
  },
  {
    title: 'Arquitetura aplicada',
    description:
      'Projeto de agentes, workflows, contratos semanticos e engenharia de contexto.',
  },
  {
    title: 'Pratica e certificacao',
    description:
      'Labs, templates, rubricas e capstone para formar um SSA pronto para producao.',
  },
];

function Feature({title, description}) {
  return (
    <article className={clsx('col col--4', styles.card)}>
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
