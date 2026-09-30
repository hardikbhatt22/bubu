'use client';

import { motion } from 'framer-motion';
import { ease, inViewSoft } from '@/lib/motion';
import { coupletFor } from '@/data/poetry';
import type { SceneId } from '@/data/love';
import { ui } from '@/data/love';
import { useJourney } from '@/lib/useJourney';

/**
 * A couplet, anchored to exactly one scene. Devanagari is the primary setting;
 * the romanisation sits underneath, quiet and optional, because she may read
 * either and the choice must never feel like a language test.
 */
export default function Couplet({
  scene,
  className = '',
  align = 'center',
  tempo = 1,
}: {
  scene: SceneId;
  className?: string;
  align?: 'center' | 'left';
  tempo?: number;
}) {
  const c = coupletFor(scene);
  const { roman, toggleRoman, reduced } = useJourney();
  if (!c) return null;

  const alignCls = align === 'center' ? 'text-center items-center' : 'text-left items-start';

  return (
    <motion.div
      className={`flex flex-col gap-4 ${alignCls} ${className}`}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 18 }}
      whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={inViewSoft}
      transition={{ duration: reduced ? 0.35 : 1.1 * tempo, ease: ease.enter }}
    >
      <span aria-hidden className="h-px w-10 bg-amber-400/30" />

      <div className="u-deva text-lg text-cream-100/90 sm:text-xl">
        <p>{c.deva[0]}</p>
        <p>{c.deva[1]}</p>
      </div>

      {roman ? (
        <motion.div
          className="max-w-measure text-sm italic leading-relaxed text-cream-200/45"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.4, ease: ease.enter }}
        >
          <p>{c.roman[0]}</p>
          <p>{c.roman[1]}</p>
        </motion.div>
      ) : null}

      <button
        type="button"
        onClick={toggleRoman}
        className="u-caps rounded-edge px-2 py-2 text-[0.6rem] text-cream-200/35 transition-colors hover:text-amber-300/80"
        aria-pressed={roman}
      >
        {roman ? ui.devaToggle : ui.romanToggle}
      </button>
    </motion.div>
  );
}
