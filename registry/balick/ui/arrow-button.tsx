import { ArrowRight } from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const arrow =
  "transition-transform duration-200 ease-out group-hover/arrow:translate-x-0.5 group-focus-visible/arrow:translate-x-0.5 motion-reduce:transition-none"

/** A button whose trailing arrow nudges forward on hover and focus. */
export function ArrowButton({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button className={cn("group/arrow", className)} {...props}>
      {children}
      <ArrowRight aria-hidden className={arrow} />
    </Button>
  )
}

export interface ArrowLinkProps extends React.ComponentProps<"a"> {
  variant?: "default" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg"
}

/** The same, as a link styled like a button. */
export function ArrowLink({
  className,
  variant = "default",
  size = "default",
  children,
  ...props
}: ArrowLinkProps) {
  return (
    <a className={cn(buttonVariants({ variant, size }), "group/arrow", className)} {...props}>
      {children}
      <ArrowRight aria-hidden className={arrow} />
    </a>
  )
}
