# Promise Plaza

A private, single-page site for Saloni — one continuous walk through a night
square where the lamps come on as she goes.

It is not a slideshow and not a landing page. There is one route, one
atmosphere, and fifteen places in it.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Add the photographs

Drop five images into `public/images/` named `photo-1.jpg` … `photo-5.jpg`.
See `public/images/README.md` for what each one is and where it appears.

Until a file exists, that frame shows an intentional lamplight placeholder with
the photo's caption — nothing breaks and nothing looks unfinished.

## Change the words

**Every user-visible string lives in `data/`.** You should never need to open a
component to fix a word.

| File | What is in it |
| --- | --- |
| `data/love.ts` | Names, chapters, scene beats, the stalls, the promises, the ticket, the finale |
| `data/letter.ts` | The letter, as paragraphs |
| `data/poetry.ts` | The Hindi couplets (Devanagari + romanisation), one per scene |

`data/love.ts` carries a **facts ledger rule**: nothing in it may invent an
event, a date, an anniversary, a place or a conversation. Poetry around the
truth is fine; new facts are not.

## How it is built

- **Next.js 15 / React 19 / TypeScript**, one route, no router — page
  navigation would break both the single-walk illusion and the shared
  atmosphere state.
- **`lib/useJourney.ts`** is the only state: scroll progress as a single
  MotionValue `t`, which scene she is in, which lamps are lit, her ticket, and
  her place in the walk (persisted to `localStorage`).
- **`components/atmosphere/Atmosphere.tsx`** reads `t` and drives sky, stars,
  fog, rain and lamplight straight to style — no React re-render on scroll.
- **`lib/motion.ts`** holds the atmosphere keyframes and the shared easing, so
  dusk → night → rain → sunrise is described in one place.

### Scenes

`components/scenes/S01…S15` run in order: the door, the square, you, an
ordinary day, the wrapper, tech majari, the train door, the stalls, no
destination, the quiet days, two minutes, five lamps, our next three, the
letter, sunrise.

Two of them are scroll-pinned cinematic sequences (`S07Junagadh`, `S15Lit`).
The rest are ordinary sections.

### Things worth knowing before you edit

- **The door opens on a hold, not a click.** That is the thesis of the site
  stated as an interaction. Completion is driven by a timer as well as by
  animation frames, so it still opens if the browser stops painting.
- **Arrival is confirmed against real geometry**, not just an
  IntersectionObserver callback, so lamps never light ahead of her.
- **The rain happens once**, in the quiet days, and stops at "two minutes".
  It is the only weather in the site.
- **The train never returns** after its chapter — not as a transition, not as
  a texture, not in the finale.
- **The five photographs are only ever together once**, in the last frame.
- **Nothing asks her for anything.** There is no reply box, no "forgive me",
  no apology verb in the two-minutes scene. The understanding is the apology.

### Reduced motion

`prefers-reduced-motion` gets a designed static variant, not a disabled site:
cross-fades replace travel, weather becomes texture, and the emotional arc
survives intact.

### Sound

Off by default and never autoplayed. The room tone is synthesised with the Web
Audio API — no audio file, no megabytes. Every beat lands with sound off.
# bubu
