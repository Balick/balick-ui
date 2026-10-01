"use client"

import * as React from "react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

type Direction = "left" | "right" | "up" | "down"

export interface MaskRevealProps
  extends Omit<React.ComponentProps<typeof motion.div>, "children"> {
  children?: React.ReactNode
  /** Side the reveal starts from. */
  direction?: Direction
  /** Duration of the reveal, in seconds. */
  duration?: number
  /** Delay before the reveal, in seconds. */
  delay?: number
  /** Let the content settle from a slight zoom while it is revealed. */
  zoom?: boolean
  /** Wait until the element scrolls into view before revealing. */
  inView?: boolean
  /** Margin applied to the viewport when `inView` is set. */
  inViewMargin?: string
}

/** What is still hidden at the start, as a clip-path inset. */
const hidden: Record<Direction, string> = {
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
  up: "inset(0% 0% 100% 0%)",
  down: "inset(100% 0% 0% 0%)",
}

/**
 * Uncovers its content with a mask that slides across it, which suits
 * images and cards. Under reduced motion the mask is never drawn: the
 * content is there from the start.
 */
export function MaskReveal({
  children,
  className,
  direction = "left",
  duration = 0.9,
  delay = 0,
  zoom = false,
  inView = false,
  inViewMargin = "-50px",
  ...props
}: MaskRevealProps) {
  const ease = [0.76, 0, 0.24, 1] as const

  return (
    <motion.div
      data-slot="mask-reveal"
      initial={{ clipPath: hidden[direction] }}
      {...(inView
        ? { whileInView: { clipPath: "inset(0% 0% 0% 0%)" }, viewport: { once: true, margin: inViewMargin } }
        : { animate: { clipPath: "inset(0% 0% 0% 0%)" } })}
      transition={{ duration, delay, ease }}
      // The mask is inline style, so reduced motion switches it off with
      // !important: this holds before hydration too.
      className={cn("overflow-hidden motion-reduce:[clip-path:none]!", className)}
      {...props}
    >
      <motion.div
        initial={{ scale: zoom ? 1.15 : 1 }}
        {...(inView
          ? { whileInView: { scale: 1 }, viewport: { once: true, margin: inViewMargin } }
          : { animate: { scale: 1 } })}
        transition={{ duration: duration * 1.2, delay, ease }}
        className="size-full motion-reduce:[transform:none]!"
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
