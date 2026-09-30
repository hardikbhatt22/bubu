'use client';

import { motion, useTransform } from 'framer-motion';
import { useState } from 'react';
import { chapters } from '@/data/love';
import { useJourney } from '@/lib/useJourney';
import { ease } from '@/lib/motion';

/**
 * Navigation is not a navbar. She is walking, and the markers are the lamps she
 * has already lit. On mobile this collapses to a filament on the screen edge
 * that warms as she goes — no hamburger, no drawer.
 */
export default function ChapterRail() {
  const { current, isLit, goTo, entered, t } = useJourney();
  const [hovered, setHovered] = useState<string | null>(null);
  const filament = useTransform(t, [0, 1], ['2%', '100%']);

  if (!entered) return null;

  return (
    <>
      {/* -------------------------------------------------- mobile filament */}
      <div
        aria-hidden
        className="pointer-events-none fixed left-[env(safe-area-inset-left)] top-0 z-40 h-full w-[3px] bg-cream-100/[0.04] md:hidden"
      >
        <motion.div
          className="w-full origin-top"
          style={{
            height: filament,
            background:
              'linear-gradient(180deg, rgba(233,166,60,0.15), rgba(246,201,122,0.75))',
          }}
        />
      </div>

      {/* ----------------------------------------------------- desktop rail */}
      <nav
        aria-label="Chapters"
        className="fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-1 md:flex lg:left-8"
      >
        {chapters.map((c) => {
          const lit = isLit(c.id);
          const active = current === c.id;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => goTo(c.id)}
              onMouseEnter={() => setHovered(c.id)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(c.id)}
              onBlur={() => setHovered(null)}
              className="group relative flex items-center gap-3 rounded-edge py-[7px] pl-1 pr-2 text-left"
              aria-current={active ? 'true' : undefined}
            >
              {/* the lamp glyph — lit behind her, dark ahead */}
              <span className="relative grid h-3 w-3 place-items-center">
                <motion.span
                  className="absolute rounded-full"
                  style={{
                    width: 18,
                    height: 18,
                    background:
                      'radial-gradient(circle, rgba(246,201,122,0.5), transparent 68%)',
                  }}
                  initial={false}
                  animate={{ opacity: lit ? 1 : 0, scale: active ? 1.25 : 1 }}
                  transition={{ duration: 0.7, ease: ease.enter }}
                />
                <motion.span
                  className="relative block rounded-full"
                  initial={false}
                  animate={{
                    width: active ? 7 : 5,
                    height: active ? 7 : 5,
                    backgroundColor: lit ? '#F6C97A' : 'rgba(92,100,128,0.4)',
                  }}
                  transition={{ duration: 0.4, ease: ease.enter }}
                />
              </span>

              {/* Absolutely positioned so the rail's layout box stays as narrow
                  as the lamp itself — otherwise every label would reserve width
                  and push the walk off-centre. It surfaces on hover or focus
                  only; the active chapter is already told by its brighter,
                  larger lamp, and a permanently open label turns a quiet
                  wayfinder into a menu. */}
              <motion.span
                className="pointer-events-none absolute left-full ml-3 whitespace-nowrap text-sm text-amber-300/80 u-hand"
                initial={false}
                animate={{
                  opacity: hovered === c.id ? 1 : 0,
                  x: hovered === c.id ? 0 : -6,
                }}
                transition={{ duration: 0.28, ease: ease.enter }}
              >
                {c.label}
              </motion.span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
