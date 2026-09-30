# Balick UI registry

Everything in `registry/balick` is distributed through the shadcn CLI. Each item must
also be declared in `registry.json` at the repository root.

| Folder        | Registry type      | Purpose                                             |
| ------------- | ------------------ | --------------------------------------------------- |
| `ui/`         | `registry:ui`      | Standalone components (animated or original)        |
| `blocks/`     | `registry:block`   | Full page sections: hero, pricing, footer…          |
| `examples/`   | `registry:example` | Demos rendered in the docs and opened in v0         |

Templates (complete sites assembled from blocks) will get their own folder
when the first one lands.

## Adding a component

1. Create `ui/<name>.tsx` and `examples/<name>-demo.tsx`. The demo has a
   default export: Open in v0 imports it.
2. Declare both in `registry.json` (the demo lists the component's URL in
   `registryDependencies`).
3. Register the demo in `registry/__index__.ts` and document it in
   `content/components.ts`.
4. Run `pnpm registry:build`, then `pnpm registry:verify`.

## Adding a block

Read [`DESIGN.md`](../DESIGN.md) first: blocks must follow its rules so any
combination of blocks looks like one page.

1. Create `blocks/<category>-NN/<category>-NN.tsx` and export the section,
   built on `Section`, `Container` and `SectionHeader`
   (`@/registry/balick/ui/section`). Import shadcn primitives from
   `@/components/ui/*` and Balick components from `@/registry/balick/ui/*`
   (the CLI rewrites them to `@/components/ui/*`).
2. Declare it in `registry.json` with `"type": "registry:block"`, a
   `categories` entry and every `registryDependencies` entry, including the
   `section` URL.
3. Register it in the `blocks` map of `registry/__index__.ts`. The gallery at
   `/blocks`, the standalone preview at `/view/<name>` and the composer at
   `/compose` pick it up. If the block already contains another category
   (a hero with a logo strip), declare it in `meta.includes` so the composer
   can warn about duplicates.
4. Run `pnpm registry:build`, then `pnpm registry:verify`.
## Theme

The `theme` item is generated: `pnpm registry:build` copies the colour tokens
from `app/globals.css` into it (see `scripts/sync-theme.mjs`). Change colours
in `app/globals.css`, never in `registry.json`.
