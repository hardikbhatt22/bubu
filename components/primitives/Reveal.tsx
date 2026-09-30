'use client';

import { motion } from 'framer-motion';
import { useJourney } from '@/lib/useJourney';
import { ease, inView, inViewSoft } from '@/lib/motion';

/**
 * The reveal language. One idea lands, breathes, then the next one arrives.
 *
 * Space is always reserved by the parent layout, so nothing jumps position
 * between beats — that was the single most common failure mode to avoid.
 */

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  /** Tempo multiplier — the motion language slows for grief, quickens for light. */
  tempo?: number;
  soft?: boolean;
  as?: 'div' | 'p' | 'span' | 'li' | 'figure' | 'h2' | 'h3';
}

export function Reveal({
  children,
  delay = 0,
  className = '',
  tempo = 1,
  soft = false,
  as = 'div',
}: RevealProps) {
  const { reduced } = useJourney();
  const M = motion[as] as typeof motion.div;

  return (
    <M
      className={className}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16, filter: 'blur(7px)' }}
      whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={soft ? inViewSoft : inView}
      transition={{
        duration: reduced ? 0.3 : 0.62 * tempo,
        ease: ease.enter,
        delay: reduced ? Math.min(delay, 0.2) : delay,
      }}
    >
      {children}
    </M>
  );
}

interface BeatsProps {
  lines: string[];
  coda?: string;
  className?: string;
  lineClassName?: string;
  codaClassName?: string;
  /** Seconds between beats. Grief is slow; light is quick. */
  gap?: number;
  /** Extra silence before the coda lands. */
  codaSilence?: number;
  tempo?: number;
  start?: number;
}

/**
 * Progressive beats. Never more than three lines visible at once in a scene —
 * enforced by the scene, budgeted in /data/love.ts.
 */
export function Beats({
  lines,
  coda,
  className = '',
  lineClassName = '',
  codaClassName = '',
  gap = 0.55,
  codaSilence = 0.9,
  tempo = 1,
  start = 0,
}: BeatsProps) {
  return (
    <div className={className}>
      {lines.map((line, i) => (
        <Reveal
          key={line}
          as="p"
          delay={start + i * gap}
          tempo={tempo}
          className={lineClassName}
        >
          {line}
        </Reveal>
      ))}
      {coda ? (
        <Reveal
          as="p"
          delay={start + lines.length * gap + codaSilence}
          tempo={tempo}
          className={codaClassName}
        >
          {coda}
        </Reveal>
      ) : null}
    </div>
  );
}

/** Small-caps eyebrow that names the place. Sets the scene without a heading. */
export function Eyebrow({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <Reveal
      className={`u-caps flex items-center gap-3 text-amber-400/70 ${className}`}
      soft
    >
      <span className="inline-block h-px w-8 bg-amber-400/40" />
      {children}
    </Reveal>
  );
}
