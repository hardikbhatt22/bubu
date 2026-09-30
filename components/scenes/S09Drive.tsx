'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Scene from '@/components/primitives/Scene';
import { Beats, Eyebrow, Reveal } from '@/components/primitives/Reveal';
import PhotoFrame from '@/components/primitives/PhotoFrame';
import Couplet from '@/components/primitives/Couplet';
import { driveCopy, photoById, storyById } from '@/data/love';
import { useJourney } from '@/lib/useJourney';
import { ease } from '@/lib/motion';

/**
 * NO DESTINATION.
 *
 * The warmest scene in the site, and deliberately the one where nothing
 * happens. The frame becomes a windscreen; the road unspools; streetlights
 * sweep the cabin in a rhythm.
 *
 * She can look away from the road — and the passenger seat is where the fourth
 * photo lives. That is the whole idea of the memory: the view was never the
 * point.
 */
export default function S09Drive() {
  const s = storyById('drive');
  const { reduced } = useJourney();
  const [view, setView] = useState<'road' | 'seat'>('road');

  return (
    <Scene id="drive" label="No destination" className="flex items-center px-6 py-[12svh]">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-12">
        <Eyebrow>{s.place}</Eyebrow>

        {/* ------------------------------------------------------ the cabin */}
        <Reveal soft>
          {/* A 16:10 letterbox is a cinema frame on a laptop and a mail slot on
              a phone — at 390px wide it left the windscreen 210px tall, which
              is shorter than the photograph riding in the passenger seat. The
              cabin stands up on a small screen and lies down again on a large
              one. */}
          <div className="relative aspect-[6/5] max-h-[62svh] w-full overflow-hidden rounded-edge border border-amber-400/15 sm:aspect-[16/10]">
            <motion.div
              className="flex h-full w-[200%] cursor-grab active:cursor-grabbing"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.12}
              dragMomentum={false}
              onDragEnd={(_, info) => {
                if (info.offset.x < -50) setView('seat');
                if (info.offset.x > 50) setView('road');
              }}
              animate={{ x: view === 'road' ? '0%' : '-50%' }}
              transition={{ duration: reduced ? 0.25 : 1.05, ease: ease.enter }}
              style={{ touchAction: 'pan-y' }}
            >
              {/* -------------------------------------------------- the road */}
              <div className="relative h-full w-1/2 shrink-0 overflow-hidden">
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(180deg, #120E22 0%, #241638 34%, #3B1E63 52%, #0C0A16 54%, #07080F 100%)',
                  }}
                />
                {/* distant town lights on the horizon */}
                <div
                  className="absolute inset-x-0 top-[48%] h-[6%]"
                  style={{
                    background:
                      'repeating-linear-gradient(90deg, rgba(246,201,122,0.5) 0 1px, transparent 1px 14px)',
                    opacity: 0.4,
                  }}
                />
                {/* the road, unspooling */}
                <div className="absolute inset-x-0 bottom-0 top-[54%] overflow-hidden">
                  <div
                    className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2"
                    style={{
                      background:
                        'repeating-linear-gradient(180deg, rgba(246,201,122,0.55) 0 16px, transparent 16px 44px)',
                      animation: reduced ? undefined : 'plaza-road 2.4s linear infinite',
                      transform: 'translateX(-50%) perspective(220px) rotateX(58deg)',
                      transformOrigin: 'top center',
                    }}
                    data-motion="road"
                  />
                </div>
                {/* headlight sweep across the cabin */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 w-1/4"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent, rgba(246,201,122,0.3), transparent)',
                    animation: reduced ? undefined : 'plaza-sweep 7s ease-in-out infinite',
                  }}
                  data-motion="sweep"
                />
                {/* dashboard silhouette */}
                <div
                  className="absolute inset-x-0 bottom-0 h-[22%]"
                  style={{
                    background: 'linear-gradient(0deg, #07080F 62%, transparent)',
                    borderTopLeftRadius: '46% 90%',
                    borderTopRightRadius: '46% 90%',
                  }}
                />
                {/* Top-left below `sm`: the control cluster owns the bottom
                    edge there, and the two used to print over each other. */}
                <span className="u-caps absolute left-4 top-4 text-cream-200/35 sm:bottom-4 sm:left-5 sm:top-auto">
                  {driveCopy.road}
                </span>
              </div>

              {/* ----------------------------------------- the passenger seat */}
              <div className="relative grid h-full w-1/2 shrink-0 place-items-center overflow-hidden">
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'radial-gradient(80% 70% at 30% 20%, rgba(233,166,60,0.22), transparent 66%), linear-gradient(180deg, #161A33, #07080F)',
                  }}
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 w-1/3"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent, rgba(246,201,122,0.22), transparent)',
                    animation: reduced ? undefined : 'plaza-sweep 7s ease-in-out 1.4s infinite',
                  }}
                  data-motion="sweep"
                />
                {/* Narrower on a phone so the photograph sits BETWEEN the
                    two labels rather than under them — a 2:3 frame is one and
                    a half times its own width, and at 46% it filled the cabin
                    top to bottom. */}
                <div className="relative w-[36%] max-w-[230px] sm:w-[46%]">
                  <PhotoFrame
                    photo={photoById(2)}
                    ratio="tall"
                    light="left"
                    showNote={false}
                    eager
                    sizes="(max-width: 768px) 36vw, 22vw"
                  />
                </div>
                <span className="u-caps absolute left-4 top-4 text-cream-200/35 sm:bottom-4 sm:left-5 sm:top-auto">
                  {driveCopy.seat}
                </span>
              </div>
            </motion.div>

            {/* look-over control — a real affordance, keyboard included.
                Below `sm` only the two lights sit inside the cabin; the wording
                moves out under the frame, where it has room to be read instead
                of being printed across the windscreen. */}
            <div className="absolute bottom-3 right-3 flex items-center gap-1 sm:bottom-4 sm:right-4 sm:gap-2">
              <span className="u-caps hidden pr-1 text-cream-200/30 sm:inline">
                {driveCopy.lookHint}
              </span>
              {(['road', 'seat'] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setView(v)}
                  aria-label={v === 'road' ? driveCopy.road : driveCopy.seat}
                  aria-current={view === v}
                  className="grid size-11 shrink-0 place-items-center rounded-full"
                >
                  <motion.span
                    className="block rounded-full"
                    initial={false}
                    animate={{
                      width: view === v ? 8 : 5,
                      height: view === v ? 8 : 5,
                      backgroundColor: view === v ? '#F6C97A' : 'rgba(245,237,224,0.3)',
                    }}
                    transition={{ duration: 0.3, ease: ease.enter }}
                  />
                </button>
              ))}
            </div>
          </div>

          <p className="u-caps mt-3 text-center text-cream-200/30 sm:hidden">
            {driveCopy.lookHintTouch}
          </p>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Beats
            lines={s.beats}
            coda={s.coda}
            gap={0.8}
            codaSilence={1.3}
            className="flex flex-col gap-2"
            lineClassName="u-display text-xl text-cream-100/90 sm:text-2xl"
            codaClassName="u-display-tight mt-4 text-2xl text-amber-300 sm:text-3xl"
          />
          <Couplet scene="drive" align="left" className="lg:items-start" />
        </div>
      </div>
    </Scene>
  );
}
