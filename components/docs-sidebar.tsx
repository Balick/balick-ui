"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { docsNav } from "@/config/docs"
import { cn } from "@/lib/utils"

export function DocsSidebar() {
  const pathname = usePathname()

  return (
    <nav aria-label="Documentation" className="flex flex-col gap-6 py-8 pr-4 text-sm">
      {docsNav.map((section) => (
        <div key={section.title}>
          <p className="mb-2 px-2 font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
            {section.title}
          </p>
          <ul className="flex flex-col gap-0.5">
            {section.items.map((item) => {
              const active = pathname === item.href
              return (
                <li key={item.title}>
                  {item.disabled ? (
                    <span className="flex h-8 items-center px-2 text-muted-foreground/50">
                      {item.title}
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex h-8 items-center gap-2 rounded-md px-2 transition-colors",
                        active
                          ? "bg-accent font-medium text-foreground"
                          : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                      )}
                    >
                      {item.title}
                      {item.label && <NewBadge>{item.label}</NewBadge>}
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </nav>
  )
}

export function NewBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border px-1.5 py-px font-mono text-[10px] leading-4 text-muted-foreground">
      {children}
    </span>
  )
}
