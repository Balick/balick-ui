# Balick UI

A shadcn/ui registry of components, blocks and templates, with its docs site
(Next.js 15, React 19, Tailwind CSS v4). Served from https://ui.balick.dev.

## Read first

- `ROADMAP.md`: positioning, plan and decisions. Tick items when you finish
  them and log new decisions there.
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

## Conventions

- `registry.json` is the single source of truth: docs pages, the blocks
  gallery and `/view/[name]` previews are generated from it.
- Balick components live in `registry/balick/ui/` and are imported as
  `@/registry/balick/ui/*` (the CLI rewrites this to `@/components/ui/*`).
- Site copy and code are in English; conversations with the owner are in
  French.
- Verify visual changes in the browser, in light and dark mode, on desktop and
  mobile.
