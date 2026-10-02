import * as React from "react"

import { cn } from "@/lib/utils"

export interface SpinnerProps extends React.ComponentProps<"span"> {
  /** What is loading, read by screen readers. */
  label?: string
}

const bars = Array.from({ length: 12 }, (_, index) => index)

/**
 * Twelve bars that fade in turn, for waits the size of an icon. It takes the
 * color of the text around it; size it with `size-*` utilities. Under reduced
 * motion the bars stand still, in a gradient.
 */
export function Spinner({ label = "Loading", className, ...props }: SpinnerProps) {
  return (
    <span
      data-slot="spinner"
      role="status"
      aria-label={label}
      className={cn("relative inline-block size-4 shrink-0", className)}
      {...props}
    >
      {bars.map((index) => (
        <span
          key={index}
          aria-hidden
          style={{
            transform: `rotate(${index * 30 - 90}deg) translateX(92%)`,
            animationDelay: `${(index - 12) * 0.1}s`,
            opacity: 0.15 + (index / 11) * 0.85,
          }}
          className="absolute top-[46%] left-1/2 h-[8%] w-[24%] origin-[0_50%] animate-spinner-fade rounded-full bg-current motion-reduce:animate-none"
        />
      ))}
    </span>
  )
}
