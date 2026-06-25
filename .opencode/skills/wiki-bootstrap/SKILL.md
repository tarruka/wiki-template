---
name: wiki-bootstrap
description: >-
  Set up the knowledge wiki in a repo that doesn't have one yet (or repair an
  incomplete one). Use when the user says "set up the wiki", "bootstrap the
  wiki", "init the knowledge base", or drops this template into a new project.
  Detects project maturity, picks SDD vs wiki-only mode, writes wiki/CONFIG.md,
  and scaffolds the MVP. Run this ONCE per repo.
---

# wiki-bootstrap

The portable entry point. Makes this skill set work in any repo by writing a
project-specific `wiki/CONFIG.md` that all other skills read.

## 1. If a wiki already exists

If `wiki/CONFIG.md` exists, this repo is already bootstrapped — don't re-scaffold.
Read it, report the mode, and point the user at the relevant skills. If `wiki/`
exists but `CONFIG.md` is missing, only create the config (infer from existing
pages); don't touch existing dossiers.

## 2. Decide the mode (the core decision)

Inspect the repo and pick `sdd` or `wiki-only`. Signals:

- **Lean `sdd`** when the repo is greenfield: few commits, little/no `src`, no
  established features, mostly scaffolding. Here the wiki can lead the code.
- **Lean `wiki-only`** when the repo is mature: deep `git log`, substantial code,
  many shipped features, existing tests. Here the wiki documents what exists.
- **Ambiguous** (some code, early stage): present both with a one-line rationale
  and let the user choose. Don't guess silently.

Gather signals with: `git log --oneline | wc -l`, a glance at the source tree,
presence of tests, and the README. State the signals you used in your recommendation.

## 3. Write wiki/CONFIG.md

Fill it from the repo: `mode`, `project`, `stack` (from package manifest /
README), `roles` (if the app is role-gated — else omit), and `sensitive_paths`
(the dirs whose churn invalidates docs: data layer, auth, shared contexts/state,
public API surface). Use the shape in `${TEMPLATE_ROOT}/wiki/CONFIG.template.md`.

## 4. Scaffold the MVP (only what's missing)

- `wiki/SCHEMA.md` — conventions (page anatomy, frontmatter, wikilink rules,
  citations). If absent, copy `${TEMPLATE_ROOT}/wiki/SCHEMA.md` into the
  project. Add the SDD statuses (`spec`, `building`) to the lifecycle section
  only when `mode: sdd`.
- `wiki/index.md` — the map. Include a "Tooling" section listing the curator and
  the skills available **for the chosen mode**, plus a one-line pointer:
  "engineering conventions → `.opencode/conventions/project.md`".
- `wiki/features/` — empty dir for dossiers.
- `wiki/architecture/` — **seed by default** from a snapshot read of the code
  (meaningful on mature `wiki-only` repos). Identify the cross-cutting topics
  the repo *actually has* and create one file per topic by delegating to
  `wiki-architecture` — never one mega-file. e.g. `data-fetching.md`,
  `services.md`, `state-management.md`, `auth.md`, `routing.md`,
  `error-handling.md`; only those present. Pages are `status: draft`. In
  greenfield `sdd`, skip — there is nothing to analyze.
- `wiki/gotchas/` — seed **only** for traps backed by concrete code evidence,
  by delegating to `wiki-gotcha`. No speculation. If none surface, do not create
  the folder. No empty stubs.
- Do **not** create product/QA/ADR folders — those are born on demand by their
  skills (`wiki-adr`, `wiki-meeting`, `wiki-test-plan`).

## 5. Infer conventions → project conventions for opencode

With CONFIG written (its `sensitive_paths` scope this step), look for
**repeated** conventions — how something is consistently done across the repo —
within those sensitive paths plus obvious cross-cutting patterns. A one-off
defect is not a convention; only a consistent pattern earns a rule. Do **not**
sweep the whole repo.

Triage each detected convention with a software-architect lens (boundaries,
coupling/cohesion, error handling, validation at trust boundaries, layering),
tech-agnostic:

- **Good / neutral** → candidate rule, as-is.
- **Bad but consistent** (an anti-pattern that has become "the way it's done
  here") → do not codify it. Propose the *better* convention instead, shown as
  **current → recommended** with the reason.

Present the full batch **before writing anything**. For each candidate show: the
path glob, the convention, its classification, and — for flagged ones — the
current → recommended directive and why. The user approves / edits / drops per
item. **Never write an unapproved convention** — neither good nor improved ones.

Write approved conventions to `.opencode/conventions/project.md` — opencode
consults files listed in `instructions` on every task, so this file becomes
ambient guidance the agent follows automatically:

```
# Project Conventions

## <convention title>
- <the directive — actionable, imperative>
```

Also detect the stack from step 3 (`stack` field in CONFIG) and include
relevant **tech-stack conventions** in the same file. For common stacks:

- `typescript`, `ts` → TypeScript best practices
- `react`, `next`, `remix` → React patterns
- `node`, `express`, `fastify` → Node.js patterns
- `python`, `django`, `flask` → Python patterns
- `rust`, `axum` → Rust patterns

If the stack is ambiguous or unknown, skip the tech conventions — don't guess.

Greenfield `sdd` repos have little code to analyze — skip the project-specific
convention inference rather than invent. Tech-stack conventions can still be
included if the stack is clear.

Then add the conventions file to `instructions` in `${PROJECT}/opencode.json`:

```json
"instructions": [".opencode/conventions/project.md"]
```

If `instructions` already exists, append to it rather than replacing.

This is the only artifact `wiki-bootstrap` writes outside `wiki/`.

## 6. The drift reminder (already active)

The drift plugin (`${TEMPLATE_ROOT}/.opencode/plugin/wiki-drift.ts`) monitors
sensitive paths after edits and nudges to run `wiki-ingest`. It is enabled by
adding the plugin to `opencode.json`:

```json
"plugin": ["${TEMPLATE_ROOT}/.opencode/plugin/wiki-drift.ts"]
```

Or it will auto-load from `.opencode/plugin/`. The plugin reads globs from
`wiki/CONFIG.md`'s `## Sensitive paths` block, so once you write CONFIG
in step 3 it targets the right paths. Tell the user: to change what triggers it,
edit that block — no code change.

## 7. Hand off by mode

First, summarize what was produced this run: the architecture topics seeded, any
gotchas captured, and the conventions the user approved into `.opencode/conventions/project.md`.

- **`wiki-only`** → offer to seed the top 3–5 features as `draft` dossiers via
  `wiki-feature` (read code, document what exists). Don't auto-run; confirm first.
- **`sdd`** → explain the loop: `wiki-spec` (write the spec, `status: spec`) →
  implement with TDD → `wiki-test-plan` (tests from acceptance criteria) →
  `wiki-verify` (promote to `stable`). Offer to write the first spec.

End by listing every available skill with its trigger phrase, and remind the user
the kb-curator keeps it honest after changes to the configured sensitive paths.