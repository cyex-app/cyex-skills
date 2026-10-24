---
name: uitest
description: "Thoroughly test a website or app's UI, functionality and behaviour - every page and control, across phone-to-4K resolutions, both themes, keyboard, touch, reduced motion, zoom, slow or failing network and worst-case data - judged against Apple's design principles and Emil Kowalski's design-engineering bar. Runs autonomously; questions are collected and asked at the end. Produces a report with repro steps and suggested fixes; does not change source code. Use when the user's message starts with #uitest or /uitest, or they ask for a full UI test, QA pass, visual or behaviour audit, or an overnight test run."
---

# uitest

A full QA pass that a careful designer-engineer would do by hand, run by right-sized agents, with nothing left to chance and no stopping for questions.

**Read-only on source code.** Testing may click, type test data and change app settings in the app under test; it never edits the project's files, pushes, deploys, or touches real accounts or money. At the end, offer to fix (or hand the report to `#improve`).

## Skills that set the bar

Load these before judging (all in `~/.claude/skills/`):
- `apple-design`: feedback, spatial consistency, restraint, motion physics, materials, typography.
- `emil-design-eng`: polish, component details, animation decisions.
- `review-animations` (read its SKILL.md and STANDARDS.md directly; it isn't auto-invocable) and `animation-performance` for motion.
- `break-ui`: worst-case data catalogue.
- `mobile-native`: phone behaviour.
- `design:accessibility-review` if available, else WCAG 2.2 AA by hand.
- Nielsen's 10 usability heuristics and Laws of UX (both in `web-design-toolkit/references/inspiration.md`) as the usability checklist; GOV.UK Design System for form and error-message patterns.
- cyex projects: `cyex-design` and `cyex-web` / `cyex-app`. Their rules are the spec; a deviation is a finding.

## Phase 1: recon (you, or one `haiku` agent)

- Stack, how to run it (project CLAUDE.md, README, `package.json` scripts, `.claude/launch.json`; use the `run` skill for desktop apps), routes/screens, auth needs, test data available (seed/fixture files).
- Build a **surface map**: every page or screen, and every interactive control on each.
- Create `.claude/runs/<yyyy-mm-dd>-uitest/` with `plan.md`, `findings.md`, `questions.md`, `screens/`.

## Phase 2: the test matrix

Write the matrix into `plan.md`, then split it into slices.

**Viewports (web):** 320×568, 375×812, 390×844, 430×932, 768×1024, 1024×768, 1280×800, 1440×900, 1920×1080, 2560×1440. Plus browser zoom 200% at 1280 wide, and landscape phone (844×390).
**Desktop apps:** minimum window size, small (1024×640), default, maximised, ultrawide (3440×1440), Windows scaling 100/125/150/200%, multi-monitor move if possible. Up to 4 app instances at once, one per configuration.
**Themes and preferences:** dark, light, `prefers-reduced-motion`, `prefers-contrast: more`, `forced-colors` (Windows contrast themes), reduced transparency.
**Input:** mouse, keyboard only (Tab order, focus visibility, Escape, Enter/Space, arrow keys in menus and lists, shortcuts), touch emulation (mobile preset), and a screen-reader pass via the accessibility tree.

## Phase 3: run the slices (up to 6 `sonnet` agents in parallel)

Give each agent one slice (e.g. "all pages at 320 and 375 in both themes", or "keyboard-only through every flow"), the surface map, the bar-setting skill paths, the run folder, and this checklist:

**Layout and visual:** overflow and horizontal scroll, clipped or overlapping text, truncation that hides what differs, broken alignment or spacing rhythm, images without dimensions (layout shift), wrong theme colours, contrast failures, inconsistent radii/type/colours versus the design system, focus rings missing or wrong, hover styles stuck on touch.

**Functionality:** every link, button, form and control does what it says. Forms: valid, invalid, empty, boundary values, paste, very long input, submit twice fast, back after submit. Navigation: deep links, refresh mid-flow, browser back/forward, opening in a new tab, 404s. State: what persists across reloads and what shouldn't.

**Behaviour and motion:** feedback on every press within ~100 ms, loading/empty/error states for every async thing, interruptible animations, correct easing (no `ease-in` on UI entrances), nothing animating on keyboard-repeat actions, reduced motion respected, no jank (check long tasks and dropped frames where tools allow).

**Edge cases** (use `break-ui`'s catalogue): long and unbreakable names, one-character names, missing fields, zero/one/many/huge counts, non-Latin and RTL text, emoji, extreme numbers and dates, slow network (throttle), offline, failing API responses (where they can be simulated), many items (scroll and virtualisation), rapid repeated clicks, double submits, window resized mid-interaction.

**Console and network:** errors, warnings, failed requests, requests to unexpected hosts, very large payloads.

Each agent returns findings only, in this shape (and appends them to `findings.md`):

```
- [SEVERITY] <one-line problem>
  Where: <URL or screen> @ <viewport/theme/input>
  Repro: <steps>
  Expected / actual: <…>
  Evidence: <screenshot path in screens/, console line, or DOM detail>
  Likely cause + fix: <file:line if found by reading code, else the component>
```

Severity: **BLOCKER** (broken flow, data loss, crash), **HIGH** (wrong behaviour, a11y failure, unusable at a size), **MEDIUM** (noticeable visual or motion defect), **LOW** (polish).

Agents never stop to ask. A question goes to `questions.md` with the default they assumed.

## Phase 4: verify (one `opus` agent, or you)

Re-check every BLOCKER and HIGH yourself or with a fresh agent: reproduce it, drop what doesn't reproduce, merge duplicates, and rank. An unverified finding is marked as such, not deleted.

## Phase 5: report

Write `.claude/runs/<…>/report.md`: a summary (counts by severity, what was covered and what couldn't be), then findings by severity with repro and fix, then a coverage table (surfaces × matrix). Publish it as an artifact if the user will share it.

End your turn with: the top findings, the coverage gaps, then **all collected questions at once**, and the offer to fix the verified findings.
