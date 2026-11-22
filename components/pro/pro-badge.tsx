import { cn } from "@/lib/utils"

/** Marks a Pro item in lists, galleries and the composer. */
export function ProBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-4.5 shrink-0 items-center rounded-full bg-foreground px-1.5 font-mono text-[10px] leading-none font-medium tracking-wider text-background uppercase",
        className
      )}
    >
      Pro
    </span>
  )
}
