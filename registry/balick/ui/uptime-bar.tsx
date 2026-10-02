import * as React from "react"

import { cn } from "@/lib/utils"

export type UptimeStatus = "up" | "degraded" | "down" | "none"

export interface UptimeDay {
  status: UptimeStatus
  /** Shown when the pointer rests on the bar, such as "Sep 3: no downtime". */
  label?: string
}

export interface UptimeBarProps extends Omit<React.ComponentProps<"div">, "children"> {
  /** One entry per day, oldest first. */
  days: UptimeDay[]
  /** The uptime to show in the legend, such as "99.98%". */
  uptime?: string
  /** Label of the oldest day, under the first bar. */
  startLabel?: string
  /** Label of the newest day, under the last bar. */
  endLabel?: string
}

const colors: Record<UptimeStatus, string> = {
  up: "bg-emerald-500",
  degraded: "bg-amber-500",
  down: "bg-red-500",
  none: "bg-foreground/10",
}

const words: Record<UptimeStatus, string> = {
  up: "No downtime",
  degraded: "Degraded performance",
  down: "Outage",
  none: "No data",
}

/**
 * The history of a service, one thin bar per day: green when all went well,
 * amber when it was degraded, red for an outage. The bars rise in turn when
 * they appear. Screen readers get a sentence that sums the period up.
 */
export function UptimeBar({
  days,
  uptime,
  startLabel = `${days.length} days ago`,
  endLabel = "Today",
  className,
  ...props
}: UptimeBarProps) {
  const count = (status: UptimeStatus) => days.filter((day) => day.status === status).length
  const summary = [
    `${days.length} days`,
    uptime && `${uptime} uptime`,
    `${count("degraded")} degraded`,
    `${count("down")} down`,
  ]
    .filter(Boolean)
    .join(", ")

  return (
    <div data-slot="uptime-bar" className={cn("flex w-full flex-col gap-2", className)} {...props}>
      <div role="img" aria-label={summary} className="flex h-8 items-stretch gap-px">
        {days.map((day, index) => (
          <span
            key={index}
            title={day.label ?? words[day.status]}
            style={{ animationDelay: `${index * 6}ms` }}
            className={cn(
              "min-w-0 flex-1 origin-bottom animate-uptime-rise rounded-[2px] transition-opacity hover:opacity-60 motion-reduce:animate-none",
              colors[day.status]
            )}
          />
        ))}
      </div>
      <div aria-hidden className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
        <span>{startLabel}</span>
        {uptime && <span className="h-px flex-1 bg-border" />}
        {uptime && <span className="font-medium text-foreground tabular-nums">{uptime} uptime</span>}
        {uptime && <span className="h-px flex-1 bg-border" />}
        <span>{endLabel}</span>
      </div>
    </div>
  )
}
