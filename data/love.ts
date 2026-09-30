/**
 * PROMISE PLAZA — single source of truth for everything a human wrote.
 *
 * No user-visible string belongs in a component. Edit this file to change the
 * experience; you should never need to open a scene to fix a word.
 *
 * FACTS LEDGER RULE: nothing in here may invent an event, a date, an
 * anniversary, a place or a conversation. Poetry around the truth is fine.
 * New facts are not.
 */

/* ------------------------------------------------------------------ names */

export interface Names {
  her: string;
  herNickname: string;
  hisNickname: string;
  /** Gujarati. Reserved: used at most twice in the entire experience. */
  specialName: string;
  specialNameDeva: string;
  endearment: string;
}

export const names: Names = {
  her: 'Saloni',
  herNickname: 'Bubu',
  hisNickname: 'Dudu',
  specialName: 'Maru Jiv',
  specialNameDeva: 'મારું જીવ',
  endearment: 'baby',
};

export interface Meta {
  /** Approximate. There is no start date and no day counter, by design. */
  approxYears: number;
}

export const relationship: Meta = { approxYears: 3 };

/* ----------------------------------------------------------------- scenes */

export type SceneId =
  | 'door'
  | 'square'
  | 'bubu'
  | 'ordinary'
  | 'wrapper'
  | 'majari'
  | 'junagadh'
  | 'stalls'
  | 'drive'
  | 'bhavnagar'
  | 'twominutes'
  | 'promises'
  | 'ticket'
  | 'letter'
  | 'lit';

/** Chapter rail labels — handwritten, lower-case, never "Section 4". */
export const chapters: { id: SceneId; label: string; lamp: boolean }[] = [
  { id: 'door', label: 'the door', lamp: true },
  { id: 'square', label: 'the square', lamp: false },
  { id: 'bubu', label: 'you', lamp: true },
  { id: 'ordinary', label: 'an ordinary day', lamp: true },
  { id: 'wrapper', label: 'the wrapper', lamp: true },
  { id: 'majari', label: 'tech majari', lamp: true },
  { id: 'junagadh', label: 'the train door', lamp: true },
  { id: 'stalls', label: 'the stalls', lamp: true },
  { id: 'drive', label: 'no destination', lamp: true },
  { id: 'bhavnagar', label: 'the quiet days', lamp: false },
  { id: 'twominutes', label: 'two minutes', lamp: true },
  { id: 'promises', label: 'five lamps', lamp: true },
  { id: 'ticket', label: 'our next three', lamp: true },
  { id: 'letter', label: 'the letter', lamp: true },
  { id: 'lit', label: 'sunrise', lamp: true },
];

/* ------------------------------------------------------------------ story */

export interface StoryBeats {
  id: SceneId;
  /** Eyebrow — small caps, sets the place. Optional. */
  place?: string;
  title?: string;
  /** Revealed one at a time. Hard ceiling: 14 words per line. */
  beats: string[];
  /** A single line given extra silence after the beats. */
  coda?: string;
}

export const story: StoryBeats[] = [
  {
    id: 'door',
    beats: ['For Saloni'],
  },
  {
    id: 'square',
    beats: ['A small square,', 'with the lights still off.'],
    coda: 'Walk, and they come on.',
  },
  {
    id: 'bubu',
    place: 'chapter one',
    title: 'You',
    beats: ['Before this is about us,', 'it should be about you.'],
  },
  {
    id: 'ordinary',
    place: 'a college corridor',
    title: 'An ordinary day',
    beats: [
      'I was late for something.',
      'You were on your way to a lecture.',
      'We talked for a few minutes.',
      'That was all it was.',
    ],
    coda: 'That was enough.',
  },
  {
    id: 'wrapper',
    place: 'one reel, one joke',
    title: 'The wrapper',
    beats: [
      'You sent a reel. Whoever came first gets Dairy Milk.',
      'You were joking.',
      'I went anyway.',
    ],
  },
  {
    id: 'majari',
    place: 'tech majari',
    title: 'The smallest decision',
    beats: [
      'I was going to go home.',
      'I stayed on as a volunteer instead.',
      'Extra hours in the same place as you.',
    ],
    coda: 'Best paperwork I ever signed.',
  },
  {
    id: 'stalls',
    place: 'the stalls',
    title: 'Things I know about you',
    beats: ['Four of them are open tonight.'],
  },
  {
    id: 'drive',
    place: 'somewhere on the ring road',
    title: 'No destination',
    beats: ['We never really had a destination.', 'You just liked the drive.'],
    coda: 'So did I.',
  },
  {
    id: 'bhavnagar',
    place: 'bhavnagar',
    title: 'The quiet days',
    beats: [
      'I was home. Family things. Work things.',
      'None of that is the point.',
      'You were waiting for Saturday. I did not come.',
      'And before that, I had gone quiet for days.',
    ],
  },
  {
    id: 'twominutes',
    place: 'the part I got wrong',
    title: 'Two minutes',
    beats: [
      'I keep saying I was busy.',
      'I was.',
      'And I still had two minutes.',
      'Two minutes to ask if you had eaten.',
      'Being busy is not the mistake.',
    ],
    coda: 'Letting it make you feel forgotten is.',
  },
  {
    id: 'promises',
    place: 'five lamps',
    title: 'Not vows. Just things I will do.',
    beats: ['Light them in any order.'],
  },
  {
    id: 'ticket',
    place: 'the stall that is not built yet',
    title: 'Pick our next three',
    beats: ['In order. I am writing it down.'],
  },
  { id: 'lit', beats: [] },
];

