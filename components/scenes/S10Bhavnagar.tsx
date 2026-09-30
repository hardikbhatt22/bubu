'use client';

import { motion } from 'framer-motion';
import Scene from '@/components/primitives/Scene';
import { Beats, Reveal } from '@/components/primitives/Reveal';
import { bhavnagarCopy, storyById, unsent } from '@/data/love';
import { useJourney } from '@/lib/useJourney';
import { ease, inViewSoft, tempo } from '@/lib/motion';

/**
 * THE QUIET DAYS.
 *
 * The only cold scene in the site, and the only one with rain. Hard
 * desaturation, two lamps, and more negative space than anywhere else — the
 * layout itself carries the distance.
 *
 * The three messages he never typed are rendered as outlines that appear and
 * fade WITHOUT being sent. No chat bubbles, no typing indicator, no read
 * receipts — that would turn a real failure into a gadget.
 *
 * Nothing here is phrased as a request, and nothing here begins with "but".
 */
export default function S10Bhavnagar() {
  const s = storyById('bhavnagar');
  const { reduced } = useJourney();

  return (
    <Scene
      id="bhavnagar"
      label="The quiet days"
      autoLight={false}
      height={1.35}
      className="flex items-center px-6 py-[18svh]"
    >
      {/* deliberately narrow column inside a wide frame — distance as layout */}
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-[16svh]">
        <div className="flex flex-col gap-10">
          <Reveal soft tempo={tempo.still} className="u-caps flex items-center gap-3 text-slate-500/80">
            <span className="inline-block h-px w-8 bg-slate-500/40" />
            {s.place}
          </Reveal>

          <Beats
            lines={s.beats}
            gap={1.05}
            tempo={tempo.still}
            className="flex flex-col gap-6"
            lineClassName="u-display text-xl leading-relaxed text-slate-500 sm:text-2xl"
          />
        </div>

        {/* ------------------------------------------- the three never sent */}
        <div className="flex flex-col gap-6 sm:pl-[12%]">
          <Reveal soft tempo={tempo.still}>
            <p className="u-caps text-slate-500/60">{bhavnagarCopy.unsentLabel}</p>
          </Reveal>

          <div className="flex flex-col gap-4">
            {unsent.map((line, i) => (
              <motion.p
                key={line}
                className="u-display max-w-sm rounded-edge border border-dashed border-slate-500/35 px-5 py-4 text-lg text-slate-500/70"
                initial={{ opacity: 0 }}
                whileInView={
                  reduced
                    ? { opacity: 0.55 }
                    : { opacity: [0, 0.75, 0.75, 0.16] }
                }
                viewport={inViewSoft}
                transition={{
                  duration: reduced ? 0.4 : 5.4,
                  ease: 'easeInOut',
                  delay: reduced ? i * 0.1 : i * 1.15,
                  times: reduced ? undefined : [0, 0.18, 0.6, 1],
                }}
              >
                {line}
              </motion.p>
            ))}
          </div>
        </div>

        {/* --------------------------------------------- the empty Saturday */}
        <Reveal soft tempo={tempo.still} className="flex flex-col items-center gap-6">
          <div className="flex items-end gap-2 sm:gap-3">
            {['m', 't', 'w', 't', 'f', 's', 's'].map((d, i) => {
              const isSat = i === 5;
              return (
                <div key={i} className="flex flex-col items-center gap-2">
                  <span className="u-caps text-[0.55rem] text-slate-500/50">{d}</span>
                  <motion.span
                    className="block rounded-edge border"
                    initial={false}
                    animate={{
                      width: isSat ? 42 : 26,
                      height: isSat ? 42 : 26,
                    }}
                    style={{
                      borderColor: isSat ? 'rgba(92,100,128,0.75)' : 'rgba(92,100,128,0.22)',
                      borderStyle: isSat ? 'solid' : 'solid',
                      background: 'transparent',
                    }}
                  />
                </div>
              );
            })}
          </div>
          <p className="u-hand text-lg text-slate-500/70">
            {bhavnagarCopy.saturday} — {bhavnagarCopy.saturdayNote}
          </p>
        </Reveal>
      </div>
    </Scene>
  );
}
