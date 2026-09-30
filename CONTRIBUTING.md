# Contributing to Balick UI

Thanks for helping. Balick UI is small on purpose: every block has to fit with
every other one, so a few rules keep the whole set coherent.

## Setup

Requires Node.js 20 or later and pnpm.

```bash
pnpm install
pnpm dev   # http://localhost:3000
```

## Making a change

1. Keep one change per pull request, on its own branch (see below).
2. Everything is written in English: code, comments, site copy and docs.
3. Working with an AI agent? It follows [`AGENTS.md`](AGENTS.md) (Claude Code
   reads it through `CLAUDE.md`): the same rules as below apply.

## Branches

- Start every change from an up-to-date `main`:

  ```bash
  git switch main && git pull
  git switch -c feat/testimonials-02
  ```

- Name the branch `type/short-topic`, in lowercase kebab-case:

  | Type       | For                                   | Example                    |
  | ---------- | ------------------------------------- | -------------------------- |
  | `feat`     | a new component, block or feature     | `feat/testimonials-02`     |
  | `fix`      | a bug fix                             | `fix/composer-drag-order`  |
  | `docs`     | documentation only                    | `docs/git-conventions`     |
  | `refactor` | code changes that keep the behaviour  | `refactor/category-grid`   |
  | `chore`    | tooling, dependencies, configuration  | `chore/bump-next`          |

- One branch per change. Once its pull request is merged, the branch is done:
  start follow-up work on a new branch from `main`, never on the merged one.
- `main` is protected: changes reach it through pull requests only. Never
  force-push to `main` or rewrite its history.

## Commits

- Write the summary line in the imperative, as if completing "This commit
  will…": `Add the testimonials-02 block`, not `Added` or `Adds`. Keep it
  under about 72 characters, with no trailing period.
- Leave a blank line, then explain what changed and why, wrapped at about 72
  characters. Lists are fine for several changes.
- One logical change per commit. If `registry.json` or `registry/balick/**`
  changed, commit the regenerated `public/r` files in the same commit.
- No AI attribution: no `Co-authored-by` trailer for an agent, no "generated
  with" line, no tool or model name in commits or pull requests.

```text
Add the testimonials-02 block

A masonry wall of quotes for pages that need more social proof than
testimonials-01 shows. It reuses Section and SectionHeader, and its
content sits in constants at the top of the file.
```

## Adding a component or a block

Read [`DESIGN.md`](DESIGN.md) first, then follow
[`registry/README.md`](registry/README.md). In short: build on the shared
`Section`, `Container` and `SectionHeader` primitives, keep content in
constants at the top of the file, declare the item in `registry.json`, and
register it in `registry/__index__.ts`.

## Before opening a pull request

```bash
pnpm lint
npx tsc --noEmit
pnpm registry:build   # commit the regenerated public/r files
pnpm build
```

If you touched `registry/**` or `registry.json`, also run `pnpm registry:verify`.
It installs every item into fresh Radix and Base UI projects, and emulates what
Open in v0 does with each of them. It needs network and takes a few minutes; CI
runs it too, without blocking the merge.

Then check your change in the browser, in light and dark mode, on desktop and
on a 320px-wide phone. CI runs the same checks and fails if `public/r` is out
of date.
