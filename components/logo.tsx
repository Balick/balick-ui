import { cn } from "@/lib/utils"

/** Two stacked blocks: components that build on each other. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cn("size-5", className)}>
      <rect x="2" y="2" width="13" height="13" rx="3" fill="currentColor" />
      <rect
        x="9.75"
        y="9.75"
        width="12.25"
        height="12.25"
        rx="3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <LogoMark />
      <span className="text-[15px] font-semibold tracking-tight whitespace-nowrap">Balick UI</span>
    </span>
  )
}
