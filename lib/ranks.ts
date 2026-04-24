import type { Rank } from "./types";

export const RANKS: Rank[] = [
  {
    id: "kouros",
    min: 0,
    max: 30,
    title: "Initiate",
    statue: "The Kouros",
    meaning: "Raw marble — the journey begins.",
  },
  {
    id: "hermes",
    min: 31,
    max: 50,
    title: "Student",
    statue: "Hermes",
    meaning: "Messenger of the gods — speed and discipline.",
  },
  {
    id: "ares",
    min: 51,
    max: 70,
    title: "Warrior",
    statue: "Ares",
    meaning: "God of war — strength emerging.",
  },
  {
    id: "apollo",
    min: 71,
    max: 85,
    title: "Champion",
    statue: "Apollo",
    meaning: "God of light — balance and proportion.",
  },
  {
    id: "herakles",
    min: 86,
    max: 95,
    title: "Ideal",
    statue: "Herakles",
    meaning: "Mortal hero made divine through labor.",
  },
  {
    id: "zeus",
    min: 96,
    max: 100,
    title: "Perfection",
    statue: "Zeus",
    meaning: "King of the gods — mastery achieved.",
  },
];

export function rankFor(score: number): Rank {
  const s = Math.max(0, Math.min(100, Math.round(score)));
  return RANKS.find((r) => s >= r.min && s <= r.max) ?? RANKS[0];
}
