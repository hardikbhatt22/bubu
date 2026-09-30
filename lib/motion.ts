import type { Transition, Variants } from 'framer-motion';

/**
 * Two easing curves for the entire site. No spring bounce anywhere — bounce
 * reads as playful UI, and this is a story.
 */
export const ease = {
  enter: [0.16, 1, 0.3, 1] as const,
  exit: [0.7, 0, 0.84, 0] as const,
};

export const dur = {
  micro: 0.16,
  reveal: 0.55,
  scene: 0.9,
  finale: 1.8,
};

/** The motion language changes tempo with the emotional arc, not its curves. */
export const tempo = {
  /** early scenes drift */
  drift: 1.25,
  /** the warm middle */
  warm: 1,
  /** the rain scene is almost motionless — stillness as grief */
  still: 1.9,
  /** the finale accelerates into light */
  light: 0.75,
};

export const enterT = (delay = 0, scale = 1): Transition => ({
  duration: dur.reveal * scale,
  ease: ease.enter,
  delay,
});

/** Line-level reveal: lifts and settles. Space is always reserved by the parent. */
export const lineVariants: Variants = {
  hidden: { opacity: 0, y: 14, filter: 'blur(6px)' },
  shown: { opacity: 1, y: 0, filter: 'blur(0px)' },
};

export const lineVariantsReduced: Variants = {
  hidden: { opacity: 0 },
  shown: { opacity: 1 },
};

export const stagger = (gap = 0.5) => ({
  hidden: {},
  shown: { transition: { staggerChildren: gap, delayChildren: 0.15 } },
});

/** Viewport trigger used by every scene. Never a scroll listener. */
export const inView = { once: true, amount: 0.45 } as const;
export const inViewSoft = { once: true, amount: 0.2 } as const;

/**
 * Atmosphere keyframes. One scalar `t` drives sky, light temperature, fog,
 * stars, lamp bloom and rain. Nothing in the atmosphere is static.
 *
 * t=0.00 dusk · 0.15 evening · 0.35 warm night · 0.55 deep night
 * 0.70 rain · 0.80 rain stops · 0.88 first light · 1.00 sunrise
 */
export const atmosphere = {
  stops: [0, 0.15, 0.35, 0.55, 0.7, 0.8, 0.88, 1],
  skyTop: ['#07080F', '#0B0D1C', '#12152B', '#0A0C18', '#0C0F1C', '#0E1120', '#1B1730', '#2C2140'],
  skyMid: ['#0A0C16', '#141126', '#231640', '#160E2B', '#12151F', '#141826', '#3A2447', '#6B3A4E'],
  skyLow: ['#0D1020', '#241638', '#3B1E63', '#2A1348', '#1A1C28', '#1E2130', '#6E3A50', '#D98A4E'],
  horizon: [0.04, 0.1, 0.22, 0.14, 0.06, 0.08, 0.42, 1],
  stars: [0.5, 0.75, 0.55, 0.85, 0.12, 0.3, 0.16, 0],
  fog: [0.85, 0.55, 0.32, 0.4, 0.7, 0.45, 0.3, 0.12],
  /** global lamp warmth multiplier */
  lamp: [0.35, 0.8, 1, 0.78, 0.3, 0.45, 0.85, 1],
  rain: [0, 0, 0, 0, 1, 0, 0, 0],
  /** desaturation applied to the whole stage during the cold scene */
  sat: [0.9, 1, 1.04, 1, 0.55, 0.8, 1, 1.06],
};
