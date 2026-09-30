'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ui } from '@/data/love';
import { useJourney } from '@/lib/useJourney';
import { ease } from '@/lib/motion';

/**
 * A low warm room tone, synthesised — no audio file, no megabytes, no
 * copyright. Off by default, never autoplayed, offered once with a single
 * glyph. Every emotional beat lands fully with sound off; audio may enhance,
 * it may never carry.
 */
export default function AmbientSound() {
  const { sound, toggleSound, entered } = useJourney();
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  useEffect(() => {
    if (!sound) {
      const g = gainRef.current;
      const ctx = ctxRef.current;
      if (g && ctx) g.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.9);
      return;
    }

    type WithWebkit = typeof window & { webkitAudioContext?: typeof AudioContext };
    const Ctor = window.AudioContext ?? (window as WithWebkit).webkitAudioContext;
    if (!Ctor) return;

    let ctx = ctxRef.current;
    if (!ctx) {
      ctx = new Ctor();
      ctxRef.current = ctx;

      const master = ctx.createGain();
      master.gain.value = 0;
      master.connect(ctx.destination);
      gainRef.current = master;

      // A warm pad: two detuned low sines, heavily filtered.
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 320;
      filter.Q.value = 0.6;
      filter.connect(master);

      [55, 82.5, 110].forEach((f, i) => {
        const osc = ctx!.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = f + (i - 1) * 0.35;
        const g = ctx!.createGain();
        g.gain.value = i === 2 ? 0.05 : 0.11;
        osc.connect(g).connect(filter);
        osc.start();
      });

      // Distant plaza texture: filtered noise, barely there.
      const len = ctx.sampleRate * 3;
      const buf = ctx.createBuffer(1, len, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * 0.35;
      const noise = ctx.createBufferSource();
      noise.buffer = buf;
      noise.loop = true;
      const nf = ctx.createBiquadFilter();
      nf.type = 'bandpass';
      nf.frequency.value = 480;
      nf.Q.value = 0.45;
      const ng = ctx.createGain();
      ng.gain.value = 0.035;
      noise.connect(nf).connect(ng).connect(master);
      noise.start();

      // Slow breathing so it never sits perfectly still.
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.055;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 60;
      lfo.connect(lfoGain).connect(filter.frequency);
      lfo.start();
    }

    void ctx.resume();
    gainRef.current?.gain.linearRampToValueAtTime(0.055, ctx.currentTime + 2.2);
  }, [sound]);

  /* The finale's third beat: the bed drops out so the last line arrives into
     silence rather than into more sound. */
  useEffect(() => {
    const onStill = (e: Event) => {
      const still = (e as CustomEvent<boolean>).detail;
      const ctx = ctxRef.current;
      const g = gainRef.current;
      if (!ctx || !g || !sound) return;
      g.gain.cancelScheduledValues(ctx.currentTime);
      g.gain.linearRampToValueAtTime(still ? 0 : 0.055, ctx.currentTime + (still ? 1.2 : 2.4));
    };
    window.addEventListener('plaza:still', onStill);
    return () => window.removeEventListener('plaza:still', onStill);
  }, [sound]);

  // Never keep making noise into an empty room.
  useEffect(() => {
    const onHide = () => {
      const ctx = ctxRef.current;
      if (!ctx) return;
      if (document.hidden) void ctx.suspend();
      else if (sound) void ctx.resume();
    };
    document.addEventListener('visibilitychange', onHide);
    return () => document.removeEventListener('visibilitychange', onHide);
  }, [sound]);

  useEffect(() => () => void ctxRef.current?.close(), []);

  if (!entered) return null;

  return (
    <motion.button
      type="button"
      onClick={toggleSound}
      aria-pressed={sound}
      aria-label={sound ? ui.audioOn : ui.audioOff}
      className="fixed right-4 top-4 z-40 grid h-11 w-11 place-items-center rounded-full border border-amber-400/25 text-amber-300/70 transition-colors hover:border-amber-300/60 hover:text-amber-300 md:right-6 md:top-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: ease.enter, delay: 1.2 }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path
          d="M2.5 6h2L7.5 3.5v9L4.5 10h-2z"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        {sound ? (
          <>
            <path d="M10 5.6a3.4 3.4 0 010 4.8" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
            <path d="M12 3.8a6 6 0 010 8.4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" opacity="0.6" />
          </>
        ) : (
          <path d="M10.4 6.2l3.4 3.6M13.8 6.2l-3.4 3.6" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
        )}
      </svg>
    </motion.button>
  );
}
