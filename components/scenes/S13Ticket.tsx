'use client';

import { useCallback, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Scene from '@/components/primitives/Scene';
import { Eyebrow, Reveal } from '@/components/primitives/Reveal';
import Ticket from '@/components/primitives/Ticket';
import { dateTokens, storyById, ticketCopy } from '@/data/love';
import { useJourney } from '@/lib/useJourney';
import { ease } from '@/lib/motion';

/**
 * THE STALL THAT IS NOT BUILT YET.
 *
 * Hope in the form of a plan. The site has to breathe before the finale, and
 * this is the one scene allowed to be cheeky.
 *
 * Her three picks print a ticket, persisted so it is still there when she comes
 * back, and pinned in the corner of the final frame like something kept. The
 * "surprise" token reveals nothing on purpose — that is the joke and also the
 * promise.
 */
export default function S13Ticket() {
  const s = storyById('ticket');
  const { picks, setPicks, reduced } = useJourney();
  const [tease, setTease] = useState(false);
  const removals = useRef(0);

  const toggle = useCallback(
    (id: string) => {
      setPicks((prev) => {
        if (prev.includes(id)) {
          removals.current += 1;
          if (removals.current >= 3) setTease(true);
          return prev.filter((p) => p !== id);
        }
        if (prev.length >= 3) return prev;
        return [...prev, id];
      });
    },
    [setPicks],
  );

  const done = picks.length === 3;
  const remaining = 3 - picks.length;

  return (
    <Scene id="ticket" label="Pick our next three" className="flex items-center px-6 py-[14svh]">
      <div className="mx-auto grid w-full max-w-5xl items-center gap-14 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
        <div className="flex flex-col gap-10">
          <Eyebrow>{s.place}</Eyebrow>

          <div className="flex flex-col gap-3">
            <Reveal soft>
              <h2 className="u-display-tight text-2xl text-cream-100 sm:text-3xl">
                {ticketCopy.prompt}
              </h2>
            </Reveal>
            <Reveal soft delay={0.15}>
              <p className="u-hand text-lg text-cream-200/50">{ticketCopy.promptSub}</p>
            </Reveal>
          </div>

          {/* the tokens */}
          <ul className="flex flex-wrap gap-3">
            {dateTokens.map((t, i) => {
              const idx = picks.indexOf(t.id);
              const picked = idx >= 0;
              const full = picks.length >= 3 && !picked;
              return (
                <Reveal key={t.id} as="li" soft delay={0.1 + i * 0.06}>
                  <button
                    type="button"
                    onClick={() => toggle(t.id)}
                    aria-pressed={picked}
                    disabled={full}
                    className="u-control disabled:cursor-not-allowed disabled:opacity-30"
                    style={
                      picked
                        ? {
                            borderColor: 'rgba(246,201,122,0.75)',
                            color: '#fff',
                            background:
                              'linear-gradient(100deg, rgba(233,166,60,0.14), transparent)',
                          }
                        : undefined
                    }
                  >
                    {picked ? (
                      <motion.span
                        className="u-caps text-[0.55rem] text-amber-300"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, ease: ease.enter }}
                      >
                        {String(idx + 1).padStart(2, '0')}
                      </motion.span>
                    ) : null}
                    <span>{t.label}</span>
                  </button>
                </Reveal>
              );
            })}
          </ul>

          <div className="grid min-h-[3.5rem] content-start gap-2">
            <AnimatePresence initial={false}>
              {done ? (
                <motion.p
                  key="done"
                  style={{ gridArea: '1 / 1' }}
                  className="u-display text-lg text-amber-300 sm:text-xl"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: ease.enter }}
                >
                  {ticketCopy.done}
                </motion.p>
              ) : (
                <motion.p
                  key="more"
                  style={{ gridArea: '1 / 1' }}
                  className="u-caps text-cream-200/40"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {ticketCopy.pickMore(remaining)}
                </motion.p>
              )}
            </AnimatePresence>

            {/* she likes irritating me. the site is allowed to notice. */}
            <AnimatePresence>
              {tease ? (
                <motion.p
                  className="u-hand text-base text-cream-200/45"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {ticketCopy.tease}
                </motion.p>
              ) : null}
            </AnimatePresence>
          </div>

          {done ? (
            <button
              type="button"
              onClick={() => setPicks([])}
              className="u-caps u-quiet self-start rounded-edge px-2 text-[0.58rem] text-cream-200/30 transition-colors hover:text-amber-300/80"
            >
              {ticketCopy.reset}
            </button>
          ) : null}
        </div>

        {/* the printed ticket */}
        <div className="flex min-h-[18rem] items-center justify-center">
          <AnimatePresence initial={false}>
            {picks.length > 0 ? (
              <Ticket key={picks.join('-')} picks={picks} delay={reduced ? 0 : 0.1} />
            ) : (
              <motion.div
                key="blank"
                className="flex h-56 w-full max-w-[420px] items-center justify-center rounded-edge border border-dashed border-cream-100/12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <span className="u-caps text-cream-200/20">nothing printed yet</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Scene>
  );
}
