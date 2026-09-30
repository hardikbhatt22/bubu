'use client';

import { useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Scene from '@/components/primitives/Scene';
import { Eyebrow, Reveal } from '@/components/primitives/Reveal';
import Lamp from '@/components/primitives/Lamp';
import { promises, promisesCopy, storyById } from '@/data/love';
import { useJourney } from '@/lib/useJourney';
import { ease } from '@/lib/motion';

/**
 * FIVE LAMPS.
 *
 * The promises, as actions rather than vows — "a call every day", not "I will
 * always call you every day". That difference is the difference between this
 * scene working and not working.
 *
 * The fifth lamp is the thesis of the whole site, and lighting it is what
 * brings the first light to the horizon. The sunrise is caused by her hand,
 * not by a scroll position.
 */
export default function S12Promises() {
  const s = storyById('promises');
  const { reduced } = useJourney();
  const [lit, setLit] = useState<string[]>([]);
  const all = lit.length === promises.length;

  const light = useCallback((id: string) => {
    setLit((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  return (
    <Scene id="promises" label="Five lamps" className="relative flex items-center px-6 py-[14vh]">
      {/* first light — caused by her, not by the scrollbar */}
      <AnimatePresence>
        {all ? (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[55vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduced ? 0.4 : 3.4, ease: ease.enter }}
            style={{
              background:
                'radial-gradient(120% 100% at 50% 122%, rgba(246,201,122,0.52) 0%, rgba(233,166,60,0.22) 30%, transparent 64%)',
            }}
          />
        ) : null}
      </AnimatePresence>

      <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-14">
        <div className="flex flex-col gap-6">
          <Eyebrow>{s.place}</Eyebrow>
          <Reveal soft>
            <h2 className="u-display-tight max-w-xl text-2xl text-cream-100 sm:text-3xl">
              {s.title}
            </h2>
          </Reveal>
          <Reveal soft delay={0.2}>
            <p className="u-hand text-lg text-cream-200/45">{promisesCopy.instruction}</p>
          </Reveal>
        </div>

        <ul className="flex flex-col gap-3">
          {promises.map((p, i) => {
            const on = lit.includes(p.id);
            const thesis = i === promises.length - 1;
            return (
              <Reveal key={p.id} as="li" soft delay={i * 0.09}>
                <button
                  type="button"
                  onClick={() => light(p.id)}
                  aria-pressed={on}
                  className="group relative flex w-full items-start gap-5 rounded-edge border px-5 py-5 text-left transition-colors duration-500 sm:gap-7 sm:px-7 sm:py-6"
                  style={{
                    borderColor: on ? 'rgba(246,201,122,0.42)' : 'rgba(92,100,128,0.22)',
                    background: on
                      ? 'linear-gradient(100deg, rgba(233,166,60,0.09), transparent 62%)'
                      : 'transparent',
                  }}
                >
                  <span className="mt-1 shrink-0">
                    <Lamp lit={on} size={thesis ? 22 : 17} post={false} reduced={reduced} />
                  </span>

                  <span className="flex flex-col gap-2">
                    <span
                      className={`${thesis ? 'u-display-tight text-xl sm:text-2xl' : 'u-display text-lg sm:text-xl'} transition-colors duration-500`}
                      style={{ color: on ? 'var(--cream-100)' : 'rgba(245,237,224,0.42)' }}
                    >
                      {p.action}
                    </span>

                    <AnimatePresence>
                      {on ? (
                        <motion.span
                          className={
                            thesis
                              ? 'u-display-tight text-xl text-amber-300 sm:text-2xl'
                              : 'u-hand text-base text-amber-300/70'
                          }
                          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: reduced ? 0.25 : thesis ? 1.3 : 0.6,
                            ease: ease.enter,
                            delay: thesis ? 0.5 : 0.12,
                          }}
                        >
                          {p.detail}
                        </motion.span>
                      ) : null}
                    </AnimatePresence>
                  </span>

                  <span className="u-caps ml-auto shrink-0 self-center text-[0.55rem] text-cream-200/25">
                    {on ? promisesCopy.litLabel : ''}
                  </span>
                </button>
              </Reveal>
            );
          })}
        </ul>

        <AnimatePresence>
          {all ? (
            <motion.p
              className="u-hand text-center text-xl text-amber-300/80"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: ease.enter, delay: 1.6 }}
            >
              {promisesCopy.closing}
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>
    </Scene>
  );
}
