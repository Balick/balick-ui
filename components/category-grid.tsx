import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { galleryCategories } from "@/lib/blocks-gallery"
import { cn } from "@/lib/utils"

/** Columns at each breakpoint, and the literal classes that show or hide a cell there. */
const breakpoints = [
  { columns: 1, show: "block", hide: "hidden" },
  { columns: 2, show: "sm:block", hide: "sm:hidden" },
  { columns: 3, show: "lg:block", hide: "lg:hidden" },
  { columns: 4, show: "xl:block", hide: "xl:hidden" },
]

/**
 * Classes for the hatched cells that complete the last row. The k-th filler
 * is visible wherever the last row is short of at least k cells.
 */
function fillerClasses(count: number) {
  const max = Math.max(...breakpoints.map((bp) => bp.columns)) - 1
  return Array.from({ length: max }, (_, k) => {
    let previous: boolean | undefined
    const classes: string[] = []
    for (const bp of breakpoints) {
      const visible = k < (bp.columns - (count % bp.columns)) % bp.columns
      if (visible !== previous) classes.push(visible ? bp.show : bp.hide)
      previous = visible
    }
    return classes.join(" ")
  }).filter((classes) => classes !== "hidden")
}

/**
 * Every block category as a hairline grid on the sheet. Place it in a
 * full-width row: the rails and the row's rules draw its outer edges.
 */
export function CategoryGrid({ compact = false }: { compact?: boolean }) {
  const categories = galleryCategories()

  return (
    <div className="overflow-hidden">
      <ul className="-mr-px -mb-px grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((category, index) => (
          <li key={category.slug} className="border-r border-b border-rule">
            <Link
              href={`/blocks/${category.slug}`}
              className="group flex h-full flex-col p-6 transition-colors hover:bg-foreground/[0.03]"
            >
              <span className="flex items-center justify-between gap-4 font-mono text-[11px] text-muted-foreground">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>
                  {category.blocks.length} {category.blocks.length === 1 ? "block" : "blocks"}
                </span>
              </span>
              <span className={cn("text-lg font-medium tracking-tight", compact ? "mt-8" : "mt-10")}>
                {category.title}
              </span>
              {!compact && (
                <span className="mt-2 text-sm leading-6 text-muted-foreground">
                  {category.description}
                </span>
              )}
              <span className="mt-4 flex flex-1 items-end justify-between gap-4">
                <span className="min-w-0 truncate text-sm text-muted-foreground">
                  {category.summary}
                </span>
                <ArrowRight
                  className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground"
                  aria-hidden
                />
              </span>
            </Link>
          </li>
        ))}
        {fillerClasses(categories.length).map((classes, index) => (
          <li key={index} aria-hidden className={cn("border-r border-b border-rule bg-hatch", classes)} />
        ))}
      </ul>
    </div>
  )
}
