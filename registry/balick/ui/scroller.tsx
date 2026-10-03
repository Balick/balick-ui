"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

export interface ScrollerProps extends React.ComponentProps<"div"> {
  /** Show buttons that scroll by one item. */
  controls?: boolean
  /** Space between items, as a CSS length. */
  gap?: string
}

/**
 * A row that scrolls sideways and snaps to its items. Its edges fade only on
 * the sides that have more to show. Label it with `aria-label`: the row can
 * be scrolled with the keyboard once focused.
 */
export function Scroller({
  controls = false,
  gap = "1rem",
  className,
  style,
  children,
  "aria-label": label,
  ...props
}: ScrollerProps) {
  const trackRef = React.useRef<HTMLDivElement>(null)
  const [edges, setEdges] = React.useState({ start: false, end: false })

  React.useEffect(() => {
    const track = trackRef.current
    if (!track) return

    function update() {
      const { scrollLeft, scrollWidth, clientWidth } = track!
      setEdges({ start: scrollLeft > 1, end: scrollLeft + clientWidth < scrollWidth - 1 })
    }

    update()
    track.addEventListener("scroll", update, { passive: true })
    const observer = new ResizeObserver(update)
    observer.observe(track)
    return () => {
      track.removeEventListener("scroll", update)
      observer.disconnect()
    }
  }, [])

  function scrollByItem(direction: 1 | -1) {
    const track = trackRef.current
    const item = track?.firstElementChild as HTMLElement | null
    if (!track || !item) return
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const step = item.offsetWidth + parseFloat(getComputedStyle(track).columnGap || "0")
    track.scrollBy({ left: direction * step, behavior: reduceMotion ? "auto" : "smooth" })
  }

  return (
    <div
      data-slot="scroller"
      style={{ "--scroller-gap": gap, ...style } as React.CSSProperties}
      className={cn("flex w-full min-w-0 flex-col gap-4", className)}
      {...props}
    >
      <div
        ref={trackRef}
        role="region"
        aria-label={label}
        tabIndex={0}
        style={
          {
            "--fade-start": edges.start ? "3rem" : "0px",
            "--fade-end": edges.end ? "3rem" : "0px",
          } as React.CSSProperties
        }
        className="flex snap-x snap-mandatory gap-(--scroller-gap) overflow-x-auto overscroll-x-contain rounded-md [scrollbar-width:none] [mask-image:linear-gradient(to_right,transparent,black_var(--fade-start),black_calc(100%-var(--fade-end)),transparent)] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 [&::-webkit-scrollbar]:hidden [&>*]:shrink-0 [&>*]:snap-start"
      >
        {children}
      </div>
      {controls && (
        <div className="flex justify-end gap-2">
          <button
            type="button"
            aria-label="Scroll back"
            disabled={!edges.start}
            onClick={() => scrollByItem(-1)}
            className="inline-flex size-8 items-center justify-center rounded-full border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-40 [&_svg]:size-4"
          >
            <ChevronLeft aria-hidden />
          </button>
          <button
            type="button"
            aria-label="Scroll forward"
            disabled={!edges.end}
            onClick={() => scrollByItem(1)}
            className="inline-flex size-8 items-center justify-center rounded-full border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-40 [&_svg]:size-4"
          >
            <ChevronRight aria-hidden />
          </button>
        </div>
      )}
    </div>
  )
}
