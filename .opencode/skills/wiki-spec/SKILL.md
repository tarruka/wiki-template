---
name: wiki-spec
description: >-
  Spec-first authoring for SDD projects — write a feature's dossier as a SPEC
  before the code exists, with testable acceptance criteria that drive the
  implementation. Use when the user says "spec out feature X", "write the spec
  for X", or starts new work in an sdd-mode project. Only active when
  wiki/CONFIG.md mode is sdd.
---

# wiki-spec

Write the contract before the code. The dossier leads; implementation follows it.

## Mode gate

Read `wiki/CONFIG.md` first. If `mode` is **not** `sdd`, stop and tell the user
this project is `wiki-only` (mature codebase — document what exists with
`wiki-feature` instead). Offer to switch the mode if they really want SDD, but
don't proceed silently.

## Procedure

1. Read `wiki/CONFIG.md`, `wiki/SCHEMA.md`, `wiki/index.md`. Follow SCHEMA's
   "Traceability" and "sdd-mode specs carry three extra sections" exactly.
2. Create `wiki/features/<kebab-name>.md` with `status: spec`. The dossier slug
   is the **feature id** used in every AC id (e.g. `checkout-S2-AC1`).
3. Body, spec-flavored and **traceable**:
   - `## TL;DR` (intent + why), `## Concepts`.
   - `## Current state & evidence` — for new work, "not built"; if some code
     exists, cite it and name the gap. Don't write code cites you can't back up.
   - `## Acceptance criteria` — break into **Stories** `<slug>-S1`, `-S2`… (each
     "As a X, I want Y, so that Z"), and under each, **ACs** `<slug>-S1-AC1`…
     each one observable/testable (Given/When/Then or EARS). Mark beta-critical
     stories. This is the heart — vague AC = vague code, so ask if ambiguous.
   - `## Test plan` — the table from SCHEMA: one row per AC (`AC | layer | test
     location | status ☐`). Status starts unchecked; `wiki-verify` fills it.
   - `## Business rules` (rule + **Why:**), `## Flows` (intended UI→state→API),
     `## Out of scope`.
4. Wikilink to the architecture patterns the work will touch and any upstream
   PRD/ADR/meeting that motivated it (causality).
5. If tickets are tracked (Jira/Azure per CONFIG), the IDs are the contract:
   Epic = this feature, Story = each `-Sx`, ACs in the Story. Note that for the
   user so the ticket and spec don't drift.

Hand off: tell the user the spec is ready to implement (TDD against the ACs by
id), then `wiki-test-plan`, then `wiki-verify` (reads the Test plan table) to
promote it to `stable`. Add the dossier to `wiki/index.md` under its section.