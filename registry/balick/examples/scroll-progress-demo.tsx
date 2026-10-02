"use client"

import * as React from "react"

import { ScrollProgress } from "@/registry/balick/ui/scroll-progress"

export default function ScrollProgressDemo() {
  const scroller = React.useRef<HTMLDivElement>(null)

  return (
    <div className="relative w-full max-w-xs overflow-hidden rounded-xl border bg-card">
      <ScrollProgress scrollRef={scroller} className="absolute z-10" />
      <div ref={scroller} className="h-56 overflow-y-auto p-5 text-sm leading-6 text-muted-foreground">
        <p className="mb-3 text-base font-medium text-foreground">Reading progress</p>
        {Array.from({ length: 6 }, (_, index) => (
          <p key={index} className="mb-3">
            The bar at the top fills as you scroll. On a page it is fixed to the top of the screen
            and follows the whole document; here it follows this panel.
          </p>
        ))}
      </div>
    </div>
  )
}
