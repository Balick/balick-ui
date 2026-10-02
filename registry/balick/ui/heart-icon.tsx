import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * A heart that beats twice. It plays when the icon is hovered, or when the
 * link or button around it is hovered or focused with the keyboard; mark any
 * other parent with `data-icon-trigger`. It stands still under reduced
 * motion.
 */
export function HeartIcon({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      data-slot="heart-icon"
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
      <path
        d="M12 20s-7.5-4.6-9.2-9.3C1.7 7.6 3.6 4.5 6.9 4.5c2 0 3.6 1.2 5.1 3 1.5-1.8 3.1-3 5.1-3 3.3 0 5.2 3.1 4.1 6.2C19.5 15.4 12 20 12 20Z"
        className="origin-center [transform-box:fill-box] [:is(a,button,svg,[data-icon-trigger]):is(:hover,:focus-visible)_&]:animate-heart-beat motion-reduce:animate-none"
      />
    </svg>
  )
}
