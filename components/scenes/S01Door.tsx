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
    <Scene id="door" label="The door" className="flex items-center justify-center px-6">
      <div className="relative flex w-full max-w-md flex-col items-center gap-10 text-center sm:gap-14 [@media(max-height:720px)]:gap-6">
        {/* the one lamp already burning, far off */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2.2, ease: ease.enter, delay: 0.3 }}
        >
          <Lamp lit size={22} reduced={reduced} />
        </motion.div>

        {/* the plaque */}
        <div className="flex flex-col items-center gap-4 sm:gap-5">
          <motion.p
            className="u-caps text-cream-200/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.6, ease: ease.enter, delay: 0.9 }}
          >
            for
          </motion.p>

          <motion.h1
            className="u-display-tight text-4xl text-cream-100 sm:text-5xl"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20, filter: 'blur(12px)' }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 2.1, ease: ease.enter, delay: 1.1 }}
          >
            {names.her}
          </motion.h1>

          <motion.p
            className="u-hand text-xl text-amber-300/75"
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
              className="flex flex-col items-center gap-6 sm:gap-8"
            >
              <HoldButton onComplete={open} />
              <button
                type="button"
                onClick={open}
                className="u-caps rounded-edge px-3 py-2 text-[0.58rem] text-cream-200/25 transition-colors hover:text-cream-200/60"
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
