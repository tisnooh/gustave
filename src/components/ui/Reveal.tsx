'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { EASE, REVEAL_DURATION, REVEAL_Y } from '@/lib/motion';

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
};

/** Révélation douce au scroll — la même partout, pour un rythme homogène. */
export function Reveal({ children, className, delay = 0, y = REVEAL_Y, once = true }: RevealProps) {
  const reduce = useReducedMotion();
  if (reduce) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-70px' }}
      transition={{ duration: REVEAL_DURATION, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
