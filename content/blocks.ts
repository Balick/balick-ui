import registry from "@/registry.json"

export const blockCategories = [
  { slug: "navbar", title: "Navbar" },
  { slug: "hero", title: "Hero" },
  { slug: "logos", title: "Logos" },
  { slug: "features", title: "Features" },
  { slug: "testimonials", title: "Testimonials" },
  { slug: "pricing", title: "Pricing" },
  { slug: "faq", title: "FAQ" },
  { slug: "cta", title: "Call to action" },
  { slug: "footer", title: "Footer" },
] as const

export type BlockCategory = (typeof blockCategories)[number]["slug"]

export interface BlockMeta {
  name: string
  title: string
  description: string
  category: BlockCategory
  files: { path: string; type: string }[]
}

/** Blocks as declared in registry.json, the single source of truth. */
export const blockList: BlockMeta[] = registry.items
  .filter((item) => item.type === "registry:block")
  .map((item) => ({
    name: item.name,
    title: item.title,
    description: item.description,
    category: (item as { categories?: string[] }).categories?.[0] as BlockCategory,
    files: item.files ?? [],
  }))

export function getBlock(name: string) {
  return blockList.find((block) => block.name === name)
}
