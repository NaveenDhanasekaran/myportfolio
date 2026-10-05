import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, pad, ArrowIcon } from '../components/Section';
import { profile } from '../data';
import { company, matrimonyProjects } from '../matrimonyProjects';

const Block = ({ title, children }) => (
  <motion.section className="case-block" {...fadeUp}>
    <h2>{title}</h2>
    <div className="case-block-body">{children}</div>
  </motion.section>
);

function ProjectPage({ slug, goTo }) {
  const index = matrimonyProjects.findIndex((p) => p.slug === slug);
  const project = matrimonyProjects[index];

  useEffect(() => {
    document.title = project
      ? `${project.title} | ${profile.name}`
      : `Project not found | ${profile.name}`;
    return () => {
      document.title = `${profile.name} | ${profile.title}`;
    };
  }, [project]);

  if (!project) {
    return (
      <div className="container case-page">
        <h1 className="case-title">Project not found</h1>
        <a className="text-link" href="#/" onClick={(e) => goTo(e, 'work')}>
          <ArrowIcon direction="left" /> Back to all projects
        </a>
      </div>
    );
  }

  const prev = matrimonyProjects[(index - 1 + matrimonyProjects.length) % matrimonyProjects.length];
  const next = matrimonyProjects[(index + 1) % matrimonyProjects.length];

  return (
    <article className="case-page">
      <div className="container">
        <a className="text-link back-link" href="#/" onClick={(e) => goTo(e, 'work')}>
          <ArrowIcon direction="left" /> All {company.name} projects
        </a>

        <motion.header
          className="case-header"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="eyebrow">
            {pad(index + 1)} <span className="eyebrow-sep" /> {company.name}{' '}
            <span className="eyebrow-sep" /> {project.category}
          </p>
          <h1 className="case-title">{project.title}</h1>
          <p className="case-lead">{project.summary}</p>
        </motion.header>

        <motion.dl
          className="case-meta"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div>
            <dt>Company</dt>
            <dd>{company.name}</dd>
          </div>
          <div>
            <dt>Role</dt>
            <dd>{company.role}</dd>
          </div>
          <div>
            <dt>Team</dt>
            <dd>{company.team}</dd>
          </div>
          {project.facts?.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd className="case-fact">{fact.value}</dd>
            </div>
          ))}
        </motion.dl>

        <div className="case-content">
          <Block title="The problem">
            {project.problem.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Block>

          <Block title="What I built">
            {project.built.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            {project.builtList && (
              <ul className="case-list">
                {project.builtList.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </Block>

          <Block title="Engineering highlights">
            <ol className="highlight-list">
              {project.highlights.map((h, i) => (
                <li key={h.title}>
                  <span className="case-number">{pad(i + 1)}</span>
                  <div>
                    <h3>{h.title}</h3>
                    <p>{h.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Block>

          {project.outcome && (
            <Block title="Outcome">
              {project.outcome.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </Block>
          )}

          <Block title="Technology">
            <ul className="stack-list">
              {project.stack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Block>
        </div>

        <nav className="case-pager" aria-label="More projects">
          <a href={`#/matrimony/${prev.slug}`}>
            <span className="pager-label">
              <ArrowIcon direction="left" /> Previous
            </span>
            <span className="pager-title">{prev.title}</span>
          </a>
          <a href={`#/matrimony/${next.slug}`} className="pager-next">
            <span className="pager-label">
              Next <ArrowIcon />
            </span>
            <span className="pager-title">{next.title}</span>
          </a>
        </nav>
      </div>
    </article>
  );
}

export default ProjectPage;
