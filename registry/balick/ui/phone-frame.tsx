import * as React from "react"

import { cn } from "@/lib/utils"

export interface PhoneFrameProps extends React.ComponentProps<"div"> {
  /** Width of the phone, as a CSS length. Its height follows. */
  width?: string
}

/**
 * A phone around a screen of your app: bezel, side buttons and a pill at the
 * top of the screen. The content fills the screen and scrolls if it is taller.
 */
export function PhoneFrame({ width = "16rem", className, style, children, ...props }: PhoneFrameProps) {
  return (
    <div
      data-slot="phone-frame"
      style={{ "--phone-width": width, ...style } as React.CSSProperties}
      className={cn(
        "relative aspect-[9/19.5] w-(--phone-width) shrink-0 rounded-[calc(var(--phone-width)*0.17)] border bg-card p-[calc(var(--phone-width)*0.035)] shadow-[0_24px_64px_-24px_rgb(0_0_0/0.25)]",
        className
      )}
      {...props}
    >
      <span aria-hidden className="absolute top-[18%] -left-[3px] h-[5%] w-[3px] rounded-l-sm bg-border" />
      <span aria-hidden className="absolute top-[26%] -left-[3px] h-[9%] w-[3px] rounded-l-sm bg-border" />
      <span aria-hidden className="absolute top-[24%] -right-[3px] h-[13%] w-[3px] rounded-r-sm bg-border" />
      <div className="relative size-full overflow-x-hidden overflow-y-auto rounded-[calc(var(--phone-width)*0.135)] border bg-background [scrollbar-width:none]">
        <span
          aria-hidden
          className="absolute top-[calc(var(--phone-width)*0.04)] left-1/2 z-10 h-[calc(var(--phone-width)*0.085)] w-[30%] -translate-x-1/2 rounded-full bg-foreground dark:bg-muted"
        />
        {children}
      </div>
    </div>
  )
}
