import * as React from "react"
import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * A grid of feature cards of different sizes. It has one column, then two,
 * then three as its container widens; make a card span two columns with
 * `className="@md/bento:col-span-2"`.
 */
export function BentoGrid({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className="@container/bento w-full">
      <div
        data-slot="bento-grid"
        className={cn("grid auto-rows-[16rem] grid-cols-1 gap-4 @md/bento:grid-cols-2 @3xl/bento:grid-cols-3", className)}
        {...props}
      />
    </div>
  )
}

export interface BentoCardProps extends Omit<React.ComponentProps<"div">, "title"> {
  title: React.ReactNode
  description?: React.ReactNode
  /** Icon shown above the title, in a small tile. */
  icon?: React.ReactNode
  /** Illustration that fills the card behind the text. It eases up on hover. */
  background?: React.ReactNode
  /** Where the card leads. A link slides in under the text on hover. */
  href?: string
  /** Text of the link. */
  cta?: React.ReactNode
}

/** A card of a BentoGrid: an illustration, a title, a description and a link. */
export function BentoCard({
  title,
  description,
  icon,
  background,
  href,
  cta = "Learn more",
  className,
  ...props
}: BentoCardProps) {
  return (
    <div
      data-slot="bento-card"
      className={cn(
        "group/bento relative flex flex-col justify-end overflow-hidden rounded-xl border bg-card",
        className
      )}
      {...props}
    >
      {background && (
        <div
          aria-hidden
          className="absolute inset-0 transition-transform duration-500 ease-out [mask-image:linear-gradient(to_bottom,black_45%,transparent_85%)] group-hover/bento:-translate-y-2 group-hover/bento:scale-[1.03] motion-reduce:transition-none"
        >
          {background}
        </div>
      )}
      <div
        className={cn(
          "relative flex flex-col p-5 transition-transform duration-300 ease-out motion-reduce:transition-none",
          href &&
            "group-focus-within/bento:-translate-y-9 group-hover/bento:-translate-y-9 pointer-coarse:-translate-y-9"
        )}
      >
        {icon && (
          <div className="mb-3 flex size-9 items-center justify-center rounded-md border bg-background text-muted-foreground [&_svg]:size-4">
            {icon}
          </div>
        )}
        <h3 className="font-medium">{title}</h3>
        {description && <p className="mt-1 text-sm leading-6 text-muted-foreground">{description}</p>}
      </div>
      {href && (
        <a
          href={href}
          className="absolute bottom-5 left-5 inline-flex translate-y-3 items-center gap-1.5 rounded-sm text-sm font-medium opacity-0 transition duration-300 ease-out group-focus-within/bento:translate-y-0 group-focus-within/bento:opacity-100 group-hover/bento:translate-y-0 group-hover/bento:opacity-100 pointer-coarse:translate-y-0 pointer-coarse:opacity-100 motion-reduce:transition-none [&_svg]:size-3.5"
        >
          {cta}
          <ArrowRight aria-hidden />
        </a>
      )}
    </div>
  )
}
