import React from 'react';
import { motion } from 'framer-motion';

export const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, ease: 'easeOut' },
};

export const pad = (n) => String(n).padStart(2, '0');

export const ArrowIcon = ({ direction = 'right' }) => (
  <svg
    className={`arrow-icon arrow-${direction}`}
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    aria-hidden="true"
  >
    <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);

const Section = ({ id, number, title, children }) => (
  <section id={id} className="section">
    <div className="container section-grid">
      <motion.header className="section-label" {...fadeUp}>
        <span className="section-number">{number}</span>
        <h2>{title}</h2>
      </motion.header>
      <div className="section-body">{children}</div>
    </div>
  </section>
);

export default Section;
