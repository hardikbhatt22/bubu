'use client';

import { motion, useMotionTemplate, useTransform } from 'framer-motion';
import { useJourney } from '@/lib/useJourney';
import { atmosphere as A } from '@/lib/motion';

/**
 * The single atmosphere layer.
 *
 * Everything here is driven by one MotionValue `t`. No React state, no scroll
 * listener, no re-render — useTransform writes straight to style. This is the
 * emotional engine: dusk → evening → warm night → deep night → rain → still →
 * first light → sunrise. Nothing in the atmosphere is static across the walk.
 */

/* Deterministic pseudo-random so server and client agree.
   Math.sin is NOT bit-identical across JS engines, so every value is rounded
   to a fixed precision before it reaches the DOM. Without this, Node and the
   browser disagree in the 13th decimal and React throws a hydration error. */
const r2 = (v: number) => Math.round(v * 100) / 100;
const r4 = (v: number) => Math.round(v * 10000) / 10000;

function seeded(n: number, salt = 1) {
  const x = Math.sin(n * 12.9898 * salt + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

const STARS = Array.from({ length: 46 }, (_, i) => ({
  x: r4(seeded(i, 1) * 100),
  y: r4(seeded(i, 2) * 62),
  r: r4(0.5 + seeded(i, 3) * 1.1),
  d: r2(3 + seeded(i, 4) * 6),
  o: r2(0.25 + seeded(i, 5) * 0.65),
}));

const DROPS = Array.from({ length: 34 }, (_, i) => ({
  x: r4(seeded(i, 7) * 100),
  h: r2(9 + seeded(i, 8) * 14),
  d: r2(0.7 + seeded(i, 9) * 0.65),
  delay: r2(seeded(i, 10) * 2.2),
  o: r2(0.2 + seeded(i, 11) * 0.4),
}));

export default function Atmosphere() {
  const { t, reduced } = useJourney();

  const top = useTransform(t, A.stops, A.skyTop);
  const mid = useTransform(t, A.stops, A.skyMid);
  const low = useTransform(t, A.stops, A.skyLow);
  const sky = useMotionTemplate`linear-gradient(180deg, ${top} 0%, ${mid} 46%, ${low} 100%)`;

  const horizonOpacity = useTransform(t, A.stops, A.horizon);
  const starOpacity = useTransform(t, A.stops, A.stars);
  const fogOpacity = useTransform(t, A.stops, A.fog);
  const lamp = useTransform(t, A.stops, A.lamp);
  const rainOpacity = useTransform(t, A.stops, A.rain);

  /* The square's own ambient bloom — warm light pooling from off-frame lamps. */
  const bloom = useTransform(lamp, (v) => 0.14 + v * 0.3);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* ---------------------------------------------------------- the sky */}
      <motion.div className="absolute inset-0" style={{ background: sky }} />

      {/* -------------------------------------------------------- the stars */}
      <motion.svg
        className="absolute inset-x-0 top-0 h-[72%] w-full"
        viewBox="0 0 100 62"
        preserveAspectRatio="none"
        style={{ opacity: starOpacity }}
      >
        {STARS.map((s, i) => (
          <circle
            key={i}
            cx={s.x}
            cy={s.y}
            r={r4(s.r * 0.12)}
            fill="#F6C97A"
            opacity={s.o}
            style={
              reduced
                ? undefined
                : { animation: `plaza-breathe ${s.d}s ease-in-out ${r2(i * 0.17)}s infinite` }
            }
            data-motion="ambient"
          />
        ))}
      </motion.svg>

      {/* --------------------------------------------- horizon / daybreak
           Off-frame until the promises are lit, then it becomes the sunrise. */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-[58%]"
        style={{
          opacity: horizonOpacity,
          background:
            'radial-gradient(120% 100% at 50% 118%, rgba(246,201,122,0.92) 0%, rgba(233,166,60,0.42) 26%, rgba(185,79,99,0.14) 52%, transparent 76%)',
        }}
      />

      {/* --------------------------------------------- ambient lamp pooling */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: bloom,
          background:
            'radial-gradient(52% 40% at 12% 78%, rgba(233,166,60,0.5), transparent 68%),' +
            'radial-gradient(44% 34% at 88% 70%, rgba(91,44,143,0.55), transparent 70%),' +
            'radial-gradient(60% 46% at 50% 106%, rgba(233,166,60,0.34), transparent 72%)',
        }}
      />

      {/* --------------------------------------------------------- the fog */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: fogOpacity,
          background:
            'radial-gradient(80% 60% at 50% 100%, rgba(7,8,15,0) 0%, rgba(7,8,15,0.55) 58%, rgba(7,8,15,0.94) 100%),' +
            'linear-gradient(180deg, rgba(7,8,15,0.72) 0%, transparent 34%)',
        }}
      />

      {/* -------------------------------------------------------- the rain
           The only weather event in the entire site. It arrives once, for the
           quiet days, and it stops when the excuses stop. */}
      <motion.div className="absolute inset-0" style={{ opacity: rainOpacity }}>
        {DROPS.map((d, i) => (
          <span
            key={i}
            data-motion="weather"
            className="absolute top-0 w-px"
            style={{
              left: `${d.x}%`,
              height: `${d.h}vh`,
              opacity: d.o,
              background:
                'linear-gradient(180deg, transparent, rgba(92,100,128,0.9), transparent)',
              animation: reduced
                ? undefined
                : `plaza-fall ${r2(d.d + 0.9)}s linear ${d.delay}s infinite`,
              transform: reduced ? `translate3d(0, ${r2(20 + i * 2.4)}vh, 0)` : undefined,
            }}
          />
        ))}
      </motion.div>

      {/* --------------------------------------------------------- vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 90% at 50% 50%, transparent 52%, rgba(7,8,15,0.55) 100%)',
        }}
      />

      <div className="grain" />
    </div>
  );
}
