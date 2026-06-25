---
name: wiki-lint
description: >-
  Health-check the wiki for rot. Use when the user says "lint the wiki", "check
  the wiki for dead links", "is the wiki stale?", or periodically after a batch
  of changes. Reports orphans, dead links, stale claims, and contradictions;
  proposes fixes without deleting pages unapproved.
---

# wiki-lint

Find rot. Don't fix silently; report then propose.

## Checks

1. **Orphans** — pages with no inbound `[[wikilinks]]` and not listed in
   `wiki/index.md`. Either link them in or flag for deletion.
2. **Dead links** — `[[wikilinks]]` pointing at non-existent pages/sections.
   Grep every `[[...]]` and resolve each target against the files in `wiki/`.
3. **Stale claims** — for each page, spot-check its code citations
   (`path:line-line`) against the current file. If the cited lines no longer
   match the claim, mark the page `needs-review`.
4. **Contradictions** — the same rule stated differently on two pages (common
   between a feature dossier and its architecture doc). Pick the correct one,
   reconcile.
5. **SCHEMA violations** — missing frontmatter, stub sections, raw paths instead
   of wikilinks, wikilink density <3 or >15, code dumps that should be citations.

## Output

A prioritized report: file → issue → proposed fix. Apply only the safe
mechanical fixes (dead-link retargeting, status flips, index entries) directly;
list anything destructive (page deletion, large rewrites) for approval first.