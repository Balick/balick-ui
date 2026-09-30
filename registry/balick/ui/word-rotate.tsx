"use client"

import * as React from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

export interface WordRotateProps extends Omit<React.ComponentProps<"span">, "children"> {
  /** Words shown in turn, starting with the first. */
  words: string[]
  /** Time each word stays, in milliseconds. */
  interval?: number
}

/**
 * Cycles through words in place, each one sliding up into view. Screen
 * readers get the whole list once; under reduced motion the first word stays.
 */
export function WordRotate({ words, interval = 2500, className, ...props }: WordRotateProps) {
  const reduceMotion = useReducedMotion()
  const [index, setIndex] = React.useState(0)

  React.useEffect(() => {
    if (reduceMotion || words.length < 2) return
    const timer = setInterval(() => setIndex((value) => (value + 1) % words.length), interval)
    return () => clearInterval(timer)
  }, [reduceMotion, words.length, interval])

  return (
    <span className={cn("relative inline-flex overflow-hidden align-bottom", className)} {...props}>
      <span className="sr-only">{words.join(", ")}</span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={index}
          aria-hidden
          className="inline-block whitespace-nowrap"
          initial={{ y: "100%", opacity: 0, filter: "blur(4px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-100%", opacity: 0, filter: "blur(4px)" }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
