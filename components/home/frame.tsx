import { cn } from "@/lib/utils"

/** A "+" marker placed on the intersection of two frame lines. */
function Cross({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden
      className={cn("pointer-events-none absolute z-10 size-4 text-foreground/40", className)}
    >
      <path d="M8 0v16M0 8h16" stroke="currentColor" strokeWidth="1" />
    </svg>
  )
}

/** A bordered section of the page frame, with crosses on its top corners. */
export function FrameSection({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <section className={cn("relative border-t", className)}>
      <Cross className="-top-2 -left-2" />
      <Cross className="-top-2 -right-2" />
      {children}
    </section>
  )
}
