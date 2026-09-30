'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { chapters, ui } from '@/data/love';
import { useJourney } from '@/lib/useJourney';
import { ease } from '@/lib/motion';

/**
 * Offered once, quietly. Never forces a restart and never forces a resume —
 * momentum through the walk stays hers.
 */
export default function ResumeNote() {
  const { resumeAt, dismissResume, goTo, entered, enter } = useJourney();
  if (!resumeAt || !entered) return null;

  const label = chapters.find((c) => c.id === resumeAt)?.label ?? '';

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-5 left-1/2 z-40 flex -translate-x-1/2 flex-col items-center gap-3 rounded-edge border border-amber-400/20 bg-ink-900/80 px-5 py-4 backdrop-blur-[2px]"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.7, ease: ease.enter, delay: 1.4 }}
      >
        <p className="u-hand text-base text-cream-100/80">{ui.resume(label)}</p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              goTo(resumeAt);
              dismissResume();
            }}
            className="u-caps rounded-edge border border-amber-400/35 px-3 py-2 text-[0.55rem] text-cream-100/85 transition-colors hover:border-amber-300/70"
          >
            {ui.resumeYes}
          </button>
          <button
            type="button"
            onClick={() => {
              dismissResume();
              enter();
            }}
            className="u-caps rounded-edge px-3 py-2 text-[0.55rem] text-cream-200/40 transition-colors hover:text-cream-100/80"
          >
            {ui.resumeNo}
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
