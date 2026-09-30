/**
 * The letter. 200–260 words, first person, deliberately a little imperfect.
 *
 * It must not contain: an ask, a condition, a reference to her replying, or
 * anything from the banned-phrase list. It ends on the reserved name, once.
 */

export interface Letter {
  place: string;
  salutation: string;
  paragraphs: string[];
  /** The reserved name. One of only two uses in the entire experience. */
  lastLine: string;
  signature: string;
}

export const letter: Letter = {
  place: 'the letter',
  salutation: 'Saloni,',
  paragraphs: [
    'I want to start with something that has nothing to do with me. You notice things. When someone in your group goes quiet, you are the one who asks. You do it without making it a whole event. I have watched you do it for three years and I do not think you know it is unusual.',

    'I have not given you enough time. I am not going to dress that up. There were weeks where you were the last thing on a list, and a list is not where you belong.',

    'The part I got wrong is not that I was busy. I was busy. That part is true and it is also not an excuse, because I had two minutes. I had two minutes in a day and I did not spend them asking where you were or whether you had eaten. You were waiting for Saturday and I did not come, and before that I had already gone quiet, and that quiet is the thing that actually hurt. Being forgotten is worse than being told no.',

    'So here is what I want instead. Not one big gesture — I know you would see through it in a second. More small ones. The call at night. The plate of pani puri. The drive with nowhere to be. A message on the day I have no time, especially on the day I have no time.',

    'Thank you for teasing me. Thank you for being patient longer than I deserved. You are not a part of my week. You are the point of it.',
  ],
  /* NOTE: this is the reserved name's first of two uses; the second is
     `finalMessage.beatTwo` in data/love.ts, which is spelled "MARA JIV" and is
     marked render-verbatim. The two spellings differ (Maru / Mara). That is
     left exactly as written rather than silently unified — if it is a typo it
     should be fixed here or there by hand, because it is her name. */
  lastLine: 'Maru Jiv.',
  signature: '— Dudu',
};
