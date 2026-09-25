"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Command } from "cmdk"
import { ArrowRight, Moon, Search, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { docsNav } from "@/config/docs"
import { cn } from "@/lib/utils"

export function CommandMenu({ className }: { className?: string }) {
  const router = useRouter()
  const { setTheme } = useTheme()
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement
      if (target.isContentEditable || /input|textarea|select/i.test(target.tagName)) {
        return
      }
      if ((event.key === "k" && (event.metaKey || event.ctrlKey)) || event.key === "/") {
        event.preventDefault()
        setOpen((value) => !value)
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [])

  const run = (action: () => void) => {
    setOpen(false)
    action()
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "inline-flex h-8 cursor-pointer items-center justify-center gap-2 rounded-md border bg-muted/50 px-2 sm:justify-start sm:pr-1.5 sm:pl-2.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
          className
        )}
      >
        <Search className="size-3.5" />
        <span className="sr-only sm:hidden">Search</span>
        <span className="hidden flex-1 text-left sm:inline">Search…</span>
        <kbd className="pointer-events-none hidden h-5 items-center rounded border bg-background px-1.5 font-mono text-[10px] font-medium sm:inline-flex">
          ⌘K
        </kbd>
      </button>
      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label="Search documentation"
        overlayClassName="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0"
        contentClassName="fixed top-[15vh] left-1/2 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 overflow-hidden rounded-xl border bg-popover text-popover-foreground shadow-2xl data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
      >
        <div className="flex items-center gap-2 border-b px-3">
          <Search className="size-4 text-muted-foreground" />
          <Command.Input
            placeholder="Search components, docs…"
            className="h-12 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
        <Command.List className="max-h-80 scroll-py-2 overflow-y-auto p-2">
          <Command.Empty className="py-10 text-center text-sm text-muted-foreground">
            No results found.
          </Command.Empty>
          {docsNav.map((section) => (
            <Command.Group
              key={section.title}
              heading={section.title}
              className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:pt-2 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:text-muted-foreground"
            >
              {section.items
                .filter((item) => !item.disabled)
                .map((item) => (
                  <Item
                    key={item.href}
                    value={`${section.title} ${item.title}`}
                    onSelect={() => run(() => router.push(item.href))}
                  >
                    <ArrowRight className="size-3.5 text-muted-foreground" />
                    {item.title}
                  </Item>
                ))}
            </Command.Group>
          ))}
          <Command.Group
            heading="Theme"
            className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:pt-2 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:text-muted-foreground"
          >
            <Item onSelect={() => run(() => setTheme("light"))}>
              <Sun className="size-3.5 text-muted-foreground" />
              Light
            </Item>
            <Item onSelect={() => run(() => setTheme("dark"))}>
              <Moon className="size-3.5 text-muted-foreground" />
              Dark
            </Item>
          </Command.Group>
        </Command.List>
      </Command.Dialog>
    </>
  )
}

function Item(props: React.ComponentProps<typeof Command.Item>) {
  return (
    <Command.Item
      {...props}
      className="flex h-9 cursor-pointer items-center gap-2.5 rounded-md px-2 text-sm data-[selected=true]:bg-accent"
    />
  )
}
