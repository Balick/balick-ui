"use client"

import * as React from "react"
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react"

import { cn } from "@/lib/utils"

export interface TiltCardProps extends Omit<React.ComponentProps<typeof motion.div>, "children"> {
  children?: React.ReactNode
  /** Largest angle the card leans, in degrees. */
  maxTilt?: number
  /** Light a soft spot under the pointer. */
  glare?: boolean
  /** Scale of the card while the pointer is over it. */
  scale?: number
}

const spring = { stiffness: 220, damping: 22, mass: 0.6 }

/**
 * A card that leans toward the pointer in 3D, with a soft glare. It reacts to
 * a mouse only: touch and pen leave it flat, and so does reduced motion.
 */
export function TiltCard({
  children,
  className,
  maxTilt = 10,
  glare = true,
  scale = 1.02,
  style,
  onPointerMove,
  onPointerLeave,
  ...props
}: TiltCardProps) {
  const reduceMotion = useReducedMotion()
  // Where the pointer is on the card, from 0 to 1 on each axis.
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)
  const rotateY = useSpring(useTransform(x, [0, 1], [-maxTilt, maxTilt]), spring)
  const rotateX = useSpring(useTransform(y, [0, 1], [maxTilt, -maxTilt]), spring)
  const scaleValue = useSpring(1, spring)
  const glareX = useTransform(x, (value) => value * 100)
  const glareY = useTransform(y, (value) => value * 100)
  const glareImage = useMotionTemplate`radial-gradient(16rem circle at ${glareX}% ${glareY}%, color-mix(in oklab, var(--foreground) 9%, transparent), transparent 70%)`

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    onPointerMove?.(event)
    if (reduceMotion || event.pointerType !== "mouse") return
    const rect = event.currentTarget.getBoundingClientRect()
    x.set((event.clientX - rect.left) / rect.width)
    y.set((event.clientY - rect.top) / rect.height)
    scaleValue.set(scale)
  }

  function handlePointerLeave(event: React.PointerEvent<HTMLDivElement>) {
    onPointerLeave?.(event)
    x.set(0.5)
    y.set(0.5)
    scaleValue.set(1)
  }

  return (
    <motion.div
      data-slot="tilt-card"
      style={{ rotateX, rotateY, scale: scaleValue, transformPerspective: 900, ...style }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={cn("group relative", className)}
      {...props}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden
          style={{ backgroundImage: glareImage }}
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:hidden"
        />
      )}
    </motion.div>
  )
}
