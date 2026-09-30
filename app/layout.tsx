import type { Metadata, Viewport } from 'next';
import { Fraunces, Instrument_Sans, Kalam, Tiro_Devanagari_Hindi } from 'next/font/google';
import './globals.css';

/**
 * Fraunces  — display serif, warm and editorial. Variable SOFT/WONK axes.
 * Instrument Sans — UI, labels, small caps.
 * Tiro Devanagari Hindi — all Hindi poetry. Never a Latin fallback.
 * Kalam — handwriting, chosen because it covers BOTH Latin and Devanagari,
 *         so hand-lettered moments stay cohesive across scripts.
 */

const display = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  axes: ['SOFT', 'WONK', 'opsz'],
});

const sans = Instrument_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const deva = Tiro_Devanagari_Hindi({
  subsets: ['devanagari', 'latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-deva',
});

const hand = Kalam({
  subsets: ['latin', 'devanagari'],
  weight: ['300', '400'],
  display: 'swap',
  variable: '--font-hand',
});

export const metadata: Metadata = {
  title: 'Promise Plaza — for Bubu',
  description: 'A small square that exists only for you.',
  // This is private. It should never be indexed or previewed by a crawler.
  robots: { index: false, follow: false, nocache: true },
};

export const viewport: Viewport = {
  themeColor: '#07080F',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${deva.variable} ${hand.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
