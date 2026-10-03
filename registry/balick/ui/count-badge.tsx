"use client"

import * as React from "react"
import { motion, MotionConfig } from "motion/react"

import { cn } from "@/lib/utils"

export interface CountBadgeProps extends React.ComponentProps<"span"> {
  /** The number to show. Nothing shows at 0, unless `showZero` is set. */
  count: number
  /** Past it, the badge reads "99+". */
  max?: number
  /** Show a plain dot instead of the number. */
  dot?: boolean
  /** Show the badge when the count is 0. */
  showZero?: boolean
  /** Red for alerts, green for presence, or the foreground color. */
  tone?: keyof typeof tones
  /** What is counted, read after the number by screen readers. */
  label?: string
}

const tones = {
  danger: "bg-red-500 text-white",
  success: "bg-emerald-500 text-white",
  neutral: "bg-foreground text-background",
}

/**
 * A count pinned to the corner of an icon or an avatar, for unread messages
 * or alerts. It pops when the number changes; reduced motion turns the pop
 * off.
 */
export function CountBadge({
  count,
  max = 99,
  dot = false,
  showZero = false,
  tone = "danger",
  label,
  className,
  children,
  ...props
}: CountBadgeProps) {
  const visible = count > 0 || showZero
  const text = count > max ? `${max}+` : String(count)

  return (
    <span data-slot="count-badge" className={cn("relative inline-flex", className)} {...props}>
      {children}
      {visible && (
        <MotionConfig reducedMotion="user">
          <motion.span
            key={dot ? "dot" : text}
            initial={{ scale: 0.4 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 520, damping: 16 }}
            className={cn(
              "pointer-events-none absolute flex items-center justify-center rounded-full font-semibold tabular-nums ring-2 ring-background",
              dot ? "top-0 right-0 size-2.5" : "-top-1.5 -right-1.5 h-[1.125rem] min-w-[1.125rem] px-1 text-[10px] leading-none",
              tones[tone]
            )}
          >
            {!dot && <span aria-hidden>{text}</span>}
            {label && <span className="sr-only">{dot ? label : `${count} ${label}`}</span>}
          </motion.span>
        </MotionConfig>
      )}
    </span>
  )
}
