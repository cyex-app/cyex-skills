---
name: clean
description: "Shrink a project folder on disk: remove regenerable build output and caches (cargo clean for Rust, dist/, .svelte-kit/, .next/, __pycache__ and the like), compact git, and find unused assets, old file versions, backups and duplicates to remove after confirmation, recoverably. Use when the user's message starts with #clean or /clean, or they ask to clean up, slim down, free disk space in, or remove unused files or assets from a project or repo. '#clean deep' also removes dependency installs (node_modules, virtualenvs)."
---

# clean

Make a project smaller on disk without losing anything that can't be got back.

Two tiers:
- **Tier 1, regenerable**: build output and caches that a build recreates. Removed automatically.
- **Tier 2, judgement**: files that look unused or old. Proposed with evidence, removed only after the user confirms, and always recoverably.

`#clean deep` adds dependency installs to tier 1. `#clean report` changes nothing and only reports.

## Safety rules

- Work only inside the project folder. Never touch global caches, other projects, or anything outside the repo root.
- Never delete permanently what a build can't recreate. Tier 2 removals are either `git rm` on a branch (tracked files) or a move to the Windows Recycle Bin (untracked files):
  ```powershell
  Add-Type -AssemblyName Microsoft.VisualBasic
  [Microsoft.VisualBasic.FileIO.FileSystem]::DeleteFile($path, 'OnlyErrorDialogs', 'SendToRecycleBin')
  [Microsoft.VisualBasic.FileIO.FileSystem]::DeleteDirectory($path, 'OnlyErrorDialogs', 'SendToRecycleBin')
  ```
- Uncommitted changes are off limits: never remove or move a modified or staged file.
- Leave `.claude/worktrees/` alone (they belong to other sessions); report their size and any stale ones (`git worktree list`).
- Never rewrite git history. Large blobs in history are reported, not removed.
- Don't stop running dev servers or apps to free locked files; skip the locked file and note it.

## Phase 1: measure (you, or one `haiku` agent for a big tree)

- Total size of the project folder, and the 20 largest directories and files.
- Stack detection: `Cargo.toml`, `package.json` (+ lockfile → package manager), `pyproject.toml` / `requirements.txt`, `*.csproj`, `go.mod`, Tauri, Svelte, Next, Vite…
- `git status` and `git count-objects -vH` if it's a repo.
- Create `.claude/runs/<yyyy-mm-dd>-clean/` with `report.md` and `questions.md`.

## Phase 2: tier 1, regenerable (do it)

Measure each before removing, so the report shows what was freed.

| Stack | Remove | How |
|---|---|---|
| Rust | `target/` | `cargo clean` in each workspace root (also Tauri's `src-tauri/`) |
| Node / Vite / Svelte / Next / Astro | `dist/`, `build/`, `.svelte-kit/`, `.next/`, `.nuxt/`, `.astro/`, `.vite/`, `.turbo/`, `.parcel-cache/`, `node_modules/.cache/`, `coverage/`, `*.tsbuildinfo` | only if git-ignored or untracked, and not a committed deploy folder |
| Python | `__pycache__/`, `.pytest_cache/`, `.mypy_cache/`, `.ruff_cache/`, `*.egg-info/`, `build/`, `dist/` | |
| .NET | `bin/`, `obj/` | `dotnet clean` first |
| Go | (nothing in-tree by default) | |
| Any | `*.log`, crash dumps, `.DS_Store`, `Thumbs.db`, temp files | only if git-ignored or untracked |
| git | loose objects | `git gc` (default prune window; never `--prune=now --aggressive` unasked) |

Rules: a folder only counts as regenerable if a project script or tool rebuilds it **and** it's git-ignored or untracked. If a `dist/` or `build/` folder is tracked, it's a tier 2 question, not a deletion.

`#clean deep` also removes `node_modules/` and `.venv/` / `venv/`. Say in the report how to restore them (`pnpm install`, `uv sync`…).

## Phase 3: tier 2, find what's unused (up to 3 `sonnet` agents, read-only)

Split by kind of candidate; each agent returns candidates with evidence, nothing removed.

- **Unreferenced assets**: images, fonts, video, audio, SVGs, JSON data in `public/`, `static/`, `assets/`, `src/**`. A file is a candidate when its name (with and without extension, and its import path) appears nowhere in source, styles, HTML, config, manifests or docs. Watch for dynamic references (template strings, globbed imports like `import.meta.glob`, `include_bytes!`, `include_str!`, Tauri resource lists, CSS `url()`, `srcset`, `<picture>` variants, `-dark`/`-light` pairs, sizes like `@2x`): if a dynamic pattern could match, mark it **unsure**, not unused.
- **Old versions and leftovers**: names like `*-old.*`, `*_old`, `*.bak`, `*.orig`, `*~`, `copy of *`, `* (1).*`, `*-v1.*` beside a newer version, `backup/`, `old/`, `archive/`, `unused/`, `deprecated/`; superseded exports (`*-final-final.*`); stale generated files with no generator left.
- **Duplicates**: identical files by hash (size first, then SHA-256), keeping the one that's referenced.
- **Heavy items**: files over 5 MB in the tree, and for git repos the largest blobs in history (`git rev-list --objects --all | git cat-file --batch-check`), reported only.

Each candidate: `path · size · kind · evidence (search done, no hits / which file supersedes it) · confidence (unused / unsure)`.

Verify the "unused" list once more yourself before proposing (one more search per candidate with the broadest pattern). Anything you can't rule out stays **unsure** and isn't proposed for removal.

## Phase 4: confirm and remove

- Write the tier 2 list to `report.md`, grouped by kind, with sizes and evidence.
- Interactive run: ask once, with the totals per group, which groups (or items) to remove. Autonomous or overnight run: don't ask; put the list in `questions.md` and remove nothing from tier 2.
- On a yes: tracked files go out with `git rm` on a new branch `clean/<yyyy-mm-dd>` in one commit per group (follow the user's git identity rules); untracked files go to the Recycle Bin. Then run the project's build and tests (or at least the build) to prove nothing needed was removed; if it breaks, restore that group (`git revert` / Recycle Bin restore) and report it.
- Never push.

## Report

End with a table: before size, freed by tier 1, freed by tier 2, after size; what was removed and how to get each kind back; tier 2 items awaiting a decision; unsure items; big history blobs; locked files skipped.
