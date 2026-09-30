import registry from "@/registry.json"
import { styleElement } from "@/lib/compose"
import type { BuiltItem } from "@/lib/registry"
import { v0DepUrl, v0ShadcnUrl } from "@/lib/v0"

/*
 * What v0 does with an item, as far as we have seen (scripts/verify-registry.mjs
 * emulates it, and `pnpm registry:verify` runs that emulation):
 *
 * - it writes each file at its `target`, or at its `path` when there is none.
 *   The shadcn CLI rewrites `@/registry/balick/ui/*` imports for the project
 *   it installs into; v0 does not, so its variant of an item carries a target
 *   for every file, and imports that already match those targets;
 * - it ignores `css`, `cssVars` and `envVars`, and only documents the item
 *   types block, component, ui, page, file, hook and lib;
 * - when an item has no page, it generates one that runs
 *   `import Component from '<first file>'`: an item with named exports only
 *   fails there with "Export default doesn't exist in target module".
 *
 * - it does not resolve a bare name in `registryDependencies` ("input"): the
 *   file is missing and the preview fails with "Can't resolve
 *   '@/components/ui/input'". So the variants only list URLs, and the shadcn/ui
 *   primitives we use are served by /r/v0/shadcn/<name>.json, with the target
 *   that shadcn's own files lack.
 *
 * So a block or a demo, when opened, gets: a page of its own (registry:page at
 * app/page.tsx, the way Vercel's registry starter ships its blocks), a default
 * export for the page v0 would generate, and the CSS of its animations
 * inlined in that page. Anything it depends on stays page-less.
 */

type LoadItem = (name: string) => Promise<BuiltItem | undefined>
type File = NonNullable<BuiltItem["files"]>[number]

const knownNames = new Set(registry.items.map((item) => item.name))

/** `registry:example` is not a documented type: v0 sees a block, whose files are components. */
const itemTypes: Record<string, string> = { "registry:example": "registry:block" }
const fileTypes: Record<string, string> = { "registry:example": "registry:component" }

const folders: Record<string, string> = {
  "registry:ui": "components/ui",
  "registry:component": "components",
  "registry:block": "components",
  "registry:hook": "hooks",
  "registry:lib": "lib",
}

const pascal = (name: string) =>
  name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("")

/** The name of one of our items from its registry URL: https://…/r/hero-01.json. */
function itemName(url: string) {
  const name = url.match(/\/r\/([\w-]+)\.json$/)?.[1]
  return name && knownNames.has(name) ? name : undefined
}

