---
name: wiki-query
description: >-
  Answer a question about how the codebase works by reading the wiki first. Use
  when the user asks "how does X work?", "where is X handled?", "what are the
  rules for X?" and the answer likely lives in a dossier. Cites pages with
  [[wikilinks]] and flags gaps instead of guessing.
---

# wiki-query

Answer from the wiki before touching code.

## Procedure

1. Read `wiki/index.md` to locate the relevant page(s); read those pages.
2. Answer from them. Cite the pages you used as `[[wikilinks]]` and quote the
   specific claim/citation that supports your answer.
3. If the wiki only partially answers, say which part is covered and which isn't,
   then read the cited code path to fill the gap.
4. If the wiki has **no** page for it, say so explicitly, answer from the code,
   and suggest running `wiki-feature`/`wiki-architecture` to capture it.
5. Never invent behavior. A wiki claim that contradicts the current code is a
   lint finding — note it and offer to fix it with `wiki-ingest`.

Keep the answer tight. The wiki exists so you don't re-derive context — lead with
its conclusion, cite, done.