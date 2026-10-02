import * as React from "react"

import { cn } from "@/lib/utils"

// Eight teeth around the hub, between radii 7 and 9.5.
const gear = (() => {
  const points: string[] = []
  for (let tooth = 0; tooth < 8; tooth++) {
    const angle = (tooth * Math.PI) / 4
    for (const [offset, radius] of [[-0.3, 7], [-0.17, 9.5], [0.17, 9.5], [0.3, 7]] as const) {
      const x = 12 + radius * Math.cos(angle + offset)
      const y = 12 + radius * Math.sin(angle + offset)
      points.push(`${x.toFixed(2)} ${y.toFixed(2)}`)
    }
  }
  return `M${points.join("L")}Z`
})()

/**
 * A gear that turns a quarter turn and settles. It plays when the icon is
 * hovered, or when the link or button around it is hovered or focused with
 * the keyboard; mark any other parent with `data-icon-trigger`. It stands
 * still under reduced motion.
 */
export function SettingsIcon({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      data-slot="settings-icon"
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={cn("shrink-0", className)}
      {...props}
    >
      <g className="origin-[12px_12px] [transform-box:view-box] [:is(a,button,svg,[data-icon-trigger]):is(:hover,:focus-visible)_&]:animate-settings-turn motion-reduce:animate-none">
        <path d={gear} />
        <circle cx="12" cy="12" r="3" />
      </g>
    </svg>
  )
}
