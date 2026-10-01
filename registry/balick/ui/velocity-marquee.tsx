"use client"

import * as React from "react"
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react"

import { cn } from "@/lib/utils"

export interface VelocityMarqueeProps extends Omit<React.ComponentProps<"div">, "children"> {
  children?: React.ReactNode
  /** Seconds the content takes to pass once, at rest. */
  duration?: number
  /** How much scrolling speeds the marquee up. 0 turns it off. */
  velocityFactor?: number
  /** Move to the right instead of the left. */
  reverse?: boolean
  /** Copies of the content in the track. Raise it when the content is short. */
  repeat?: number
  /** Space between items, as a CSS length. */
  gap?: string
  /** The element that scrolls. It is the page by default. */
  scrollRef?: React.RefObject<HTMLElement | null>
}

/** Brings `value` into the range from `min` to `max`, going round. */
function wrap(min: number, max: number, value: number) {
  const range = max - min
  return ((((value - min) % range) + range) % range) + min
}

/**
 * A marquee that moves at its own pace and speeds up with the scroll, in
 * either direction. It stands still under reduced motion.
 */
export function VelocityMarquee({
  children,
  className,
  duration = 20,
  velocityFactor = 1,
  reverse = false,
  repeat = 4,
  gap = "2rem",
  scrollRef,
  style,
  ...props
}: VelocityMarqueeProps) {
  const reduceMotion = useReducedMotion()
  // Progress of the track in percent: one copy is 100 / repeat of it.
  const progress = useMotionValue(0)
  const { scrollY } = useScroll({ container: scrollRef })
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
  const x = useTransform(progress, (value) => `${value}%`)

  useAnimationFrame((_, delta) => {
    if (reduceMotion) return
    const boost = 1 + Math.min(Math.abs(velocity.get()) / 400, 6) * velocityFactor
    const step = (100 / repeat / duration) * boost * (delta / 1000)
    progress.set(wrap(-100 / repeat, 0, progress.get() + (reverse ? step : -step)))
  })

  return (
    <div
      data-slot="velocity-marquee"
      style={{ "--gap": gap, ...style } as React.CSSProperties}
      className={cn("flex overflow-hidden", className)}
      {...props}
    >
      <motion.div style={{ x }} className="flex w-max shrink-0">
        {Array.from({ length: repeat }, (_, index) => (
          <div
            key={index}
            aria-hidden={index > 0 || undefined}
            className="flex shrink-0 items-center gap-(--gap) pr-(--gap)"
          >
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
