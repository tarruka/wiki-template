---
name: wiki-meeting
description: >-
  Turn meeting/client notes into a decision record. Use when the user pastes
  meeting notes, says "log this meeting", or "capture what we agreed with the
  client". Extracts decisions + action items and links downstream to the ADRs and
  features they caused. Creates wiki/product/client-meetings/ on first use.
---

# wiki-meeting

Distill a meeting into decisions and follow-ups — not a transcript.

## First-use note

The wiki is dev-only by default; this skill adds `wiki/product/client-meetings/`
and a `## Product` (or `## Meetings`) section to `wiki/index.md`. Do this on first
invocation.

## Procedure

1. Read `wiki/SCHEMA.md` and `wiki/index.md`.
2. From the notes, extract only what has durable value: **decisions made**,
   **open questions**, **action items** (owner + what). Drop chit-chat, scheduling,
   and anything ephemeral.
3. Create `wiki/product/client-meetings/YYYY-MM-DD-<topic>.md` with frontmatter
   `name, date, attendees, tags`.
4. Body: `## Decisions`, `## Open questions`, `## Action items`. Keep it terse.
5. Wikilink downstream (causality: meeting → ADR / feature it produced). If a
   decision here warrants an ADR, suggest running `wiki-adr`. If it changes a
   documented flow, suggest `wiki-ingest` on the affected dossier.
6. Never store PII beyond first names/roles, and no credentials.

Report the note created and the downstream links/suggestions.