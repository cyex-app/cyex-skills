---
name: deep-improve
description: "Audit a codebase with the strict code-quality skills (shadcn improve, thermo-nuclear code quality review, improve-codebase-architecture, and for UI code Emil Kowalski's improve-animations and break-ui), verify the findings, then fix the verified ones on a separate branch, running tests and build after each fix, including edge cases and multiple resolutions for UI. Runs autonomously; questions are collected and asked at the end. Use when the user's message starts with #improve or /deep-improve, or they ask to \"test and improve the codebase\", \"audit and fix\", or start an overnight improvement run. For a plan-only audit with no code changes, use the improve skill instead."
---

# deep-improve

Find what's wrong or weak in a codebase, prove it, fix it safely, and leave a clear record. Built on other skills; this one decides who runs which, in what order, and with what safety net.

## Auditors (read their SKILL.md files directly; several aren't auto-invocable)

Under `~/.claude/skills/` (`%USERPROFILE%\.claude\skills\` on Windows):

| Skill | Looks for |
|---|---|
| `improve/` (shadcn) + its `references/audit-playbook.md` | bugs, security, performance, tests, tech debt, migrations, DX |
| `thermo-nuclear-code-quality-review/` | abstraction quality, giant files, spaghetti conditions, maintainability |
| `improve-codebase-architecture/` | shallow modules and deepening opportunities (its "grill" step needs the user: put those choices in `questions.md`) |
| `improve-animations/`, `find-animation-opportunities/` | motion code (UI projects only) |
| `break-ui/` | components that break on worst-case data (UI projects only) |
| `codebase-design/` | shared vocabulary for module design |

## Safety net (non-negotiable)

- If it's a git repo: check `git status` first. With uncommitted changes, don't touch them: put a question in `questions.md` and audit only. Otherwise create a branch `improve/<yyyy-mm-dd>` from the current branch. Commit each verified fix separately with a clear message, using the git identity and attribution rules in the user's CLAUDE.md, if it has any. **Never push, merge, rebase shared branches or delete branches.**
- Not a git repo: copy nothing, change nothing; audit and report only, and ask at the end whether to initialise git.
- Know the checks before changing anything: tests, typecheck, lint, build (from `package.json`, `Cargo.toml`, CI config, project CLAUDE.md). Run them once at the start and record the baseline; pre-existing failures are not yours to hide.
- A fix that breaks a check that passed in the baseline gets reverted, logged as "attempted, reverted" with the reason.
- No dependency upgrades, public API changes, schema/data migrations, deleted features or large rewrites without the user: those become proposals in the report.

## Phase 1: recon (one `haiku` agent)

Stack, layout, entry points, size per area, test and build commands, existing conventions (formatting, naming, comment style), project CLAUDE.md rules. Create `.claude/runs/<yyyy-mm-dd>-improve/` with `plan.md`, `findings.md`, `questions.md`, `changes.md`. Run the baseline checks.

## Phase 2: audit (up to 6 `sonnet` agents in parallel)

One agent per auditor (or per area in a large repo). Each gets: the auditor's SKILL.md path to read and follow, the recon facts, the area it owns, "read-only, findings only", and the return shape:

```
- [SEVERITY] <problem>  (<category>)
  Where: <file:line>
  Evidence: <the code or behaviour that shows it>
  Fix: <concrete change, size S/M/L>
  Risk: <what could break>
```

UI projects also get one agent running the `uitest` matrix on the affected screens (viewports 320 → 2560, both themes, keyboard, reduced motion, worst-case data), so fixes can be checked against real rendering.

## Phase 3: verify (one `opus` agent)

Adversarially check every finding: is it real, is the evidence right, is the fix correct and in scope, does it duplicate another? Keep CONFIRMED and PLAUSIBLE, drop the rest with a one-line reason. Order by severity × confidence ÷ size. Split into **auto-fix** (S/M, confirmed, low risk, no user decision needed) and **proposals** (everything else).

## Phase 4: fix (`sonnet` agents, one file set at a time)

- Work through the auto-fix list. Two agents never edit the same files at once.
- Each fix matches the surrounding code's style and comment density, with a test where the project has tests.
- After each fix: run the affected tests, typecheck and lint; build after every few fixes. UI changes: re-check the affected screens at 375, 1280 and 1920 in both themes.
- Log every change in `changes.md`: finding, files, commit hash, checks run.

## Phase 5: report

`.claude/runs/<…>/report.md`: baseline vs final check results; fixes applied (by severity, with commit hashes); fixes attempted and reverted; proposals that need a decision (with size and risk); findings dropped in verification and why.

End your turn with: what changed (branch name, number of commits), check results, the top proposals, then **all collected questions at once**. Offer to open a PR, but don't push without a yes.

## Questions during the run

Never stop to ask. Write the question, its context and the default you took to `questions.md`, then continue with the safest default (usually "don't change it, propose it").
