'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ui } from '@/data/love';

/**
 * PRESS AND HOLD TO ENTER.
 *
 * Not a click. This is the thesis of the whole site stated as an interaction:
 * effort opens things. Release early and it gently retreats — nothing is lost,
 * but nothing is given either.
 *
 * Keyboard holds work identically (Space/Enter), so the thesis is not
 * mouse-only.
 */

const HOLD_MS = 1600;
const RADIUS = 58;
const CIRC = 2 * Math.PI * RADIUS;

export default function HoldButton({
  onComplete,
  label = ui.hold,
  holdingLabel = ui.holding,
}: {
  onComplete: () => void;
  label?: string;
  holdingLabel?: string;
}) {
  const progress = useMotionValue(0);
  const [holding, setHolding] = useState(false);
  const [done, setDone] = useState(false);
  const raf = useRef(0);
  /* The door must open on time even if the browser stops painting — an
     occluded window, a backgrounded tab or a low-power device can throttle
     rAF to almost nothing, and without this the hold would silently never
     complete and the door would become a dead end. rAF drives the visual;
     this timer guarantees the outcome. */
  const timer = useRef<number>(0);
  const startedAt = useRef(0);
  const from = useRef(0);
  const doneRef = useRef(false);

  const dash = useTransform(progress, (p) => CIRC * (1 - p));
  const glow = useTransform(progress, [0, 1], [0.12, 1]);
  const scale = useTransform(progress, [0, 1], [1, 1.06]);

  const stop = useCallback(() => {
    cancelAnimationFrame(raf.current);
    window.clearTimeout(timer.current);
  }, []);

  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    cancelAnimationFrame(raf.current);
    window.clearTimeout(timer.current);
    setDone(true);
    setHolding(false);
    progress.set(1);
    onComplete();
  }, [onComplete, progress]);

  const tick = useCallback(() => {
    const elapsed = performance.now() - startedAt.current;
    const p = Math.min(1, from.current + elapsed / HOLD_MS);
    progress.set(p);
    if (p >= 1) {
      finish();
      return;
    }
    raf.current = requestAnimationFrame(tick);
  }, [finish, progress]);

  const release = useCallback(() => {
    if (doneRef.current) return;
    stop();
    setHolding(false);
    // Retreat, gently. Nothing punishes her for letting go.
    const back = () => {
      const v = progress.get();
      const next = v - 0.035;
      if (next <= 0) {
        progress.set(0);
        return;
      }
      progress.set(next);
      raf.current = requestAnimationFrame(back);
    };
    raf.current = requestAnimationFrame(back);
  }, [progress, stop]);

  const press = useCallback(() => {
    if (doneRef.current) return;
    stop();
    from.current = progress.get();
    startedAt.current = performance.now();
    setHolding(true);
    raf.current = requestAnimationFrame(tick);
    timer.current = window.setTimeout(finish, HOLD_MS * (1 - from.current));
  }, [finish, progress, stop, tick]);

  useEffect(
    () => () => {
      cancelAnimationFrame(raf.current);
      window.clearTimeout(timer.current);
    },
    [],
  );

  return (
    <div className="flex select-none flex-col items-center">
      <motion.button
        type="button"
        aria-label={label}
        onPointerDown={(e) => {
          e.preventDefault();
          press();
        }}
        onPointerUp={release}
        onPointerLeave={release}
        onPointerCancel={release}
        onKeyDown={(e) => {
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            if (!holding) press();
          }
        }}
        onKeyUp={(e) => {
          if (e.key === ' ' || e.key === 'Enter') release();
        }}
        onBlur={release}
        /* Sized against the viewport's height as well as its width: the hold
           is behind a scroll lock, so on a phone held sideways it has to shrink
           to stay reachable rather than slide under the fold. */
        className="relative grid size-[clamp(5rem,min(34vw,23svh),10rem)] place-items-center rounded-full"
        style={{ scale, touchAction: 'none' }}
        whileTap={{ scale: 0.99 }}
      >
        {/* the light she is coaxing out of the dark */}
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full"
          style={{
            opacity: glow,
            background:
              'radial-gradient(circle, rgba(246,201,122,0.42) 0%, rgba(233,166,60,0.14) 42%, transparent 72%)',
          }}
        />

        <svg viewBox="0 0 140 140" className="absolute inset-0 h-full w-full -rotate-90">
          <circle
            cx="70"
            cy="70"
            r={RADIUS}
            fill="none"
            stroke="rgba(233,166,60,0.18)"
            strokeWidth="1"
          />
          <motion.circle
            cx="70"
            cy="70"
            r={RADIUS}
            fill="none"
            stroke="url(#holdGrad)"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeDasharray={CIRC}
            style={{ strokeDashoffset: dash }}
          />
          <defs>
            <linearGradient id="holdGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#E9A63C" />
              <stop offset="100%" stopColor="#F6C97A" />
            </linearGradient>
          </defs>
        </svg>

        <span className="u-caps relative z-10 text-center text-[0.62rem] leading-relaxed text-cream-100/80">
          {done ? '' : holding ? holdingLabel : label}
        </span>
      </motion.button>
    </div>
  );
}
