---
name: cyex-design
description: The shared cyex brand and design language - accent colours, the three-bar mark, theme switching, number and date formats, accessibility floors and UI copy voice. Use for ANY cyex work that has a visual or written surface (websites, web tools, the desktop app, favicons, OG images, docs, release notes, UI strings), and whenever the user mentions cyex, cyex deck, cyex logs or cyex hub. Read it together with cyex-web (landing and marketing pages) or cyex-app (desktop app and dense web tools); this skill holds what both share.
---

# cyex design: the shared core

cyex is a family of Twitch (and Kick) tools: **cyex deck** (Windows desktop app), **cyex logs** (chat log viewer), and the **cyex hub** front page that ties them together. Every surface should read as one brand. This skill is the part they all share; two companion skills cover the two surface types:

| You are building | Read |
|---|---|
| A landing page, product site, hub page, 404, docs front, OG image | `cyex-web` |
| The desktop app, a web tool (log viewer, request form, VOD finder), a dashboard, settings, any dense UI | `cyex-app` |
| Copy, release notes, favicon, logo use only | this skill is enough |

When a project's own `CLAUDE.md` is more specific than these skills, follow the project. When they conflict on a shared rule below, the shared rule wins and the project should be brought in line.

## Non-negotiables

1. **Accent:** `#145aff` in dark, `#14e6ff` in light. Never set text in the raw light accent (cyan on white is ~1.4:1); text uses `--accent-text`. Full token set in [references/color.md](references/color.md).
2. **Dark is the default theme.** Light is a full peer, not an afterthought: every colour has a light value chosen for contrast, not a mirrored one.
3. **The accent is rare.** It marks the one primary action, the lit middle bar of the mark, links, and what is selected. Never decoration, never large fills, never gradients of it across a page.
4. **The mark** is three square bars; only the middle one takes the accent. No glow, no rounding, no skew. See [references/brand.md](references/brand.md).
5. **Numbers and dates** follow the owner's rule: `1.000.000`, `1,5 MB`, `1,2K`, `2026/10/23`, 24-hour time.
6. **Copy** reads like a person wrote it: sentence case, short, concrete, no emoji, no exclamation marks, no hype. See [references/voice.md](references/voice.md).
7. **Every motion has a reduced-motion branch**, every colour pair meets WCAG AA, and nothing depends on a third-party request to render the first screen.

## Brand names

- Product names are always lowercase, even at the start of a sentence or in a title: `cyex`, `cyex deck`, `cyex logs`.
- Page titles: `<Page> - cyex <product>` (e.g. `VOD finder - cyex logs`). The product's home page is just its name, optionally with a short descriptor: `cyex deck · A light Twitch app for Windows`.
- Footers say the project is independent: "Not affiliated with, endorsed by, or sponsored by Twitch." Add Kick when Kick appears.

## Theme switching (same mechanism everywhere)

- `data-theme="light"` on `<html>` selects light; no attribute (or `dark`) is dark.
- An inline script in `<head>` sets the attribute **before first paint** from `localStorage`, so there is never a flash. Without a stored choice, dark is the default (marketing pages may follow `prefers-color-scheme` instead; tools stay dark).
- Every page ships `<meta name="color-scheme" content="dark light">` and a `theme-color` meta matching the page ground.
- A toggle may cross-fade with `document.startViewTransition` (0.32 s on web, 0.15 s in the app), skipped under reduced motion.
- Favicons: `favicon.svg` follows `prefers-color-scheme` on its own; when the site theme differs from the OS, pin `favicon-dark.svg` / `favicon-light.svg`.

```html
<script>
  (function () {
    try { if (localStorage.getItem('cyexTheme') === 'light') document.documentElement.dataset.theme = 'light'; } catch (e) {}
    document.documentElement.classList.add('js');
  })();
</script>
```

## Accessibility floors (all surfaces)

- Text contrast ≥ 4.5:1, large text and UI parts ≥ 3:1, in **both** themes. The secondary-text tokens were tuned for this; don't lighten them.
- Dim with colour, not opacity, wherever the result is still meant to be read.
- `:focus-visible` always shows a 2px ring (see the companion skill for its colour); never `outline: none` without a replacement.
- `prefers-reduced-motion: reduce`: entrances become plain fades or nothing, loops stop, smooth scroll is off. Read the query at the moment you animate, not once at load.
- `prefers-reduced-transparency` and `prefers-contrast: more`: glass becomes solid, borders get stronger.
- Hit targets at least 32px in the app, 40px on the web. Icon-only buttons get an `aria-label` (and a tooltip in the app).
- Never convey state by colour alone: the toggle has an "on" tick, toasts have a text lead, the live dot has a label.

## Icons

- Line icons on a 24 grid, `stroke="currentColor"`, `fill="none"`, round caps and joins. Lucide paths are the source (ISC licence); stroke 1.8 in the app, 1.6-1.75 on the web.
- Inline SVG only. No icon fonts, no emoji as icons, no third-party brand marks except platform logos (Twitch `#9146ff`, Kick `#53fc18`) where the platform itself is meant.
- Icons inherit colour from their text; size them to the text (14-16px in controls, 18px in large buttons).

## Imagery

- Real captures of the real product only, never mockups or stock. Replace real viewer names with made-up ones (`lumen_fox`, `quietoak`, `nora_byte`, `pixelmoth`).
- Every screenshot has a `-dark` and `-light` version and swaps with the theme.
- AVIF with WebP fallback; clips are muted looping WebM with MP4 fallback, `preload="none"`, play only while on screen, and show a still under reduced motion.

## Before you finish

- [ ] Only tokens, no stray hex values, radii, durations or font sizes outside the token file.
- [ ] Checked in both themes, and with reduced motion on.
- [ ] Accent used only for primary action, mark, links, selection.
- [ ] Copy passes [references/voice.md](references/voice.md): sentence case, numbers and dates in cyex format, no emoji.
- [ ] Tested in a browser (or the app) before reporting it done.
