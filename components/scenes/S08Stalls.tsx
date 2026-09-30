'use client';

import { useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Scene from '@/components/primitives/Scene';
import { Eyebrow, Reveal } from '@/components/primitives/Reveal';
import Couplet from '@/components/primitives/Couplet';
import { littleThings, stallsCopy, storyById, type LittleThing } from '@/data/love';
import { useJourney } from '@/lib/useJourney';
import { ease } from '@/lib/motion';

/**
 * THE STALLS.
 *
 * "I remember the little things you like" — the most important non-apology
 * message in the site, so it is discovered, not read off four cards.
 *
 * Each stall is dark until she touches it. Then it lights, animates once, and
 * gives up one short line. Every line contains a FACT about her, not a
 * compliment: "you like ice cream" is dead on the page.
 */

const ACCENT: Record<LittleThing['accent'], string> = {
  amber: 'rgba(233,166,60,',
  cocoa: 'rgba(122,68,184,',
  cream: 'rgba(227,215,196,',
  pista: 'rgba(156,191,163,',
};

/* ------------------------------------------------------- drawn, not borrowed */

function Glyph({ id, lit }: { id: string; lit: boolean }) {
  const stroke = lit ? 'rgba(246,201,122,0.95)' : 'rgba(92,100,128,0.5)';
  const fill = lit ? 'rgba(246,201,122,0.16)' : 'transparent';
  const common = { stroke, strokeWidth: 1.2, fill: 'none', strokeLinecap: 'round' as const };

  if (id === 'panipuri') {
    return (
      <svg viewBox="0 0 64 44" className="h-16 w-20" aria-hidden>
        <ellipse cx="32" cy="34" rx="27" ry="6.5" {...common} fill={fill} />
        {[10, 21, 32, 43, 54].map((x, i) => (
          <circle key={x} cx={x} cy={i % 2 === 0 ? 25 : 27} r="6" {...common} fill={fill} />
        ))}
        <circle cx="32" cy="14" r="5" {...common} fill={lit ? 'rgba(246,201,122,0.3)' : 'none'} />
      </svg>
    );
  }
  if (id === 'dairymilk') {
    return (
      <svg viewBox="0 0 64 44" className="h-16 w-20" aria-hidden>
        <rect x="12" y="8" width="40" height="28" rx="1.5" {...common} fill={lit ? 'rgba(122,68,184,0.35)' : 'none'} />
        <line x1="12" y1="22" x2="52" y2="22" {...common} />
        <line x1="25.3" y1="8" x2="25.3" y2="36" {...common} />
        <line x1="38.6" y1="8" x2="38.6" y2="36" {...common} />
      </svg>
    );
  }
  if (id === 'brownie') {
    return (
      <svg viewBox="0 0 64 44" className="h-16 w-20" aria-hidden>
        <path d="M16 36 L20 18 H44 L48 36 Z" {...common} fill={fill} />
        <line x1="20" y1="24" x2="44" y2="24" {...common} />
        {lit ? (
          <>
            <path d="M28 13 C 26 10, 30 8, 28 5" {...common} opacity="0.7" />
            <path d="M36 13 C 34 10, 38 8, 36 5" {...common} opacity="0.5" />
          </>
        ) : null}
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 64 44" className="h-16 w-20" aria-hidden>
      <path d="M22 20 L32 40 L42 20 Z" {...common} fill={fill} />
      <circle cx="32" cy="15" r="8" {...common} fill={lit ? 'rgba(156,191,163,0.32)' : 'none'} />
      <line x1="24" y1="26" x2="40" y2="26" {...common} opacity="0.6" />
    </svg>
  );
}

/* ----------------------------------------------------------------- a stall */

function Stall({
  thing,
  found,
  allFound,
  onFind,
  index,
}: {
  thing: LittleThing;
  found: boolean;
  allFound: boolean;
  onFind: (id: string) => void;
  index: number;
}) {
  const { reduced } = useJourney();
  const a = ACCENT[thing.accent];

  return (
    <Reveal soft delay={index * 0.12} className="h-full">
      <button
        type="button"
        onMouseEnter={() => onFind(thing.id)}
        onFocus={() => onFind(thing.id)}
        onClick={() => onFind(thing.id)}
        aria-pressed={found}
        aria-label={thing.label}
        className="group relative flex h-full w-full flex-col items-center gap-4 rounded-edge border p-5 text-center transition-colors duration-500 sm:p-6"
        style={{
          borderColor: found ? `${a}0.45)` : 'rgba(92,100,128,0.2)',
          background: found
            ? `radial-gradient(110% 80% at 50% 0%, ${a}0.14), transparent 68%)`
            : 'transparent',
        }}
      >
        {/* the stall's own lamp */}
        <motion.span
          aria-hidden
          className="absolute left-1/2 top-0 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: `radial-gradient(circle, ${a}0.4), transparent 68%)` }}
          initial={false}
          animate={{ opacity: found ? 1 : 0 }}
          transition={{ duration: reduced ? 0.2 : 0.8, ease: ease.enter }}
        />

        <motion.div
          initial={false}
          animate={found && !reduced ? { y: [0, -5, 0] } : { y: 0 }}
          transition={{ duration: 0.85, ease: ease.enter }}
        >
          <Glyph id={thing.id} lit={found} />
        </motion.div>

        <div className="flex flex-col gap-1">
          <p
            className="u-display text-base transition-colors duration-500 sm:text-lg"
            style={{ color: found ? 'var(--cream-100)' : 'rgba(245,237,224,0.35)' }}
          >
            {thing.label}
          </p>
          <p className="u-caps text-[0.58rem] text-cream-200/30">{thing.sign}</p>
        </div>

        {/* what it gives up */}
        {/* Both states share one grid cell so the line can arrive while the
            dots are still leaving. Deliberately NOT `mode="wait"`: that would
            hold the line back until the exit animation finished, which turns a
            discovery into a stutter — and strands the stall on its placeholder
            if the animation loop is ever throttled. */}
        <div className="grid min-h-[4.5rem] place-items-center">
          <AnimatePresence initial={false}>
            {found ? (
              <motion.p
                key="line"
                style={{ gridArea: '1 / 1' }}
                className="u-hand text-base leading-snug text-amber-300/85"
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduced ? 0.25 : 0.6, ease: ease.enter }}
              >
                {thing.line}
              </motion.p>
            ) : (
              <motion.span
                key="dark"
                style={{ gridArea: '1 / 1' }}
                className="u-caps text-[0.58rem] text-cream-200/20"
                initial={false}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                ···
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* the extra beat, only once all four are open */}
        <AnimatePresence>
          {allFound ? (
            <motion.p
              className="u-caps text-[0.58rem] leading-relaxed text-cream-200/45"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.7, ease: ease.enter, delay: 0.2 + index * 0.1 }}
            >
              {thing.found}
            </motion.p>
          ) : null}
        </AnimatePresence>
      </button>
    </Reveal>
  );
}

