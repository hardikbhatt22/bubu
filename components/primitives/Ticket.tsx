'use client';

import { motion } from 'framer-motion';
import { dateTokens, ticketCopy, ticketPairs } from '@/data/love';
import { ease } from '@/lib/motion';

/**
 * The ticket. Screenshot-able by design: fixed aspect, high contrast, and it
 * still reads when cropped — because a screenshot is how this actually leaves
 * the site and reaches her camera roll.
 */

export function pairLine(picks: string[]): string | null {
  for (let i = 0; i < picks.length; i++) {
    for (let j = i + 1; j < picks.length; j++) {
      const key = [picks[i], picks[j]].sort().join('+');
      if (ticketPairs[key]) return ticketPairs[key];
    }
  }
  return null;
}

export default function Ticket({
  picks,
  compact = false,
  delay = 0,
}: {
  picks: string[];
  compact?: boolean;
  delay?: number;
}) {
  const chosen = picks
    .map((id) => dateTokens.find((t) => t.id === id))
    .filter((t): t is (typeof dateTokens)[number] => !!t);
  const pair = pairLine(picks);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, rotate: -1.2 }}
      animate={{ opacity: 1, y: 0, rotate: compact ? -2.5 : -0.6 }}
      transition={{ duration: 1, ease: ease.enter, delay }}
      className="relative w-full"
      style={{ maxWidth: compact ? 210 : 420 }}
    >
      <div
        className="relative overflow-hidden text-ink-900"
        style={{
          background: 'linear-gradient(168deg, #F5EDE0 0%, #E9DFCC 100%)',
          borderRadius: 2,
          padding: compact ? '0.9rem 1rem' : '1.6rem 1.7rem',
        }}
      >
        {/* perforation */}
        <span
          aria-hidden
          className="absolute inset-y-0 left-0 w-[7px]"
          style={{
            background:
              'radial-gradient(circle at 0 50%, transparent 0 3.2px, #E9DFCC 3.2px) 0 0 / 7px 11px repeat-y',
          }}
        />

        <div className={`flex flex-col ${compact ? 'gap-2' : 'gap-4'} pl-2`}>
          <div className="flex items-baseline justify-between gap-3">
            <span
              className="u-caps font-semibold text-ink-900/80"
              style={{ fontSize: compact ? '0.5rem' : '0.62rem' }}
            >
              {ticketCopy.stampTitle}
            </span>
            <span
              className="u-caps text-ink-900/45"
              style={{ fontSize: compact ? '0.44rem' : '0.55rem' }}
            >
              {ticketCopy.stampSub}
            </span>
          </div>

          <div className="h-px w-full" style={{ background: 'rgba(7,8,15,0.16)' }} />

          <ol className={`flex flex-col ${compact ? 'gap-1' : 'gap-3'}`}>
            {chosen.map((t, i) => (
              <li key={t.id} className="flex items-baseline gap-3">
                <span
                  className="u-caps shrink-0 text-ink-900/40"
                  style={{ fontSize: compact ? '0.44rem' : '0.55rem' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="flex flex-col">
                  <span
                    className="u-display leading-tight text-ink-900"
                    style={{ fontSize: compact ? '0.8rem' : '1.15rem' }}
                  >
                    {t.label}
                  </span>
                  {!compact ? (
                    <span className="u-hand text-sm leading-snug text-ink-900/55">
                      {t.ticketLine}
                    </span>
                  ) : null}
                </span>
              </li>
            ))}
          </ol>

          {pair && !compact ? (
            <p
              className="u-hand text-[0.95rem] leading-snug"
              style={{ color: 'rgba(59,30,99,0.85)' }}
            >
              {pair}
            </p>
          ) : null}

          <div className="h-px w-full" style={{ background: 'rgba(7,8,15,0.16)' }} />

          <div className="flex items-end justify-between gap-3">
            <span className="flex flex-col">
              <span
                className="u-caps text-ink-900/40"
                style={{ fontSize: compact ? '0.42rem' : '0.52rem' }}
              >
                {ticketCopy.holder}
              </span>
              <span
                className="u-hand text-cocoa-600"
                style={{ fontSize: compact ? '0.85rem' : '1.1rem' }}
              >
                {ticketCopy.holderName}
              </span>
            </span>

            {/* the seal */}
            <span
              className="grid place-items-center rounded-full"
              style={{
                width: compact ? 34 : 52,
                height: compact ? 34 : 52,
                border: '1px solid rgba(59,30,99,0.45)',
                color: 'rgba(59,30,99,0.8)',
                fontSize: compact ? '0.6rem' : '0.85rem',
                transform: 'rotate(-8deg)',
              }}
            >
              <span className="u-hand">{ticketCopy.seal}</span>
            </span>

            <span className="flex flex-col items-end">
              <span
                className="u-caps text-ink-900/40"
                style={{ fontSize: compact ? '0.42rem' : '0.52rem' }}
              >
                signed
              </span>
              <span
                className="u-hand text-ink-900/75"
                style={{ fontSize: compact ? '0.85rem' : '1.1rem' }}
              >
                {ticketCopy.signedBy}
              </span>
            </span>
          </div>

          {!compact ? (
            <p className="u-caps text-[0.5rem] text-ink-900/35">{ticketCopy.footer}</p>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}
