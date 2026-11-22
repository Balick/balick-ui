"use client"

import { CopyButton } from "@/components/copy-button"
import { cn } from "@/lib/utils"

/** A short file or command, with its name and a copy button. */
export function Snippet({ title, code, className }: { title: string; code: string; className?: string }) {
  return (
    <div className={cn("surface-code overflow-hidden rounded-lg shadow-xs", className)}>
      <div className="flex h-10 items-center justify-between border-b pr-2 pl-4 font-mono text-xs text-muted-foreground">
        {title}
        <CopyButton value={code} />
      </div>
      <pre className="scrollbar-thin overflow-x-auto p-4 font-mono text-[13px] leading-6">
        <code>{code}</code>
      </pre>
    </div>
  )
}
