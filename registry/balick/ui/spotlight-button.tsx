"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/**
 * A soft light follows the pointer inside the button. It takes the colour of
 * the text, so it works on every variant. Position updates go straight to CSS
 * variables, without re-rendering.
 */
export function SpotlightButton({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      className={cn("group/spotlight relative cursor-pointer overflow-hidden", className)}
      // Capture phase: leaves the consumer's own onPointerMove untouched.
      onPointerMoveCapture={(event: React.PointerEvent<HTMLButtonElement>) => {
        const rect = event.currentTarget.getBoundingClientRect()
        event.currentTarget.style.setProperty("--spotlight-x", `${event.clientX - rect.left}px`)
        event.currentTarget.style.setProperty("--spotlight-y", `${event.clientY - rect.top}px`)
      }}
      {...props}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/spotlight:opacity-100"
        style={{
          background:
            "radial-gradient(80px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), color-mix(in oklab, currentColor 22%, transparent), transparent 70%)",
        }}
      />
      <span className="relative inline-flex items-center gap-2">{children}</span>
    </Button>
  )
}
