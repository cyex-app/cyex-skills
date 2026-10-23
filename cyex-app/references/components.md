# cyex app components

Values reference [tokens.css](tokens.css). Desktop sizes are from cyex deck (`cyex-viewer/ui/src/components/`); web-tool variants are from cyex logs (`cyex logs frontend/svelte/`). Where the two differ, both are given.

## Button

Variants: **primary** (one per view), **secondary** (default), **ghost**, **danger**, **link**. Optional leading icon (15px; 14px when small).

```css
.btn { display: inline-flex; align-items: center; justify-content: center; gap: 7px;
  height: 32px; padding: 0 14px; border: 1px solid transparent; border-radius: var(--radius);
  font-size: .87rem; font-weight: 600; white-space: nowrap; cursor: pointer;
  transition: background-color var(--fast), border-color var(--fast), color var(--fast); }
.btn.small { height: 27px; padding: 0 10px; font-size: .8rem; }
.btn.primary { background: var(--accent); color: var(--accent-ink); }
.btn.primary:hover { background: var(--accent-2); }
.btn.secondary { background: var(--surface); border-color: var(--border-strong); }
.btn.secondary:hover { background: var(--surface-hover); }
.btn.ghost { background: none; color: var(--muted); }
.btn.ghost:hover { background: var(--surface-hover); color: var(--text); }
.btn.danger { background: var(--surface); border-color: var(--border-strong); color: var(--red); } /* shaped like secondary; only the text is red */
.btn.link { height: auto; padding: 0; background: none; color: var(--accent-text); font-weight: 500; }
.btn.link:hover { text-decoration: underline; text-underline-offset: 2px; }
.btn.link:active { opacity: .6; transition: none; }
.btn:disabled { opacity: .5; cursor: not-allowed; }
```

Web tool: `padding: 11.5px 20px`, primary weight 700, small `7px 13px` / .78rem. Busy state swaps the label ("Load" → "Loading…") and shows a 13px spinner in `--accent-ink`.

## Icon button

```css
.icon-btn { display: grid; place-items: center; width: 30px; height: 30px; padding: 0;
  border: 0; border-radius: var(--radius); background: transparent; color: var(--muted); cursor: pointer;
  transition: background-color var(--fast), color var(--fast); }
.icon-btn:hover { background: var(--surface-hover); color: var(--text); }
.icon-btn:active { opacity: .6; transition: none; }
.icon-btn.active { background: var(--accent-dim); color: var(--accent-text); }
.icon-btn:disabled { opacity: .4; }
```

Icon 16px. Always a tooltip and `aria-label`; `aria-pressed` only when it toggles. A 6px accent dot at top 5 / right 5 marks "something new". Window-chrome variant: 44px × `--chrome-h`, radius 0.

## Field (text, search, number)

Use the `.field` class from tokens. Search: 14px search icon (`--dim`) at the left, placeholder "Search…", a clear × while it has text (20×20, radius-sm; web tools use an 18px round × on `--border-strong`). Escape clears first, then blurs. Number: right-aligned, weight 500, `tabular-nums`, no OS spinners, arrows step, Shift steps ×10, decimals with a comma, unit in `--dim`.

Web tool field: `padding: 11px 12px`, `--border`, focus → `border-color: var(--accent-border); background: var(--surface-hover)`. Field label above: the `.label` style, `margin-bottom: 7px`.

## Select / combo

A field-styled trigger with a 14px chevron in `--dim`, never a native `<select>` dropdown. The list: `--elevated`, 1px `--border-strong`, radius 3, `--shadow-pop`, padding 4, `--z-popover`, max width `min(480px, 100vw - 16px)`. Options min-height 28, `0 8px`, radius-sm; hover `--row-hover`; keyboard-active adds `inset 0 0 0 1px var(--focus-ring)`; selected `--accent-dim` / `--accent-text`. Typeahead (resets after 700ms), Home/End, Enter/Space. The list opens scrolled so the current value is visible with neighbours.

## Toggle (switch)

Track 36×20, pill, `--border-strong` with an inset 1px ring at `color-mix(in srgb, var(--text) 40%, transparent)`. Knob 14px at 3/3, moves 16px over `--fast var(--ease)`. On: track `--accent`, knob `--accent-ink`, plus an "on" tick (a 2×8px bar at top 6 / left 9 in `--accent-ink`) so on reads as on with any accent. **Neutral** variant for long lists: on track `--muted`, knob and tick `--bg`. Light theme off-track is `--dim`. Keep the input focusable; ring on the track.

