"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface HoldButtonProps
  extends Omit<React.ComponentProps<typeof Button>, "onClick"> {
  /** Called once the button has been held for `duration`. */
  onConfirm: () => void
  /** How long to hold, in milliseconds. */
  duration?: number
}

/**
 * Hold to confirm, for actions that are hard to undo. A fill shows the
 * progress; releasing early cancels. Works with the pointer and with Space or
 * Enter held down.
 */
export function HoldButton({
  onConfirm,
  duration = 1200,
  variant = "destructive",
  className,
  children,
  ...props
}: HoldButtonProps) {
  const [holding, setHolding] = React.useState(false)
  const timer = React.useRef<ReturnType<typeof setTimeout>>(undefined)

  const cancel = React.useCallback(() => {
    clearTimeout(timer.current)
    setHolding(false)
  }, [])

  function start() {
    clearTimeout(timer.current)
    setHolding(true)
    timer.current = setTimeout(() => {
      setHolding(false)
      onConfirm()
    }, duration)
  }

  React.useEffect(() => cancel, [cancel])

  return (
    <Button
      type="button"
      variant={variant}
      className={cn("relative overflow-hidden select-none", className)}
      {...props}
      // The hold logic owns these handlers, so they come after the spread props.
      onPointerDown={(event) => {
        if (event.button === 0) start()
      }}
      onPointerUp={cancel}
      onPointerLeave={cancel}
      onPointerCancel={cancel}
      onKeyDown={(event) => {
        if ((event.key === " " || event.key === "Enter") && !event.repeat) {
          event.preventDefault()
          start()
        }
      }}
      onKeyUp={(event) => {
        if (event.key === " " || event.key === "Enter") cancel()
      }}
      onBlur={cancel}
      onContextMenu={(event) => event.preventDefault()}
    >
      <span
        aria-hidden
        className="absolute inset-0 origin-left bg-current/20 ease-linear"
        style={{
          transform: `scaleX(${holding ? 1 : 0})`,
          transitionProperty: "transform",
          transitionDuration: holding ? `${duration}ms` : "200ms",
        }}
      />
      <span className="relative inline-flex items-center gap-2">{children}</span>
      <span className="sr-only">, hold to confirm</span>
    </Button>
  )
}
