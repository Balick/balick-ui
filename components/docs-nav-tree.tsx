"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight } from "lucide-react"

import { docsNav, isInNavItem, type NavItem } from "@/config/docs"
import { cn } from "@/lib/utils"

/**
 * The documentation tree, shared by the sidebar and the mobile menu. A
 * component category unfolds in place when clicked, one at a time; the
 * category of the current page opens on its own. Labels never wrap.
 */
export function DocsNavTree({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  const current = docsNav
    .flatMap((section) => section.items)
    .find((item) => item.items && isInNavItem(item, pathname))?.href
  const [open, setOpen] = React.useState(current)
  const [followed, setFollowed] = React.useState(current)

  // Navigating into another category opens it, whatever was open before.
  if (current !== followed) {
    setFollowed(current)
    if (current) setOpen(current)
  }

  return (
    <nav aria-label="Documentation" className="flex flex-col gap-6 text-sm">
      {docsNav.map((section) => (
        <div key={section.title}>
          <p className="mb-2 px-3 font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
            {section.title}
          </p>
          <ul className="flex flex-col gap-0.5">
            {section.items.map((item) =>
              item.items ? (
                <Category
                  key={item.href}
                  item={item}
                  open={open === item.href}
                  onToggle={() => setOpen((value) => (value === item.href ? undefined : item.href))}
                  pathname={pathname}
                  onNavigate={onNavigate}
                />
              ) : (
                <Page key={item.href} item={item} pathname={pathname} onNavigate={onNavigate} />
              )
            )}
          </ul>
        </div>
      ))}
    </nav>
  )
}

function Category({
  item,
  open,
  onToggle,
  pathname,
  onNavigate,
}: {
  item: NavItem
  open: boolean
  onToggle: () => void
  pathname: string
  onNavigate?: () => void
}) {
  const listId = `docs-nav-${item.href.split("/").pop()}`

  return (
    <li>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={listId}
        onClick={onToggle}
        className={cn(
          "flex h-8 w-full cursor-pointer items-center gap-2 rounded-md px-3 text-left whitespace-nowrap transition-colors hover:bg-foreground/[0.04]",
          open ? "font-medium text-foreground" : "text-muted-foreground hover:text-foreground"
        )}
      >
        <span className="min-w-0 truncate">{item.title}</span>
        <ChevronRight
          aria-hidden
          className={cn(
            "ml-auto size-3.5 shrink-0 text-muted-foreground transition-transform duration-200 motion-reduce:transition-none",
            open && "rotate-90"
          )}
        />
      </button>
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <ul
          id={listId}
          inert={!open}
          className="ml-4 flex min-h-0 flex-col gap-0.5 overflow-hidden border-l border-rule pl-2"
        >
          {item.items?.map((child) => (
            <Page key={child.href} item={child} pathname={pathname} onNavigate={onNavigate} />
          ))}
        </ul>
      </div>
    </li>
  )
}

function Page({
  item,
  pathname,
  onNavigate,
}: {
  item: NavItem
  pathname: string
  onNavigate?: () => void
}) {
  const current = pathname === item.href

  if (item.disabled) {
    return (
      <li className="flex h-8 items-center px-3 text-muted-foreground/60">
        <span className="truncate">{item.title}</span>
      </li>
    )
  }

  return (
    <li>
      <Link
        href={item.href}
        onClick={onNavigate}
        aria-current={current ? "page" : undefined}
        title={item.title}
        className={cn(
          "flex h-8 items-center gap-2 rounded-md px-3 whitespace-nowrap transition-colors",
          current
            ? "bg-card font-medium text-foreground shadow-xs ring-1 ring-border"
            : "text-muted-foreground hover:bg-foreground/[0.04] hover:text-foreground"
        )}
      >
        <span className="min-w-0 truncate">{item.title}</span>
        {item.label && (
          <span className="shrink-0 rounded-full border px-1.5 py-px font-mono text-[10px] leading-4 text-muted-foreground">
            {item.label}
          </span>
        )}
      </Link>
    </li>
  )
}
