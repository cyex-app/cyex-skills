---
name: cyex-docs
description: Docs and API reference pages in the cyex style, modelled on the cyex logs API docs - a sticky, filterable index on the left whose highlighted entry follows the reader and keeps itself in view scrolling down as well as up, guide sections, endpoint blocks with parameters and responses beside a sticky code-sample panel with language tabs and copy buttons. Includes the layout CSS, a framework-free behaviour script and a working starter page. Use whenever building, restyling or extending documentation, an API reference, a developer guide, a changelog or help pages for any cyex product.
---

# cyex docs

Documentation pages that look and behave like the cyex logs API reference: quiet, dense, square, fast to scan, and always telling the reader where they are.

**Read first:** `cyex-design` (voice, formats, accent rules) and `cyex-app` (palette and controls: docs use the web-tool density). This skill adds the docs layout and behaviour.

## Files

| File | What |
|---|---|
| [references/docs.css](references/docs.css) | The whole docs layout: header, shell, index, guides, endpoints, sample panel, breakpoints. Load after `cyex-app/references/tokens.css`. |
| [references/behaviour.js](references/behaviour.js) | `initDocs()`: scroll-spy, the two-way index follow, independent column scrolling, Ctrl/Cmd+K filter, shared language tabs, copy buttons. No framework; returns a cleanup function. |
| [assets/starter.html](assets/starter.html) | A complete working page built from the two files above and the cyex-app tokens. Start every new docs page from it. |

Svelte projects: keep `docs.css` global (in the HTML shell or a global stylesheet), render sections and index entries from a data file (`spec.js`, `guides.js`), and call `initDocs()` inside an `$effect` after they render, returning its cleanup.

## Layout

- **Header** (sticky, flat `--bg`, bottom hairline, max 1520px): the mark and product name, uppercase nav links (Logs, Docs, …) with the 2px accent underline on the current page, theme toggle on the right.
- **Shell**: `272px` index + body, max 1520px.
- **Index** (`aside.docs-nav`): sticky under the header at full remaining height, its own scroll. A filter at the top ("Find an endpoint", `Ctrl K` / `⌘K` hint, round clear ×). Then groups: a *Notes* group for guide sections, then one group per endpoint category. Entries are 5px 8px, .82rem, muted; the active one is `--surface-hover`, 600, with a 2px accent rung on the rail's left edge (the only accent in the index). Endpoint entries carry a 46px mono method chip: GET grey, POST/PUT/PATCH green, DELETE red, WS yellow.
- **Body**: title (2rem/700) with a one-line lede and an optional live stat chip; guide sections capped at 820px (h2 1.32rem, prose .92rem/1.7 muted, base-URL strip, format grids, notes as plain panels, never warning colours); then endpoint groups under uppercase hairline titles.
- **Endpoint** (`section.op`): two columns. Left: method chip, title, "Restricted" chip if it needs a key, the full path in a mono strip with the host dimmed, description, parameters grouped Path → Query → Headers → Request body (name 600, type mono dim, "required" red uppercase, default, enum chips), then Responses with a green pip for the success code and grey for the rest. Right: the sample panel, sticky per endpoint: request block with language tabs and a copy icon, response block with status, content type and copy.
- **Footer**: centred, .76rem dim, the product's credits and non-affiliation note, links underlined in `--border-strong`.
- **Breakpoints**: ≤ 1180px the sample panel drops under its endpoint; ≤ 900px the index stacks above the body (max 220px, no shortcut hint); ≤ 620px format grids stack.

Corners: 0 on panels, code blocks, strips and the filter; 3px on chips, tabs, paths and buttons.

## Behaviour (all in behaviour.js)

**Scroll-spy.** The active entry is the last section whose top has passed under the header (offset 80px, matching `scroll-margin-top: 80px` on sections). Offsets are measured once and on resize (plus a `ResizeObserver` on the body, since fonts and samples change heights), compared with `scrollY` in a `requestAnimationFrame`. At the very end of the page the last section counts as reached. A deep link lights its entry at once. Don't use an IntersectionObserver band: at a crossing it lights the section you're leaving.

**The index follows the reader, both ways.** This is the behaviour to keep:
- When the active entry changes, the index scrolls so the entry (with its group heading when it's the group's first entry) sits inside a band around the middle of the rail (25%-60% of its height). If it's already inside, nothing moves.
- When it leaves the band, it's brought to 35% from the top, smoothly (instantly under reduced motion).
- At the top of the page the index goes all the way to its top; at the end of the page, all the way to its end.
- So the categories travel down with the reader exactly as they travel back up. The earlier version only moved when the entry hit the rail's edge, so going down the index stayed parked at the top for most of the page.
- If the reader has just scrolled the index by hand (wheel, touch or drag within the last 1,2 s), it's left where they put it until the next section change. Clicking an entry is not a manual scroll.
- In the stacked layout (≤ 900px) the index isn't beside the text, so it doesn't follow.

**Two columns, two scrolls.** The column under the pointer is the one that moves: the index has `overscroll-behavior: contain`, and a non-passive wheel guard stops the search box, padding or a short filtered list from scrolling the page.

**Filter.** Ctrl/Cmd+K focuses and selects it; Escape clears and blurs. Entries match on their own text plus `data-search` (put the path there); a group heading never matches on its own; empty groups hide; "Nothing matches “…”." when none are left.

**Samples.** One language for the whole page, remembered in `localStorage`; switching it on one endpoint switches all of them. Copy turns the icon into a green check for 1,6 s, next to the button (no toast).

**Jumps.** In-page links travel with `scroll-behavior: smooth` (auto under reduced motion); `scrollbar-gutter: stable` so the column doesn't shift between pages.

## Writing docs

- Page title `API - cyex logs` (or `<Page> - cyex <product>`); `og:title` without the product name.
- The lede says what this is in one line: "rustlog's HTTP API, as run here."
- Guides first (Basics, then how-tos), endpoints after, grouped by what they act on.
- Endpoint titles are short verb phrases in sentence case: "Get channel logs", "Search user logs".
- Say what isn't obvious from the parameters; don't restate the table in prose.
- Examples are real requests that work against the real host, with realistic values.
- Numbers and dates in cyex format (`1.000`, `2026/10/23`); no emoji; notes are plain panels, not warnings.

## Checklist

- [ ] Every index entry has a matching `section[id]`, in the same order.
- [ ] Scroll the whole page down and back up at 1440×800 and 1920×1080: the lit entry stays in the index's middle band both ways, and the index reaches its top and its end with the page.
- [ ] Deep link to an entry near the bottom: it's lit and visible on load.
- [ ] Filter, Ctrl/Cmd+K, Escape, the clear ×, and the empty message work.
- [ ] Language choice sticks across endpoints and reloads; copy shows the check.
- [ ] Both themes, reduced motion (no smooth scrolling anywhere), 1180 / 900 / 620 breakpoints.
