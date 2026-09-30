'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useMotionValue, useReducedMotion, type MotionValue } from 'framer-motion';
import { chapters, type SceneId } from '@/data/love';

/**
 * ONE atmosphere state, ONE subscriber tree.
 *
 * `t` is a MotionValue written from a single rAF-throttled scroll handler and
 * read by the atmosphere layer through useTransform. React does not re-render
 * on scroll — that is the whole point of this file. Discrete state (entered,
 * which lamps are lit, the current chapter) lives in useState because it
 * changes a handful of times per journey, not sixty times per second.
 */

const STORE_KEY = 'promise-plaza/v1';

interface Persisted {
  furthest?: SceneId;
  picks?: string[];
  roman?: boolean;
}

function readStore(): Persisted {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(window.localStorage.getItem(STORE_KEY) ?? '{}') as Persisted;
  } catch {
    return {};
  }
}

function writeStore(patch: Persisted) {
  if (typeof window === 'undefined') return;
  try {
    const next = { ...readStore(), ...patch };
    window.localStorage.setItem(STORE_KEY, JSON.stringify(next));
  } catch {
    /* private mode, blocked storage — the experience must not care */
  }
}

export interface Journey {
  /** 0 → 1 across the whole walk. Continuous. Never read in render. */
  t: MotionValue<number>;
  entered: boolean;
  enter: () => void;
  current: SceneId;
  arrive: (id: SceneId) => void;
  litLamps: SceneId[];
  lightLamp: (id: SceneId) => void;
  isLit: (id: SceneId) => boolean;
  lampCount: number;
  totalLamps: number;
  reduced: boolean;
  sound: boolean;
  toggleSound: () => void;
  roman: boolean;
  toggleRoman: () => void;
  picks: string[];
  setPicks: (next: string[] | ((prev: string[]) => string[])) => void;
  goTo: (id: SceneId) => void;
  registerScene: (id: SceneId, el: HTMLElement | null) => void;
  /** Set once on mount if a previous walk got past the first few chapters. */
  resumeAt: SceneId | null;
  dismissResume: () => void;
}

export const JourneyContext = createContext<Journey | null>(null);

export function useJourney(): Journey {
  const ctx = useContext(JourneyContext);
  if (!ctx) throw new Error('useJourney must be used inside <JourneyProvider>');
  return ctx;
}

const LAMP_CHAPTERS = chapters.filter((c) => c.lamp).map((c) => c.id);

export function useJourneyState(): Journey {
  const t = useMotionValue(0);
  const reducedPref = useReducedMotion();
  const reduced = !!reducedPref;

  const [entered, setEntered] = useState(false);
  const [current, setCurrent] = useState<SceneId>('door');
  const [litLamps, setLitLamps] = useState<SceneId[]>(['door']);
  const [sound, setSound] = useState(false);
  const [roman, setRoman] = useState(false);
  const [picks, setPicksState] = useState<string[]>([]);
  /* Mirrors `picks` synchronously. Two taps inside one tick both read the
     value from the last render otherwise, and the second silently discards
     the first — easy to hit when she is tapping quickly on a phone. */
  const picksRef = useRef<string[]>([]);
  const [resumeAt, setResumeAt] = useState<SceneId | null>(null);

  const scenes = useRef(new Map<SceneId, HTMLElement>());

  /* ---------------------------------------------------- restore last walk */
  useEffect(() => {
    const s = readStore();
    if (s.roman) setRoman(true);
    if (s.picks?.length) {
      picksRef.current = s.picks;
      setPicksState(s.picks);
    }
    if (s.furthest) {
      const i = chapters.findIndex((c) => c.id === s.furthest);
      // Only offer a resume if she actually got somewhere worth returning to.
      if (i > 4) setResumeAt(s.furthest);
    }
  }, []);

  /* ------------------------------------------- single rAF scroll → t loop */
  useEffect(() => {
    let frame = 0;
    let queued = false;

    const measure = () => {
      queued = false;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const next = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      t.set(next);
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [t]);

  /* ------------------------------------------------------ scroll locking */
  useEffect(() => {
    document.documentElement.classList.toggle('at-door', !entered);
  }, [entered]);

  const enter = useCallback(() => {
    setEntered(true);
    // Let the bloom play before the page becomes scrollable.
    window.setTimeout(() => {
      const el = scenes.current.get('square');
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 520);
  }, []);

  const lightLamp = useCallback((id: SceneId) => {
    setLitLamps((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const arrive = useCallback((id: SceneId) => {
    setCurrent(id);
    writeStore({ furthest: id });
  }, []);

  const registerScene = useCallback((id: SceneId, el: HTMLElement | null) => {
    if (el) scenes.current.set(id, el);
    else scenes.current.delete(id);
  }, []);

  const goTo = useCallback((id: SceneId) => {
    const el = scenes.current.get(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const toggleSound = useCallback(() => setSound((s) => !s), []);

  const toggleRoman = useCallback(() => {
    setRoman((r) => {
      writeStore({ roman: !r });
      return !r;
    });
  }, []);

  const setPicks = useCallback(
    (next: string[] | ((prev: string[]) => string[])) => {
      const resolved = typeof next === 'function' ? next(picksRef.current) : next;
      picksRef.current = resolved;
      setPicksState(resolved);
      writeStore({ picks: resolved });
    },
    [],
  );

  const dismissResume = useCallback(() => setResumeAt(null), []);

  const isLit = useCallback((id: SceneId) => litLamps.includes(id), [litLamps]);

  return useMemo(
    () => ({
      t,
      entered,
      enter,
      current,
      arrive,
      litLamps,
      lightLamp,
      isLit,
      lampCount: litLamps.length,
      totalLamps: LAMP_CHAPTERS.length,
      reduced,
      sound,
      toggleSound,
      roman,
      toggleRoman,
      picks,
      setPicks,
      goTo,
      registerScene,
      resumeAt,
      dismissResume,
    }),
    [
      t,
      entered,
      enter,
      current,
      arrive,
      litLamps,
      lightLamp,
      isLit,
      reduced,
      sound,
      toggleSound,
      roman,
      toggleRoman,
      picks,
      setPicks,
      goTo,
      registerScene,
      resumeAt,
      dismissResume,
    ],
  );
}
