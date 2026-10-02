import * as React from "react"

import { cn } from "@/lib/utils"

export interface RetroGridProps extends React.ComponentProps<"div"> {
  /** Tilt of the floor, in degrees. */
  angle?: number
  /** Size of a cell, in pixels. */
  cellSize?: number
  /** Duration of one cell crossing, as a CSS time. */
  duration?: string
}

/**
 * A grid floor in perspective that slides toward the viewer and fades into
 * the horizon. The lines take the text color; the floor stands still under
 * reduced motion.
 */
export function RetroGrid({
  angle = 65,
  cellSize = 60,
  duration = "1.2s",
  className,
  style,
  ...props
}: RetroGridProps) {
  return (
    <div
      data-slot="retro-grid"
      aria-hidden
      style={
        {
          "--retro-angle": `${angle}deg`,
          "--retro-cell": `${cellSize}px`,
          "--retro-duration": duration,
          ...style,
        } as React.CSSProperties
      }
      className={cn("pointer-events-none absolute inset-0 overflow-hidden text-foreground/30", className)}
      {...props}
    >
      {/* The floor fills the lower half and fades into the horizon, at its top edge. */}
      <div className="absolute inset-x-0 top-1/2 bottom-0 [perspective-origin:50%_0%] [perspective:320px] [mask-image:linear-gradient(to_bottom,transparent,black_60%)]">
        <div className="absolute -inset-x-full bottom-0 h-[600%] origin-bottom overflow-hidden [transform:rotateX(var(--retro-angle))]">
          <div className="absolute -top-(--retro-cell) right-0 bottom-0 left-0 animate-retro-grid [background-image:linear-gradient(to_right,currentColor_1px,transparent_0),linear-gradient(to_bottom,currentColor_1px,transparent_0)] [background-position:center_bottom] [background-size:var(--retro-cell)_var(--retro-cell)] motion-reduce:animate-none" />
        </div>
      </div>
    </div>
  )
}
