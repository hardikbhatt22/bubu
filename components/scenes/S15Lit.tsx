'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import Scene from '@/components/primitives/Scene';
import Lamp from '@/components/primitives/Lamp';
import PhotoFrame from '@/components/primitives/PhotoFrame';
import Ticket from '@/components/primitives/Ticket';
import { chapters, finalMessage, litCopy, photos } from '@/data/love';
import { useJourney } from '@/lib/useJourney';
import { ease } from '@/lib/motion';

/**
 * THE PLAZA, LIT.
 *
 * Four beats, and they must not be collapsed into one:
 *
 *   1. RECALL — every lamp she lit brightens in story order. The square is
 *      fully illuminated for the first time.
 *   2. THE FIVE — the photos rise as lanterns and settle into a constellation.
 *      This is the first and only time all five are visible together; that is
 *      why they were held back all the way to here.
 *   3. "I love you." — quiet, almost small. Then everything stills: motion
 *      pauses, the audio bed ducks, the atmosphere holds its breath.
 *   4. The line. Largest type in the site, alone on the screen, sunrise
 *      breaking behind it. No confetti, no particles, no hearts — light, type
 *      and stillness only.
 */

/*
 * The constellation. Each slot's width is capped in viewport-height units as
 * well as in percent, because a frame's HEIGHT is what overflows: a 2:3 mat is
 * one and a half times its own width, so a purely width-based slot spills off
 * a short screen. `min(%, vh)` keeps every frame inside the last view no
 * matter the window's proportions.
 */
/* Slot heights are capped in svh (the SMALL viewport height) so a frame can
   never be pushed below the fold on a browser whose chrome expands. */
/*
 * The constellation — one slot per photograph, in the order they appear in
 * `photos`. The last slot is the hero: largest, closest, and it lands last.
 *
 * Widths are capped in svh (the SMALL viewport height) as well as in percent,
 * because a frame's HEIGHT is what overflows — a 2:3 mat is one and a half
 * times its own width, so a purely width-based slot spills off a short screen.
 */
const DESKTOP = [
  { left: '4%', top: '13%', w: 'min(15%, 19svh)', r: 'tall' as const, light: 'right' as const },
  { left: '22%', top: '46%', w: 'min(14%, 21svh)', r: 'portrait' as const, light: 'top' as const },
  { left: '40%', top: '10%', w: 'min(15%, 21svh)', r: 'portrait' as const, light: 'left' as const },
  { left: '78%', top: '40%', w: 'min(15%, 20svh)', r: 'tall' as const, light: 'left' as const },
  { left: '56%', top: '50%', w: 'min(20%, 24svh)', r: 'tall' as const, light: 'top' as const },
];

const MOBILE = [
  { left: '3%', top: '5%', w: 'min(30%, 17svh)', r: 'tall' as const, light: 'right' as const },
  { left: '60%', top: '10%', w: 'min(30%, 18svh)', r: 'portrait' as const, light: 'left' as const },
  { left: '6%', top: '36%', w: 'min(28%, 17svh)', r: 'portrait' as const, light: 'top' as const },
  { left: '66%', top: '40%', w: 'min(28%, 17svh)', r: 'tall' as const, light: 'left' as const },
  { left: '28%', top: '60%', w: 'min(36%, 19svh)', r: 'tall' as const, light: 'top' as const },
];

