"use client"

import * as React from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

export interface CrossfadeProps extends Omit<React.ComponentProps<"div">, "children"> {
  children?: React.ReactNode
  /** Identifies what is shown. When it changes, the content is swapped. */
  value: React.Key
  /** Distance the content slides while it fades, in pixels. */
  offset?: number
  /** Duration of the swap, in seconds. */
  duration?: number
  /** Blur at the ends of the fade, as a CSS length. */
  blur?: string
}

/**
 * Swaps its content when `value` changes: the old content fades out as the
 * new one fades in from a light blur. Under reduced motion only the fade stays.
 */
export function Crossfade({
  children,
  value,
  className,
  offset = 8,
  duration = 0.3,
  blur = "4px",
  ...props
}: CrossfadeProps) {
  const reduceMotion = useReducedMotion()
  const distance = reduceMotion ? 0 : offset

  return (
    <div data-slot="crossfade" className={cn("relative", className)} {...props}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={value}
          initial={{ opacity: 0, y: distance, filter: `blur(${blur})` }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -distance, filter: `blur(${blur})` }}
          transition={{ duration, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
