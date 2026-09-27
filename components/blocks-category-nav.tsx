"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

type Category = { slug: string; title: string; count: number }

/** Height of the site header: the bar sits right below it. */
const HEADER_HEIGHT = 56
/**
 * A category becomes active once its heading passes this line, a little
 * below where a jump lands it (under the header and this bar).
 */
const ACTIVE_LINE = 160

/**
 * Category links for the blocks gallery. Renders the chips of the page intro
 * and, once they scroll out of view, a bar fixed under the site header that
 * scrolls sideways and follows the category being read.
 */
export function BlocksCategoryNav({ categories }: { categories: Category[] }) {
  const introRef = React.useRef<HTMLElement>(null)
  const barRef = React.useRef<HTMLDivElement>(null)
  const [visible, setVisible] = React.useState(false)
  const [active, setActive] = React.useState<string>()

  React.useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const intro = introRef.current
      if (intro) setVisible(intro.getBoundingClientRect().bottom < HEADER_HEIGHT)

      let current: string | undefined
      for (const { slug } of categories) {
        const section = document.getElementById(slug)
        if (section && section.getBoundingClientRect().top <= ACTIVE_LINE) current = slug
      }
      setActive(current)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [categories])

  // Keep the active chip in view without moving the page vertically.
  React.useEffect(() => {
    const bar = barRef.current
    const chip = bar?.querySelector<HTMLElement>(`[data-slug="${active}"]`)
    if (!bar || !chip) return
    bar.scrollTo({
      left: chip.offsetLeft - bar.clientWidth / 2 + chip.offsetWidth / 2,
      behavior: "smooth",
    })
  }, [active])

  return (
    <>
      <nav ref={introRef} aria-label="Categories" className="mt-8 flex flex-wrap gap-2">
        {categories.map((category) => (
          <Chip key={category.slug} category={category} />
        ))}
      </nav>

      <div
        inert={!visible}
        className={cn(
          "fixed inset-x-0 top-14 z-30 border-b bg-background/80 backdrop-blur-md transition-[translate,opacity] duration-200 ease-out supports-[backdrop-filter]:bg-background/60",
          visible ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
        )}
      >
        <nav aria-label="Jump to a category" className="mx-auto max-w-screen-2xl">
          <div
            ref={barRef}
            className="flex gap-2 overflow-x-auto px-4 py-2 [mask-image:linear-gradient(to_right,transparent,black_1rem,black_calc(100%-1rem),transparent)] [scrollbar-width:none] md:px-6 [&::-webkit-scrollbar]:hidden"
          >
            {categories.map((category) => (
              <Chip
                key={category.slug}
                category={category}
                active={category.slug === active}
              />
            ))}
          </div>
        </nav>
      </div>
    </>
  )
}

/**
 * Jumps without smooth scrolling: on the way to a distant category, every
 * lazy preview in between would load and resize, moving the target.
 */
function jumpTo(event: React.MouseEvent<HTMLAnchorElement>, slug: string) {
  const target = document.getElementById(slug)
  if (!target || event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return
  event.preventDefault()
  target.scrollIntoView({ behavior: "instant", block: "start" })
  history.replaceState(null, "", `#${slug}`)
}

function Chip({ category, active }: { category: Category; active?: boolean }) {
  return (
    <a
      href={`#${category.slug}`}
      onClick={(event) => jumpTo(event, category.slug)}
      data-slug={category.slug}
      aria-current={active ? "location" : undefined}
      className={cn(
        "inline-flex h-8 shrink-0 items-center gap-2 rounded-full border px-3 text-sm whitespace-nowrap transition-colors",
        active
          ? "border-foreground bg-foreground text-background"
          : "bg-background hover:bg-accent"
      )}
    >
      {category.title}
      <span className={cn("font-mono text-xs", active ? "text-background/70" : "text-muted-foreground")}>
        {category.count}
      </span>
    </a>
  )
}
