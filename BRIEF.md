# PROMISE PLAZA — BUILD BRIEF
### A private interactive experience for Saloni ("Bubu")

**Read this entire document before writing a single line of code.**

---

## 0 · HOW TO USE THIS DOCUMENT

You are acting as one person holding six roles at once: creative director, product designer, interaction designer, motion designer, senior frontend engineer, and copy/emotion editor. You have full authority over craft. You have **no** authority over the facts in §2 or the constraints in §3.

Rules of engagement:

1. **Do not ask clarifying questions.** Decide, and ship.
2. **Do not deliver a concept, a wireframe, a plan, or placeholder sections.** Deliver a running application. `npm run build` must pass with zero errors and zero type errors before you report done.
3. **Do not stop at "first version."** §12 is a mandatory scoring pass. Any scene scoring below 8/10 gets redesigned, not patched.
4. Where this brief gives a concrete choice (a font, a hex value, a scene order), treat it as a strong default. You may override it — but write one line in `DECISIONS.md` saying what you changed and why it is better. Silent drift into generic patterns is the one unforgivable failure.

---

## 1 · THE ONE-LINE IDEA

> **Promise Plaza is a small night square that exists only for Bubu — and walking through it turns the lights on, one memory at a time.**

That is the whole product. Everything below serves it.

### Why a plaza (this is the spine — honour it)

A plaza is a *place*, not a page. It has stalls, lamps, a bench, a road at its edge. Bubu's favourite things are **street things** — pani puri, ice cream, chocolate. So the square is built out of what she loves: a pani puri stall, an ice cream cart, a purple chocolate kiosk, a bench, a car idling at the kerb, hills on the far horizon, a train line running past the edge of frame.

This buys you four unifications. Use all four:

| Problem | The plaza solves it by |
|---|---|
| "Must feel like ONE story, not sections" | It is one continuous location. Scenes are **places in the square**, not pages. |
| "Background must evolve with emotion" | **Time of day** is the emotional arc. One scalar drives the whole atmosphere. |
| "Navigation must not be a navbar" | You are **walking**. Chapter markers are the lamps you have already lit. |
| "The final reveal must feel earned" | The square starts nearly dark. Each memory lights one lamp. The finale is the plaza **fully lit** — visibly her doing. |

### The time-of-day arc (non-negotiable emotional engine)

One global progress value `t` (0→1) drives sky, light temperature, fog density, star opacity, lamp bloom, grain, and the audio bed. Nothing in the atmosphere may be static across the journey.

```
t=0.00   DUSK, almost dark        curiosity       cold indigo, one lamp lit
t=0.15   EVENING, lamps waking    warmth          amber begins to spread
t=0.35   NIGHT, warm              smiles          full lamplight, richest colour
t=0.55   DEEP NIGHT               romance         fewer lamps, closer framing
t=0.70   NIGHT + LIGHT RAIN       the hurt        desaturated, cold, quiet, wide
t=0.80   RAIN STOPS               realization     still, clear, honest
t=0.88   FIRST LIGHT              promises        horizon warms
t=1.00   SUNRISE                  I love you      every lamp lit + daybreak
```

Rain is the only weather event. It arrives once, for the misunderstanding, and it stops the moment he stops making excuses. Do not use rain anywhere else.

### The two motifs that must recur

1. **The lamp.** Every chapter ends by lighting one. Lit lamps persist in the chapter rail. It is the progress metaphor, the navigation, and the finale, all in one object.
2. **Two minutes.** His own realization was: *"I could have taken two minutes to message her."* Two minutes becomes the spine of the confession and the promise. It is the most specific, least generic thing in this story — build the emotional climax of the promises on it, not on flowery language.

The single most important sentence in the experience:

> **"I can't promise I'll never be busy.**
> **I promise I'll never be too busy for two minutes."**

Give that line its own moment, its own silence, and its own lamp.

---

## 2 · FACTS LEDGER — CANONICAL TRUTH

**You may write poetry *around* these. You may not add to them, embellish them into new events, or contradict them. If a detail is not on this list, it did not happen and must not appear.**

**People & names**
- Her name: **Saloni**. Her nickname: **Bubu**. Her name for him: **Dudu**.
- His special name for her: **Maru Jiv** (Gujarati, "my life"). Reserve it.
- She likes being called **baby**.
- They have known each other **approximately 3 years**. There is **no start date, no anniversary, no day counter.** Do not invent one. Do not build a "together for X days" ticker.

**She likes**
- Pani puri · Dairy Milk · chocolate brownie · ice cream
- *His effort for her* — this is the emotional thesis of the entire site
- Teasing / irritating him (she enjoys it; let the site enjoy it too)
- Being called "baby"

**How they met**
- At a college event. He was rushing somewhere; she was heading to a lecture. They spoke face to face for a little while. **It was ordinary.** Its beauty is that it was ordinary — do not inflate it into destiny, fate, or love at first sight.

**The Dairy Milk**
- She sent him a reel joking that whoever came first would get Dairy Milk.
- He actually went and gave her a Dairy Milk. That moment helped them get closer.
- Meaning: *something very small became something meaningful.*

