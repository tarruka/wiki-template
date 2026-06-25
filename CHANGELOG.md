# Changelog

## 2026-06-25 — Session: Align wiki-template with source conventions

**Goal:** Apply the convention-inference + architecture/gotchas-seeding features from the source `claude-wiki-template` to the opencode-based `wiki-template` plugin.

### Changes

#### `.opencode/skills/wiki-bootstrap/SKILL.md`

- **Step 4 (Scaffold):** Added seeding of `wiki/architecture/` (topic-split, via `wiki-architecture`) and `wiki/gotchas/` (evidence-only, via `wiki-gotcha`). Index pointer updated to `.opencode/conventions/project.md`.
- **Step 5 (NEW — Convention inference):** Replaced `.claude/rules/` (Claude Code mechanism) with `.opencode/conventions/project.md` + `instructions` in `opencode.json` (opencode's native mechanism). Includes tech-stack convention detection (TypeScript, React, Node, Python, Rust, etc.) with user approval gate before writing.
- **Sections renumbered:** drift reminder → 6, hand-off → 7.
- **Hand-off summary:** Now mentions architecture topics + gotchas + approved conventions.

#### `wiki/SCHEMA.md`

- Updated File layout note: `architecture/` and `gotchas/` may be seeded at bootstrap (as `draft`); `decisions/`, `product/`, `qa/` remain on-demand.

### Key design decision

Convention rules use opencode's `instructions` mechanism (`.opencode/conventions/project.md`) instead of Claude Code's `.claude/rules/`. This file is added to `instructions` in the project's `opencode.json`, giving opencode ambient guidance on every task without context cost when idle.

### Source diff

Source: `/Users/tarekradovan/Documents/Work/claude-wiki-template/skills/wiki-bootstrap/SKILL.md`
Target: `/Users/tarekradovan/Documents/Tarek/wiki-template/.opencode/skills/wiki-bootstrap/SKILL.md`
