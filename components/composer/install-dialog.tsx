"use client"

import * as Dialog from "@radix-ui/react-dialog"
import { Download, X } from "lucide-react"

import { CommandBlock } from "@/components/command-block"
import { CopyButton } from "@/components/copy-button"
import { Button } from "@/components/ui/button"
import { shadcnAdd } from "@/lib/commands"
import { composePageSource, composeRegistryUrl } from "@/lib/compose"

export function InstallDialog({ blocks }: { blocks: string[] }) {
  const source = composePageSource(blocks)
  const unique = new Set(blocks).size

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button size="sm" disabled={!blocks.length}>
          <Download className="size-3.5" />
          Install
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-50 flex max-h-[85svh] w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-xl border bg-background shadow-2xl data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95">
          <div className="flex items-start justify-between gap-4 border-b p-5">
            <div>
              <Dialog.Title className="font-medium">Install this page</Dialog.Title>
              <Dialog.Description className="mt-1 text-sm text-muted-foreground">
                Run this command in a Next.js project set up with shadcn/ui. It
                creates <code className="font-mono text-foreground">app/page.tsx</code>{" "}
                and installs the {unique} {unique === 1 ? "block" : "blocks"} it
                uses, with their dependencies.
              </Dialog.Description>
            </div>
            <Dialog.Close
              aria-label="Close"
              className="inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              <X className="size-4" />
            </Dialog.Close>
          </div>
          <div className="grid grid-cols-1 gap-4 overflow-y-auto p-5">
            <CommandBlock commands={shadcnAdd(composeRegistryUrl(blocks))} />
            <p className="text-xs text-muted-foreground">
              The CLI asks before overwriting an existing page. On another
              framework, install the blocks the same way and render them from
              your own route.
            </p>
            <div className="overflow-hidden rounded-lg border bg-code">
              <div className="flex h-10 items-center justify-between border-b pr-2 pl-4 font-mono text-xs text-muted-foreground">
                app/page.tsx
                <CopyButton value={source} />
              </div>
              <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-6">
                <code>{source}</code>
              </pre>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
