'use client';

import { motion } from 'framer-motion';
import { ease } from '@/lib/motion';

/**
 * The lamp. The progress metaphor, the navigation, and the finale, all in one
 * object. Every chapter ends by lighting one; lit lamps persist in the rail.
 */

interface Props {
  lit: boolean;
  /** Visual size in px for the glyph box. */
  size?: number;
  /** Delay for sequenced relighting in the finale. */
  delay?: number;
  reduced?: boolean;
  className?: string;
  /** A standing lamp with a post, or just the head (used in the rail). */
  post?: boolean;
}

export default function Lamp({
  lit,
  size = 28,
  delay = 0,
  reduced = false,
  className = '',
  post = true,
}: Props) {
  const h = post ? size * 2.6 : size;

  return (
    <span
      className={`relative inline-block ${className}`}
      style={{ width: size, height: h }}
    >
      {/* the bloom — the light itself, not a shadow */}
      <motion.span
        aria-hidden
        className="absolute left-1/2 top-0 -translate-x-1/2 rounded-full"
        style={{
          width: size * 3.4,
          height: size * 3.4,
          marginTop: -size * 1.2,
          background:
            'radial-gradient(circle, rgba(246,201,122,0.55) 0%, rgba(233,166,60,0.22) 34%, transparent 68%)',
        }}
        initial={false}
        animate={{ opacity: lit ? 1 : 0, scale: lit ? 1 : 0.6 }}
        transition={{ duration: reduced ? 0.2 : 1.1, ease: ease.enter, delay }}
      />

      <svg
        viewBox={post ? '0 0 24 62' : '0 0 24 24'}
        width={size}
        height={h}
        className="relative"
        aria-hidden
      >
        {/* the head */}
        <motion.path
          d="M12 3 L18.5 13.5 H5.5 Z"
          fill={lit ? 'rgba(246,201,122,0.92)' : 'rgba(92,100,128,0.22)'}
          stroke={lit ? 'rgba(246,201,122,1)' : 'rgba(233,166,60,0.3)'}
          strokeWidth="0.9"
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: ease.enter, delay }}
        />
        {/* the filament */}
        <motion.circle
          cx="12"
          cy="10.6"
          r="1.9"
          fill="#FFF3DC"
          initial={false}
          animate={{ opacity: lit ? 1 : 0 }}
          transition={{ duration: reduced ? 0.15 : 0.7, ease: ease.enter, delay }}
          style={
            lit && !reduced
              ? { animation: `plaza-breathe 5.5s ease-in-out ${delay}s infinite` }
              : undefined
          }
          data-motion="ambient"
        />
        {post ? (
          <>
            <line
              x1="12"
              y1="13.5"
              x2="12"
              y2="56"
              stroke={lit ? 'rgba(233,166,60,0.42)' : 'rgba(92,100,128,0.22)'}
              strokeWidth="1.1"
            />
            <line
              x1="7"
              y1="58"
              x2="17"
              y2="58"
              stroke={lit ? 'rgba(233,166,60,0.5)' : 'rgba(92,100,128,0.24)'}
              strokeWidth="1.4"
            />
          </>
        ) : null}
      </svg>
    </span>
  );
}