**Tech Majari**
- A college event. Because of her, he stayed on as a volunteer, which gave them more time together, and they grew closer.
- Meaning: *relationships grow through tiny decisions and extra hours.*

**Junagadh**
- She had a college event in Junagadh. He travelled from Ahmedabad to meet her.
- The plan nearly collapsed several times. At one point **she told him not to come.**
- He could not get a train ticket. He went by local train, **standing at the door** for the journey.
- He reached Junagadh, stayed, spent time with her. They went to the hills and climbed together. Later they had ice cream.
- Meaning: **not** "I travelled far." It is *"I was willing to make the effort because seeing you mattered to me."*
- **Hard constraint:** Ahmedabad→Junagadh is ONE chapter. It is not the theme, not the hero image, not the site's identity. No route map, no journey tracker, no recurring train device.

**Long drives**
- She really likes being in the car with him. They have gone many times.
- Meaning: *being together needs no destination.*

**What happened recently** (handle per §3)
- He went to his hometown, **Bhavnagar**.
- Between family/household work and a busy schedule he **forgot to message her properly** — no "where are you", "did you eat", "how are you".
- They had planned to meet **Saturday**. She was expecting it. A family reason meant he couldn't come. She was more upset.
- His realization: *the problem was not that I was busy. I had two minutes. I should not let being busy make an important person feel forgotten.*
- She does not talk to him quite the way she used to right now. That is the present tense of this site. **Do not resolve it on her behalf.**

**The five promises**
1. Daily call and chat.
2. Make time for pani puri / ice cream dates.
3. Give her more time.
4. Even on busy days, a small check-in.
5. Don't let what matters get lost to work or a packed schedule.

**Places that may be named:** Ahmedabad, Junagadh, Bhavnagar — sparingly, only in their own chapters.

**Never invent:** dates, anniversaries, other cities, shared songs, dialogue either person said, gifts beyond the Dairy Milk, friends or family members, festivals, other trips, a first "I love you", or the future.

---

## 3 · THE EMOTIONAL CONTRACT (hardest constraint in this document)

This site is an act of care, not a negotiation. It must never transact.

**It says:** I remember. I understand. I was wrong about something specific. I know what I want to change. Here is the effort, not the excuse.

**It never says:** you owe me, you must forgive me, I can't live without you, if you love me then…, look how much I suffered, everyone makes mistakes, you're overreacting, but I was *so* busy.

### Banned mechanics (each one is manipulation wearing design clothes)

- No "forgive me / not yet" buttons, no yes/no gate, no dialog she has to answer.
- No countdown, no "she hasn't replied in X days", no read-receipt imagery.
- No locked content that requires an emotional action to unlock.
- No sad-boy self-pity beat. His hardship (the train door) belongs to the *effort* chapter, where it is a gift — not to the apology chapter, where it would be a bill.
- Nothing may be phrased as her responsibility, including her happiness, her reply, or her decision.
- The site must be complete and satisfying **even if she never responds**. If any scene stops making sense without a reply from her, that scene is broken.

### Banned phrases (literal blocklist — grep for these before shipping)

`forgive me` · `I'm sorry if` · `you have to` · `you owe` · `I can't live without` ·
`give me one more chance` · `I promise I'll never` (in the apology sense) ·
`my queen` · `my everything` · `forever and always` · `soulmate` · `destiny` ·
`meant to be` · `you complete me` · `better half` · `my world` · `angel` ·
`fate brought us` · `love at first sight` · `no one else understands me` ·
`I'd die for you` · `you're my only reason`

### Tone reference for all prose

Short sentences. Ordinary words. One idea per line. No stacked metaphors. No exclamation marks except where she is being teased. It should read like a person speaking quietly to someone he knows extremely well — the way a 23-year-old actually texts, cleaned up, not the way greeting cards talk.

Gut check for every line: *would he be embarrassed to say this out loud to her face?* If yes, cut it. If it could be sent to anyone, cut it.

### Name usage discipline

- **Bubu** — the default, warm, everywhere. Fine to use often.
- **baby** — playful and light moments only.
- **Dudu** — only when he refers to himself, and only where she'd be the one saying it. Self-deprecating, cute, used 2–3 times maximum in the whole site.
- **Maru Jiv / મારું જીવ** — **at most twice in the entire experience.** Once in the letter's last line, once in the finale. Every additional use cheapens it.
- **Saloni** — used for the very first title card and for the letter's salutation only. Her full name is the formal register; it makes the opening feel addressed, not decorated.

---

## 4 · SCENE-BY-SCENE SCRIPT

Fourteen scenes, one continuous route, one walk through the square. Every scene has a **purpose**, a **mechanic**, an **exit**, and a **word budget**. The word budget is a hard ceiling; going over means you are dumping paragraphs, which is the single most common way this kind of site dies.

**Universal copy rules:** no revealed line exceeds **14 words**. No scene shows more than **3 lines at once**. Text reveals in beats, and the previous beat must finish before the next begins. Text never jumps position between beats — reserve the space.

---

