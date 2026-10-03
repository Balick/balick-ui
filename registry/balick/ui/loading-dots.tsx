import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Three dots that pulse in turn, sized and colored like the text around
 * them: put them after a word, as in "Deploying". They are decorative, so
 * the word carries the meaning. They stand still under reduced motion.
 */
export function LoadingDots({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="loading-dots"
      aria-hidden
      className={cn("ml-[0.15em] inline-flex items-center gap-[0.18em] align-middle", className)}
      {...props}
    >
      {[0, 1, 2].map((index) => (
        <span
          key={index}
          style={{ animationDelay: `${index * 0.16}s` }}
          className="size-[0.24em] animate-loading-dot rounded-full bg-current motion-reduce:animate-none motion-reduce:opacity-60"
        />
      ))}
    </span>
  )
}
