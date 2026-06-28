---
name: wiki-verify
description: >-
  The SDD verification gate — check that the shipped code and tests actually
  satisfy each acceptance criterion the feature borrows from its origin spec,
  fill in the code citations, and promote the feature from building to stable
  (the spec is never touched). Use when the user says "verify feature X against
  its spec", "did we build X to spec?", or after implementing an sdd-mode
  feature. Only active when wiki/CONFIG.md mode is sdd.
---

# wiki-verify

Close the SDD loop: prove the feature's code matches its origin spec, then
promote the **feature**. The spec is a contract — it's never promoted or edited
here.

## Mode gate

Read `wiki/CONFIG.md`. If `mode` is not `sdd`, stop — in `wiki-only` projects
verification of existing behavior is just a normal `wiki-feature`/`wiki-ingest`
update, not a spec-vs-code gate.

## Procedure

1. Read the **feature** dossier (`wiki/features/`). It must have `## Origin &
   links` naming `origin: [[spec-slug]]` + the AC ids it covers, and a
   `## Test plan` table. If it has no origin spec, it wasn't spec'd — say so.
   Open the origin spec to read each AC's actual Given/When/Then (the feature
   only references the ids).
2. For **each AC id** (`<spec>-Sx-ACy`) the feature claims, locate the
   implementing code and the test that covers it. Run the test suite (`npm test`
   / project equivalent) and confirm it passes. Cite the real code as `path:line-line`.
3. Update the feature's `## Test plan` table in place: tick `☐ → ☑` per AC,
   filling its test location. Be adversarial — an AC with no test or no code path
   is **not** met, leave it unchecked.
4. If every claimed AC is checked: fill the feature's `## Key files` with the
   citations, flip the feature's `status: building` → `stable`, bump
   `last_review`, add a `## Changelog` line. If gaps remain: leave `building`,
   list the unmet AC ids as remaining work, do **not** promote. Either way, the
   spec's `status` (`ratified`) is left untouched.
5. Never mark `stable` on assertion alone — evidence (passing tests + matching
   code) only.

Report the verdict table and the feature's status decision.