"use client"

import * as React from "react"
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react"

import { cn } from "@/lib/utils"

export interface ScrollProgressProps extends React.ComponentProps<typeof motion.div> {
  /** The element that scrolls. It is the page by default. */
  scrollRef?: React.RefObject<HTMLElement | null>
}

/**
 * A bar that fills as you scroll: fixed to the top of the screen by default.
 * Pass a `className` to place or color it differently. It follows the scroll
 * exactly, without smoothing, under reduced motion.
 */
export function ScrollProgress({ className, scrollRef, style, ...props }: ScrollProgressProps) {
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ container: scrollRef })
  const smooth = useSpring(scrollYProgress, { stiffness: 220, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      aria-hidden
      data-slot="scroll-progress"
      style={{ scaleX: reduceMotion ? scrollYProgress : smooth, ...style }}
      className={cn("fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-foreground", className)}
      {...props}
    />
  )
}
