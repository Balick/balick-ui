import Link from "next/link"

import { getBlock, getCategory, type BlockCategory } from "@/content/blocks"
import { cn } from "@/lib/utils"

function Bar({ className }: { className?: string }) {
  return <span className={cn("block h-1 rounded-full bg-foreground/15", className)} />
}

function Cells({ count, children }: { count: number; children: React.ReactNode }) {
  return (
    <span className="grid grid-cols-3 gap-1.5">
      {Array.from({ length: count }, (_, index) => (
        <span key={index} className="contents">
          {children}
        </span>
      ))}
    </span>
  )
}

/** A schematic drawing of each kind of block, in the spirit of a wireframe. */
const schematics: Partial<Record<BlockCategory, React.ReactNode>> = {
  navbar: (
    <span className="flex items-center gap-3">
      <span className="size-2.5 rounded-[3px] bg-foreground" />
      <Bar className="w-6" />
      <Bar className="w-6" />
      <Bar className="w-6" />
      <span className="ml-auto h-3 w-9 rounded-[3px] bg-foreground" />
    </span>
  ),
  hero: (
    <span className="flex flex-col items-center gap-1.5 py-1">
      <span className="h-2 w-12 rounded-full border border-foreground/25" />
      <span className="mt-1 h-2.5 w-3/5 rounded-full bg-foreground/80" />
      <span className="h-2.5 w-2/5 rounded-full bg-foreground/80" />
      <Bar className="mt-1 w-1/2" />
      <span className="mt-1.5 flex gap-1.5">
        <span className="h-3 w-10 rounded-[3px] bg-foreground" />
        <span className="h-3 w-10 rounded-[3px] border border-foreground/25" />
      </span>
      <span className="mt-2 flex h-9 w-4/5 items-end gap-1 rounded-[4px] border border-foreground/15 p-1.5">
        {[40, 55, 45, 70, 60, 85].map((height) => (
          <span
            key={height}
            style={{ height: `${height}%` }}
            className="flex-1 rounded-[2px] bg-foreground/15 last:bg-foreground"
          />
        ))}
      </span>
    </span>
  ),
  logos: (
    <span className="flex items-center justify-between gap-2 px-2">
      {Array.from({ length: 5 }, (_, index) => (
        <span key={index} className="h-2 w-9 rounded-full bg-foreground/15" />
      ))}
    </span>
  ),
  features: (
    <Cells count={3}>
      <span className="flex flex-col gap-1 rounded-[4px] border border-foreground/10 p-1.5">
        <span className="size-2 rounded-[2px] border border-foreground/40" />
        <Bar className="mt-1 w-4/5 bg-foreground/40" />
        <Bar className="w-full" />
      </span>
    </Cells>
  ),
  testimonials: (
    <Cells count={3}>
      <span className="flex flex-col gap-1 rounded-[4px] border border-foreground/10 p-1.5">
        <Bar className="w-full" />
        <Bar className="w-3/4" />
        <span className="mt-1 flex items-center gap-1">
          <span className="size-2 rounded-full bg-foreground/30" />
          <Bar className="w-1/3 bg-foreground/30" />
        </span>
      </span>
    </Cells>
  ),
  pricing: (
    <span className="grid grid-cols-3 gap-1.5">
      {[false, true, false].map((featured, index) => (
        <span
          key={index}
          className={cn(
            "flex flex-col gap-1 rounded-[4px] border p-1.5",
            featured ? "border-foreground bg-foreground" : "border-foreground/10"
          )}
        >
          <Bar className={cn("w-1/2", featured && "bg-background/50")} />
          <span className={cn("h-2 w-1/3 rounded-full", featured ? "bg-background" : "bg-foreground/70")} />
          <Bar className={cn("mt-1 w-full", featured && "bg-background/30")} />
          <Bar className={cn("w-4/5", featured && "bg-background/30")} />
        </span>
      ))}
    </span>
  ),
  faq: (
    <span className="grid grid-cols-[1fr_1.6fr] gap-3">
      <span className="flex flex-col gap-1">
        <span className="h-2 w-4/5 rounded-full bg-foreground/70" />
        <Bar className="w-3/5" />
      </span>
      <span className="flex flex-col">
        {[0, 1, 2].map((index) => (
          <span key={index} className="flex items-center justify-between border-b border-foreground/10 py-1">
            <Bar className="w-3/5" />
            <span className="size-1.5 rounded-full border border-foreground/40" />
          </span>
        ))}
      </span>
    </span>
  ),
  cta: (
    <span className="flex flex-col items-center gap-1.5 rounded-[4px] bg-foreground px-3 py-3">
      <span className="h-2 w-2/5 rounded-full bg-background/80" />
      <Bar className="w-1/3 bg-background/30" />
      <span className="mt-1 h-3 w-12 rounded-[3px] bg-background" />
    </span>
  ),
  footer: (
    <span className="grid grid-cols-4 gap-3">
      {[0, 1, 2, 3].map((column) => (
        <span key={column} className="flex flex-col gap-1">
          {column === 0 ? (
            <span className="size-2.5 rounded-[3px] bg-foreground" />
          ) : (
            <Bar className="w-3/5 bg-foreground/40" />
          )}
          <Bar className="w-4/5" />
          <Bar className="w-3/5" />
        </span>
      ))}
    </span>
  ),
}

