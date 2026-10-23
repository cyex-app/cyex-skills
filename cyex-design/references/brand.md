# The cyex mark

Three bars on a 32×32 grid. The outer two are ink; only the middle one takes the accent. Square corners, no glow, no skew, no outline.

| Bar | x | y | w | h | Fill |
|---|---|---|---|---|---|
| Top | 3 | 5 | 15 | 6 | ink |
| Middle | 10 | 13 | 18 | 6 | accent |
| Bottom | 3 | 21 | 15 | 6 | ink |

Ink is `#e8e8ea` on dark and `#1b1c20` on light (`--mark-ink`). Middle is `--accent` (`#145aff` / `#14e6ff`; Kick `#45ca16` / `#53fc18`).

## SVG

Inline, themed by CSS (preferred in pages):

```html
<svg class="mark" viewBox="3 5 25 22" width="22" height="19" aria-hidden="true">
  <rect x="3" y="5" width="15" height="6" fill="var(--mark-ink)"/>
  <rect x="10" y="13" width="18" height="6" fill="var(--accent)"/>
  <rect x="3" y="21" width="15" height="6" fill="var(--mark-ink)"/>
</svg>
```

`viewBox="3 5 25 22"` crops to the bars for inline use next to a wordmark; use `0 0 32 32` for favicons and app icons.

Adaptive favicon (`favicon.svg`):

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <style>
    .ink{fill:#1b1c20}.mid{fill:#14e6ff}
    @media (prefers-color-scheme:dark){.ink{fill:#e8e8ea}.mid{fill:#145aff}}
  </style>
  <rect class="ink" x="3" y="5" width="15" height="6"/>
  <rect class="mid" x="10" y="13" width="18" height="6"/>
  <rect class="ink" x="3" y="21" width="15" height="6"/>
</svg>
```

Ship alongside: `favicon-dark.svg`, `favicon-light.svg` (fixed colours, pinned when the site theme differs from the OS), `mask-icon.svg` (no fills), and PNGs at 16-512px. The originals live in `cyex logs frontend/logo/`.

## Lockup

- Mark + lowercase wordmark, gap 8-10px. Web: Geist 600, 17px, `-.01em`. App and tools: IBM Plex Sans 700, ~1.04rem.
- The wordmark is just `cyex`; a product lockup adds the product name in the same weight: `cyex deck`, `cyex logs`.
- In page headers the lockup links to `https://cyex.app`.
- Pure-CSS variant (tools, where an SVG is overkill): a 25×22 box with three `<i>` bars, 15×6 at top 0 and 16, the middle 18×6 at top 8 / left 7 in `--accent`.

## Section marker (web)

Section eyebrows on the web reuse the mark: an 18×16 mark with only one bar lit, beside the section name. See `cyex-web`.

## Don't

- Don't round, skew, outline, glow or animate the bars (the hub's 3D chrome hero is the one sanctioned exception).
- Don't colour the outer bars with the accent, or the middle bar with anything but the accent.
- Don't put the mark on a busy background or inside a coloured circle.
