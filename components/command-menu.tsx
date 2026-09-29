"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Command } from "cmdk"
import { ArrowRight, Moon, Search, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { docsNav, type NavItem } from "@/config/docs"
import { cn } from "@/lib/utils"

/**
 * Search results: one group per sidebar section, and one per component
 * category, which lists the category page first.
 */
const searchGroups = docsNav.flatMap((section) => {
  const pages = section.items.filter((item) => !item.items && !item.disabled)
  const categories = section.items.filter((item) => item.items)
  return [
    ...(pages.length ? [{ heading: section.title, items: pages }] : []),
    ...categories.map((category) => ({
      heading: `${section.title} · ${category.title}`,
      items: [
        { ...category, title: `All ${category.title.toLowerCase()}` },
        ...(category.items ?? []),
      ] as NavItem[],
    })),
  ]
})

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
          "inline-flex h-8 cursor-pointer items-center justify-center gap-2 rounded-md border bg-card px-2 text-sm text-muted-foreground shadow-xs transition-colors hover:text-foreground lg:justify-start lg:pr-1.5 lg:pl-2.5",
          className
        )}
      >
        <Search className="size-3.5" />
        <span className="sr-only lg:hidden">Search</span>
        <span className="hidden flex-1 text-left lg:inline">Search…</span>
        <kbd className="pointer-events-none hidden h-5 items-center rounded border bg-muted px-1.5 font-mono text-[10px] font-medium lg:inline-flex">
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
        <Command.List className="scrollbar-thin max-h-80 scroll-py-2 overflow-y-auto p-2">
          <Command.Empty className="py-10 text-center text-sm text-muted-foreground">
            No results found.
          </Command.Empty>
          {searchGroups.map((group) => (
            <Command.Group
              key={group.heading}
              heading={group.heading}
              className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:pt-2 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:text-muted-foreground"
            >
              {group.items.map((item) => (
                <Item
                  key={item.href}
                  value={`${group.heading} ${item.title}`}
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
