# Unslop pass

Done with the unslop skill (unslop by Damir Sokolovsky, @heydamir, CC BY 4.0) on November 25, 2026, right after the first build.

## Audit

Slop level: light. The template was built with a direction already (ink ramp, one sodium amber, drawn night scenes), so this was polish mode. Signs found:

- Translucent sticky header with a backdrop blur (`Header.astro`), a glass effect that adds nothing on a dark page
- The amber signature (the shift clock) spread to places that aren't recordings: the hosts' old shift times on About and a "04:04" on the 404 page, so it stopped meaning one thing
- Hero: the latest episode's cover art was a 220px thumbnail inside a small card, with a dead band under the hero on desktop; the one moment on the page was the smallest thing in it
- Buttons and the "All 8 episodes" link wrapping onto two lines on phones ("Play episode / 8")
- Grids collapsing to `1fr` instead of `minmax(0, 1fr)`, so the RSS address pushed the page 5px wider than a 360px phone (home and episode pages)
- A one-word last line on the episodes page intro ("first.")
- Episode rows: a 40px number column plus a 20px gap left the episode number floating away from its title
- Episode page cover drawn as a full square, pushing the player below the first screen

None of the heavier signs: no gradients on chrome, no gradient text, no glows, no emoji, no uppercase tracked labels, no pill badges above the headline, no hover scale, no looping motion, headings at 500.

## Direction

- Product: Night Ferry, a weekly interview podcast with people who work overnight, recorded on location during their shift
- Character: low-lit, patient, plain-spoken
- World: a city after midnight: harbor water, lit shop windows, sodium streetlights, the last bus
- Moments: each episode's drawn night scene with its lit windows, shown large with the player under it; the waveform filling with amber as it plays
- Signature: the shift clock, the time of night each conversation was recorded, in amber mono, on episodes only

## Changes

- Spacing: hero fills the first screen and centers its two columns; episode row number column 24px so the number sits with its title; episode cover 5:4 so the player is on the first screen
- Color: the amber is limited to the primary actions, the waveform progress, chapter times and the shift clock; host shift times and the 404 code moved to muted mono
- Copy: nothing invented; buttons and labels without trailing periods, search placeholder is just "Search", status text "Sending"
- Type: buttons and section links never wrap; `text-wrap: pretty` on intro paragraphs
- Layout: latest episode card now leads with its cover across the full card width (16:10), then title, guest and player; `minmax(0, 1fr)` everywhere a grid collapses, so nothing overflows at 360px
- Details: header is a solid surface with a hairline instead of blurred glass
- Visuals: bakery scene given window mullions, a sign board and a street lamp so it reads at hero size
- Motion: only color changes on hover and a 0.98 press; no entrances or loops

screenshot-2: episode page (The bread shift) with cover art, player and the shift clock
screenshot-3: All episodes page, season 2, with search and the episode rows
