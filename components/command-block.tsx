"use client"

import { Terminal } from "lucide-react"

import { CopyButton } from "@/components/copy-button"
import {
  packageManagers,
  usePackageManager,
} from "@/hooks/use-package-manager"
import type { Commands } from "@/lib/commands"
import { cn } from "@/lib/utils"

export function CommandBlock({
  commands,
  className,
}: {
  commands: Commands
  className?: string
}) {
  const [manager, setManager] = usePackageManager()

  return (
    <div className={cn("overflow-hidden rounded-lg border bg-code", className)}>
      <div className="flex h-10 items-center gap-1 border-b pr-2 pl-3">
        <Terminal className="mr-1.5 size-3.5 text-muted-foreground" />
        <div role="tablist" aria-label="Package manager" className="flex flex-1 gap-1">
          {packageManagers.map((pm) => (
            <button
              key={pm}
              type="button"
              role="tab"
              aria-selected={manager === pm}
              onClick={() => setManager(pm)}
              className={cn(
                "h-6 cursor-pointer rounded-md px-2 font-mono text-xs transition-colors",
                manager === pm
                  ? "bg-accent text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {pm}
            </button>
          ))}
        </div>
        <CopyButton value={commands[manager]} />
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-6">
        <code>{commands[manager]}</code>
      </pre>
    </div>
  )
}
