"use client"

import * as React from "react"

import { CopyIcon } from "@/registry/balick/ui/copy-icon"

export default function CopyIconDemo() {
  const [copied, setCopied] = React.useState(false)

  React.useEffect(() => {
    if (!copied) return
    const timeout = setTimeout(() => setCopied(false), 1500)
    return () => clearTimeout(timeout)
  }, [copied])

  return (
    <div className="flex h-10 items-center gap-3 rounded-md border bg-background pr-1 pl-4 font-mono text-sm">
      <span className="whitespace-nowrap text-muted-foreground">pnpm add @acme/ui</span>
      <button
        type="button"
        aria-label={copied ? "Copied" : "Copy command"}
        onClick={() => setCopied(true)}
        className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <CopyIcon copied={copied} className="size-4" />
      </button>
    </div>
  )
}
