"use client"

import * as React from "react"
import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

export interface TypewriterProps extends Omit<React.ComponentProps<"span">, "children"> {
  /** A phrase, or phrases typed one after the other. */
  text: string | string[]
  /** Time to type one character, in milliseconds. */
  speed?: number
  /** Time to erase one character, in milliseconds. */
  deleteSpeed?: number
  /** Time a finished phrase stays before it is erased, in milliseconds. */
  pause?: number
  /** Start over after the last phrase. */
  loop?: boolean
  /** Show a blinking caret. */
  caret?: boolean
}

/**
 * Types a phrase character by character, then erases it and types the next
 * one. Screen readers get the phrases as plain text; under reduced motion
 * the first phrase is shown whole.
 */
export function Typewriter({
  text,
  speed = 45,
  deleteSpeed = 25,
  pause = 1800,
  loop = true,
  caret = true,
  className,
  ...props
}: TypewriterProps) {
  // A stable list, even when the phrases are passed as a new array on every render.
  const key = typeof text === "string" ? text : text.join("\u0000")
  const phrases = React.useMemo(() => key.split("\u0000"), [key])
  const reduceMotion = useReducedMotion()
  const [phrase, setPhrase] = React.useState(0)
  const [length, setLength] = React.useState(0)
  const [deleting, setDeleting] = React.useState(false)

  React.useEffect(() => {
    if (reduceMotion) return
    const current = phrases[phrase] ?? ""
    const last = phrase === phrases.length - 1
    let timer: ReturnType<typeof setTimeout> | undefined

    if (!deleting && length < current.length) {
      timer = setTimeout(() => setLength(length + 1), speed)
    } else if (!deleting && phrases.length > 1 && (loop || !last)) {
      timer = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && length > 0) {
      timer = setTimeout(() => setLength(length - 1), deleteSpeed)
    } else if (deleting) {
      timer = setTimeout(() => {
        setDeleting(false)
        setPhrase((phrase + 1) % phrases.length)
      }, speed)
    }
    return () => clearTimeout(timer)
  }, [reduceMotion, phrases, phrase, length, deleting, speed, deleteSpeed, pause, loop])

  const shown = reduceMotion ? phrases[0] : (phrases[phrase] ?? "").slice(0, length)

  return (
    <span className={cn("whitespace-pre-wrap", className)} {...props}>
      <span className="sr-only">{phrases.join(", ")}</span>
      <span aria-hidden>{shown}</span>
      {caret && (
        <motion.span
          aria-hidden
          className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.15em] bg-current"
          animate={reduceMotion ? undefined : { opacity: [1, 1, 0, 0] }}
          transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1], ease: "linear" }}
        />
      )}
    </span>
  )
}
