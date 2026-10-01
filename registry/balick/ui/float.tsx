import * as React from "react"

import { cn } from "@/lib/utils"

export interface FloatProps extends React.ComponentProps<"div"> {
  /** How far it travels up and back, as a CSS length. */
  distance?: string
  /** Duration of one cycle, as a CSS time. */
  duration?: string
  /** Delay before it starts, as a CSS time. A negative value starts mid-cycle. */
  delay?: string
}

/**
 * A slow, endless bobbing for a badge, an illustration or a card. It moves
 * with the `translate` property, so it does not fight a transform set on the
 * content. It stops under reduced motion.
 */
export function Float({
  className,
  distance = "10px",
  duration = "6s",
  delay = "0s",
  style,
  ...props
}: FloatProps) {
  return (
    <div
      data-slot="float"
      style={
        {
          "--float-distance": distance,
          "--float-duration": duration,
          animationDelay: delay,
          ...style,
        } as React.CSSProperties
      }
      className={cn("animate-float motion-reduce:animate-none", className)}
      {...props}
    />
  )
}
