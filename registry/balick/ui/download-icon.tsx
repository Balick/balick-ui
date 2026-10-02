import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * An arrow that drops into its tray, which dips under it. It plays when the
 * icon is hovered, or when the link or button around it is hovered or
 * focused with the keyboard; mark any other parent with `data-icon-trigger`.
 * It stands still under reduced motion.
 */
export function DownloadIcon({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      data-slot="download-icon"
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
      <g className="[:is(a,button,svg,[data-icon-trigger]):is(:hover,:focus-visible)_&]:animate-download-arrow motion-reduce:animate-none">
        <path d="M12 3v12" />
        <path d="m7 10 5 5 5-5" />
      </g>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" className="[:is(a,button,svg,[data-icon-trigger]):is(:hover,:focus-visible)_&]:animate-download-tray motion-reduce:animate-none" />
    </svg>
  )
}