### S1 — THE DOOR · `t=0.00`
**Purpose:** she instantly knows this was made for her, and nothing else.
**Look:** near-black indigo. Fog. One lamp, far away. A tiny hand-drawn plaque.
**Copy:** `For Saloni` / `Bubu ❤️` — and nothing else. No subtitle, no "scroll down".
**Mechanic — PRESS AND HOLD TO ENTER.** Not a click. She holds for ~1.6s while a warm ring fills and the lamp behind her brightens with her hold. Release early and it gently retreats. This is the thesis stated as an interaction: *effort opens things.*
**Mobile:** touch-hold, same timing, haptic-style scale feedback.
**A11y:** Space/Enter held works identically; a visible skip-link enters directly.
**Exit:** the held light blooms past the viewport, fog parts, the square appears. One lamp lit.

### S2 — THE SQUARE (ORIENTATION) · `t=0.08`
**Purpose:** "our story has little chapters" — understood without a word of UI copy.
**Mechanic:** a slow single camera pan across the square. Unlit lamps stand at intervals; each is a chapter. No labels yet. Then it settles and the walk begins.
**Word budget:** 12 words total.
**This scene establishes the chapter rail** (see §7) — it should feel like the lamps *became* the rail, not like a menu appeared.

### S3 — BUBU · `t=0.15`
**Purpose:** the site is about *her* before it is about *us*.
**Mechanic:** a typographic portrait, not a photo and not a bio. Her name set large in the display serif; around it, in small caps, the true things — `pani puri` `dairy milk` `brownie` `ice cream` `teases me on purpose` `notices effort` — arriving one at a time, each slightly off-grid, like someone remembering out loud. One of them (`teases me on purpose`) should nudge away when the cursor gets near it. That is the whole joke and it should be the only joke here.
**Photo 1** enters at the end, small, warm, slightly overexposed by the lamplight.
**Word budget:** 25.

### S4 — AN ORDINARY TUESDAY · `t=0.22`
**Purpose:** how they met, told without inflation.
**Mechanic:** two thin light-trails cross the square once — he going one way in a hurry, she going another. They pause. They overlap for a moment. They continue. Restrained: two lines, two paths, one intersection.
**Copy beats:** `I was late for something.` → `You were on your way to a lecture.` → `We talked for a few minutes.` → `That was all it was.` → then, after a real pause: `That was enough.`
**Do not** animate hearts, sparkles, or a slow-motion gaze. The restraint *is* the emotion.
**Word budget:** 30.

### S5 — THE WRAPPER · `t=0.30`
**Purpose:** the Dairy Milk. The first genuine smile.
**Mechanic:** a phone-shaped frame shows the joke arriving (a reel, implied — a shape and a caption, never a fake Instagram UI). Then: a real purple wrapper the user can **drag open**. Peeling it reveals the line inside. The wrapper's purple is where the palette's royal purple comes from, and the site should feel slightly more purple from this scene onward — her chocolate coloured the whole square.
**Copy:** the joke, then `You were joking.` / `I went anyway.` Then inside the wrapper: `The smallest thing I ever did. It changed everything after it.`
**Word budget:** 28.

### S6 — TECH MAJARI · `t=0.38`
**Purpose:** tiny decisions compound.
**Mechanic:** a volunteer badge/lanyard object, hand-lettered. A single decision rendered as a fork: the path that leaves, and the path that stays. The staying path is the one that lights.
**Copy:** `I was going to go home.` / `I stayed as a volunteer instead.` / `Ten extra hours in the same place as you.` / `Best paperwork I ever signed.`
**Word budget:** 26.

### S7 — THE DOOR OF THE LOCAL TRAIN · `t=0.46`
**Purpose:** the Junagadh chapter. The single biggest proof of effort in the story.
**This is the one scene allowed a full cinematic pinned sequence.** Pin the viewport and let scroll drive it. Three movements:

1. **The plan almost dies.** Short beats on a quiet field — `No ticket.` / `Plan cancelled twice.` / and then, given its own full beat and a colder frame: `You told me not to come.` Hold on that. Do not soften it. Do not answer it. Her honesty is part of the memory.
2. **The journey.** Not a map. A **doorway**: the frame becomes the open door of a moving local train, warm wind streaking past, horizon strobing, hand on the bar. It should feel like standing, not sitting — slightly unstable, slightly long. Let it last a beat longer than is comfortable. One line: `I came anyway.`
3. **Arrival.** The strobe stops. The hills. **Photo 2** and **Photo 3** arrive here — the climb, and the ice cream. Copy: `We climbed.` / `Then ice cream, because obviously.` And the true meaning, small and plain: `It was never about the distance. Seeing you was worth the trouble.`

**Hard constraint:** after this scene, the train imagery never returns. Not in the finale, not as a transition, not as a background texture.
**Mobile:** compress to two movements, cut the strobe intensity, keep the doorway.
**Word budget:** 45 — the most of any scene, and still short.

