---
name: schema
description: Conventions for this wiki. Format, frontmatter, wikilinks, citations.
---

# Wiki Schema

Project-specifics (mode, stack, roles, sensitive paths) live in [[CONFIG]].
This file only defines **how pages are written**.

## File layout

```
wiki/
  index.md              # entry point, the map
  SCHEMA.md             # this file
  CONFIG.md             # per-project knobs (mode, stack, roles, sensitive paths)
  architecture/         # cross-feature technical docs
  features/             # one .md per feature/flow
```

Folders for `decisions/`, `product/`, `qa/` are **not** created up front — they
are born on demand the first time their skill runs. `architecture/` and
`gotchas/` may be **seeded at bootstrap** from a snapshot read (as `draft`);
absent that, they too are on-demand.

## File naming

- `kebab-case.md`
- One concept per file. If a "feature" contains 2+ independent flows, split them.

## Frontmatter

```yaml
---
name: short-slug
status: draft | stable | needs-review
created: 2026-01-01
last_review: 2026-01-01
owner: you
tags: [domain, area]
---
```

`status` rules of thumb (active set depends on `mode` in [[CONFIG]]):

- `draft` — written from a snapshot read of the code, not yet validated.
- `stable` — last_review aligns with code; can be trusted.
- `needs-review` — a recent code change is suspected to have invalidated parts.
- `spec`, `building` — **sdd mode only.** `spec` = written before the code;
  `building` = code in progress, unverified. Promoted to `stable` by `wiki-verify`.

## Page anatomy (feature dossier)

```
# Title

## TL;DR
One paragraph. What this does and the single most important rule to remember.

## Origin & links
Wikilinks out: [[other-feature]], [[architecture/x]]. Skip if isolated.

## Concepts
Domain vocabulary used below. Define before using.

## Acceptance criteria      (sdd mode: the contract; wiki-only: optional)
Observable, testable. Given / When / Then or EARS. See "Traceability" below.

## Flows
Step-by-step. UI step → state change → API call → response handling.

## Business rules
Each line: the rule + **Why:** the reason + cite.

## Key files
`path/to/file.ts:42-58` — what this file owns.

## Gotchas
Things that surprised the author or violate the path of least surprise.

## Changelog
- 2026-01-01 — initial draft.
```

## Traceability (the spine of sdd mode)

Every acceptance criterion gets a **stable ID** so it can be traced to a test, a
ticket, and the code that satisfies it. The unit hierarchy:

```
<feature-slug>            the dossier — one feature
<feature-slug>-S1         a Story: a testable slice you'd assign/estimate
<feature-slug>-S1-AC2     an Acceptance Criterion: one Given/When/Then
```

e.g. `checkout-S2-AC1`. Rules:

- An AC is **Done** only when it has a **passing test** (and, in sdd, matching code).
- Each AC maps to ≥1 automated test; the test's name references the AC id.
- Tickets (Jira/Azure) mirror the same IDs: Epic = feature, Story = `-Sx`, the
  ACs live in the Story. Keep spec text and ticket text in sync.
- IDs are immutable once assigned — renumber by adding, not reshuffling.

## sdd-mode specs carry three extra sections

On top of the anatomy above, a `status: spec` dossier adds:

```
## Current state & evidence
What exists today, with code cites — or "nothing yet". This is what makes the
spec verifiable instead of aspirational. (For a brand-new feature: "not built".)

## Acceptance criteria
### <feature>-S1 — <story title>  [beta-critical?]
As a <role>, I want <capability>, so that <outcome>.
- <feature>-S1-AC1 — Given <state>, when <action>, then <observable result>.

## Test plan
| AC | Layer (unit/integration/e2e) | Test location | Status |
|----|------------------------------|---------------|:------:|
| <feature>-S1-AC1 | unit | `path/to/test` | ☐ |
```

`wiki-verify` reads this Test plan table to gate promotion to `stable`.

Sections may be omitted if empty. Don't write stubs.

## Wikilinks — when to use them

Only when one of these holds:

1. **Causality** — A produced B (meeting → ADR → feature, bug → gotcha).
2. **Hierarchy** — A contains B (milestone → features, feature → test plan).
3. **Cross-reference** — same thing from a different angle (feature ↔ architecture).

Do **not** link because two pages share a keyword, "might be interesting", or
"just in case". Rule of thumb: if removing the link leaves the page
understandable, it wasn't necessary.

Density target per dossier: 5–10 wikilinks. <3 = isolated, >15 = noise.

Syntax: `[[page-name]]` or `[[page-name#section]]`. Never raw paths.

## Code citations

- `path/to/file.ts:42-58` — preferred. Path + line range.
- Don't paste large code blocks; quote 1–3 lines + cite, then summarize.
- Cite once where the claim is made.

## What does NOT belong here

- Code/file-trees you can read by opening the file or running `ls`.
- Commit history or PR summaries — that's `git log`'s job.
- Standups, sprint state, ticket counts, roadmap.
- Secrets, credentials, tokens, env values.
- Generic framework knowledge ("what is React").

## Updating

When code drifts from a page: find the page that owns the claim, **integrate**
the fix in place (don't append "UPDATE 2026-…"), bump `last_review`, flip
`status`. Delete pages that are no longer needed and remove their index entry.