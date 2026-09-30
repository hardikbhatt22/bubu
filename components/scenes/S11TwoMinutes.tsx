'use client';

import { useEffect, useRef } from 'react';
import { animate, motion, useInView, useMotionValue, useTransform } from 'framer-motion';
import Scene from '@/components/primitives/Scene';
import { Beats, Reveal } from '@/components/primitives/Reveal';
import Couplet from '@/components/primitives/Couplet';
import { storyById, twoMinutesCopy } from '@/data/love';
import { useJourney } from '@/lib/useJourney';
import { ease, tempo } from '@/lib/motion';

/**
 * TWO MINUTES.
 *
 * The hinge of the entire site. The rain stops here (the atmosphere handles it
 * from `t`), and the argument is made by a literal two minutes rather than by
 * an adjective: 120 seconds, drawn as an arc, and it is embarrassingly short.
 *
 * There is no apology verb anywhere in this scene. The understanding IS the
 * apology; adding "forgive me" would turn it into a request, which is the one
 * thing this site must never do.
 */

const R = 92;
const CIRC = 2 * Math.PI * R;

export default function S11TwoMinutes() {
  const s = storyById('twominutes');
  const { reduced } = useJourney();
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.6 });

  const secs = useMotionValue(0);
  const dash = useTransform(secs, (v) => CIRC * (1 - v / 120));
  const label = useTransform(secs, (v) => {
    const t = Math.round(v);
    return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}`;
  });
  const glow = useTransform(secs, [0, 120], [0.06, 0.5]);

  useEffect(() => {
    if (!seen) return;
    if (reduced) {
      secs.set(120);
      return;
    }
    const controls = animate(secs, 120, { duration: 3.6, ease: 'linear', delay: 0.4 });
    return () => controls.stop();
  }, [seen, reduced, secs]);

  return (
    <Scene id="twominutes" label="Two minutes" className="flex items-center px-6 py-[14vh]">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-16">
        <Beats
          lines={s.beats}
          gap={0.95}
          tempo={tempo.still}
          className="flex w-full max-w-2xl flex-col items-center gap-5 text-center"
          lineClassName="u-display text-xl text-cream-100/85 sm:text-2xl"
        />

        {/* ------------------------------------------------ a literal two minutes */}
        <div ref={ref} className="relative grid place-items-center">
          <motion.span
            aria-hidden
            className="absolute h-64 w-64 rounded-full"
            style={{
              opacity: glow,
              background:
                'radial-gradient(circle, rgba(246,201,122,0.42), transparent 66%)',
            }}
          />
          <svg viewBox="0 0 220 220" className="h-52 w-52 -rotate-90 sm:h-60 sm:w-60" aria-hidden>
            <circle cx="110" cy="110" r={R} fill="none" stroke="rgba(233,166,60,0.14)" strokeWidth="1" />
            {/* sixty-second ticks — so 120 reads as a real, small quantity */}
            {Array.from({ length: 24 }).map((_, i) => {
              const a = (i / 24) * Math.PI * 2;
              /* Rounded: trig is not bit-identical across JS engines, so raw
                 values would differ between the server render and the client
                 and trip a hydration mismatch. */
              const r3 = (v: number) => Math.round(v * 1000) / 1000;
              const x1 = r3(110 + Math.cos(a) * (R - 6));
              const y1 = r3(110 + Math.sin(a) * (R - 6));
              const x2 = r3(110 + Math.cos(a) * R);
              const y2 = r3(110 + Math.sin(a) * R);
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="rgba(233,166,60,0.22)"
                  strokeWidth="0.8"
                />
              );
            })}
            <motion.circle
              cx="110"
              cy="110"
              r={R}
              fill="none"
              stroke="#F6C97A"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeDasharray={CIRC}
              style={{ strokeDashoffset: dash }}
            />
          </svg>

          <div className="absolute flex flex-col items-center gap-1">
            <motion.span className="u-display-tight text-3xl text-cream-100 sm:text-4xl">
              {label}
            </motion.span>
            <span className="u-caps text-cream-200/40">{twoMinutesCopy.arcLabel}</span>
          </div>
        </div>

        <Reveal soft delay={0.4} tempo={tempo.still}>
          <p className="u-hand text-center text-lg text-cream-200/50">
            {twoMinutesCopy.arcUnit}
          </p>
        </Reveal>

        {/* the coda gets the largest type in the chapter, and real silence */}
        <Reveal soft delay={0.9}>
          <p className="u-display-tight mx-auto max-w-3xl text-center text-2xl leading-tight text-amber-300 sm:text-3xl">
            {s.coda}
          </p>
        </Reveal>

        <Couplet scene="twominutes" className="pt-6" />
      </div>
    </Scene>
  );
}
