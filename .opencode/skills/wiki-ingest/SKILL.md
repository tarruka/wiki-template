---
name: wiki-ingest
description: >-
  Integrate a source (a PR, a changed file, a code path, a diff) into the wiki by
  updating the pages whose claims it affects. Use when the user says "ingest this
  PR/file into the wiki", "the wiki is stale after this change", or after merging
  work that touches documented behavior. Integrates in place — never appends.
---

# wiki-ingest

Fold a source into the wiki without rewriting the whole thing.

## Procedure

1. Read `wiki/CONFIG.md` (sensitive paths + their page mapping), then
   `wiki/SCHEMA.md` and `wiki/index.md`.
2. Identify the source: a PR (`gh pr view`/diff), a changed file, or a path. Read
   the actual change.
3. Find the page(s) that own the affected claims — grep the wiki for the symbols,
   files, or routes involved. Use the `## Sensitive paths` mapping in CONFIG to
   jump straight to the dossiers a changed path feeds.
4. **Update in place.** Integrate the new reality into existing sentences; never
   leave "UPDATE 2026-…" stubs. Fix citations to the new line ranges.
5. Bump `last_review`. Set `status: stable` only if you verified the full page,
   else `needs-review`. **Specs are different**: a code change never moves a spec
   (it's a contract, not a code-tracking page) — if the change actually
   contradicts the contract, that's upstream drift: flag it for the user to amend
   the spec deliberately, don't silently flip its status. Add a one-line
   `## Changelog` entry.
6. Create a new page only if a genuinely new concept emerged — then link it from
   neighbors and the index. Don't spawn a page for an incremental change to an
   existing flow.

Report: pages updated, claims that changed, anything left `needs-review`.