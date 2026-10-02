import * as React from "react"

import { cn } from "@/lib/utils"

export interface OrbitProps extends Omit<React.ComponentProps<"div">, "children"> {
  /** The items that circle around the center, spread evenly on the ring. */
  children?: React.ReactNode
  /** What sits in the middle. It can be another Orbit. */
  center?: React.ReactNode
  /** Diameter of the ring, as a CSS length. */
  size?: string
  /** Duration of one turn, as a CSS time. */
  duration?: string
  /** Turn counter-clockwise. */
  reverse?: boolean
  /** Draw the ring. */
  ring?: boolean
}

/**
 * Items that circle around a center while staying upright, to show what
 * connects to a product. Nest an Orbit in `center` for a second ring. The
 * items stand still on their ring under reduced motion.
 */
export function Orbit({
  children,
  center,
  className,
  size = "16rem",
  duration = "30s",
  reverse = false,
  ring = true,
  style,
  ...props
}: OrbitProps) {
  const items = React.Children.toArray(children)

  return (
    <div
      data-slot="orbit"
      style={{ "--orbit-size": size, "--orbit-duration": duration, ...style } as React.CSSProperties}
      className={cn("relative grid size-(--orbit-size) shrink-0 place-items-center", className)}
      {...props}
    >
      {ring && <div aria-hidden className="absolute inset-0 rounded-full border border-dashed" />}
      {center && <div className="relative">{center}</div>}
      <div
        className={cn(
          "absolute inset-0 animate-orbit-spin motion-reduce:animate-none",
          reverse && "[animation-direction:reverse]"
        )}
      >
        {items.map((item, index) => {
          // Start at the top, then go round clockwise.
          const angle = (2 * Math.PI * index) / items.length - Math.PI / 2
          return (
            <div
              key={index}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `calc(50% + var(--orbit-size) / 2 * ${Math.cos(angle).toFixed(4)})`,
                top: `calc(50% + var(--orbit-size) / 2 * ${Math.sin(angle).toFixed(4)})`,
              }}
            >
              {/* Turns the other way at the same speed, so the item stays upright. */}
              <div
                className={cn(
                  "animate-orbit-spin motion-reduce:animate-none",
                  reverse ? "[animation-direction:normal]" : "[animation-direction:reverse]"
                )}
              >
                {item}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
