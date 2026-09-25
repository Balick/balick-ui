"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export interface TocItem {
  id: string
  title: string
}

export function Toc({ items }: { items: TocItem[] }) {
  const [active, setActive] = React.useState(items[0]?.id)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting)
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: "-80px 0px -70% 0px" }
    )
    items.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) observer.observe(element)
    })
    return () => observer.disconnect()
  }, [items])

  if (!items.length) return null

  return (
    <div className="flex flex-col gap-2 text-sm">
      <p className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
        On this page
      </p>
      <ul className="flex flex-col border-l">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                "-ml-px block border-l py-1 pl-3 transition-colors",
                active === item.id
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
