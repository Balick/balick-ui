import * as React from "react"

import { cn } from "@/lib/utils"

export interface DotPatternProps extends React.ComponentProps<"svg"> {
  /** Horizontal space between two dots, in pixels. */
  width?: number
  /** Vertical space between two dots, in pixels. */
  height?: number
  /** Radius of a dot, in pixels. */
  radius?: number
  /** Dots that glow in turn, as [column, row] pairs. */
  glow?: Array<[number, number]>
  /** Duration of one glow, as a CSS time. */
  duration?: string
}

/**
 * A grid of dots that fills its positioned parent. The dots take the text
 * color, so a `text-*` class tints them. The glowing dots stand still under
 * reduced motion.
 */
export function DotPattern({
  width = 16,
  height = 16,
  radius = 1,
  glow,
  duration = "3s",
  className,
  style,
  ...props
}: DotPatternProps) {
  const id = React.useId()

  return (
    <svg
      data-slot="dot-pattern"
      aria-hidden
      style={{ "--dot-duration": duration, ...style } as React.CSSProperties}
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full text-foreground",
        className
      )}
      {...props}
    >
      <defs>
        <pattern id={id} width={width} height={height} patternUnits="userSpaceOnUse">
          <circle cx={width / 2} cy={height / 2} r={radius} fill="currentColor" fillOpacity={0.25} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
      {glow?.map(([col, row], index) => (
        <g
          key={`${col}-${row}`}
          className="origin-center animate-dot-glow opacity-0 [transform-box:fill-box] motion-reduce:animate-none motion-reduce:opacity-60"
          // Spread the glows over one cycle, in a stable order.
          style={{ animationDelay: `calc(var(--dot-duration) * ${((index * 0.618) % 1).toFixed(3)} * -1)` }}
        >
          <circle
            cx={col * width + width / 2}
            cy={row * height + height / 2}
            r={radius * 6}
            fill="currentColor"
            fillOpacity={0.18}
          />
          <circle cx={col * width + width / 2} cy={row * height + height / 2} r={radius * 1.75} fill="currentColor" />
        </g>
      ))}
    </svg>
  )
}
