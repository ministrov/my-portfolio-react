---
name: commit
description: Commit-message conventions for this repository — Conventional Commits format, allowed types, scope/subject/body rules, and authorship. Use whenever writing a git commit message in this repo.
---

# Commit conventions

## Authority

The authority is the **Conventional Commits** spec (https://www.conventionalcommits.org). Format:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

- `type` ∈ feat|fix|refactor|docs|style|test|chore|perf|ci|build; a breaking change uses `!` after the type/scope or a `BREAKING CHANGE:` footer.
- Per the spec, **scope and body are optional**. Description is a short imperative summary.

## Local preferences

`.codeassistant/rules/git-commit-rule.md` layers stricter local preferences on top:

- a body of 2–6 bullets (imperative, capitalized, no trailing period),
- a lowercase subject ≤72 chars,
- scope = the area touched (`about`, `projects`, `carousel`, `utils`, …).

Treat these as conventions, not requirements — **where they conflict with Conventional Commits, the spec wins** (e.g. a body is never mandatory). The existing history uses the bulleted style, so prefer it when a body actually adds value.

## Authorship

Commit as the machine's git user (the repo owner), never as Claude. Do **not** add a `Co-Authored-By: Claude …` trailer or otherwise attribute the commit to the assistant — the configured `user.name`/`user.email` must remain the sole author.

## Example (repo style)

```
refactor(carousel): localize strings and fix slide aria-label

- Add `carousel` namespace to ru/en locales
- Translate slide aria-label via t(project.title) instead of rendering the raw key
- Localize empty state, region aria-label and a11y prev/next messages
- Remove unused showNavigation/showPagination props and dead aria-hidden
```