### S8 — THE STALLS · `t=0.52`
**Purpose:** "I remember the little things you like" — the most important non-apology message in the site.
**Mechanic:** the four things are **four stalls in the square**, and she must **discover** them, not read them off cards. Walking (scrolling) past, each stall is dark until she touches/hovers it, and then it lights, animates once, and gives up one short line. A small counter in the corner tracks `3 of 4 found` — and the fourth only unlocks the ice cream cart's extra beat.
  - **Pani puri stall** — plate of six; tapping fills one; the sixth one is hers. Line about how she eats them faster than him.
  - **Dairy Milk kiosk** — purple, glowing, the wrapper from S5 pinned to it like a souvenir.
  - **Brownie counter** — warm, dark, a little steam, the one indulgent close-up texture in the site.
  - **Ice cream cart** — the thing that connects back to Junagadh; finding it recalls that lamp visually.
  Each line is **one sentence, under 12 words**, and each must contain a *fact* about her, not a compliment. "You like ice cream" is dead. "You get quiet for exactly one spoon, then start talking again" is alive — but only write lines you can ground in §2, so: keep them observational and safe.
**Reduced motion / keyboard:** all four are tabbable and reveal on focus.
**Word budget:** 60 across all four.

### S9 — NO DESTINATION · `t=0.58`
**Purpose:** romance, quiet and earned. The warmest scene in the site.
**Mechanic:** the car at the kerb. The frame becomes a **windscreen** at night; the road unspools slowly; streetlights sweep the interior in a rhythm. Nothing happens, deliberately. The user can drag horizontally to look from the road to the passenger seat — and the passenger seat is where **Photo 4** lives.
**Poetry:** this is the right place for a couplet (see §6, seed 3).
**Copy:** `We never really had a destination.` / `You just liked the drive.` / `So did I.`
**Word budget:** 24 plus one couplet.

### S10 — BHAVNAGAR · `t=0.70` · RAIN
**Purpose:** name what happened, honestly, without performing pain.
**Look:** this is the **only cold scene**. Desaturate hard. Lamps dim to two. Light rain. More negative space than anywhere else in the site — the layout itself should feel like distance.
**Mechanic:** three unsent messages, rendered as **grey outlines of things he never typed** — `Where are you?` / `Did you eat?` / `How are you?` — appearing and fading without being sent. Then a calendar Saturday that stays empty. No fake chat UI, no blue bubbles, no typing indicator.
**Copy (exact register, do not embellish):** `I was home. Family things. Work things.` / `None of that is the point.` / `You were waiting for Saturday. I didn't come.` / `And before that, I went quiet for days.`
**Forbidden here:** any sentence beginning with "but", any mention of how hard his week was beyond that one line, any request.
**Word budget:** 40.

### S11 — TWO MINUTES · `t=0.80` · RAIN STOPS
**Purpose:** the realization. The hinge of the whole site.
**Mechanic:** the rain stops mid-scene, on a specific line. Then: **a literal two minutes.** A thin arc, 120 units, fills slowly while the copy lands. It is short. It is embarrassingly short. That is the point, and the design should let the silence make the argument instead of the words.
**Copy:** `I keep saying I was busy.` → `I was.` → `And I still had two minutes.` → *(rain stops here)* → `Two minutes to ask if you'd eaten.` → `Being busy isn't the mistake.` → `Letting it make you feel forgotten is.`
**No apology verb anywhere in this scene.** The understanding is the apology. Anything more becomes a request.
**Word budget:** 42.

### S12 — FIVE LAMPS · `t=0.88` · FIRST LIGHT
**Purpose:** the promises, as actions, not vows.
**Mechanic:** five unlit lamps. She lights each one — a press, and it holds warm. Each lit lamp shows its promise in the **present tense of action**, not the future tense of vow: `A call every day.` not `I will always call you every day.` The difference between those two lines is the difference between this site working and not working.
The fifth lamp, lit last, is the thesis line, and it gets the sunrise:
> `I can't promise I'll never be busy.`
> `I promise I'll never be too busy for two minutes.`
**On the fifth light:** the horizon warms for the first time. The atmosphere shift must be caused by her action here — this is the moment the site hands her the lights.
**Word budget:** 55.

### S13 — THE STALL THAT ISN'T BUILT YET (playful) · `t=0.92`
**Purpose:** hope, in the form of a plan. Lightness after weight — the site must breathe before the finale.
**Mechanic:** **"Pick our next three."** Seven tokens: `pani puri` `ice cream` `brownie` `long drive` `chai` `movie` `surprise`. She picks three, in order. The site prints a small **ticket** — perforated edge, monospace stamp, her three picks, a plaza seal, and a line that changes with her combination (write a real line for each token and a few genuinely funny ones for specific pairs, e.g. pani puri + ice cream). The ticket is **screenshot-able by design**: correct aspect ratio, high contrast, looks good cropped.
Persist her choice to `localStorage` so it's still there when she comes back, and echo it in the finale (see S14). The `surprise` token reveals nothing — it just says he'll handle it, which is the joke and also the promise.
**Teasing allowance:** this is the one scene that can be cheeky. Let her irritate him — e.g. rapidly deselecting shows a line admitting she's doing it on purpose.
**Word budget:** flexible; keep each line under 12 words.

