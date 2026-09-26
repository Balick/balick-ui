import { registryUrl, siteConfig } from "@/config/site"
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
export function componentName(block: string) {
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

/** URL of the registry item that installs the whole page at once. */
export function composeRegistryUrl(blocks: string[]) {
  return `${siteConfig.url}/r/compose/${serializeComposition(blocks)}.json`
}

/** The app/page.tsx file that renders the blocks in order. */
export function composePageSource(blocks: string[]) {
  const imports = [...new Set(blocks)]
    .map((block) => `import { ${componentName(block)} } from "@/components/${block}"`)
    .join("\n")
  const body = blocks.map((block) => `      <${componentName(block)} />`).join("\n")

  return `${imports}

export default function Page() {
  return (
    <>
${body}
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
