import * as React from "react"

import { cn } from "@/lib/utils"

export interface RippleProps extends React.ComponentProps<"div"> {
  /** Number of rings. */
  rings?: number
  /** Diameter of the smallest ring, in pixels. */
  size?: number
  /** Space added to the diameter from one ring to the next, in pixels. */
  step?: number
  /** Duration of one breath, as a CSS time. */
  duration?: string
}

/**
 * Concentric rings that breathe from the center of their positioned parent,
 * behind a logo or a call to action. The rings take the text color and stand
 * still under reduced motion.
 */
export function Ripple({
  rings = 8,
  size = 180,
  step = 72,
  duration = "3.4s",
  className,
  style,
  ...props
}: RippleProps) {
  return (
    <div
      data-slot="ripple"
      aria-hidden
      style={{ "--ripple-duration": duration, ...style } as React.CSSProperties}
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden text-foreground select-none [mask-image:radial-gradient(closest-side,white_35%,transparent)]",
        className
      )}
      {...props}
    >
      {Array.from({ length: rings }, (_, index) => {
        const diameter = size + index * step
        return (
          <div
            key={index}
            className="absolute top-1/2 left-1/2 -translate-1/2 animate-ripple rounded-full border border-current/30 bg-current/[0.04] shadow-xl motion-reduce:animate-none"
            style={{
              width: diameter,
              height: diameter,
              opacity: 1 - index / rings,
              animationDelay: `${index * 0.06}s`,
              borderStyle: index === rings - 1 ? "dashed" : "solid",
            }}
          />
        )
      })}
    </div>
  )
}