### S14 — THE LETTER · `t=0.96`
**Purpose:** the deepest, plainest human moment. No effects competing with it.
**Look:** the square goes quiet and the frame becomes **paper** — warm cream, real margins, generous leading, the handwriting face for the signature only (body stays in the serif; handwriting fonts are unreadable at length).
**Mechanic:** no typewriter effect. Reveal by **paragraph**, on scroll, at reading pace. Keep it at **200–260 words**, in first person, and let it be slightly imperfect: one sentence that restarts itself, one small admission that isn't flattering.

Must contain, in his voice, not in these words:
- what he noticed about her that has nothing to do with him
- that he knows he has not given enough time
- that he understands *why* that hurt, specifically — the forgetting, not the being busy
- no excuses, stated once and then actually not made
- what he wants to do differently, in concrete terms
- that he wants more small memories, not one big gesture
- thanks, for the teasing and for the patience
- **last line only:** `Maru Jiv.`

Sign it `— Dudu`.
**Forbidden:** the words in §3's blocklist, anything about her replying, anything about the future of the relationship as a condition.

### S15 — THE PLAZA, LIT · `t=1.00`
**Purpose:** the payoff. It must feel *earned*, and it must feel like she earned it.
**Mechanic, in four beats — do not collapse them:**

1. **Recall.** Every lamp she lit brightens in sequence, in story order, fast — the whole walk replayed in three seconds as light. The square fully illuminates for the first time.
2. **The five photos converge.** Photos 1–5 rise as **lanterns** into the lit square and settle into a constellation. This is the first and only time all five are visible together — that is why they were held back. **Photo 5** is the newest/last and should land last, largest, closest.
3. **Two beats of type, with real silence between them.** First, quietly, almost small: `I love you.` Hold. Everything stills — motion stops, audio bed drops out, the atmosphere holds its breath for a full beat.
4. **Then, and this string must appear exactly and verbatim:**

> # I LOVE YOU MARA JIV ❤️

   Sunrise breaks on this line. Set it as the largest type in the entire site. Let it be the only thing on screen. Do not decorate it — no confetti, no burst of hearts, no particles. Light, type, and stillness only. Then, underneath, small: `— Dudu`, and her ticket from S13 pinned in the corner like something kept.

**Ending state:** the plaza stays lit and gently breathing. No "restart" button in the primary position — instead, a small hand-lettered `walk it again`, low and unhurried. Nothing asks her for anything. The last frame is a gift sitting there, finished.

> **String constraint:** the exact characters `I LOVE YOU MARA JIV ❤️` must render in the DOM as text (not an image, not split into unreadable spans without an aria-label). Note that the finale spelling is `MARA JIV` while the special name elsewhere is `Maru Jiv` — both spellings are intentional; do not "correct" either one.

---

## 5 · DESIGN SYSTEM (build this before any scene)

Put it in `app/globals.css` as tokens and `tailwind.config.ts`. No scene may use a raw hex value.

### Colour — derived from her, not from Valentine's Day

The palette's anchor is **Dairy Milk purple**, warmed by **lamplight amber** on **night ink**. This is why the site will not look like every other romantic template: its romance is purple and amber, not pink and red.

```
--ink-900   #07080F   deepest night, the base
--ink-800   #0D1020   square at dusk
--ink-700   #161A33   atmosphere mid
--cocoa-600 #3B1E63   Dairy Milk purple, deep
--cocoa-500 #5B2C8F   Dairy Milk purple, lit
--amber-400 #E9A63C   lamplight, the warmth
--amber-300 #F6C97A   lamp core / highlight
--cream-100 #F5EDE0   paper, letter, ticket
--cream-200 #E3D7C4   paper shadow
--rose-500  #B94F63   muted rose — ACCENT ONLY, never a surface
--pista-400 #9CBFA3   ice-cream pistachio, used once (S8/S9)
--slate-500 #5C6480   the rain scene's cold, used ONLY in S10
```

Rules: **rose appears on fewer than 5 elements in the whole site.** Pink is not in the palette at all. No gradient uses more than two stops. `--slate-500` is quarantined to S10.

### Typography

| Role | Face | Use |
|---|---|---|
| Display | **Fraunces** (variable; use the `SOFT` and optical axes) | scene titles, the finale. Warm editorial serif — carries romance without being Playfair-generic. |
| Devanagari poetry | **Tiro Devanagari Hindi** | all Hindi couplets. Calligraphic, correct, pairs with Fraunces. Never set Hindi in a Latin font's fallback. |
| UI / body | **Instrument Sans** (or Inter Tight) | labels, counters, tickets, small caps. |
| Handwriting | **Kalam** | signatures, the plaque, hand-lettered asides. Chosen deliberately because it covers **both Latin and Devanagari**, so handwritten moments stay cohesive across scripts. Body text is never set in it. |

Scale: 8-step, 1.25 ratio, fluid via `clamp()`. Display sizes use **negative tracking** (-0.02em to -0.04em); small caps use **positive** (+0.08em). Body leading 1.7 minimum; poetry leading 2.0. Measure never exceeds **62ch**.

### Spacing, edges, surfaces

