export const EASE = [0.22, 1, 0.36, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

export const sectionFadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

export const staticFade = {
  hidden: { opacity: 1, y: 0, scale: 1 },
  show: { opacity: 1, y: 0, scale: 1 },
};

export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

export const softFadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: EASE },
  },
};

export const softStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.06 } },
};

export const replayViewport = {
  once: false,
  margin: "-10% 0px -10% 0px",
  amount: 0.25,
};

export const emblemReveal = {
  hidden: { opacity: 0, scale: 0.82 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.6, ease: EASE },
  },
};
