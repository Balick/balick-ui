import * as React from "react"

import { cn } from "@/lib/utils"

export interface MarqueeProps extends React.ComponentProps<"div"> {
  /** Reverse the scroll direction. */
  reverse?: boolean
  /** Pause the animation while the pointer is over the marquee. */
  pauseOnHover?: boolean
  /** Scroll vertically instead of horizontally. */
  vertical?: boolean
  /** Fade the edges into the background. */
  fade?: boolean
  /** How many times the content is repeated to fill the track. */
  repeat?: number
  /** Duration of one full loop, as a CSS time. */
  duration?: string
  /** Space between items, as a CSS length. */
  gap?: string
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  vertical = false,
  fade = false,
  repeat = 4,
  duration = "40s",
  gap = "1rem",
  style,
  children,
  ...props
}: MarqueeProps) {
  return (
    <div
      data-slot="marquee"
      style={
        { "--duration": duration, "--gap": gap, ...style } as React.CSSProperties
      }
      className={cn(
        "group flex gap-(--gap) overflow-hidden p-2",
        vertical ? "flex-col" : "flex-row",
        fade &&
          (vertical
            ? "[mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]"
            : "[mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"),
        className
      )}
      {...props}
    >
      {Array.from({ length: repeat }, (_, i) => (
        <div
          key={i}
          aria-hidden={i > 0 || undefined}
          className={cn(
            "flex shrink-0 justify-around gap-(--gap) motion-reduce:animate-none",
            vertical
              ? "animate-marquee-vertical flex-col"
              : "animate-marquee flex-row",
            reverse && "[animation-direction:reverse]",
            pauseOnHover && "group-hover:[animation-play-state:paused]"
          )}
        >
          {children}
        </div>
      ))}
    </div>
  )
}
