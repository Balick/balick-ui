import * as React from "react"

import { cn } from "@/lib/utils"

export interface StickyColumnsProps extends React.ComponentProps<"div"> {
  /** The column that stays in view: usually a title, a short text and a call to action. */
  aside: React.ReactNode
  /** Side of the sticky column. */
  side?: "left" | "right"
  /** Distance kept between the sticky column and the top of the screen, as a CSS length. */
  top?: string
}

/**
 * Two columns where one stays in view while the other scrolls by. They stack,
 * and nothing sticks, when the container is narrow.
 */
export function StickyColumns({
  aside,
  side = "left",
  top = "6rem",
  className,
  style,
  children,
  ...props
}: StickyColumnsProps) {
  return (
    <div className="@container/sticky w-full">
      <div
        data-slot="sticky-columns"
        style={{ "--sticky-top": top, ...style } as React.CSSProperties}
        className={cn(
          "grid grid-cols-1 gap-10 @md/sticky:gap-12",
          side === "left"
            ? "@md/sticky:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
            : "@md/sticky:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]",
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "@md/sticky:sticky @md/sticky:top-(--sticky-top) @md/sticky:self-start",
            side === "right" && "@md/sticky:order-last"
          )}
        >
          {aside}
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  )
}