- 4px base scale. Section rhythm in multiples of 8.
- **Border radius: 2px on functional edges, or fully round.** Nothing in between. No 12px-rounded cards — that is the single strongest "AI-generated site" tell.
- **No glassmorphism.** No `backdrop-blur` frosted panels. Surfaces are either lamplight bloom, paper, or nothing.
- **No box-shadow as decoration.** Shadow exists only where a light source justifies it, and it is always warm-tinted, never black.
- Film grain overlay at 2–4% across the whole site, from a single tiling SVG/canvas noise — it ties every scene together and kills the flat-vector look for free.

### Buttons & controls (one custom language, zero library defaults)

Interactive things in a night square are **lights**. So: no filled rectangles. Controls are a thin 1px warm rule plus a label, and interaction is expressed as **illumination** — the rule warms, a soft amber bloom grows behind the label, the label's optical size ticks up a notch. Press is a small inward settle (scale 0.985), never a bounce. Focus-visible is a 2px amber offset ring, always present, never removed.

### Motion language

- **Durations:** micro 120–180ms · element reveal 400–600ms · scene transition 700–1100ms · the finale's beats may run to 2s.
- **Easing:** one custom cubic for entrances `cubic-bezier(0.16, 1, 0.3, 1)`, one for exits `cubic-bezier(0.7, 0, 0.84, 0)`. Two curves for the whole site. No `linear` except for continuous ambient loops. **No spring bounce anywhere** — bounce reads as playful UI, and this is a story.
- **Motion evolves with the arc:** early scenes drift slowly and float; the middle is warm and fluid; S10 is almost motionless (stillness as grief); S11 is a single slow linear fill; the finale accelerates into light. Same tokens, different tempo. If S3 and S11 move at the same speed, the motion design has failed.
- **Never animate:** more than one hero thing at a time, `box-shadow`, `filter: blur` on large areas, or `width`/`height`/`top`/`left`. Transform and opacity only.
- Every reveal has a reason. If you cannot say what an animation communicates in one sentence, delete it.

### Image treatment (the five photos)

Uniform treatment so they read as one memory set: a subtle warm grade lifting into amber, blacks lifted slightly (never crushed), 1–2% grain matching the global overlay, and — critically — **lamplight falls on them.** Each photo gets a soft warm edge-light from the nearest lamp, so it belongs to the square instead of being pasted onto it.

Frames are **not** rounded cards. They are a 1px warm rule with generous mat space, like something pinned up. No drop shadows, no tilt-stack-of-polaroids cliché, no film-strip border.

---

## 6 · HINDI / HINGLISH POETRY SPEC

**Four to six couplets across the whole site. Not more.** Poetry supports the story; it does not compete with it.

Rules:
- **Original only.** Never a known sher, never a film lyric, and never attributed to any real poet.
- 2 lines each, 8–14 words per line, natural spoken rhythm over strict meter.
- Set in **Devanagari** (Tiro Devanagari Hindi), with a small, quiet **romanised transliteration** available underneath — because she may read either, and the choice must never feel like a language test. A subtle persistent toggle, remembered in `localStorage`.
- **Imagery allowed** (drawn only from their real story): a train door, wind, a hill path, ice cream melting, a chocolate wrapper, a car window at night, an unsent message, a phone going dark, two minutes, an unlit lamp.
- **Imagery banned:** चाँद, सितारे, ख़ुदा, क़यामत, मयख़ाना, दिल का टुकड़ा, जान लेना/देना, and anything Bollywood-dramatic. No blood, no death, no begging.
- Each couplet is **anchored to one scene**. A couplet floating outside a scene is decoration and must be cut.

**Register seeds — use, adapt, or beat these. Do not exceed their level of drama.**

**Seed 1 — for S11 (two minutes):**
> काम बहुत थे, ये सच है — बहाना नहीं बनाऊँगा,
> दो मिनट मेरे पास थे, वो मैं तुझे नहीं दे पाया।

**Seed 2 — for S7 (the train door):**
> रास्ता लंबा था, सीट नहीं मिली, दरवाज़े पर खड़ा रहा —
> थकान याद नहीं है मुझे, तेरा चेहरा याद है।

**Seed 3 — for S9 (long drive):**
> कहीं पहुँचना ज़रूरी नहीं था उस शाम,
> तेरे साथ गाड़ी में बैठना ही मंज़िल थी।

**Seed 4 — for S8 (little things):**
> बड़ी बातें वक़्त के साथ भूल जाती हैं,
> तेरी छोटी-छोटी पसंद मुझे याद रह जाती है।

Gujarati appears only as **મારું જીવ** in S14 and the finale's Latin `MARA JIV`. Do not write Gujarati verse.

---

## 7 · NAVIGATION & CONTINUITY

