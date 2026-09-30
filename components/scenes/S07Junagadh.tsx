'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Scene from '@/components/primitives/Scene';
import Couplet from '@/components/primitives/Couplet';
import { junagadh } from '@/data/love';
import { useJourney } from '@/lib/useJourney';
import { ease } from '@/lib/motion';

/**
 * THE DOOR OF THE LOCAL TRAIN.
 *
 * The one full pinned sequence in the site. Three movements, scroll-driven:
 *
 *   1. the plan almost dies — and "you told me not to come" is held, cold, and
 *      never answered. Her honesty is part of the memory; softening it would be
 *      editing her out.
 *   2. the journey — not a map, a DOORWAY. Standing, not sitting. Slightly
 *      unstable, slightly too long.
 *   3. arrival — the hills, the climb, the ice cream.
 *
 * After this scene the train never returns. Not as a transition, not as a
 * texture, not in the finale. It is one chapter, not the site's identity.
 */

const STREAKS = Array.from({ length: 16 }, (_, i) => ({
  x: (i * 6.4 + (i % 3) * 2.1) % 100,
  d: 0.5 + ((i * 37) % 9) / 14,
  delay: ((i * 53) % 17) / 16,
  h: 24 + ((i * 29) % 40),
  wide: i % 2 === 0,
}));

