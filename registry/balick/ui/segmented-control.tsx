"use client"

import * as React from "react"
import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

export interface SegmentedControlOption<T extends string> {
  value: T
  label: React.ReactNode
  /** Short note shown next to the label, such as a discount. */
  badge?: React.ReactNode
}

export interface SegmentedControlProps<T extends string>
  extends Omit<React.ComponentProps<"div">, "onChange" | "defaultValue"> {
  /** The selected option. */
  value: T
  /** Called with the option the user picks. */
  onValueChange: (value: T) => void
  options: SegmentedControlOption<T>[]
}

/**
 * A single choice between a few options, with a pill that slides to the
 * selected one. Behaves as a radio group: arrow keys, Home and End move the
 * selection. Give it an `aria-label`.
 */
export function SegmentedControl<T extends string>({
  value,
  onValueChange,
  options,
  className,
  ...props
}: SegmentedControlProps<T>) {
  const pillId = React.useId()
  const reduceMotion = useReducedMotion()
  const buttons = React.useRef<(HTMLButtonElement | null)[]>([])

  function select(index: number) {
    const option = options[(index + options.length) % options.length]
    onValueChange(option.value)
    buttons.current[options.indexOf(option)]?.focus()
  }

  function onKeyDown(event: React.KeyboardEvent, index: number) {
    const moves: Record<string, number> = {
      ArrowRight: index + 1,
      ArrowDown: index + 1,
      ArrowLeft: index - 1,
      ArrowUp: index - 1,
      Home: 0,
      End: options.length - 1,
    }
    if (event.key in moves) {
      event.preventDefault()
      select(moves[event.key])
    }
  }

  return (
    <div
      role="radiogroup"
      className={cn("inline-flex rounded-full border bg-muted/50 p-1", className)}
      {...props}
    >
      {options.map((option, index) => {
        const selected = option.value === value
        return (
          <button
            key={option.value}
            ref={(node) => {
              buttons.current[index] = node
            }}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => onValueChange(option.value)}
            onKeyDown={(event) => onKeyDown(event, index)}
            className={cn(
              "relative h-8 cursor-pointer rounded-full px-4 text-sm font-medium transition-colors",
              selected ? "text-background" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {selected && (
              <motion.span
                layoutId={pillId}
                transition={
                  reduceMotion ? { duration: 0 } : { type: "spring", bounce: 0.2, duration: 0.4 }
                }
                className="absolute inset-0 rounded-full bg-foreground"
              />
            )}
            <span className="relative flex items-center gap-1.5">
              {option.label}
              {option.badge && (
                <span
                  className={cn(
                    "rounded-full px-1.5 py-px text-[10px] leading-4",
                    selected ? "bg-background/20" : "bg-foreground/10 text-foreground"
                  )}
                >
                  {option.badge}
                </span>
              )}
            </span>
          </button>
        )
      })}
    </div>
  )
}
