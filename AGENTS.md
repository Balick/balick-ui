# Balick UI

Instructions for AI coding agents (Codex, Claude Code, Cursor, Copilot and
others) and for the people who drive them. They apply to every change, the
same way they apply to human contributors.

A shadcn/ui registry of components, blocks and templates, with its docs site
(Next.js 15, React 19, Tailwind CSS v4). Served from https://ui.balick.me and
listed in the shadcn registry directory as `@balick`.

## Read first

- `DESIGN.md`: rules every component and block must follow. Check a block
  against its checklist before adding it.
- `registry/README.md`: how to add a component or a block.
- `CONTRIBUTING.md`: setup and pull request checklist.

## Commands

```bash
pnpm dev              # docs site
pnpm lint             # eslint
npx tsc --noEmit      # typecheck
pnpm registry:build   # sync the theme, check the items, regenerate public/r/*.json
pnpm build            # production build
```

Run `pnpm registry:build` after any change to `registry.json`,
`registry/balick/**` or the colour tokens in `app/globals.css`, and commit the
regenerated `public/r/` files. Run all four checks before you report a change
as done.

## Git

- Start every change from an up-to-date `main`, on a new branch named
  `type/short-topic` in kebab-case. Types: `feat` (component, block or
  feature), `fix`, `docs`, `refactor`, `chore`. Examples: `feat/testimonials-02`,
  `fix/composer-drag-order`, `docs/git-conventions`.
- One branch per change; never reuse a branch whose pull request was merged.
- Commit messages: an imperative summary line, a blank line, then what
  changed and why.
- No AI attribution anywhere: no `Co-authored-by` trailers for an agent, no
  "generated with" lines, no tool or model names in commits, pull requests,
  code or comments.
- Never rewrite published history or force-push `main`.

## Conventions

- `registry.json` is the single source of truth for what is distributed. The
  site reads it together with `content/blocks.ts` and `content/components.ts`
  to build the `/blocks` and `/components` galleries, the docs pages and the
  `/view/[name]` previews.
- Every component has a `category` in `content/components.ts`; the galleries,
  the sidebar and search are grouped by it.
- Balick components live in `registry/balick/ui/` and are imported as
  `@/registry/balick/ui/*` (the CLI rewrites this to `@/components/ui/*`).
- Every npm package an item imports must be listed in its `dependencies`;
  `scripts/check-blocks.mjs` fails the registry build otherwise.
- Items must work in projects set up with either shadcn/ui style, Radix or
  Base UI: do not rely on `asChild`, and do not forward typed event handlers
  to the shadcn/ui `Button` (listen in the capture phase instead).
- Everything in this repository is written in English: code, comments, site
  copy, docs and commit messages.
- The repository holds code and contributor docs only; no roadmap, strategy
  or internal notes.
- Verify visual changes in the browser, in light and dark mode, on desktop and
  mobile.

## Personal instructions

Keep personal preferences (language, identity, private context) out of the
repository, in your tool's own files: `CLAUDE.local.md` (ignored by git) for
Claude Code, `~/.codex/AGENTS.md` for Codex.
