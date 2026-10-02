import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * A bell that rings: it swings from its top and the clapper follows. It
 * plays when the icon is hovered, or when the link or button around it is
 * hovered or focused with the keyboard; mark any other parent with
 * `data-icon-trigger`. It stands still under reduced motion.
 */
export function BellIcon({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      data-slot="bell-icon"
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
      <g className="origin-[12px_3px] [transform-box:view-box] [:is(a,button,svg,[data-icon-trigger]):is(:hover,:focus-visible)_&]:animate-bell-ring motion-reduce:animate-none">
        <path d="M18 8A6 6 0 0 0 6 8c0 6.5-2.5 8.5-3 9h18c-.5-.5-3-2.5-3-9" />
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" className="[:is(a,button,svg,[data-icon-trigger]):is(:hover,:focus-visible)_&]:animate-bell-clapper motion-reduce:animate-none" />
      </g>
    </svg>
  )
}
