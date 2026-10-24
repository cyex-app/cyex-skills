---
name: cyex-app
description: Design system for cyex apps and tools - the cyex deck desktop app and dense web tools such as cyex logs, the channel request form, the VOD finder, dashboards, settings pages, admin panels and popouts. Covers the warm-grey palette, IBM Plex type, 3px corners, compact controls, panels, menus, dialogs, tooltips, toasts, focus and keyboard rules, with a ready token file and component specs. Use whenever building or restyling any cyex UI that people operate rather than read. For landing and marketing pages use cyex-web instead. Always read cyex-design first for the shared accent, mark, voice and formats.
---

# cyex app

The look of cyex deck and cyex logs: one flat warm-grey ground, opaque surfaces stepping up in height, hairline structure, 3px corners, IBM Plex, compact and calm. Organised, uniform, sleek, professional. The content (chat, logs, streams) is the loudest thing on screen; the UI stays out of its way.

**Read `cyex-design` first.** It holds the accent, the mark, theme switching, voice, and number/date formats. This skill adds the tool layer.

## Start here

1. Copy [references/tokens.css](references/tokens.css). Use only its values: no new hex colours, radii, durations or z-indexes in components.
2. Fonts: IBM Plex Sans (400-700) and IBM Plex Mono (400-600). Bundle woff2 in the desktop app; on the web, Google Fonts with `display=swap`.
3. Build controls from [references/components.md](references/components.md).

## Two densities, one system

| | Desktop app (cyex deck) | Web tool (cyex logs, request, VOD) |
|---|---|---|
| Base text | 13px / 1.45 | .87rem / 1.55 (on a 16px root) |
| Button | 32px tall, `0 14px`, .87rem/600 | `11.5px 20px`, .87rem/700 |
| Field | 30px, `0 10px` | `11px 12px`, .89rem |
| Header controls | 30px icon buttons, 38px title bar | 37px toggles and switches |
| Cards and panels | 3px radius, `--border` hairline | **0 radius** (square), `--border` hairline |
| Page | fills the window; scrolling happens inside panes | the shared `.wrap` (1520px, 20px sides) for header, main and footer; forms and single tasks capped at `--measure-form` (640px) inside it; `main` padding `26px var(--page-pad) 60px` |
| Toasts | top centre, under the title bar | bottom right (notices), bottom left (errors) |

Everything else (palette, type families, radius of controls, motion, focus, voice) is identical.

## The look in twelve rules

1. **One flat page colour.** No gradients, no glow, no backdrop blur (the toast is the one exception in the desktop app), no translucent white surfaces.
2. **Height is a colour step, not a shadow.** `--bg` → `--surface` → `--elevated` → `--elevated-2`. Only floating things (popover, menu, tooltip, toast, dialog) get a shadow, and only `--shadow-pop` or `--shadow-dialog`.
3. **3px corners on controls** (buttons, fields, menus, popovers, chips). Cards are 3px in the app and square in web tools. 50% only for avatars, dots and knobs. 999px only for switch tracks and count badges. Never pill buttons.
4. **Hairlines for structure**: 1px `--border` between things, 1px `--border-strong` around controls and floating surfaces. Rails (a selected or highlighted row) are `box-shadow: inset 2-3px 0 0`, not borders.
5. **The accent is for state**: the primary button, the selected option (`--accent-dim` + `--accent-text`), a focused field's border, progress fills, links. Chips, badges and section headers are neutral. Live is green.
6. **Focus is a 2px ring in `--focus-ring` (the text colour)**, offset 2px; inset (`-2px`) inside lists and menus. Keyboard focus never looks like hover.
7. **Press feedback is instant**: `:active { opacity: .6; transition: none }` on icon buttons and links. Feedback on press, not release.
8. **Every icon-only button has a tooltip** with its label (and an optional one-line hint, which users can turn off) and the same text as `aria-label`.
9. **One menu** for every right-click and ⋯ button; the browser's own context menu never shows. Popups stay inside the window and never cover their anchor.
10. **Labels are the one uppercase style**: .68-.7rem, 700, `.06em`, `--dim`.
11. **Monospace only for data**: timestamps, counts, IDs, codes, paths, raw payloads, with `tabular-nums`. Never for labels or headings.
12. **Nothing jumps.** Skeletons match the real layout, space for async content is reserved, scrollbars use `scrollbar-gutter: stable` on pages.