## Checkbox

16×16 box, 1px `--border-strong`, radius 3, `--surface`. Checked or indeterminate: accent fill and border with a 12px check (or 8×2 dash) in `--accent-ink`. Label gap 7px.

## Segmented control

Container: padding 2, gap 2, `--surface`, 1px `--border-strong`, radius 3, horizontal scroll with no visible scrollbar. Options 24px tall, `0 10px`, radius-sm, .8rem/600, `--muted`, hover `--text`. Selected: `--accent-dim` / `--accent-text`. Neutral variant: `--surface-hover`, `--text`, `box-shadow: 0 0 0 1px var(--border-strong)`. Roving tabindex; arrows move and pick.

## Filter chips

Min-height 24, `1px 8px`, 1px `--border`, radius 3, `--dim`, .72rem; on: `--bg` background, `--border-strong`, `--text`, `aria-pressed`. Role and status chips: .58-.62rem/700 uppercase on `--neutral-chip`, or a semantic tint `color-mix(in srgb, var(--X) 18%, transparent)`.

## Stepper

30px tall, 1px `--border-strong`, radius 3. 30px-wide `−` (U+2212) and `+` buttons, value min-width 44, .85rem/500 `tabular-nums`.

## Popover

```css
.popover { position: fixed; z-index: var(--z-popover); min-width: 220px; padding: 4px;
  background: var(--elevated); border: 1px solid var(--border-strong); border-radius: var(--radius);
  box-shadow: var(--shadow-pop); }
```

Placement: aligned to the anchor's end, 6px below; flips when there is less than 120px of room; stays 8px inside the window; never covers its anchor. One open at a time; Escape and outside click close it. Opened by mouse, the panel takes focus without showing a ring.

## Menu (right-click and ⋯)

Same surface as the popover, `--z-menu`, min-width 200, max-width 300. Items 30px, `0 8px`, gap 9, radius 3, a 14px icon (or a 14px blank to keep alignment), hover `--surface-hover`, focus `outline: 2px solid var(--focus-ring); outline-offset: -2px`. A right-aligned hint (shortcut or current value) in `--dim` .76rem. Separators: `hr` with `margin: 4px 0; border-top: 1px solid var(--border)`. Danger items red text, last in their group; destructive ones arm first (red 14% tint, "Click again to …") and confirm within 3s. Action menus give every item an icon; pick lists show a check on the picked one instead. Item order: main action, other actions, going somewhere, copy, switches.

## Tooltip

`--elevated-2`, 1px `--border-strong`, radius 3, `--shadow-pop`, `6px 9px`, max-width 260, `--z-tooltip`, `pointer-events: none`. Label .8rem/600; hint .76rem `--muted`. Shows after 150ms on hover or keyboard focus; once one has shown, the next within 400ms is instant. Hides on scroll, resize, Escape or mousedown.

## Dialog

Backdrop `--overlay`, `--z-dialog`, grid-centred with 12px padding (or top-aligned at `min(14vh, 96px)`). Box 420px default, `--elevated`, 1px `--border-strong`, radius 3 (0 in web tools), `--shadow-dialog`. Header `10px 8px 4px 16px` with an h2 and a 15px × icon button "Close". Body `8px 16px 14px`, scrolls, `overscroll-behavior: contain`. Footer right-aligned, gap 8, `12px 16px`, top hairline: secondary (Cancel) then primary. Focus trap; Escape, outside click and × close unless locked; Enter submits outside lists.

## Toast

```css
.toast { display: flex; align-items: flex-start; max-width: min(420px, 100vw - 28px);
  background: color-mix(in srgb, var(--elevated) 78%, transparent); backdrop-filter: blur(14px) saturate(1.2);
  border: 1px solid var(--border-strong); border-left: 3px solid var(--accent); border-radius: var(--radius);
  box-shadow: var(--shadow-pop); font-size: .85rem; }
.toast.success { border-left-color: var(--green); }
.toast.error { border-left-color: var(--red); }
```

