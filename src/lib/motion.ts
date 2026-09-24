/**
 * Primitives d'animation partagées — volontairement sobres :
 * reveals lents, courbes douces, aucun effet « gaming ».
 */

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const REVEAL_DURATION = 0.9;

/** Décalage vertical standard des révélations au scroll */
export const REVEAL_Y = 28;

export const staggerContainer = (stagger = 0.12, delay = 0) => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

export const fadeUpItem = {
  hidden: { opacity: 0, y: REVEAL_Y },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: REVEAL_DURATION, ease: EASE },
  },
};
