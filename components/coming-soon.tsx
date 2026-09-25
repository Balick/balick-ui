import Link from "next/link"

import { GridPattern } from "@/registry/balick/ui/grid-pattern"

export function ComingSoon({
  label,
  title,
  description,
  items,
}: {
  label: string
  title: string
  description: string
  items: string[]
}) {
  return (
    <section className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-4 py-24 text-center">
      <GridPattern className="[mask-image:radial-gradient(420px_circle_at_center,white,transparent)]" />
      <span className="relative rounded-full border bg-background px-3 py-1 font-mono text-xs text-muted-foreground">
        {label}
      </span>
      <h1 className="relative mt-6 text-4xl font-semibold tracking-tighter sm:text-5xl">{title}</h1>
      <p className="relative mt-4 max-w-md text-balance text-muted-foreground">{description}</p>
      <ul className="relative mt-10 flex max-w-xl flex-wrap justify-center gap-2">
        {items.map((item) => (
          <li key={item} className="rounded-md border border-dashed bg-background px-3 py-1.5 text-sm text-muted-foreground">
            {item}
          </li>
        ))}
      </ul>
      <Link
        href="/docs/components"
        className="relative mt-10 inline-flex h-9 items-center rounded-md bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-85"
      >
        Browse components
      </Link>
    </section>
  )
}
