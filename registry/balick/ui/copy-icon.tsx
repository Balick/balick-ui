import * as React from "react"

import { cn } from "@/lib/utils"

export interface CopyIconProps extends React.ComponentProps<"svg"> {
  /** Show a check, drawn stroke by stroke, instead of the two sheets. */
  copied?: boolean
}

/**
 * Two sheets that give way to a check once something is copied. The change
 * is immediate under reduced motion.
 */
export function CopyIcon({ copied = false, className, ...props }: CopyIconProps) {
  return (
    <svg
      data-slot="copy-icon"
      data-state={copied ? "copied" : "idle"}
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
      <g className={cn("origin-center [transform-box:fill-box] transition-[opacity,translate,rotate,scale] duration-300 ease-out motion-reduce:transition-none", copied && "scale-75 opacity-0")}>
        <rect x="8" y="8" width="13" height="13" rx="2" />
        <path d="M4 16V5a2 2 0 0 1 2-2h11" />
      </g>
      <path
        d="M4.5 12.5 9.5 17.5 19.5 6.5"
        pathLength={1}
        strokeDasharray={1}
        className={cn(
          "transition-[stroke-dashoffset] duration-300 ease-out motion-reduce:transition-none",
          copied ? "delay-100 [stroke-dashoffset:0]" : "[stroke-dashoffset:1]"
        )}
      />
    </svg>
  )
}
