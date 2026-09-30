"use client"

import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

export interface ShimmerTextProps extends React.ComponentProps<"span"> {
  /** Duration of one sweep, in seconds. */
  duration?: number
}

/**
 * A light sweeps across the text, for work in progress such as
 * "Generating…". The sweep loops, and stops under reduced motion.
 */
export function ShimmerText({ duration = 2, className, children, ...props }: ShimmerTextProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.span
      className={cn(
        "inline-block bg-[linear-gradient(110deg,var(--muted-foreground)_35%,var(--foreground)_50%,var(--muted-foreground)_65%)] bg-[length:250%_100%] bg-clip-text text-transparent",
        className
      )}
      initial={{ backgroundPosition: "100% 0%" }}
      animate={reduceMotion ? undefined : { backgroundPosition: "0% 0%" }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
      {...(props as React.ComponentProps<typeof motion.span>)}
    >
      {children}
    </motion.span>
  )
}
