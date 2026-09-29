import { CategoryTabs } from "@/components/category-tabs"
import { categoryHref, componentDocs, componentsByCategory } from "@/content/components"

/** Category tabs of the components gallery; `active` is the current category. */
export function ComponentCategoryTabs({ active }: { active: string }) {
  return (
    <CategoryTabs
      label="Component categories"
      tabs={[
        { href: "/components", title: "All", count: componentDocs.length, current: false },
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
