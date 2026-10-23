# cyex web components

All values reference [tokens.css](tokens.css). Patterns come from the cyex hub (`cyex hub/Claude/index.html`, `src/home/*`).

## Skip link

```css
.skip { position: fixed; left: 12px; top: -60px; z-index: 100; padding: 10px 16px;
  background: var(--text); color: var(--bg); border-radius: var(--radius-btn); font-size: var(--t-ui); }
.skip:focus { top: 12px; }
```

## Nav

Fixed, 64px, transparent at the top, glass once scrolled. The bar never changes size, so scrolling never causes layout.

```css
.nav { position: fixed; inset: 0 0 auto; z-index: 50; height: var(--nav-h);
  display: flex; align-items: center; gap: 28px;
  padding: 0 max(var(--gutter), (100% - 1200px) / 2);
  transition: background-color var(--dur-move); }
.nav.scrolled { background: color-mix(in srgb, var(--bg) 78%, transparent);
  backdrop-filter: blur(14px) saturate(1.4); }
.nav::after { content: ''; position: absolute; inset: 100% 0 auto; height: 18px; pointer-events: none;
  background: linear-gradient(color-mix(in srgb, var(--bg) 55%, transparent), transparent);
  opacity: 0; transition: opacity var(--dur-move); }
.nav.scrolled::after { opacity: 1; }
.brand { display: flex; align-items: center; gap: 9px; font-size: 17px; font-weight: 600; letter-spacing: -.01em; }
.nav-links { margin-left: auto; display: flex; gap: 2px; }
.nav-links a { padding: 8px 10px; font-size: var(--t-nav); color: var(--muted);
  border-radius: var(--radius-btn); transition: color var(--dur-color), transform var(--dur-press) ease-out; }
.nav-links a:hover { color: var(--text); }
.nav-links a:active { transform: scale(.96); }
.nav-rule { width: 1px; height: 20px; background: var(--border-strong); }
@media (prefers-reduced-transparency: reduce), (prefers-contrast: more) {
  .nav.scrolled { background: var(--bg); backdrop-filter: none; border-bottom: 1px solid var(--border-strong); }
  .nav::after { display: none; }
}
```

Order: brand (links to `https://cyex.app`), then section links on the right (quiet, no ground on hover), a hairline rule, the theme toggle, and a menu button that shows only below 720px. Set `.scrolled` when `scrollY > 8`. No ruled line under the bar at rest.

Phone menu: a panel at `top: var(--nav-h)`, `--bg` ground, bottom hairline, links 16px with 12px padding. Opens with opacity and `translate: 0 -8px` over `--dur-hover`.

## Theme toggle

38×38, `--radius-btn`, 1px `--border`, transparent, `--muted` icon (17px line sun/moon, stroke 1.6). Hover: `--text`, `--border-strong`, `--surface-2`. Press `scale(.94)`. Wrap the switch in `document.startViewTransition` unless reduced motion.

## Buttons

```css
.btn { display: inline-flex; align-items: center; justify-content: center; gap: 10px;
  height: 48px; padding: 0 20px; border-radius: var(--radius-btn);
  font-size: var(--t-ui); font-weight: 500; letter-spacing: -.005em; white-space: nowrap;
  border: 1px solid var(--border-strong); background: var(--surface); color: var(--text);
  transition: background-color var(--dur-hover), border-color var(--dur-hover),
    box-shadow var(--dur-hover), filter var(--dur-hover), transform var(--dur-press) ease-out; }
.btn:hover { border-color: var(--muted); background: var(--surface-2); }
.btn:active { transform: scale(var(--press)); }
.btn-primary { background: var(--accent); border-color: var(--accent); color: var(--accent-ink);
  box-shadow: 0 10px 30px -12px var(--accent-glow); }
.btn-primary:hover { background: var(--accent); border-color: var(--accent);
  filter: brightness(1.08); box-shadow: 0 14px 40px -10px var(--accent-glow); }
.btn .arrow { transition: transform var(--dur-move) var(--ease); }
.btn:hover .arrow { transform: translateX(3px); }
.btn-s { height: 38px; padding: 0 14px; }
.actions { display: flex; flex-wrap: wrap; gap: 12px; }
@media (max-width: 480px) { .actions { display: grid; } }
```

- Two variants only: primary (accent) and default (quiet). One primary per view.
- Arrow icon: 16×16, stroke 1.6, path `M3 8h10M9 4l4 4-4 4`.
- Text links that travel: `--accent-text`, weight 500, with the same arrow: "Open the logs →".

## Kicker (section eyebrow)

The mark with one bar lit, beside the section name. Not uppercase, not mono.

```html
<p class="kicker">
  <svg viewBox="3 5 25 22" width="18" height="16" aria-hidden="true">
    <rect x="3" y="5" width="15" height="6" fill="var(--border-strong)"/>
    <rect x="10" y="13" width="18" height="6" fill="var(--accent)"/>
    <rect x="3" y="21" width="15" height="6" fill="var(--border-strong)"/>
  </svg>
  cyex logs
</p>
```

```css
.kicker { display: flex; align-items: center; gap: 10px; margin: 0 0 22px;
  font-size: var(--t-ui); font-weight: 500; color: var(--muted); }
```

Light a different bar to mark position (top for the first product, middle for the second, …): unlit bars `--border-strong`, the lit outer bar `--mark-ink`, the lit middle bar `--accent`.

## Section head

