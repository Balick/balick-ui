import * as React from "react"

import { cn } from "@/lib/utils"

export interface BrowserFrameProps extends React.ComponentProps<"div"> {
  /** Address shown in the bar at the top. */
  url?: string
}

/**
 * A browser window around a product preview or a screenshot: three dots, an
 * address bar and the content below. It carries the soft shadow of the block
 * it sits in.
 */
export function BrowserFrame({ url, className, children, ...props }: BrowserFrameProps) {
  return (
    <div
      data-slot="browser-frame"
      className={cn(
        "overflow-hidden rounded-xl border bg-card shadow-[0_24px_64px_-24px_rgb(0_0_0/0.25)]",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-4 border-b px-4 py-3">
        <div aria-hidden className="flex w-12 shrink-0 gap-1.5">
          <span className="size-2.5 rounded-full bg-foreground/15" />
          <span className="size-2.5 rounded-full bg-foreground/15" />
          <span className="size-2.5 rounded-full bg-foreground/15" />
        </div>
        {url && (
          <div className="mx-auto flex h-6 max-w-xs min-w-0 flex-1 items-center justify-center gap-1.5 rounded-md bg-muted px-3 font-mono text-[11px] text-muted-foreground">
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-2.5 shrink-0"
            >
              <rect x="4" y="11" width="16" height="10" rx="2" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" />
            </svg>
            <span className="truncate">{url}</span>
          </div>
        )}
        {/* Balances the dots, so the address stays centred. */}
        <div aria-hidden className="w-12 shrink-0" />
      </div>
      <div className="relative">{children}</div>
    </div>
  )
}
