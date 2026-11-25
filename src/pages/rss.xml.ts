// The podcast feed that apps subscribe to. Submit https://your-site/rss.xml
// to Apple Podcasts, Spotify and the rest.
import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { show } from "../data/show";
import { getEpisodes, episodeUrl, toSeconds } from "../lib/episodes";

const esc = (s: string) => s.replace(/&(?!amp;)/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const GET: APIRoute = async ({ site }) => {
  const episodes = await getEpisodes();
  const base = site ?? new URL("https://example.com");
  return rss({
    title: show.name,
    description: show.description,
    site: base,
    xmlns: { itunes: "http://www.itunes.com/dtds/podcast-1.0.dtd" },
    customData: [
      `<language>${show.language}</language>`,
      `<copyright>${esc(show.copyright)}</copyright>`,
      `<itunes:author>${esc(show.author)}</itunes:author>`,
      `<itunes:image href="${new URL(show.coverImage, base)}"/>`,
      `<itunes:category text="${show.category}"><itunes:category text="${show.subcategory}"/></itunes:category>`,
      `<itunes:explicit>${show.explicit ? "true" : "false"}</itunes:explicit>`,
      `<itunes:type>episodic</itunes:type>`,
      `<itunes:owner><itunes:name>${esc(show.author)}</itunes:name><itunes:email>${show.email}</itunes:email></itunes:owner>`,
    ].join(""),
    items: episodes.map((ep) => ({
      title: ep.data.title,
      description: ep.data.summary,
      pubDate: ep.data.date,
      link: episodeUrl(ep),
      enclosure: {
        url: new URL(ep.data.audio.url, base).toString(),
        length: ep.data.audio.bytes,
        type: ep.data.audio.type,
      },
      customData: [
        `<itunes:duration>${toSeconds(ep.data.duration)}</itunes:duration>`,
        `<itunes:episode>${ep.data.number}</itunes:episode>`,
        `<itunes:season>${ep.data.season}</itunes:season>`,
        `<itunes:episodeType>full</itunes:episodeType>`,
      ].join(""),
    })),
  });
};
