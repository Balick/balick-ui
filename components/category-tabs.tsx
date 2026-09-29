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
 * Category tabs, sticky under the site header. They scroll sideways when
 * they overflow and keep the current tab in view. `bleed` spans the whole
 * sheet (blocks gallery); otherwise the bar spans the docs column.
 */
export function CategoryTabs({
  label,
  tabs,
  bleed = false,
}: {
  label: string
  tabs: CategoryTab[]
  bleed?: boolean
}) {
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
      className={cn(
        "sticky top-14 z-30 border-rule bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/65",
        bleed ? "border-y" : "-mx-4 border-b md:-mr-8 md:-ml-10 lg:-mr-12 lg:-ml-12"
      )}
    >
      <div
        ref={listRef}
        className={cn(
          "relative flex gap-2 overflow-x-auto py-2 [mask-image:linear-gradient(to_right,transparent,black_1rem,black_calc(100%-1rem),transparent)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          bleed ? "sheet px-4 md:px-6" : "px-4 md:pr-8 md:pl-10 lg:px-12"
        )}
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