export default function S15Lit() {
  const outer = useRef<HTMLDivElement>(null);
  const { reduced, picks, goTo, isLit } = useJourney();
  const [mobile, setMobile] = useState(false);
  const stillRef = useRef(false);

  const { scrollYProgress: p } = useScroll({
    target: outer,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)');
    const set = () => setMobile(mq.matches);
    set();
    mq.addEventListener('change', set);
    return () => mq.removeEventListener('change', set);
  }, []);

  /* Beat three: the site genuinely holds its breath. */
  useMotionValueEvent(p, 'change', (v) => {
    const still = v > 0.5 && v < 0.68;
    if (still === stillRef.current) return;
    stillRef.current = still;
    document.documentElement.dataset.still = still ? 'true' : 'false';
    window.dispatchEvent(new CustomEvent('plaza:still', { detail: still }));
  });

  useEffect(
    () => () => {
      document.documentElement.dataset.still = 'false';
    },
    [],
  );

  const recall = useTransform(p, [0, 0.06, 0.2, 0.3], [0, 1, 1, 0]);
  const lanterns = useTransform(p, [0.18, 0.3, 0.5, 0.58], [0, 1, 1, 0.12]);
  const beatOne = useTransform(p, [0.46, 0.54, 0.64, 0.7], [0, 1, 1, 0]);
  const beatTwo = useTransform(p, [0.7, 0.8, 1, 1], [0, 1, 1, 1]);
  const sunrise = useTransform(p, [0.66, 0.84], [0, 1]);
  const finalScale = useTransform(p, [0.7, 0.9], [0.94, 1]);

  const pos = mobile ? MOBILE : DESKTOP;
  const litChapters = chapters.filter((c) => c.lamp);

  return (
    <Scene id="lit" label="Sunrise" height={reduced ? 2 : 4.6} className="relative">
      {/* Same as the train: the pin's travel comes from the scene's declared
          height, leaving the section free to grow around it. */}
      <div ref={outer} className="relative w-full" style={{ height: 'var(--scene-h)' }}>
        <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden px-5 sm:px-6">
          {/* the sunrise, breaking on the last line */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              opacity: sunrise,
              background:
                'radial-gradient(130% 90% at 50% 118%, rgba(255,226,170,0.85) 0%, rgba(246,201,122,0.5) 22%, rgba(217,138,78,0.28) 44%, rgba(185,79,99,0.1) 62%, transparent 78%)',
            }}
          />

          {/* ---------------------------------------------- beat one: recall */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center gap-10"
            style={{ opacity: recall }}
          >
            <p className="u-caps text-amber-300/60">{litCopy.recall}</p>
            <div className="flex w-full max-w-4xl items-end justify-between gap-1 sm:gap-3">
              {litChapters.map((c, i) => (
                <div key={c.id} className="flex flex-1 items-end justify-center">
                  <Lamp
                    lit={isLit(c.id)}
                    size={i % 3 === 0 ? 20 : 14}
                    delay={reduced ? 0 : i * 0.16}
                    reduced={reduced}
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* --------------------------------- beat two: the five, together */}
          <motion.div className="absolute inset-0" style={{ opacity: lanterns }}>
            <div className="relative mx-auto h-full w-full max-w-5xl">
              {photos.map((photo, i) => {
                const q = pos[i % pos.length];
                return (
                  <motion.div
                    key={photo.id}
                    className="absolute"
                    style={{ left: q.left, top: q.top, width: q.w }}
                    initial={reduced ? { opacity: 0 } : { opacity: 0, y: 60 }}
                    whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.05 }}
                    transition={{
                      duration: reduced ? 0.4 : 1.6,
                      ease: ease.enter,
                      // the newest one lands last, largest, closest
                      delay: reduced ? 0 : i === photos.length - 1 ? 1.5 : 0.25 + i * 0.28,
                    }}
                  >
                    <PhotoFrame
                      photo={photo}
                      ratio={q.r}
                      light={q.light}
                      showNote={i === photos.length - 1}
                      sizes="(max-width: 640px) 40vw, 22vw"
                    />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* ----------------------------------- beat three: quiet, and small */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{ opacity: beatOne }}
          >
            <p className="u-display text-xl text-cream-100/85 sm:text-2xl">
              {finalMessage.beatOne}
            </p>
          </motion.div>

          {/* ------------------------------------------ beat four: the line */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center gap-10 text-center"
            style={{ opacity: beatTwo, scale: finalScale }}
          >
            <h2 className="u-display-tight max-w-[18ch] text-4xl leading-[0.98] text-cream-100 sm:max-w-none sm:text-5xl">
              {finalMessage.beatTwo}
            </h2>
            <p className="u-hand text-xl text-ink-900/70 sm:text-2xl">
              {finalMessage.signature}
            </p>
          </motion.div>

          {/* what she planned, kept in the corner */}
          {picks.length === 3 ? (
            <motion.div
              className="absolute bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] hidden sm:block"
              style={{ opacity: beatTwo }}
            >
              <span className="u-caps mb-2 block text-right text-[0.5rem] text-ink-900/45">
                {finalMessage.keptLabel}
              </span>
              <Ticket picks={picks} compact />
            </motion.div>
          ) : null}

          {/* nothing asks her for anything. it is just there, finished. */}
          <motion.button
            type="button"
            onClick={() => goTo('door')}
            className="u-hand u-quiet absolute bottom-[max(1.5rem,env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 rounded-edge px-4 text-base text-ink-900/45 transition-colors hover:text-ink-900/80"
            style={{ opacity: beatTwo }}
          >
            {finalMessage.again}
          </motion.button>
        </div>
      </div>
    </Scene>
  );
}
