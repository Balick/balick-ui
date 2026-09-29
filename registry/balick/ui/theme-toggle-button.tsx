"use client"

import * as React from "react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/**
 * Switches between light and dark with next-themes. The sun grows into a
 * moon: its rays fold in and a shadow slides across. The drawing follows the
 * `dark` class, so it is right from the first paint.
 */
export function ThemeToggleButton({
  className,
  variant = "ghost",
  size = "icon",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { resolvedTheme, setTheme } = useTheme()
  const maskId = React.useId()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  const move = "transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none"

  return (
    <Button
      variant={variant}
      size={size}
      aria-label="Toggle theme"
      aria-pressed={mounted ? resolvedTheme === "dark" : undefined}
      className={cn(className)}
      {...props}
      // Capture phase: leaves the consumer's own onClick untouched.
      onClickCapture={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <svg viewBox="0 0 24 24" aria-hidden className="size-4 overflow-visible">
        <mask id={maskId}>
          <rect width="24" height="24" fill="white" />
          <circle
            cx="24"
            cy="4"
            r="8"
            fill="black"
            className={cn(move, "dark:-translate-x-[7px] dark:translate-y-[3px]")}
          />
        </mask>
        <circle
          cx="12"
          cy="12"
          r="5"
          fill="currentColor"
          mask={`url(#${maskId})`}
          className={cn(move, "origin-center [transform-box:fill-box] dark:scale-[1.6]")}
        />
        <g
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className={cn(
            move,
            "origin-center [transform-box:view-box] transition-[transform,opacity] dark:scale-50 dark:rotate-45 dark:opacity-0"
          )}
        >
          <path d="M12 1.5v2M12 20.5v2M1.5 12h2M20.5 12h2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M4.6 19.4 6 18M18 6l1.4-1.4" />
        </g>
      </svg>
    </Button>
  )
}
