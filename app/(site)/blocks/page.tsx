import type { Metadata } from "next"
import Link from "next/link"

import { BlocksHashRedirect } from "@/components/blocks-category-tabs"
import { CategoryGrid } from "@/components/category-grid"
import { Row, SheetLabel, Spacer } from "@/components/sheet"
import { blockList } from "@/content/blocks"
import { galleryCategories } from "@/lib/blocks-gallery"

export const metadata: Metadata = {
  title: "Blocks",
  description:
    "Complete, responsive sections for shadcn/ui, designed to go together. Preview, resize, install with one command.",
  alternates: { canonical: "/blocks" },
}

export default function BlocksPage() {
  const categories = galleryCategories()

  return (
    <div className="sheet">
      <BlocksHashRedirect
        targets={Object.fromEntries([
          ...categories.map((category) => [category.slug, `/blocks/${category.slug}`]),
          ...blockList.map((block) => [block.name, `/blocks/${block.category}#${block.name}`]),
        ])}
      />
      <Spacer className="h-12 sm:h-16" />
      <Row>
        <SheetLabel className="justify-center px-4 py-3 md:px-6">
          {blockList.length} blocks · {categories.length} categories
        </SheetLabel>
      </Row>
      <h1 className="text-center text-5xl font-semibold tracking-tighter sm:text-6xl">
        <Row as="span" className="px-4 py-2 md:px-6">
          Blocks
        </Row>
      </h1>
      <Row>
        <p className="mx-auto max-w-2xl px-4 py-3 text-center text-lg text-balance text-muted-foreground md:px-6">
          Complete, responsive sections built on shared primitives. Preview them at any
          width, add them one by one, or{" "}
          <Link href="/compose" className="text-foreground underline underline-offset-4">
            compose a whole page
          </Link>
          .
        </p>
      </Row>
      <Spacer className="h-8 sm:h-10" />
      <Row>
        <CategoryGrid />
      </Row>
      <Spacer className="h-16 sm:h-24" />
    </div>
  )
}
