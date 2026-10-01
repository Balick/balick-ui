import * as React from "react"

import { cn } from "@/lib/utils"

export interface CollapseProps extends React.ComponentProps<"div"> {
  /** Whether the content is shown. */
  open: boolean
}

/**
 * Opens and closes its content with a height animation, whatever the height
 * of the content. Closed content is hidden from the keyboard and from
 * assistive technology. Pair it with a button that sets `aria-expanded` and
 * `aria-controls`.
 */
export function Collapse({ open, className, children, ...props }: CollapseProps) {
  return (
    <div
      data-slot="collapse"
      data-state={open ? "open" : "closed"}
      inert={!open}
      className={cn(
        "grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none",
        open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        className
      )}
      {...props}
    >
      <div className="min-h-0 overflow-hidden">{children}</div>
    </div>
  )
}
