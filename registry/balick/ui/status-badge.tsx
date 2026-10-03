import * as React from "react"

import { cn } from "@/lib/utils"
import { StatusDot } from "@/registry/balick/ui/status-dot"

const statuses = {
  operational: {
    label: "Operational",
    dot: "success",
    pulse: true,
    className: "border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  },
  degraded: {
    label: "Degraded",
    dot: "warning",
    pulse: true,
    className: "border-amber-500/25 bg-amber-500/10 text-amber-700 dark:text-amber-400",
  },
  outage: {
    label: "Outage",
    dot: "danger",
    pulse: true,
    className: "border-red-500/25 bg-red-500/10 text-red-700 dark:text-red-400",
  },
  maintenance: {
    label: "Maintenance",
    dot: "neutral",
    pulse: false,
    className: "border-border bg-foreground/5 text-foreground",
  },
} as const

export interface StatusBadgeProps extends React.ComponentProps<"span"> {
  /** The state of the service. */
  status: keyof typeof statuses
}

/**
 * A pill that names the state of a service, with a live dot. The children
 * replace the default label.
 */
export function StatusBadge({ status, className, children, ...props }: StatusBadgeProps) {
  const config = statuses[status]

  return (
    <span
      data-slot="status-badge"
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs font-medium whitespace-nowrap",
        config.className,
        className
      )}
      {...props}
    >
      <StatusDot tone={config.dot} pulse={config.pulse} className="size-1.5" />
      {children ?? config.label}
    </span>
  )
}
