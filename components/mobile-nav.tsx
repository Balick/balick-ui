"use client"

import * as React from "react"
import Link from "next/link"
import * as Dialog from "@radix-ui/react-dialog"
import { Menu, X } from "lucide-react"

import { DocsNavTree } from "@/components/docs-nav-tree"
import { mainNav } from "@/config/docs"
import { cn } from "@/lib/utils"

export function MobileNav({ className }: { className?: string }) {
  const [open, setOpen] = React.useState(false)

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        aria-label="Open menu"
        className={cn(
          "inline-flex size-8 cursor-pointer items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground",
          className
        )}
      >
        <Menu className="size-4" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col border-r bg-background data-[state=open]:animate-in data-[state=open]:slide-in-from-left">
          <div className="flex h-14 items-center justify-between border-b px-4">
            <Dialog.Title className="text-sm font-medium">Menu</Dialog.Title>
            <Dialog.Close
              aria-label="Close menu"
              className="inline-flex size-8 cursor-pointer items-center justify-center rounded-md text-muted-foreground hover:bg-accent"
            >
              <X className="size-4" />
            </Dialog.Close>
          </div>
          <div className="scrollbar-thin flex-1 overflow-y-auto p-4">
            <nav aria-label="Main" className="mb-6 flex flex-col gap-1 px-3">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="py-1 text-sm font-medium"
                >
                  {item.title}
                </Link>
              ))}
            </nav>
            <DocsNavTree onNavigate={() => setOpen(false)} />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
