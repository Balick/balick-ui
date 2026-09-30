import { installTarget, registryUrl, siteConfig } from "@/config/site"
import {
  blockCategories,
  getBlock,
  getCategory,
  type BlockCategory,
} from "@/content/blocks"

/** Messages exchanged between the composer and its preview iframe. */
export const COMPOSE_MESSAGE = "balick:compose"

/** Composition shown the first time someone opens the composer. */
export const starterComposition = [
  "navbar-01",
  "hero-01",
  "features-01",
  "testimonials-01",
  "pricing-01",
  "faq-01",
  "cta-01",
  "footer-01",
]

/** "pricing-01" → "Pricing01", the component every block exports. */
function componentName(block: string) {
  return block
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("")
}

/** Parses "navbar-01,hero-01", dropping anything that is not a known block. */
export function parseComposition(value: string | null | undefined) {
  if (!value) return []
  return value
    .split(",")
    .map((name) => name.trim())
    .filter((name) => getBlock(name))
}

export function serializeComposition(blocks: string[]) {
  return blocks.join(",")
}

/** The same item, as passed to `shadcn add` (see `installTarget`). */
export function composeInstallTarget(blocks: string[]) {
  return installTarget(`compose/${serializeComposition(blocks)}`)
}

/**
 * Splits a composition into the leading navbars, the page content and the
 * trailing footers, so the content can be wrapped in <main>.
 */
export function splitComposition(blocks: string[]) {
  const category = (block: string) => getBlock(block)?.category
  let start = 0
  while (start < blocks.length && category(blocks[start]) === "navbar") start++
  let end = blocks.length
  while (end > start && category(blocks[end - 1]) === "footer") end--
  return {
    before: blocks.slice(0, start),
    content: blocks.slice(start, end),
    after: blocks.slice(end),
  }
}

/**
 * Anchor id for each block that needs one. Blocks default to their category
 * (`pricing`); a category used again gets a numbered id (`pricing-2`) so the
 * page never repeats an id.
 */
export function compositionIds(blocks: string[]) {
  const seen = new Map<string, number>()
  return blocks.map((block) => {
    const category = getBlock(block)?.category
    if (!category || category === "navbar" || category === "footer") return undefined
    const count = (seen.get(category) ?? 0) + 1
    seen.set(category, count)
    return count === 1 ? undefined : `${category}-${count}`
  })
}

/** A `<style>` element for a generated page, from plain CSS. */
export const styleElement = (css: string) =>
  `<style dangerouslySetInnerHTML={{ __html: ${JSON.stringify(css)} }} />`

/**
 * The app/page.tsx file that renders the blocks in order. `css` is added as a
 * `<style>`, for hosts that cannot install the CSS of the blocks (v0).
 */
export function composePageSource(blocks: string[], { css }: { css?: string } = {}) {
  const imports = [...new Set(blocks)]
    .map((block) => `import { ${componentName(block)} } from "@/components/${block}"`)
    .join("\n")
  const ids = compositionIds(blocks)
  const { before, content, after } = splitComposition(blocks)
  const element = (block: string, index: number, indent: string) =>
    `${indent}<${componentName(block)}${ids[index] ? ` id="${ids[index]}"` : ""} />`

  const lines = [
    ...(css ? [`      ${styleElement(css)}`] : []),
    ...before.map((block, i) => element(block, i, "      ")),
    ...(content.length
      ? [
          "      <main>",
          ...content.map((block, i) => element(block, before.length + i, "        ")),
          "      </main>",
        ]
      : []),
    ...after.map((block, i) => element(block, before.length + content.length + i, "      ")),
  ]

  return `${imports}

export default function Page() {
  return (
    <>
${lines.join("\n")}
    </>
  )
}
`
}

/** A shadcn registry item: the page file, plus every block as a dependency. */
export function composeRegistryItem(blocks: string[]) {
  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "balick-page",
    type: "registry:block",
    title: "Balick UI page",
    description: `A page composed of ${blocks.length} Balick UI blocks.`,
    registryDependencies: [...new Set(blocks)].map(registryUrl),
    files: [
      {
        path: "app/page.tsx",
        type: "registry:page",
        target: "app/page.tsx",
        content: composePageSource(blocks),
      },
    ],
  }
}

function categoryRank(block: string) {
  const category = getBlock(block)?.category
  return blockCategories.findIndex((c) => c.slug === category)
}

/**
 * Where a new block goes: after the blocks of its own category and before
 * the ones that usually follow it (a navbar goes first, a footer last).
 */
export function insertionIndex(blocks: string[], block: string) {
  const rank = categoryRank(block)
  const index = blocks.findIndex((existing) => categoryRank(existing) > rank)
  return index === -1 ? blocks.length : index
}

/** Friendly warnings about the structure of a composition. */
export function compositionHints(blocks: string[]) {
  if (!blocks.length) return []

  const hints: string[] = []
  const categories = blocks.map((block) => getBlock(block)!.category)

  if (!categories.includes("navbar")) {
    hints.push("Add a navbar so visitors can find their way around.")
  } else if (categories[0] !== "navbar") {
    hints.push("The navbar usually goes first.")
  }
  if (!categories.includes("footer")) {
    hints.push("Add a footer to close the page.")
  } else if (categories.at(-1) !== "footer") {
    hints.push("The footer usually goes last.")
  }
  for (const block of new Set(blocks)) {
    for (const included of getBlock(block)!.includes) {
      if (categories.includes(included as BlockCategory)) {
        hints.push(
          `${block} already contains a ${getCategory(included).title.toLowerCase()} section.`
        )
      }
    }
  }
  return hints
}

/** v0 variant of the composition item (see lib/v0.ts). */
export function composeV0Url(blocks: string[]) {
  return `${siteConfig.url}/r/v0/compose/${serializeComposition(blocks)}.json`
}
