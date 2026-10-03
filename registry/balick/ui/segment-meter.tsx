import * as React from "react"

import { cn } from "@/lib/utils"

export interface SegmentMeterProps extends Omit<React.ComponentProps<"div">, "children"> {
  /** How many segments are filled, from 0 to `segments`. */
  value: number
  /** Number of segments. */
  segments?: number
  /** A word for each level, from the first filled segment to the last. */
  labels?: string[]
  /** Color the segments by level (red, amber, then green), or in the foreground color. */
  tone?: "level" | "neutral"
}

function toneOf(value: number, segments: number, tone: SegmentMeterProps["tone"]) {
  if (tone === "neutral") return "bg-foreground"
  const ratio = value / segments
  if (ratio <= 0.34) return "bg-red-500"
  if (ratio <= 0.67) return "bg-amber-500"
  return "bg-emerald-500"
}

/**
 * A level in a few segments, such as the strength of a password. Segments
 * fill one after the other when the value grows. Name it with `aria-label`.
 */
export function SegmentMeter({
  value,
  segments = 4,
  labels,
  tone = "level",
  className,
  ...props
}: SegmentMeterProps) {
  const filled = Math.min(segments, Math.max(0, Math.round(value)))
  const label = filled > 0 ? labels?.[filled - 1] : undefined
  const color = toneOf(filled, segments, tone)

  return (
    <div
      data-slot="segment-meter"
      role="meter"
      aria-valuemin={0}
      aria-valuemax={segments}
      aria-valuenow={filled}
      aria-valuetext={label}
      className={cn("flex w-full flex-col gap-2", className)}
      {...props}
    >
      <div className="flex gap-1.5" aria-hidden>
        {Array.from({ length: segments }, (_, index) => (
          <span key={index} className="h-1.5 flex-1 overflow-hidden rounded-full bg-foreground/10">
            <span
              style={{ transitionDelay: `${(index < filled ? index : segments - index) * 60}ms` }}
              className={cn(
                "block h-full origin-left rounded-full transition-[scale,background-color] duration-300 ease-out motion-reduce:transition-none",
                color,
                index < filled ? "scale-x-100" : "scale-x-0"
              )}
            />
          </span>
        ))}
      </div>
      {labels && (
        <span aria-hidden className="text-xs text-muted-foreground">
          {label ?? " "}
        </span>
      )}
    </div>
  )
}
