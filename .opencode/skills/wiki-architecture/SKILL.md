---
name: wiki-architecture
description: >-
  Create or update a cross-feature technical doc in wiki/architecture/. Use when
  the user wants to document a codebase-wide pattern, layer, or convention (data
  fetching, auth/RBAC, forms, modals, contexts, project structure) — anything
  consumed by multiple features rather than owned by one.
---

# wiki-architecture

Author or update one doc in `wiki/architecture/`.

## When this, not wiki-feature

Use `wiki-architecture` for a pattern/layer many features depend on (the Axios
clients, the RHF+Zod convention, the modal context, role gating). Use
`wiki-feature` for a single user-facing flow. If unsure: does removing one
feature make this doc pointless? If no, it's architecture.

## Procedure

1. Read `wiki/SCHEMA.md` and `wiki/index.md`. Follow the same anatomy and
   frontmatter as feature dossiers (TL;DR is mandatory; the rest as fits).
2. Read the real code first. Cite `path/to/file.ts:line-line`; summarize, don't
   dump code.
3. Create/update `wiki/architecture/<kebab-name>.md`, integrating into existing
   text rather than appending.
4. Architecture docs are wikilink hubs: features link _up_ to them. Make sure the
   features that consume this pattern link to it, and add it under
   `## Architecture` in the index.
5. Frontmatter status: `draft` from a snapshot read, `stable` once verified.

Report files touched and new index/cross-links added.