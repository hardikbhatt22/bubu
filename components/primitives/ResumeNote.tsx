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
      {/* Two elements, on purpose. The inner card animates `y`, and the inline
          transform Framer writes for that would replace a `-translate-x-1/2`
          used for centring — so the outer wrapper owns the position and the
          card owns the motion. */}
      <div className="pointer-events-none fixed inset-x-0 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-40 flex justify-center px-4">
        <motion.div
          className="pointer-events-auto flex w-full max-w-sm flex-col items-center gap-3 rounded-edge border border-amber-400/20 bg-ink-900/80 px-5 py-4 text-center backdrop-blur-[2px]"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.7, ease: ease.enter, delay: 1.4 }}
        >
          <p className="u-hand text-balance text-base text-cream-100/80">{ui.resume(label)}</p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => {
                goTo(resumeAt);
                dismissResume();
              }}
              className="u-caps u-quiet rounded-edge border border-amber-400/35 px-3 text-[0.55rem] text-cream-100/85 transition-colors hover:border-amber-300/70"
            >
              {ui.resumeYes}
            </button>
            <button
              type="button"
              onClick={() => {
                dismissResume();
                enter();
              }}
              className="u-caps u-quiet rounded-edge px-3 text-[0.55rem] text-cream-200/40 transition-colors hover:text-cream-100/80"
            >
              {ui.resumeNo}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