/** Rewrites repository imports to where the targets put the files. */
function toV0Imports(content: string) {
  return content
    .replace(/@\/registry\/balick\/ui\//g, "@/components/ui/")
    .replace(/@\/registry\/balick\/(?:blocks|examples)\/(?:[\w-]+\/)?([\w-]+)/g, "@/components/$1")
}

function toV0File(file: File): File {
  const type = fileTypes[file.type] ?? file.type
  const folder = folders[type]
  return {
    ...file,
    type,
    target: file.target ?? (folder ? `${folder}/${file.path.split("/").pop()}` : undefined),
    content: file.content && toV0Imports(file.content),
  }
}

/**
 * The item without a page, ready for v0: documented types, a target and
 * matching imports for every file, no CSS fields, and v0 dependencies.
 */
export function toV0Dependency(item: BuiltItem): BuiltItem {
  const variant: BuiltItem = {
    ...item,
    type: itemTypes[item.type] ?? item.type,
    registryDependencies: item.registryDependencies?.map((dependency) => {
      const name = itemName(dependency)
      if (name) return v0DepUrl(name)
      return /^https?:\/\//.test(dependency) ? dependency : v0ShadcnUrl(dependency)
    }),
    files: item.files?.map(toV0File),
  }
  delete variant.css
  delete variant.cssVars
  delete variant.envVars
  return variant
}

/** The shadcn/ui primitives our items list by bare name, e.g. "button". */
export function shadcnPrimitives() {
  const names = new Set<string>()
  for (const item of registry.items) {
    for (const dependency of (item as { registryDependencies?: string[] }).registryDependencies ?? []) {
      if (!/^https?:\/\//.test(dependency)) names.add(dependency)
    }
  }
  return [...names].sort()
}

const shadcnStyleUrl = "https://ui.shadcn.com/r/styles/new-york-v4"

/**
 * A shadcn/ui primitive for v0: shadcn's item, written at components/ui with
 * imports that match, and its own primitives as v0 URLs.
 */
export async function toV0Shadcn(name: string): Promise<BuiltItem> {
  const response = await fetch(`${shadcnStyleUrl}/${name}.json`)
  if (!response.ok) throw new Error(`shadcn/ui has no "${name}" (${response.status})`)
  const item = (await response.json()) as BuiltItem
  return {
    ...item,
    type: "registry:ui",
    registryDependencies: item.registryDependencies?.map((dependency) =>
      /^https?:\/\//.test(dependency) ? dependency : v0ShadcnUrl(dependency)
    ),
    files: item.files?.map((file) => ({
      ...file,
      type: "registry:ui",
      target: `components/ui/${file.path.split("/").pop()}`,
      content: file.content
        ?.replace(/@\/registry\/[\w-]+\/ui\//g, "@/components/ui/")
        .replace(/from "cn"/g, 'from "@/lib/utils"'),
    })),
  }
}

// ----------------------------------------------------------------------- CSS

const declarations = (rules: Record<string, unknown>) =>
  Object.entries(rules)
    .map(([property, value]) => `${property}:${value}`)
    .join(";")

/**
 * The CSS of an item as plain rules: its keyframes, and the `.animate-*`
 * classes its Tailwind theme variables stand for. Tailwind is not there to
 * generate them in v0.
 */
function cssOf(item: BuiltItem) {
  const rules: string[] = []
  for (const [selector, body] of Object.entries(item.css ?? {})) {
    if (typeof body !== "object" || body === null) continue
    const content = selector.startsWith("@keyframes")
      ? Object.entries(body)
          .map(([frame, frameRules]) => `${frame}{${declarations(frameRules as Record<string, unknown>)}}`)
          .join("")
      : declarations(body as Record<string, unknown>)
    rules.push(`${selector}{${content}}`)
  }
  for (const [name, value] of Object.entries(item.cssVars?.theme ?? {})) {
    if (name.startsWith("animate-")) rules.push(`.${name}{animation:${value}}`)
  }
  return rules.join("\n")
}

/** The CSS and the theme needs of an item and of everything it depends on. */
async function collectNeeds(item: Pick<BuiltItem, "dependencies" | "registryDependencies" | "css" | "cssVars" | "name" | "type">, load: LoadItem) {
  const css = new Set<string>()
  const own = cssOf(item as BuiltItem)
  if (own) css.add(own)
  let themed = (item.dependencies ?? []).includes("next-themes")

  const seen = new Set<string>()
  const queue = [...(item.registryDependencies ?? [])]
  while (queue.length) {
    const name = itemName(queue.shift()!)
    if (!name || seen.has(name)) continue
    seen.add(name)
    const dependency = await load(name)
    if (!dependency) throw new Error(`${item.name} depends on ${name}, which does not exist`)
    const text = cssOf(dependency)
    if (text) css.add(text)
    if ((dependency.dependencies ?? []).includes("next-themes")) themed = true
    queue.push(...(dependency.registryDependencies ?? []))
  }
  return { css: [...css].join("\n"), themed }
}

// --------------------------------------------------------------------- pages

function entryPage(name: string, isBlock: boolean, needs: { css: string; themed: boolean }) {
  const component = pascal(name)
  const importLine = isBlock
    ? `import { ${component} } from "@/components/${name}"`
    : `import ${component} from "@/components/${name}"`
  const imports = needs.themed
    ? `import { ThemeProvider } from "next-themes"\n\n${importLine}`
    : importLine

  const body = [
    ...(needs.css ? [styleElement(needs.css)] : []),
    ...(isBlock
      ? [`<${component} />`]
      : [
          `<main className="flex min-h-svh items-center justify-center p-6">`,
          `  <${component} />`,
          `</main>`,
        ]),
  ]
  const wrapped = needs.themed
    ? [
        `<ThemeProvider attribute="class" defaultTheme="system" enableSystem>`,
        ...body.map((line) => `  ${line}`),
        `</ThemeProvider>`,
      ]
    : body

  return `${imports}\n\nexport default function Page() {\n  return (\n    <>\n${wrapped
    .map((line) => `      ${line}`)
    .join("\n")}\n    </>\n  )\n}\n`
}

/**
 * The item as v0 is asked to open it. A block or a demo also gets its page,
 * and a default export for the page v0 would generate if it ignored ours.
 */
export async function toV0Entry(item: BuiltItem, load: LoadItem): Promise<BuiltItem> {
  const variant = toV0Dependency(item)
  const isBlock = item.type === "registry:block"
  if (!isBlock && item.type !== "registry:example") return variant

  const [main, ...rest] = variant.files ?? []
  if (!main) throw new Error(`${item.name} has no files`)
  let content = main.content ?? ""
  if (!/^export default /m.test(content)) {
    const component = pascal(item.name)
    if (!new RegExp(`export function ${component}\\b`).test(content)) {
      throw new Error(`${item.name} needs a default export, or an export named ${component}`)
    }
    content += `\nexport default ${component}\n`
  }

  const page: File = {
    path: "app/page.tsx",
    type: "registry:page",
    target: "app/page.tsx",
    content: entryPage(item.name, isBlock, await collectNeeds(item, load)),
  }
  return { ...variant, files: [{ ...main, content }, ...rest, page] }
}

/** The CSS a composed page needs: that of its blocks, and of what they depend on. */
export async function composedCss(blocks: string[], load: LoadItem) {
  const needs = await collectNeeds(
    {
      name: "the composed page",
      type: "registry:block",
      registryDependencies: blocks.map((block) => `/r/${block}.json`),
    },
    load
  )
  return needs.css
}
