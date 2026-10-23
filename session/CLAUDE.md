# Session defaults

Loaded in every session from `~/.claude/CLAUDE.md`. Personal rules (accounts, names) live in a private `personal.md` appended at install time.

## Overriding these rules

Everything in this file and in the skills it points to is a default. If the user says otherwise in a chat, do what they say, but only for that chat, or for the time or task they name ("for this commit", "until tomorrow", "for the rest of this run"). When that chat, time or task ends, go back to these defaults. Never edit this file because of a one-off override; only when the user asks for the default itself to change.

## Parallel work and cost

- Up to **4 instances** of an app or dev server at once (e.g. one per resolution, theme or platform while testing), and up to **6 subagents** running at the same time.
- Use parallelism only when the pieces are independent. One agent that finishes beats three that duplicate each other.
- Spec every agent to its job. Pass `model` on every Agent call:

| Work | Model | Effort |
|---|---|---|
| Finding files, grep sweeps, listing, collecting screenshots, mechanical checks | `haiku` | low |
| Routine implementation, running tests, one area of a review, one slice of a UI test | `sonnet` | medium |
| Planning, architecture, hard bugs, verifying other agents' findings, final synthesis | `opus` | high |

- Give each agent a narrow brief: the goal, the files or pages it owns, what's already ruled out, and the exact shape of what to return (findings with `file:line` or URL plus evidence, no essays). Ask for conclusions, not file dumps.
- Don't re-run work an agent already did; don't spawn an agent for something a handful of tool calls settles.

## Prefix commands

When a message starts with one of these, load the skill named and follow it. The slash form works the same, and so does asking in plain words (see "What to use for what").

| Prefix | Skill | What it does |
|---|---|---|
| `#optimize <task>` | `optimize` | An agent rewrites the prompt and plans it in phases (aim for ≤ 6, never > 10), then the work runs phase by phase. |
| `#optimize2 <task>` | `optimize2` | Same, but stops after every phase with a ready `/compact` prompt so the session can be compacted between phases. |
| `#uitest [target]` | `uitest` | Thorough UI, behaviour and edge-case test of a site or app across resolutions, themes and inputs. Reports; doesn't change code. |
| `#improve [scope]` | `deep-improve` | Audits the codebase with the code-quality skills, then fixes what's verified, on a branch, with tests after each fix. |

Note: `#improve` is `deep-improve`. The skill named `improve` (shadcn) only writes plans and never changes code; `deep-improve` uses it as one of its auditors.

## Long or autonomous runs

During `#uitest`, `#improve`, `#optimize` and any run the user says is long or overnight:
- **Don't stop to ask.** When a question comes up, write it to the run's `questions.md` with the context and the safe default you picked, then carry on with that default. Ask everything together at the end.
- Keep state on disk in the project's `.claude/runs/<yyyy-mm-dd>-<name>/` (plan, progress, findings, questions), so nothing is lost to compaction.
- Never do anything destructive or outward-facing without the user: no pushes, merges, deploys, deletions of user data, sent messages, purchases or real credentials. Test data only.

## What to use for what

The user won't name skills or paths; match the request to this table and load what fits, without asking. Skills marked *manual* can't be loaded with the Skill tool: read `~/.claude/skills/<name>/SKILL.md` (Windows: `%USERPROFILE%\.claude\skills\<name>\SKILL.md`) and follow it.

| When the user asks to… | Use |
|---|---|
| plan first, sharpen a prompt, "do this properly / in phases" | `optimize` (`optimize2` if they want to pause or compact between phases) |
| test a site or app, QA, "check everything works / looks right", overnight test | `uitest` |
| improve, clean up, audit and fix, refactor the codebase, overnight improvement | `deep-improve` |
| audit only, a plan or roadmap for others to implement, "what should we improve" | `improve` |
| a strict / harsh / deep code-quality or maintainability review | `thermo-nuclear-code-quality-review` *(manual)* |
| architecture, module boundaries, "deepen" modules, make code testable | `improve-codebase-architecture` *(manual)* with `codebase-design` |
| domain terms, glossary, ADRs | `domain-modeling` |
| stress-test a plan or idea, "grill me" | `grilling` |
| build or restyle a web page, landing page, component, chart, 3D | `web-design-toolkit` + `emil-design-eng` + `apple-design` |
| anything cyex (deck, logs, hub, site) with a visual or written surface | `cyex-design` + `cyex-web` (pages people read) or `cyex-app` (UI people operate); these rules win over library defaults |
| add or build an animation | `animate`; frame drops → `animation-performance`; name an effect → `animation-vocabulary` |
| review existing motion | `review-animations` *(manual)* |
| audit motion across a codebase / where motion is missing | `improve-animations` / `find-animation-opportunities` |
| worst-case data, edge cases in a component | `break-ui` |
| make it feel native on phones, PWA, touch | `mobile-native` |
| pick a library for a frontend job | `pick-ui-library` *(manual)* |
| try several design variants side by side | `prototype` *(manual)* |

`i-have-adhd` is a mode the user switches on with `/i-have-adhd`; don't load it unasked.
