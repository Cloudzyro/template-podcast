import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// One Markdown file per episode in src/content/episodes. The file name becomes
// the episode's address, for example /episodes/the-bread-shift/.
const episodes = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/episodes" }),
  schema: z.object({
    title: z.string(),
    number: z.number(),
    season: z.number(),
    date: z.coerce.date(),
    // Length of the full episode as shown on the site, like "47:12" or "1:02:30".
    duration: z.string(),
    // The time of night the conversation was recorded, 24-hour clock.
    shift: z.string(),
    guest: z.object({ name: z.string(), role: z.string(), place: z.string() }),
    summary: z.string(),
    // Cover scene drawn in code: harbor, bakery, ward, bridge, radio, signal, laundry or bus.
    cover: z.enum(["harbor", "bakery", "ward", "bridge", "radio", "signal", "laundry", "bus"]),
    audio: z.object({
      url: z.string(),
      // File size in bytes and type, used by the RSS feed.
      bytes: z.number(),
      type: z.string().default("audio/mpeg"),
    }),
    // Optional: an embed address (Spotify, YouTube or your host's player). It
    // only loads when a visitor clicks to load it.
    embedUrl: z.string().optional(),
    chapters: z.array(z.object({ time: z.string(), title: z.string() })).default([]),
    links: z.array(z.object({ label: z.string(), href: z.string() })).default([]),
  }),
});

export const collections = { episodes };
