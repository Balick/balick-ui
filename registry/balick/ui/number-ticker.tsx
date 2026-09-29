"use client"

import * as React from "react"
import { animate, useInView, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

export interface NumberTickerProps extends Omit<React.ComponentProps<"span">, "children"> {
  /** The number to count up to. */
  value: number
  /** Number the count starts from. */
  from?: number
  /** Digits after the decimal point. */
  decimals?: number
  /** Text before the number, such as "$" or "<". */
  prefix?: string
  /** Text after the number, such as "%" or "M+". */
  suffix?: string
  /** Duration of the count, in seconds. */
  duration?: number
  /** Delay before the count starts once in view, in seconds. */
  delay?: number
}

/**
 * Counts up to a number once, when it scrolls into view. The final value is
 * rendered on the server, so the number is right without JavaScript and
 * under reduced motion.
 */
export function NumberTicker({
  value,
  from = 0,
  decimals = 0,
  prefix,
  suffix,
  duration = 1.2,
  delay = 0,
  className,
  ...props
}: NumberTickerProps) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" })
  const reduceMotion = useReducedMotion()
  const formatter = React.useMemo(
    () =>
      new Intl.NumberFormat("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }),
    [decimals]
  )

  // Before the count starts, show the starting number instead of the final one.
  React.useEffect(() => {
    if (!reduceMotion && !inView && ref.current) {
      ref.current.textContent = formatter.format(from)
    }
  }, [reduceMotion, inView, from, formatter])

  React.useEffect(() => {
    if (!inView || reduceMotion) return
    const controls = animate(from, value, {
      duration,
      delay,
      ease: "easeOut",
      onUpdate: (latest) => {
        if (ref.current) ref.current.textContent = formatter.format(latest)
      },
    })
    return () => controls.stop()
  }, [inView, reduceMotion, from, value, duration, delay, formatter])

  return (
    <span className={cn("tabular-nums", className)} {...props}>
      {prefix}
      <span ref={ref}>{formatter.format(value)}</span>
      {suffix}
    </span>
  )
}
