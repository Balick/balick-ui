# Balick UI

Minimal, animated components, blocks and templates built on top of
[shadcn/ui](https://ui.shadcn.com). Every item is distributed as source code
through the shadcn CLI.

```bash
npx shadcn@latest add https://balick-ui.com/r/marquee.json
```

## Development

```bash
pnpm install
pnpm dev              # docs site on http://localhost:3000
pnpm registry:build   # regenerate public/r/*.json from registry.json
pnpm build            # production build of the site
```

Set `NEXT_PUBLIC_BASE_URL` to the deployed URL so install commands and
"Open in v0" links point to the right registry.

## Project structure

```
app/(site)/            Marketing and docs pages
  docs/components/     One page per component, generated from content/components.ts
components/            Site UI (header, previews, code blocks, search…)
components/ui/         shadcn/ui primitives used by the site
config/                Site and navigation configuration
content/components.ts  Documentation for each component (usage, props, CSS)
registry/balick/       Everything distributed through the CLI (see registry/README.md)
registry.json          Registry manifest consumed by `shadcn build`
public/r/              Built registry, served statically
```

See [`registry/README.md`](registry/README.md) to add a new component.
