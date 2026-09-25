import * as React from "react"

import { cn } from "@/lib/utils"

export interface GridPatternProps extends React.ComponentProps<"svg"> {
  /** Width of a cell, in pixels. */
  width?: number
  /** Height of a cell, in pixels. */
  height?: number
  /** Horizontal offset of the pattern. */
  x?: number
  /** Vertical offset of the pattern. */
  y?: number
  /** Dash pattern of the lines, e.g. "4 2". */
  strokeDasharray?: string
  /** Cells to fill, as [column, row] pairs. */
  squares?: Array<[number, number]>
}

export function GridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = "0",
  squares,
  className,
  ...props
}: GridPatternProps) {
  const id = React.useId()

  return (
    <svg
      data-slot="grid-pattern"
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-foreground/[0.04] stroke-foreground/10",
        className
      )}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path
            d={`M.5 ${height}V.5H${width}`}
            fill="none"
            strokeDasharray={strokeDasharray}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([col, row]) => (
            <rect
              key={`${col}-${row}`}
              strokeWidth="0"
              width={width - 1}
              height={height - 1}
              x={col * width + 1}
              y={row * height + 1}
            />
          ))}
        </svg>
      )}
    </svg>
  )
}
