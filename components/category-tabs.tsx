"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"

export interface CategoryTab {
  href: string
  title: string
  count: number
  current: boolean
}

/**
 * Category tabs across the sheet, sticky under the site header (blocks and
 * components galleries). They scroll sideways when they overflow and keep
 * the current tab in view.
 */
export function CategoryTabs({ label, tabs }: { label: string; tabs: CategoryTab[] }) {
  const listRef = React.useRef<HTMLDivElement>(null)
  const current = tabs.find((tab) => tab.current)?.href

  React.useEffect(() => {
    const list = listRef.current
    const tab = list?.querySelector<HTMLElement>("[aria-current='page']")
    if (!list || !tab) return
    list.scrollLeft = tab.offsetLeft - list.clientWidth / 2 + tab.offsetWidth / 2
  }, [current])

  return (
    <nav
      aria-label={label}
      data-category-tabs
      className="sticky top-14 z-30 border-y border-rule bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/65"
    >
      <div
        ref={listRef}
        className="sheet relative flex gap-2 overflow-x-auto px-4 py-2 [mask-image:linear-gradient(to_right,transparent,black_1rem,black_calc(100%-1rem),transparent)] [scrollbar-width:none] md:px-6 [&::-webkit-scrollbar]:hidden"
      >
        {tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={tab.current ? "page" : undefined}
            className={cn(
              "inline-flex h-8 shrink-0 items-center gap-2 rounded-full border px-3 text-sm whitespace-nowrap transition-colors",
              tab.current
                ? "border-foreground bg-foreground text-background"
                : "bg-card shadow-xs hover:bg-accent"
            )}
          >
            {tab.title}
            <span
              className={cn("font-mono text-xs", tab.current ? "text-background/70" : "text-muted-foreground")}
            >
              {tab.count}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  )
}