export const storyById = (id: SceneId): StoryBeats =>
  story.find((s) => s.id === id) ?? { id, beats: [] };

/* -------------------------------------------------------------- junagadh */

/** The one pinned cinematic sequence. Three movements, deliberately short. */
export const junagadh = {
  place: 'ahmedabad → junagadh',
  title: 'The door of the local train',
  movement1: {
    beats: ['No ticket.', 'The plan died twice.'],
    /** Given its own frame, colder, unanswered. Her honesty is part of the memory. */
    hard: 'You told me not to come.',
  },
  movement2: {
    line: 'I came anyway.',
    sub: 'Local train. No seat. Standing at the door the whole way.',
  },
  movement3: {
    beats: ['We climbed.', 'Then ice cream, because obviously.'],
    meaning: 'It was never about the distance. Seeing you was worth the trouble.',
  },
};

/* ---------------------------------------------------------- little things */

export interface LittleThing {
  id: string;
  label: string;
  /** What the stall is called on the sign. */
  sign: string;
  /** One sentence, under 12 words. Observational, not complimentary. */
  line: string;
  /** Shown after all four are found. */
  found: string;
  accent: 'amber' | 'cocoa' | 'cream' | 'pista';
}

export const littleThings: LittleThing[] = [
  {
    id: 'panipuri',
    label: 'Pani puri',
    sign: 'छह वाली प्लेट',
    line: 'You finish yours before I have started my second.',
    found: 'And you still look at mine.',
    accent: 'amber',
  },
  {
    id: 'dairymilk',
    label: 'Dairy Milk',
    sign: 'the purple one',
    line: 'The joke that became a habit. Then became us.',
    found: 'I kept the wrapper. Obviously.',
    accent: 'cocoa',
  },
  {
    id: 'brownie',
    label: 'Chocolate brownie',
    sign: 'warm, always',
    line: 'Ordered as a share. Never actually shared.',
    found: 'I stopped asking. I just order two.',
    accent: 'cream',
  },
  {
    id: 'icecream',
    label: 'Ice cream',
    sign: 'the cart that follows us',
    line: 'The Junagadh one still counts as the best one.',
    found: 'Any weather. Any hour. You never say no.',
    accent: 'pista',
  },
];

export const stallsCopy = {
  counterLabel: 'found',
  hint: 'four stalls are open. go and look.',
  hintTouch: 'tap the dark ones.',
  complete: 'None of this is a big thing. That is exactly why I remember it.',
};

/* ------------------------------------------------------------- bhavnagar */

/** Grey outlines of messages he never typed. Not a chat UI. */
export const unsent: string[] = ['Where are you?', 'Did you eat?', 'How are you?'];

export const bhavnagarCopy = {
  unsentLabel: 'never sent',
  saturday: 'Saturday',
  saturdayNote: 'we had plans',
  rainNote: '',
};

/* ------------------------------------------------------------- promises */

export interface PromiseAction {
  id: string;
  /** PRESENT TENSE OF ACTION, never the future tense of a vow. */
  action: string;
  detail: string;
}

