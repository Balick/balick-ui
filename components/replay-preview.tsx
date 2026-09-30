"use client"

import * as React from "react"
import { RotateCcw } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * The surface a live preview sits on, with a button that mounts the demo
 * again: animations start over, stateful demos return to their first state
 * and the ones that play when they scroll into view arm themselves again.
 */
export function ReplayPreview({
  label,
  className,
  children,
}: {
  label: string
  className?: string
  children: React.ReactNode
}) {
  const [run, setRun] = React.useState(0)

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setRun((n) => n + 1)}
        aria-label={`Replay ${label}`}
        title="Replay"
        className="absolute top-2 right-2 z-10 inline-flex size-7 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
      >
        <RotateCcw className="size-3.5" />
      </button>
      <div key={run} className="contents">
        {children}
      </div>
    </div>
  )
}
