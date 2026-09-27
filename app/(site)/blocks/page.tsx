import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { BlocksHashRedirect } from "@/components/blocks-category-tabs"
import { blockList } from "@/content/blocks"
import { galleryCategories } from "@/lib/blocks-gallery"
import { GridPattern } from "@/registry/balick/ui/grid-pattern"

export const metadata: Metadata = {
  title: "Blocks",
  description:
    "Complete, responsive sections for shadcn/ui, designed to go together. Preview, resize, install with one command.",
  alternates: { canonical: "/blocks" },
}

export default function BlocksPage() {
  const categories = galleryCategories()

  return (
    <div className="mx-auto w-full max-w-screen-2xl px-4 md:px-6">
      <BlocksHashRedirect
        targets={Object.fromEntries([
          ...categories.map((category) => [category.slug, `/blocks/${category.slug}`]),
          ...blockList.map((block) => [block.name, `/blocks/${block.category}#${block.name}`]),
        ])}
      />
      <header className="relative -mx-4 overflow-hidden px-4 py-16 md:-mx-6 md:px-6 md:py-20">
        <GridPattern className="[mask-image:radial-gradient(ellipse_50%_80%_at_0%_0%,white,transparent)]" />
        <div className="relative">
          <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
            {blockList.length} blocks · {categories.length} categories
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tighter sm:text-5xl">Blocks</h1>
          <p className="mt-4 max-w-xl text-lg text-balance text-muted-foreground">
            Complete, responsive sections built with Balick UI components.
            Preview them at any width, then add them with one command.
          </p>
        </div>
      </header>

      <div className="pb-16 md:pb-20">
        <div className="overflow-hidden rounded-2xl border">
          <ul className="-mr-px -mb-px grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categories.map((category) => (
              <li key={category.slug} className="border-r border-b">
                <Link
                  href={`/blocks/${category.slug}`}
                  className="group flex h-full flex-col p-6 transition-colors hover:bg-muted/40"
                >
                  <span className="flex items-center justify-between gap-4">
                    <span className="font-medium">{category.title}</span>
                    <span className="font-mono text-xs text-muted-foreground">
                      {category.blocks.length} {category.blocks.length === 1 ? "block" : "blocks"}
                    </span>
                  </span>
                  <span className="mt-2 text-sm leading-6 text-muted-foreground">
                    {category.description}
                  </span>
                  <span className="mt-6 flex flex-1 items-end justify-between gap-4">
                    <span className="font-mono text-xs text-muted-foreground">
                      {category.blocks.map((block) => block.name).join(" · ")}
                    </span>
                    <ArrowRight
                      className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground"
                      aria-hidden
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
