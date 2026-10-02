import * as React from "react"

import { cn } from "@/lib/utils"

export interface LightRaysProps extends React.ComponentProps<"div"> {
  /** Number of rays. */
  rays?: number
  /** Widest angle between the outermost rays, in degrees. */
  spread?: number
  /** Duration of one sway, as a CSS time. */
  duration?: string
}

/** Width, opacity and timing of each ray, varied but the same on every render. */
function ray(index: number) {
  const seed = (n: number) => (Math.sin(index * 12.9898 + n * 78.233) * 43758.5453) % 1
  const random = (n: number) => Math.abs(seed(n))
  return {
    width: 2 + random(1) * 6,
    opacity: 0.15 + random(2) * 0.3,
    delay: random(3),
    sway: 2 + random(4) * 4,
  }
}

/**
 * Soft rays of light that fan down from the top of their positioned parent
 * and sway slowly, like a spotlight on a stage. The rays take the text color
 * and stand still under reduced motion.
 */
export function LightRays({
  rays = 9,
  spread = 80,
  duration = "14s",
  className,
  style,
  ...props
}: LightRaysProps) {
  return (
    <div
      data-slot="light-rays"
      aria-hidden
      style={{ "--rays-duration": duration, ...style } as React.CSSProperties}
      className={cn("pointer-events-none absolute inset-0 overflow-hidden text-foreground/40 [mask-image:linear-gradient(to_bottom,black_30%,transparent)] dark:text-foreground", className)}
      {...props}
    >
      {/* The source of the light. */}
      <div className="absolute -top-1/4 left-1/2 h-1/3 w-1/2 -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,currentColor,transparent)] opacity-25 blur-2xl" />
      {Array.from({ length: rays }, (_, index) => {
        const { width, opacity, delay, sway } = ray(index)
        const angle = rays > 1 ? -spread / 2 + (spread * index) / (rays - 1) : 0
        return (
          <div
            key={index}
            className="absolute -top-[10%] left-1/2 h-[140%] origin-top -translate-x-1/2 animate-light-ray bg-[linear-gradient(to_bottom,currentColor,transparent_80%)] blur-[6px] motion-reduce:animate-none"
            style={
              {
                width: `${width}%`,
                opacity,
                rotate: `${angle}deg`,
                "--ray-angle": `${angle}deg`,
                "--ray-sway": `${sway}deg`,
                "--ray-opacity": opacity,
                animationDelay: `calc(var(--rays-duration) * ${delay.toFixed(3)} * -1)`,
              } as React.CSSProperties
            }
          />
        )
      })}
    </div>
  )
}
