"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { AnimatedNumber } from "@/registry/balick/ui/animated-number"

export interface CountdownProps extends Omit<React.ComponentProps<"div">, "children"> {
  /** The moment the countdown reaches zero. */
  to: Date | string | number
  /** Called once, when the countdown reaches zero. */
  onComplete?: () => void
  /** Labels under each unit. */
  labels?: { days: string; hours: string; minutes: string; seconds: string }
}

const second = 1000
const units = [
  { key: "days", size: 86_400 * second, modulo: Infinity },
  { key: "hours", size: 3_600 * second, modulo: 24 },
  { key: "minutes", size: 60 * second, modulo: 60 },
  { key: "seconds", size: second, modulo: 60 },
] as const

const pad = (value: number) => String(value).padStart(2, "0")

/**
 * Days, hours, minutes and seconds left until a date, each rolling to its
 * new value. The time is only known in the browser, so the server renders
 * placeholders. Size it with a text size on the root.
 */
export function Countdown({
  to,
  onComplete,
  labels = { days: "Days", hours: "Hours", minutes: "Minutes", seconds: "Seconds" },
  className,
  ...props
}: CountdownProps) {
  const target = new Date(to).getTime()
  const [now, setNow] = React.useState<number>()
  const completed = React.useRef(false)
  const remaining = now === undefined ? undefined : Math.max(0, target - now)

  React.useEffect(() => {
    setNow(Date.now())
    const timer = setInterval(() => setNow(Date.now()), second)
    return () => clearInterval(timer)
  }, [])

  React.useEffect(() => {
    if (remaining === 0 && !completed.current) {
      completed.current = true
      onComplete?.()
    }
  }, [remaining, onComplete])

  return (
    <div
      role="timer"
      className={cn("inline-flex items-start gap-4 text-4xl font-semibold tracking-tighter tabular-nums sm:gap-6", className)}
      {...props}
    >
      {units.map((unit) => {
        const value =
          remaining === undefined ? undefined : Math.floor(remaining / unit.size) % unit.modulo
        return (
          <div key={unit.key} className="flex flex-col items-center">
            {value === undefined ? (
              <span className="text-muted-foreground">--</span>
            ) : (
              <AnimatedNumber value={value} format={pad} />
            )}
            <span className="mt-1 font-mono text-[10px] font-normal tracking-wider text-muted-foreground uppercase">
              {labels[unit.key]}
            </span>
          </div>
        )
      })}
    </div>
  )
}
