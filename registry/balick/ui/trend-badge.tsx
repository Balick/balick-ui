import * as React from "react"
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react"

import { cn } from "@/lib/utils"

export interface TrendBadgeProps extends Omit<React.ComponentProps<"span">, "children"> {
  /** The change in percent, such as 12.4 or -3. */
  value: number
  /** Treat a drop as good news, for costs, latency or churn. */
  inverse?: boolean
  /** Digits after the decimal point. */
  precision?: number
}

/**
 * How much a figure moved: an arrow and a percentage, green when the change
 * is good and red when it is bad. Screen readers hear "up" or "down".
 */
export function TrendBadge({ value, inverse = false, precision = 1, className, ...props }: TrendBadgeProps) {
  const direction = value > 0 ? "up" : value < 0 ? "down" : "flat"
  const good = direction === "flat" ? undefined : (direction === "up") !== inverse
  const Icon = direction === "up" ? ArrowUpRight : direction === "down" ? ArrowDownRight : Minus
  const text = new Intl.NumberFormat("en", {
    signDisplay: "exceptZero",
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  }).format(value)

  return (
    <span
      data-slot="trend-badge"
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full border px-1.5 py-0.5 text-xs font-medium tabular-nums",
        good === undefined && "border-border bg-foreground/5 text-muted-foreground",
        good === true && "border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
        good === false && "border-red-500/25 bg-red-500/10 text-red-700 dark:text-red-400",
        className
      )}
      {...props}
    >
      <Icon aria-hidden className="size-3.5" />
      <span className="sr-only">{direction === "flat" ? "unchanged" : direction} </span>
      {text}%
    </span>
  )
}
