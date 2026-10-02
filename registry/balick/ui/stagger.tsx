"use client"

import * as React from "react"
import { motion, useReducedMotion, type Variants } from "motion/react"

import { cn } from "@/lib/utils"

type Direction = "up" | "down" | "left" | "right"

export interface StaggerProps
  extends Omit<React.ComponentProps<typeof motion.div>, "children"> {
  children?: React.ReactNode
  /** Delay between two children, in seconds. */
  interval?: number
  /** Delay before the first child, in seconds. */
  delay?: number
  /** Duration of each child's entrance, in seconds. */
  duration?: number
  /** Distance travelled by each child, in pixels. */
  offset?: number
  /** Direction the children come from. */
  direction?: Direction
  /** Wait until the group scrolls into view before animating. */
  inView?: boolean
  /** Margin applied to the viewport when `inView` is set. */
  inViewMargin?: string
  /** Class name of the wrapper around each child. */
  itemClassName?: string
}

const axis: Record<Direction, ["x" | "y", 1 | -1]> = {
  up: ["y", 1],
  down: ["y", -1],
  left: ["x", 1],
  right: ["x", -1],
}

/**
 * Brings the children in one after the other, each fading up from a light
 * blur. Every direct child is wrapped in a div; style the group (flex, grid,
 * gap) through `className`. Under reduced motion only the fade stays.
 */
export function Stagger({
  children,
  className,
  itemClassName,
  interval = 0.08,
  delay = 0,
  duration = 0.45,
  offset = 12,
  direction = "up",
  inView = false,
  inViewMargin = "-50px",
  ...props
}: StaggerProps) {
  const reduceMotion = useReducedMotion()
  const [key, sign] = axis[direction]

  const group: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: interval, delayChildren: delay } },
  }
  const item: Variants = {
    hidden: { opacity: 0, filter: "blur(4px)", [key]: reduceMotion ? 0 : offset * sign },
    visible: { opacity: 1, filter: "blur(0px)", [key]: 0 },
  }

  return (
    <motion.div
      data-slot="stagger"
      initial="hidden"
      {...(inView
        ? { whileInView: "visible", viewport: { once: true, margin: inViewMargin } }
        : { animate: "visible" })}
      variants={group}
      className={className}
      {...props}
    >
      {React.Children.toArray(children).map((child, index) => (
        <motion.div
          key={index}
          variants={item}
          transition={{ duration, ease: "easeOut" }}
          className={cn(itemClassName)}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}
