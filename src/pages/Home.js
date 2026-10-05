import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Section, { fadeUp, pad, ArrowIcon } from '../components/Section';
import { profile, services, experience, products, websites, faqs } from '../data';
import { company, matrimonyProjects } from '../matrimonyProjects';
import { whatsappLink, WhatsAppIcon } from '../components/WhatsApp';

// The Work section groups everything into one place, with a tab per group.
const workGroups = [
  {
    id: 'matrimony',
    label: company.name,
    heading: `${company.name} projects`,
    meta: `${company.role} / ${company.team} / ${company.duration}`,
    intro: company.intro,
    items: matrimonyProjects.map((p) => ({
      key: p.slug,
      title: p.title,
      category: p.category,
      description: p.summary,
      href: `/matrimony/${p.slug}`,
      cta: 'Read case study',
    })),
  },
  {
    id: 'products',
    label: 'Products',
    heading: 'Products',
    intro: 'Business software built for clients, from data model to deployed application.',
    items: products.map((p) => ({
      key: p.title,
      title: p.title,
      category: p.category,
      description: p.description,
      href: p.link,
      external: true,
      cta: 'Visit site',
    })),
  },
  {
    id: 'websites',
    label: 'Websites',
    heading: 'Websites',
    intro: 'Web development for businesses in India and Australia. Each project links to the live site.',
    items: websites.map((p) => ({
      key: p.title,
      title: p.title,
      category: p.category,
      description: p.description,
      href: p.link,
      external: true,
      cta: 'Visit site',
    })),
  },
];

const totalItems =workGroups.reduce((n, g) => n + g.items.length, 0);

const WorkCard = ({ item, number }) => {
  const Tag = item.href ? motion.a : motion.div;
  const linkProps = item.href
    ? {
        href: item.href,
        ...(item.external && { target: '_blank', rel: 'noopener noreferrer' }),
      }
    : {};
  return (
    <Tag className={`case-card ${item.href ? '' : 'no-link'}`} {...linkProps} {...fadeUp}>
      <div className="case-card-top">
        <span className="case-number">{pad(number)}</span>
        <span className="case-category">{item.category}</span>
      </div>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      {item.href && (
        <span className="case-link">
          {item.cta} <ArrowIcon />
        </span>
      )}
    </Tag>
  );
};

function Home({ goTo, scrollTarget, onScrolled }) {
  const [tab, setTab] = useState('all');

  useEffect(() => {
    if (!scrollTarget) return;
    document.getElementById(scrollTarget)?.scrollIntoView();
    onScrolled();
  }, [scrollTarget, onScrolled]);

  const visibleGroups = tab === 'all' ? workGroups : workGroups.filter((g) => g.id === tab);

  return (
    <>
      {/* Hero */}
      <section id="top" className="hero">
        <div className="container">
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {profile.fullName} <span className="eyebrow-sep" /> {profile.title}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          >
            {profile.headline}
          </motion.h1>
          <motion.div
            className="hero-foot"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <p className="hero-intro">{profile.intro}</p>
            <div className="hero-actions">
              <p className="availability">
                <span className="status-dot" />
                {profile.availability}
              </p>
              <div className="button-row">
                <a className="button button-solid" href="/" onClick={(e) => goTo(e, 'contact')}>
                  Get in touch
                </a>
                <a className="button" href="/" onClick={(e) => goTo(e, 'work')}>
                  View work
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Section id="about" number="01" title="About">
        <motion.div className="prose" {...fadeUp}>
          {profile.about.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </motion.div>
        <motion.ul className="stack-list" {...fadeUp}>
          {profile.stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </motion.ul>
      </Section>

      <Section id="experience" number="02" title="Experience">
        <ol className="row-list">
          {experience.map((item) => (
            <motion.li key={item.company} className="row experience-row" {...fadeUp}>
              <div className="row-meta">{item.duration}</div>
              <div>
                <h3>{item.company}</h3>
                {item.role !== item.duration && <p className="row-sub">{item.role}</p>}
                <p>{item.description}</p>
                {item.link && (
                  <a
                    className="text-link"
                    href="/"
                    onClick={(e) => {
                      setTab(item.link);
                      goTo(e, 'work');
                    }}
                  >
                    See the projects <ArrowIcon />
                  </a>
                )}
              </div>
            </motion.li>
          ))}
        </ol>
      </Section>

      <Section id="work" number="03" title="Work">
        <div className="filter-row work-tabs" role="tablist" aria-label="Work categories">
          {[{ id: 'all', label: 'All', count: totalItems }, ...workGroups.map((g) => ({ ...g, count: g.items.length }))].map(
            (t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={tab === t.id}
                className={`filter-chip ${tab === t.id ? 'active' : ''}`}
                onClick={() => setTab(t.id)}
              >
                {t.label} <span className="chip-count">{t.count}</span>
              </button>
            )
          )}
        </div>

        {visibleGroups.map((group) => (
          <div key={group.id} className="work-group">
            <div className="work-group-head">
              <h3>{group.heading}</h3>
              {group.meta && <p className="row-sub">{group.meta}</p>}
              <p>{group.intro}</p>
            </div>
            <div className="case-grid">
              {group.items.map((item, i) => (
                <WorkCard key={item.key} item={item} number={i + 1} />
              ))}
            </div>
          </div>
        ))}
      </Section>

      <Section id="services" number="04" title="Services">
        <div className="service-grid">
          {services.map((service) => (
            <motion.article key={service.title} className="service" {...fadeUp}>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </motion.article>
          ))}
        </div>
      </Section>

      <Section id="faq" number="05" title="Questions">
        <dl className="faq-list">
          {faqs.map((item) => (
            <motion.div key={item.question} className="faq-item" {...fadeUp}>
              <dt>{item.question}</dt>
              <dd>{item.answer}</dd>
            </motion.div>
          ))}
        </dl>
      </Section>

      <Section id="contact" number="06" title="Contact">
        <motion.div {...fadeUp}>
          <p className="contact-lead">
            Have a project in mind? Message me on WhatsApp or send an email with a few lines
            about what you are building, and I will get back to you.
          </p>
          <a className="contact-email" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <div className="contact-actions">
            <a className="button button-solid" href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon /> Message on WhatsApp
            </a>
            <a className="button" href={`tel:${profile.phone.replace(/\s/g, '')}`}>
              Call {profile.phone}
            </a>
          </div>
        </motion.div>
      </Section>
    </>
  );
}

export default Home;
