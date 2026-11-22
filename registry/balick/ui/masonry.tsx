import * as React from "react"

import { cn } from "@/lib/utils"

export interface MasonryProps extends React.ComponentProps<"div"> {
  /** Space between items, as a CSS length. */
  gap?: string
}

/**
 * Items of uneven heights laid out in columns, with no holes between them.
 * The number of columns follows the width of the container: one, two, then
 * three; set your own with a `columns-*` class. Items flow down each column.
 */
export function Masonry({ gap = "1rem", className, style, children, ...props }: MasonryProps) {
  return (
    <div className="@container/masonry w-full">
      <div
        data-slot="masonry"
        style={{ "--masonry-gap": gap, ...style } as React.CSSProperties}
        className={cn("columns-1 gap-(--masonry-gap) @sm/masonry:columns-2 @2xl/masonry:columns-3", className)}
        {...props}
      >
        {React.Children.map(children, (child) => (
          <div className="mb-(--masonry-gap) break-inside-avoid">{child}</div>
        ))}
      </div>
    </div>
  )
}
