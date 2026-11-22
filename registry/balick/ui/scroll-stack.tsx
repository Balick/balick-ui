import * as React from "react"

import { cn } from "@/lib/utils"

export interface ScrollStackProps extends React.ComponentProps<"div"> {
  /** Distance kept between the stack and the top of the screen, as a CSS length. */
  top?: string
  /** How much of each card stays visible above the next one, as a CSS length. */
  offset?: string
}

/**
 * Cards that pile on top of each other as the page scrolls: each one sticks
 * a little lower than the one before, so their top edges stay in view.
 */
export function ScrollStack({
  top = "6rem",
  offset = "1.5rem",
  className,
  style,
  children,
  ...props
}: ScrollStackProps) {
  return (
    <div
      data-slot="scroll-stack"
      style={{ "--stack-top": top, "--stack-offset": offset, ...style } as React.CSSProperties}
      className={cn("flex flex-col gap-8", className)}
      {...props}
    >
      {React.Children.toArray(children).map((child, index) => (
        <div key={index} className="sticky" style={{ top: `calc(var(--stack-top) + ${index} * var(--stack-offset))` }}>
          {child}
        </div>
      ))}
    </div>
  )
}

/** A card for a ScrollStack: opaque, so the cards it covers do not show through. */
export function ScrollStackItem({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="scroll-stack-item"
      className={cn("rounded-2xl border bg-card p-6 shadow-[0_-12px_32px_-24px_rgb(0_0_0/0.25)]", className)}
      {...props}
    />
  )
}
