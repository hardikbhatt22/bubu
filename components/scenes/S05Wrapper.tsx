'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Scene from '@/components/primitives/Scene';
import { Beats, Eyebrow, Reveal } from '@/components/primitives/Reveal';
import Couplet from '@/components/primitives/Couplet';
import { storyById, wrapperCopy } from '@/data/love';
import { useJourney } from '@/lib/useJourney';
import { ease, tempo } from '@/lib/motion';

/**
 * THE WRAPPER.
 *
 * The joke arrives as a shape and a caption — never a fake Instagram UI, which
 * would date the memory and cheapen it. Then there is a real wrapper she can
 * drag open, and the line is inside.
 *
 * This is also where the palette turns: her chocolate is what coloured the
 * whole square purple, so the site is warmer and more violet from here on.
 */
export default function S05Wrapper() {
  const s = storyById('wrapper');
  const { reduced } = useJourney();
  const [open, setOpen] = useState(false);

  return (
    <Scene id="wrapper" label="The wrapper" className="flex items-center px-6 py-[12vh]">
      <div className="mx-auto grid w-full max-w-5xl items-center gap-16 lg:grid-cols-2 lg:gap-20">
        <div className="flex flex-col gap-10">
          <Eyebrow>{s.place}</Eyebrow>

          {/* the reel, implied — a shape and a caption, nothing more */}
          <Reveal soft>
            <div className="relative mx-auto w-[58%] max-w-[210px] lg:mx-0">
              <div
                className="relative overflow-hidden rounded-edge border border-cream-100/10"
                style={{ aspectRatio: '9 / 16' }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(59,30,99,0.5), rgba(13,16,32,0.9) 62%, rgba(7,8,15,1))',
                  }}
                />
                {/* the play mark, drawn, not borrowed */}
                <span className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-cream-100/25">
                  <span
                    aria-hidden
                    className="ml-[3px] block h-0 w-0"
                    style={{
                      borderTop: '6px solid transparent',
                      borderBottom: '6px solid transparent',
                      borderLeft: '10px solid rgba(245,237,224,0.6)',
                    }}
                  />
                </span>
                <p className="u-hand absolute inset-x-0 bottom-0 p-4 text-sm leading-snug text-cream-100/70">
                  {wrapperCopy.reelCaption}
                </p>
              </div>
              <p className="u-caps mt-3 text-center text-cream-200/30 lg:text-left">
                {wrapperCopy.reelFrom}
              </p>
            </div>
          </Reveal>

          <Beats
            lines={s.beats.slice(1)}
            tempo={tempo.warm}
            gap={0.8}
            className="flex flex-col gap-2"
            lineClassName="u-display text-xl text-cream-100/90 sm:text-2xl"
          />
        </div>

        {/* ------------------------------------------------ the wrapper itself */}
        <Reveal soft delay={0.3}>
          <div className="flex flex-col items-center gap-6">
            <div
              className="relative w-full max-w-sm overflow-hidden rounded-edge"
              style={{ aspectRatio: '8 / 5' }}
            >
              {/* what is inside */}
              <div
                className="absolute inset-0 grid place-items-center px-7 text-center"
                style={{
                  background:
                    'radial-gradient(90% 90% at 50% 20%, rgba(233,166,60,0.16), transparent 70%), linear-gradient(180deg, #161A33, #0D1020)',
                }}
              >
                <AnimatePresence>
                  {open ? (
                    <motion.p
                      className="u-display text-lg text-cream-100 sm:text-xl"
                      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12, filter: 'blur(6px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      transition={{ duration: reduced ? 0.3 : 0.9, ease: ease.enter, delay: 0.2 }}
                    >
                      {wrapperCopy.inside}
                    </motion.p>
                  ) : null}
                </AnimatePresence>
              </div>

              {/* the foil — our own lettering, not anyone's trade dress */}
              <motion.div
                className="absolute inset-0 cursor-grab active:cursor-grabbing"
                drag={open ? false : 'x'}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.55}
                dragMomentum={false}
                onDragEnd={(_, info) => {
                  if (info.offset.x > 72) setOpen(true);
                }}
                animate={open ? { x: '104%', rotate: 2 } : { x: 0, rotate: 0 }}
                transition={{ duration: reduced ? 0.25 : 1, ease: ease.enter }}
                style={{
                  background:
                    'linear-gradient(118deg, #2C1450 0%, #5B2C8F 38%, #7A44B8 52%, #3B1E63 72%, #21103C 100%)',
                  touchAction: 'pan-y',
                }}
                aria-hidden
              >
                {/* foil sheen */}
                <span
                  className="pointer-events-none absolute inset-y-0 w-1/3 opacity-40"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent)',
                    animation: reduced ? undefined : 'plaza-sweep 5.5s ease-in-out infinite',
                  }}
                  data-motion="sweep"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                  <span className="u-hand text-2xl text-cream-100/90">{wrapperCopy.foilName}</span>
                  <span className="u-caps text-cream-100/40">{wrapperCopy.foilSub}</span>
                </div>
                {/* the tear edge */}
                <span
                  className="absolute inset-y-0 right-0 w-[3px]"
                  style={{
                    background:
                      'repeating-linear-gradient(180deg, rgba(246,201,122,0.5) 0 4px, transparent 4px 9px)',
                  }}
                />
              </motion.div>
            </div>

            {/* affordance + the keyboard path */}
            {!open ? (
              <button type="button" onClick={() => setOpen(true)} className="u-control">
                <span>{wrapperCopy.openHint}</span>
                <span aria-hidden>→</span>
              </button>
            ) : (
              <p className="u-hand text-lg text-amber-300/70">{wrapperCopy.kept}</p>
            )}
          </div>
        </Reveal>

        <div className="lg:col-span-2">
          <Couplet scene="wrapper" className="pt-4" />
        </div>
      </div>
    </Scene>
  );
}
