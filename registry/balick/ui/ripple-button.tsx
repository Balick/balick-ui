"use client"

import * as React from "react"
import { motion, useReducedMotion } from "motion/react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Ripple {
  id: number
  x: number
  y: number
  size: number
}

/** A button that sends a soft ripple out from where it is pressed. */
export function RippleButton({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Button>) {
  const reduceMotion = useReducedMotion()
  const [ripples, setRipples] = React.useState<Ripple[]>([])
  const nextId = React.useRef(0)

  function addRipple(event: React.PointerEvent<HTMLButtonElement>) {
    if (reduceMotion) return
    const rect = event.currentTarget.getBoundingClientRect()
    const size = Math.hypot(rect.width, rect.height) * 2
    const id = nextId.current++
    setRipples((current) => [
      ...current,
      { id, x: event.clientX - rect.left, y: event.clientY - rect.top, size },
    ])
  }

  return (
    <Button
      className={cn("relative cursor-pointer overflow-hidden", className)}
      // Capture phase: leaves the consumer's own onPointerDown untouched.
      onPointerDownCapture={addRipple}
      {...props}
    >
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          aria-hidden
          className="pointer-events-none absolute rounded-full bg-current"
          style={{
            left: ripple.x - ripple.size / 2,
            top: ripple.y - ripple.size / 2,
            width: ripple.size,
            height: ripple.size,
          }}
          initial={{ scale: 0, opacity: 0.25 }}
          animate={{ scale: 1, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          onAnimationComplete={() =>
            setRipples((current) => current.filter((item) => item.id !== ripple.id))
          }
        />
      ))}
      <span className="relative inline-flex items-center gap-2">{children}</span>
    </Button>
  )
}