export const promises: PromiseAction[] = [
  { id: 'call', action: 'A call every day.', detail: 'Not a text that says busy, call you later.' },
  {
    id: 'dates',
    action: 'Pani puri and ice cream get calendar space.',
    detail: 'Planned, not squeezed in when something else cancels.',
  },
  { id: 'time', action: 'More of my time, and the better hours of it.', detail: 'Not the leftover ones.' },
  {
    id: 'checkin',
    action: 'On the worst days, a check-in anyway.',
    detail: 'Where are you. Did you eat. How are you. Those three.',
  },
  {
    id: 'thesis',
    action: 'I cannot promise I will never be busy.',
    detail: 'I promise I will never be too busy for two minutes.',
  },
];

export const promisesCopy = {
  instruction: 'press each one',
  litLabel: 'lit',
  closing: 'Five lamps. Yours to hold me to.',
};

/* ---------------------------------------------------------- date tickets */

export interface DateToken {
  id: string;
  label: string;
  /** Printed on the ticket if she picks it. */
  ticketLine: string;
}

export const dateTokens: DateToken[] = [
  { id: 'panipuri', label: 'pani puri', ticketLine: 'one plate each. we both know that is a lie.' },
  { id: 'icecream', label: 'ice cream', ticketLine: 'your flavour first. i will pretend to think about mine.' },
  { id: 'brownie', label: 'brownie', ticketLine: 'warm, one spoon, shared in theory.' },
  { id: 'longdrive', label: 'long drive', ticketLine: 'no destination. your playlist. windows down.' },
  { id: 'chai', label: 'chai', ticketLine: 'the small glass kind. we stand and talk too long.' },
  { id: 'movie', label: 'movie', ticketLine: 'you pick. i will not complain out loud.' },
  { id: 'surprise', label: 'surprise', ticketLine: 'not telling you. that is the whole point.' },
];

/** Lines for specific pairs, keyed by sorted ids joined with +. */
export const ticketPairs: Record<string, string> = {
  'icecream+panipuri': 'spicy then cold. the correct order. i learned it from you.',
  'brownie+icecream': 'both. at the same time. i am not fighting you on this.',
  'icecream+longdrive': 'cone in your hand, my car seats at your mercy.',
  'longdrive+panipuri': 'drive first, then the stall near the turning.',
  'chai+longdrive': 'the drive, and then chai where we stop.',
  'movie+surprise': 'you will find out at the interval.',
  'brownie+panipuri': 'salt then sugar. a genuinely serious plan.',
  'chai+panipuri': 'the evening we usually have. i want more of them.',
};

export const ticketCopy = {
  prompt: 'Pick three.',
  promptSub: 'In order. I am writing it down.',
  pickMore: (n: number) => `${n} more`,
  stampTitle: 'PROMISE PLAZA',
  stampSub: 'ONE EVENING · ADMIT TWO',
  seal: 'बुबु ❤️',
  holder: 'issued to',
  holderName: 'Bubu',
  signedBy: 'Dudu',
  footer: 'no expiry. bring your appetite.',
  reset: 'pick again',
  /** Shown if she rapidly deselects. She likes irritating him; let the site notice. */
  tease: 'you are doing this on purpose. i know you. carry on.',
  done: 'Done. That is a real plan, not a nice sentence.',
};

/* ------------------------------------------------------------ the finale */

export interface Final {
  beatOne: string;
  /** MUST render verbatim as live text. Do not "correct" MARA to MARU. */
  beatTwo: string;
  signature: string;
  again: string;
  keptLabel: string;
}

export const finalMessage: Final = {
  beatOne: 'I love you.',
  beatTwo: 'I LOVE YOU MARA JIV ❤️',
  signature: '— Dudu',
  again: 'walk it again',
  keptLabel: 'kept',
};

export const litCopy = {
  recall: 'every light you turned on',
  constellation: 'five of them',
};

/* -------------------------------------------------------------- photos */

export interface Photo {
  /** Matches public/images/photo-<id>.* — the file is found by this number. */
  id: number;
  /** Alt text written as a memory in his voice — not a caption for strangers. */
  alt: string;
  scene: SceneId;
  /** A short hand-lettered note pinned beside the frame. Optional. */
  note?: string;
  /**
   * objectPosition for the crop. These photographs are phone-tall (about
   * 9:19.5), so a mat always trims them vertically — this is what decides
   * WHERE, and it is why nobody loses the top of their head. Lower percentage
   * keeps more of the top of the frame.
   */
  focal?: string;
}

