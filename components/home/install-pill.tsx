"use client"

import { Check, Copy } from "lucide-react"

import { useCopy } from "@/hooks/use-copy"

export function InstallPill({ command }: { command: string }) {
  const { copied, copy } = useCopy()

  return (
    <button
      type="button"
      onClick={() => copy(command)}
      className="group surface-code inline-flex h-10 max-w-full cursor-pointer items-center gap-2 rounded-md px-3 font-mono text-[11px] sm:gap-3 sm:px-4 sm:text-[13px] shadow-xs transition-shadow hover:shadow-md"
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
