'use client';

import { motion } from 'framer-motion';
import Scene from '@/components/primitives/Scene';
import Lamp from '@/components/primitives/Lamp';
import { Beats } from '@/components/primitives/Reveal';
import { chapters, storyById } from '@/data/love';
import { useJourney } from '@/lib/useJourney';
import { ease, inViewSoft, tempo } from '@/lib/motion';

/**
 * THE SQUARE.
 *
 * One slow pan. Unlit lamps stand at intervals — each one is a chapter, but
 * nothing is labelled yet. She should understand "this has little chapters"
 * without reading a single word of interface copy.
 *
 * This is also where the lamps become the chapter rail, rather than a menu
 * appearing out of nowhere.
 */
export default function S02Square() {
  const s = storyById('square');
  const { reduced, isLit } = useJourney();
  const posts = chapters.filter((c) => c.lamp);

  return (
    <Scene id="square" label="The square" autoLight={false} className="flex items-end justify-center px-6 pb-[14svh]">
      <div className="flex w-full max-w-5xl flex-col items-center gap-16">
        <Beats
          lines={s.beats}
          coda={s.coda}
          tempo={tempo.drift}
          gap={0.7}
          codaSilence={1.1}
          className="flex flex-col items-center gap-2 text-center"
          lineClassName="u-display text-xl text-cream-100/90 sm:text-2xl"
          codaClassName="u-hand mt-6 text-lg text-amber-300/70"
        />

        {/* the row of lamps — the rail, before it is a rail */}
        <motion.div
          className="flex w-full items-end justify-between gap-1 sm:gap-3"
          initial={reduced ? { opacity: 0 } : { opacity: 0, x: 40 }}
          whileInView={reduced ? { opacity: 1 } : { opacity: 1, x: 0 }}
          viewport={inViewSoft}
          transition={{ duration: reduced ? 0.4 : 2.4, ease: ease.enter }}
        >
          {posts.map((c, i) => (
            <motion.div
              key={c.id}
              className="flex flex-1 items-end justify-center"
              style={{ opacity: 0.35 + (i % 3) * 0.16 }}
              initial={reduced ? undefined : { y: 18 }}
              whileInView={reduced ? undefined : { y: 0 }}
              viewport={inViewSoft}
              transition={{ duration: 1.4, ease: ease.enter, delay: 0.1 + i * 0.07 }}
            >
              <Lamp
                lit={isLit(c.id)}
                size={i % 3 === 0 ? 18 : 13}
                reduced={reduced}
              />
            </motion.div>
          ))}
        </motion.div>

        <div className="u-rule w-full max-w-xl opacity-40" />
      </div>
    </Scene>
  );
}
