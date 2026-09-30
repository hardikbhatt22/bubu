'use client';

import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import Scene from '@/components/primitives/Scene';
import { Beats, Eyebrow, Reveal } from '@/components/primitives/Reveal';
import PhotoFrame from '@/components/primitives/PhotoFrame';
import { bubuCopy, names, photoById, relationship, storyById, traits } from '@/data/love';
import { useJourney } from '@/lib/useJourney';
import { ease, inViewSoft, tempo } from '@/lib/motion';

/**
 * YOU.
 *
 * A typographic portrait, not a bio and not a photo grid. Her name set large,
 * and around it the true things, arriving one at a time and slightly off-grid,
 * like someone remembering out loud.
 *
 * One of them dodges the cursor. That is the whole joke, and it is the only
 * joke in this scene.
 */

/* Deterministic off-grid offsets — hand-placed feel, no hydration drift. */
const OFFSETS = [
  { x: -18, y: 0 },
  { x: 26, y: -6 },
  { x: -8, y: 8 },
  { x: 34, y: 4 },
  { x: -26, y: -4 },
  { x: 14, y: 10 },
  { x: -14, y: -8 },
  { x: 22, y: 6 },
];

export default function S03Bubu() {
  const s = storyById('bubu');
  const { reduced } = useJourney();
  const [dodges, setDodges] = useState(0);
  const [nudge, setNudge] = useState({ x: 0, y: 0 });

  const dodge = useCallback(() => {
    if (dodges >= 3) return;
    const dir = dodges % 2 === 0 ? 1 : -1;
    setNudge({ x: dir * (34 + dodges * 12), y: dodges % 2 === 0 ? -14 : 16 });
    setDodges((d) => d + 1);
  }, [dodges]);

  const dodgeNote =
    dodges === 0 ? null : dodges === 1 ? bubuCopy.dodge1 : dodges === 2 ? bubuCopy.dodge2 : bubuCopy.dodgeGiveUp;

  return (
    <Scene id="bubu" label="You" className="flex items-center px-6 py-[12vh]">
      <div className="mx-auto grid w-full max-w-6xl gap-14 lg:grid-cols-[1.35fr_0.65fr] lg:items-center lg:gap-20">
        <div className="flex flex-col gap-10">
          <Eyebrow>{s.place}</Eyebrow>

          <Beats
            lines={s.beats}
            tempo={tempo.drift}
            gap={0.6}
            className="flex flex-col gap-1"
            lineClassName="u-display text-lg text-cream-200/70 sm:text-xl"
          />

          {/* her name, as the composition */}
          <Reveal soft tempo={tempo.drift}>
            <h2 className="u-display-tight text-4xl text-cream-100 sm:text-5xl">
              {names.her}
              <span className="u-hand ml-4 align-middle text-2xl text-amber-300/70 sm:text-3xl">
                {names.herNickname}
              </span>
            </h2>
            <p className="u-caps mt-4 text-cream-200/35">
              {bubuCopy.yearsNote(relationship.approxYears)}
            </p>
          </Reveal>

          {/* the true things, remembered out loud */}
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-4 pt-2">
            {traits.map((tr, i) => {
              const off = OFFSETS[i % OFFSETS.length];
              const isDodger = tr.dodges;
              return (
                <motion.li
                  key={tr.id}
                  className="relative"
                  initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14, filter: 'blur(5px)' }}
                  whileInView={
                    reduced
                      ? { opacity: 1 }
                      : { opacity: 1, y: off.y * 0.35, filter: 'blur(0px)' }
                  }
                  viewport={inViewSoft}
                  transition={{
                    duration: reduced ? 0.3 : 0.7,
                    ease: ease.enter,
                    delay: reduced ? 0 : 0.5 + i * 0.28,
                  }}
                  style={{ marginLeft: reduced ? 0 : Math.max(0, off.x * 0.4) }}
                >
                  {isDodger ? (
                    <motion.span
                      className="u-caps inline-block cursor-default rounded-edge border border-amber-400/25 px-3 py-2 text-cream-100/75"
                      onMouseEnter={dodge}
                      onFocus={dodge}
                      tabIndex={0}
                      animate={reduced ? undefined : nudge}
                      transition={{ duration: 0.42, ease: ease.enter }}
                    >
                      {tr.label}
                    </motion.span>
                  ) : (
                    <span className="u-caps text-cream-100/70">{tr.label}</span>
                  )}
                </motion.li>
              );
            })}
          </ul>

          {dodgeNote ? (
            <motion.p
              key={dodgeNote}
              className="u-hand text-lg text-amber-300/70"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: ease.enter }}
            >
              {dodgeNote}
            </motion.p>
          ) : null}
        </div>

        {/* the first photo — small, warm, slightly overexposed by the lamplight */}
        <div className="mx-auto w-[66%] max-w-[300px] lg:w-full lg:max-w-none">
          <PhotoFrame
            photo={photoById(1)}
            ratio="tall"
            priority
            light="top"
            delay={0.9}
            parallax
            sizes="(max-width: 1024px) 66vw, 26vw"
          />
        </div>
      </div>
    </Scene>
  );
}
