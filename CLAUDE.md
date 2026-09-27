# Balick UI

A shadcn/ui registry of components, blocks and templates, with its docs site
(Next.js 15, React 19, Tailwind CSS v4). Served from https://ui.balick.me.

## Read first

- `ROADMAP.md`: the public product roadmap (shipped, next, later). Update it
  when you ship something.
- `DESIGN.md`: rules every component and block must follow. Check a block
  against its checklist before adding it.
- `registry/README.md`: how to add a component or a block.

## Commands

```bash
pnpm dev              # docs site
pnpm lint             # eslint
npx tsc --noEmit      # typecheck
pnpm registry:build   # sync the theme, then regenerate public/r/*.json
pnpm build            # production build
```

Run `pnpm registry:build` after any change to `registry.json`,
`registry/balick/**` or the colour tokens in `app/globals.css`, and commit the
regenerated `public/r/` files.

## Git

- Start every change from an up-to-date `main`, on a new branch named
  `type/short-topic` in kebab-case. Types: `feat` (component, block or
  feature), `fix`, `docs`, `refactor`, `chore`. Examples: `feat/testimonials-02`,
  `fix/composer-drag-order`, `docs/git-conventions`.
- One branch per change; never reuse a branch whose pull request was merged.
- Commit messages: an imperative summary line, a blank line, then what
  changed and why.
- Commits are authored by Théo Balick <balickmethens@gmail.com>, without
  Claude attribution (see `.claude/settings.json`).

## Conventions

- `registry.json` is the single source of truth: docs pages, the blocks
  gallery and `/view/[name]` previews are generated from it.
- Balick components live in `registry/balick/ui/` and are imported as
  `@/registry/balick/ui/*` (the CLI rewrites this to `@/components/ui/*`).
- Everything in this repository is written in English: code, comments, site
  copy, docs, notes and commit messages. Conversations with the owner are in
  French.
- The repository is public. Strategy, business model, launch plans and
  internal decisions are private: they live in the owner's Google Drive
  ("Balick UI — Strategy (private)") and must never be written here.
- Verify visual changes in the browser, in light and dark mode, on desktop and
  mobile.
