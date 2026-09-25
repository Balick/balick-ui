import { blockCategories } from "@/content/blocks"
import { componentDocs } from "@/content/components"

export interface NavItem {
  title: string
  href: string
  label?: string
  disabled?: boolean
}

export interface NavSection {
  title: string
  items: NavItem[]
}

export const mainNav: NavItem[] = [
  { title: "Docs", href: "/docs" },
  { title: "Components", href: "/docs/components" },
  { title: "Blocks", href: "/blocks" },
  { title: "Templates", href: "/templates" },
]

export const docsNav: NavSection[] = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs" },
      { title: "Installation", href: "/docs/installation" },
    ],
  },
  {
    title: "Components",
    items: componentDocs.map((doc) => ({
      title: doc.title,
      href: `/docs/components/${doc.slug}`,
      label: doc.isNew ? "New" : undefined,
    })),
  },
  {
    title: "Blocks",
    items: blockCategories.map((category) => ({
      title: category.title,
      href: `/blocks#${category.slug}`,
    })),
  },
  {
    title: "Templates",
    items: [{ title: "Coming soon", href: "/templates", disabled: true }],
  },
]

/** Docs pages in reading order, used for previous/next links. */
export const flatDocs = docsNav
  .flatMap((section) => section.items)
  .filter((item) => !item.disabled && item.href.startsWith("/docs"))
