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
  specs/                # the contracts — one .md per spec (sdd mode)
  features/             # the as-built — one .md per implemented flow
```

`specs/` is born the first time `wiki-spec` runs (sdd mode only). A **spec** is
the contract (the ACs); a **feature** is the as-built record that implements it.
One spec can originate **N features** (one per Story); each feature points back
to exactly one origin spec. See "Spec vs feature" below.

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

`status` rules of thumb (active set depends on `mode` and on whether the page is
a spec or a feature):

Features (and architecture/gotcha pages):

- `draft` — written from a snapshot read of the code, not yet validated.
- `stable` — last_review aligns with code; can be trusted.
- `needs-review` — a recent code change is suspected to have invalidated parts.
- `building` — **sdd mode only.** Code for this feature is in progress, not yet
  verified against its spec. Promoted to `stable` by `wiki-verify`.

Specs (**sdd mode only**, live in `specs/`):

- `draft` — being elicited/written; the contract isn't agreed yet.
- `ratified` — the contract is agreed and ready to implement. A spec does **not**
  become `stable` — it's a contract, not a code-tracking page. It only changes if
  something upstream changes (business rules, needs).

## Elicitation (authoring from intent)

Shared protocol for skills that build a page from a **fuzzy ask** rather than
from reading existing code or a given source (e.g. `wiki-spec`, `wiki-prd`, and a
light form in `wiki-adr`). Surface what you'd otherwise silently assume before
writing — don't author from a one-liner. Loop:

1. User gives rough intent.
2. Draft the page in your head, then list **every assumption you had to make** to
   fill the blanks — as a **numbered list**. Scope it to the page's domain (the
   invoking skill names which blanks); skip technical/implementation choices
   unless that's the page's job.
3. User replies with the **numbers** they reject. The rest stand as confirmed.
4. Resolve the rejected set **one at a time** with the interactive selector:
   per item, offer ~3–4 concrete options (the tool adds "Other" for a custom
   answer). After each answer, restate the corrected assumption in one line and
   show progress — e.g. `(2/5 resueltas)`. The count is honest: the rejected set
   is fixed once given.
5. When the rejected set is empty, restate the full corrected understanding and
   confirm before authoring.

Don't show a progress bar before the rejection set is known, and don't hand-roll
the multiple-choice — use the harness's interactive selector for it.

## Spec vs feature (sdd mode)

Two artifacts, two jobs:

- **Spec** (`specs/`) — the *contract*. Forward-looking: what should be true and
  why. Holds the ACs (the Given/When/Then text). Immutable once `ratified` unless
  upstream changes. Doesn't track code.
- **Feature** (`features/`) — the *as-built*. Backward-looking: how it actually
  works now, with code cites and the evidence (tests) that each AC is met. Points
  to its origin spec by id and **references** the spec's ACs — it never recopies
  their text (recopying = the two drift = the problem this split exists to kill).

`wiki-only` mode has no specs — features document existing code, ACs optional.

## Spec anatomy (`specs/<spec-slug>.md`, sdd mode)

```
# Title

## TL;DR              intent + why.
## Concepts           domain vocabulary, defined before use.
## Acceptance criteria   the contract — Stories + ACs. The heart. See Traceability.
## Business rules     each: rule + **Why:**.
## Flows              intended UI → state → API.
## Out of scope       what this spec deliberately does not cover.
```

The spec carries the AC text once. No test plan, no code cites here — those are
evidence, and evidence lives on the feature.

## Feature anatomy (`features/<feature-slug>.md`)

```
# Title

## TL;DR
One paragraph. What this does and the single most important rule to remember.

## Origin & links
sdd: `origin: [[spec-slug]]` and the AC ids this feature satisfies
(`spec-S1-AC1, spec-S1-AC2`). Plus [[other-feature]], [[architecture/x]].

## Concepts
Domain vocabulary used below. Define before using.

## Acceptance criteria      (sdd: references the spec's AC ids — do NOT recopy the
                             Given/When/Then; wiki-only: optional, inline here)
- spec-S1-AC1 — one-line restatement, link to [[spec-slug#story]].

## Test plan                (sdd: the evidence table; wiki-verify fills it)
| AC | Layer (unit/integration/e2e) | Test location | Status |
|----|------------------------------|---------------|:------:|
| spec-S1-AC1 | unit | `path/to/test` | ☐ |

## Flows
Step-by-step, as built. UI step → state change → API call → response handling.

## Business rules
Each line: the rule + **Why:** the reason + cite.

## Key files
`path/to/file.ts:42-58` — what this file owns.

## Gotchas
Things that surprised the author or violate the path of least surprise.

## Changelog
- 2026-01-01 — initial draft.
```

Sections may be omitted if empty. Don't write stubs.

## Traceability (the spine of sdd mode)

Every acceptance criterion gets a **stable ID** so it can be traced to a test, a
ticket, and the code that satisfies it. The ID is rooted in the **spec** — the
feature borrows it, never mints its own. The unit hierarchy:

```
<spec-slug>            the spec — one contract
<spec-slug>-S1         a Story: a testable slice you'd assign/estimate
<spec-slug>-S1-AC2     an Acceptance Criterion: one Given/When/Then
```

e.g. `checkout-S2-AC1`. Rules:

- ACs are **defined** in the spec; the feature that implements a Story references
  those ids. One spec → N features, but each AC id has exactly one home (the spec).
- An AC is **Done** only when its feature has a **passing test** for it (and
  matching code). That status lives in the feature's Test plan, not the spec.
- Each AC maps to ≥1 automated test; the test's name references the AC id.
- Tickets (Jira/Azure) mirror the same IDs: Epic = spec, Story = `-Sx`, the ACs
  live in the Story. Keep spec text and ticket text in sync.
- IDs are immutable once assigned — renumber by adding, not reshuffling.

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