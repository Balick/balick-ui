"use client"

import * as React from "react"
import { AnimatePresence, motion, useReducedMotion, type Variants } from "motion/react"

import { cn } from "@/lib/utils"

export interface AnimatedNumberProps extends Omit<React.ComponentProps<"span">, "children"> {
  value: number
  /** Turns the value into the displayed text. Defaults to en-US grouping. */
  format?: (value: number) => string
}

const variants: Variants = {
  enter: (direction: number) => ({ y: 16 * direction, opacity: 0, filter: "blur(4px)" }),
  center: { y: 0, opacity: 1, filter: "blur(0px)" },
  exit: (direction: number) => ({ y: -16 * direction, opacity: 0, filter: "blur(4px)" }),
}

const defaultFormat = (value: number) => value.toLocaleString("en-US")

/**
 * A number that rolls to its new value when it changes: up when it grows,
 * down when it shrinks. The first render is static.
 */
export function AnimatedNumber({
  value,
  format = defaultFormat,
  className,
  ...props
}: AnimatedNumberProps) {
  const reduceMotion = useReducedMotion()
  const [previous, setPrevious] = React.useState(value)
  const [direction, setDirection] = React.useState(1)

  // Derive the direction while rendering, so the new number enters from the right side.
  if (value !== previous) {
    setDirection(value > previous ? 1 : -1)
    setPrevious(value)
  }

  return (
    <span className={cn("relative inline-flex overflow-hidden tabular-nums", className)} {...props}>
      <AnimatePresence mode="popLayout" initial={false} custom={direction}>
        <motion.span
          key={value}
          custom={direction}
          variants={variants}
          initial={reduceMotion ? false : "enter"}
          animate="center"
          exit={reduceMotion ? undefined : "exit"}
          transition={{ duration: reduceMotion ? 0 : 0.25, ease: "easeOut" }}
        >
          {format(value)}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
