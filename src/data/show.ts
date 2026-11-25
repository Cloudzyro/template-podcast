// Everything about the show lives here: name, hosts, subscribe links and the
// newsletter. Episodes are Markdown files in src/content/episodes.

export const show = {
  name: "Night Ferry",
  tagline: "Conversations with people who work while the city sleeps",
  description:
    "Night Ferry is a weekly interview podcast with the people who keep a city running overnight: bakers, nurses, bridge operators, cleaners, dispatchers and the last bus driver home. New episodes every Thursday.",
  // Shown in the hero and the footer.
  schedule: "New episodes every Thursday",
  email: "hello@nightferry.example",
  guestEmail: "guests@nightferry.example",
  sponsorEmail: "sponsors@nightferry.example",
  author: "Odalys Prieto and Teo Lind",
  copyright: "Night Ferry Audio",
  language: "en-us",
  // Apple Podcasts category for the RSS feed.
  category: "Society &amp; Culture",
  subcategory: "Documentary",
  explicit: false,
  // Square cover art for podcast apps (at least 1400 x 1400), in public/.
  coverImage: "/cover.png",

  // Where people can follow the show. Replace the # with your show's links.
  // Leave a link empty ("") to hide it. The RSS link points to this site's own feed.
  subscribe: [
    { name: "Apple Podcasts", href: "#" },
    { name: "Spotify", href: "#" },
    { name: "Pocket Casts", href: "#" },
    { name: "Overcast", href: "#" },
    { name: "YouTube", href: "" },
  ],

  nav: [
    { label: "Episodes", href: "/episodes/" },
    { label: "Hosts", href: "/about/#hosts" },
    { label: "Be a guest", href: "/about/#guest" },
  ],

  hosts: [
    {
      name: "Odalys Prieto",
      initials: "OP",
      role: "Host and producer",
      bio: "Odalys spent nine years producing the overnight call-in show on a public radio station, which is where she learned that 3 a.m. callers tell the truth. She edits every episode and still answers the listener line herself.",
      shift: "Used to start at 23:00",
    },
    {
      name: "Teo Lind",
      initials: "TL",
      role: "Host",
      bio: "Teo worked the deck of the Harbor Line ferry for six winters before he started writing about it. He books most of the guests, usually by asking strangers what they're doing out so late.",
      shift: "Last crossing 01:15",
    },
  ],

  newsletter: {
    title: "The night log",
    text: "One email on Thursday morning with the new episode, a photo from the recording and a note from whoever was awake longest. No other mail.",
    button: "Subscribe",
  },

  guest: {
    title: "Be a guest",
    text: "Do you work between 10 p.m. and 6 a.m.? We'd like to hear about it. Tell us what you do and when, and we'll come to you, on your shift, with a small recorder and a thermos.",
  },

  sponsors: {
    title: "Support the show",
    text: "Night Ferry takes one sponsor per episode, read by the hosts. For rates and dates, write to us.",
  },

  footerNote: "Recorded on location, edited in the morning.",
};

export type Host = (typeof show.hosts)[number];
