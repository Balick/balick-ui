# Balick UI

Minimal components, blocks and templates for [shadcn/ui](https://ui.shadcn.com),
designed to go together. Every item is distributed as source code through the
shadcn CLI.

- **Components**: animated primitives such as `marquee`, `blur-fade` and
  `shimmer-button`.
- **Blocks**: full page sections (navbar, hero, features, pricing, FAQ,
  footer and more) built on shared primitives, so any combination looks like
  one page.
- **Composer**: pick blocks at [ui.balick.me/compose](https://ui.balick.me/compose),
  preview the page live, then install the page and every block with one
  command.

```bash
npx shadcn@latest add https://ui.balick.me/r/theme.json
npx shadcn@latest add https://ui.balick.me/r/hero-01.json
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

Set `NEXT_PUBLIC_BASE_URL` to the deployed URL so install commands, the
sitemap and "Open in v0" links point to the right registry. It defaults to
`https://ui.balick.me`.

## Project structure

```
app/(site)/            Site pages: home, docs, blocks gallery, composer
app/view/              Bare block previews, embedded in the site as iframes
app/r/compose/         Registry item generated on the fly for a composed page
components/            Site UI (header, previews, composer, code blocks…)
components/ui/         shadcn/ui primitives used by the site and the blocks
content/               Component docs and block categories
lib/compose.ts         Composition parsing, page source and registry item
registry/balick/       Everything distributed through the CLI
registry.json          Registry manifest, the single source of truth
public/r/              Built registry, served statically
```

## Contributing

- [`DESIGN.md`](DESIGN.md): the rules every component and block follows.
- [`registry/README.md`](registry/README.md): how to add a component or a
  block.

## License

[MIT](LICENSE). The Geist fonts in `assets/fonts`, used for the social
preview image, are licensed under the [SIL Open Font License](assets/fonts/OFL.txt).
