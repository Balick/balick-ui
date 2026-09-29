import { categoryHref, componentHref, componentsByCategory } from "@/content/components"

export interface NavItem {
  title: string
  href: string
  label?: string
  disabled?: boolean
  /** Children, revealed when the item is unfolded. */
  items?: NavItem[]
}

export interface NavSection {
  title: string
  items: NavItem[]
}

export const mainNav: NavItem[] = [
  { title: "Docs", href: "/docs" },
  { title: "Components", href: "/components" },
  { title: "Blocks", href: "/blocks" },
  { title: "Compose", href: "/compose" },
  { title: "Templates", href: "/templates" },
]

/**
 * The docs sidebar. Blocks and templates have their own pages and are reached
 * from the main navigation. Components are listed by category: a category
 * unfolds in place to show its components, and its href is the category
 * gallery, used by search.
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
      { title: "Overview", href: "/components" },
      ...componentsByCategory().map((category) => ({
        title: category.title,
        href: categoryHref(category.slug),
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

/** Pages in reading order, for previous/next links: every page, not the categories. */
export const flatDocs = docsNav
  .flatMap((section) => flatten(section.items))
  .filter((item) => !item.items && !item.disabled)

/** Whether `pathname` is `item` or one of its children. */
export function isInNavItem(item: NavItem, pathname: string): boolean {
  return item.href === pathname || (item.items ?? []).some((child) => isInNavItem(child, pathname))
}
