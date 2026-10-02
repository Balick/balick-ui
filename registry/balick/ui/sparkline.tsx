"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export interface SparklineProps extends Omit<React.ComponentProps<"div">, "children"> {
  /** The values, oldest first. Two at least. */
  data: number[]
  /** Green when the last value is above the first and red when below, or the foreground color. */
  tone?: "trend" | "neutral"
  /** Fill the area under the line with a soft gradient. */
  area?: boolean
  /** Mark the last value with a dot. */
  dot?: boolean
}

const top = 3
const bottom = 29

/**
 * A small trend line that draws itself when it appears, with a soft area
 * under it and a dot on the last value. It stretches to its box: size it
 * with `h-*` and `w-*` utilities. Name it with `aria-label`.
 */
export function Sparkline({
  data,
  tone = "trend",
  area = true,
  dot = true,
  className,
  ...props
}: SparklineProps) {
  const gradientId = React.useId()
  const min = Math.min(...data)
  const max = Math.max(...data)
  const span = max - min || 1
  const points = data.map((value, index) => ({
    x: data.length > 1 ? (index / (data.length - 1)) * 100 : 50,
    y: bottom - ((value - min) / span) * (bottom - top),
  }))
  const line = points.map((point, index) => `${index ? "L" : "M"}${point.x.toFixed(2)} ${point.y.toFixed(2)}`).join(" ")
  const last = points[points.length - 1]
  const color =
    tone === "neutral" || data[data.length - 1] === data[0]
      ? "text-foreground"
      : data[data.length - 1] > data[0]
        ? "text-emerald-500"
        : "text-red-500"

  return (
    <div data-slot="sparkline" role="img" className={cn("relative h-8 w-24", color, className)} {...props}>
      <svg
        viewBox="0 0 100 32"
        preserveAspectRatio="none"
        className="size-full animate-sparkline-draw overflow-visible motion-reduce:animate-none"
        aria-hidden
      >
        {area && (
          <>
            <defs>
              <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.22" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d={`${line} L100 32 L0 32 Z`}
              fill={`url(#${gradientId})`}
            />
          </>
        )}
        <path
          d={line}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {dot && last && (
        <span
          aria-hidden
          style={{ left: `${last.x}%`, top: `${(last.y / 32) * 100}%` }}
          className="absolute size-1.5 -translate-1/2 animate-sparkline-fade rounded-full bg-current ring-2 ring-background [animation-delay:0.8s] motion-reduce:animate-none"
        />
      )}
    </div>
  )
}
