import type { Metadata } from "next"

import { CategoryGrid } from "@/components/category-grid"
import { Row, SheetLabel, Spacer } from "@/components/sheet"
import { categoryHref, componentDocs, componentsByCategory } from "@/content/components"

export const metadata: Metadata = {
  title: "Components",
  description:
    "Animated and original components for shadcn/ui, by category. Try them live, install them with one command.",
  alternates: { canonical: "/components" },
}

export default function ComponentsPage() {
  const categories = componentsByCategory()

  return (
    <div className="sheet">
      <Spacer className="h-12 sm:h-16" />
      <Row>
        <SheetLabel className="justify-center px-4 py-3 md:px-6">
          {componentDocs.length} components · {categories.length} categories
        </SheetLabel>
      </Row>
      <h1 className="text-center text-5xl font-semibold tracking-tighter sm:text-6xl">
        <Row as="span" className="px-4 py-2 md:px-6">
          Components
        </Row>
      </h1>
      <Row>
        <p className="mx-auto max-w-2xl px-4 py-3 text-center text-lg text-balance text-muted-foreground md:px-6">
          Animated and original pieces for shadcn/ui, many of them shared with the blocks. Try
          them live, then add them one by one with the shadcn CLI.
        </p>
      </Row>
      <Spacer className="h-8 sm:h-10" />
      <Row>
        <CategoryGrid
          categories={categories.map((category) => ({
            href: categoryHref(category.slug),
            title: category.title,
            description: category.description,
            count: `${category.components.length} ${category.components.length === 1 ? "component" : "components"}`,
          }))}
        />
      </Row>
      <Spacer className="h-16 sm:h-24" />
    </div>
  )
}
