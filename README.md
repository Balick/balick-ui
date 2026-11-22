# Balick UI

Blocks for [shadcn/ui](https://ui.shadcn.com), designed to fit together.
Compose a page, then install it with one command. Every item is distributed as
source code through the shadcn CLI.

[Website](https://ui.balick.me) · [Docs](https://ui.balick.me/docs) ·
[Blocks](https://ui.balick.me/blocks) · [Composer](https://ui.balick.me/compose) ·
[Templates](https://ui.balick.me/templates) · [Pro](https://ui.balick.me/pro)

- **Components**: animated primitives such as `marquee`, `blur-fade` and
  `shimmer-button`.
- **Blocks**: full page sections (navbar, hero, features, pricing, FAQ,
  footer and more) built on shared primitives, so any combination looks like
  one page.
- **Composer**: pick blocks at [ui.balick.me/compose](https://ui.balick.me/compose),
  preview the page live, then install the page and every block with one
  command.
- **Templates**: complete pages assembled from blocks, installed with one
  command.

Balick UI is listed in the
[shadcn registry directory](https://ui.shadcn.com/docs/directory), so every
item installs by name:

```bash
# Optional: the paper and ink theme used on the site
npx shadcn@latest add @balick/theme

# Any block or component
npx shadcn@latest add @balick/hero-01
```

## Development

Requires Node.js 20 or later and pnpm.

```bash
pnpm install
pnpm dev              # docs site on http://localhost:3000
pnpm lint             # eslint
npx tsc --noEmit      # typecheck
pnpm registry:build   # sync the theme, check blocks, regenerate public/r/*.json
pnpm build            # production build of the site
```

Copy `.env.example` to `.env.local` to point install commands, the sitemap
and "Open in v0" links at another deployment. Without it, they use
`https://ui.balick.me`.

### Pro items

The site also previews and serves the items of Balick UI Pro, whose sources
live in a private repository and are not part of this one. `scripts/pro.mjs`
runs before `dev` and `build`: it uses `registry/pro` when it exists (a clone
of the private repository), or downloads it when `PRO_GITHUB_TOKEN` is set,
and generates `registry/__pro__.ts` (metadata), `registry/__pro_blocks__.ts`
(preview components) and `registry/__pro_registry__.ts` (sources, for the
license-checked route). Without the Pro sources, these modules are empty and
the site builds with the free items only. The variables are listed in `.env.example`.

Pro items are installed from `/r/pro/<name>.json`, which checks the license
key sent by the shadcn CLI (`lib/pro/license.ts`). Their source is never
rendered on public pages.

## Project structure

```
app/(site)/            Site pages: home, docs, blocks and components galleries, composer
app/view/              Bare block previews, embedded in the site as iframes
app/r/compose/         Registry item generated on the fly for a composed page
app/r/templates/       Registry items of the templates
app/r/pro/             Pro items, served to licensed projects only
components/            Site UI (header, previews, composer, code blocks…)
components/ui/         shadcn/ui primitives used by the site and the blocks
content/               Component docs, block categories and templates
lib/blocks-gallery.ts  Block categories as shown in the gallery
lib/compose.ts         Composition parsing, page source and registry item
registry/balick/       Everything distributed through the CLI
registry/pro/          Pro sources, from the private repository (git-ignored)
scripts/               Registry checks, Pro sources, template screenshots
registry.json          Registry manifest, the single source of truth
public/r/              Built registry, served statically
```

## Contributing

Contributions are welcome. Start with [`CONTRIBUTING.md`](CONTRIBUTING.md),
then:

- [`DESIGN.md`](DESIGN.md): the rules every component and block follows.
- [`registry/README.md`](registry/README.md): how to add a component or a
  block.

Found a security issue? See [`SECURITY.md`](SECURITY.md).

## License

[MIT](LICENSE), for everything in this repository. Balick UI Pro items are
not part of it and have [their own license](https://ui.balick.me/license).
The Geist fonts in `assets/fonts`, used for the social preview image, are
licensed under the [SIL Open Font License](assets/fonts/OFL.txt).