```html
<header class="head">
  <p class="kicker">…</p>
  <h2>Chat history that outlives the VOD.</h2>
  <p class="lead">Search any logged channel by user, date or text, and jump to the moment.</p>
</header>
```

```css
.head h2 { font-size: var(--t-h2); line-height: 1.02; letter-spacing: -.04em; max-width: 16ch; }
.lead { margin-top: 20px; font-size: var(--t-lead); line-height: 1.55; color: var(--muted); max-width: 44ch; }
.head .actions { margin-top: 32px; }
```

## Hero

Centred column: optional small line above, the h1 (no full stop, no lede by default on the hub), then actions, then the product shot in a mount.

```css
.hero { padding: calc(var(--nav-h) + clamp(40px, 6vw, 96px)) 0 clamp(48px, 6vw, 72px); text-align: center; }
.hero h1 { font-size: var(--t-h1); line-height: .98; letter-spacing: -.045em; max-width: 14ch; margin-inline: auto; }
.hero .actions { justify-content: center; margin-top: 36px; }
.hero .mount { margin-top: clamp(40px, 5vw, 64px); }
```

The headline is the LCP element: if it animates in, use transform only, never opacity or blur. A faint glow behind the shot is allowed: `radial-gradient(60% 45% at 50% 30%, var(--accent-glow), transparent 70%)` at opacity ≤ .7.

## Mount

Every picture, clip or live embed sits in one.

```css
.mount { padding: 8px; border: 1px solid var(--border); border-radius: var(--radius-l);
  background: var(--surface); box-shadow: var(--shadow); }
.mount > img, .mount > video, .mount > picture img, .mount > iframe {
  display: block; width: 100%; height: auto; border-radius: var(--radius-in); }
```

Give images `width`/`height` attributes (no CLS), `-dark`/`-light` variants, and `loading="lazy"` below the fold. A mount may lift on hover (`translate: 0 -3px` over `--dur-move`) when the whole mount is a link.

## Pair (copy beside a mount)

```css
.pair { display: grid; grid-template-columns: minmax(0, .85fr) minmax(0, 1.15fr);
  gap: 40px 72px; align-items: center; margin-top: clamp(88px, 10vw, 140px); }
.pair.flip > :first-child { order: 2; }
@media (max-width: 900px) { .pair { grid-template-columns: minmax(0, 1fr); } .pair.flip > :first-child { order: 0; } }
```

Feature points inside the copy: a 3×14px accent bar (radius 1px) at `top: .36em` before a bold title and a muted 16px line.

## Steps

Three columns, each with a `border-top: 1px solid var(--border-strong)` and 20px top padding; h3 at 19px; muted 16px body. No numbers in circles.

## Figures

A 2×2 grid ruled by hairlines. `dt` at `--t-figure` 500 `tabular-nums`; `dd` 15px muted with the source. Numbers in cyex format: "0,4 s", "150 MB".

```css
.figures { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); border-top: 1px solid var(--border); }
.figures > div { padding: 24px 24px 24px 0; border-bottom: 1px solid var(--border); }
.figures dt { font-size: var(--t-figure); line-height: 1.05; letter-spacing: -.035em; font-weight: 500; font-variant-numeric: tabular-nums; }
.figures dd { margin: 6px 0 0; font-size: 15px; color: var(--muted); }
@media (max-width: 520px) { .figures { grid-template-columns: minmax(0, 1fr); } }
```

## Band (call to action)

```css
.band { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 24px 40px;
  padding: clamp(32px, 5vw, 56px); border-radius: var(--radius-l); border: 1px solid var(--border);
  background: radial-gradient(120% 140% at 100% 0%, color-mix(in srgb, var(--accent) 16%, transparent), transparent 60%), var(--surface); }
.band h2 { font-size: var(--t-h2-band); line-height: 1.1; letter-spacing: -.03em; }
```

## Live caption

Under a live embed: 15px muted, gap 9px, a 7px accent dot with `box-shadow: 0 0 10px var(--accent-glow)` (lit, not blinking), the channel name as a link underlined in `--border-strong` at offset 3px that turns `currentColor` on hover.

## FAQ

Native `<details name="faq">` (exclusive), hairline separators, summary min-height 64px at 17px/600, answer `--muted` max 40rem, opening over `--dur-hover` with `interpolate-size: allow-keywords`. Answers start with "Yes." / "No." / "Not yet."

## Footer

```css
.footer { border-top: 1px solid var(--border); }
.footer .top { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 24px; padding: 40px 0 32px; }
.footer .links { display: flex; flex-wrap: wrap; gap: 8px 28px; font-size: 14.5px; color: var(--muted); }
.footer .links a:hover { color: var(--text); }
.footer .base { border-top: 1px solid var(--border); padding: 20px 0 36px; font-size: var(--t-fine); color: var(--muted); }
```

The base line holds the non-affiliation note and `© <year> seryxx`.

## Segmented control

A 3px-cornered track (`padding: 4px`, 1px border, `--surface`, radius `calc(var(--radius-btn) + 4px)`) with a sliding marker (`--surface-2`, `--border-strong` border, `translateX(calc(var(--at) * 100%))` over .32s). Buttons 40px tall, 14.5px/500, muted; the pressed one gets `--text` and `aria-pressed="true"`. The accent is not used.

## 404

Centred, `--t-h1`-sized "Nothing here." (clamped smaller: `clamp(44px, 7vw, 96px)`), one muted line saying what happened, one primary button "Back to the front page →".
