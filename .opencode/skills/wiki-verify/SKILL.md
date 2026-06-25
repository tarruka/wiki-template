---
name: wiki-verify
description: >-
  The SDD verification gate — check that the shipped code and tests actually
  satisfy each acceptance criterion in a feature's spec, fill in the code
  citations, and promote the dossier from spec/building to stable. Use when the
  user says "verify feature X against its spec", "did we build X to spec?", or
  after implementing an sdd-mode feature. Only active when wiki/CONFIG.md mode is sdd.
---

# wiki-verify

Close the SDD loop: prove the code matches the spec, then promote the dossier.

## Mode gate

Read `wiki/CONFIG.md`. If `mode` is not `sdd`, stop — in `wiki-only` projects
verification of existing behavior is just a normal `wiki-feature`/`wiki-ingest`
update, not a spec-vs-code gate.

## Procedure

1. Read the feature dossier (must have `## Acceptance criteria` with AC ids and a
   `## Test plan` table from `wiki-spec`). If it has none, it wasn't spec'd — say so.
2. For **each AC id** (`<slug>-Sx-ACy`), locate the implementing code and the test
   that covers it. Run the test suite (`npm test` / project equivalent) and
   confirm it passes. Cite the real code as `path:line-line`.
3. Update the `## Test plan` table in place: tick `☐ → ☑` per AC, filling its
   test location. Be adversarial — an AC with no test or no code path is **not**
   met, leave it unchecked.
4. If every AC is checked: fill the dossier's `## Key files` with the citations,
   flip `status: spec`/`building` → `stable`, bump `last_review`, add a
   `## Changelog` line. If gaps remain: leave `status: building`, list the unmet
   AC ids as the remaining work, and do **not** promote.
5. Never mark `stable` on assertion alone — evidence (passing tests + matching
   code) only.

Report the verdict table and the status decision.