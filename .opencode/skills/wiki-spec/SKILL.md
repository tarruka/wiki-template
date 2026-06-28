---
name: wiki-spec
description: >-
  Spec-first authoring for SDD projects — write the contract (a spec in
  wiki/specs/) before the code exists, with testable acceptance criteria that
  drive the implementation. One spec originates N features. Use when the user
  says "spec out X", "write the spec for X", or starts new work in an sdd-mode
  project. Only active when wiki/CONFIG.md mode is sdd.
---

# wiki-spec

Write the contract before the code. The dossier leads; implementation follows it.

A spec is the **spine**: it doesn't change once ratified unless something
upstream does (business rules, needs). One spec can originate **N features**
(one per Story), each pointing back to the spec by id. The ACs live here, in the
spec — features reference them, they don't recopy them.

## Mode gate

Read `wiki/CONFIG.md` first. If `mode` is **not** `sdd`, stop and tell the user
this project is `wiki-only` (mature codebase — document what exists with
`wiki-feature` instead). Offer to switch the mode if they really want SDD, but
don't proceed silently.

## Elicitation (before authoring)

Run SCHEMA's **Elicitation** loop before writing — surface assumptions as a
numbered list, let the user reject by number, resolve one-by-one with the
interactive selector, confirm. For a spec, the blanks to surface are the
**non-technical/functional** decisions the user never stated: scope edges, who
can do what, unhappy-path behavior, defaults. Don't list technical choices.

## Procedure

1. Read `wiki/CONFIG.md`, `wiki/SCHEMA.md`, `wiki/index.md`. Follow SCHEMA's
   "Traceability" and "Spec anatomy" exactly.
2. Create `wiki/specs/<kebab-name>.md` with `status: draft` (born here the first
   time this skill runs). The dossier slug is the **spec id** used in every AC id
   (e.g. `checkout-S2-AC1`); the features that implement it reference these ids,
   they don't define their own.
3. Body (contract only — no test plan, no code cites; those are evidence and live
   on the feature):
   - `## TL;DR` (intent + why), `## Concepts`.
   - `## Acceptance criteria` — break into **Stories** `<slug>-S1`, `-S2`… (each
     "As a X, I want Y, so that Z"), and under each, **ACs** `<slug>-S1-AC1`…
     each one observable/testable (Given/When/Then or EARS). Mark beta-critical
     stories. This is the heart — vague AC = vague code, so ask if ambiguous.
   - `## Business rules` (rule + **Why:**), `## Flows` (intended UI→state→API),
     `## Out of scope`.
4. Wikilink to the architecture patterns the work will touch and any upstream
   PRD/ADR/meeting that motivated it (causality).
5. If tickets are tracked (Jira/Azure per CONFIG), the IDs are the contract:
   Epic = this spec, Story = each `-Sx`, ACs in the Story. Note that for the
   user so the ticket and spec don't drift.
6. Once the user agrees the contract is right, flip `status: ratified`. The spec
   won't change again unless something upstream does.

Hand off: one spec → **N features** (one per Story, or one if small). Tell the
user to run `wiki-feature` per implementable slice (each linking `origin` here +
the AC ids it covers), build TDD against those ACs, then `wiki-verify` to promote
the **feature** to `stable`. The spec stays put. Add the spec to `wiki/index.md`.