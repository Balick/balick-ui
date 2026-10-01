"use client"

import * as React from "react"

import { VelocityMarquee } from "@/registry/balick/ui/velocity-marquee"

const words = ["Compose", "Install", "Own the code", "Ship"]

export default function VelocityMarqueeDemo() {
  const scroller = React.useRef<HTMLDivElement>(null)

  return (
    <div ref={scroller} className="h-56 w-full max-w-sm overflow-y-auto rounded-xl border bg-card">
      <div className="sticky top-0 z-10 border-b bg-card py-3">
        <VelocityMarquee scrollRef={scroller} duration={14}>
          {words.map((word) => (
            <span key={word} className="text-2xl font-semibold tracking-tighter whitespace-nowrap">
              {word}
            </span>
          ))}
        </VelocityMarquee>
      </div>
      <div className="space-y-3 p-5 text-sm leading-6 text-muted-foreground">
        <p className="text-foreground">Scroll this panel: the marquee speeds up with you.</p>
        {Array.from({ length: 6 }, (_, index) => (
          <p key={index}>
            It drifts on its own and picks up speed with the scroll, then eases back to its pace
            once you stop.
          </p>
        ))}
      </div>
    </div>
  )
}