The left bar is the one bar of colour a toast gets. Text `10px 14px 10px 12px`; an action button in `--accent-text`/600 after a hairline. Lifetimes: info and success 3,5 s, errors 9 s, with an action ≥ 7 s; hover or focus holds it; at most 3 visible; a repeat bumps a `×N` count instead of stacking. Errors use `role="alert"`.

Web tools: solid `--elevated`, radius 0, no blur, `padding: 12px 30px 14px 14px`, left bar `--border-strong` (red for errors), an 18px × at the top right, and a 3px bar draining over 3 s. Notices stack bottom right (`aria-live="polite"`), errors bottom left (`assertive`), 18px from the edges.

## Panel card

```css
.panel { display: flex; flex-direction: column; background: var(--surface); border: 1px solid var(--border);
  border-radius: var(--radius); overflow: hidden; container-type: inline-size; }
.panel > header { display: flex; align-items: center; gap: 4px; min-height: 34px; padding: 4px 6px 4px 10px;
  border-bottom: 1px solid var(--border); }
.panel > header h3 { margin: 0; flex: 1; font-size: .8rem; font-weight: 700; line-height: 26px;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.panel > .body { padding: 10px; display: flex; flex-direction: column; gap: 8px; overflow: auto; }
```

Fields inside a panel use `--bg` as their background. Secondary header tools fade to .4 until the header is hovered. Web-tool cards: radius 0, padding `19px 22px`.

## Settings row

Flex, space-between, gap 24, `padding: 11px 0`, bottom hairline. Left: title (600) and hint (`--text-hint`, `--dim`). Right: the control, gap 8, wrapping. `stacked` puts the control under the label.

## Status line (web tools)

Flex row, gap 12, `12px 16px`, `--surface`, hairline border. Stats as a `.label`-styled key over a mono .85rem/700 value. A Live toggle on the right: `7px 13px 7px 11px`, radius 3, 9px dot; pressed → green border and text, dot glowing `0 0 8px var(--green)` and pulsing (opacity 1 → .35 over 2 s; off under reduced motion).

## Rows (chat, logs, lists)

```css
.row { padding: 6px 14px; line-height: 1.55; border-bottom: 1px solid var(--row-alt); }
.row.alt { background: var(--row-alt); }
.row:hover { background: var(--row-hover); box-shadow: inset 2px 0 0 var(--border-strong); }
.row.target { box-shadow: inset 3px 0 0 var(--accent); } /* a permalink: a rail, not a wash */
```

Order in a chat row: timestamp (mono, `--dim`), badges (16px, radius 3), name (700, the user's colour nudged to ≥ 3:1), text. Emotes `height: 1.9em; vertical-align: middle`. System rows: .79rem text in the event colour over a 7% tint, with a 13px stroke icon per kind (timeout yellow, ban red, sub green, gift pink, raid cyan, bits purple, milestone gold). No emoji.

## Loading

Spinner 18px, 2px border, ring `--border-strong`, head `--muted`, .9s linear (36px / 3px large). Skeletons match the real rows or grid exactly (40px rows with a 26px round avatar; 16:9 cards), shimmer `--surface-hover` → `--elevated-2` over 1,4 s. Label `--dim` .85rem. Under reduced motion both stop with `animation: none`.

## Empty state

Centred column, gap 12, `--dim`, 28px icon, one short sentence and an optional button. Inline variant: row, gap 10, 20px icon, .85rem.

## Platform switch (web tools)

98×37 min, two faces (Twitch / Kick, 16px logos in brand colours) stacked in one grid cell; hover or focus flips with `rotateX(180deg)` over .5s `cubic-bezier(.4,0,.2,1)`; touch devices show a 12px swap icon instead. Current face has an `--accent` border. Placed 8px from the theme toggle.

## Code block (docs)

`--elevated-2` (or `--code-block`), 1px border, square. Header `6px 8px 6px 10px` on `--surface` with language tabs (.74rem/600; active accent-dim / accent-text) and a 14px copy icon that becomes a green check for 1,6 s. `pre` `13px 15px`, mono .78rem / 1.65. Inline `code`: `rgb(255 255 255 / .06)` (light `rgb(20 22 30 / .06)`), radius 3, `.12em .4em`. HTTP method chips mono .58-.7rem/700: GET neutral, POST green, DELETE red, WS yellow, each on a 16% tint.
