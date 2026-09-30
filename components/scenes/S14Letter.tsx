'use client';

import { motion } from 'framer-motion';
import Scene from '@/components/primitives/Scene';
import { letter } from '@/data/letter';
import { letterCopy } from '@/data/love';
import { useJourney } from '@/lib/useJourney';
import { ease } from '@/lib/motion';

/**
 * THE LETTER.
 *
 * The plainest human moment in the site, so nothing competes with it: the
 * square goes quiet and the frame becomes paper.
 *
 * No typewriter effect — it makes a reader wait on a machine instead of on a
 * person. Reveal is by paragraph, at reading pace, triggered as she reaches
 * each one. The handwriting face appears only on the signature, because
 * handwriting is unreadable at length.
 *
 * The reserved name is used here, once. The only other use is the finale.
 */
export default function S14Letter() {
  const { reduced } = useJourney();

  return (
    <Scene id="letter" label="The letter" className="flex items-center px-5 py-[14svh] sm:px-6">
      <motion.article
        className="relative mx-auto w-full max-w-2xl"
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 28 }}
        whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: reduced ? 0.4 : 1.4, ease: ease.enter }}
      >
        {/* the paper */}
        <div
          className="relative overflow-hidden px-6 py-12 sm:px-14 sm:py-16"
          style={{
            background: 'linear-gradient(172deg, #F5EDE0 0%, #EFE5D4 58%, #E7DCC8 100%)',
            borderRadius: 2,
            boxShadow: '0 30px 90px -40px rgba(233,166,60,0.35)',
          }}
        >
          {/* paper tooth, matched to the site's grain */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.055] mix-blend-multiply"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.86' numOctaves='3'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />
          {/* the margin rule, like a real sheet */}
          <span
            aria-hidden
            className="absolute inset-y-8 left-4 hidden w-px sm:block"
            style={{ background: 'rgba(185,79,99,0.22)' }}
          />

          <div className="relative flex flex-col gap-7">
            <p className="u-caps text-[0.55rem] text-ink-900/40">{letterCopy.eyebrow}</p>

            <p className="u-display text-xl text-ink-900 sm:text-2xl">{letter.salutation}</p>

            {letter.paragraphs.map((para, i) => (
              <motion.p
                key={i}
                className="max-w-letter text-base leading-[1.85] text-ink-900/80"
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
                whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.55 }}
                transition={{ duration: reduced ? 0.3 : 0.85, ease: ease.enter }}
              >
                {para}
              </motion.p>
            ))}

            <motion.p
              className="u-display-tight pt-2 text-2xl text-cocoa-600 sm:text-3xl"
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
              whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: reduced ? 0.3 : 1.5, ease: ease.enter, delay: 0.3 }}
            >
              {letter.lastLine}
            </motion.p>

            <motion.p
              className="u-hand text-2xl text-ink-900/70"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: reduced ? 0.3 : 1.1, ease: ease.enter, delay: 0.8 }}
            >
              {letter.signature}
            </motion.p>
          </div>
        </div>
      </motion.article>
    </Scene>
  );
}
