---
name: wiki-prd
description: >-
  Write a Product Requirements Document. Use when a PM says "add a PRD", "write
  the PRD for X", "document what the client wants for X", or wants to capture the
  what/why of a product initiative before any technical decisions. Creates
  wiki/product/ on first use. PRDs sit upstream of ADRs and features.
---

# wiki-prd

Capture the product intent — the *what* and *why*, not the *how*. A PRD is the
upstream source the ADRs and feature dossiers derive from.

## First-use note

The wiki is dev-only by default; this skill is the trigger to add `wiki/product/`
and a `## Product` section to `wiki/index.md`. Update SCHEMA's "what does NOT
belong here" line if it still excludes product docs.

## Procedure

1. Read `wiki/SCHEMA.md` and `wiki/index.md`. If a client source exists (PDF,
   transcript, email), read it first — don't invent requirements.
2. Create `wiki/product/<kebab-name>.md` with frontmatter
   `name, status: draft | approved, created, last_review, owner, tags`.
3. Body — standard PRD shape (omit a section only if genuinely empty, no stubs):
   - `## Problem` — the user/business pain, with the "why now".
   - `## Goals` — outcomes this must achieve (and `## Non-goals`).
   - `## Users` — personas / who this is for.
   - `## User stories` — "As a X, I want Y, so that Z".
   - `## Success metrics` — observable, measurable.
   - `## Scope` / `## Out of scope`.
   - `## Open questions` — unresolved with the client.
4. Wikilink downstream (causality: PRD → the ADRs and features it spawns). Note
   that ADRs capture the technical decisions and feature dossiers the dev-facing
   detail — suggest `wiki-adr` / `wiki-feature` / `wiki-spec` for those.
5. Keep it product-level. No implementation detail, no code citations — that's
   what the downstream pages are for. Status `draft` until the client/stakeholders
   sign off, then `approved`.

Report the PRD created and the downstream links/suggestions.