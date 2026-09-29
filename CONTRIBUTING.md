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

1. Branch from an up-to-date `main`, named `type/short-topic` in kebab-case.
   Types: `feat` (component, block or feature), `fix`, `docs`, `refactor`,
   `chore`. Example: `feat/testimonials-02`.
2. Keep one change per pull request.
3. Write commit messages as an imperative summary line, a blank line, then
   what changed and why.
4. Everything is written in English: code, comments, site copy and docs.
5. Working with an AI agent? It follows [`AGENTS.md`](AGENTS.md) (Claude Code
   reads it through `CLAUDE.md`): same rules, and no AI attribution in
   commits or pull requests.

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

Then check your change in the browser, in light and dark mode, on desktop and
on a 320px-wide phone. CI runs the same checks and fails if `public/r` is out
of date.
