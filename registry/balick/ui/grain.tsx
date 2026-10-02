import * as React from "react"

import { cn } from "@/lib/utils"

export interface GrainProps extends React.ComponentProps<"svg"> {
  /** Fineness of the grain: higher values give smaller specks. */
  frequency?: number
  /** Number of noise layers: more layers give a richer texture. */
  octaves?: number
}

/**
 * A paper grain laid over its positioned parent, to give flat surfaces some
 * texture. The specks take the text color; the default `opacity-20` sets
 * how much they show.
 */
export function Grain({ frequency = 0.8, octaves = 3, className, ...props }: GrainProps) {
  const id = React.useId()

  return (
    <svg
      data-slot="grain"
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full text-foreground opacity-20",
        className
      )}
      {...props}
    >
      <filter id={id} x="0" y="0" width="100%" height="100%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency={frequency}
          numOctaves={octaves}
          stitchTiles="stitch"
          result="noise"
        />
        <feColorMatrix in="noise" type="luminanceToAlpha" result="alpha" />
        {/* Raise the contrast, so the grain reads as specks rather than a haze. */}
        <feComponentTransfer in="alpha" result="specks">
          <feFuncA type="linear" slope="3" intercept="-0.9" />
        </feComponentTransfer>
        <feFlood floodColor="currentColor" result="ink" />
        <feComposite in="ink" in2="specks" operator="in" />
      </filter>
      <rect width="100%" height="100%" filter={`url(#${id})`} />
    </svg>
  )
}
