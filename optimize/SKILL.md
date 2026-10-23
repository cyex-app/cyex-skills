---
name: optimize
description: "Turn a rough request into an optimized prompt and a phased plan (aim for 6 phases or fewer, never more than 10), then execute it phase by phase with right-sized agents. Use when the user's message starts with #optimize or /optimize, or they ask to \"optimize this prompt\", \"plan this out in phases first\", or \"make a plan and run it\". The stepwise variant that pauses for /compact between phases is optimize2."
---

# optimize

Make the request sharper before spending tokens on it, then run it in phases.

Mode: **continuous** unless invoked through `optimize2` (then **stepwise**, see the end).

## Phase 0: optimize the prompt (one agent)

Spawn **one** planning agent (`model: opus` for large or ambiguous work, `sonnet` for a well-scoped task). It does not edit files. Brief it with:

- The user's request, verbatim.
- What you already know: working directory, stack, relevant files you've seen, anything decided earlier in this conversation.
- Its job, and the exact output shape:

```
## Optimized prompt
<the request rewritten: goal, scope (in / out), constraints, inputs and files, definition of done, how to verify>

## Assumptions
<each assumption it made, one line each, with the safe default chosen>

## Blocking questions
<only questions whose answer changes the plan's shape; "none" if none>

## Plan
Phase N: <name>
- Goal: <one sentence>
- Steps: <3-7 bullets>
- Agents: <count × model, what each owns>  (max 6 in parallel; haiku search, sonnet routine, opus plan/verify)
- Output: <the artifact this phase leaves>
- Check: <how we know it's done>
```

Rules for the plan: as few phases as the work allows (target ≤ 6, hard cap 10). Each phase ends in something checkable. Independent work goes in the same phase as parallel agents; dependent work goes in later phases. The last phase verifies the whole result against the definition of done.

## Show it, then go

1. Save the result to `.claude/runs/<yyyy-mm-dd>-<slug>/plan.md` in the project (create the folder).
2. Show the user the optimized prompt and the phase list (names and one-line goals, not the full plan).
3. If there are **blocking questions**, ask them now in one go and wait. Otherwise start Phase 1 right away; the user can interrupt.
4. Put the phases on the task list.

## Running phases

- Execute each phase as planned. Adjust when reality differs, and note the change in `plan.md`.
- After each phase, append to `.claude/runs/<…>/progress.md`: what was done, files changed, checks run and their results, anything left open.
- Non-blocking questions that come up go to `questions.md` with the default you picked; keep going.
- At the end: verify against the definition of done, then report what's done, what isn't, and the open questions.

## Stepwise mode (optimize2)

Same as above, but after **every** phase stop and end your turn with:

1. A 2-4 line summary of the phase: what changed, what was checked.
2. What the next phase is.
3. A ready-to-paste compact command, in its own code block:

```
/compact Continuing "<task>" from .claude/runs/<…>/plan.md. Done: phases 1-N (see progress.md). Next: phase N+1 "<name>": <goal>. Keep: decisions <list>, files touched <list>, open issues <list>. Drop: file contents already read, tool output, superseded drafts.
```

Keep the compact prompt under ~80 words and point at the files on disk rather than repeating them. After the user compacts and says to continue, re-read `plan.md` and `progress.md` first, then run the next phase.
