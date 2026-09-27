import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

/** Shared typography for documentation pages. */
export function DocsHeader({
  crumbs,
  title,
  description,
  children,
}: {
  crumbs: { title: string; href?: string }[]
  title: string
  description: string
  children?: React.ReactNode
}) {
  return (
    <header className="flex flex-col gap-3">
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1.5 font-mono text-[11px] tracking-wider text-muted-foreground uppercase"
      >
        {crumbs.map((crumb, i) => (
          <span key={crumb.title} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="size-3" aria-hidden />}
            {crumb.href ? (
              <Link href={crumb.href} className="hover:text-foreground">{crumb.title}</Link>
            ) : (
              <span className="text-foreground">{crumb.title}</span>
            )}
          </span>
        ))}
      </nav>
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
      <p className="text-lg text-balance text-muted-foreground">{description}</p>
      {children}
    </header>
  )
}

export function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="group mt-14 mb-4 scroll-mt-20 text-xl font-semibold tracking-tight">
      <a href={`#${id}`} className="inline-flex items-center gap-2">
        {children}
        <span className="text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">#</span>
      </a>
    </h2>
  )
}

export function P({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn("leading-7 text-muted-foreground [&:not(:first-child)]:mt-4", className)} {...props} />
}

export function InlineCode(props: React.ComponentProps<"code">) {
  return <code className="rounded-md border bg-muted/60 px-1.5 py-0.5 font-mono text-[0.85em] text-foreground" {...props} />
}

/** Numbered vertical steps, used for manual installation guides. */
export function Steps({ children }: { children: React.ReactNode }) {
  return <div className="ml-3.5 border-l pl-7 [counter-reset:step]">{children}</div>
}

export function Step({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="relative pb-8 last:pb-0 [counter-increment:step]">
      <h3 className="mb-3 text-base font-medium before:absolute before:top-0 before:-left-[calc(1.75rem+0.875rem+0.5px)] before:flex before:size-7 before:items-center before:justify-center before:rounded-full before:border before:bg-background before:font-mono before:text-xs before:text-muted-foreground before:content-[counter(step)]">
        {title}
      </h3>
      {children}
    </div>
  )
}
