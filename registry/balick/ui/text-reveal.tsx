"use client"

import * as React from "react"
import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

const tags = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
}

type Tag = keyof typeof tags

export interface TextRevealProps {
  /** The text to reveal. */
  children: string
  /** Element rendered around the text. */
  as?: Tag
  /** Reveal word by word, or character by character. */
  by?: "word" | "character"
  /** Delay before the first word, in seconds. */
  delay?: number
  /** Delay between two words or characters, in seconds. */
  stagger?: number
  /** Wait until the text scrolls into view. */
  inView?: boolean
  className?: string
}

/**
 * Reveals a line word by word (or character by character), each part
 * fading in from a light blur. The full text stays readable by screen
 * readers and search engines.
 */
export function TextReveal({
  children,
  as: Tag = "p",
  by = "word",
  delay = 0,
  stagger = 0.06,
  inView = false,
  className,
}: TextRevealProps) {
  const reduceMotion = useReducedMotion()
  const parts = by === "word" ? children.split(/(\s+)/) : Array.from(children)
  const MotionTag = tags[Tag]

  return (
    <MotionTag
      className={cn(className)}
      initial="hidden"
      {...(inView
        ? { whileInView: "visible", viewport: { once: true, margin: "-50px" } }
        : { animate: "visible" })}
      transition={{ staggerChildren: reduceMotion ? 0 : stagger, delayChildren: delay }}
    >
      <span className="sr-only">{children}</span>
      {parts.map((part, index) =>
        /^\s+$/.test(part) ? (
          part
        ) : (
          <motion.span
            key={index}
            aria-hidden
            className="inline-block whitespace-pre"
            variants={{
              hidden: { opacity: 0, y: 8, filter: "blur(6px)" },
              visible: { opacity: 1, y: 0, filter: "blur(0px)" },
            }}
            // The hidden state matches on the server and the client. Under
            // reduced motion, only the fade is animated.
            transition={{
              duration: 0.4,
              ease: "easeOut",
              ...(reduceMotion && { y: { duration: 0 }, filter: { duration: 0 } }),
            }}
          >
            {part}
          </motion.span>
        )
      )}
    </MotionTag>
  )
}
