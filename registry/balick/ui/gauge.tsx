import * as React from "react"

import { cn } from "@/lib/utils"

export interface GaugeProps extends Omit<React.ComponentProps<"div">, "children"> {
  /** The value, from 0 to 100. */
  value: number
  /** Show the value in the middle. */
  showValue?: boolean
  /**
   * Values from which the arc turns amber, then red. Pass `false` to keep
   * the foreground color, for values where high is good.
   */
  thresholds?: [warning: number, danger: number] | false
  /** Turn a short arc while the value is not known yet. */
  indeterminate?: boolean
}

const radius = 42
const circumference = 2 * Math.PI * radius
/** The arc covers three quarters of the circle, open at the bottom. */
const arc = circumference * 0.75

function toneOf(value: number, thresholds: GaugeProps["thresholds"]) {
  if (!thresholds) return "text-foreground"
  if (value >= thresholds[1]) return "text-red-500"
  if (value >= thresholds[0]) return "text-amber-500"
  return "text-foreground"
}

/**
 * A three-quarter ring for a percentage: a quota, a cache hit rate, a score.
 * The arc fills when it appears and turns amber, then red, past its
 * thresholds. Name it with `aria-label` or `aria-labelledby`. Size it with
 * `size-*` utilities.
 */
export function Gauge({
  value,
  showValue = true,
  thresholds = [70, 90],
  indeterminate = false,
  className,
  ...props
}: GaugeProps) {
  const clamped = Math.min(100, Math.max(0, value))
  const offset = arc * (1 - clamped / 100)

  return (
    <div
      data-slot="gauge"
      role={indeterminate ? "progressbar" : "meter"}
      aria-valuemin={indeterminate ? undefined : 0}
      aria-valuemax={indeterminate ? undefined : 100}
      aria-valuenow={indeterminate ? undefined : clamped}
      aria-valuetext={indeterminate ? undefined : `${Math.round(clamped)}%`}
      aria-busy={indeterminate || undefined}
      className={cn("relative size-24 shrink-0", className)}
      {...props}
    >
      <svg viewBox="0 0 100 100" className="size-full overflow-visible" aria-hidden>
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${arc} ${circumference}`}
          transform="rotate(135 50 50)"
          className="stroke-current text-foreground/10"
        />
        {indeterminate ? (
          <g className="origin-center animate-spin [animation-duration:1.4s] [transform-box:fill-box] motion-reduce:animate-none">
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${arc * 0.25} ${circumference}`}
              transform="rotate(135 50 50)"
              className="stroke-current text-foreground"
            />
          </g>
        ) : (
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${arc} ${circumference}`}
            transform="rotate(135 50 50)"
            style={
              {
                strokeDashoffset: clamped === 0 ? arc + 1 : offset,
                "--gauge-arc": `${arc}px`,
              } as React.CSSProperties
            }
            className={cn(
              "animate-gauge-fill stroke-current transition-[stroke-dashoffset,color] duration-700 ease-out motion-reduce:animate-none motion-reduce:transition-none",
              toneOf(clamped, thresholds)
            )}
          />
        )}
        {showValue && !indeterminate && (
          <text
            x="50"
            y="53"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-foreground font-semibold tabular-nums"
            fontSize="22"
          >
            {Math.round(clamped)}
            <tspan fontSize="12" className="fill-muted-foreground" dx="1">
              %
            </tspan>
          </text>
        )}
      </svg>
    </div>
  )
}
