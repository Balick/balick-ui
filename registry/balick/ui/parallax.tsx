"use client"

import * as React from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"

export interface ParallaxProps extends React.ComponentProps<typeof motion.div> {
  /**
   * How far the layer drifts, in pixels, while it crosses the screen: it
   * starts this far down and ends this far up. A negative value reverses it.
   */
  distance?: number
  /** The element that scrolls, which must be positioned (`relative`). It is the page by default. */
  scrollRef?: React.RefObject<HTMLElement | null>
}

/**
 * A layer that moves at its own pace while the page scrolls, so that it seems
 * to sit nearer or farther than the rest. Give layers different distances to
 * build depth. It stays still under reduced motion.
 */
export function Parallax({ distance = 60, scrollRef, style, ...props }: ParallaxProps) {
  const reduceMotion = useReducedMotion()
  const ref = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    container: scrollRef,
    offset: ["start end", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance])

  return (
    <motion.div
      ref={ref}
      data-slot="parallax"
      style={{ y: reduceMotion ? 0 : y, ...style }}
      {...props}
    />
  )
}
