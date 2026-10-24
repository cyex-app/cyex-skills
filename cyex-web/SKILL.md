---
name: cyex-web
description: Design system for cyex websites - landing pages, product pages, the cyex hub, 404s, release or download pages and other marketing-style web pages. Covers the near-black ground, Geist type scale, 3px buttons, mounts, section rhythm, nav, hero, motion rules and page structure, with a ready token file and starter page. Use whenever building or restyling a cyex web page that people read rather than operate. For dense tools (log viewer, request form, dashboards, settings) use cyex-app instead. Always read cyex-design first for the shared accent, mark, voice and formats.
---

# cyex web

The look of the cyex hub: a near-black ground, neutral greys, one blue accent kept for what matters, Geist type set large and tight, hairlines and mounts instead of boxes and gradients. Calm, precise, quiet motion.

**Read `cyex-design` first.** It holds the accent, the mark, theme switching, voice, and number/date formats. This skill adds the web layer.

## Start here

1. Copy [references/tokens.css](references/tokens.css) into the page. Use only its values.
2. Load Geist (400, 500, 600) without blocking first paint:
   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&display=swap" media="print" onload="this.media='all'">
   <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&display=swap"></noscript>
   ```
   Self-host (woff2, preloaded) when the project already self-hosts.
3. Build from the patterns in [references/components.md](references/components.md). For a new page, start from [assets/starter.html](assets/starter.html).

## The look in ten rules

1. **Dark by default**, ground `#08090c`. Light is white `#ffffff` with `#eef1f5` panels. No cream or off-white grounds.
2. **Accent only on:** the primary button, the lit bar of the mark, links and arrows, the live dot, a faint glow behind the hero or a CTA band. Nowhere else.
3. **One font, Geist**, weights 400/500/600 only. Headlines 600 with tight negative tracking. **No monospace** on marketing pages, not even for labels or numbers.
4. **Buttons and controls are 3px** (`--radius-btn`), the same shape as in the app, so a button looks the same on every cyex page. **No pill buttons.** Cards, mounts and frames keep the larger radii (18px outer, 10px inner).
5. **Every screenshot or embed sits in a mount**: an 8px padded frame with a hairline border, `--surface` fill and `--shadow`.
6. **Hairlines over boxes.** Structure comes from 1px `--border` rules, whitespace and alignment. No card inside a card.
7. **Section eyebrows are the mark**, not text in caps: an 18×16 mark with one bar lit beside the section name at 15px/500 muted. No numbered `01 / 02` labels, no uppercase or mono kickers, no italic accent words in headings.
8. **Motion is short and purposeful.** Press is `scale(.97)` over 0.1s. Hover is light, colour and a travelling arrow. Reveal once on scroll. Nothing follows the pointer: no magnetic buttons, no tilt, no cursor spotlights.
9. **A card or panel may lift on hover; a thing you click may not.** Clickables change colour and press; they don't rise.
10. **Performance is design.** Nothing on the first screen waits for a font, a script, a frame or a 3D scene. Targets: Lighthouse 100, CLS 0.

## Type

| Role | Size token | Line | Tracking | Weight | Notes |
|---|---|---|---|---|---|
| Hero h1 | `--t-h1` | .98 | -.045em | 600 | no full stop, max ~14ch |
| Section h2 | `--t-h2` | 1.02 | -.04em | 600 | max-width 16ch, ends with a full stop |
| Band h2 | `--t-h2-band` | 1.1 | -.03em | 600 | |
| Sub-title | `--t-h3-sub` | 1.1 | -.03em | 600 | |
| h3 | `--t-h3` (19px) | 1.3 | -.015em | 600 | |
| Lead | `--t-lead` | 1.55 | 0 | 400 | `--muted`, max 44ch |
| Body | `--t-body` (17px) | 1.6 | 0 | 400 | |
| Button | `--t-ui` (15px) | 1 | -.005em | 500 | |
| Nav link | `--t-nav` (14px) | 1 | 0 | 400 | `--muted` |
| Small print | `--t-small` / `--t-fine` | 1.5 | 0 | 400 | `--muted` |
| Figure | `--t-figure` | 1.05 | -.035em | 500 | `tabular-nums` |
| Big count | `--t-count` | 1 | -.045em | 500 | `tabular-nums` |

`text-wrap: balance` on headings, `pretty` on paragraphs.

## Layout

- Page width: the shared cyex wrapper from `cyex-design`, 1520px with 20px sides (`--page-max`, `--page-pad`); `.page` is its 1480px content column, `.wrap` the padded wrapper. Headlines and leads keep their own measures (16ch, 44ch), so wide screens get more room around the copy, not longer lines. Nav is 64px tall.
- Every section has `padding-top: var(--section-pad)`; the last one also gets bottom padding.
- Two-column sections use unequal `minmax(0, …fr)` columns (e.g. `.85fr / 1.15fr` copy beside a mount) with `gap: 40px 72px`, and stack below 900px.
- Breakpoints: 900 (two columns → one), 720 (nav folds into a menu), 520/480 (button rows become full-width grids).
- Page order for a product page: Nav, Hero, feature pairs (copy + mount, alternating), steps or figures, a CTA band, FAQ if needed, Footer. The hub page: Nav, Hero, one section per product, request band, Footer.

## Motion

| What | How |
|---|---|
| Press | `transform: scale(var(--press))` on `:active`, `var(--dur-press) ease-out` |
| Button hover | colour and border over `--dur-hover`; primary also `filter: brightness(1.08)` and a bigger glow |
| Link arrow | `translateX(3px)` over `--dur-move var(--ease)` |
| Nav on scroll | after `scrollY > 8`, fade in glass: `color-mix(in srgb, var(--bg) 78%, transparent)` + `backdrop-filter: blur(14px) saturate(1.4)` |
| Reveal | `opacity 0 → 1`, `translateY(28px) → 0`, `--dur-reveal var(--ease)`, `--stagger` between siblings, once |
| Theme | view transition cross-fade, `--dur-theme` |
| Live dot | lit and glowing, **not** pulsing |

Under reduced motion: reveals show immediately, clips show their final frame, the theme switch is instant, no smooth scroll. Under reduced transparency or `prefers-contrast: more`, the nav glass becomes solid with a `--border-strong` rule.

## Don't

- Pill buttons, gradient buttons, gradient text, glassmorphism cards.
- Magnetic or tilting elements, cursor spotlights, parallax, scroll-jacking.
- Grain, noise, blobs, or decorative gradients beyond one soft accent glow.
- Emoji, uppercase eyebrows, numbered section labels, monospace labels.
- Stock images, illustrations of the product, fake UI. Show the real thing in a mount.
- A second accent colour (orange, acid yellow and the like belong to the frozen "alt" experiment only).
