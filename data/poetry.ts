/**
 * Original couplets. Six in the whole experience — poetry supports the story,
 * it does not compete with it.
 *
 * Rules honoured here:
 *  - original only; nothing known, nothing attributed to a real poet
 *  - imagery drawn only from their actual story: a train door, a hill path,
 *    a wrapper, a car window, an unsent message, two minutes, an unlit lamp
 *  - banned imagery: चाँद, सितारे, ख़ुदा, क़यामत, जान लेना/देना, Bollywood drama
 *  - every couplet is anchored to exactly one scene
 */

import type { SceneId } from './love';

export interface Couplet {
  id: string;
  scene: SceneId;
  /** Devanagari — set in the Devanagari face, never a Latin fallback. */
  deva: [string, string];
  /** Quiet romanisation. Available, never required. */
  roman: [string, string];
}

export const couplets: Couplet[] = [
  {
    id: 'ordinary',
    scene: 'ordinary',
    deva: [
      'कोई बड़ी बात नहीं हुई थी उस दिन,',
      'बस एक बातचीत थी, जो अब तक चल रही है।',
    ],
    roman: [
      'koi badi baat nahin hui thi us din,',
      'bas ek baatcheet thi, jo ab tak chal rahi hai.',
    ],
  },
  {
    id: 'wrapper',
    scene: 'wrapper',
    deva: [
      'एक मज़ाक़ था, एक रील थी, एक चॉकलेट थी —',
      'और उसी छोटी सी बात से तू मेरी आदत हो गई।',
    ],
    roman: [
      'ek mazaaq tha, ek reel thi, ek chocolate thi —',
      'aur usi chhoti si baat se tu meri aadat ho gayi.',
    ],
  },
  {
    id: 'junagadh',
    scene: 'junagadh',
    deva: [
      'रास्ता लंबा था, सीट नहीं मिली, दरवाज़े पर खड़ा रहा —',
      'थकान याद नहीं है मुझे, तेरा चेहरा याद है।',
    ],
    roman: [
      'raasta lamba tha, seat nahin mili, darwaaze par khada raha —',
      'thakaan yaad nahin hai mujhe, tera chehra yaad hai.',
    ],
  },
  {
    id: 'stalls',
    scene: 'stalls',
    deva: [
      'बड़ी बातें वक़्त के साथ भूल जाती हैं,',
      'तेरी छोटी-छोटी पसंद मुझे याद रह जाती है।',
    ],
    roman: [
      'badi baatein waqt ke saath bhool jaati hain,',
      'teri chhoti-chhoti pasand mujhe yaad rah jaati hai.',
    ],
  },
  {
    id: 'drive',
    scene: 'drive',
    deva: [
      'कहीं पहुँचना ज़रूरी नहीं था उस शाम,',
      'तेरे साथ गाड़ी में बैठना ही मंज़िल थी।',
    ],
    roman: [
      'kahin pahunchna zaroori nahin tha us shaam,',
      'tere saath gaadi mein baithna hi manzil thi.',
    ],
  },
  {
    id: 'twominutes',
    scene: 'twominutes',
    deva: [
      'काम बहुत थे, ये सच है — बहाना नहीं बनाऊँगा,',
      'दो मिनट मेरे पास थे, वो मैं तुझे नहीं दे पाया।',
    ],
    roman: [
      'kaam bahut the, ye sach hai — bahaana nahin banaaunga,',
      'do minute mere paas the, wo main tujhe nahin de paaya.',
    ],
  },
];

export const coupletFor = (scene: SceneId): Couplet | undefined =>
  couplets.find((c) => c.scene === scene);
