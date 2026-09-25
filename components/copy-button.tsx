"use client"

import { Check, Copy } from "lucide-react"

import { useCopy } from "@/hooks/use-copy"
import { cn } from "@/lib/utils"

export function CopyButton({
  value,
  className,
  ...props
}: { value: string } & React.ComponentProps<"button">) {
  const { copied, copy } = useCopy()

  return (
    <button
      type="button"
      aria-label={copied ? "Copied" : "Copy to clipboard"}
      onClick={() => copy(value)}
      className={cn(
        "inline-flex size-7 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
        className
      )}
      {...props}
    >
      <span className="sr-only" aria-live="polite">
        {copied ? "Copied" : ""}
      </span>
      {copied ? (
        <Check className="size-3.5" />
      ) : (
        <Copy className="size-3.5" />
      )}
    </button>
  )
}
