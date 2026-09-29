"use client"

import * as React from "react"
import { Check, LoaderCircle, X } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type ButtonStatus = "idle" | "loading" | "success" | "error"

export interface StatusButtonProps extends React.ComponentProps<typeof Button> {
  status?: ButtonStatus
  /** Label while loading. */
  loadingText?: React.ReactNode
  /** Label after a success. */
  successText?: React.ReactNode
  /** Label after an error. */
  errorText?: React.ReactNode
}

/**
 * A button that shows the progress of the action it starts: idle, loading,
 * success or error. Its width follows the label, and the new state is
 * announced to screen readers.
 */
export function StatusButton({
  status = "idle",
  loadingText = "Saving",
  successText = "Saved",
  errorText = "Try again",
  children,
  className,
  style,
  disabled,
  ...props
}: StatusButtonProps) {
  const reduceMotion = useReducedMotion()
  const button = React.useRef<HTMLButtonElement>(null)
  const content = React.useRef<HTMLSpanElement>(null)
  const [width, setWidth] = React.useState<number>()

  // Size the button to its label plus its own padding and border, so the width
  // can transition between states whatever the project's button style.
  React.useLayoutEffect(() => {
    const node = content.current
    const root = button.current
    if (!node || !root) return
    const observer = new ResizeObserver(() => {
      const style = getComputedStyle(root)
      const frame = ["paddingLeft", "paddingRight", "borderLeftWidth", "borderRightWidth"]
        .map((key) => parseFloat(style[key as keyof CSSStyleDeclaration] as string) || 0)
        .reduce((sum, value) => sum + value, 0)
      setWidth(node.offsetWidth + frame)
    })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const states = {
    idle: { icon: null, label: children },
    loading: { icon: <LoaderCircle aria-hidden className="animate-spin" />, label: loadingText },
    success: { icon: <Check aria-hidden />, label: successText },
    error: { icon: <X aria-hidden />, label: errorText },
  }
  const { icon, label } = states[status]

  return (
    <Button
      ref={button}
      aria-busy={status === "loading"}
      disabled={disabled || status === "loading"}
      className={cn(
        "relative cursor-pointer justify-start overflow-hidden transition-[width,background-color] duration-200 ease-out motion-reduce:transition-none",
        className
      )}
      style={{ width, ...style }}
      {...props}
    >
      <span ref={content} className="mx-auto inline-flex items-center gap-2 whitespace-nowrap">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={status}
            className="inline-flex items-center gap-2"
            initial={reduceMotion ? false : { opacity: 0, y: 8, filter: "blur(2px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8, filter: "blur(2px)" }}
            transition={{ duration: reduceMotion ? 0 : 0.2, ease: "easeOut" }}
          >
            {icon}
            {label}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="sr-only" aria-live="polite">
        {status === "idle" ? "" : label}
      </span>
    </Button>
  )
}
