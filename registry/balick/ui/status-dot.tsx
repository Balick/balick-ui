import { cn } from "@/lib/utils"

const tones = {
  success: { dot: "bg-emerald-500", halo: "bg-emerald-500/60" },
  warning: { dot: "bg-amber-500", halo: "bg-amber-500/60" },
  danger: { dot: "bg-red-500", halo: "bg-red-500/60" },
  neutral: { dot: "bg-foreground", halo: "bg-foreground/30" },
}

export interface StatusDotProps extends React.ComponentProps<"span"> {
  /** Colour of the dot. */
  tone?: keyof typeof tones
  /** Draw an expanding halo around the dot. Stops under reduced motion. */
  pulse?: boolean
}

/**
 * A small live indicator. It is decorative: put the status it stands for in
 * the text next to it. Size it with `size-*` utilities.
 */
export function StatusDot({
  tone = "success",
  pulse = true,
  className,
  ...props
}: StatusDotProps) {
  return (
    <span aria-hidden className={cn("relative flex size-2 shrink-0", className)} {...props}>
      {pulse && (
        <span
          className={cn(
            "absolute inline-flex size-full animate-ping rounded-full motion-reduce:animate-none",
            tones[tone].halo
          )}
        />
      )}
      <span className={cn("relative inline-flex size-full rounded-full", tones[tone].dot)} />
    </span>
  )
}
