---
name: config
description: Per-project knobs the wiki skills read. The one file to edit when dropping this template into a new repo.
---

# Wiki config

Single source of project-specifics. Every wiki skill and the `kb-curator` agent
read this file instead of hardcoding values, so the skills stay portable.
`wiki-bootstrap` writes this on first run; edit by hand anytime. Rename to
`CONFIG.md` (drop `.template`) in a real project.

## Mode

```
mode: <wiki-only | sdd>
```

- `sdd` — spec-driven. New/greenfield projects. Dossiers are written **before**
  the code (`status: spec`), drive implementation + tests, promoted to `stable`
  by `wiki-verify`. Skills `wiki-spec` and `wiki-verify` are active.
- `wiki-only` — descriptive. Mature projects with most of the surface built.
  Dossiers document **what exists** (`draft` → verified `stable`). Spec-first
  skills stay dormant.

## Project

```
project: <name>
stack:   <main frameworks/libraries, and the backend if separate>
roles:   <auth roles, if the app is role-gated — else omit this line>
```

## Sensitive paths

Changes here most often invalidate the wiki. `kb-curator` / `wiki-ingest` scope
drift checks to the dossiers these paths feed. The drift plugin reads the
globs in this block — `path/glob → owning page(s)`.

```
<src/services/**>          → <architecture/data-layer + consuming dossiers>
<src/auth/**>              → <architecture/auth>
<src/api/**>               → <the relevant architecture doc>
```

## Status lifecycle

- `wiki-only` mode: `draft` → `stable` → `needs-review`.
- `sdd` mode adds, before the above: `spec` → `building` → `stable`.

## QA (optional — only if you use the wiki-qa agent)

How the `wiki-qa` agent reaches a running app. Omit this block if you don't use it.

```
platform: <web | react-native | ios | android>
driver:   <playwright | maestro | detox | xcuitest | none>   # none → manual checklist
app_url:  <e.g. http://localhost:3000>   (web)
start:    <e.g. npm run dev>
auth:     <how to get a test session — a seed command, or "log in with an existing account">
```

The `driver` is **platform-specific** — web uses Playwright, React Native uses
Maestro/Detox, iOS/Swift uses XCUITest/Maestro. The matching MCP server must be
configured + approved. With `driver: none`, `wiki-qa` produces a **manual QA
checklist** from the ACs instead of an executed run. It's read-only either way —
its only writes are the seed and in-app actions.