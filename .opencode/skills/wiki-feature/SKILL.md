---
name: wiki-feature
description: >-
  Create or update a feature/flow dossier in wiki/features/. Use when the user
  says "document feature X", "write a dossier for X", "update the X dossier", or
  after building/changing a user-facing flow. Produces a dossier in the exact
  anatomy defined in wiki/SCHEMA.md.
---

# wiki-feature

Author or update one dossier in `wiki/features/`.

## Procedure

1. Read `wiki/SCHEMA.md` (page anatomy + frontmatter + wikilink rules) and
   `wiki/index.md`. Match them exactly — do not invent a different structure.
2. If the dossier exists, **update in place** (integrate, don't append). If new,
   create `wiki/features/<kebab-name>.md`.
3. Read the real code before writing. Cite with `path/to/file.ts:42-58`; quote
   1–3 lines max, then summarize. Never paste large blocks or file trees.
4. Use the page anatomy from SCHEMA: `# Title`, then `## TL;DR`,
   `## Origin & links`, `## Concepts`, `## Flows`, `## Business rules`
   (each rule + **Why:** + cite), `## Key files`, `## Gotchas`, `## Changelog`.
   Omit empty sections — no stubs.
5. Frontmatter: `name, status, created, last_review, owner, tags`. New dossiers
   written from a snapshot read start as `status: draft`.
6. Wikilinks: 5–10 per dossier, only when causality / hierarchy / cross-reference
   holds (see SCHEMA). Link from neighboring dossiers too, and add an entry under
   the right section of `wiki/index.md`.
7. One concept per file. If the "feature" has 2+ independent flows, split them.

Report which files you created/edited and which index entries you added.