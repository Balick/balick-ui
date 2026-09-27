# Balick UI design rules

Balick UI blocks are designed to go together: any hero, features, pricing and
footer should stack into a page that looks like one person designed it. These
rules are what make that true. Follow them for every new component and block,
and check a block against the list at the end before adding it.

## Principles

- **Quiet.** Contrast, spacing and typography do the work. Motion guides
  attention; it never performs.
- **Monochrome.** No accent colour. Emphasis comes from inverting foreground
  and background.
- **Coherent.** Blocks share the same primitives, so they share the same
  rhythm. Consistency is enforced by code, not by discipline.
- **Production ready.** Accessible markup, typed props, both colour modes,
  reduced motion respected.

## Block anatomy

- One block is one full-width section, in
  `registry/balick/blocks/<category>-NN/<category>-NN.tsx`.
- It exports one component named after the file (`Pricing01`), with no
  required props. Section-based blocks take an optional `id`, defaulting to
  their category (`pricing`), so `/#pricing` links work out of the box;
  `Section` adds a scroll margin that clears the sticky navbar. The composer generates imports from this name, and
  `pnpm registry:build` fails if a block breaks the convention.
- Placeholder content lives in constants at the top of the file, so users edit
  data, not markup.
- Links are plain `<a href="#">`. No framework-specific imports
  (`next/link`, `next/image`), so blocks work in any React app.
- Illustrations are built with markup, CSS or inline SVG. No remote images.
- Brand placeholders use "Acme" and fictional company names.

## Layout

Every block is built on the `section` primitive (`@/registry/balick/ui/section`):

| Need | Use |
| --- | --- |
| Section shell with vertical rhythm | `<Section>` |
| Section that manages its own padding (hero, footer) | `<Section spacing="none">` or `<Container>` |
| Eyebrow, title and description | `<SectionHeader>` |

- Container: `max-w-6xl` with `px-6` (`width="narrow"` is `max-w-3xl`,
  `width="wide"` is `max-w-7xl`). Never hard-code another container.
- Vertical rhythm: `py-24 sm:py-32` (`spacing="compact"` is `py-16 sm:py-20`).
  A block with custom padding must still end with the default bottom padding.
- Header to content: `mt-16`.
- Blocks never add outer margins and never draw borders against their
  neighbours, except the footer's top border and the navbar's bottom border
  once the page has scrolled.
- Navbars are a `header` built on `Container` (not `Section`), `sticky top-0`,
  `h-16`, and transparent until the page scrolls. Their mobile menu closes on
  Escape, on link click and when the viewport reaches the desktop breakpoint.
- Card grids use `gap-4`. Hairline grids (features, logos) put `border-r
  border-b` on each cell, inside a bordered, rounded, `overflow-hidden`
  container whose grid has `-mr-px -mb-px`. Unlike `gap-px bg-border`, an
  incomplete last row then stays blank, so any number of items works. Fixed
  bento layouts, where every cell is always filled, may keep `gap-px`.
- Every grid sets its base column count (`grid-cols-1 md:grid-cols-3`), never
  an implicit column: a wide child such as a marquee would otherwise stretch
  the column past the screen on mobile.

## Typography

| Role | Classes |
| --- | --- |
| Hero title (`h1`, heroes only) | `text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tighter text-balance` |
| Section title (`h2`) | `SectionHeader`: `text-4xl sm:text-5xl font-semibold tracking-tighter` |
| Eyebrow | `font-mono text-xs tracking-wider uppercase text-muted-foreground` |
| Lead paragraph | `text-lg text-balance text-muted-foreground` |
| Card title | `font-medium` |
| Body and descriptions | `text-sm leading-6 text-muted-foreground` |

Only heroes use `h1`. Everything else starts at `h2`.

## Colour

The Balick theme is paper and ink: one cool hue family instead of pure black
and white. Light mode is ink on paper, dark mode is paper on ink, and the
layers are distinct in both.

- Use semantic tokens only: `background`, `foreground`, `card`, `muted`,
  `muted-foreground`, `border`, `accent`, `primary`, `secondary`.
- Layers: `background` is the canvas. Raised elements (cards, panels, product
  previews, icon tiles, bordered containers) use `bg-card`. Recessed fills
  use `bg-muted`. An element that must blend with its section, such as a
  badge masking a connector line, uses `bg-background`.
- Subtle fills use opacity on foreground: `bg-foreground/10`.
- Highlight one element by inverting it: `bg-foreground text-background`
  (the featured pricing plan, the last bar of a chart).
- The only hard-coded colour allowed is a status indicator (`emerald-500`).
- Check every block in light and dark mode.

## Shape and depth

- Radius: `rounded-md` for controls, `rounded-xl` for cards, `rounded-2xl` for
  large containers and bento grids, `rounded-full` for pills.
- Borders are 1px `border`. They separate; shadows are rare.
- At most one soft shadow per block, on an elevated element such as a product
  preview or a featured card.

## Motion

- Heroes animate on mount with `BlurFade`, staggered by `0.1s`.
- Other sections are static, or reveal once with `BlurFade inView`.
- Durations between `0.2s` and `0.5s`, `easeOut`. Blur at most `6px`, offset at
  most `24px`.
- Looping motion is reserved for ambient elements: marquees, shimmer, status
  pings. Loops must stop under `prefers-reduced-motion`
  (`motion-reduce:animate-none`).
- Never animate content in a way that delays reading it.

## Accessibility

- Landmarks: `section`, `nav`, `footer`. One `h1` per page.
- Every input has a label (visually hidden if needed).
- Decorative elements get `aria-hidden`.
- Icon-only buttons and links have an `aria-label`.
- Keep the default focus ring. Don't remove outlines.

## Dependencies

- shadcn/ui primitives: import from `@/components/ui/*` and list them by name
  in `registryDependencies` (`"button"`).
- Balick components: import from `@/registry/balick/ui/*` and list their
  registry URL in `registryDependencies`. The CLI rewrites the imports to
  `@/components/ui/*`.
- Icons: `lucide-react` only.
- Add `motion` only when a block animates itself; animated Balick components
  already bring it.

## The docs site

The site frames the blocks like a technical sheet. These elements belong to
the site only; blocks never use them.

- Pages sit in the `sheet` column, bounded by two rails
  (`components/sheet.tsx`).
- Text is set on ruled rows (`Row`): each row draws an edge-to-edge rule
  below it. Section boundaries get register marks where the rules cross the
  rails.
- Hatching (`bg-hatch`) marks reserved or empty space: empty grid cells, the
  free space around a narrowed preview, planned templates.
- Code sits on graphite (`surface-code`) in both modes.
- The margins outside the rails are hatched; the column stays plain.
- The footer is the sheet's title block: project, current sheet (the path),
  number of blocks, date of the last build, author and licence.

## Checklist for a new block

- [ ] Built on `Section` / `Container` / `SectionHeader`
- [ ] Content in constants at the top of the file, no required props
- [ ] Looks right between any two other blocks, in light and dark mode
- [ ] Works from 320px to wide screens: no horizontal scroll and no content
      clipped by an `overflow-hidden` parent
- [ ] Motion follows the rules above and stops with reduced motion
- [ ] Accessible: headings, labels, `aria-hidden` on decoration
- [ ] Declared in `registry.json` with `categories` and every dependency
- [ ] Registered in `registry/__index__.ts`, then `pnpm registry:build`
