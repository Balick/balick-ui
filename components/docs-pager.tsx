import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { flatDocs } from "@/config/docs"

export function DocsPager({ href }: { href: string }) {
  const index = flatDocs.findIndex((item) => item.href === href)
  const prev = index > 0 ? flatDocs[index - 1] : undefined
  const next = index >= 0 ? flatDocs[index + 1] : undefined

  return (
    <nav className="mt-16 grid grid-cols-2 gap-4 border-t pt-8">
      {prev ? (
        <Link href={prev.href} className="group flex flex-col gap-1 rounded-lg border p-4 transition-colors hover:bg-accent/50">
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <ArrowLeft className="size-3 transition-transform group-hover:-translate-x-0.5" /> Previous
          </span>
          <span className="text-sm font-medium">{prev.title}</span>
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link href={next.href} className="group flex flex-col items-end gap-1 rounded-lg border p-4 text-right transition-colors hover:bg-accent/50">
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            Next <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
          </span>
          <span className="text-sm font-medium">{next.title}</span>
        </Link>
      )}
    </nav>
  )
}