/**
 * Mapping is by `id` → public/images/photo-<id>. To move a photograph to a
 * different moment, change its `scene` and the frame it is rendered in; to
 * swap which picture is which, rename the files.
 *
 * Alt text describes what is actually in each photograph. It deliberately does
 * not name a place or an occasion that the picture does not show.
 */
export const photos: Photo[] = [
  /* Array order is the order they rise in the final frame. The LAST entry is
     the one that lands last, largest and closest, and is the only one that
     keeps its note there — so the hero of the finale is chosen here, by
     position, not buried in the scene. */
  {
    id: 5,
    alt: 'You, standing in the garden, smiling straight at the camera.',
    scene: 'bubu',
    note: 'you',
    focal: '50% 80%',
  },
  {
    id: 1,
    alt: 'The two of us standing together, my arm around you, you looking up at me.',
    scene: 'lit',
    focal: '50% 45%',
  },
  {
    id: 2,
    alt: 'The two of us walking away hand in hand, you turning back towards the camera.',
    scene: 'drive',
    note: 'no destination',
    focal: '50% 50%',
  },
  {
    id: 3,
    alt: 'The two of us standing together outside, on another day.',
    scene: 'lit',
    focal: '50% 55%',
  },
  {
    id: 4,
    alt: 'The two of us, close, both looking straight at the camera.',
    scene: 'lit',
    note: 'us',
    focal: '50% 35%',
  },
];

export const photoById = (id: number): Photo => photos.find((p) => p.id === id) ?? photos[0];

/* ------------------------------------------------------------ interface */

export const ui = {
  hold: 'press and hold',
  holding: 'keep holding',
  holdRelease: 'hold a little longer',
  skip: 'skip the door',
  scrollHint: '',
  audioOn: 'sound on',
  audioOff: 'sound off',
  resume: (label: string) => `continue from ${label}?`,
  resumeYes: 'yes, continue',
  resumeNo: 'start at the door',
  romanToggle: 'roman',
  devaToggle: 'हिंदी',
  reducedNote: 'motion reduced, story intact.',
};

/* ---------------------------------------------------------------- traits
   The typographic portrait in the "You" chapter. True things only, drawn from
   the facts ledger — no compliments that could be said to anyone. */

export interface Trait {
  id: string;
  label: string;
  /** The one that dodges the cursor. She likes irritating me; let it irritate back. */
  dodges?: boolean;
}

export const traits: Trait[] = [
  { id: 'panipuri', label: 'pani puri' },
  { id: 'dairymilk', label: 'dairy milk' },
  { id: 'brownie', label: 'chocolate brownie' },
  { id: 'icecream', label: 'ice cream' },
  { id: 'drives', label: 'long drives with nowhere to be' },
  { id: 'effort', label: 'notices effort before anything else' },
  { id: 'baby', label: 'answers to baby' },
  { id: 'tease', label: 'irritates me on purpose', dodges: true },
];

export const bubuCopy = {
  dodge1: 'see. this is what i mean.',
  dodge2: 'you are enjoying this.',
  dodgeGiveUp: 'fine. you win. you always do.',
  yearsNote: (n: number) => `about ${n} years of knowing you`,
};

/* --------------------------------------------------------------- wrapper */

export const wrapperCopy = {
  reelCaption: 'jo pehle aayega usko dairy milk milegi',
  reelFrom: 'one reel, from you',
  foilName: 'the purple one',
  foilSub: 'drag to open',
  openHint: 'open it',
  inside: 'The smallest thing I ever did. It changed everything after it.',
  kept: 'I kept this one.',
};

/* ------------------------------------------------------------ tech majari */

export const majariCopy = {
  leave: 'go home',
  stay: 'stay as a volunteer',
  badgeRole: 'volunteer',
  badgeEvent: 'Tech Majari',
  badgeNote: 'because you were there',
  chooseHint: 'the decision, as it actually was',
};

/* ------------------------------------------------------------- two minutes */

export const twoMinutesCopy = {
  arcLabel: 'two minutes',
  arcUnit: 'that is all it was',
  start: '0:00',
  end: '2:00',
};

/* ------------------------------------------------------------- the letter */

export const letterCopy = {
  eyebrow: 'the letter',
  openHint: 'read it',
};

/* ------------------------------------------------------------------ drive */

export const driveCopy = {
  lookHint: 'drag to look over',
  lookHintTouch: 'swipe to look over',
  road: 'the road',
  seat: 'the passenger seat',
};
