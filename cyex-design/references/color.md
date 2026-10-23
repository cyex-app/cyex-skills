# cyex colour

The accent tokens below are identical on every cyex surface. The page grounds and greys differ by surface type and live in the companion skills (`cyex-web` near-black, `cyex-app` warm grey). Source of truth: the live cyex logs frontend (`cyex logs frontend/svelte/index.html`), whose palette the desktop app shares value for value.

## Accent

| Token | Dark | Light | Use |
|---|---|---|---|
| `--accent` | `#145aff` | `#14e6ff` | Fills: primary button, selected day, slider fill, lit bar of the mark |
| `--accent-2` | `#2a6aff` | `#10c9e6` | Hover of an accent fill |
| `--accent-text` | `#7ea4ff` | `#046a82` | Links, accent-coloured words, active tab text. **The only accent allowed on text.** |
| `--accent-ink` | `#ffffff` | `#00232b` | Text and icons on an accent fill |
| `--accent-dim` | `rgba(20,90,255,.14)` | `rgba(4,106,130,.08)` | Selected row or option background |
| `--accent-wash` | `rgba(20,90,255,.22)` | `rgba(4,106,130,.16)` | Pressed or drop-target background |
| `--accent-border` | `rgba(20,90,255,.55)` | `rgba(4,106,130,.4)` | Focused field border, web-tool focus ring |
| `--accent-glow` (web only) | `rgb(20 90 255 / .35)` | `rgb(20 230 255 / .4)` | Primary-button shadow, hero glow, live dot |

Note the light tints (`dim`, `wash`, `border`) are built from the dark teal `#046a82`, not from the cyan: cyan tints vanish on white.

### Where the accent goes, and where it doesn't

Allowed: the one primary button per view, the mark's middle bar, links, the selected state of a control, the progress or quota fill, a focused field's border, the live dot on the web.

Not allowed: headings, body words for emphasis, section backgrounds, card borders at rest, icons that aren't selected, gradients across a page, chips and badges (those use `--neutral-chip`), the keyboard focus ring in the desktop app (accent can be user-picked and too faint).

### User-chosen accents (desktop app)

The app lets users pick any accent. Never hard-code a tint per swatch; derive at runtime:

- **fill** pushed toward white (dark) or black (light) in 5% steps until ≥ 3:1 against the page.
- **text** pushed until ≥ 4.5:1 against both page and surface.
- **hover** = fill mixed 15% toward white (dark) or 12% toward black (light).
- **ink** = `#ffffff` or `#0e0f12`, whichever contrasts more with the fill.
- **dim / wash / border** = the tint at alpha .14 / .22 / .55.

## Semantic colours

| Token | Dark | Light | Means |
|---|---|---|---|
| `--red` | `#ff6b6b` | `#c1352f` | Error, can't-be-undone, ban, required |
| `--yellow` | `#ffb545` | `#9a5c05` | Warning, timeout, expiring, restricted |
| `--green` | `#33d68f` | `#0f8a55` | Success, live, OK status |
| `--cyan` | `#4fd6ff` | `#0b6d8a` | Raids, informational events |
| `--pink` | `#ff7bd5` | `#a82277` | Gifts |
| `--purple` | `#b083ff` | `#6b34c9` | Bits |
| `--gold` | `#ffd45e` | `#7d5a00` | Milestones, rewards |
| `--twitch` | `#a970ff` | `#772ce8` | A chip that stands for Twitch itself |
| `--live` | `#e91916` | `#d9120f` | Solid LIVE badge fill only (white text) |
| `--danger-solid` | `#e81123` | `#c42b1c` | Solid fill only: window close hover |

Light values are darkened, not mirrored: the dark pastels sit at 2-3:1 on white.

Rules:
- Info has no colour of its own; it uses the accent.
- **Live is green, not the accent.** The `--live` red is only for a filled LIVE badge.
- Danger buttons are shaped like secondary buttons; only the text is red.
- Semantic tints are `color-mix(in srgb, var(--X) 7-18%, transparent)`, not new hex values.

## Platform themes (Kick)

Kick pages swap the accent and nothing else, via `[data-platform="kick"]` placed after the light block:

```css
[data-platform="kick"] {
  --accent:#45ca16; --accent-2:#3db313; --accent-text:#45ca16; --accent-ink:#0b2200;
  --accent-dim:rgba(69,202,22,.14); --accent-wash:rgba(69,202,22,.22); --accent-border:rgba(69,202,22,.55);
}
[data-platform="kick"][data-theme="light"] {
  --accent:#53fc18; --accent-2:#48e60a; --accent-text:var(--text);
  --accent-dim:rgba(83,252,24,.14); --accent-wash:rgba(83,252,24,.28); --accent-border:#53fc18;
}
[data-platform="kick"] a { text-decoration-color:var(--accent); }
[data-platform="kick"][data-theme="light"] a { text-decoration-thickness:2px; text-underline-offset:3px; }
```

On light Kick the green is never a text colour; accented text is set in ink and carries a green underline or tint instead. Platform logo colours are constant across themes: `--kick:#53fc18`, `--twitch-logo:#9146ff`.

## Chat name colours

Use the user's real Twitch colour, else a hash pick from Twitch's 15 defaults (`#FF0000 #0000FF #008000 #B22222 #FF7F50 #9ACD32 #FF4500 #2E8B57 #DAA520 #D2691E #5F9EA0 #1E90FF #FF69B4 #8A2BE2 #00FF7F`). Nudge lightness in 0.02 steps (max 40, clamp L to 0.84 dark / 0.16 light) until ≥ 3:1 against the background; never change hue or saturation.

## Selection

`::selection { background: var(--border-strong); }` in the app and tools. Web pages may use `var(--accent-glow)`.
