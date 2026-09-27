import registry from "@/registry.json"

export const blockCategories = [
  { slug: "navbar", title: "Navbar" },
  { slug: "hero", title: "Hero" },
  { slug: "logos", title: "Logos" },
  { slug: "stats", title: "Stats" },
  { slug: "about", title: "About" },
  { slug: "services", title: "Services" },
  { slug: "features", title: "Features" },
  { slug: "steps", title: "How it works" },
  { slug: "projects", title: "Projects" },
  { slug: "testimonials", title: "Testimonials" },
  { slug: "team", title: "Team" },
  { slug: "pricing", title: "Pricing" },
  { slug: "faq", title: "FAQ" },
  { slug: "cta", title: "Call to action" },
  { slug: "contact", title: "Contact" },
  { slug: "footer", title: "Footer" },
] as const

export type BlockCategory = (typeof blockCategories)[number]["slug"]

export interface BlockMeta {
  name: string
  title: string
  description: string
  category: BlockCategory
  files: { path: string; type: string }[]
  /** Categories this block already contains, e.g. a hero with a logo strip. */
  includes: BlockCategory[]
  /** Pro blocks will be previewable in the composer but need a key to install. */
  tier: "free" | "pro"
}

type BlockItemMeta = { includes?: BlockCategory[]; tier?: "free" | "pro" }

/** Blocks as declared in registry.json, the single source of truth. */
export const blockList: BlockMeta[] = registry.items
  .filter((item) => item.type === "registry:block")
  .map((item) => ({
    name: item.name,
    title: item.title,
    description: item.description,
    category: (item as { categories?: string[] }).categories?.[0] as BlockCategory,
    files: item.files ?? [],
    includes: (item as { meta?: BlockItemMeta }).meta?.includes ?? [],
    tier: (item as { meta?: BlockItemMeta }).meta?.tier ?? "free",
  }))

export function getCategory(slug: BlockCategory) {
  return blockCategories.find((category) => category.slug === slug)!
}

export function getBlock(name: string) {
  return blockList.find((block) => block.name === name)
}
