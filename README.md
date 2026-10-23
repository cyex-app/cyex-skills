# cyex skills

Skills for Claude Code: the cyex design system, plus a set of working defaults and commands for planning, testing and improving code.

## Design

| Skill | For |
|---|---|
| [cyex-design](cyex-design/SKILL.md) | The shared core: accent, mark, theme switching, voice, number and date formats, accessibility floors. Always loaded with one of the two below. |
| [cyex-web](cyex-web/SKILL.md) | Landing pages, product sites, the hub, 404s. Near-black ground, Geist, 3px buttons, mounts. Has a token file and a starter page. |
| [cyex-app](cyex-app/SKILL.md) | The desktop app and dense web tools (logs viewer, request form, VOD finder, dashboards, settings). Warm grey, IBM Plex, compact controls. Has a token file and component specs. |
| [web-design-toolkit](web-design-toolkit/SKILL.md) | Component, motion, chart and 3D sources for web work, loaded automatically. |

Extracted on 2026/10/23 from cyex deck, cyex hub, cyex logs and the cyex deck site. Where those disagreed: accents from cyex logs (`#145aff` dark, `#14e6ff` light), the hub's style for web pages, dates as `yyyy/mm/dd`.

## Defaults and commands

| Path | What |
|---|---|
| [session/CLAUDE.md](session/CLAUDE.md) | Loaded in every session: agent limits and model per job, the `#` prefix commands, rules for long runs, a "what to use for what" table that maps plain requests to skills, and how one-off overrides work. |
| [optimize](optimize/SKILL.md) | `#optimize`: rewrite the prompt, plan in ≤ 6 (max 10) phases, run it. |
| [optimize2](optimize2/SKILL.md) | `#optimize2`: same, stopping after each phase with a `/compact` prompt. |
| [uitest](uitest/SKILL.md) | `#uitest`: full UI, behaviour and edge-case test across resolutions, themes and inputs; report only. |
| [deep-improve](deep-improve/SKILL.md) | `#improve`: audit with the code-quality skills, verify, fix on an `improve/<date>` branch with checks after each fix. |
| [clean](clean/SKILL.md) | `#clean`: shrink a project on disk. Removes regenerable build output (e.g. `cargo clean`), then proposes unused assets and old files to remove recoverably. `#clean deep` also drops dependency installs; `#clean report` changes nothing. |

These build on other people's skills, installed separately:
- [emilkowalski/skills](https://github.com/emilkowalski/skills) (MIT): `apple-design`, `emil-design-eng`, `animate`, `review-animations`, `break-ui`, `mobile-native` and more. Copy them into `vendor/emilkowalski/` and the installer links them too.
- shadcn's `improve`, Matt Pocock's [`improve-codebase-architecture`](https://github.com/mattpocock/skills), and Cursor's [`thermo-nuclear-code-quality-review`](https://github.com/cursor/plugins), used as auditors by `deep-improve`.

## Install (Windows)

```powershell
git clone https://github.com/cyex-app/cyex-skills.git
& .\cyex-skills\tools\install.ps1
```

This links every skill folder into `%USERPROFILE%\.claude\skills\` (junctions, no admin rights; edits in the clone apply at once) and writes `%USERPROFILE%\.claude\CLAUDE.md` from `session/CLAUDE.md`.

For your own rules (GitHub account, author name, anything you don't want in a shared file), create `session/personal.md`. It's git-ignored and appended to `CLAUDE.md` by the installer. Re-run the installer after editing either file.

## claude.ai chats

Regular claude.ai chats don't read `~/.claude`. Build one zip per skill and upload them under Settings → Capabilities → Skills:

```powershell
& .\cyex-skills\tools\package-claude-ai.ps1
```

Packaged: the design skills and anything in `vendor/`. Not packaged: `optimize`, `optimize2`, `uitest`, `deep-improve`, `clean`, which need Claude Code's agents, browser and local files.

## Where existing projects differ from the skills

The skills set the standard; these are the places current code doesn't match yet.

- **cyex deck app**: light theme keeps the blue `#145aff` accent; the standard light accent is `#14e6ff` with text `#046a82`. Its `--accent-hover` (`#3773ff`) is `--accent-2` (`#2a6aff`, was `#3f86ff` until 2026/10/23: white on it was 3,46:1) elsewhere. Dialog `--overlay` is `rgba(0,0,0,.55)` / `.3` vs `rgba(14,15,18,.6)` / `rgba(243,243,244,.7)`.
- **cyex logs**: dates are written `2026-09-07`; the standard is `2026/09/07`. Focus ring uses `--accent-border`; the standard is the text colour. A few settings labels are Title Case ("Show Emotes").
- **cyex hub**: `--accent-text` is `#6b97ff` / `#087d8c` and light `--accent-ink` `#06141a`; the standard is `#7ea4ff` / `#046a82` and `#00232b`. `404.html` still has 10px buttons and 8-9px nav radii.
- **cyex deck site**: Inter, pill buttons, magnetic and tilt effects, cursor spotlight, grain and a blue light-theme accent; the web standard is the hub's Geist, 3px buttons, no pointer-following motion, cyan light accent.