## Type

| Role | Size | Weight | Notes |
|---|---|---|---|
| Page / dialog title | 1.05rem (app), 1.3rem (web tool h1) | 700 | `letter-spacing: 0` |
| Panel title | .8rem | 700 | single line, ellipsis |
| Body, rows | 13px (app) / .87rem (web) | 400 | line-height 1.45-1.55 |
| Button | .87rem (small .8rem) | 600 (web primary 700) | |
| Secondary line | `--text-sub` .85rem | 400 | `--muted` |
| Hint, meta | `--text-hint` .78rem | 400 | `--dim` |
| Label | `--text-label` .68rem | 700 | uppercase, `.06em`, `--dim` |
| Timestamp | .7-.74rem mono | 600 | `tabular-nums`, `user-select: none` |
| Code | mono .78-.86em | 400-500 | `pre` line-height 1.6-1.7 |

Weights in use: 400, 500 (numeric inputs), 600, 700. No 300 or 800.

## Spacing

No spacing tokens; use this scale only: **2, 4, 6, 8, 10, 12, 16, 20, 24**. Gaps of 6-8px between controls in a row; 10-12px padding inside panels and popovers; 16px dialog padding; 24px between label and control in settings rows.

## Motion

| Token | Use |
|---|---|
| `--fast` .12s | hovers, colour and border changes, toggle knob, tooltip in, dialog backdrop |
| `--base` .2s | things that appear: toasts, popovers, drawers fading |
| `--slow` .36s | things that travel: drawer height, panel moves |
| `--ease` | everything that moves; plain `ease-out` for fades |

Entrances: popover from `translateY(-4px) scale(.98)`, toast from `translateY(-8px)` (or `translateX(±16px) scale(.98)` for side stacks), dialog from `scale(.97)`. Theme switch: 150ms view-transition cross-fade with all transitions off during it. Spinners stop (not freeze mid-turn) under reduced motion: use `animation: none`.

## Layout patterns

- **Window chrome** (desktop): 38px bar on `--page`, bottom hairline, drag region on empty space, 44px-wide window controls; close turns `--danger-solid` on hover. Pop-outs get a 28px frame (pin, fullscreen, close; no minimise); pop-ups a 26px slim header with a round 18px ×.
- **Panels**: `--surface` cards with a 34px header (title .8rem/700, tools on the right, bottom hairline), 10px body padding, `container-type: inline-size` and a narrow layout below 320px.
- **Settings**: rows of label + hint on the left and control on the right, `11px 0` padding, bottom hairline; max width 760px.
- **Lists**: rows `6px 14px`, `--row-alt` striping assigned on insert (not `:nth-child`), `--row-hover` on hover with a 2px `--border-strong` inset rail.
- **Header (web tools)**: sticky, flat `--bg`, bottom hairline, max 1520px, `13px 20px` padding: mark + wordmark, uppercase nav links with a 2px accent underline that scales in, then settings, theme toggle, platform switch on the right.
- **Empty states**: centred, `--dim`, a 28px icon above one short sentence; or inline with a 20px icon.

## Don't

- Gradients, glows (except the live dot), glass, translucent surfaces, coloured section backgrounds.
- Accent on chips, badges, headers or the focus ring; accent text in light Kick.
- Pill buttons, rounded cards above 3px, mixed radii in one view.
- Emoji anywhere in the UI, including system messages (use 13px stroke icons).
- Title Case labels, full stops on menu items, explanatory text the UI already shows.
- Raw z-index values above 9 outside the token scale; a second focus style.
