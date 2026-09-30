'use client';

import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import { useJourney } from '@/lib/useJourney';
import type { SceneId } from '@/data/love';

interface Props {
  id: SceneId;
  children: React.ReactNode;
  className?: string;
  /** Multiplier on 100dvh. Pinned sequences ask for more scroll length. */
  height?: number;
  /** Walking past a chapter lights its lamp. A few scenes light theirs on an action instead. */
  autoLight?: boolean;
  label?: string;
}

/**
 * A place in the square, not a page section. Every scene registers itself so
 * the chapter rail can travel to it, reports arrival for the resume state, and
 * (usually) lights its lamp when she reaches it.
 */
export default function Scene({
  id,
  children,
  className = '',
  height,
  autoLight = true,
  label,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const { registerScene, arrive, lightLamp, entered } = useJourney();
  const seen = useInView(ref, { amount: 0.4 });

  useEffect(() => {
    registerScene(id, ref.current);
    return () => registerScene(id, null);
  }, [id, registerScene]);

  useEffect(() => {
    if (!seen) return;
    // The door has to be open before any of this is a place she has been.
    if (!entered) return;

    /* IntersectionObserver can fire during the entrance reflow, while the
       sections are still stacked and every one of them technically overlaps
       the viewport. Trusting it there would light lamps ahead of her and
       send the resume offer to a chapter she never reached, so arrival is
       confirmed against real geometry before it counts. */
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.height === 0) return;
    const visible =
      Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));
    if (visible / Math.min(rect.height, window.innerHeight) < 0.35) return;

    arrive(id);
    if (autoLight) lightLamp(id);
  }, [seen, id, arrive, lightLamp, autoLight, entered]);

  return (
    <section
      ref={ref}
      id={`scene-${id}`}
      aria-label={label}
      className={`relative z-10 w-full ${className}`}
      /* `svh`, not `dvh`. On a phone, `dvh` changes every time the address bar
         slides away, which re-lays-out fifteen scenes mid-scroll and makes the
         scroll-driven sequences stutter. `svh` is the one viewport unit that
         holds still while she is moving.
         A scene that asks for extra scroll length publishes that length as
         `--scene-h` rather than as a hard `height`. A pinned wrapper reads the
         variable, so it gets its full travel while the section is still free to
         grow for anything that follows the pin — a `height` here would let that
         content spill over the top of the next scene. */
      style={
        {
          minHeight: `${(height ?? 1) * 100}svh`,
          '--scene-h': `${(height ?? 1) * 100}svh`,
        } as React.CSSProperties
      }
    >
      {children}
    </section>
  );
}
