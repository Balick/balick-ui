# Balick UI registry

Everything in `registry/balick` is distributed through the shadcn CLI. Each item must
also be declared in `registry.json` at the repository root.

| Folder        | Registry type      | Purpose                                             |
| ------------- | ------------------ | --------------------------------------------------- |
| `components/` | `registry:ui`      | Standalone components (animated or original)        |
| `blocks/`     | `registry:block`   | Full page sections: hero, pricing, footer…          |
| `templates/`  | `registry:block`   | Complete pages or multi-section landing pages       |
| `examples/`   | `registry:example` | Demos rendered in the docs and opened in v0         |

## Adding a component

1. Create `components/<name>.tsx` and `examples/<name>-demo.tsx`.
2. Declare both in `registry.json` (the demo lists the component's URL in
   `registryDependencies`).
3. Register the demo in `registry/__index__.ts` and document it in
   `content/components.ts`.
4. Run `pnpm registry:build`.
