import * as React from "react"

import { cn } from "@/lib/utils"

export interface DividerProps extends React.ComponentProps<"div"> {
  /** Text or icon set in the line, such as "or". */
  label?: React.ReactNode
  /** Where the label sits along the line. */
  align?: "start" | "center" | "end"
  /** Style of the line: plain, dashed, or fading out at its ends. */
  variant?: "solid" | "dashed" | "fade"
  orientation?: "horizontal" | "vertical"
}

/** A line that separates content, with an optional label. */
export function Divider({
  label,
  align = "center",
  variant = "solid",
  orientation = "horizontal",
  className,
  ...props
}: DividerProps) {
  const vertical = orientation === "vertical"

  // A fading line fades toward its free end, or toward both without a label.
  const directions = {
    alone: vertical ? "bg-linear-to-b via-border" : "bg-linear-to-r via-border",
    before: vertical ? "bg-linear-to-b to-border" : "bg-linear-to-r to-border",
    after: vertical ? "bg-linear-to-t to-border" : "bg-linear-to-l to-border",
  }

  function line(position: keyof typeof directions) {
    return (
      <span
        aria-hidden
        className={cn(
          "flex-1",
          vertical ? "w-px" : "h-px",
          variant === "solid" && "bg-border",
          variant === "dashed" && (vertical ? "w-0 border-l border-dashed" : "h-0 border-t border-dashed"),
          variant === "fade" && cn("from-transparent", directions[position], position === "alone" && "to-transparent")
        )}
      />
    )
  }

  return (
    <div
      data-slot="divider"
      role="separator"
      aria-orientation={orientation}
      className={cn(
        "flex items-center",
        vertical ? "h-full min-h-4 flex-col self-stretch" : "w-full",
        label && "gap-3",
        className
      )}
      {...props}
    >
      {!label ? (
        line("alone")
      ) : (
        <>
          {align !== "start" && line("before")}
          <span className="shrink-0 font-mono text-xs tracking-wider text-muted-foreground uppercase [&_svg]:size-3.5">
            {label}
          </span>
          {align !== "end" && line("after")}
        </>
      )}
    </div>
  )
}
