import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * A magnifier that traces a small circle, as if it scanned the page. It
 * plays when the icon is hovered, or when the link or button around it is
 * hovered or focused with the keyboard; mark any other parent with
 * `data-icon-trigger`. It stands still under reduced motion.
 */
export function SearchIcon({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      data-slot="search-icon"
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={cn("shrink-0", className)}
      {...props}
    >
      <g className="[:is(a,button,svg,[data-icon-trigger]):is(:hover,:focus-visible)_&]:animate-search-scan motion-reduce:animate-none">
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </g>
    </svg>
  )
}
