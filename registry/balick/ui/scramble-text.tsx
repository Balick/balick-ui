"use client"

import * as React from "react"
import { useInView, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

export interface ScrambleTextProps extends Omit<React.ComponentProps<"span">, "children"> {
  /** The text to decode. */
  text: string
  /** When the text decodes: on load, or once it scrolls into view. */
  trigger?: "mount" | "inView"
  /** Decode again each time the pointer enters the text. */
  scrambleOnHover?: boolean
  /** Duration of the decoding, in milliseconds. */
  duration?: number
  /** Characters drawn while the text is scrambled. */
  characters?: string
}

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

/**
 * Letters and digits start scrambled and settle one after the other, from
 * left to right. The final text is rendered on the server and keeps the
 * width, so nothing around it moves. Works best in a monospace font.
 */
export function ScrambleText({
  text,
  trigger = "inView",
  scrambleOnHover = false,
  duration = 800,
  characters = letters,
  className,
  onPointerEnter,
  ...props
}: ScrambleTextProps) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const frame = React.useRef(0)
  const played = React.useRef(false)
  const inView = useInView(ref, { once: true, margin: "-50px" })
  const reduceMotion = useReducedMotion()
  const [display, setDisplay] = React.useState(text)

  const scramble = React.useCallback(() => {
    if (reduceMotion) return
    cancelAnimationFrame(frame.current)
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration)
      const settled = Math.floor(progress * text.length)
      setDisplay(
        Array.from(text, (char, index) =>
          index < settled || !/[\p{L}\p{N}]/u.test(char)
            ? char
            : characters[Math.floor(Math.random() * characters.length)]
        ).join("")
      )
      if (progress < 1) frame.current = requestAnimationFrame(tick)
    }
    frame.current = requestAnimationFrame(tick)
  }, [reduceMotion, duration, text, characters])

  React.useEffect(() => {
    if (played.current || (trigger === "inView" && !inView)) return
    played.current = true
    scramble()
  }, [trigger, inView, scramble])

  React.useEffect(() => () => cancelAnimationFrame(frame.current), [])

  return (
    <span
      ref={ref}
      className={cn("relative inline-block", className)}
      onPointerEnter={(event) => {
        onPointerEnter?.(event)
        if (scrambleOnHover) scramble()
      }}
      {...props}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden className="invisible whitespace-pre">
        {text}
      </span>
      <span aria-hidden className="absolute inset-0 whitespace-pre">
        {display}
      </span>
    </span>
  )
}
