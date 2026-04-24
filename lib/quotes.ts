import type { Quote, QuoteTheme } from "./types";

export const QUOTES: Quote[] = [
  {
    id: "epictetus-discourses-2-12",
    text: "First say to yourself what you would be; and then do what you have to do.",
    author: "Epictetus",
    source: "Discourses 2.12",
    theme: "discipline",
  },
  {
    id: "seneca-letters-15-3",
    text: "The body must be exercised and worked, for it is by labor that health is preserved.",
    author: "Seneca",
    source: "Letters 15.3",
    theme: "discipline",
  },
  {
    id: "seneca-letters-15-5",
    text: "You have power over your mind — not outside events. Realize this, and you will find strength.",
    author: "Marcus Aurelius",
    source: "Meditations 5.3",
    theme: "endurance",
  },
  {
    id: "epictetus-enchiridion-5",
    text: "Men are disturbed not by the things which happen, but by the opinions about the things.",
    author: "Epictetus",
    source: "Enchiridion 5",
    theme: "equanimity",
  },
  {
    id: "marcus-meditations-5-27",
    text: "Concentrate every minute like a Roman on doing what is in front of you with precise and genuine seriousness.",
    author: "Marcus Aurelius",
    source: "Meditations 5.27",
    theme: "discipline",
  },
  {
    id: "marcus-meditations-11-22",
    text: "If you accomplish something good with hard work, the labor passes quickly, but the good endures.",
    author: "Marcus Aurelius",
    source: "Meditations 11.22",
    theme: "endurance",
  },
  {
    id: "seneca-letters-49",
    text: "You could leave life right now. Let that determine what you do and say and think.",
    author: "Marcus Aurelius",
    source: "Meditations 2.11",
    theme: "mortality",
  },
  {
    id: "seneca-letters-1-2",
    text: "Begin at once to live, and count each separate day as a separate life.",
    author: "Seneca",
    source: "Letters 101",
    theme: "beginning",
  },
  {
    id: "marcus-meditations-1-17",
    text: "It is not things themselves that disturb people, but their judgments about those things.",
    author: "Epictetus",
    source: "Enchiridion 5",
    theme: "equanimity",
  },
  {
    id: "seneca-difficulties",
    text: "Difficulties strengthen the mind, as labor does the body.",
    author: "Seneca",
    source: "Letters 31.4",
    theme: "endurance",
  },
  {
    id: "epictetus-discourses-1-15",
    text: "No man is free who is not master of himself.",
    author: "Epictetus",
    source: "Discourses 4.1",
    theme: "discipline",
  },
  {
    id: "marcus-meditations-6-2",
    text: "Waste no more time arguing what a good man should be. Be one.",
    author: "Marcus Aurelius",
    source: "Meditations 10.16",
    theme: "discipline",
  },
  {
    id: "marcus-meditations-8-5",
    text: "Confine yourself to the present.",
    author: "Marcus Aurelius",
    source: "Meditations 7.29",
    theme: "discipline",
  },
  {
    id: "seneca-letters-71-3",
    text: "If a man knows not to which port he sails, no wind is favorable.",
    author: "Seneca",
    source: "Letters 71.3",
    theme: "beginning",
  },
  {
    id: "marcus-meditations-4-3",
    text: "The happiness of your life depends upon the quality of your thoughts.",
    author: "Marcus Aurelius",
    source: "Meditations 4.3",
    theme: "equanimity",
  },
  {
    id: "marcus-meditations-vanity",
    text: "Soon you will have forgotten the world, and soon the world will have forgotten you.",
    author: "Marcus Aurelius",
    source: "Meditations 7.21",
    theme: "vanity",
  },
  {
    id: "seneca-brevitate-1",
    text: "It is not that we have a short time to live, but that we waste much of it.",
    author: "Seneca",
    source: "On the Shortness of Life 1",
    theme: "mortality",
  },
  {
    id: "epictetus-discourses-3-15",
    text: "In every affair consider what precedes and what follows, and then undertake it.",
    author: "Epictetus",
    source: "Discourses 3.15",
    theme: "beginning",
  },
  {
    id: "marcus-meditations-2-1",
    text: "When you arise in the morning, think of what a precious privilege it is to be alive — to breathe, to think, to enjoy, to love.",
    author: "Marcus Aurelius",
    source: "Meditations 2.1",
    theme: "beginning",
  },
  {
    id: "epictetus-enchiridion-1",
    text: "Some things are in our control and others not. Things in our control are opinion, pursuit, desire, aversion.",
    author: "Epictetus",
    source: "Enchiridion 1",
    theme: "equanimity",
  },
  {
    id: "marcus-meditations-7-22",
    text: "The best revenge is not to be like your enemy.",
    author: "Marcus Aurelius",
    source: "Meditations 6.6",
    theme: "equanimity",
  },
  {
    id: "seneca-letters-18-5",
    text: "He suffers more than necessary who suffers before it is necessary.",
    author: "Seneca",
    source: "Letters 98.8",
    theme: "endurance",
  },
  {
    id: "marcus-meditations-4-17",
    text: "Do not act as if you had ten thousand years to live. While you are alive, while it is still possible, become good.",
    author: "Marcus Aurelius",
    source: "Meditations 4.17",
    theme: "mortality",
  },
  {
    id: "epictetus-discourses-2-5",
    text: "Make the best use of what is in your power, and take the rest as it happens.",
    author: "Epictetus",
    source: "Discourses 2.5",
    theme: "equanimity",
  },
  {
    id: "seneca-brevitate-3",
    text: "Life, if well lived, is long enough.",
    author: "Seneca",
    source: "On the Shortness of Life 3",
    theme: "mortality",
  },
  {
    id: "marcus-meditations-5-20",
    text: "The impediment to action advances action. What stands in the way becomes the way.",
    author: "Marcus Aurelius",
    source: "Meditations 5.20",
    theme: "endurance",
  },
  {
    id: "epictetus-enchiridion-33",
    text: "Silence is safer than speech.",
    author: "Epictetus",
    source: "Enchiridion 33",
    theme: "discipline",
  },
  {
    id: "seneca-letters-80-3",
    text: "No man is good by chance. Virtue is something which must be learned.",
    author: "Seneca",
    source: "Letters 123",
    theme: "discipline",
  },
  {
    id: "marcus-meditations-vanity-2",
    text: "Vanity is the greatest of all flatterers.",
    author: "Marcus Aurelius",
    source: "Meditations (attr.)",
    theme: "vanity",
  },
  {
    id: "seneca-letters-76-5",
    text: "As long as you live, keep learning how to live.",
    author: "Seneca",
    source: "Letters 76.3",
    theme: "beginning",
  },
];

function hashStr(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function quoteForDay(userId: string, date: Date = new Date()): Quote {
  const day = date.toISOString().slice(0, 10);
  const h = hashStr(userId + "|" + day);
  return QUOTES[h % QUOTES.length];
}

export function quoteForContext(seed: string, delta: number): Quote {
  let themes: QuoteTheme[];
  if (delta > 3) themes = ["endurance", "discipline"];
  else if (delta < -3) themes = ["equanimity", "beginning"];
  else themes = ["discipline", "mortality"];
  const pool = QUOTES.filter((q) => themes.includes(q.theme));
  const list = pool.length ? pool : QUOTES;
  return list[hashStr(seed) % list.length];
}
