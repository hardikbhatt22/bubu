# The photographs

Files are named `photo-<n>` and picked up by number, not by sort order:

    photo-1.jpeg   → "You"            (chapter one) + the last frame
    photo-2.jpeg   → "No destination" (the drive)   + the last frame
    photo-3.jpeg   → the last frame
    photo-4.jpeg   → the last frame, landing last and largest

Any of `.jpg .jpeg .png .webp .avif` works — the number is what matters.

## Adding or replacing one

Drop the file in with the right name and restart the dev server. That is all;
`scripts/photos.mjs` runs automatically and records each photo's real size and
a tiny blurred copy into `data/photos.generated.ts`, so frames reserve exactly
the right space and fill with the picture's own colour while it loads.

To add a fifth, save it as `photo-5.*` and give it an entry in `photos` in
`data/love.ts`.

## Getting the crop right

These are phone-tall pictures (about 9:19.5), so every frame trims them
vertically. What survives is set by `focal` in `data/love.ts` — an
`object-position`, where a **lower** percentage keeps more of the **top**:

```ts
{ id: 1, focal: '50% 45%', … }
```

If someone's head or feet get clipped after you swap a picture, that one value
is the fix. Mats are portrait-only on purpose: a landscape mat would show only
about a third of a photo this tall.

## If a file is missing

Nothing breaks. That frame shows an intentional lamplight placeholder carrying
the photo's own caption, and the site still reads as finished.
