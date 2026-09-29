import type { Metadata } from "next"
import Link from "next/link"

import { ComponentCategoryTabs } from "@/components/component-category-tabs"
import { DocsHeader } from "@/components/docs"
import { DocsPage } from "@/components/docs-page"
import { categoryHref, componentDocs, componentsByCategory, getComponentDoc } from "@/content/components"
import { examples } from "@/registry/__index__"

export const metadata: Metadata = {
  title: "Components",
  description: "Every Balick UI component, by category, with a live preview.",
}

export default function ComponentsPage() {
  const categories = componentsByCategory()

  return (
    <DocsPage href="/docs/components" tabs={<ComponentCategoryTabs />} wide>
      <DocsHeader
        crumbs={[{ title: "Docs", href: "/docs" }, { title: "Components" }]}
        title="Components"
        description="Animated and original components, grouped by category. Open a category to try them, then add them with a single command."
      >
        <p className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
          {componentDocs.length} components · {categories.length} categories
        </p>
      </DocsHeader>
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {categories.map((category) => {
          const featured = getComponentDoc(category.featured)
          const Example = featured && examples[featured.example]
          return (
            <div
              key={category.slug}
              className="relative overflow-hidden rounded-xl border bg-card shadow-xs transition-colors hover:border-foreground/20"
            >
              <div
                inert
                className="pointer-events-none relative flex h-44 items-center justify-center overflow-hidden border-b bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:16px_16px] p-4"
              >
                <div className="flex w-full origin-center scale-[0.8] items-center justify-center">
                  {Example && <Example />}
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-baseline justify-between gap-3">
                  <h2 className="font-medium">
                    {/* The link covers the whole card, so the preview stays outside it. */}
                    <Link
                      href={categoryHref(category.slug)}
                      className="after:absolute after:inset-0 after:rounded-xl focus-visible:outline-none after:focus-visible:ring-2 after:focus-visible:ring-ring"
                    >
                      {category.title}
                    </Link>
                  </h2>
                  <span className="shrink-0 font-mono text-xs text-muted-foreground">
                    {category.components.length}{" "}
                    {category.components.length === 1 ? "component" : "components"}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{category.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </DocsPage>
  )
}
