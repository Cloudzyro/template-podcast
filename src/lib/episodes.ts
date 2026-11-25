import { getCollection, type CollectionEntry } from "astro:content";

export type Episode = CollectionEntry<"episodes">;

/** All episodes, newest first. */
export async function getEpisodes(): Promise<Episode[]> {
  const all = await getCollection("episodes");
  return all.sort((a: Episode, b: Episode) => b.data.date.getTime() - a.data.date.getTime());
}

export const episodeUrl = (ep: Episode) => `/episodes/${ep.id}/`;

export function formatDate(date: Date, style: "long" | "short" = "long") {
  return date.toLocaleDateString("en-US", {
    month: style === "long" ? "long" : "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** "47:12" or "1:02:30" to seconds. */
export function toSeconds(time: string) {
  return time
    .split(":")
    .map(Number)
    .reduce((total, part) => total * 60 + part, 0);
}

/** "48:12" to "48 min". */
export function minutes(duration: string) {
  return `${Math.round(toSeconds(duration) / 60)} min`;
}

/** A waveform that's the same every build for the same episode. */
export function waveform(seed: string, count = 72) {
  let h = 2166136261;
  for (const ch of seed) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  const rand = () => ((h = Math.imul(h ^ (h >>> 15), 2246822507) >>> 0) / 4294967296);
  const bars: number[] = [];
  let level = 0.5;
  for (let i = 0; i < count; i++) {
    level += (rand() - 0.5) * 0.45;
    level = Math.min(0.95, Math.max(0.2, level));
    bars.push(Math.round((level * 0.75 + rand() * 0.25) * 100) / 100);
  }
  return bars;
}
