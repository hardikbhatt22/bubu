'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Scene from '@/components/primitives/Scene';
import { Beats, Eyebrow } from '@/components/primitives/Reveal';
import Couplet from '@/components/primitives/Couplet';
import { storyById } from '@/data/love';
import { useJourney } from '@/lib/useJourney';
import { ease, tempo } from '@/lib/motion';

/**
 * AN ORDINARY DAY.
 *
 * Two thin light-trails cross the square once. He is going one way in a hurry,
 * she is going another. They pause. They overlap. They continue.
 *
 * No hearts, no sparkle, no slow-motion gaze. The restraint IS the emotion —
 * the whole point of this memory is that it was ordinary.
 */
export default function S04Ordinary() {
  const s = storyById('ordinary');
  const { reduced } = useJourney();
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.5 });

  const draw = (delay: number) =>
    reduced
      ? { pathLength: 1, opacity: 0.8 }
      : { pathLength: 1, opacity: [0, 0.85, 0.85], transition: { duration: 3.1, ease: ease.enter, delay } };

  return (
    <Scene id="ordinary" label="An ordinary day" className="flex items-center px-6 py-[12vh]">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-14">
        <Eyebrow>{s.place}</Eyebrow>

        {/* the crossing */}
        <div ref={ref} className="relative h-[34vh] w-full max-w-2xl sm:h-[30vh]">
          <svg
            viewBox="0 0 400 200"
            className="h-full w-full"
            fill="none"
            aria-hidden
            preserveAspectRatio="none"
          >
            {/* him — in a hurry, steeper */}
            <motion.path
              d="M-10 178 C 90 170, 150 130, 198 100 C 250 68, 320 42, 410 30"
              stroke="url(#trailA)"
              strokeWidth="1.4"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={seen ? draw(0.1) : undefined}
            />
            {/* her — unhurried, crossing the other way */}
            <motion.path
              d="M410 172 C 320 166, 258 132, 202 102 C 148 74, 86 46, -10 34"
              stroke="url(#trailB)"
              strokeWidth="1.4"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={seen ? draw(0.45) : undefined}
            />
            {/* the overlap — one small warm point, held */}
            <motion.circle
              cx="200"
              cy="101"
              r="3"
              fill="#F6C97A"
              initial={{ opacity: 0, scale: 0 }}
              animate={
                seen
                  ? { opacity: 1, scale: 1 }
                  : undefined
              }
              transition={{ duration: reduced ? 0.3 : 1.2, ease: ease.enter, delay: reduced ? 0.2 : 1.9 }}
            />
            <motion.circle
              cx="200"
              cy="101"
              r="3"
              fill="none"
              stroke="#F6C97A"
              strokeWidth="0.8"
              initial={{ opacity: 0, scale: 1 }}
              animate={seen && !reduced ? { opacity: [0, 0.5, 0], scale: [1, 5.5, 7] } : undefined}
              transition={{ duration: 2.6, ease: ease.enter, delay: 2 }}
            />
            <defs>
              <linearGradient id="trailA" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="#5B2C8F" stopOpacity="0" />
                <stop offset="45%" stopColor="#E9A63C" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#5B2C8F" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="trailB" x1="1" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#3B1E63" stopOpacity="0" />
                <stop offset="48%" stopColor="#F6C97A" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#3B1E63" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <Beats
          lines={s.beats}
          coda={s.coda}
          tempo={tempo.drift}
          gap={0.85}
          codaSilence={1.5}
          className="flex flex-col items-center gap-3 text-center"
          lineClassName="u-display text-xl text-cream-100/85 sm:text-2xl"
          codaClassName="u-display-tight mt-8 text-2xl text-amber-300 sm:text-3xl"
        />

        <Couplet scene="ordinary" className="pt-6" tempo={tempo.drift} />
      </div>
    </Scene>
  );
}
