import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * A paper plane that flies off and comes back in from the other side. It
 * plays when the icon is hovered, or when the link or button around it is
 * hovered or focused with the keyboard; mark any other parent with
 * `data-icon-trigger`. It stands still under reduced motion.
 */
export function SendIcon({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      data-slot="send-icon"
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
      <g className="[:is(a,button,svg,[data-icon-trigger]):is(:hover,:focus-visible)_&]:animate-send-fly motion-reduce:animate-none">
        <path d="M21.5 2.5 14.5 21.5l-4-8-8-4 19-7Z" />
        <path d="M21.5 2.5 10.5 13.5" />
      </g>
    </svg>
  )
}
