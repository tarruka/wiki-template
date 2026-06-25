---
name: wiki-adr
description: >-
  Record an Architecture Decision Record. Use when the user says "record an ADR",
  "document this decision", "we decided to X over Y", or wants to capture a
  load-bearing technical choice and its rejected alternatives. Creates
  wiki/decisions/ on first use — this is the moment that folder earns its place.
---

# wiki-adr

Capture one decision. ADRs are immutable history — newer decisions supersede,
they don't overwrite.

## First-use note

The wiki is dev-only and ships without an ADR folder by design. This skill is the
trigger to add `wiki/decisions/`. Create it now and add a `## Decisions` section
to `wiki/index.md`. Update SCHEMA's "what does NOT belong here" line if needed so
it no longer excludes ADRs.

## Procedure

1. Read `wiki/SCHEMA.md` and `wiki/index.md`.
2. Gather from the user (ask if missing — don't invent): the decision, the
   context/forces, the alternatives considered and **why rejected**, and the
   consequences (what this makes easy/hard later).
3. Create `wiki/decisions/YYYY-MM-DD-<topic>.md` with frontmatter
   `name, status: accepted | superseded, created, deciders, tags`.
4. Body: `## Context`, `## Decision`, `## Alternatives rejected` (each + **Why
   not:**), `## Consequences`. Cite code with `path:line-line` where relevant.
5. Wikilink the feature/architecture pages this decision shaped (causality:
   decision → the pattern it produced). If it supersedes an older ADR, link both
   ways and flip the old one's status to `superseded`.

Report the ADR created and which pages now link to it.