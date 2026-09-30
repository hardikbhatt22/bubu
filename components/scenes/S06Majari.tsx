'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Scene from '@/components/primitives/Scene';
import { Beats, Eyebrow, Reveal } from '@/components/primitives/Reveal';
import { majariCopy, storyById } from '@/data/love';
import { useJourney } from '@/lib/useJourney';
import { ease, tempo } from '@/lib/motion';

/**
 * TECH MAJARI.
 *
 * A fork with two paths. The one that leaves stays dark; the one that stays
 * lights up. It is not presented as a choice she can make — it already
 * happened, and the point is how small it was.
 */
export default function S06Majari() {
  const s = storyById('majari');
  const { reduced } = useJourney();
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.45 });

  return (
    <Scene id="majari" label="Tech Majari" className="flex items-center px-6 py-[12svh]">
      <div className="mx-auto grid w-full max-w-5xl items-center gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        {/* the lanyard */}
        <Reveal soft>
          <div className="mx-auto w-full max-w-[250px]">
            {/* the cord */}
            <svg viewBox="0 0 120 70" className="mx-auto w-28" fill="none" aria-hidden>
              <path
                d="M22 68 C 28 30, 52 10, 60 6 C 68 10, 92 30, 98 68"
                stroke="rgba(233,166,60,0.35)"
                strokeWidth="1.4"
              />
            </svg>
            <motion.div
              className="u-frame relative -mt-1 flex flex-col gap-4 p-5"
              initial={reduced ? undefined : { rotate: -1.4 }}
              whileInView={reduced ? undefined : { rotate: 0.6 }}
              viewport={{ once: true }}
              transition={{ duration: 2.4, ease: ease.enter }}
              style={{
                background:
                  'linear-gradient(170deg, rgba(59,30,99,0.55), rgba(13,16,32,0.9))',
              }}
            >
              <span
                aria-hidden
                className="mx-auto h-2 w-12 rounded-full border border-amber-400/30"
              />
              <p className="u-caps text-amber-300/60">{majariCopy.badgeRole}</p>
              <p className="u-display text-xl text-cream-100">{majariCopy.badgeEvent}</p>
              <div className="u-rule opacity-50" />
              <p className="u-hand text-base text-cream-200/60">{majariCopy.badgeNote}</p>
            </motion.div>
          </div>
        </Reveal>

        <div className="flex flex-col gap-10">
          <Eyebrow>{s.place}</Eyebrow>

          {/* the fork */}
          <div ref={ref} className="relative">
            <svg viewBox="0 0 320 120" className="w-full max-w-md" fill="none" aria-hidden>
              <motion.path
                d="M4 60 H 120"
                stroke="rgba(233,166,60,0.5)"
                strokeWidth="1.3"
                initial={{ pathLength: 0 }}
                animate={seen ? { pathLength: 1 } : undefined}
                transition={{ duration: reduced ? 0.2 : 1, ease: ease.enter }}
              />
              {/* the path that leaves — stays dark */}
              <motion.path
                d="M120 60 C 180 60, 210 26, 312 18"
                stroke="rgba(92,100,128,0.32)"
                strokeWidth="1.1"
                strokeDasharray="3 5"
                initial={{ pathLength: 0 }}
                animate={seen ? { pathLength: 1 } : undefined}
                transition={{ duration: reduced ? 0.2 : 1.3, ease: ease.enter, delay: 0.7 }}
              />
              {/* the path that stays — lights */}
              <motion.path
                d="M120 60 C 180 60, 212 96, 312 104"
                stroke="url(#stayGrad)"
                strokeWidth="1.8"
                initial={{ pathLength: 0 }}
                animate={seen ? { pathLength: 1 } : undefined}
                transition={{ duration: reduced ? 0.25 : 1.6, ease: ease.enter, delay: 1.1 }}
              />
              <motion.circle
                cx="312"
                cy="104"
                r="3.4"
                fill="#F6C97A"
                initial={{ opacity: 0 }}
                animate={seen ? { opacity: 1 } : undefined}
                transition={{ duration: 1, ease: ease.enter, delay: reduced ? 0.3 : 2.5 }}
              />
              <defs>
                <linearGradient id="stayGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#E9A63C" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#F6C97A" stopOpacity="1" />
                </linearGradient>
              </defs>
            </svg>

            <div className="mt-2 flex max-w-md items-start justify-between gap-4">
              <span className="u-caps text-slate-500/70">{majariCopy.leave}</span>
              <span className="u-caps max-w-[55%] text-right text-amber-300/85">
                {majariCopy.stay}
              </span>
            </div>
          </div>

          <Beats
            lines={s.beats}
            coda={s.coda}
            tempo={tempo.warm}
            gap={0.7}
            codaSilence={1.2}
            className="flex flex-col gap-2"
            lineClassName="u-display text-xl text-cream-100/90 sm:text-2xl"
            codaClassName="u-hand mt-5 text-lg text-amber-300/75"
          />
        </div>
      </div>
    </Scene>
  );
}