/* ----------------------------------------------------------------- scene */

export default function S08Stalls() {
  const s = storyById('stalls');
  const [found, setFound] = useState<string[]>([]);
  const all = found.length === littleThings.length;

  const onFind = useCallback((id: string) => {
    setFound((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  return (
    <Scene id="stalls" label="Things I know about you" className="flex items-center px-6 py-[12svh]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12">
        <div className="flex flex-col gap-6">
          <Eyebrow>{s.place}</Eyebrow>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <Reveal soft>
              <h2 className="u-display-tight max-w-lg text-2xl text-cream-100 sm:text-3xl">
                {s.title}
              </h2>
            </Reveal>

            {/* the counter */}
            <Reveal soft delay={0.2} className="flex items-center gap-3">
              <span className="u-caps text-cream-200/40">
                {found.length} / {littleThings.length} {stallsCopy.counterLabel}
              </span>
              <span className="flex gap-1.5" aria-hidden>
                {littleThings.map((t) => (
                  <motion.span
                    key={t.id}
                    className="block h-1.5 w-1.5 rounded-full"
                    initial={false}
                    animate={{
                      backgroundColor: found.includes(t.id)
                        ? '#F6C97A'
                        : 'rgba(92,100,128,0.35)',
                    }}
                    transition={{ duration: 0.4 }}
                  />
                ))}
              </span>
            </Reveal>
          </div>

          <Reveal soft delay={0.3}>
            <p className="u-hand text-lg text-cream-200/45">
              <span className="hidden sm:inline">{stallsCopy.hint}</span>
              <span className="sm:hidden">{stallsCopy.hintTouch}</span>
            </p>
          </Reveal>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {littleThings.map((t, i) => (
            <Stall
              key={t.id}
              thing={t}
              index={i}
              found={found.includes(t.id)}
              allFound={all}
              onFind={onFind}
            />
          ))}
        </div>

        <AnimatePresence>
          {all ? (
            <motion.p
              className="u-display-tight mx-auto max-w-2xl text-center text-xl text-amber-300 sm:text-2xl"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: ease.enter, delay: 0.6 }}
            >
              {stallsCopy.complete}
            </motion.p>
          ) : null}
        </AnimatePresence>

        <Couplet scene="stalls" className="pt-2" />
      </div>
    </Scene>
  );
}
