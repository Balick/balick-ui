import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface ExpandButtonProps
  extends Omit<React.ComponentProps<typeof Button>, "children"> {
  /** Icon shown on its own at rest. */
  icon: React.ReactNode
  /** Label that unfolds on hover and focus. It is always the accessible name. */
  label: string
}

/** An icon button whose label slides out on hover and keyboard focus. */
export function ExpandButton({
  icon,
  label,
  variant = "outline",
  className,
  ...props
}: ExpandButtonProps) {
  return (
    <Button
      variant={variant}
      className={cn("group/expand gap-0 rounded-full px-2.5 has-[>svg]:px-2.5", className)}
      {...props}
    >
      {icon}
      <span className="grid grid-cols-[0fr] transition-[grid-template-columns] duration-300 ease-out group-hover/expand:grid-cols-[1fr] group-focus-visible/expand:grid-cols-[1fr] motion-reduce:transition-none">
        <span className="overflow-hidden whitespace-nowrap">
          <span className="block pl-2 opacity-0 transition-opacity duration-300 group-hover/expand:opacity-100 group-focus-visible/expand:opacity-100">
            {label}
          </span>
        </span>
      </span>
    </Button>
  )
}
