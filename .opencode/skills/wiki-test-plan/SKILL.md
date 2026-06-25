---
name: wiki-test-plan
description: >-
  Write a QA test plan for a feature. Use when the user says "write a test plan
  for X", "what should QA check for X", or wants observable acceptance criteria
  turned into test cases. Links up to the feature dossier. Creates wiki/qa/test-plans/
  on first use.
---

# wiki-test-plan

Turn a feature's behavior into testable, observable cases.

## First-use note

The wiki ships without a QA folder; this skill adds `wiki/qa/test-plans/` and a
`## QA` section to `wiki/index.md` on first invocation.

## Procedure

1. Read `wiki/SCHEMA.md`, `wiki/index.md`, and the feature's dossier in
   `wiki/features/` — the test plan derives from its Flows and Business rules.
   If no dossier exists, suggest `wiki-feature` first.
2. Create `wiki/qa/test-plans/<feature-slug>.md` with frontmatter
   `name, status, created, last_review, owner, tags, feature: <dossier-slug>`.
3. Body: `## Scope`, `## Preconditions` (roles/data needed — use the `roles`
   declared in `wiki/CONFIG.md` if the app is role-gated),
   `## Cases` (each: given → when → then, observable), `## Edge cases & negatives`.
4. Derive cases from the dossier's business rules — each rule should map to at
   least one positive and one negative case.
5. Wikilink up to the feature (hierarchy: feature → test plan) and add the
   reverse link from the dossier.

Report the plan created and the dossier link added.