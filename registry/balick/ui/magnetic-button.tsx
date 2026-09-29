"use client"

import * as React from "react"
import { motion, useReducedMotion, useSpring } from "motion/react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface MagneticButtonProps extends React.ComponentProps<typeof Button> {
  /** Share of the pointer's distance the button follows, from 0 to 1. */
  strength?: number
  /** Largest shift, in pixels. */
  max?: number
}

const spring = { stiffness: 300, damping: 20, mass: 0.5 }

/**
 * A button that leans a few pixels towards the pointer and settles back when
 * it leaves. Only with a mouse or trackpad, and never under reduced motion.
 */
export function MagneticButton({
  strength = 0.3,
  max = 8,
  className,
  ...props
}: MagneticButtonProps) {
  const reduceMotion = useReducedMotion()
  const x = useSpring(0, spring)
  const y = useSpring(0, spring)

  function onPointerMove(event: React.PointerEvent<HTMLSpanElement>) {
    if (reduceMotion || event.pointerType !== "mouse") return
    const rect = event.currentTarget.getBoundingClientRect()
    const clamp = (value: number) => Math.max(-max, Math.min(max, value * strength))
    x.set(clamp(event.clientX - (rect.left + rect.width / 2)))
    y.set(clamp(event.clientY - (rect.top + rect.height / 2)))
  }

  function reset() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.span
      className="inline-flex"
      style={{ x, y }}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
    >
      <Button className={cn(className)} {...props} />
    </motion.span>
  )
}
