"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { mainNav } from "@/config/docs"
import { cn } from "@/lib/utils"

function isActive(pathname: string, href: string) {
  if (href === "/docs") {
    return pathname.startsWith("/docs") && !pathname.startsWith("/docs/components")
  }
  return pathname.startsWith(href)
}

export function MainNav({ className }: { className?: string }) {
  const pathname = usePathname()

  return (
    <nav className={cn("items-center gap-1", className)}>
      {mainNav.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "rounded-md px-2.5 py-1.5 text-sm transition-colors hover:text-foreground",
            isActive(pathname, item.href)
              ? "text-foreground"
              : "text-muted-foreground"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}