export default function S07Junagadh() {
  const outer = useRef<HTMLDivElement>(null);
  const { reduced } = useJourney();
  const { scrollYProgress: p } = useScroll({
    target: outer,
    offset: ['start start', 'end end'],
  });

  /* Movement windows. Movement one and the hard line occupy the same centred
     space, so their windows butt up against each other instead of overlapping —
     they used to both sit at full opacity between 0.14 and 0.2, which printed
     "you told me not to come" straight through the title. */
  const m1 = useTransform(p, [0, 0.05, 0.14, 0.19], [0, 1, 1, 0]);
  const hard = useTransform(p, [0.21, 0.26, 0.29, 0.33], [0, 1, 1, 0]);
  const m2 = useTransform(p, [0.34, 0.4, 0.55, 0.62], [0, 1, 1, 0]);
  const m3 = useTransform(p, [0.62, 0.7, 1, 1], [0, 1, 1, 1]);

  /* the doorway opens as she scrolls into the journey */
  const doorW = useTransform(p, [0.34, 0.46], ['64%', '100%']);
  const speed = useTransform(p, [0.34, 0.48, 0.58], [0.25, 1, 0.6]);
  const hillsY = useTransform(p, [0.62, 1], ['16%', '0%']);

  return (
    <Scene
      id="junagadh"
      label="The door of the local train"
      height={reduced ? 1.6 : 3.6}
      className="relative"
    >
      {/* The pin takes the scene's declared travel from `--scene-h`; the scene
          itself is free to grow past it so the couplet below gets its own room
          instead of spilling onto the next chapter. */}
      <div ref={outer} className="relative w-full" style={{ height: 'var(--scene-h)' }}>
        <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden px-6">
          {/* ------------------------------------------------- movement one */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6 text-center"
            style={{ opacity: m1 }}
          >
            <p className="u-caps text-amber-400/60">{junagadh.place}</p>
            <h2 className="u-display-tight max-w-2xl text-2xl text-cream-100 sm:text-3xl">
              {junagadh.title}
            </h2>
            <div className="mt-4 flex flex-col gap-2">
              {junagadh.movement1.beats.map((b) => (
                <p key={b} className="u-display text-lg text-cream-200/70 sm:text-xl">
                  {b}
                </p>
              ))}
            </div>
          </motion.div>

          {/* the line that is not softened and not answered */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center px-6"
            style={{ opacity: hard }}
          >
            <div className="flex max-w-xl flex-col items-center gap-8 text-center">
              <span aria-hidden className="h-px w-16 bg-slate-500/50" />
              <p className="u-display-tight text-2xl leading-snug text-slate-500 sm:text-3xl">
                {junagadh.movement1.hard}
              </p>
              <span aria-hidden className="h-px w-16 bg-slate-500/50" />
            </div>
          </motion.div>

          {/* ------------------------------------------------- movement two */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{ opacity: m2 }}
          >
            {/* the doorway */}
            <motion.div
              className="relative h-[74svh] max-h-[560px] overflow-hidden rounded-edge sm:max-h-none"
              style={{ width: doorW, maxWidth: 760 }}
            >
              {/* what is outside the door */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, #1B1733 0%, #2A1B45 38%, #3B1E63 62%, #120E22 100%)',
                }}
              />
              {/* the horizon, strobing past */}
              <div
                className="absolute inset-x-0 top-1/2 h-px"
                style={{ background: 'rgba(246,201,122,0.28)' }}
              />
              <motion.div className="absolute inset-0" style={{ opacity: speed }}>
                {STREAKS.map((s, i) => (
                  <span
                    key={i}
                    data-motion="streak"
                    className={`absolute top-0 ${s.wide ? '' : 'hidden sm:block'}`}
                    style={{
                      left: `${s.x}%`,
                      width: s.wide ? 2 : 1,
                      height: `${s.h}%`,
                      background:
                        'linear-gradient(180deg, transparent, rgba(246,201,122,0.75), transparent)',
                      animation: reduced
                        ? undefined
                        : `plaza-streak ${s.d + 0.35}s linear ${s.delay}s infinite`,
                      opacity: reduced ? 0.3 : undefined,
                    }}
                  />
                ))}
              </motion.div>

              {/* the door frame itself — this is what makes it standing, not sitting */}
              <span
                aria-hidden
                className="absolute inset-y-0 left-0 w-[14%]"
                style={{ background: 'linear-gradient(90deg, #07080F 60%, transparent)' }}
              />
              <span
                aria-hidden
                className="absolute inset-y-0 right-0 w-[14%]"
                style={{ background: 'linear-gradient(270deg, #07080F 60%, transparent)' }}
              />
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-[12%]"
                style={{ background: 'linear-gradient(180deg, #07080F 55%, transparent)' }}
              />
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-[16%]"
                style={{ background: 'linear-gradient(0deg, #07080F 55%, transparent)' }}
              />
              {/* the bar his hand was on */}
              <span
                aria-hidden
                className="absolute left-[14%] right-[14%] top-[26%] h-[2px] rounded-full"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(246,201,122,0.1), rgba(246,201,122,0.55), rgba(246,201,122,0.1))',
                }}
              />

              {/* the line, inside the doorway */}
              <div className="absolute inset-0 flex flex-col items-center justify-end gap-3 pb-[12%] text-center">
                <motion.p
                  className="u-display-tight text-3xl text-cream-100 sm:text-4xl"
                  animate={reduced ? undefined : { y: [0, -2.5, 0, 2, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  {junagadh.movement2.line}
                </motion.p>
                <p className="u-caps max-w-[26ch] px-4 text-cream-200/45 sm:max-w-none">
                  {junagadh.movement2.sub}
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* ----------------------------------------------- movement three */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center px-6"
            style={{ opacity: m3 }}
          >
            {/* the hills */}
            <motion.svg
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-[42svh] w-full"
              viewBox="0 0 400 140"
              preserveAspectRatio="none"
              style={{ y: hillsY }}
            >
              <path d="M0 140 L0 92 C 60 58, 110 84, 168 54 C 226 24, 286 66, 340 44 L400 30 L400 140 Z" fill="#160F28" />
              <path d="M0 140 L0 112 C 70 92, 132 108, 196 86 C 260 64, 320 96, 400 78 L400 140 Z" fill="#0C0A16" />
            </motion.svg>

            <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center gap-8">
              {/* No photograph here on purpose. There is no picture from this
                  day, and borrowing one from another afternoon would quietly
                  turn a true memory into a staged one. The hills, the type and
                  the couplet carry it. */}

              <div className="flex flex-col items-center gap-2 text-center">
                {junagadh.movement3.beats.map((b) => (
                  <p key={b} className="u-display text-lg text-cream-100/85 sm:text-xl">
                    {b}
                  </p>
                ))}
              </div>

              <motion.p
                className="u-display-tight max-w-xl text-center text-xl text-amber-300 sm:text-2xl"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 1.2, ease: ease.enter, delay: 0.5 }}
              >
                {junagadh.movement3.meaning}
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* the couplet sits after the pin releases, so it is read, not skimmed */}
      <div className="relative flex justify-center px-6 pb-[14svh] pt-[6svh]">
        <Couplet scene="junagadh" />
      </div>
    </Scene>
  );
}
