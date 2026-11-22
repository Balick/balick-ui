"use client"

import Link from "next/link"

import { CommandBlock } from "@/components/command-block"
import { Snippet } from "@/components/pro/snippet"
import { componentsJsonSnippet, envSnippet } from "@/config/pro"
import { shadcnAdd } from "@/lib/commands"
import { cn } from "@/lib/utils"

/**
 * The three steps that let a project install Pro items: declare the
 * registry, store the key, run the command. `target` is what to install.
 */
export function ProSetup({ target, className }: { target: string; className?: string }) {
  return (
    <ol className={cn("grid grid-cols-1 gap-5", className)}>
      <Step index={1} title="Declare the Pro registry">
        Add it to <code className="font-mono text-foreground">components.json</code>, next to your other
        settings. The key stays out of the file.
        <Snippet title="components.json" code={componentsJsonSnippet} className="mt-3" />
      </Step>
      <Step index={2} title="Add your license key">
        Put the key from your purchase in{" "}
        <code className="font-mono text-foreground">.env.local</code>, which git ignores. No key yet?{" "}
        <Link href="/pro" className="font-medium text-foreground underline underline-offset-4">
          Get Pro
        </Link>
        .
        <Snippet title=".env.local" code={envSnippet} className="mt-3" />
      </Step>
      <Step index={3} title="Install">
        The CLI sends the key with each request and installs the files and their dependencies.
        <CommandBlock commands={shadcnAdd(target)} className="mt-3" />
      </Step>
    </ol>
  )
}

function Step({ index, title, children }: { index: number; title: string; children: React.ReactNode }) {
  return (
    <li className="grid grid-cols-[1.75rem_minmax(0,1fr)] gap-x-3">
      <span className="flex size-7 items-center justify-center rounded-full border bg-card font-mono text-xs text-muted-foreground">
        {index}
      </span>
      <div>
        <p className="pt-0.5 text-sm font-medium">{title}</p>
        <div className="mt-1 text-sm leading-6 text-muted-foreground">{children}</div>
      </div>
    </li>
  )
}
