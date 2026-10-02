import * as React from "react"

import { cn } from "@/lib/utils"

export interface AuroraProps extends React.ComponentProps<"div"> {
  /** Duration of one drift of the veils, as a CSS time. */
  duration?: string
}

// Bands of light, from the text color at varied strengths to transparent.
const veils =
  "repeating-linear-gradient(100deg, transparent 0px, color-mix(in oklab, currentColor 70%, transparent) 30px, transparent 70px, transparent 110px, color-mix(in oklab, currentColor 30%, transparent) 130px, transparent 160px, color-mix(in oklab, currentColor 55%, transparent) 210px, transparent 270px, transparent 340px)"

/**
 * Veils of light that drift slowly across the top of their positioned
 * parent, like an aurora. The light takes the text color, so a `text-*`
 * class tints it. The veils stand still under reduced motion.
 */
export function Aurora({ duration = "60s", className, style, ...props }: AuroraProps) {
  return (
    <div
      data-slot="aurora"
      aria-hidden
      style={{ "--aurora-duration": duration, ...style } as React.CSSProperties}
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden text-foreground opacity-30 dark:opacity-50 [mask-image:radial-gradient(ellipse_80%_70%_at_60%_0%,black_20%,transparent)]",
        className
      )}
      {...props}
    >
      <div
        className="absolute -inset-[10px] animate-aurora blur-[10px] [background-size:300%_200%] motion-reduce:animate-none"
        style={{ backgroundImage: veils }}
      />
      <div
        className="absolute -inset-[10px] animate-aurora blur-[24px] [animation-direction:reverse] [background-size:200%_100%] motion-reduce:animate-none"
        style={{ backgroundImage: veils }}
      />
    </div>
  )
}
