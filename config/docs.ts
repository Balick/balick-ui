import { categoryHref, componentHref, componentsByCategory } from "@/content/components"

export interface NavItem {
  title: string
  href: string
  label?: string
  disabled?: boolean
  /** Shown next to the title, e.g. the number of components in a category. */
  count?: number
  /** Children revealed when the item or one of them is the current page. */
  items?: NavItem[]
}

export interface NavSection {
  title: string
  items: NavItem[]
}

export const mainNav: NavItem[] = [
  { title: "Docs", href: "/docs" },
  { title: "Components", href: "/docs/components" },
  { title: "Blocks", href: "/blocks" },
  { title: "Compose", href: "/compose" },
  { title: "Templates", href: "/templates" },
]

/**
 * The docs sidebar. Blocks and templates have their own pages and are reached
 * from the main navigation; components are listed by category, and a
 * category unfolds to show its components.
 */
export const docsNav: NavSection[] = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs" },
      { title: "Installation", href: "/docs/installation" },
      { title: "Theming", href: "/docs/theming" },
    ],
  },
  {
    title: "Components",
    items: [
      { title: "Overview", href: "/docs/components" },
      ...componentsByCategory().map((category) => ({
        title: category.title,
        href: categoryHref(category.slug),
        count: category.components.length,
        items: category.components.map((doc) => ({
          title: doc.title,
          href: componentHref(doc.slug),
          label: doc.isNew ? "New" : undefined,
        })),
      })),
    ],
  },
]

function flatten(items: NavItem[]): NavItem[] {
  return items.flatMap((item) => [item, ...flatten(item.items ?? [])])
}

/** Docs pages in reading order, used for previous/next links and search. */
export const flatDocs = docsNav
  .flatMap((section) => flatten(section.items))
  .filter((item) => !item.disabled && item.href.startsWith("/docs"))

/** Whether `pathname` is `item` or one of its children. */
export function isInNavItem(item: NavItem, pathname: string): boolean {
  return item.href === pathname || (item.items ?? []).some((child) => isInNavItem(child, pathname))
}
