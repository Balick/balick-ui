"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { mainNav } from "@/config/docs"
import { cn } from "@/lib/utils"

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function MainNav({ className }: { className?: string }) {
  const pathname = usePathname()

  return (
    <nav className={cn("items-center gap-1", className)}>
      {mainNav.map((item) =>
        item.href === "/pro" ? (
          <Link
            key={item.href}
            href={item.href}
            className="ml-1 inline-flex h-7 items-center gap-1.5 rounded-full border bg-card pr-2.5 pl-1 text-sm shadow-xs transition-colors hover:bg-accent"
          >
            <span className="rounded-full bg-foreground px-1.5 py-0.5 font-mono text-[10px] leading-none font-medium tracking-wider text-background uppercase">
              Pro
            </span>
            <span className={isActive(pathname, item.href) ? "text-foreground" : "text-muted-foreground"}>
              Get Pro
            </span>
          </Link>
        ) : (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "rounded-md px-2.5 py-1.5 text-sm transition-colors hover:text-foreground",
              isActive(pathname, item.href) ? "text-foreground" : "text-muted-foreground"
            )}
          >
            {item.title}
          </Link>
        )
      )}
    </nav>
  )
}
