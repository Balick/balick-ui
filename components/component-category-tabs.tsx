import { CategoryTabs } from "@/components/category-tabs"
import { categoryHref, componentDocs, componentsByCategory } from "@/content/components"

/** Category tabs of the components docs; `active` is a category slug, or none for the overview. */
export function ComponentCategoryTabs({ active }: { active?: string }) {
  return (
    <CategoryTabs
      label="Component categories"
      tabs={[
        { href: "/docs/components", title: "All", count: componentDocs.length, current: !active },
        ...componentsByCategory().map((category) => ({
          href: categoryHref(category.slug),
          title: category.title,
          count: category.components.length,
          current: category.slug === active,
        })),
      ]}
    />
  )
}
