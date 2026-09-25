"use client"

import { Check, Copy } from "lucide-react"

import { useCopy } from "@/hooks/use-copy"

export function InstallPill({ command }: { command: string }) {
  const { copied, copy } = useCopy()

  return (
    <button
      type="button"
      onClick={() => copy(command)}
      className="group inline-flex h-10 max-w-full cursor-pointer items-center gap-3 rounded-md border bg-background px-4 font-mono text-[13px] transition-colors hover:bg-accent/60"
    >
      <span className="text-muted-foreground select-none">$</span>
      <span className="truncate">{command}</span>
      <span className="sr-only" aria-live="polite">{copied ? "Copied" : ""}</span>
      {copied ? (
        <Check className="size-3.5 shrink-0" />
      ) : (
        <Copy className="size-3.5 shrink-0 text-muted-foreground group-hover:text-foreground" />
      )}
    </button>
  )
}
