import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const roll =
  "block transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none"

/**
 * On hover and focus, the label rolls up and an identical copy takes its
 * place. Keep the label to plain text.
 */
export function TextRollButton({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button className={cn("group/roll cursor-pointer", className)} {...props}>
      <span className="relative block overflow-hidden">
        <span
          className={cn(
            roll,
            "group-hover/roll:-translate-y-full group-focus-visible/roll:-translate-y-full motion-reduce:translate-y-0!"
          )}
        >
          {children}
        </span>
        <span
          aria-hidden
          className={cn(
            roll,
            "absolute inset-0 translate-y-full group-hover/roll:translate-y-0 group-focus-visible/roll:translate-y-0 motion-reduce:hidden"
          )}
        >
          {children}
        </span>
      </span>
    </Button>
  )
}
