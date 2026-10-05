import React from 'react';
import { motion } from 'framer-motion';

// React Bits-style animated components using Framer Motion

// Fade In Animation
export const FadeIn = ({ children, delay = 0, duration = 0.6 }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration, delay }}
  >
    {children}
  </motion.div>
);

// Slide In Animation
export const SlideIn = ({ children, direction = 'up', delay = 0 }) => {
  const directions = {
    up: { y: 50 },
    down: { y: -50 },
    left: { x: 50 },
    right: { x: -50 }
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
};

// Scale Animation
export const ScaleIn = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay }}
  >
    {children}
  </motion.div>
);

// Hover Glow Effect
export const HoverGlow = ({ children, glowColor = '#00D4FF' }) => (
  <motion.div
    whileHover={{
      boxShadow: `0 0 30px ${glowColor}`,
      scale: 1.05
    }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

// Stagger Children Animation
export const StaggerContainer = ({ children, staggerDelay = 0.1 }) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={{
      visible: {
        transition: {
          staggerChildren: staggerDelay
        }
      }
    }}
  >
    {children}
  </motion.div>
);

export const StaggerItem = ({ children }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    }}
  >
    {children}
  </motion.div>
);

// Pulse Animation
export const Pulse = ({ children }) => (
  <motion.div
    animate={{
      scale: [1, 1.05, 1],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    {children}
  </motion.div>
);

// Floating Animation
export const Float = ({ children }) => (
  <motion.div
    animate={{
      y: [0, -10, 0],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    {children}
  </motion.div>
);

// Rotate Animation
export const Rotate = ({ children, duration = 20 }) => (
  <motion.div
    animate={{
      rotate: 360
    }}
    transition={{
      duration,
      repeat: Infinity,
      ease: "linear"
    }}
  >
    {children}
  </motion.div>
);

// Text Reveal Animation
export const TextReveal = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay }}
  >
    {children}
  </motion.div>
);

// Card Flip Animation
export const FlipCard = ({ children, front, back }) => {
  const [isFlipped, setIsFlipped] = React.useState(false);

  return (
    <motion.div
      onClick={() => setIsFlipped(!isFlipped)}
      style={{ cursor: 'pointer', perspective: 1000 }}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div style={{ backfaceVisibility: 'hidden' }}>
          {front}
        </div>
        <div style={{ 
          backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          position: 'absolute',
          top: 0,
          left: 0
        }}>
          {back}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default {
  FadeIn,
  SlideIn,
  ScaleIn,
  HoverGlow,
  StaggerContainer,
  StaggerItem,
  Pulse,
  Float,
  Rotate,
  TextReveal,
  FlipCard
};
