# Knowledge Wiki Template for opencode

> A drop-in, **skill-based** knowledge base for any codebase. Stop re-explaining
> "how feature X works" on every task — capture it once, link it, and let it compound.

---

## Install

Copy this template into your project root, then reference the skills in your
`opencode.json`:

```json
{
  "skills": {
    "paths": [".opencode/skills", "/path/to/wiki-template/.opencode/skills"]
  },
  "agent": {
    "kb-curator": { "path": "./path/to/wiki-template/.opencode/agents/kb-curator.md" },
    "wiki-qa": { "path": "./path/to/wiki-template/.opencode/agents/wiki-qa.md" }
  },
  "plugin": [
    "/path/to/wiki-template/.opencode/plugin/wiki-drift.ts"
  ]
}
```

Or symlink the `.opencode/` folder into each repo.

Then run once:

```
/wiki-bootstrap
```

---

## Skills

| Skill | Use it to… |
|---|---|
| `wiki-bootstrap` | set up / repair the wiki |
| `wiki-feature` | document a feature or UI flow |
| `wiki-architecture` | document a cross-feature pattern |
| `wiki-ingest` | fold a PR / file / diff into the pages it affects |
| `wiki-query` | answer "how does X work?" from the wiki |
| `wiki-lint` | find orphans, dead links, stale claims |
| `wiki-prd` | write a Product Requirements Doc |
| `wiki-adr` | record an Architecture Decision Record |
| `wiki-meeting` | turn meeting notes into decisions + action items |
| `wiki-test-plan` | derive a QA test plan from a feature |
| `wiki-gotcha` | capture a footgun / fragile area |
| `wiki-spec` *(sdd)* | write a feature's spec **before** the code |
| `wiki-verify` *(sdd)* | prove the code matches the spec |

## Agents

- **`kb-curator`** — maintains the wiki: ingest/query/lint + drift after changes.
- **`wiki-qa`** — exploratory QA. Drives the running app and reports the gap
  between what it sees and the acceptance criteria.

## Two modes

| | `wiki-only` | `sdd` |
|---|---|---|
| **For** | mature codebases | greenfield / brand-new features |
| **Dossier is** | documentation of what exists | the spec, written first |
| **Extra statuses** | — | `spec`, `building` |

---

## The drift plugin

`wiki-drift.ts` runs after every `Edit`/`Write`/`MultiEdit`. If the edited file
matches a `Sensitive paths` glob in `wiki/CONFIG.md`, it injects a nudge to run
`wiki-ingest`. Zero noise on non-matches.

---

## License

MIT — adapt freely.# wiki-template