const fallback = (
  <span className="flex flex-col gap-1.5">
    <span className="h-2 w-2/5 rounded-full bg-foreground/70" />
    <Bar className="w-3/5" />
    <Bar className="w-1/2" />
  </span>
)

/**
 * An exploded view of a composed page: every block drawn as a plate, pulled
 * apart, with a numbered callout that leads to the block.
 */
export function Anatomy({ blocks }: { blocks: string[] }) {
  return (
    <ol className="mx-auto flex max-w-5xl flex-col gap-4">
      {blocks.map((name, index) => {
        const block = getBlock(name)
        if (!block) return null
        const category = getCategory(block.category)
        const href = `/blocks/${block.category}#${name}`
        const left = index % 2 === 0

        return (
          <li
            key={`${name}-${index}`}
            className="group grid grid-cols-1 items-center gap-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)_minmax(0,1fr)] lg:gap-0"
          >
            <Link
              href={href}
              className={cn(
                "flex min-w-0 items-center gap-3 text-sm",
                left ? "lg:col-start-1" : "lg:col-start-3 lg:flex-row-reverse"
              )}
            >
              <span className="flex min-w-0 items-baseline gap-2">
                <span className="font-mono text-[11px] text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="truncate font-medium transition-colors group-hover:text-foreground">
                  {category.title}
                </span>
                <span className="font-mono text-[11px] text-muted-foreground">{name}</span>
              </span>
              {/* Leader line from the callout to the plate. */}
              <span aria-hidden className="hidden flex-1 items-center lg:flex">
                <span
                  className={cn(
                    "h-0 flex-1 border-t border-dashed border-mark transition-colors group-hover:border-foreground/60",
                    left ? "ml-1" : "mr-1"
                  )}
                />
                <span
                  className={cn(
                    "size-1.5 shrink-0 rounded-full bg-foreground/50 transition-colors group-hover:bg-foreground",
                    left ? "order-last" : "order-first"
                  )}
                />
              </span>
            </Link>
            <Link
              href={href}
              tabIndex={-1}
              aria-hidden
              className={cn(
                "block rounded-md border bg-card px-3 py-2.5 shadow-xs transition-[border-color,translate] duration-200 group-hover:border-foreground/30 motion-safe:group-hover:-translate-y-0.5",
                "lg:col-start-2 lg:row-start-1"
              )}
            >
              {schematics[block.category] ?? fallback}
            </Link>
          </li>
        )
      })}
    </ol>
  )
}
