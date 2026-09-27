"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export function CollapsibleCode({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="relative">
      <div className={cn(!open && "max-h-80 overflow-hidden")}>{children}</div>
      <div
        className={cn(
          "flex justify-center",
          open
            ? "border-t py-2"
            : "absolute inset-x-0 bottom-0 h-24 items-end bg-gradient-to-b from-transparent to-code pb-4"
        )}
      >
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="h-8 cursor-pointer rounded-md border bg-card px-3 text-xs font-medium shadow-xs transition-colors hover:bg-accent"
        >
          {open ? "Collapse" : "Expand"}
        </button>
      </div>
    </div>
  )
}
