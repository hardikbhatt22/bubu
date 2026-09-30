'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Scene from '@/components/primitives/Scene';
import HoldButton from '@/components/primitives/HoldButton';
import Lamp from '@/components/primitives/Lamp';
import { names, ui } from '@/data/love';
import { useJourney } from '@/lib/useJourney';
import { ease } from '@/lib/motion';

/**
 * THE DOOR.
 *
 * Near-black. Fog. One lamp, far away. A plaque with her name and nothing else
 * — no subtitle, no "scroll down". She should understand in one second that
 * this was made for her and for nobody else.
 *
 * The door does not open on a click. It opens on a hold.
 */
export default function S01Door() {
  const { entered, enter, reduced } = useJourney();
  const [blooming, setBlooming] = useState(false);

  const open = () => {
    setBlooming(true);
    window.setTimeout(() => enter(), reduced ? 120 : 420);
  };

  return (
    <Scene id="door" label="The door" className="flex items-center justify-center px-6 py-6">
      {/* The page is held still until the door opens, so nothing here may fall
          below the fold — on a phone held sideways there is no way to scroll
          down to a hold button she cannot reach. Every gap and every size is
          therefore measured against the viewport's HEIGHT, and the whole plaque
          shrinks with it rather than overflowing it. */}
      <div className="relative flex w-full max-w-md flex-col items-center gap-[clamp(1rem,5svh,3.5rem)] text-center">
        {/* the one lamp already burning, far off.
            It is the first thing to go when there is no room: the plaque is
            what has to survive, not the scenery around it. */}
        <motion.div
          className="[@media(max-height:460px)]:hidden"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2.2, ease: ease.enter, delay: 0.3 }}
        >
          <Lamp lit size={22} reduced={reduced} />
        </motion.div>

        {/* the plaque */}
        <div className="flex flex-col items-center gap-[clamp(0.5rem,2svh,1.25rem)]">
          <motion.p
            className="u-caps text-cream-200/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.6, ease: ease.enter, delay: 0.9 }}
          >
            for
          </motion.p>

          <motion.h1
            /* Fluid on both axes. The width term is the design; the height term
               is what keeps a 70px name out of a 360px-tall screen. */
            className="u-display-tight text-cream-100 text-[clamp(2.5rem,min(11vw,13svh),7rem)] leading-[0.98]"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20, filter: 'blur(12px)' }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 2.1, ease: ease.enter, delay: 1.1 }}
          >
            {names.her}
          </motion.h1>

          <motion.p
            className="u-hand text-amber-300/75 text-[clamp(1.05rem,min(5vw,4.2svh),1.6rem)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: ease.enter, delay: 2.1 }}
          >
            {names.herNickname} ❤️
          </motion.p>
        </div>

        {/* the effort */}
        <AnimatePresence>
          {!entered ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.35 } }}
              transition={{ duration: 1.4, ease: ease.enter, delay: 2.9 }}
              className="flex flex-col items-center gap-[clamp(0.75rem,3svh,2rem)]"
            >
              <HoldButton onComplete={open} />
              <button
                type="button"
                onClick={open}
                className="u-caps u-quiet rounded-edge px-3 text-[0.58rem] text-cream-200/25 transition-colors hover:text-cream-200/60"
              >
                {ui.skip}
              </button>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      {/* the held light blooms past the viewport and the fog parts */}
      <AnimatePresence>
        {blooming ? (
          <motion.div
            aria-hidden
            className="pointer-events-none fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0.4 : 1.7, ease: ease.enter, times: [0, 0.35, 1] }}
            onAnimationComplete={() => setBlooming(false)}
            style={{
              background:
                'radial-gradient(circle at 50% 52%, rgba(255,243,220,0.95) 0%, rgba(246,201,122,0.5) 22%, rgba(233,166,60,0.12) 46%, transparent 70%)',
            }}
          />
        ) : null}
      </AnimatePresence>
    </Scene>
  );
}
