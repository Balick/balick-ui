"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"

type Category = { slug: string; title: string; count: number }

/**
 * Category tabs of the blocks gallery, sticky under the site header. They
 * scroll sideways when they overflow and keep the current tab in view.
 */
export function BlocksCategoryTabs({
  categories,
  active,
  total,
}: {
  categories: Category[]
  /** Slug of the current category, or undefined on the overview. */
  active?: string
  total: number
}) {
  const listRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const list = listRef.current
    const tab = list?.querySelector<HTMLElement>("[aria-current='page']")
    if (!list || !tab) return
    list.scrollLeft = tab.offsetLeft - list.clientWidth / 2 + tab.offsetWidth / 2
  }, [active])

  return (
    <nav
      aria-label="Block categories"
      data-blocks-tabs
      className="sticky top-14 z-30 -mx-4 border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 md:-mx-6"
    >
      <div
        ref={listRef}
        className="flex gap-2 overflow-x-auto px-4 py-2 [mask-image:linear-gradient(to_right,transparent,black_1rem,black_calc(100%-1rem),transparent)] [scrollbar-width:none] md:px-6 [&::-webkit-scrollbar]:hidden"
      >
        <Tab href="/blocks" title="All" count={total} current={!active} />
        {categories.map((category) => (
          <Tab
            key={category.slug}
            href={`/blocks/${category.slug}`}
            title={category.title}
            count={category.count}
            current={category.slug === active}
          />
        ))}
      </div>
    </nav>
  )
}

function Tab({
  href,
  title,
  count,
  current,
}: {
  href: string
  title: string
  count: number
  current: boolean
}) {
  return (
    <Link
      href={href}
      aria-current={current ? "page" : undefined}
      className={cn(
        "inline-flex h-8 shrink-0 items-center gap-2 rounded-full border px-3 text-sm whitespace-nowrap transition-colors",
        current ? "border-foreground bg-foreground text-background" : "bg-background hover:bg-accent"
      )}
    >
      {title}
      <span className={cn("font-mono text-xs", current ? "text-background/70" : "text-muted-foreground")}>
        {count}
      </span>
    </Link>
  )
}

/**
 * Sends links from the single-page gallery to the category pages:
 * /blocks#pricing to /blocks/pricing, /blocks#pricing-01 to
 * /blocks/pricing#pricing-01.
 */
export function BlocksHashRedirect({ targets }: { targets: Record<string, string> }) {
  const router = useRouter()

  React.useEffect(() => {
    const target = targets[window.location.hash.slice(1)]
    if (target) router.replace(target)
  }, [router, targets])

  return null
}
