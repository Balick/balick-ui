import registry from "@/registry.json"

export const blockCategories = [
  {
    slug: "navbar",
    title: "Navbar",
    description: "Sticky navigation bars with a mobile menu, transparent until the page scrolls.",
  },
  {
    slug: "hero",
    title: "Hero",
    description: "Opening sections with a headline, calls to action and a product preview.",
  },
  {
    slug: "logos",
    title: "Logos",
    description: "Customer and partner logos that build trust at a glance.",
  },
  {
    slug: "stats",
    title: "Stats",
    description: "Key figures that back up your claims with numbers.",
  },
  {
    slug: "about",
    title: "About",
    description: "Introductions that tell visitors who you are and what you care about.",
  },
  {
    slug: "timeline",
    title: "Timeline",
    description: "Company stories, careers and milestones, told in order.",
  },
  {
    slug: "services",
    title: "Services",
    description: "Service lists with scope, deliverables and starting prices.",
  },
  {
    slug: "features",
    title: "Features",
    description: "Feature grids and bento layouts that explain what your product does.",
  },
  {
    slug: "steps",
    title: "How it works",
    description: "Step-by-step sections that show how your product or process works.",
  },
  {
    slug: "integrations",
    title: "Integrations",
    description: "Integration grids that show how you fit into an existing stack.",
  },
  {
    slug: "projects",
    title: "Projects",
    description: "Project and case study showcases for portfolios and agencies.",
  },
  {
    slug: "testimonials",
    title: "Testimonials",
    description: "Customer quotes that turn visitors into believers.",
  },
  {
    slug: "team",
    title: "Team",
    description: "Team sections that put faces and roles behind the product.",
  },
  {
    slug: "pricing",
    title: "Pricing",
    description: "Pricing tables, single plans and feature comparisons.",
  },
  {
    slug: "faq",
    title: "FAQ",
    description: "Frequently asked questions that answer objections before they are raised.",
  },
  {
    slug: "blog",
    title: "Blog",
    description: "Latest posts and articles, with covers, dates and authors.",
  },
  {
    slug: "newsletter",
    title: "Newsletter",
    description: "Email signup sections that grow your audience.",
  },
  {
    slug: "cta",
    title: "Call to action",
    description: "Closing calls to action that turn interest into sign-ups.",
  },
  {
    slug: "contact",
    title: "Contact",
    description: "Contact sections with forms, channels, addresses and opening hours.",
  },
  {
    slug: "footer",
    title: "Footer",
    description: "Footers with navigation, social links and legal information.",
  },
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
