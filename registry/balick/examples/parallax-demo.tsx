"use client"

import * as React from "react"

import { Parallax } from "@/registry/balick/ui/parallax"

export default function ParallaxDemo() {
  const scroller = React.useRef<HTMLDivElement>(null)

  return (
    <div className="w-full max-w-xs">
      <div ref={scroller} className="relative h-56 overflow-y-auto rounded-xl border bg-card">
        <div className="flex h-24 items-end p-4 text-xs text-muted-foreground">Scroll down</div>
        <div className="relative flex h-64 items-center justify-center overflow-hidden">
          <Parallax scrollRef={scroller} distance={80} className="absolute -left-4 top-6 size-28 rounded-full bg-muted" />
          <Parallax scrollRef={scroller} distance={30} className="absolute right-4 bottom-8 size-20 rounded-2xl border bg-muted/60" />
          <Parallax scrollRef={scroller} distance={-20} className="relative text-3xl font-semibold tracking-tighter">
            Depth
          </Parallax>
        </div>
        <div className="h-24" />
      </div>
    </div>
  )
}
