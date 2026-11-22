"use client"

import * as React from "react"
import { ExternalLink } from "lucide-react"

import { ResizableFrame, ViewportToggle } from "@/components/resizable-frame"

/** A template in a browser-like window that scrolls, with a viewport switch. */
export function TemplatePreview({ src, title }: { src: string; title: string }) {
  const [width, setWidth] = React.useState<number | null>(null)

  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-xs">
      <div className="flex h-11 items-center gap-3 border-b px-3">
        <div aria-hidden className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-foreground/15" />
          <span className="size-2.5 rounded-full bg-foreground/15" />
          <span className="size-2.5 rounded-full bg-foreground/15" />
        </div>
        <p className="min-w-0 flex-1 truncate text-center font-mono text-xs text-muted-foreground">{title}</p>
        <ViewportToggle width={width} onChange={setWidth} className="hidden md:flex" />
        <a
          href={src}
          target="_blank"
          rel="noreferrer"
          aria-label="Open the preview in a new tab"
          title="Open in a new tab"
          className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <ExternalLink className="size-3.5" />
        </a>
      </div>
      <div className="flex h-[78svh] min-h-[480px] justify-center bg-hatch p-0 md:p-3">
        <ResizableFrame
          src={src}
          title={`${title} preview`}
          width={width}
          onWidthChange={setWidth}
          autoHeight={false}
          className="rounded-none md:rounded-lg"
        />
      </div>
    </div>
  )
}
