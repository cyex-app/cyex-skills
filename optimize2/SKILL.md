---
name: optimize2
description: "Stepwise version of optimize - rewrites the prompt and plans it in phases, then stops after every phase with a summary and a ready-to-paste /compact prompt so the session can be compacted between phases. Use when the user's message starts with #optimize2 or /optimize2, or they ask to plan in phases and pause between them."
---

# optimize2

Follow the `optimize` skill exactly, in **stepwise mode**. Load the `optimize` skill (or read `~/.claude/skills/optimize/SKILL.md`) and apply it, including its "Stepwise mode" section: after each phase, stop with a phase summary, what's next, and the `/compact …` prompt in a code block.
