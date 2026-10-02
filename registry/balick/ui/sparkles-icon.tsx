import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Sparkles that twinkle in turn. It plays when the icon is hovered, or when
 * the link or button around it is hovered or focused with the keyboard; mark
 * any other parent with `data-icon-trigger`. It stands still under reduced
 * motion.
 */
export function SparklesIcon({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      data-slot="sparkles-icon"
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
        d="M10 3.5c.5 4.5 2 6 6.5 6.5-4.5.5-6 2-6.5 6.5-.5-4.5-2-6-6.5-6.5 4.5-.5 6-2 6.5-6.5Z"
        className="origin-center [transform-box:fill-box] [:is(a,button,svg,[data-icon-trigger]):is(:hover,:focus-visible)_&]:animate-sparkle motion-reduce:animate-none"
      />
      <path
        d="M19 2v4M17 4h4"
        className="origin-center [transform-box:fill-box] [animation-delay:120ms] [:is(a,button,svg,[data-icon-trigger]):is(:hover,:focus-visible)_&]:animate-sparkle motion-reduce:animate-none"
      />
      <path
        d="M18 17v4M16 19h4"
        className="origin-center [transform-box:fill-box] [animation-delay:240ms] [:is(a,button,svg,[data-icon-trigger]):is(:hover,:focus-visible)_&]:animate-sparkle motion-reduce:animate-none"
      />
    </svg>
  )
}
