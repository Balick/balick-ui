"use client"

import * as React from "react"
import { motion, useReducedMotion, type Variants } from "motion/react"

import { cn } from "@/lib/utils"

type Direction = "up" | "down" | "left" | "right"

export interface BlurFadeProps
  extends Omit<React.ComponentProps<typeof motion.div>, "children"> {
  children?: React.ReactNode
  /** Animation duration in seconds. */
  duration?: number
  /** Delay before the animation starts, in seconds. */
  delay?: number
  /** Distance travelled by the element, in pixels. */
  offset?: number
  /** Direction the element comes from. */
  direction?: Direction
  /** Amount of blur at the start of the animation. */
  blur?: string
  /** Wait until the element scrolls into view before animating. */
  inView?: boolean
  /** Margin applied to the viewport when `inView` is set. */
  inViewMargin?: string
}

const axis: Record<Direction, ["x" | "y", 1 | -1]> = {
  up: ["y", 1],
  down: ["y", -1],
  left: ["x", 1],
  right: ["x", -1],
}

export function BlurFade({
  children,
  className,
  duration = 0.4,
  delay = 0,
  offset = 8,
  direction = "down",
  blur = "6px",
  inView = false,
  inViewMargin = "-50px",
  ...props
}: BlurFadeProps) {
  const reduceMotion = useReducedMotion()
  const [key, sign] = axis[direction]

  const variants: Variants = {
    hidden: {
      opacity: 0,
      filter: `blur(${blur})`,
      [key]: reduceMotion ? 0 : offset * sign,
    },
    visible: { opacity: 1, filter: "blur(0px)", [key]: 0 },
  }

  return (
    <motion.div
      data-slot="blur-fade"
      initial="hidden"
      {...(inView
        ? { whileInView: "visible", viewport: { once: true, margin: inViewMargin } }
        : { animate: "visible" })}
      variants={variants}
      transition={{ delay: 0.04 + delay, duration, ease: "easeOut" }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}
