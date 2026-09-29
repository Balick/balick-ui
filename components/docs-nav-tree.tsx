"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight } from "lucide-react"

import { docsNav, isInNavItem, type NavItem } from "@/config/docs"
import { cn } from "@/lib/utils"

/**
 * The documentation tree, shared by the sidebar and the mobile menu. An item
 * with children (a component category) unfolds when it or one of its
 * children is the current page. Labels never wrap.
 */
export function DocsNavTree({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <nav aria-label="Documentation" className="flex flex-col gap-6 text-sm">
      {docsNav.map((section) => (
        <div key={section.title}>
          <p className="mb-2 px-3 font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
            {section.title}
          </p>
          <ul className="flex flex-col gap-0.5">
            {section.items.map((item) => (
              <NavNode key={item.href} item={item} pathname={pathname} onNavigate={onNavigate} />
            ))}
          </ul>
        </div>
      ))}
    </nav>
  )
}

function NavNode({
  item,
  pathname,
  onNavigate,
}: {
  item: NavItem
  pathname: string
  onNavigate?: () => void
}) {
  const current = pathname === item.href
  const open = !!item.items && isInNavItem(item, pathname)
  // A category reads as an open section, never as a selected button.
  const highlighted = current && !item.items

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
        aria-expanded={item.items ? open : undefined}
        title={item.title}
        className={cn(
          "flex h-8 items-center gap-2 rounded-md px-3 whitespace-nowrap transition-colors",
          highlighted
            ? "bg-card font-medium text-foreground shadow-xs ring-1 ring-border"
            : open
              ? "font-medium text-foreground hover:bg-foreground/[0.04]"
              : "text-muted-foreground hover:bg-foreground/[0.04] hover:text-foreground"
        )}
      >
        <span className="min-w-0 truncate">{item.title}</span>
        {item.label && (
          <span className="shrink-0 rounded-full border px-1.5 py-px font-mono text-[10px] leading-4 text-muted-foreground">
            {item.label}
          </span>
        )}
        {item.items && (
          <ChevronRight
            aria-hidden
            className={cn(
              "ml-auto size-3.5 shrink-0 text-muted-foreground transition-transform duration-200 motion-reduce:transition-none",
              open && "rotate-90"
            )}
          />
        )}
      </Link>
      {item.items && (
        <div
          className={cn(
            "grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none",
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          )}
        >
          <ul inert={!open} className="ml-4 flex min-h-0 flex-col gap-0.5 overflow-hidden border-l border-rule pl-2">
            {item.items.map((child) => (
              <NavNode key={child.href} item={child} pathname={pathname} onNavigate={onNavigate} />
            ))}
          </ul>
        </div>
      )}
    </li>
  )
}