- **One route.** `app/page.tsx`. No page navigation, no router transitions — routing would break the single-walk illusion and the shared atmosphere state. Scenes are sections of one continuous scroll-driven canvas.
- **Primary input:** vertical scroll, with two pinned sequences (S7, S15) and everything else free-flowing. Never hijack scroll velocity. Never scroll-jack to snap scenes. Momentum stays hers.
- **The chapter rail** is the lamps: a thin vertical rail of small lamp glyphs, unlit ahead and warmly lit behind. Hover reveals the chapter's name in handwriting. Click travels there smoothly. On mobile it collapses to a 3px progress filament on the screen edge that warms as she walks — no hamburger, no drawer.
- **Resume:** persist furthest scene reached. On return, offer once, quietly: `continue from the drive?` — never force a restart, never force a resume.
- **Audio:** an ambient bed (a low warm room tone, distant plaza texture) plus tiny non-musical interaction sounds. **Off by default. Never autoplay.** Offer once at S1 with a single small speaker glyph; if declined, never ask again. Every emotional beat must land fully with sound off — audio may enhance, never carry.

---

## 8 · CONTENT / CODE SEPARATION

All human content lives in typed data files. **No user-visible string is hardcoded in a component.** This is what makes it easy for him to edit later without touching the UI.

```
/data/love.ts          # single source of truth, typed
/data/poetry.ts        # couplets + transliterations, keyed by scene
/data/letter.ts        # the letter, as paragraph array
/public/images/photo-1.jpg … photo-5.jpg
```

`/data/love.ts` exports, with real TypeScript types (no `any`, no implicit string blobs):

```ts
export const names: Names          // saloni, bubu, dudu, specialName, endearment
export const relationship: Meta    // approxYears: 3  (NO start date — see §2)
export const story: StoryBeat[]    // id, sceneId, beats: string[]
export const memories: Memory[]    // id, title, lines, photo?, lampLabel
export const littleThings: Thing[] // id, label, stall, line, icon
export const promises: Promise_[]  // id, action (present tense), lamp
export const dateTokens: Token[]   // id, label, ticketLine
export const ticketPairs: Pair[]   // [tokenA, tokenB] -> line
export const letter: Letter        // salutation, paragraphs[], closing, signature
export const finalMessage: Final   // beatOne: "I love you.", beatTwo: "I LOVE YOU MARA JIV ❤️"
export const photos: Photo[]       // src, alt (written as a memory, not a description), scene, aspect
```

**Photo handling:** the five files may not exist yet at build time. Every photo component must render a warm, intentional lamplight placeholder (not a broken image, not a grey box, not a stock photo) if the file is missing, and must not break layout. Use `next/image` with explicit dimensions, `sizes`, `placeholder="blur"` where possible, and `priority` only on Photo 1. **Never substitute stock couple photography.** Treat aspect ratio as unknown: every frame must work with portrait, landscape, and square via `object-fit` and a fixed mat.

**Alt text** is written as a memory in his voice, not a caption for strangers — it is the one place accessibility and intimacy coincide. Keep it true to §2.

---

## 9 · TECH & ARCHITECTURE

**Stack:** Next.js (App Router) · React · TypeScript strict · Tailwind CSS · Motion (framer-motion) for orchestration · CSS/SVG/Canvas 2D where they are cheaper than a library.

**Dependency budget: Motion, plus at most ONE more runtime library, and only if it earns its bundle.** No Three.js (the plaza is a stylised 2.5D composition, not a 3D scene — WebGL here costs more than it returns). No GSAP alongside Motion. No UI kit, no icon library — draw the small number of glyphs you need as inline SVG. No shadcn, no component library defaults anywhere: if a control looks like default Tailwind, it is wrong.

**Architecture**
```
app/page.tsx                  the single walk
app/layout.tsx                fonts (next/font), metadata, theme
components/atmosphere/        Sky, Fog, Rain, Lamps, Grain — driven by t
components/scenes/S01Door.tsx … S15Lit.tsx
components/primitives/        HoldButton, Reveal, Beat, PhotoFrame, Couplet, Lamp, Ticket
lib/useJourney.ts             the single t store + scene registry + persistence
lib/motion.ts                 duration + easing tokens, reduced-motion variants
DECISIONS.md                  your overrides and why
```

**One atmosphere state, one subscriber tree.** `t` is computed once from scroll and read by the atmosphere layer via a ref-driven rAF loop — **not** by re-rendering React on every scroll frame. Scene copy reveals use `useInView`/viewport triggers, not scroll listeners.

**Metadata:** title and OG set so that if she ever sees the link in a chat it already feels personal. `robots: noindex, nofollow` — this is private. No analytics, no third-party scripts, no fonts from a CDN at runtime (self-host via `next/font`).

---

## 10 · RESPONSIVE (designed, not shrunk)

She will almost certainly open this **on her phone, first, probably at night.** Design mobile first and make it the better experience.

**Mobile (390×844 is the reference device):**
- One column, one idea per screen, generous vertical rhythm. Display type stays large — do not scale headlines down into timidity.
- Replace hover discovery with **tap** discovery, always with a visible affordance (an unlit lamp must *look* tappable).
- Replace horizontal drag with swipe; keep the press-and-hold (it works better on touch than on mouse).
- Pinned sequences: keep S7 and S15, simplify to fewer movements, reduce strobe and parallax depth.
- All targets ≥44×44px. Nothing critical within 24px of the bottom edge (thumb + browser chrome).
- Test at 390×844 **and** 360×640. Verify with the address bar both shown and hidden — use `dvh`, never `vh`, for full-height scenes.

