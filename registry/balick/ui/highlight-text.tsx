"use client"

import * as React from "react"
import { useInView } from "motion/react"

import { cn } from "@/lib/utils"

export interface HighlightTextProps extends React.ComponentProps<"mark"> {
  /** Colour of the highlight. Defaults to a light tint of the text colour. */
  color?: string
  /** Duration of the stroke, in seconds. */
  duration?: number
  /** Delay once in view, in seconds. */
  delay?: number
}

/**
 * A marker stroke draws behind the words once they scroll into view, and
 * follows them across line breaks. Under reduced motion it appears at once.
 */
export function HighlightText({
  color = "color-mix(in oklab, var(--foreground) 14%, transparent)",
  duration = 0.8,
  delay = 0,
  className,
  style,
  ...props
}: HighlightTextProps) {
  const ref = React.useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" })

  return (
    <mark
      ref={ref}
      className={cn(
        "-mx-0.5 box-decoration-clone rounded-sm bg-transparent bg-no-repeat px-0.5 text-inherit transition-[background-size] ease-out motion-reduce:transition-none",
        className
      )}
      style={{
        backgroundImage: `linear-gradient(${color}, ${color})`,
        backgroundSize: inView ? "100% 100%" : "0% 100%",
        transitionDuration: `${duration}s`,
        transitionDelay: `${delay}s`,
        ...style,
      }}
      {...props}
    />
  )
}
