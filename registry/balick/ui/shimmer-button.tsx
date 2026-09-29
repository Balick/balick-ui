import * as React from "react"

import { cn } from "@/lib/utils"

export interface ShimmerButtonProps extends React.ComponentProps<"button"> {
  /** Color of the light travelling around the border. */
  shimmerColor?: string
  /** Duration of one full turn, as a CSS time. */
  shimmerDuration?: string
  /** Background of the button. */
  background?: string
}

export function ShimmerButton({
  className,
  shimmerColor = "#ffffff",
  shimmerDuration = "3s",
  background = "#0a0a0a",
  style,
  children,
  ...props
}: ShimmerButtonProps) {
  return (
    <button
      data-slot="shimmer-button"
      style={
        {
          "--shimmer-color": shimmerColor,
          "--shimmer-duration": shimmerDuration,
          "--shimmer-bg": background,
          ...style,
        } as React.CSSProperties
      }
      // The 1px ring takes the button's own background, so the beam travels
      // on a dark track and stays visible on light pages too.
      className={cn(
        "group relative isolate inline-flex cursor-pointer overflow-hidden rounded-full bg-(--shimmer-bg) p-px transition-transform duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
        "shadow-[0_0_0_1px_rgb(255_255_255/0.08),0_8px_24px_-8px_rgb(0_0_0/0.5)] dark:shadow-[0_0_0_1px_rgb(255_255_255/0.22),0_8px_24px_-8px_rgb(0_0_0/0.5)]",
        className
      )}
      {...props}
    >
      <span
        aria-hidden
        className="animate-shimmer-spin absolute top-1/2 left-1/2 -z-10 aspect-square w-[max(200%,12rem)] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_0deg,transparent_270deg,var(--shimmer-color)_330deg,transparent_360deg)] motion-reduce:animate-none"
      />
      <span className="relative inline-flex h-full w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-(--shimmer-bg) px-6 py-2.5 text-sm font-medium whitespace-nowrap text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.12)]">
        <span
          aria-hidden
          className="absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 transition-[left,opacity] duration-700 ease-out group-hover:left-[120%] group-hover:opacity-100"
        />
        {children}
      </span>
    </button>
  )
}