**Desktop (≥1024px):** earn the space with depth — multi-layer parallax in the square, cursor-reactive lamplight, the wider windscreen in S9, the full constellation in S15. Cap content at a comfortable measure; never let the letter run full-bleed.

**Tablet:** do not leave it as a stretched phone. Two-layer parallax, tap-first interactions.

---

## 11 · PERFORMANCE & ACCESSIBILITY (both are pass/fail)

**Budgets — measure, don't assume:**
- LCP < 2.0s on a simulated mid-tier Android over 4G.
- First-load JS < 200KB gzipped.
- A sustained **60fps** through S7 and S15 on mid-tier mobile. Profile these two scenes specifically; they are the only ones at real risk.
- Photos served responsively, ≤ 250KB each after optimisation, lazy except Photo 1.
- No layout shift: every reveal reserves its space. CLS ≈ 0.
- Pause all ambient animation when the tab is hidden, and when a scene is off-screen.

**Accessibility:**
- `prefers-reduced-motion: reduce` gets a **fully designed static variant**, not a disabled site: instant cross-fades, no parallax, no strobe, no rain motion (rain becomes a still texture), and the finale reveals as type with a gentle fade. The emotional arc must survive intact — someone with vestibular sensitivity should still feel the walk.
- Complete keyboard path through all 15 scenes, every stall, every lamp, the tokens, and the finale. Visible focus always.
- Semantic landmarks and heading order. `aria-live="polite"` on progressive reveals so a screen reader hears the story in order rather than all at once.
- All text meets WCAG AA against its actual backdrop — check the amber-on-ink and cream-on-cocoa pairs specifically, and check text sitting over photos.
- Respect `prefers-reduced-transparency` and forced-colors where cheap to do so.

---

## 12 · MANDATORY SELF-CRITIQUE PASS

After the build runs end to end, walk it yourself at 390px and at 1440px, then score every dimension **1–10 in `DECISIONS.md`**. Be harsh; you are reviewing a stranger's work for an award jury.

1. Does it feel made for *one specific person*, or for "a girlfriend"?
2. Is the arc actually progressive, or does scene 3 hit as hard as scene 14?
3. Does the finale feel **earned** by everything before it?
4. Is there a single scene that exists because it looked cool? (Delete it.)
5. Does the typography carry the emotion on its own, with all motion disabled?
6. Do the five photos feel like *memories revealed*, or like a gallery?
7. Is anything within a mile of a template, a default, or an AI-looking layout?
8. Is there a single line of copy that could have been written for anyone else?
9. Does S10 apologise without asking for anything? (Re-read it as if you were her.)
10. Does the motion language visibly differ between S3, S10, and S15?
11. Would a senior frontend engineer respect `lib/useJourney.ts`?
12. Is it flawless on a phone at night, at low brightness, one-handed?

**Any dimension below 8: redesign that scene from the concept down. Do not patch it.** Then state the final scores plainly in your report, including the ones that are still weak.

### Hard failure conditions (any one of these means it isn't done)

- Floating heart emojis, confetti, sparkle particles, or a cursor-trail of hearts.
- A pink gradient blob, an animated blob of any kind, or a frosted glass card.
- A typewriter effect on more than one element (and none at all in the letter).
- Stock photography of any couple, anywhere, including backgrounds.
- A day counter, an invented date, or an invented anniversary.
- A "forgive me" affordance, or any interaction that asks her to decide something.
- A traditional navbar, a hamburger menu, or a "scroll down" chevron in S1.
- Paragraphs dumped on screen, or a scene over its word budget.
- The train reappearing outside S7, or Junagadh becoming the site's identity.
- Motion that runs at the same tempo in the grief scene as in the finale.
- `I LOVE YOU MARA JIV ❤️` rendered as anything other than live text in the DOM.

---

## 13 · DEFINITION OF DONE

1. `npm run build` clean; TypeScript strict clean; no console errors or warnings at runtime.
2. All 15 scenes implemented, at full quality, no placeholders, no TODOs, no lorem.
3. All content in `/data/*` and trivially editable; five photo paths wired with graceful fallbacks.
4. Reduced-motion variant complete and walked end to end.
5. Full keyboard walkthrough completed and verified.
6. Verified at 360×640, 390×844, 768, 1024, 1440, 1920.
7. `DECISIONS.md` contains overrides, reasons, and the §12 scores.
8. `README.md`: how to run it, how to swap the five photos, how to edit the letter and the promises, how to deploy.

**Then report to me with:** what you built, the design decisions you're proudest of, your §12 scores including the weak ones, and anything you deliberately left out and why. Do not tell me it's beautiful. Tell me what you'd fix next.

---

## 14 · THE ONE THING TO REMEMBER

She will not remember the parallax.

She will remember that someone knew she eats pani puri too fast, remembered a joke about a chocolate bar from three years ago, admitted the real mistake instead of the convenient one, and understood that two minutes would have been enough.

**Build the site that proves he was paying attention.**

Everything else is craft in service of that.
