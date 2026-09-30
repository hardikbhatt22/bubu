'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ease, inViewSoft } from '@/lib/motion';
import type { Photo } from '@/data/love';
import { photoFile } from '@/data/photos.generated';
import { useJourney } from '@/lib/useJourney';

/**
 * The photographs. Pinned up, not put in rounded cards — a hairline rule, a
 * generous mat, and a warm edge-light so lamplight falls ON them and they
 * belong to the square instead of being pasted onto it.
 *
 * Three things do the real work here:
 *
 *  1. MAT SHAPES ARE PORTRAIT ONLY. These pictures are phone-tall (about
 *     9:19.5). A square mat would show 46% of the frame and a landscape one
 *     just 35% — heads and feet gone. Every mat here is taller than it is
 *     wide, and `natural` crops nothing at all.
 *  2. FOCAL POINT PER PHOTOGRAPH. What survives the crop is chosen in
 *     `data/love.ts`, not left to a centre crop that cuts faces.
 *  3. BLUR-UP. The frame fills with the picture's own colour immediately and
 *     resolves into it, so a frame is never an empty rectangle. The real
 *     dimensions come from the generated manifest, so the space is reserved
 *     exactly and nothing shifts as it loads.
 */

interface Props {
  photo: Photo;
  /** Mat shape. Portrait-only by design; `natural` keeps the whole frame. */
  ratio?: 'natural' | 'tall' | 'portrait' | 'square';
  className?: string;
  priority?: boolean;
  delay?: number;
  /** Which side the nearest lamp is on, so the edge-light is physically honest. */
  light?: 'left' | 'right' | 'top';
  showNote?: boolean;
  sizes?: string;
  /** A slow drift as she scrolls past. Off inside pinned scenes. */
  parallax?: boolean;
  /**
   * Fetch as soon as the frame is mounted rather than when it scrolls into
   * view. For a photograph that is parked off-screen behind an interaction —
   * lazy loading never fires for those, so the picture would only START
   * downloading at the moment she looks, and the reveal would arrive late.
   */
  eager?: boolean;
}

const RATIO: Record<string, number> = {
  tall: 2 / 3,
  portrait: 3 / 4,
  square: 1,
};

const EDGE: Record<string, string> = {
  left: 'linear-gradient(90deg, rgba(246,201,122,0.32), transparent 45%)',
  right: 'linear-gradient(270deg, rgba(246,201,122,0.32), transparent 45%)',
  top: 'linear-gradient(180deg, rgba(246,201,122,0.3), transparent 48%)',
};

export default function PhotoFrame({
  photo,
  ratio = 'tall',
  className = '',
  priority = false,
  delay = 0,
  light = 'left',
  showNote = true,
  sizes = '(max-width: 768px) 72vw, 32vw',
  parallax = false,
  eager = false,
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const { reduced } = useJourney();
  const ref = useRef<HTMLElement>(null);

  const file = photoFile(photo.id);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const drift = useTransform(scrollYProgress, [0, 1], ['-3.5%', '3.5%']);

  /* `natural` keeps the photo's own proportion, so nothing is cropped at all. */
  const aspect =
    ratio === 'natural' && file
      ? file.width / file.height
      : (RATIO[ratio] ?? RATIO.tall);

  const missing = !file || failed;

  return (
    <motion.figure
      ref={ref}
      className={`relative ${className}`}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 26, scale: 0.985 }}
      whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      viewport={inViewSoft}
      transition={{ duration: reduced ? 0.35 : 1.05, ease: ease.enter, delay }}
    >
      <div className="u-frame group relative">
        <div
          className="relative overflow-hidden"
          style={{ aspectRatio: String(aspect), borderRadius: 2 }}
        >
          {missing ? (
            /* Intentional lamplight placeholder — never a broken image, never a
               grey box, and never substitute stock photography. */
            <div
              className="absolute inset-0 flex items-end justify-center overflow-hidden"
              style={{
                background:
                  'radial-gradient(90% 70% at 50% 8%, rgba(233,166,60,0.26), transparent 62%), linear-gradient(180deg, #161A33, #0D1020 70%, #07080F)',
              }}
            >
              <span
                aria-hidden
                className="absolute left-1/2 top-0 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  background:
                    'radial-gradient(circle, rgba(246,201,122,0.5), transparent 68%)',
                }}
              />
              <figcaption className="u-hand relative w-full px-4 pb-5 text-center text-sm leading-snug text-cream-200/60">
                {photo.alt}
              </figcaption>
            </div>
          ) : (
            <>
              {/* The photo's own colour, holding the space while it loads.
                  Deliberately a CSS transition rather than an animated value:
                  the target state is declarative, so if the frame loop is ever
                  stalled the browser still settles on the right result instead
                  of stranding the picture behind a permanent blur. */}
              <div
                aria-hidden
                className="absolute inset-0 scale-110"
                style={{
                  backgroundImage: `url(${file.blurDataURL})`,
                  backgroundSize: 'cover',
                  backgroundPosition: photo.focal ?? '50% 50%',
                  filter: 'blur(14px)',
                  opacity: loaded ? 0 : 1,
                  transition: `opacity ${reduced ? 200 : 800}ms cubic-bezier(0.16, 1, 0.3, 1)`,
                }}
              />

              <motion.div
                className="absolute inset-0"
                style={parallax && !reduced ? { y: drift, scale: 1.08 } : undefined}
              >
                <Image
                  src={file.src}
                  alt={photo.alt}
                  fill
                  sizes={sizes}
                  quality={82}
                  priority={priority}
                  loading={priority ? undefined : eager ? 'eager' : 'lazy'}
                  fetchPriority={eager && !priority ? 'low' : undefined}
                  onLoad={() => setLoaded(true)}
                  onError={() => setFailed(true)}
                  className="u-photo object-cover transition-[filter,transform] duration-700 ease-out group-hover:brightness-[1.06]"
                  style={{ objectPosition: photo.focal ?? '50% 50%' }}
                />
              </motion.div>
            </>
          )}

          {/* the lamp falling on the photo */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 mix-blend-soft-light"
            style={{ background: EDGE[light] }}
          />
          {/* a hairline of light on the inside of the mat, so it reads as glass */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ boxShadow: 'inset 0 1px 0 rgba(246,201,122,0.16)' }}
          />
          {/* grain matched to the global overlay so it belongs to the site */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />
          {/* the night creeping back in at the very bottom edge */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4"
            style={{
              background: 'linear-gradient(0deg, rgba(7,8,15,0.42), transparent)',
            }}
          />
        </div>
      </div>

      {showNote && photo.note ? (
        <figcaption className="u-hand mt-3 text-center text-base text-amber-300/55">
          {photo.note}
        </figcaption>
      ) : null}
    </motion.figure>
  );
}
