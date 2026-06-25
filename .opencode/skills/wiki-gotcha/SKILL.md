---
name: wiki-gotcha
description: >-
  Document a known trap, fragile area, or surprising behavior. Use when the user
  says "document this gotcha", "this breaks when…", "remember this footgun". If
  the trap belongs to one feature, it goes in that dossier's Gotchas section; if
  it spans features, it becomes a standalone page in wiki/gotchas/.
---

# wiki-gotcha

Capture a footgun so the next person doesn't step on it.

## Decide where it lives

- **Single feature** → integrate into that dossier's `## Gotchas` section (the
  default home per SCHEMA). Don't create a new page.
- **Cross-cutting** (affects 2+ features or an architecture pattern) → create
  `wiki/gotchas/<slug>.md` (create the folder + a `## Gotchas` index section on
  first use) and cross-link the affected dossiers.

## Procedure

1. Read `wiki/SCHEMA.md` and `wiki/index.md`.
2. Write the gotcha as: **what surprises you**, **why it happens** (cite
   `path:line-line`), and **what to do instead / how to avoid it**. One tight
   entry — not an essay.
3. Cross-reference the feature(s) or architecture page it affects
   (cross-reference relation). If it came from a real bug, note the symptom so a
   future reader recognizes it.
4. If it stems from a deliberate trade-off, suggest `wiki-adr` to record the why.

Report where you put it and what you linked.